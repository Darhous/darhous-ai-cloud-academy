# Production Repair Master Plan
**From Current State → Shippable Product**

---

## Current State Summary

The platform is 65-70% complete. The public-facing UI is functional, visually premium, and mostly bilingual. However, multiple blockers prevent it from being considered production-ready:

1. Zero published CMS content (all 600 records are draft)
2. Missing visual effects the owner expected (stacked cards, tour)
3. Two portals with broken English layouts (RTL hardcoded)
4. One portal completely orphaned (Cloud)
5. Admin not scalable for day-to-day content management
6. No design system for future development
7. Branding split mid-rename

---

## Repair Phases (Ordered by Priority)

---

### Phase R1: Critical Bug Fixes + Quick Wins
**Goal:** Fix bugs that block real users, complete in 1-2 stations

**Execute in this order:**

1. **Fix RTL hardcoding** on Automation and Career portals
   - `src/app/[locale]/automation/page.tsx` — change `dir="rtl"` to `dir={isAr ? "rtl" : "ltr"}`
   - `src/app/[locale]/career/page.tsx` — same fix
   - Also fix any Arabic-only text in these pages

2. **Fix OG image** — change locale layout OG to use `/og` dynamic route
   - `src/app/[locale]/layout.tsx` — change `images[0].url` to dynamic route

3. **Add automation-glossary to sitemap and automation portal nav**
   - Add `/automation-glossary` to `sitemap.ts`
   - Add link in automation portal page under sub-navigation

4. **Unify branding** — pick "NexaLearn by Darhous" as the canonical brand name
   - Update `src/app/[locale]/layout.tsx` metadata to use "NexaLearn by Darhous"
   - Update JSON-LD organization name
   - Ensure CinematicIntro, Hero, Footer all say "NexaLearn by Darhous"

5. **Add SmartPlatformTour trigger** — since auto-open is disabled
   - Add a "Platform Tour 🗺️" button somewhere visible (hero section or navbar)
   - Button calls `setOpen(true)` on the tour component

**Forbidden during Phase R1:** SQL, migrations, DB changes, package updates

**Validation:** npm run build should succeed; grep for `dir="rtl"` to confirm no more hardcoded instances

---

### Phase R2: Content Publishing Foundation
**Goal:** Make at least 50 DB records publicly visible

**Execute in this order:**

1. **Add bulk publish UI to admin** (GenericCmsTypePanel)
   - Checkbox multi-select in content list
   - "Publish Selected" button
   - Calls existing API `PATCH /api/admin/cms/[table]/[id]` with status: "published"

2. **Publish first wave of content** (admin action, not code change)
   - Select 5-10 glossary terms → publish
   - Select 5-10 prompts → publish
   - Select 3-5 courses → publish
   - Select 2-3 blog posts → publish

3. **Verify read-with-fallback works** after publishing
   - Visit `/ar/glossary` — verify DB records appear
   - Visit `/ar/blog` — verify DB posts appear

4. **Add English content to Automation and Career portal sections**
   - Phase R1 fixes the `dir` bug; Phase R2 adds missing English translations in portal section text

**Forbidden:** New Supabase tables, migrations, schema changes

---

### Phase R3: Navigation + Portal Completeness
**Goal:** All portals discoverable, Cloud portal resolved

**Execute in this order:**

1. **Resolve Cloud Portal** — two options:
   - Option A: Add `/cloud` to `portals.tsx` as a real portal entry
     - Requires creating cloud data file, adding admin panel
   - Option B: Remove `/cloud/page.tsx` and redirect to AI Academy
   - **Recommended: Option A if cloud content exists, Option B if not**

2. **Refactor EcosystemMap** to use `.map()` over portals array
   - Single card component called for each portal
   - Eliminates the manual portals[0]..portals[5] pattern

3. **Add portal color CSS variable standardization**
   - Ensure all portals set `--portal-color` consistently via `PortalPageWrapper` or layout

4. **Add accessible focus rings to all interactive cards**
   - PortalCard, EcosystemMap cards, CourseCard, ToolCard etc.
   - CSS: `focus-visible:ring-2 focus-visible:ring-[portal-color]`

5. **Add hreflang to locale layout metadata**
   - `alternates: { languages: { 'ar': '/ar/...', 'en': '/en/...' } }`

6. **Add emoji aria-hidden** to all decorative emoji in portal icons

---

### Phase R4: Admin Architecture Refactor
**Goal:** Admin becomes maintainable and extensible

**Execute in this order:**

1. **Split AdminDashboardClient.tsx** into per-tab files
   - Create `src/components/admin/tabs/BlogTab.tsx`
   - Create `src/components/admin/tabs/CoursesTab.tsx`
   - etc. for all 32 tabs
   - `AdminDashboardClient` becomes a router/switcher only

