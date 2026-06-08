# Tier-A Metadata Quality Report

## 1. Executive Summary
This report details the metadata quality gaps in the imported Tier-A draft records. No DB writes, public publishing, or data mutations were performed. This is a read-only audit.

## 2. Scope
- **Total Records Scanned**: 600 / 600
- **Source File Types**: JSON (500), Markdown (100)
- **Total Issues Found**: 1200
- **Excluded**: tools_hub, nano_banana, live-wired records, deferred records.

## 3. Counts by Portal/Table
- `ai_lessons`: 20 (Expected: 20)
- `ai_resources`: 30 (Expected: 30)
- `automation_lessons`: 20 (Expected: 20)
- `automation_resources`: 30 (Expected: 30)
- `career_glossary`: 50 (Expected: 50)
- `career_lessons`: 20 (Expected: 20)
- `career_prompts`: 30 (Expected: 30)
- `career_resources`: 30 (Expected: 30)
- `digital_exams_glossary`: 50 (Expected: 50)
- `digital_exams_lessons`: 20 (Expected: 20)
- `digital_exams_prompts`: 30 (Expected: 30)
- `digital_exams_resources`: 30 (Expected: 30)
- `iot_glossary`: 50 (Expected: 50)
- `iot_prompts`: 30 (Expected: 30)
- `iot_resources`: 30 (Expected: 30)
- `language_glossary`: 50 (Expected: 50)
- `language_lessons`: 20 (Expected: 20)
- `language_prompts`: 30 (Expected: 30)
- `language_resources`: 30 (Expected: 30)

## 4. Total Issues by Severity
- **BLOCKER**: 500
- **HIGH**: 600
- **MEDIUM**: 100
- **LOW**: 0

## 5. Public Readiness Summary
- **READY_FOR_REVIEW**: 0
- **NEEDS_METADATA_REPAIR**: 6
- **NEEDS_CONTENT_REPAIR**: 0
- **NEEDS_TRANSLATION_REPAIR**: 94
- **NEEDS_SCHEMA_REVIEW**: 0
- **BLOCKED**: 500

## 6. Examples of Representative Problems
| Table | Record ID | Field | Issue | Recommendation |
|---|---|---|---|---|
| ai_lessons | ai-academy-lesson-advanced-prompting | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-ethics | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-for-study-2 | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-for-study | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-for-work-2 | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-for-work | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-ai-hallucination | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-detecting-hallucinations | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-evaluating-models | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-future-of-ai | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-how-to-prompt | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-independent-learning | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-intro-to-ai-2 | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-intro-to-ai | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-prompt-engineering-basics | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-prompt-libraries | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-rag-basics | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-safe-ai | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-safety-and-security | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |
| ai_lessons | ai-academy-lesson-workflow-automation | excerpt_en | missing (MEDIUM) | Generate from Arabic excerpt/body |

## 7. Recommended Next Repair Station
Based on this audit, the next station should focus on applying the recommended repairs (e.g., generating `title_en` and `excerpt_*` fields) via safely reviewed transaction-wrapped SQL or automated tooling.

**EXPLICIT CONFIRMATION**: No database writes, publishing, or public UI wiring happened during this audit.
