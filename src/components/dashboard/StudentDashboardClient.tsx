"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp, BookOpen, Save, Award, Brain, Activity,
  Bookmark, Sparkles, LogOut, Settings, Star, Clock, ChevronRight, ChevronLeft, Flame, Trophy, Grid3X3,
} from "lucide-react";
import { availablePortals, comingSoonPortals } from "@/config/portals";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { UserProfile } from "@/lib/auth/roles";
import MySpacePanel from "@/components/features/MySpacePanel";
import SavedPromptsPanel from "@/components/features/SavedPromptsPanel";
import AICoachCard from "@/components/dashboard/AICoachCard";

interface CourseProgressRow {
  course_slug: string;
  status: string;
  progress_percent: number;
  last_opened_at: string | null;
}

interface QuizResult {
  course_slug: string;
  percentage: number;
  created_at: string;
}

interface SavedPromptRow {
  id: string;
  title: string;
  created_at: string;
}

interface LanguageResult {
  id: string;
  score: number;
  level: string;
  stages_completed: number;
  created_at: string;
}

interface ExamResult {
  id: string;
  subject: string;
  subject_label: string;
  percentage: number;
  passed: boolean;
  created_at: string;
}

interface Props {
  locale: string;
}

function calcStreak(timestamps: string[]): number {
  if (!timestamps.length) return 0;
  const toDay = (ts: string) => ts.slice(0, 10); // "YYYY-MM-DD"
  const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  // Streak must include today or yesterday (otherwise it's broken)
  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diffDays = Math.round((prev.getTime() - curr.getTime()) / 864e5);
    if (diffDays === 1) { streak++; } else { break; }
  }
  return streak;
}

function StatCard({ icon, value, labelAr, labelEn, color, isAr, pulse }: {
  icon: React.ReactNode; value: string | number; labelAr: string; labelEn: string; color: string; isAr: boolean; pulse?: boolean;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-5 flex items-center gap-4"
      style={{ border: `1px solid ${color}20`, position: "relative", overflow: "hidden" }}
    >
      {pulse && (
        <span className="absolute top-2 end-2 w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
      )}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-2xl font-mono" style={{ color: "var(--color-on-surface)" }}>{value}</p>
        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? labelAr : labelEn}</p>
      </div>
    </div>
  );
}

