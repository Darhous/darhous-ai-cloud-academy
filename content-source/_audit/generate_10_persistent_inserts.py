import os
import json

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
glossary_dir = os.path.join(base_dir, "content-source", "_normalized", "career", "glossary")
out_dir = os.path.join(base_dir, "content-source", "_audit")

files_to_process = [
    "career-glossary-ai-tools.json",
    "career-glossary-ats-2.json",
    "career-glossary-ats.json",
    "career-glossary-burnout.json",
    "career-glossary-career-shift-2.json",
    "career-glossary-career-shift.json",
    "career-glossary-cover-letter-2.json",
    "career-glossary-cover-letter.json",
    "career-glossary-culture-fit.json",
    "career-glossary-cv-optimization.json"
]

sql_inserts = []
ids = []

for filename in files_to_process:
    filepath = os.path.join(glossary_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
        # Escape single quotes in JSON string
        data_json_str = json.dumps(data.get("data", {}), ensure_ascii=False).replace("'", "''")
        title_ar = data.get("title_ar", "").replace("'", "''")
        title_en = data.get("title_en", "").replace("'", "''")
        category = data.get("category", "").replace("'", "''")
        tags = data.get("tags", [])
        
        tags_arr = "ARRAY[" + ", ".join(["'" + t.replace("'", "''") + "'" for t in tags]) + "]" if tags else "ARRAY[]::text[]"
        
        ids.append(f"'{data['id']}'")
        
        val = f"""  (
    '{data['id']}',
    '{data['portal_id']}',
    '{data['content_type']}',
    'draft',
    {str(data.get('featured', False)).lower()},
    {data.get('sort_order', 0)},
    '{category}',
    '{title_ar}',
    '{title_en}',
    {tags_arr},
    '{data_json_str}'::jsonb
  )"""
        sql_inserts.append(val)

sql_values = ",\n".join(sql_inserts)
ids_list = ", ".join(ids)

sql_content = f"""-- ==============================================================================
-- SECTION 1 — Pre-check
-- ==============================================================================

-- show current career_glossary row count
SELECT count(*) AS total_rows_before FROM career_glossary;

-- confirm none of the selected 10 IDs already exist
SELECT id FROM career_glossary WHERE id IN ({ids_list});


-- ==============================================================================
-- SECTION 2 — Insert 10 persistent draft records
-- ==============================================================================
INSERT INTO career_glossary (
  id,
  portal_id,
  content_type,
  status,
  featured,
  sort_order,
  category,
  title_ar,
  title_en,
  tags,
  data
) VALUES 
{sql_values};


-- ==============================================================================
-- SECTION 3 — Verify inserted records
-- ==============================================================================

-- count selected IDs after insert (expected 10)
SELECT count(*) AS inserted_count
FROM career_glossary 
WHERE id IN ({ids_list});

-- count selected IDs where status = 'draft' (expected 10)
SELECT count(*) AS draft_count
FROM career_glossary 
WHERE id IN ({ids_list}) AND status = 'draft';

-- select key fields
SELECT 
  id,
  portal_id,
  content_type,
  status,
  category,
  title_ar,
  title_en,
  tags,
  sort_order,
  created_at,
  updated_at
FROM career_glossary
WHERE id IN ({ids_list});


-- ==============================================================================
-- SECTION 4 — Final row count
-- ==============================================================================
-- show career_glossary total row count after persistent insert
-- expected row count should be 10 if table was previously empty
SELECT count(*) AS total_rows_after_import FROM career_glossary;


-- ==============================================================================
-- SECTION 5 — Emergency rollback SQL only
-- ==============================================================================
/*
EMERGENCY ROLLBACK ONLY — DO NOT RUN UNLESS USER APPROVES

DELETE FROM career_glossary WHERE id IN ({ids_list});

-- verify those IDs no longer exist
SELECT count(*) AS remaining_ids FROM career_glossary WHERE id IN ({ids_list});

-- verify final row count returns to 0
SELECT count(*) AS final_rows_after_emergency_delete FROM career_glossary;
*/
"""

with open(os.path.join(out_dir, "ten-record-persistent-draft-import-sql.sql"), "w", encoding="utf-8") as f:
    f.write(sql_content)

print("Generated ten-record-persistent-draft-import-sql.sql")

plan_md = f"""# 10-Record Persistent Draft Import Plan

## 1. Executive Summary
This document outlines a strictly controlled SQL script designed for manual execution in the Supabase SQL Editor. The script performs the first **persistent** bulk insert of exactly 10 clean Tier-A `career_glossary` records into the database. The records are inserted as `draft`. There is NO automatic rollback, meaning the data will stay in the database after execution unless the emergency rollback block is manually executed.

## 2. Selected Records
The following IDs were selected for the 10-record persistent import:
- `career-glossary-ai-tools`
- `career-glossary-ats-2`
- `career-glossary-ats`
- `career-glossary-burnout`
- `career-glossary-career-shift-2`
- `career-glossary-career-shift`
- `career-glossary-cover-letter-2`
- `career-glossary-cover-letter`
- `career-glossary-culture-fit`
- `career-glossary-cv-optimization`

## 3. Why These Records Were Chosen
- **Proven Safety:** These exact 10 files were successfully tested in the previous non-persistent Small-Batch Transaction Pilot. We know with 100% certainty that their payload shape and encoding are accepted by the `career_glossary` schema without errors.
- **Suitability:** All 10 files are Tier-A. They contain all required import-critical fields. 

## 4. Source File Paths
1. `content-source/_normalized/career/glossary/career-glossary-ai-tools.json`
2. `content-source/_normalized/career/glossary/career-glossary-ats-2.json`
3. `content-source/_normalized/career/glossary/career-glossary-ats.json`
4. `content-source/_normalized/career/glossary/career-glossary-burnout.json`
5. `content-source/_normalized/career/glossary/career-glossary-career-shift-2.json`
6. `content-source/_normalized/career/glossary/career-glossary-career-shift.json`
7. `content-source/_normalized/career/glossary/career-glossary-cover-letter-2.json`
8. `content-source/_normalized/career/glossary/career-glossary-cover-letter.json`
9. `content-source/_normalized/career/glossary/career-glossary-culture-fit.json`
10. `content-source/_normalized/career/glossary/career-glossary-cv-optimization.json`

## 5. Target Table
`career_glossary`

## 6. Manual SQL Execution Steps
Open `content-source/_audit/ten-record-persistent-draft-import-sql.sql` in the Supabase SQL Editor. 
You can execute Sections 1 to 4 to perform the persistent import and verification.
**DO NOT RUN SECTION 5 UNLESS YOU NEED TO UNDO THE IMPORT.**

- **SECTION 1:** Confirms the pre-existing row count (expected 0).
- **SECTION 2:** Executes a single `INSERT` statement containing exactly 10 value tuples. All are forced to `draft`.
- **SECTION 3:** Verifies the 10 rows exist and are correctly shaped.
- **SECTION 4:** Validates that the total database row count is now 10.

## 7. Expected Results
- **SECTION 1:** `total_rows_before` = 0. ID check returns 0 rows.
- **SECTION 2:** `Success. No rows returned.` (10 rows permanently inserted).
- **SECTION 3:** `inserted_count` = 10, `draft_count` = 10. The final `SELECT` lists all 10 records.
- **SECTION 4:** `total_rows_after_import` = 10.

## 8. Emergency Rollback Instructions
Section 5 is explicitly commented out and labeled:
`EMERGENCY ROLLBACK ONLY — DO NOT RUN UNLESS USER APPROVES`
If the data looks wrong, or if you wish to wipe the table again, you may manually highlight and execute the `DELETE` statement inside the Section 5 comment block. It targets ONLY the 10 selected IDs.

## 9. Safety Notes
- Every record's `status` is hardcoded to `draft`, meaning they remain invisible to public front-end queries even while persistently stored in the DB.
- `tools_hub` and `nano_banana` are completely avoided.
- There is NO `BEGIN;` or `ROLLBACK;` wrapping the main insert logic.

## 10. What Must Not Be Done
- Do **NOT** use `TRUNCATE` or an untargeted `DELETE FROM`.
- Do **NOT** execute Section 5 unless you explicitly want to delete the 10 imported rows.
- Do **NOT** attempt to use this script for any tables outside of `career_glossary`.

## 11. Next Step After User Executes It
Once the 10 persistent draft records are confirmed successfully staged in the Supabase dashboard, we have formally proven the import pipeline. The next progression is a Database-Connected Introspection or preparing the next batch of data.
"""

with open(os.path.join(out_dir, "ten-record-persistent-draft-import-plan.md"), "w", encoding="utf-8") as f:
    f.write(plan_md)

summary = {
    "selected_files": files_to_process,
    "selected_ids": [f.replace(".json", "") for f in files_to_process],
    "target_table": "career_glossary",
    "status_to_insert": "draft",
    "records_count": len(files_to_process),
    "execution_style": "Simple manual SQL blocks",
    "persistent_import": True,
    "contains_rollback": False,
    "contains_emergency_delete": True,
    "expected_final_row_count": 10,
    "touches_tables": ["career_glossary"],
    "forbidden_tables_touched": [],
    "safe_for_manual_execution": True
}

with open(os.path.join(out_dir, "ten-record-persistent-draft-import-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

print("Generated plan and summary.")
