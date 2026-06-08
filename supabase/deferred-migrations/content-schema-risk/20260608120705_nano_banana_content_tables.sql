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
-- Table: nano_banana_lessons
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS nano_banana_lessons (
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

CREATE INDEX IF NOT EXISTS idx_nano_banana_lessons_status   ON nano_banana_lessons (status);
CREATE INDEX IF NOT EXISTS idx_nano_banana_lessons_category ON nano_banana_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_nano_banana_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_nano_banana_lessons_updated_at ON nano_banana_lessons;
CREATE TRIGGER trg_nano_banana_lessons_updated_at
  BEFORE UPDATE ON nano_banana_lessons
  FOR EACH ROW EXECUTE FUNCTION update_nano_banana_lessons_updated_at();

-- 3. RLS
ALTER TABLE nano_banana_lessons ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_nano_banana_lessons" ON nano_banana_lessons;
CREATE POLICY "public_read_published_nano_banana_lessons"
  ON nano_banana_lessons FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_nano_banana_lessons" ON nano_banana_lessons;
CREATE POLICY "admin_manage_nano_banana_lessons"
  ON nano_banana_lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: nano_banana_glossary
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS nano_banana_glossary (
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

CREATE INDEX IF NOT EXISTS idx_nano_banana_glossary_status   ON nano_banana_glossary (status);
CREATE INDEX IF NOT EXISTS idx_nano_banana_glossary_category ON nano_banana_glossary (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_nano_banana_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_nano_banana_glossary_updated_at ON nano_banana_glossary;
CREATE TRIGGER trg_nano_banana_glossary_updated_at
  BEFORE UPDATE ON nano_banana_glossary
  FOR EACH ROW EXECUTE FUNCTION update_nano_banana_glossary_updated_at();

-- 3. RLS
ALTER TABLE nano_banana_glossary ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_nano_banana_glossary" ON nano_banana_glossary;
CREATE POLICY "public_read_published_nano_banana_glossary"
  ON nano_banana_glossary FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_nano_banana_glossary" ON nano_banana_glossary;
CREATE POLICY "admin_manage_nano_banana_glossary"
  ON nano_banana_glossary FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: nano_banana_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS nano_banana_resources (
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

CREATE INDEX IF NOT EXISTS idx_nano_banana_resources_status   ON nano_banana_resources (status);
CREATE INDEX IF NOT EXISTS idx_nano_banana_resources_category ON nano_banana_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_nano_banana_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_nano_banana_resources_updated_at ON nano_banana_resources;
CREATE TRIGGER trg_nano_banana_resources_updated_at
  BEFORE UPDATE ON nano_banana_resources
  FOR EACH ROW EXECUTE FUNCTION update_nano_banana_resources_updated_at();

-- 3. RLS
ALTER TABLE nano_banana_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_nano_banana_resources" ON nano_banana_resources;
CREATE POLICY "public_read_published_nano_banana_resources"
  ON nano_banana_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_nano_banana_resources" ON nano_banana_resources;
CREATE POLICY "admin_manage_nano_banana_resources"
  ON nano_banana_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


