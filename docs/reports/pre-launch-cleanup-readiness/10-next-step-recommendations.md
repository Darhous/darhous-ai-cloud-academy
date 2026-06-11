# 10 — Next Steps: From Soft Launch to Full Public Launch
**Date:** 2026-06-12  
**Author:** Strategic Audit — NexaLearn by Ahmed Darhous  
**Based on:** Pre-Launch Readiness Audit (reports 00–09)

---

## 1. Executive Summary

### أين نقف الآن؟

NexaLearn جاهز تقنيًا بنسبة عالية: Build نظيف، TypeScript بدون أخطاء، 7 بوابات تعمل، 1298 صفحة تُولَّد بنجاح، ونشر على Vercel بدون أعطال. الصفحة الرئيسية تعمل، التسجيل يعمل، والبوابات الكاملة تعمل.

### لماذا القرار الحالي Soft Launch فقط؟

القرار ليس بسبب أعطال تقنية — بل بسبب ثلاثة فجوات:

1. **فجوة المحتوى:** 600 سجل content موجودة كـ draft غير منشور. الدروس في بعض الدورات تُظهر "Content Coming Soon". المنصة تُطلق بمحتوى ناضج جزئيًا فقط.

2. **فجوة الميزات:** ميزتان في Career غير مكتملتين (AI CV generation, Job apply). صفحة `/cloud` تحمل محتوى لكن بدون دروس فعلية. هذه ليست fatalers لكنها تقلل من قيمة المنتج عند المستخدم الأول.

3. **فجوة Operations:** لا external analytics (GA/Posthog)، لا error monitoring (Sentry)، لا workflow واضح لنشر المحتوى من Admin panel، ولا خطة rollback موثقة.

### ما الذي يجب إغلاقه للوصول إلى Full Launch؟

بإيجاز: نشر المحتوى الموجود، إكمال Career tools، وبناء infrastructure المراقبة والتشغيل. التقدير الواقعي: **3–4 أسابيع** لفريق واحد.

---

## 2. Top 10 Priorities Before Full Launch

| # | Priority | Area | Recommendation | Why it matters | Effort | Risk | Impact |
|---|----------|------|---------------|----------------|--------|------|--------|
| 1 | 🔴 | **Content Publishing** | بناء workflow نشر للـ 600 draft record الموجودة في Supabase وتحديد أي منها جاهز للنشر الآن | المنصة تحتوي محتوى غير مرئي للمستخدم — نشره يرفع القيمة الفورية بشكل كبير | High | Low | Critical |
| 2 | 🔴 | **Error Monitoring** | إضافة Sentry أو Vercel Error Tracking — تغطية production errors في real-time | بدون monitoring لن تعرف لو صفحة تكسّر للمستخدم الحقيقي | Low | Low | Critical |
| 3 | 🟠 | **Analytics** | ربط Posthog أو Vercel Analytics للحصول على user behavior حقيقي منذ اليوم الأول | القرارات المستقبلية تعتمد على بيانات من الأسبوع الأول | Low | Low | High |
| 4 | 🟠 | **Career — Job Apply** | بناء آلية apply بسيطة: redirect لـ LinkedIn/Indeed أو نموذج email بدل "قريباً" | المستخدم يصل للوظيفة ويجد زر معطل — ينهي جلسته هناك | Medium | Low | High |
| 5 | 🟠 | **Career — AI CV Assist** | ربط AI لتحسين summary section في CV Builder عبر API موجود (OpenRouter/Claude) | هذه الميزة مُعلن عنها بصريًا — المستخدم يتوقعها | Medium | Low | High |
| 6 | 🟡 | **Lessons Content** | اختر 3 دورات core وأكمل محتوى دروسها الكامل قبل الإعلان العام | الدورات هي محور المنصة — المستخدم الجاد لن يقبل "قريباً" في الدرس الأول | High | Low | High |
| 7 | 🟡 | **Blog Scale** | أضف 5 مقالات جديدة قبل الإعلان — المدونة تجلب organic traffic من يوم 1 | 9 مقالات جيدة للبداية لكن غير كافية لـ SEO منافس | Medium | Low | High |
| 8 | 🟡 | **OG Images per page** | استبدل OG image الثابتة بصور ديناميكية لكل بوابة (Next.js ImageResponse موجود) | السوشيال shares تظهر نفس الصورة لكل صفحة — يضعف المصداقية | Medium | Low | Medium |
| 9 | 🟡 | **/cloud Registration** | أضف صفحة `/cloud` للـ portals registry مع badge "Beta" وربطها في landing | صفحة جاهزة وغير مستغلة — تضيف قيمة فورية بدون تطوير | Low | Low | Medium |
| 10 | 🟢 | **ESLint Cleanup** | عالج أبرز 20 warning من الـ 97 (خاصةً set-state-in-effect) | جودة كود وأداء — لا تأثير فوري على المستخدم لكن مهم قبل نمو الفريق | Low | Low | Medium |

