# Language Legacy Integration Map

Source: `.legacy/darhous-assessment` (React + Vite frontend, FastAPI + Python backend)
Target: Academy Next.js 16 — `src/components/language/` + `src/app/[locale]/language/` + `src/app/api/language/`

---

## 1. Question Bank
- **Source**: `.legacy/darhous-assessment/backend/data/questions.json`
- **Status**: ✅ IDENTICAL — 150 questions, 15 per stage, same text/options/answers
- **Action**: No migration needed — academy already has the same bank

## 2. Scoring / CEFR Logic
- **Source**: `backend/services/scoring.py`
- **Status**: ⚠️ PARTIALLY PORTED — weighted scoring matches, but CEFR thresholds differ
- **CEFR fix needed**:
  - Legacy: C1A≥81, B2B≥71, B2A≥61, B1B≥51, B1A≥41, A2B≥31, A2A≥21, A1B≥11
  - Academy: C1A≥85, B2B≥79, B2A≥73, B1B≥67, B1A≥61, A2B≥55, A2A≥49, A1B≥43
- **Adaptive difficulty fix needed**:
  - Legacy: score < 40% → go DOWN in difficulty (easy←medium, easy←hard→medium)
  - Academy: score < 40% → STOP (wrong)
  - Legacy threshold: 70% to go up; Academy wrongly uses 75%

## 3. Stages and Exam Flow
- **Source**: `backend/routers/exam.py`, `frontend/src/context/ExamContext.jsx`
- **Status**: ✅ 10 stages, 10q per stage, adaptive — mostly correct
- **Fix needed**: Remove early-stop at < 40% — legacy always does all 10 stages

## 4. Anti-Cheat
- **Source**: `backend/services/anti_cheat.py`, `frontend/src/components/AntiCheat.jsx`
- **Status**: ⚠️ PARTIAL — visibilitychange + tab count done; missing:
  - Warning overlay UI on each tab switch
  - `flags_count` stored in `language_results` DB (need additive migration)
  - Copy/paste/right-click prevention (add to exam page)

## 5. AI Feedback (rule-based)
- **Source**: `backend/services/ai_feedback.py` — fully rule-based, no AI API
- **Status**: ❌ NOT PORTED — academy has only basic improvement tips
- **Needs**:
  - Strengths (3 categories, score thresholds)
  - Weaknesses (per-skill < 50%, < 70%)
  - Advice (LEVEL_ADVICE — per-level 5-item list)
  - Weekly study plan (WEEKLY_PLANS — per-level 3-day plan)
  - Encouragement (score-based message)
  - Skill analysis (excellent/good/developing/needs_work per skill)
  - Next milestone / next level
- **Port as**: TypeScript data + pure function — no API call needed

## 6. Career / Job Recommendations
- **Source**: `backend/routers/jobs.py` — uses Gemini/Claude API
- **Status**: ❌ NOT PORTED
- **Port as**: `/api/language/jobs` route using academy Gemini API (gemini-2.5-flash)
- **Also**: Static fallback `LEVEL_JOB_MAP` as per legacy

## 7. Radar Chart
- **Source**: `frontend/src/pages/Results.jsx` — recharts RadarChart
- **Status**: ❌ NOT PORTED
- **Depends on**: Install `recharts`

## 8. Wrong Answers Review
- **Source**: `frontend/src/pages/Results.jsx` (state.wrongAnswers)
- **Status**: ❌ NOT STORED — academy does not pass wrong answer data to results
- **Fix**: Store wrongAnswers array in `language_results.breakdown` JSONB field
- **Show**: Collapsible section on results page

## 9. Result Email
- **Source**: `backend/services/email_service.py`
- **Status**: ❌ NOT IMPLEMENTED
- **Port as**: `/api/language/email-result` using Resend (already configured in academy)
- **Trigger**: After successful submit, fire-and-forget from results page or submit route

## 10. PDF Certificate
- **Source**: `backend/services/certificate_service.py` — uses reportlab (Python)
- **Status**: ❌ NOT IMPLEMENTED
- **Port as**: `/api/certificates/language/[id]` using `@react-pdf/renderer` (Vercel-compatible)
- **Adds**: `certificate_id` column to `language_results`

