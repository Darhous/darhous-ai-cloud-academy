# Content Inventory & Publishing Status

## Estate summary

| Layer | Count / state |
|-------|---------------|
| `content-source/_normalized/` | 1,040 JSON/MD records |
| `content-source/{portal}/` legacy | ~1,312 files |
| Supabase Tier-A production | 600 rows, **all draft** |
| Published Tier-A | **0** |
| Live-wired (frozen) | 210 |
| Deferred | 230 (`tools_hub`, `nano_banana`) |
| Runtime source | `src/data/*` + Supabase `published` merge |

**`content-source/` is not read at runtime.**

## Portal inventory

### AI Academy (+ cloud topics)

| Content type | Source files | DB table | Public page | Surfaced? |
|--------------|-------------|----------|-------------|-----------|
| Courses | `src/data/courses.ts` (~39) | `ai_courses` | `/courses` | Yes (static primary) |
| Tools | `src/data/tools.ts` (~77) | `ai_tools` | `/tools` | Yes |
| Prompts | `src/data/prompts.ts` (~32) | `ai_prompts` | `/prompts` | Yes (orphan nav) |
| Glossary | `src/data/glossary.ts` (~49) | `ai_glossary` | `/glossary` | Yes |
| Projects | `src/data/projects.ts` | `ai_projects` | `/projects` | Yes |
| Paths | `src/data/roadmaps.ts` | `ai_paths` | `/paths` | Yes |
| Lessons (Tier-A) | normalized 20 | `ai_lessons` | **none** | No |
| Resources (Tier-A) | normalized 30 | `ai_resources` | **none** | No |
| Cloud page | static sections | — | `/cloud` | Shell only — orphan nav |

**Blocking rest:** Draft status + no routes for Tier-A lessons/resources + publish approval required.

### Automation

| Content | Static | CMS registry | Public |
|---------|--------|--------------|--------|
| Workflows, labs, paths, glossary | `src/data/automation/*` | 11 tables | `/automation/*` |
| Tier-A lessons/resources | DB draft | `automation_lessons`, `automation_resources` | Not wired |
| Glossary pilot | wired page | `automation_glossary` | `/automation-glossary` (orphan nav) |

### Language

| Content | Source | Public |
|---------|--------|--------|
| Assessment questions | `language-questions.json` | `/language/assessment` |
| Tier-A glossary/lessons/prompts/resources | DB draft | **No pages** |
| Results | Supabase operational | `/language/results` |

### Career

| Content | Source | Public |
|---------|--------|--------|
| CV tools | Client + API | `/career/*` |
| Jobs | **MOCK_JOBS** in client | `/career/jobs` — placeholder |
| Tier-A library | DB draft 130 rows | Not wired |

### Digital Exams

| Content | Source | Public |
|---------|--------|--------|
| Question bank | `digital-exam-subjects.ts` (~902 Q) | `/digital-exams/[subject]` |
| Subjects CMS | `exam_subjects` | Hybrid merge |
| Tier-A study library | DB draft | Not wired |
| EN locale | Arabic-only questions | **Broken EN product** |

### IoT Lab

| Content | Source | Public |
|---------|--------|--------|
| Lessons, projects, challenges | `src/data/iot/*` (59 lessons, 72 projects) | `/iot-lab/*` |
| CMS types | 10 registry tables | Hybrid |
| Tier-A glossary/prompts/resources | DB draft | Not wired |

### Nano Banana

| Content | Source | Public |
|---------|--------|--------|
| Prompt gallery | `nano-banana-prompts.ts` (~100) | `/nano-banana-prompts` |
| Tier-A normalized | **deferred** | Blocked by rules |
| Custom prompts | `nano_banana_custom_prompts` | API supplement |

### Tools Hub (`tools-hub` in content-source)

| Content | Source | Public |
|---------|--------|--------|
| Live tools | `src/data/tools.ts` via `ai_tools` | `/tools` |
| Tier-A `tools_hub_*` | **deferred** | Do not touch |

### Certificates

| Content | Source | Public |
|---------|--------|--------|
| Verify | DB + PDF APIs | 3 URL patterns |
| Templates | Hardcoded brand (old) | PDF/OG |

## Admin vs public gap

| CMS system | Tables | Admin CRUD | Public routes |
|------------|--------|------------|---------------|
| Legacy inline (AdminDashboard) | ai_*, blog, nano | Yes (monolith) | Wired |
| Generic registry | 22 tables | Partial (PATCH bug) | Wired for automation/iot/exams |
| Draft preview | 19 Tier-A tables | Read-only preview | **None** |

## What delays remaining content

| Factor | Applies to |
|--------|------------|
| All Tier-A draft, 0 published | 600 rows |
| No public UI for Tier-A types | lessons, resources per portal |
| ANTIGRAVITY publish prohibition | All Tier-A |
| Schema deferred | tools_hub, nano_banana (230) |
| ID collision on merge | All hybrid pages |
| Missing admin publish workflow | Tier-A preview panel |
| Route gaps | `/cloud`, Tier-A list/detail pages |
| EN localization | digital exams, portal features |
| Mock data | career jobs |

## Content inventory completed

`content_inventory_completed: true` in summary.json.
