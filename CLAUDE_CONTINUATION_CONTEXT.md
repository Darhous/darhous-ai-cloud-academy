# 🤖 Claude Continuation Context — Darhous AI Cloud Academy

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 1.4.0 — Polish & Production Wave |
| **Status** | ✅ Live on Vercel |
| **Build** | ✅ Passing — 225 static pages, 0 TypeScript errors |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Branch** | `main` |
| **Last Commit** | feat: v1.4.0 polish — carousel, privacy/terms, UI fixes |
| **Last Updated** | 2026-05-30 |

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise in Next.js 16 |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | |
| Icons | Lucide React v1 | Some icons renamed vs older versions |
| Search | Fuse.js 7 | Already installed, used in CommandPalette |
| AI | Google Gemini API | gemini-2.5-flash, server-side only |
| Fonts | Geist, IBM Plex Sans Arabic, JetBrains Mono | Via Google Fonts |
| Deployment | Vercel | Free Hobby plan |

---

## 📁 Complete Folder Structure

```
C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\
├── .env.local                  ← LOCAL ONLY — never committed (.gitignore: .env*)
├── .env.example                ← Placeholders only — safe to commit
├── .gitignore                  ← Covers .env*, node_modules, .next, out, build
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx                      ← Root layout (minimal)
│   │   ├── page.tsx                        ← Redirects / → /ar
│   │   ├── globals.css                     ← ALL styling: CSS vars, glass, glow, animations
│   │   ├── sitemap.ts                      ← Auto-generates /sitemap.xml (221 URLs)
│   │   ├── robots.ts                       ← Blocks /api/ from crawlers
│   │   ├── api/
│   │   │   └── mentor/
│   │   │       └── route.ts               ← SERVER-ONLY Gemini API route (Dynamic ƒ)
│   │   └── [locale]/                      ← Routes for ar and en
│   │       ├── layout.tsx                 ← Locale layout: Navbar + TopShowcaseBar + Footer + MentorFloatingButton
│   │       ├── page.tsx                   ← Home page (with AI Mentor promo section)
│   │       ├── about/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── dashboard/page.tsx         ← Coming Soon + MySpacePanel + SavedPromptsPanel
│   │       ├── courses/
│   │       │   ├── page.tsx + CoursesClient.tsx
│   │       │   └── [slug]/page.tsx        ← Course detail + AskThisPageButton
│   │       ├── tools/
│   │       │   ├── page.tsx + ToolsClient.tsx
│   │       │   └── [slug]/page.tsx        ← Tool detail + AskThisPageButton
│   │       ├── projects/
│   │       │   ├── page.tsx + ProjectsClient.tsx
│   │       │   └── [slug]/page.tsx        ← Project detail + AskThisPageButton
│   │       ├── blog/
│   │       │   ├── page.tsx + BlogClient.tsx
│   │       │   └── [slug]/page.tsx        ← Blog post + AskThisPageButton
│   │       ├── paths/page.tsx
│   │       ├── claude/page.tsx            ← Claude Mastery hub
│   │       ├── cloud/page.tsx             ← Cloud Academy hub
│   │       ├── prompts/page.tsx + PromptsClient.tsx
│   │       ├── glossary/page.tsx + GlossaryClient.tsx
│   │       ├── mentor/
│   │       │   ├── page.tsx               ← Server: metadata
│   │       │   └── MentorPageClient.tsx   ← Client: mode selector + context banner
│   │       ├── prompt-studio/page.tsx             ← AI Prompt Improver
│   │       ├── claude-code-generator/page.tsx     ← Claude Code Prompt Builder
│   │       ├── tool-recommender/page.tsx          ← AI Tool Finder
│   │       └── roadmap-generator/page.tsx         ← AI Learning Plan Generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← Sticky glass, mobile menu, 9 nav items
│   │   │   ├── Footer.tsx          ← 5 columns: Brand, Quick Links, Resources, AI Studio, Community
│   │   │   ├── TopShowcaseBar.tsx  ← Infinite marquee (25 items)
│   │   │   ├── ThemeToggle.tsx     ← Dark/light via html.light class
│   │   │   └── LanguageToggle.tsx  ← Route-based AR/EN switcher
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── CopyButton.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── AnimateIn.tsx
│   │   │   └── AskThisPageButton.tsx   ← "Ask AI about this page" button (sessionStorage → /mentor)
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Stats.tsx
│   │   │   └── CTASection.tsx
│   │   ├── cards/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── PromptCard.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   └── GlossaryCard.tsx
│   │   ├── features/
│   │   │   ├── CommandPalette.tsx       ← Ctrl+K search (Fuse.js) + page shortcuts
│   │   │   ├── CommandPaletteProvider.tsx
│   │   │   ├── FavoriteButton.tsx
│   │   │   ├── MySpacePanel.tsx         ← Shows saved favorites from localStorage
│   │   │   ├── SavedPromptsPanel.tsx    ← Shows AI-generated saved prompts
│   │   │   └── QuizSection.tsx
│   │   ├── mentor/
│   │   │   ├── MentorChat.tsx           ← Main chat UI (cooldown 3s, max 4000 chars)
│   │   │   ├── MentorHero.tsx
│   │   │   ├── MentorModeSelector.tsx
│   │   │   ├── MentorMessage.tsx
│   │   │   ├── MentorSuggestionCards.tsx
│   │   │   ├── MentorFloatingButton.tsx ← Fixed button on all pages (hides on /mentor)
│   │   │   ├── MentorResponseActions.tsx
│   │   │   └── ApiKeyMissingState.tsx
│   │   ├── prompt-studio/
│   │   │   └── PromptStudioClient.tsx
│   │   ├── claude-generator/
│   │   │   └── ClaudeCodeGeneratorClient.tsx
│   │   ├── tool-recommender/
│   │   │   └── ToolRecommenderClient.tsx
│   │   ├── roadmap-generator/
│   │   │   └── RoadmapGeneratorClient.tsx
│   │   ├── roadmap/
│   │   │   └── RoadmapTimeline.tsx
│   │   └── visual/
│   │       └── HeroDashboardPreview.tsx
│   ├── data/                           ← ALL content — no database
│   │   ├── courses.ts                  ← 18 courses with full detail fields
│   │   ├── tools.ts                    ← 40+ tools (Tool interface)
│   │   ├── projects.ts                 ← 14 projects
│   │   ├── prompts.ts                  ← 25 prompts
│   │   ├── glossary.ts                 ← 40 terms
│   │   ├── blog.ts                     ← 12 posts
│   │   ├── roadmaps.ts                 ← 6 learning paths
│   │   ├── showcase.ts                 ← 25 showcase bar items
│   │   └── mentor.ts                   ← 6 modes: ask, prompt, claude_code, path, tools, project
│   ├── hooks/
│   │   ├── useLocalFavorites.ts        ← Favorites: tools/courses/prompts/projects (localStorage)
│   │   └── useSavedPrompts.ts          ← AI-generated prompts (localStorage key: saved_generated_prompts, max 50)
│   ├── lib/
│   │   ├── utils.ts                    ← cn(), getDir(), isRTL()
│   │   ├── constants.ts                ← SITE_NAME, NAV_LINKS, STATS
│   │   ├── i18n.ts                     ← getMessages(locale), t(locale, key)
│   │   ├── gemini.ts                   ← SERVER-ONLY callGemini() — never import in client components
│   │   └── mentor-context.ts           ← Shared types: MentorMessage, MentorApiRequest/Response
│   └── messages/
│       ├── ar.json                     ← Arabic translations
│       └── en.json                     ← English translations
```

