# Schema Generation Report

## Executive Summary
Generated SQL artifacts for all 26 missing tables identified during the dry-run analysis. These files are strictly planning artifacts and have NOT been executed against the database.

## Tables Generated
nano_banana_lessons, language_resources, career_lessons, digital_exams_resources, digital_exams_prompts, ai_resources, career_resources, career_prompts, language_lessons, ai_lessons, tools_hub_glossary, language_prompts, automation_resources, iot_glossary, nano_banana_glossary, iot_resources, nano_banana_resources, tools_hub_resources, tools_hub_lessons, tools_hub_prompts, digital_exams_glossary, digital_exams_lessons, iot_prompts, language_glossary, career_glossary, automation_lessons

## RLS / Index / Constraint Summary
All generated tables strictly follow the structure of `_template_content_table.sql`:
- **Columns:** `id`, `portal_id`, `content_type`, `status`, `featured`, `sort_order`, `category`, `title_ar`, `title_en`, `tags`, `body_ar`, `body_en`, `data`, `created_by`, `created_at`, `updated_at`, `published_at`, `archived_at`
- **Deviation Notes:** Extended fields like `slug`, `summary_ar`, `checksum`, `difficulty` were omitted as canonical columns and must remain inside `data JSONB`.
- **Indexes:** `status`, `category`
- **RLS:** Public read on published. Admin full access.
- **Destructive Statements:** None.
