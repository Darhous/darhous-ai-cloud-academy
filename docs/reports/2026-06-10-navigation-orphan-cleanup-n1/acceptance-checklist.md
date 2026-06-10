# Acceptance Checklist — N1

- [x] /cloud gap documented (TODO block) in `src/config/portals.ts`
- [x] /language/history removed from `src/app/sitemap.ts`
- [x] /prompts added to Footer (AI Studio column, bilingual)
- [x] /automation-glossary added to Footer (Links column, bilingual)
- [x] AutomationGlossary admin CTA href corrected: `/dashboard` → `/admin`
- [x] `npm run typecheck` → 0 errors
- [x] `npm run lint` → 0 new errors
- [x] `npm run build` → exit 0 *(see validation-results.md)*
- [x] Only 4 permitted files changed:
  - `src/config/portals.ts`
  - `src/app/sitemap.ts`
  - `src/components/layout/Footer.tsx`
  - `src/app/[locale]/automation-glossary/AutomationGlossaryClient.tsx`
- [x] No content removed from the site (`no_content_removed: true`)
- [x] Forbidden files untouched: ANTIGRAVITY_PROJECT_LOG.md, SQL, migrations, supabase/, src/app/api/**, admin components, auth, .env*, package.json, landing sections, ScrollStackSection, MarqueeStrip, tools_hub, nano_banana, .claude/, .codex/
