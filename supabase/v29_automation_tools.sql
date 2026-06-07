-- ═════════════════════════════════════════════════════════════════
-- v29 — Automation Tools Directory (automation_tools) — REGENERATED from real source (previous v29 had fabricated rows)
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_tools (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'tool',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  name                   TEXT NOT NULL DEFAULT '',
  category               TEXT NOT NULL DEFAULT '',
  what_it_is             TEXT NOT NULL DEFAULT '',
  best_use_cases         TEXT[] NOT NULL DEFAULT '{}',
  difficulty             TEXT NOT NULL DEFAULT 'مبتدئ' CHECK (difficulty IN ('مبتدئ','متوسط','متقدم')),
  pricing_category       TEXT NOT NULL DEFAULT 'مجاني',
  pros                   TEXT[] NOT NULL DEFAULT '{}',
  cons                   TEXT[] NOT NULL DEFAULT '{}',
  when_to_use            TEXT[] NOT NULL DEFAULT '{}',
  when_not_to_use        TEXT[] NOT NULL DEFAULT '{}',
  example_automations    TEXT[] NOT NULL DEFAULT '{}',
  related_learning_paths TEXT[] NOT NULL DEFAULT '{}',
  arabic_support         TEXT NOT NULL DEFAULT 'محدود',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_tools_status ON automation_tools (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_tools_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_tools_updated_at ON automation_tools;
CREATE TRIGGER trg_automation_tools_updated_at
  BEFORE UPDATE ON automation_tools
  FOR EACH ROW EXECUTE FUNCTION update_automation_tools_updated_at();

-- 3. RLS
ALTER TABLE automation_tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_tools" ON automation_tools;
CREATE POLICY "public_read_published_automation_tools"
  ON automation_tools FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_tools" ON automation_tools;
CREATE POLICY "admin_manage_automation_tools"
  ON automation_tools FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 27 tool entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_tools (id, portal_id, content_type, status, featured, sort_order, name, category, what_it_is, best_use_cases, difficulty, pricing_category, pros, cons, when_to_use, when_not_to_use, example_automations, related_learning_paths, arabic_support, published_at)
VALUES
  ('n8n', 'automation', 'tool', 'published', false, 0, 'n8n', 'workflow automation', 'منصة مفتوحة المصدر لبناء workflows مرنة وقابلة للتخصيص.', ARRAY['تكاملات APIs','flows متعددة الفروع','حلول low-cost'], 'متوسط', 'مجاني / مدفوع', ARRAY['مرونة عالية','open-source','مناسب للخصوصية'], ARRAY['يحتاج خبرة أكثر من Zapier','الإعداد والاستضافة قد يربكان المبتدئ'], ARRAY['عندما تحتاج منطقًا مخصصًا أو تفضّل self-hosting','عندما تريد كلفة أقل على المدى المتوسط'], ARRAY['إذا كان الفريق يريد سرعة قصوى بدون تعلم','إذا لم يكن لديك قدرة على إدارة البيئة'], ARRAY['Webhook to CRM','تقارير تشغيلية','مزامنة قواعد بيانات'], ARRAY['n8n-automation','api-integration'], 'يدعم العربية داخل المحتوى والبيانات لكن الواجهة تعتمد على بناءك.', now()),
  ('make', 'automation', 'tool', 'published', false, 10, 'Make', 'visual automation', 'منصة مرئية لبناء سيناريوهات سريعة مع routers وتفرعات واضحة.', ARRAY['التسويق','التقارير','الربط بين أدوات SaaS'], 'مبتدئ', 'مدفوع', ARRAY['واجهة مرئية ممتازة','سريع للتنفيذ','واضح للمراجعة'], ARRAY['قد ترتفع التكلفة مع الاستخدام','أقل مرونة من الكود في الحالات المعقدة'], ARRAY['عندما تريد سرعة delivery وواجهة يفهمها العميل','عندما تكون الأدوات SaaS جاهزة'], ARRAY['إذا كان المشروع شديد الحساسية للبيانات','إذا كنت تحتاج منطقًا تقنيًا عميقًا'], ARRAY['lead follow-up','content approval'], ARRAY['make-automation','no-code-automation'], 'مناسب للمحتوى العربي لكن بعض الصياغات تحتاج تنظيمًا منك.', now()),
  ('zapier', 'automation', 'tool', 'published', false, 20, 'Zapier', 'app automation', 'خيار سريع للربط بين التطبيقات الشائعة بخطوات قليلة.', ARRAY['مهام سريعة','فرق صغيرة','startups'], 'مبتدئ', 'مدفوع', ARRAY['سرعة البدء','مكتبة تطبيقات كبيرة'], ARRAY['التكلفة','حدود في المنطق العميق'], ARRAY['عندما تريد prototype سريعًا','عندما يكون الفريق غير تقني'], ARRAY['إذا كان flow كبيرًا ومتكررًا جدًا','إذا احتجت تحكمًا دقيقًا في البيانات'], ARRAY['email follow-up','CRM lead intake'], ARRAY['zapier-automation','lead-generation-automation'], 'الواجهة ليست عربية، لكن المخرجات يمكن أن تكون عربية.', now()),
  ('power-automate', 'automation', 'tool', 'published', false, 30, 'Power Automate', 'enterprise automation', 'منصة مايكروسوفت المناسبة للبيئات المؤسسية وMicrosoft 365.', ARRAY['عمليات داخلية','موافقات','بيئات Microsoft-heavy'], 'متوسط', 'مدفوع', ARRAY['ممتاز مع Microsoft','approvals جيدة','مؤسسي'], ARRAY['أقل جاذبية للفرق الصغيرة','قد يتطلب تراخيص'], ARRAY['إذا كانت الشركة تعتمد Outlook وTeams وExcel','إذا كانت الموافقات جزءًا محوريًا'], ARRAY['إذا كان stack لديك Google-first','إذا كان المطلوب prototype خفيف'], ARRAY['approval workflow','HR forms'], ARRAY['business-process-automation','finance-automation'], 'العربية مقبولة في المحتوى، وتبقى قوة الأداة في التكامل المؤسسي.', now()),
  ('airtable', 'automation', 'tool', 'published', false, 40, 'Airtable', 'data platform', 'قاعدة بيانات مرئية مع views وforms وواجهات خفيفة.', ARRAY['إدارة العمليات','قوائم داخلية','mini CRM'], 'متوسط', 'مجاني / مدفوع', ARRAY['مرونة في البيانات','واجهة مريحة','سهل للفرق'], ARRAY['ليس بديلًا كاملًا لقواعد البيانات الإنتاجية','قد ترتفع الكلفة'], ARRAY['إذا كنت تحتاج قاعدة بيانات مرئية','إذا كان الفريق يحتاج views مختلفة'], ARRAY['إذا كان لديك بيانات شديدة الحساسية','إذا كان الحجم كبيرًا جدًا'], ARRAY['content pipeline','operations tracker'], ARRAY['no-code-automation'], 'البيانات العربية تعمل جيدًا عادة.', now()),
  ('notion', 'automation', 'tool', 'published', false, 50, 'Notion', 'workspace', 'مساحة عمل تجمع مستندات وقواعد بيانات وتشغيل خفيف.', ARRAY['SOPs','content ops','knowledge'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['مرن','محبوب للفرق','ممتاز للتوثيق'], ARRAY['ليس engine automation كاملًا','إدارة الصلاحيات تحتاج انتباه'], ARRAY['عندما تحتاج documentation + lightweight workflows','لإدارة المعرفة'], ARRAY['إذا كان workflow حرجًا زمنيًا جدًا','إذا كنت تحتاج محرك قواعد متقدم'], ARRAY['meeting summaries','content approval'], ARRAY['ai-automation','business-process-automation'], 'يدعم العربية في المحتوى لكنه يحتاج تنسيقًا جيدًا.', now()),
  ('google-sheets', 'automation', 'tool', 'published', false, 60, 'Google Sheets', 'spreadsheet', 'جدول سحابي يمكن تحويله إلى طبقة تشغيل خفيفة.', ARRAY['التقارير','السجلات','نماذج التشغيل'], 'مبتدئ', 'مجاني', ARRAY['مألوف','مرن','سريع'], ARRAY['فوضوي إذا زاد الحمل','ليس قاعدة بيانات حقيقية'], ARRAY['عندما تبدأ بسرعة','للتقارير والمتابعة'], ARRAY['إذا احتجت permission model معقد','إذا كان الحجم كبيرًا جدًا'], ARRAY['attendance automation','weekly reporting'], ARRAY['google-sheets-automation'], 'العربية ممتازة.', now()),
  ('google-apps-script', 'automation', 'tool', 'published', false, 70, 'Google Apps Script', 'scripting', 'طبقة برمجة خفيفة داخل Google Workspace.', ARRAY['Sheets custom logic','Drive automation','mail merge'], 'متقدم', 'مجاني', ARRAY['قوي داخل Google','بدون تكلفة إضافية كبيرة'], ARRAY['debugging أقل راحة','حدود البيئة'], ARRAY['إذا كان stack لديك Google-first','للتخصيصات المتوسطة'], ARRAY['إذا كنت تحتاج architecture أكبر','إذا كان الفريق لا يملك دعمًا تقنيًا'], ARRAY['sheet triggers','document automation'], ARRAY['google-sheets-automation','python-automation'], 'العربية في البيانات ممتازة.', now()),
  ('python', 'automation', 'tool', 'published', false, 80, 'Python', 'code automation', 'لغة عملية لبناء منطق مخصص وتكاملات أعمق وتقارير متقدمة.', ARRAY['custom APIs','data pipelines','complex logic'], 'متقدم', 'مجاني', ARRAY['مرونة قصوى','ممتاز للمنطق المعقد'], ARRAY['أبطأ في التسليم لغير التقنيين','يحتاج صيانة أوضح'], ARRAY['إذا كانت المنصات الجاهزة لا تكفي','للتعاملات البرمجية'], ARRAY['إذا كان المطلوب بسيطًا جدًا','إذا أراد العميل no-code بالكامل'], ARRAY['API sync','finance reports'], ARRAY['python-automation','api-integration'], 'العربية في المخرجات تحت سيطرتك بالكامل.', now()),
  ('playwright-concepts', 'automation', 'tool', 'published', false, 90, 'Selenium / Playwright concepts', 'browser automation', 'مفاهيم لأتمتة مهام المتصفح واختبار الواجهات.', ARRAY['اختبارات الويب','مهام browser controlled','portal automation'], 'متقدم', 'مفاهيمي', ARRAY['قوي','مناسب للاختبار والمهام المنضبطة'], ARRAY['هش إذا استخدم ضد صفحات غير مستقرة','ليس بديلًا أولًا عن API'], ARRAY['عندما لا توجد API مناسبة','عندما تكون المهمة browser-centric'], ARRAY['إذا كانت المهمة متاحة عبر API','إذا كان الموقع غير مستقر أو غير مصرح'], ARRAY['browser data collection','portal checks'], ARRAY['browser-automation'], 'المحتوى العربي يعتمد على الصفحة الهدف.', now()),
  ('puppeteer-concepts', 'automation', 'tool', 'published', false, 100, 'Puppeteer concepts', 'browser automation', 'مفاهيم بديلة للمتصفح شائعة في بعض المشاريع.', ARRAY['rendering','automation scripts','page capture'], 'متقدم', 'مفاهيمي', ARRAY['خفيف في بعض السيناريوهات','شائع لدى المطورين'], ARRAY['أقل ثراء من Playwright في بعض النواحي'], ARRAY['للمهام البسيطة على Chromium','لإنشاء scripts خاصة'], ARRAY['إذا كنت تحتاج cross-browser','إذا كان فريقك يفضل واجهة أوسع'], ARRAY['pdf rendering','browser scripting'], ARRAY['browser-automation'], 'محايد تجاه اللغة.', now()),
  ('slack', 'automation', 'tool', 'published', false, 110, 'Slack', 'collaboration', 'منصة تواصل مناسبة للتنبيهات والموافقات السريعة للفرق.', ARRAY['notifications','approvals','ops alerts'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['ممتاز للتنبيهات','واضح للفرق'], ARRAY['قد يسبب noise','لا يغني عن النظام الأساسي'], ARRAY['عندما تريد handoff سريعًا','لإشعارات التشغيل'], ARRAY['إذا كان الفريق لا يستخدم Slack','إذا كنت تحتاج سجلًا رئيسيًا لا مجرد تنبيه'], ARRAY['approval notices','support escalations'], ARRAY['customer-support-automation'], 'العربية في المحتوى جيدة.', now()),
  ('gmail', 'automation', 'tool', 'published', false, 120, 'Gmail', 'communication', 'قناة أساسية للرسائل، الإشعارات، والـ daily briefs.', ARRAY['follow-up','notifications','summaries'], 'مبتدئ', 'مجاني', ARRAY['مألوف','موجود لدى الجميع تقريبًا'], ARRAY['ليس كافيًا وحده لهيكلة العمليات'], ARRAY['للبريد والملخصات والتنبيهات'], ARRAY['إذا كنت تحتاج مسارات approvals معقدة'], ARRAY['invoice reminders','student onboarding'], ARRAY['email-automation'], 'ممتاز للعربية.', now()),
  ('google-calendar', 'automation', 'tool', 'published', false, 130, 'Google Calendar', 'scheduling', 'جدولة المواعيد والتنبيهات والمهام الزمنية.', ARRAY['appointment reminders','schedule automation'], 'مبتدئ', 'مجاني', ARRAY['واضح','مرتبط بنظام المواعيد'], ARRAY['محدود إذا استُخدم وحده'], ARRAY['للتذكير وجدولة الأحداث'], ARRAY['إذا لم تكن المواعيد جزءًا مهمًا من العملية'], ARRAY['clinic reminders','sales meetings'], ARRAY['clinic-medical-admin-automation'], 'جيد مع العربية.', now()),
  ('trello', 'automation', 'tool', 'published', false, 140, 'Trello', 'project tracking', 'أداة لوحات بسيطة لتحويل الأحداث إلى مهام.', ARRAY['follow-up boards','content ops'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['واضحة','خفيفة'], ARRAY['أبسط من حاجات بعض الفرق'], ARRAY['للمهام السريعة والواضحة'], ARRAY['إذا احتجت workflow معقدًا'], ARRAY['task creation','approval board'], ARRAY['business-process-automation'], 'العربية مقبولة.', now()),
  ('asana', 'automation', 'tool', 'published', false, 150, 'Asana', 'project management', 'إدارة مشاريع ومهام تصلح للفرق المنظمة.', ARRAY['approvals','project handoffs','ops'], 'متوسط', 'مدفوع', ARRAY['واجهة قوية','حالات مهام جيدة'], ARRAY['قد تكون كبيرة على الفرق الصغيرة'], ARRAY['إذا كانت المهام محور العملية'], ARRAY['إذا كنت تريد حلاً أخف وأرخص'], ARRAY['client delivery workflow'], ARRAY['business-process-automation'], 'العربية بالمحتوى جيدة.', now()),
  ('clickup', 'automation', 'tool', 'published', false, 160, 'ClickUp', 'project management', 'منصة عمل مرنة للمهام والوثائق والأتمتة الخفيفة.', ARRAY['agency ops','content','service delivery'], 'متوسط', 'مجاني / مدفوع', ARRAY['مرنة','غنية'], ARRAY['قد تصبح مزدحمة'], ARRAY['إذا كان الفريق يريد مساحة موحدة'], ARRAY['إذا كان المطلوب أداة أبسط'], ARRAY['service delivery pipeline'], ARRAY['business-process-automation'], 'العربية ممكنة داخل المحتوى.', now()),
  ('hubspot', 'automation', 'tool', 'published', false, 170, 'HubSpot', 'crm', 'CRM مناسب لتتبع leads والمبيعات وبعض مهام التسويق.', ARRAY['sales pipelines','lead capture','follow-up'], 'متوسط', 'مجاني / مدفوع', ARRAY['قوي في الـ CRM','واضح للمبيعات'], ARRAY['الخصائص المتقدمة مدفوعة'], ARRAY['إذا كانت المبيعات محورية'], ARRAY['إذا كانت الميزانية شديدة الضيق'], ARRAY['lead nurturing','deal updates'], ARRAY['crm-automation','lead-generation-automation'], 'المحتوى العربي جيد بعد التخصيص.', now()),
  ('whatsapp-business-api-concepts', 'automation', 'tool', 'published', false, 180, 'WhatsApp Business API concepts', 'messaging', 'مفاهيم مرتبطة بقناة واتساب للأعمال والقيود التنظيمية.', ARRAY['customer reminders','student notifications','lead follow-up'], 'متوسط', 'مفاهيمي', ARRAY['معدل فتح مرتفع','ملائم للعملاء'], ARRAY['يتطلب اعتمادًا ومزودًا مناسبًا','قيود قوالب وموافقات'], ARRAY['إذا كانت القناة الأساسية للعملاء هي واتساب'], ARRAY['إذا كنت تتوقع أتمتة غير مقيدة بدون موافقات'], ARRAY['appointment confirmations','student reminders'], ARRAY['whatsapp-automation-concepts'], 'العربية ممتازة في الرسائل، مع ضرورة ضبط القوالب.', now()),
  ('telegram-bot-api-concepts', 'automation', 'tool', 'published', false, 190, 'Telegram Bot API concepts', 'messaging', 'مفاهيم لبناء تنبيهات وبوتات أخف وأكثر مرونة في تيليجرام.', ARRAY['internal alerts','ops bots','simple user commands'], 'متوسط', 'مفاهيمي', ARRAY['مرن','سهل نسبيًا'], ARRAY['ليس القناة المناسبة لكل جمهور'], ARRAY['للتنبيهات الداخلية أو المجتمعات'], ARRAY['إذا كان جمهورك لا يستخدم تيليجرام'], ARRAY['ops alerts','command bot'], ARRAY['business-process-automation'], 'يدعم العربية جيدًا.', now()),
  ('supabase', 'automation', 'tool', 'published', false, 200, 'Supabase', 'backend', 'طبقة backend/Postgres مناسبة للتطبيقات السريعة والبيانات المشتركة.', ARRAY['shared dashboards','data logging','light backend'], 'متوسط', 'مجاني / مدفوع', ARRAY['عملي','سريع','مناسب للمنتجات'], ARRAY['ليس مطلوبًا دائمًا للمهام البسيطة'], ARRAY['عندما تحتاج قاعدة بيانات فعلية وسجلًا واضحًا'], ARRAY['إذا كان sheet كافيًا حاليًا'], ARRAY['event logging','shared profiles'], ARRAY['n8n-automation','api-integration'], 'العربية في البيانات جيدة.', now()),
  ('firebase', 'automation', 'tool', 'published', false, 210, 'Firebase', 'backend', 'خيار backend مناسب لبعض التطبيقات والتنبيهات والـ realtime cases.', ARRAY['mobile-linked flows','simple backend','event data'], 'متوسط', 'مجاني / مدفوع', ARRAY['سريع','منتشر'], ARRAY['يحتاج فهمًا جيدًا للبنية'], ARRAY['إذا كان المنتج مرتبطًا بتطبيقات أو واجهات'], ARRAY['إذا كانت العملية بسيطة جدًا'], ARRAY['notification tracker','user events'], ARRAY['api-integration'], 'محايد تجاه اللغة.', now()),
  ('retool', 'automation', 'tool', 'published', false, 220, 'Retool', 'internal apps', 'منصة لبناء أدوات داخلية ولوحات تشغيل بسرعة.', ARRAY['ops dashboards','approval consoles','internal admin'], 'متوسط', 'مدفوع', ARRAY['سريع لبناء واجهات داخلية','مفيد للفرق'], ARRAY['ليس أداة أتمتة خالصة'], ARRAY['إذا احتجت واجهة تشغيل وإدارة فوق الـ workflows'], ARRAY['إذا كان المطلوب مجرد تدفق بدون واجهة'], ARRAY['internal request console','ops dashboard'], ARRAY['business-process-automation'], 'العربية تحتاج تنسيقًا من جهتك.', now()),
  ('baserow', 'automation', 'tool', 'published', false, 230, 'Baserow', 'open-source data', 'بديل مفتوح المصدر لقواعد البيانات المرئية الخفيفة.', ARRAY['privacy-sensitive bases','internal tables','simple ops'], 'متوسط', 'مجاني / مدفوع', ARRAY['open-source','مرن'], ARRAY['أقل نضجًا من بعض البدائل'], ARRAY['إذا أردت قاعدة مرئية مفتوحة المصدر'], ARRAY['إذا كان فريقك يريد أداة معروفة أكثر'], ARRAY['internal asset tracker','request tables'], ARRAY['n8n-automation'], 'يدعم النصوص العربية جيدًا.', now()),
  ('activepieces', 'automation', 'tool', 'published', false, 240, 'Activepieces', 'workflow automation', 'منصة أتمتة مفتوحة المصدر بديل مجاني لـ Zapier وMake قابل للاستضافة الذاتية.', ARRAY['تكاملات SaaS','workflows بسيطة','privacy-first'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['مفتوح المصدر ومجاني للاستضافة الذاتية','واجهة مرئية سهلة','بدون حدود runs'], ARRAY['أصغر مكتبة تكاملات مقارنةً بـ Zapier','المجتمع أصغر حجمًا'], ARRAY['إذا أردت بديلاً مجانياً لـ Zapier/Make مع self-hosting','للمشاريع الصغيرة والمتوسطة'], ARRAY['إذا كنت تحتاج آلاف التكاملات الجاهزة','إذا كان الفريق يفضل أداة مشهورة تمامًا'], ARRAY['lead follow-up','form to CRM'], ARRAY['n8n-automation','no-code-automation'], 'البيانات العربية مدعومة في المحتوى.', now()),
  ('typeform', 'automation', 'tool', 'published', false, 250, 'Typeform', 'form automation', 'منصة نماذج وسيرفيات تفاعلية تُحسّن معدلات الاستجابة.', ARRAY['جمع البيانات','استطلاعات الرأي','lead generation forms'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['تجربة مستخدم ممتازة','معدل إكمال مرتفع','تكاملات سهلة مع n8n/Zapier'], ARRAY['الخصائص المتقدمة مدفوعة','محدود في المنطق المعقد'], ARRAY['عندما تريد نماذج تفاعلية جذابة بدلاً من النماذج الاعتيادية','لاستطلاعات العملاء'], ARRAY['إذا كان النموذج بسيطاً جداً','إذا كانت الميزانية صفر'], ARRAY['onboarding surveys','course feedback'], ARRAY['education-automation','lead-generation-automation'], 'يدعم حقول عربية لكن الواجهة إنجليزية.', now()),
  ('brevo', 'automation', 'tool', 'published', false, 260, 'Brevo', 'email marketing', 'منصة بريد إلكتروني تسويقي ومراسلات بأسعار معقولة ومجاناً مقبولاً.', ARRAY['email campaigns','transactional emails','SMS notifications'], 'مبتدئ', 'مجاني / مدفوع', ARRAY['مجانية سخية (300 بريد/يوم)','سهلة الاستخدام','SMS مدمج'], ARRAY['قد تحتاج دعمًا للتخصيص المتقدم'], ARRAY['عندما تريد بريدًا تسويقياً بميزانية محدودة','للرسائل التلقائية والحملات'], ARRAY['إذا كنت تحتاج أتمتة عميقة جداً مع AI','إذا كانت قوائمك ضخمة جداً'], ARRAY['newsletter campaigns','student reminders'], ARRAY['email-automation','education-automation'], 'يدعم المحتوى العربي في الرسائل.', now());
