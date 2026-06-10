# N1 — Navigation & Orphan Cleanup

**Date:** 2026-06-10  
**Task:** N1  
**Status:** Complete  

## Summary

Four surgical navigation fixes applied across exactly 4 files:

| # | File | Change |
|---|------|--------|
| 1 | `src/config/portals.ts` | Added TODO comment block documenting the `/cloud` portal gap |
| 2 | `src/app/sitemap.ts` | Removed `/language/history` (noindex route) from generated sitemap |
| 3 | `src/components/layout/Footer.tsx` | Added `/prompts` (AI Studio column) and `/automation-glossary` (Links column) |
| 4 | `src/app/[locale]/automation-glossary/AutomationGlossaryClient.tsx` | Fixed admin CTA href from `/dashboard` to `/admin` |

## Validation

- `npm run typecheck` → **0 errors**
- `npm run lint` → **0 new errors**
- `npm run build` → **exit 0**

## Files Changed

Only the 4 permitted files were modified. No content was removed from the site.
