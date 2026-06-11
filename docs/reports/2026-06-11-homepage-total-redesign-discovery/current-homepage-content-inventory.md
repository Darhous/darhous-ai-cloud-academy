# Current Homepage Content Inventory

**Date:** 2026-06-11
**Author:** AI discovery pass — read-only, no code changes
**Brand:** NexaLearn by Ahmed Darhous

---

## Summary

| Metric | Count |
|--------|-------|
| Sections / components on homepage | 15 |
| Total unique CTAs (button + link) | 22 |
| Portal references (from portals.ts) | 7 (6 live + 1 future) |
| Portals in 3D Carousel (separate list) | 13 feature cards |
| Languages supported | Arabic (primary) + English |

The homepage is assembled in `src/components/landing/HomepageClient.tsx`.
The render order top-to-bottom is:

1. CinematicIntro (overlay, dismisses automatically)
2. ScrollIndicator (fixed UI chrome)
3. SmartPlatformTour (overlay, localStorage-gated)
4. HeroSection
5. MarqueeStrip x2 (tech skills + portal names)
6. ScrollStackSection (the "big portal cards" stack)
7. Premium3DShowcaseCarousel
8. PathSelector (interactive quiz)
9. EcosystemMap
10. MentorShowcase
11. HowItWorks
12. WhyDarhous
13. Stats
14. FinalCTA
15. CommunitySignup

---

## Section Entries

---

### 1. Cinematic Intro

**Component file:** `src/components/landing/CinematicIntro.tsx`

**Purpose:** Full-screen loading splash shown once on homepage arrival. Auto-dismisses after 4.4 s (or 1.2 s under reduce-motion). Click or keyboard (Escape/Enter/Space) also dismisses. gated only by mount, not localStorage.

**Arabic copy:** "تخطي" (skip label). No body text in Arabic — the brand name "NexaLearn" and subtitle "by Ahmed Darhous" are the only strings displayed.

**English copy:** Same. "NexaLearn" (display text), "by Ahmed Darhous" (mono subtitle), "Skip" button.

**CTAs:** None that navigate. One "Skip" button to dismiss the overlay.

**Stats / proof points:** None.

**Portal references:** None.

**Visual treatment:**
- Fixed `z-[9999]` full-screen overlay with background `#08090c`
- Ambient radial glow (rgba(142,213,255,0.06)), blur 50px
- "NexaLearn" in gradient text (white → rgba(255,255,255,0.6))
- Loading progress bar 220px wide, 3.6 s fill animation, glowing primary color

**Animation / motion:**
- `AnimatePresence` + `motion.div` exit: `opacity: 0, filter: blur(10px)`, duration 0.8 s
- Headline: `y: 100% → 0`, opacity 0 → 1, duration 0.8 s, ease `[0.16,1,0.3,1]`
- Subtitle: `y: -100% → 0`, delay 0.15 s
- Progress bar: `scaleX: 0 → 1`, 3.6 s, `easeInOut`
- Reduce-motion safe: auto-dismiss in 1.2 s, no transforms

**Sub-components:** None (pure Framer Motion + CSS).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as homepage-only brand intro. The loading bar UX is valuable for perceived performance. The dismiss flow is solid. Only the visual styling should update to match the new design language.

**Owner note from memory:** This component is missing / disabled for users with Reduce Motion system preference, since the 1.2 s dismiss fires so fast the progress bar is invisible. This is a known issue flagged in memory (`darhous-intro-missing-reducemotion`).

---

### 2. Scroll Indicator

**Component file:** `src/components/landing/ScrollIndicator.tsx`

**Purpose:** Two persistent UI chrome elements: (a) a top reading-progress bar (2px, primary color glow); (b) a vertical dot-nav on the right/left side (desktop only, lg+) that scrollspies 5 sections.

**Arabic copy:** Section labels: "البوابات", "مساري", "المرشد", "الرحلة", "المنصة"

**English copy:** Section labels: "Portals", "My Path", "Mentor", "Journey", "Ecosystem"

**CTAs:** 5 scroll-to-section buttons (dots). Not navigation links.

**Stats / proof points:** None.

**Portal references:** None (references section IDs only).

**Visual treatment:**
- Top bar: 2px, `var(--color-primary)`, `box-shadow: 0 0 10px var(--color-primary)`
- Side dots: 6px inactive / 10px active, glow on active
- Fades in after 120px scroll, slides in from right (LTR) or left (RTL)

**Animation / motion:**
- `motion.div` opacity + x translate on scroll enter
- Active dot: width/height/opacity animated via `motion.div animate`

**Sub-components:** None.

**Preservation decision:** Preserve as-is

**Suggested future placement:** Keep as homepage chrome. No copy to preserve.

---

### 3. Smart Platform Tour

**Component file:** `src/components/landing/SmartPlatformTour.tsx`

**Purpose:** 5-step modal carousel shown to first-time visitors (localStorage key `darhous-platform-tour-seen-v1`). Also triggerable via "Quick Tour" button in HeroSection. Introduces brand, AI Mentor, 6 portals, progress/certs, and a registration CTA.

**Arabic copy (step by step):**
1. "أهلاً بك في NexaLearn" — نظام تعلم ذكي يبني مسارك التعليمي والمهني من الصفر — خطوة بخطوة.
2. "مرشدك الشخصي بالذكاء الاصطناعي" — يفهم أهدافك ويصمم لك خطة تعلم مخصصة، ويرافقك عبر كل بوابة.
3. "6 بوابات تعليمية متخصصة" — من الذكاء الاصطناعي والأتمتة، إلى اللغة، المهن، والمعامل التطبيقية.
4. "تتبع تقدمك واحصل على شهاداتك" — كل دورة واختبار تُنهيه يُسجَّل في لوحتك — مع شهادات قابلة للتحقق.
5. "جاهز تبدأ رحلتك؟" — اختر مسارك بنفسك، أو دع المرشد الذكي يبنيه لك — والبداية مجانية.

