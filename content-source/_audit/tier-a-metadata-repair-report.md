# Tier-A Metadata Repair Report

This report details the safe deterministic metadata repairs applied to the normalized JSON/Markdown source files. No DB writes or Supabase sync was performed.

- **Records Scanned**: 600
- **Files Changed**: 600
- **Total Repairs Applied**: 1200
- **Total Skipped Issues (Uncertain)**: 100

## Repair Types
- **slug_filled**: 600
- **title_en_generated**: 280
- **data_key_migrated**: 320

## Skipped Records Examples
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-advanced-prompting.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-ethics.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-for-study-2.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-for-study.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-for-work-2.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-for-work.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-ai-hallucination.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-detecting-hallucinations.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-evaluating-models.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.
- content-source/_normalized\ai-academy\lessons\ai-academy-lesson-future-of-ai.md: excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata.

## Next Steps
Verify the new metadata passes audit, then run automated scripts/SQL to apply these updates to the Supabase database.
