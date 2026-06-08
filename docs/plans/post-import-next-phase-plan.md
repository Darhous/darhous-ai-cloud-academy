# Post-Import Next-Phase Plan — Darhous AI Cloud Academy

> **Status:** Planning only. No implementation. No code, route, schema, or data changes.
> **Primary source:** [`docs/handoffs/content-supabase-import-handoff.md`](../handoffs/content-supabase-import-handoff.md) — read that first for full station-by-station history.
> **Folder convention note:** `docs/` currently holds flat reference docs (`GITHUB_REPOSITORY_POLISH.md`,
> `LANGUAGE_LEGACY_INTEGRATION_MAP.md`) and a new `docs/handoffs/` collection. There was no existing
> `docs/plans/` convention, so this file uses the path the user specified — it cleanly separates
> "what happened" (handoffs) from "what should happen next" (plans) going forward.

---

## 1. Executive Summary

The Tier-A content import succeeded exactly as designed and is now closed out:

- **600 records** imported into **19 new core content tables**, all with `status = 'draft'`.
- **0 published rows.** Public RLS (`status = 'published'`) means none of this content is visible to
  end users — the import is, by construction, invisible to the live platform.
- **No UI wiring, no admin CMS changes, no app code changes** occurred as part of the import.
- When the user checked the admin dashboard for this new content, **no management controls
  (add/edit/delete/archive/publish/bulk) appeared** — and code inspection (Section 5) shows *why*:
  the platform's existing generic CMS system simply does not yet know these 19 tables exist.

**The platform is in a clean, safe, fully-reversible "data staged, nothing wired" state.** The right next
move is *not* to start building a CMS — it's to run one focused, read-only audit station that confirms the
hypothesis in Section 5 and sizes the smallest safe fix, before anything is built.

---

## 2. Current Confirmed State

### Database state
| Bucket | Count | Status |
|---|---|---|
| Tier-A imported (19 new tables) | **600** | all `draft`, 0 `published` |
| Pre-existing live-wired records | **210** | untouched |
| Deferred records (tools_hub / nano_banana / mismatches) | **230** | not imported |
| `tools_hub_*` tables | 0 created | migration deferred, not executed |
| `nano_banana_*` (new) tables | 0 created | migration deferred, not executed |
| `nano_banana_custom_prompts` / `nano_banana_saved_prompts` | live | untouched |

Per-table row counts (all `draft`): `ai_lessons`=20, `ai_resources`=30, `automation_lessons`=20,
`automation_resources`=30, `career_glossary`=50, `career_lessons`=20, `career_prompts`=30,
`career_resources`=30, `digital_exams_glossary`=50, `digital_exams_lessons`=20, `digital_exams_prompts`=30,
`digital_exams_resources`=30, `iot_glossary`=50, `iot_prompts`=30, `iot_resources`=30,
`language_glossary`=50, `language_lessons`=20, `language_prompts`=30, `language_resources`=30 → **= 600**.

RLS verified on all 19 tables: `public_read_published_*` (`SELECT … WHERE status = 'published'`) and
`admin_manage_*` (`ALL … WHERE profiles.role = 'admin'`).

### Content state
1,040 source files normalized to 0 BLOCKER / 0 HIGH; 600 of those (Tier-A) are now persisted as draft rows;
440 remain outside this import (210 live-wired + 230 deferred).

### App state
No app code, routes, components, dashboards, auth, certificates, or exam logic changed. No public route
queries the 19 new tables. No admin route/section references them either (see Section 5 — confirmed by
direct code inspection, not assumption).

### Admin observation
Logging in as admin shows **no add/edit/delete/archive/publish/manage-content/bulk-action controls** for
this new content. Section 5 explains the most probable cause with file-level evidence.

### Excluded / untouched groups
210 live-wired records, 230 deferred records, `tools_hub` (schema + data), `nano_banana` (new schema +
existing `nano_banana_custom_prompts`/`nano_banana_saved_prompts`).

