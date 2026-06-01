import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// One-time migration route — will be deleted after use
const MIGRATE_SECRET = "darhous-migrate-2026";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== MIGRATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createAdminClient();
  if (!adminClient) {
    return NextResponse.json({ error: "Admin client not configured" }, { status: 503 });
  }

  const results: Record<string, unknown> = {};

  // ── 1. Confirm email for ahmeddarhous@gmail.com ───────────────
  try {
    const { data: { users }, error: listErr } = await adminClient.auth.admin.listUsers({
      page: 1, perPage: 1000,
    });
    if (listErr) throw listErr;

    const target = users.find((u) => u.email === "ahmeddarhous@gmail.com");
    if (!target) {
      results.email_confirm = { status: "not_found", message: "User not found" };
    } else {
      const { data: updated, error: updateErr } = await adminClient.auth.admin.updateUserById(
        target.id,
        { email_confirm: true }
      );
      if (updateErr) throw updateErr;
      results.email_confirm = {
        status: "success",
        email: updated.user.email,
        email_confirmed_at: updated.user.email_confirmed_at,
        id: updated.user.id,
      };
    }
  } catch (e) {
    results.email_confirm = { status: "error", message: String(e) };
  }

  // ── 2. Promote user to admin role in profiles table ───────────
  try {
    const confirmResult = results.email_confirm as { id?: string };
    if (confirmResult?.id) {
      const { error: promoteErr } = await adminClient
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", confirmResult.id);
      results.promote_admin = promoteErr
        ? { status: "error", message: promoteErr.message }
        : { status: "success", message: "Role set to admin" };
    } else {
      // Try finding by email in profiles
      const { data: profile } = await adminClient
        .from("profiles")
        .select("id, role")
        .eq("email", "ahmeddarhous@gmail.com")
        .single();
      if (profile) {
        await adminClient.from("profiles").update({ role: "admin" }).eq("id", profile.id);
        results.promote_admin = { status: "success", message: `Role updated for id: ${profile.id}` };
      } else {
        results.promote_admin = { status: "skipped", message: "Profile not found by email" };
      }
    }
  } catch (e) {
    results.promote_admin = { status: "error", message: String(e) };
  }

  // ── 3. Check if v7 tables exist ───────────────────────────────
  const tables = ["admin_site_settings", "ai_mentor_settings_store", "feature_flags_store"];
  results.v7_tables = {};
  for (const table of tables) {
    const { error } = await adminClient.from(table).select("id").limit(1);
    (results.v7_tables as Record<string, string>)[table] = error
      ? `❌ NOT FOUND — run supabase/v7_admin_settings_schema.sql`
      : "✅ EXISTS";
  }

  return NextResponse.json({ success: true, results }, { status: 200 });
}
