/**
 * GET  /api/admin/cms/[table]  — list all rows for a registered CMS type (admin: all statuses)
 * POST /api/admin/cms/[table]  — create a new row
 *
 * Generic counterpart to /api/admin/ai-paths/route.ts — driven by the
 * CMS_REGISTRY (src/lib/admin/cms-registry.ts) so the 22 remaining content
 * tables (Automation, IoT Lab, Digital Exams) don't need 22 hand-written
 * route files. `table` is validated against the registry whitelist before
 * any DB access.
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { CMS_BY_TABLE } from "@/lib/admin/cms-registry";
import { coerceCmsFields } from "@/lib/admin/cms-fields";

async function requireAdmin() {
  const { user } = await verifyAdminRequest();
  return user;
}

type Ctx = { params: Promise<{ table: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table } = await params;
  const config = CMS_BY_TABLE[table];
  if (!config) return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin
    .from(config.table)
    .select(`id,${config.titleField},status,featured,sort_order,updated_at`)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table } = await params;
  const config = CMS_BY_TABLE[table];
  if (!config) return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const id = String(body.id ?? "").trim();
  const title = String(body[config.titleField] ?? "").trim();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  if (!title) return NextResponse.json({ error: `${config.titleField} is required` }, { status: 400 });
  if (!/^[a-z0-9-]+$/.test(id)) {
    return NextResponse.json({ error: "id must contain only lowercase letters, numbers and hyphens" }, { status: 400 });
  }

  const coerced = coerceCmsFields(config.fields, body, { forCreate: true });
  if ("error" in coerced) return NextResponse.json({ error: coerced.error }, { status: 400 });

  const status = ["published", "draft", "archived"].includes(String(body.status))
    ? String(body.status)
    : "draft";

  const insert: Record<string, unknown> = {
    id,
    portal_id: config.portalId,
    content_type: config.contentType,
    ...coerced.values,
    sort_order: Number(body.sort_order ?? 0),
    featured: Boolean(body.featured),
    status,
    created_by: user.id,
    published_at: status === "published" ? new Date().toISOString() : null,
  };

  const { data, error } = await admin.from(config.table).insert(insert).select(`id,${config.titleField}`).single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