### Current releases/checkpoints (content-import track, newest first)
`checkpoint/content-final-tier-a-draft-import-v1` (commit `08ec51f`) ·
`checkpoint/content-small-batch-transaction-pilot-v1` (`92be87e`) ·
`checkpoint/content-single-record-pilot-v1` (`88d79e6`) ·
`checkpoint/content-tier-a-field-gap-audit-v1` (`444defd`) ·
`checkpoint/content-core-migration-live-readiness-v1` (`c4a747e`) ·
`checkpoint/content-schema-core-migration-package-v1` (`1c2bd30`) ·
`checkpoint/content-schema-migration-package-v1` (`8308e75`) ·
`checkpoint/content-schema-generation-plan-v1` (`d0513ce`) ·
`checkpoint/content-importer-dry-run-v1` (`1f9d32f`) ·
`checkpoint/content-source-normalized-review-v1` (`457a4ef`) ·
`checkpoint/content-source-normalized-v1` (`e75de6c`) ·
`checkpoint/content-source-expanded` (`170d6ed`).
Full station-by-station detail lives in the handoff (Section 3 there).

---

## 3. What Has Been Completed

- **Content-source expansion:** 1,040 Arabic-first files across 8 portals, committed and inventoried.
- **Normalization & repair:** schema-audited (6,384 issues found), normalized to `_normalized/`, 105
  manual-review items repaired → final state 0 BLOCKER / 0 HIGH / 0 manual-review-required.
- **Schema generation:** 26 new content tables planned under `supabase/generated-content-schemas/`,
  reviewed for safety (no destructive SQL, safe RLS), classified ready (4 files) vs. blocked/deferred (2 files).
- **Migrations:** packaged into `supabase/migrations/`; Tools Hub & Nano Banana split out into
  `supabase/deferred-migrations/content-schema-risk/`; **user manually executed the 4 core migrations**
  in the Supabase SQL Editor → 19 new tables created, RLS verified.
- **Pilots:** single-record insert/verify/delete pilot (`career-glossary-star-method`, returned to 0 rows);
  10-record transaction-rollback pilot (`BEGIN…ROLLBACK`, returned to 0 rows); 10-record **persistent**
  draft import into `career_glossary`.
- **Final Tier-A import:** reviewed master SQL (`BEGIN…COMMIT`, assertions, no destructive statements,
  no tools_hub/nano_banana) executed by the user → **590 more rows → 600 total draft, 0 published**.
- **Documentation:** every station has a report/summary/details artifact under `content-source/_audit/`
  and `content-source/_importer/`; final state captured in
  [`content-supabase-import-handoff.md`](../handoffs/content-supabase-import-handoff.md) and pointed to
  from `CLAUDE_CONTINUATION_CONTEXT.md`.

---

## 4. What Has NOT Been Done

- ❌ No public UI wiring of the 19 new tables / 600 records.
- ❌ No admin CMS implementation for this content (no registry entries, no panel, no routes — confirmed by code inspection).
- ❌ No publishing — all 600 rows remain `draft`; `total_published_rows = 0`.
- ❌ No metadata repair (`title_en` / `excerpt_ar` / `excerpt_en` gaps remain as documented in the field-gap audit).
- ❌ No review or import of the 210 live-wired records.
- ❌ No import of the 230 deferred records.
- ❌ No decision on `tools_hub` (product placement) or `nano_banana` (naming/schema alignment with the
  existing `nano_banana_custom_prompts`/`nano_banana_saved_prompts` tables).
- ❌ No generalized/hardened importer (idempotent upsert, checksum, dry-run-by-default tooling) — only
  one-shot, hand-reviewed scripts exist so far.

---

## 5. Admin Dashboard Problem Statement

**Observation:** an admin account shows no add/edit/delete/archive/publish/manage/bulk controls for the
newly-imported content.

**Code-level investigation already performed (read-only) found a concrete, evidence-backed explanation —
this is the leading hypothesis the audit station should *confirm and finish sizing*, not start from zero:**

The platform already has a **working, generic, registry-driven admin CMS system**:
- [`src/lib/admin/cms-registry.ts`](../../src/lib/admin/cms-registry.ts) — a `CMS_REGISTRY` array of
  `CmsTypeConfig` entries (table, portal, content type, field schema, labels), explicitly built (per its
  own header comment) so that "22 remaining content tables (Automation 11, IoT Lab 10, Digital Exams 1)
  don't need 22 hand-written route files."
- [`src/app/api/admin/cms/[table]/route.ts`](../../src/app/api/admin/cms/%5Btable%5D/route.ts) and its
  `[id]/route.ts` sibling — generic list/create/update/delete REST endpoints that look up the table in
  `CMS_BY_TABLE`, return `404 Unknown content type` for anything not registered, and gate everything
  behind `verifyAdminRequest()`.
