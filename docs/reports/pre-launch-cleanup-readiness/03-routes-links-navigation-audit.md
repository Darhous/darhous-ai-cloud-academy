# 03 — Routes, Links & Navigation Audit
**Date:** 2026-06-12  
**Phase:** Pre-Launch Cleanup — Navigation & Dead Links

---

## الصفحات الموجودة فعليًا (src/app/[locale]/)

| Route | موجودة؟ | مرتبطة من؟ | ملاحظة |
|-------|---------|-----------|--------|
| `/` | ✅ | — | الرئيسية |
| `/about` | ✅ | Footer | — |
| `/admin` | ✅ | Navbar (admin user only) | — |
| `/ai-academy` | ✅ | Portals, Footer | — |
| `/automation` | ✅ | Portals, Footer | — |
| `/automation/automation-agent` | ✅ | Automation portal nav | — |
| `/automation/case-studies` | ✅ | Automation portal nav | — |
| `/automation/checklists` | ✅ | Automation portal nav | — |
| `/automation/labs` | ✅ | Automation portal nav | — |
| `/automation/labs/[labId]` | ✅ | Dynamic from labs list | — |
| `/automation/paths` | ✅ | Automation portal nav | — |
| `/automation/prompts` | ✅ | Automation portal nav | — |
| `/automation/services` | ✅ | Automation portal nav | — |
| `/automation/templates` | ✅ | Automation portal nav | — |
| `/automation/templates/[slug]` | ✅ | Dynamic from templates list | — |
| `/automation/tools` | ✅ | Automation portal nav | — |
| `/automation/use-cases` | ✅ | Automation portal nav | — |
| `/automation-glossary` | ✅ | Footer | — |
| `/blog` | ✅ | Footer | — |
| `/blog/[slug]` | ✅ | Blog list | ⚠️ محتوى ناقص لبعض المقالات |
| `/career` | ✅ | Portals, Footer (indirect) | — |
| `/career/builder` | ✅ | Career portal nav | ⚠️ AI-assist زر "قريباً" |
| `/career/cv-analyzer` | ✅ | Career portal nav | — |
| `/career/interview` | ✅ | Career portal nav | — |
| `/career/jobs` | ✅ | Career portal nav | ⚠️ Apply button "قريباً" |
| `/career/templates` | ✅ | Career portal nav | — |
| `/certificates` | ✅ | Dashboard, Navbar | — |
| `/certificates/verify/[certId]` | ✅ | Certificate pages | — |
| `/challenges` | ✅ | Footer (AI Studio) | — |
| `/claude` | ✅ | AI Academy internal | ? |
| `/claude-code-generator` | ✅ | Footer (AI Studio) | — |
| `/cloud` | ✅ | **غير مرتبطة** ⛔ | صفحة موجودة، بلا رابط في nav/footer/portals |
| `/coming-soon` | ✅ | Portals (Future Portals card) | مقصودة |
| `/compare-tools` | ✅ | Footer (AI Studio) | — |
| `/contact` | ✅ | Footer | — |
| `/courses` | ✅ | Footer | — |
| `/courses/[slug]` | ✅ | Courses list | — |
| `/courses/[slug]/lessons/[lessonIndex]` | ✅ | Course detail | ⚠️ محتوى ناقص "Coming Soon" |
| `/dashboard` | ✅ | Navbar (logged-in users) | — |
| `/design-lab` | ✅ | **غير مرتبطة** | مختبر تصميم داخلي |
| `/design-lab/reference-concept-[1-5]` | ✅ | design-lab index | مختبر داخلي |
| `/digital-exams` | ✅ | Portals, Footer | — |
| `/digital-exams/[subject]` | ✅ | Digital exams portal | — |
| `/digital-exams/history` | ✅ | Digital exams portal | — |
| `/digital-exams/library` | ✅ | Digital exams portal | ⚠️ "قريبًا" للكتب |
| `/digital-exams/mixed` | ✅ | Digital exams portal | — |
| `/forgot-password` | ✅ | Login page | — |
| `/glossary` | ✅ | Footer | — |
| `/iot-lab` | ✅ | Portals, Footer | — |
| `/iot-lab/challenges` | ✅ | IoT portal nav | — |
| `/iot-lab/challenges/[slug]` | ✅ | Challenges list | — |
| `/iot-lab/component-library` | ✅ | IoT portal nav | — |
| `/iot-lab/component-library/[slug]` | ✅ | Component list | — |
| `/iot-lab/exams` | ✅ | IoT portal nav | — |
| `/iot-lab/lessons` | ✅ | IoT portal nav | — |
| `/iot-lab/lessons/[slug]` | ✅ | Lessons list | — |
| `/iot-lab/paths` | ✅ | IoT portal nav | — |
| `/iot-lab/paths/[slug]` | ✅ | Paths list | — |
| `/iot-lab/projects` | ✅ | IoT portal nav | — |
| `/iot-lab/projects/[slug]` | ✅ | Projects list | — |
| `/iot-lab/simulator` | ✅ | IoT portal nav | — |
| `/language` | ✅ | Portals, Footer | — |
| `/language/assessment` | ✅ | Language portal | — |
| `/language/history` | ✅ | Language portal | — |
| `/language/results` | ✅ | Language portal | — |
| `/language/verify/[certId]` | ✅ | Language portal | — |
| `/leaderboard` | ✅ | Footer (AI Studio) | — |
| `/learning-plans` | ✅ | Dashboard | — |
| `/login` | ✅ | Navbar | — |
| `/mentor` | ✅ | Footer (AI Studio) | — |
| `/nano-banana-prompts` | ✅ | Portals, Footer | — |
| `/onboarding` | ✅ | Post-registration flow | — |
| `/paths` | ✅ | **غير مرتبطة واضحة** | — |
| `/privacy` | ✅ | Footer | — |
| `/profile` | ✅ | Navbar (logged-in) | — |
| `/project-generator` | ✅ | Footer (AI Studio) | — |
| `/projects` | ✅ | **غير مرتبطة واضحة** | — |
| `/projects/[slug]` | ✅ | Projects list | — |
| `/projects/[slug]/build` | ✅ | Project detail | — |
| `/prompt-battle` | ✅ | Footer (AI Studio) | — |
| `/prompt-score` | ✅ | Footer (AI Studio) | — |
| `/prompt-studio` | ✅ | Footer (AI Studio) | — |
| `/prompts` | ✅ | Footer (AI Studio) | — |
| `/register` | ✅ | Navbar/Login | — |
| `/reset-password` | ✅ | Forgot password flow | — |
| `/roadmap-generator` | ✅ | **غير مرتبطة واضحة** | — |
| `/search` | ✅ | Navbar | — |
| `/terms` | ✅ | Footer | — |
| `/tool-recommender` | ✅ | **غير مرتبطة واضحة** | — |
| `/tools` | ✅ | Footer | — |
| `/tools/[slug]` | ✅ | Tools list | — |
| `/ui-lab` | ✅ | **غير مرتبطة** | dev-only, `robots: noindex` |

