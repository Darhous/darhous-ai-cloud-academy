# Content → Supabase Import Handoff & Post-Import Next-Phase Plan

> **Track:** Content-Source → Supabase Tier-A Draft Import (parallel/independent of the course-content
> phase track in [`CLAUDE_CONTINUATION_CONTEXT.md`](../../CLAUDE_CONTINUATION_CONTEXT.md)).
> **Status as of 2026-06-08:** 600 Tier-A records imported as `draft`, 0 published. Next phase = **planning only**.
> **Read this file first** before doing any further work on `content-source/`, `supabase/generated-content-schemas/`,
> `supabase/migrations/`, `supabase/deferred-migrations/`, or the new core content tables listed below.

---

## 1. Executive Summary

The content-import track took a fully Arabic-first content library (1,040 source files across 8 portals),
normalized and audited it to zero blockers, generated and reviewed new Supabase schema migrations, ran the
core migrations manually (19 new tables), piloted single-record and 10-record batch inserts, and finally
executed a reviewed, transaction-wrapped master import of **600 Tier-A records as `draft`** into the 19 new
tables. Verification confirms `total_draft_rows = 600`, `total_published_rows = 0`, and that `tools_hub`,
`nano_banana`, and the 210 pre-existing live-wired records were **not touched**.

The user then logged in as admin and found **no add/edit/delete/archive/publish/manage-content buttons** —
meaning the next phase cannot assume an admin CMS exists. This is the single most important planning input:
**investigate before building**.

This document is the canonical reference for that import track and contains the full
**"Post-Import Review and Next-Phase Planning"** plan (sections 7–17). No app code, routes, UI, auth,
certificates, exams, migrations, or Supabase data should change as a result of this document — it is
documentation/planning only.

---

## 2. Current Confirmed State (2026-06-08)

**Repo:** `C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy` · **Branch:** `main`
**Latest content-track commit:** `08ec51f content: document final tier-a draft import`
**Latest checkpoint:** `checkpoint/content-final-tier-a-draft-import-v1`

### Supabase content state
| Bucket | Count | Status |
|---|---|---|
| Tier-A imported (19 new core tables) | **600** | all `draft`, 0 `published` |
| Pre-existing live-wired records | **210** | untouched, separate review needed |
| Deferred records (tools_hub/nano_banana/mismatch) | **230** | not imported, decision needed |
| `tools_hub_*` generated tables | 0 created | migration deferred (not app-wired) |
| `nano_banana_*` generated tables | 0 created | migration deferred (naming/schema risk) |
| `nano_banana_custom_prompts` / `nano_banana_saved_prompts` | existing/live | untouched |

Row counts per new table (all `draft`, verified post-import):
`ai_lessons`=20, `ai_resources`=30, `automation_lessons`=20, `automation_resources`=30,
`career_glossary`=50, `career_lessons`=20, `career_prompts`=30, `career_resources`=30,
`digital_exams_glossary`=50, `digital_exams_lessons`=20, `digital_exams_prompts`=30, `digital_exams_resources`=30,
`iot_glossary`=50, `iot_prompts`=30, `iot_resources`=30,
`language_glossary`=50, `language_lessons`=20, `language_prompts`=30, `language_resources`=30
→ **Total = 600 draft rows, 0 published.**

### RLS (verified on all 19 tables)
- `public_read_published_*` (`SELECT`, `qual = status = 'published'`) — public sees nothing because all rows are `draft`.
- `admin_manage_*` (`ALL`, requires `profiles.id = auth.uid() AND profiles.role = 'admin'`).

### App/UI state
No app code, routes, components, dashboards, auth, certificates, or exams were changed by the import track.
No public UI reads this content. **No content is publicly visible.**

### Untracked local files (seen, intentionally not touched)
`.claude/`, `README.backup.20260607-135220.md`, `UX PROMAX.MD`,
`content-source/_audit/generate-core-reports.py` (and sibling generator scripts `generate_10_inserts*.py`,
`generate_10_persistent_inserts.py` — these are the scratch generators behind the pilot/import SQL packages;
harmless, non-portable absolute-path scripts; leave alone unless a future cleanup station decides to convert
them into portable tools or delete them).