- `GenericCmsTypePanel`, `AutomationCMSPanel`, `IoTCMSPanel`, `ExamsCMSPanel` (under
  `src/components/admin/cms/`) — generic list+form UI driven by the same registry entries.
- [`AdminDashboardClient.tsx`](../../src/components/admin/AdminDashboardClient.tsx) wires fixed tabs
  (`automation-cms`, `iot-cms`, `exams-cms`, `ai-glossary`, `ai-tools-cms`, `ai-prompts-cms`,
  `ai-courses-cms`, `ai-projects-cms`, `ai-paths-cms`, `blog`, `nano-banana`, …) to these panels.

**Confirmed by direct inspection:** none of the 19 new Tier-A tables (`career_glossary`, `career_lessons`,
`career_prompts`, `career_resources`, `language_glossary/lessons/prompts/resources`,
`digital_exams_glossary/lessons/prompts/resources`, `ai_lessons`, `ai_resources`, `automation_lessons`,
`automation_resources`, `iot_glossary`, `iot_prompts`, `iot_resources`) appear anywhere in `CMS_REGISTRY`,
nor do they have a dedicated tab/panel. The existing `career` and `language` tabs in the dashboard
(`AdminDashboardClient.tsx` ~lines 1502, 1890) are **portal stat/quick-link dashboards** (counts like
"CV Templates: 10+", links to `/career/cv-analyzer` etc.) — not content CRUD — so they would never have
shown glossary/lesson/prompt/resource management controls regardless of what's in the database.

**Most probable root cause (to be *confirmed*, not assumed, by the audit station):**
> The generic CMS module exists and works — but the 19 new tables were never added to its registry
> and never given a tab. This is **cause (b)**: *"a module exists but isn't connected to the new tables,"*
> combined with **(e)**: *"the new tables are draft-only staging never (yet) wired into admin workflows."*
> It is very likely **not** a role-detection bug (cause c) — `getServerSession()` /
> `verifyAdminRequest()` use the same `profiles.role === 'admin'` check that already gates the working
> CMS sections for Automation/IoT/Exams/AI/Blog/Nano-Banana, and those sections work for admins today.

Other possibilities the audit should still rule in/out for completeness, with evidence:
- (a) no CMS module exists at all → **unlikely**, contradicted by the registry/panel system found.
- (c) role check doesn't detect admin → **unlikely**, same check gates working sections.
- (d) feature flags hide actions → check `feature-flags` admin route/`site-settings` for any gate.
- (f) routes exist but aren't linked → check for orphaned/未-tabbed panel components.
- (g) RLS allows admin SQL but UI doesn't expose actions → confirmed true *for these tables specifically*,
  precisely because no UI path to them has been built yet.

---

## 6. Read-Only Admin Investigation Plan

A single audit station should (read-only, code-reading only — no Supabase connection, no writes):

1. **Confirm the registry gap.** Re-verify (formally, in a report) that none of the 19 table names appear
   in `CMS_BY_TABLE` / `CMS_BY_KEY`, and that no tab id in `AdminDashboardClient.tsx`'s `tabs` array maps
   to a panel that queries them.
2. **Trace the role-check chain** end to end: `getServerSession()` (`src/lib/auth/session.ts`) →
   `profiles.role` lookup → `AdminPage` (`src/app/[locale]/admin/page.tsx`) redirect guard →
   `verifyAdminRequest()` (`src/lib/auth/admin.ts`) → API route guards. Confirm it behaves identically for
   working CMS sections and would behave identically for the new tables (i.e., RLS + app-level guard both
   already "admin-ready," only the UI/registry layer is missing).
3. **Inventory the existing CRUD patterns** so any future work reuses rather than reinvents:
   - Generic registry pattern (`cms-registry.ts` + `/api/admin/cms/[table]`) — used for Automation/IoT/Exams.
   - Hand-written per-type routes (`/api/admin/ai-*`, `/api/admin/blog`, `/api/admin/nano-banana`) — used for AI Academy/Blog/Nano Banana.
   - Note which pattern would require less new code to extend to the 19 Tier-A tables (the registry pattern,
     by design, was built exactly to avoid hand-rolling — likely the natural fit, but the audit should say so explicitly).
