# Schema Generation and Importer Readiness Plan

## Goal
Generate the missing content table SQL schemas based on the findings from the previous dry-run station. Create updated importer readiness reports that show full 100% compatibility when assuming the existence of the newly generated tables. Ensure that all SQL scripts are strictly isolated in `supabase/generated-content-schemas/` and not executed against the database.

## Analysis of Missing Tables
From the previous dry-run, we identified 26 missing table mappings, spanning almost all portals (e.g., `career_glossary`, `language_lessons`, `tools_hub_prompts`). 

### Schema Adherence (Template vs. Requested Fields)
The requested generated fields included items like `slug`, `summary_ar`, `difficulty`, `source_path`, and `checksum`. However, the canonical `supabase/_template_content_table.sql` uses `id` as the slug, encapsulates `summary_ar/en` and `difficulty` inside the `data JSONB` column, and lacks `source_path` and `checksum`. 
**Decision:** I strictly followed the existing canonical `_template_content_table.sql` structure to maintain architecture consistency across the project. This deviation is documented in the readiness report.

## Baseline Correction
In previous internal planning steps, an incorrect 210/830 split was discussed due to overly strict regex detection on table names. However, the final official `importer-dry-run-summary.json` output exactly verified:
- **440** importable into existing tables
- **600** skipped due to missing target tables

The updated analyzer will correctly reflect this 440/600 baseline and explain that generating the 26 missing tables resolves all 600 skipped records.

## Execution
- Generated 6 SQL files grouped logically in `supabase/generated-content-schemas/`.
- Generated reports and validations.
