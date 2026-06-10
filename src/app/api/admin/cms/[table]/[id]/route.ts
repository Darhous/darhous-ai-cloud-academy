/**
 * GET    /api/admin/cms/[table]/[id]  — fetch single row
 * PATCH  /api/admin/cms/[table]/[id]  — update fields / change status
 * DELETE /api/admin/cms/[table]/[id]  — hard-delete row
 *
 * Generic counterpart to /api/admin/ai-paths/[id]/route.ts — driven by the
 * CMS_REGISTRY, see [table]/route.ts for rationale.
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

type Ctx = { params: Promise<{ table: string; id: string }> };

function resolveConfig(table: string) {
  return CMS_BY_TABLE[table] ?? null;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table, id } = await params;
  const config = resolveConfig(table);
  if (!config) return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await admin.from(config.table).select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table, id } = await params;
  const config = resolveConfig(table);
  if (!config) return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const coerced = coerceCmsFields(config.fields, body, { forCreate: false });
  if ("error" in coerced) return NextResponse.json({ error: coerced.error }, { status: 400 });

  const updates: Record<string, unknown> = { ...coerced.values };
  if ("sort_order" in body) updates.sort_order = Number(body.sort_order) || 0;
  if ("featured" in body) updates.featured = Boolean(body.featured);
  const PUBLISHING_ALLOWLIST = [
    "automation_glossary", "automation_paths", "automation_tools", "automation_case_studies",
    "automation_checklists", "automation_comparisons", "automation_labs", "automation_services",
    "automation_use_cases", "automation_prompts", "automation_workflows",
  ];
  if ("status" in body) {
    if (!PUBLISHING_ALLOWLIST.includes(config.table)) {
      return NextResponse.json({ error: "Publishing lifecycle is currently locked for this content type (Pilot Phase)" }, { status: 403 });
    }
    const status = String(body.status);
    if (!["published", "draft", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }
    updates.status = status;
    if (status === "published") updates.published_at = new Date().toISOString();
    if (status === "archived") updates.archived_at = new Date().toISOString();
  }

  // Validate "select" fields against their configured options (e.g. level/difficulty enums).
  for (const f of config.fields) {
    if (f.kind === "select" && f.options && f.name in updates) {
      const allowed = f.options.map((o) => o.value);
      if (updates[f.name] && !allowed.includes(String(updates[f.name]))) {
        return NextResponse.json({ error: `Invalid value for "${f.name}"` }, { status: 400 });
      }
    }
  }

  if (Object.keys(updates).length === 0) return NextResponse.json({ error: "No valid fields" }, { status: 400 });

  const { data, error } = await admin
    .from(config.table)
    .update(updates)
    .eq("id", id)
    .select(`id,${config.titleField}`)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table, id } = await params;
  const config = resolveConfig(table);
  if (!config) return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

  // In the generic registry, all tables natively support id/status/featured/sort_order.
  // If a table literally had no status field in the registry, we would return 405.
  // But here all 22 tables have it.
  
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await admin
    .from(config.table)
    .update({ status: "archived", archived_at: new Date().toISOString() })
    .eq("id", id);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true, archived: true });
}
