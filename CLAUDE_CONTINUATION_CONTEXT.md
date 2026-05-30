# 🤖 Claude Continuation Context — Darhous AI Cloud Academy

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

- **Status:** MVP + AI Mentor + AI Product Wave — Build passing ✅ (221 static pages)
- **Version:** 1.3.0 (AI Product Wave)
- **Last updated:** 2026-05-29 (after AI Product Wave implementation)
- **Phase:** Phase 1 ✅ + Phase 7 ✅ + Phase 7.5 (AI Studio) ✅ — All Complete

---

## 🏗️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js App Router | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | CSS + Framer Motion | - |
| Icons | Lucide React | 1.x |
| Fonts | Google Fonts (Geist, IBM Plex Sans Arabic, JetBrains Mono) | - |
| Deployment target | Vercel | - |

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (minimal, just imports globals.css)
│   ├── page.tsx                ← Redirects to /ar
│   ├── globals.css             ← ALL styling: CSS vars, glass, glow, animations
│   └── [locale]/              ← Dynamic locale routes (ar, en)
│       ├── layout.tsx          ← Locale layout: Navbar + TopShowcaseBar + Footer
│       ├── page.tsx            ← Home page
│       ├── courses/page.tsx        ← Server component with metadata
│       ├── courses/CoursesClient.tsx ← Client component (useState filter)
│       ├── paths/page.tsx
│       ├── tools/page.tsx          ← Server component with metadata
│       ├── tools/ToolsClient.tsx   ← Client component (useState filter+search)
│       ├── claude/page.tsx
│       ├── cloud/page.tsx
│       ├── projects/page.tsx       ← Server + ProjectsClient.tsx
│       ├── prompts/page.tsx        ← Server + PromptsClient.tsx
│       ├── blog/page.tsx           ← Server + BlogClient.tsx
│       ├── glossary/page.tsx       ← Server + GlossaryClient.tsx
│       ├── about/page.tsx
│       ├── contact/page.tsx
│       └── dashboard/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Sticky glass navbar with mobile menu
│   │   ├── Footer.tsx          ← Footer with links and newsletter
│   │   ├── TopShowcaseBar.tsx  ← Infinite marquee showcase bar
│   │   ├── ThemeToggle.tsx     ← Dark/light toggle (CSS class on <html>)
│   │   └── LanguageToggle.tsx  ← AR/EN switcher (route-based)
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── CopyButton.tsx      ← Client component for clipboard
│   │   └── CategoryFilter.tsx  ← Client filter chips
│   ├── sections/
│   │   ├── Hero.tsx            ← Cinematic hero section
│   │   ├── Stats.tsx           ← Stats grid
│   │   └── CTASection.tsx      ← Final call-to-action
│   ├── cards/
│   │   ├── CourseCard.tsx
│   │   ├── ToolCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── PromptCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── GlossaryCard.tsx
│   ├── roadmap/
│   │   └── RoadmapTimeline.tsx ← Animated roadmap with nodes
│   └── visual/
│       └── HeroDashboardPreview.tsx ← Floating terminal animation
├── data/                       ← ALL content data (no database needed)
│   ├── courses.ts              ← 18 courses
│   ├── tools.ts                ← 40+ tools + stacks
│   ├── projects.ts             ← 14 projects
│   ├── prompts.ts              ← 25 prompts
│   ├── glossary.ts             ← 40 terms
│   ├── blog.ts                 ← 12 posts
│   ├── roadmaps.ts             ← 6 learning paths
│   ├── showcase.ts             ← 21 showcase bar items
│   └── mentor.ts               ← AI Mentor: 6 modes with system prompts + suggestions (IDs: ask, prompt, claude_code, path, tools, project)
├── hooks/
│   ├── useLocalFavorites.ts    ← Favorites for tools/courses/prompts/projects (localStorage)
│   └── useSavedPrompts.ts      ← Save AI-generated prompts to localStorage (key: saved_generated_prompts)
└── components/
    ├── prompt-studio/
    │   └── PromptStudioClient.tsx      ← Prompt Studio page client
    ├── claude-generator/
    │   └── ClaudeCodeGeneratorClient.tsx ← Claude Code prompt generator
    ├── tool-recommender/
    │   └── ToolRecommenderClient.tsx   ← Tool recommender (local filter + optional AI)
    └── roadmap-generator/
        └── RoadmapGeneratorClient.tsx  ← AI Roadmap generator
