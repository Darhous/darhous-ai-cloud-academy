/**
 * GET    /api/admin/ai-prompts/[id]  — fetch single prompt
 * PATCH  /api/admin/ai-prompts/[id]  — update fields / change status
 * DELETE /api/admin/ai-prompts/[id]  — hard-delete prompt
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
  "title_ar", "title_en", "category", "use_case_ar", "use_case_en",
  "prompt_text", "difficulty", "best_model", "status",
];

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin.from("ai_prompts").select("*").eq("id", id).single();
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
    if (key in body) updates[key] = body[key];
  }
  if ("tags" in body) updates.tags = Array.isArray(body.tags) ? (body.tags as unknown[]).map(String) : [];
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
  if ("difficulty" in updates && !["beginner", "intermediate", "advanced"].includes(updates.difficulty as string)) {
    return NextResponse.json({ error: "Invalid difficulty value" }, { status: 400 });
  }

  const { data, error } = await admin.from("ai_prompts").update(updates).eq("id", id).select("id,title_ar").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await admin.from("ai_prompts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
