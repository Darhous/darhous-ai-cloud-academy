-- ═════════════════════════════════════════════════════════════════
-- v33 — Automation Glossary (automation_glossary) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_glossary (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'glossary',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  term                   TEXT NOT NULL DEFAULT '',
  arabic_definition      TEXT NOT NULL DEFAULT '',
  simple_example         TEXT NOT NULL DEFAULT '',
  related_terms          TEXT[] NOT NULL DEFAULT '{}',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_glossary_status ON automation_glossary (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_glossary_updated_at ON automation_glossary;
CREATE TRIGGER trg_automation_glossary_updated_at
  BEFORE UPDATE ON automation_glossary
  FOR EACH ROW EXECUTE FUNCTION update_automation_glossary_updated_at();

-- 3. RLS
ALTER TABLE automation_glossary ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_glossary" ON automation_glossary;
CREATE POLICY "public_read_published_automation_glossary"
  ON automation_glossary FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_glossary" ON automation_glossary;
CREATE POLICY "admin_manage_automation_glossary"
  ON automation_glossary FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 26 glossary entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_glossary (id, portal_id, content_type, status, featured, sort_order, term, arabic_definition, simple_example, related_terms, published_at)
VALUES
  ('trigger', 'automation', 'glossary', 'published', false, 0, 'Trigger', 'الحدث الذي يبدأ الـ workflow.', 'وصول تسجيل جديد من نموذج.', ARRAY['Action','Webhook'], now()),
  ('action', 'automation', 'glossary', 'published', false, 10, 'Action', 'الخطوة التي ينفذها النظام بعد trigger أو شرط.', 'إرسال بريد أو إضافة صف.', ARRAY['Trigger','Workflow'], now()),
  ('webhook', 'automation', 'glossary', 'published', false, 20, 'Webhook', 'إشعار لحظي ترسله خدمة إلى خدمة أخرى عند حدوث حدث معين.', 'عند الدفع يصل payload إلى endpoint.', ARRAY['API','Payload'], now()),
  ('api', 'automation', 'glossary', 'published', false, 30, 'API', 'واجهة برمجية تسمح للأنظمة بالتواصل المنظم.', 'إنشاء lead داخل CRM عبر API.', ARRAY['Endpoint','Token'], now()),
  ('endpoint', 'automation', 'glossary', 'published', false, 40, 'Endpoint', 'العنوان المحدد داخل API الذي تستهدفه الطلبات.', 'POST /leads', ARRAY['API','Payload'], now()),
  ('payload', 'automation', 'glossary', 'published', false, 50, 'Payload', 'البيانات المرسلة داخل الطلب أو الـ webhook.', '{ name, phone, source }', ARRAY['JSON','Webhook'], now()),
  ('json', 'automation', 'glossary', 'published', false, 60, 'JSON', 'صيغة شائعة لتمثيل البيانات بين الأنظمة.', '{"status":"new"}', ARRAY['Payload','API'], now()),
  ('authentication', 'automation', 'glossary', 'published', false, 70, 'Authentication', 'طريقة إثبات هوية العميل أو التطبيق عند الوصول لنظام آخر.', 'API key أو token.', ARRAY['OAuth','Token'], now()),
  ('oauth', 'automation', 'glossary', 'published', false, 80, 'OAuth', 'أسلوب تفويض يسمح للتطبيقات بالوصول الآمن دون مشاركة كلمة المرور مباشرة.', 'ربط Gmail عبر OAuth.', ARRAY['Authentication','Token'], now()),
  ('token', 'automation', 'glossary', 'published', false, 90, 'Token', 'رمز يستخدم للوصول المصرح به إلى خدمة أو API.', 'Bearer token في header.', ARRAY['Authentication','Rate Limit'], now()),
  ('rate-limit', 'automation', 'glossary', 'published', false, 100, 'Rate Limit', 'حد أقصى لعدد الطلبات خلال فترة معينة.', '100 request per minute.', ARRAY['API','Retry'], now()),
  ('cron-job', 'automation', 'glossary', 'published', false, 110, 'Cron Job', 'تشغيل مجدول يعتمد على الوقت.', 'تشغيل التقرير الساعة 8 صباحًا.', ARRAY['Workflow','Scheduled trigger'], now()),
  ('workflow', 'automation', 'glossary', 'published', false, 120, 'Workflow', 'المسار الكامل للخطوات والمنطق بين trigger والنتيجة.', 'Form → Sheet → Email', ARRAY['Trigger','Action'], now()),
  ('scenario', 'automation', 'glossary', 'published', false, 130, 'Scenario', 'اسم آخر شائع للـ workflow في بعض المنصات.', 'Make scenario لمتابعة leads.', ARRAY['Workflow','Node'], now()),
  ('node', 'automation', 'glossary', 'published', false, 140, 'Node', 'عنصر واحد داخل canvas يمثل trigger أو action أو logic.', 'Google Sheets node.', ARRAY['Workflow','Connector'], now()),
  ('connector', 'automation', 'glossary', 'published', false, 150, 'Connector', 'حلقة الربط الجاهزة مع خدمة أو تطبيق.', 'Gmail connector.', ARRAY['Integration','Node'], now()),
  ('integration', 'automation', 'glossary', 'published', false, 160, 'Integration', 'الربط بين نظامين أو أكثر لنقل البيانات أو الأوامر.', 'ربط CRM مع Google Sheets.', ARRAY['API','Connector'], now()),
  ('error-handling', 'automation', 'glossary', 'published', false, 170, 'Error Handling', 'آلية التعامل مع الفشل أو البيانات غير الصالحة داخل الـ workflow.', 'إرسال تنبيه عند فشل API.', ARRAY['Retry','Queue'], now()),
  ('retry', 'automation', 'glossary', 'published', false, 180, 'Retry', 'إعادة المحاولة تلقائيًا بعد فشل مؤقت.', 'إعادة الطلب بعد 30 ثانية.', ARRAY['Error Handling','Rate Limit'], now()),
  ('queue', 'automation', 'glossary', 'published', false, 190, 'Queue', 'طابور من المهام ينتظر المعالجة بالترتيب أو وفق قواعد معينة.', 'طلبات support waiting.', ARRAY['Retry','Workflow'], now()),
  ('rpa', 'automation', 'glossary', 'published', false, 200, 'RPA', 'Robotic Process Automation لأتمتة تفاعلات متكررة مع واجهات لا توفر تكاملًا مباشرًا.', 'نظام قديم بلا API.', ARRAY['Browser Automation','Workflow'], now()),
  ('scraping', 'automation', 'glossary', 'published', false, 210, 'Scraping', 'استخراج بيانات من واجهة ويب عند غياب طريقة رسمية أفضل.', 'قراءة جدول من portal.', ARRAY['Browser Automation','RPA'], now()),
  ('etl', 'automation', 'glossary', 'published', false, 220, 'ETL', 'استخراج البيانات وتحويلها ثم تحميلها إلى وجهة جديدة.', 'جمع بيانات المبيعات وتحويلها للتقرير.', ARRAY['Data Transform','Workflow'], now()),
  ('crm', 'automation', 'glossary', 'published', false, 230, 'CRM', 'نظام إدارة علاقات العملاء والفرص البيعية.', 'HubSpot أو CRM داخلي.', ARRAY['Lead','Sales Automation'], now()),
  ('sla', 'automation', 'glossary', 'published', false, 240, 'SLA', 'اتفاق مستوى الخدمة الذي يحدد سرعة الاستجابة أو المعالجة.', 'الرد خلال ساعتين.', ARRAY['Support','Escalation'], now()),
  ('human-in-the-loop', 'automation', 'glossary', 'published', false, 250, 'Human-in-the-loop', 'إبقاء خطوة مراجعة بشرية داخل الأتمتة قبل الإجراء النهائي.', 'مراجعة مختصر AI قبل الإرسال.', ARRAY['Approval','Privacy'], now());
