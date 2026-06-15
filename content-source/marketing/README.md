# content-source/marketing — Marketing Academy authoring layer

Standalone authoring source for the **Marketing** portal. No routes, no UI, no
migrations live here — this is the human-editable content that feeds:

1. `src/data/marketing/*` — typed static fallback the routes render.
2. `supabase/v50_marketing_portal.sql` tables (`marketing_*`) — live DB rows.

Pipeline (same as other portals): author here → normalize
(`content-source/_normalization`) → generate SQL (`content-source/_db-sync`) →
run in Supabase SQL Editor. The public `/marketing` route merges DB rows over
the static fallback via `fetchPublishedList` + `mergeById`.

## Folder map
```
marketing/
├── tracks/        track JSON (one per learning track)        → marketing_tracks
├── lessons/       lesson Markdown + YAML frontmatter          → marketing_lessons
├── glossary/      term JSON                                   → marketing_glossary
├── prompts/       reusable marketing prompt JSON              → marketing_glossary/prompts
├── assignments/   assignment + rubric JSON                    → marketing_assignments
├── case-studies/  case study Markdown/JSON                    → marketing_case_studies
└── simulations/   business-sim scenario JSON                  → marketing_simulations
```

## Conventions
- Every file carries `id`, `portal_id: "marketing"`, `content_type`, `status`
  (`draft` until reviewed), `title_ar`, `title_en`, `sort_order`.
- Bilingual: Arabic (`*_ar`) is primary, English (`*_en`) required.
- Lessons are Markdown with YAML frontmatter; everything else is JSON with a
  `data` object for the type-specific payload.
- `id` must equal the filename (minus extension) and stays stable forever
  (it is the DB primary key and the public URL slug).

See `docs/marketing-portal/BLUEPRINT.md` for the full curriculum design.