**English copy (step by step):**
1. "Welcome to NexaLearn" — A smart learning OS that builds your educational & career path from zero — one step at a time.
2. "Your personal AI Mentor" — Understands your goals, designs a personalized plan, and guides you across every portal.
3. "6 specialized learning portals" — From AI & automation to language, careers, digital exams, and hands-on labs.
4. "Track progress & earn certificates" — Every course and exam you complete is tracked — with verifiable certificates.
5. "Ready to start your journey?" — Pick your own path, or let the AI Mentor build one for you — free to start.

**CTAs:**
- "ابدأ مجاناً" / "Start for free" → `/{locale}/register` (shown only on step 5)
- "تخطي" / "Skip" (dismiss tour)
- "التالي" / "Next" (within tour)
- "إنهاء" / "Done" (last step)

**Stats / proof points:** Mentions "6 بوابات تعليمية متخصصة" / "6 specialized learning portals" and "مجانية" / "free."

**Portal references:** AI Academy, Automation, Language, Careers, Digital Exams, Labs (referenced in description, not as links).

**Visual treatment:**
- Full-screen backdrop: `rgba(8,9,12,0.66)`, `backdropFilter: blur(8px)`
- Card: `max-w-md`, `rounded-3xl`, `surface-container` background, 1px rgba(255,255,255,0.08) border
- Ambient accent glow in top-right corner tinted to active step color
- Step-colored pill buttons, animated dots as progress indicators

**Animation / motion:**
- Card: scale 0.96 → 1, y 24 → 0, opacity 0 → 1 on enter; reverse on exit, duration 0.32 s
- Step content: slide enter/exit x ±28px, AnimatePresence `mode="wait"`, 0.28 s
- All animations disabled when `useReducedMotion()`

**Sub-components:** lucide-react icons (Sparkles, Bot, LayoutGrid, Trophy, Rocket, X, ChevronRight, ChevronLeft).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as onboarding overlay. The 5 talking-point structure is excellent. Copy should be audited after redesign to reflect updated brand voice and any new portal structure.

---

### 4. Hero Section

**Component file:** `src/components/landing/sections/HeroSection.tsx`

**Purpose:** Primary above-the-fold section. Contains brand badge, headline with rotating word animation, subtitle, three proof-point chips, three CTA buttons, a "Command Center" mockup showing AI Mentor chat + portal progress bars, and a TechMarquee.

**Arabic copy:**
- Badge: "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم"
- Headline: "تعلّم [بذكاء. / بمهارة. / بثقة. / بسرعة.] ابنِ مستقبلك مع NexaLearn."
- Subtitle: "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، معامل تفاعلية، وتوجيه مهني مستمر للوصول إلى أهدافك أسرع."
- Proof chips: "مسارات مدعومة بالذكاء الاصطناعي", "معامل تطبيقية وتفاعلية", "توجيه مهني مستمر"
- Scroll hint: "اكتشف المنصة"
- Mockup labels: "الموجه الذكي", "يحلل مهاراتك...", "نظرة عامة على التعلم", "متصل بالنظام البيئي"
- Mockup AI response: "لقد قمت بتحليل أهدافك. أفضل بداية لك هي التركيز على مسار هندسة الأوامر بجانب أساسيات الشبكات."

**English copy:**
- Badge: "NexaLearn by Ahmed Darhous — Next Gen Learning"
- Headline: "[Learn. / Build. / Grow. / Lead.] Intelligently with NexaLearn."
- Subtitle: "The first AI-powered Arabic learning ecosystem. Personalized paths, interactive labs, and continuous career mentorship to reach your goals faster."
- Proof chips: "AI-Powered Paths", "Interactive Applied Labs", "Continuous Mentorship"
- Scroll hint: "Explore the platform"
- Mockup labels: "AI Mentor", "Analyzing skills...", "Learning Overview", "Ecosystem Online"
- Mockup AI response: "I've analyzed your goals. Your best starting point is focusing on Prompt Engineering alongside Network Basics."

**CTAs:**
- "ابدأ رحلتك الآن" / "Start Your Journey" → scroll to `#beginner-path` (PathSelector section)
- "تصفح المسارات" / "Explore Paths" → scroll to `#beginner-path`
- "جولة سريعة" / "Quick Tour" → opens SmartPlatformTour overlay

**Stats / proof points:** Three check-mark proof chips (AI paths, Labs, Mentorship). Mockup shows 6 progress bars for portals (AI Academy 68%, Language B2 100%, Digital Exam 45%, Career Hub 20%, Automation 10%, IoT Lab 5%).

**Portal references:** AI Academy, Language (B2 badge), Digital Exam, Career Hub, Automation, IoT Lab — shown as progress bars in the mockup.

**Visual treatment:**
- Two ambient cinematic orbs: radial-gradient, blur 140px and 120px, `orb-breathe` / `orb-breathe-slow` CSS keyframe classes
- Hero mockup: `glass-panel-promax` rounded-2xl with split left/right panels
- RotatingWord component cycles through 4 words with color changes
- TechMarquee component below CTA buttons

**Animation / motion:**
- `fadeUp` variant (y: 20 → 0, opacity 0 → 1) applied to each element with sequential delays (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8)
- Progress bars: `motion.div` scaleX 0 → item.pct/100, delay 0.6 + i*0.1, `[0.0, 0.0, 0.2, 1]` ease
- `useReducedMotion()` respected throughout — y deltas set to 0, durations shortened

**Sub-components:** `RotatingWord`, `TechMarquee` (both from `@/components/ui/`), lucide-react icons.

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Above the fold. The rotating headline mechanic, proof chips, and mockup panel are the core hero devices. All copy should be carried forward; only visual styling and layout arrangement should change in the redesign.

---

### 5. Marquee Strip (double row)

**Component file:** `src/components/ui/MarqueeStrip.tsx` (called twice from HomepageClient.tsx)

**Purpose:** Two horizontal scrolling ticker rows immediately below the Hero. Row 1 scrolls tech skill names at normal speed. Row 2 scrolls portal names at slow speed with accent color `#d0bcff`.

**Arabic content (Row 1 — tech skills):** كلود AI, نكست.جي إس, رياكت, سوبابيس, تيلويند, فيرسيل, تايب سكريبت, فريمر موشن, بايثون, أتمتة, إنترنت الأشياء, كلاود

