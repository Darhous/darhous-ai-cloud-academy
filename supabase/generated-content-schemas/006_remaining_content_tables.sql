-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: ai_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS ai_resources (
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

CREATE INDEX IF NOT EXISTS idx_ai_resources_status   ON ai_resources (status);
CREATE INDEX IF NOT EXISTS idx_ai_resources_category ON ai_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_ai_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_ai_resources_updated_at ON ai_resources;
CREATE TRIGGER trg_ai_resources_updated_at
  BEFORE UPDATE ON ai_resources
  FOR EACH ROW EXECUTE FUNCTION update_ai_resources_updated_at();

-- 3. RLS
ALTER TABLE ai_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_ai_resources" ON ai_resources;
CREATE POLICY "public_read_published_ai_resources"
  ON ai_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_ai_resources" ON ai_resources;
CREATE POLICY "admin_manage_ai_resources"
  ON ai_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: ai_lessons
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS ai_lessons (
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

CREATE INDEX IF NOT EXISTS idx_ai_lessons_status   ON ai_lessons (status);
CREATE INDEX IF NOT EXISTS idx_ai_lessons_category ON ai_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_ai_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_ai_lessons_updated_at ON ai_lessons;
CREATE TRIGGER trg_ai_lessons_updated_at
  BEFORE UPDATE ON ai_lessons
  FOR EACH ROW EXECUTE FUNCTION update_ai_lessons_updated_at();

-- 3. RLS
ALTER TABLE ai_lessons ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_ai_lessons" ON ai_lessons;
CREATE POLICY "public_read_published_ai_lessons"
  ON ai_lessons FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_ai_lessons" ON ai_lessons;
CREATE POLICY "admin_manage_ai_lessons"
  ON ai_lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: automation_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_resources (
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

CREATE INDEX IF NOT EXISTS idx_automation_resources_status   ON automation_resources (status);
CREATE INDEX IF NOT EXISTS idx_automation_resources_category ON automation_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_resources_updated_at ON automation_resources;
CREATE TRIGGER trg_automation_resources_updated_at
  BEFORE UPDATE ON automation_resources
  FOR EACH ROW EXECUTE FUNCTION update_automation_resources_updated_at();

-- 3. RLS
ALTER TABLE automation_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_automation_resources" ON automation_resources;
CREATE POLICY "public_read_published_automation_resources"
  ON automation_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_automation_resources" ON automation_resources;
CREATE POLICY "admin_manage_automation_resources"
  ON automation_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: iot_glossary
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_glossary (
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

CREATE INDEX IF NOT EXISTS idx_iot_glossary_status   ON iot_glossary (status);
CREATE INDEX IF NOT EXISTS idx_iot_glossary_category ON iot_glossary (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_glossary_updated_at ON iot_glossary;
CREATE TRIGGER trg_iot_glossary_updated_at
  BEFORE UPDATE ON iot_glossary
  FOR EACH ROW EXECUTE FUNCTION update_iot_glossary_updated_at();

-- 3. RLS
ALTER TABLE iot_glossary ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_iot_glossary" ON iot_glossary;
CREATE POLICY "public_read_published_iot_glossary"
  ON iot_glossary FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_iot_glossary" ON iot_glossary;
CREATE POLICY "admin_manage_iot_glossary"
  ON iot_glossary FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: iot_resources
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_resources (
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

CREATE INDEX IF NOT EXISTS idx_iot_resources_status   ON iot_resources (status);
CREATE INDEX IF NOT EXISTS idx_iot_resources_category ON iot_resources (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_resources_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_resources_updated_at ON iot_resources;
CREATE TRIGGER trg_iot_resources_updated_at
  BEFORE UPDATE ON iot_resources
  FOR EACH ROW EXECUTE FUNCTION update_iot_resources_updated_at();

-- 3. RLS
ALTER TABLE iot_resources ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_iot_resources" ON iot_resources;
CREATE POLICY "public_read_published_iot_resources"
  ON iot_resources FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_iot_resources" ON iot_resources;
CREATE POLICY "admin_manage_iot_resources"
  ON iot_resources FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: iot_prompts
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_prompts (
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

CREATE INDEX IF NOT EXISTS idx_iot_prompts_status   ON iot_prompts (status);
CREATE INDEX IF NOT EXISTS idx_iot_prompts_category ON iot_prompts (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_prompts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_prompts_updated_at ON iot_prompts;
CREATE TRIGGER trg_iot_prompts_updated_at
  BEFORE UPDATE ON iot_prompts
  FOR EACH ROW EXECUTE FUNCTION update_iot_prompts_updated_at();

-- 3. RLS
ALTER TABLE iot_prompts ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_iot_prompts" ON iot_prompts;
CREATE POLICY "public_read_published_iot_prompts"
  ON iot_prompts FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_iot_prompts" ON iot_prompts;
CREATE POLICY "admin_manage_iot_prompts"
  ON iot_prompts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: automation_lessons
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_lessons (
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

CREATE INDEX IF NOT EXISTS idx_automation_lessons_status   ON automation_lessons (status);
CREATE INDEX IF NOT EXISTS idx_automation_lessons_category ON automation_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_lessons_updated_at ON automation_lessons;
CREATE TRIGGER trg_automation_lessons_updated_at
  BEFORE UPDATE ON automation_lessons
  FOR EACH ROW EXECUTE FUNCTION update_automation_lessons_updated_at();

-- 3. RLS
ALTER TABLE automation_lessons ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_automation_lessons" ON automation_lessons;
CREATE POLICY "public_read_published_automation_lessons"
  ON automation_lessons FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_automation_lessons" ON automation_lessons;
CREATE POLICY "admin_manage_automation_lessons"
  ON automation_lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );


