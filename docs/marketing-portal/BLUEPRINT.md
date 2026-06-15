# NexaLearn Marketing Academy — Master Blueprint

> A world-class, AI-native marketing learning ecosystem built as a first-class
> portal inside the NexaLearn / Darhous academy platform. Designed to compete
> with HubSpot Academy, Meta Blueprint, Google Skillshop, CXL, and Reforge —
> while going further with native **AI tutoring**, **marketing automation**, and
> **MCP (Model Context Protocol) agent** tracks.

**Portal ID:** `marketing` · **Route:** `/[locale]/marketing` · **Status:** `available`
**Bilingual:** Arabic (RTL) + English (LTR) · **Brand color:** `#ec4899` (magenta/pink)

This document is the canonical design. It maps 1:1 to the implementation:
the database migration (`supabase/v50_marketing_portal.sql`), the typed content
(`src/data/marketing/`), the routes (`src/app/[locale]/marketing/`), the
certificate config (`src/lib/certificates/portalConfig.ts`), the student
dashboard hub, and the admin CMS panel.

---

## 1. Portal Vision

### Mission
> **"Take any human — with zero marketing knowledge — and turn them into an
> AI-powered marketing operator who can plan, build, launch, measure, and
> automate full-funnel campaigns, and orchestrate AI agents (MCP) that run
> marketing systems end-to-end."**

NexaLearn Marketing Academy is not a course catalog. It is a **transformation
engine**: structured tracks → hands-on labs → real business simulations →
portfolio-grade capstones → verifiable certificates → AI copilots that coach
the learner at every step.

### Core learning outcomes (what a graduate can DO)
1. Build a complete marketing strategy from positioning to channel plan.
2. Write conversion copy (ads, emails, landing pages, VSLs) using proven frameworks.
3. Launch and optimize paid campaigns on Meta, Google, TikTok.
4. Architect and build sales funnels and email/CRM automations.
5. Read analytics, run experiments (A/B), and improve conversion rates.
6. Design no-code automations across n8n / Make / Zapier.
7. Build and deploy **MCP-powered marketing agents** that call real tools
   (Meta API, Google Ads API, GA4, content generators, reporting).

### Student transformation journey
```
ZERO KNOWLEDGE
   │  (Foundations: vocabulary, mindset, the funnel, the customer)
   ▼
BEGINNER  ──►  can describe a strategy, write basic copy, read a dashboard
   │  (Intermediate: channels, ads, email, SEO, content engines)
   ▼
INTERMEDIATE ─► can run a single-channel campaign end-to-end
   │  (Advanced: funnels, CRO, analytics, multi-channel, automation)
   ▼
ADVANCED  ──►  can run multi-channel growth systems + automations
   │  (Expert: AI marketing, agentic systems, MCP integrations)
   ▼
EXPERT  ──►  builds AI/MCP marketing systems that operate autonomously
```

### The 4-stage skill ladder (maps to certificates + XP levels)
| Stage | Persona | Can produce | Certificate |
|------|---------|-------------|-------------|
| **Beginner** | Marketing Aware | Strategy brief, basic copy, audit checklist | Beginner Certificate |
| **Intermediate** | Channel Operator | Live single-channel campaign + report | Professional Certificate |
| **Advanced** | Growth Builder | Multi-channel funnel + automation + CRO plan | Specialist Certificate |
| **Expert** | AI/MCP Architect | Autonomous AI marketing agent (MCP) | Expert Certificate |

---

## 2. Learning Paths (Tracks)

16 tracks grouped into 5 stages. Each track is a row in `marketing_tracks` and
a typed object in `src/data/marketing/tracks.ts`.

| # | Track | Stage | Difficulty | Duration | Prereqs |
|---|-------|-------|-----------|----------|---------|
| 1 | Marketing Foundations | Beginner | 1 — Beginner | 8h | None |
| 2 | Branding & Positioning | Beginner | 2 | 6h | T1 |
| 3 | Copywriting | Beginner→Int | 2 | 10h | T1 |
| 4 | Content Marketing | Intermediate | 2 | 10h | T1, T3 |
| 5 | Social Media Marketing | Intermediate | 2 | 9h | T1 |
| 6 | SEO & Organic Growth | Intermediate | 3 | 11h | T4 |
| 7 | Email Marketing | Intermediate | 2 | 8h | T3 |
| 8 | Meta Ads (Facebook/Instagram) | Intermediate→Adv | 3 | 12h | T1, T3 |
| 9 | Google Ads (Search/PMax/YouTube) | Advanced | 3 | 12h | T1 |
| 10 | TikTok Ads | Advanced | 3 | 8h | T5, T8 |
| 11 | Sales Funnels | Advanced | 3 | 10h | T3, T7 |
| 12 | Conversion Rate Optimization (CRO) | Advanced | 4 | 9h | T11 |
| 13 | Analytics & Attribution | Advanced | 4 | 10h | T8/T9 |
| 14 | Marketing Automation | Advanced | 4 | 14h | T7, T11 |
| 15 | AI Marketing | Expert | 4 | 12h | T3, T4 |
| 16 | MCP Marketing Systems | Expert | 5 — Expert | 16h | T14, T15 |

