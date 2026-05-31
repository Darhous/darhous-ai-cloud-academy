// ⚠️ TEMPORARY MIGRATION ROUTE — DELETE AFTER SUCCESSFUL VERIFICATION
// Protected by x-migration-secret header. Never expose the secret.
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const SECRET = "drhsV4Mig-9c3f72a1b8e045d6f2c9a3b7e1d4f8";

const MIGRATION_SQL = `
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

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-migration-secret");
  if (!secret || secret !== SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  // Attempt SQL execution via pg_meta (Supabase internal SQL API)
  let execOk = false;
  let execStatus = 0;
  let execMessage = "not attempted";

  try {
    const res = await fetch(`${supabaseUrl}/pg_meta/v1/query`, {
      method: "POST",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: MIGRATION_SQL }),
    });
    execStatus = res.status;
    if (res.ok) {
      execOk = true;
      execMessage = "pg_meta executed successfully";
    } else {
      const body = await res.json().catch(() => ({})) as Record<string, unknown>;
      execMessage = `pg_meta returned ${res.status}: ${typeof body.message === "string" ? body.message : JSON.stringify(body).slice(0, 200)}`;
    }
  } catch (err) {
    execMessage = `pg_meta fetch error: ${err instanceof Error ? err.message : "unknown"}`;
  }

  // Verify table existence via admin client (bypasses RLS)
  const admin = createAdminClient();
  const langOk = admin
    ? !((await admin.from("language_results").select("id").limit(0)).error)
    : false;
  const examOk = admin
    ? !((await admin.from("digital_exam_results").select("id").limit(0)).error)
    : false;

  return NextResponse.json({
    exec: { ok: execOk, status: execStatus, message: execMessage },
    tables: {
      language_results: langOk,
      digital_exam_results: examOk,
    },
    migrationNeeded: !langOk || !examOk,
  });
}
