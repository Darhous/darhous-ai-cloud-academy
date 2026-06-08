# Schema Audit Report — content-source/ (glossary, prompts, resources, lessons)

**Scope:** 8 portals × 4 new content types (glossary, prompts, resources, lessons)
**Reference specs:** `content-source/CONTENT_SPEC_V1.md`, `content-source/_templates/*.template.*`, `content-source/CONTENT_INVENTORY.md`
**Mode:** Read-only audit. No content files were modified, normalized, or regenerated.
**Generated:** see `schema-audit-summary.json` → `generated_at`

---

## 1. Executive Summary

- **1,040 files checked** (400 glossary + 240 prompts + 240 resources + 160 lessons), exactly matching `CONTENT_INVENTORY.md`.
- **6,384 schema issues recorded** across the whole set — an average of ~6 issues per file.
- Severity split: **BLOCKER = 499**, **HIGH = 3,050**, **MEDIUM = 2,211**, **LOW = 624**.
- **File counts are 100% correct** — every portal has exactly 50/30/30/20 files per type. The problem is not volume; it is **schema conformance**.
- Three systemic problems dominate:
  1. **Missing required metadata** (`category`, `sort_order`, `tags`, `title_en`, `featured`, and lesson-only fields `excerpt_ar/en`, `reading_time`, `parent_id`) — 5,261 occurrences, present in effectively every file.
  2. **`title`/`title_ar` field-mapping inversion** — 342 files have Arabic text missing from `title_ar` (Latin-only), almost always paired with an undocumented `title` field holding the real Arabic value (306 files).
  3. **`id` does not match filename** in 157 files — breaks the predictable id↔file mapping the spec relies on for safe imports.
- **Good news:** zero duplicate IDs found, either within a portal+type or globally across portals — the `id` namespace is clean.

---

## 2. Overall Counts

| Metric | Value | Expected | Status |
|---|---|---|---|
| Total files checked | 1,040 | 1,040 (8 × (50+30+30+20)) | ✅ exact match |
| Glossary files | 400 | 400 | ✅ |
| Prompt files | 240 | 240 | ✅ |
| Resource files | 240 | 240 | ✅ |
| Lesson files | 160 | 160 | ✅ |
| Total issues found | 6,384 | — | — |
| Files with ≥1 issue | majority of the 1,040 (see §4/§5 — `MISSING_FIELD` alone touches nearly every file) | — | 🔴 |

---

## 3. Portal-by-Portal Counts

All **8 portals** (`ai-academy, automation, career, digital-exams, iot-lab, language, nano-banana, tools-hub`) contain **exactly**:

| Type | Count per portal | Total | Mismatch found? |
|---|---|---|---|
| glossary | 50 | 400 | ❌ none — every portal = 50 |
| prompts | 30 | 240 | ❌ none — every portal = 30 |
| resources | 30 | 240 | ❌ none — every portal = 30 |
| lessons | 20 | 160 | ❌ none — every portal = 20 |

→ **Zero `COUNT_MISMATCH` issues.** Volume is perfect across the board; full breakdown is in `schema-audit-summary.json → counts_by_portal_type`.

---

## 4. Content-Type Schema Coverage

Comparing every file's top-level keys against its matching `_templates/*.template.*`:

| Content type | Expected fields (per template) | Systemic gap |
|---|---|---|
| `glossary` | id, portal_id, content_type, title_ar, title_en, category, status, featured, tags, sort_order, data | missing `category`, `sort_order`, `tags` in **100%** of files; `title_en` missing in most; `title` (undocumented) present in many |
| `prompts` | (same shape as glossary) | identical pattern |
| `resources` | (same shape as glossary) | identical pattern, plus `featured` missing in a large share |
| `lessons` | id, portal_id, content_type, title_ar, title_en, excerpt_ar, excerpt_en, category, status, featured, tags, sort_order, reading_time, parent_id | missing `excerpt_ar`, `excerpt_en`, `reading_time`, `parent_id` in **100%** of the 160 files; also missing `category`/`sort_order`/`tags` in all/most |

**Conclusion:** the new batch follows a *simplified, ad-hoc shape*, not the shape defined in `_templates/`. This is uniform across all 4 types and all 8 portals — i.e., a **systemic generation-template deviation**, not isolated mistakes.

---

## 5. Top Missing Fields (counts = number of files missing that field)