---

## 3. Product Completion Suggestions

### Career Tools (أعلى أولوية)

| الأداة | الحالة الحالية | المطلوب |
|--------|--------------|---------|
| CV Analyzer | ✅ تعمل (AI-powered) | — |
| CV Builder | ✅ يعمل — AI assist badge معطل | ربط `summary` step بـ Claude/OpenRouter API |
| Interview Prep | ✅ تعمل | إضافة مزيد من أسئلة الـ mock interview |
| Jobs Portal | ✅ يعرض وظائف — Apply معطل | Apply redirect لـ LinkedIn أو email capture |
| CV Templates | ✅ تعمل | إضافة template عربي RTL مخصص |

**توصية فورية:** الـ Job Apply أسهل ما يمكن إصلاحه — redirect بسيط لـ LinkedIn يحل 90% من المشكلة.

---

### Lessons Content

**الوضع:** `lessonContent` map في الكود تحدد أي دورات لها محتوى. المطلوب:

| الدورة | التوصية |
|--------|---------|
| AI Foundations | ✅ يبدو أن لديها محتوى — تحقق من اكتمال الدروس |
| Python for AI | إكمال الدروس الأساسية الخمس الأولى على الأقل |
| دورة في Automation | إكمال مسار beginner كامل |
| دورة في Career | إكمال مسار "كيف تبني CV بالذكاء الاصطناعي" |

**الاستراتيجية:** اختر "showcase course" واحدة لكل بوابة رئيسية وأكمل محتواها 100% — هذا أقوى من 5 دورات ناقصة.

---

### Blog

- **الحالة:** 9 مقالات static كاملة + 3 MDX files.
- **المطلوب:** 5 مقالات إضافية قبل الإعلان العام.
- **الأولويات:** مقالات تستهدف "best AI tools Arabic", "learn AI Arabic", "prompt engineering للمبتدئين" — كلمات مفتاحية عالية الطلب.
- **Workflow:** Admin CMS يدعم إنشاء مقالات — يحتاج تفعيل نشر admin فعلي.

---

### Cloud Page

**الوضع:** محتوى جاهز (9 أقسام + 12 مختبر) لكن بدون روابط دروس.

**التوصية:**
1. أضف portal entry في `portals.ts` مع `status: "beta"`.
2. ضع badge "Beta" واضحة.
3. أضفها للـ landing ecosystem section.
4. لا تعد من Launch surface الأساسية — لكن اجعلها accessible.

**الجهد:** ساعة واحدة لإضافة 10 أسطر في `portals.ts`.

---

### Certificates

- الشهادات مبنية لـ Language, Digital Exams, AI Academy.
- **المطلوب:** تحقق من أن كل بوابة تُولّد شهادة حقيقية قابلة للتحقق.
- **الاقتراح:** أضف صفحة "شهاداتي" مميزة في الـ dashboard مع share button لـ LinkedIn.

---

### User Dashboard

**الحالة:** Dashboard موجود ويعرض التقدم والشهادات.

**الاقتراح:**
- إضافة "Your Learning Journey" — يعرض للمستخدم كم درسًا أتم وما التالي.
- إضافة "Recommended for you" بناءً على بيانات onboarding (المستخدم يختار level وinterests).
- إضافة Quick Actions — رابط سريع لآخر درس، آخر اختبار، الـ mentor.

---

### Underused / Hidden Pages

| الصفحة | المشكلة | الحل |
|--------|---------|------|
| `/paths` | موجودة لكن لا رابط واضح من nav | أضف رابطًا في AI Academy nav |
| `/projects` | موجودة — ربطها بـ AI Academy | أضف "Projects" tab في AI Academy |
| `/roadmap-generator` | مخفية في Footer فقط | أضف CTA في dashboard ونهاية كل دورة |
| `/tool-recommender` | مخفية في Footer | أضف entrance في Tools page |
| `/challenges` | مخفية في Footer | أضف في AI Academy كـ "Challenges" tab |
| `/leaderboard` | مخفية في Footer | أضف في dashboard وأسفل challenges |