2. **Implement image upload** in admin
   - File picker + Supabase Storage upload
   - Returns public URL stored in record's `cover_url` field

3. **Add search and filter** to GenericCmsTypePanel
   - Client-side search by title
   - Filter by status (draft/published/archived)

4. **Add sort order drag-and-drop** to content lists (or at minimum numeric input)

5. **Add markdown preview** to text area fields in admin forms

---

### Phase R5: UI Design System Foundation
**Goal:** Adding new portals/content types requires minimal new code

**Execute in this order:**

1. **Create BaseCard component**
   - Accepts: title, description, icon, color, href, badge, status
   - Used by BlogCard, CourseCard, PortalCard etc.

2. **Create PortalLayout component**
   - Standard hero structure: back link, badge, icon, title, subtitle, stats bar
   - All portal pages use `<PortalLayout portalKey="..." locale="...">`

3. **Switch Google Fonts to next/font**
   - Replace CSS @import with `next/font/google` imports
   - Remove from globals.css, add to root layout

4. **Create `DESIGN_SYSTEM.md`**
   - Document all CSS classes from globals.css
   - Show usage examples

---

### Phase R6: Security + Performance Hardening
**Goal:** Production-grade security and acceptable performance

**Execute in this order:**

1. **Add CSP header** to next.config.ts
   - Allowlist: self, Supabase domains, Google Fonts, Framer Motion CDN
   - Start in report-only mode to detect violations

2. **Add file type validation** to avatar upload route
   - Accept only image/jpeg, image/png, image/webp
   - Reject files >5MB

3. **Add InteractiveSurface RAF throttle**
   - Wrap pointermove handler in requestAnimationFrame

4. **Reduce blur layers on mobile**
   - `@media (max-width: 768px) { backdrop-filter: none; }` for non-critical elements

5. **Verify MDX/HTML sanitization** in blog rendering
   - Confirm no arbitrary HTML injection possible

---

## What Must NOT Be Touched Until Approved

- Supabase SQL schemas
- Supabase migrations
- Previously published records (0 published currently — all safe)
- `tools_hub` tables/routes
- `nano_banana` DB records (deferred)
- `.env` files
- Auth configuration

---

## QA Gates Per Phase

| Phase | Gate |
|-------|------|
| R1 | `npm run build` passes; `/en/automation` shows LTR; OG image shows on Twitter card tester |
| R2 | At least 10 records visible on public pages from DB (not static fallback) |
| R3 | Cloud portal discoverable via navbar; no orphaned routes in navigation audit |
| R4 | Admin can upload image; each admin tab in separate file; lint passes on admin directory |
| R5 | New portal page can be created by editing only portals.tsx + one new page file |
| R6 | CSP report-only shows no violations; security headers pass online checker |

---

## Acceptance Criteria for Production

The product is production-ready when:
- [ ] At least 50 content records are published (visible to public)
- [ ] All portals discoverable via navigation (including Cloud)
- [ ] No RTL/LTR layout bugs
- [ ] SmartPlatformTour visible to new users
- [ ] Social sharing shows correct preview image (not SVG)
- [ ] One consistent brand name across all pages
- [ ] Admin can publish content without developer assistance
- [ ] Build passes in CI without warnings
- [ ] CSP header deployed

---

## Rollback / Checkpoint Strategy

- Each phase gets a dedicated git commit and checkpoint tag
- Before any destructive change, verify `git status` is clean
- No `git add .` — explicit file staging only
- Tags: `checkpoint/repair-phase-R1`, `checkpoint/repair-phase-R2`, etc.
- If phase breaks build: revert with `git revert HEAD` — NOT `git reset --hard`

---

## Expected Final Product State

After executing all repair phases:

**Public users see:**
- Fully functional AI Academy with published courses, tools, prompts
- Working automation portal with published workflows and glossary
- Language assessment that saves results to user account
- Digital exams with certificate issuance
- Career tools powered by Gemini AI
- IoT Lab with published lessons and projects
- Nano Banana prompt gallery
- Cloud Academy accessible via navigation
- Platform tour for new users
- Consistent "NexaLearn by Darhous" branding

**Admin can:**
- Log in and manage all content types
- Upload images for courses, blog, portals
- Bulk publish content records
- Manage users and issue certificates
- Configure AI Mentor behavior
- Preview drafts before publishing

**Developers can:**
- Add a new portal by editing portals.tsx + creating one page file
- Add a new content type by creating one data file + one admin tab
- Navigate admin code without a 327KB monolith