Difficulty scale: `1 Beginner · 2 Easy · 3 Intermediate · 4 Advanced · 5 Expert`.

### Track detail cards

**T1 — Marketing Foundations**
- *Description:* The mental model of modern marketing: the customer, the funnel, value proposition, the 4Ps/7Ps reimagined for digital, channels overview, and how money actually moves from attention → action.
- *Skills gained:* market/customer research, value proposition, funnel thinking, channel literacy, marketing math (CAC, LTV, ROAS, CTR, CVR, AOV).
- *Prerequisites:* none.
- *Duration:* 8h · *Difficulty:* Beginner.
- *Final project:* **"Brand-in-a-Box" Strategy Brief** — pick a real local business, produce ICP, value prop, channel plan, and KPI targets.

**T2 — Branding & Positioning**
- *Description:* Build a brand that is chosen, not just seen — positioning, messaging hierarchy, brand voice, visual identity basics, category design.
- *Skills:* positioning statements, messaging maps, brand voice guides, competitive differentiation.
- *Prereqs:* T1 · 6h · Difficulty 2.
- *Final project:* **Brand Book v1** (positioning + voice + 1-page identity).

**T3 — Copywriting**
- *Description:* Persuasion on the page. Frameworks (AIDA, PAS, BAB, 4Cs), headlines, hooks, offers, ads, emails, landing pages, VSL scripts.
- *Skills:* headline writing, offer design, ad copy, email sequences, landing-page copy, editing.
- *Prereqs:* T1 · 10h · Difficulty 2.
- *Final project:* **Full Copy Pack** — 10 ads + 1 landing page + 5-email welcome sequence for one offer.

**T4 — Content Marketing**
- *Description:* Build a content engine: pillar strategy, formats, repurposing, editorial calendars, distribution, and AI-assisted production.
- *Skills:* content strategy, SEO-aware writing, repurposing system, calendar ops.
- *Prereqs:* T1, T3 · 10h · Difficulty 2.
- *Final project:* **30-Day Content Engine** (pillar + 30 repurposed pieces + calendar).

**T5 — Social Media Marketing**
- *Description:* Organic growth across Instagram, TikTok, LinkedIn, X, YouTube. Hooks, formats, hashtags/SEO, community, creator collabs.
- *Skills:* platform strategy, short-form scripting, community management, analytics.
- *Prereqs:* T1 · 9h · Difficulty 2.
- *Final project:* **90-Day Social Growth Plan** for one platform with content batches.

**T6 — SEO & Organic Growth**
- *Description:* How search works, keyword research, on-page, technical SEO basics, link building, topical authority, and AI-search (GEO/AEO).
- *Skills:* keyword research, on-page optimization, content briefs, SEO audits.
- *Prereqs:* T4 · 11h · Difficulty 3.
- *Final project:* **SEO Audit + 3 Optimized Briefs** for a real site.

**T7 — Email Marketing**
- *Description:* Lists, deliverability, segmentation, lifecycle (welcome, nurture, win-back), broadcast vs flows, and revenue attribution.
- *Skills:* list building, segmentation, flow design, deliverability, A/B subject lines.
- *Prereqs:* T3 · 8h · Difficulty 2.
- *Final project:* **Lifecycle Email System** (welcome + abandoned + win-back flows).

**T8 — Meta Ads**
- *Description:* The full Meta stack: Business Manager, pixel/CAPI, campaign structures (ABO/CBO), creative testing, audiences, scaling, iOS-era measurement.
- *Skills:* campaign setup, audience strategy, creative testing, pixel/CAPI, scaling, reporting.
- *Prereqs:* T1, T3 · 12h · Difficulty 3.
- *Final project:* **Live Meta Campaign Plan + Media Buying Sim** (build a campaign in the simulator, optimize over 7 "days").

**T9 — Google Ads**
- *Description:* Search, Performance Max, Display, YouTube, Shopping. Keyword match types, Quality Score, bidding strategies, negative keywords, conversion tracking.
- *Skills:* search campaign builds, keyword/negative strategy, bidding, conversion tracking, PMax.
- *Prereqs:* T1 · 12h · Difficulty 3.
- *Final project:* **Search + PMax Account Build** with conversion tracking plan.

