# Darhous AI Cloud Academy — Master Redesign Execution Plan
### "Digital Depth" Direction · Active Execution

> **Created:** 2026-06-06
> **Author:** Senior Creative Director + Design System Architect (UI/UX Pro Max)
> **Status:** 🟢 PHASE 2 COMPLETE — Phase 3 next
> **Branch:** `main` · commit `8c042ed`
> **Checkpoint tags:** `checkpoint/pre-redesign-plan` (baseline) · `checkpoint/redesign-p1-foundation` (Phase 1) · `checkpoint/redesign-p2-landing` (Phase 2)
> **Companion file:** [`CHECKPOINT.md`](./CHECKPOINT.md)
>
> **Phase 1 completed:** 2026-06-06 — tsc ✓ · lint 0 errors ✓ · build exit 0 ✓ · pushed to Vercel

---

## 0. موجز تنفيذي (Arabic Executive Summary)

ده **ملف الخطة الكاملة** للريديزاين — مش تنفيذ. اتعمل بعد مسح **كامل** للمشروع الحقيقي:
- **88 صفحة** (الاقتراح الأصلي ذكر ~17 بس — الفرق اتضاف هنا).
- **~100 مكوّن** عبر 33 مجلد.
- **اكتشاف معماري:** بوابة IoT بس عندها `layout.tsx` خاص؛ الباقي لأ.

**الاتجاه المعتمد:** Digital Depth (تطوّر مش ثورة).
**المبدأ الحاكم:** ممنوع لمس المحتوى/المعمارية/الـ APIs/Supabase/auth/الشهادات/المسارات. **تغييرات بصرية فقط.**

**اللي اكتشفناه وضفناه للخطة (مكانش موجود في الاقتراح):** صفحات `/cloud`, `/claude`, `/u/[username]`, `/onboarding`, `/learning-plans`, `/search`, `/glossary`, `/prompts`، كل صفحات AI Studio الـ9، الصفحات الفرعية العميقة لكل بوابة، نظام المرشد الكامل، الكاروسيلات، وUI primitives.

---

## 1. SCOPE REALITY CHECK (vs. original proposal)

| Metric | Original proposal assumed | Actual (verified) |
|--------|---------------------------|-------------------|
| Pages | ~17 page groups | **88 `page.tsx` files** |
| Portal layouts | Assumed each portal has a layout | **Only IoT Lab has `layout.tsx`** (6 portals need new wrapper layouts) |
| Components | ~15 named | **~100 across 33 dirs** |
| AI Studio tools | Mentioned generically | **9 distinct tool pages** |
| Onboarding | Audit said "none" | **`/onboarding` + `OnboardingClient.tsx` EXIST** |
| Public profile | Not mentioned | **`/u/[username]` public page EXISTS** |
| Cloud page | Not mentioned | **`/cloud` page EXISTS** |

**Conclusion:** Original proposal was directionally correct but under-scoped. This plan is the exhaustive version.

---

## 2. GUARDRAILS — WHAT MUST NEVER BE TOUCHED

These are hard constraints for **every** phase. Any change that risks these is out of scope and must be flagged, never silently done.

**Logic / data — DO NOT MODIFY:**
- All `src/app/api/**` route handlers (48 routes)
- All `supabase/*.sql` schema files
- Auth logic: `src/lib` auth, `hooks/useAuth`, session handling
- Certificate generation: `src/lib/certificates/CertificateTemplate.tsx` logic, `loadAssets.ts` (QR/font logic), `buildVerifyUrl()`, all `/api/certificates/**`
- QR verification logic, PDF generation (`@react-pdf/renderer`)
- AI layer: Gemini integration, `aiGuard` quota
- `src/config/portals.ts` **structure/keys/hrefs** (only `color`/`gradient` **values** may change, and only in Phase 1 with approval)
- All `src/data/**` content files (courses, lessons, tools, prompts, workflows, IoT data)
- Routes, links, sitemap (`sitemap.ts`), robots
- `src/messages/**` i18n keys (text content)

**Allowed to change (visual only):**
- `globals.css`, `tailwind.config.ts`
- Component JSX/styling (presentation), **not** their data fetching or props contracts
- New **additive** files (portal `layout.tsx` wrappers, new section components, new UI primitives)

**Golden rule:** If a redesign requires touching a guardrail item to look right, STOP and flag it as an open decision — do not proceed.

---

## 3. DESIGN DIRECTION (LOCKED)

