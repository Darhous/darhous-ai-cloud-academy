-- ═════════════════════════════════════════════════════════════════
-- v31 — Automation Project Checklists (automation_checklists) — FLAT type
-- Run in: Supabase Dashboard → SQL Editor
-- ═════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS automation_checklists (
  id                      TEXT        PRIMARY KEY,
  portal_id               TEXT        NOT NULL DEFAULT 'automation',
  content_type            TEXT        NOT NULL DEFAULT 'checklist',
  status                  TEXT        NOT NULL DEFAULT 'published'
                                      CHECK (status IN ('published','draft','archived')),
  featured                BOOLEAN     NOT NULL DEFAULT false,
  sort_order              INT         NOT NULL DEFAULT 0,
  title                  TEXT NOT NULL DEFAULT '',
  project_type           TEXT NOT NULL DEFAULT '',
  tools                  TEXT[] NOT NULL DEFAULT '{}',
  sensitivity            TEXT NOT NULL DEFAULT '',
  discovery_checklist    TEXT[] NOT NULL DEFAULT '{}',
  build_checklist        TEXT[] NOT NULL DEFAULT '{}',
  qa_checklist           TEXT[] NOT NULL DEFAULT '{}',
  launch_checklist       TEXT[] NOT NULL DEFAULT '{}',
  maintenance_checklist  TEXT[] NOT NULL DEFAULT '{}',
  created_by              UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_automation_checklists_status ON automation_checklists (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_automation_checklists_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_automation_checklists_updated_at ON automation_checklists;
CREATE TRIGGER trg_automation_checklists_updated_at
  BEFORE UPDATE ON automation_checklists
  FOR EACH ROW EXECUTE FUNCTION update_automation_checklists_updated_at();

-- 3. RLS
ALTER TABLE automation_checklists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_automation_checklists" ON automation_checklists;
CREATE POLICY "public_read_published_automation_checklists"
  ON automation_checklists FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_automation_checklists" ON automation_checklists;
CREATE POLICY "admin_manage_automation_checklists"
  ON automation_checklists FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching existing tables' convention.

-- ═════════════════════════════════════════════════════════════════
-- 4. Seed — the existing static 4 checklist entries, SAME ids,
--    status='published'. Generated programmatically from the real TS source
--    (zero transcription risk). Static array remains as fallback only.
-- ═════════════════════════════════════════════════════════════════
INSERT INTO automation_checklists (id, portal_id, content_type, status, featured, sort_order, title, project_type, tools, sensitivity, discovery_checklist, build_checklist, qa_checklist, launch_checklist, maintenance_checklist, published_at)
VALUES
  ('lead-automation-checklist', 'automation', 'checklist', 'published', false, 0, 'Checklist أتمتة العملاء المحتملين', 'Lead Generation', ARRAY['CRM','Forms','WhatsApp concepts'], 'بيانات عملاء متوسطة الحساسية', ARRAY['من أين تأتي الـ leads؟','من يراجعها الآن؟','ما الـ SLA المطلوب؟'], ARRAY['مطابقة الحقول','منع الـ duplicates','ربط owner assignment'], ARRAY['اختبار lead جديد','اختبار lead ناقص','اختبار duplicate'], ARRAY['تفعيل التنبيهات','مراجعة الرسائل','تحديد المسؤول'], ARRAY['مراجعة conversion شهريًا','تحديث القوالب','تنظيف الحقول'], now()),
  ('finance-approval-checklist', 'automation', 'checklist', 'published', false, 10, 'Checklist موافقات مالية', 'Finance Approval', ARRAY['Power Automate','Email','Sheets'], 'عالية الحساسية', ARRAY['من هم المراجعون؟','ما حدود الصلاحيات؟','ما حالات الرفض؟'], ARRAY['تعريف approval lanes','إضافة escalation','إعداد سجل audit'], ARRAY['اختبار طلب مقبول','اختبار طلب مرفوض','اختبار تأخر الموافقة'], ARRAY['مراجعة الصلاحيات','تأكيد المسارات','توثيق الطوارئ'], ARRAY['مراجعة الصلاحيات ربع سنويًا','فحص زمن الموافقات','مراجعة سجلات الفشل'], now()),
  ('education-ops-checklist', 'automation', 'checklist', 'published', false, 20, 'Checklist تشغيل تعليمي', 'Education Operations', ARRAY['Forms','Sheets','PDF Generator'], 'بيانات طلاب', ARRAY['ما بيانات الطالب المطلوبة؟','أين تتكرر الأخطاء؟','متى تُرسل الشهادة؟'], ARRAY['إعداد registration flow','إعداد attendance','إعداد certificates'], ARRAY['اختبار تسجيل طالب','اختبار حضور','اختبار إنشاء شهادة'], ARRAY['مراجعة القوالب','تحديد مالك التشغيل','إبلاغ فريق القبول'], ARRAY['تحديث المسارات','مراجعة الرسائل','أرشفة الدفعات'], now()),
  ('support-checklist', 'automation', 'checklist', 'published', false, 30, 'Checklist دعم العملاء', 'Customer Support', ARRAY['Slack','Notion','Email'], 'متوسطة', ARRAY['ما القنوات الحالية؟','ما أنواع المشاكل؟','ما الحالات الحرجة؟'], ARRAY['تصنيف التذاكر','routing rules','SLA alerts'], ARRAY['اختبار high priority','اختبار routing','اختبار survey بعد الإغلاق'], ARRAY['إشعار الفريق','توثيق handoff','تفعيل escalation'], ARRAY['مراجعة SLA','تحسين التصنيف','متابعة رضا العميل'], now());