**English content (Row 1 — tech skills):** Claude AI, Next.js 16, React 19, Supabase, Tailwind CSS, Vercel, TypeScript, Framer Motion, Python, Automation, IoT, Cloud Computing

**Row 2 (portal names, opposite locale):** All portal titles from `portals.ts` (both languages — displayed in the opposite locale from the current page, so Arabic users see English portal names and vice versa).

**CTAs:** None.

**Stats / proof points:** Implicitly signals the tech stack powering the platform.

**Portal references:** All 8 portals (including Nano Banana and coming-soon).

**Visual treatment:** Horizontal infinite scroll with CSS `@keyframes` marquee. Accent color `#d0bcff` on row 2.

**Animation / motion:** CSS keyframes marquee. `prefers-reduced-motion` should be respected by MarqueeStrip (not verified in this read but standard practice).

**Sub-components:** `MarqueeStrip` from `@/components/ui/MarqueeStrip`.

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep immediately after Hero. The tech-stack scroll is a trust signal. The portal-names scroll is social proof. In a redesign, consider making it single-row or combining into a styled ticker with icons.

---

### 6. Scroll Stack Section (Portal Cards)

**Component file:** `src/components/landing/sections/ScrollStackSection.tsx`

**Purpose:** Full-height sticky-scroll section that presents each of the 7 live portals (excluding `coming-soon`) as one large card. On desktop, cards stack with a CSS sticky scroll effect where earlier cards recede (scale + dark overlay) as new ones appear. On mobile, flat stacked list.

**Arabic copy:**
- Badge: "بوابات المنصة"
- Headline: "بوابات NexaLearn الذكية"
- Subtitle: "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
- Per-card content pulled from `portals.ts` (see Portal references below)

**English copy:**
- Badge: "Platform Portals"
- Headline: "NexaLearn Smart Portals"
- Subtitle: "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"
- Per-card content from `portals.ts`

**CTAs (per portal card, from portals.ts):**
- AI Academy: "دخول البوابة" / "Enter Portal" → `/ai-academy`
- Language Portal: "اختبر مستواك" / "Test Your Level" → `/language`
- Digital Exams: "ابدأ الاختبار" / "Start Exam" → `/digital-exams`
- Career Hub: "دخول البوابة" / "Enter Portal" → `/career`
- Automation Academy: "دخول البوابة" / "Enter Portal" → `/automation`
- IoT Lab: "دخول المختبر" / "Enter Lab" → `/iot-lab`
- Nano Banana: "دخول المختبر" / "Enter Lab" → `/nano-banana-prompts`

**Stats / proof points (per portal, from portals.ts):**
- AI Academy: 18 دورة, 62 أداة AI, 27 برومبت, مرشد AI, تحديات, شهادات
- Language Portal: اختبار المستوى, تقييم المهارات, مسارات تعلم, نتائج فورية
- Digital Exams: 9 مواد, 902+ سؤال, حزمة Office, أمن سيبراني, نتائج معتمدة, شهادات
- Career Hub: محلل ATS ذكي, صانع السيرة الذاتية, مطابقة الوظائف, تحضير المقابلات, قوالب جاهزة
- Automation Academy: 30 وصفة أتمتة, مستكشف الأدوات, مسارات التعلم, خدمات احترافية, 15 معمل تطبيقي
- IoT Lab: 59 درس Arduino, 72 مشروع تطبيقي, 40 تحدي برمجي, مكتبة المكونات, محاكي تفاعلي
- Nano Banana: 100+ برومبت, 6 فئات, 3 مستويات, محسّن AI, صور تريندية

**Portal references:** All 7 live portals.

**Visual treatment:**
- Each card: `bg-#090b0f` + portal gradient overlay (opacity 0.55) + side radial glow + watermark number (up to 20rem, opacity 0.055)
- Card dimensions: min-height clamp(320px, 58vh, 510px), max-width 4xl, `rounded-3xl`, `shadow-[0_40px_100px_rgba(0,0,0,0.65)]`
- Badge pills for "جديد" / "New" on Career, Automation, IoT Lab, Nano Banana
- Feature pills (up to 5) per card

**Animation / motion:**
- `useScroll` + `useTransform` from Framer Motion for scroll-driven scale (1 → 0.9) and dark overlay (opacity 0 → 0.55) on non-last cards
- CSS `position: sticky` with `top: 80 + index * 22px` stacking
- Section header: `fadeUp` variant on whileInView
- On reduced-motion: flat list, no scroll transforms

**Sub-components:** `BigPortalCard` (internal), `Link`, lucide-react (`ArrowRight`, `ArrowLeft`, `Globe`).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as the primary portal showcase section. This is the most content-rich section of the homepage. All portal data (copy, CTAs, stats) must survive. The sticky-scroll visual treatment should be evaluated for the new design — it is currently not working on some browsers (noted in memory audit).

---

### 7. Premium 3D Showcase Carousel

**Component file:** `src/components/layout/Premium3DShowcaseCarousel.tsx`

**Purpose:** A 3D perspective carousel (13 cards, CSS 3D transform, auto-rotates every 6 s) showcasing features and tools of the platform — not the 6 portals, but inner pages and AI tools.

**Arabic copy:**
- Badge: "منصة NexaLearn الذكية"
- Headline: "استكشف منصة NexaLearn الذكية"
- Subtitle: "كل أدوات التعلم، البرومبتات، Claude، الكلاود، والمشاريع في تجربة واحدة."

**English copy:**
- Badge: "The NexaLearn Experience"
- Headline: "Explore the NexaLearn Experience"
- Subtitle: "All learning tools, prompts, Claude, cloud, and projects in one intelligent experience."