---

## 3. What Has Been Completed (condensed station list)

| # | Station | Commit | Checkpoint |
|---|---|---|---|
| 1 | Content source expansion (1,040 files, 8 portals) | `170d6ed` | `checkpoint/content-source-expanded` |
| 2 | Schema audit (found 6,384 issues incl. 499 BLOCKER) | — | — |
| 3 | Normalized copy created (`_normalized/`, 0 BLOCKER, 105 manual-review) | `e75de6c` | `checkpoint/content-source-normalized-v1` |
| 4 | Manual review repair (105/105 repaired, 0 remaining) | `457a4ef` | `checkpoint/content-source-normalized-review-v1` |
| 5 | Final normalized verification (0 BLOCKER/HIGH, no dup IDs) | — | — |
| 6 | Dry-run importer plan (initial 210 vs 440 discrepancy found) | `1f9d32f` | `checkpoint/content-importer-dry-run-v1` |
| 7 | Schema generation — 26 missing tables planned | `d0513ce` | `checkpoint/content-schema-generation-plan-v1` |
| 8 | Generated SQL review (no destructive SQL, RLS safe; 4 ready / 2 blocked) | — | — |
| 9 | Migration packaging (6 migration files staged) | `8308e75` | `checkpoint/content-schema-migration-package-v1` |
| 10 | Core-only refinement — tools_hub & nano_banana deferred to `supabase/deferred-migrations/content-schema-risk/` | `1c2bd30` | `checkpoint/content-schema-core-migration-package-v1` |
| 11 | **User manually executed 4 core migrations in Supabase SQL Editor** → 19 new tables created, 0 rows | — | — |
| 12 | RLS/policy verification on all 19 tables (public-read-published + admin-manage) | — | — |
| 13 | Post-migration live-readiness docs + `live_readiness_v2` resolves 210 vs 440 discrepancy → actionable Tier-A = 600 | `c4a747e` | `checkpoint/content-core-migration-live-readiness-v1` |
| 14 | Tier-A optional field-gap audit (no import-critical blockers; `title_en`/`excerpt_*` gaps noted for later) | `444defd` | `checkpoint/content-tier-a-field-gap-audit-v1` |
| 15 | Single-record pilot — insert + verify + delete `career-glossary-star-method`, table returned to 0 | `88d79e6` | `checkpoint/content-single-record-pilot-v1` |
| 16 | Small-batch transaction pilot — 10 rows in `BEGIN…ROLLBACK`, `total_rows_after_rollback = 0` | `92be87e` | `checkpoint/content-small-batch-transaction-pilot-v1` |
| 17 | 10-record persistent draft import into `career_glossary` (`inserted_count=10`, `draft_count=10`) | — | — |
| 18 | Final Tier-A draft import package generated (master SQL reviewed: `BEGIN…COMMIT`, no `DROP/TRUNCATE/DELETE/ALTER`, no tools_hub/nano_banana) | — | — |
| 19 | **User manually executed final master SQL** → 590 more rows inserted → **600 total draft, 0 published** | — | — |
| 20 | Final import documented & pushed | `08ec51f` | `checkpoint/content-final-tier-a-draft-import-v1` |

Key artifacts to know about (all under `content-source/_audit/`, `content-source/_importer/`, `supabase/`):
`post-migration-verification-report.md`, `live-dryrun-v2-*`, `tier-a-field-gap-*`,
`single-record-pilot-verification-*`, `small-batch-transaction-pilot-verification-*`,
`final-tier-a-draft-import-{master,emergency-rollback,plan,summary,details,verification-report}.*`,
`supabase/MIGRATION_LOG.md`, `supabase/generated-content-schemas/` (26-table plan, incl. README),
`supabase/migrations/2026060812070{1,2,3,6}_*` (executed), `supabase/deferred-migrations/content-schema-risk/` (not executed).

