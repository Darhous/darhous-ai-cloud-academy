# Phase Breakdown Roadmap
**Station-by-Station Development Plan**

---

## Overview

This roadmap translates the Production Repair Master Plan into concrete development stations (commits). Each station has: objectives, files to touch, validation gate, and commit message.

**Total estimated stations: 18**
**Current station: Full Product Audit (this document)**
**Next station: Repair Phase R1**

---

## Station Map

### STATION: full-product-audit-production-plan (CURRENT)
**Type:** Audit + Planning  
**Branch:** `claude/darhous-full-audit-production-hunrq0`  
**Commit:** `docs: audit product readiness and production plan`  
**Tag:** `checkpoint/full-product-audit-production-plan-v1`  

**Deliverables:**
- 21-file report package at `docs/reports/2026-06-10-full-product-audit-production-plan/`
- Updated `ANTIGRAVITY_PROJECT_LOG.md`

**Validation:**
- All 21 files exist in report folder
- ANTIGRAVITY_PROJECT_LOG.md appended (no placeholders)
- `git status` shows only staged docs files
- Build status: N/A (audit only)

---

### STATION: repair-phase-r1-critical-bugs

**Type:** Bug Fixes + Quick Wins  
**Objectives:**
1. Fix RTL hardcoding on Automation and Career portals
2. Fix OG image in locale layout (SVG → dynamic route)
3. Add automation-glossary to sitemap
4. Add automation-glossary link to automation portal nav
5. Unify branding to "NexaLearn by Darhous"
6. Add SmartPlatformTour visible trigger button

**Files to touch:**
```
src/app/[locale]/automation/page.tsx
src/app/[locale]/career/page.tsx
src/app/[locale]/layout.tsx
src/app/sitemap.ts
```

**Forbidden:**
- No SQL, migrations, DB changes
- No package.json changes
- No env file changes

**Validation Gate:**
```bash
npm run build          # must pass
grep -r 'dir="rtl"' src/app/[locale]/automation/page.tsx  # must return 0
grep -r 'dir="rtl"' src/app/[locale]/career/page.tsx      # must return 0
grep '/og-image.svg' src/app/[locale]/layout.tsx           # must return 0
grep 'NexaLearn by Darhous' src/app/[locale]/layout.tsx   # must return 1+
```

**Commit:** `fix: repair phase R1 - RTL bugs, OG image, branding, tour trigger`  
**Tag:** `checkpoint/repair-phase-R1`

---

### STATION: repair-phase-r2-bulk-publish-ui

**Type:** Admin Feature  
**Objectives:**
1. Add checkbox multi-select to content list in GenericCmsTypePanel
2. Add "Publish Selected" and "Unpublish Selected" buttons
3. Wire to existing `PATCH /api/admin/cms/[table]/[id]` with `{ status: "published" }`
4. Add English translations to Automation and Career portal section content

**Files to touch:**
```
src/components/admin/GenericCmsTypePanel.tsx
src/app/[locale]/automation/page.tsx     (content translations)
src/app/[locale]/career/page.tsx         (content translations)
```

**Forbidden:**
- No new Supabase tables, migrations, schema changes
- No SQL

**Validation Gate:**
```bash
npm run build          # must pass
# Manual: visit /admin → select records → bulk publish
# Manual: visit /ar/glossary → confirm DB records appear (not static)
```

**Commit:** `feat: repair phase R2 - bulk publish UI and English portal translations`  
**Tag:** `checkpoint/repair-phase-R2`

---

### STATION: repair-phase-r3-cloud-portal-resolution

**Type:** Navigation + Portal  
**Decision Required:** Option A (add cloud as real portal) or Option B (redirect to AI Academy)  
**Recommended:** Option B (redirect) if cloud data file does not exist; Option A if content ready

**Sub-objectives (Option B path):**
1. Remove or redirect `/cloud/page.tsx` to `/ai-academy`
2. Remove `/cloud` from sitemap
3. Add `--portal-color` CSS variable standardization
4. Add `focus-visible` focus rings to PortalCard and EcosystemMap cards
5. Add `aria-hidden="true"` to decorative emoji in portal icons
6. Add `hreflang` alternates to locale layout metadata
7. Refactor EcosystemMap to use `.map()` over portals array

**Files to touch (Option B):**
```
src/app/[locale]/cloud/page.tsx          (add redirect or remove)
src/app/sitemap.ts                       (remove /cloud if redirected)
src/components/landing/sections/EcosystemMap.tsx
src/components/ui/PortalCard.tsx
src/app/[locale]/layout.tsx              (hreflang)
```

**Forbidden:**
- No DB changes

**Validation Gate:**
```bash
npm run build          # must pass
# Manual: /en/cloud should redirect (if Option B)
# Manual: Portal cards show focus ring when keyboard focused
# Grep: EcosystemMap.tsx no longer has portals[0]..portals[5] manual access
```

**Commit:** `feat: repair phase R3 - cloud portal, navigation completeness, accessibility`  
**Tag:** `checkpoint/repair-phase-R3`

---

### STATION: repair-phase-r4-admin-refactor

