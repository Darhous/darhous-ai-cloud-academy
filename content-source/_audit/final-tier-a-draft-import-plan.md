# Final Tier-A Draft Import Execution Plan

## 1. Executive Summary
This document outlines the final bulk execution package to persistently import all remaining 590 Tier-A records into their designated 19 core tables. The script is designed as a single, transactional SQL payload with robust assertion checks that will `COMMIT` automatically only if all data integrity constraints are satisfied. 

## 2. Scope Definition
- **Total Tier-A records:** 600
- **Already imported:** 10
- **Remaining to import:** 590
- **Expected final count:** 600

## 3. Why This Is 590 Records, Not 1,040
The 1,040 records analyzed during the initial dry-run include records mapped to existing live-wired tables (210) and deferred tables (230) like `tools_hub` and `nano_banana`. The Tier-A safe subset is strictly 600 records mapping entirely to isolated new tables.

## 4. Already Imported 10 Records
The 10 records previously imported into `career_glossary` remain safely untouched. The script explicitly excludes them from the `INSERT` operation.

## 5. Remaining Records Selected
Exactly 590 valid JSON/MD files. Details are cataloged in `final-tier-a-draft-import-details.csv`.

## 6. Target Tables
19 core target tables spanning: `career`, `language`, `digital_exams`, `ai`, `automation`, and `iot` paths. 

## 7. Excluded Records and Why
- **Live-Wired / Pre-existing tables:** Require separate review before importing.
- **tools_hub / nano_banana:** Deferred due to structural misalignment risks.

## 8. SQL Execution Instructions
1. Open the file `content-source/_audit/final-tier-a-draft-import-master.sql`.
2. Copy the entire file content.
3. Paste into Supabase SQL Editor.
4. Execute.

## 9. Expected Results
- The transaction initializes.
- 590 records are successfully `INSERTED` across 19 tables.
- All assertion checks pass.
- Transaction `COMMITS`.
- Post-commit queries display the updated row counts reflecting a total of 600 imported Tier-A drafts.

## 10. Assertion Guards
Before committing, the script explicitly verifies via a `DO $$` block:
- Total draft records = 600.
- Total published records = 0.
- Previously imported 10 records = Intact.
If any assertion fails, the database throws an exception and implicitly rolls back everything.

## 11. Emergency Rollback Plan
If an emergency requires undoing this specific 590-record import (e.g., frontend rendering bug found later), open `final-tier-a-draft-import-emergency-rollback.sql` and execute its contents. It performs precision `DELETE` statements scoped to these exact IDs without wiping the initial 10 records.

## 12. Safety Notes
- All inserts use `status = 'draft'`.
- Fully transactional: atomic success or atomic failure.

## 13. What Must Not Be Done
- Do NOT run the Emergency Rollback unless there is a confirmed disaster.
- Do NOT execute without reviewing the target tables list inside the master SQL.

## 14. Next Step After User Executes It
Upon success, the Tier-A import phase is officially complete! The project can then proceed to reviewing the 210 Live-Wired Tier-B records.
