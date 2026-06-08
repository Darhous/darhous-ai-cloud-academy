# Live Dry-Run V2 Report — Post-Migration Readiness Re-Validation

**Generated:** 2026-06-08 · **Mode:** B (static evidence, no DB connection — see §3) · **Type:** Read-only analysis. No data imported. No database write of any kind performed.

---

## 1. Executive Summary

The two earlier importer reports (210/830 and 440/600) are now **stale** — both were generated *before* the manual core-content migration created 19 new tables. This report computes a fresh, transparent, fully-reproducible **`live_readiness_v2`**, which **supersedes both**.

Headline numbers:
- **810 / 1,040** files (78%) target a table that now exists ("raw importable", same yardstick the old reports used)
- But a flat importable/skipped split hides the real risk picture. Splitting that 810 by *what kind* of table it targets:
  - **🟢 600 files (58%)** target the 19 brand-new, empty, isolated, RLS-protected tables → **safe to plan a staged import**
  - **🟡 210 files (20%)** target *pre-existing, presumably live-wired* tables → **table exists, but importing here is a different and higher-risk operation that needs its own review**
  - **🔴 230 files (22%)** target tables that don't exist at all → **tools-hub (fully) + 3 of 4 nano-banana types — remain correctly deferred**

**The actionable number for "what can we safely start planning to import right now" is 600, not 810, not 440, not 210.**

---

## 2. Confirmed Post-Migration DB State

(Carried over from `post-migration-verification-report.md` — see that file for full detail)

- 19 new core tables exist, all at **0 rows**, RLS enabled, with `public_read_published_*` (SELECT, published-only) and `admin_manage_*` (ALL, admin-role-gated) policies verified on each.
- Deferred `tools_hub_*` (4 tables) and new-naming `nano_banana_*` (`glossary`/`resources`/`lessons`, 3 tables) confirmed **absent**.
- Pre-existing `nano_banana_custom_prompts` / `nano_banana_saved_prompts` confirmed present and **unrelated** to the new/deferred migrations.
- Zero content imported. Zero app/route/admin/production code changed.

---

## 3. Live Schema Source Used

**Mode B (static evidence) was used — no database connection was attempted**, because:
- `LIVE_READINESS_DB_URL` / read-only Supabase credentials are not configured in this environment (verified: not present as environment variables), and
- this station's brief explicitly frames "connected read-only mode" as conditional ("*if safe read-only database access is available*") with a **required** manual fallback — and a planning-only station is exactly the context where deferring any live connection is the more conservative choice.

Instead, the live schema picture was reconstructed from **three independent, cross-checked, file-based evidence sources**, all already in the repository:

1. **`content-source/_importer/table-compatibility-matrix.csv`** — the pre-migration "does this table already exist?" detection (this is what produced the *old* 210-number; see §8). It correctly identifies the **6 tables that pre-date this entire content-source effort**.
2. **The user's manually-verified Dashboard checks**, recorded in `post-migration-verification-report.md` and `supabase/MIGRATION_LOG.md` — the authoritative list of the **19 tables created on 2026-06-08**.
3. **`supabase/deferred-migrations/content-schema-risk/*.sql` filenames** — confirming exactly which 7 candidate tables remain entirely absent.

Cross-checking these three sources against each other and against the 1,040-file inventory, **every single one of the 32 portal/content-type combinations resolves to exactly one tier with no ambiguity** (see `live-dryrun-v2-details.csv` for the full per-row breakdown). `live-readiness-v2.py` is built to re-run this exact cross-check automatically in the future, and to switch to live introspection (Mode A) the moment read-only credentials are made available — see `live-readiness-v2-plan.md`.

---

## 4. Existing Tables Detected

**Tier A — 19 newly-created tables** (created 2026-06-08, confirmed empty + RLS-correct):
`career_{glossary,prompts,resources,lessons}`, `language_{glossary,prompts,resources,lessons}`, `digital_exams_{glossary,prompts,resources,lessons}`, `ai_resources`, `ai_lessons`, `automation_resources`, `automation_lessons`, `iot_glossary`, `iot_prompts`, `iot_resources`

**Tier B — 6 pre-existing tables** (predate this effort; defined in legacy migrations):
| Table | Defined in |
|---|---|
| `ai_glossary` | `supabase/v22_ai_glossary.sql` |
| `ai_prompts` | `supabase/v24_ai_prompts.sql` |
| `automation_glossary` | `supabase/v33_automation_glossary.sql` |
| `automation_prompts` | `supabase/v37_automation_prompts.sql` |
| `iot_lessons` | `supabase/v42_iot_lessons.sql` |
| `nano_banana_custom_prompts` | `supabase/v14_nano_banana_custom_prompts.sql` |

