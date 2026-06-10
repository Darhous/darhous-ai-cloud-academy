/**
 * POST /api/admin/seed/automation-glossary
 *
 * Inserts the first 5 static glossary terms as status="published" using the
 * service-role client (bypasses RLS). Admin-only, gated by verifyAdminRequest.
 *
 * Safe to call multiple times — rows with an existing id are skipped (upsert
 * with ignoreDuplicates). Returns { inserted, skipped }.
 */
import "server-only";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { automationGlossary } from "@/data/automation/automationGlossary";

const PILOT_COUNT = 5;

export async function POST() {
  const { user } = await verifyAdminRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const pilot = automationGlossary.slice(0, PILOT_COUNT);
  const rows = pilot.map((t) => ({
    id: t.id,
    portal_id: "automation",
    content_type: "glossary",
    term: t.term,
    arabic_definition: t.arabicDefinition,
    simple_example: t.simpleExample,
    related_terms: t.relatedTerms,
    status: "published",
    featured: false,
    sort_order: 0,
    created_by: user.id,
    published_at: new Date().toISOString(),
  }));

  const { data, error } = await admin
    .from("automation_glossary")
    .upsert(rows, { onConflict: "id", ignoreDuplicates: true })
    .select("id");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const inserted = data?.length ?? 0;
  const skipped = PILOT_COUNT - inserted;
  return NextResponse.json({ inserted, skipped, total: PILOT_COUNT });
}
