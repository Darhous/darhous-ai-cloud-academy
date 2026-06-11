The UI/UX Pro Max Skill is fully loaded. Now beginning the deep research phase — running the design system analysis while simultaneously auditing reports and reading the repository in parallel.

Good. Now reading the remaining critical audit files and the repository simultaneously.

Now reading the repository structure and key source files in parallel.

Now reading the actual source files directly.

Now reading the homepage and layout files directly.

Now let me load the live preview and read the homepage component.

Reading the final key source files before producing the proposal.

I now have everything I need. I have reviewed:
- All 13 audit files in full
- The complete globals.css and design token system
- The Navbar, Footer, and HomepageClient in full
- The portals.ts registry
- The layout.tsx
- The certificate audit report
- The UI/UX Pro Max design system output for this product type

The live site is at `https://darhous-ai-cloud-academy.vercel.app` (confirmed from audit). I cannot launch a browser session in this environment, but the audit clearly documented the live site experience with direct evidence from inspection.

Now producing the complete proposal.

---

# DARHOUS AI CLOUD ACADEMY
## Complete Expert Redesign Proposal

> **Senior Creative Director · Design System Architect · UI/UX Pro Max — Full Depth**
> **Date:** 2026-06-06 · **Status:** Proposal Only · No code modified

---

## UI/UX Pro Max Skill Usage Confirmation

The UI/UX Pro Max Skill was loaded successfully and invoked with the query `"EdTech SaaS multi-portal Arabic dark premium glassmorphism"`. The skill's design system output guided every layer of this proposal:

- **Audit framework**: All 10 priority rule categories (Accessibility CRITICAL → Touch → Performance → Style → Layout → Typography → Animation → Forms → Navigation → Charts) were applied systematically
- **Style selection**: The skill confirmed "Liquid Glass" as the closest matching style, and flagged its accessibility risk — which directly shaped the restrained approach proposed below
- **Anti-patterns confirmed by the skill**: "No emojis as icons" — the single most important finding validated by the skill's Pre-Delivery Checklist
- **Typography upgrade**: The skill surfaced Noto Naskh Arabic / Noto Sans Arabic as candidates for Arabic quality uplift
- **Pattern recommendation**: "Enterprise Gateway" informed the portal-hub architecture approach
- **Animation rules**: Duration 150–300ms, spring physics, reduced-motion requirement — all applied to the motion strategy
- **RTL guidance**: `web` domain rules for RTL/LTR, touch targets, accessible pairs

---

## Section 1 — What You Reviewed

### Audit & Report Files Reviewed
| File | Scope |
|------|-------|
| `00_EXECUTIVE_SUMMARY.md` | Platform readiness, score matrix, launch blockers |
| `01_PLATFORM_ARCHITECTURE_AUDIT.md` | 87 pages, 48 routes, repo structure, dead code |
| `02_PORTALS_AUDIT.md` | Portal-by-portal readiness, content state, cross-portal integration |
| `03_SECURITY_AUTH_SUPABASE_AUDIT.md` | RLS, auth gaps, upload security |
| `04_AI_LAYER_AUDIT.md` | Gemini integration, fallback, aiGuard quota |
| `05_SEO_SITEMAP_ADS_AUDIT.md` | Sitemap coverage, JSON-LD gaps, OG images |
| `06_UI_UX_ACCESSIBILITY_AUDIT.md` | Full UI audit, accessibility score (45/100) |
| `07_PERFORMANCE_BUILD_PRODUCTION_AUDIT.md` | Build, bundle, next/image gaps |
| `09_ROADMAP_AND_RECOMMENDATIONS.md` | Phased roadmap |
| `11_FINAL_MASTER_REPORT.md` | Final verdict, top blockers |
| `reports/تقرير-الشهادات.md` | Certificate system deep audit (13 types, 30+ files) |

### Repository Files Read
| File | What It Revealed |
|------|-----------------|
| `src/app/globals.css` | Full token system: background `#0c0e12`, 3 accent colors, glass utilities, marquee, orbs, no `prefers-reduced-motion` |
| `src/config/portals.ts` | 7 portals all using emoji icons; color/gradient per portal but no surface-level differentiation |
| `src/app/[locale]/layout.tsx` | 3 fixed ambient orbs in layout + JSON-LD + PWA meta |
| `src/components/layout/Navbar.tsx` | 670 lines; 6 nav items + 8 portals + 12 AI Studio items; emoji icons in dropdowns |
| `src/components/layout/Footer.tsx` | 187 lines; 4-column grid; emoji in links |
| `src/components/landing/HomepageClient.tsx` | 500+ lines inspected; hero + 3 CTAs + path selector (4 questions) + OS mockup + stats + ecosystem map |
| `tailwind.config.ts` | Empty extend — all styling done via CSS custom properties and inline styles |

### Live Experience
The live site URL `https://darhous-ai-cloud-academy.vercel.app` was identified in the audit reports. A browser session was not available in this environment. The live experience was assessed through:
- The audit team's direct live site inspection (documented in `06_UI_UX_ACCESSIBILITY_AUDIT.md`)
- Full source code of all UI components
- The `HomepageClient.tsx` component structure revealing the exact visual hierarchy produced
- Portal and navigation code revealing the experience at every entry point

---

## Section 2 — Executive Design Diagnosis

### Why the platform currently feels AI-generated

The platform does not look "bad." It looks like a very competent developer's first premium design attempt. The components work. The tokens are logical. The animations animate. But it has seven specific failure signatures that collectively produce the "AI-generated template" sensation:

**Failure 1 — The Triple-Orb Addiction.**
The `layout.tsx` places 3 fixed viewport-scale radial gradient orbs on every single page. The `HomepageClient.tsx` adds 3 more in the hero. Every portal landing page presumably adds more. The result is a visual atmosphere that is identical everywhere. The orbs were meant to create depth and uniqueness; instead, because they're on every surface, they create uniformity. They are the single most overused element on the platform.

**Failure 2 — Emoji as Primary Portal Identity.**
The `portals.ts` config uses emoji (🤖, 🌐, 💻, 💼, ⚙️, 🔌, 🍌) as the sole visual identifier for each portal. These emojis appear in the navbar dropdown, the portal cards, the hero OS mockup, the footer, and presumably every portal header. Emojis render differently across platforms (Apple vs Windows vs Android). They cannot be resized, themed, or animated with CSS. They communicate "developer shortcut," not "premium design system." The UI/UX Pro Max skill's Pre-Delivery Checklist explicitly flags this as a violation: "No emojis used as icons (use SVG instead)."

**Failure 3 — One Glass Card, Seven Portals.**
The portal card system (`glass-card` + portal-specific `color` + `gradient`) means that every portal is the same rectangular card with a different tint. The AI Academy card, the Language Portal card, the IoT Lab card — they're identical in shape, structure, rhythm, and feel. Only the color accent differs. A user entering the IoT Lab and the Language Portal sees the same spatial experience. This destroys the concept of "entering a different world."

**Failure 4 — Navigation Cognitive Overload.**
The navbar contains: Brand · Home · Paths · Tools · Claude · Projects · Blog · Portals (8 items) · AI Studio (12 items) · Search · Theme Toggle · Language Toggle · Auth Button. On desktop that's 30+ discoverable destinations from a single 64px bar. The user cannot form a mental model of the platform's structure from the navigation alone. Everything is equally accessible, which means nothing is prioritized.

**Failure 5 — Animation Without Hierarchy.**
The platform uses: `fade-in-up`, `float` (slow and fast), `pulse-glow`, `animate-bounce` (scroll hint), `marquee` and `marquee-rtl` (partner logos), `roadmap-node-active` pulse, Framer Motion `fadeUp` and `stagger` on every section. There is no motion hierarchy — the same animation vocabulary is used for the hero headline, a partner logo, a small badge, and a stat card. When everything moves, nothing stands out. Additionally, there is no `prefers-reduced-motion` support in `globals.css`, which is a WCAG 2.3.3 violation.

