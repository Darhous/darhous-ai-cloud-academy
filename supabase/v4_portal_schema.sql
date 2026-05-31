-- ============================================================
-- v4 Portal Integration Schema  (idempotent — safe to re-run)
-- Run in Supabase Dashboard → SQL Editor
-- Project: kzbdmyovspkbakbtvgig
-- ============================================================

-- ── Language Assessment Results ──────────────────────────────
CREATE TABLE IF NOT EXISTS language_results (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score            NUMERIC(5,2) NOT NULL DEFAULT 0,
  level            TEXT         NOT NULL DEFAULT 'A1A',
  time_taken       INTEGER      NOT NULL DEFAULT 0,   -- seconds
  stages_completed INTEGER      NOT NULL DEFAULT 0,
  is_incomplete    BOOLEAN      NOT NULL DEFAULT false,
  breakdown        JSONB        NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_language_results_user_id
  ON language_results(user_id);

CREATE INDEX IF NOT EXISTS idx_language_results_created_at
  ON language_results(created_at DESC);

ALTER TABLE language_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own language results"   ON language_results;
DROP POLICY IF EXISTS "Users insert own language results" ON language_results;

CREATE POLICY "Users read own language results"
  ON language_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own language results"
  ON language_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── Digital Exam Results ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS digital_exam_results (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject       TEXT         NOT NULL,
  subject_label TEXT         NOT NULL,
  score         INTEGER      NOT NULL DEFAULT 0,
  total         INTEGER      NOT NULL DEFAULT 20,
  percentage    NUMERIC(5,2) NOT NULL DEFAULT 0,
  passed        BOOLEAN      NOT NULL DEFAULT false,
  time_taken    INTEGER      NOT NULL DEFAULT 0,   -- seconds
  answers       JSONB        NOT NULL DEFAULT '[]',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_digital_exam_results_user_id
  ON digital_exam_results(user_id);

CREATE INDEX IF NOT EXISTS idx_digital_exam_results_subject
  ON digital_exam_results(subject);

CREATE INDEX IF NOT EXISTS idx_digital_exam_results_created_at
  ON digital_exam_results(created_at DESC);

ALTER TABLE digital_exam_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own exam results"   ON digital_exam_results;
DROP POLICY IF EXISTS "Users insert own exam results" ON digital_exam_results;

CREATE POLICY "Users read own exam results"
  ON digital_exam_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own exam results"
  ON digital_exam_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
