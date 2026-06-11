# Production Visual Roadmap

## Phase 1 Visual Foundation Fixes

**Goal:** establish a trustworthy brand, locale, icon, token, and deployment baseline.

**Expected files:** `src/config/portals.ts`, `src/app/globals.css`, locale layouts, Career/Automation/IoT roots, shared form/UI primitives, OG assets.

**Changes:**

- Align live Vercel project/branch/domain with the intended SHA.
- Define canonical NexaLearn/Darhous labels.
- Remove hard-coded RTL and add complete English portal copy.
- Replace structural emoji with a typed SVG icon registry.
- Add Cloud to the registry or remove it from public discovery.
- Add semantic status/border/elevation/form tokens.

**Priority:** Critical
**Risk:** Medium

**Acceptance:**

- Live and local brand/hero/metadata match.
- English portal roots are LTR English.
- No portal registry emoji.
- Cloud discovery decision is consistent.
- 375/768/1024/1440 smoke screenshots pass.

**Commands:** `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`.

**Output:** implementation report, screenshot matrix, deployed preview URL.

## Phase 2 Landing Page Upgrade

**Goal:** create one clear conversion path and one signature visual interaction.

**Expected files:** landing sections, homepage client, stats/trust components.

**Changes:**

- Distinguish primary/secondary CTA outcomes.
- Reorder sections to Hero → Proof → Portals → Path → Mentor → Outcomes → CTA.
- Keep either sticky portal stack or ecosystem map, not both.
- Remove one marquee and demote/remove 3D carousel.
- Replace pressure CTA copy.
- Add verified trust signals.

**Priority:** High
**Risk:** Medium

**Acceptance:** one primary CTA; no duplicated portal visualization; no more than two continuous animations in a viewport; all links resolve.

**Commands:** typecheck, lint, build, responsive screenshot test, reduced-motion test.

**Output:** landing before/after captures and CTA route map.

## Phase 3 Portal Experience Upgrade

**Goal:** make each portal distinctive while preserving one platform system.

**Expected files:** portal roots, `PortalPageWrapper`, shared PortalHero/Stats/Grid primitives.

**Changes:**

- Introduce reusable portal anatomy.
- Pilot AI Academy and Language, then Career/Automation/Cloud/IoT/Exams.
- Limit each portal to one motif and one signature interaction.
- Add local navigation and consistent breadcrumbs.
- Remove repeated integration and stats blocks.

**Priority:** High
**Risk:** Medium-High

**Acceptance:** shared shell, unique accent/motif, locale parity, consistent CTA hierarchy, no emoji.

**Commands:** typecheck, lint, build, route crawl, portal screenshot matrix.

**Output:** portal comparison sheet and component migration log.

## Phase 4 Mobile + RTL/LTR Polish

**Goal:** close touch, overflow, direction, and tablet gaps.

**Expected files:** navbar/footer, auth controls, portal layouts, responsive utilities.

**Changes:**

- Enforce 44px targets and 8px gaps.
- Add safe-area support.
- Collapse footer groups.
- Verify logical spacing and directional icons.
- Add mixed-language `bdi`/LTR rules.
- Disable heavy atmospheres on small screens.

**Priority:** Critical
**Risk:** Medium

**Acceptance:** no overflow at 375/390/393/768/1024; locale switch preserves route and direction; no overlapping fixed controls.

**Commands:** build plus automated viewport captures and keyboard/touch QA.

**Output:** mobile/RTL acceptance report.

## Phase 5 Motion & Interaction Polish

**Goal:** make motion intentional and performance-safe.

**Expected files:** global CSS, motion presets, landing/portal interactive components.

**Changes:**

- Centralize motion variants.
- Remove infinite decorative pulses/ripples.
- Replace card scale with color/elevation.
- Ensure reduced-motion static parity.
- Keep interactions at 150–300ms.

**Priority:** Medium
**Risk:** Low-Medium

**Acceptance:** no layout-shifting hover; no continuous decoration in reduced motion; smooth mobile scroll.

**Commands:** typecheck, lint, build, reduced-motion browser audit, performance profile.

**Output:** motion inventory with keep/remove decisions.

## Phase 6 Production Polish

**Goal:** close trust, auth, state, SEO, and footer details.

**Expected files:** auth forms/pages, error/loading/not-found, footer, certificate verify, metadata/OG.

**Changes:**

- Add linked legal consent and announced errors.
- Localize loading/error/404 and preserve locale.
- Add route-family skeleton/empty states.
- Canonicalize certificate issuer.
- Unify OG and add portal variants.
- Replace raw images with `next/image`.

**Priority:** High
**Risk:** Medium

**Acceptance:** accessible auth flow, consistent trust identity, valid OG preview, helpful recovery actions.

**Commands:** typecheck, lint, build, metadata inspection, auth state QA.

**Output:** production-polish report and share-preview captures.

## Phase 7 Final QA & Launch Readiness

**Goal:** verify the intended product is what users receive.

**Expected files:** reports/tests only unless a launch blocker is found.

**Changes:** full route smoke test, authenticated journeys, screenshots, contrast, keyboard, mobile, reduced motion, deployment SHA verification.

**Priority:** Critical
**Risk:** Low

**Acceptance:**

- Typecheck/build pass.
- Lint has zero new warnings and an approved remaining budget.
- All Must Fix items are closed.
- Live SHA equals approved release SHA.
- Visual owner accepts Arabic/English target-width screenshots.

**Commands:** `npm run check`, route crawl, Lighthouse, Vercel deployment inspection, `git diff --check`.

**Output:** signed launch checklist, final score, tag, and release notes.
