/**
 * GET  /api/admin/ai-prompts  — list all prompts (admin: all statuses)
 * POST /api/admin/ai-prompts  — create a new prompt
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";

async function requireAdmin() {
  const { user } = await verifyAdminRequest();
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from("ai_prompts")
    .select("id,title_ar,category,difficulty,best_model,status,featured,sort_order,updated_at")
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
  const promptText = String(body.prompt_text ?? "").trim();
  if (!id || !titleAr || !promptText) {
    return NextResponse.json({ error: "id, title_ar and prompt_text are required" }, { status: 400 });
  }

  const status = ["published", "draft", "archived"].includes(String(body.status)) ? String(body.status) : "published";
  const difficulty = ["beginner", "intermediate", "advanced"].includes(String(body.difficulty)) ? String(body.difficulty) : "beginner";

  const { data, error } = await admin
    .from("ai_prompts")
    .insert({
      id,
      portal_id:    "ai-academy",
      content_type: "prompt",
      title_ar:     titleAr,
      title_en:     String(body.title_en ?? "").trim(),
      category:     String(body.category ?? "Claude").trim(),
      use_case_ar:  String(body.use_case_ar ?? "").trim(),
      use_case_en:  String(body.use_case_en ?? "").trim(),
      prompt_text:  promptText,
      difficulty,
      best_model:   String(body.best_model ?? "").trim(),
      tags:         Array.isArray(body.tags) ? (body.tags as unknown[]).map(String) : [],
      sort_order:   Number(body.sort_order ?? 0),
      featured:     Boolean(body.featured),
      status,
      created_by:   user.id,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select("id,title_ar")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