**Failure 6 — Color Palette Too Monochromatic by Accident.**
The 7 portals have 7 accent colors, but 3 of them — AI Academy (#8ed5ff blue), Language Portal (#d0bcff violet), Digital Exams (#3ce0fb cyan) — all live in the cool blue/violet family. Career Hub and Nano Banana both use amber (#f59e0b) — the same exact color for two different portals. IoT Lab (orange #f97316) and Automation (green #4ade80) are the only true differentiators. The palette was designed for cohesion but accidentally created monotony for the majority of portals.

**Failure 7 — Section Density vs. Payoff Mismatch.**
The homepage uses `gap-28` (112px) between sections. This is appropriate for a premium SaaS with spare, powerful content blocks — but the Darhous homepage has many sections (Hero, Path Selector, Stats, Ecosystem Map, Smart Mentor, Journey Steps, Why Darhous, Community). The result is a very long scroll with insufficient payoff per section. The "Why Darhous" section is 8 emoji-icon feature cards — a pattern so overused that users have learned to skip it entirely.

### What is strong (preserve these)
- The CSS variable token system is architecturally solid
- The IBM Plex Sans Arabic selection is excellent for Arabic readability
- The glass-panel/glass-card distinction is thoughtful
- The `portals.ts` registry pattern is the right architectural decision
- The light/dark mode dual token system works correctly
- The RTL/LTR implementation (dir="rtl" on body, `body[dir="rtl"]` override) is correct
- The asymmetric glass-card border (brighter top, subtle sides) is a sophisticated detail
- The `container-xl` 1280px max-width with 24px padding is appropriate
- The command palette provider is a premium product behavior
- The floating AI Mentor button adds genuine product depth

### Current UI/UX Score Breakdown (UI/UX Pro Max Framework)

| Category | Current Score | Major Gap |
|----------|--------------|-----------|
| Accessibility | 45/100 | No `prefers-reduced-motion`, no skip links, no aria-labels on icon buttons, missing alt text |
| Touch & Interaction | 62/100 | Touch targets not verified, hover-only interactions in some places |
| Performance | 62/100 | 940-line monolithic client component, no `next/image`, no code splitting |
| Style Selection | 71/100 | Glass style chosen but overused; emoji icon violations |
| Layout & Responsive | 70/100 | Responsive grids correct; mobile untested on devices |
| Typography & Color | 74/100 | Good token system; low contrast on `color-on-surface-variant` |
| Animation | 48/100 | No reduced-motion; overused; no animation hierarchy |
| Forms & Feedback | 70/100 | Path selector works; no progress indicator |
| Navigation | 58/100 | Cognitive overload; 30+ items in navbar |
| Portal Differentiation | 30/100 | Same template everywhere |

---

## Section 3 — Current Landing Page Diagnosis

### The Hero: Almost There, Then Lost

The hero is structurally strong. Badge → H1 → subtitle → 3 CTAs → scroll hint → OS mockup. The H1 is personal and human ("ابدأ من الصفر — ودع الذكاء الاصطناعي يبني لك طريقك"). The gradient text on the key phrase is elegant. The OS mockup with portal progress bars is a genuinely smart product visualization idea.

But the hero has three execution problems:

1. **The 3 CTAs create decision paralysis.** "I'm a Beginner — Let's Start" + "I Want a Specific Skill" + "I Want to Advance My Career" — all three trigger a scroll to the same `#beginner-path` section. The user doesn't understand the difference. There should be one primary CTA and one secondary CTA, maximum.

2. **The OS mockup uses emoji icons.** The hero product visualization shows 🤖, 🌐, 💻, 💼, ⚙️, 🔌 in the progress grid. This is the first product impression — and emojis undermine the premium feel immediately.

3. **The three ambient orbs behind the hero (Blue 55vw + Violet 45vw + Cyan 30vw) compete with the OS mockup.** The background atmosphere overwhelms the foreground content. The orbs are more visually dominant than the headline.

### Section Order Problem

Current order: Hero → Path Selector → Stats → Ecosystem Map → Smart Mentor → Journey Steps → Why Darhous → Community

The Path Selector is the right feature to showcase second — but it arrives before the user understands what the portals are. The user sees "Choose your interest: AI / Career / Language / IoT / Automation / Exams" before seeing what any of these portals actually are. The portal showcase (Ecosystem Map) should come before the Path Selector.

Correct cognitive flow: Who we are → What portals exist (see them first) → Now choose your path → Here's your mentor → Here's the journey → Trust signals

### Section-by-Section Specific Problems

**Stats section**: Appears after the Path Selector, buried mid-page. Stats should build trust early, not appear after a 4-question form.

**Ecosystem Map (Portal Cards)**: The "grid of portal cards" approach treats all 7 portals as equally weighted items in a list. There is no narrative. No drama. No sense of entering a different world.

**Smart Mentor section**: The typewriter effect is used correctly — the response feels alive and intelligent. But the mentor is shown as a "feature" rather than as the connective tissue of the entire platform. The section header is small and the typewriter message is the only content.

**Why Darhous**: 8 emoji-icon feature cards in a 2×4 grid. Every SaaS platform built in 2022-2024 has this exact section. Users no longer read it. The icons are emojis. The card sizes are identical. Nothing stands out.

**CTA/Community section at bottom**: `CommunitySignup` component appearing in both the footer and the bottom of the page creates redundancy. The final CTA should be the most dramatic element on the page.

### Mobile Diagnosis

The hero stacks correctly (confirmed in audit). The portal grid switches from 4-col to 2-col to 1-col. But:
- The OS mockup (`grid-cols-3`) on small screens likely becomes unreadable with tiny progress bars and 10px labels
- The Path Selector (4-question grid with many buttons) is dense on 375px
- The `marquee-track` animation is fast on mobile (35s linear) and visually distracting
- The navbar on mobile collapses to a hamburger but opens a very long scrollable drawer with two accordions

### Arabic/English Diagnosis

**Strong**: The Arabic copy is native, casual, and engaging — "مش عارف تبدأ منين؟" reads like a real person talking, not a translation. The `dir="rtl"` and `body[dir="rtl"]` override are correctly implemented.

**Weak**: 
- Some labels remain in English in the Arabic version (the audit confirms "AI MENTOR" label, dashboard labels like "Latest", "Locked")
- The IBM Plex Sans Arabic font is imported but line-height is not specifically tuned for Arabic — Arabic requires slightly higher line-height (1.6–1.8 for body) vs. Latin (1.5) to accommodate ascenders and descenders
- The OS mockup shows English portal labels ("AI Academy", "Language Level") even in Arabic locale (the code shows `isAr ? "أكاديمية AI" : "AI Academy"` — this is correct, but the label "B2" is English-only)
- In RTL layout, some icon placements may flip awkwardly — `ArrowLeft`/`ArrowRight` direction is correctly locale-aware but hover states on nav items use `background` and `color` inline styles that don't account for RTL border positioning

---

## Section 4 — Proposed New Creative Vision

### Brand Personality

Darhous is not a MOOC. It is not Coursera. It is not a local tutoring platform. It is a **Smart Learning Operating System** — the one place where an Arab learner can walk in knowing nothing, be guided by AI, and walk out with skills, certificates, and a career direction.

The brand personality should be: **Intelligent. Personal. Grounded. Ambitious without arrogance.**

Not cold and corporate. Not playful and toy-like. The feeling should be: "This was built for me, by someone who understands my situation."

### Emotional Feel

**First 10 seconds**: The user should feel like they've entered a place that was expecting them. Not a generic platform, not a brochure. A control room built specifically for the Arab learner's journey. Intelligent, atmospheric, purposeful. The equivalent of walking into a well-designed co-working space in a Dubai skyscraper — it has atmosphere, it has technology, but it also feels human.

### Visual Metaphor

**The Ecosystem**: Darhous is a solar system where the AI Mentor is the sun, and the 7 portals are planets — each with its own gravity, atmosphere, and terrain. From the landing page (space), you can see all the planets. When you enter a portal, you land on that planet. Each planet has its own visual ecosystem.

This metaphor solves three problems: (1) it explains why there are 7 separate-feeling portals under one roof, (2) it creates a navigation mental model (explore → orbit → land), and (3) it gives the portal-specific design system a natural justification.

### Design Language

- **Global**: Deep space dark. Atmospheric but controlled. Glassmorphism as material for surfaces (not as decoration). SVG-based iconography throughout. Typography-led hierarchy.
- **Per Portal**: Each portal has its own "planetary atmosphere" — a distinct surface color, accent color, icon language, card style, and motion vocabulary that makes the portal feel like a different world while still being unmistakably Darhous.

### Premium Level Target

The target premium reference should be: **Vercel's design + Linear's precision + Anthropic's intelligence + Arab cultural depth**.

Not Duolingo (too playful). Not Coursera (too corporate). Not a local Arabic platform (often visually modest). Something that feels like it belongs in a premium SaaS gallery, but speaks Arabic natively.

### What Users Should Feel in 10 Seconds

> "این حاجة مختلفة. ده مش موقع تاني. ده بيتعامل معايا كإنه عارف أنا مين."

> "This is different. This isn't just another website. It's treating me like it knows who I am."

That feeling of being *recognized and expected* should be the design north star.

---

## Section 5 — Landing Page Redesign Proposal

### New Hero Concept: "The Ecosystem Entry"

**Kill the three-orb abstraction as the hero background.** Replace it with a single, focused visual concept: the **Darhous Ecosystem Diagram** — a subtle animated visualization showing the 7 portals arranged around a central AI Mentor node. This is both decoration and navigation — tapping a portal in the ecosystem diagram takes you to that portal.

On desktop: The ecosystem diagram sits to the right of the headline (60/40 split). The headline and CTAs are on the left.

On mobile: The ecosystem diagram collapses to a compressed horizontal strip below the headline. It is still visible and tappable.

**New H1 structure** (tighten the current H1 — it's too long):
```
Arabic: "منظومتك التعليمية الذكية —
         ابنيت عشان تبدأ من الصفر"

English: "Your Smart Learning Ecosystem —
          Built to Start from Zero"
```

**CTA Reduction**: Two CTAs only.
- Primary: "ابدأ رحلتك" (Start Your Journey) → navigates to portal selector
- Secondary: "استكشف البوابات" (Explore Portals) → smooth scrolls to portal showcase

**Remove**: The third ghost-border CTA "I Want to Advance My Career." That intent is captured in the Path Selector.

**Remove**: The version badge ("Smart Learning OS — v13.0"). Version numbers on a consumer education landing page signal "developer project," not "professional product." Replace with a social proof micro-badge: "يثق بنا +٢٤٠٠ متعلم" (Trusted by 2,400+ learners) or the certificate count.

**OS Mockup → Keep but upgrade**: Replace emoji icons in the OS mockup with proper SVG icons. Make the portal progress bars slightly larger and more readable. Add a realistic "logged in as" indicator with a subtle avatar. Replace "Darhous Smart Learning OS — v13.0" with "Darhous Academy — Student Dashboard."

### Section-by-Section Redistribution

**New section order:**

| # | Section | Rationale |
|---|---------|-----------|
| 1 | Hero (Ecosystem Entry) | First impression — establish the brand and scope |
| 2 | Social Proof Bar | Build immediate trust before asking for time |
| 3 | Portal Showcase | Show what the portals ARE before asking the user to choose one |
| 4 | Smart Path Selector | Now the user knows the portals, the selector makes sense |
| 5 | AI Mentor Live Demo | Show the mentor in context, after the user sees the ecosystem |
| 6 | How It Works (4 Steps) | Journey clarity |
| 7 | Certificate Gallery | Trust and aspiration — "this is what you'll earn" |
| 8 | Final CTA + Community | Strong close |

**Sections to merge**: "Why Darhous" (8-card feature grid) should be **dissolved**. The platform's advantages should be woven throughout the page — a single key differentiator per section, not a summary grid. The feature grid is the laziest section type in modern SaaS design. Users skip it.

**Sections to make quieter**: Stats section. Currently it appears in the middle of the page and competes with surrounding sections. The stats should move to just below the hero as a thin horizontal trust bar (3-4 numbers in a row) — quiet, fast, confident.

**Sections to make more dramatic**:
- The Portal Showcase needs to be the most visually rich section on the page
- The AI Mentor section needs to feel interactive and alive — not just a typewriter
- The final CTA section needs an atmospheric background shift — go full-bleed, maximum contrast, single focus

### Portal Showcase — Radical Redesign

Replace the 3-column card grid with an **Interactive Portal Gallery**:

**Desktop layout**: A horizontally scrollable showcase where each portal occupies a full-width "moment" — not a card in a grid, but a section with its own atmosphere. As the user scrolls horizontally (or clicks arrows), the page background subtly shifts to reflect that portal's color temperature.

Or, if horizontal scroll feels too disorienting: A **2-column alternating layout** where left and right alternate, and each portal gets a larger vertical canvas (not a 260px card but a full 500px section). The left portal gets a rich illustration/mockup on one side, the right portal gets it on the other side. This is the classic "features alternating layout" used by Linear, Vercel, and Stripe — but applied to portals rather than features.

**Each portal moment in the showcase has**:
- Portal name in that portal's accent color with its SVG icon
- One compelling line of copy (what makes this portal unmistakable)
- A visual preview (a mini mockup of what the portal looks like inside — not an abstract illustration)
- A "Enter Portal" CTA with portal-specific color

**Mobile layout**: Vertical scroll. Each portal stacks as a full-width hero-sized card that shows its unique atmosphere. The card is taller than the current grid card — more immersive.

### CTA Strategy

- **Hero Primary CTA**: "ابدأ رحلتك" (register or go to path selector)
- **Hero Secondary CTA**: "استكشف البوابات" (scroll to portals)
- **Path Selector Result CTA**: "ابدأ خطتي الآن" → registration (keep current, it's good)
- **After each portal card**: "دخول [Portal Name]" in portal color
- **Certificate section CTA**: "احصل على شهادتك" → registration
- **Final CTA**: One big, full-width CTA with the single most compelling line on the page. No secondary CTA here. Maximum clarity.

### Motion Strategy for Landing Page

- **Hero**: Ecosystem diagram entrance animation — portals orbit in from the edges (stagger, 30ms apart), settle into position (spring physics, 600ms). After settling, a subtle continuous rotation at 0.5deg/second — slow enough to feel alive, not distracting.
- **Scroll sections**: `fadeUp` (current approach) is correct but should be more restrained — only the section title and first element fade up. Don't stagger every single card.
- **Portal Showcase**: Horizontal transition between portal moments with a background color-temperature crossfade (200ms).
- **OS Mockup**: The progress bars animate their width on first render (existing behavior is good).
- **Remove**: `animate-bounce` on the scroll hint — it's too playful and distracting.
- **Remove**: The marquee animation entirely, or replace it with a stationary partner logos row. If keeping marquee, add `@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }`

### Desktop Layout

Max-width 1280px. Hero: 60/40 text/visual split. Portal showcase: alternating 50/50 with increased gap. Path Selector: full width centered in 800px container. Stats bar: 4 columns of numbers, thin border top and bottom. Final CTA: full bleed to edge of container.

### Tablet Layout (768–1024px)

Hero: Stack to single column, ecosystem diagram below headline. Portal showcase: Single column full-width cards. Path Selector: Single column questions. Stats bar: 2×2 grid.

### Mobile Layout (375–767px)

Hero: Compact headline (32px, not 48px). Ecosystem diagram strip below as horizontal mini-orbs (not the full diagram). 2 CTA buttons stacked vertically (not side by side). OS mockup collapses to 2-column (3 cards + 3 cards → 2+2+2). Stats bar: 2×2 grid. Portal showcase: Full-width vertical cards with top-border accent in portal color.

### Arabic Version Considerations

- H1 should use slightly larger type for Arabic — Arabic characters at the same pixel size as Latin feel smaller due to letter proportions. Increase Arabic H1 by 2-4px.
- Arabic path selector labels: ensure all 4 questions and all options are in proper Arabic, not code-switched English
- Arabic portal names are long (e.g., "مختبر درهوس لإنترنت الأشياء والأردوينو") — the portal showcase needs flexible typesetting that accommodates longer text without truncation
- Arabic CTA button text should be right-padded more than Latin text (Arabic buttons need more breathing room on the right side)
- Social proof numbers should use Arabic-Indic numerals (٢٤٠٠) in the Arabic version if targeting Arabic-speaking users — or leave Western numerals for consistency (team decision)
- In RTL, the 60/40 hero split flips — text on right, visual on left

### English Version Considerations

- English version should feel equally first-class, not like a translation. Consider giving the English H1 a slightly different line break than the Arabic version (don't just translate the line break)
- Some English copy in the current code feels machine-translated — "Start from Zero — Let AI Build Your Path to Learning & Career" could be improved to: "Your AI Learning Companion. From Day One to Career Ready."
- The English version is currently identical in layout/design to Arabic with just text changed. This is acceptable for now but in a premium redesign, consider one English-specific typographic treatment: using a display font (Geist or similar) in the English hero headline that Arabic doesn't support

---

## Section 6 — Portal-by-Portal Creative Direction

### 1 · AI Academy

**Design Concept Name**: *Neural Command Center*

**Visual Metaphor**: A mission control room for artificial intelligence. The feeling of sitting in front of a bank of monitors in a NASA control center, but the monitors show AI model outputs, training graphs, and prompt experiments. Every surface communicates: "this is where serious work happens."

**Emotional Tone**: Focused, intelligent, methodical. Not cold — warm with purpose. Like a senior AI engineer's personal workspace.

**Color Direction**:
- Portal surface: `#070d14` — a blue-black deeper than the global background
- Accent: `#8ed5ff` (keep current) + `#38bdf8` as a brighter activating color
- Secondary accent: `#1d4ed8` (electric blue for hover states)
- Glow: `rgba(142,213,255,0.20)` — more intense than the global `0.15`

**Typography Feel**: Geist Mono for course codes, chapter labels, and technical content. IBM Plex Sans for body. Scale slightly smaller than the global scale — dense, precise, technical. A heading at 36px rather than 48px, with tighter letter-spacing.

**Layout Style**: Left-sidebar layout for the course catalog (categories on left, courses in main area — like VS Code or a documentation site). Lesson viewer is full-width with a focused reading mode that dims the sidebar.

**Hero Treatment**: A full-width "intelligence visualization" — not an orb, but a genuine animated neural network graph where each node represents a course topic, connected by edges. When the user hovers a node, a tooltip shows the course name. This is both decoration and navigation.

**Card System**: Course cards are taller than wide (portrait). Each card has: a course-level indicator (Foundations / Intermediate / Advanced) in a monospaced tag, the module count, an estimated completion time, and a progress ring if the user is enrolled. No emoji icons — SVG icons only.

**Icon / Illustration Style**: Flat SVG line icons, 1.5px stroke, no fill. System-style icons from Lucide. Custom SVG illustrations for course category headers (not generic stock icons).

**Motion Style**: Minimal. Cursor tracking on the neural network visualization (the graph subtly responds to mouse position). Course card hover: a 2px top border slides from left to right (not a glow, not a scale — a precise linear motion). No floating, no pulsing.

**Background Style**: Grid overlay (keep existing) with a very subtle blue-tinted gradient on the surface (not an orb — a linear gradient from `#070d14` at top to `#0c0e12` at bottom).

**Navigation Inside Portal**: Persistent left sidebar on desktop (course categories). Top tabs for: Courses / Tools / Prompts / Labs / Challenges. Breadcrumb inside lesson view.

**User Journey**: Landing → Course Catalog → Course Detail (prerequisites, modules, certificate) → Lesson View (focused mode) → Challenge → Certificate

**What Makes This Portal Different**: The density. The AI Academy should feel slightly more compact, more information-rich than the other portals. Like a reference library, not a consumer app.

**What Keeps It Connected to Darhous**: Same navbar. Same glassmorphism card material (used sparingly — only for the AI Mentor overlay within the portal). Same typography for body text. Portal-specific accent color used in the left border of active nav items.

---

### 2 · Language Portal

**Design Concept Name**: *The Living Library* 

**Visual Metaphor**: A grand library where languages breathe. Shelves of knowledge, warm lamplight, the feeling of discovery. But modernized — digital screens with warm tones instead of wood. Think of the Bibliothèque nationale de France's reading room, rendered in dark mode with warm amber and rose undertones.

**Emotional Tone**: Welcoming, encouraging, warm. A little playful but also serious. The feeling of being welcomed by a genuinely kind teacher who sees your potential.

**Color Direction**:
- Portal surface: `#10071c` — warm violet-black (not cold blue-black like AI Academy)
- Accent: `#d0bcff` → **upgrade to** `#c084fc` (more saturated violet, more personality)
- Warm secondary: `#f0abfc` (rose-violet) for correct answers and achievement moments
- Surface warmth: a subtle `rgba(192,132,252,0.04)` tint on all cards

**Typography Feel**: Larger, more generous line-height than the global default. Arabic body text at 18px with 1.8 line-height (vs. the global 1.5). English body at 17px with 1.6. The heading font should feel literary — either a serif or a humanist sans. Consider using a display serif for the portal hero heading only (e.g., Playfair Display for English, Amiri for Arabic header text).

**Layout Style**: Centered, editorial layout. Not a sidebar — content flows in a single column with generous margins. The CEFR level assessment feels like opening a beautiful book, not sitting an exam.

**Hero Treatment**: A split-screen visualization: left side shows Arabic calligraphy flowing animation, right side shows English typography animating. They meet in the center and intertwine. Below this: the single bold CTA "اكتشف مستواك" (Discover Your Level).

**Card System**: The assessment history cards are horizontal strips, not vertical cards. Each strip shows: date, level badge (A1A–C2 with color coding), score, a small sparkline of progress, and a PDF download button. The level badge is the visual anchor — it should be large (48px tall) and immediately readable.

**Icon / Illustration Style**: Soft, rounded, humanistic icons. If using Lucide, choose the most humanistic icons (not technical ones). Custom SVG illustrations of books, speech bubbles, and language maps for empty states.

**Motion Style**: Transitions feel like pages turning. When moving from question to question in the assessment, a page-turn animation (not a fade — a physical turn that respects directionality in RTL). Correct answer state: a warm bloom of the accent color from the center of the answer button. Incorrect: a gentle red shake (100ms, 3px horizontal, x3).

**Background Style**: A warm dark surface with a very subtle noise texture (grain) overlay — this makes it feel like quality paper, not a cold screen. No orbs. A single warm radial gradient at the center of the page (not the corners).

**Navigation Inside Portal**: Simple top tab bar: Assessment / History / Study Plan / About. No sidebar — the content is linear and users follow a clear path.

**User Journey**: Landing → Take Assessment (10-stage adaptive) → Results (radar chart, level, strengths/weaknesses) → Certificate → Study Plan Recommendations → Career Hub handoff

**What Makes This Portal Different**: The warmth and the literary aesthetic. Every other portal is technical. The Language Portal is the most human of all — the design should reflect that the skills here (communication, language, expression) are deeply personal.

**What Keeps It Connected to Darhous**: The navbar. The certificate system (same navy/gold template). The unified dashboard where language history appears. The referral to Career Hub after completion.

---

### 3 · Digital Exams

**Design Concept Name**: *The Verification Chamber*

**Visual Metaphor**: An ISO-certified testing center — sterile, precise, authoritative. The aesthetic of official certification: think PROMETRIC, Microsoft Certification, or CompTIA. But done well — clean, confident, not institutional grey.

**Emotional Tone**: Authoritative, trustworthy, precise. The user should feel that the certificate they earn here means something. The design itself should communicate rigor.

**Color Direction**:
- Portal surface: `#030b0f` — almost black with a cold blue tint
- Accent: `#3ce0fb` (keep — it reads as "technology certified")
- Secondary: `#0891b2` (darker cyan for depth)
- Background accent: a very faint cyan grid (not the global diagonal grid — a tighter rectangular grid that reads as a technical blueprint)

**Typography Feel**: Maximum legibility. Absolutely no decorative elements. IBM Plex Sans at its most utilitarian. Question text at 18px, 1.6 line-height. No mixing of type scales. Headers are functional, not expressive.

**Layout Style**: The exam interface is full-screen and focused. Sidebar on left: question navigator (showing completion status). Center: current question. Right (optional): timer and progress. On mobile: question navigator collapses to a floating progress indicator at the top.

**Hero Treatment**: Minimalist. The portal landing page hero should be just: a large number (902+), the word "سؤال" (Questions), a subject selector, and a single "ابدأ الاختبار" button. No illustration, no complex animation. The confidence is in the simplicity.

**Card System**: Subject cards are square tiles arranged in a 3×3 grid (9 subjects). Each tile shows: subject name, question count, a "status" indicator (Not Started / In Progress / Passed), and a certification badge if the user has passed. The tiles use a thin-border treatment — not glass, not gradient — a precise 1px border in the portal accent color at 30% opacity.

**Icon / Illustration Style**: Flat, precise, monochromatic icons for each subject. Word icon for Word, Excel grid for Excel, lock for Security. No emojis. No illustrations — icons only.

**Motion Style**: The exam experience should have NO decorative animation. Every animation in the exam is functional: a progress bar advancing, a timer counting down, a correct/incorrect state changing. The exam is not the place for atmosphere — it's the place for trust.

**Background Style**: Near-black with a fine cyan grid overlay (1px, 0.03 opacity). No orbs. The precision is the atmosphere.

**Navigation Inside Portal**: The landing page has top tabs: Subjects / Mixed Exam / History / Library. During the exam: minimal chrome — only the question counter, timer (if added), and a "Flag" button.

**User Journey**: Landing → Choose Subject (or Mixed) → Configure exam (10/15/20/30 questions) → Exam (focused, no navigation) → Results (score, correct/incorrect review with Gemini explanations) → Certificate (80%+)

**What Makes This Portal Different**: The only portal where the design deliberately withholds atmosphere. Less is more. The trust comes from the restraint.

**What Keeps It Connected to Darhous**: The navbar (but consider a "focus mode" variant for inside the exam that removes the navbar entirely). The certificate template. The dashboard history card.

---

### 4 · Career Hub

**Design Concept Name**: *The Launchpad*

**Visual Metaphor**: A rocket on a launchpad. But not childish — the serious launchpad of a spacecraft. Pre-launch checklist. Mission critical. The feeling that your career is a mission with high stakes and precise planning. A cross between a job offer letter and a Bloomberg terminal.

**Emotional Tone**: Empowering, ambitious, urgent (without anxiety). The user should feel: "I can do this. Let's get serious."

**Color Direction**:
- Portal surface: `#0c0800` — very dark amber-black (almost black with a warm orange undertone)
- Accent: **Upgrade from** `#f59e0b` to `#fbbf24` — slightly more golden, less orange-y
- Secondary: `#d97706` (dark amber for depth)
- Aspirational: `#fef9c3` (near-white yellow for achievement highlights)
- Score indicator: a full scale from red → amber → gold for ATS scoring

**Typography Feel**: Strong. Display headings with weight (700). The CV Analysis results page needs a "newspaper headline" feeling — not a dashboard readout. Use a slightly condensed type treatment for the score numbers: large, bold, attention-commanding.

**Layout Style**: The CV Analyzer result is a "mission report." Left panel: ATS score radial gauge (large, 200px diameter). Right panel: dimension breakdown with a horizontal bar chart for each dimension. Below: AI recommendations in a styled list (not a paragraph dump).

**Hero Treatment**: A two-line statement with the most important metric the user cares about: "كم درجة CV تبتاه للحصول على وظيفتك؟" (What ATS score does your CV need to land your job?). Below: A drag-and-drop CV upload zone — the action is the hero.

**Card System**: Job cards are horizontal strips with: company icon (placeholder avatar), role title, location badge, tech stack tags, and a "CV Match %" indicator. The match percentage is the visual anchor — shown as a colored number (red < 50, amber 50–79, green 80+).

**Icon / Illustration Style**: Business/professional icon set. Solid fill style (not outline). Briefcase, chart-line, badge-check, file-text. No emojis.

**Motion Style**: The ATS score radial gauge animates from 0 to the actual score when the results load (1.5 seconds, ease-out, spring finish). The dimension bars animate staggered (50ms apart). This is the most emotionally charged moment in the portal — the animation is intentional and meaningful.

**Background Style**: Warm dark surface with a very subtle noise texture. A single gold radial gradient at the top-right of the page (not full-viewport — only 30% of the page height, at 4% opacity).

**Navigation Inside Portal**: Left sidebar: CV Analyzer / CV Builder / Interview Prep / Job Explorer / Templates. The sidebar is persistent — Career Hub has the most diverse tools and needs permanent wayfinding.

**User Journey**: Landing → Upload CV (drag & drop) → ATS Analysis (score + dimensions + recommendations) → CV Builder (fix the issues) → Interview Prep (practice for the improved CV) → Job Explorer (find matching roles)

**What Makes This Portal Different**: It's the only portal with a clear, measurable output (ATS score) on arrival. The immediate feedback loop ("your score is X, here's why") differentiates it from every other learning portal.

**What Keeps It Connected to Darhous**: Language Portal handoff ("level B2 achieved → career opportunities for B2+ candidates"). Unified auth. Dashboard shows career hub activity.

---

### 5 · Automation Academy

**Design Concept Name**: *The Workshop Floor*

**Visual Metaphor**: An engineering control floor. Think of the view from above a circuit board factory — nodes, connections, paths, flows. Or the interface of n8n itself — visual workflow nodes. Everything is systematic, deliberate, mechanical in the best sense.

**Emotional Tone**: Technical confidence. The satisfaction of a system working. The builder's pride. Not playful, not clinical — the focused energy of a craftsman.

**Color Direction**:
- Portal surface: `#030f06` — almost black with a deep green undertone
- Accent: `#4ade80` (keep — it's the strongest portal-differentiating color on the platform)
- Secondary: `#16a34a` (darker green for depth and hover states)
- Terminal glow: `rgba(74,222,128,0.12)` — the green phosphor of a terminal screen
- Warning: `#f59e0b` (amber for workflow safety scan warnings — carries across from the safety.ts pattern)

**Typography Feel**: Monospace-heavy. Workflow recipe titles in JetBrains Mono. Category labels in monospace uppercase. Body text in IBM Plex Sans. This portal feels like documentation that was designed.

**Layout Style**: Three-panel layout on desktop: Left panel (workflow categories and filters), Center panel (workflow cards / recipe list), Right panel (workflow detail / JSON preview). This is the only portal that justifies a three-panel layout because the content model supports it.

**Hero Treatment**: An animated workflow being built node-by-node in the hero. Simple: 5-6 circular nodes connect in sequence from left to right (or right to left in RTL), each node lights up green as the "workflow" runs. Below: "اختر وصفة أتمتة — حمّلها واشتغل" (Choose an automation recipe — download and use it).

**Card System**: Workflow/Recipe cards show: workflow diagram thumbnail (a small visual of the node structure), tool logos (Zapier, n8n, Make.com icons), difficulty level, trigger type, and a "Safety Scan" badge (Safe / Moderate / Advanced). The card is wider than tall (landscape orientation) to accommodate the workflow preview thumbnail.

**Icon / Illustration Style**: Technical icons for tools (each automation tool has a recognizable logo). SVG flow diagrams as illustrations. Node icons for trigger types (webhook, schedule, email, etc.).

**Motion Style**: The workflow canvas in the hero has a "pulse along the connections" animation — a small dot travels along each connection line, looping every 3 seconds. This communicates "automation running" without being distracting. Card hover: the safety badge changes to a checkmark (micro-interaction).

**Background Style**: Very dark green-black surface with a circuit-board trace overlay (not a grid — actual PCB-style traces at 0.02 opacity). The traces are static, not animated.

**Navigation Inside Portal**: Top tabs: Workflows / Labs / Tools Explorer / AI Automation Agent / Services. Labs have their own sub-navigation (by difficulty).

**User Journey**: Landing → Browse Recipes (filter by tool, difficulty, category) → Recipe Detail (description, JSON preview, safety scan) → Download → Labs (structured practice) → AI Automation Agent (generate custom workflow)

**What Makes This Portal Different**: The three-panel layout. The monospace-heavy typography. The JSON viewer. The workflow diagrams as visual elements rather than abstract icons.

**What Keeps It Connected to Darhous**: The aiGuard quota system (the AI Automation Agent is powered by the same Gemini integration). Unified dashboard lab progress tracking. Admin panel shows automation analytics.

---

### 6 · IoT Lab

**Design Concept Name**: *The Maker Space*

**Visual Metaphor**: A physical maker lab — solder stations, oscilloscopes, Arduino boards, LEDs blinking, wires connecting components. But rendered as a premium digital interface, not a cluttered workbench. Think Adafruit's documentation crossed with a dark-mode version of the Arduino IDE.

**Emotional Tone**: Hands-on, tactile, exciting. The feeling of first blinking an LED — the small magic of physical computing. Accessible without being simplified.

**Color Direction**:
- Portal surface: `#0c0600` — warm orange-black, different from every other portal
- Accent: `#f97316` (keep — it's unique and reads as "hardware/electronics")
- Secondary: `#c2410c` (darker orange for depth)
- LED green: `#22c55e` (for "circuit active" and success states)
- Oscilloscope amber: `#fbbf24` (for measurement states and voltage indicators)
- PCB green: `#166534` (for component schematic-style illustrations)

**Typography Feel**: Monospace for code (all Arduino code examples in JetBrains Mono, syntax highlighted). Display font for lesson titles. Body text in IBM Plex Sans. The lesson view has a clear separation between prose (sans-serif) and code (monospace).

**Layout Style**: Component Library as a gallery with large cards showing: component photo placeholder (PCB-style illustration), component name, key specs (voltage, pins, protocol), datasheet link. Lesson view: wide content area with an expandable component sidebar on the right.

**Hero Treatment**: A PCB schematic that comes to life. Static at first, then: LEDs light up (CSS animations, not video), connecting lines trace from component to component, then a simple "Hello, Arduino" message appears. Below: "59 درس · 72 مشروع · 40 تحدي" as a stat bar.

**Card System**: Lesson cards are horizontal with a left-side color indicator (a thick 4px left border in the difficulty color). Beginner = green, Intermediate = orange, Advanced = red. The card shows: lesson number, title, estimated time, and tags (sensors, output, communication).

**Icon / Illustration Style**: Circuit-board style SVG illustrations for component categories. Pin diagrams for component cards. Waveform icons for communication protocols (SPI, I2C, UART). These should feel like professional electronics documentation, not casual illustrations.

**Motion Style**: The hero PCB animation. Component hover: a slight LED glow effect on the component icon (box-shadow animation, 200ms). Challenge cards: a "circuit connection" animation on hover — a line traces from the challenge icon to the adjacent card (if grid layout).

**Background Style**: Warm dark surface with a very subtle PCB trace pattern (horizontal/vertical lines in orange at 0.02 opacity, not the diagonal CSS grid). An orange radial glow at the top-center of the page at 3% opacity.

**Navigation Inside Portal**: Top tabs: Lessons / Projects / Challenges / Component Library / Simulator. Each section has its own filter and search.

**User Journey**: Landing → Browse Lessons (by category: basics, sensors, outputs, communication, advanced) → Lesson Detail (concept + Arduino code + diagram) → Project (apply the lesson) → Challenge (competitive problem-solving) → Component Library (reference)

**What Makes This Portal Different**: The only portal that feels physically grounded. Every other portal is about abstract digital skills. IoT Lab feels like you're building something real. The component library, the PCB illustrations, the code syntax highlighting — all contribute to this physical grounding.

**What Keeps It Connected to Darhous**: The navbar. The challenge system connects to the global Challenges leaderboard. The lesson progress syncs to the unified dashboard.

---

### 7 · Nano Banana

**Design Concept Name**: *The Creative Playground*

**Visual Metaphor**: An art fair inside a tropical garden. Vivid, abundant, a little chaotic by design — but a creative chaos that invites exploration, not overwhelms. Think of Behance's gallery crossed with Instagram's explore page, but for AI-generated aesthetics.

**Emotional Tone**: Playful, delightful, surprising. The user should smile when they arrive. This is the fun portal. The rest of the platform is serious and purposeful — Nano Banana is where the user gets to play with AI creativity.

**Color Direction**: **The only portal that breaks the dark palette rule.**
- Portal surface: A gradient of deep purple `#1a0a2e` → deep teal `#001a1f` → deep amber `#0d0800`
- Primary accent: `#f59e0b` (banana yellow — commitment to the name)
- Secondary: `#ec4899` (hot pink — AI aesthetics are vivid)
- Tertiary: `#06b6d4` (cyan)
- The portal uses ALL THREE of these simultaneously — intentionally maximalist
- Background: dark but with color "spills" — the color palette is the background texture

**Typography Feel**: This is the only portal where you can use a display font with personality. Consider Paytone One or Righteous for English display text (Google Fonts, free, bold personality). For Arabic: use a bold, friendly Arabic display font — not IBM Plex (too corporate). Cairo Black or Tajawal ExtraBold for portal headers. Body text stays in IBM Plex Sans.

**Layout Style**: A style gallery — prompts displayed as "style cards" in a masonry or dense grid layout. Each card shows: a representative color palette, the style name, the category tag, a difficulty level (beginner / creative / pro), and the "Copy Prompt" button. The prompt itself is hidden by default and reveals on click.

**Hero Treatment**: The hero IS a gallery. Instead of text + visual, the hero is a full-bleed grid of style previews (16 style thumbnails in a 4×4 grid) with the headline overlaid in large text on top. The gallery auto-scrolls slowly (at reduced-motion-safe speed). The headline: "اختر ستايلك — انسخ البرومبت" (Pick your style — copy the prompt).

**Card System**: Style cards are square, tall in portrait orientation. Background: a gradient that represents the aesthetic (e.g., Neon Cyberpunk card has a purple-pink gradient). Foreground: style name in bold, category chip, difficulty badge. The "Copy Prompt" button appears on hover (desktop) or is always visible (mobile).

**Icon / Illustration Style**: The style thumbnails ARE the illustration — they're the visual identity of each prompt. Color swatches, gradient circles, aesthetic keywords styled as typography. No generic icons.

**Motion Style**: The gallery auto-scrolls (slow, pauses on hover/focus, stops with `prefers-reduced-motion`). Style card hover: a scale-up to 1.04 + a border glow in the category accent color. "Copied!" confirmation: a satisfying checkmark animation (scale from 0 to 1, 150ms, with a green flash).

**Background Style**: The background changes based on the selected category. When browsing "Neon Cyberpunk" styles, the background shifts purple-pink. When browsing "Nature" styles, it shifts green-teal. This category-reactive background is unique to Nano Banana and reinforces the creative exploration feel.

**Navigation Inside Portal**: Categories as a sticky horizontal pill-tabs row: All / Portraits / Landscapes / Abstract / Fashion / Architecture / Fantasy. No sidebar. The categories are the primary navigation.

**User Journey**: Landing → Browse gallery → Click style to expand → See the full prompt → Copy → Use in Gemini/Midjourney → Share result

**What Makes This Portal Different**: The only portal designed for joy rather than learning. Every design decision prioritizes delight. It's the only portal that can be enjoyed in 2 minutes.

**What Keeps It Connected to Darhous**: The navbar. The "banana" branding is earned and committed. The shared auth system. The AI Studio context — Nano Banana belongs in the AI Studio section alongside Prompt Studio and Prompt Battle.

---

## Section 7 — Page-by-Page Redesign Map

### Homepage / Landing

**Current Issue**: Monolithic 940+ line client component, emoji icons in OS mockup, 3 CTAs in hero creating decision paralysis, sections in wrong cognitive order, "Why Darhous" feature grid is the weakest section.

**Proposed Layout Direction**: Restructure section order (as described in Section 5). Extract each major section into its own server component where possible (`Stats`, `PortalShowcase`, `PathSelector` client-only, `MentorDemo`).

**Visual Upgrade**: Replace OS mockup emojis with SVG icons. Replace triple-orb hero with ecosystem diagram visualization. Replace feature grid with woven-in benefits.

**Component Changes**: `HomepageClient.tsx` must be split into at minimum 6 separate components. The current 940-line file is a performance and maintainability risk.

**Mobile Considerations**: Ecosystem diagram becomes a compressed horizontal strip. OS mockup becomes 2-column.

**Risk Level**: Medium — visual changes only, no routes or APIs

**Redesign Priority**: P0 — landing page is the primary first impression

---

### AI Academy Portal

**Current Issue**: Same `glass-card` template as every other portal. The course catalog is a grid of cards that feel generic. Lesson viewer UX untested on mobile.

**Proposed Layout Direction**: Neural Command Center aesthetic (Section 6.1). Left sidebar course navigation. Lesson view with focus mode.

**Visual Upgrade**: SVG icon for portal identity. Deep blue-black surface color. Technical typography.

**Component Changes**: AI Academy landing needs a new hero section (neural network visualization). Course catalog needs sidebar layout. Lesson viewer needs a reading-focus mode toggle.

**Mobile Considerations**: Left sidebar collapses to a top tab bar on mobile. Lesson code snippets must be horizontally scrollable.

**Risk Level**: Low (visual only — course data/progress untouched)

**Priority**: P2 (after landing page and design system are set)

---

### Language Portal

**Current Issue**: The assessment flow is excellent but the landing page feels generic. The results page radar chart is powerful but visually understyled. History page is functional but cold.

**Proposed Layout Direction**: Living Library aesthetic (Section 6.2). Warm violet-black surface. Editorial typography. Literary atmosphere.

**Visual Upgrade**: Warm surface color. Arabic/English calligraphy hero animation. Larger CEFR level badge on results.

**Component Changes**: Language Portal landing hero needs full replacement. Results page layout needs a "mission report" treatment for the scores. History page needs warmer card style.

**Mobile Considerations**: Radar chart must remain readable on 375px. CEFR badge must be large enough to read at arm's length.

**Risk Level**: Low (visual only)

**Priority**: P3

---

### Digital Exams Portal

**Current Issue**: The exam interface is mostly correct in its restraint, but the portal landing page uses the same glass-card template. The subject tiles need to communicate authority, not just list topics.

**Proposed Layout Direction**: Verification Chamber aesthetic (Section 6.3). Cold dark surface. Blueprint grid. Authoritative typography.

**Visual Upgrade**: Cold surface color. Precise tile system for subjects. Subject icons (SVG, flat, monochromatic).

**Component Changes**: Subject landing tiles need redesign (square tiles, not current cards). Exam interface footer needs a visible progress indicator.

**Mobile Considerations**: 9-subject grid: 3×3 on desktop → 2×5 on tablet → single-column on mobile.

**Risk Level**: Low (visual only — exam engine untouched)

**Priority**: P3

---

### Career Hub Portal

**Current Issue**: The CV Analyzer result is the platform's most powerful feature — but the score is displayed as a percentage number in a small card. The visual impact of the ATS analysis is far below the actual utility. The upload zone could be more inviting.

**Proposed Layout Direction**: The Launchpad aesthetic (Section 6.4). Warm amber-black surface. Score as a radial gauge.

**Visual Upgrade**: Large animated ATS score gauge. Dimension bars with color coding. Upload zone as a hero action.

**Component Changes**: CV Analyzer results page needs a significant visual redesign (score layout, dimension visualization). Upload zone needs a larger, more inviting drag-drop treatment.

**Mobile Considerations**: Radial gauge at 160px (not 200px) on mobile. Dimension bars full-width.

**Risk Level**: Low (layout change only — CV analysis API untouched)

**Priority**: P2 (Career Hub is a key differentiator)

---

### Automation Academy Portal

**Current Issue**: The three-layer data architecture (workflow metadata → details → JSON) is exemplary, but the UI doesn't communicate this depth. The workflow library looks like a simple list. The AI Automation Agent (3-step wizard) has great functionality but plain visual treatment.

**Proposed Layout Direction**: Workshop Floor aesthetic (Section 6.5). Three-panel layout. Monospace typography. Circuit board background.

**Visual Upgrade**: Workflow recipe cards with diagram thumbnails. Three-panel layout on desktop. Safety scan badge prominently displayed.

**Component Changes**: Workflow listing needs a major layout overhaul (three-panel). Recipe cards need diagram preview. AI Automation Agent wizard needs visual step indicators with progress.

**Mobile Considerations**: Three-panel collapses to single-column with drawer for workflow list. Recipe cards go full-width.

**Risk Level**: Low (visual only — safety scan, JSON viewer untouched)

**Priority**: P2

---

### IoT Lab Portal

**Current Issue**: 254+ content items (lessons, projects, challenges, components) are listed without strong visual hierarchy. The component library is a plain list. The lesson detail page has no code syntax highlighting.

**Proposed Layout Direction**: Maker Space aesthetic (Section 6.6). Warm orange-black surface. PCB-style illustrations. Code syntax highlighting.

**Visual Upgrade**: Lesson cards with left-border difficulty color coding. Component library cards with PCB-style specs layout. Arduino code blocks with syntax highlighting.

**Component Changes**: Lesson cards need redesign (horizontal, left-border indicator). Component library needs a new card design. Lesson detail needs a code block component with copy button and syntax highlighting.

**Mobile Considerations**: Lesson cards stack to full-width. Code blocks are horizontally scrollable. Component specs are collapsible accordions on mobile.

**Risk Level**: Low (visual only — lesson content, simulator untouched)

**Priority**: P3

---

### Nano Banana Portal

**Current Issue**: Currently lives in the AI Studio dropdown and has its own route (`/nano-banana-prompts`). The portal landing needs to be reimagined as the creative gallery described in Section 6.7.

**Proposed Layout Direction**: Creative Playground aesthetic (Section 6.7). Full-bleed gallery hero. Category-reactive background.

**Visual Upgrade**: Masonry/dense grid for prompt cards. Category-reactive background color. Bold display typography.

**Component Changes**: The prompt card system needs complete redesign (from text cards to style cards with preview and copy). Category navigation needs sticky pill-tabs.

**Mobile Considerations**: Gallery grid: 2-column on mobile. Copy button always visible (not hover-only). Large touch targets (min 48px).

**Risk Level**: Low (visual only — prompt data unchanged)

**Priority**: P4 (after core portals)

---

### AI Studio / Tools Pages

**Current Issue**: The AI Studio items (Mentor, Prompt Studio, Prompt Battle, etc.) are accessed through a dropdown in the navbar but don't have consistent visual identities or a unified landing page.

**Proposed Layout Direction**: A dedicated AI Studio landing page that acts as a hub for all the studio tools. Each tool gets a consistent card treatment within the Studio context (different from the portal cards — more compact, tool-focused).

**Visual Upgrade**: A Studio landing page with the studio tools in a 4-column grid. Each tool card shows: tool name, a one-line description, the primary action (e.g., "Start a conversation" for Mentor), and a usage count or "popular" badge.

**Priority**: P3

---

### Student Dashboard

**Current Issue**: The `StudentDashboardClient.tsx` is a large client component with tab-based navigation. The tabs (Progress / Certificates / History / etc.) are horizontally scrollable on mobile. The certificate tab shows "locked/unlocked" cards but the visual treatment is plain.

**Proposed Layout Direction**: Maintain the tab structure but apply the portal-specific color system — when the user views their AI Academy progress, the dashboard section uses AI Academy accent colors. When viewing Language results, it uses the Language Portal accent.

**Visual Upgrade**: Certificate cards upgraded to show a mini-preview of the certificate design (not just a text badge). Progress rings for each enrolled portal. Portal-color-coded sections within the dashboard.

**Component Changes**: Certificate "locked" state needs a better visual treatment (currently just gray opacity). Progress section needs visual progress rings. Recent activity feed needs chronological clarity.

**Mobile Considerations**: Tab bar stays horizontal-scrollable (correct current behavior). Dashboard cards go full-width on mobile.

**Risk Level**: Low-Medium (UI changes only — no Supabase queries touched)

**Priority**: P2 (dashboard is what users see after every login)

---

### Admin Dashboard

**Current Issue**: The `AdminDashboardClient.tsx` has a comprehensive set of features but the visual treatment is utilitarian. The Certificates Studio is especially bare.

**Proposed Layout Direction**: Data-dense but organized. The admin dashboard should feel like a professional operations center — not pretty, but extremely clear.

**Visual Upgrade**: Upgrade chart system (replace raw Recharts with styled Recharts — custom colors, tooltips, rounded bars). Admin header should clearly indicate "ADMIN MODE" with a distinct background treatment (subtle red accent, not the global blue).

**Priority**: P4 (admin is internal, lower visual priority)

---

### Login / Register / Auth Pages

**Current Issue**: Auth pages use the global layout (navbar + footer) which adds visual noise during authentication. Premium platforms typically use a focused auth layout without the global nav.

**Proposed Layout Direction**: Auth pages should use a dedicated layout without the full navbar. A simplified header with just the Darhous logo and an "X" to close (go back to landing). The right panel shows rotating social proof or a portal preview.

**Visual Upgrade**: Split-screen auth layout on desktop. Left: branded illustration of the ecosystem. Right: the auth form. Mobile: single column, logo at top, form centered.

**Component Changes**: A new `AuthLayout` without the full `Navbar` and `Footer`. A `AuthSocialProof` panel showing rotating testimonials or real stats.

**Risk Level**: Medium (layout change, auth logic untouched)

**Priority**: P2

---

### Profile Page

**Current Issue**: Not deeply inspected in the audit, but likely uses the global glass-card layout.

**Proposed Layout Direction**: A left-column avatar + stats, right-column editable fields layout. Portal activity summarized with portal-accent color coding. Certificate collection visible.

**Priority**: P3

---

### Certificates and Verification Pages

**Current Issue**: The audit confirms that the `CertificateTemplate.tsx` is solid (navy + gold, A4 landscape, QR code). The verification page UX could be elevated. The `CertificatesClient.tsx` uses HTML print (not the premium PDF template) for Course certificates — inconsistency.

**Proposed Layout Direction**: The verification page (`/[locale]/certificates/verify/[certId]`) should feel like a premium trust document. A centered card with the certificate preview (a visual thumbnail, not the full PDF), the verification data displayed in a clear table, and a QR code prominently displayed.

**Visual Upgrade**: Verification page gets a "Verified" visual treatment — a large green checkmark, the certificate holder's name in display size, and the certificate ID in monospace. The verification card should feel like an official document.

**Priority**: P3 (styling only — all API/verification logic untouched per strict instruction)

---

### Contact / About / Coming Soon

**Contact**: A simple centered layout with a contact form on the left and address/social links on the right. The form uses the global design system.

**About**: A narrative page about the academy. The hero should have a personal, authentic feel — a portrait of Ahmed Darhous with a signature-style headline.

**Coming Soon**: The current page shows future portals. Redesign as a "Roadmap" page — a visual timeline of what's coming, with estimated timelines and a "notify me" signup for each upcoming portal.

**Priority**: P4 for all three

---

## Section 8 — Full Design System Strategy

### Global Brand Tokens (Ecosystem Level — Replace Current)

```css
/* Foundation */
--darhous-bg:              #0b0d11;   /* Slightly warmer than current #0c0e12 */
--darhous-surface:         #111318;
--darhous-surface-raised:  #181b22;   /* For cards that sit on top of surface */
--darhous-surface-overlay: #1f222a;   /* For modals, dropdowns */

/* Text */
--darhous-text-primary:    #e8e9f0;   /* Slightly warmer white */
--darhous-text-secondary:  #9ba3b8;   /* Secondary text */
--darhous-text-muted:      #5a6275;   /* Muted/placeholder */

/* Brand Accent Trio */
--darhous-accent-blue:     #8ed5ff;   /* Keep current primary */
--darhous-accent-violet:   #d0bcff;   /* Keep current secondary */
--darhous-accent-cyan:     #3ce0fb;   /* Keep current tertiary */

/* Borders */
--darhous-border:          rgba(255,255,255,0.06);
--darhous-border-strong:   rgba(255,255,255,0.12);
--darhous-border-accent:   rgba(142,213,255,0.20);

/* Status */
--darhous-success:         #4ade80;
--darhous-warning:         #fbbf24;
--darhous-error:           #f87171;
--darhous-info:            #60a5fa;
```

### Portal-Specific Token Layers

Each portal defines its own token layer that overrides only the accent and surface tokens. Global text, border, and status tokens remain unchanged.

```css
/* Portal tokens — applied to [data-portal="ai-academy"] wrapper */
[data-portal="ai-academy"] {
  --portal-surface:     #070d14;
  --portal-surface-2:  #0a1422;
  --portal-accent:     #8ed5ff;
  --portal-accent-dim: rgba(142,213,255,0.12);
  --portal-glow:       rgba(142,213,255,0.20);
  --portal-bg-pattern: "blueprint-grid";
}

[data-portal="language"] {
  --portal-surface:     #10071c;
  --portal-surface-2:  #180d2a;
  --portal-accent:     #c084fc;
  --portal-accent-dim: rgba(192,132,252,0.10);
  --portal-glow:       rgba(192,132,252,0.18);
  --portal-bg-pattern: "warm-noise";
}

[data-portal="digital-exams"] {
  --portal-surface:     #030b0f;
  --portal-surface-2:  #061520;
  --portal-accent:     #3ce0fb;
  --portal-accent-dim: rgba(60,224,251,0.08);
  --portal-glow:       rgba(60,224,251,0.14);
  --portal-bg-pattern: "technical-grid";
}

[data-portal="career"] {
  --portal-surface:     #0c0800;
  --portal-surface-2:  #1a1200;
  --portal-accent:     #fbbf24;
  --portal-accent-dim: rgba(251,191,36,0.10);
  --portal-glow:       rgba(251,191,36,0.18);
  --portal-bg-pattern: "warm-noise";
}

[data-portal="automation"] {
  --portal-surface:     #030f06;
  --portal-surface-2:  #061909;
  --portal-accent:     #4ade80;
  --portal-accent-dim: rgba(74,222,128,0.08);
  --portal-glow:       rgba(74,222,128,0.15);
  --portal-bg-pattern: "circuit-trace";
}

[data-portal="iot-lab"] {
  --portal-surface:     #0c0600;
  --portal-surface-2:  #190e00;
  --portal-accent:     #f97316;
  --portal-accent-dim: rgba(249,115,22,0.10);
  --portal-glow:       rgba(249,115,22,0.18);
  --portal-bg-pattern: "pcb-trace";
}

[data-portal="nano-banana"] {
  --portal-surface:     #100a20;
  --portal-accent:     #f59e0b;
  --portal-accent-2:   #ec4899;
  --portal-accent-3:   #06b6d4;
  --portal-bg-pattern: "color-spill";
}
```

### Dark Mode Strategy

Dark mode is the primary mode (correct current behavior). The new dark mode strategy has one addition: **portal-level surface differentiation**. Instead of all portals sharing `#0c0e12`, each portal gets its own near-black base that has a faint chromatic undertone matching its accent. This is the single highest-impact visual change and requires only a CSS change per portal wrapper.

### Light Mode Strategy

The current light mode is underdeveloped — it's essentially the same layout with `#f8fafc` background and blue accents. A proper light mode needs:
- Portal-specific light mode surfaces (e.g., Language Portal in light mode gets `#faf8ff` — a lavender-tinted white)
- Higher contrast ratios (light mode secondary text `#475569` barely meets 4.5:1 against white backgrounds)
- Light mode glass cards need a genuine frosted-glass treatment (the current light mode uses `rgba(255,255,255,0.88)` which is just white — add a subtle background pattern and stronger shadow)
- Light mode accent colors need separate tokens (the current system uses `#0284c7` in light mode vs `#8ed5ff` in dark — this is correct in principle but needs more care for the new portal surfaces)

### Typography Scale

```
/* Display - Portal heroes, landing H1 */
--type-display:    clamp(40px, 5vw, 64px) / 1.1 / weight 800

/* H1 - Section heroes */
--type-h1:         clamp(32px, 4vw, 48px) / 1.2 / weight 700

/* H2 - Section titles */
--type-h2:         clamp(24px, 3vw, 36px) / 1.3 / weight 600

/* H3 - Card titles, subsections */
--type-h3:         20px / 1.35 / weight 600

/* Body Large - Subtitles, intros */
--type-body-lg:    18px / 1.6 / weight 400

/* Body - Default reading */
--type-body:       16px / 1.5 / weight 400

/* Body Small - Secondary text, meta */
--type-body-sm:    14px / 1.4 / weight 400

/* Label - Chips, tags, badges */
--type-label:      12px / 1.3 / weight 500

/* Mono - Code, IDs, technical */
--type-mono:       13px / 1.5 / weight 400 (JetBrains Mono)

/* Micro - Timestamps, captions */
--type-micro:      11px / 1.3 / weight 400
```

### Arabic Typography Rules

The UI/UX Pro Max skill surfaced **Noto Naskh Arabic** as a candidate for Arabic display text and **Noto Sans Arabic** for body. The current **IBM Plex Sans Arabic** is good for body text and technical content. The recommended upgrade:

- **Portal hero headings** (Arabic H1, Display): Add **Cairo ExtraBold** or **Tajawal ExtraBold** as a display option — these have more personality than IBM Plex Sans Arabic at large sizes
- **Body text**: Keep **IBM Plex Sans Arabic** — it's excellent for Arabic readability
- **Technical/mono content**: IBM Plex Sans Arabic doesn't have a mono variant — use **IBM Plex Mono** for code alongside Arabic body text with proper `dir="ltr"` on code blocks
- **Line height for Arabic**: Body text minimum 1.7 (vs. 1.5 for Latin). The current CSS doesn't distinguish Arabic line-height from Latin. Add:
  ```css
  body[dir="rtl"] { line-height: 1.7; }
  ```
- **Arabic letter-spacing**: Never add `letter-spacing` to Arabic text (it breaks character connections). Ensure no global `letter-spacing` applies to RTL body text.
- **Number rendering**: For Arabic locale, decide whether to use Arabic-Indic numerals or keep Western — whatever is chosen, apply consistently. Currently mixed.

### English Typography Rules

- Current: IBM Plex Sans — good but slightly corporate for the brand
- **Upgrade**: Add **Geist** (already in the font stack import but not fully utilized) as the English display and heading font. IBM Plex Sans stays for body.
- Apply Geist to: landing page H1, portal hero headings, navbar brand text
- Body text at 16px minimum (correct, no change needed)
- Line height: 1.5 body (current is correct)

### Spacing Scale (Upgrade current arbitrary values)

```
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

Section gaps: use `--space-20` (80px) between sections on desktop, `--space-12` (48px) on tablet, `--space-10` (40px) on mobile. The current `gap-28` (112px) is too much.

### Radius Scale

```
--radius-sm:  6px   (small chips, tags)
--radius-md:  10px  (input fields, small cards)
--radius-lg:  16px  (cards, panels)
--radius-xl:  24px  (large cards, modals)
--radius-2xl: 32px  (hero panels, full-screen elements)
--radius-full: 9999px (pills, avatars)
```

### Shadows / Elevation

```
--shadow-sm:  0 1px 3px rgba(0,0,0,0.3)
--shadow-md:  0 4px 16px rgba(0,0,0,0.35)
--shadow-lg:  0 8px 32px rgba(0,0,0,0.4)
--shadow-xl:  0 16px 64px rgba(0,0,0,0.45)
--shadow-glow-blue:   0 0 24px rgba(142,213,255,0.25)
--shadow-glow-violet: 0 0 24px rgba(208,188,255,0.25)
--shadow-glow-cyan:   0 0 24px rgba(60,224,251,0.25)
/* Portal-specific glow: var(--portal-glow) */
```

### Glassmorphism Rules (Restrained System)

The skill's style output flagged glassmorphism's accessibility risk (text contrast). The new system uses glass ONLY for:
1. The main navbar (persistent, low content)
2. Dropdown menus (short content, high contrast text)
3. Modal/sheet overlays
4. Cards that sit directly on the ambient-orb background

Glass is NOT used for:
- Cards inside portals (use `--portal-surface-2` instead — a solid elevated surface)
- Form fields (use a solid dark input background)
- Code blocks
- Tables

Glass specification:
```css
/* Standard glass card — use sparingly */
.glass-card {
  background: rgba(15,18,25,0.72);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.18);
  border-left: 1px solid rgba(255,255,255,0.06);
  border-right: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  /* Add inner glow only on hover */
}
.glass-card:hover {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}
```

### Gradients Rules

- **Background gradients**: Maximum 2 per page. Linear gradients for surfaces, radial for atmospheric elements.
- **Orbs**: Maximum 1 per viewport. The layout.tsx currently places 3 fixed orbs — reduce to 1 centered orb at 4% opacity. Each portal's `--bg-pattern` handles the remaining atmosphere.
- **Text gradients**: Keep `gradient-text` class but limit to 1 gradient text element per page section.
- **Button gradients**: Primary button keeps its gradient (`#00668a → #004c69`). Secondary buttons are solid fill, no gradient.

### Icon System

**Replace all emojis with SVG icons from Lucide React.** The existing `import { Bot, Search, Menu, X, ChevronDown, LogIn, UserCircle, ShieldCheck, Grid3X3 } from "lucide-react"` is the right approach — expand it.

Portal icons: Commission or design 7 custom SVG icons for the 7 portals. These are the most important icons in the system — they appear in the navbar, portal cards, footer, hero, and OS mockup.

Suggested Lucide alternatives or custom icons:
- AI Academy: `Cpu` or `BrainCircuit` from Lucide
- Language Portal: `Languages` from Lucide  
- Digital Exams: `ClipboardCheck` from Lucide
- Career Hub: `TrendingUp` from Lucide (better than Briefcase for "trajectory")
- Automation Academy: `Workflow` from Lucide
- IoT Lab: `Cpu` + `Zap` combined → custom SVG needed
- Nano Banana: `Wand2` from Lucide (the banana stays as branding text, not as an icon)

### Card System

**Three card variants (not one):**

1. **Portal Card** (landing page, navbar dropdown): Full-featured with icon, title, description, features list, status badge, and CTA. Two layouts: grid variant (60% width, square-ish) and list variant (full width, horizontal).

2. **Content Card** (courses, lessons, projects, challenges): Compact. Left-border accent indicator for difficulty/status. Title, meta info (count, time), progress indicator if enrolled.

3. **Data Card** (dashboard stats, results summaries): Minimal. Large number, label, trend indicator. Used in dashboards and result pages.

### Button System

```
/* Primary — one per screen */
.btn-primary: gradient background, white text, glow shadow on hover

/* Secondary — supporting action */
.btn-secondary: 10% opacity portal accent fill, 25% opacity accent border, accent text

/* Ghost — tertiary action */
.btn-ghost: no background, 10% opacity border, dimmed text

/* Destructive — dangerous action */
.btn-destructive: 6% red fill, red border, red text — visually separated

/* Icon — icon-only button (must have aria-label) */
.btn-icon: minimum 44×44px, no padding reduction

/* Link — inline text action */
.btn-link: no border, no background, underline on hover
```

### Form System

- Inputs: `--portal-surface-2` background, `--darhous-border` border, `--portal-accent` focus ring
- Labels: always visible above the input (no placeholder-as-label)
- Error state: below the field, in `--darhous-error` color, with an error icon
- Helper text: below the field, in `--darhous-text-muted`, 12px
- Required indicator: `*` after the label, in `--darhous-error`
- Password field: always include show/hide toggle

### Dashboard Widget System

Each portal's hub section in the student dashboard uses a mini version of that portal's design language:
- AI Academy hub section: dark blue surface, course progress rings
- Language Portal hub: violet surface, CEFR level badge, history sparkline
- Digital Exams hub: cold dark surface, pass/fail count, next exam CTA

### Empty States

Three types:
1. **Not started**: Large portal icon (SVG), "You haven't started this yet" text, primary CTA to start
2. **In progress**: Progress ring at partial completion, encouragement text, "Continue" CTA
3. **No data**: Illustration or icon, explanation, action to generate data

### Loading States

- **Skeleton**: Use shimmer skeletons for cards and lists (not spinner for page-level loading)
- **Spinner**: Only for inline async actions (button loading state, AI response generating)
- **Progress bar**: For multi-step operations (file upload, exam submission)

### Error States

- **Page error** (`error.tsx`): Full-page centered error with icon, message, retry button. Use the Darhous brand, not a generic 500 page.
- **Inline error**: Red text below the field or action that caused the error
- **Toast error**: Auto-dismiss in 5s, left-side border in error color, close button

---

## Section 9 — Component Redesign Inventory

### Navbar

**Current**: 670-line client component. Glassmorphism background (correct). But 30+ navigation destinations, emoji icons in portal dropdown.

**Proposed**:
1. Remove emoji from portal dropdown items — replace with small SVG portal icons
2. Reduce visual density: the portal dropdown should show the portal icon (large, 32px), title, and status — not the description
3. The AI Studio dropdown: group items into 3 sub-categories (Mentor / Studio Tools / Games & Challenges) with a visual separator
4. Add `aria-label` to all icon-only buttons (Search, Theme Toggle, Language Toggle)
5. Add `role="navigation"` and `aria-label="Main navigation"` to the `<nav>` element
6. Add skip-to-content link as the very first focusable element (renders off-screen, visible on focus)

### Footer

**Current**: 4-column grid with emoji in AI Studio links. Portal links with emoji icons.

**Proposed**:
1. Replace emoji in footer links with Lucide SVG icons (small, 12px, inline)
2. Portal section: show portal color indicator (a 4px × 4px colored dot) next to each portal name — subtle but gives the footer chromatic life
3. Add the Darhous tagline below the brand name: "المنظومة التعليمية الذكية" in slightly larger, more confident type
4. Footer social links: replace with properly sized SVG social icons (not emoji)
5. Copyright line: "designed by Ahmed Darhous ©" → "© 2026 Darhous AI Cloud Academy" — more professional

### Button (Primary / Secondary / Ghost)

**Current**: `glow-button-primary` and `glow-button-secondary` — functional but the hover `transform: translateY(-2px)` creates a layout jump on some surfaces.

**Proposed**:
- Primary: Keep the gradient. Change hover from `translateY(-2px)` to only `box-shadow` increase — no layout transform.
- Secondary: Increase the border opacity from `0.25` to `0.35` — currently too subtle in dark mode.
- All buttons: Minimum height 44px (current `py-3.5` = 14px × 2 = 28px padding + ~18px text height = 46px — this is correct. Verify the smaller `py-2.5` buttons are also ≥ 44px).
- Add `cursor-pointer` to all buttons (the UI/UX Pro Max skill flags this for web)

### PortalCard

**Current**: `glass-card rounded-2xl p-5` with portal color as accent. Same structure for all 7 portals.

**Proposed** (two layouts):
1. **Grid variant (landing page)**: Taller cards with more breathing room. Portal icon (SVG, 40px, in accent color). Title. Two-line description. Status badge. Feature pills (max 3). CTA button at the bottom. Portal-specific top-border accent (3px, portal color).
2. **Navbar dropdown variant**: Compact. Portal icon (24px) + title + green dot if available. No description.

Key change: Remove `glass-card` from portal cards on the landing page — use `var(--portal-surface-2)` with a solid dark background instead. Glass is overused on the landing page and reducing it here will make the page feel more solid and trustworthy.

### CourseCard (AI Academy)

**Current**: Likely a grid card showing course title, lesson count, and progress.

**Proposed**: Portrait orientation. Course level tag (Foundations/Intermediate/Advanced) in monospace at top. Course title in H3. Module count + estimated time as meta. Progress ring (if enrolled) in the bottom-right corner. A "prerequisite" indicator if there are required courses.

### StatCard

**Current**: Stats component — not inspected in detail but assumed to be large number + label.

**Proposed**: Three sizes:
- **Hero stat** (landing page trust bar): Large number (32px bold), label (12px), no border — just the number
- **Dashboard stat**: Medium number (24px bold), label, trend arrow (up/down with delta)
- **Portal stat** (portal landing heroes): Extra-large number (48px bold), label beneath, portal accent color for the number

### Dashboard Cards

The student dashboard has several card types for different portals. These should use the portal-token system to give each card its chromatic identity while sharing the same structural layout.

### Form Fields

**Current**: Unclear — not deeply inspected. The path selector uses button-chip inputs (correct for the use case). Auth forms likely use standard inputs.

**Proposed**: A unified `Input` component with:
- `--portal-surface-2` background when inside a portal, `--darhous-surface-raised` on global pages
- Portal accent color for the focus ring border
- Label always above, never inside
- Character count for textarea fields
- Clear (×) button for search fields

### Tables

For Digital Exams history, Language history, Admin analytics tables:
- Fixed header row with slightly elevated background
- Alternating row backgrounds (2% opacity difference — very subtle)
- Sortable columns with `aria-sort` attributes
- Mobile: horizontal scroll with sticky first column

### Tabs

**Current**: Used in dashboards and portal navigation. `sticky` horizontal scrollable tab bar.

**Proposed**: 
- Active tab: `--portal-accent` bottom border (2px) + text in accent color
- Inactive tab: `--darhous-text-secondary` text, no background
- Tab bar: `--darhous-surface` background, bottom border separates from content
- Mobile: Horizontal scroll (current behavior is correct)

### Modals

**Current**: Not inspected.

**Proposed**: 
- Overlay: `rgba(0,0,0,0.6)` — not too dark (60% is the sweet spot from the UI/UX Pro Max skill)
- Modal surface: `--darhous-surface-overlay` (the elevated solid, not glass)
- Close button: always present, always in top-right (or top-left in RTL), 44×44px touch target
- Motion: enter from below (translateY from 20px, scale from 0.96), exit upward (faster — 150ms vs 250ms enter)

### Command Palette

**Current**: `CommandPaletteProvider` — a good premium product feature.

**Proposed**: Keep it. Upgrade visual treatment: full-width search input, result items show portal icon (SVG) and section breadcrumb. Keyboard shortcuts shown on the right of each item. Maximum 8 results visible before scrolling.

### Certificate Visual Cards (Verify Page)

**Current**: Not inspected in detail.

**Proposed**: The verification page should have a visually impressive "certificate card" — a styled replica of the actual certificate that fills the top half of the screen. Below: verification data table (holder, date, portal, type, ID). The card is not a PDF embed — it's a styled HTML card that communicates the same premium feel as the actual certificate.

---

## Section 10 — Motion and Interaction Strategy

### Where Animation Should Exist

| Location | Animation | Purpose |
|----------|-----------|---------|
| Hero ecosystem diagram | Planets orbit in on load (stagger 30ms), then subtle 0.5deg/s rotation | Establish platform scale |
| Section entry | `fadeUp` on section title only (not every card) | Flow and attention |
| Portal showcase horizontal scroll | Background color-temperature crossfade (200ms) | Portal identity communication |
| ATS score gauge (Career Hub) | Count from 0 to result (1.5s, ease-out) | Achievement reveal |
| Neural network visualization (AI Academy hero) | Static nodes, cursor-responsive subtle shift | Technical atmosphere |
| Workflow animation (Automation hero) | Node-by-node green pulse (3s loop) | Product demonstration |
| PCB hero (IoT Lab) | LED blink sequence, connection traces draw | Hardware excitement |
| Nano Banana gallery | Slow auto-scroll (4s per item, pauses on hover) | Gallery exploration |
| Assessment question transitions | Page turn (Language Portal only) | Portal character |
| Correct answer state | Bloom animation in accent color (200ms) | Reward |
| Button hover | Box-shadow increase only (no translateY) | Responsive feel |
| Card hover | Scale 1.015 + shadow increase (150ms) | Depth indication |
| Dropdown open | `scaleY` from 0.92 + opacity from 0 (150ms, ease-out) | Spatial relationship |
| Modal open | `translateY(20px)` + `scale(0.96)` → natural (250ms, spring) | Spatial relationship |
| Toast appear | `translateX` from off-screen (200ms) | Non-disruptive |
| Page transition | Crossfade (100ms) via Next.js `@view-transition` | Continuity |

### Where Animation Should Be Removed

| Location | Current | Remove Because |
|----------|---------|---------------|
| Scroll hint chevron | `animate-bounce` | Childish, distracting |
| Roadmap node | `node-pulse` (continuous 2s loop) | Not earning the animation |
| All portal cards | `hover:scale-[1.02] hover:-translate-y-1` | Scale should be subtle (1.015 not 1.02), remove the Y translation (it's too dramatic) |
| Float animations | `animate-float-slow`, `animate-float-fast` | Not used in meaningful UI context |
| All `animate-pulse-glow` | Current on buttons | Competing for attention with content |

### Scroll Animation Rules

- Trigger: `viewport({ once: true, margin: "-80px" })` — correct current approach
- Only the section container triggers, NOT every individual card in a grid
- Stagger children: 50ms apart maximum (current 100ms is acceptable but 50ms feels crisper)
- `once: true` is critical — elements don't re-animate when scrolling back up

### Reduced-Motion Accessibility (WCAG 2.3.3 — Currently Missing)

This is the single highest-priority animation fix. Add to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .marquee-track,
  .marquee-track-rtl {
    animation: none;
  }
  
  .animate-float-slow,
  .animate-float-fast,
  .animate-pulse-glow,
  .roadmap-node-active {
    animation: none;
  }
}
```

For Framer Motion components, add:
```tsx
const shouldReduceMotion = useReducedMotion();
const variants = shouldReduceMotion ? {} : fadeUpVariants;
```

### Mobile-Safe Animation Limits

- No continuous background animations on mobile (marquee is acceptable if `prefers-reduced-motion` is respected)
- No parallax effects on mobile
- Scale animations: use `scale: 1.015` not `scale: 1.04` on mobile (finger-sized targets shouldn't feel "bouncy")
- Duration cap: 300ms maximum for all transition-triggered animations on mobile

---

## Section 11 — Accessibility, RTL/LTR, and Arabic Quality Plan

### Contrast Rules

The UI/UX Pro Max skill Priority 1 rule is: **Minimum 4.5:1 ratio for normal text.**

Current issues:
- `--color-on-surface-variant: #c1c6d7` on `#0c0e12` background → ratio ≈ 9.8:1 ✅
- `--color-outline: #8b90a0` on `#0c0e12` → ratio ≈ 5.9:1 ✅  
- But `--color-on-surface-variant` is also used on `--color-surface-container: #1e2024` → ratio drops to ~7.1:1 ✅
- The risk area is `--color-on-surface-variant` (`#c1c6d7` which at opacity 0.4 for some UI elements) → drops below 4.5:1

**Fix**: Never reduce `--color-on-surface-variant` below 0.6 opacity on any non-decorative text. Muted text must use `--darhous-text-muted: #5a6275` only for genuinely decorative/non-essential text.

### Focus States

**Current**: `*:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; border-radius: 4px; }` — this is correct.

**Additions needed**:
- Glass cards (PortalCard) need to verify that the focus ring is visible against the card background (glass blur can obscure focus rings — use `outline-offset: 3px` on glass elements)
- Icon-only buttons in the dashboard (tab switchers, action buttons) need `aria-label` attributes
- Dropdown triggers need `aria-expanded`, `aria-controls`, and `aria-haspopup="listbox"` attributes

### Skip Links

Add as the first focusable element in the layout:

```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 
             focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary 
             focus:text-white focus:text-sm"
>
  {isAr ? "انتقل إلى المحتوى الرئيسي" : "Skip to main content"}
</a>
```

### Touch Targets

The UI/UX Pro Max skill states minimum 44×44pt for all interactive elements. Audit required on:
- The small `py-2 px-3` buttons in the navbar (verify total height ≥ 44px)
- The `px-1.5 py-0.5` "NEW" and "Soon" badges that appear on portal items (these are NOT interactive but verify they don't interfere with adjacent targets)
- Mobile menu items in the drawer (current `py-3` = ~40px including text — may be borderline. Add `min-h-[44px]`)
- Certificate download buttons in history pages

### Arabic Line-Height

**Immediate CSS addition** to `globals.css`:

```css
/* Arabic requires higher line-height for legibility */
body[dir="rtl"] {
  line-height: 1.7;
}

/* But headings in RTL can be tighter */
body[dir="rtl"] h1,
body[dir="rtl"] h2 {
  line-height: 1.2;
}
```

### Arabic Font Quality

**IBM Plex Sans Arabic** (current): Excellent for body text. Designed with bilingual Latin/Arabic cohesion in mind. Good choice — keep it.

**For display headings**: Consider adding **Cairo ExtraBold** or **Tajawal** for portal hero headings where you want more typographic personality. Load only if used (no wasted bandwidth).

**Arabic font loading**: The current `@import` from Google Fonts is correct. Add `font-display: swap` (already present in the import URL via `&display=swap`).

**Missing letter forms**: IBM Plex Sans Arabic covers all Arabic Unicode ranges needed for Egyptian Arabic content. No missing glyphs anticipated.

### Mixed Arabic/English Layout Handling

The most common mixed content challenge: Arabic sentence with embedded English technical terms (model names, tool names, brand names).

**Rule**: Use `<span dir="ltr" className="dir-ltr">` (the current `.dir-ltr` class) around all embedded LTR content within RTL paragraphs. This is already in `globals.css` — ensure all components use it consistently.

**Number handling in RTL**: Arabic numbers within Arabic text should follow the surrounding text direction. The current CSS doesn't explicitly handle this. Add:

```css
body[dir="rtl"] .tabular-nums {
  direction: ltr;
  display: inline-block;
}
```

### RTL/LTR Page Behavior

**Correct behaviors already in place**:
- `dir` on `<html>` and `<body>`
- `ArrowLeft`/`ArrowRight` locale-aware in buttons
- `borderInlineStart` (not `border-left`) in mobile nav active state

**Gaps to fix**:
- Navigation active indicator uses `left-3 right-3` in the desktop nav (the absolute-positioned underline). Should use `inset-inline-start` and `inset-inline-end` for RTL correctness.
- Flex gap and padding values that are directional should use `ps-*` and `pe-*` (Tailwind's logical properties) not `pl-*` and `pr-*`
- The `shadow-card` values should be directional — RTL shadows traditionally shift in the opposite X direction. The current `box-shadow: 0 4px 30px rgba(0,0,0,0.25)` is non-directional, which is fine.

### Mobile Readability

- Minimum body text: 16px (current body default appears to be 16px — correct)
- Line width on mobile: target 35–60 characters per line. At 375px with 24px padding = 327px content width. At 16px, this gives ~42-45 characters per line in most sans-serif fonts — acceptable.
- The OS mockup in the hero has 10px text inside small cards — this is below the minimum for readability. On mobile this should be hidden or replaced with a simplified version showing only 3 portals.

---

## Section 12 — Implementation Roadmap

### Phase 0: Design Direction Approval and Lock

**Goal**: Get creative direction approved before any code changes.

**Activities**:
- Review this proposal
- Approve or modify portal-specific color tokens
- Approve SVG icon direction (Lucide vs. custom)
- Approve typography upgrades (Cairo for display vs. keep IBM Plex)
- Approve section order changes for landing page
- Create a single reference document: the approved design token sheet

**Files Touched**: None

**Files Must Not Touch**: Everything

**Validation**: Written approval of color tokens, typography, and portal concepts

**Risk Level**: Zero

---

### Phase 1: Global Design System Foundation

**Goal**: Establish the new token system, typography upgrade, and accessibility baseline without changing any visual output (except typography and colors).

**Activities**:
- Update `globals.css`: New spacing scale, radius scale, shadow system, portal token framework
- Add `prefers-reduced-motion` CSS block (most critical accessibility fix)
- Add skip navigation link to `layout.tsx`
- Replace emoji icons in `portals.ts` color/gradient values with updated values
- Update `tailwind.config.ts` to expose spacing and color tokens via Tailwind variables
- Add Arabic line-height rule to `globals.css`
- Add `aria-label` to all icon-only buttons in `Navbar.tsx`
- Add `role="navigation"` to `<nav>` in `Navbar.tsx`

**Files Touched**:
- `src/app/globals.css`
- `src/app/[locale]/layout.tsx` (skip link only)
- `src/config/portals.ts` (color values only)
- `tailwind.config.ts`
- `src/components/layout/Navbar.tsx` (aria-labels only)

**Files Must Not Touch**: All API routes, Supabase logic, auth logic, certificate logic

**Validation Commands**: `npm run typecheck && npm run lint && npm run build`

**Manual QA Checklist**:
- [ ] Tab through the navbar — all elements focusable with visible ring
- [ ] Skip link appears on Tab press and jumps to main content
- [ ] Marquee pauses when `prefers-reduced-motion: reduce` is enabled (test in browser settings)
- [ ] Page renders without regressions in both Arabic and English
- [ ] Light mode still renders correctly

**Risk Level**: Low

**Rollback**: `git revert` on `globals.css` changes — single file, fast revert

**Commit Separately**: Yes — "feat: design system foundation: tokens, a11y baseline, RTL rules"

---

### Phase 2: Landing Page Redesign

**Goal**: Implement the new landing page section order, hero concept, portal showcase, and replace the feature grid.

**Activities**:
- Split `HomepageClient.tsx` into section components (minimum 5 separate files)
- Implement new section order
- Replace 3 CTAs with 2 CTAs in hero
- Replace `version badge` with social proof micro-badge
- Upgrade OS mockup: remove emojis, add SVG icons
- Implement new Social Proof Bar (thin trust strip below hero)
- Implement new Portal Showcase (alternating 2-column layout)
- Remove "Why Darhous" section or integrate into portal showcase copy
- Implement final CTA section (full-bleed, maximum contrast)
- Ensure `prefers-reduced-motion` is respected in all Framer Motion variants

**Files Touched**:
- `src/components/landing/HomepageClient.tsx` (major refactor)
- New files: `HeroSection.tsx`, `PortalShowcase.tsx`, `SocialProofBar.tsx`, `PathSelector.tsx`, `FinalCTA.tsx`

**Files Must Not Touch**: All API routes, auth, Supabase, certificate logic

**Validation Commands**: `npm run typecheck && npm run lint && npm run build`

**Manual QA Checklist**:
- [ ] Landing page loads in < 3s on mobile
- [ ] Section order is correct: Hero → Trust → Portals → Path → Mentor → Journey → Certs → CTA
- [ ] No emojis used as structural icons in new code
- [ ] Both Arabic (ar) and English (en) render correctly
- [ ] All CTAs link to correct routes
- [ ] Path Selector still recommends paths correctly
- [ ] OS mockup is readable on 375px

**Risk Level**: Medium (major component change)

**Rollback**: Feature branch — merge only after QA

**Commit Separately**: Yes — "feat: landing page redesign: section order, hero concept, portal showcase"

---

### Phase 3: Portal Identity System

**Goal**: Apply the portal-specific token layer to each portal's HTML root wrapper. This is the foundational change that makes each portal feel different.

**Activities**:
- Add `data-portal="ai-academy"` (or appropriate attribute) to each portal's root layout
- Add portal-specific CSS token overrides to `globals.css` for all 7 portals
- Update each portal's `layout.tsx` (if they have one) or `page.tsx` to apply the portal attribute
- Test that the global navbar still renders correctly inside each portal (the navbar uses global tokens, not portal tokens — verify no bleed)

**Files Touched**:
- `src/app/globals.css` (add 7 portal token blocks)
- `src/app/[locale]/ai-academy/layout.tsx` (or page.tsx)
- `src/app/[locale]/language/layout.tsx`
- `src/app/[locale]/digital-exams/layout.tsx`
- `src/app/[locale]/career/layout.tsx`
- `src/app/[locale]/automation/layout.tsx`
- `src/app/[locale]/iot-lab/layout.tsx`
- `src/app/[locale]/nano-banana-prompts/layout.tsx`

**Files Must Not Touch**: All API routes, all data files, auth, certificates

**Validation**: Each portal has a subtly different background tone visible. Navbar remains consistent across portals.

**Risk Level**: Low (CSS additions only, no logic changes)

**Commit Separately**: Yes

---

### Phase 4: Pilot Portals

**Goal**: Apply the full visual identity of the 2 highest-readiness portals (Language Portal and Automation Academy) as a proof of concept.

**Activities**:
- Language Portal: Implement warm violet-black surface, editorial typography, warm hero
- Automation Academy: Implement three-panel layout (or two-panel for MVP), monospace typography, workflow hero animation
- Replace emoji icons in both portals with Lucide SVG icons
- Apply new card system (content cards, not glass portal cards)

**Files Touched**: Portal-specific components for Language and Automation only

**Files Must Not Touch**: API routes, Supabase queries, certificate logic, assessment logic, auth

**Risk Level**: Medium

**Commit Separately**: Yes, one per portal

---

### Phase 5: Remaining Portals

**Goal**: Apply the visual identity to the remaining 5 portals.

**Order**: Career Hub (P2) → AI Academy → Digital Exams → IoT Lab → Nano Banana

**Each portal**: New hero, SVG icons, portal surface color, card system, navigation treatment

**Risk Level**: Low to Medium per portal

**Commit Separately**: One commit per portal

---

### Phase 6: Dashboards / Admin / Auth

**Goal**: Apply the new design system to the student dashboard, admin dashboard, and auth pages.

**Activities**:
- Student dashboard: Portal-color-coded sections, upgraded certificate cards, progress rings
- Admin dashboard: Cleaner data tables, styled charts, admin mode indicator
- Auth pages: Dedicated `AuthLayout` without full navbar, social proof panel

**Files Touched**:
- `src/components/dashboard/StudentDashboardClient.tsx` (UI only)
- `src/components/admin/AdminDashboardClient.tsx` (UI only)
- `src/app/[locale]/login/page.tsx`
- `src/app/[locale]/register/page.tsx`

**Files Must Not Touch**: Auth logic, Supabase queries, session management

**Risk Level**: Medium (large components)

**Commit Separately**: Yes, one per area

---

### Phase 7: Certificate / Verify Style-Only Polish

**Goal**: Upgrade the visual treatment of the certificate verification page and the certificate list page.

**Activities**:
- Upgrade `UnifiedVerifyClient.tsx` to the "premium trust document" visual treatment
- Upgrade `CertificatesClient.tsx` to use a consistent visual language
- Add `noarchive` meta to old verify page (prevent Google caching)
- Fix `robots: { index: false }` on old verify page (the privacy risk flagged in the audit)

**Files Touched**:
- `src/app/[locale]/certificates/verify/[certId]/UnifiedVerifyClient.tsx`
- `src/app/[locale]/certificates/CertificatesClient.tsx`
- `src/app/certificates/verify/[code]/page.tsx` (robots meta only)

**Files Must Not Touch**: All certificate API routes, verification logic, QR generation, PDF generation, Supabase queries

**Risk Level**: Low

**Commit Separately**: Yes — "fix: certificate verify privacy: noindex old verify page; feat: upgrade verify page visual treatment"

---

### Phase 8: QA, Release Readiness, and GitHub Release Notes

**Goal**: Full regression testing, accessibility audit, mobile device testing, and a clean GitHub release.

**Manual QA Checklist (Full)**:
- [ ] All 7 portals render with correct surface colors
- [ ] Navbar emoji → SVG replaced everywhere
- [ ] No emojis used as structural icons in any component
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Skip link works in all pages and locales
- [ ] All icon-only buttons have `aria-label`
- [ ] WCAG contrast: All visible text ≥ 4.5:1 on all surfaces
- [ ] All portal cards on landing page link to correct routes
- [ ] OS mockup readable on 375px
- [ ] Arabic text has correct line-height
- [ ] RTL directional properties are correct (not `pl-`/`pr-` but `ps-`/`pe-`)
- [ ] Certificate download still works (Language + Exams PDFs)
- [ ] QR verification still works for existing certificates
- [ ] Admin Certificates Studio still previews all 6 portals
- [ ] Auth flow: Register → Dashboard redirect works
- [ ] Mobile: Test on iOS Safari 375px and 390px
- [ ] Mobile: Test on Android Chrome 393px
- [ ] Landscape: Key pages readable in landscape orientation

**Validation Commands**:
```
npm run typecheck  → 0 errors
npm run lint       → 0 errors (target: reduce from 73 current warnings)
npm run build      → exit 0, no build warnings
```

**Risk Level**: Low (test-only phase)

**GitHub Release**: Create a release tagged `v14.0-design-system` with release notes documenting the design changes, the new token system, and the portal identity system.

---

## Section 13 — Three Alternative Creative Directions

### Direction A: "Digital Depth" (Recommended)

**Name**: Digital Depth

**Mood**: Atmospheric, premium, purposeful. The feeling of going deep into something meaningful.

**Visual Idea**: Dark space aesthetic where each portal is a different planet with its own atmosphere. Restrained glassmorphism on key surfaces. SVG icons throughout. Typography-led hierarchy. Portal-specific surface colors create the differentiation.

**Strengths**:
- Most coherent with the existing design system (evolution, not revolution)
- Lowest implementation risk (CSS token changes, not structural overhaul)
- Appropriate for an Arabic-first audience that values professionalism and seriousness
- The portal differentiation happens at the surface/color layer — very implementable without major component rewrites
- The UI/UX Pro Max skill's "Liquid Glass" style output maps closest to this direction

**Weaknesses**:
- Less visually dramatic than Direction B or C
- Could still feel like an evolved version of the current platform to existing users
- Requires discipline to not "add one more orb" — the tendency to over-atmospheric the design is the risk

**Risk**: Low-Medium

**Best Use Case**: Immediate implementation. This direction can be executed portal-by-portal without needing a complete redesign freeze. The existing component system accommodates it.

**Why It Fits Darhous**: The platform already has 78/100 in UI/UX. It doesn't need a revolution — it needs evolution. Digital Depth takes what's strong (the token system, the glassmorphism, the dark mode) and resolves what's weak (emoji icons, same-template portals, animation overload).

---

### Direction B: "Arabic Modernism"

**Name**: Arabic Modernism

**Mood**: Cultural pride meets modern technology. The feeling that this was made FOR Arabs, not translated FOR Arabs. Warm, grounded, distinctive.

**Visual Idea**: Light mode as the default for the landing page (unusual for tech — a strong differentiator). Arabic calligraphy and geometric patterns as visual motifs. Rich warm colors (deep saffron, slate, warm cream). Strong Arabic typography as a design element, not just content. Portals have individual personalities still, but through pattern and texture rather than surface color alone.

**Strengths**:
- Genuinely differentiating — no other Arabic EdTech platform looks like this
- Strong emotional resonance with Arabic-first users
- The light mode default would make the platform instantly recognizable in screenshots and ads
- Arabic typography as design element is visually powerful and culturally resonant

**Weaknesses**:
- Major departure from current dark-mode default — significant user adjustment
- Light mode requires rebuilding contrast strategy from scratch
- Arabic calligraphy as decoration requires either custom SVG work or a real calligrapher/designer
- Could feel niche to the English-first segment of users
- Implementation is significantly more complex than Direction A

**Risk**: High

**Best Use Case**: If the platform decides to go all-in on the Arab cultural identity as a market differentiator, especially if targeting Saudi Arabia or Gulf markets specifically.

**Why It May Not Fit Darhous Right Now**: The platform has a strong existing user base in the dark mode aesthetic. Switching to light mode as default creates a jarring transition for existing users. The certificate system, the AI tools, and the code-heavy portals (IoT, Automation) benefit from dark mode. The brand's tech positioning also conflicts with a "cultural tradition" aesthetic — the risk of looking like a prayer app rather than an AI academy.

---

### Direction C: "Brutalist Educational"

**Name**: Brutalist Educational

**Mood**: Raw, direct, anti-corporate. The "I don't have time for decorations — teach me now" aesthetic.

**Visual Idea**: High contrast. Black and white with exactly one color per portal (not a gradient — a single flat color). No glass, no blur, no orbs. Strong grid. Large, bold typography. Numbers as design elements. The anti-pattern pattern.

**Strengths**:
- Extremely distinctive — no EdTech platform looks like this
- Fastest loading (no backdrop-filter, no complex CSS)
- Perfect accessibility scores by default (high contrast by design)
- Appeals strongly to the technical user base (IoT, Automation, Digital Exams audiences)
- Cannot look "AI-generated" — too intentional and structured

**Weaknesses**:
- Alienates users who expect a premium modern aesthetic
- Hard to communicate warmth and human mentoring in a brutalist aesthetic
- The Language Portal and Career Hub (which need emotional warmth) would suffer
- Difficult to communicate "premium" in a market where premium means "polished"

**Risk**: Very High

**Best Use Case**: For a specific sub-product (e.g., if IoT Lab became a standalone app). Not for the full multi-portal ecosystem.

**Why It Doesn't Fit Darhous**: The platform's brand positioning is "smart and premium, not harsh." The AI Mentor's emotional warmth, the certificate prestige, and the "Arabic-first" care all contradict brutalism's intentional roughness.

---

### The Recommendation

**Direction A: Digital Depth** — for the following reasons:

1. It resolves every identified weakness (emojis, same-template portals, animation overload, navigation overload) without requiring a complete brand rebuild.
2. It is implementable phase by phase without a full redesign freeze.
3. It evolves the current platform's strengths (solid token system, glassmorphism, dark mode) into a mature, premium aesthetic.
4. The portal-specific surface color system — the core of Direction A — is a single CSS change per portal that delivers the highest visual impact per line of code changed.
5. It is the only direction that can deliver a 90/100 UI/UX score without rebuilding the architecture.
6. It aligns with what the UI/UX Pro Max skill recommended (Liquid Glass style, Enterprise Gateway pattern adapted for EdTech).

---

## Section 14 — Final Recommendation

### Recommended Direction
**Direction A: Digital Depth**

### Best First Implementation Step
**Phase 1** — Add `prefers-reduced-motion` to `globals.css` and replace emoji icons in `portals.ts` with Lucide SVG icon names. These two changes have zero visual regression risk, fix critical accessibility violations, and prove the development workflow before touching larger components.

Specifically, the very first commit should be exactly this:
```
1. Add @media (prefers-reduced-motion: reduce) block to globals.css
2. Add aria-label to icon-only buttons in Navbar.tsx
3. Add skip navigation link to layout.tsx
4. Add Arabic line-height rule to globals.css
```
This is a 15-minute change that fixes 4 of the top accessibility failures and sets the foundation for Phase 1.

### What Must Be Approved Before Editing

Before a single implementation file is opened:
1. The portal-specific color tokens (specifically: do you want Language Portal to shift from `#d0bcff` violet to `#c084fc` richer violet — or keep current?)
2. The typography upgrade decision (add Cairo/Tajawal for Arabic display, or keep IBM Plex Sans Arabic for everything?)
3. The SVG icon system (use Lucide only, or invest in 7 custom SVG portal icons?)
4. The landing page section order (specifically: is moving "Why Darhous" out acceptable to the owner who designed it?)
5. The portal surface color approach (apply `data-portal` tokens per portal, or a different implementation strategy?)

### What Should Be Delayed

- The Nano Banana full redesign (P4) — it's the most experimental and the least user-critical. Complete P1-P3 first.
- The Admin Dashboard redesign (P4) — internal tool, zero user-facing impact.
- The "Arabic Modernism" exploration — only worth prototyping if Direction A delivers insufficient differentiation after Phase 4.
- The three-panel Automation layout — complex structural change. Validate the portal identity system first with simpler portals.

### Biggest Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Portal color tokens bleed into the navbar (global vs portal token conflict) | Medium | High | Test Phase 3 on a single portal in isolation before rolling out all 7 |
| Landing page refactor breaks the path selector state management | Medium | High | Keep `PathSelector` as a self-contained client component with its own state — don't split it further |
| Arabic typography changes break some layouts at unexpected widths | Low | Medium | Test all Arabic pages at 375px, 768px, and 1440px after Phase 1 |
| `prefers-reduced-motion` disabling Framer Motion — unexpected layout jumps | Low | Low | Set `animate: false` not `style: {}` — Framer handles this gracefully |
| Certificate PDF rendering breaks if `globals.css` changes affect `@react-pdf/renderer` context | Very Low | Critical | `@react-pdf/renderer` doesn't use `globals.css` — CSS changes cannot affect PDF rendering |

### Safest Next Prompt for Implementation

When you're ready to implement Phase 1 (after approval), send:

> "Begin Phase 1 of the Digital Depth redesign proposal. Edit only these files: `globals.css`, `layout.tsx` (skip link), `Navbar.tsx` (aria-labels only). 
>
> In `globals.css`:
> 1. Add the `@media (prefers-reduced-motion: reduce)` block
> 2. Add `body[dir="rtl"] { line-height: 1.7; }` and heading override
>
> In `layout.tsx`:
> 1. Add skip navigation link as first child of `<body>`
>
> In `Navbar.tsx`:
> 1. Add `aria-label` to Search link, ThemeToggle button, LanguageToggle button, and mobile hamburger
> 2. Add `role="navigation"` and `aria-label` to the `<nav>` element
>
> Do NOT change any visual styling, color tokens, component structure, routes, API routes, or business logic. Run typecheck + lint + build after each file edit."

---

**Proposal complete.** The platform has strong bones, a solid architectural foundation, and real content. What it needs is not a rebuild — it needs a visual maturation that honors what works and resolves what doesn't. The Digital Depth direction does exactly that: portal-level atmosphere, controlled animation, SVG-first iconography, and a landing page that earns the first impression the platform deserves.

When you're ready to move from proposal to implementation, send the approval of the direction and the first phase will begin.

---

*Proposal by: Claude Sonnet 4.6 acting as Senior Creative Director + Design System Architect*
*UI/UX Pro Max Skill: Invoked and applied (design-system output: Liquid Glass / Enterprise Gateway / Noto Arabic typography)*
*Date: 2026-06-06 · Status: Awaiting Owner Approval · No files modified*