# Content Inventory and Publishing Status

---

## Database State (from ANTIGRAVITY_RULES.md)
- **Total normalized records:** 1,040
- **In Supabase Production:** 600 records (Tier-A)
- **Status of all 600:** DRAFT — 0 PUBLISHED
- **Previously live-wired records:** 210
- **Deferred/schema-risk records:** 230
- **tools_hub:** deferred
- **nano_banana (DB records):** deferred

**Critical implication:** Every page that uses `fetchPublishedList()` returns [] from DB and falls back to static files. Users see ONLY static data. No Supabase CMS content is visible.

---

## Content per Portal

### AI Academy Portal

| Content Type | Static Data File | Records | DB Table | Published |
|-------------|-----------------|---------|----------|-----------|
| Courses | `data/courses.ts` (807 lines) | ~18 courses | `ai_courses` | 0 |
| Tools | `data/tools.ts` (226 lines) | ~62 tools | `ai_tools` | 0 |
| Projects | `data/projects.ts` | many | `ai_projects` | 0 |
| Prompts | `data/prompts.ts` (820 lines) | many | `ai_prompts` | 0 |
| Paths/Roadmaps | `data/roadmaps.ts` (263 lines) | 12+ | `ai_paths` | 0 |
| Glossary | `data/glossary.ts` (63 lines) | limited | `ai_glossary` | 0 |
| Blog | `data/blog.ts` (1532 lines) | many | `blog_posts` | 0 |

**Visible to user:** Static data from all .ts files  
**CMS content:** 0 published records visible

### Automation Portal

| Content Type | Static Data | DB Table | Published |
|-------------|------------|----------|-----------|
| Templates (workflows) | `data/automation/workflowLibrary.ts` (30) | `automation_workflows` | 0 |
| Use Cases | `data/automation/automationUseCases.ts` | `automation_use_cases` | 0 |
| Case Studies | `data/automation/automationCaseStudies.ts` | `automation_case_studies` | 0 |
| Prompts | `data/automation/automationPrompts.ts` | `automation_prompts` | 0 |
| Glossary Terms | None (DB-only) | `automation_glossary` | Pilot: some published |
| Labs | `data/automation/automationLabsV2.ts` | `automation_labs` | 0 |
| Agent prompts | `data/automation/automationPrompts.ts` | `automation_prompts` | 0 |

**Note:** `automation_glossary` is the ONE table that was the "inline admin pilot" — some terms may be published

### Language Portal

| Content Type | State |
|-------------|-------|
| Assessment questions | Hardcoded/static in component |
| Level results | Computed in-browser |
| Learning path recommendations | Static content |
| Certificates | Via certificate system |

**No dynamic CMS content used**

### Digital Exams Portal

| Content Type | Static Data | DB Table | Published |
|-------------|------------|----------|-----------|
| Exam Subjects (9) | `data/digital-exam-subjects.ts` (1032 lines) | `exam_subjects` | 0 |
| Questions (902+) | Embedded in exam-subjects.ts | embedded | static |

**Visible:** All static exam data (902+ questions, 9 subjects)  
**DB:** Would override if published — none are

### Career Portal

| Content Type | State |
|-------------|-------|
| CV Analyzer | AI (Gemini API) |
| CV Builder | Interactive client-side form |
| Jobs Portal | Static placeholder (no real job data) |
| Interview Prep | Static question bank |
| CV Templates | Static PDF generation |

**No CMS tables for career content found**

### IoT Lab Portal

| Content Type | Static Data | DB Table | Published |
|-------------|------------|----------|-----------|
| Lessons (59) | lessons1-4.ts (split, 4 files) | `iot_lessons` | 0 |
| Projects (72) | projects1-4.ts (split, 4 files) | `iot_projects` | 0 |
| Challenges (40) | `data/iot/challenges.ts` (217 lines) | `iot_challenges` | 0 |
| Components | components1-2.ts (split) | `iot_components` | 0 |
| Paths | `data/iot/paths.ts` | `iot_paths` | 0 |
| Exams | `data/iot/exams.ts` | `iot_exams` | 0 |

**Visible:** All static data (59 lessons, 72 projects, 40 challenges)

### Nano Banana Portal

| Content Type | Static Data | DB Table | Published |
|-------------|------------|----------|-----------|
| Prompts (100+) | `data/nano-banana-prompts.ts` | `nano_banana_prompts` | 0 (deferred) |

**Visible:** Static prompts from .ts file

### Cloud Academy (`/cloud`)

| Content Type | State |
|-------------|-------|
| Content | Hardcoded in page.tsx (no separate data file, no DB) |
| Sections | 9 hardcoded course sections |
| Labs | 12 hardcoded lab names |
| Providers | 6 hardcoded provider cards |

**This page has NO connection to CMS, NO data file, NO DB table. Entirely hardcoded.**

### Certificates

| Content Type | State |
|-------------|-------|
| Certificate issuance | Admin API + Supabase `certificates` table |
| QR code generation | `qrcode` package |
| PDF generation | `@react-pdf/renderer` |
| Verification | `/certificates/verify/[certId]` route |

**Functional if Supabase is configured and certificates are issued**

### Glossary / Prompts / Resources

| Type | Location | Status |
|------|----------|--------|
| AI Glossary | `data/glossary.ts` (63 lines) | Minimal static content |
| AI Prompts | `data/prompts.ts` (820 lines) | Rich static content |
| Automation Glossary | DB-only (automation_glossary) | Some published (pilot) |
| Blog posts | `data/blog.ts` (1532 lines) | Rich static content |

---

## Content Delivery Summary

| Portal | User Sees | Source |
|--------|-----------|--------|
| AI Academy | Static courses/tools/prompts | .ts files |
| Automation | Static workflows/use-cases/case-studies | .ts files |
| Language | Static assessment | hardcoded |
| Digital Exams | Static 902+ questions | .ts files |
| Career | AI tools (Gemini-dependent) | API |
| IoT Lab | Static 59 lessons + 72 projects | .ts files |
| Nano Banana | Static 100+ prompts | .ts files |
| Cloud | Static placeholder sections | hardcoded in page |
| Blog | Static blog posts | .ts files |
| Glossary | Static minimal terms | .ts files |

**Root cause of content gap:** All 600 Supabase records are `draft`. Until an admin publishes them, the `fetchPublishedList()` always returns `[]` and static files are the sole content source.

---

## What Is Blocking Content Publishing

1. **Admin workflow not established** — no one has pressed "Publish" on any of the 600 records
2. **Inline admin pilot (automation_glossary only)** — the only table with a publish flow tested
3. **Schema risk** — 230 records marked as "deferred/schema-risk" cannot be safely inserted yet
4. **No bulk publish UI** — admin must publish each record individually
5. **Supabase env vars required** — production env vars needed for admin to log in and publish

---

## Recommended Content Priority

1. Publish AI glossary terms (ai_glossary) — quick win for AI Academy
2. Publish top 5-10 prompts (ai_prompts) — high-value for discovery
3. Publish top 5 courses (ai_courses) — replaces static with richer DB content
4. Publish automation_glossary terms — already piloted, safe
5. Publish 2-3 blog posts (blog_posts) — drives SEO and social
