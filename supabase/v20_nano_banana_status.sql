-- ══════════════════════════════════════════════════════════════════
-- v20 — Nano Banana: add status column for archive/draft support
-- Run in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- Add status column (safe to re-run: IF NOT EXISTS)
ALTER TABLE nano_banana_custom_prompts
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';

-- Ensure existing rows are published
UPDATE nano_banana_custom_prompts
  SET status = 'published'
  WHERE status IS NULL OR status = '';

-- Add check constraint for valid values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'nano_banana_custom_prompts'
    AND constraint_name = 'nano_banana_custom_prompts_status_check'
  ) THEN
    ALTER TABLE nano_banana_custom_prompts
      ADD CONSTRAINT nano_banana_custom_prompts_status_check
      CHECK (status IN ('published', 'archived', 'draft'));
  END IF;
END $$;
