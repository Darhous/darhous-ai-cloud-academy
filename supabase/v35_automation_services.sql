-- ═════════════════════════════════════════════════════════════════
-- v35 — Automation Service Packages (automation_services) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_services (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'service',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  who_its_for            TEXT NOT NULL DEFAULT '',
  deliverables           TEXT[] NOT NULL DEFAULT '{}',
  timeline               TEXT NOT NULL DEFAULT '',
  starting_scope         TEXT NOT NULL DEFAULT '',
  required_client_inputs TEXT[] NOT NULL DEFAULT '{}',
  final_outputs          TEXT[] NOT NULL DEFAULT '{}',
  cta                    TEXT NOT NULL DEFAULT '',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_services_status ON automation_services (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_services_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_services_updated_at ON automation_services;
CREATE TRIGGER trg_automation_services_updated_at
  BEFORE UPDATE ON automation_services
  FOR EACH ROW EXECUTE FUNCTION update_automation_services_updated_at();

-- 3. RLS
ALTER TABLE automation_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_services" ON automation_services;
CREATE POLICY "public_read_published_automation_services"
  ON automation_services FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_services" ON automation_services;
CREATE POLICY "admin_manage_automation_services"
  ON automation_services FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 10 service entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_services (id, portal_id, content_type, status, featured, sort_order, title, who_its_for, deliverables, timeline, starting_scope, required_client_inputs, final_outputs, cta, published_at)
VALUES
  ('automation-audit', 'automation', 'service', 'published', false, 0, 'Automation Audit', 'الفرق التي تعرف أن هناك هدرًا لكنها لا تعرف من أين تبدأ.', ARRAY['تشخيص العمليات','خريطة فرص الأتمتة','أولوية التنفيذ'], '3-5 أيام', '1-3 عمليات رئيسية', ARRAY['لقاء discovery','أمثلة من العمليات الحالية','الوصول للخطوات اليدوية'], ARRAY['Audit report','Quick wins list','Roadmap'], 'اطلب مراجعة أتمتة', now()),
  ('workflow-design', 'automation', 'service', 'published', false, 10, 'Workflow Design', 'الشركات التي تريد blueprint محترف قبل التنفيذ.', ARRAY['Blueprint','stack recommendation','testing plan'], '2-4 أيام', 'Workflow واحد', ARRAY['وصف العملية','الأدوات الحالية','الأهداف'], ARRAY['Technical brief','Client-friendly plan'], 'اطلب تصميم Workflow', now()),
  ('no-code-build', 'automation', 'service', 'published', false, 20, 'No-Code Automation Build', 'من يريد إطلاق automation بسرعة باستخدام أدوات مرئية.', ARRAY['تنفيذ Make أو Zapier أو Airtable','إعدادات التشغيل','handover'], '5-10 أيام', '1-2 workflows', ARRAY['حسابات الأدوات','الوصول المصرح','قوالب الرسائل'], ARRAY['Automation working','Handover notes'], 'اطلب بناء No-Code', now()),
  ('n8n-build', 'automation', 'service', 'published', false, 30, 'n8n Automation Build', 'من يفضل حلًا أكثر مرونة وكلفة أذكى أو open-source.', ARRAY['تصميم وتنفيذ workflow على n8n','Error handling','monitoring notes'], '7-14 يومًا', 'Workflow متوسط إلى متقدم', ARRAY['بيئة n8n أو تفضيل الاستضافة','الوصول للتطبيقات','الحالات المطلوبة'], ARRAY['n8n workflow','Ops notes'], 'اطلب بناء n8n', now()),
  ('dashboard-automation', 'automation', 'service', 'published', false, 40, 'Business Dashboard Automation', 'الفرق التي تريد تقارير ولوحات تُحدّث نفسها.', ARRAY['تجميع مصادر البيانات','ملخصات دورية','لوحات تشغيل'], '5-8 أيام', 'مؤشرات 1-2 فرق', ARRAY['مصادر البيانات','المؤشرات المهمة','قالب التقرير'], ARRAY['Automated dashboard flow','Summary delivery'], 'اطلب لوحة مؤتمتة', now()),
  ('lead-generation-build', 'automation', 'service', 'published', false, 50, 'Lead Generation Automation', 'الفرق التي تعتمد على leads وتريد متابعة أسرع وتحويلات أفضل.', ARRAY['Lead capture','qualification','follow-up'], '4-7 أيام', 'قناة lead واحدة', ARRAY['مصادر leads','CRM الحالي','فريق المتابعة'], ARRAY['Lead pipeline','Follow-up rules'], 'اطلب أتمتة leads', now()),
  ('education-center-automation', 'automation', 'service', 'published', false, 60, 'Education Center Automation', 'المراكز التعليمية والأكاديميات وبرامج التدريب.', ARRAY['registration flows','attendance','certificates'], '7-12 يومًا', 'رحلة طالب واحدة', ARRAY['نماذج التسجيل','سياسات القبول','هوية الرسائل'], ARRAY['Student operations workflow','Certificates automation plan'], 'اطلب أتمتة تعليمية', now()),
  ('crm-automation-service', 'automation', 'service', 'published', false, 70, 'CRM Automation', 'الشركات التي تريد pipeline منظمًا بين التسويق والمبيعات.', ARRAY['stage automation','follow-up','handoff'], '5-9 أيام', 'Pipeline واحدة', ARRAY['مراحل CRM','قواعد التوزيع','templates'], ARRAY['CRM workflow','Sales ops notes'], 'اطلب أتمتة CRM', now()),
  ('custom-python-automation', 'automation', 'service', 'published', false, 80, 'Custom Python Automation', 'الحالات التي تتطلب منطقًا خاصًا أو APIs أو data handling أعمق.', ARRAY['Python scripts','API integration','deployment notes'], '7-15 يومًا', 'تكامل أو process مخصص', ARRAY['API docs','بيانات تجريبية','بيئة التشغيل'], ARRAY['Custom automation code','Technical documentation'], 'اطلب Python automation', now()),
  ('monthly-support', 'automation', 'service', 'published', false, 90, 'Monthly Automation Support', 'الفرق التي أطلقت أتمتة وتريد صيانة وتحسينًا مستمرًا.', ARRAY['مراجعة دورية','تحسينات صغيرة','تشخيص أعطال'], 'اشتراك شهري', 'حتى 3 workflows', ARRAY['الوصول إلى flows','سجل الأعطال','أولويات الشهر'], ARRAY['Monthly support log','Improvement backlog'], 'اطلب دعمًا شهريًا', now());
