/**
 * GET  /api/admin/ai-glossary  — list all terms (admin: all statuses)
 * POST /api/admin/ai-glossary  — create a new term
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
    .from("ai_glossary")
    .select("id,term,category,status,featured,sort_order,updated_at")
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
  const term = String(body.term ?? "").trim();
  const definitionAr = String(body.definition_ar ?? "").trim();
  if (!id || !term || !definitionAr) {
    return NextResponse.json({ error: "id, term and definition_ar are required" }, { status: 400 });
  }

  const status = ["published", "draft", "archived"].includes(String(body.status)) ? String(body.status) : "published";

  const { data, error } = await admin
    .from("ai_glossary")
    .insert({
      id,
      portal_id:      "ai-academy",
      content_type:   "glossary",
      term,
      definition_ar:  definitionAr,
      definition_en:  String(body.definition_en ?? "").trim(),
      example_ar:     String(body.example_ar ?? "").trim(),
      example_en:     String(body.example_en ?? "").trim(),
      category:       String(body.category ?? "Core AI").trim(),
      sort_order:     Number(body.sort_order ?? 0),
      featured:       Boolean(body.featured),
      status,
      created_by:     user.id,
      published_at:   status === "published" ? new Date().toISOString() : null,
    })
    .select("id,term")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
