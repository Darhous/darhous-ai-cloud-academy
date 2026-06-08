# Tier-A Metadata Quality Report

## 1. Executive Summary
This report details the metadata quality gaps in the 600 imported Tier-A draft records. No DB writes, public publishing, or data mutations were performed. This is a read-only audit.

## 2. Scope
- **Total Records Scanned**: 500 / 600
- **Total Issues Found**: 1394
- **Excluded**: tools_hub, nano_banana, live-wired records, deferred records.

## 3. Counts by Portal/Table
- `ai_lessons`: 0 (Expected: 20)
- `ai_resources`: 30 (Expected: 30)
- `automation_lessons`: 0 (Expected: 20)
- `automation_resources`: 30 (Expected: 30)
- `career_glossary`: 50 (Expected: 50)
- `career_lessons`: 0 (Expected: 20)
- `career_prompts`: 30 (Expected: 30)
- `career_resources`: 30 (Expected: 30)
- `digital_exams_glossary`: 50 (Expected: 50)
- `digital_exams_lessons`: 0 (Expected: 20)
- `digital_exams_prompts`: 30 (Expected: 30)
- `digital_exams_resources`: 30 (Expected: 30)
- `iot_glossary`: 50 (Expected: 50)
- `iot_prompts`: 30 (Expected: 30)
- `iot_resources`: 30 (Expected: 30)
- `language_glossary`: 50 (Expected: 50)
- `language_lessons`: 0 (Expected: 20)
- `language_prompts`: 30 (Expected: 30)
- `language_resources`: 30 (Expected: 30)

## 4. Total Issues by Severity
- **BLOCKER**: 800
- **HIGH**: 594
- **MEDIUM**: 0
- **LOW**: 0

## 5. Public Readiness Summary
- **READY_FOR_REVIEW**: 0
- **NEEDS_METADATA_REPAIR**: 0
- **NEEDS_CONTENT_REPAIR**: 0
- **NEEDS_TRANSLATION_REPAIR**: 0
- **NEEDS_SCHEMA_REVIEW**: 0
- **BLOCKED**: 500

## 6. Examples of Representative Problems
| Table | Record ID | Field | Issue | Recommendation |
|---|---|---|---|---|
| ai_resources | ai-academy-resource-ai-ethics-guidelines | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-ai-ethics-guidelines | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-ai-ethics-guidelines | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-ai-safety-fundamentals | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-ai-safety-fundamentals | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-ai-safety-fundamentals | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-ai-study-planner | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-ai-study-planner | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-ai-study-planner | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-ai-tools-directory | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-ai-tools-directory | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-ai-tools-directory | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-anthropic-alignment | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-anthropic-alignment | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-anthropic-alignment | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-ar-ai-community | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-ar-ai-community | content_type | mismatch (BLOCKER) | Set to resources |
| ai_resources | ai-academy-resource-ar-ai-community | title_en | missing (HIGH) | Generate English title from Arabic source |
| ai_resources | ai-academy-resource-canva-magic-studio | slug | missing_slug (BLOCKER) | Add slug |
| ai_resources | ai-academy-resource-canva-magic-studio | content_type | mismatch (BLOCKER) | Set to resources |

## 7. Recommended Next Repair Station
Based on this audit, the next station should focus on applying the recommended repairs (e.g., generating `title_en` and `excerpt_*` fields) via safely reviewed transaction-wrapped SQL or automated tooling.

**EXPLICIT CONFIRMATION**: No database writes, publishing, or public UI wiring happened during this audit.
