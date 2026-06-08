import os
import re

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
generated_dir = os.path.join(base_dir, "supabase", "generated-content-schemas")
os.makedirs(generated_dir, exist_ok=True)

# These are the 26 tables identified as missing
tables_to_generate = [
    "nano_banana_lessons",
    "language_resources",
    "career_lessons",
    "digital_exams_resources",
    "digital_exams_prompts",
    "ai_resources",
    "career_resources",
    "career_prompts",
    "language_lessons",
    "ai_lessons",
    "tools_hub_glossary",
    "language_prompts",
    "automation_resources",
    "iot_glossary",
    "nano_banana_glossary",
    "iot_resources",
    "nano_banana_resources",
    "tools_hub_resources",
    "tools_hub_lessons",
    "tools_hub_prompts",
    "digital_exams_glossary",
    "digital_exams_lessons",
    "iot_prompts",
    "language_glossary",
    "career_glossary",
    "automation_lessons"
]

template_sql = """-- ══════════════════════════════════════════════════════════════════
-- GENERATED SCHEMA ARTIFACT - DO NOT RUN IN PRODUCTION WITHOUT REVIEW
-- 
-- Table: {table_name}
-- Description: Missing table identified during normalized content dry-run.
-- Schema Follows: supabase/_template_content_table.sql
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS {table_name} (
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
  tags          TEXT[]      NOT NULL DEFAULT '{{}}',
  body_ar       TEXT,                                    
  body_en       TEXT,
  data          JSONB       NOT NULL DEFAULT '{{}}'::jsonb,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ,
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_{table_name}_status   ON {table_name} (status);
CREATE INDEX IF NOT EXISTS idx_{table_name}_category ON {table_name} (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_{table_name}_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_{table_name}_updated_at ON {table_name};
CREATE TRIGGER trg_{table_name}_updated_at
  BEFORE UPDATE ON {table_name}
  FOR EACH ROW EXECUTE FUNCTION update_{table_name}_updated_at();

-- 3. RLS
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;

-- Public can read published rows only
DROP POLICY IF EXISTS "public_read_published_{table_name}" ON {table_name};
CREATE POLICY "public_read_published_{table_name}"
  ON {table_name} FOR SELECT
  USING (status = 'published');

-- Admins can manage everything
DROP POLICY IF EXISTS "admin_manage_{table_name}" ON {table_name};
CREATE POLICY "admin_manage_{table_name}"
  ON {table_name} FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

"""

# Group by portal
portals = {
    "career": [],
    "language": [],
    "digital_exams": [],
    "tools_hub": [],
    "nano_banana": [],
    "remaining_gaps": []
}

for t in tables_to_generate:
    if t.startswith("career_"):
        portals["career"].append(t)
    elif t.startswith("language_"):
        portals["language"].append(t)
    elif t.startswith("digital_exams_"):
        portals["digital_exams"].append(t)
    elif t.startswith("tools_hub_"):
        portals["tools_hub"].append(t)
    elif t.startswith("nano_banana_"):
        portals["nano_banana"].append(t)
    else:
        portals["remaining_gaps"].append(t)

file_mappings = {
    "career": "001_career_content_tables.sql",
    "language": "002_language_content_tables.sql",
    "digital_exams": "003_digital_exams_content_tables.sql",
    "tools_hub": "004_tools_hub_content_tables.sql",
    "nano_banana": "005_nano_banana_content_tables.sql",
    "remaining_gaps": "006_remaining_content_tables.sql"
}

for portal, tables in portals.items():
    if not tables:
        continue
    filepath = os.path.join(generated_dir, file_mappings[portal])
    with open(filepath, "w", encoding="utf-8") as f:
        for t in tables:
            f.write(template_sql.format(table_name=t))
            f.write("\n")

readme_content = """# Generated Content Schemas

**WARNING:** These files are PLANNING ARTIFACTS ONLY.
They were generated automatically during the normalized content dry-run phase to fill the missing gaps identified in the schema.

- Do not place these in the active migration folder.
- Do not run these without reviewing them.
- They strictly follow `_template_content_table.sql`.
"""
with open(os.path.join(generated_dir, "README.md"), "w", encoding="utf-8") as f:
    f.write(readme_content)

print("Generated schema SQL artifacts successfully.")
