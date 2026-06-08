---
id: automation-lesson-understanding-triggers-actions
portal_id: automation
content_type: lesson
title_ar: فهم المحفزات والإجراءات
title_en: Understanding Triggers and Actions
excerpt_ar: 'تتكون أي عملية أتمتة من جزأين رئيسيين: المحفز (Trigger) والإجراء (Action).
  بدون فهم هذين العنصرين، لا يمكن بناء سير عمل سليم.'
excerpt_en: ''
category: الأتمتة
status: draft
featured: false
tags:
- الأتمتة
- lesson
sort_order: 140
reading_time: 1
parent_id: null
slug: automation-lesson-understanding-triggers-actions
data: {}
---
# فهم المحفزات والإجراءات (Triggers and Actions)

تتكون أي عملية أتمتة من جزأين رئيسيين: المحفز (Trigger) والإجراء (Action). بدون فهم هذين العنصرين، لا يمكن بناء سير عمل سليم.

## المحفز (Trigger)
هو الحدث الذي يطلق سير العمل. تخيله كـ "زر التشغيل". المحفز ينتظر حدوث شيء معين لكي يبدأ الأتمتة.
*مثال:* تلقي بريد إلكتروني جديد، أو إضافة صف في قاعدة بيانات، أو حتى وقت محدد (الساعة 8 صباحاً).

## الإجراء (Action)
هو المهمة التي يتم تنفيذها كنتيجة للمحفز. يمكن أن يكون هناك إجراء واحد أو عدة إجراءات متسلسلة.
*مثال:* إرسال رسالة في Slack، وإنشاء ملف PDF، وتحديث سجل في نظام الـ CRM.

**القاعدة الذهبية:** كل سير عمل (Workflow) يجب أن يحتوي على (Trigger) واحد على الأقل، و (Action) واحد على الأقل.