---

## 4. UX/UI Improvements

### أول 30 ثانية في الصفحة الرئيسية

**المشكلة:** المستخدم الأول يرى منصة غنية لكن قد يشعر بضياع في الخيارات.

**التوصيات:**
1. **Primary CTA أوضح:** "ابدأ رحلتك — اختر مستواك" يجب أن يكون الزر الأكثر ظهورًا، ليس زرًا واحدًا بين عشرة.
2. **Social proof:** أضف أرقامًا حقيقية — "X متعلم"، "X شهادة صادرة"، "X سؤال اختبار" — حتى لو كانت متواضعة في البداية.
3. **Portal discovery:** اجعل الـ Portal Cards تشرح "لمن هذا؟" بجملة واحدة — "للمتعلم العربي الجديد على AI" أوضح من قائمة features.

---

### Navigation

**المشكلة:** Navbar كثيف — يحتوي Portals dropdown + Tools + Links + Auth.

**التوصية:**
- في Mobile: استخدم bottom navigation bar لأهم 4 روابط (الرئيسية، الدورات، المرشد، حسابي).
- في Desktop: اجمع "AI Studio" items تحت dropdown واحد بدل قائمة فردية في Footer فقط.
- أضف "breadcrumb" واضح في صفحات البوابات الداخلية (مثلًا: IoT Lab > Lessons > ما هو Arduino).

---

### Empty States

**المشكلة:** بعض الصفحات عند عدم وجود بيانات تُظهر placeholder عام.

**التوصية:** لكل empty state اكتب microcopy يدفع للعمل:
- بدلًا من "لا توجد نتائج" → "لم نجد شيئًا هنا بعد — جرب البحث عن كلمة مختلفة"
- بدلًا من "Content Coming Soon" → "هذا الدرس قيد التطوير. اشترك ليصلك إشعار عند نشره" (مع email capture)

---

### Auth Pages (Login/Register)

**الحالة:** تعمل وتبدو نظيفة.

**الاقتراح:**
- بعد التسجيل الناجح → redirect مباشر للـ onboarding (يبدو موجودًا — تحقق من flow).
- أضف "تسجيل بـ Google" visible بشكل أوضح — هو الأسرع للمستخدم الجديد.
- أضف جملة trust: "بياناتك آمنة — لا sharing مع أطراف ثالثة".

---

### Portal Cards

**التوصية:**
- أضف metric حقيقي لكل card (مثلًا: "59 درس" لـ IoT Lab، "900+ سؤال" لـ Digital Exams).
- هذا الأرقام موجودة فعلًا في `portals.ts` features array — استغلها في الـ card design.

---

### Mobile Experience

**الملاحظة:** لم يتم فحص mobile مباشرةً — لكن من بنية Tailwind CSS 4 و responsive classes الموجودة، المنصة مبنية بـ mobile-first approach.

**التوصية قبل الإطلاق:**
- اختبر يدويًا: Home → Portal → Lesson → Quiz → Certificate على iPhone وAndroid.
- الـ Navbar hamburger menu — تأكد من إغلاقه عند النقر على link.
- صفحة CV Builder بها live preview desktop-only (`hidden lg:flex`) — وضّح للمستخدم mobile أن الـ preview في desktop فقط.

---

## 5. Content & SEO Suggestions

### الصفحات التي تحتاج تقوية SEO

| الصفحة | المشكلة | الحل |
|--------|---------|------|
| `/` Home | metadata عام | أضف geo-targeted keywords: "تعلم AI بالعربي", "منصة ذكاء اصطناعي عربية" |
| `/blog/[slug]` | OG image واحدة لكل المقالات | OG ديناميكي بعنوان المقال |
| `/courses/[slug]` | metadata بسيط | أضف structured data (Course schema.org) |
| `/tools/[slug]` | metadata بسيط | أضف structured data (SoftwareApplication) |
| `/digital-exams` | keyword opportunity | "اختبارات Word Excel PowerPoint بالعربي" |
| `/iot-lab` | keyword opportunity | "تعلم Arduino بالعربي", "مشاريع Arduino عربي" |

---

### Sitemap

**الحالة الحالية:** شاملة وتغطي كل البوابات والمحتوى.

