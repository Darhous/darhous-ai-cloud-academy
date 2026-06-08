import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { DRAFT_PREVIEW_TABLES_MAP } from "@/lib/admin/draft-content-preview-config";

export async function GET(req: NextRequest) {
  const { user } = await verifyAdminRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const searchParams = req.nextUrl.searchParams;
  const table = searchParams.get("table");
  
  if (!table) {
    return NextResponse.json({ error: "table parameter is required" }, { status: 400 });
  }

  const config = DRAFT_PREVIEW_TABLES_MAP[table];
  if (!config) {
    return NextResponse.json({ error: "Not a whitelisted preview table" }, { status: 403 });
  }

  // Pagination with strict limits
  let limit = parseInt(searchParams.get("limit") || "20", 10);
  if (isNaN(limit) || limit <= 0) limit = 20;
  if (limit > 100) limit = 100; // Cap at 100

  let page = parseInt(searchParams.get("page") || "1", 10);
  if (isNaN(page) || page <= 0) page = 1;

  const offset = (page - 1) * limit;

  // Enforce draft status to prevent public leakage in this view, though it's admin only
  let query = admin.from(config.table).select("*", { count: "exact" }).eq("status", "draft");

  // Optional search by title if passed
  const search = searchParams.get("search");
  if (search && config.titleFields.length > 0) {
    // Basic ilike on the first available title field for simplicity
    const searchField = config.titleFields.includes("title_ar") ? "title_ar" : config.titleFields[0];
    query = query.ilike(searchField, `%${search}%`);
  }

  // We sort by created_at desc or sort_order desc
  query = query.order("sort_order", { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data ?? [],
    count: count ?? 0,
    page,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 0,
  });
}
