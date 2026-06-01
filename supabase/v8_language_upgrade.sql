-- v8.0 Language Results Upgrade
-- Run in Supabase SQL Editor (additive only — no existing data destroyed)

ALTER TABLE language_results
  ADD COLUMN IF NOT EXISTS flags_count    INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wrong_answers  JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS feedback       JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS certificate_id TEXT;

-- Index for fast certificate verification lookups
CREATE INDEX IF NOT EXISTS idx_language_results_certificate_id
  ON language_results (certificate_id)
  WHERE certificate_id IS NOT NULL;

-- Back-fill existing rows with safe defaults (already handled by DEFAULT above)
-- No data migration needed.
