/**
 * GET  /api/admin/ai-paths  — list all roadmaps (admin: all statuses)
 * POST /api/admin/ai-paths  — create a new roadmap
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";

async function requireAdmin() {
  const { user } = await verifyAdminRequest();
  return user;
}

function jsonbField(body: Record<string, unknown>, key: string): unknown {
  const v = body[key];
  if (v === null || v === undefined || v === "") return [];
  if (typeof v === "string") {
    try { return JSON.parse(v); } catch { return []; }
  }
  return v;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from("ai_paths")
    .select("id,title_ar,level,total_weeks,status,featured,sort_order,updated_at")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const id = String(body.id ?? "").trim();
  const titleAr = String(body.title_ar ?? "").trim();
  const descriptionAr = String(body.description_ar ?? "").trim();
  if (!id || !titleAr || !descriptionAr) {
    return NextResponse.json({ error: "id, title_ar and description_ar are required" }, { status: 400 });
  }

  const status = ["published", "draft", "archived"].includes(String(body.status)) ? String(body.status) : "published";
  const level = ["beginner", "intermediate", "advanced"].includes(String(body.level)) ? String(body.level) : "beginner";

  const insert: Record<string, unknown> = {
    id,
    portal_id:      "ai-academy",
    content_type:   "path",
    title_ar:       titleAr,
    title_en:       String(body.title_en ?? "").trim(),
    description_ar: descriptionAr,
    description_en: String(body.description_en ?? "").trim(),
    level,
    total_weeks:    Number(body.total_weeks ?? 0),
    outcome:        String(body.outcome ?? "").trim(),
    outcome_ar:     String(body.outcome_ar ?? "").trim(),
    icon:           String(body.icon ?? "🚀").trim(),
    color:          String(body.color ?? "blue").trim(),
    nodes:          jsonbField(body, "nodes"),
    sort_order:     Number(body.sort_order ?? 0),
    featured:       Boolean(body.featured),
    status,
    created_by:     user.id,
    published_at:   status === "published" ? new Date().toISOString() : null,
  };

  const { data, error } = await admin.from("ai_paths").insert(insert).select("id,title_ar").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