**الاقتراح:** أضف `/cloud` للـ sitemap بعد إضافتها للـ portals.

---

### OG Images

**الحالة الحالية:** OG واحدة ثابتة لكل المنصة (`/public/og-image.svg`).

**الاقتراح:** استخدم `/og/route.tsx` الموجود لتوليد OG ديناميكية بـ params:
```
/og?title=AI Academy&portal=ai-academy
```
يظهر اسم البوابة/المقال في صورة الـ share — فارق كبير في click-through rate.

---

### Arabic/English Consistency

**الملاحظة من الفحص:** الـ i18n مطبق بشكل صحيح عبر `[locale]` routing.

**الاقتراح:**
- تأكد من أن metadata لكل صفحة محدث بالـ `ar` و `en` keywords المناسبة.
- بعض صفحات Admin تحتاج مراجعة Arabic RTL layout.

---

### Landing Pages لكل بوابة

**الحالة الحالية:** كل بوابة لها صفحة رئيسية مع معلومات.

**الاقتراح قبل الإطلاق:** أضف لكل landing page بوابة:
- Testimonial أو "أول 100 متعلم قالوا" (حتى لو placeholder لأول أسبوع).
- FAQ section — 5 أسئلة شائعة عن البوابة.
- CTA واضح "ابدأ الآن مجانًا".

---

### FAQ

**الحالة:** لا صفحة FAQ موجودة في المنصة.

**الاقتراح:** أضف `/faq` أو ادمج FAQ في About page. أسئلة مقترحة:
- هل المنصة مجانية بالكامل؟
- ما الفرق بين NexaLearn والمنصات الأخرى؟
- هل الشهادات معتمدة؟
- هل يمكنني الوصول من الجوال؟
- كيف أتواصل مع الدعم؟

---

### Pricing / Monetization Teaser

حتى لو المنصة مجانية الآن، أضف صفحة `/pricing` واضحة تقول "مجاني بالكامل الآن — خطط Pro قادمة" — أفضل من الغموض.

---

## 6. Technical Debt

### ESLint Warnings (97 تحذير)

| النوع | العدد التقريبي | الأثر | الأولوية |
|-------|--------------|-------|---------|
| `react-hooks/set-state-in-effect` | ~30 | أداء وcascading renders | Medium |
| `@typescript-eslint/no-unused-vars` | ~50 | نظافة كود | Low |
| أخرى | ~17 | متنوع | Low |

**التوصية:** جلسة تنظيف مخصصة — يمكن إغلاق 50+ warning بـ `npm run lint -- --fix` أو يدويًا في ساعتين.

---

### Tests

**الحالة:** لا test files. لا `npm run test`.

**التوصية:** لا تؤجل بناء tests إلى ما لا نهاية. ابدأ بـ:
1. Integration tests للـ Auth flow (login → dashboard → logout).
2. Unit tests لـ `lessonContent` data integrity (تأكد أن null positions لا تكسر navigation).
3. E2E test بسيط لـ Exam flow (Digital Exams) باستخدام Playwright.

---

### AdminDashboardClient.tsx

**الملاحظة:** هذا الملف ضخم جدًا (grep يُظهر أكثر من 4000 سطر). هذا يعني:
- صعوبة في maintenance.
- وقت compile أطول.
- صعوبة debugging.

**التوصية:** تقسيمه إلى panel components منفصلة (البداية موجودة في `panels/` — استمر فيها).

---

### Static Fallback vs DB Content Risk

**الملاحظة:** المنصة تعتمد على pattern: اجلب من DB → إن فشل → اعرض static fallback.

**الخطر:** لو الـ static data تتقادم (مثلًا courses تُحدَّث في DB لكن لا تُحدَّث في `src/data/`), المستخدم قد يرى محتوى قديمًا.

**التوصية:** وثّق قاعدة صريحة: "Static data هي snapshot فقط — الـ DB هو المصدر الحقيقي." وراجع الـ static data كل شهر.

---

### content-source / DB Sync Risk

**الحالة:** 600 سجل draft في Supabase، workflow نشر Admin panel غير مفعّل بالكامل.

**الخطر:** إذا نُشر محتوى يدويًا في DB دون مراجعة كافية، قد يظهر محتوى غير منقح للمستخدمين.

**التوصية:** فعّل الـ Admin draft review panel (موجود في `DraftContentReviewPanel.tsx`) قبل الإعلان.

