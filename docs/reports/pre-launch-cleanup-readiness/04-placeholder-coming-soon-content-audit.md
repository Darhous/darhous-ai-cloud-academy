# 04 — Placeholder & Coming-Soon Content Audit
**Date:** 2026-06-12  
**Phase:** Pre-Launch Cleanup — Content Readiness

---

## تصنيف المحتوى غير الجاهز

### 🔴 Blocker قبل الإطلاق

| الموقع | النص | التفاصيل |
|--------|------|---------|
| `src/app/[locale]/blog/[slug]/page.tsx` | `"Full content coming soon..."` | يظهر للمستخدم عند فتح مقال MDX غير مكتمل. إذا كان هناك مقالات منشورة بدون محتوى كامل، يراها المستخدم. |

**الملاحظة:** هذا fallback منطقي ومطلوب تقنيًا. المشكلة إذا كانت هناك مقالات blog منشورة فعليًا بدون محتوى MDX كافٍ. يحتاج مراجعة قاعدة البيانات.

---

### 🟡 Important — ليس Blocker

| الموقع | النص | التصنيف | الوصف |
|--------|------|---------|-------|
| `src/components/career/CVBuilderClient.tsx:244` | `صياغة بـ AI (قريباً)` | مهم | زر في CV Builder معطل — ميزة لم تُبنَ بعد |
| `src/components/career/JobsClient.tsx:219` | `التقديم على الوظيفة (قريباً)` | مهم | زر Apply معطل في صفحة الوظائف |
| `src/app/[locale]/courses/[slug]/lessons/[lessonIndex]/page.tsx:155` | `"Content Coming Soon"` | مهم | يظهر للدروس التي ليس لها محتوى مفصل بعد |
| `src/components/exams/DigitalExamsLibraryClient.tsx:118` | `"سيتم إضافة كتب ومذكرات قريبًا"` | مهم | قسم المكتبة الرقمية فارغ |

---

### 🟢 آمن ومقصود

| الموقع | النص | السبب |
|--------|------|-------|
| `src/config/portals.ts` | `"قريبًا" / "Soon"` في badge البوابات | مقصود — الشارة تشير للبوابات في حالة "coming-soon" |
| `src/components/ecosystem/PortalCard.tsx` | `badgeAr ?? "قريبًا"` | fallback منطقي للشارة |
| `src/components/landing/sections/EcosystemMap.tsx` | `"قريبًا"` | label للبوابات غير المتاحة في الخريطة |
| `src/app/[locale]/coming-soon/page.tsx` | صفحة coming-soon | صفحة مخصصة لهذا الغرض — مقصودة |
| `src/components/contact/ContactForm.tsx:50` | `"We'll get back to you soon"` | رسالة تأكيد نموذج التواصل — صحيحة |
| `src/app/api/admin/ai-courses/route.ts` | `coming_soon` field | حقل DB للدورات المجدولة — آمن |
| `src/components/admin/AdminDashboardClient.tsx` | `coming_soon` checkbox | عنصر تحكم admin — آمن |
| `src/app/[locale]/automation/tools/page.tsx` | `statusColor = "قريبًا"` | تلوين حالة الأدوات — آمن |

---

## البحث عن TODO / FIXME في الكود الإنتاجي

| النمط | عدد التكرارات | الموقع الرئيسي |
|-------|--------------|---------------|
| `TODO` | محدود | portals.ts (TODO تعليق لـ `/cloud`) |
| `FIXME` | 0 | — |
| `console.log` | موجود في بعض components | تحسين لاحق |
| `Lorem` | 0 في production | — |
| `example.com` | 0 في production | فقط في form placeholder كـ `name@example.com` |
| `dummy` | 1 في API comment | `route.tsx:5` — تعليق، لا يظهر للمستخدم |

---

## Placeholder في Input Fields (آمن)

جميع `placeholder` attributes في حقول النماذج هي نصوص توجيهية للمستخدم (مثال: "ابحث عن مصطلح...") — هذا سلوك صحيح ومطلوب، ليس محتوى تجريبيًا.

---

## Social Links (مفحوصة)

| المنصة | الرابط | الحالة |
|--------|--------|-------|
| Instagram | https://www.instagram.com/darhous/ | ✅ رابط حقيقي |
| LinkedIn | https://www.linkedin.com/in/darhous/ | ✅ رابط حقيقي |
| Facebook | https://www.facebook.com/ahmed.darhous | ✅ رابط حقيقي |
| WhatsApp | (موجود في data/social-links.ts) | ✅ رابط حقيقي |
| Email | ahmeddarhous@gmail.com | ✅ بريد حقيقي |

**لا توجد روابط سوشيال وهمية.**

---

## Metadata / SEO

- `next.config.ts` يضبط Security headers صحيحة.
- `robots.ts` موجود وجاهز.
- `sitemap.ts` موجود وجاهز.
- `og/` route موجود لصور Open Graph.
- `/ui-lab` لها `robots: { index: false }` — صحيح.

---

## الصور المفقودة

لم يُكتشف مرجع لصورة مفقودة في `public/` من خلال الفحص. ملفات `public/` تحتوي:
- `automation/` — أيقونات/صور للبوابة
- `nano-banana/` — أصول صور
- ملفات SVG أساسية

---

## الخلاصة

| المجال | الحالة |
|--------|-------|
| روابط سوشيال | ✅ جاهزة |
| Metadata/SEO | ✅ جاهزة |
| TODO/FIXME في production | ✅ لا يوجد حاد |
| محتوى Lorem/Dummy للمستخدم | ✅ لا يوجد |
| "قريباً" مقصودة | ✅ موثقة |
| "قريباً" غير مقصودة (ميزات لم تُبنَ) | ⚠️ 2 حالات في Career portal |
| محتوى ناقص يظهر للمستخدم | ⚠️ Blog + Lessons fallback |