**Direction A — "Digital Depth"** (selected over Arabic Modernism and Brutalist Educational).
- Dark, atmospheric, premium, purposeful.
- Each portal = a "planet" with its own surface color, accent, icon language, card style, motion vocabulary.
- Restrained glassmorphism (only navbar, dropdowns, modals, overlay cards).
- SVG-first iconography (Lucide) — **zero emoji as structural icons**.
- Typography-led hierarchy. Controlled, meaningful motion only.
- UI/UX Pro Max mapping: Liquid Glass style (restrained) + Enterprise Gateway pattern (adapted for EdTech).

---

## 4. DESIGN TOKENS (full target system)

### 4.1 Global ecosystem tokens (extend `globals.css`)
```
--darhous-bg:#0b0d11 --darhous-surface:#111318 --darhous-surface-raised:#181b22 --darhous-surface-overlay:#1f222a
--darhous-text-primary:#e8e9f0 --darhous-text-secondary:#9ba3b8 --darhous-text-muted:#5a6275
--darhous-accent-blue:#8ed5ff --darhous-accent-violet:#d0bcff --darhous-accent-cyan:#3ce0fb
--darhous-border:rgba(255,255,255,.06) --darhous-border-strong:rgba(255,255,255,.12)
--darhous-success:#4ade80 --darhous-warning:#fbbf24 --darhous-error:#f87171 --darhous-info:#60a5fa
```

### 4.2 Portal token layers (applied via `[data-portal="…"]` wrapper)
| Portal | surface | accent | pattern |
|--------|---------|--------|---------|
| ai-academy | #070d14 | #8ed5ff | blueprint-grid |
| language | #10071c | #c084fc (↑ from #d0bcff) | warm-noise |
| digital-exams | #030b0f | #3ce0fb | technical-grid |
| career | #0c0800 | #fbbf24 (↑ from #f59e0b) | warm-noise |
| automation | #030f06 | #4ade80 | circuit-trace |
| iot-lab | #0c0600 | #f97316 | pcb-trace |
| nano-banana | #100a20 | #f59e0b + #ec4899 + #06b6d4 | color-spill |

### 4.3 Scales
- **Spacing:** 4/8/12/16/20/24/32/40/48/64/80/96. Section gaps: 80 desktop / 48 tablet / 40 mobile (replace current `gap-28`/112px).
- **Radius:** sm6 md10 lg16 xl24 2xl32 full.
- **Shadow:** sm/md/lg/xl + per-portal `--portal-glow`.
- **Type scale:** display clamp(40,5vw,64)/800 · h1 clamp(32,4vw,48)/700 · h2 clamp(24,3vw,36)/600 · h3 20/600 · body-lg 18 · body 16 · sm 14 · label 12 · mono 13 · micro 11.

### 4.4 Typography
- Body Arabic: **IBM Plex Sans Arabic** (keep) · `body[dir=rtl]{line-height:1.7}`.
- Body English: IBM Plex Sans (keep).
- Display (NEW, approval needed): Arabic = Cairo/Tajawal ExtraBold for portal hero headings; English = Geist (already imported).
- Mono: JetBrains Mono / IBM Plex Mono for code (LTR-forced).
- Nano Banana display only: Cairo Black (Ar) / Righteous (En).

---

## 5. PHASED EXECUTION

> Each phase: separate commit + `checkpoint/*` tag. Validate `typecheck && lint && build` before commit. Live-deploy increment (per project workflow).

