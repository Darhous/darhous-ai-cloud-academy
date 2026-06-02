-- ============================================================
-- v9 Automation Progress Schema  (idempotent — safe to re-run)
-- Run in Supabase Dashboard → SQL Editor
-- Project: kzbdmyovspkbakbtvgig
-- ============================================================

-- ── automation_saved_recipes ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.automation_saved_recipes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipe_id   TEXT        NOT NULL,
  saved_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, recipe_id)
);

CREATE INDEX IF NOT EXISTS idx_automation_saved_recipes_user
  ON public.automation_saved_recipes(user_id);

ALTER TABLE public.automation_saved_recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own saved recipes select" ON public.automation_saved_recipes;
DROP POLICY IF EXISTS "Own saved recipes insert" ON public.automation_saved_recipes;
DROP POLICY IF EXISTS "Own saved recipes delete" ON public.automation_saved_recipes;

CREATE POLICY "Own saved recipes select"
  ON public.automation_saved_recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Own saved recipes insert"
  ON public.automation_saved_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own saved recipes delete"
  ON public.automation_saved_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- ── automation_lab_progress ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.automation_lab_progress (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lab_id          TEXT        NOT NULL,
  checked_items   JSONB       NOT NULL DEFAULT '[]',
  completed       BOOLEAN     NOT NULL DEFAULT false,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, lab_id)
);

CREATE INDEX IF NOT EXISTS idx_automation_lab_progress_user
  ON public.automation_lab_progress(user_id);

ALTER TABLE public.automation_lab_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own lab progress select" ON public.automation_lab_progress;
DROP POLICY IF EXISTS "Own lab progress upsert" ON public.automation_lab_progress;

CREATE POLICY "Own lab progress select"
  ON public.automation_lab_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Own lab progress upsert"
  ON public.automation_lab_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own lab progress update"
  ON public.automation_lab_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ── automation_recipe_checklist_progress ─────────────────────
-- Tracks interactive testing checklist per workflow template
CREATE TABLE IF NOT EXISTS public.automation_recipe_checklist (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipe_id       TEXT        NOT NULL,
  checked_items   JSONB       NOT NULL DEFAULT '[]',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, recipe_id)
);

CREATE INDEX IF NOT EXISTS idx_automation_recipe_checklist_user
  ON public.automation_recipe_checklist(user_id);

ALTER TABLE public.automation_recipe_checklist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own recipe checklist select" ON public.automation_recipe_checklist;
DROP POLICY IF EXISTS "Own recipe checklist insert" ON public.automation_recipe_checklist;
DROP POLICY IF EXISTS "Own recipe checklist update" ON public.automation_recipe_checklist;

CREATE POLICY "Own recipe checklist select"
  ON public.automation_recipe_checklist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Own recipe checklist insert"
  ON public.automation_recipe_checklist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own recipe checklist update"
  ON public.automation_recipe_checklist FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- END v9 Automation Progress
-- ============================================================