---

## 4. What Has NOT Been Done

- The 210 pre-existing live-wired records have **not** been reviewed/mapped against the new Tier-A content.
- The 230 deferred records (tools_hub naming/product decision + nano_banana naming/schema mismatch) remain unimported.
- `tools_hub_*` and `nano_banana_*` generated migrations remain in `supabase/deferred-migrations/` — **not executed**.
- No metadata repair (`title_en`, `excerpt_ar`, `excerpt_en`) has been done on the 600 imported rows.
- **No admin UI/CRUD/preview exists or has been built for the new content tables.**
- No content has been published (`status` is `draft` for all 600; public RLS only serves `published`).
- No importer hardening (idempotent upsert, checksum, dry-run mode, rollback tooling) has been generalized into a reusable tool.
- No app code, routes, components, or dashboards have been touched by this track.

---

## 5. Admin Observation and Meaning

**Observation:** After the import, the user logged in with an admin account and did **not** see the expected
admin action buttons: add / edit / delete / archive / manage content / publish-unpublish / bulk actions.

**Why this matters:** It means we cannot assume an Admin CMS for this new content exists or is wired up.
Plausible explanations (not yet distinguished — this is exactly what the next station must determine):

1. The admin dashboard has no content-management module at all (for these new tables).
2. The dashboard has sections/routes that are simply not connected to the 19 new core tables.
3. Role detection (`profiles.role = 'admin'`) may not be correctly exposing management actions in the UI.
4. The relevant admin views may be intentionally read-only or incomplete/in-progress.
5. The new tables are purpose-built as draft-only staging and were never meant to plug into existing admin workflows.
6. A net-new internal "draft content manager / preview" may need to be designed from scratch.

This single observation is the **primary driver** of the recommended next station (Section 16).

---

## 6. Immediate Safety Rules (apply to every future session on this track)

- ❌ Do not modify app code, routes, UI components, dashboards, auth, certificates, or exams.
- ❌ Do not modify package/config files or Supabase migrations/schema.
- ❌ Do not connect to Supabase, execute SQL, or use/create a Service Role Key.
- ❌ Do not import more data, publish draft content, or flip any row from `draft` → `published`.
- ❌ Do not touch `tools_hub_*`, `nano_banana_*`, `nano_banana_custom_prompts`, `nano_banana_saved_prompts`.
- ❌ Do not touch the 210 live-wired records.
- ❌ Do not run the emergency rollback (`final-tier-a-draft-import-emergency-rollback.sql`).
- ❌ Do not start UI wiring or admin CRUD implementation.
- ✅ Read-only inspection of repo files, routes, components, and existing docs is fine.
- ✅ Producing reports/plans/docs is fine (and is exactly what the next station should do).

---

## 7. Recommended Next Phase Strategy

**"Investigate before you build."** The single biggest risk right now is building an admin CMS (or a draft
preview) on top of assumptions about how the existing admin dashboard works — when in fact we don't yet know
*why* the expected buttons are missing. The right sequencing is:

1. **Audit** the existing admin dashboard/routes/components/role-checks (read-only) to explain the missing buttons.
2. **Decide**, based on that audit, whether the fix is (a) a small wiring/permission fix to an existing module,
   (b) a net-new lightweight internal draft-preview, or (c) a fuller admin CMS — and size each option.
3. Only **then** plan (not build) the smallest safe UI-facing step — almost certainly a read-only,
   admin-only **draft content preview**, not full CRUD.
4. In parallel (still planning-only), define the **metadata repair** plan, the **importer hardening** plan, and
   the strategies for the 210 live-wired and 230 deferred records — so that once UI work is authorized, none of
   it is blocked waiting on more investigation.
5. Defer Tools Hub / Nano Banana decisions to dedicated product-alignment stations — they are schema/product
   decisions, not import-mechanics decisions, and rushing them risks colliding with the live `nano_banana_*` tables.

