/**
 * GET    /api/admin/ai-projects/[id]  — fetch single project
 * PATCH  /api/admin/ai-projects/[id]  — update fields / change status
 * DELETE /api/admin/ai-projects/[id]  — hard-delete project
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
  "title_ar", "title_en", "description_ar", "description_en", "category",
  "difficulty", "expected_output", "expected_output_ar", "future_idea", "future_idea_ar",
  "icon", "goal_ar", "goal_en", "status",
];
const ARRAY_FIELDS = ["stack", "skills", "required_tools", "related_courses", "related_tools"];
const JSONB_FIELDS = ["build_steps"];

function parseJsonbValue(v: unknown): unknown | null {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "string") {
    try { return JSON.parse(v); } catch { return undefined; }
  }
  return v;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin.from("ai_projects").select("*").eq("id", id).single();
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
  for (const key of JSONB_FIELDS) {
    if (key in body) {
      const parsed = parseJsonbValue(body[key]);
      if (parsed === undefined) return NextResponse.json({ error: `Invalid JSON in ${key}` }, { status: 400 });
      updates[key] = parsed;
    }
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
  if ("difficulty" in updates && !["beginner", "intermediate", "advanced"].includes(updates.difficulty as string)) {
    return NextResponse.json({ error: "Invalid difficulty value" }, { status: 400 });
  }

  const { data, error } = await admin.from("ai_projects").update(updates).eq("id", id).select("id,title_ar").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await admin.from("ai_projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
