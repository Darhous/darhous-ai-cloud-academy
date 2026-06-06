# Redesign Checkpoint — Phase 7 Complete

> **Latest tag:** `checkpoint/redesign-p7-certificates` · commit `c585e8a`
> **Phase 6 tag:** `checkpoint/redesign-p6-auth-admin` · commit `88f4281`
> **Phase 3 tag:** `checkpoint/redesign-p3-portal-identity` · commit TBD
> **Phase 2 tag:** `checkpoint/redesign-p2-landing` · commit `8c042ed`
> **Phase 1 tag:** `checkpoint/redesign-p1-foundation` · commit `c88404e`
> **Baseline tag:** `checkpoint/pre-redesign-plan` · commit `ad6bf0e`
> **Branch:** `main` · pushed to Vercel
> **Date:** 2026-06-06

---

## STATE AT THIS CHECKPOINT

| Item | Status |
|------|--------|
| Master plan | ✅ Written → [`MASTER_REDESIGN_PLAN.md`](./MASTER_REDESIGN_PLAN.md) |
| **Phase 1 — Foundation + a11y** | ✅ COMPLETE — `c88404e` |
| **Phase 2 — Landing redesign** | ✅ COMPLETE — `8c042ed` |
| HomepageClient split → 8 sections | ✅ `landing/sections/` directory with 8 files |
| `useReducedMotion` in all sections | ✅ All 8 Framer Motion components covered |
| OS mockup emoji → Lucide icons | ✅ 6 portal icons replaced |
| HowItWorks emoji → Lucide icons | ✅ 4 step icons replaced |
| WhyDarhous visual dissolution | ✅ 4-col dense grid → 2-col editorial list |
| Badge emoji → Lucide icons | ✅ Compass/Globe/Bot/Sparkles |
| Section gap reduced | ✅ 112px → 64–80px responsive |
| Content / architecture / APIs | ❌ **UNTOUCHED** |
| **Phase 3 — Portal identity** | ✅ **COMPLETE** — commit TBD |
| IoT Lab `data-portal` layout wrapper | ✅ Wrapped existing logic with `data-portal="iot-lab"` |
| CSS token expansion (faint + border) | ✅ `--portal-color-faint` + `--portal-color-border` added to all 7 portals |
| language/page.tsx — old #d0bcff → token | ✅ All rgba(208,188,255,...) replaced |
| ai-academy/page.tsx — tokens wired | ✅ Ambient orb, badge, bottom section |
| automation/page.tsx — tokens wired | ✅ Hero, stats bar, sectors, CTA |
| iot-lab/page.tsx — tokens wired | ✅ Orbs, hero, stats, CTA |
| career/page.tsx — old #f59e0b → token | ✅ All hero/stats/CTA updated |
| digital-exams/page.tsx — tokens wired | ✅ Ambient, badge, CTA card |
| **Phase 4a — Language client components** | ✅ **COMPLETE** — `1ea3f73` |
| **Phase 4b — Automation TemplatesClient** | ✅ **COMPLETE** — `1ea3f73` |
| **Phase 5a — Career client components** | ✅ **COMPLETE** — `1cc3319` |
| **Phase 5b — AI Academy course detail** | ✅ **COMPLETE** — `f713cfa` |
| **Phase 5c — Digital Exams clients** | ✅ **COMPLETE** — `b408e5e` |
| **Phase 5d — IoT Lab clients** | ✅ **COMPLETE** — `bb9789d` |
| **Phase 5e — Nano Banana client** | ✅ **COMPLETE** — `f647b3a` |
| **Phase 6 — Auth / Admin polish** | ✅ **COMPLETE** — `88f4281` |
| **Phase 7 — Certificates polish + privacy** | ✅ **COMPLETE** — `c585e8a` |

---

## WHAT WAS DONE IN PHASE 2

1. Split `HomepageClient.tsx` (940 lines) into 8 focused sections:
   - `sections/HeroSection.tsx` — hero + OS mockup (Lucide icons)
   - `sections/PathSelector.tsx` — self-contained path-selector state
   - `sections/EcosystemMap.tsx` — 3×3 ecosystem grid
   - `sections/PortalGrid.tsx` — all portals grid
   - `sections/HowItWorks.tsx` — 4 steps (Lucide icons)
   - `sections/MentorShowcase.tsx` — AI mentor chat preview
   - `sections/WhyDarhous.tsx` — dissolved feature list (Lucide icons)
   - `sections/FinalCTA.tsx` — final CTA section