---

## 8. Admin Dashboard Investigation Plan (read-only)

Goal: explain *why* add/edit/delete/archive/publish controls were not visible to an admin account, without
changing anything.

What to inspect (read-only):
- **Routes/pages:** locate the admin dashboard route(s) (e.g. `src/app/[locale]/admin/**` or similar) and any
  content-management sub-routes/tabs.
- **Components:** find `AdminDashboardClient` and any content-list/content-editor components; check what data
  sources (tables) they query and whether the 19 new core tables (or any generic "content" abstraction) appear.
- **Role/permission gating:** trace how `profiles.role === 'admin'` (or equivalent) is read and how it gates
  button visibility — confirm whether the condition is server-side, client-side, or both, and whether it could
  silently fail (e.g. missing role on the session, stale client cache, feature flag, env var).
- **Existing CMS patterns:** the platform already manages other content types (courses, lessons, IoT, automation,
  Nano Banana prompts, career uploads, etc.) — find out how *those* admin flows work today; the new content
  tables likely need to either reuse that pattern or explain why they can't.
- **Navigation/menu config:** check whether menu items for new sections exist but are hidden by a flag, a
  `comingSoon`-style guard, or a route that 404s.

Deliverable: a short **"Admin Dashboard Readiness Audit"** report classifying the root cause as one (or a
combination) of the six possibilities in Section 5, with file/route references — no code changes.

---

## 9. Draft Content Preview Plan (planning-only)

Before any CRUD is considered, plan a minimal **read-only, admin/internal-only preview** of the 600 draft rows:

- Purpose: let the admin/team *see* what was imported (titles, categories, tags, body/excerpt) without needing
  full CRUD, and without any public exposure.
- Access model: must honor existing `admin_manage_*` RLS (server-side admin check), never use a public/anon path.
- Scope: read-only list + detail view per portal/content-type/status filter — no edit, no publish, no delete.
- Should explicitly piggyback on whatever admin-auth pattern the Section 8 audit finds already works elsewhere,
  rather than inventing a new one.
