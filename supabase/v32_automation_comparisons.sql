-- ═════════════════════════════════════════════════════════════════
-- v32 — Automation Tool Comparisons (automation_comparisons) — HYBRID: options JSONB (nested array of objects)
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_comparisons (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'comparison',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  focus                  TEXT NOT NULL DEFAULT '',
  options                JSONB NOT NULL DEFAULT '[]'::jsonb,
  verdict                TEXT NOT NULL DEFAULT '',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_comparisons_status ON automation_comparisons (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_comparisons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_comparisons_updated_at ON automation_comparisons;
CREATE TRIGGER trg_automation_comparisons_updated_at
  BEFORE UPDATE ON automation_comparisons
  FOR EACH ROW EXECUTE FUNCTION update_automation_comparisons_updated_at();

-- 3. RLS
ALTER TABLE automation_comparisons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_comparisons" ON automation_comparisons;
CREATE POLICY "public_read_published_automation_comparisons"
  ON automation_comparisons FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_comparisons" ON automation_comparisons;
CREATE POLICY "admin_manage_automation_comparisons"
  ON automation_comparisons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 4 comparison entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_comparisons (id, portal_id, content_type, status, featured, sort_order, title, focus, options, verdict, published_at)
VALUES
  ('zapier-vs-make-vs-n8n', 'automation', 'comparison', 'published', false, 0, 'Zapier vs Make vs n8n', 'السرعة مقابل المرونة والكلفة', '[{"name":"Zapier","bestFor":"فِرق صغيرة تريد launch سريعًا","caution":"قد يصبح مكلفًا مع التوسع"},{"name":"Make","bestFor":"سيناريوهات مرئية أقوى من Zapier","caution":"ما زال no-code بتكلفة متزايدة"},{"name":"n8n","bestFor":"Open-source وخصوصية وتحكم أكبر","caution":"يحتاج فهمًا تقنيًا أكثر"}]'::jsonb, 'اختر Zapier للسرعة المطلقة، Make للوضوح المرئي، وn8n عندما تريد مرونة أعلى وكلفة أذكى على المدى المتوسط.', now()),
  ('power-automate-vs-make', 'automation', 'comparison', 'published', false, 10, 'Power Automate vs Make', 'بيئات Microsoft مقابل SaaS متنوعة', '[{"name":"Power Automate","bestFor":"الشركات التي تعيش داخل Microsoft 365","caution":"أثقل على المشاريع الصغيرة"},{"name":"Make","bestFor":"المشاريع الأسرع والفرق متعددة الأدوات","caution":"أقل مؤسسية في بعض الحالات"}]'::jsonb, 'إذا كانت الموافقات والملفات والبريد كلها في Microsoft فابدأ بـ Power Automate، وإلا فغالبًا Make أسرع تنفيذًا.', now()),
  ('sheets-vs-airtable-vs-supabase', 'automation', 'comparison', 'published', false, 20, 'Sheets vs Airtable vs Supabase', 'أين تحتفظ ببيانات الـ workflow؟', '[{"name":"Google Sheets","bestFor":"البدايات السريعة والتقارير الخفيفة","caution":"ليس قاعدة بيانات حقيقية"},{"name":"Airtable","bestFor":"قاعدة مرئية أكثر تنظيمًا للفرق","caution":"تكلفة وقيود حسب الخطة"},{"name":"Supabase","bestFor":"منتج يحتاج بيانات مشتركة ونموًا مستقبليًا","caution":"يحتاج طبقة تقنية أوضح"}]'::jsonb, 'ابدأ بـ Sheets إذا كانت الحاجة بسيطة، ارتقِ إلى Airtable حين تحتاج structure مرئي، واختر Supabase عندما يصبح المنتج نفسه جزءًا من الحل.', now()),
  ('whatsapp-vs-email', 'automation', 'comparison', 'published', false, 30, 'WhatsApp vs Email في الأتمتة', 'اختيار القناة المناسبة', '[{"name":"WhatsApp","bestFor":"التذكير السريع والمتابعة الفورية","caution":"قيود API وموافقات القوالب"},{"name":"Email","bestFor":"التوثيق والمحتوى الأطول والمرفقات","caution":"أبطأ في الفتح أحيانًا"}]'::jsonb, 'استخدم WhatsApp للسرعة والـ reminders، وEmail عندما تحتاج سجلًا أو محتوى مفصلًا أو مرفقات.', now());