**CTAs (per carousel card):**
1. مساعد NexaLearn الذكي / NexaLearn AI Mentor → `/mentor`
2. استوديو البرومبتات / Prompt Studio → `/prompt-studio`
3. مولّد برومبت Claude Code / Claude Code Generator → `/claude-code-generator`
4. مرشح أدوات الذكاء الاصطناعي / AI Tool Recommender → `/tool-recommender`
5. مولّد خطط التعلم / AI Roadmap Generator → `/roadmap-generator`
6. إتقان Claude / Claude Mastery → `/claude`
7. مركز أدوات الذكاء الاصطناعي / AI Tools Hub → `/tools`
8. أكاديمية الكلاود / Cloud Academy → `/cloud`
9. مكتبة المشاريع / Projects Library → `/projects`
10. مكتبة البرومبتات / Prompt Library → `/prompts`
11. مسارات التعلم / Learning Paths → `/paths`
12. لوحة الطالب / Student Dashboard → `/dashboard`
13. مختبر Nano Banana / Nano Banana Lab → `/nano-banana-prompts`

**Stats / proof points (embedded in status labels):**
- AI Tools Hub: "40+ أداة" / "40+ Tools"
- Projects Library: "14 مشروع" / "14 Projects"
- Prompt Library: "25+ قالب" / "25+ Templates"
- Learning Paths: "6 مسارات" / "6 Paths"

**Portal references:** Mentor, Claude, Cloud, Nano Banana, Tools, Projects, Prompts, Paths, Dashboard (all inner pages, not the 6 main portals by name).

**Visual treatment:**
- 3D perspective stage: `perspective: 1100px`, cards at position 0/±1/±2 get different scale (1 / 0.76 / 0.55), rotateY, translateZ, opacity, blur
- Active card: accent-colored border + box-shadow glow + shine line at top
- Active card glow: 400px radial circle behind active card, tinted to card accent, transitions on card change
- Auto-rotate with 6 s interval, pauses on hover; swipe-enabled on touch

**Animation / motion:**
- CSS `transition: all 0.65s cubic-bezier(0.25,0.46,0.45,0.94)` on each card for position changes
- `prefers-reduced-motion` check via `window.matchMedia` — disables auto-rotate

**Sub-components:** `Link`, `ChevronLeft`, `ChevronRight`.

**Preservation decision:** Preserve but move

**Suggested future placement:** Move below PathSelector or to a dedicated "Tools & Features" section. The 3D carousel is a strong visual differentiator but positioned currently between ScrollStack and PathSelector, which interrupts the portal-→-path narrative flow. Content inside (all 13 cards) must be preserved.

---

### 8. Path Selector (Interactive Quiz)

**Component file:** `src/components/landing/sections/PathSelector.tsx`

**Purpose:** Interactive 4-question quiz: (1) current level, (2) main goal, (3) daily time, (4) interest area. On completion, renders a personalized 6-week plan from a local function `getRecommendedPath()`. Ends with register and mentor CTAs.

**Arabic copy:**
- Badge: "خطتك الشخصية"
- Headline: "مش عارف تبدأ منين؟"
- Subtitle: "اختار إجاباتك وهنعمل لك خطة أسبوعية مخصصة — مجانًا وفورًا"
- Q1: "ما مستواك الحالي؟" → مبتدئ تمامًا / لدي أساسيات / متقدم
- Q2: "ما هدفك الرئيسي؟" → مهارة جديدة / تطوير مهني / مشروع محدد
- Q3: "كم وقت متاح يوميًا؟" → ٣٠ دقيقة / ساعة واحدة / ساعتان أو أكثر
- Q4: "ما مجال اهتمامك؟" → ذكاء اصطناعي / مهنة & توظيف / لغة إنجليزية / IoT & أردوينو / أتمتة / اختبارات رقمية
- Result label: "خطتك المقترحة"

**English copy:**
- Badge: "Your Personal Plan"
- Headline: "Not Sure Where to Start?"
- Subtitle: "Answer these questions and we'll build a custom weekly plan for you — free and instant"
- Q1: "What's your current level?" → Complete Beginner / Some Basics / Advanced
- Q2: "What's your main goal?" → New Skill / Career Growth / Specific Project
- Q3: "How much time daily?" → 30 min / 1 hour / 2+ hours
- Q4: "What's your interest area?" → AI / Career / Language / IoT & Arduino / Automation / Digital Exams

**CTAs:**
- "ابدأ خطتي الآن" / "Start My Plan Now" → `/{locale}/register`
- "اسأل المرشد الذكي بدلًا من ذلك" / "Ask the AI Mentor instead" → `/{locale}/mentor`
- (Both CTAs only visible after all 4 questions answered)

**Stats / proof points:** "مجانًا وفورًا" / "free and instant". The result plan shows week-by-week labels tinted by portal color.

**Portal references (from recommended path plans):** Digital Exams, Language, AI Academy, Career Hub, Automation, IoT Lab — all 6 main portals appear across the various quiz pathways.

**Visual treatment:**
- `glass-panel-promax rounded-[2rem]` container
- 2-column grid on desktop (level + goal, time + interest)
- Selected option: colored border, matching glow `box-shadow`, colored text
- Result plan: 3-col grid of colored cards (1 per week)
- "Unanswered" hint: centered faded text at bottom

**Animation / motion:**
- `fadeUp` + `stagger` variants (staggerChildren 0.1 s)
- Result panel: `initial opacity:0 y:20 → animate opacity:1 y:0`, duration 0.5 s
- `AnimatePresence` not used; result appears in-flow on state change

**Sub-components:** lucide-react (12 icons for options and result weeks).

**Preservation decision:** Preserve as-is

**Suggested future placement:** Keep in the mid-page "onboarding funnel" zone. The quiz logic and all 6 week-plan pathways must survive unchanged. This is the highest-intent interactive element on the page.

---

### 9. Ecosystem Map

**Component file:** `src/components/landing/sections/EcosystemMap.tsx`

**Purpose:** 3-column grid showing the 6 live portals as glass cards plus a centered "AI Mentor" hub card. The AI Mentor card has radar-pulse animation rings and changes colors reactively when the user hovers over nearby portal cards.

**Arabic copy:**
- Badge: "منظومة NexaLearn الذكية"
- Headline: "خريطة المنظومة التعليمية"
- Subtitle: "مرشد AI في المركز، محاط بـ 6 بوابات تعليمية متخصصة مترابطة لبناء رحلتك"
- AI Mentor card: "المرشد الذكي", "العقل المدبر لرحلتك التعليمية", "المركز الرئيسي"
- Portal status label: "متاح"

