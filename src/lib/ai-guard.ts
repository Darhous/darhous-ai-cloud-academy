/**
 * ai-guard.ts — Auth + shared quota enforcement for AI routes.
 *
 * Call at the top of every AI route handler:
 *   const guard = await aiGuard(req);
 *   if (guard instanceof NextResponse) return guard;
 *
 * Returns { userId } on success, or a NextResponse on failure (401/429/503).
 *
 * Limits (configurable via env vars):
 *   AI_USER_DAILY_LIMIT  — max AI calls per authenticated user per UTC day (default 50)
 *   AI_GLOBAL_DAILY_LIMIT — platform-wide kill-switch per UTC day (default 1000)
 */
import "server-only";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const USER_DAILY_LIMIT  = Number(process.env.AI_USER_DAILY_LIMIT   ?? "50");
const GLOBAL_DAILY_LIMIT = Number(process.env.AI_GLOBAL_DAILY_LIMIT ?? "1000");
const GLOBAL_KEY = "global";

type GuardSuccess = { userId: string };

export async function aiGuard(_req: Request): Promise<GuardSuccess | NextResponse> {
  // ── 1. Auth ────────────────────────────────────────────────────────────────
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      {
        error: "يجب تسجيل الدخول لاستخدام ميزات الذكاء الاصطناعي. Sign in required to use AI features.",
        code: "AUTH_REQUIRED",
      },
      { status: 401 },
    );
  }

  // ── 2. Quota check (Supabase-backed, shared across all Vercel instances) ───
  const admin = createAdminClient();
  if (!admin) {
    // Supabase not configured → allow (graceful degradation)
    return { userId: user.id };
  }

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  // Read both rows in parallel
  const [globalRes, userRes] = await Promise.all([
    admin.from("ai_usage").select("call_count").eq("user_id", GLOBAL_KEY).eq("date_utc", today).single(),
    admin.from("ai_usage").select("call_count").eq("user_id", user.id).eq("date_utc", today).single(),
  ]);

  const globalCount = (globalRes.data?.call_count as number | null) ?? 0;
  const userCount   = (userRes.data?.call_count   as number | null) ?? 0;

  // Global kill-switch
  if (globalCount >= GLOBAL_DAILY_LIMIT) {
    return NextResponse.json(
      {
        error: "الخدمة وصلت لحدّها اليومي. حاول مجدداً غداً. / AI service daily capacity reached. Please try again tomorrow.",
        code: "GLOBAL_QUOTA_EXCEEDED",
        resetAt: "midnight UTC",
      },
      { status: 429 },
    );
  }

  // Per-user daily quota
  if (userCount >= USER_DAILY_LIMIT) {
    return NextResponse.json(
      {
        error: `وصلت لحدّك اليومي (${USER_DAILY_LIMIT} طلب). حاول غداً. / Daily limit reached (${USER_DAILY_LIMIT} requests). Try again tomorrow.`,
        code: "USER_QUOTA_EXCEEDED",
        used: userCount,
        limit: USER_DAILY_LIMIT,
        resetAt: "midnight UTC",
      },
      { status: 429 },
    );
  }

  // ── 3. Increment both counters (best-effort upsert, no transaction needed) ─
  await Promise.all([
    admin.from("ai_usage").upsert(
      { user_id: user.id,   date_utc: today, call_count: userCount   + 1 },
      { onConflict: "user_id,date_utc" },
    ),
    admin.from("ai_usage").upsert(
      { user_id: GLOBAL_KEY, date_utc: today, call_count: globalCount + 1 },
      { onConflict: "user_id,date_utc" },
    ),
  ]);

  return { userId: user.id };
}
