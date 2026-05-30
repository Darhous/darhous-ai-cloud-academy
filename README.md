# أكاديمية درهوس للذكاء الاصطناعي والكلاود
## Darhous AI Cloud Academy

A bilingual (Arabic/English) AI and Cloud learning platform built with Next.js 16, TypeScript, and Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Animation | Framer Motion |
| Icons | Lucide React v1 |
| AI Mentor | Google Gemini API (server-side only) |
| Deployment | Vercel |

---

## Features

- **Bilingual** — Full Arabic (RTL) and English (LTR) support
- **Dark / Light mode** — CSS variable system, persisted in localStorage
- **221 static pages** — SSG via Next.js App Router
- **AI Mentor** — Powered by Gemini 2.5 Flash, 6 specialized modes, with UX polish and API protection
- **AI Studio** — 4 standalone AI tools (Prompt Studio, Claude Code Generator, Tool Recommender, Roadmap Generator)
- **Ask This Page** — Every detail page (course/tool/project/blog) links to AI Mentor with context
- **Saved Prompts** — localStorage-based, saves AI-generated prompts from all Studio tools
- **Command Palette** — Ctrl+K / Cmd+K global search across all content + page shortcuts
- **Favorites** — localStorage-based, works without login

### Pages
Home, Courses (18), Learning Paths (6), AI Tools Hub (40+), Claude Mastery, Cloud Academy, Projects (14), Prompt Library (25), Blog (12), Glossary (40 terms), About, Contact, Dashboard, **AI Mentor**, **Prompt Studio**, **Claude Code Generator**, **Tool Recommender**, **AI Roadmap Generator**

### AI Studio Tools
| Tool | Route | Purpose |
|---|---|---|
| AI Mentor ✨ | `/[locale]/mentor` | 6-mode chat assistant |
| Prompt Studio ⚡ | `/[locale]/prompt-studio` | Improve any prompt with AI |
| Claude Code Generator 🛠️ | `/[locale]/claude-code-generator` | Build full Claude Code prompts |
| Tool Recommender 🔎 | `/[locale]/tool-recommender` | Find the right AI tool for your goal |
| Roadmap Generator 🗺️ | `/[locale]/roadmap-generator` | AI-personalized learning plans |
| Saved Items 📂 | `/[locale]/dashboard` | All saved prompts + favorites |

### AI Mentor Modes
| Mode | Purpose |
|---|---|
| Ask the Academy 🎓 | Q&A about AI, Cloud, tools, courses |
| Prompt Optimizer ⚡ | Transform weak prompts into professional ones |
| Claude Code Builder 🛠️ | Generate Claude Code prompts |
| Learning Path Planner 🗺️ | Personalized learning plans |
| Tool Finder 🔎 | Recommend tools from AI Hub |
| Project Builder 🏗️ | Turn ideas into full AI projects |

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
copy .env.example .env.local
# Then edit .env.local and add your GEMINI_API_KEY

# Start development server
npm run dev
```

Open:
- Arabic: http://localhost:3000/ar
- English: http://localhost:3000/en
- AI Mentor: http://localhost:3000/ar/mentor
- Prompt Studio: http://localhost:3000/ar/prompt-studio
- Claude Code Generator: http://localhost:3000/ar/claude-code-generator
- Tool Recommender: http://localhost:3000/ar/tool-recommender
- Roadmap Generator: http://localhost:3000/ar/roadmap-generator

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes (for AI Mentor) | Google Gemini API key |
| `GEMINI_MODEL` | No | Defaults to `gemini-2.5-flash` |

Get your API key at: https://aistudio.google.com/app/apikey

> **Security:** `GEMINI_API_KEY` is server-only. Never prefix with `NEXT_PUBLIC_`.

---

## Project Structure

```
src/
├── app/
│   ├── api/mentor/route.ts          ← AI Mentor API (server-side, protected)
│   ├── [locale]/
│   │   ├── mentor/                  ← AI Mentor page
│   │   ├── prompt-studio/           ← Prompt Studio page
│   │   ├── claude-code-generator/   ← Claude Code Generator page
│   │   ├── tool-recommender/        ← Tool Recommender page
│   │   └── roadmap-generator/       ← Roadmap Generator page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── mentor/                      ← 8 AI Mentor components
│   ├── prompt-studio/               ← PromptStudioClient
│   ├── claude-generator/            ← ClaudeCodeGeneratorClient
│   ├── tool-recommender/            ← ToolRecommenderClient
│   ├── roadmap-generator/           ← RoadmapGeneratorClient
│   ├── layout/                      ← Navbar, Footer, TopShowcaseBar
│   ├── cards/                       ← CourseCard, ToolCard, etc.
│   ├── ui/                          ← Button, Badge, AskThisPageButton
│   └── features/                    ← CommandPalette, Favorites, SavedPromptsPanel
├── data/                            ← All content (no database)
│   └── mentor.ts                    ← AI Mentor modes + system prompts
├── hooks/
│   ├── useLocalFavorites.ts         ← Favorites (tools/courses/prompts/projects)
│   └── useSavedPrompts.ts           ← AI-generated prompt storage
├── lib/
│   ├── gemini.ts                    ← Server-only Gemini client
│   └── mentor-context.ts            ← Shared types and helpers
└── messages/
    ├── ar.json
    └── en.json
```

---

## Deploy to Vercel

1. Push to GitHub (see `GITHUB_RELEASE_GUIDE.md`)
2. Import repo at [vercel.com](https://vercel.com)
3. Add `GEMINI_API_KEY` in Vercel Settings → Environment Variables
4. Deploy

See `DEPLOYMENT_GUIDE.md` for full instructions.

---

## Documentation

| File | Contents |
|---|---|
| `CLAUDE_CONTINUATION_CONTEXT.md` | Full context for AI-assisted development |
| `DEVELOPMENT_GUIDE.md` | Setup, commands, code style |
| `CONTENT_ARCHITECTURE.md` | Data schemas for all content types |
| `DEPLOYMENT_GUIDE.md` | Vercel deployment + env vars |
| `FUTURE_ROADMAP.md` | Planned phases and features |
| `GITHUB_RELEASE_GUIDE.md` | First push to GitHub |