**T10 — TikTok Ads**
- *Description:* TikTok Ads Manager, Spark Ads, creator content, hook-driven creatives, TikTok pixel, and creative iteration velocity.
- *Skills:* TikTok campaign setup, UGC creative briefs, Spark Ads, scaling.
- *Prereqs:* T5, T8 · 8h · Difficulty 3.
- *Final project:* **TikTok Creative + Campaign Brief** (10 hook variations + targeting).

**T11 — Sales Funnels**
- *Description:* Offer → funnel architecture. Lead magnets, tripwires, core offers, upsells, VSLs, webinar funnels, and the math of funnels.
- *Skills:* funnel mapping, offer stacking, page sequencing, funnel math.
- *Prereqs:* T3, T7 · 10h · Difficulty 3.
- *Final project:* **End-to-End Funnel Blueprint** (map + pages + email + KPI model).

**T12 — Conversion Rate Optimization**
- *Description:* The science of "more from the same traffic" — heuristics, hypothesis design, A/B testing, statistical significance, UX/copy levers.
- *Skills:* CRO audits, hypothesis writing, experiment design, results analysis.
- *Prereqs:* T11 · 9h · Difficulty 4.
- *Final project:* **CRO Teardown + Test Roadmap** (10 prioritized experiments).

**T13 — Analytics & Attribution**
- *Description:* GA4, events, conversions, UTM discipline, dashboards, attribution models, server-side tracking, and decision-making from data.
- *Skills:* GA4 setup, event/conversion modeling, dashboards, attribution literacy.
- *Prereqs:* T8 or T9 · 10h · Difficulty 4.
- *Final project:* **Measurement Plan + GA4 Dashboard Spec**.

**T14 — Marketing Automation** *(featured cross-portal track)*
- *Description:* CRM, lead management, lifecycle automation, and no-code orchestration with **n8n / Make / Zapier**, plus WhatsApp & Telegram automation.
- *Skills:* CRM ops, lead scoring, multi-tool automation, webhook/API basics, chatbot flows.
- *Prereqs:* T7, T11 · 14h · Difficulty 4.
- *Final project:* **Automated Lead-to-Customer Machine** (capture → score → nurture → notify sales → report).

**T15 — AI Marketing**
- *Description:* Use AI across the whole marketing workflow: research, strategy, copy, content, creative, analysis, and the prompt systems that make it reliable.
- *Skills:* prompt engineering for marketing, AI content/creative pipelines, AI analysis, guardrails.
- *Prereqs:* T3, T4 · 12h · Difficulty 4.
- *Final project:* **AI Marketing Workflow Pack** (research + copy + content + analysis prompt system).

**T16 — MCP Marketing Systems** *(flagship expert track)*
- *Description:* Build agentic marketing systems with the **Model Context Protocol**: MCP fundamentals, tool-calling, building an MCP server, and connecting agents to Meta, Google Ads, GA4, content generators, and reporting.
- *Skills:* MCP architecture, tool/function calling, building marketing assistants, agent orchestration, safety/observability.
- *Prereqs:* T14, T15 · 16h · Difficulty 5.
- *Final project (capstone):* **Autonomous Marketing Agent** — an MCP-powered agent that pulls ad data, drafts/optimizes campaigns, generates content, and produces a weekly report.

---

## 3. Curriculum Architecture

Hierarchy used everywhere in the data model and UI:

```
Track  (marketing_tracks)
  └─ Module     (marketing_modules.track_id)
       └─ Lesson     (marketing_lessons.module_id)
            └─ Topic  (lesson.topics[]  — JSONB array inside a lesson)
```

A **Lesson** carries: objectives, est. minutes, content blocks (video/reading/
interactive), a knowledge check (quiz), and 0–N assignments. **Topics** are the
fine-grained subdivisions inside a lesson (a single concept + example).

### Fully expanded example — T1 Marketing Foundations
```
T1 Marketing Foundations
├─ M1 · The Marketing Mindset
│   ├─ L1.1 What marketing really is (and isn't)
│   │     • Topic: attention → trust → action
│   │     • Topic: brand vs. demand vs. growth
│   │     • Topic: the value exchange
│   ├─ L1.2 The modern customer journey
│   │     • Topic: AIDA & the messy middle
│   │     • Topic: touchpoints & micro-moments
│   └─ L1.3 Marketing math you must know
│         • Topic: CAC, LTV, payback
│         • Topic: ROAS, CTR, CVR, AOV
├─ M2 · Customer & Market Research
│   ├─ L2.1 Finding your ICP & personas
│   ├─ L2.2 Voice-of-customer mining (reviews, communities, AI)
│   └─ L2.3 Competitive & category landscape
├─ M3 · Value Proposition & Offer
│   ├─ L3.1 Value prop canvas
│   ├─ L3.2 Offer design 101
│   └─ L3.3 Pricing & positioning intro
├─ M4 · The Channel Map
│   ├─ L4.1 Owned / Earned / Paid
│   ├─ L4.2 Choosing your first channel
│   └─ L4.3 Budgeting & KPI targets
└─ M5 · Capstone — Brand-in-a-Box Strategy Brief
    └─ L5.1 Build & submit your strategy brief (AI-reviewed)
```