**English copy:**
- Badge: "NexaLearn Smart Ecosystem"
- Headline: "Learning Ecosystem Map"
- Subtitle: "AI Mentor at the center, surrounded by 6 specialized interconnected learning portals to build your journey"
- AI Mentor card: "NexaLearn AI Mentor", "The mastermind of your learning journey", "Central Hub"
- Portal status label: "Live"

**CTAs (one per card):**
- All 6 portals → respective hrefs from `portals.ts`
- AI Mentor card → `/{locale}/mentor`

**Stats / proof points:** Status badges per portal ("متاح" / "Live", "Beta", etc.).

**Portal references:** All 6 live portals (portals 0–5 from portals.ts, i.e., AI Academy, Language, Digital Exams, Career Hub, Automation, IoT Lab). Nano Banana excluded from this view (index 6, `portals.slice(0,3)` + `portals[3]` + AI Mentor + `portals[4]` + `portals[5]`).

**Visual treatment:**
- Background: centered 800×800px radial glow, opacity 0.2, blur 80px
- Grid layout: 3 columns, rows of 3+3, AI Mentor occupies center cell of middle row
- Portal cards: `glass-panel-promax rounded-2xl`, icon hover scale 110%, colored border
- AI Mentor card: `rounded-[2rem]`, multi-stop gradient background, 1px colored border, `box-shadow` glow — all transition on hover of any adjacent portal (color tinting via React state `linkColor`)
- Radar pulse rings: `ecosystem-radar-ring` CSS class (two rings, delayed 1.5 s apart)
- `InteractiveSurface` wrapper on every card for tilt-on-hover effect (tiltMax 2)

**Animation / motion:**
- `fadeUp` variant on each card `whileInView`, once
- Color tinting transitions: 500 ms CSS transition on background, border-color, box-shadow, color
- Radar pulse rings: CSS animation (pulse outward, `ecosystem-radar-ring` keyframes)
- Reduced-motion: radar rings hidden, hover effects skipped via `shouldReduce ? {} : hoverProps`

**Sub-components:** `InteractiveSurface` from `@/components/ui/InteractiveSurface`, `Link`, lucide-react (Bot, Globe, ChevronRight).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as the ecosystem overview section. The AI-Mentor-at-center visual metaphor is a core brand story. The "hub and spoke" layout concept should persist even if the visual execution changes. All portal links and status labels must survive.

---

### 10. Mentor Showcase

**Component file:** `src/components/landing/sections/MentorShowcase.tsx`

**Purpose:** Demonstrates the AI Mentor via a simulated chat UI. A mock user message appears, then the mentor's response types out character-by-character using a `useTypewriter` hook. Ends with a link to open the real mentor.

**Arabic copy:**
- Badge: "المرشد الذكي"
- Headline: "شوف المرشد بيشتغل"
- Subtitle: "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة لحظة بلحظة"
- Chat header: "مرشد NexaLearn الذكي", "متصل ومستعد"
- User message: "أنا مبتدئ وعايز أتعلم الذكاء الاصطناعي بس مش عارف أبدأ منين، ممكن تساعدني؟"
- Mentor response: "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة."
- Input placeholder: "اكتب سؤالك للمرشد هنا…"
- Footer link: "افتح المرشد الكامل ←"

**English copy:**
- Badge: "AI Mentor"
- Headline: "See the Mentor in Action"
- Subtitle: "The AI Mentor understands your level and builds a custom learning plan, moment by moment"
- Chat header: "NexaLearn AI Mentor", "Online and ready"
- User message: "I'm a beginner who wants to learn AI but I don't know where to start, can you help?"
- Mentor response: "Start with the AI for Beginners path (3 weeks), then test your language level, then try your first hands-on IoT or Automation project. Every step is built on the previous one — and I'm with you at every stage."
- Input placeholder: "Type your question here…"
- Footer link: "Open Full Mentor →"

**CTAs:**
- Send icon button → `/{locale}/mentor`
- "افتح المرشد الكامل ←" / "Open Full Mentor →" text link → `/{locale}/mentor`

**Stats / proof points:** None explicit. Mentions "3 weeks" AI path as implied curriculum depth.

**Portal references:** AI Academy (implicitly, "AI for Beginners path"), Language Portal (language level test), IoT Lab, Automation — all mentioned in mentor response text.

**Visual treatment:**
- `glass-panel-promax rounded-[2rem]`, max-w-3xl, `box-shadow: 0 30px 80px rgba(0,0,0,0.4)`
- Chat header: semi-transparent dark bar, traffic-light dots (desktop only)
- User bubble: `rgba(208,188,255,0.12)` with asymmetric border-radius per locale
- Mentor bubble: `rgba(142,213,255,0.06)` with blinking cursor during typewriter
- Input area: disabled-looking dark input with Send icon link
- `InteractiveSurface` wrapper (tiltMax 2, spotlightColor rgba(142,213,255,0.06))

**Animation / motion:**
- `useTypewriter` hook: 28 ms/char, 2000 ms delay, fills mentor text progressively
- User message: x-slide in (±20px) from opposite side, delay 0.3 s
- Mentor response bubble: x-slide in, delay 0.9 s
- Blinking cursor span while text incomplete
- Loading dots (bounce-bounce-bounce) before text starts
- Reduced-motion: `speed=0, delay=0` so full text appears instantly

**Sub-components:** `InteractiveSurface`, `useTypewriter` (local hook), lucide-react (Bot, Send, Sparkles, Terminal).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as mid-page social proof / demo section. The chat simulation is the strongest "show don't tell" moment on the page. The exact mentor response copy (all 4 portal references within it) must survive into any redesign.

---

### 11. How It Works

**Component file:** `src/components/landing/sections/HowItWorks.tsx`

**Purpose:** 4-step vertical timeline explaining the user journey: choose goal → mentor builds plan → learn & apply → get certified. Uses `useInView` for scroll-triggered animations on each step individually.

