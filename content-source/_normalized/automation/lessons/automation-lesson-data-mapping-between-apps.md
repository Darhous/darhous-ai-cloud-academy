---
id: automation-lesson-data-mapping-between-apps
portal_id: automation
content_type: lesson
title_ar: تخطيط البيانات بين التطبيقات
title_en: Data Mapping Between Apps
excerpt_ar: أثناء نقل البيانات من تطبيق إلى آخر في الأتمتة، نادراً ما تتطابق أسماء
  الحقول والتنسيقات. هنا يأتي دور تخطيط البيانات (Data Mapping).
excerpt_en: ''
category: الأتمتة
status: draft
featured: false
tags:
- الأتمتة
- lesson
sort_order: 80
reading_time: 1
parent_id: null
slug: automation-lesson-data-mapping-between-apps
data: {}
---
# تخطيط البيانات (Data Mapping) بين التطبيقات

أثناء نقل البيانات من تطبيق إلى آخر في الأتمتة، نادراً ما تتطابق أسماء الحقول والتنسيقات. هنا يأتي دور تخطيط البيانات (Data Mapping).

## ما هو تخطيط البيانات؟
هو عملية توجيه النظام إلى الحقل المناسب لكل معلومة. مثلاً، التطبيق (أ) قد يسمي حقل الهاتف `phone_number` بينما التطبيق (ب) يسميه `ContactPhone`. التخطيط يخبر الأداة بأن هذين الحقلين يمثلان نفس المعلومة.

## تحديات التنسيق
في كثير من الأحيان ستحتاج إلى تعديل التنسيق أثناء التخطيط، مثل:
- تحويل التواريخ (من `DD-MM-YYYY` إلى `MM/DD/YYYY`).
- دمج الحقول (مثل دمج حقل "الاسم الأول" وحقل "اسم العائلة" في حقل واحد "الاسم الكامل").

الإتقان في تخطيط البيانات يضمن عدم ضياع المعلومات ووصولها بالشكل السليم إلى الوجهة النهائية.