These six were exactly the set the original `dry-run-importer.py` detected (see §8 — this is not a coincidence, it's the proof of the root cause).

---

## 5. Deferred Tables Confirmed Absent

**Tier C — 7 candidate tables do not exist**, matching the deferred migration package exactly:
`tools_hub_glossary`, `tools_hub_prompts`, `tools_hub_resources`, `tools_hub_lessons`, `nano_banana_glossary`, `nano_banana_resources`, `nano_banana_lessons`

(Note: `nano_banana_prompts` was never expected as a separate Tier C entry — the nano-banana "prompts" content type maps to the *pre-existing* `nano_banana_custom_prompts`, which is why it appears in Tier B instead, flagged specially — see §10.)

---

## 6. Normalized Files Analyzed

**1,040 files total**, verified as exactly 8 portals × (glossary 50 + prompts 30 + resources 30 + lessons 20 = 130) = 1,040. Full per-portal/per-type breakdown is in `live-dryrun-v2-details.csv` (32 rows, one per portal/content-type combination).

---

## 7. Live Readiness V2 Counts

| Tier | Meaning | File count | % of total |
|---|---|---|---|
| 🟢 **A** — New, isolated, safe | Targets one of the 19 brand-new tables: empty, RLS-protected, zero app dependency | **600** | 57.7% |
| 🟡 **B** — Pre-existing, live-wired, caution | Table exists, but predates this effort and is presumably read by live app routes / may hold real data | **210** | 20.2% |
| 🔴 **C** — Deferred, missing | Target table does not exist (tools-hub fully + 3/4 nano-banana types) | **230** | 22.1% |
| — Unclassified | (none found — every row resolved cleanly) | 0 | 0% |
| **Total** | | **1,040** | **100%** |

Two ways to read "importable":
- **Raw "table exists" count (comparable to old reports' yardstick):** 600 + 210 = **810 importable / 230 skipped**
- **Recommended actionable count (what's safe to *start planning* importing now):** **600** (Tier A only)

---

## 8. 210 vs. 440 Discrepancy — Root Cause & Resolution

I traced both numbers to their exact source code, and the discrepancy is now fully explained:

### Where "210" came from — `content-source/_importer/dry-run-importer.py`
This script **dynamically computes** its numbers by:
1. Calling `os.listdir(supabase_dir)` — listing only the **top-level** `.sql` files directly inside `supabase/` (it does **not** recurse into `supabase/migrations/`).
2. Regex-matching `CREATE TABLE (IF NOT EXISTS)? <name>` in those files to build an `existing_tables` set.
3. For each normalized file, guessing a candidate table name via `guess_table_name(portal, content_type)` and checking membership in that set.

At the time this script ran (11:47, **before** the core migration was packaged into `supabase/migrations/` at 12:07–12:16, and long before it was manually executed), the only tables its scan could find were the **6 legacy tables** in Tier B above (`ai_glossary`, `ai_prompts`, `automation_glossary`, `automation_prompts`, `iot_lessons`, `nano_banana_custom_prompts`). Their combined file count is **50+30+50+30+20+30 = 210** — an exact match. ✅ **210 was empirically correct *for the moment it was computed*** — it just reflects a database snapshot that has since changed.

### Where "440" came from — `content-source/_importer/readiness-analyzer.py`
This script does **not** compute its numbers from a live scan at all. The values `"importable_count": 440, "skipped_due_to_missing_tables": 600` are **hard-coded literals** directly in the Python source (lines 66–67), labeled only as "the verified dry-run baseline" with **no traceable derivation** — no scan, no regex, no file-by-file logic produces this number anywhere in that script. It does not decompose cleanly against either the pre-migration (210) or post-migration (810/600) table sets.

**Conclusion: "440" is an asserted/estimated figure whose provenance cannot be reproduced from the tooling that reported it — it should be treated as unreliable. "210" was reproducible and correct, but for a database snapshot that no longer exists.**

### Why `live_readiness_v2` supersedes both
`live_readiness_v2` is the only one of the three that:
1. Is computed against the **current, post-migration** table landscape (verified by the user's own manual Dashboard checks — the strongest evidence available),
2. Shows its **full derivation** in `live-dryrun-v2-details.csv` (every one of the 32 rows traceable to a named source file),
3. Goes a level deeper than "does the table exist" to ask "is it *safe* to import here" — which neither of the old reports attempted.

---

## 9. Missing Optional Fields — Impact Assessment

`normalized-schema-audit-summary.json` reports, across all 1,040 files: **`title_en` missing in 425 files (40.9%)** and **`excerpt_ar` missing in 11 files (1.1%)** — yet both are excluded from the BLOCKER/HIGH/MEDIUM/LOW severity counts (which are all 0), implying Antigravity's audit treats them as **optional** fields.

This station did **not** cross-reference *which specific files* (i.e., whether they fall mostly in Tier A, B, or C) are missing these fields — doing so would require a full read of `normalized-schema-audit-details.csv` (potentially 1,040+ rows), which this read-only/low-token station chose to avoid per its own scope guidance. **This is a clear, scoped follow-up recommendation**: before any Tier-A pilot is scaled beyond a single record, cross-reference the per-file missing-field list against the 600 Tier-A files to learn what fraction would render with a blank English title or Arabic excerpt — a UI-completeness risk, not a data-safety risk, but worth knowing before bulk-scheduling.

---

## 10. Skipped / Deferred / Product-Risk Content

| Group | File count | Reason |
|---|---|---|
| `tools-hub` (all 4 types) | 130 | Tables don't exist; portal not live-app-wired; deferred by product decision |
| `nano-banana` glossary/resources/lessons | 100 | Tables don't exist; deferred pending naming/app-alignment decision |
| `nano-banana` prompts → `nano_banana_custom_prompts` | 30 | **Special case** (see below) |

**Special flag — `nano-banana/prompts` (30 files):** the candidate table `nano_banana_custom_prompts` technically *exists* (it's in Tier B), so a naive importable/skipped split would count these 30 files as "importable." But this is precisely the **old table that the newly-generated `nano_banana_prompts` schema was designed to replace/align with** — the same naming-mismatch risk that caused the entire `nano_banana_*` migration group to be deferred in the first place (`importer-plan.md` explicitly calls this out: *"routing/portal ID naming mismatch needs resolution first"*). **Recommendation: fold these 30 files into the deferred/skip group conceptually, alongside the other 230 — do not treat them as "ready."** This brings the realistic deferred/high-risk pool to **260 files (230 + 30)**, and the realistic safe pool stays at exactly **600**.

---

## 11. First Pilot Recommendation (recommendation only — not executed)

Confirms and refines the recommendation already on record from the prior planning station:

- **Table:** `career_glossary` (Tier A — new, isolated, empty, RLS-protected, zero app dependency)
- **Scope:** exactly **1 record**, status = `'draft'`
- **Why this and not a Tier-B table** (e.g. `automation_glossary`, which the *original* `importer-plan.md` recommended as "the cleanest path"): that recommendation was written when only Tier-B tables existed. Now that 19 zero-risk Tier-A tables exist, **they are strictly safer first-pilot targets** — a mistake in `career_glossary` is invisible to every user and trivially reversible; a mistake in `automation_glossary` touches a table the live app already serves to real users.
- **Cycle:** insert (draft) → verify row + RLS behavior (admin-only visibility) → delete → re-verify table returns to 0 rows.

---

## 12. Forbidden Actions (unchanged — reinforced by this analysis)

- No bulk import of any size — not 1,040, not 600, not "just Tier A"
- No import into Tier C (`tools_hub_*`, `nano_banana_glossary/resources/lessons`)
- No import into the **special-cased** `nano_banana_custom_prompts` (30 files) without first resolving the exact naming/alignment question that caused the whole nano-banana group to be deferred
- No import into Tier B tables generally without a **separate**, dedicated review (ID-collision strategy, live-data-impact assessment, schema-shape verification beyond "table exists")
- No `status='published'` on any pilot record
- No app/route/admin/dashboard/auth/production-wiring changes
- No live database connection / writes from any tooling in this phase

---

## 13. Next Station Recommendation

A single, narrowly-scoped station: **"Tier-A Field-Mapping Cross-Check + Single-Record Pilot Proof"** — i.e.
1. Cross-reference `normalized-schema-audit-details.csv` against the 600 Tier-A files to quantify the `title_en`/`excerpt_ar` gap within the safe pool (closes the §9 follow-up).
2. Execute (only on explicit go-ahead) the single-record `career_glossary` pilot exactly as scoped in §11, and produce a short "Pilot Insert/Rollback Verification" note.

Only after both succeed should "build a real importer for Tier A at small-batch scale" become a topic of discussion — and even then, starting with one portal's one content-type, never the full 600.

---

## 14. Exact Commands / Method Used

```bash
# Repo state checks
git status --short
git log --oneline -3
ls supabase/config.toml                       # confirms absence

# Evidence gathering (read-only file reads — no DB connection)
Read content-source/_importer/field-mapping.json
Read content-source/_importer/table-compatibility-matrix.csv
Read content-source/_importer/importer-plan.md
Read content-source/_importer/readiness-analyzer.py     # found hard-coded 440/600
Read content-source/_importer/dry-run-importer.py       # found dynamic scan producing 210/830
Read content-source/_audit/normalized-schema-audit-summary.json
Read content-source/_audit/importer-dry-run-summary.json
Read content-source/_audit/importer-readiness-summary.json
Read supabase/migrations/20260608120706_remaining_content_tables.sql   # spot-check structure

# Corroborating which legacy files define the 6 Tier-B tables
ls supabase/*.sql
grep -ilE "CREATE TABLE (IF NOT EXISTS )?(ai_glossary|ai_prompts|automation_glossary|automation_prompts|iot_lessons|nano_banana_custom_prompts)\b" supabase/*.sql

# Per-portal/per-type normalized file counts (grounding for the 1,040 total and the CSV)
for portal in ai-academy automation career digital-exams iot-lab language nano-banana tools-hub; do
  for type in glossary prompts resources lessons; do
    ls "content-source/_normalized/$portal/$type" | wc -l
  done
done

# Tiered classification computed via:
python content-source/_importer/live-readiness-v2.py   # Mode B (static evidence; no DB connection attempted)
```

**No database connection was made. No data was imported, inserted, updated, deleted, or upserted. No migration was run. No app/route/admin/config/package file was modified.**
