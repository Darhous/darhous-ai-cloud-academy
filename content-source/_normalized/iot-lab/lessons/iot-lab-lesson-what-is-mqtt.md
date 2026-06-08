---
id: "iot-lab-lesson-what-is-mqtt"
portal_id: "iot-lab"
content_type: "lesson"
title_ar: "فهم بروتوكول MQTT لإنترنت الأشياء"
title_en: "Understanding MQTT for IoT"
excerpt_ar: ""
excerpt_en: ""
category: "إنترنت الأشياء"
status: "draft"
featured: false
tags: ["إنترنت الأشياء", "lesson"]
sort_order: 190
reading_time: 1
parent_id: null
---
# فهم بروتوكول MQTT لإنترنت الأشياء

## بروتوكول MQTT
هو بروتوكول مراسلة خفيف الوزن صُمم خصيصاً للأجهزة ذات الموارد المحدودة والشبكات الضعيفة.

## كيف يعمل؟
يعتمد على نموذج (الناشر/المشترك).
- **الوسيط (Broker):** الخادم المركزي الذي يستقبل ويرسل الرسائل.
- **الناشر (Publisher):** الجهاز الذي يرسل البيانات (مثل حساس حرارة).
- **المشترك (Subscriber):** الجهاز الذي يستقبل البيانات (مثل تطبيق على الهاتف).
