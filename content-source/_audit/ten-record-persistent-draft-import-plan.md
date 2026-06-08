# 10-Record Persistent Draft Import Plan

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
