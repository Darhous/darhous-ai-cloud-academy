# Live Readiness V2 — Plan & Methodology

## Why this exists

Two earlier reports disagreed about how much normalized content is currently importable:

- `content-source/_audit/importer-dry-run-summary.json` → **210 importable / 830 skipped**
- `content-source/_audit/importer-readiness-summary.json` → **440 importable / 600 skipped**

Both numbers are now **stale**, because the core-content migration has since been executed manually (19 new tables now exist where, at the time those reports were generated, they did not). This document defines a transparent, reproducible methodology — `live_readiness_v2` — that supersedes both, and explains exactly why the old numbers differed (see `content-source/_audit/live-dryrun-v2-report.md`, section 8, for the full root-cause analysis).

## How `live_readiness_v2` is computed

Unlike the two earlier scripts, `live_readiness_v2` classifies every normalized file into **three tiers**, not just a binary importable/skipped split — because "the target table exists" is not the same as "safe to import into right now":

### Tier A — New, isolated core tables (lowest risk)
The 19 tables created by the manually-executed core migration (`career_*`, `language_*`, `digital_exams_*`, `ai_resources`, `ai_lessons`, `automation_resources`, `automation_lessons`, `iot_glossary`, `iot_prompts`, `iot_resources`). These are **empty, RLS-protected, and have zero application code reading from them**. Importing here (in `draft` status, staged) carries no risk of surfacing content to live users.

### Tier B — Pre-existing, live-wired tables (caution required)
Tables that existed **before** this content-source effort began (`ai_glossary`, `ai_prompts`, `automation_glossary`, `automation_prompts`, `iot_lessons`, `nano_banana_custom_prompts` — defined in legacy migrations `v22`, `v24`, `v33`, `v37`, `v42`, `v14` respectively). The candidate table technically **exists**, but it is presumably already wired into live application routes and may already contain real production rows. Importing here requires a **separate review**: ID-collision strategy, schema-shape compatibility beyond mere table existence, and confirmation the app won't immediately render the new rows to end users. **These should NOT be lumped in with Tier A as "ready to import."**

### Tier C — Missing / deferred tables (cannot import)
Normalized content whose candidate table does not exist at all — entirely the `tools-hub` portal (4 types) and three of the four `nano-banana` content types (`glossary`, `resources`, `lessons` — their tables are in the deferred migration package and were deliberately not created).

## Data sources used (no live DB connection required for this computation)

1. `content-source/_importer/table-compatibility-matrix.csv` — pre-migration table-existence detection (regex-scanned from top-level `supabase/*.sql` files), giving the **Tier B** set.
2. The user's manually-verified list of 19 newly-created core tables (recorded in `content-source/_audit/post-migration-verification-report.md` and `supabase/MIGRATION_LOG.md`), giving the **Tier A** set.
3. `supabase/deferred-migrations/content-schema-risk/*.sql` file names — confirming the **Tier C** set (the only tables that remain entirely absent).
4. Per-portal/per-type file counts from `content-source/_normalized/` (1,040 files total, verified 50/30/30/20 × 8 portals).

## What this plan does NOT do

- It does **not** open a live database connection by default (see `live-readiness-v2.py` Mode A vs. Mode B below).
- It does **not** insert, update, delete, upsert, or otherwise write any row anywhere.
- It does **not** treat `tools-hub` or `nano-banana` content as importable — both remain fully skipped/deferred regardless of tier logic.

## Script modes (`live-readiness-v2.py`)

- **Mode A (connected, read-only):** If `LIVE_READINESS_DB_URL` (or Supabase read-only/anon credentials) are present in the environment, the script may run **introspection-only** queries (`information_schema.tables`, `information_schema.columns`, `pg_policies`, row counts via `SELECT count(*)`) to confirm the Tier A/B table sets against the *actual* live schema rather than static file evidence. It explicitly never imports a service-role/write-capable client and contains no `INSERT`/`UPDATE`/`DELETE`/`UPSERT`/`COPY`/`TRUNCATE`/`ALTER`/`CREATE`/`DROP` statements anywhere in its source.
- **Mode B (manual / static-evidence fallback — used to produce this station's reports):** If no read-only DB credentials are configured (the default, and the safest posture for a planning-only station), the script falls back to the static-evidence methodology described above — fully reproducible from files already in this repository, with zero network/database access.

## How to run it later (Mode A), when you choose to

1. Create a **read-only** Postgres role or use the Supabase **anon key** scoped by RLS (never the service-role key).
2. Set `LIVE_READINESS_DB_URL` (or `SUPABASE_URL` + `SUPABASE_ANON_KEY`) as environment variables — never commit them to any file in this repo.
3. Run `python content-source/_importer/live-readiness-v2.py`.
4. The script will report whether it ran in Mode A or Mode B, and the evidence source for every classification it makes.

## Output artifacts

- `content-source/_audit/live-dryrun-v2-summary.json` — machine-readable tiered counts
- `content-source/_audit/live-dryrun-v2-details.csv` — per portal/content-type row classification
- `content-source/_audit/live-dryrun-v2-report.md` — full narrative report (14 sections, see file)