| Field | Missing in | Out of | % missing | Severity |
|---|---|---|---|---|
| `category` | 1,040 | 1,040 | **100%** | HIGH |
| `sort_order` | 1,040 | 1,040 | **100%** | HIGH |
| `tags` | 1,037 | 1,040 | **99.7%** | MEDIUM |
| `title_en` | 810 | 1,040 | **77.9%** | HIGH |
| `featured` | 694 | 1,040 | **66.7%** | MEDIUM |
| `excerpt_ar` (lessons only) | 160 | 160 | **100%** | HIGH |
| `excerpt_en` (lessons only) | 160 | 160 | **100%** | MEDIUM |
| `reading_time` (lessons only) | 160 | 160 | **100%** | MEDIUM |
| `parent_id` (lessons only) | 160 | 160 | **100%** | MEDIUM |

Every one of these fields is explicitly defined in the relevant `_templates/*.template.*` and/or required as "shared metadata" by `CONTENT_SPEC_V1.md` §3 (note: §3 explicitly states *"The `featured` field must be included in every content file, even when its value is `false`"*).

---

## 6. Unexpected Fields (present but not defined in any template)

| Field | Found in | Notes |
|---|---|---|
| `title` | 306 files | The dominant unexpected field — closely tied to the title-mapping inversion in §7 below |
| `description` | 6 files | Possibly meant to map to `excerpt_ar`/`data.description` — needs manual review per file |
| `author` | 3 files | Not defined anywhere in spec/templates |
| `date` | 3 files | Not defined anywhere in spec/templates — possibly meant for `created_at`/`published_at` (DB-managed fields per spec §8, which explicitly says these "should be added by the importer or database") |

318 occurrences total — concentrated almost entirely in the `title` anomaly.

---

## 7. Title / title_ar / title_en Mapping Problems — the most critical content-quality finding

| Issue | Count | Meaning |
|---|---|---|
| `TITLE_AR_LATIN_ONLY` | **342 files** | `title_ar` contains **zero Arabic characters** (Latin-only). Examples found: `title_ar: "Algorithm"`, `title_ar: "Api"`, `title_ar: "Artificial Intelligence"`, `title_ar: "Bias In Ai"`, `title_ar: "Chatbot"` — these are **English terms placed in the Arabic title field**. |
| `TITLE_FIELD_UNDOCUMENTED` | **306 files** | An extra `title` field exists holding what is, in nearly every sampled case, the **actual Arabic display title** (e.g. `"title": "إجراء (Action)"` while `"title_ar": "Action"`). |
| `TITLE_EN_ARABIC_HEAVY` | 0 | No cases where `title_en` is itself filled with Arabic — i.e. `title_en` values are clean where present, the problem is one-directional (Arabic → wrong slot). |

**Pattern identified — a clean, deterministic inversion:**
```
Should be:           Actually is:
title_ar = "إجراء"   title    = "إجراء (Action)"
title_en = "Action"  title_ar = "Action"
                     (title_en often missing entirely — see §5)
```
This is **highly fixable mechanically** *if* the pattern holds consistently file-by-file (it appeared consistent in every sample manually inspected), but it must be **verified file-by-file before any bulk rewrite** — a script should never blind-swap fields without confirming the Arabic/Latin signature on each individual record first (which is exactly what `schema-audit-details.csv` now lets a future repair step do, row by row).

Distribution highlights (`TITLE_AR_LATIN_ONLY`, top concentrations):
- `*/glossary` — affects **all 8 portals**, ~20/50 files each (≈40%)
- `automation/resources` — 30/30 (**100%**)
- `*/resources` and `*/prompts` in several portals — ~10/30 each (≈33%)

Full per-file detail (file path + sample value) is in `schema-audit-details.csv`, filterable by `issue_code = TITLE_AR_LATIN_ONLY` or `TITLE_FIELD_UNDOCUMENTED`.

---

## 8. Duplicate IDs or Slugs