**Arabic copy:**
- Headline: "رحلتك في 4 خطوات"
- Subtitle: "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي الذي يرافقك في كل مرحلة"
- Step 01: "اختر هدفك" — "حدد مستواك واهتمامك والوقت المتاح لك يوميًا — بيبنيلك المرشد خطة بناءً عليها."
- Step 02: "المرشد يبني لك خطة" — "الذكاء الاصطناعي يصمم مسارًا أسبوعيًا مخصصًا بالكامل لك ولظروفك."
- Step 03: "اتعلم وطبّق" — "ادخل البوابات، اتعلم المحتوى، واعمل مشاريع حقيقية خطوة بخطوة."
- Step 04: "احصل على شهادة وطوّر مسارك" — "شهادات معتمدة وتوصيات ذكية للخطوة القادمة بناءً على أداءك."

**English copy:**
- Headline: "Your Journey in 4 Steps"
- Subtitle: "From zero to mastery — step by step with your AI mentor guiding you at every stage"
- Step 01: "Choose Your Goal" — "Set your level, interest, and daily time — the mentor builds on top of that."
- Step 02: "Mentor Builds Your Plan" — "AI designs a fully custom weekly roadmap tailored to your situation."
- Step 03: "Learn & Apply" — "Enter the portals, absorb content, and build real projects step by step."
- Step 04: "Get Certified & Level Up" — "Verified certificates and smart next-step recommendations based on your performance."

**CTAs:** None. This is a pure informational section.

**Stats / proof points:** 4 steps (numbered 01–04).

**Portal references:** "ادخل البوابات" / "Enter the portals" (generic reference).

**Visual treatment:**
- Vertical timeline with a single pixel-wide line on the inline-end side, animated scaleY fill (gradient primary → secondary → tertiary → green)
- Each step has an outer pulsing ring + inner dot on the timeline
- Step header in `font-mono` tracking-[0.22em], large bold title (clamp 2xl–3xl), accent gradient line below description
- Max-width xl, centered

**Animation / motion:**
- `useInView` per step (once, margin -50px): step slides in from x: 24 → 0, staggered 0.1 s per step
- Timeline line: scaleY 0 → 1, duration 1.8 s, ease `[0.16, 1, 0.3, 1]`
- Timeline dot: outer ring pulses via `animate scale:[1,1.6,1] opacity:[0.35,0,0.35]`, repeat Infinity, delay i*0.3 s
- Accent line: scaleX 0 → 1, duration 0.55 s

**Sub-components:** `SectionHeader`, `LineColumn`, `TimelineStep` (all local to file).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as the process/journey explanation section. All 4-step copy must be preserved. The timeline layout can be redesigned (horizontal on desktop is common) but the 4 steps and their descriptions are core onboarding messaging.

---

### 12. Why NexaLearn (WhyDarhous)

**Component file:** `src/components/landing/sections/WhyDarhous.tsx`

**Purpose:** 8-card feature grid explaining platform differentiators. Uses a scroll-driven heading opacity/y animation.

**Arabic copy:**
- Badge: "مميزات المنصة"
- Headline: "لماذا تختار NexaLearn؟"
- Subtitle: "ما يميّزنا عن كل منصة تعليمية أخرى في الشرق الأوسط"
- Features:
  1. "منصة عربية ذكية" — "محتوى متخصص باللغة العربية لتلبية احتياجات المتعلم العربي"
  2. "حساب واحد للجميع" — "سجّل مرة واحدة واستخدم كل البوابات بنفس الحساب"
  3. "تعليم قائم على المشاريع" — "تطبيق عملي حقيقي وليس مجرد محاضرات نظرية"
  4. "اختبارات وتقارير فورية" — "نتائج لحظية وتقارير تفصيلية لكل اختبار"
  5. "ربط التعليم بالتوظيف" — "مسار متكامل من التعلم حتى الحصول على الوظيفة"
  6. "مرشد AI شخصي" — "المرشد يفهم مستواك ويبني لك الخطة المناسبة"
  7. "لوحة تحكم موحدة" — "تتبع كل تقدمك وشهاداتك من مكان واحد"
  8. "تجربة عصرية واحترافية" — "تصميم premium وتجربة مستخدم مدروسة بعناية"

**English copy:**
- Badge: "Platform Features"
- Headline: "Why Choose NexaLearn?"
- Subtitle: "What sets us apart from every other educational platform in the Middle East"
- Features:
  1. "Arabic-First Platform" — "Specialized Arabic content tailored for Arab learners"
  2. "One Account for All" — "Register once and access all portals with a single account"
  3. "Project-Based Learning" — "Real hands-on application, not just theory lectures"
  4. "Instant Tests & Reports" — "Real-time results and detailed reports for every exam"
  5. "Education Meets Career" — "A complete path from learning to landing a job"
  6. "Personal AI Mentor" — "The mentor understands your level and builds your plan"
  7. "Unified Dashboard" — "Track all your progress and certificates in one place"
  8. "Premium UX" — "Modern design and carefully crafted user experience"

**CTAs:** None.

**Stats / proof points:** None numeric. Claims: "Arabic-First", "One Account", "Project-Based", "Instant Results", "Career Path", "AI Mentor", "Unified Dashboard", "Premium UX".

**Portal references:** Digital Exams portal (feature 4), Career Hub (feature 5), AI Mentor link (feature 6) — implicit only.

**Visual treatment:**
- Background: 600×600px radial glow (secondary), opacity 0.15, blur 60px
- 4-column grid (1 → 2 → 4 as breakpoints)
- Each card: `glass-panel-promax rounded-2xl`, hover `-translate-y-1`
- Icon in a 48px square with glass border
- All icons rendered in `var(--color-primary)` regardless of feature

**Animation / motion:**
- Heading: `useScroll` target, `useTransform` opacity 0.25 → 1, y 10 → 0 between scroll offsets `["start 0.9", "start 0.35"]`
- Cards: `stagger` 0.07 s, `fadeUp` per card