export default function StudentDashboardClient({ locale }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { user, profile, loading, isAuthenticated, supabaseConfigured } = useAuth();

  const [courseProgress, setCourseProgress] = useState<CourseProgressRow[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [savedPromptsDb, setSavedPromptsDb] = useState<SavedPromptRow[]>([]);
  const [streak, setStreak] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [languageResult, setLanguageResult] = useState<LanguageResult | null>(null);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    if (!user || !supabaseConfigured) return;

    async function fetchData() {
      setDataLoading(true);
      const supabase = createClient();
      if (!supabase || !user) { setDataLoading(false); return; }

      const [cpRes, qrRes, spRes, lpRes, lrRes, erRes] = await Promise.all([
        supabase.from("course_progress").select("course_slug,status,progress_percent,last_opened_at").eq("user_id", user.id).order("last_opened_at", { ascending: false }).limit(5),
        supabase.from("quiz_results").select("course_slug,percentage,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("saved_prompts").select("id,title,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("lesson_progress").select("completed_at").eq("user_id", user.id).eq("completed", true).not("completed_at", "is", null),
        supabase.from("language_results").select("id,score,level,stages_completed,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1),
        supabase.from("digital_exam_results").select("id,subject,subject_label,percentage,passed,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(7),
      ]);

      setCourseProgress(cpRes.data ?? []);
      setQuizResults(qrRes.data ?? []);
      setSavedPromptsDb(spRes.data ?? []);
      setStreak(calcStreak(lpRes.data?.map((r: { completed_at: string }) => r.completed_at) ?? []));
      setLanguageResult((lrRes.data ?? [])[0] ?? null);
      setExamResults(erRes.data ?? []);
      setDataLoading(false);
    }

    fetchData();
  }, [user, supabaseConfigured]);

  async function handleSignOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  }

  // ── Not configured → show local-mode dashboard (no scary Supabase warning) ─
  if (!supabaseConfigured) {
    return (
      <div className="container-xl py-12 flex flex-col gap-10">
        <LocalModeHeader isAr={isAr} locale={locale} />
        <LocalQuickActions isAr={isAr} locale={locale} />
        <MySpacePanel locale={locale} />
        <SavedPromptsPanel locale={locale} />
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  // ── Not authenticated ─────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="container-xl py-16 flex flex-col gap-12">
        <LoginGate isAr={isAr} locale={locale} />
        <MySpacePanel locale={locale} />
        <SavedPromptsPanel locale={locale} />
      </div>
    );
  }

  // ── Authenticated dashboard ──────────────────────────────────────────────
  const startedCount = courseProgress.filter((c) => c.status === "started").length;
  const completedCount = courseProgress.filter((c) => c.status === "completed").length;
  const avgQuiz = quizResults.length
    ? Math.round(quizResults.reduce((s, q) => s + q.percentage, 0) / quizResults.length)
    : 0;

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Welcome card */}
      <div
        className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.18) 0%, rgba(87,27,193,0.12) 100%)",
          border: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "220px", height: "220px" }} />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>
              {isAr ? "لوحة درهوس الموحدة 🌐" : "Darhous Unified Dashboard 🌐"}
            </p>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: "var(--color-on-surface)" }}>
              {(profile as UserProfile)?.full_name ?? user?.email?.split("@")[0] ?? (isAr ? "المتعلم" : "Learner")}
            </h1>
            <p className="text-sm mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "تابع رحلتك عبر بوابات منصة درهوس" : "Track your journey across all Darhous portals"}
            </p>
            {streak > 0 && (
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316" }}
              >
                <Flame size={12} />
                {streak} {isAr ? (streak === 1 ? "يوم متواصل" : "أيام متواصلة") : (streak === 1 ? "day streak" : "day streak")}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/mentor`}
              className="glow-button-primary text-white font-mono px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm"
            >
              <Sparkles size={15} />
              {isAr ? "اسأل المرشد" : "Ask Mentor"}
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-xl transition-opacity hover:opacity-70"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
              title={isAr ? "تسجيل خروج" : "Sign out"}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={<Flame size={22} />} value={`${streak} ${streak === 1 ? (isAr ? "يوم" : "day") : (isAr ? "أيام" : "days")}`} labelAr="سلسلة التعلم 🔥" labelEn="Learning streak 🔥" color="#f97316" isAr={isAr} pulse={streak > 0} />
        <StatCard icon={<BookOpen size={22} />} value={startedCount} labelAr="دورات جارية" labelEn="Courses started" color="var(--color-primary)" isAr={isAr} />
        <StatCard icon={<Award size={22} />} value={completedCount} labelAr="دورات مكتملة" labelEn="Courses completed" color="#4ade80" isAr={isAr} />
        <StatCard icon={<TrendingUp size={22} />} value={`${avgQuiz}%`} labelAr="متوسط الاختبارات" labelEn="Avg quiz score" color="var(--color-secondary)" isAr={isAr} />
        <StatCard icon={<Save size={22} />} value={savedPromptsDb.length} labelAr="برومبت محفوظ" labelEn="Saved prompts" color="var(--color-tertiary)" isAr={isAr} />
      </div>

      {/* My Portals — Ecosystem section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Grid3X3 size={18} style={{ color: "var(--color-secondary)" }} />
            {isAr ? "بواباتي" : "My Portals"}
          </h2>
          <Link href={`/${locale}`} className="flex items-center gap-1 text-sm" style={{ color: "var(--color-secondary)" }}>
            {isAr ? "جميع البوابات" : "All Portals"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Available portals with real progress */}
          {availablePortals.map((portal) => {
            let statusLabel = isAr ? "متاح" : "Available";
            let progressPct = 0;

            if (portal.id === "ai-academy") {
              progressPct = completedCount > 0 ? Math.min(completedCount * 6, 100) : 0;
              statusLabel = `${completedCount} ${isAr ? "دورة" : "courses"}`;
            } else if (portal.id === "language") {
              if (languageResult) {
                statusLabel = languageResult.level;
                progressPct = languageResult.score;
              }
            } else if (portal.id === "digital-exams") {
              if (examResults.length > 0) {
                const lastExam = examResults[0];
                statusLabel = `${Math.round(lastExam.percentage)}%`;
                progressPct = lastExam.percentage;
              }
            }

            return (
              <Link
                key={portal.id}
                href={`/${locale}${portal.href}`}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                style={{ border: `1px solid ${portal.color}15`, textDecoration: "none" }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${portal.color}12`, border: `1px solid ${portal.color}20` }}
                >
                  {portal.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? portal.titleAr : portal.titleEn}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: portal.color }} />
                    </div>
                    <span className="text-[10px] font-mono flex-shrink-0" style={{ color: portal.color }}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#4ade80" }} />
              </Link>
            );
          })}
          {/* Coming soon portals — compact placeholders */}
          {comingSoonPortals.slice(0, 3).map((portal) => (
            <Link
              key={portal.id}
              href={`/${locale}${portal.href}`}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 opacity-55 transition-all hover:opacity-70"
              style={{ border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {portal.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portal.titleAr : portal.titleEn}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "قريبًا" : "Coming Soon"}
                </p>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full" style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8" }}>
                {isAr ? "قريبًا" : "Soon"}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Course progress */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "تقدّمك في الدورات" : "Your Course Progress"}
          </h2>
          <Link href={`/${locale}/courses`} className="flex items-center gap-1 text-sm" style={{ color: "var(--color-primary)" }}>
            {isAr ? "استعرض الدورات" : "Browse courses"} <Arrow size={14} />
          </Link>
        </div>

        {dataLoading ? (
          <LoadingSkeleton />
        ) : courseProgress.length === 0 ? (
          <EmptyState
            icon="📚"
            titleAr="لم تبدأ أي دورة بعد"
            titleEn="No courses started yet"
            descAr="ابدأ من مسارات التعلم وطوّر مهاراتك."
            descEn="Start with learning paths and build your skills."
            linkHref={`/${locale}/paths`}
            linkLabelAr="استعرض المسارات"
            linkLabelEn="Browse paths"
            isAr={isAr}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {courseProgress.map((cp) => (
              <div key={cp.course_slug} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--color-on-surface)" }}>{cp.course_slug}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${cp.progress_percent}%`, background: "var(--color-primary)" }}
                      />
                    </div>
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                      {cp.progress_percent}%
                    </span>
                  </div>
                </div>
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: cp.status === "completed" ? "rgba(74,222,128,0.12)" : "rgba(142,213,255,0.10)",
                    color: cp.status === "completed" ? "#4ade80" : "var(--color-primary)",
                  }}
                >
                  {cp.status === "completed"
                    ? (isAr ? "مكتمل" : "Completed")
                    : (isAr ? "جارٍ" : "In progress")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz results */}
      {quizResults.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "نتائج الاختبارات" : "Quiz Results"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quizResults.map((qr, i) => (
              <div key={i} className="glass-card rounded-2xl p-4">
                <p className="text-xs font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>{qr.course_slug}</p>
                <p className="font-bold text-2xl" style={{ color: qr.percentage >= 80 ? "#4ade80" : qr.percentage >= 60 ? "#f59e0b" : "#ef4444" }}>
                  {qr.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved DB prompts */}
      {savedPromptsDb.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "البرومبتات المحفوظة" : "Saved Prompts"}
          </h2>
          <div className="flex flex-col gap-2">
            {savedPromptsDb.map((sp) => (
              <div key={sp.id} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                <Bookmark size={14} style={{ color: "var(--color-secondary)", flexShrink: 0 }} />
                <p className="text-sm flex-1 truncate" style={{ color: "var(--color-on-surface)" }}>{sp.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Coach Card */}
      <AICoachCard locale={locale} streak={streak} />

      {/* Quick actions */}
      <div>
        <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "وصول سريع" : "Quick Access"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { icon: <Sparkles size={20} />, href: "/mentor",               labelAr: "مرشد AI",            labelEn: "AI Mentor",        color: "var(--color-primary)"   },
            { icon: <Activity size={20} />, href: "/nano-banana-prompts", labelAr: "Nano Banana",         labelEn: "Nano Banana",      color: "#f59e0b"                },
            { icon: <Star    size={20} />,  href: "/prompt-score",        labelAr: "تقييم البرومبت",      labelEn: "Prompt Score",     color: "var(--color-secondary)" },
            { icon: <Award   size={20} />,  href: "/certificates",        labelAr: "شهاداتي",            labelEn: "Certificates",     color: "#fbbf24"                },
            { icon: <Brain   size={20} />,  href: "/learning-plans",      labelAr: "خطط التعلم",         labelEn: "Learning Plans",   color: "#a78bfa"                },
            { icon: <Trophy  size={20} />,  href: "/challenges",          labelAr: "التحديات",            labelEn: "Challenges",       color: "#ef4444"                },
            { icon: <TrendingUp size={20}/>, href: "/leaderboard",        labelAr: "المتصدرون",           labelEn: "Leaderboard",      color: "#4ade80"                },
            { icon: <Settings size={20} />, href: "/profile",             labelAr: "الملف الشخصي",       labelEn: "Profile",          color: "var(--color-tertiary)"  },
          ].map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-105 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? item.labelAr : item.labelEn}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* localStorage panels */}
      <MySpacePanel locale={locale} />
      <SavedPromptsPanel locale={locale} />
    </div>
  );
}

function LoginGate({ isAr, locale }: { isAr: boolean; locale: string }) {
  return (
    <div
      className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,102,138,0.15) 0%, rgba(87,27,193,0.12) 100%)",
        border: "1px solid rgba(142,213,255,0.1)",
      }}
    >
      <div className="text-5xl mb-5">🎓</div>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "لوحة الطالب" : "Student Dashboard"}
      </h1>
      <p className="text-base max-w-md mx-auto mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "سجّل دخولك لتتبع تقدمك، وحفظ برومبتاتك، والوصول إلى مواد التعلم."
          : "Sign in to track your progress, save prompts, and access your learning materials."}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
        <Link href={`/${locale}/register`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl text-sm">
          {isAr ? "إنشاء حساب مجاني" : "Create Free Account"}
        </Link>
      </div>
    </div>
  );
}

