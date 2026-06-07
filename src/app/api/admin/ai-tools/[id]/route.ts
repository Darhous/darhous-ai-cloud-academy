/**
 * GET    /api/admin/ai-tools/[id]  — fetch single tool
 * PATCH  /api/admin/ai-tools/[id]  — update fields / change status
 * DELETE /api/admin/ai-tools/[id]  — hard-delete tool
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";

async function requireAdmin() {
  const { user } = await verifyAdminRequest();
  return user;
}

type Ctx = { params: Promise<{ id: string }> };

const TEXT_FIELDS = [
  "name", "category", "short_description_ar", "short_description_en",
  "level", "pricing_type", "best_for", "website",
  "overview_ar", "overview_en", "recommended_path", "status",
];
const ARRAY_FIELDS = [
  "use_cases", "tags", "how_to_start_ar", "how_to_start_en",
  "pros", "limitations", "alternatives", "related_prompts", "related_courses",
];

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin.from("ai_tools").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const updates: Record<string, unknown> = {};
  for (const key of TEXT_FIELDS) {
    if (key in body) updates[key] = body[key] === "" && key !== "status" ? null : body[key];
  }
  for (const key of ARRAY_FIELDS) {
    if (key in body) updates[key] = Array.isArray(body[key]) ? (body[key] as unknown[]).map(String) : [];
  }
  if ("featured" in body) updates.featured = Boolean(body.featured);
  if ("sort_order" in body) updates.sort_order = Number(body.sort_order) || 0;

  if (Object.keys(updates).length === 0) return NextResponse.json({ error: "No valid fields" }, { status: 400 });

  if ("status" in updates) {
    if (!["published", "draft", "archived"].includes(updates.status as string)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }
    if (updates.status === "published") updates.published_at = new Date().toISOString();
    if (updates.status === "archived") updates.archived_at = new Date().toISOString();
  }
  if ("level" in updates && !["beginner", "intermediate", "advanced"].includes(updates.level as string)) {
    return NextResponse.json({ error: "Invalid level value" }, { status: 400 });
  }
  if ("pricing_type" in updates && !["free", "freemium", "paid", "open-source"].includes(updates.pricing_type as string)) {
    return NextResponse.json({ error: "Invalid pricing_type value" }, { status: 400 });
  }

  const { data, error } = await admin.from("ai_tools").update(updates).eq("id", id).select("id,name").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await admin.from("ai_tools").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