**Sub-components:** lucide-react (8 distinct icons).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as a "Why Us" / differentiator section. All 8 feature tiles and their copy must survive. This is also the cleanest summary of what makes NexaLearn distinct. In a redesign, consider adding color differentiation per icon (currently all icons are `var(--color-primary)`).

---

### 13. Stats

**Component file:** `src/components/sections/Stats.tsx`
**Data source:** `src/lib/constants.ts` (STATS object)

**Purpose:** A 6-cell horizontal stat bar showing key platform metrics, rendered inside a glass panel with grid texture and corner glows.

**Arabic copy (labels):** مسار تعليمي, درس مقترح, أداة ذكاء اصطناعي, مشروع عملي, مسارات كلاود, منصة عربية متكاملة

**English copy (labels):** Learning Paths, Lessons, AI Tools, Real Projects, Cloud Tracks, Arabic Platform

**Stat values:**
- 12+ Learning Paths / مسار تعليمي
- 100+ Lessons / درس مقترح
- 60+ AI Tools / أداة ذكاء اصطناعي
- 30+ Real Projects / مشروع عملي
- 4 Cloud Tracks / مسارات كلاود
- ∞ Arabic Platform / منصة عربية متكاملة

**CTAs:** None.

**Portal references:** Cloud (implicit, "4 Cloud Tracks").

**Visual treatment:**
- `glass-panel-promax rounded-3xl` container
- CSS grid texture (24px × 24px dot grid, rgba 5%)
- Corner glows: primary top-left, secondary bottom-right (64×64px, blur-3xl)
- 6-cell grid (2 cols → 3 cols → 6 cols)
- Value: `font-display font-bold text-4xl`, colored (primary/secondary/tertiary), text-shadow glow
- Label: `font-mono text-xs uppercase`
- Cell hover: `scale-105`

**Animation / motion:** None (no Framer Motion in this component). CSS `transition` on hover.

**Sub-components:** None.

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as a trust / social proof bar. All 6 stat values and labels must survive and be kept current. Consider making this near the top of the page (after hero) or at bottom as a "numbers" section. Currently positioned inside the WhyDarhous group but rendered separately.

---

### 14. Final CTA

**Component file:** `src/components/landing/sections/FinalCTA.tsx`

**Purpose:** Last content section before community signup. Large centered CTA block with gradient glass panel, two ambient orbs, headline, body copy, and two buttons (register + mentor).

**Arabic copy:**
- Badge: "الآن أو لا تندم لاحقًا"
- Headline: "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ"
- Body: "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — كل ما عليك فعله هو البدء."

**English copy:**
- Badge: "Now or Never"
- Headline: "Start Now…\nEven If You Don't Know Where to Begin"
- Body: "The AI Mentor builds your path, step by step, from zero to mastery — all you need to do is start."

**CTAs:**
- "ابدأ مجانًا الآن" / "Start Free Now" → `/{locale}/register` (primary, ripple ring effect)
- "جرب المرشد الذكي" / "Try AI Mentor" → `/{locale}/mentor` (secondary)

**Stats / proof points:** "مجانًا" / "Free" in CTA button text.

**Portal references:** None explicit.

**Visual treatment:**
- `glass-panel-promax`, `rounded-[2.5rem]`, large (p-10 → p-20)
- Background: 3-stop gradient `(rgba(142,213,255,0.08), rgba(87,27,193,0.12), rgba(60,224,251,0.05))`
- Two absolute ambient orbs: `bg-primary/20 blur-[120px]` top-left, `bg-secondary/20 blur-[100px]` bottom-right (both 30% opacity)
- Primary button uses `MagneticButton` wrapper + `cta-ripple-ring` CSS class
- Headline: `text-3xl → text-6xl`, `text-gradient-premium`

**Animation / motion:**
- `fadeUp` on the outer container via `whileInView`
- `MagneticButton`: magnetic cursor-follow effect on primary CTA (component from `@/components/ui/MagneticButton`)
- `cta-ripple-ring`: CSS keyframe animation, outward expanding ring on the primary button

**Sub-components:** `MagneticButton` from `@/components/ui/MagneticButton`, `Link`, lucide-react (Sparkles, ArrowRight/Left, Zap).

**Preservation decision:** Preserve but rewrite

**Suggested future placement:** Keep as the page's final conversion section (second-to-last, before community signup). The two-CTA (register + mentor) structure is correct. All copy must survive.

---

### 15. Community Signup

**Component file:** `src/components/community/CommunitySignup.tsx`

**Purpose:** Email capture form for the NexaLearn AI Community newsletter. On the homepage it uses `variant="hero"` which shows a full form with email + optional level + optional interest dropdowns. Submits to `/api/community/subscribe`. localStorage-gated for already-joined users.

**Arabic copy:**
- Badge: "مجتمع NexaLearn للذكاء الاصطناعي"
- Headline: "مجتمع NexaLearn للذكاء الاصطناعي"
- Body: "انضم ليصلك أسبوعيًا أفضل أدوات الذكاء الاصطناعي، برومبتات Claude، تريندات Gemini Nano Banana، مشاريع عملية، ومسارات تعلم وتحديثات المنصة."
- Form labels: "البريد الإلكتروني *", "مستواك", "اهتمامك الرئيسي"
- Submit: "انضم الآن"
- Success: "تم تسجيلك بنجاح في مجتمع NexaLearn." / "راقب بريدك للتحديثات القادمة."
- Privacy: "لن نرسل رسائل مزعجة. نستخدم بريدك فقط لتحديثات المنصة والمحتوى التعليمي."

**English copy:**
- Headline: "NexaLearn AI Community"
- Body: "Join to receive weekly AI tools, Claude prompts, Gemini Nano Banana trends, practical projects, learning paths, and platform updates."
- Submit: "Join Now"
- Success: "You have joined the NexaLearn AI Community successfully." / "Watch your inbox for future updates."
- Privacy: "No spam. Your email is used only for platform updates and educational content."

**CTAs:**
- "انضم الآن" / "Join Now" → POST `/api/community/subscribe`

**Stats / proof points:** None. Implies "أسبوعيًا" / "weekly" newsletter cadence.

