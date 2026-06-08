# Tier-A Optional Field Gap Report

## 1. Executive Summary
Analyzed exactly 600 Tier-A normalized records spanning new isolated empty tables. No structural blockers were detected that would prevent database import. However, significant optional field gaps exist (such as missing `title_en` and `excerpt_ar`) which will degrade UI quality if left unfixed before public release.

## 2. Tier-A Scope Confirmation
Expected Tier-A Records: 600
Analyzed Tier-A Records: 600

## 3. Files Analyzed
Portals: ai-academy, automation, career, digital-exams, iot-lab, language
Content Types: resources, lessons, glossary, prompts

## 4. Field Coverage Summary
- Import Blockers (Missing ID/Title_ar/Invalid): 6
- High Severity (Likely payload break): 0
- Medium Severity (Missing optional UI fields): 1328
- Low Severity (Cosmetic): 0

## 5. Import-Critical Field Gaps
None found. `title_ar`, `id`, `portal_id`, `content_type`, `status` are generally safe.

## 6. UI-Critical Field Gaps
- `missing_excerpt_ar_count`: 500
These missing excerpts will lead to empty spaces in UI summary cards.

## 7. Optional Metadata Gaps
- `missing_title_en_count`: 234
- `missing_excerpt_en_count`: 594

## 8. Language/Localization Risks
Lack of English metadata means the platform will fall back gracefully (if programmed to) or display empty values when the language toggle is switched to EN.

## 9. Gap Breakdown by Portal and Content Type
See `tier-a-field-gap-summary.json` for counts grouped by portal.

## 10. Impact on Single-Record Pilot
**No Impact.** We can safely proceed to a single-record pilot because optional metadata gaps do not block DB insertion into the `data JSONB` column.

## 11. Impact on Future Bulk Import
**No DB Impact, High UI Impact.** Bulk import is technically safe, but importing records without excerpts will result in incomplete front-end card views. 

## 12. Impact on Future UI Wiring
The UI will require fallback logic (e.g., substring of body if excerpt is missing) unless metadata is repaired.

## 13. Recommended Pre-Pilot Action
No immediate metadata repair is strictly required for the pilot. Proceed to pilot to verify the DB connection and RLS, and defer bulk metadata repair until after the pilot architecture is proven.

## 14. Recommended Pilot Candidate Criteria
- **Target Table:** `career_glossary`
- **Criteria:** 
  - `status` forced to `draft` during insert
  - Has `title_ar`
  - No critical schema blockers

## 15. Exact Commands Used
Executed Python script `content-source/_importer/tier-a-field-gap-review.py` locally.

## 16. Validation / No-Write Confirmation
Verified: No DB connection established. No Supabase execution. No app code modified. All writes restricted to `_audit/`.
