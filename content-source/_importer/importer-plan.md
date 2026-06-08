# Importer Dry-Run Plan & Architecture

## Overview
This document describes the design for a safe Supabase data importer, currently running in **DRY-RUN ANALYSIS ONLY** mode. No connections to the database are made.

## Safe Importer Architecture Requirements
If/when activated, the actual importer must follow these strict rules:
1. **Dry-Run Default:** The script must always run in dry-run mode unless a `--live` flag is passed.
2. **Upsert Only:** Uses `ON CONFLICT (id) DO UPDATE` to ensure idempotency.
3. **No Deletions:** Stale content is never automatically deleted by the importer to prevent catastrophic data loss.
4. **Per-Portal / Per-Type Granularity:** Capability to run isolated imports (e.g., `--portal ai-academy --type glossary`).
5. **Checksums (Optional):** Compare a hash of the normalized JSON against the existing `data` column to skip unnecessary updates.
6. **No Client Auth Requirement:** Run via Supabase Service Role Key to bypass RLS, relying on strict runtime validation.

## Table Strategy Recommendation
**Recommendation: Option D (Hybrid)**
- Use existing portal-specific tables where they exist (e.g., `ai_glossary`, `automation_prompts`).
- Do NOT force a massive generic `content` table migration yet, as it would break heavily coupled legacy app routes.
- For missing tables (e.g., `tools-hub` content), create them in the future using `_template_content_table.sql`.

## Target Pilot Recommendation
**Recommended Pilot:** `automation` (or `ai-academy`)
- **Reason:** They have the most complete schema alignments (e.g., `automation_glossary`, `automation_prompts` exist).
- **Not Recommended:** `tools-hub` (high product/architecture risk, may not exist in the live app) and `nano-banana` (routing/portal ID naming mismatch needs resolution first).
