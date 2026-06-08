# Post-Migration Verification Report

**Generated:** 2026-06-08
**Type:** Documentation only (no database connection, no data import, no code change)
**Author context:** Independent read-only verification station, recording user-reported and locally-verifiable evidence after the manual Supabase SQL Editor execution of the four core content-schema migrations.

---

## 1. Execution Method

The four **active core** content-schema migrations were executed **manually, one at a time, through the Supabase Dashboard → SQL Editor**:

1. `20260608120701_career_content_tables.sql`
2. `20260608120702_language_content_tables.sql`
3. `20260608120703_digital_exams_content_tables.sql`
4. `20260608120706_remaining_content_tables.sql`

All four returned: **`Success. No rows returned`**

**This was NOT done via the Supabase CLI** (`supabase db push` / `supabase migration up`).

## 2. CLI Configuration Status (locally verified)

`supabase/config.toml` is **absent** from the repository root (`ls supabase/config.toml` → "No such file or directory"). This confirms the project is **not linked/initialized for the Supabase CLI** locally. Any future attempt to use the CLI against this project would first require `supabase init` + `supabase link`, and — critically — **the CLI's local migration ledger has no record that these four files were already applied**. See `supabase/MIGRATION_LOG.md` for the explicit warning this creates.

## 3. Tables Created

**19 new core content tables** were created and confirmed to exist:

| Group | Tables |
|---|---|
| Career (4) | `career_glossary`, `career_prompts`, `career_resources`, `career_lessons` |
| Language (4) | `language_glossary`, `language_prompts`, `language_resources`, `language_lessons` |
| Digital Exams (4) | `digital_exams_glossary`, `digital_exams_prompts`, `digital_exams_resources`, `digital_exams_lessons` |
| Remaining gap-fill (7) | `ai_resources`, `ai_lessons`, `automation_resources`, `automation_lessons`, `iot_glossary`, `iot_prompts`, `iot_resources` |

## 4. Row Counts

**All 19 tables = 0 rows.** No content has been imported into any of them.

## 5. Row-Level Security

**RLS is enabled on all 19 tables** (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`, confirmed both in the executed SQL source and via the user's manual Dashboard check).

## 6. Public Read Policy

Each of the 19 tables carries exactly one public-read policy, scoped to published content only:

- Name pattern: `public_read_published_<table>`
- `cmd = SELECT`
- `qual = (status = 'published'::text)`
- `with_check = null`

Anonymous/public users **cannot** see draft, archived, or any non-`published` rows.

## 7. Admin Manage Policy

Each of the 19 tables carries exactly one admin-management policy:

- Name pattern: `admin_manage_<table>`
- `cmd = ALL`
- Both `qual` and `with_check` require:
  ```sql
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
  ```

Only authenticated users with `profiles.role = 'admin'` can insert/update/delete/select beyond the public-read scope.

## 8. Deferred Tables — Confirmed NOT Created

The two deferred migration files were **not executed**, and their target tables do **not** exist:

- `tools_hub_glossary`, `tools_hub_prompts`, `tools_hub_resources`, `tools_hub_lessons`
- `nano_banana_glossary`, `nano_banana_prompts`, `nano_banana_resources`, `nano_banana_lessons`

The only `nano_banana`-prefixed tables present in the database are the **pre-existing, established** tables `nano_banana_custom_prompts` and `nano_banana_saved_prompts` (created by legacy migration `supabase/v14_nano_banana_custom_prompts.sql` and related work, predating this content-source effort entirely). These are unrelated to — and untouched by — the new/deferred migrations.

## 9. Content Data

**Zero content records were imported.** None of the 1,040 normalized files in `content-source/_normalized/` have been written to any database table.

## 10. Application / Production Wiring

**No app code, routes, components, admin dashboard, auth, certificates, exams, package files, or config files were changed** by this work. This was independently confirmed by diffing every commit in the checkpoint chain (`2767e67`..`1c2bd30`): 2,417 files changed, 64,025 insertions, 0 deletions, and **100% of changed paths fall inside `content-source/` or `supabase/{migrations,deferred-migrations,generated-content-schemas}/`.**

## 11. Known Housekeeping Note

`content-source/_audit/generate-core-reports.py` exists in the working tree but is **untracked** (`git status --short` shows `?? content-source/_audit/generate-core-reports.py`; `git log --all -- <path>` returns no history). Its *output* files (`core-migration-package-{report.md,details.csv,summary.json}`) **are** committed and tracked. This is a reproducibility/cleanliness gap only — the script that produced a committed report was itself never added to git. It carries **no DB or security risk**. Recommended resolution (outside this station's scope): either commit the script for traceability or remove it as a stray artifact.

## 12. Statement of Scope

**This report is documentation only.** It records evidence already gathered through manual Supabase Dashboard verification (performed by the project owner) and independent read-only repository inspection (git history, migration file contents, directory listings). No database connection was made to produce this report. No data was read from or written to any live table by the process that generated this document.
