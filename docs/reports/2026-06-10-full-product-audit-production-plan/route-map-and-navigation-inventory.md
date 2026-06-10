# Route Map and Navigation Inventory

---

## Full Route Map

### Root
- `/` → redirects to `/ar`

### Locale Routes (`/ar/` and `/en/`)

#### Landing & Core
| Route | Component | Auth | Notes |
|-------|-----------|------|-------|
| `/[locale]` | HomepageClient | None | Main landing page |
| `/[locale]/about` | about/page.tsx | None | Footer-only |
| `/[locale]/contact` | contact/page.tsx | None | Footer-only |
| `/[locale]/privacy` | privacy/page.tsx | None | Footer-only |
| `/[locale]/terms` | terms/page.tsx | None | Footer-only |
| `/[locale]/search` | SearchClient | None | Navbar AI Studio |
| `/[locale]/coming-soon` | ComingSoonPortal | None | Portal status page |

#### AI Academy Portal
| Route | Notes |
|-------|-------|
| `/[locale]/ai-academy` | Portal landing |
| `/[locale]/courses` | Courses list (DB+static) |
| `/[locale]/courses/[slug]` | Course detail (DB+static) |
| `/[locale]/courses/[slug]/lessons/[lessonIndex]` | Lesson detail |
| `/[locale]/tools` | Tools list (DB+static) |
| `/[locale]/tools/[slug]` | Tool detail (DB+static) |
| `/[locale]/projects` | Projects list (DB+static) |
| `/[locale]/projects/[slug]` | Project detail |
| `/[locale]/projects/[slug]/build` | Project build guide |
| `/[locale]/paths` | Roadmaps (DB+static) |
| `/[locale]/blog` | Blog list (DB+static) |
| `/[locale]/blog/[slug]` | Blog post detail |
| `/[locale]/glossary` | AI Glossary |
| `/[locale]/prompts` | Prompt library |
| `/[locale]/claude` | Claude mastery page |

#### AI Studio Tools
| Route | Notes |
|-------|-------|
| `/[locale]/mentor` | AI Mentor chat |
| `/[locale]/prompt-studio` | Prompt enhancement |
| `/[locale]/prompt-score` | Prompt scorer |
| `/[locale]/prompt-battle` | Prompt vs prompt |
| `/[locale]/claude-code-generator` | Claude Code gen |
| `/[locale]/tool-recommender` | Tool recommender |
| `/[locale]/compare-tools` | Tool comparison |
| `/[locale]/roadmap-generator` | Learning roadmap gen |
| `/[locale]/project-generator` | Project idea gen |
| `/[locale]/challenges` | Challenge hub |
| `/[locale]/leaderboard` | Top learners |

#### Automation Portal
| Route | Notes |
|-------|-------|
| `/[locale]/automation` | Portal landing |
| `/[locale]/automation/templates` | Recipe library (30 workflows) |
| `/[locale]/automation/templates/[slug]` | Workflow detail |
| `/[locale]/automation/tools` | Tools explorer |
| `/[locale]/automation/paths` | Learning paths |
| `/[locale]/automation/services` | Professional services |
| `/[locale]/automation/labs` | Hands-on labs |
| `/[locale]/automation/labs/[labId]` | Lab detail |
| `/[locale]/automation/automation-agent` | AI automation agent |
| `/[locale]/automation-glossary` | Automation glossary (**ORPHANED**) |

#### Language Portal
| Route | Notes |
|-------|-------|
| `/[locale]/language` | Portal landing |
| `/[locale]/language/assessment` | Level test |
| `/[locale]/language/results` | Test results |
| `/[locale]/language/history` | Test history |
| `/[locale]/language/verify/[certId]` | Certificate verify |

#### Digital Exams Portal
| Route | Notes |
|-------|-------|
| `/[locale]/digital-exams` | Portal landing |
| `/[locale]/digital-exams/[subject]` | Subject exam |
| `/[locale]/digital-exams/mixed` | Mixed exam |
| `/[locale]/digital-exams/library` | Question library |
| `/[locale]/digital-exams/history` | Exam history |

#### Career Portal
| Route | Notes |
|-------|-------|
| `/[locale]/career` | Portal landing |
| `/[locale]/career/cv-analyzer` | ATS CV analyzer (AI) |
| `/[locale]/career/builder` | CV builder |
| `/[locale]/career/jobs` | Job portal |
| `/[locale]/career/interview` | Interview prep (AI) |
| `/[locale]/career/templates` | CV templates |

