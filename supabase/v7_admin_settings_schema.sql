-- ============================================================
-- v7.0 Admin Settings Schema
-- Run this in Supabase SQL Editor (once)
-- Creates 3 single-row settings tables for admin persistence
-- ============================================================

-- 1. Admin site settings (landing page content, section visibility, CTAs)
CREATE TABLE IF NOT EXISTS admin_site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settings    JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES profiles(id) ON DELETE SET NULL
);

ALTER TABLE admin_site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_site_settings_admin_all" ON admin_site_settings;
CREATE POLICY "admin_site_settings_admin_all" ON admin_site_settings
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 2. AI Mentor settings (personality, tone, system prompt)
CREATE TABLE IF NOT EXISTS ai_mentor_settings_store (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settings    JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES profiles(id) ON DELETE SET NULL
);

ALTER TABLE ai_mentor_settings_store ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_mentor_settings_admin_write" ON ai_mentor_settings_store;
CREATE POLICY "ai_mentor_settings_admin_write" ON ai_mentor_settings_store
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow any authenticated user to READ mentor settings (used by /api/mentor)
DROP POLICY IF EXISTS "ai_mentor_settings_auth_read" ON ai_mentor_settings_store;
CREATE POLICY "ai_mentor_settings_auth_read" ON ai_mentor_settings_store
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- 3. Feature flags store
CREATE TABLE IF NOT EXISTS feature_flags_store (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flags       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES profiles(id) ON DELETE SET NULL
);

ALTER TABLE feature_flags_store ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "feature_flags_admin_write" ON feature_flags_store;
CREATE POLICY "feature_flags_admin_write" ON feature_flags_store
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Feature flags are public-readable (needed for client-side checks)
DROP POLICY IF EXISTS "feature_flags_public_read" ON feature_flags_store;
CREATE POLICY "feature_flags_public_read" ON feature_flags_store
  FOR SELECT USING (true);
