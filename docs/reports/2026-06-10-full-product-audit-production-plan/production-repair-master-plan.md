# Production Repair Master Plan

**From:** Audit state at `94348be` (main, CI green, 0 Tier-A published)  
**To:** Shippable NexaLearn by Darhous product with owner-visible landing UX, safe admin, controlled content, consistent brand

---

## Executive repair order

```
L1 Landing visual repair (owner blocker)
  ↓
A1 Admin CMS safety + PATCH fix (production blocker)
  ↓
S1 Certificate security + URL canon (production blocker)
  ↓
N1 Navigation & orphan cleanup (quick wins)
  ↓
B1 NexaLearn brand/metadata (launch perception)
  ↓
L2 English localization leaks (launch blocker EN market)
  ↓
C1 Tier-A pilot publish — 1 portal, 1 type (user-approved)
  ↓
C2 Tier-A route template + scale publish batches
  ↓
R1 UI design-system foundation (scalability)
  ↓
A2 Admin monolith extraction + publish UI
  ↓
P1 Performance pass
  ↓
QA-GATE Final launch candidate
```

---

## What to fix FIRST (week 1)

1. **Mount or replace 3D/stacked card experience** — owner-confirmed gap (FPA-001, FPA-002)
2. **Fix generic CMS PATCH** — admins blocked (FPA-005)
3. **Disable CMS hard DELETE** (FPA-006)
4. **Certificate API authorization** (FPA-004)
5. **Re-enable platform tour with explicit trigger** (FPA-007)

## What must NOT be touched yet

| Item | Until |
|------|-------|
| SQL / migrations / Supabase writes | Explicit user approval per batch |
| `tools_hub` Tier-A content | Schema + user approval |
| `nano_banana` Tier-A import | Deferred policy |
| 210 live-wired records | Publish strategy signed off |
| 230 deferred records | Schema reconciliation |
| Previous DB sync SQL | Never re-run |
| `package.json` / dependencies | Explicit instruction |
| `.env` / secrets | Never |
| Protected audit Python scripts | Never |

---

## Phase L1 — Landing Visual Repair

**Objective:** Owner sees premium cards and scroll/layer effect on first screenful.

### Tasks

1. **Decision gate:** Mount `Premium3DShowcaseCarousel` below hero OR build new `ScrollStackPortalSection` per UX PROMAX intent
2. Insert chosen component in `HomepageClient.tsx` **before** or **replacing** redundant portal section (avoid duplicate grids)
3. Add "Take a tour" button in hero opening `SmartPlatformTour` (do not auto-open)
4. Localize `portals.features` → `featuresAr` / `featuresEn`
5. Increase `glass-panel-promax` border contrast in light mode
6. Optional: `sessionStorage` clear link in footer for QA ("Replay intro")

### Files likely affected

- `src/components/landing/HomepageClient.tsx`
- `src/components/layout/Premium3DShowcaseCarousel.tsx` OR new `ScrollStackPortalSection.tsx`
- `src/components/landing/SmartPlatformTour.tsx`
- `src/components/landing/sections/HeroSection.tsx`
- `src/config/portals.ts`
- `src/app/globals.css`

### Acceptance criteria

- [ ] Owner confirms 3D or scroll-stack visible without scrolling on 1440×900 desktop
- [ ] Portal cards still reachable on mobile without hover-only info
- [ ] Tour opens on button click
- [ ] `/en` portal feature pills in English
- [ ] Reduced motion shows static cards (no motion required for visibility)
- [ ] `npm run typecheck && npm run build` pass
- [ ] No regression to portal links

### Rollback

Tag: `checkpoint/landing-visual-repair-v1` — revert HomepageClient composition only.

---

## Phase A1 — Admin CMS Foundation Hardening

**Objective:** Safe, working CMS for 22 registry tables.

### Tasks

1. PATCH API: accept content fields without `status` for non-pilot tables; separate `POST .../publish` endpoint
2. Remove or gate DELETE → `archived` status only
3. Audit create defaults — never default `published` without confirmation
4. Integration test matrix: one CRUD cycle per registry table
5. Document admin operator guide

### Files

- `src/app/api/admin/cms/[table]/[id]/route.ts`
- `src/components/admin/cms/GenericCmsTypePanel.tsx`
- `src/lib/admin/cms-registry.ts`

### Acceptance criteria

- [ ] Edit automation_path without 403
- [ ] DELETE disabled or soft-archive only
- [ ] Admin can list/edit all 22 types
- [ ] Security review sign-off

### Rollback

`checkpoint/admin-cms-hardening-v1`

