# Supabase Migration Execution Log

This log tracks **how** and **when** migrations in this repository were actually applied to the live database — independent of what the Supabase CLI's local ledger may or may not show. Read this before assuming `supabase db push` / `supabase migration list` reflects reality.

---

## Entry: 2026-06-08 — Core Content Schema Migrations

**Date:** 2026-06-08
**Execution method:** Manual, one file at a time, via **Supabase Dashboard → SQL Editor** (NOT via Supabase CLI)

### Files executed (in order)

| # | File | Result |
|---|---|---|
| 1 | `supabase/migrations/20260608120701_career_content_tables.sql` | `Success. No rows returned` |
| 2 | `supabase/migrations/20260608120702_language_content_tables.sql` | `Success. No rows returned` |
| 3 | `supabase/migrations/20260608120703_digital_exams_content_tables.sql` | `Success. No rows returned` |
| 4 | `supabase/migrations/20260608120706_remaining_content_tables.sql` | `Success. No rows returned` |

### Files NOT executed (intentionally deferred)

| File | Location | Reason |
|---|---|---|
| `20260608120704_tools_hub_content_tables.sql` | `supabase/deferred-migrations/content-schema-risk/` | Tools Hub is not live app-wired yet; creating tables now risks unused DB overhead with no immediate utility (product decision pending). |
| `20260608120705_nano_banana_content_tables.sql` | `supabase/deferred-migrations/content-schema-risk/` | Naming/app-alignment risk — the live app currently reads from `nano_banana_custom_prompts`, not the new `nano_banana_*` table names generated for this package (decision pending). |

### Verified Result

- **19 core content tables created**, spanning: `career_*` (4), `language_*` (4), `digital_exams_*` (4), and gap-fill tables `ai_resources`, `ai_lessons`, `automation_resources`, `automation_lessons`, `iot_glossary`, `iot_prompts`, `iot_resources` (7).
- **All 19 tables confirmed at 0 rows** — no content imported.
- **RLS confirmed enabled** on all 19 tables.
- **Policies confirmed present and correct** on all 19 tables: `public_read_published_<table>` (SELECT, `status='published'`) and `admin_manage_<table>` (ALL, gated on `profiles.role = 'admin'`).
- **No content data imported.** No app code, route, admin, dashboard, auth, or production wiring changed.

### ⚠️ Important Note for Future CLI Users

**`supabase/config.toml` does not exist in this repository** — the project has never been linked to the Supabase CLI locally. This means:

- The Supabase CLI's migration ledger (the `supabase_migrations.schema_migrations` table that `supabase db push` consults) **has no record** that the four files above were already run.
- **Do not assume `supabase migration list` or `supabase db push` reflects the true state of the database.** If the CLI is set up in the future and a `db push` is attempted, it may try to **re-run** these four files against a database where the corresponding tables already exist.
- Because every `CREATE TABLE` in these files uses `CREATE TABLE IF NOT EXISTS` and every policy/trigger uses the `DROP ... IF EXISTS` + `CREATE ...` idempotent pattern, a re-run **should** be a safe no-op for the table/policy/trigger definitions themselves — but this has **not been tested**, and CLI linkage should be approached carefully (e.g., by manually marking these four migrations as "already applied" in the CLI's ledger, or via `supabase migration repair`) rather than blindly running `db push`.
- The two deferred files remain outside the active migration path in `supabase/deferred-migrations/content-schema-risk/` and will not be picked up by `supabase db push` regardless.

---

*This log is documentation only. It does not alter migration files, does not run migrations, and does not connect to Supabase.*