### Expanded example — T16 MCP Marketing Systems
```
T16 MCP Marketing Systems
├─ M1 · Agentic Marketing Foundations
│   ├─ L1.1 What is an AI agent (vs. a chatbot)
│   ├─ L1.2 Tool calling & function schemas
│   └─ L1.3 The MCP mental model (clients, servers, tools, resources)
├─ M2 · MCP Fundamentals
│   ├─ L2.1 Anatomy of an MCP server
│   ├─ L2.2 Exposing tools, resources, prompts
│   └─ L2.3 Transport, auth, and safety
├─ M3 · Building Marketing Tools
│   ├─ L3.1 A "get_ad_performance" tool
│   ├─ L3.2 A "generate_ad_copy" tool
│   └─ L3.3 A "create_report" tool
├─ M4 · Platform Integrations (MCP)
│   ├─ L4.1 Meta Ads MCP integration
│   ├─ L4.2 Google Ads MCP integration
│   └─ L4.3 Analytics (GA4) MCP integration
├─ M5 · Orchestration & Reliability
│   ├─ L5.1 Multi-tool agent loops
│   ├─ L5.2 Guardrails, approvals, human-in-the-loop
│   └─ L5.3 Observability & evals
└─ M6 · Capstone — Autonomous Marketing Agent
    └─ L6.1 Ship the agent + record a demo (mentor + AI reviewed)
```

Every other track is expanded to the Module → Lesson level in
`src/data/marketing/tracks.ts`; the two flagship tracks above are expanded to
Topic level as reference depth.

---

## 4. Practical Learning System

Learning is **80% doing**. Each level ships with concrete artifacts.

| Level | Assignments | Case studies | Simulations | Audit | Campaign build |
|------|-------------|--------------|-------------|-------|----------------|
| Beginner | Strategy brief, copy drills | "Why this local café grew" | — | Brand audit checklist | Mock one-pager |
| Intermediate | Channel plans, email flows | "Meta vs Google for DTC" | **Media Buying Simulator** | Channel audit | Single-channel campaign |
| Advanced | Funnel maps, CRO roadmaps | "Funnel teardown: 7-figure offer" | **Funnel & CRO sim** | Full-funnel audit | Multi-channel system |
| Expert | AI workflows, MCP agents | "Agentic growth team" | **MCP agent sandbox** | AI/automation audit | Autonomous agent |

### Signature practical components
- **Real Business Simulations** — `marketing_simulations`: a seeded fictional
  business (budget, product, audience). The learner makes decisions across
  "days"; the sim returns metrics (impressions, CTR, CVR, spend, ROAS) so they
  learn optimization without burning real money.
- **Marketing Audits** — structured checklist artifacts (`marketing_audits`)
  the learner fills against a real site; AI scores completeness + insight.
- **Campaign Building Exercises** — guided builders that output a campaign brief
  the AI Campaign Reviewer critiques.
- **Capstone Projects** — one per certificate level, portfolio-grade, stored in
  `marketing_submissions` and shown on the public profile (`/u/[username]`).

---

## 5. Certification Framework

Four stacked certificates, issued through the **existing** academy certificate
engine (`admin_certificates` + `react-pdf` `CertificateTemplate` + QR verify at
`/certificates/verify`). Portal key: `marketing`.

| Certificate | Unlocks after | Requirements | Cert label |
|-------------|---------------|--------------|-----------|
| **Beginner Certificate** | T1–T3 | 100% lessons + quizzes ≥70% + Strategy Brief approved | `MARKETING FOUNDATIONS — CERTIFIED` |
| **Professional Certificate** | T4–T10 (any 4 incl. one ads track) | quizzes ≥75% + 1 live campaign sim ≥ target ROAS + Copy Pack | `DIGITAL MARKETING PROFESSIONAL` |
| **Specialist Certificate** | T11–T14 | quizzes ≥80% + Funnel Blueprint + Automation machine + CRO roadmap | `GROWTH & AUTOMATION SPECIALIST` |
| **Expert Certificate** | T15–T16 | AI workflow pack + **MCP agent capstone** (mentor + AI review pass) | `AI & MCP MARKETING EXPERT` |

