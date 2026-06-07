-- ═════════════════════════════════════════════════════════════════
-- v34 — Automation Practical Labs (automation_labs) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_labs (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'lab',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  objective              TEXT NOT NULL DEFAULT '',
  scenario               TEXT NOT NULL DEFAULT '',
  tools                  TEXT[] NOT NULL DEFAULT '{}',
  steps                  TEXT[] NOT NULL DEFAULT '{}',
  expected_output        TEXT NOT NULL DEFAULT '',
  common_mistakes        TEXT[] NOT NULL DEFAULT '{}',
  challenge_task         TEXT NOT NULL DEFAULT '',
  completion_checklist   TEXT[] NOT NULL DEFAULT '{}',
  level                  TEXT NOT NULL DEFAULT 'مبتدئ' CHECK (level IN ('مبتدئ','متوسط','متقدم')),
  duration               TEXT NOT NULL DEFAULT '',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_labs_status ON automation_labs (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_labs_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_labs_updated_at ON automation_labs;
CREATE TRIGGER trg_automation_labs_updated_at
  BEFORE UPDATE ON automation_labs
  FOR EACH ROW EXECUTE FUNCTION update_automation_labs_updated_at();

-- 3. RLS
ALTER TABLE automation_labs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_labs" ON automation_labs;
CREATE POLICY "public_read_published_automation_labs"
  ON automation_labs FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_labs" ON automation_labs;
CREATE POLICY "admin_manage_automation_labs"
  ON automation_labs FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 15 lab entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_labs (id, portal_id, content_type, status, featured, sort_order, title, objective, scenario, tools, steps, expected_output, common_mistakes, challenge_task, completion_checklist, level, duration, published_at)
VALUES
  ('lab-1', 'automation', 'lab', 'published', false, 0, 'Lab 1: Form to Sheet to Email', 'فهم أبسط workflow عملي من مدخل إلى إشعار.', 'مركز تدريبي يستقبل تسجيلات جديدة ويحتاج إشعارًا سريعًا.', ARRAY['Google Forms','Google Sheets','Gmail'], ARRAY['إنشاء النموذج','ربط البيانات بالجدول','إعداد رسالة التأكيد','اختبار تسجيل واحد'], 'تسجيل جديد مع رسالة واضحة وسجل مرتب.', ARRAY['حقول ناقصة','رسالة بلا متغيرات صحيحة'], 'أضف إشعارًا داخليًا إضافيًا للمنسق.', ARRAY['اختبرت نموذجًا','تأكدت من sheet','راجعت البريد'], 'مبتدئ', '35 دقيقة', now()),
  ('lab-2', 'automation', 'lab', 'published', false, 10, 'Lab 2: Lead Capture Workflow', 'تنظيم lead من form إلى CRM إلى follow-up.', 'وكالة تسويقية تتلقى leads من landing page.', ARRAY['Form','CRM','Email'], ARRAY['تحديد الحقول','ربط lead owner','إعداد follow-up'], 'Lead جديد محدث داخل CRM.', ARRAY['عدم تعيين owner','تكرار leads'], 'أضف scoring أوليًا للـ lead.', ARRAY['تم إنشاء lead','تم إرسال التنبيه'], 'متوسط', '40 دقيقة', now()),
  ('lab-3', 'automation', 'lab', 'published', false, 20, 'Lab 3: Daily Report Automation', 'بناء تقرير يومي دون تجميع يدوي.', 'شركة لوجستية تحتاج summary سريعًا كل صباح.', ARRAY['Google Sheets','Email','AI Model'], ARRAY['تجهيز البيانات','تحديد المؤشرات','صياغة summary','إرسال report'], 'ملخص يومي منظم وقابل للإرسال.', ARRAY['استخدام مصادر غير موحدة','أرقام غير مكتملة'], 'أضف مقارنة مع اليوم السابق.', ARRAY['اختبرت يومًا كاملاً','راجعت الأرقام'], 'متوسط', '45 دقيقة', now()),
  ('lab-4', 'automation', 'lab', 'published', false, 30, 'Lab 4: Appointment Reminder', 'تقليل no-show عبر reminders منضبطة.', 'عيادة أو خدمة مواعيد تحتاج تأكيدًا قبل الموعد.', ARRAY['Calendar','WhatsApp concepts','Email'], ARRAY['إنشاء حدث','إعداد reminder','إرسال confirmation'], 'تأكيد وتذكير واضحان قبل الموعد.', ARRAY['توقيت خاطئ','إرسال مكرر'], 'أضف reschedule option في الرسالة.', ARRAY['اختبرت الموعد','فحصت reminder'], 'مبتدئ', '30 دقيقة', now()),
  ('lab-5', 'automation', 'lab', 'published', false, 40, 'Lab 5: CRM Follow-up', 'أتمتة متابعة فرص المبيعات المفتوحة.', 'مندوب مبيعات يحتاج reminders تلقائية للصفقات الباردة.', ARRAY['CRM','Calendar','Email'], ARRAY['تحديد الصفقات المتأخرة','إنشاء تذكير','إرسال summary'], 'قائمة متابعة أسبوعية للصفقات المفتوحة.', ARRAY['قواعد قديمة للـ stages','كثرة التنبيهات'], 'قسّم الصفقات حسب القيمة.', ARRAY['حددت الصفقات','راجعت reminders'], 'متوسط', '35 دقيقة', now()),
  ('lab-6', 'automation', 'lab', 'published', false, 50, 'Lab 6: AI Email Classifier Concept', 'فهم كيف تُصنف الرسائل قبل اتخاذ إجراء.', 'فريق دعم يستقبل رسائل متنوعة يحتاج تصنيفها.', ARRAY['Gmail','AI Model','Notion'], ARRAY['جمع الرسائل','اقتراح labels','توجيه حسب الفئة'], 'تصنيف أولي ورسائل ذات أولوية واضحة.', ARRAY['اعتماد كامل على AI','غياب review بشري'], 'أضف human review للحالات الحساسة.', ARRAY['اختبرت 3 رسائل','راجعت التصنيف'], 'متقدم', '45 دقيقة', now()),
  ('lab-7', 'automation', 'lab', 'published', false, 60, 'Lab 7: Webhook Receiver Concept', 'فهم استقبال الأحداث event-driven.', 'موقع أو خدمة ترسل webhook عند عملية معينة.', ARRAY['Webhook','n8n'], ARRAY['قراءة payload','التحقق من الحقول','تسجيل الحدث','إرسال تنبيه'], 'Event log واضح مع تنبيه على الحدث.', ARRAY['عدم التحقق من الحقول','نسيان retries'], 'أضف path خاصًا للأخطاء.', ARRAY['اختبرت payload','راجعت السجل'], 'متوسط', '40 دقيقة', now()),
  ('lab-8', 'automation', 'lab', 'published', false, 70, 'Lab 8: Approval Workflow', 'تصميم موافقة بخطوات واضحة.', 'طلب داخلي يحتاج مرورًا على مدير ثم مالية.', ARRAY['Forms','Email','Sheets'], ARRAY['استقبال الطلب','إرسال للمراجع الأول','التصعيد عند التأخير'], 'سجل موافقات واضح ومؤرخ.', ARRAY['عدم تحديد timeouts','مسار رفض غير واضح'], 'أضف approval ثانوي للحالات الكبيرة.', ARRAY['اختبرت الموافقة','اختبرت الرفض'], 'متقدم', '50 دقيقة', now()),
  ('lab-9', 'automation', 'lab', 'published', false, 80, 'Lab 9: Google Sheets Automation', 'استخدام Sheets كطبقة تشغيل خفيفة.', 'فريق عمليات يريد tracker يومي بذكاء أكبر.', ARRAY['Google Sheets','Apps Script concepts'], ARRAY['هيكلة الجدول','إضافة قواعد','إعداد تنبيه'], 'جدول أكثر قابلية للتشغيل.', ARRAY['أعمدة مبعثرة','صيغ بلا توثيق'], 'أضف مؤشر KPI بسيط.', ARRAY['نظمت الجدول','اختبرت التنبيه'], 'مبتدئ', '35 دقيقة', now()),
  ('lab-10', 'automation', 'lab', 'published', false, 90, 'Lab 10: n8n Self-hosted Workflow Concept', 'فهم متى يناسبك n8n أكثر من حلول SaaS.', 'شركة تريد كلفة أقل وتحكمًا أكبر في بياناتها.', ARRAY['n8n','Webhook','Supabase'], ARRAY['تصميم trigger','إضافة nodes','إدارة errors','تسجيل الأحداث'], 'Blueprint واضح لـ n8n flow قابل للتنفيذ.', ARRAY['اختيار n8n رغم حاجة بسيطة','غياب log واضح'], 'أضف approval step وحساب كلفة شهرية.', ARRAY['حددت nodes','راجعت error path'], 'متقدم', '60 دقيقة', now()),
  ('lab-11', 'automation', 'lab', 'published', false, 100, 'Lab 11: Error Handling Patterns', 'بناء workflow يصمد أمام الأخطاء دون توقف.', 'خدمة تشغيل livetimes-critical تحتاج retry وتنبيه تلقائي عند الفشل.', ARRAY['n8n','Telegram','Google Sheets'], ARRAY['إضافة Error Trigger node','إعداد retry logic (3 محاولات)','إرسال تنبيه Telegram عند الفشل','تسجيل الخطأ في Sheets'], 'Workflow لا يتوقف عند الخطأ ويُشعر المسؤول فورًا.', ARRAY['تجاهل نوع الخطأ','retry بدون delay'], 'أضف escalation تلقائيًا إذا تكرر الخطأ 3 مرات.', ARRAY['اختبرت خطأ متعمدًا','راجعت سجل الأخطاء'], 'متوسط', '45 دقيقة', now()),
  ('lab-12', 'automation', 'lab', 'published', false, 110, 'Lab 12: Data Transformation Lab', 'تحويل البيانات الخام إلى تنسيق قابل للاستخدام.', 'تقرير يومي يصل بصيغة CSV فوضوية ويحتاج تنظيفًا قبل التحليل.', ARRAY['n8n','Code node','Google Sheets'], ARRAY['قراءة البيانات الخام','تنظيف وإعادة تنسيق بـ Code node','فلترة الصفوف الفارغة','كتابة النتيجة في Sheets'], 'بيانات نظيفة ومنظمة جاهزة للتحليل.', ARRAY['البيانات المختلطة العربية والإنجليزية','أنواع مختلفة لنفس الحقل'], 'أضف خطوة تحقق من البيانات قبل الكتابة.', ARRAY['نظفت البيانات','اختبرت صف فارغ'], 'متوسط', '40 دقيقة', now()),
  ('lab-13', 'automation', 'lab', 'published', false, 120, 'Lab 13: API Integration Basics', 'فهم كيفية التعامل مع REST API خارجي في n8n.', 'ربط خدمة طقس أو أسعار عملات خارجية بتقرير يومي داخلي.', ARRAY['n8n','HTTP Request node','Google Sheets'], ARRAY['استدعاء API بـ GET request','تحليل JSON الراجع','استخراج الحقول المطلوبة','كتابة النتيجة في Sheets'], 'بيانات API مُدمَجة في workflow حقيقي.', ARRAY['نسيان Headers أو API Key','عدم معالجة خطأ 401/429'], 'استخدم API يحتاج pagination واعمل loop.', ARRAY['نجح الـ GET request','عالجت خطأ API'], 'متقدم', '50 دقيقة', now()),
  ('lab-14', 'automation', 'lab', 'published', false, 130, 'Lab 14: Scheduled Summary Report', 'بناء تقرير موجز تلقائي يُرسل في وقت محدد.', 'مدير يريد ملخص يومي لمؤشرات الفريق صباح كل يوم.', ARRAY['Google Sheets','Gmail','n8n Schedule'], ARRAY['قراءة بيانات الأمس من Sheets','حساب المؤشرات (مجموع، متوسط، أعلى قيمة)','تنسيق HTML Email','إرسال التقرير الصباحي'], 'تقرير HTML احترافي يصل صباحًا بدون تدخل.', ARRAY['بيانات الأمس ليست مُتاحة بعد','حساب التواريخ بشكل خاطئ'], 'أضف مقارنة مع الأسبوع الماضي.', ARRAY['أُرسل التقرير','فحصت الأرقام'], 'مبتدئ', '35 دقيقة', now()),
  ('lab-15', 'automation', 'lab', 'published', false, 140, 'Lab 15: Multi-channel Notification System', 'إشعار الفريق عبر قنوات متعددة من trigger واحد.', 'حدث حرج يحتاج إشعار Slack + Email + Telegram في نفس الوقت.', ARRAY['n8n','Slack','Gmail','Telegram'], ARRAY['إعداد trigger الحدث','بناء رسالة موحدة','إرسال لـ 3 قنوات بالتوازي','تسجيل وقت الإرسال'], 'إشعار متزامن على 3 قنوات مع log.', ARRAY['إشعار مكرر بسبب retry','رسائل مختلفة التنسيق لكل قناة'], 'أضف قناة رابعة (WhatsApp API) وقس وقت الاستجابة.', ARRAY['أُرسل للـ 3 قنوات','راجعت الـ log'], 'متقدم', '45 دقيقة', now());
