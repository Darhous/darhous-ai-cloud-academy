/**
 * GET    /api/admin/blog/[id]  — fetch single post (by DB uuid or slug)
 * PUT    /api/admin/blog/[id]  — update post
 * DELETE /api/admin/blog/[id]  — hard-delete post
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

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin.from("blog_posts").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const allowed = [
    "slug","title_ar","title_en","excerpt_ar","excerpt_en",
    "content_ar","content_en","key_takeaways_ar","key_takeaways_en",
    "category","tags","icon","reading_time","featured","status","cover_url",
    "related_posts","related_tools","related_courses","published_at",
  ];
  const patch: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) patch[key] = body[key];
  }
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: "No valid fields" }, { status: 400 });

  const { data, error } = await admin.from("blog_posts").update(patch).eq("id", id).select("id,slug").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await admin.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