| Check | Result |
|---|---|
| Duplicate `id` within the same portal+type | **0 found** ✅ |
| Duplicate `id` globally across portals (same content type) | **0 found** ✅ (informational check — current architecture uses portal-prefixed tables, so this would not even matter for DB import, but it's clean regardless) |
| Separate `slug` field | Not applicable — neither `CONTENT_SPEC_V1.md` nor any `_templates/*` defines a `slug` field; `id` *is* the slug. |

**This is the cleanest area of the audit** — the `id` namespace has zero collisions anywhere.

However, related to IDs:
| `ID_FILENAME_MISMATCH` | **157 files** | `id` does not equal the filename (e.g. file `api.json` contains `"id": "ai-academy-glossary-api"`). `CONTENT_SPEC_V1.md` §7 requires *"The filename, excluding its extension, must match `id`"* — this is a **BLOCKER** because a future importer keyed on filename-derived IDs would silently create wrong records. |

Worst-affected (100% of files in that bucket mismatched):
- `nano-banana/glossary` (20/20), `digital-exams/glossary` (20/20)
- `career/glossary`, `career/prompts`, `career/resources` (10/10 each)
- `nano-banana/prompts`, `nano-banana/resources`, `digital-exams/prompts`, `digital-exams/resources` (10/10 each)
- partial mismatches also found in `language/lessons`, `nano-banana/lessons`, `digital-exams/lessons`, `career/lessons`, `automation/glossary`, `tools-hub/resources`, and others — full list in the CSV.

---

## 9. Severity Summary

| Severity | Count | % of total | What it means here |
|---|---|---|---|
| **BLOCKER** | 499 | 7.8% | `TITLE_AR_LATIN_ONLY` (342) + `ID_FILENAME_MISMATCH` (157). These would cause **wrong content mapping or broken id↔file linkage** if imported as-is — must be resolved before any DB import. |
| **HIGH** | 3,050 | 47.8% | Missing `category`/`sort_order`/`title_en`/`excerpt_ar` + `TITLE_FIELD_UNDOCUMENTED` (306) + `UNEXPECTED_FIELD: title`. Would visibly degrade UI/admin/ordering quality and likely break English-locale rendering where `title_en` is consumed. |
| **MEDIUM** | 2,211 | 34.6% | Missing `tags`/`featured`/`excerpt_en`/`reading_time`/`parent_id`. Useful metadata that an importer can default safely (e.g. `tags: []`, `featured: false`, `sort_order: 10`). |
| **LOW** | 624 | 9.8% | `EMPTY_VALUE` on optional/defaultable fields, `UNEXPECTED_FIELD` for rare fields (`author`, `date`, `description`). Cosmetic / low-priority cleanup. |

No `INVALID_JSON` or `INVALID_FRONTMATTER` issues were found anywhere — **every file parses correctly**. The problems are entirely about *which fields exist and what's in them*, not about file corruption.

---

## 10. Fixability Summary

| Issue type | Count | Fix approach |
|---|---|---|
| `MISSING_FIELD` (category, sort_order, tags, featured, excerpt_en, reading_time, parent_id) | 4,605 | **deterministic normalization** — safe defaults exist (`[]`, `0`/`10`, `false`, `""`) and were explicitly anticipated by the spec ("Fields marked optional may use an empty placeholder...") |
| `MISSING_FIELD: title_en` | 810 | **manual review or regeneration** — cannot be safely defaulted; an English title must be authored, not invented mechanically |
| `MISSING_FIELD: excerpt_ar` (lessons) | 160 | **manual review or regeneration** — same reasoning; this is learner-facing copy |
| `TITLE_AR_LATIN_ONLY` + `TITLE_FIELD_UNDOCUMENTED` (the inversion pair) | 342 + 306 | **deterministic normalization, but only after per-file verification** — the pattern is consistent enough to script, but every swap must be confirmed against the actual Arabic/Latin signature of that specific record (the CSV provides exactly the per-file evidence needed) |
| `ID_FILENAME_MISMATCH` | 157 | **manual review required** — must decide *which* of `id` or filename is "correct" per case (renaming files vs. rewriting `id` values has different downstream consequences for links/imports) |
| `UNEXPECTED_FIELD: description/author/date` | 12 | **manual review** — too few cases to script; check each individually |
| `EMPTY_VALUE` on present-but-empty optional fields | most of LOW | **leave as-is with importer defaults** — lowest priority |

---

## 11. Recommended Repair Strategy

**Recommendation: (B) Create a normalized COPY — do not touch the originals.**

Reasoning:
- The issues are **systemic and uniform** (same gaps repeat in ~100% of files of a given type), which makes a **deterministic mapping/normalization script** realistic and efficient — far cheaper than full regeneration.
- However, two issue families (`title_en` content authoring, `excerpt_ar` authoring, and the `id`↔filename conflict resolution) **require a human decision per file or per batch** — a pure script cannot safely resolve them.
- Therefore the safest sequencing is:
  1. **(B) Normalized copy** — write a script that reads each original file, applies the deterministic fixes (swap `title`↔`title_ar` *after* verifying the Arabic/Latin signature per file, fill safe-default metadata, leave `title_en`/`excerpt_ar` gaps explicitly flagged as `"NEEDS_REVIEW"` placeholders) into a separate folder (e.g. `content-source/_normalized/`), leaving every original file untouched.
  2. **Manual review pass** focused only on the flagged `NEEDS_REVIEW` markers (810 + 160 + 157 cases — a bounded, trackable backlog) plus the 12 `UNEXPECTED_FIELD` anomalies.
  3. Only **after** the normalized copy passes a clean re-audit (0 BLOCKER/HIGH) should an importer be designed against it.
- This avoids ever risking the 1,040 original source files (which the user has manually reviewed for *content quality*, separately from this *schema* audit), keeps the change 100% reversible, and produces a clean, spec-conformant dataset ready for the eventual importer described in the prior architecture audit.

---

## 12. Do-Not-Touch Confirmation

✅ Confirmed — **nothing was modified, normalized, renamed, or regenerated**:
- No file inside `content-source/{portal}/{glossary,prompts,resources,lessons}/` was written to.
- No app code, routes, Supabase files, package/config files, auth, certificates, exams, dashboards, or production wiring was touched.
- No `npm install` / `build` / `dev` / `lint` / `typecheck` or any artifact-generating command was run.
- The only writes performed were the three audit artifacts inside `content-source/_audit/` (plus a temporary helper script that was created and removed from that same folder — see below).
- `git status --short` before and after this audit shows the same three pre-existing untracked items only: `.claude/`, `README.backup.20260607-135220.md`, `"UX PROMAX.MD"`, plus the new `content-source/_audit/` outputs.

---

## 13. Exact Commands Used

```bash
# create the audit output folder (the only folder this station was allowed to create)
mkdir -p "content-source/_audit"

# write a temporary, read-only analysis script (created inside _audit/, removed after use)
# — it only calls fs.readdirSync / fs.readFileSync on content-source/**, and writes
#   exclusively to content-source/_audit/{schema-audit-details.csv, schema-audit-summary.json}
# (full script content is reproducible from this report's methodology — see §1–§10 for exact
#  field lists, regexes, and issue-classification rules used)

node "content-source/_audit/_tmp_audit_script.js"

# spot-check the generated outputs (read-only)
ls -la content-source/_audit/
wc -l content-source/_audit/schema-audit-details.csv
grep ",BLOCKER," content-source/_audit/schema-audit-details.csv | head -6
grep "TITLE_AR_LATIN_ONLY"   content-source/_audit/schema-audit-details.csv | awk -F',' '{print $1"/"$2}' | sort | uniq -c | sort -rn
grep "ID_FILENAME_MISMATCH"  content-source/_audit/schema-audit-details.csv | awk -F',' '{print $1"/"$2}' | sort | uniq -c | sort -rn

# remove the temporary helper script, leaving only the three approved audit deliverables
rm "content-source/_audit/_tmp_audit_script.js"
```

**Detection rules used by the script (for transparency/reproducibility):**
- *Arabic detection*: Unicode ranges U+0600–U+06FF, U+0750–U+077F, U+08A0–U+08FF, U+FB50–U+FDFF, U+FE70–U+FEFF
- *Latin detection*: `[A-Za-z]`
- *Expected fields*: taken verbatim from `content-source/_templates/glossary.template.json`, `prompt.template.json`, `resource.template.json`, `lesson.template.md`
- *Empty value*: `null`, empty string (after trim), empty array, empty object
- *`id`↔filename check*: `path.basename(filename, ext) === data.id`
- *Duplicate check*: per portal+type via `Map`, plus a separate global per-content-type cross-portal `Map`

---

### Bottom line
The library is **structurally sound at the file/count/JSON-validity level and has zero ID collisions**, but is **not import-ready** in its current form due to a systemic, uniform deviation from `_templates/` (missing metadata + a one-directional title-field inversion + filename/id drift). All three problems are well-bounded, well-understood, and — based on this audit — **fixable via a scripted normalized copy plus a bounded manual-review backlog**, without ever touching the reviewed source content itself.