Earning logic:
1. Progress + quiz scores tracked in `course_progress` / `quiz_results` (reused).
2. A `marketing_cert_requirements` view computes eligibility per level.
3. On eligibility, the student requests issuance; mentor/admin approves
   capstones; the system issues via the existing `/api/admin/certificates/issue`
   path with `portal: "marketing"` and the smart dropdown (Beginner/Professional/
   Specialist/Expert) defined in `portalConfig.ts`.

---

## 6. Student Progress System (Gamification)

The platform currently tracks progress but has **no XP engine**. This portal
introduces a reusable gamification layer (tables prefixed `marketing_` now,
designed to graduate to a global `gamification_*` layer later).

### XP system
| Action | XP |
|--------|----|
| Complete a topic | 10 |
| Complete a lesson | 25 |
| Pass a quiz (≥70%) | 40 (+1/point above 70) |
| Submit an assignment | 60 |
| Capstone approved | 300 |
| Daily login (streak) | 5 |
| First-try quiz pass | +20 bonus |

### Levels (per-portal XP → level)
```
Lv 1 Rookie        0–249
Lv 2 Apprentice    250–749
Lv 3 Operator      750–1,749
Lv 4 Strategist    1,750–3,499
Lv 5 Growth Lead   3,500–6,499
Lv 6 Architect     6,500–10,999
Lv 7 AI Marketer   11,000+
```

### Badges (examples — `marketing_badges`)
- **First Blood** — first lesson done · **Copy Machine** — Copy Pack approved ·
  **Pixel Master** — Meta track done · **Funnel Architect** — Funnel Blueprint ·
  **Automator** — Automation capstone · **Agent Builder** — MCP capstone ·
  **Streak x7 / x30 / x100** · **Audit Ace** — 3 audits ≥90%.

### Streaks
Daily activity increments `current_streak`; missing a day resets it (with one
"freeze" token per 7-day streak). Streak ≥7 grants +10% XP multiplier.

### Achievements & Leaderboards
- Achievements = milestone events (`marketing_achievements`) shown on profile.
- Leaderboard reuses the existing `/leaderboard` route; portal-scoped board
  ranks by `marketing_xp.total_xp` (weekly + all-time tabs).

---

## 7. Assessment System

| Type | Where | Scoring |
|------|-------|---------|
| **Knowledge quizzes** | end of each lesson | MCQ auto-graded, ≥70% to pass, stored in `quiz_results` |
| **Scenario questions** | end of module | branching "what would you do" — weighted rubric |
| **Campaign analysis exams** | end of ads tracks | read a dashboard screenshot/data → diagnose; rubric-scored |
| **Practical evaluations** | labs/sims | sim returns metrics; pass if KPI target met |
| **Portfolio reviews** | capstones | mentor + **AI Campaign Reviewer** rubric (0–100) |

### Scoring methods
- **Auto-graded** (quizzes, scenarios): percentage; recorded with `answers` JSONB.
- **Rubric-graded** (capstones, audits): 4 dimensions × 25 pts — *Strategy,
  Execution, Data/Reasoning, Communication*. ≥70 pass, ≥85 distinction.
- **AI pre-grade then human confirm** for all certificate-bearing submissions:
  the AI reviewer drafts a score + feedback; a Reviewer/Mentor confirms or edits.

---

## 8. AI-Powered Features

All AI features reuse the existing mentor/coach infrastructure
(`/api/mentor`, `/api/coach`, `/api/mentor-stream`) with a marketing system
prompt + portal context, and respect the `ai_usage_quota` (v19) limits.

| Feature | Route (new) | How it works |
|---------|-------------|--------------|
| **AI Tutor** | `/api/marketing/tutor` | Lesson-aware Q&A; gets current lesson + objectives as context; Socratic mode for beginners. |
| **AI Marketing Coach** | `/api/marketing/coach` | Goal-based weekly plan + accountability; reads the learner's progress + portfolio. |
| **AI Campaign Reviewer** | `/api/marketing/review` | Takes a campaign/funnel brief → rubric score + prioritized fixes. Used in grading. |
| **AI Copywriting Assistant** | `/api/marketing/copy` | Framework-guided copy (AIDA/PAS), variant generation, critique mode. |
| **AI Content Generator** | `/api/marketing/content` | Pillar → repurposed pieces + calendar; on-brand via stored brand voice. |
| **AI Funnel Builder** | `/api/marketing/funnel` | Q&A intake → funnel map + page sequence + email outline + KPI model. |

Each feature: (1) server route builds a typed system prompt, (2) injects portal
+ lesson/portfolio context, (3) streams to the existing chat UI components in
`src/components/mentor`, (4) logs to `ai_interactions` for analytics + quota.