├── messages/
│   ├── ar.json                 ← Arabic translations (includes mentor.* keys)
│   └── en.json                 ← English translations (includes mentor.* keys)
└── lib/
    ├── utils.ts                ← cn(), getDir(), isRTL()
    ├── constants.ts            ← Site name, nav links, stats
    ├── i18n.ts                 ← getMessages(), t(), locales
    ├── gemini.ts               ← SERVER-ONLY Gemini API client (callGemini)
    └── mentor-context.ts       ← Shared types: MentorMessage, MentorApiRequest/Response, helpers
```

---

## 🎨 Design System

### Colors (CSS Variables in globals.css)
```
Dark mode:  primary=#8ed5ff, secondary=#d0bcff, tertiary=#3ce0fb
            background=#0c0e12, surface=#111318
Light mode: primary=#0284c7, secondary=#6366f1, tertiary=#06b6d4
            background=#f8fafc
```

### CSS Classes Used (in globals.css)
- `.glass-panel` — Semi-transparent glass with blur
- `.glass-card` — Darker glass for cards
- `.glow-button-primary` — Electric blue glow button
- `.glow-button-secondary` — Violet ghost button
- `.glow-hover` — Hover glow effect
- `.gradient-text` — Blue-cyan gradient text
- `.bg-grid-overlay` — Grid background texture
- `.env-orb-blue/violet/cyan` — Environmental glow orbs
- `.marquee-track / .marquee-track-rtl` — Infinite scroll animation
- `.roadmap-node-active` — Pulsing active node
- `.animate-float-slow/fast` — Floating animation
- `.animate-pulse-glow` — Glowing pulse
- `.animate-fade-in-up` — Reveal animation
- `.filter-chip-active` — Active filter state
- `.container-xl` — Max-width container
- `.dir-ltr` — Force LTR inside RTL

---

## 🌍 Language System

- **Routing:** `/{locale}/{page}` — `/ar/courses`, `/en/tools`, etc.
- **Detection:** URL-based only (no browser detection)
- **Default redirect:** `/` → `/ar`
- **Direction:** Set via `dir={getDir(locale)}` on `<html>` and `<body>`
- **Font switching:** Body font changes to `IBM Plex Sans Arabic` for RTL
- **Toggle:** `LanguageToggle.tsx` replaces `/ar/` with `/en/` in pathname
- **Translations:** `src/messages/ar.json` and `src/messages/en.json`
- **Usage:** `const msgs = getMessages(locale)` then `msgs.nav.home`

---

## 🎭 Theme System

- **Implementation:** CSS class on `<html>` element (`dark` or `light`)
- **Toggle:** `ThemeToggle.tsx` — adds/removes `light` class, saves to localStorage
- **CSS:** All colors are CSS custom properties in `:root`, overridden by `html.light`
- **Default:** Dark mode (no class needed for dark)
- **Persistence:** localStorage key `"theme"`

---

## 📝 Content Architecture

### Adding a Course
```typescript
// src/data/courses.ts
{
  id: "unique-id",
  titleAr: "العنوان بالعربي",
  titleEn: "English Title",
  descriptionAr: "...",
  descriptionEn: "...",
  level: "beginner" | "intermediate" | "advanced",
  lessons: 20,
  hours: 15,
  projects: 3,
  skills: ["Skill1", "Skill2"],
  category: "AI",
  icon: "🤖",
  featured: true,
  color: "blue",
}
```

### Adding a Tool
Same pattern in `src/data/tools.ts` following the `Tool` interface.

### Adding a Prompt
Same pattern in `src/data/prompts.ts` following the `Prompt` interface.

### Adding a Blog Post
Same pattern in `src/data/blog.ts` following the `BlogPost` interface.

### Adding a New Page
1. Create `src/app/[locale]/newpage/page.tsx`
2. Add links in `src/components/layout/Navbar.tsx` navItems
3. Add translation keys in `ar.json` and `en.json`

---

## 🆕 New Routes (v1.3.0 — AI Product Wave)

| Route | Description |
|-------|-------------|
| `/[locale]/prompt-studio` | Prompt Studio — AI prompt improvement |
| `/[locale]/claude-code-generator` | Claude Code prompt generator |
| `/[locale]/tool-recommender` | Tool recommender (local filter + AI) |
| `/[locale]/roadmap-generator` | AI-personalized learning roadmap generator |

## 🆕 New Features (v1.3.0)

### AI Product Experience
- **Prompt Studio** — improves prompts via AI using mode="prompt"
- **Claude Code Generator** — builds full Claude Code prompts via mode="claude_code"
- **Tool Recommender** — local filter from tools.ts (no AI required) + optional AI explanation
- **Roadmap Generator** — personalized learning plan via mode="path"
- **Ask This Page** — button on all detail pages (course/tool/project/blog), stores context in sessionStorage → redirects to /mentor
- **Saved Prompts** — `useSavedPrompts` hook saves AI-generated content to localStorage key `saved_generated_prompts`

### Mentor UX Improvements
- Cooldown: 3 seconds between messages (prevents API spam)
- Char limit: 4000 chars max per message with counter shown at 3000+
- Security notice in chat footer
- `initialMessage` prop on MentorChat for pre-filling from page context
- Context banner in MentorPageClient when coming from "Ask This Page"

### Navigation & Discovery
- Footer: new "AI Studio" column with all new tools
- CommandPalette (⌘K): page navigation items added at top of results
- TopShowcaseBar: 4 new items (Prompt Studio, Claude Code Generator, Tool Recommender, Roadmap Generator)
- Home page: new "Darhous AI Mentor" promotion section with AI Studio grid

### API Protection
- Message length validation (max 4000 chars server-side)
- History depth limit (max 20 messages)
- Mode validation (only valid MentorModeId values accepted)
- Rate limit 429 error handled gracefully

## ⚠️ Important Warnings

1. **NEVER commit API keys or secrets** — use .env.local (already in .gitignore)
2. **Tailwind v4** — uses CSS-based config, not tailwind.config.js for colors
3. **Locale layout** — the `[locale]/layout.tsx` renders `<html>` and `<body>`, so root layout.tsx is minimal
4. **Client components** — pages with `useState` need `"use client"` directive
5. **Lucide-react v1** — some icons renamed (no `Github`, `Twitter`, `Linkedin` — use `GitBranch`, `Link2`)
6. **GEMINI_API_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Must stay server-only in `src/lib/gemini.ts` and `src/app/api/mentor/route.ts` only
7. **MentorFloatingButton** — imported in `[locale]/layout.tsx` as a Client Component (uses `usePathname`)
8. **MentorChat key** — `key={chatKey}` on MentorChat in MentorPageClient causes full remount on mode change (intentional)
9. **useSavedPrompts** — client-only hook, only import in "use client" components
10. **AskThisPageButton** — client component that uses sessionStorage + router.push, safe to import in Server Component pages (Next.js handles it)

## 🔮 Recommended Next Tasks

### Phase 2: Enhanced Content
- [ ] Add MDX support for blog posts (full content)
- [ ] Add more prompts (target: 100+)

### Phase 3: Authentication + Backend
- [ ] Add Supabase for auth (replace localStorage with DB)
- [ ] Student registration/login
- [ ] Save progress server-side
- [ ] Migrate saved prompts from localStorage → Supabase

### Phase 4: Dashboard
- [ ] Build actual student dashboard
- [ ] Progress tracking
- [ ] Certificates (React-PDF)

---

## ⚠️ Important Warnings

1. **NEVER commit API keys or secrets** — use .env.local (already in .gitignore)
2. **Tailwind v4** — uses CSS-based config, not tailwind.config.js for colors
3. **Locale layout** — the `[locale]/layout.tsx` renders `<html>` and `<body>`, so root layout.tsx is minimal
4. **Client components** — pages with `useState` need `"use client"` directive
5. **Lucide-react v1** — some icons renamed (no `Github`, `Twitter`, `Linkedin` — use `GitBranch`, `Link2`)
6. **GEMINI_API_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Must stay server-only in `src/lib/gemini.ts` and `src/app/api/mentor/route.ts` only
7. **MentorFloatingButton** — imported in `[locale]/layout.tsx` as a Client Component (uses `usePathname`)
8. **MentorChat key** — `key={activeMode}` on MentorChat in MentorPageClient causes full remount on mode change (intentional, resets conversation)

---

## 🚀 Continuation Prompts

Use these exact prompts to continue development:

**Add Supabase backend:**
```
Continue the Darhous AI Cloud Academy project at C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy. Read CLAUDE_CONTINUATION_CONTEXT.md first. Add Supabase authentication with user registration, login, and session management. Create a proper student dashboard that tracks course progress.
```

**Add search:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md. Add a global search feature using Fuse.js that searches across courses, tools, projects, prompts, and blog posts. Wire it to the ⌘K shortcut in Navbar.tsx.
```

**Add MDX blog:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md. Add MDX support for blog posts so each post in src/data/blog.ts can have a corresponding .mdx file with full content. Create a blog/[id]/page.tsx that renders the MDX.
```