---

## 7. Launch Operations

### Analytics

| الأداة | الحالة | التوصية |
|--------|-------|---------|
| Internal events API | ✅ موجودة (11 event) | أكملها — أضف page view tracking |
| Vercel Analytics | ❌ غير مُضاف | أضف `@vercel/analytics` — 5 دقائق |
| Google Analytics 4 | ❌ غير مُضاف | أضف لـ SEO data وGoogle Search Console |
| Posthog / Mixpanel | ❌ غير مُضاف | اختياري — لكن قيّم للـ funnel analysis |

**التوصية الفورية:** `@vercel/analytics` أسهل خيار — package واحد، لا إعداد. أضفه قبل Soft Launch.

---

### Error Monitoring

| الأداة | الحالة | التوصية |
|--------|-------|---------|
| Sentry | ❌ غير مُضاف | أضف — يُمكّن من رؤية production errors في real-time |
| Vercel Error Tracking | ❌ غير مُستخدم | متاح مباشرةً في Vercel dashboard |

**التوصية:** فعّل Vercel Error Tracking من الـ dashboard (مجاني، بدون كود) أو أضف Sentry SDK.

---

### Contact / Support

**الحالة الحالية:** Contact form موجودة (`/contact`) وترسل email.

**الاقتراح:**
- أضف response time expectation: "نرد خلال 24-48 ساعة".
- أضف قناة Telegram أو WhatsApp للدعم السريع — مناسب جدًا للجمهور العربي.
- فكّر في إضافة Intercom أو Crisp widget للـ live chat في المراحل الأولى.

---

### Admin Content Review Workflow

**المشكلة الحالية:** 600 سجل draft موجودة، لكن لا workflow نشر مفعّل.

**الاقتراح:**
1. فعّل draft review panel في Admin.
2. حدد قواعد: "لا ينشر أي محتوى بدون قراءة بشرية".
3. ابدأ بنشر 50 سجل تدريجيًا وراقب ردود فعل المستخدمين.

---

### Backup & Rollback Plan

| الجانب | الحالة | التوصية |
|--------|-------|---------|
| Git checkpoints | ✅ موجودة | استمر في إنشاء tags قبل كل تغيير كبير |
| Vercel rollback | ✅ متاح من dashboard | وثّق للفريق كيفية الـ rollback في 60 ثانية |
| Supabase backup | ؟ غير محدد | تأكد من تفعيل automatic backups في Supabase |
| DB rollback | ؟ | احتفظ بـ SQL snapshots قبل كل migration |

---

### Release Checklist (قبل الإعلان العام)

```markdown
قبل الإعلان:
[ ] Vercel Analytics مُضاف
[ ] Error monitoring مُفعّل
[ ] Admin review workflow مُختبر
[ ] 3 دورات كاملة المحتوى
[ ] Job Apply button يعمل (redirect)
[ ] AI CV Assist متاح
[ ] /cloud في portals registry
[ ] OG images ديناميكية
[ ] FAQ section موجود
[ ] Social proof أرقام حقيقية
[ ] اختبار mobile على iPhone + Android
```

---

## 8. Monetization / Subscription Ideas

### المبدأ

المنصة الآن مجانية بالكامل. القرار الصحيح: **ابدأ مجانًا وابنِ قاعدة مستخدمين أولًا**، ثم أدخل الاشتراكات بعد 3–6 أشهر من Soft Launch بناءً على feedback.

---

### Free Tier (دائمًا مجاني)

| ما يشمله |
|---------|
| الصفحة الرئيسية + Portal discovery |
| AI Academy: أول 3 دروس من كل دورة |
| Digital Exams: 10 أسئلة تجريبية لكل مادة |
| Language Portal: اختبار مستوى واحد شهريًا |
| Blog + Glossary + Tools directory |
| AI Mentor: 5 رسائل يوميًا |
| Nano Banana Prompts: viewing فقط |

---

### Pro Tier (~49–99 SAR / شهر)

| ما يشمله |
|---------|
| كل الدروس بدون حد |
| Digital Exams: كل المواد + تاريخ النتائج |
| Language Portal: اختبارات غير محدودة + شهادة |
| AI Mentor: بدون حد + ذاكرة شخصية |
| CV Builder: AI assist + export |
| Career: Job matching + Interview AI evaluation |
| Challenges: كل المستويات + leaderboard |
| شهادات: كل البوابات |
| Nano Banana: copy prompts + AI enhancement |