2. `HomepageClient.tsx` is now 35 lines (thin orchestrator).
3. `useReducedMotion` from Framer Motion applied in every section:
   - y-axis motion removed when `prefers-reduced-motion` is active
   - stagger disabled, durations shortened to 150ms
   - typewriter speed set to 0 (instant reveal) for reduced-motion users
4. OS mockup colors updated to Phase 1 tokens: Language `#c084fc`, Career `#fbbf24`.
5. Typecheck ✓ · lint 0 errors ✓ · build exit 0 ✓.

---

## HOW TO ROLL BACK

**To Phase 1 state:** `git reset --hard checkpoint/redesign-p1-foundation`
**To baseline:** `git reset --hard checkpoint/pre-redesign-plan`

---

## WHAT WAS DONE IN PHASE 3

1. **IoT Lab layout** — wrapped existing English-warning banner logic with `<div data-portal="iot-lab">`. The banner itself now uses `var(--portal-color)` tokens too.
2. **CSS token expansion** — added `--portal-color-faint` (4% opacity) and `--portal-color-border` (15% opacity) to all 7 `[data-portal]` blocks in `globals.css`. Now 5 variants: color, subtle(8%), faint(4%), border(15%), glow(20%).
3. **language/page.tsx** — replaced all `rgba(208,188,255,...)` + hardcoded `#d0bcff` (old token) with `var(--portal-color)` family. Language portal now shows correct new `#c084fc` purple.
4. **ai-academy/page.tsx** — ambient orb, hero badge, bottom quick-links section now use portal tokens.
5. **automation/page.tsx** — hero badge, icon box, ambient orbs, stats bar, use-case sector cards, bottom CTA now use portal tokens. Per-section color differentiation in SECTIONS array preserved.
6. **iot-lab/page.tsx** — same pattern as automation. SECTIONS array individual section colors preserved.
7. **career/page.tsx** — replaced old `#f59e0b` (pre-token amber) with `var(--portal-color)` = new `#fbbf24`. Hero badge, stats bar, CTA updated.
8. **digital-exams/page.tsx** — ambient orb, header badge, CTA card border and icon updated.
9. **Navbar/Footer verified** — zero `portal-color` references. No color bleed between portals.

---

## HOW TO ROLL BACK

**To Phase 2 state:** `git reset --hard checkpoint/redesign-p2-landing`
**To Phase 1 state:** `git reset --hard checkpoint/redesign-p1-foundation`
**To baseline:** `git reset --hard checkpoint/pre-redesign-plan`

---

## WHAT WAS DONE IN PHASE 4