## 11. Certificate Verification
- **Source**: `frontend/src/pages/Verify.jsx`, `backend/routers/certificates.py`
- **Status**: ❌ NOT IMPLEMENTED
- **Port as**: `/[locale]/language/verify/[certId]` page fetching from Supabase

## 12. Admin Features
- **Source**: `backend/routers/admin.py`
- **Status**: ❌ NOT IN ACADEMY ADMIN
- **Port as**: New "Language" tab in AdminDashboardClient.tsx
- **Features**: Analytics, results table, flags log, CSV export, resend email

## 13. Leaderboard
- **Source**: `backend/results.py` `/leaderboard`
- **Status**: ❌ NOT IMPLEMENTED
- **Scope**: Phase H — add to Admin Dashboard and optionally Hub

---

## What is REUSED (no change)
- Question bank (identical)
- Weighted scoring formula
- Difficulty weight values (easy=5, medium=10, hard=18)
- Stage count (10), questions per stage (10)
- Skill stage mapping (grammar=[2,3,6,9], vocab=[1,4,10], reading=[5,7,8])
- Timer (90s per question)
- Stage break screen
- Academy auth + Supabase save

## What is ADAPTED (academy architecture)
- CEFR thresholds → fix to match legacy
- Adaptive difficulty → fix downward adjustment
- Rule-based feedback → port as TS function/data
- Certificate → @react-pdf/renderer instead of reportlab
- Email → Resend instead of SMTP
- Admin → academy admin tab instead of separate admin
- Career → Gemini API via academy /api/language/jobs

## What is NOT MIGRATED
- Legacy SQLAlchemy database (replaced by Supabase)
- Legacy JWT auth (replaced by Supabase Auth)
- Legacy user registration flow (replaced by academy auth)
- Legacy session_token system (replaced by Supabase user ID)
- MusicPlayer component (not relevant)
- Phone/WhatsApp registration
- Adaptive "quick test" mode for specific skills (too complex; defer)

---

## Current Academy Gaps (before this integration)
| Feature | Status |
|---------|--------|
| CEFR thresholds correct | ❌ Different |
| Adaptive diff goes down | ❌ Missing |
| Wrong answers stored | ❌ Missing |
| Rule-based feedback | ❌ Missing |
| Radar chart | ❌ Missing |
| Weekly study plan | ❌ Missing |
| Career recommendations | ❌ Missing |
| Anti-cheat warning overlay | ❌ Missing |
| flags_count in DB | ❌ Missing |
| Result email | ❌ Missing |
| PDF certificate | ❌ Missing |
| Certificate verify page | ❌ Missing |
| Admin language tab | ❌ Missing |
| Hub language history | ⚠️ Partial |

---

## Phase Plan

| Phase | Task | Files Changed |
|-------|------|--------------|
| A | Map + CEFR fix + adaptive fix | LanguageAssessmentClient.tsx |
| B | Wrong answers storage + DB migration | LanguageAssessmentClient.tsx, /api/language/submit, supabase migration |
| C | Radar chart + rule-based feedback + weekly plan + wrong answers review | LanguageResultsClient.tsx, new src/data/language-feedback.ts |
| D | Anti-cheat overlay + flags_count | LanguageAssessmentClient.tsx, /api/language/submit, supabase migration |
| E | Result email | /api/language/email-result/route.ts |
| F | PDF certificate + verify page | /api/certificates/language/[id], /[locale]/language/verify/[certId] |
| G | Career recommendations | /api/language/jobs/route.ts, LanguageResultsClient.tsx |
| H | Admin tab + Hub language section | AdminDashboardClient.tsx, StudentDashboardClient.tsx |

---

## Supabase Migrations Required (additive only)

```sql
-- v8.0 language results upgrade
ALTER TABLE language_results
  ADD COLUMN IF NOT EXISTS flags_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wrong_answers JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS feedback JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS certificate_id TEXT;

-- Index for certificate lookup
CREATE INDEX IF NOT EXISTS idx_language_results_certificate_id
  ON language_results (certificate_id)
  WHERE certificate_id IS NOT NULL;
```

File: `supabase/v8_language_upgrade.sql`

---

## Environment Variables Needed
All already set — no new env vars required:
- `GEMINI_API_KEY` — for career recommendations
- `RESEND_API_KEY` — for result emails
- `NEXT_PUBLIC_SITE_URL` — for certificate/verify URLs
- `SUPABASE_SERVICE_ROLE_KEY` — for admin API routes
