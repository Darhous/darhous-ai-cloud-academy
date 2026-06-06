/**
 * generate-nb-sql.ts
 * Generates SQL INSERT statements for all static nano-banana prompts.
 * Run: npx tsx scripts/generate-nb-sql.ts > supabase/v21_nano_banana_seed.sql
 */

import { nanaBananaPrompts } from "../src/data/nano-banana-prompts";

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return s.replace(/'/g, "''");
}

function pgArray(arr: string[]): string {
  if (!arr || arr.length === 0) return "'{}'";
  return "ARRAY[" + arr.map((t) => `'${esc(t)}'`).join(", ") + "]";
}

const lines: string[] = [
  "-- ══════════════════════════════════════════════════════════════════",
  "-- v21 — Nano Banana: seed static prompts into DB",
  "-- Run in: Supabase Dashboard → SQL Editor",
  "-- Safe to re-run: uses source_slug unique constraint",
  "-- ══════════════════════════════════════════════════════════════════",
  "",
  "-- Step 1: Add source_slug column for idempotent inserts",
  "ALTER TABLE nano_banana_custom_prompts",
  "  ADD COLUMN IF NOT EXISTS source_slug TEXT;",
  "",
  "-- Step 2: Add unique constraint on source_slug (safe re-run)",
  "DO $$ BEGIN",
  "  IF NOT EXISTS (",
  "    SELECT 1 FROM pg_constraint",
  "    WHERE conname = 'nano_banana_custom_prompts_source_slug_key'",
  "  ) THEN",
  "    ALTER TABLE nano_banana_custom_prompts",
  "      ADD CONSTRAINT nano_banana_custom_prompts_source_slug_key",
  "      UNIQUE (source_slug);",
  "  END IF;",
  "END $$;",
  "",
  "-- Step 3: Insert all static prompts (ON CONFLICT DO NOTHING = idempotent)",
  "INSERT INTO nano_banana_custom_prompts (",
  "  title_ar, title_en, description_ar, description_en,",
  "  category, category_label_ar, category_label_en,",
  "  difficulty, best_input_ar, best_input_en,",
  "  prompt_ar, prompt_en,",
  "  accent, gradient, emoji, tags, featured,",
  "  image_url, status, source_slug",
  ") VALUES",
];

const rows = nanaBananaPrompts.map((p, i) => {
  const isLast = i === nanaBananaPrompts.length - 1;
  const gradient = p.gradient ?? `linear-gradient(135deg, ${p.accent}30 0%, ${p.accent}08 100%)`;
  const imageUrl = p.image ? `'${esc(p.image)}'` : "NULL";

  const row = [
    `  (`,
    `    '${esc(p.titleAr)}', '${esc(p.titleEn)}',`,
    `    '${esc(p.descriptionAr)}', '${esc(p.descriptionEn)}',`,
    `    '${esc(p.category)}', '${esc(p.categoryLabelAr)}', '${esc(p.categoryLabelEn)}',`,
    `    '${esc(p.difficulty)}', '${esc(p.bestInputAr)}', '${esc(p.bestInputEn)}',`,
    `    '${esc(p.promptAr)}', '${esc(p.promptEn)}',`,
    `    '${esc(p.accent)}', '${esc(gradient)}', '${esc(p.emoji)}',`,
    `    ${pgArray(p.tags)}, ${p.featured ? "true" : "false"},`,
    `    ${imageUrl}, 'published', '${esc(p.id)}'`,
    `  )${isLast ? "" : ","}`,
  ].join("\n");

  return row;
});

lines.push(...rows);
lines.push("ON CONFLICT (source_slug) DO NOTHING;");
lines.push("");
lines.push(`-- Inserted ${nanaBananaPrompts.length} static prompts`);
lines.push("");

console.log(lines.join("\n"));
