-- ============================================================
-- v4 Portal Integration Schema
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- Language Assessment Results
CREATE TABLE IF NOT EXISTS language_results (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score        NUMERIC(5,2) NOT NULL DEFAULT 0,
  level        TEXT        NOT NULL DEFAULT 'A1A',
  time_taken   INTEGER     NOT NULL DEFAULT 0, -- seconds
  stages_completed INTEGER NOT NULL DEFAULT 0,
  is_incomplete BOOLEAN    NOT NULL DEFAULT false,
  breakdown    JSONB       NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE language_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own language results"
  ON language_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own language results"
  ON language_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Digital Exam Results
CREATE TABLE IF NOT EXISTS digital_exam_results (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject      TEXT        NOT NULL,
  subject_label TEXT       NOT NULL,
  score        INTEGER     NOT NULL DEFAULT 0,
  total        INTEGER     NOT NULL DEFAULT 20,
  percentage   NUMERIC(5,2) NOT NULL DEFAULT 0,
  passed       BOOLEAN     NOT NULL DEFAULT false,
  time_taken   INTEGER     NOT NULL DEFAULT 0, -- seconds
  answers      JSONB       NOT NULL DEFAULT '[]',
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE digital_exam_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own exam results"
  ON digital_exam_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own exam results"
  ON digital_exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);
