# 02 — External Repos & Folders Audit
**Date:** 2026-06-12  
**Phase:** Pre-Launch Cleanup — External Scope

---

## Parent Directory (`ai cources/`) Contents

| المجلد/الملف | النوع | الصلة بالمشروع |
|-------------|------|---------------|
| `darhous-ai-cloud-academy/` | **المشروع الرئيسي** | — |
| `landing/` | مجلد docs/reports قديم | وثائق من مراحل التطوير المبكرة |
| `stitch_darhous_ai_cloud_academy_ui/` | Stitch UI mockups | تصاميم أولية للواجهات |
| `تقارير/` | مجلد تقارير عربية | خطط وتقارير تحليلية قديمة |
| `ChatGPT Image Jun 5, 2026...png` | صورة | أصل تصميمي |

---

## تفاصيل كل مجلد

### `landing/` (38+ مجلد فرعي)

**الطبيعة:** مجلد `docs/` يحتوي تقارير من مراحل البناء (Phase 5a إلى Phase 5g وما بعدها).

**المحتوى:** تقارير Antigravity من جلسات Claude — بلا كود.

**العلاقة:** توثيق تاريخي للمشروع الرئيسي.

**القرار:** إبقاؤه كما هو. لا يحتاج دمجًا. يمكن أرشفته لاحقًا بعد الإطلاق. لا يؤثر على البناء أو Runtime.

---

### `stitch_darhous_ai_cloud_academy_ui/` (15+ مجلد)

**الطبيعة:** حزم HTML/CSS ثابتة من أداة Stitch لتصميم المكونات.

**المحتوى:**
- `homepage_darhous_ai_academy_1/`
- `homepage_darhous_ai_academy_2/`
- `homepage_arabic_dark_darhous_ai_academy/`
- `homepage_english_light_darhous_ai_academy/`
- `courses_darhous_ai_academy/`
- `glossary_darhous_ai_academy/`
- `cloud_academy_darhous_ai_academy/`
- `claude_mastery_darhous_ai_academy/`
- `ai_tools_hub_darhous_ai_academy/`
- `prompt_library_darhous_ai_academy/`
- `learning_paths_darhous_ai_academy/`
- `projects_library_darhous_ai_academy/`
- `student_dashboard_coming_soon_darhous_ai_academy/`
- `synthetic_intelligence_command/`
- `aetheric_command/`
- `stitch_darhous_smart_learning_ecosystem.zip`

**القرار:** نماذج تصميم أولية — **مستقلة تمامًا** عن الكود الإنتاجي. تُحفظ للمرجع البصري. لا تحتاج دمجًا.

---

### `تقارير/` (3 ملفات md + SQL + مجلدات)

**الطبيعة:** تقارير تحليلية كُتبت أثناء مرحلة التخطيط.

**المحتوى:**
- `00_التقرير_الشامل.md`
- `Future_Development_Backlog.md`
- `خطة_التطوير_الشاملة.md`
- `اصلاح_الجداول_الناقصة.sql`
- `دليل_تأكيد_Supabase_RLS.md`
- مجلدات: `الأقسام/` و `البوابات/`

**القرار:** وثائق تحليلية تاريخية. لا تؤثر على البناء. تُحفظ للمرجع.

---

## بوابة الامتحانات (Digital Exams)

**الحالة:** مدمجة داخل المشروع الرئيسي في:
- `src/app/[locale]/digital-exams/` — الواجهة
- `src/app/api/exams/` — API
- Supabase — البيانات

**ملاحظة في portals.ts:**
```
externalRepo: "https://github.com/Darhous/Exams_Platform"
```
يشير ذلك إلى ريبو قديم لنظام الامتحانات بـ Python (`.legacy-exams-app.py`). البوابة الحالية Next.js مستقلة تمامًا.

**القرار:** لا يحتاج إجراء. البوابة تعمل محليًا.

---

## بوابة اللغة (Language Portal)

**الحالة:** مدمجة داخل المشروع الرئيسي في:
- `src/app/[locale]/language/` — الواجهة
- `src/app/api/language/` — API

**ملاحظة في portals.ts:**
```
externalRepo: "https://github.com/Darhous/darhous-assessment"
```
يشير إلى ريبو تقييم خارجي قد يكون نسخة أولى أو مشروع مستقل.

**القرار:** البوابة تعمل محليًا. الريبو الخارجي مرجعي فقط. لا يحتاج إجراء عاجلًا.

---

## توصيات التنظيم

| المجلد | التوصية |
|--------|---------|
| `landing/` | إبقاؤه — توثيق تاريخي مفيد |
| `stitch_*` | إبقاؤه — مرجع بصري قيّم |
| `تقارير/` | إبقاؤها — وثائق تحليلية |
| `.legacy-exams-*` | مخفية بالفعل — لا إجراء |
| الريبوز الخارجية | موثقة — لا دمج مطلوب حاليًا |

**لا يوجد ريبو خارجي غير موثق يحتاج دمجًا فوريًا.**