---

### Academy Tier (~299 SAR / شهر أو 999 SAR / سنة)

| ما يشمله |
|---------|
| كل Pro features |
| IoT Lab: محاكي تفاعلي كامل |
| Automation Academy: كل المعامل + خدمات احترافية |
| Career: خدمة CV review بشرية |
| Cloud Academy (عند إطلاقها) |
| Priority support |
| Early access للمحتوى الجديد |

---

### Enterprise / Training Tier (تفاوض)

| ما يشمله |
|---------|
| مقاعد متعددة للفرق |
| لوحة تتبع تقدم الفريق |
| شهادات مخصصة بشعار الشركة |
| محتوى تدريبي مخصص |
| Dedicated support |

---

### الجدول الزمني المقترح للـ Monetization

| المرحلة | التوقيت | الإجراء |
|---------|---------|---------|
| Soft Launch | الآن | كل شيء مجاني — Focus على acquisition |
| Month 2–3 | بعد 200 مستخدم | اعلن عن Pro tier — أعطِ Early users خصم 50% |
| Month 4–6 | بعد تقييم | فعّل billing بـ Stripe أو HyperPay |
| Month 6+ | بعد نمو | Academy + Enterprise |

---

## 9. Full Launch Checklist

### Must Fix Before Full Launch

- [ ] **Error monitoring** — Sentry أو Vercel Error Tracking (ساعة واحدة)
- [ ] **Vercel Analytics** — `@vercel/analytics` (30 دقيقة)
- [ ] **Career Job Apply** — redirect بسيط لـ LinkedIn/Indeed
- [ ] **AI CV Assist** — ربط بـ Claude API أو OpenRouter
- [ ] **3 showcase courses** — دروس كاملة في 3 دورات core
- [ ] **Draft content review** — مراجعة وتفعيل workflow نشر Admin
- [ ] **Mobile testing** — test manual على iOS + Android فعلي
- [ ] **/cloud في portals registry** — ساعة واحدة

### Should Fix Soon (أول أسبوعين بعد Soft Launch)

- [ ] OG images ديناميكية per page
- [ ] FAQ section (5 أسئلة)
- [ ] Blog — إضافة 5 مقالات جديدة
- [ ] Social proof أرقام حقيقية في الصفحة الرئيسية
- [ ] Dashboard — "Recommended for you" بناءً على onboarding data
- [ ] Empty states microcopy محسّن
- [ ] ESLint warnings تنظيف (أبرز 20)

### Can Wait After Launch

- [ ] Full lesson content لكل الدورات
- [ ] Unit + E2E tests
- [ ] AdminDashboardClient.tsx refactor وتقسيم
- [ ] Monetization / Stripe integration
- [ ] Pricing page
- [ ] Certificate LinkedIn share button
- [ ] Notifications system
- [ ] Telegram/WhatsApp support channel
- [ ] Performance optimization (bundle splitting)

---

## 10. Final Recommendation

### هل تنصح بـ Soft Launch الآن؟

**نعم — بدون تردد.**

المنصة تعمل، اللايف يعمل، 7 بوابات جاهزة، البنية التقنية نظيفة. الانتظار أكثر من ذلك دون مستخدمين حقيقيين يُفقد فرصة feedback ثمين. ابدأ بمجموعة صغيرة مختارة (50–100 مستخدم) وراقب.

### هل تنصح بإعلان عام Public Launch الآن؟

**لا — اصبر 3–4 أسابيع.**

الإعلان العام يعني ضغطًا اجتماعيًا وتوقعات عالية. المنصة تستحق إطلاقًا أقوى بعد:
- إصلاح Career tools
- نشر أول batch من المحتوى (50 سجل على الأقل)
- وجود error monitoring
- اختبار mobile فعلي

الفرق بين Soft Launch وPublic Launch ليس تقنيًا — هو فرق في **الانطباع الأول** الذي لا يُعاد. استثمر 3 أسابيع إضافية لجعل اللحظة مؤثرة.

---

```
RECOMMENDATION: Soft Launch Now — Public Launch in 3–4 Weeks
```

---

*تقرير استراتيجي بناءً على الفحص التقني الكامل لـ NexaLearn — 2026-06-12*  
*Reports: 00–09 in `docs/reports/pre-launch-cleanup-readiness/`*