---

## 9. Marketing Automation Track (T14) — deep spec

**Modules:** CRM Foundations → Lead Management & Scoring → Email Automation →
WhatsApp Automation → Telegram Automation → No-Code Orchestration (n8n / Make /
Zapier) → Capstone.

**Labs (no-code, sandbox-friendly):**
1. **Lab A — CRM from scratch:** model contacts, deals, stages.
2. **Lab B — Lead capture → Sheet → CRM** (Zapier/Make).
3. **Lab C — Welcome + nurture email flow** (trigger on signup).
4. **Lab D — WhatsApp auto-reply + lead qualification bot.**
5. **Lab E — Telegram broadcast + subscribe bot.**
6. **Lab F — n8n workflow:** form → enrich → score → route → notify → log.
7. **Capstone — Lead-to-Customer Machine:** capture → score → nurture → sales
   alert → weekly report, built in n8n with a documented diagram.

Labs reuse the existing automation portal's lab-progress pattern
(`automation_lab_progress`) generalized to `marketing_lab_progress`.

---

## 10. MCP Track (T16) — deep spec

**Learning arc:** understand agents → understand MCP → build tools → integrate
platforms → orchestrate → ship an autonomous agent.

**Real-world projects:**
1. **Hello-MCP:** a minimal MCP server exposing one marketing tool.
2. **Ad Insights Agent:** agent calls a `get_ad_performance` tool, summarizes.
3. **Copy Agent:** `generate_ad_copy` tool with brand-voice resource.
4. **Meta MCP Integration:** read campaigns/insights via a Meta-backed tool.
5. **Google Ads MCP Integration:** pull search-term + spend data.
6. **Analytics MCP Integration:** GA4 metrics tool + anomaly flags.
7. **Reporting Agent:** composes a weekly multi-source report.
8. **Capstone — Autonomous Marketing Agent:** an agent that, on a schedule,
   pulls performance, proposes optimizations (human-approval gate), generates
   creative, and emails a report. Demo video required.

**Safety baked in:** every external-write tool requires human-in-the-loop
approval; read tools are free. Learners are taught observability + evals.

> This track also teaches learners to wire agents into the *same* MCP servers
> this academy itself can use (n8n, GitHub, Drive, Gmail), making it concrete.

---

## 11. Academy Database Architecture

Follows the repo's content-table template (`supabase/_template_content_table.sql`):
`id TEXT PK (slug)`, `portal_id`, `content_type`, `status`, `featured`,
`sort_order`, `created_by`, timestamps, `updated_at` trigger, RLS
(`public_read_published_*` + `admin_manage_*`). Full SQL in
`supabase/v50_marketing_portal.sql`.

### Content tables
| Table | Purpose | Key columns |
|-------|---------|-------------|
| `marketing_tracks` | the 16 tracks | stage, difficulty, duration_hours, prereqs `TEXT[]`, skills `TEXT[]`, final_project |
| `marketing_modules` | modules per track | track_id, sort_order, title_*, summary_* |
| `marketing_lessons` | lessons per module | module_id, track_id, est_minutes, objectives `TEXT[]`, blocks `JSONB`, topics `JSONB` |
| `marketing_assignments` | tasks | lesson_id?, track_id, level, rubric `JSONB`, deliverable |
| `marketing_case_studies` | case studies | track_id, body_*, metrics `JSONB` |
| `marketing_simulations` | business sims | scenario `JSONB`, starting_budget, kpi_targets `JSONB` |
| `marketing_audits` | audit templates | checklist `JSONB`, scoring `JSONB` |
| `marketing_glossary` | terms | term_*, definition_* |

### Student-state tables (RLS: own-rows)
| Table | Purpose |
|-------|---------|
| `marketing_submissions` | assignment/capstone submissions + grade + reviewer |
| `marketing_lab_progress` | per-lab checklist + completion (mirrors automation) |
| `marketing_xp` | per-user total_xp, level, current_streak, longest_streak, last_active |
| `marketing_xp_events` | append-only XP ledger (action, xp, ref) |
| `marketing_badges` / `marketing_user_badges` | badge catalog + earned |
| `marketing_achievements` | milestone events |

### Reused existing tables
`profiles` (roles), `course_progress`, `lesson_progress`, `quiz_results`,
`certificates` + `admin_certificates`, `ai_interactions` (+ `ai_usage_quota`).
Tracks/lessons map onto `course_progress.course_slug` so the existing dashboard
progress + certificate eligibility work with **zero** rework.

