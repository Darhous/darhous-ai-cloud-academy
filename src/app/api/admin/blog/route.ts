/**
 * GET  /api/admin/blog  — list all posts (admin: all statuses)
 * POST /api/admin/blog  — create a new post
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return null;
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from("blog_posts")
    .select("id,slug,title_ar,title_en,category,status,featured,reading_time,published_at,updated_at,cover_url")
    .order("published_at", { ascending: false });

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

  const slug = String(body.slug ?? "").trim();
  const titleAr = String(body.title_ar ?? "").trim();
  if (!slug || !titleAr) return NextResponse.json({ error: "slug and title_ar are required" }, { status: 400 });

  const { data, error } = await admin
    .from("blog_posts")
    .insert({
      slug,
      title_ar:          titleAr,
      title_en:          String(body.title_en ?? "").trim(),
      excerpt_ar:        String(body.excerpt_ar ?? "").trim(),
      excerpt_en:        String(body.excerpt_en ?? "").trim(),
      content_ar:        String(body.content_ar ?? "").trim(),
      content_en:        String(body.content_en ?? "").trim(),
      key_takeaways_ar:  Array.isArray(body.key_takeaways_ar) ? body.key_takeaways_ar : [],
      key_takeaways_en:  Array.isArray(body.key_takeaways_en) ? body.key_takeaways_en : [],
      category:          String(body.category ?? "Learning").trim(),
      tags:              Array.isArray(body.tags) ? body.tags : [],
      icon:              String(body.icon ?? "📝").trim().slice(0, 4),
      reading_time:      Number(body.reading_time ?? 5),
      featured:          Boolean(body.featured),
      status:            ["published", "draft", "archived"].includes(String(body.status)) ? String(body.status) : "published",
      cover_url:         body.cover_url ? String(body.cover_url) : null,
      related_posts:     Array.isArray(body.related_posts) ? body.related_posts : [],
      related_tools:     Array.isArray(body.related_tools) ? body.related_tools : [],
      related_courses:   Array.isArray(body.related_courses) ? body.related_courses : [],
      created_by:        user.id,
      published_at:      body.status === "published" ? new Date().toISOString() : new Date().toISOString(),
    })
    .select("id,slug")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
