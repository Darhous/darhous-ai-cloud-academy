-- ══════════════════════════════════════════════════════════════════
-- MIGRATION PACKAGE
-- generated from supabase/generated-content-schemas/
-- reviewed as planning artifacts
-- not yet executed in this station
-- no data insert included
-- tools-hub and nano-banana still require app/product decisions before live use
-- ══════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: digital_exams_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS digital_exams_resources (
  id            TEXT        PRIMARY KEY,                 
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
  body_ar       TEXT,                                    
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_digital_exams_resources_status   ON digital_exams_resources (status);
CREATE INDEX IF NOT EXISTS idx_digital_exams_resources_category ON digital_exams_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_digital_exams_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_digital_exams_resources_updated_at ON digital_exams_resources;
CREATE TRIGGER trg_digital_exams_resources_updated_at
  BEFORE UPDATE ON digital_exams_resources
  FOR EACH ROW EXECUTE FUNCTION update_digital_exams_resources_updated_at();

-- 3. RLS
ALTER TABLE digital_exams_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_digital_exams_resources" ON digital_exams_resources;
CREATE POLICY "public_read_published_digital_exams_resources"
  ON digital_exams_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_digital_exams_resources" ON digital_exams_resources;
CREATE POLICY "admin_manage_digital_exams_resources"
  ON digital_exams_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: digital_exams_prompts
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS digital_exams_prompts (
  id            TEXT        PRIMARY KEY,                 
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
  body_ar       TEXT,                                    
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_digital_exams_prompts_status   ON digital_exams_prompts (status);
CREATE INDEX IF NOT EXISTS idx_digital_exams_prompts_category ON digital_exams_prompts (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_digital_exams_prompts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_digital_exams_prompts_updated_at ON digital_exams_prompts;
CREATE TRIGGER trg_digital_exams_prompts_updated_at
  BEFORE UPDATE ON digital_exams_prompts
  FOR EACH ROW EXECUTE FUNCTION update_digital_exams_prompts_updated_at();

-- 3. RLS
ALTER TABLE digital_exams_prompts ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_digital_exams_prompts" ON digital_exams_prompts;
CREATE POLICY "public_read_published_digital_exams_prompts"
  ON digital_exams_prompts FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_digital_exams_prompts" ON digital_exams_prompts;
CREATE POLICY "admin_manage_digital_exams_prompts"
  ON digital_exams_prompts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: digital_exams_glossary
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS digital_exams_glossary (
  id            TEXT        PRIMARY KEY,                 
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
  body_ar       TEXT,                                    
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_digital_exams_glossary_status   ON digital_exams_glossary (status);
CREATE INDEX IF NOT EXISTS idx_digital_exams_glossary_category ON digital_exams_glossary (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_digital_exams_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_digital_exams_glossary_updated_at ON digital_exams_glossary;
CREATE TRIGGER trg_digital_exams_glossary_updated_at
  BEFORE UPDATE ON digital_exams_glossary
  FOR EACH ROW EXECUTE FUNCTION update_digital_exams_glossary_updated_at();

-- 3. RLS
ALTER TABLE digital_exams_glossary ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_digital_exams_glossary" ON digital_exams_glossary;
CREATE POLICY "public_read_published_digital_exams_glossary"
  ON digital_exams_glossary FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_digital_exams_glossary" ON digital_exams_glossary;
CREATE POLICY "admin_manage_digital_exams_glossary"
  ON digital_exams_glossary FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: digital_exams_lessons
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS digital_exams_lessons (
  id            TEXT        PRIMARY KEY,                 
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
  body_ar       TEXT,                                    
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_digital_exams_lessons_status   ON digital_exams_lessons (status);
CREATE INDEX IF NOT EXISTS idx_digital_exams_lessons_category ON digital_exams_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_digital_exams_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_digital_exams_lessons_updated_at ON digital_exams_lessons;
CREATE TRIGGER trg_digital_exams_lessons_updated_at
  BEFORE UPDATE ON digital_exams_lessons
  FOR EACH ROW EXECUTE FUNCTION update_digital_exams_lessons_updated_at();

-- 3. RLS
ALTER TABLE digital_exams_lessons ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_digital_exams_lessons" ON digital_exams_lessons;
CREATE POLICY "public_read_published_digital_exams_lessons"
  ON digital_exams_lessons FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_digital_exams_lessons" ON digital_exams_lessons;
CREATE POLICY "admin_manage_digital_exams_lessons"
  ON digital_exams_lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