1. **LanguageAssessmentClient.tsx** — auth gate LogIn icon, intro card borders, progress bar fill, question card border, category badge bg/color, selected-option highlight, stage dots, finalizing spinner → `var(--portal-color)` family. Globe emoji in intro → `<Globe size={64}>` Lucide. CEFR scoring logic untouched.
2. **LanguageResultsClient.tsx** — loading spinner, skill bars Award/BookOpen/Calendar icons, strengths/weaknesses card, weekly plan card/button/rows → portal tokens. CEFR_COLOR map kept as-is (semantic level colors). Radar chart `stroke={cefrColor}` kept dynamic.
3. **LanguageHistoryClient.tsx** — spinner, latest-level banner, level badge, view link, TrendingUp icon, attempts list rows, level column, empty state → portal tokens. LineChart `stroke`/`dot fill` → `#c084fc` (actual hex; SVG presentation attrs don't resolve CSS vars). "Total Attempts" stat → `#c084fc` (template literal interpolation).
4. **TemplatesClient.tsx** — template card borders, filter button active state, workflow summary label, CTA link → portal tokens. ACCESS_COLORS, DIFF_COLORS, tool chips (AI Academy blue `#8ed5ff`) kept as semantic values.

---

## WHAT WAS DONE IN PHASE 5

1. **CVBuilderClient, CVAnalyzerClient, InterviewPrepClient, JobsClient** (Career `#fbbf24`) — card/panel borders, active tabs, CTA buttons, icons, ATS gauge ring → portal tokens. scoreColor thresholds + CTA gradient kept as semantic/brand values.
2. **courses/[slug]/page.tsx** (AI Academy `#8ed5ff`) — hero border, ambient orb, skills chips, CTA card border → portal tokens. No dedicated components folder; token wiring complete.
3. **DigitalExamsHistoryClient, DigitalExamsLibraryClient** (`#3ce0fb`) — spinners, nav links, chart card border, header icon, filter active state → portal tokens. Bar chart `fill` + stats-array color kept as hex (Recharts SVG attr + template literal). `sub?.color` data fallback kept.
4. **IotExamsClient, IotLessonsClient** (`#f97316`) — exam card borders, icon boxes, question numbering, selected option, result card, category filter, lesson card borders, read link → portal tokens. Submit gradient + score thresholds kept. `DIFF_COLOR` map (IotProjectsClient) untouched.
5. **NanaBananaClient** (`#f59e0b` + multi-color identity) — Enhancer section bg/border, Wand2 icon, badge, textarea border, result card, copy button, hero orb, hero badge, stats numbers, step badges, safety disclaimer, category filter active state → portal tokens. Hero multi-color gradient, "Gemini" branded text, Enhance/Admin CTA gradients, `item.accent` data-driven card colors all kept.

## WHAT WAS DONE IN PHASE 6

After full audit of all Phase 6 files (AdminDashboardClient, StudentDashboardClient, AICoachCard, all auth forms, all auth pages, ProfileSettingsClient, OnboardingClient, all mentor components, all AI Studio tool clients, PublicProfileClient):

**Finding:** All Phase 6 components were already well-tokenized with global design system vars (`var(--color-primary/secondary/tertiary/on-surface/...)`). No wrong portal hex colors found — admin tab correctly uses `var(--color-tertiary)`, auth forms use global tokens, profile/onboarding have zero hex, mentor uses global accent colors consistently, AI Studio tools use global primary/secondary/tertiary.

**What was changed (Phase 6a — auth atmospheric polish):**
- `login/page.tsx` — added blue+violet ambient radial-gradient orbs, `boxShadow` on card
- `register/page.tsx` — added violet+blue ambient orbs, `boxShadow` on card
- `forgot-password/page.tsx` — added cyan+blue ambient orbs, `boxShadow` on card
- `reset-password/page.tsx` — added blue+green ambient orbs, `boxShadow` on card
- Each page now has `relative overflow-hidden` outer + `relative z-10` on inner content

**What was changed (Phase 6b — admin mode indicator):**
- `AdminDashboardClient.tsx` — added red `ADMIN` badge (Shield icon + pill) to the admin studio header alongside the version label

**Kept unchanged (intentional):**
- Dashboard per-portal hub sections (Automation green, Career amber, IoT orange, etc.) — intentional multi-portal color differentiation in a hub, correct
- Semantic colors throughout (score thresholds: green/amber/red, Google OAuth blue, streak orange, certificate gold, completed green)
- Mentor components `rgba(142,213,255,...)` / `rgba(208,188,255,...)` — global primary/secondary, correct
- AI Studio tool active states — global primary/secondary/tertiary, correct

## WHAT WAS DONE IN PHASE 7

**Privacy fix (2 files):**
- `certificates/verify/[code]/page.tsx` — added `noarchive: true` to robots (was index:false,follow:false only)
- `[locale]/certificates/verify/[certId]/page.tsx` — added `noarchive: true` to robots

**Emoji → Lucide icon replacements:**
- `UnifiedVerifyClient.tsx` — logo strip `🎓` → `<GraduationCap size={28}>` (gold #d4af37)
- `CertificatesClient.tsx` — unauthenticated state `🎓` → `<GraduationCap size={56}>` (gold)
- `CertificatesClient.tsx` — empty state `🎓` → `<GraduationCap size={44}>` (gold)
- `CertificatesClient.tsx` — "Ready to claim" `🏆` → `<Trophy size={16}>` (green, semantic)
- `CertificatesClient.tsx` — cert code `🔐` → `<Lock size={10}>` (gold, inline flex)
- `CertificateVerifyClient.tsx` (legacy) — `🎓` → `<GraduationCap size={40}>` (gold #fbbf24)

**Atmospheric polish:**
- `CertificatesClient.tsx` — added ambient gold radial-gradient orb at top of authenticated view
- `CertificateVerifyClient.tsx` (legacy) — upgraded background from flat `#0a0f1e` to premium
  gold+violet radial-gradient (`#080d1f` base) + added logo strip (GraduationCap + "DARHOUS ACADEMY")

**Unchanged (correct):**
- All cert APIs, verification logic, QR/PDF generation, Supabase queries — untouched
- `handlePrint()` HTML template — untouched
- Gold (#fbbf24, #d4af37) and green (#4ade80) semantic colors kept as certificate brand colors
- Download, Share, Issue Certificate button logic — untouched

## NEXT STEP

➡️ **Phase 8** — QA, release readiness, GitHub release — per MASTER_REDESIGN_PLAN.md (await user GO/NO-GO)
