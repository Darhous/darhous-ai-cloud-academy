# 01 — File Organization Report
**Date:** 2026-06-12  
**Phase:** Pre-Launch Cleanup — File Organization

---

## Files Moved to Archive

| الملف القديم | المكان الجديد | سبب النقل | هل يؤثر على التشغيل؟ |
|-------------|-------------|----------|-------------------|
| `CLAUDE_CONTINUATION_CONTEXT.md` | `docs/archive/` | ملف سياق قديم لوكيل Claude — لم يعد مرجعًا فعليًا | لا |
| `PLATFORM_BLUEPRINT.md` | `docs/archive/` | خطة تأسيسية تاريخية — المنصة بُنيت فعلًا | لا |
| `FUTURE_ROADMAP.md` | `docs/archive/` | خارطة طريق قديمة — تم تجاوزها | لا |
| `RAG_MENTOR_PLAN.md` | `docs/archive/` | خطة المرشد القديمة — نُفذت | لا |
| `V3_FEATURES.md` | `docs/archive/` | وثيقة V3 التاريخية — تم تجاوزها | لا |
| `DESIGN_IMPLEMENTATION_AUDIT.md` | `docs/archive/` | تدقيق تصميم قديم | لا |
| `GITHUB_RELEASE_GUIDE.md` | `docs/plans/` | دليل release — مرجع مستقبلي | لا |
| `SECURITY_INCIDENT_NOTE.md` | `docs/archive/` | حادثة أمنية محلولة — للأرشيف | لا |
| `UX PROMAX.MD` | `docs/archive/` | تقرير UX Pro Max القديم (117KB) | لا |
| `README.backup.20260607-135220.md` | `docs/archive/` | نسخة احتياطية من README | لا |
| `reports/تقرير-الشهادات.md` | `docs/archive/` | تقرير شهادات قديم | لا |
| `reports/خطة-التنفيذ.md` | `docs/archive/` | خطة تنفيذ قديمة | لا |

## ملفات Artifacts محذوفة (آمن 100%)

| الملف | السبب |
|-------|-------|
| `eslint-output.txt` | مخرج أداة — مؤقت، لا ينتمي للريبو |
| `lint_output.txt` | مخرج أداة — مؤقت، لا ينتمي للريبو |

## ملفات بقيت في مكانها (active)

| الملف | السبب |
|-------|-------|
| `README.md` | تم تحديثه — راجع تقرير 05 |
| `ANTIGRAVITY_PROJECT_LOG.md` | سجل نشط — مطلوب للمشروع |
| `ANTIGRAVITY_RULES.md` | قواعد الوكيل — مطلوبة |
| `CLAUDE.md` / `AGENTS.md` | سياق الوكيل — مطلوب |
| `ADMIN_GUIDE.md` | دليل إدارة نشط |
| `DEPLOYMENT_GUIDE.md` | دليل نشر نشط |
| `DEVELOPMENT_GUIDE.md` | دليل تطوير نشط |
| `CONTENT_ARCHITECTURE.md` | هيكل المحتوى — مرجع نشط |
| `SUPABASE_SETUP.md` | إعداد Supabase — مرجع نشط |
| `SECURITY.md` | سياسة أمان — مطلوبة |
| `CONTRIBUTING.md` | دليل المساهمة — مطلوب |
| `LICENSE` | الترخيص — مطلوب |

## ملفات Legacy (مُبقاة بدون تغيير)

| الملف | السبب |
|-------|-------|
| `.legacy-exams-app.py` | مخفي (dot-prefix) — النظام القديم للامتحانات، يُحفظ للمرجع |
| `.legacy-exams.db` | مخفي — قاعدة بيانات قديمة، للمرجع |
| `.legacy-exams-questions.json` | مخفي — بيانات قديمة، للمرجع |
| `gen_exams.py` | سكريبت قديم — يحتاج قرار لاحق (نقل أو حذف) |

## ملاحظات

- مجلد `reports/` (الجذر) أُفرغ ونُقلت محتوياته، والمجلد نفسه محتفظ به فارغًا.
- مجلد `docs/archive/` أُنشئ لاستقبال الملفات المؤرشفة.
- لم يُحذف أي ملف نهائيًا إلا ملفات artifacts المؤقتة.
- لم تُلمس ملفات الكود أو ملفات البناء أو ملفات الإعدادات.