4. **Check for hidden/incomplete routes:** search for any `career`/`language`/`digital-exams`-content-type
   strings already present in admin code (orphaned WIP) before concluding "nothing exists."
5. **Check feature flags / site settings** (`/api/admin/feature-flags`, `/api/admin/site-settings`) for any
   condition that could independently hide content-management UI.
6. **Look at how content is read on the public side** (portal pages, content display routes) to understand
   what a future "preview" or "publish" would need to match — purely to inform sizing, not to change anything.

Output: a single audit report with file/line evidence per finding and a final classification against the
six causes in Section 5 — nothing else.

---

## 7. Recommended Next Station

> ### `Admin Dashboard and Draft Content Preview Readiness Audit`

- **Inspect only** — read files, trace logic, write a report.
- **Not implement** — no registry entries added, no panels built, no tabs added, no routes written.
- **Not connect to Supabase** — all reasoning is from existing code + the row-count facts already in the
  handoff; no DB queries, no SQL, no Service Role Key.
- **Not modify UI, publish content, or touch any forbidden table/record group.**
- **Deliverable:** a report that (a) confirms or corrects the Section 5 hypothesis with evidence, (b)
  states definitively whether CRUD is *missing*, *hidden*, or *simply not wired*, and (c) recommends —
  but does not build — the smallest safe next step (almost certainly: extend `CMS_REGISTRY` with 19 new
  entries + add corresponding tabs, OR build a lighter-weight read-only preview first; the audit should
  state which it thinks is safer and why).

The exact copy-paste prompt for this station is in Section 18.

---

## 8. Draft Content Preview Strategy

Four options, compared:

| Option | Description | Risk | Verdict |
|---|---|---|---|
| **A. Full Admin CMS now** | Add 19 registry entries + tabs + full add/edit/delete/archive/publish | Largest surface area change; couples "let me see the data" with "let me mutate the data" before either has been reviewed | ❌ Too big a first step — skips review entirely |
| **B. Read-only internal preview first** | Admin-only view: counts, filters by portal/type/status, sample/detail records, no write actions | Minimal — additive, reversible, no mutation path, reuses existing admin-auth gate | ✅ **Recommended** |
| **C. Direct public portal wiring** | Query the new tables from public portal pages | Would either require publishing (forbidden) or show drafts publicly (RLS violation / data-quality risk) | ❌ Forbidden and unsafe — bypasses every safeguard built so far |
| **D. Metadata repair first** | Fix `title_en`/`excerpt_*` gaps before any UI | Useful, but repair is easier to scope *after* someone has actually looked at the data through a preview | ⚠️ Valuable, but should run **alongside/after** B, not gate it |

**Recommendation: B — build the read-only internal draft preview first**, with these characteristics:
- Admin-only, gated by the exact same `profile.role === 'admin'` check already proven to work.
- **No write actions in phase 1** — no add/edit/delete/archive/publish buttons at all.
- Shows: per-table/per-portal/per-content-type **counts**, a filterable list (portal × content type ×
  status), and a **detail view** of individual records (title_ar/title_en, category, tags, body/excerpt,
  sort_order, status, timestamps) — exactly the fields the field-gap audit already cares about.
- Strictly internal: never queried from any public route; never bypasses RLS (reads as the admin user, who
  already has `admin_manage_*` SELECT access).
- Trivially reversible: it's a new read-only view over existing data — deleting it leaves zero residue.

This *is* the safest first UI-facing move, and it directly produces the visibility the metadata-repair and
publishing phases both depend on.

---

## 9. Admin CMS Strategy (Later — Phased, Not All at Once)

Once the audit (Section 7) and the preview (Section 8) exist and have been used, a full CMS — if still
wanted — should arrive in graduated phases, each independently shippable and reversible:

