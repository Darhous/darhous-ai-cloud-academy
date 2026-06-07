/**
 * GET  /api/admin/ai-tools  — list all tools (admin: all statuses)
 * POST /api/admin/ai-tools  — create a new tool
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
  "use_cases", "tags", "how_to_start_ar", "how_to_start_en",
  "pros", "limitations", "alternatives", "related_prompts", "related_courses",
];

function arrayField(body: Record<string, unknown>, key: string): string[] {
  return Array.isArray(body[key]) ? (body[key] as unknown[]).map(String) : [];
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from("ai_tools")
    .select("id,name,category,level,pricing_type,status,featured,sort_order,updated_at")
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
  const name = String(body.name ?? "").trim();
  const shortDescriptionAr = String(body.short_description_ar ?? "").trim();
  if (!id || !name || !shortDescriptionAr) {
    return NextResponse.json({ error: "id, name and short_description_ar are required" }, { status: 400 });
  }

  const status = ["published", "draft", "archived"].includes(String(body.status)) ? String(body.status) : "published";
  const level = ["beginner", "intermediate", "advanced"].includes(String(body.level)) ? String(body.level) : "beginner";
  const pricingType = ["free", "freemium", "paid", "open-source"].includes(String(body.pricing_type)) ? String(body.pricing_type) : "freemium";

  const insert: Record<string, unknown> = {
    id,
    portal_id:            "ai-academy",
    content_type:         "tool",
    name,
    category:             String(body.category ?? "AI Chatbots").trim(),
    short_description_ar: shortDescriptionAr,
    short_description_en: String(body.short_description_en ?? "").trim(),
    level,
    pricing_type:         pricingType,
    best_for:             String(body.best_for ?? "").trim(),
    website:              body.website ? String(body.website) : null,
    overview_ar:          body.overview_ar ? String(body.overview_ar) : null,
    overview_en:          body.overview_en ? String(body.overview_en) : null,
    recommended_path:     body.recommended_path ? String(body.recommended_path) : null,
    sort_order:           Number(body.sort_order ?? 0),
    featured:             Boolean(body.featured),
    status,
    created_by:           user.id,
    published_at:         status === "published" ? new Date().toISOString() : null,
  };
  for (const key of ARRAY_FIELDS) insert[key] = arrayField(body, key);

  const { data, error } = await admin.from("ai_tools").insert(insert).select("id,name").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