function LocalModeHeader({ isAr, locale }: { isAr: boolean; locale: string }) {
  return (
    <div
      className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,102,138,0.18) 0%, rgba(87,27,193,0.12) 100%)",
        border: "1px solid rgba(142,213,255,0.12)",
      }}
    >
      <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "220px", height: "220px" }} />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>
            {isAr ? "مرحبًا 👋" : "Hello there 👋"}
          </p>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لوحة الطالب" : "Student Dashboard"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تصفح موادك المحفوظة وأدوات الذكاء الاصطناعي"
              : "Browse your saved items and AI tools"}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/${locale}/login`}
            className="glow-button-primary text-white font-mono px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm"
          >
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
          <Link
            href={`/${locale}/register`}
            className="glow-button-secondary font-mono px-5 py-2.5 rounded-xl text-sm"
          >
            {isAr ? "إنشاء حساب" : "Register"}
          </Link>
        </div>
      </div>
      {/* Sync nudge */}
      <div className="relative z-10 mt-5 flex items-center gap-2">
        <div
          className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full"
          style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.15)", color: "var(--color-primary)" }}
        >
          <Clock size={12} />
          {isAr
            ? "أنشئ حسابًا لمزامنة تقدمك عبر أجهزتك"
            : "Create an account to sync your progress across devices"}
        </div>
      </div>
    </div>
  );
}

function LocalQuickActions({ isAr, locale }: { isAr: boolean; locale: string }) {
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "وصول سريع" : "Quick Access"}
        </h2>
        <Link href={`/${locale}/courses`} className="flex items-center gap-1 text-sm" style={{ color: "var(--color-primary)" }}>
          {isAr ? "استعرض الدورات" : "Browse courses"} <Arrow size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <BookOpen size={20} />, href: "/courses",               labelAr: "الدورات",              labelEn: "Courses",        color: "var(--color-primary)"   },
          { icon: <Sparkles size={20} />, href: "/mentor",                labelAr: "مرشد AI",              labelEn: "AI Mentor",      color: "var(--color-secondary)" },
          { icon: <Activity size={20} />, href: "/nano-banana-prompts",   labelAr: "Nano Banana",          labelEn: "Nano Banana",    color: "#f59e0b"                },
          { icon: <Brain   size={20} />,  href: "/paths",                 labelAr: "مسارات التعلم",        labelEn: "Learning Paths", color: "var(--color-tertiary)"  },
        ].map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-105 hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
              {item.icon}
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? item.labelAr : item.labelEn}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ icon, titleAr, titleEn, descAr, descEn, linkHref, linkLabelAr, linkLabelEn, isAr }: {
  icon: string; titleAr: string; titleEn: string; descAr: string; descEn: string;
  linkHref: string; linkLabelAr: string; linkLabelEn: string; isAr: boolean;
}) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <p className="font-semibold mb-1" style={{ color: "var(--color-on-surface)" }}>{isAr ? titleAr : titleEn}</p>
      <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? descAr : descEn}</p>
      <Link href={linkHref} className="glow-button-secondary text-sm font-mono px-5 py-2 rounded-xl">
        {isAr ? linkLabelAr : linkLabelEn}
      </Link>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-2xl h-16 animate-pulse" style={{ background: "var(--color-surface-container)" }} />
      ))}
    </div>
  );
}