- **Phase A — Read-only inventory.** (= Section 8's preview). Counts + filtered lists. No writes.
- **Phase B — Record detail preview.** Full single-record view incl. raw JSON/body, side-by-side
  Ar/En fields, gap indicators (missing `title_en`/`excerpt_*`) — still no writes.
- **Phase C — Metadata repair / editor.** Constrained editing limited to the *optional quality fields*
  (`title_en`, `excerpt_ar`, `excerpt_en`, tags, category, sort_order) — explicitly **not** full free-form
  body editing yet, and **not** status changes. This is where `CMS_REGISTRY`-style field configs would
  most naturally be introduced for the 19 tables (reusing the exact pattern already proven for
  Automation/IoT/Exams).
- **Phase D — Archive / publish workflow.** Status transitions (`draft → published`, `draft → archived`)
  on a **single-record, manually-confirmed basis** — modeled on the same "prepare → review → execute"
  discipline used for the import itself, just inside the UI instead of raw SQL.
- **Phase E — Bulk actions.** Only after D has been used safely on individual records for a while, with
  explicit confirmation dialogs, dry-run previews, and audit logging — mirroring the caution already
  applied to the SQL-based import (transaction-wrapped, assertion-checked, reviewed before execution).

No phase should be skipped, and D/E in particular should not start until the metadata-repair findings
(Section 10) and the publishing strategy (Section 14) are both signed off.

---

## 10. Metadata Quality Repair Plan

The Tier-A field-gap audit (`content-source/_audit/tier-a-field-gap-*`) already found **no
import-blocking issues**, only optional-quality gaps:

| Gap | Affects | Needed before… |
|---|---|---|
| `title_en` missing/inconsistent | UI cards, English-locale display, search | **Public UI** (not the admin preview — the preview can and should *show* the gap) |
| `excerpt_ar` / `excerpt_en` missing | Card summaries, list previews, SEO descriptions | **Public UI** |
| Body/summary consistency, English casing | Reading experience, professionalism | **Public UI** |
| Duplicated/near-duplicate titles | Search quality, navigation clarity | **Public UI**, and worth a one-time dedup pass before bulk publish |
| UI card readiness generally (image/icon fields, tags formatting) | Visual polish on portal pages | **Public UI** |

**Sequencing:**
- The **internal admin preview** (Section 8) does **not** require repair first — in fact it's the best
  *tool* for finding and triaging these gaps (it can visually flag "missing title_en" per record).
- **Public UI wiring and publishing** *do* require repair first — shipping 600 records with visible
  `title_en: null` or empty excerpts to real users would be a quality regression, not a improvement.
- Repair itself should follow the exact same discipline as the import: generate reviewed, assertion-backed,
  transaction-wrapped `UPDATE` SQL (or equivalent), have the user execute it manually in the SQL Editor,
  then re-run the field-gap audit to confirm closure — **no repair SQL should run in this phase**.

---

## 11. Importer Hardening Plan

For future batches (210 live-wired review, 230 deferred, repair updates, Tier-B content, etc.), plan —
without building — a reusable importer with:

- **Dry-run by default** — mirrors `live-readiness-v2.py` / `dry-run-importer.py` already in
  `content-source/_importer/`; no write path without an explicit `--apply`-equivalent step.
- **Checksum/hash tracking** per source file, to detect changed content and skip no-op re-imports.
- **Idempotent upsert** keyed on the existing, already-verified-unique `id` field.
- **No delete by default** — any deletion must be a separate, explicitly-reviewed script (exactly how
  `final-tier-a-draft-import-emergency-rollback.sql` was kept apart from the master import).
- **Per-table / per-portal granularity** — so future imports (e.g., "just `career_lessons`," "just the
  210 review batch") don't require an all-or-nothing run.
- **Diff + validation reports** in the same `_audit/` convention (`*-summary.json`, `*-details.csv`, `*-report.md`).
- **Manual approval gate preserved** — Claude/Antigravity prepares SQL/scripts; the user reviews and
  executes in the Supabase SQL Editor. This pattern has now been proven safe across 20 stations; do not
  replace it with direct DB connections.
- **No Service Role Key — ever — in prompts, scripts, or `.env` committed to the repo.** Secrets stay
  outside the repo, managed by the user directly in Supabase/Vercel.
- **Logs/audit outputs** consistent with existing `_audit/` artifacts so every future run is traceable
  the same way the Tier-A import is.

---

## 12. Strategy for the 210 Live-Wired Records

These are **already serving the live app** — categorically higher risk than the 600 fresh drafts. Before
any action on them:

1. **Map them**: for each of the 210, record its table, portal, content type, current `status`, and how
   (which routes/components/queries) the live app reads it.
2. **Check overlap** with the 600 new Tier-A rows — same `id`/slug appearing in both old and new tables
   would be a collision risk the moment anything is published.
3. **Assess change risk**: are any of the 210 candidates for *replacement* by higher-quality Tier-A
   equivalents, or are they independent and should simply coexist?
4. Any eventual action must go through the same **prepare → pilot → transaction → user-executes** pipeline
   — never a direct write, and never without a dedicated mapping/impact report reviewed first.

**For this phase: read/map only, zero writes, zero schema changes, zero risk to the live platform.**

---

## 13. Strategy for the 230 Deferred Records

| Group | Blocker | Decision needed | Forbidden now |
|---|---|---|---|
| **Tools Hub** (`tools_hub_*`, generated migration deferred) | Not yet an app-wired portal | **Product decision**: should "Tools Hub" become a real content portal with its own glossary/prompts/resources/lessons tables, or does this content belong elsewhere? | Executing `20260608120704_tools_hub_content_tables.sql`; importing any tools_hub data |
| **Nano Banana (new)** (`nano_banana_glossary/prompts/resources/lessons`, generated migration deferred) | Naming/schema collision risk with live tables | **Schema-alignment decision**: coexist with `nano_banana_custom_prompts`/`nano_banana_saved_prompts`, replace them, or remap the 30 `nano-banana/prompts` Tier-A records into the *existing* tables? | Executing `20260608120705_nano_banana_content_tables.sql`; writing to any `nano_banana_*` table (old or new) |
| **Old Nano Banana tables** (`nano_banana_custom_prompts`, `nano_banana_saved_prompts`) | Live, in active use | None for this phase — just acknowledge they exist and constrain the above decision | Any modification |
| **Remaining ~200 of the 230** | Mostly classified by `live-dryrun-v2` as gaps pending the above two decisions | Re-classify as Tier-B candidates *after* Tools Hub / Nano Banana decisions land | Import |

**No immediate import of any of the 230.** These require dedicated, separate product/schema-alignment
stations — not a continuation of the current import mechanics.

---

## 14. Publishing Strategy

- **No bulk publish** — not now, not as a "phase 1" of anything.
- **No publish before the admin preview exists** — there is currently no way for a human to look at this
  content before it goes live; that is a hard structural blocker on publishing.
- **No publish before metadata repair** for the slice being published — shipping visible gaps
  (`title_en`/`excerpt_*` = null) to real users would be a regression.
- **Publish incrementally, by portal + content type** — e.g., start with `career_glossary` specifically,
  since it has the deepest verification history (single-record pilot + 10-record transaction pilot +
  10-record persistent import all used it).
- **Start with a tiny reviewed sample** (mirroring the single-record → 10-record → full-batch progression
  already used for the import itself) before any larger publish batch.
- **Every publish batch needs its own rollback plan** (`UPDATE … SET status = 'draft'` is trivial and
  non-destructive — much safer than the import's rollback, since no rows are removed, only flipped back).
- **Verify public RLS behavior** after each batch — confirm `public_read_published_*` policies serve
  exactly the newly-published rows and nothing else, using the existing read-only verification pattern.

---

## 15. Production Safety Guardrails

Forbidden for this phase and the recommended next station, no exceptions:

- Auth, certificates, exams, student dashboard, payments (if any), package/config files, Supabase
  migrations/schema.
- `tools_hub` and `nano_banana` (new schema, data, or the existing `nano_banana_custom_prompts` /
  `nano_banana_saved_prompts` tables).
- The 210 existing live-wired records.
- Any bulk publishing, any `draft → published` transition, any data import.
- Connecting to Supabase directly, executing SQL, or creating/using a **Service Role Key**.
- Running the emergency rollback (`final-tier-a-draft-import-emergency-rollback.sql`).
- Building admin CRUD or wiring any UI before the audit (Section 7) is complete and reviewed.

---

## 16. Proposed Implementation Roadmap

> Roadmap shown for planning/sequencing context only — **none of these phases should start without
> separate, explicit authorization.** Each phase below is a *future*, independently-scoped station.

| Phase | Goal | Allowed actions | Forbidden actions | Deliverables | Checkpoint expectation |
|---|---|---|---|---|---|
| **0 — Admin Dashboard & Draft Content Preview Readiness Audit** | Confirm/refute Section 5 hypothesis; size the safest next step | Read code, trace logic, write report | Any code/UI/data change | Audit report w/ evidence + recommendation | `checkpoint/admin-cms-readiness-audit-v1` (docs) |
| **1 — Internal read-only draft content inventory** | Build the Section 8 preview (counts + filtered list) | Add a new admin-only, read-only route/component | Any write action, any registry mutation beyond what's needed to *read* | Working internal preview, screenshots/QA notes | `checkpoint/draft-content-preview-v1` |
| **2 — Draft content detail preview** | Per-record detail view incl. gap indicators | Extend the Phase 1 preview with detail views | Editing, status changes | Detail view + gap-flagging | `checkpoint/draft-content-preview-detail-v1` |
| **3 — Metadata quality repair tooling/report** | Quantify and plan repair of `title_en`/`excerpt_*` gaps | Generate reviewed repair SQL/report (user executes) | Any unreviewed/auto-applied SQL | Repair plan + reviewed SQL package + re-run field-gap audit | `checkpoint/content-metadata-repair-v1` |
| **4 — Safe admin edit workflow** | Constrained metadata editing (Phase C in Section 9) | Extend `CMS_REGISTRY`-style config for the 19 tables, scoped to optional fields only | Body/content rewrites, status changes | Editable metadata fields in admin UI | `checkpoint/admin-content-edit-v1` |
| **5 — Publish workflow design** | Design (and only then build) single-record → small-batch publish flow | Status-transition UI w/ confirmation + rollback | Bulk publish, skipping review | Publish workflow + rollback plan | `checkpoint/publish-workflow-v1` |
| **6 — Public UI wiring by portal/type** | Wire reviewed, repaired, published content into public portal pages | Incremental, portal-by-portal public reads of `published` rows | Wiring drafts or unreviewed content | Live public pages, portal by portal | `checkpoint/public-content-wiring-{portal}-v1` |
| **7 — 210 live-wired review** | Map + assess overlap/risk for existing live content | Read/map only; produce impact report | Any write to the 210 | Mapping + overlap + risk report | `checkpoint/live-wired-review-v1` |
| **8 — tools_hub / nano_banana decisions** | Resolve product placement (Tools Hub) and schema alignment (Nano Banana) | Product/architecture decision docs; only then execute deferred migrations if approved | Importing data before decisions are made | Decision record + (if approved) migration execution log | `checkpoint/tools-hub-nano-banana-decision-v1` |
| **9 — Importer hardening & maintenance** | Generalize the importer per Section 11 | Build reusable, dry-run-default, idempotent tooling | Direct DB connections, Service Role Key use | Hardened importer + docs | `checkpoint/importer-hardening-v1` |

---

## 17. Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Accidentally publishing draft content | Low | High (public exposure of unreviewed/incomplete content) | Hard rule: no `draft→published` without admin preview + repair + reviewed SQL; RLS already restricts public reads to `published` |
| Admin role mismatch (false negative) | Low | Medium (blocks legitimate admin work) | Already ruled mostly-out: same `profiles.role` check gates working CMS sections; audit station should still trace it end-to-end for certainty |
| Missing CMS actions (the actual observation) | **Confirmed** | Medium (no current way to manage new content) | Root-caused to registry/wiring gap (Section 5); fix path is incremental, low-risk extension of an existing proven pattern |
| RLS mismatch (policies don't match app expectations) | Low | High (could expose drafts or block admin) | RLS already verified per-table during migration; re-verify after any future schema touch |
| UI breaking due to metadata gaps (`title_en`/`excerpt_*` null) | Medium | Medium (broken cards/empty fields in public UI) | Repair before public wiring (Section 10); preview can surface gaps safely first |
| Duplicate content (overlap between 600 new & 210 live-wired) | Medium | Medium–High (confusing UX, SEO duplication, ID collisions) | Mapping/overlap report required before any of the 210 are touched (Section 12) |
| Overwriting live-wired records | Low (nothing plans to touch them yet) | High (could break the live platform) | Explicit "read/map only" rule for the 210 in this and the next phase |
| tools_hub / nano_banana naming mismatch | Medium | Medium–High (could create confusing parallel schemas or break Nano Banana) | Both migrations deferred pending dedicated product/schema-alignment decisions (Section 13) |
| Importer overreach (writes beyond scope, accidental deletes) | Low (current importer is one-shot, hand-reviewed) | High if it occurred | Hardening plan mandates dry-run-default, no-delete-by-default, manual-approval gate (Section 11) |
| Secrets leakage (Service Role Key) | Low (never created so far) | Critical | Explicit standing rule: never create/use a Service Role Key; secrets stay outside the repo |

---

## 18. Exact Antigravity Prompt for the Next Station

```
STATION: Admin Dashboard and Draft Content Preview Readiness Audit
PROJECT: Darhous AI Cloud Academy / NexaLearn
REPO: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
BRANCH: main
MODE: STRICTLY read-only investigation + report. NO implementation. NO code changes of any kind
       (a written report file is the only output you may create).

REQUIRED READING BEFORE YOU START (in this order):
1. docs/handoffs/content-supabase-import-handoff.md  (full import history + current state)
2. docs/plans/post-import-next-phase-plan.md          (this plan — Section 5 already contains a
   code-evidence-backed hypothesis for why admin buttons are missing; your job is to CONFIRM,
   REFINE, or CORRECT it — not to start from a blank slate)

CONTEXT:
600 Tier-A content records were imported into Supabase as `draft` across 19 new core content tables
(career/language/digital-exams/ai/automation/iot — see the plan for the full table list). 0 published.
The user then logged in as ADMIN and saw NO add/edit/delete/archive/publish/manage-content/bulk-action
controls for this content.

Preliminary code inspection (already done, summarized in plan Section 5) found that the platform HAS a
working generic admin CMS system — `CMS_REGISTRY` (src/lib/admin/cms-registry.ts), the generic
`/api/admin/cms/[table]` routes, and `GenericCmsTypePanel`/`AutomationCMSPanel`/`IoTCMSPanel`/
`ExamsCMSPanel` — but it currently only registers 22 OTHER tables (Automation/IoT/Digital-Exams), and
NONE of the 19 new Tier-A tables appear in it or have a dashboard tab.

YOUR TASK (confirm/refine this finding and finish the investigation — produce a report ONLY):
1. Re-verify directly in the code that none of the 19 new table names (career_glossary, career_lessons,
   career_prompts, career_resources, language_glossary/lessons/prompts/resources,
   digital_exams_glossary/lessons/prompts/resources, ai_lessons, ai_resources, automation_lessons,
   automation_resources, iot_glossary, iot_prompts, iot_resources) appear in CMS_REGISTRY/CMS_BY_TABLE
   or in any AdminDashboardClient tab → panel mapping.
2. Trace the admin role-check chain end to end (getServerSession → profiles.role → AdminPage guard →
   verifyAdminRequest → API route guards) and confirm it behaves the same for working CMS sections as
   it would for the new tables — i.e. rule in/out a role-detection bug with evidence.
3. Inventory the TWO existing CRUD patterns (generic CMS_REGISTRY-driven vs. hand-written per-type
   routes like /api/admin/ai-*) and state which would require less new surface area to extend to the
   19 Tier-A tables, and why.
4. Search for any orphaned/WIP career|language|digital-exams content-management code that might already
   exist but isn't linked.
5. Check /api/admin/feature-flags and /api/admin/site-settings for any condition that could
   independently hide content-management UI for these tables.
6. Conclude with a definitive classification: is admin CRUD for this content MISSING, HIDDEN, or simply
   NOT YET WIRED — and recommend (without building) the smallest safe next step: extending the registry
   pattern with 19 new entries + tabs, vs. building a lighter standalone read-only preview first. State
   which you think is safer and why, and roughly size each in terms of new files/surface area touched.

OUTPUT: ONE audit report file (e.g. content-source/_audit/admin-dashboard-readiness-audit-report.md, or
under docs/ — your choice) containing findings with concrete file/line evidence, the root-cause
classification, and a sized recommendation for a SEPARATE future build station. That is the ONLY file
you may create or modify.

ABSOLUTE FORBIDDEN ACTIONS (same standing rules as the import track — no exceptions):
- Do NOT modify app code, routes, UI components, dashboards, auth, certificates, exams, package/config
  files, or Supabase migrations/schema.
- Do NOT connect to Supabase, run SQL, or create/use a Service Role Key.
- Do NOT import data, publish content, or change any record from draft to published.
- Do NOT touch tools_hub, nano_banana (new or existing tables), or the 210 live-wired records.
- Do NOT run the emergency rollback.
- Do NOT implement add/edit/delete/archive/publish controls or any CRUD.
- Do NOT wire any UI, public or admin.
Investigation and a single written report — nothing else.
```

---

*This plan is documentation-only. It proposes a roadmap (Section 16) for context and sequencing — none
of those phases are authorized to start from this document alone. Each requires its own explicit go-ahead.*
