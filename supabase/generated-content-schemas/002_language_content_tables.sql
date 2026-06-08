-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: language_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS language_resources (
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

CREATE INDEX IF NOT EXISTS idx_language_resources_status   ON language_resources (status);
CREATE INDEX IF NOT EXISTS idx_language_resources_category ON language_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_language_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_language_resources_updated_at ON language_resources;
CREATE TRIGGER trg_language_resources_updated_at
  BEFORE UPDATE ON language_resources
  FOR EACH ROW EXECUTE FUNCTION update_language_resources_updated_at();

-- 3. RLS
ALTER TABLE language_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_language_resources" ON language_resources;
CREATE POLICY "public_read_published_language_resources"
  ON language_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_language_resources" ON language_resources;
CREATE POLICY "admin_manage_language_resources"
  ON language_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: language_lessons
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS language_lessons (
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

CREATE INDEX IF NOT EXISTS idx_language_lessons_status   ON language_lessons (status);
CREATE INDEX IF NOT EXISTS idx_language_lessons_category ON language_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_language_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_language_lessons_updated_at ON language_lessons;
CREATE TRIGGER trg_language_lessons_updated_at
  BEFORE UPDATE ON language_lessons
  FOR EACH ROW EXECUTE FUNCTION update_language_lessons_updated_at();

-- 3. RLS
ALTER TABLE language_lessons ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_language_lessons" ON language_lessons;
CREATE POLICY "public_read_published_language_lessons"
  ON language_lessons FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_language_lessons" ON language_lessons;
CREATE POLICY "admin_manage_language_lessons"
  ON language_lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: language_prompts
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS language_prompts (
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

CREATE INDEX IF NOT EXISTS idx_language_prompts_status   ON language_prompts (status);
CREATE INDEX IF NOT EXISTS idx_language_prompts_category ON language_prompts (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_language_prompts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_language_prompts_updated_at ON language_prompts;
CREATE TRIGGER trg_language_prompts_updated_at
  BEFORE UPDATE ON language_prompts
  FOR EACH ROW EXECUTE FUNCTION update_language_prompts_updated_at();

-- 3. RLS
ALTER TABLE language_prompts ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_language_prompts" ON language_prompts;
CREATE POLICY "public_read_published_language_prompts"
  ON language_prompts FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_language_prompts" ON language_prompts;
CREATE POLICY "admin_manage_language_prompts"
  ON language_prompts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: language_glossary
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS language_glossary (
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

CREATE INDEX IF NOT EXISTS idx_language_glossary_status   ON language_glossary (status);
CREATE INDEX IF NOT EXISTS idx_language_glossary_category ON language_glossary (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_language_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_language_glossary_updated_at ON language_glossary;
CREATE TRIGGER trg_language_glossary_updated_at
  BEFORE UPDATE ON language_glossary
  FOR EACH ROW EXECUTE FUNCTION update_language_glossary_updated_at();

-- 3. RLS
ALTER TABLE language_glossary ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_language_glossary" ON language_glossary;
CREATE POLICY "public_read_published_language_glossary"
  ON language_glossary FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_language_glossary" ON language_glossary;
CREATE POLICY "admin_manage_language_glossary"
  ON language_glossary FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