---

## 🌐 All Routes

### Static Pages (× 2 locales = ar + en each)

| Route | Description |
|-------|-------------|
| `/[locale]` | Home page with AI Mentor promo |
| `/[locale]/courses` | 18 courses with filter |
| `/[locale]/paths` | 6 learning paths |
| `/[locale]/tools` | 40+ AI tools with filter + search |
| `/[locale]/claude` | Claude Mastery hub |
| `/[locale]/cloud` | Cloud Academy hub |
| `/[locale]/projects` | 14 projects |
| `/[locale]/prompts` | 25 prompts library |
| `/[locale]/blog` | 12 blog posts |
| `/[locale]/glossary` | 40 terms |
| `/[locale]/about` | About page |
| `/[locale]/contact` | Contact page |
| `/[locale]/dashboard` | Coming Soon + Saved Items |
| `/[locale]/mentor` | AI Mentor — 6 modes |
| `/[locale]/prompt-studio` | Prompt Studio |
| `/[locale]/claude-code-generator` | Claude Code Generator |
| `/[locale]/tool-recommender` | Tool Recommender |
| `/[locale]/roadmap-generator` | Roadmap Generator |

### Dynamic Detail Pages (SSG)
- `/[locale]/courses/[slug]` — 18 × 2 = 36 pages
- `/[locale]/tools/[slug]` — 40+ × 2 = 80+ pages
- `/[locale]/projects/[slug]` — 14 × 2 = 28 pages
- `/[locale]/blog/[slug]` — 12 × 2 = 24 pages

