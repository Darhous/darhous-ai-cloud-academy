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
-- SECTION 1 — Pre-check outside transaction
-- ==============================================================================

-- show current career_glossary row count
SELECT count(*) AS total_rows_before FROM career_glossary;

-- confirm none of the selected 10 IDs already exist
SELECT id FROM career_glossary WHERE id IN ({ids_list});


-- ==============================================================================
-- SECTION 2 — Begin transaction
-- ==============================================================================
BEGIN;


-- ==============================================================================
-- SECTION 3 — Insert 10 draft records
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
-- SECTION 4 — Verify inside transaction
-- ==============================================================================

-- verify inserted matching IDs count = 10
SELECT count(*) AS inserted_count_inside_tx 
FROM career_glossary 
WHERE id IN ({ids_list});

-- verify all selected records have status = 'draft'
SELECT count(*) AS draft_count_inside_tx 
FROM career_glossary 
WHERE id IN ({ids_list}) AND status = 'draft';

-- verify selected records with key fields
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
-- SECTION 5 — Rollback
-- ==============================================================================
-- We DO NOT want to keep these rows permanently yet. 
-- This rollback returns the table to its previous state.
ROLLBACK;


-- ==============================================================================
-- SECTION 6 — Verify rollback after transaction
-- ==============================================================================

-- confirm none of the 10 selected IDs remain
SELECT id FROM career_glossary WHERE id IN ({ids_list});

-- confirm career_glossary row count returns to exactly what it was before
SELECT count(*) AS total_rows_after_rollback FROM career_glossary;
"""

with open(os.path.join(out_dir, "small-batch-transaction-pilot-sql.sql"), "w", encoding="utf-8") as f:
    f.write(sql_content)

print("Generated small-batch-transaction-pilot-sql.sql")

plan_md = f"""# Small-Batch Transaction Pilot Plan

## 1. Executive Summary
This document outlines a strictly controlled one-shot SQL transaction designed for manual execution in the Supabase SQL Editor. The script performs a bulk insert of exactly 10 clean Tier-A `career_glossary` records into the database, verifies their successful instantiation, and immediately rolls back the entire transaction. This test proves that the system can handle small batch operations (including arrays and JSONB) reliably, without risking permanent changes.

## 2. Selected Records
The following IDs were selected for the 10-record pilot:
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
- **Exclusion of Previous Pilot:** The previous pilot ID (`career-glossary-star-method`) was explicitly excluded to ensure testing on entirely fresh payload shapes.
- **Safety & Suitability:** All 10 files are categorized as Tier-A (ready for import). They contain all required import-critical fields (id, title, category, tags), and their encapsulated JSON `data` contents are free of schema anomalies.

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

## 6. One-Shot Transaction SQL Execution Steps
Open `content-source/_audit/small-batch-transaction-pilot-sql.sql` in the Supabase SQL Editor. You can execute the **entire script at once**.
The script uses a `BEGIN;` and `ROLLBACK;` transaction block.

- **SECTION 1:** Confirms the pre-existing row count.
- **SECTION 2:** Starts the transaction (`BEGIN;`).
- **SECTION 3:** Executes a single `INSERT` statement containing exactly 10 value tuples. All are forced to `draft`.
- **SECTION 4:** Verifies the 10 rows exist inside the memory of the transaction.
- **SECTION 5:** Issues a `ROLLBACK;` to discard the changes safely.
- **SECTION 6:** Validates that the database row count returned to 0 (or its previous state).

## 7. Expected Results From Each Section
- **SECTION 1:** `total_rows_before` = 0 (assuming the table is currently empty). Second query returns 0 rows.
- **SECTION 2:** Transaction begins.
- **SECTION 3:** `Success. No rows returned.` (10 rows inserted into the transaction).
- **SECTION 4:** `inserted_count_inside_tx` = 10, `draft_count_inside_tx` = 10. The final `SELECT` will list all 10 records perfectly formed.
- **SECTION 5:** Transaction is rolled back.
- **SECTION 6:** ID select returns 0 rows. `total_rows_after_rollback` matches `total_rows_before`.

## 8. Safety Notes
- The script strictly bounds all writes within `BEGIN` and `ROLLBACK`.
- Every record's `status` is hardcoded to `draft`.
- `tools_hub` and `nano_banana` are completely avoided.

## 9. Why ROLLBACK Is Used
A transaction block ending with `ROLLBACK` guarantees that any changes made within the block (such as the 10 inserts) are discarded at the end of the script execution. This allows the user to safely view the "what-if" result of the insert without permanently altering the live database. 

## 10. What Must Not Be Done
- Do **NOT** replace `ROLLBACK;` with `COMMIT;`.
- Do **NOT** attempt to use this script for any tables outside of `career_glossary`.
- Do **NOT** execute the middle `INSERT` block independently without its surrounding `BEGIN` and `ROLLBACK`.

## 11. Next Step After User Executes It
Once the small-batch transaction completes successfully in the SQL Editor and is documented, the system logic is proven to handle multi-record loads. The project can then proceed to a programmatic **Database-Connected Importer Station** to formally stage the remainder of the 600 Tier-A files.
"""

with open(os.path.join(out_dir, "small-batch-transaction-pilot-plan.md"), "w", encoding="utf-8") as f:
    f.write(plan_md)

summary = {
    "selected_files": files_to_process,
    "selected_ids": [f.replace(".json", "") for f in files_to_process],
    "target_table": "career_glossary",
    "status_to_insert": "draft",
    "records_count": len(files_to_process),
    "execution_style": "One-shot transaction",
    "uses_transaction": True,
    "ends_with_rollback": True,
    "contains_commit": False,
    "expected_final_row_count": 0,
    "touches_tables": ["career_glossary"],
    "forbidden_tables_touched": [],
    "safe_for_manual_execution": True
}

with open(os.path.join(out_dir, "small-batch-transaction-pilot-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

print("Generated plan and summary.")
