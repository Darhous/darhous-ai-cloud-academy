-- ═════════════════════════════════════════════════════════════════
-- v37 — Automation Ready-made Prompts (automation_prompts) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_prompts (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'prompt',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  goal                   TEXT NOT NULL DEFAULT '',
  prompt                 TEXT NOT NULL DEFAULT '',
  output                 TEXT NOT NULL DEFAULT '',
  recommended_for        TEXT[] NOT NULL DEFAULT '{}',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_prompts_status ON automation_prompts (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_prompts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_prompts_updated_at ON automation_prompts;
CREATE TRIGGER trg_automation_prompts_updated_at
  BEFORE UPDATE ON automation_prompts
  FOR EACH ROW EXECUTE FUNCTION update_automation_prompts_updated_at();

-- 3. RLS
ALTER TABLE automation_prompts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_prompts" ON automation_prompts;
CREATE POLICY "public_read_published_automation_prompts"
  ON automation_prompts FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_prompts" ON automation_prompts;
CREATE POLICY "admin_manage_automation_prompts"
  ON automation_prompts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 11 prompt entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_prompts (id, portal_id, content_type, status, featured, sort_order, title, goal, prompt, output, recommended_for, published_at)
VALUES
  ('analyze-process', 'automation', 'prompt', 'published', false, 0, 'تحليل عملية عمل', 'تفكيك العملية الحالية إلى مدخلات، تكرار، ألم، ومخرجات.', 'حلل العملية التالية كخبير أتمتة عربي. حدّد الخطوات الحالية، من ينفذها، أين يضيع الوقت، ما المدخلات، ما المخرجات، وما أفضل 3 فرص للأتمتة بدون تعقيد. العملية: {{process}}', 'خريطة عملية + فرص أتمتة + أولوية التنفيذ', ARRAY['Discovery','Consulting'], now()),
  ('generate-workflow-steps', 'automation', 'prompt', 'published', false, 10, 'توليد خطوات Workflow', 'تحويل وصف عام إلى خطوات تنفيذية مرتبة.', 'حوّل هذا الوصف إلى workflow عملي باللغة العربية. اكتب Trigger، الخطوات، القرارات، نقاط الفشل، والمخرجات. الوصف: {{description}}', 'Workflow steps ordered', ARRAY['Blueprinting','Generator'], now()),
  ('manual-to-automation', 'automation', 'prompt', 'published', false, 20, 'تحويل مهمة يدوية إلى أتمتة', 'اقتراح مسار أتمتة بديل لمهمة بشرية متكررة.', 'هذه مهمة يدوية تتكرر باستمرار: {{task}}. اقترح كيف يمكن تحويلها إلى أتمتة مع أقل مخاطرة وأوضح stack ممكن.', 'Manual vs automated plan', ARRAY['Operations','SMBs'], now()),
  ('choose-tools', 'automation', 'prompt', 'published', false, 30, 'اختيار الأدوات', 'اقتراح stack مناسب حسب الميزانية والخصوصية والمهارة.', 'اقترح أدوات مناسبة لهذه الحالة مع سبب الاختيار وما يجب تجنبه. المهارة: {{skill}}. الميزانية: {{budget}}. الخصوصية: {{privacy}}. التطبيقات الحالية: {{apps}}', 'Recommended stack + avoid list', ARRAY['Tools Hub','Pre-sales'], now()),
  ('n8n-plan', 'automation', 'prompt', 'published', false, 40, 'خطة بناء n8n', 'إخراج brief يمكن البناء عليه داخل n8n.', 'اكتب خطة n8n workflow باللغة العربية والإنجليزية المختلطة عند الحاجة. اذكر nodes، trigger، data mapping، error handling، وما يحتاج review بشري. السيناريو: {{scenario}}', 'n8n-ready blueprint', ARRAY['n8n','Technical teams'], now()),
  ('make-plan', 'automation', 'prompt', 'published', false, 50, 'خطة سيناريو Make', 'صياغة scenario واضح داخل Make.', 'حوّل السيناريو التالي إلى خطة Make scenario. حدّد modules، routers، filters، schedule، والاستثناءات. السيناريو: {{scenario}}', 'Make scenario plan', ARRAY['Make','Agencies'], now()),
  ('zapier-plan', 'automation', 'prompt', 'published', false, 60, 'خطة Zapier', 'بناء Zap بسيط أو multi-step مع حدود واضحة.', 'اقترح Zapier workflow لهذا السيناريو. اذكر trigger app، action apps، filters، وأين قد نحتاج الانتقال لأداة أقوى. السيناريو: {{scenario}}', 'Zapier workflow plan', ARRAY['Zapier','SMBs'], now()),
  ('create-sop', 'automation', 'prompt', 'published', false, 70, 'صياغة SOP', 'تحويل automation إلى وثيقة تسليم أو تشغيل.', 'اكتب SOP عربي مختصر وواضح لهذا الـ workflow يتضمن الهدف، خطوات التشغيل، التنبيهات، ماذا نفعل عند الفشل، ومن المسؤول. workflow: {{workflow}}', 'SOP document', ARRAY['Operations','Handover'], now()),
  ('testing-checklist', 'automation', 'prompt', 'published', false, 80, 'إنشاء Checklist اختبار', 'بناء قائمة QA قبل الإطلاق.', 'أنشئ testing checklist عربية لهذا الـ workflow. غطِّ happy path، edge cases، البيانات الناقصة، التكرار، والإشعارات. workflow: {{workflow}}', 'QA checklist', ARRAY['QA','Launch'], now()),
  ('client-proposal', 'automation', 'prompt', 'published', false, 90, 'صياغة Proposal للعميل', 'إنتاج نص عرض خدمة واضح واحترافي.', 'اكتب proposal عربي احترافي لعميل يريد الأتمتة التالية: {{automation}}. اذكر المشكلة، النطاق، deliverables، المدة، وما لا يشمله العمل.', 'Client proposal', ARRAY['Services','Freelancers'], now()),
  ('cost-roi', 'automation', 'prompt', 'published', false, 100, 'تقدير الكلفة والعائد', 'صياغة أولية للعائد المتوقع من الأتمتة.', 'قدّر ROI لهذه الأتمتة بناء على: عدد مرات التنفيذ {{frequency}}، الوقت الحالي {{minutes}} دقيقة، تكلفة الساعة {{hourlyCost}}، ونسبة الأتمتة المتوقعة {{coverage}}.', 'ROI narrative', ARRAY['Business case','Tools Hub'], now());