### API Routes (Dynamic — server-side)
- `POST /api/mentor` — Gemini AI, protected, server-only

---

## 🤖 AI Mentor System

### Architecture
```
Client (MentorChat) → POST /api/mentor → route.ts → gemini.ts → Gemini API
```

### 6 Modes (src/data/mentor.ts)
| ID | Label AR | Label EN | Icon |
|----|---------|---------|------|
| `ask` | اسأل المنصة | Ask the Academy | 🎓 |
| `prompt` | تحسين البرومبت | Prompt Optimizer | ⚡ |
| `claude_code` | مولّد برومبت Claude Code | Claude Code Builder | 🛠️ |
| `path` | مخطط التعلم | Learning Path Planner | 🗺️ |
| `tools` | مرشّح الأدوات | Tool Finder | 🔎 |
| `project` | مولّد المشاريع | Project Builder | 🏗️ |

### API Protection (/api/mentor/route.ts)
- Max message length: **4000 chars** (validated server-side)
- Max history depth: **20 messages**
- Mode validation: only valid `MentorModeId` values accepted
- Rate limit 429: handled gracefully
- No stack traces in error responses
- API key redacted from logs

### Client-side Protection (MentorChat.tsx)
- Cooldown: **3 seconds** between sends
- Char limit: **4000 chars** with counter shown at 3000+
- Security notice in footer
- `initialMessage` prop for pre-filling from Ask This Page

---

## 🎨 Design System

### CSS Variables (globals.css)
```css
/* Dark mode (default) */
--color-primary: #8ed5ff
--color-secondary: #d0bcff
--color-tertiary: #3ce0fb
--color-background: #0c0e12
--color-surface: #111318
--color-surface-container: rgba(255,255,255,0.04)
--color-on-surface: #e8eaf0
--color-on-surface-variant: #9aa3b8

/* Light mode (html.light class) */
--color-primary: #0284c7
--color-secondary: #6366f1
--color-tertiary: #06b6d4
--color-background: #f8fafc
```

### Key CSS Classes
| Class | Purpose |
|-------|---------|
| `.glass-panel` | Semi-transparent glass with blur |
| `.glass-card` | Darker glass for cards |
| `.glow-button-primary` | Electric blue glow button |
| `.glow-button-secondary` | Violet ghost button |
| `.gradient-text` | Blue-cyan gradient text |
| `.container-xl` | Max-width container with padding |
| `.bg-grid-overlay` | Grid background texture |
| `.env-orb-blue/violet/cyan` | Ambient glow orbs |
| `.marquee-track / .marquee-track-rtl` | Infinite scroll animation |

---

## 🌍 Language & Direction System

- **Routing:** `/{locale}/{page}` — e.g. `/ar/courses`, `/en/tools`
- **Default:** `/` → redirects to `/ar`
- **Locales:** `ar` (RTL) and `en` (LTR)
- **Direction:** `dir={getDir(locale)}` on `<html>` and `<body>` in `[locale]/layout.tsx`
- **Font:** Arabic uses `IBM Plex Sans Arabic`, English uses `Geist`
- **Toggle:** `LanguageToggle.tsx` replaces `/ar/` ↔ `/en/` in pathname
- **Translations:** `getMessages(locale)` → `src/messages/ar.json` or `en.json`

---

## 🎭 Theme System

- **Default:** Dark mode (no class = dark)
- **Light mode:** Add `light` class to `<html>`
- **Toggle:** `ThemeToggle.tsx` → adds/removes `light` class → saves to `localStorage("theme")`
- **CSS:** All colors via CSS custom properties in `:root`, overridden by `html.light { ... }`

