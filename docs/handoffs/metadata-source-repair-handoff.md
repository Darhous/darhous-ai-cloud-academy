# Metadata Source Repair — Safe Normalized Content Repair

## Overview
This handoff documents the metadata repairs applied to the 600 Tier-A normalized source files located in `content-source/_normalized/`. The repair process successfully addressed determinable quality issues in the source Markdown and JSON files without writing to Supabase, running any migrations, or modifying public UI code.

## What Source Repair Was Performed
A conservative Python script (`content-source/_normalization/repair-tier-a-metadata.py`) was implemented to process exactly 600 Tier-A records. The script performed the following determinable fixes:

1. **Identity Enforcements**:
   - `slug` generated safely from `id` where missing.
   - `portal_id` synced explicitly to the expected folder structure mapping.
   - `content_type` corrected to standardized names (e.g., `lessons` -> `lesson`).
   - `status` enforced as `draft`.

2. **English Title Generation (`title_en`)**:
   - Applied only when `title_en` was missing or matched placeholder strings like "Item 1", "Placeholder", "Untitled".
   - Used a safe heuristic based on stripping portal/type prefixes from the `id`.
   - Applied an acronym dictionary (`AI`, `IoT`, `API`, `SQL`, `CEFR`, `CV`, etc.) to ensure valid casing without inventing arbitrary words.

3. **Arabic Excerpt Generation (`excerpt_ar`)**:
   - Only generated if `excerpt_ar` was missing but a valid `body_ar` existed.
   - Safely extracted the first sentence (up to 150 characters) to avoid hallucination.

4. **Data Key Migrations**:
   - Glossary items safely migrated `definition` -> `definition_ar`.
   - Prompt items safely migrated `prompt_text` -> `prompt_text_ar`.

## Audit Issue Counts

**Before Repair**:
* **BLOCKER**: 500 (Primarily missing slugs)
* **HIGH**: 600
* **MEDIUM**: 100
* **LOW**: 0
* **Ready for Review**: 0

**After Repair**:
* **BLOCKER**: 0
* **HIGH**: 46 (Placeholder or skipped items left intentionally)
* **MEDIUM**: 100 (Missing English excerpts, etc.)
* **LOW**: 0
* **Ready for Review**: 460
* **Total Parsed Records**: 600 (0 Parse Errors)

## What Was Intentionally Skipped
- **English Excerpts/Bodies**: Missing fields were intentionally skipped (flagged as uncertain) to prevent LLM hallucination and ensure only human-verified text is eventually written.
- **Complex Translations**: If an Arabic body had no obvious translation and no fallback `title_en` could be generated safely, it was left for a future human translation phase.

## Safety & System Constraints
- **Supabase**: No database writes, updates, or API connections were made.
- **Data Integrations**: No SQL imports or migration seeds were generated or executed.
- **Excluded Content**: `tools_hub`, `nano_banana`, and all 210 live-wired + 230 deferred records remained completely untouched.
- **UI**: No draft content was wired to the public-facing dashboard or views.

## Next Recommended Station
**Tier-A DB Sync (Draft Updates)**:
With the normalized source files verified and 500 BLOCKERs eliminated, the next logical station is to automatically generate and execute a safe SQL UPDATE transaction script that synchronizes these specific repaired fields from `content-source/_normalized/` into the Supabase `draft` records.
