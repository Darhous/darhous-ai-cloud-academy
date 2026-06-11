# 🗺️ Future Roadmap — Darhous AI Cloud Academy

## Phase 1: Static MVP ✅ (COMPLETE)
**Status:** Done | **Timeline:** Week 1

- [x] Next.js App Router project
- [x] Bilingual Arabic/English (RTL/LTR)
- [x] Dark/Light mode
- [x] 13 pages (Home, Courses, Paths, Tools, Claude, Cloud, Projects, Prompts, Blog, Glossary, About, Contact, Dashboard)
- [x] 18 course tracks
- [x] 40+ AI tools with stacks
- [x] 6 learning paths with roadmaps
- [x] 14 projects
- [x] 25 prompts with copy button
- [x] 12 blog posts
- [x] 40 glossary terms
- [x] Glass morphism design
- [x] AI Pulse showcase bar
- [x] Vercel-ready
- [x] Documentation

---

## Phase 2: Content Depth (Weeks 2-4)
- [ ] MDX-powered blog posts with full content
- [ ] Course detail pages (lesson list, description, prerequisites)
- [ ] Project detail pages (step-by-step guides)
- [ ] 100+ prompts
- [ ] 60+ AI tools
- [ ] Video embed support for lessons
- [ ] Global ⌘K search (Fuse.js)
- [ ] Sitemap.xml generation
- [ ] RSS feed for blog

---

## Phase 3: User System (Month 2)
- [ ] Supabase Auth (email + GitHub + Google)
- [ ] User profiles
- [ ] Course bookmarking
- [ ] Prompt collection (save prompts)
- [ ] Tool favorites
- [ ] Email verification
- [ ] Password reset

---

## Phase 4: Learning Tracking (Month 3)
- [ ] Course progress tracking
- [ ] Lesson completion checkboxes
- [ ] Learning streak counter
- [ ] Skill map visualization
- [ ] Study time tracking
- [ ] Personal notes per lesson
- [ ] Real student dashboard (not Coming Soon)

---

## Phase 5: Quizzes & Assessments (Month 3-4)
- [ ] Quiz system per course
- [ ] Multiple choice questions
- [ ] Instant feedback
- [ ] Quiz history
- [ ] Score leaderboard (optional)
- [ ] Adaptive difficulty

---

## Phase 6: Certificates (Month 4)
- [ ] Course completion certificates
- [ ] PDF generation (React-PDF)
- [ ] Verifiable certificate links
- [ ] LinkedIn share button
- [ ] Certificate gallery in dashboard

---

## Phase 7: AI Assistant ✅ (COMPLETE — Darhous AI Mentor)
- [x] Gemini-powered learning assistant (`/[locale]/mentor`)
- [x] 6 specialized modes: Ask the Academy, Prompt Optimizer, Claude Code Builder, Learning Path Planner, Tool Finder, Project Builder
- [x] Server-side API route (`/api/mentor`) — key never exposed to frontend
- [x] Bilingual system prompts (Arabic + English)
- [x] Floating button on all pages
- [x] Missing API key graceful state
- [x] Cooldown (3s) + message length limit (4000 chars)
- [x] Security notice in chat footer
- [x] Mode validation and history depth limiting server-side
- [ ] RAG over platform content (future: embed courses/docs)
- [ ] Streaming responses (future: ReadableStream SSE)

---

## Phase 7.5: AI Product Wave ✅ (COMPLETE — AI Studio)
**Status:** Done | **Build:** 221 static pages ✅

- [x] **Prompt Studio** (`/[locale]/prompt-studio`) — AI-powered prompt improvement with 8 type selectors
- [x] **Claude Code Generator** (`/[locale]/claude-code-generator`) — Full Claude Code prompt builder with task/stack/details
- [x] **Tool Recommender** (`/[locale]/tool-recommender`) — Local filter from 40+ tools by goal/level/pricing
- [x] **AI Roadmap Generator** (`/[locale]/roadmap-generator`) — Personalized learning plans via AI
- [x] **Ask This Page** — Button on all detail pages (course/tool/project/blog) → pre-fills mentor with context
- [x] **Saved Prompts** — `useSavedPrompts` hook + `SavedPromptsPanel` in Dashboard
- [x] **Home page Mentor section** — AI Studio grid promotion
- [x] **Footer** — New "AI Studio" column with all tools
- [x] **Command Palette** — Page navigation items added at top of search results
- [x] **ShowcaseBar** — 4 new items (Prompt Studio, Claude Code Generator, Tool Recommender, Roadmap Generator)
- [x] **API Protection** — message length validation, mode validation, rate limit error handling

---

## Phase 8: Admin Panel (Month 5-6)
- [ ] Content management UI
- [ ] Add/edit/delete courses without code
- [ ] Blog post editor (MDX)
- [ ] User management
- [ ] Analytics dashboard (pageviews, enrollments)
- [ ] Newsletter management

---

## Phase 9: Monetization (Month 6+)
- [ ] Premium membership (monthly/annual)
- [ ] Stripe payment integration
- [ ] Premium courses (gated)
- [ ] Group/team accounts
- [ ] Affiliate program
- [ ] Sponsor placement

---

## Phase 10: Community (Month 6+)
- [ ] Discussion forums per course
- [ ] Project showcase gallery
- [ ] Discord integration
- [ ] Mentor program
- [ ] Arabic AI newsletter
- [ ] Events and webinars

---

## Phase 11: Mobile App (Year 2)
- [ ] React Native / Expo app
- [ ] Offline lesson downloads
- [ ] Push notifications
- [ ] Mobile-first UI
- [ ] App Store + Google Play

---

## Key Technical Milestones

| Milestone | Complexity | Priority |
|-----------|-----------|---------|
| MDX blog | Low | High |
| Fuse.js search | Low | High |
| Supabase auth | Medium | High |
| Progress tracking | Medium | High |
| Quiz system | High | Medium |
| Certificate PDF | Medium | Medium |
| Claude AI assistant | High | High |
| Admin panel | Very High | Low |
| Mobile app | Extreme | Low |