---

## 💾 localStorage Keys

| Key | Hook | Purpose |
|-----|------|---------|
| `theme` | ThemeToggle | `"light"` or absent (dark) |
| `fav_tools` | useLocalFavorites | Array of tool IDs |
| `fav_courses` | useLocalFavorites | Array of course IDs |
| `fav_prompts` | useLocalFavorites | Array of prompt IDs |
| `fav_projects` | useLocalFavorites | Array of project IDs |
| `saved_generated_prompts` | useSavedPrompts | Array of `SavedPrompt` objects (max 50) |

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---------|---------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes (for AI features) | — | Google Gemini API key from aistudio.google.com |
| `GEMINI_MODEL` | ❌ No | `gemini-2.5-flash` | Gemini model to use |

### Where to get API key
https://aistudio.google.com/app/apikey

### Rules (CRITICAL)
- ❌ **NEVER use `NEXT_PUBLIC_GEMINI_API_KEY`** — exposes key to browser
- ❌ **NEVER commit `.env.local`** — protected by `.gitignore`
- ✅ `GEMINI_API_KEY` is ONLY read in `src/lib/gemini.ts` and `src/app/api/mentor/route.ts`
- ✅ No client component ever imports `gemini.ts`

---

## 🔒 Security Status

| Check | Status |
|-------|--------|
| Real API key in source code | ❌ Not found |
| `NEXT_PUBLIC_GEMINI` anywhere | ❌ Not found |
| `AIzaSy` prefix in any file | ❌ Not found |
| `.env.local` committed | ❌ Not committed (gitignored) |
| `.env.example` has real key | ❌ Placeholders only |
| `GEMINI_API_KEY` server-only | ✅ gemini.ts + route.ts only |
| Stack traces in API responses | ❌ Redacted |
| API key in git history | ❌ Never committed |

---

## 🚀 Deployment

### GitHub
- **Repo:** https://github.com/Darhous/darhous-ai-cloud-academy
- **Branch:** `main`
- **Visibility:** Public
- **Last commit:** `9509202`

### Vercel
- **URL:** https://darhous-ai-cloud-academy.vercel.app
- **Plan:** Free (Hobby)
- **Auto-deploy:** Every `git push origin main` triggers redeploy

### How to update after any change
```powershell
cd "C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
git add .
git commit -m "describe the change"
git push
# Vercel redeploys automatically in ~2 minutes
```

---

## ⚠️ Critical Warnings

1. **Tailwind v4** — CSS-based config. Never add a `tailwind.config.js` for colors — use `globals.css` CSS variables only.
2. **Next.js 16 params** — `params` is a `Promise`. Always `await params` before using: `const { locale } = await params`
3. **Lucide React v1** — Some icons renamed. Use `GitBranch` not `Github`, `Link2` not `Linkedin`.
4. **Locale layout** — `[locale]/layout.tsx` renders `<html>` and `<body>`. Root `layout.tsx` is minimal.
5. **Client components** — Any component using `useState`, `useEffect`, `useRouter`, `usePathname` needs `"use client"` at top.
6. **MentorFloatingButton** — Must be a Client Component (uses `usePathname`). Imported in `[locale]/layout.tsx`.
7. **MentorChat remount** — `key={chatKey}` causes full remount on mode change. This is intentional — resets conversation.
8. **useSavedPrompts** — Client-only. Only import in `"use client"` components.
9. **AskThisPageButton** — Client component using `sessionStorage` + `router.push`. Safe to import in Server Component pages.
10. **API route is Dynamic (ƒ)** — `/api/mentor` is NOT static. Vercel handles it as a serverless function.

---

## 📝 Content Architecture

### Adding a Course
```typescript
// src/data/courses.ts — follow the Course interface
{
  id: "unique-id",
  titleAr: "العنوان بالعربي",
  titleEn: "English Title",
  descriptionAr: "...", descriptionEn: "...",
  level: "beginner" | "intermediate" | "advanced",
  lessons: 20, hours: 15, projects: 3,
  skills: ["Skill1"], category: "AI", icon: "🤖", featured: true,
  // Optional detail fields:
  overviewAr: "...", overviewEn: "...",
  whatYouLearnAr: [...], whatYouLearnEn: [...],
  forWhoAr: [...], forWhoEn: [...],
  lessonOutline: [{ titleAr, titleEn, duration, type }],
  quiz: [{ questionAr, questionEn, options, correctIndex, explanationAr, explanationEn }],
  relatedProjects: ["project-id"], relatedCourses: ["course-id"],
}
```

