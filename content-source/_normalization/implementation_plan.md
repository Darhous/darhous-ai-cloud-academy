# Content Normalization Implementation Plan

## Goal
Create a byte-for-byte unmodified normalized copy of the 1,040 content source files into `content-source/_normalized/`. The normalized files will strictly comply with `CONTENT_SPEC_V1.md` and the existing templates, fixing 6,384 schema issues without touching the original source files.

## Proposed Changes

### 1. Normalization Script (`content-source/_normalization/normalize.py`)
I will write a single, deterministic Python script to handle the normalization across all lanes. This ensures consistency and avoids race conditions between subagents.

**A. Core Logic:**
- Iterate over `content-source/{portal}/{glossary,prompts,resources,lessons}/`.
- Read original JSON or Markdown files.
- Apply schema fixes.
- Write to `content-source/_normalized/{portal}/{content_type}/...`.
- Ensure original files remain untouched.

**B. Deterministic Rules:**

1. **Title Fixes (Arabic/English Inversion):**
   - Use regex `[\u0600-\u06FF]` to detect Arabic text.
   - If `title_ar` contains no Arabic but `title` (undocumented field) contains Arabic: swap them (set `title_ar` = `title`, `title_en` = old `title_ar`).
   - If `title_ar` contains no Arabic and no `title` exists: move it to `title_en` and set `title_ar` to a placeholder `"[مراجعة يدوية: العنوان مفقود]"`, marking `manual_review_required: true`.
   - Remove undocumented fields like `title`, `author`, `date`, `description` from the root (move them to `data` if necessary, or drop them if they are redundant).

2. **ID and Filename Match:**
   - The spec states: "The filename, excluding its extension, must match id".
   - The normalized filename will be forced to match the `id` field of the original file to ensure stability.
   - If the `id` does not match the `{portal}-{type}-{slug}` pattern, we will keep the original `id` (as it must be stable forever) but rename the *normalized* file to match the `id`. We will generate an ID mapping report in `_normalization/id_mapping.json` for review.

3. **Missing Metadata Enrichment:**
   - **category**: Derived from the portal name in Arabic (e.g., `ai-academy` -> `الذكاء الاصطناعي`, `iot-lab` -> `إنترنت الأشياء`).
   - **sort_order**: Assigned sequentially within each portal and type, multiplied by 10 (10, 20, 30...).
   - **tags**: Derived from the portal and content type (e.g., `["الذكاء الاصطناعي", "مصطلحات"]`).
   - **featured**: Set to `false`.
   - **status**: Set to `draft` (safest default).
   - **title_en**: If missing, attempt to extract from parentheses in `title_ar`. If none, set to `""`.

4. **Lesson Frontmatter & Excerpts:**
   - For Markdown lessons, extract the first Arabic paragraph (first block of text after headings) as `excerpt_ar`.
   - Estimate `reading_time` based on word count (assuming ~200 words per minute).
   - Set `excerpt_en` to `""` and `parent_id` to `null`.
   - Ensure the output has perfectly formatted YAML frontmatter using `---`.

### 2. Audit Script (`content-source/_normalization/audit.py`)
I will write an audit script to validate the `_normalized` folder against the schema, verifying:
- Exactly 1,040 files.
- Correct counts per portal/type.
- No duplicate IDs.
- Valid JSON / YAML.
- `title_ar` contains Arabic characters.
- All required fields are present.

Outputs will be written to:
- `content-source/_audit/normalized-schema-audit-report.md`
- `content-source/_audit/normalized-schema-audit-details.csv`
- `content-source/_audit/normalized-schema-audit-summary.json`

## Verification Plan

1. **Dry Run:** Execute `normalize.py` and ensure the original `content-source/` files are unmodified.
2. **Audit Execution:** Run `audit.py` on `_normalized/` to verify zero `BLOCKER` or `HIGH` issues (except explicit manual reviews).
3. **Diff Check:** Verify that `git status` only shows additions in `_normalized/`, `_normalization/`, and `_audit/`.
4. **Commit & Release:** Once verified, commit the changes and create the `checkpoint/content-source-normalized-v1` release.

> [!IMPORTANT]
> **User Review Required:**
> 1. Are you okay with assigning generic categories based on the portal name (e.g. `ai-academy` -> `الذكاء الاصطناعي`)?
> 2. Are you okay with the normalized file names matching the original `id` (even if the `id` itself violates the `{portal}-{type}-{slug}` pattern), to preserve `id` stability as per the spec?
