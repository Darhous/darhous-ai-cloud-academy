-- ============================================================
-- Darhous — v16.0 Admin-Issued Certificates
-- Run this in the Supabase SQL editor (after schema.sql).
-- Safe to re-run: CREATE TABLE IF NOT EXISTS + CREATE POLICY IF NOT EXISTS.
--
-- Purpose: lets an admin manually issue a verifiable certificate for ANY
-- portal with a hand-typed holder name + custom values. Unlike the
-- `certificates` table (which is keyed to a registered user_id + course),
-- this table stores the holder name directly so the QR verify page can
-- display exactly what the admin typed.
-- ============================================================

create table if not exists public.admin_certificates (
  id                uuid primary key default gen_random_uuid(),
  certificate_code  text unique not null
                    default upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
  portal            text not null,
  holder_name       text not null,
  cert_type_label   text,
  body_line2        text,
  box1_label        text,
  box1_value        text,
  box2_label        text,
  box2_value        text,
  issued_by         uuid references public.profiles(id) on delete set null,
  issued_at         timestamptz not null default now(),
  metadata          jsonb,
  created_at        timestamptz not null default now()
);

alter table public.admin_certificates enable row level security;

-- Admin can do everything (insert / read / delete) — service role bypasses RLS
-- anyway, but this also allows the admin client session direct access.
create policy "Admin manages issued certificates" on public.admin_certificates
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Public read by code for the verification page (no auth required).
create policy "Public verify issued certificate" on public.admin_certificates
  for select using (true);

create index if not exists admin_certificates_code_idx
  on public.admin_certificates (certificate_code);
