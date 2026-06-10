# Implementation Notes — N1

## Item 1: /cloud portal documented in portals.ts

**File:** `src/config/portals.ts`  
**Approach:** Added a TODO comment block after the `portals` array (just above `availablePortals`), not a live entry.  
**Reason:** The task allowed "add a TODO comment block documenting the gap" if a full entry is risky without design approval. The `/cloud` page already exists and has metadata, but no icon/color/gradient design decision has been made for the portal card on the landing page. The comment block includes a full suggested skeleton so the team can copy-paste when approved.

## Item 2: /language/history removed from sitemap.ts

**File:** `src/app/sitemap.ts`, line 29  
**Before:** `"/ai-academy", "/language", "/language/history",`  
**After:** `"/ai-academy", "/language",`  
**Reason:** `/language/history` is a noindex route and must not appear in the sitemap per the task spec.

## Item 3: /prompts and /automation-glossary added to Footer

**File:** `src/components/layout/Footer.tsx`  
**Changes:**
- `/prompts` → added to `aiStudioLinks` as `"🔬 مختبر البرومبتات"` / `"🔬 Prompt Lab"` (fits in the AI tools column alongside prompt-studio, prompt-score, etc.)
- `/automation-glossary` → added to `moreLinks` as `"مسرد الأتمتة"` / `"Automation Glossary"` (fits next to `/glossary` in the links column)

Both labels are bilingual (Arabic/English) following the existing pattern.

## Item 4: AutomationGlossary admin CTA href corrected

**File:** `src/app/[locale]/automation-glossary/AutomationGlossaryClient.tsx`, line 39  
**Before:** `href={\`/${locale}/dashboard\`}`  
**After:** `href={\`/${locale}/admin\`}`  
**Reason:** The automation glossary terms are managed in the admin panel at `/${locale}/admin` (AdminDashboardClient), not the user dashboard. The admin navigation (`admin-navigation.ts`) has an `automation-cms` tab. Since tab navigation is client-side only (useState), the base URL `/admin` is the correct entry point.
