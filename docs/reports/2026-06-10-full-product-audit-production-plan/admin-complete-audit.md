# Admin Complete Audit

**Route:** `/[locale]/admin`  
**Primary file:** `src/components/admin/AdminDashboardClient.tsx` (~5,300+ lines)  
**IA shell:** `AdminSidebar.tsx`, `admin-navigation.ts` (10 groups, 29 tabs)

## Production-ready?

**No. Score: 4/10**

Usable for power users and pilots; not safe or complete for full academy CMS operations.

## Routing & access

| Check | Status |
|-------|--------|
| Localized admin route | Yes |
| Role check | Server/layout gate (admin role) |
| Non-admin redirect | Yes — needs UX copy audit |
| Mobile sidebar | Collapsible shell present |

## Navigation / sidebar

| Group | Tabs | Real vs placeholder |
|-------|------|---------------------|
| Overview | overview, analytics | Overview real; analytics partial |
| Content/CMS | 11 tabs | **Real** but PATCH bugs on generic CMS |
| Review | draft-preview | **Read-only** — no publish |
| Users | users, certificates, email | Real |
| Portals | 8 portal managers | Mix — shortcuts + embedded panels |
| System | theme, audit, site-builder, mentor-control, language | Mixed |

**Dead admin pages:** None — all tabs render panels.  
**Disconnected:** Draft preview not linked to publish actions.

## CRUD by content type

| Type | List | Add | Edit | Delete | Publish | Image upload |
|------|:----:|:---:|:----:|:------:|:-------:|:------------:|
| Blog | ✓ | ✓ | ✓ | ✓ | status field | partial |
| AI courses/tools/prompts/glossary/projects/paths | ✓ | ✓ | ✓ | ✓ | ✓ | partial |
| Automation CMS (11) | ✓ | ✓ | ✓ | ✓ | **broken PATCH** | varies |
| IoT CMS (10) | ✓ | ✓ | ✓ | ✓ | **broken PATCH** | varies |
| Exams CMS | ✓ | ✓ | ✓ | ✓ | **broken PATCH** | — |
| Tier-A draft (19 tables) | preview | ✗ | ✗ | ✗ | ✗ | ✗ |
| Nano banana custom | ✓ | ✓ | ✓ | ✓ | API | — |
| Users/certificates | ✓ | partial | partial | limited | — | avatar API |

## Critical admin defects

1. **GenericCmsTypePanel** sends `status` on every save; API rejects for 21/22 non-pilot tables → edits fail with 403
2. **DELETE** on generic CMS → permanent deletion across registry
3. **No unified publish workflow** for Tier-A draft-preview tables
4. **Monolith** — regression risk, no isolated testing per panel
5. **Create defaults** — some APIs default `published` (documented risk)

## Empty / loading / error states

| Area | Quality |
|------|---------|
| CMS tables | Basic empty text |
| Draft preview | Search/filter present |
| Forms | Long inline forms — overwhelming |
| Errors | Often generic toast/alert |
| Loading | Inconsistent spinners |

## Search / filter / sort

- Draft preview: search yes
- Generic CMS: portal-type dependent
- Users tab: email/name search yes
- Most CMS lists: basic filter only

## Arabic / English admin

- Sidebar labels bilingual
- Form fields often dual AR/EN columns
- Mixed RTL in long forms — acceptable but dense

## Can admin manage each portal's content?

| Portal | Manageable today | Gap |
|--------|------------------|-----|
| AI Academy | Yes (inline CMS tabs) | Tier-A lessons/resources preview only |
| Automation | Yes (automation-cms) | PATCH bug; glossary page separate |
| IoT | Yes (iot-cms) | PATCH bug |
| Digital exams | Yes (exams-cms) | PATCH bug; questions static |
| Language | Portal tab + results | No Tier-A content CRUD |
| Career | Portal tab | No job CMS; mock jobs |
| Nano banana | Tab + custom prompts | Tier-A deferred |
| Tools hub | Via ai-tools-cms | tools_hub Tier-A deferred |
| Cloud | **No admin entry** | Page is static shell |

## Safe publishing?

**No.** Lifecycle not locked; DELETE enabled; status handling inconsistent; 0 published Tier-A; explicit project rule against unprompted publishing.

## What must be built before admin supports full academy

1. Fix generic CMS PATCH/status contract
2. Disable or soft-delete only
3. Publish workflow UI for Tier-A (draft → review → publish) with approval gates
4. Extract remaining monolith panels
5. Cloud portal CMS or deprecate `/cloud`
6. Career jobs real CMS or remove mock
7. Unified content type registry merging 22 + 19 tables
8. Image/asset pipeline documentation

## Verdict answers

| Question | Answer |
|----------|--------|
| Production-ready? | **No** |
| Real vs placeholder | ~70% real panels, 30% partial/shortcut |
| Missing controls | Tier-A publish, cloud, career jobs, bulk ops |
| Unmanageable types | Tier-A lessons/resources all portals, deferred hubs |
