# Single-Record Pilot SQL Execution Plan

## 1. Executive Summary
This station successfully prepared a 100% database-disconnected SQL package designed for manual verification of the newly generated content schema. The package inserts a single, fully-formed Tier-A record into `career_glossary` as a `draft`, allows the user to manually verify its presence, and then cleans up (deletes) the exact row to return the database to an empty, pristine state.

## 2. Selected Record
- **ID:** `career-glossary-star-method`
- **Title AR:** طريقة ستار (STAR)

## 3. Why This Record Was Chosen
This record was chosen because it perfectly models a clean, standard normalized entry:
- It is classified as Tier-A.
- It targets `career_glossary`, one of the new, empty core tables.
- It contains no missing import-critical gaps.
- It has both Arabic and English titles, correct tags, category, and an encapsulated `data` JSONB object without complex nested arrays, making the manual SQL `INSERT` statement simple and easy to review visually.

## 4. Source File Path
`content-source/_normalized/career/glossary/career-glossary-star-method.json`

## 5. Target Table
`career_glossary`

## 6. Manual SQL Execution Steps
The user must open `content-source/_audit/single-record-pilot-sql.sql` and run it block by block in the Supabase Dashboard SQL Editor:
- **Run BLOCK 1:** To establish a baseline (0 rows).
- **Run BLOCK 2:** To perform the single `draft` insertion.
- **Run BLOCK 3:** To view the inserted data and confirm constraints (e.g., Row Level Security triggers, timestamp generation).
- **Run BLOCK 4:** To securely delete the pilot row.
- **Run BLOCK 5:** To confirm the database is returned to exactly 0 rows.

## 7. Expected Results After Each Block
- **Block 1:** `total_rows_before` = 0. ID check returns 0 rows.
- **Block 2:** `Success. No rows returned.`
- **Block 3:** Returns exactly 1 row matching `career-glossary-star-method` with `status = 'draft'`.
- **Block 4:** `Success. No rows returned.`
- **Block 5:** `total_rows_after` = 0. ID check returns 0 rows.

## 8. Safety Notes
- The record is forced to `draft` to ensure it will not appear in any public front-end queries even if the cleanup step fails.
- The `DELETE` statement is strictly scoped with `WHERE id = 'career-glossary-star-method'`.
- `data` JSONB is properly cast (`::jsonb`) to validate structural integrity upon insert.

## 9. What Must Not Be Done
- Do **NOT** run an untargeted `DELETE FROM career_glossary;` (always use the ID).
- Do **NOT** use `TRUNCATE`.
- Do **NOT** run the SQL against any other table.
- Do **NOT** insert any records related to `tools_hub` or `nano_banana`.

## 10. Next Step After User Executes It
After manual execution and cleanup, update the project documentation to confirm that the `_template_content_table.sql` schema handles `JSONB` data natively. Then proceed to the **Database-Connected Importer Dry-Run Station** to programmatically validate the remaining 1,040 files against the now-proven table structure.
