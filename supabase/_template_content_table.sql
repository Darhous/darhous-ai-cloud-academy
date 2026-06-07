-- ══════════════════════════════════════════════════════════════════
-- TEMPLATE — Content table (uniform skeleton)
-- Run in: Supabase Dashboard → SQL Editor
--
-- HOW TO USE:
--   1. Copy this file to supabase/vNN_<table_name>.sql
--   2. Replace every {{TABLE_NAME}} with the real table name,
--      e.g. ai_glossary, automation_workflows, iot_lessons
--   3. Delete columns you don't need / add type-specific real columns
--      (everything else stays inside the `data jsonb` column)
--   4. Run in Supabase Dashboard → SQL Editor
--
-- This mirrors the proven structure of v14_nano_banana_custom_prompts.sql
-- and v18_blog_posts.sql, generalized into a reusable skeleton:
--   id / slug, status, featured, sort_order, category, title_ar/en, tags,
--   body_ar/en (optional prose), data jsonb (the rest of the typed object),
--   created_by + audit timestamps + lifecycle timestamps.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS {{TABLE_NAME}} (
  id            TEXT        PRIMARY KEY,                 -- = existing slug; keeps relatedX cross-refs intact
  portal_id     TEXT        NOT NULL,
  content_type  TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  category      TEXT        NOT NULL DEFAULT '',
  title_ar      TEXT        NOT NULL,
  title_en      TEXT        NOT NULL DEFAULT '',
  tags          TEXT[]      NOT NULL DEFAULT '{}',
  body_ar       TEXT,                                    -- nullable: only prose types (article/lesson) use this
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{}'::jsonb,-- the rest of the typed object (1:1 with the TS interface)
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_{{TABLE_NAME}}_status   ON {{TABLE_NAME}} (status);
CREATE INDEX IF NOT EXISTS idx_{{TABLE_NAME}}_category ON {{TABLE_NAME}} (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_{{TABLE_NAME}}_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_{{TABLE_NAME}}_updated_at ON {{TABLE_NAME}};
CREATE TRIGGER trg_{{TABLE_NAME}}_updated_at
  BEFORE UPDATE ON {{TABLE_NAME}}
  FOR EACH ROW EXECUTE FUNCTION update_{{TABLE_NAME}}_updated_at();

-- 3. RLS
ALTER TABLE {{TABLE_NAME}} ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_{{TABLE_NAME}}" ON {{TABLE_NAME}};
CREATE POLICY "public_read_published_{{TABLE_NAME}}"
  ON {{TABLE_NAME}} FOR SELECT
  USING (status = 'published');

-- Admins can manage everything (matches nano_banana_custom_prompts policy)
DROP POLICY IF EXISTS "admin_manage_{{TABLE_NAME}}" ON {{TABLE_NAME}};
CREATE POLICY "admin_manage_{{TABLE_NAME}}"
  ON {{TABLE_NAME}} FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Service role (API routes using createAdminClient) bypasses RLS entirely —
-- application code is responsible for verifying admin role before writes.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — INSERT existing static content here (status='published',
--    SAME ids as the static array) so the DB holds the full set and
--    the page renders identically to before migration.
-- ══════════════════════════════════════════════════════════════════
-- INSERT INTO {{TABLE_NAME}} (id, portal_id, content_type, status, featured,
--   sort_order, category, title_ar, title_en, tags, body_ar, body_en, data, published_at)
-- VALUES (...);