### Phase 0 — Direction & token approval (no code)
- Approve §3 direction, §4.2 portal colors (esp. Language #c084fc, Career #fbbf24), §4.4 display fonts, icon strategy (Lucide vs custom 7), landing section reorder.
- **Risk:** zero.

### Phase 1 — Global foundation + accessibility baseline ✅ COMPLETE (2026-06-06)
**commit:** `c88404e` · **tag:** `checkpoint/redesign-p1-foundation` · build ✓ · pushed to Vercel

**Done:**
- `globals.css`: Cairo display font added to Google Fonts import; `--font-display-ar/en` vars; `h1,h2` display typography rules; spacing scale `--space-1…--space-24`; motion tokens `--motion-fast/base/slow`; 7 portal identity token blocks (`[data-portal="x"]` attr selectors, Career `#fbbf24`, Language `#c084fc`); `body[dir=rtl]{line-height:1.7}`; `@media(prefers-reduced-motion:reduce)` block (WCAG 2.3.3 fix).
- `[locale]/layout.tsx`: skip-to-main-content link (`#main-content`, bilingual, SR-only until focused); orbs **3 → 1**; `id="main-content"` on `<main>`.
- `Navbar.tsx`: `aria-label` on `<nav>`; `aria-expanded` + `aria-haspopup` on Portals + AI Studio desktop dropdowns; `aria-expanded` on both mobile accordions.
- **6 new portal layout.tsx wrappers** (pulled forward from Phase 3 per user approval): `ai-academy`, `language`, `digital-exams`, `career`, `automation`, `nano-banana-prompts` — each is 7 lines, `data-portal` attr only, zero logic.

**Not done / deferred:**
- `tailwind.config.ts` token exposure → deferred; CSS custom properties cover all needs.
- `portals.ts` color value edits → not needed; new colors live in `[data-portal]` CSS tokens.
- IoT Lab layout `data-portal` attr → deferred to Phase 3 (it has logic, needs care).

### Phase 2 — Landing page redesign ✅ COMPLETE (2026-06-06)
**commit:** `8c042ed` · **tag:** `checkpoint/redesign-p2-landing` · build ✓ · pushed to Vercel

**Done:**
- Split `HomepageClient.tsx` (940 lines) into 8 section files in `components/landing/sections/`: `HeroSection`, `PathSelector` (self-contained state), `EcosystemMap`, `PortalGrid`, `HowItWorks`, `MentorShowcase`, `WhyDarhous`, `FinalCTA`. `HomepageClient` is now a 35-line thin orchestrator.
- `useReducedMotion` applied in all 8 sections — disables y-axis motion + stagger, shortens durations to 150ms when `prefers-reduced-motion` is active. Framer Motion variants now defined inside each component (hook-safe pattern).
- OS mockup: 6 emoji icons → Lucide (Bot/Globe/Monitor/Briefcase/Settings2/Cpu); portal colors updated to Phase 1 token values (#c084fc Language, #fbbf24 Career).
- HowItWorks: 4 step emoji icons → Lucide (Target/Bot/BookOpen/Trophy).
- WhyDarhous: dissolved 8-card 4-col dense grid → 2-col editorial list with Lucide icons; all text/content preserved.
- Badge labels: emoji → Lucide (Compass/Globe/Bot/Sparkles).
- Section gap: `gap-28` (112px) → `gap-16 md:gap-20` (64–80px per design-token plan).

**Not done / deferred:**
- `SocialProofBar` label (Stats component is already separate) → no change needed.
- `CertificateGallery` section does not exist in current homepage → deferred to Phase 7.

### Phase 3 — Portal identity system (the highest-impact change)
**Goal:** each portal gets its surface/atmosphere via `[data-portal]`.
- ✅ 7 portal token blocks in `globals.css` — done in Phase 1.
- ✅ 6 new additive `layout.tsx` wrappers — done in Phase 1.
- **Remaining:** IoT Lab: edit existing `iot-lab/layout.tsx` to add `data-portal="iot-lab"` wrapper.
- Apply `var(--portal-color)` to portal-specific components (cards, headers, CTAs, hero accents) — this is the main Phase 3 task.
- Verify global Navbar/Footer still use global tokens (no bleed) — test one portal in isolation first.
- **Touch:** iot-lab/layout.tsx (minor edit); portal page/section components (visual props only).
- **Never:** page logic, data.
- **Risk:** Low (additive). **Rollback:** delete new layouts + revert css block.
- **Tag:** `checkpoint/redesign-p3-portal-identity`.

### Phase 4 — Pilot portals (Language + Automation)
**Goal:** full identity proof-of-concept on 2 highest-readiness portals.
- Language: warm violet-black, editorial type, warm hero, history strips, SVG icons, content-card system. Files: `language/page.tsx`(visual), `LanguageAssessmentClient`, `LanguageResultsClient`, `LanguageHistoryClient` (presentation only — assessment logic untouched).
- Automation: two/three-panel layout, monospace, workflow hero, recipe cards w/ diagram, safety badge prominence. Files: `automation/page.tsx` + subpages (visual), `ToolsExplorerClient`, `TemplatesClient`, `WorkflowMapClient`, `LabDetailClient`, `AutomationAgentClient`, `SafetyBadge`, `JsonViewer` (presentation; **safety/JSON logic untouched**).
- **Risk:** Medium. **Tag:** `checkpoint/redesign-p4a-language`, `…-p4b-automation`.

### Phase 5 — Remaining portals
Order: **Career → AI Academy → Digital Exams → IoT Lab → Nano Banana.**
- Career (Launchpad): ATS gauge, dimension bars, upload hero. Files: `career/*` pages + `CVAnalyzerClient`, `CVBuilderClient`, `InterviewPrepClient`, `JobsClient`, `cards/*` (visual).
- AI Academy (Neural Command Center): sidebar catalog, focus lesson mode, neural hero. Files: `ai-academy/page.tsx`, `courses/*` pages, `courses/CourseCard`, `lesson/*` (visual).
- Digital Exams (Verification Chamber): subject tiles, exam focus mode, blueprint grid. Files: `digital-exams/*` pages + `DigitalExamClient`, `MixedExamClient`, `DigitalExamsHistoryClient`, `DigitalExamsLibraryClient` (**exam engine untouched**).
- IoT Lab (Maker Space): PCB illustrations, code syntax highlighting, difficulty-bordered cards. Files: `iot-lab/*` pages + `Iot*Client` ×4 (simulator content untouched).
- Nano Banana (Creative Playground): gallery hero, category-reactive bg, style cards, copy UX. Files: `nano-banana-prompts/page.tsx` + `NanaBananaClient`, `NanoBananaVisualPreview` (prompt data untouched).
- **Risk:** Low–Medium per portal. One commit + tag each.

### Phase 6 — Dashboards / Admin / Auth / Profile / AI Studio
- Student dashboard: portal-color-coded sections, cert cards w/ mini-preview, progress rings. Files: `dashboard/StudentDashboardClient`, `dashboard/AICoachCard` (UI only).
- Admin: cleaner tables, styled charts, admin-mode indicator. File: `admin/AdminDashboardClient` (UI only; **issuance/preview logic untouched**).
- Auth: dedicated `AuthLayout` (no full navbar), social-proof panel. Files: `login/register/forgot-password/reset-password` pages + `auth/*` forms (UI; **auth logic untouched**).
- Profile + public profile: `profile/page`, `ProfileSettingsClient`, `u/[username]/page` (visual).
- AI Studio hub + 9 tools: consistent tool-card treatment. Files: `mentor` (8 components), `prompt-studio`, `prompt-score`, `prompt-battle`, `claude-code-generator`, `compare-tools`, `tool-recommender`, `roadmap-generator`, `project-generator` (UI only; **Gemini/aiGuard untouched**).
- Onboarding: enhance `OnboardingClient` (don't rebuild flow).
- **Risk:** Medium. Commit + tag per area.

### Phase 7 — Certificate / verify style-only polish + privacy fix
- `UnifiedVerifyClient.tsx`: premium "verified document" treatment.
- `CertificatesClient.tsx`: consistent visual language.
- `certificates/verify/[code]/page.tsx`: **fix `robots:{index:false}`** (privacy risk from cert audit) + `noarchive`.
- **Never:** all cert APIs, verification logic, QR/PDF, Supabase.
- **Risk:** Low. **Tag:** `checkpoint/redesign-p7-certificates`.

### Phase 8 — QA, release readiness, GitHub release
- Full regression + a11y + mobile-device + RTL pass (see §8 protocol).
- `typecheck`=0, `lint`→reduce from 73 warnings, `build`=exit0.
- GitHub release `v14.0-design-system` with notes.

---

## 6. COMPLETE PAGE INVENTORY (all 88 — none omitted)

> P = priority (P0 highest). R = risk. All = visual-only unless noted.

### Global / marketing
| Page | Phase | P | R |
|------|-------|---|---|
| `/` root redirect, `[locale]/page` (landing) | 2 | P0 | M |
| `[locale]/about` | 6 | P4 | L |
| `[locale]/contact` (+`ContactForm`,`ContactSuccessModal`) | 6 | P4 | L |
| `[locale]/coming-soon` (→ roadmap) | 6 | P4 | L |
| `[locale]/privacy`, `[locale]/terms` | 6 | P4 | L |
| `[locale]/search` | 6 | P3 | L |
| `[locale]/glossary` (+`GlossaryCard`) | 6 | P3 | L |
| `[locale]/cloud` ⚠️ newly found | 5 | P3 | L |
| `[locale]/claude` ⚠️ newly found | 6 | P3 | L |
| `[locale]/paths`, `[locale]/learning-plans` ⚠️ | 6 | P3 | L |
| `[locale]/blog`, `blog/[slug]` (+`BlogCard`,`MdxContent`) | 6 | P4 | L |
| `[locale]/projects`, `projects/[slug]`, `projects/[slug]/build` | 5 | P3 | L |
| `[locale]/prompts` (+`PromptCard`) | 6 | P3 | L |
| `[locale]/tools`, `tools/[slug]` (+`ToolCard`) | 5 | P3 | L |
| `u/[username]` public profile ⚠️ | 6 | P3 | L |
| `[locale]/onboarding` ⚠️ exists | 6 | P2 | L |

### AI Academy + courses
`ai-academy`, `courses`, `courses/[slug]`, `courses/[slug]/lessons/[lessonIndex]` — Phase 5, P2, R Low (lesson content untouched).

### Language
`language`, `language/assessment`, `language/history`, `language/results`, `language/verify/[certId]` — Phase 4, P2, R Low (assessment/cert logic untouched).

### Digital Exams
`digital-exams`, `/history`, `/library`, `/mixed`, `/[subject]` — Phase 5, P3, R Low (engine untouched).

### Career Hub
`career`, `/builder`, `/cv-analyzer`, `/interview`, `/jobs`, `/templates` — Phase 5, P2, R Low (CV API untouched).

### Automation Academy
`automation`, `/automation-agent`, `/labs`, `/labs/[labId]`, `/paths`, `/services`, `/templates`, `/templates/[slug]`, `/tools` — Phase 4, P2, R Low (safety/JSON untouched).

### IoT Lab (has own layout)
`iot-lab`, `/challenges`, `/challenges/[slug]`, `/component-library`, `/component-library/[slug]`, `/exams`, `/lessons`, `/lessons/[slug]`, `/paths`, `/paths/[slug]`, `/projects`, `/projects/[slug]`, `/simulator` — Phase 5, P3, R Low.

### Nano Banana
`nano-banana-prompts` — Phase 5, P4, R Low (prompt DB untouched).

### AI Studio tools (9)
`mentor`, `prompt-studio`, `prompt-score`, `prompt-battle`, `claude-code-generator`, `compare-tools`, `tool-recommender`, `roadmap-generator`, `project-generator` — Phase 6, P3, R Low (AI logic untouched).

### Account / system
`login`, `register`, `forgot-password`, `reset-password` — Phase 6, P2.
`dashboard` — Phase 6, P2. `admin` — Phase 6, P4. `profile` — Phase 6, P3.
`challenges`, `leaderboard` — Phase 6, P3.
`certificates`, `certificates/verify/[certId]`, root `certificates/verify/[code]` — Phase 7, P3.

---

## 7. COMPLETE COMPONENT INVENTORY (~100 — grouped)

| Group | Files | Action | Phase |
|-------|-------|--------|-------|
| **layout** | Navbar, Footer, ThemeToggle, LanguageToggle, SocialLinksBar, FeaturedShowcaseCarousel, Premium3DShowcaseCarousel | a11y+visual; **audit carousels for jank/reduced-motion** | 1,2,8 |
| **ui primitives** | Button, Badge, Breadcrumbs, CategoryFilter, CopyButton, SectionHeader, AnimateIn, AskThisPageButton, ScrollToTop | unify to token system (foundation for everything) | 1 |
| **cards** | CourseCard, BlogCard, ProjectCard, PromptCard, ToolCard, GlossaryCard | 3-variant card system | 2,5 |
| **ecosystem** | PortalCard, ComingSoonPortal | grid + dropdown variants, drop glass | 2,3 |
| **sections** | Hero, Stats, CTASection | landing building blocks | 2 |
| **landing** | HomepageClient | split into 8 components | 2 |
| **mentor** | MentorChat, MentorHero, MentorMessage, MentorModeSelector, MentorResponseActions, MentorSuggestionCards, MentorFloatingButton, ApiKeyMissingState | visual; **chat/Gemini logic untouched** | 6 |
| **dashboard** | StudentDashboardClient, AICoachCard | portal-color sections, rings | 6 |
| **admin** | AdminDashboardClient | tables/charts UI only | 6 |
| **auth** | LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm, OAuthButtons | AuthLayout, form UI | 6 |
| **language** | LanguageAssessmentClient, LanguageResultsClient, LanguageHistoryClient | Living Library; logic untouched | 4 |
| **automation** | ToolsExplorerClient, TemplatesClient, TemplateDetailClient, WorkflowMapClient, LabDetailClient, AutomationAgentClient, SafetyBadge, SaveRecipeButton, TestingChecklist, JsonViewer | Workshop Floor; safety/JSON logic untouched | 4 |
| **career** | CVAnalyzerClient, CVBuilderClient, InterviewPrepClient, JobsClient | Launchpad; CV API untouched | 5 |
| **exams** | DigitalExamClient, MixedExamClient, DigitalExamsHistoryClient, DigitalExamsLibraryClient | Verification Chamber; engine untouched | 5 |
| **iot** | IotLessonsClient, IotProjectsClient, IotChallengesClient, IotExamsClient | Maker Space; content untouched | 5 |
| **nano-banana** | NanaBananaClient, NanoBananaVisualPreview | Creative Playground; data untouched | 5 |
| **courses/lesson** | CourseCard, LessonProgressButton (×2) | Neural Command Center; progress logic untouched | 5 |
| **features** | CommandPalette, CommandPaletteProvider, FavoriteButton, MySpacePanel, QuizSection, SavedPromptsPanel | premium polish; logic untouched | 6 |
| **community/contact/profile/onboarding/quiz/roadmap/visual** | CommunitySignup, ContactForm, ContactSuccessModal, ProfileSettingsClient, OnboardingClient, QuizClient, RoadmapTimeline, RoadmapGeneratorClient, ClaudeCodeGeneratorClient, ToolRecommenderClient, PromptStudioClient, HeroDashboardPreview | visual; logic untouched | 5,6 |

---

## 8. VALIDATION & QA PROTOCOL (every phase)

**Automated:** `npm run typecheck` (0) · `npm run lint` (no new warnings) · `npm run build` (exit 0).

**Manual a11y:** tab order + visible focus · skip link works · reduced-motion disables all animation · all icon buttons have aria-label · contrast ≥4.5:1 on all surfaces.

**Manual RTL/Arabic:** ar + en both render · line-height 1.7 Arabic · logical props (`ps/pe`, `inset-inline-*`) not `pl/pr` · embedded LTR uses `.dir-ltr`.

**Manual responsive:** 375 · 390 · 768 · 1024 · 1440 + landscape.

**Critical regression (must still work after ANY phase):**
- Language PDF download · Exam PDF (80%+ pass / <80% reject) · QR verify existing cert · Admin issue + preview ×6 portals · Register→Dashboard redirect · Mentor chat response · Path selector recommendation.

---

## 9. ROLLBACK STRATEGY

- Every phase = its own commit + `checkpoint/*` tag → `git reset --hard <tag>` restores instantly.
- Phase 2 (landing) on feature branch; keep old `HomepageClient` until QA green.
- Phase 3 layouts are additive → delete files to revert.
- CSS-only phases → revert single file.
- Baseline: `checkpoint/pre-redesign-plan` (this plan's starting point).

---

## 10. OPEN DECISIONS NEEDING APPROVAL (before Phase 1)

1. Portal color shifts: Language #d0bcff→**#c084fc**, Career #f59e0b→**#fbbf24** — approve or keep?
2. Display fonts: add **Cairo/Tajawal** (Ar) + **Geist** (En) for hero headings — or keep IBM Plex everywhere?
3. Icons: **Lucide only**, or invest in **7 custom SVG portal icons**?
4. Landing: OK to **dissolve "Why Darhous" 8-card grid** into woven copy?
5. Portal identity via **new `data-portal` layout wrappers** (6 new files) — approved approach?
6. Reduce **3 fixed orbs → 1** in `[locale]/layout.tsx` — approved?

---

## 11. EXECUTION ORDER SUMMARY

```
P0 approve → P1 foundation+a11y → P2 landing → P3 portal-identity
→ P4 pilot(Language,Automation) → P5 remaining 5 portals
→ P6 dashboard/admin/auth/profile/AIstudio/onboarding
→ P7 certificates polish + privacy fix → P8 QA + release v14.0
```

**First safe step:** Phase 1, sub-step "a11y + reduced-motion + skip-link + Arabic line-height" (zero visual regression, fixes 4 WCAG failures).

---

*Plan is complete and exhaustive against the verified repository. No application code, content, architecture, routes, APIs, Supabase, auth, or certificate logic has been modified to produce this plan. Awaiting GO/NO-GO.*