### Representative DDL (excerpt)
```sql
CREATE TABLE IF NOT EXISTS marketing_tracks (
  id              TEXT PRIMARY KEY,                 -- slug e.g. 'marketing-foundations'
  portal_id       TEXT NOT NULL DEFAULT 'marketing',
  content_type    TEXT NOT NULL DEFAULT 'track',
  status          TEXT NOT NULL DEFAULT 'published'
                    CHECK (status IN ('published','draft','archived')),
  featured        BOOLEAN NOT NULL DEFAULT false,
  sort_order      INT NOT NULL DEFAULT 0,
  stage           TEXT NOT NULL DEFAULT 'beginner',  -- beginner|intermediate|advanced|expert
  difficulty      INT  NOT NULL DEFAULT 1,            -- 1..5
  duration_hours  INT  NOT NULL DEFAULT 0,
  title_ar        TEXT NOT NULL DEFAULT '',
  title_en        TEXT NOT NULL DEFAULT '',
  description_ar  TEXT NOT NULL DEFAULT '',
  description_en  TEXT NOT NULL DEFAULT '',
  skills          TEXT[] NOT NULL DEFAULT '{}',
  prereqs         TEXT[] NOT NULL DEFAULT '{}',
  final_project   TEXT NOT NULL DEFAULT '',
  icon            TEXT NOT NULL DEFAULT '',
  color           TEXT NOT NULL DEFAULT '#ec4899',
  created_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at     TIMESTAMPTZ
);
```

---

## 12. User Roles

Maps onto the existing `profiles.role` (`student` / `admin`) and extends it.
New roles are stored in `profiles.role` with capability checks centralized.

| Role | Marketing portal capabilities |
|------|------------------------------|
| **Student** | enroll, learn, submit assignments, take quizzes, request certs, use AI features (quota-limited), view own progress. |
| **Instructor** | author tracks/modules/lessons (draft→publish via CMS), create assignments, answer Q&A. |
| **Reviewer** | grade submissions, confirm AI pre-grades, cannot edit curriculum. |
| **Mentor** | 1:1 guidance, approve capstones, override AI feedback, higher AI quota. |
| **Admin** | full CMS for marketing tables, issue certificates, manage cohorts, see analytics. |
| **Super Admin** | everything + role management, revenue config, feature flags, destructive ops. |

Permission matrix lives in `src/lib/marketing/permissions.ts`; RLS enforces the
read/write boundaries server-side (admins via `admin_manage_*`, students via
own-row policies).

---

## 13. Revenue Model

| Stream | Detail |
|--------|--------|
| **Free tier** | T1 Foundations + audit checklists + community → top-of-funnel. |
| **Pro subscription** | All tracks T1–T13, AI Tutor/Coach (fair-use quota), labs. Monthly/annual. |
| **Premium / Expert add-on** | T14 Automation + T15 AI + **T16 MCP**, higher AI quota, mentor reviews. |
| **Certification fees** | Per-certificate exam + verified PDF (Beginner low → Expert premium). |
| **Premium tracks (à la carte)** | Buy a single flagship track (e.g. MCP) without full sub. |
| **Corporate / Cohort training** | Seats, private cohorts, custom capstones, team dashboard, invoiced. |
| **Done-with-you / Services** | Funnel/automation/MCP build services (reuses automation `services` pattern). |

Pricing tiers are feature flags so Admin can A/B them; entitlements gate routes
+ AI features.

---

## 14. MVP Roadmap

**Phase 1 — Portal is LIVE & visible (this implementation).**
- `marketing` entry in `portals.ts` → auto landing/nav/footer/dashboard cards.
- `/marketing` route: hero + 16-track catalog + stage filter (data-driven).
- Typed seed data: all 16 tracks + modules; 2 flagship tracks to topic depth.
- DB migration `v50` (content + state + gamification + RLS).
- Certificate config (`marketing` portal + Beginner→Expert smart dropdown).
- Student dashboard **Marketing Hub** section + admin **Marketing CMS** tab.
- Blueprint doc (this file).

**Phase 2 — Learning + assessment loop.**
- Lesson player route `/marketing/[track]/[lesson]` with content blocks.
- Quizzes wired to `quiz_results`; progress to `course_progress`.
- AI Tutor route + chat panel on lesson pages.
- XP engine (`marketing_xp` + events) + level/streak UI.

**Phase 3 — Practical + AI.**
- Media Buying Simulator + lab progress + audits.
- AI Campaign Reviewer, Copy, Content, Funnel builders.
- Capstone submission + Reviewer/Mentor grading UI.
- Certificate issuance flow end-to-end.

**Phase 4 — Advanced/Expert + monetization.**
- Automation labs (n8n/Make/Zapier) + WhatsApp/Telegram.
- MCP track sandbox + agent capstone.
- Leaderboards, badges, achievements polish.
- Subscriptions/entitlements + corporate cohorts.