- This is the **safest possible first UI-facing step** — strictly additive, read-only, internal-only, and trivially
  reversible (it's just a new read query + view).

Do not build this yet — only produce the design/plan and a small task breakdown/estimate.

---

## 10. Metadata Repair Plan (planning-only)

The Tier-A field-gap audit found **no import-critical blockers**, but flagged optional gaps that matter for
public-facing quality: `title_en`, `excerpt_ar`, `excerpt_en` (and related lesson fields like `reading_time`,
`parent_id` from the earlier schema audit).

Recommended sequencing relative to UI work:
- **Repair should happen *before* any public/UI wiring of this content — but does not block building the
  internal draft preview** (a preview can legitimately show "field missing" gaps; that's useful diagnostic info).
- Repair plan should: (a) quantify exactly which of the 600 rows/fields are affected (the field-gap audit already
  has this — `tier-a-field-gap-{summary,details,report}`), (b) define a safe, non-destructive repair method
  (e.g. generate `UPDATE` statements reviewed the same way the import SQL was reviewed — transaction-wrapped,
  assertion-checked, user-executed manually), and (c) re-run the field-gap audit after repair to confirm closure.
- No repair SQL should be executed in this phase — only planned.

---

## 11. Importer Hardening Plan (planning-only)

For future content updates (new batches, corrections, re-imports), plan — but do not build — a reusable importer with:
- **Idempotent upsert** keyed on the existing `id` (matches the normalized content IDs already verified unique).
- **Checksum/hash** per source file to detect changed content and avoid redundant writes.
- **Dry-run mode by default** (mirrors the existing `live-readiness-v2` / `dry-run-importer` pattern).
- **No delete by default** — deletions should require an explicit, separately-reviewed step (like the emergency
  rollback was kept separate from the master import).
- **Report generation** consistent with the existing `_audit/` report conventions (`*-summary.json`, `*-details.csv`, `*-report.md`).
- **Manual-execution model preserved** — keep the "Claude prepares SQL/scripts, user executes in Supabase SQL
  Editor" pattern that has worked safely through 20 stations; do not introduce direct DB connections or a
  Service Role Key.

---

## 12. 210 Live-Wired Records Strategy (planning-only)

- These records are **already live and presumably already serving the production app** — they must be treated
  as higher-risk than the 600 fresh draft rows.
- Before any action: produce a **mapping report** — for each of the 210, identify its table, portal, content
  type, current status, and whether/how it's referenced by app code or routes.
- Explicitly check for **overlap** with the 600 newly-imported Tier-A records (same IDs/slugs in different
  tables would be a collision risk for any future publish step).
- Any future import/update touching these 210 must go through the same manual-review → pilot → transaction →
  user-executes-in-SQL-Editor pipeline already proven safe — never a direct write.
- **No changes to these 210 in this phase or the next station.**

---

## 13. Deferred 230 / Tools Hub / Nano Banana Strategy (planning-only)

- **Tools Hub (generated migration deferred):** requires a **product decision** first — is "Tools Hub" a
  content portal that should get its own `tools_hub_glossary/prompts/resources/lessons` tables, or does its
  content belong somewhere else? This is a product-alignment question, not an import-mechanics one. Do not
  execute `20260608120704_tools_hub_content_tables.sql` until that's decided.
- **Nano Banana (generated migration deferred):** higher risk — the app already uses `nano_banana_custom_prompts`
  and `nano_banana_saved_prompts`. Executing `20260608120705_nano_banana_content_tables.sql` as-is could create
  naming collisions or confusing parallel structures. Needs a **schema-alignment review**: should new
  `nano_banana_glossary/prompts/resources/lessons` tables coexist with the old ones, replace them, or should the
  30 `nano-banana/prompts` Tier-A records instead be mapped into the *existing* `nano_banana_custom_prompts` table?
- **Remaining ~200 of the 230:** mostly the 30 nano-banana prompts plus other gaps identified in
  `live-dryrun-v2`. These should be re-classified once the Tools Hub and Nano Banana decisions are made — some
  may become importable Tier-B candidates afterward.
- **Forbidden for now:** executing either deferred migration, writing any tools_hub/nano_banana data, or
  modifying the existing `nano_banana_*` live tables.

---

## 14. Publishing Strategy (planning-only — no publishing now)

- **No bulk publish, ever, as a first move.** All 600 rows stay `draft` until reviewed.
- Recommended eventual approach (to be detailed in a future station, not now): publish **incrementally by
  portal + content type** (e.g. start with `career_glossary`, the same table used in every pilot, since it has
  the most verification history), only after: (a) the admin preview exists and has been used to actually look
  at the content, and (b) metadata repair has closed the `title_en`/`excerpt_*` gaps for that slice.
- Each publish step should itself follow the same manual-review → transaction-wrapped → user-executes pattern —
  i.e. publishing is just another reviewed `UPDATE ... SET status = 'published'` batch, not a new mechanism.
- Until an admin preview exists, there is no safe way to "look before publishing" — so publishing is
  **structurally blocked** on Section 9 being completed first.

---

## 15. Risks and Guardrails

| Risk | Guardrail |
|---|---|
| Building admin CRUD on wrong assumptions about existing dashboard | Run the Section 8 audit first; do not skip to building |
| Accidentally exposing draft content publicly | All 600 rows are `draft`; public RLS filters on `published` — verify this remains true; never flip status without explicit reviewed SQL |
| Colliding with `nano_banana_*` live tables | Keep nano_banana migration deferred; require schema-alignment review before any execution |
| Overwriting/duplicating the 210 live-wired records | Produce mapping/overlap report before touching them; never direct-write |
| Losing the proven safety pattern (Claude prepares, user executes in SQL Editor) | Preserve it for all future SQL — no direct DB connections, no Service Role Key |
| Scope creep into UI/CRUD before investigation completes | Treat Section 8 audit as a hard gate before any UI planning becomes UI building |

---

## 16. Recommended Next Station

> **`Admin Dashboard and Draft Content Preview Readiness Audit`**

This station should be **read-only and planning-only**. It should:
- Inspect the current admin dashboard routes, components, and role/permission checks.
- Determine *why* the expected add/edit/delete/archive/publish/manage-content buttons are missing for the admin account
  (classify against the six possibilities in Section 5, with concrete file/route evidence).
- Determine whether admin CRUD for the new content tables is **missing**, **hidden**, or **not yet wired**.
- Recommend whether the right next build (in a *future*, separate station) is: a small fix to existing admin
  wiring, a minimal internal draft-content preview (Section 9), or a fuller admin CMS — and roughly size each.
- Produce a written **report + recommendation**, and nothing else.

It must **not**: implement add/edit/delete/archive/publish controls, publish content, wire public UI, or touch
Supabase data.

---

## 17. Exact Antigravity Prompt for the Next Station

```
STATION: Admin Dashboard and Draft Content Preview Readiness Audit
PROJECT: Darhous AI Cloud Academy / NexaLearn
REPO: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
BRANCH: main
MODE: Read-only investigation + planning/report only. NO implementation.

CONTEXT:
600 Tier-A content records were just imported into Supabase as `draft` across 19 new core content
tables (career/language/digital-exams/ai/automation/iot). 0 published. Full history is documented in
docs/handoffs/content-supabase-import-handoff.md — read that file first for complete context.

After the import, the user logged into the platform with an ADMIN account and did NOT see the expected
admin action buttons: add / edit / delete / archive / manage content / publish-unpublish / bulk actions.

YOUR TASK (investigation + report only — make NO code changes):
1. Locate and read the admin dashboard route(s)/page(s) and components (e.g. AdminDashboardClient and
   any content-management sub-views). Identify what content/tables they currently read from.
2. Trace how admin role is determined and how it gates UI actions (server-side page guard vs.
   client-side conditional rendering vs. both). Identify whether this could silently hide buttons.
3. Identify whether the platform has ANY existing content-management UI pattern (e.g. for courses,
   IoT, automation recipes, Nano Banana prompts, career uploads) and how it's wired — this is the
   reference pattern any future content-manager should likely follow or explicitly diverge from.
4. Determine, with file/route evidence, which of these explains the missing buttons:
   (a) no content-management module exists for these new tables,
   (b) a module exists but isn't connected to the new tables,
   (c) role detection isn't correctly exposing actions,
   (d) the relevant views are intentionally read-only/incomplete,
   (e) the new tables are draft-only staging never meant to plug into admin workflows,
   (f) a new internal draft-content manager/preview needs to be designed from scratch.
5. Recommend (do not build) the smallest safe next UI-facing step — most likely a read-only,
   admin-only "draft content preview" — and roughly size it vs. a fuller admin CMS.

OUTPUT: A single audit report (e.g. content-source/_audit/admin-dashboard-readiness-audit-report.md
or docs/ — your choice, documentation only) with findings, evidence (file paths/line refs), root-cause
classification, and a sized recommendation for the next *separate* build station.

STRICT FORBIDDEN ACTIONS (same as the import track):
Do NOT modify app code/routes/UI/dashboards/auth/certificates/exams/package/config/migrations.
Do NOT connect to Supabase, run SQL, create/use a Service Role Key, import data, publish content,
flip draft→published, touch tools_hub/nano_banana/the 210 live-wired records, or run any rollback.
Do NOT implement add/edit/delete/archive/publish controls. Do NOT wire any UI. Investigation and a
written report/recommendation ONLY.
```

---

*This file is the canonical reference for the content-source → Supabase import track. Update it (not
`CLAUDE_CONTINUATION_CONTEXT.md`) as this track progresses — that file tracks the separate course-content
phase track and only carries a one-line pointer to this one.*
