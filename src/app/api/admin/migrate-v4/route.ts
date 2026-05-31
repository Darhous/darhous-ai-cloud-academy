// ⚠️ TEMPORARY — DELETE AFTER USE — protected by x-migration-secret
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const SECRET = "drhsV4B-2a7f91c3e5d84b60f2a8c1e3d5f7b9";
const PROJECT_REF = "kzbdmyovspkbakbtvgig";

const SQL = `
CREATE TABLE IF NOT EXISTS language_results (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score            NUMERIC(5,2) NOT NULL DEFAULT 0,
  level            TEXT         NOT NULL DEFAULT 'A1A',
  time_taken       INTEGER      NOT NULL DEFAULT 0,
  stages_completed INTEGER      NOT NULL DEFAULT 0,
  is_incomplete    BOOLEAN      NOT NULL DEFAULT false,
  breakdown        JSONB        NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_language_results_user_id ON language_results(user_id);
CREATE INDEX IF NOT EXISTS idx_language_results_created_at ON language_results(created_at DESC);
ALTER TABLE language_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own language results" ON language_results;
DROP POLICY IF EXISTS "Users insert own language results" ON language_results;
CREATE POLICY "Users read own language results" ON language_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own language results" ON language_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE TABLE IF NOT EXISTS digital_exam_results (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject       TEXT         NOT NULL,
  subject_label TEXT         NOT NULL,
  score         INTEGER      NOT NULL DEFAULT 0,
  total         INTEGER      NOT NULL DEFAULT 20,
  percentage    NUMERIC(5,2) NOT NULL DEFAULT 0,
  passed        BOOLEAN      NOT NULL DEFAULT false,
  time_taken    INTEGER      NOT NULL DEFAULT 0,
  answers       JSONB        NOT NULL DEFAULT '[]',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_digital_exam_results_user_id ON digital_exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_exam_results_subject ON digital_exam_results(subject);
CREATE INDEX IF NOT EXISTS idx_digital_exam_results_created_at ON digital_exam_results(created_at DESC);
ALTER TABLE digital_exam_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own exam results" ON digital_exam_results;
DROP POLICY IF EXISTS "Users insert own exam results" ON digital_exam_results;
CREATE POLICY "Users read own exam results" ON digital_exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own exam results" ON digital_exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

async function tryMgmtApi(serviceRoleKey: string): Promise<{ ok: boolean; status: number; msg: string }> {
  try {
    const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: SQL }),
    });
    const body = await res.json().catch(() => ({})) as Record<string, unknown>;
    const msg = typeof body.message === "string" ? body.message : JSON.stringify(body).slice(0, 300);
    return { ok: res.ok, status: res.status, msg };
  } catch (err) {
    return { ok: false, status: 0, msg: err instanceof Error ? err.message : "fetch error" };
  }
}

async function tryPgRest(supabaseUrl: string, serviceRoleKey: string): Promise<{ ok: boolean; status: number; msg: string }> {
  // Try Supabase REST admin SQL endpoint (some versions expose this)
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
      method: "POST",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        "Prefer": "params=single-object",
      },
      body: JSON.stringify({ query: SQL }),
    });
    return { ok: res.ok, status: res.status, msg: `PostgREST /rpc/: ${res.status}` };
  } catch (err) {
    return { ok: false, status: 0, msg: err instanceof Error ? err.message : "fetch error" };
  }
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-migration-secret");
  if (!secret || secret !== SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  // Try all available SQL execution methods in order
  const mgmt = await tryMgmtApi(serviceRoleKey);
  const pgRest = mgmt.ok ? { ok: false, status: 0, msg: "skipped — mgmt already succeeded" } : await tryPgRest(supabaseUrl, serviceRoleKey);

  // Always verify table existence via admin client (bypasses RLS)
  const admin = createAdminClient();
  let langExists = false;
  let examExists = false;

  if (admin) {
    const [lr, er] = await Promise.all([
      admin.from("language_results").select("id").limit(0),
      admin.from("digital_exam_results").select("id").limit(0),
    ]);
    langExists = !lr.error;
    examExists = !er.error;
  }

  return NextResponse.json({
    mgmtApi: { ok: mgmt.ok, status: mgmt.status, msg: mgmt.msg },
    pgRest: { ok: pgRest.ok, status: pgRest.status, msg: pgRest.msg },
    tables: { language_results: langExists, digital_exam_results: examExists },
    success: langExists && examExists,
  });
}
