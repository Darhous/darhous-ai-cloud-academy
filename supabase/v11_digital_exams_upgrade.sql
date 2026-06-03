-- ── v11 — Digital Exams v2.0 upgrade ──────────────────────────────────────
-- Run in: Supabase Dashboard → SQL Editor
-- Date: 2026-06-03

-- 1. Add flags_count + auto_terminated + certificate_id to digital_exam_results
ALTER TABLE digital_exam_results
  ADD COLUMN IF NOT EXISTS flags_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS auto_terminated BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS certificate_id TEXT;

-- 2. Create exam_library_items table
CREATE TABLE IF NOT EXISTS exam_library_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_kb INT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on exam_library_items
ALTER TABLE exam_library_items ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "exam_library_public_read" ON exam_library_items
  FOR SELECT USING (true);

-- Admin-only write
CREATE POLICY "exam_library_admin_insert" ON exam_library_items
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "exam_library_admin_delete" ON exam_library_items
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- 3. Create exam-library storage bucket (run separately in Supabase Storage UI)
-- Bucket name: exam-library
-- Public: true

-- ── DONE ────────────────────────────────────────────────────────────────────
