-- ═════════════════════════════════════════════════════════════════
-- v36 — Automation Use Cases (automation_use_cases) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_use_cases (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'use_case',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  examples               TEXT[] NOT NULL DEFAULT '{}',
  operational_wins       TEXT[] NOT NULL DEFAULT '{}',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_use_cases_status ON automation_use_cases (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_use_cases_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_use_cases_updated_at ON automation_use_cases;
CREATE TRIGGER trg_automation_use_cases_updated_at
  BEFORE UPDATE ON automation_use_cases
  FOR EACH ROW EXECUTE FUNCTION update_automation_use_cases_updated_at();

-- 3. RLS
ALTER TABLE automation_use_cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_use_cases" ON automation_use_cases;
CREATE POLICY "public_read_published_automation_use_cases"
  ON automation_use_cases FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_use_cases" ON automation_use_cases;
CREATE POLICY "admin_manage_automation_use_cases"
  ON automation_use_cases FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 8 use_case entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_use_cases (id, portal_id, content_type, status, featured, sort_order, title, examples, operational_wins, published_at)
VALUES
  ('education', 'automation', 'use_case', 'published', false, 0, 'التعليم', ARRAY['التسجيل','الحضور','الشهادات','إشعارات الطلاب'], ARRAY['تقليل العمل اليدوي','تجربة طالب أوضح','سجل تدريبي أنظف'], now()),
  ('sales', 'automation', 'use_case', 'published', false, 10, 'المبيعات', ARRAY['lead capture','follow-up','pipeline updates','renewal reminders'], ARRAY['سرعة استجابة أعلى','متابعة أفضل','وضوح pipeline'], now()),
  ('marketing', 'automation', 'use_case', 'published', false, 20, 'التسويق', ARRAY['اعتماد المحتوى','النشر','التقارير','campaign intake'], ARRAY['ثبات العمليات','تقليل التأخير','قياس أسرع'], now()),
  ('hr', 'automation', 'use_case', 'published', false, 30, 'الموارد البشرية', ARRAY['التوظيف','onboarding','الحضور','طلبات الموظفين'], ARRAY['أقل تشتت','تحديثات حالة أسرع','توثيق أفضل'], now()),
  ('finance', 'automation', 'use_case', 'published', false, 40, 'المالية', ARRAY['تذكيرات الفواتير','موافقات المصروفات','تقارير شهرية','أرشفة الفواتير'], ARRAY['تقليل الأخطاء','تسريع الموافقات','سجل أوضح'], now()),
  ('support', 'automation', 'use_case', 'published', false, 50, 'خدمة العملاء', ARRAY['ticket routing','escalation','feedback loops','SLA alerts'], ARRAY['خفض زمن الاستجابة','وضوح الملكية','رضا أعلى'], now()),
  ('real-estate', 'automation', 'use_case', 'published', false, 60, 'العقارات', ARRAY['استفسارات المشاريع','تأكيد الزيارات','متابعة leads','توزيع الوسطاء'], ARRAY['سرعة متابعة','تنظيم الزيارات','تقليل ضياع leads'], now()),
  ('clinics', 'automation', 'use_case', 'published', false, 70, 'العيادات', ARRAY['حجوزات','تذكير بالمواعيد','متابعة بعد الزيارة','جداول يومية'], ARRAY['خفض no-show','إدارة يومية أفضل','حمل إداري أقل'], now());
