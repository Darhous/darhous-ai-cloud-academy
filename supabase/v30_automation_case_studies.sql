-- ═════════════════════════════════════════════════════════════════
-- v30 — Automation Case Studies (automation_case_studies) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_case_studies (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'case_study',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  business_problem       TEXT NOT NULL DEFAULT '',
  before_automation      TEXT[] NOT NULL DEFAULT '{}',
  after_automation       TEXT[] NOT NULL DEFAULT '{}',
  workflow_map           TEXT[] NOT NULL DEFAULT '{}',
  tools_used             TEXT[] NOT NULL DEFAULT '{}',
  expected_impact        TEXT NOT NULL DEFAULT '',
  kpi_improvements       TEXT[] NOT NULL DEFAULT '{}',
  implementation_roadmap TEXT[] NOT NULL DEFAULT '{}',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_case_studies_status ON automation_case_studies (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_case_studies_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_case_studies_updated_at ON automation_case_studies;
CREATE TRIGGER trg_automation_case_studies_updated_at
  BEFORE UPDATE ON automation_case_studies
  FOR EACH ROW EXECUTE FUNCTION update_automation_case_studies_updated_at();

-- 3. RLS
ALTER TABLE automation_case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_case_studies" ON automation_case_studies;
CREATE POLICY "public_read_published_automation_case_studies"
  ON automation_case_studies FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_case_studies" ON automation_case_studies;
CREATE POLICY "admin_manage_automation_case_studies"
  ON automation_case_studies FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 10 case_study entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_case_studies (id, portal_id, content_type, status, featured, sort_order, title, business_problem, before_automation, after_automation, workflow_map, tools_used, expected_impact, kpi_improvements, implementation_roadmap, published_at)
VALUES
  ('training-center', 'automation', 'case_study', 'published', false, 0, 'أتمتة مركز تدريبي صغير', 'القبول، المتابعة، والحضور والشهادات كانت موزعة بين WhatsApp وملفات Excel ورسائل متفرقة.', ARRAY['تسجيل يدوي','متابعة متأخرة','أخطاء في الأسماء'], ARRAY['رحلة تسجيل موحدة','تنبيهات للطلاب','شهادات أسرع'], ARRAY['Form → Sheet','Sheet → Reminder','Completion → Certificate'], ARRAY['Google Forms','Sheets','Gmail','PDF Generator'], 'تقليل الوقت التشغيلي وتحسين تجربة الطالب من اليوم الأول.', ARRAY['خفض وقت التسجيل 60%','تقليل أخطاء الشهادات','رفع سرعة الاستجابة'], ARRAY['تحليل الرحلة الحالية','بناء النموذج والسجل','إضافة التذكير','إطلاق الشهادات'], now()),
  ('real-estate-agency', 'automation', 'case_study', 'published', false, 10, 'أتمتة وكالة عقارية', 'الاستفسارات كانت تصل من الموقع والإعلانات وتضيع بين الوسطاء.', ARRAY['توزيع غير واضح','follow-up متأخر'], ARRAY['Lead routing','رسائل أولية فورية','تأكيد زيارات'], ARRAY['Website Lead → CRM','CRM → Broker Assignment','Assignment → WhatsApp'], ARRAY['CRM','Calendar','WhatsApp concepts'], 'تحسين معدل المتابعة وتقليل ضياع الـ leads.', ARRAY['سرعة استجابة أعلى','زيارات أكثر تنظيمًا'], ARRAY['توحيد الحقول','توزيع الوسطاء','رسائل approved','مراقبة النتائج'], now()),
  ('clinic-admin', 'automation', 'case_study', 'published', false, 20, 'أتمتة إدارة عيادة', 'المواعيد والتذكير والمتابعة الإدارية تتم يدويًا مما يزيد نسبة الغياب.', ARRAY['تأكيدات متأخرة','مواعيد متضاربة'], ARRAY['تأكيد تلقائي','Reminder قبل الزيارة','سجل يومي'], ARRAY['Booking → Calendar','Calendar → Reminder','Visit → Follow-up'], ARRAY['Calendar','Sheets','WhatsApp concepts'], 'تقليل no-show وتخفيف العبء الإداري.', ARRAY['تحسن الالتزام بالمواعيد','سجل أوضح'], ARRAY['تصميم تدفق الحجز','إضافة reminders','متابعة بعد الزيارة'], now()),
  ('ecommerce-store', 'automation', 'case_study', 'published', false, 30, 'أتمتة متجر إلكتروني', 'الطلبات والسلات المتروكة والتنبيهات التشغيلية غير مرتبطة ببعضها.', ARRAY['فقدان مبيعات','انخفاض وضوح المخزون'], ARRAY['سلات متروكة تذكيرية','تنبيهات مخزون','تقارير يومية'], ARRAY['Cart Event → Reminder','Inventory Sheet → Alert'], ARRAY['Email','Sheets','CRM'], 'رفع التحويل وتقليل الأعطال التشغيلية.', ARRAY['استرجاع سلات أفضل','تدخل أسرع للمخزون'], ARRAY['اختيار triggers','رسائل recovery','لوحة تنبيهات'], now()),
  ('hr-recruitment', 'automation', 'case_study', 'published', false, 40, 'أتمتة التوظيف', 'طلبات التوظيف كثيرة والتقييم الأولي بطيء وغير موثق.', ARRAY['فرز يدوي','ضياع مرشحين مناسبين'], ARRAY['Shortlist أسرع','إشعارات حالة','سجل واضح'], ARRAY['Application → Sheet','Sheet → Scoring','Scoring → Shortlist'], ARRAY['Forms','Sheets','AI Model'], 'تسريع فرز المرشحين وتحسين الشفافية.', ARRAY['وقت مراجعة أقل','وضوح أعلى في الحالة'], ARRAY['تعريف معايير الفرز','اختبار score','إضافة جدولة'], now()),
  ('university-center', 'automation', 'case_study', 'published', false, 50, 'أتمتة مركز جامعي', 'التسجيلات والاستفسارات والشهادات تُدار يدويًا على أكثر من ملف.', ARRAY['أخطاء بيانات','رسائل ناقصة'], ARRAY['رحلة تسجيل منظمة','حضور أوضح','شهادات مؤتمتة'], ARRAY['Registration → Sheet','Attendance → Alert','Completion → Certificate'], ARRAY['Google Workspace','PDF Generator'], 'رحلة طالب أكثر احترافية وإدارة أسهل للدفعات.', ARRAY['سرعة onboarding','تقليل الأخطاء'], ARRAY['إعادة تصميم البيانات','أتمتة الحضور','أتمتة الإنهاء'], now()),
  ('logistics-reporting', 'automation', 'case_study', 'published', false, 60, 'أتمتة تقارير شركة لوجستية', 'التقرير اليومي يعتمد على جمع يدوي من فرق متعددة.', ARRAY['تقارير متأخرة','أرقام غير متسقة'], ARRAY['ملخص يومي موحد','تنبيهات تشغيلية'], ARRAY['Team Inputs → Sheet','Sheet → Summary','Summary → Email'], ARRAY['Google Sheets','AI Model','Email'], 'إدارة أوضح للحركة اليومية والاختناقات.', ARRAY['سرعة التقرير','وضوح أعلى'], ARRAY['توحيد المدخلات','بناء الصياغة','جدولة الإرسال'], now()),
  ('consulting-leads', 'automation', 'case_study', 'published', false, 70, 'أتمتة leads لشركة استشارية', 'الاستفسارات تتبعها مكالمات متأخرة وعروض غير موثقة.', ARRAY['فقدان فرص','عروض غير متسقة'], ARRAY['Brief discovery','تذكيرات follow-up','Proposal prep'], ARRAY['Lead Intake → Qualification','Qualification → Meeting','Meeting → Proposal'], ARRAY['Notion','Calendar','Email'], 'زيادة الانضباط في المبيعات الاستشارية.', ARRAY['متابعة أسرع','عروض أوضح'], ARRAY['نموذج discovery','قوالب العروض','جدولة المتابعة'], now()),
  ('customer-support', 'automation', 'case_study', 'published', false, 80, 'أتمتة خدمة العملاء', 'القنوات المتعددة للدعم جعلت التذاكر تتأخر أو تضيع.', ARRAY['ضياع سياق التذكرة','بطء التصعيد'], ARRAY['Routing','Escalation','Feedback loop'], ARRAY['Ticket Intake → Classification → Team Routing → Survey'], ARRAY['Slack','Notion','Email'], 'دعم أكثر وضوحًا وانضباطًا.', ARRAY['خفض وقت الاستجابة','رضا أعلى'], ARRAY['تصنيف القنوات','تصعيد SLA','قياس رضا العميل'], now()),
  ('finance-approvals', 'automation', 'case_study', 'published', false, 90, 'أتمتة موافقات مالية', 'الموافقات المالية تتأخر لغياب مسار موحد وواضح.', ARRAY['تتبع يدوي','اعتمادات ضائعة'], ARRAY['Approval lanes','Escalations','Audit trail'], ARRAY['Request → Review → Approval → Archive'], ARRAY['Power Automate','Email','Sheets'], 'تقليل التأخير وتحسين التوثيق.', ARRAY['سرعة موافقة أفضل','سجل مراجعة أوضح'], ARRAY['تعريف السياسات','تجهيز النماذج','إدخال SLA','متابعة الإطلاق'], now());
