/**
 * GET  /api/admin/ai-courses  — list all courses (admin: all statuses)
 * POST /api/admin/ai-courses  — create a new course
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";

async function requireAdmin() {
  const { user } = await verifyAdminRequest();
  return user;
}

const ARRAY_FIELDS = [
  "skills", "for_who_ar", "for_who_en", "what_you_learn_ar", "what_you_learn_en",
  "tools_required", "related_projects", "related_courses",
];

function arrayField(body: Record<string, unknown>, key: string): string[] {
  return Array.isArray(body[key]) ? (body[key] as unknown[]).map(String) : [];
}

function jsonbField(body: Record<string, unknown>, key: string): unknown | null {
  const v = body[key];
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "string") {
    try { return JSON.parse(v); } catch { return null; }
  }
  return v;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from("ai_courses")
    .select("id,title_ar,category,level,status,featured,sort_order,updated_at")
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
    content_type:   "course",
    title_ar:       titleAr,
    title_en:       String(body.title_en ?? "").trim(),
    description_ar: descriptionAr,
    description_en: String(body.description_en ?? "").trim(),
    category:       String(body.category ?? "AI").trim(),
    level,
    lessons:        Number(body.lessons ?? 0),
    hours:          Number(body.hours ?? 0),
    projects:       Number(body.projects ?? 0),
    icon:           String(body.icon ?? "🧠").trim(),
    color:          String(body.color ?? "blue").trim(),
    coming_soon:    Boolean(body.coming_soon),
    overview_ar:    body.overview_ar ? String(body.overview_ar) : null,
    overview_en:    body.overview_en ? String(body.overview_en) : null,
    lesson_outline: jsonbField(body, "lesson_outline"),
    quiz:           jsonbField(body, "quiz"),
    sort_order:     Number(body.sort_order ?? 0),
    featured:       Boolean(body.featured),
    status,
    created_by:     user.id,
    published_at:   status === "published" ? new Date().toISOString() : null,
  };
  for (const key of ARRAY_FIELDS) insert[key] = arrayField(body, key);

  const { data, error } = await admin.from("ai_courses").insert(insert).select("id,title_ar").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
