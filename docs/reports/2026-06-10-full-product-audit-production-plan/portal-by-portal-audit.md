# Portal-by-Portal Audit

Scores are **production readiness 0–10** at HEAD `94348be`.

---

## Landing / Home

| Field | Value |
|-------|-------|
| Routes | `/[locale]` |
| Purpose | Ecosystem entry, portal discovery |
| UI quality | Good structure; owner-visible premium cards effect **missing** |
| Content | Marketing copy; portal registry driven |
| Admin | portals tab |
| Mobile/RTL | Good |
| Score | **5/10** |
| Blockers | Unmounted 3D showcase; tour disabled; cards below fold; EN feature leak |
| Next fixes | Phase L1 landing visual repair |

---

## AI Academy

| Field | Value |
|-------|-------|
| Routes | `/ai-academy`, `/courses`, `/tools`, `/prompts`, `/glossary`, `/projects`, `/paths`, AI studio tools |
| Content | Rich static `src/data/*`; hybrid DB |
| Admin | ai-*-cms tabs |
| Score | **7/10** |
| Blockers | Tier-A lessons/resources unwired; `/prompts` orphan nav; 0 DB publish |
| Next fixes | Nav link prompts; Tier-A pilot routes |

---

## Automation

| Field | Value |
|-------|-------|
| Routes | `/automation`, templates, tools, labs, paths, services, agent, glossary |
| Content | Strong static library + 11 CMS tables |
| Admin | automation-cms, automation portal tab |
| Score | **7/10** |
| Blockers | Generic CMS PATCH; glossary orphan nav |
| Next fixes | CMS PATCH fix; link glossary |

---

## Cloud

| Field | Value |
|-------|-------|
| Routes | `/cloud` only |
| Content | Static section cards — no lessons/labs |
| Admin | **None** |
| Score | **3/10** |
| Blockers | Orphan route; not in portals.ts; no CMS |
| Next fixes | Add to portals OR deprecate; wire content or merge into AI Academy |

---

## Language

| Field | Value |
|-------|-------|
| Routes | `/language`, assessment, history, results, verify redirect |
| Content | Static question bank; operational results |
| Admin | language tab |
| Score | **6/10** |
| Blockers | Tier-A unwired; cert URL duplication |
| Next fixes | Tier-A glossary route; cert canonical URL |

---

## Career

| Field | Value |
|-------|-------|
| Routes | `/career`, cv-analyzer, builder, jobs, interview, templates |
| Content | AI tools real; **jobs mock** |
| Admin | career tab |
| Score | **6/10** |
| Blockers | Mock jobs; Tier-A unwired |
| Next fixes | Jobs data source decision; Tier-A pilot |

---

## Digital Exams

| Field | Value |
|-------|-------|
| Routes | `/digital-exams`, `[subject]`, library, mixed, history |
| Content | 902+ questions static; hybrid subjects |
| Admin | exams-cms, digital-exams tab |
| Score | **6/10** |
| Blockers | EN Arabic leak; Tier-A unwired; CMS PATCH |
| Next fixes | Localization; CMS fix |

---

## IoT Lab

| Field | Value |
|-------|-------|
| Routes | 12 sub-routes (lessons, projects, challenges, simulator, etc.) |
| Content | Rich static + 10 CMS tables |
| Admin | iot-cms, iot-lab tab |
| Score | **8/10** |
| Blockers | Tier-A glossary/prompts/resources unwired; CMS PATCH |
| Next fixes | CMS fix; optional Tier-A surfaces |

---

## Nano Banana

| Field | Value |
|-------|-------|
| Routes | `/nano-banana-prompts` |
| Content | ~100 static prompts + custom DB |
| Admin | nano-banana tab |
| Score | **6/10** |
| Blockers | Tier-A **deferred** per rules; do not import |
| Next fixes | Polish UX only; defer Tier-A |

---

## Tools Hub

| Field | Value |
|-------|-------|
| Routes | `/tools`, `/tools/[slug]`, `/compare-tools` |
| Content | ~77 tools static + `ai_tools` |
| Admin | ai-tools-cms |
| Score | **7/10** |
| Blockers | `tools_hub` Tier-A deferred |
| Next fixes | None for deferred; improve discovery |

---

## Certificates / Verify

| Field | Value |
|-------|-------|
| Routes | 3 verify patterns + `/certificates` dashboard |
| Content | Old brand in templates |
| Admin | certificates tab |
| Score | **4/10** |
| Blockers | Security (IDOR); URL chaos; brand |
| Next fixes | Phase S1 certificate hardening |

---

## Auth pages

| Routes | login, register, forgot, reset, onboarding |
| Score | **7/10** |
| Blockers | Login page lists env var names (info leak minor) |

---

## User dashboard / profile

| Routes | `/dashboard`, `/profile`, `/learning-plans` |
| Score | **7/10** |
| Blockers | Large client component; performance on low-end mobile |

---

## Admin

| Route | `/admin` |
| Score | **4/10** |
| Blockers | Monolith, CMS PATCH, DELETE, no Tier-A publish |

---

## Portals audited list

`landing`, `ai-academy`, `automation`, `cloud`, `language`, `career`, `digital-exams`, `iot-lab`, `nano-banana`, `tools-hub`, `certificates`, `auth`, `dashboard`, `admin`
