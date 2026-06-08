# Tier-A DB Sync Schema Compatibility Repair

## Incident Summary
The first attempt to generate a Supabase SQL dry-run package failed because the SQL included `SET` clauses for `slug` and `excerpt` columns. A schema inspection confirmed that the 19 Tier-A Core tables **do not** have `slug`, `excerpt_ar`, or `excerpt_en` columns.

## The Repair
A targeted repair was performed on the `content-source/_db-sync/generate-tier-a-sql.py` script:
- Enforced a strict schema allowlist: `id`, `portal_id`, `content_type`, `status`, `title_ar`, `title_en`, `body_ar`, `body_en`, `data`.
- Instead of attempting to update non-existent columns, `slug` and `excerpt_ar` are now safely mapped inside the `data` JSONB dictionary alongside other dynamic metadata fields (like `definition` and `prompt_text`).

## Output Files Regenerated
The entire SQL package was regenerated under `content-source/_db-sync/`. 
All 600 records are accounted for, and exactly 0 `SET` commands are generated for non-schema fields. The package is now 100% schema-compatible.

## Next Steps
This station simply fixed the offline generation script. The generated SQL script (`tier-a-draft-metadata-sync.sql`) remains a **dry-run** by default and relies on manual human review.
You must open the Supabase SQL Editor, verify the regenerated output, and only change the final `ROLLBACK;` to `COMMIT;` when you are absolutely certain of the updates.
