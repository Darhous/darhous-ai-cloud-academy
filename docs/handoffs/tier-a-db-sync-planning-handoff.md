# Tier-A DB Sync Planning Handoff

## What Was Generated
A dry-run SQL package was generated in `content-source/_db-sync/` to synchronize offline Tier-A metadata repairs directly into the Supabase draft records.

Files included:
- `tier-a-draft-metadata-sync.sql`: The primary transaction-wrapped SQL file containing purely `UPDATE` statements for the 600 records. It defaults to a dry-run state.
- `tier-a-draft-metadata-sync-verification.sql`: SQL queries to verify table counts, draft status persistence, and sample updated metadata records.
- `tier-a-draft-metadata-sync-rollback.sql`: Instructions on rolling back safely via Git and DB PITR backups.
- `tier-a-draft-metadata-sync-summary.json` & `tier-a-draft-metadata-sync-details.csv`: Full detailed reporting of the 600 specific updates generated.

## Why It Is Dry-Run Only
The package is designed purely as an offline dry-run to prioritize safety and guarantee zero unintended database writes. Generating a reviewable SQL file allows developers to visually inspect exactly which rows and fields will be updated before touching the database.

## How It Protects Draft Status
Every `UPDATE` statement generated includes dual WHERE clauses protecting the execution:
`WHERE id = '...' AND status = 'draft';`
Additionally, the statements explicitly re-apply `status = 'draft'` as a `SET` clause if status was part of the repaired source data. The main SQL file is wrapped in a `BEGIN;` ... `ROLLBACK;` block to ensure execution without a manual commit will safely roll back automatically.

## Explicit Warnings
> [!WARNING] 
> **SQL WAS NOT EXECUTED.** This station only generated the SQL package locally. The Supabase database remains exactly as it was during the initial imports. 
> **USER APPROVAL REQUIRED.** You must manually review the SQL and authorize the execution in the Supabase SQL Editor.

## Exact Next Manual Step
1. Open the Supabase SQL Editor.
2. Open `content-source/_db-sync/tier-a-draft-metadata-sync.sql`.
3. Review the update statements.
4. If everything looks correct, change the final `ROLLBACK;` statement to `COMMIT;`.
5. Execute the script to apply the metadata sync safely to the draft records.
