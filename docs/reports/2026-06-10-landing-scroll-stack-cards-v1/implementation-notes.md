# ملاحظات التنفيذ

- تم إنشاء المكون الجديد `ScrollStackSection` ليعمل كقسم بديل لـ `PortalGrid`.
- **حسابات التمرير (Scroll Math):**
  تم استخدام `useScroll` من `framer-motion` لربط تقدم التمرير (Scroll Progress) مع `scale` و `opacity` لكل كرت.
  تم تقسيم مسافة التمرير بالتساوي بين الكروت `start = index / total` و `end = (index + 1) / total`.
  تم إضافة هامش سفلي `marginBottom: 12vh` لكل كرت (باستثناء الأخير) لخلق مساحة تمرير كافية تبلغ حوالي ضعفي ارتفاع الشاشة لجميع الكروت.
  الكرت الأخير دائماً يحتفظ بـ `scale: 1` و `opacity: 1`.
- **التوافق (Fallback):**
  تم استخدام `useReducedMotion()` من `framer-motion`. إذا كان المستخدم يفضل تقليل الحركة، يتم عرض شبكة `Grid` العادية (نفس الـ Grid السابق).
  لشاشات الجوال (أصغر من `md`)، يتم أيضاً عرض الـ `Grid` باستخدام `md:hidden` و `hidden md:block` لإخفاء التراكب.