### Adding a New Page
1. Create `src/app/[locale]/newpage/page.tsx` (server component with `generateMetadata`)
2. Create client component if needed: `src/components/newpage/NewPageClient.tsx`
3. Add route to `src/app/sitemap.ts` staticPages array
4. Add link to `src/components/layout/Navbar.tsx` navItems (optional)
5. Add link to `src/components/layout/Footer.tsx` (optional)
6. Add to `src/components/features/CommandPalette.tsx` buildPageItems() (optional)
7. Add to `src/data/showcase.ts` (optional)

---

## ✅ v1.4.0 Changes (Polish & Production Wave — 2026-05-30)

### New Components
- `src/components/layout/FeaturedShowcaseCarousel.tsx` — Large interactive carousel replacing TopShowcaseBar
  - 10 cards: Mentor, Prompt Studio, Claude Code Gen, Tool Recommender, Roadmap Gen, Claude, Tools, Cloud, Projects, Prompts
  - Auto-play (5s), pause on hover, arrows, dots navigation, swipe on mobile
  - Responsive: 3 cards desktop / 2 tablet / 1 mobile
  - Full RTL/LTR + Dark/Light support

### New Pages
- `src/app/[locale]/privacy/page.tsx` — Privacy policy (AR + EN)
- `src/app/[locale]/terms/page.tsx` — Terms of service (AR + EN)

### Bug Fixes
- **Navbar**: زر "تسجيل الدخول" → "لوحة الطالب" badge "قريبًا" (links to /dashboard)
- **Footer**: روابط Privacy/Terms تذهب لصفحات حقيقية `/privacy` و `/terms` بدلاً من `/about`
- **Sitemap**: أضيف `/privacy` و `/terms` — إجمالي 225 صفحة

### Improvements
- Prompt Studio: Prompt Quality Checklist (5 criteria: Role, Context, Constraints, Format, Validation)
- Roadmap Generator: Timeline visual header + improved result display

---

## 🔮 Recommended Next Tasks

### Phase 2: Content Depth
- [ ] MDX support for blog posts (full article content)
- [ ] More prompts (target: 100+)
- [ ] More tools (target: 60+)
- [ ] Video embed support for lessons

### Phase 3: Authentication (Supabase)
- [ ] Supabase Auth (email + GitHub OAuth)
- [ ] User profiles
- [ ] Migrate localStorage favorites → Supabase DB
- [ ] Migrate saved prompts → Supabase DB

### Phase 4: Real Dashboard
- [ ] Course progress tracking (lesson completion)
- [ ] Learning streak counter
- [ ] Skill map visualization
- [ ] Certificate generation (React-PDF)

### Phase 5: AI Enhancements
- [ ] Context-aware mentor (links from course pages with pre-filled questions — partially done via Ask This Page)
- [ ] Streaming responses (ReadableStream SSE)
- [ ] RAG over platform content

---

## 💬 Continuation Prompts

**Continue development:**
```
Continue the Darhous AI Cloud Academy project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md first before any changes.
Current version: 1.4.0 — Build: ✅ 225 pages — Deployed: https://darhous-ai-cloud-academy.vercel.app
```

**Add Supabase backend:**
```
Continue Darhous AI Cloud Academy at C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy.
Read CLAUDE_CONTINUATION_CONTEXT.md first.
Add Supabase authentication with user registration, login, and session management.
Create a proper student dashboard that tracks course progress.
```

**Add MDX blog:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md first.
Add MDX support for blog posts so each post in src/data/blog.ts has a .mdx file with full content.
Create blog/[slug]/page.tsx that renders the MDX.
```

**Add more content:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md first.
Add 15 new prompts to src/data/prompts.ts following the existing Prompt interface.
Add 10 new AI tools to src/data/tools.ts following the existing Tool interface.
Do not change any UI or architecture.
```