**Portal references:** Claude, Gemini Nano Banana (mentioned in newsletter description).

**Interest options in dropdown:** AI Tools, Claude Code, Prompt Engineering, Gemini Nano Banana, Cloud, Projects, All Updates

**Visual treatment:**
- `rounded-3xl p-8 md:p-10`
- Background: 3-stop gradient `(rgba(60,224,251,0.08), rgba(142,213,255,0.05), rgba(208,188,255,0.07))`
- Border: `rgba(60,224,251,0.15)`
- Two background glow circles (top-right + bottom-left)
- Input fields: `surface-container` background, `outline-variant` border
- Success state: green `#4ade80` panel with CheckCircle icon

**Animation / motion:** None (no Framer Motion). State-driven form interactions only.

**Sub-components:** lucide-react (Mail, Sparkles, CheckCircle, ChevronDown).

**Preservation decision:** Preserve as-is

**Suggested future placement:** Keep at the very bottom of the homepage above the footer. The email capture form is critical for community building. All form options (level, interest) and all copy must survive.

---

### Bonus: PortalGrid (not currently rendered on homepage)

**Component file:** `src/components/landing/sections/PortalGrid.tsx`

**Purpose:** A simple 4-column grid of `PortalCard` components for all portals (including coming-soon). Uses the same section header copy as ScrollStackSection. This component exists but is NOT imported or rendered in HomepageClient.tsx — it appears to be an older or alternative implementation.

**Preservation decision:** Remove only after explicit owner approval

**Suggested future placement:** Could replace or supplement ScrollStackSection in a redesign. Evaluate as an alternative to the sticky-scroll stack. Currently dead code.

---

## Content Preservation Map

| Section | Component | Preservation Decision | Future Placement |
|---------|-----------|----------------------|-----------------|
| Cinematic Intro | `CinematicIntro.tsx` | Preserve but rewrite | Homepage-only intro overlay |
| Scroll Indicator | `ScrollIndicator.tsx` | Preserve as-is | Homepage chrome (fixed position) |
| Smart Platform Tour | `SmartPlatformTour.tsx` | Preserve but rewrite | Onboarding overlay (trigger from hero) |
| Hero Section | `HeroSection.tsx` | Preserve but rewrite | Above the fold — #1 visible section |
| Marquee Strip (x2) | `MarqueeStrip.tsx` | Preserve but rewrite | Immediately below hero |
| Scroll Stack Section | `ScrollStackSection.tsx` | Preserve but rewrite | Primary portal showcase (mid-page) |
| Premium 3D Carousel | `Premium3DShowcaseCarousel.tsx` | Preserve but move | Below PathSelector or in Tools section |
| Path Selector Quiz | `PathSelector.tsx` | Preserve as-is | Mid-page onboarding funnel |
| Ecosystem Map | `EcosystemMap.tsx` | Preserve but rewrite | Ecosystem overview section |
| Mentor Showcase | `MentorShowcase.tsx` | Preserve but rewrite | Social proof / demo section |
| How It Works | `HowItWorks.tsx` | Preserve but rewrite | Process/journey explanation |
| Why NexaLearn | `WhyDarhous.tsx` | Preserve but rewrite | Differentiators / features grid |
| Stats | `Stats.tsx` | Preserve but rewrite | Trust bar (near top or bottom) |
| Final CTA | `FinalCTA.tsx` | Preserve but rewrite | Last conversion section before footer |
| Community Signup | `CommunitySignup.tsx` | Preserve as-is | Bottom of page above footer |
| Portal Grid (unused) | `PortalGrid.tsx` | Remove only after explicit owner approval | Possible ScrollStack alternative |

---

## Critical Copy That Must Not Be Lost

The following strings are the most irreplaceable and must be explicitly carried into any redesign brief:

**Brand headline (Arabic):** "تعلّم بذكاء. ابنِ مستقبلك مع NexaLearn."
**Brand headline (English):** "Learn Intelligently with NexaLearn."
**Page title (Arabic):** "NexaLearn — تعلّم بذكاء. ابنِ بمهارة. تقدّم بثقة."
**Page title (English):** "NexaLearn by Ahmed Darhous — Learn Smart. Build Skills. Grow With Confidence."
**Platform claim (Arabic):** "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي"
**Platform claim (English):** "The first AI-powered Arabic learning ecosystem"
**FinalCTA headline (Arabic):** "ابدأ الآن… حتى لو لا تعرف من أين تبدأ"
**FinalCTA headline (English):** "Start Now… Even If You Don't Know Where to Begin"
**Mentor chat response (Arabic):** "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة."
**HowItWorks steps:** All 4 step labels and descriptions (both languages) — this is core product education.
**WhyDarhous 8 features:** All 8 tile titles and descriptions (both languages) — unique value proposition copy.
**Stats bar numbers:** 12+, 100+, 60+, 30+, 4, ∞ — must be kept current and must not be fabricated.
**Portal stats from portals.ts:** 902+ questions (Digital Exams), 59 lessons (IoT), 72 projects (IoT), 40 challenges (IoT), 30 automation recipes — these are concrete claims and must not change without data validation.

---

## Known Issues Relevant to Redesign

1. **ScrollStackSection broken on some browsers** — The sticky-scroll visual never worked correctly per the June 2026 audit. Redesign should decide: fix or replace with a different pattern.
2. **CinematicIntro invisible under Reduce Motion** — Users with `prefers-reduced-motion` see a 1.2 s blank screen. The progress bar has no accessible fallback.
3. **PortalGrid is dead code** — `src/components/landing/sections/PortalGrid.tsx` is never imported in HomepageClient. Needs owner decision.
4. **Cloud portal missing from portals.ts** — `src/app/[locale]/cloud/page.tsx` exists but the Cloud portal has no entry in `portals.ts`. It appears only in the 3D Carousel and nav constants. Relevant to Section 7 and any portal count claims.
5. **Stats values may be stale** — The STATS constant (`src/lib/constants.ts`) shows "12+ Learning Paths", "100+ Lessons", "60+ AI Tools", etc. These should be verified against actual content counts before the redesign launches.