---

## 15. Final Deliverable — Visual Hierarchy Tree

```
NexaLearn Marketing Academy  (portal: marketing · /[locale]/marketing)
│
├─ 🎯 VISION
│   ├─ Mission: zero → AI/MCP marketing operator
│   ├─ Ladder: Beginner → Intermediate → Advanced → Expert
│   └─ Outcomes: strategy · copy · ads · funnels · CRO · analytics · automation · AI · MCP
│
├─ 🛤️ LEARNING PATHS (16 tracks · 5 stages)
│   ├─ Beginner ── T1 Foundations · T2 Branding · T3 Copywriting
│   ├─ Intermediate ── T4 Content · T5 Social · T6 SEO · T7 Email
│   ├─ Ads ── T8 Meta · T9 Google · T10 TikTok
│   ├─ Advanced ── T11 Funnels · T12 CRO · T13 Analytics · T14 Automation
│   └─ Expert ── T15 AI Marketing · T16 MCP Marketing Systems ★
│
├─ 🧱 CURRICULUM   Track → Module → Lesson → Topic
│   ├─ marketing_tracks → marketing_modules → marketing_lessons → topics[]
│   └─ each lesson: objectives · blocks · quiz · assignments
│
├─ 🛠️ PRACTICAL SYSTEM
│   ├─ Assignments · Case studies · Audits
│   ├─ Real Business Simulations (Media Buying / Funnel / CRO / MCP sandbox)
│   └─ Capstones (1 per certificate level) → portfolio on /u/[username]
│
├─ 🎓 CERTIFICATION   (admin_certificates · react-pdf · QR verify)
│   ├─ Beginner → Professional → Specialist → Expert
│   └─ smart issuance via portalConfig (portal: marketing)
│
├─ 🏆 PROGRESS / GAMIFICATION
│   ├─ XP engine (marketing_xp + xp_events ledger)
│   ├─ Levels (Rookie → AI Marketer) · Streaks (freeze tokens)
│   └─ Badges · Achievements · Leaderboards
│
├─ 📝 ASSESSMENT
│   ├─ Quizzes · Scenarios · Campaign-analysis exams
│   └─ Practical evals · Portfolio reviews (AI pre-grade → human confirm)
│
├─ 🤖 AI FEATURES   (reuse mentor/coach infra + ai_usage_quota)
│   ├─ AI Tutor · AI Coach · AI Campaign Reviewer
│   └─ AI Copy · AI Content · AI Funnel Builder
│
├─ ⚙️ AUTOMATION TRACK (T14)
│   ├─ CRM · Lead Mgmt · Email · WhatsApp · Telegram
│   └─ n8n · Make · Zapier  → Lead-to-Customer Machine capstone
│
├─ 🧩 MCP TRACK (T16) ★
│   ├─ MCP fundamentals · agents · tool calling
│   ├─ Meta · Google Ads · Analytics integrations
│   └─ Content + Reporting agents → Autonomous Marketing Agent capstone
│
├─ 🗄️ DATABASE (supabase/v50_marketing_portal.sql)
│   ├─ Content: tracks · modules · lessons · assignments · case_studies ·
│   │            simulations · audits · glossary
│   ├─ State: submissions · lab_progress
│   ├─ Gamification: xp · xp_events · badges · user_badges · achievements
│   └─ Reused: profiles · course/lesson_progress · quiz_results ·
│              certificates · admin_certificates · ai_interactions
│
├─ 👥 ROLES   Student · Instructor · Reviewer · Mentor · Admin · Super Admin
│
├─ 💰 REVENUE   Free · Pro · Expert add-on · Cert fees · À-la-carte · Corporate · Services
│
└─ 🚦 ROADMAP   P1 Live portal ✅ → P2 Learning loop → P3 Practical+AI → P4 Expert+Monetize
```

---

### Implementation cross-reference
| Blueprint section | Code artifact |
|-------------------|---------------|
| Portal registration | `src/config/portals.ts` (entry `marketing`) |
| Tracks/curriculum data | `src/data/marketing/tracks.ts`, `src/data/marketing/types.ts` |
| Routes / UI | `src/app/[locale]/marketing/*` |
| Database | `supabase/v50_marketing_portal.sql` |
| Certificates | `src/lib/certificates/portalConfig.ts` (`marketing`) |
| Student dashboard | `src/components/dashboard` Marketing Hub section |
| Admin CMS | `src/components/admin/admin-navigation.ts` + Marketing panel |
| Authoring source | `content-source/marketing/*` |

*This blueprint is the source of truth; implementation lands incrementally per
the Phase roadmap, starting with Phase 1 (live, visible, data-driven portal).*