**Type:** Admin Architecture  
**Objectives:**
1. Split AdminDashboardClient.tsx into per-tab files
2. Implement image upload (file picker + Supabase Storage + public URL)
3. Add search and filter to GenericCmsTypePanel
4. Add markdown preview to text area fields in admin forms

**Files to touch:**
```
src/components/admin/AdminDashboardClient.tsx   (reduce to router/switcher)
src/components/admin/tabs/BlogTab.tsx           (new)
src/components/admin/tabs/CoursesTab.tsx        (new)
src/components/admin/tabs/GlossaryTab.tsx       (new)
... (all remaining tabs)
src/components/admin/GenericCmsTypePanel.tsx    (search + filter)
src/app/api/admin/upload/route.ts              (image upload endpoint)
```

**Forbidden:**
- No SQL, migrations
- No schema changes

**Validation Gate:**
```bash
npm run build          # must pass
npm run lint           # must pass on admin directory
# AdminDashboardClient.tsx size must be < 50KB after split
# Manual: image upload works in admin
```

**Commit:** `refactor: repair phase R4 - admin architecture split and image upload`  
**Tag:** `checkpoint/repair-phase-R4`

---

### STATION: repair-phase-r5-design-system

**Type:** Architecture  
**Objectives:**
1. Create BaseCard component
2. Create PortalLayout component
3. Switch Google Fonts to next/font
4. Create DESIGN_SYSTEM.md

**Files to touch:**
```
src/components/ui/BaseCard.tsx           (new)
src/components/ui/PortalLayout.tsx       (new)
src/app/globals.css                      (remove @import for fonts)
src/app/[locale]/layout.tsx             (add next/font imports)
docs/DESIGN_SYSTEM.md                   (new — only if explicitly requested)
```

**Validation Gate:**
```bash
npm run build          # must pass
# No @import for Google Fonts in globals.css
# All portal pages render correctly
```

**Commit:** `feat: repair phase R5 - design system foundation and next/font migration`  
**Tag:** `checkpoint/repair-phase-R5`

---

### STATION: repair-phase-r6-security-performance

**Type:** Security + Performance  
**Objectives:**
1. Add CSP header to next.config.ts (report-only mode)
2. Add file type and size validation to avatar upload route
3. Add requestAnimationFrame throttle to InteractiveSurface pointermove
4. Add mobile media query to reduce blur layers
5. Verify MDX/HTML sanitization in blog rendering

**Files to touch:**
```
next.config.ts
src/app/api/avatar/upload/route.ts
src/components/ui/InteractiveSurface.tsx
src/app/globals.css
```

**Validation Gate:**
```bash
npm run build          # must pass
# CSP header present in response headers
# Upload route rejects non-image MIME types
# InteractiveSurface uses requestAnimationFrame
```

**Commit:** `fix: repair phase R6 - CSP header, upload validation, performance hardening`  
**Tag:** `checkpoint/repair-phase-R6`

---

## Station Sequence Summary

| Order | Station Name | Type | Issues Closed |
|-------|-------------|------|---------------|
| 0 | full-product-audit-production-plan | Audit | — |
| 1 | repair-phase-r1-critical-bugs | Bug Fix | ISS-007, ISS-008, ISS-010, ISS-009, ISS-028, ISS-002, ISS-006, ISS-027 |
| 2 | repair-phase-r2-bulk-publish-ui | Feature | ISS-004, ISS-013, ISS-033 |
| 3 | repair-phase-r3-cloud-portal-resolution | Navigation | ISS-005, ISS-029, ISS-015, ISS-032, ISS-024, ISS-025, ISS-026 |
| 4 | repair-phase-r4-admin-refactor | Admin | ISS-011, ISS-012, ISS-031 |
| 5 | repair-phase-r5-design-system | Architecture | ISS-016, ISS-021 |
| 6 | repair-phase-r6-security-performance | Security | ISS-019, ISS-020, ISS-023, ISS-034 |

---

## Deferred Items (Not Scheduled)

| Issue | Reason Deferred |
|-------|----------------|
| ISS-001 (stacked-card effect) | Requires design decision on what exact effect to implement |
| ISS-003 (CinematicIntro replay) | Low priority, localStorage change minimal |
| ISS-017 (IoT data split) | Architecture decision needed |
| ISS-018 (Arabic text in EN portals) | Covered partly in R2 |
| ISS-022 (landing server/client split) | Large refactor, low priority |
| ISS-030 (Jobs placeholder) | Requires real data source |
| ISS-035 (Resend not configured) | Operational config, not code |

---

## Rollback Strategy

Each station:
1. Gets a dedicated commit (one commit per station)
2. Gets a `checkpoint/repair-phase-RN` tag
3. If build breaks: `git revert HEAD` (NOT `git reset --hard`)
4. Never use `git add .` — explicit file staging only
5. Protected files never touched

---

## Expected Timeline

| Station | Complexity | Estimated Time |
|---------|-----------|----------------|
| R1 | Low — 4 file edits | 1-2 hours |
| R2 | Medium — admin component work | 2-4 hours |
| R3 | Medium — refactor + accessibility | 3-5 hours |
| R4 | High — admin architecture split | 6-10 hours |
| R5 | Medium — new components | 4-6 hours |
| R6 | Low-Medium — config + validation | 2-4 hours |
| **Total** | | **~20-30 hours** |
