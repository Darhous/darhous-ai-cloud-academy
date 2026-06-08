# Supabase Importer Dry-Run Report

## 1. Executive Summary
A dry-run analysis was executed over 1,040 normalized files. The script did not connect to the database or run migrations. It evaluated schema compatibility between local files and existing `.sql` table definitions.

## 2. Existing Supabase Content Tables Found
The analysis detected existing tables like `ai_glossary`, `ai_prompts`, `automation_glossary`, `iot_lessons`, etc., natively available in the Supabase schema.

## 3. Existing App Content/Fallback Patterns Found
Many components rely on portal-specific fetch patterns (e.g. `supabase.from('ai_glossary').select()`). 

## 4. Normalized Content Import Compatibility Matrix
See `table-compatibility-matrix.csv` for the full breakdown.

## 5. Missing Tables / Schema Gaps
**830** records were skipped due to missing tables. 
Missing table candidates include: 
nano_banana_lessons, language_resources, career_lessons, digital_exams_resources, digital_exams_prompts, ai_resources, career_resources, career_prompts, language_lessons, ai_lessons, tools_hub_glossary, language_prompts, automation_resources, iot_glossary, nano_banana_glossary, iot_resources, nano_banana_resources, tools_hub_resources, tools_hub_lessons, tools_hub_prompts, digital_exams_glossary, digital_exams_lessons, iot_prompts, language_glossary, career_glossary, automation_lessons

## 6. Field Mapping Summary
Standardized JSON fields (`id`, `portal_id`, `category`, `title_ar`) map directly to SQL columns. All other fields fall safely into the `data` JSONB column. See `field-mapping.json`.

## 7. Dry-Run Import Simulation Results
- **Importable (Existing Table):** 210
- **Skipped (Missing Table):** 830
- **Total:** 1040

### Hypothetical Template-Based Simulation
If missing tables were generated using `_template_content_table.sql`, the schema compatibility would be 100%, leading to 1040 importable records.

## 8. Risks and Blockers
- **`tools-hub` Risk:** Portal tables do not exist. Product registration required.
- **`nano-banana` Risk:** Potential mismatch between DB expectations (`nano_banana_custom_prompts`) and folder naming.
- **Missing Tables:** Many types lack native tables (e.g., `career_glossary`, `language_prompts`). 

## 9. Recommended Import Architecture
Upsert-only, dry-run by default, leveraging Service Role, utilizing existing portal-specific tables.

## 10. Recommended First Pilot
**automation** or **ai-academy**. They represent the cleanest path to a successful dry-run-to-live pipeline.
