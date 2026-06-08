# Small-Batch Transaction Pilot Plan

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