#### IoT Lab Portal
| Route | Notes |
|-------|-------|
| `/[locale]/iot-lab` | Portal landing |
| `/[locale]/iot-lab/lessons` | Lessons list (59 lessons) |
| `/[locale]/iot-lab/lessons/[slug]` | Lesson detail |
| `/[locale]/iot-lab/projects` | Projects (72) |
| `/[locale]/iot-lab/projects/[slug]` | Project detail |
| `/[locale]/iot-lab/challenges` | Challenges (40) |
| `/[locale]/iot-lab/challenges/[slug]` | Challenge detail |
| `/[locale]/iot-lab/component-library` | Component library |
| `/[locale]/iot-lab/component-library/[slug]` | Component detail |
| `/[locale]/iot-lab/paths` | IoT learning paths |
| `/[locale]/iot-lab/paths/[slug]` | Path detail |
| `/[locale]/iot-lab/simulator` | Arduino simulator |
| `/[locale]/iot-lab/exams` | IoT exams |

#### Nano Banana Portal
| Route | Notes |
|-------|-------|
| `/[locale]/nano-banana-prompts` | Gemini prompt gallery |

#### Cloud Academy (ORPHANED)
| Route | Notes |
|-------|-------|
| `/[locale]/cloud` | **ORPHANED** — not in portals.tsx |

#### Auth Pages
| Route | Notes |
|-------|-------|
| `/[locale]/login` | Sign in |
| `/[locale]/register` | Create account |
| `/[locale]/forgot-password` | Password recovery |
| `/[locale]/reset-password` | Password reset |
| `/[locale]/onboarding` | Post-signup setup |

#### User Pages (Auth-gated)
| Route | Notes |
|-------|-------|
| `/[locale]/dashboard` | Student dashboard |
| `/[locale]/profile` | Account settings |
| `/[locale]/learning-plans` | AI-generated plans |
| `/[locale]/certificates` | User certificates |
| `/[locale]/certificates/verify/[certId]` | Certificate verification |

#### Admin
| Route | Notes |
|-------|-------|
| `/[locale]/admin` | Admin dashboard (admin role required) |

---

## Navigation Inventory

### Navbar Main Links (both locales)
1. Home (`/`)
2. Paths (`/paths`)
3. Tools (`/tools`)
4. Claude (`/claude`)
5. Projects (`/projects`)
6. Blog (`/blog`)

### Navbar Portals Dropdown
All 8 portals from `portals.tsx`:
1. AI Academy → `/ai-academy`
2. Language → `/language`
3. Digital Exams → `/digital-exams`
4. Career → `/career`
5. Automation → `/automation`
6. IoT Lab → `/iot-lab`
7. Nano Banana → `/nano-banana-prompts`
8. Future Portals → `/coming-soon`

**NOT in dropdown:** `/cloud` (orphaned)

### Navbar AI Studio Dropdown
From Navbar.tsx aiStudioItems (partial, verified):
1. `/mentor`
2. `/prompt-studio`
3. `/prompt-score`
4. `/prompt-battle`
5. `/claude-code-generator`
6. `/tool-recommender`
7. `/compare-tools`
8. `/roadmap-generator`
9. `/project-generator`
10. `/nano-banana-prompts`

**NOT in AI Studio:** `/automation-glossary`, `/cloud`, `/search` (separate)

### Footer Portals Column
All portals from portals.tsx (same 8 as above)

### Footer AI Studio Column
1. AI Mentor, Prompt Studio, Prompt Score, Prompt Battle, Claude Code Generator, Compare Tools, Project Generator, Challenges, Leaderboard

### Footer Links Column
1. Courses, AI Tools, Blog, Glossary, About, Contact, Privacy Policy, Terms

---

## Navigation Gaps

| Missing Link | Severity | Recommendation |
|-------------|----------|----------------|
| `/cloud` nowhere in nav | Critical | Add to portals.tsx or create redirect |
| `/automation-glossary` nowhere | High | Add to automation portal sub-nav |
| `/courses` not in main nav (only footer) | Medium | Add to main nav or portal |
| `/onboarding` unclear flow | Medium | Document post-registration flow |
| `/search` in AI Studio but not main nav bar | Low | Add search icon to main nav |
