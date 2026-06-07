-- ══════════════════════════════════════════════════════════════════
-- v28 — Automation Learning Paths (automation_paths)
-- Run in: Supabase Dashboard → SQL Editor
--
-- FLAT type (no nested objects in the LearningPath interface — matches
-- the ai_glossary / ai_tools precedent): all fields are real columns,
-- string-array fields use TEXT[].
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_paths (
  id                      TEXT        PRIMARY KEY,                 -- = existing slug — keeps links intact
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'path',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                   TEXT        NOT NULL DEFAULT '',
  subtitle                TEXT        NOT NULL DEFAULT '',
  english_label           TEXT        NOT NULL DEFAULT '',
  level                   TEXT        NOT NULL DEFAULT 'مبتدئ'
                                      CHECK (level IN ('مبتدئ','متوسط','متقدم')),
  duration                TEXT        NOT NULL DEFAULT '',
  target_audience         TEXT[]      NOT NULL DEFAULT '{}',
  outcome                 TEXT        NOT NULL DEFAULT '',
  modules                 TEXT[]      NOT NULL DEFAULT '{}',
  practical_projects      TEXT[]      NOT NULL DEFAULT '{}',
  recommended_tools       TEXT[]      NOT NULL DEFAULT '{}',
  final_capstone_project  TEXT        NOT NULL DEFAULT '',
  category                TEXT        NOT NULL DEFAULT '',
  estimated_lessons       INT         NOT NULL DEFAULT 0,
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_paths_status   ON automation_paths (status);
CREATE INDEX IF NOT EXISTS idx_automation_paths_category ON automation_paths (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_paths_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_paths_updated_at ON automation_paths;
CREATE TRIGGER trg_automation_paths_updated_at
  BEFORE UPDATE ON automation_paths
  FOR EACH ROW EXECUTE FUNCTION update_automation_paths_updated_at();

-- 3. RLS
ALTER TABLE automation_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_paths" ON automation_paths;
CREATE POLICY "public_read_published_automation_paths"
  ON automation_paths FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_paths" ON automation_paths;
CREATE POLICY "admin_manage_automation_paths"
  ON automation_paths FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 25 existing static learning paths, SAME ids, status='published'.
--    Generated programmatically from src/data/automation/automationLearningPaths.ts
--    (zero transcription risk). sort_order = index × 10.
-- ══════════════════════════════════════════════════════════════════
INSERT INTO automation_paths (id, portal_id, content_type, status, featured, sort_order, title, subtitle, english_label, level, duration, target_audience, outcome, modules, practical_projects, recommended_tools, final_capstone_project, category, estimated_lessons, published_at)
VALUES
  ('automation-fundamentals', 'automation', 'path', 'published', true, 0, 'أساسيات الأتمتة', 'ابدأ من المفهوم حتى أول Workflow منظم', 'Automation Fundamentals', 'مبتدئ', '3 أسابيع', ARRAY['المبتدئون','الفرق التشغيلية','المدربون']::text[], 'تفهم trigger و action وخرائط التدفق وتبني أول سيناريو بسيط بثقة.', ARRAY['ما هي الأتمتة؟','العمليات اليدوية القابلة للأتمتة','تصميم workflow','الاختبار والإطلاق']::text[], ARRAY['نموذج إلى Sheet إلى Email','سجل مهام يومي آلي']::text[], ARRAY['Google Sheets','Forms','Gmail']::text[], 'بناء لوحة استقبال طلبات بسيطة مع تنبيهات تلقائية.', 'foundation', 14, now()),
  ('no-code-automation', 'automation', 'path', 'published', true, 10, 'الأتمتة بدون كود', 'منصات مرئية لبناء نتائج سريعة', 'No-Code Automation', 'مبتدئ', '4 أسابيع', ARRAY['أصحاب الأعمال','فرق التسويق','منسقو العمليات']::text[], 'اختيار المنصة المناسبة وبناء سيناريوهات متكررة بدون برمجة.', ARRAY['مقارنة المنصات','تصميم السيناريو المرئي','الربط بين التطبيقات','مراقبة التشغيل']::text[], ARRAY['lead capture workflow','تذكير فواتير']::text[], ARRAY['Make','Zapier','Airtable']::text[], 'سير عمل متكامل لمتابعة العملاء المحتملين من form إلى CRM.', 'no-code', 18, now()),
  ('business-process-automation', 'automation', 'path', 'published', true, 20, 'أتمتة العمليات التجارية', 'تحويل الخطوات اليدوية إلى نظام تشغيلي', 'Business Process Automation', 'متوسط', '5 أسابيع', ARRAY['مديرو العمليات','فرق الجودة','PMO']::text[], 'ترسم العملية الحالية ثم تعيد بنائها كخط تدفق قابل للقياس.', ARRAY['تحليل العملية','تحديد نقاط التأخير','إدخال الموافقات','قياس أثر التشغيل']::text[], ARRAY['موافقات مشتريات','تدفق طلبات داخلية']::text[], ARRAY['n8n','Power Automate','Notion']::text[], 'تصميم عملية موافقة متعددة المراحل مع إشعارات وتقارير.', 'operations', 20, now()),
  ('ai-automation', 'automation', 'path', 'published', false, 30, 'أتمتة الذكاء الاصطناعي', 'استعمل النماذج في التصنيف والتلخيص والردود', 'AI Automation', 'متوسط', '4 أسابيع', ARRAY['المسوقون','فرق الدعم','صناع المحتوى']::text[], 'تدمج طبقة ذكاء تضيف الفهم إلى الـ workflow بدل الاكتفاء بالنقل.', ARRAY['أنماط الذكاء الاصطناعي العملية','تصميم prompts','التصنيف','الرقابة البشرية']::text[], ARRAY['ملخص بريد يومي','تصنيف رسائل العملاء']::text[], ARRAY['AI Model','Gmail','Notion']::text[], 'نظام AI يفرز البريد ويولد موجزًا يوميًا بالعربية.', 'ai', 16, now()),
  ('n8n-automation', 'automation', 'path', 'published', false, 40, 'أتمتة n8n', 'مسار عملي للأتمتة المفتوحة والقابلة للتخصيص', 'n8n Automation', 'متوسط', '5 أسابيع', ARRAY['المنفذون التقنيون','الـ freelancers','فرق المنتجات']::text[], 'تتعلم متى تختار n8n وكيف تبني flows أكثر مرونة وكلفة أقل.', ARRAY['البيئة والاستضافة','nodes الأساسية','webhooks','الـ error handling']::text[], ARRAY['Webhook routing','n8n CRM sync']::text[], ARRAY['n8n','Webhook','Supabase']::text[], 'بناء خط تكامل متكامل من نموذج إلى CRM مع إدارة أخطاء.', 'platform', 19, now()),
  ('make-automation', 'automation', 'path', 'published', false, 50, 'أتمتة Make.com', 'سيناريوهات مرئية سريعة للأعمال', 'Make.com Automation', 'مبتدئ', '3 أسابيع', ARRAY['الوكالات','فرق التسويق','الاستشاريون']::text[], 'تطلق سيناريوهات مرئية بسرعة مع تحكم جيد في المسارات الشرطية.', ARRAY['الموديولات والـ routers','الـ scheduling','تنظيف البيانات','التوسع']::text[], ARRAY['نشر محتوى تلقائي','weekly reporting']::text[], ARRAY['Make','Google Sheets','Notion']::text[], 'بناء سيناريو تقارير أسبوعية يرسل ملخصًا للإدارة.', 'platform', 12, now()),
  ('zapier-automation', 'automation', 'path', 'published', false, 60, 'أتمتة Zapier', 'أسرع مسار للتشغيل بين التطبيقات الشائعة', 'Zapier Automation', 'مبتدئ', '2 أسابيع', ARRAY['الفرق الصغيرة','فرق المبيعات','مؤسسو الشركات']::text[], 'تفعل المهام السريعة وتفهم حدود Zapier ومتى تحتاج الانتقال لأداة أقوى.', ARRAY['zaps الأساسية','multi-step','filters','handoff']::text[], ARRAY['onboarding emails','lead qualification']::text[], ARRAY['Zapier','Gmail','HubSpot']::text[], 'بناء Zap متعدد الخطوات للتقاط عميل وإرسال follow-up.', 'platform', 10, now()),
  ('google-sheets-automation', 'automation', 'path', 'published', false, 70, 'أتمتة Google Sheets', 'اجعل الجداول تعمل كمنصة تشغيل خفيفة', 'Google Sheets Automation', 'مبتدئ', '3 أسابيع', ARRAY['الإداريون','المراكز التعليمية','العمليات']::text[], 'تحول Sheets من ملف يدوي إلى طبقة متابعة وتقارير وTriggers.', ARRAY['نمذجة البيانات','التنبيهات','الجداول المرجعية','التقارير']::text[], ARRAY['سجل حضور','dashboard تشغيلية']::text[], ARRAY['Google Sheets','Apps Script','Gmail']::text[], 'نظام متابعة يومية مع تنبيهات وحسابات تلقائية.', 'workspace', 13, now()),
  ('whatsapp-automation-concepts', 'automation', 'path', 'published', false, 80, 'مفاهيم أتمتة WhatsApp', 'فهم القنوات والسياسات قبل التنفيذ', 'WhatsApp Automation Concepts', 'متوسط', '2 أسابيع', ARRAY['المبيعات','الدعم','التعليم']::text[], 'تفهم ما هو الممكن فعلاً في واتساب وتبني تدفقًا متوافقًا مع القواعد.', ARRAY['WhatsApp Business API','القوالب approved','الحالات المناسبة','الخصوصية']::text[], ARRAY['رسائل تسجيل طلاب','follow-up للعملاء']::text[], ARRAY['WhatsApp Business API concepts','CRM','n8n']::text[], 'تصميم رحلة متابعة عبر واتساب تراعي الموافقات والخصوصية.', 'messaging', 9, now()),
  ('email-automation', 'automation', 'path', 'published', false, 90, 'أتمتة البريد الإلكتروني', 'سلاسل متابعة وملخصات وموافقات', 'Email Automation', 'مبتدئ', '2 أسابيع', ARRAY['المبيعات','الدعم','الفرق التنفيذية']::text[], 'تصمم workflows تقلل الرسائل المتكررة وتزيد الاتساق والسرعة.', ARRAY['قوالب البريد','follow-up logic','daily briefs','approval mail']::text[], ARRAY['تذكيرات فواتير','رسائل onboarding']::text[], ARRAY['Gmail','Outlook concepts','AI Model']::text[], 'نظام بريد ذكي للمتابعة والإشعارات الداخلية.', 'communication', 9, now()),
  ('crm-automation', 'automation', 'path', 'published', false, 100, 'أتمتة CRM', 'نظّم رحلة العميل من أول lead إلى handoff', 'CRM Automation', 'متوسط', '4 أسابيع', ARRAY['فرق المبيعات','الوكالات','الاستشاريون']::text[], 'تبني عمليات بيع أكثر انضباطًا وتمنع ضياع leads والمهام.', ARRAY['lead routing','stages','SLAs','handoff to ops']::text[], ARRAY['CRM enrichment','deal reminders']::text[], ARRAY['HubSpot','CRM','Make']::text[], 'خط متابعة leads يوزع العملاء ويحدث المراحل تلقائيًا.', 'sales', 15, now()),
  ('lead-generation-automation', 'automation', 'path', 'published', false, 110, 'أتمتة توليد العملاء المحتملين', 'التقاط، تأهيل، ومتابعة أسرع', 'Lead Generation Automation', 'متوسط', '3 أسابيع', ARRAY['التسويق','المبيعات','الوكالات']::text[], 'تحول الـ leads من ملفات scattered إلى pipeline منضبط ومقاس.', ARRAY['lead capture','qualification','scoring','handover']::text[], ARRAY['website lead pipeline','campaign intake']::text[], ARRAY['Forms','CRM','WhatsApp']::text[], 'رحلة lead كاملة من الحملة إلى جدولة المكالمة.', 'growth', 12, now()),
  ('hr-automation', 'automation', 'path', 'published', false, 120, 'أتمتة الموارد البشرية', 'عمليات التوظيف والـ onboarding والمتابعة', 'HR Automation', 'متوسط', '4 أسابيع', ARRAY['فرق HR','الشركات الصغيرة','الإدارات']::text[], 'تبني عمليات HR أخف وأوضح من أول التقديم حتى الإكمال.', ARRAY['screening','interviews','documents','status updates']::text[], ARRAY['candidate screening','employee onboarding']::text[], ARRAY['Google Forms','Sheets','Trello']::text[], 'مسار توظيف يفرز المرشحين ويرتب المقابلات والوثائق.', 'hr', 14, now()),
  ('finance-automation', 'automation', 'path', 'published', false, 130, 'أتمتة المالية', 'تذكيرات، موافقات، وتقارير مالية دورية', 'Finance Automation', 'متقدم', '4 أسابيع', ARRAY['المالية','الإدارة','المحاسبة']::text[], 'تصمم تدفقات مالية مع حساسية أعلى وضبط أفضل للأخطاء.', ARRAY['سير الموافقات','الفواتير','التقارير','الحساسية والخصوصية']::text[], ARRAY['invoice reminder','approval workflow']::text[], ARRAY['Google Sheets','Power Automate','PDF Generator']::text[], 'تدفق موافقات ومدفوعات مع تقارير شهرية وإشعارات.', 'finance', 14, now()),
  ('customer-support-automation', 'automation', 'path', 'published', false, 140, 'أتمتة خدمة العملاء', 'تصنيف وتوجيه وإغلاق أسرع للتذاكر', 'Customer Support Automation', 'متوسط', '3 أسابيع', ARRAY['فرق الدعم','SaaS','المتاجر']::text[], 'ترفع سرعة الاستجابة وتقلل التشتت في القنوات المختلفة.', ARRAY['ticket intake','routing','SLA','feedback loops']::text[], ARRAY['support triage','ticket escalation']::text[], ARRAY['Slack','Gmail','Notion']::text[], 'نظام توجيه تذاكر الدعم مع مسارات تصعيد واضحة.', 'support', 12, now()),
  ('ecommerce-automation', 'automation', 'path', 'published', false, 150, 'أتمتة التجارة الإلكترونية', 'المخزون، الطلبات، والسلال المتروكة', 'E-commerce Automation', 'متوسط', '4 أسابيع', ARRAY['المتاجر','فرق النمو','العمليات']::text[], 'تبني تدفقات تشغيلية وتسويقية تقلل الفاقد وترفع التحويل.', ARRAY['orders','inventory','abandoned carts','fulfillment updates']::text[], ARRAY['cart recovery','stock alerts']::text[], ARRAY['Shopify concepts','Sheets','Gmail']::text[], 'تدفق استعادة سلة + تنبيه مخزون منخفض + تقارير يومية.', 'commerce', 14, now()),
  ('education-automation', 'automation', 'path', 'published', false, 160, 'أتمتة التعليم', 'التسجيل، المتابعة، والشهادات', 'Education Automation', 'متوسط', '4 أسابيع', ARRAY['المراكز التدريبية','الأكاديميات','الجامعات']::text[], 'تحول الرحلة التعليمية إلى عمليات أوضح وأقل اعتمادًا على المتابعة اليدوية.', ARRAY['registration','attendance','assessments','certificates']::text[], ARRAY['student onboarding','certificate generation']::text[], ARRAY['Google Forms','Sheets','PDF Generator']::text[], 'خط تسجيل طلاب وحضور وشهادات تلقائية.', 'education', 15, now()),
  ('real-estate-automation', 'automation', 'path', 'published', false, 170, 'أتمتة العقارات', 'إدارة الاستفسارات والزيارات والمتابعة', 'Real Estate Automation', 'متوسط', '3 أسابيع', ARRAY['شركات العقار','المسوقون العقاريون']::text[], 'تنظم رحلة العميل العقاري من الاستفسار حتى المتابعة بعد الزيارة.', ARRAY['lead intake','property matching','visit scheduling','follow-up']::text[], ARRAY['inquiry routing','visit confirmation']::text[], ARRAY['CRM','WhatsApp','Calendar']::text[], 'نظام استفسارات عقارية يوزع leads ويؤكد الزيارات.', 'real-estate', 11, now()),
  ('clinic-medical-admin-automation', 'automation', 'path', 'published', false, 180, 'أتمتة إدارة العيادات', 'الحجوزات والتذكير والملفات الإدارية', 'Clinic and Medical Admin Automation', 'متوسط', '3 أسابيع', ARRAY['العيادات','الإداريون الصحيون']::text[], 'تبني عمليات حجز وتذكير ومتابعة إدارية بدون المساس بالخصوصية.', ARRAY['appointments','reminders','intake forms','daily rosters']::text[], ARRAY['clinic booking flow','reminder workflow']::text[], ARRAY['Calendar','WhatsApp concepts','Sheets']::text[], 'رحلة حجز وتأكيد زيارة وتذكير قبل الموعد مع سجل داخلي.', 'health', 11, now()),
  ('python-automation', 'automation', 'path', 'published', false, 190, 'أتمتة Python', 'للحالات التي تتجاوز حدود المنصات الجاهزة', 'Python Automation', 'متقدم', '5 أسابيع', ARRAY['المطورون','الـ automation specialists']::text[], 'تعرف متى تدخل البرمجة ومتى يكون Python هو القرار الصحيح.', ARRAY['scripts','APIs','data handling','scheduling']::text[], ARRAY['custom integration','reporting bot']::text[], ARRAY['Python','APIs','Firebase']::text[], 'سكربت يجمع البيانات من API ويولد تقارير ويرسل تنبيهات.', 'code', 18, now()),
  ('browser-automation', 'automation', 'path', 'published', false, 200, 'أتمتة المتصفح', 'عندما تحتاج محاكاة تفاعل فعلي مع الويب', 'Browser Automation', 'متقدم', '3 أسابيع', ARRAY['المطورون','الفرق التقنية']::text[], 'تفهم حدود browser automation ومخاطرها وكيف تستخدمها بمسؤولية.', ARRAY['Playwright basics','selectors','reliability','ethics']::text[], ARRAY['portal extraction concept','browser task runner']::text[], ARRAY['Playwright concepts','Puppeteer concepts']::text[], 'خط أتمتة لمهمة متصفح داخل بيئة خاضعة للرقابة والاختبار.', 'code', 11, now()),
  ('rpa-basics', 'automation', 'path', 'published', false, 210, 'أساسيات RPA', 'متى تستخدم الأتمتة الروبوتية المكتبية', 'RPA Basics', 'متوسط', '2 أسابيع', ARRAY['العمليات','الفرق المؤسسية']::text[], 'تتعرف على سيناريوهات RPA وحدودها ومتى تكون ملائمة فعلًا.', ARRAY['what is RPA','desktop tasks','fragility','governance']::text[], ARRAY['copy-paste admin flow','legacy system intake']::text[], ARRAY['Power Automate','RPA concepts']::text[], 'سيناريو RPA بسيط لنظام قديم لا يملك API.', 'enterprise', 8, now()),
  ('api-integration', 'automation', 'path', 'published', false, 220, 'تكامل APIs', 'ربط الأنظمة بوضوح وثقة', 'API Integration', 'متقدم', '4 أسابيع', ARRAY['المطورون','المنفذون التقنيون']::text[], 'تفهم الـ endpoints والـ payloads والتوثيق والـ authentication وتربط الأنظمة بشكل صحيح.', ARRAY['HTTP basics','auth','payload mapping','error handling']::text[], ARRAY['CRM sync','custom webhook listener']::text[], ARRAY['APIs','Postman concepts','n8n']::text[], 'خدمة مزامنة ثنائية الاتجاه بين CRM ونظام داخلي.', 'integration', 15, now()),
  ('webhooks', 'automation', 'path', 'published', false, 230, 'الـ Webhooks', 'من الحدث إلى الاستجابة الفورية', 'Webhooks', 'متوسط', '2 أسابيع', ARRAY['المنفذون','فرق النمو','الدعم']::text[], 'تفهم كيف تتحرك البيانات event-driven وتبني workflows أسرع وأكثر لحظية.', ARRAY['event design','payloads','security','retry strategy']::text[], ARRAY['payment webhook','form intake listener']::text[], ARRAY['Webhook','n8n','Make']::text[], 'تصميم نقطة استقبال Webhook مع التحقق وتسجيل الأخطاء.', 'integration', 8, now()),
  ('automation-security-governance', 'automation', 'path', 'published', false, 240, 'أمن الأتمتة والحوكمة', 'ابنِ أتمتة مفيدة من غير مخاطر غير محسوبة', 'Automation Security and Governance', 'متقدم', '3 أسابيع', ARRAY['المديرون','المنفذون','فرق الامتثال']::text[], 'تتعلم ضوابط الوصول، التوثيق، النسخ الاحتياطي، والمراجعة التشغيلية.', ARRAY['data access','approval design','auditability','maintenance']::text[], ARRAY['sensitive HR process','finance approval flow']::text[], ARRAY['Notion','Power Automate','Supabase']::text[], 'وثيقة حوكمة تشغيلية لأتمتة مؤسسية مع خطة صيانة.', 'governance', 10, now());