---

## صفحات موجودة بدون رابط واضح

| الصفحة | الأولوية | الاقتراح |
|--------|---------|---------|
| `/cloud` | عالية — محتوى جاهز | إضافة للـ portals registry أو رابط في nav |
| `/design-lab` | منخفضة — مختبر داخلي | إبقاؤها بدون رابط عام (مقصود) |
| `/ui-lab` | منخفضة — dev tool | noindex صحيح — لا إجراء |
| `/paths` | متوسطة | فحص المحتوى وربطه |
| `/projects` | متوسطة | ربطه بالـ AI Academy |
| `/roadmap-generator` | منخفضة | ربطه بـ AI Studio section |
| `/tool-recommender` | منخفضة | ربطه بـ Tools page |

---

## روابط Footer المفحوصة

| الرابط | موجود؟ | الحالة |
|--------|--------|-------|
| /mentor | ✅ | OK |
| /prompt-studio | ✅ | OK |
| /prompt-score | ✅ | OK |
| /prompt-battle | ✅ | OK |
| /claude-code-generator | ✅ | OK |
| /compare-tools | ✅ | OK |
| /project-generator | ✅ | OK |
| /challenges | ✅ | OK |
| /leaderboard | ✅ | OK |
| /prompts | ✅ | OK |
| /courses | ✅ | OK |
| /tools | ✅ | OK |
| /blog | ✅ | OK |
| /glossary | ✅ | OK |
| /automation-glossary | ✅ | OK |
| /about | ✅ | OK |
| /contact | ✅ | OK |
| /privacy | ✅ | OK |
| /terms | ✅ | OK |

**كل روابط Footer تشير لصفحات موجودة. لا روابط ميتة في Footer.**

---

## روابط Portals المفحوصة

| Portal | href | موجود؟ |
|--------|------|--------|
| AI Academy | /ai-academy | ✅ |
| Language | /language | ✅ |
| Digital Exams | /digital-exams | ✅ |
| Career | /career | ✅ |
| Automation | /automation | ✅ |
| IoT Lab | /iot-lab | ✅ |
| Nano Banana | /nano-banana-prompts | ✅ |
| Coming Soon | /coming-soon | ✅ |

---

## href="#" المكتشفة

| الموقع | عدد التكرارات | الحالة |
|--------|--------------|--------|
| `design-lab/reference-concept-4` | 6 | **مختبر داخلي** — مقصود |
| `design-lab/reference-concept-5` | 5 | **مختبر داخلي** — مقصود |

**لا يوجد `href="#"` في أي صفحة إنتاجية.**

---

## الإصلاحات المطبقة

- لم يُطبق ربط إجباري لأي صفحة يتيمة. سبب: `/cloud` يحتاج قرار تصميمي (icon, color) قبل إضافتها للـ portals. `/paths` و `/projects` و `/roadmap-generator` و `/tool-recommender` غير مكتملة بما يكفي لعرضها بشكل بارز.
- **توصية:** إضافة `/cloud` للـ portals registry في جلسة لاحقة بعد تحديد icon وcolor المناسبين.
