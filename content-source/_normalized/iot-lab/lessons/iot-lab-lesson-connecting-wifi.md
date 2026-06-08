---
id: "iot-lab-lesson-connecting-wifi"
portal_id: "iot-lab"
content_type: "lesson"
title_ar: "توصيل مشاريعك بشبكة الواي فاي"
title_en: "Connecting Projects to Wi-Fi"
excerpt_ar: ""
excerpt_en: ""
category: "إنترنت الأشياء"
status: "draft"
featured: false
tags: ["إنترنت الأشياء", "lesson"]
sort_order: 40
reading_time: 1
parent_id: null
---
# توصيل مشاريعك بشبكة الواي فاي

## الاتصال بالإنترنت
باستخدام مكتبة `WiFi.h` في ESP32، يمكنك ربط مشروعك بالشبكة المحلية للوصول إلى الإنترنت.

## الكود الأساسي
تحتاج إلى توفير اسم الشبكة (SSID) وكلمة المرور. بمجرد الاتصال، سيحصل الجهاز على عنوان IP فريد، مما يسمح له بالتواصل مع الخوادم أو الأجهزة الأخرى على نفس الشبكة.