---

## Phase S1 — Certificate Security & Canonical URLs

**Objective:** No IDOR; one verify URL shape.

### Tasks

1. Ownership check on PDF/download routes
2. Move issuance mutations to POST
3. Redirect legacy `/certificates/verify/[code]` → `/[locale]/certificates/verify/[id]`
4. Update QR generators, email templates, profile links
5. NexaLearn certificate template (ties to B1)

### Acceptance criteria

- [ ] Cannot fetch another user's cert by ID
- [ ] All new certs use localized URL
- [ ] PDF shows NexaLearn by Darhous

---

## Phase N1 — Navigation & Dead Page Cleanup

### Tasks

1. Add `/cloud` to `portals.ts` OR deprecate page + remove sitemap
2. Add `/prompts`, `/automation-glossary` to footer/automation hub
3. Sync footer AI Studio with navbar
4. Fix glossary admin CTA
5. Remove `/language/history` from sitemap if noindex
6. Link project build step OR remove route
7. Delete or mount unused carousels

---

## Phase B1 — Brand & Metadata Completion

### Tasks

1. Homepage + layout metadata → NexaLearn by Darhous
2. Regenerate `og-image.svg` / dynamic OG
3. PWA manifest name/icons
4. Certificate PDF template
5. Navbar wordmark consistency

---

## Phase L2 — Localization QA

### Tasks

1. Digital exams: EN questions or disable EN exam marketing
2. IoT/career placeholder i18n
3. Portal copy audit on `/en/*`
4. Automated locale leak test in CI (grep Arabic in EN routes)

---

## Phase C1 — Controlled Tier-A Pilot Publish

**Requires explicit user approval for DB writes.**

### Pilot scope (recommended)

- Portal: **automation**
- Type: **automation_glossary** (already has public pilot page)
- Batch: 5 records draft → review → published
- Wire: ensure `read-with-fallback` shows published rows

### Gates

1. Admin preview matches public render
2. RLS verified: draft hidden, published visible
3. Rollback: revert status to draft in controlled SQL (user-approved)

### Scale (C2)

- `ContentListPage` + `ContentDetailPage` templates for lessons/resources
- Publish batches of 25 with QA checklist
- ID collision map before each batch

---

## Phase R1 — UI Architecture / Design System

### Tasks

1. `Card`, `Button`, `Section` primitives
2. `homepage-sections.config.ts`
3. `motionPresets.ts`
4. Portal scaffold documentation
5. Extract 3 more admin panels from monolith

---

## Phase A2 — Admin Monolith Extraction

Continue behavior-preserving extraction until `AdminDashboardClient.tsx` < 2000 lines.

---

## Phase P1 — Performance

- Dynamic import PDF/charts
- Paginate static lists
- Lazy below-fold landing sections

---

## QA Gates (final launch candidate)

| Gate | Command / check |
|------|-----------------|
| Build | `npm run check` |
| CI | GitHub Actions green |
| Security | Certificate + CMS review |
| Owner UX | Landing cards sign-off |
| EN locale | No Arabic leaks on `/en/digital-exams` |
| Brand | Share preview WhatsApp test |
| Content | ≥1 published Tier-A pilot visible |
| Admin | CRUD matrix pass |
| A11y | axe on homepage + admin |
| Rollback | Checkpoint tag documented |

---

## Expected final product state

1. **Landing:** NexaLearn-branded, owner-visible 3D or scroll-stack portal showcase, working tour trigger, mouse-reactive cards, both locales correct
2. **Portals:** All 8+ portals navigable; cloud resolved; no orphan pilots
3. **Content:** Static library + published Tier-A growing through controlled batches; tools_hub/nano deferred documented
4. **Admin:** Grouped IA, working generic CMS, publish workflow, no unsafe DELETE, <2000-line dashboard target path
5. **Security:** Certificates authorized; CMS lifecycle locked
6. **Brand:** Consistent NexaLearn by Darhous on web, OG, certs, emails
7. **Architecture:** Primitives + content templates enabling 1000+ topics without monolith edits
8. **CI/CD:** Green build; Vercel deploy matches tagged release

---

## Checkpoint / rollback strategy

- One checkpoint tag per phase: `checkpoint/{phase-name}-v1`
- Never force-push tags
- DB changes: snapshot before publish batch; rollback script per batch
- Feature flags: optional `NEXT_PUBLIC_LANDING_SHOWCASE=stack|carousel|grid` for A/B during L1

---

## Next station name

**`landing-visual-repair-and-showcase-integration-v1`**
