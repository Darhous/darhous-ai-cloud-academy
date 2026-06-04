-- ══════════════════════════════════════════════════════════════════
-- v19 — AI Usage Quota (shared rate-limit store across Vercel instances)
-- Run in: Supabase Dashboard → SQL Editor
--
-- Tracks daily AI API call counts per user and globally.
-- user_id = auth UUID string for real users
-- user_id = 'global' for the platform-wide kill-switch counter
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ai_usage (
  user_id    TEXT NOT NULL,
  date_utc   DATE NOT NULL DEFAULT CURRENT_DATE,
  call_count INT  NOT NULL DEFAULT 0,
  CONSTRAINT ai_usage_pkey PRIMARY KEY (user_id, date_utc),
  CONSTRAINT ai_usage_count_positive CHECK (call_count >= 0)
);

-- 2. RLS
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
DROP POLICY IF EXISTS "user_read_own_ai_usage" ON ai_usage;
CREATE POLICY "user_read_own_ai_usage"
  ON ai_usage FOR SELECT
  USING (auth.uid()::text = user_id);

-- Only service role writes (API verifies auth then increments via admin client)
-- No INSERT/UPDATE/DELETE policy — service_role bypasses RLS.

-- 3. Index for fast daily lookups
CREATE INDEX IF NOT EXISTS ai_usage_date_idx ON ai_usage (date_utc);

-- 4. Optional: auto-prune rows older than 30 days (manual maintenance)
-- Run periodically: DELETE FROM ai_usage WHERE date_utc < CURRENT_DATE - 30;
