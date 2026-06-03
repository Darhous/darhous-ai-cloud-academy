"use client";

import { useState, useEffect, useRef, type ChangeEvent } from "react";
import Link from "next/link";
import {
  TrendingUp, BookOpen, Save, Award, Brain, Activity,
  Bookmark, Sparkles, LogOut, Settings, Star, Clock, ChevronRight, ChevronLeft,
  Flame, Trophy, Grid3X3, User, Calendar, Bell, Shield, Download, Share2,
  CheckCircle, Bot, Target, Zap, LayoutDashboard, FileText, Map, Layers,
} from "lucide-react";
import { portals } from "@/config/portals";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { getSaved } from "@/lib/automation/savedRecipes";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { UserProfile } from "@/lib/auth/roles";
import MySpacePanel from "@/components/features/MySpacePanel";
import SavedPromptsPanel from "@/components/features/SavedPromptsPanel";
import AICoachCard from "@/components/dashboard/AICoachCard";

/* ── Data types ──────────────────────────────────────────────── */
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
  certificate_id?: string | null;
  is_incomplete?: boolean;
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

interface Props { locale: string }

type HubTab = "overview" | "portals" | "certificates" | "activity" | "mentor" | "plan" | "settings";

/* ── Helpers ─────────────────────────────────────────────────── */
function calcStreak(timestamps: string[]): number {
  if (!timestamps.length) return 0;
  const toDay = (ts: string) => ts.slice(0, 10);
  const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
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
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4" style={{ border: `1px solid ${color}20`, position: "relative", overflow: "hidden" }}>
      {pulse && <span className="absolute top-2 end-2 w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />}
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

const BEGINNER_WORKFLOWS = curatedWorkflows
  .filter((w) => w.difficulty === "مبتدئ" && w.visible !== false)
  .slice(0, 3);

function AutomationHubSection({ locale, isAr }: { locale: string; isAr: boolean }) {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setSavedCount(getSaved().length);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <Zap size={18} style={{ color: "#4ade80" }} />
          {isAr ? "بوابة الأتمتة" : "Automation Hub"}
        </h2>
        <div className="flex items-center gap-3">
          {savedCount > 0 && (
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
              <Bookmark size={11} className="inline ml-1" />{savedCount} {isAr ? "محفوظة" : "saved"}
            </span>
          )}
        </div>
      </div>

      {/* Recommended beginners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {BEGINNER_WORKFLOWS.map((w) => (
          <Link
            key={w.id}
            href={`/${locale}/automation/templates/${w.id}`}
            className="glass-card rounded-2xl p-4 flex flex-col gap-2 transition-all hover:scale-[1.01] hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(74,222,128,0.1)", textDecoration: "none" }}
          >
            <p className="text-[10px] font-mono" style={{ color: "#4ade80" }}>
              {isAr ? "موصى للمبتدئين" : "Beginner pick"}
            </p>
            <p className="text-sm font-semibold leading-snug" style={{ color: "var(--color-on-surface)" }}>{w.title}</p>
            <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>{w.category}</p>
          </Link>
        ))}
      </div>

      {/* CTA links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${locale}/automation/templates`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <Layers size={14} />
          {isAr ? "مكتبة الوصفات" : "Recipe Library"}
        </Link>
        <Link
          href={`/${locale}/automation/automation-agent`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "rgba(249,115,22,0.08)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <Bot size={14} />
          {isAr ? "وكيل الأتمتة" : "Automation Agent"}
        </Link>
      </div>
    </div>
  );
}

/* ── Digital Exams Hub Section ───────────────────────────────── */
function DigitalExamsHubSection({ locale, isAr }: { locale: string; isAr: boolean }) {
  const [results, setResults] = useState<{ subject: string; subject_label: string; percentage: number; passed: boolean }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/exams/results?limit=10")
      .then((r) => r.json())
      .then(({ results: data }) => setResults(data ?? []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const passed = results.filter((r) => r.passed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <span style={{ fontSize: "18px" }}>💻</span>
          {isAr ? "الاختبارات الرقمية" : "Digital Exams"}
        </h2>
        {passed > 0 && (
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
            <Trophy size={11} className="inline ml-1" />{passed} {isAr ? "اجتياز" : "passed"}
          </span>
        )}
      </div>

      {loaded && results.length > 0 ? (
        <div className="flex flex-col gap-2 mb-4">
          {results.slice(0, 4).map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="flex-1 text-sm truncate" style={{ color: "var(--color-on-surface)" }}>{r.subject_label || r.subject}</span>
              <span className="font-mono text-sm font-bold" style={{ color: r.passed ? "#4ade80" : "#ef4444" }}>{Math.round(r.percentage)}%</span>
              <span className="text-[10px]" style={{ color: r.passed ? "#4ade80" : "#f59e0b" }}>{r.passed ? (isAr ? "✅ ناجح" : "✅ Pass") : (isAr ? "↺ أعد" : "↺ Retry")}</span>
            </div>
          ))}
        </div>
      ) : loaded ? (
        <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "لم تُجرِ اختبارات بعد — ابدأ الآن!" : "No exams yet — start now!"}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${locale}/digital-exams`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(60,224,251,0.08)", color: "#3ce0fb", border: "1px solid rgba(60,224,251,0.2)" }}
        >
          💻 {isAr ? "اختبارات المواد" : "Subject Exams"}
        </Link>
        <Link
          href={`/${locale}/digital-exams/mixed`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          🏆 {isAr ? "الامتحان المجمع" : "Mixed Exam"}
        </Link>
        <Link
          href={`/${locale}/digital-exams/history`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.2)" }}
        >
          📊 {isAr ? "سجل أدائي" : "My History"}
        </Link>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════════ */
export default function StudentDashboardClient({ locale }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { user, profile, loading, isAuthenticated, supabaseConfigured } = useAuth();
  const [activeTab, setActiveTab] = useState<HubTab>("overview");

  const [courseProgress, setCourseProgress] = useState<CourseProgressRow[]>([]);
  const [quizResults, setQuizResults]       = useState<QuizResult[]>([]);
  const [savedPromptsDb, setSavedPromptsDb] = useState<SavedPromptRow[]>([]);
  const [streak, setStreak]                 = useState(0);
  const [dataLoading, setDataLoading]       = useState(false);
  const [languageResult, setLanguageResult] = useState<LanguageResult | null>(null);
  const [languageHistory, setLanguageHistory] = useState<LanguageResult[]>([]);
  const [examResults, setExamResults]       = useState<ExamResult[]>([]);
  const [avatarUrl, setAvatarUrl]           = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

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
        supabase.from("language_results").select("id,score,level,stages_completed,certificate_id,is_incomplete,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("digital_exam_results").select("id,subject,subject_label,percentage,passed,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(7),
      ]);
      setCourseProgress(cpRes.data ?? []);
      setQuizResults(qrRes.data ?? []);
      setSavedPromptsDb(spRes.data ?? []);
      setStreak(calcStreak(lpRes.data?.map((r: { completed_at: string }) => r.completed_at) ?? []));
      const lr = lrRes.data ?? [];
      setLanguageResult(lr[0] ?? null);
      setLanguageHistory(lr);
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

  /* Fetch avatar_url from profile on mount */
  useEffect(() => {
    if (!user || !supabaseConfigured) return;
    const supabase = createClient();
    if (!supabase) return;
    supabase.from("profiles").select("avatar_url").eq("id", user.id).single()
      .then(({ data }) => { if (data?.avatar_url) setAvatarUrl(data.avatar_url); });
  }, [user, supabaseConfigured]);

  async function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    const form = new FormData();
    form.append("avatar", file);
    try {
      const res = await fetch("/api/avatar/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
    } catch { /* silent */ }
    setAvatarUploading(false);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  }

  function shareToLinkedIn(certTitle: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";
    const url = `${siteUrl}/${locale}/certificates`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(certTitle)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  }

  /* ── Not configured ─ */
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container-xl py-16 flex flex-col gap-12">
        <LoginGate isAr={isAr} locale={locale} />
        <MySpacePanel locale={locale} />
        <SavedPromptsPanel locale={locale} />
      </div>
    );
  }

  /* ── Computed values ─ */
  const startedCount   = courseProgress.filter((c) => c.status === "started").length;
  const completedCount = courseProgress.filter((c) => c.status === "completed").length;
  const avgQuiz = quizResults.length
    ? Math.round(quizResults.reduce((s, q) => s + q.percentage, 0) / quizResults.length)
    : 0;

  const displayName = (profile as UserProfile)?.full_name ?? user?.email?.split("@")[0] ?? (isAr ? "المتعلم" : "Learner");
  const displayEmail = (profile as UserProfile & { email?: string })?.email ?? user?.email ?? "";

  /* ── Tab config ─ */
  const tabs: { id: HubTab; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: "overview",      labelAr: "النظرة العامة", labelEn: "Overview",       icon: <LayoutDashboard size={16} /> },
    { id: "portals",       labelAr: "بواباتي",       labelEn: "My Portals",     icon: <Grid3X3 size={16} /> },
    { id: "certificates",  labelAr: "شهاداتي",       labelEn: "Certificates",   icon: <Award size={16} /> },
    { id: "activity",      labelAr: "نشاطي",          labelEn: "Activity",       icon: <Activity size={16} /> },
    { id: "mentor",        labelAr: "مرشدي الذكي",   labelEn: "AI Mentor",      icon: <Bot size={16} /> },
    { id: "plan",          labelAr: "خطة التعلم",    labelEn: "Learning Plan",  icon: <Map size={16} /> },
    { id: "settings",      labelAr: "الإعدادات",     labelEn: "Settings",       icon: <Settings size={16} /> },
  ];

  /* ── Portal progress data ─ */
  const realPortals = portals.filter((p) => p.id !== "coming-soon");

  function getPortalProgress(portalId: string): { pct: number; label: string } {
    if (portalId === "ai-academy") {
      const pct = completedCount > 0 ? Math.min(completedCount * 6, 100) : 0;
      return { pct, label: `${completedCount} ${isAr ? "دورة" : "courses"}` };
    }
    if (portalId === "language" && languageResult) {
      return { pct: languageResult.score, label: languageResult.level };
    }
    if (portalId === "digital-exams" && examResults.length > 0) {
      const last = examResults[0];
      return { pct: last.percentage, label: `${Math.round(last.percentage)}%` };
    }
    return { pct: 0, label: isAr ? "لم تبدأ" : "Not started" };
  }

  return (
    <div className="container-xl py-8 flex flex-col gap-8">

      {/* ══ PROFILE CARD ══════════════════════════════════════ */}
      <div
        className="rounded-3xl p-7 md:p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.18) 0%, rgba(87,27,193,0.12) 100%)",
          border: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "220px", height: "220px" }} />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar — clickable to upload */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => avatarInputRef.current?.click()}
                disabled={avatarUploading}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold overflow-hidden cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #8ed5ff, #d0bcff)", color: "#0c0e12" }}
                title={isAr ? "اضغط لتغيير الصورة" : "Click to change avatar"}
              >
                {avatarUploading ? (
                  <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: "#0c0e12", borderTopColor: "transparent" }} />
                ) : avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </button>
              <input ref={avatarInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarUpload} />
              <div
                className="absolute -bottom-1 -end-1 w-6 h-6 rounded-lg flex items-center justify-center pointer-events-none"
                style={{ background: "var(--color-surface-container)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <User size={12} style={{ color: "var(--color-on-surface-variant)" }} />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono mb-0.5" style={{ color: "var(--color-primary)" }}>
                {isAr ? "My Darhous Hub 🌐" : "My Darhous Hub 🌐"}
              </p>
              <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--color-on-surface)" }}>
                {displayName}
              </h1>
              <p className="text-xs font-mono mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {displayEmail}
              </p>
              {streak > 0 && (
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full mt-2"
                  style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316" }}
                >
                  <Flame size={12} />
                  {streak} {isAr ? "أيام متواصلة 🔥" : "day streak 🔥"}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/mentor`} className="glow-button-primary text-white font-mono px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm">
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

        {/* Quick stats row */}
        <div className="relative z-10 grid grid-cols-3 md:grid-cols-6 gap-3 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { v: streak, lAr: "أيام متواصلة", lEn: "Streak", c: "#f97316" },
            { v: startedCount, lAr: "دورات جارية", lEn: "In progress", c: "var(--color-primary)" },
            { v: completedCount, lAr: "مكتملة", lEn: "Completed", c: "#4ade80" },
            { v: `${avgQuiz}%`, lAr: "متوسط الاختبارات", lEn: "Avg quiz", c: "var(--color-secondary)" },
            { v: savedPromptsDb.length, lAr: "برومبت محفوظ", lEn: "Saved prompts", c: "var(--color-tertiary)" },
            { v: examResults.length, lAr: "اختبار رقمي", lEn: "Exams done", c: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-bold text-xl font-mono" style={{ color: s.c }}>{s.v}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? s.lAr : s.lEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TAB BAR ══════════════════════════════════════════ */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-mono whitespace-nowrap transition-all"
            style={{
              background: activeTab === t.id ? "rgba(142,213,255,0.12)" : "transparent",
              border: activeTab === t.id ? "1px solid rgba(142,213,255,0.25)" : "1px solid transparent",
              color: activeTab === t.id ? "var(--color-primary)" : "var(--color-on-surface-variant)",
            }}
          >
            {t.icon}
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      {/* ══ TAB CONTENT ══════════════════════════════════════ */}

      {/* ── OVERVIEW ─────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-8">
          {/* Continue where you left off */}
          {(courseProgress.length > 0 || languageResult || examResults.length > 0) && (
            <div>
              <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <Clock size={18} style={{ color: "var(--color-primary)" }} />
                {isAr ? "تابع من حيث توقفت" : "Continue Where You Left Off"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courseProgress[0] && (
                  <Link href={`/${locale}/courses/${courseProgress[0].course_slug}`}
                    className="glass-card rounded-2xl p-4 flex items-start gap-3 transition-all hover:scale-[1.01] hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(142,213,255,0.12)", textDecoration: "none" }}>
                    <span className="text-2xl flex-shrink-0">📚</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono mb-1" style={{ color: "var(--color-primary)" }}>{isAr ? "آخر دورة" : "Last course"}</p>
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>{courseProgress[0].course_slug}</p>
                      <div className="h-1 rounded-full mt-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${courseProgress[0].progress_percent}%`, background: "var(--color-primary)" }} />
                      </div>
                    </div>
                  </Link>
                )}
                {languageResult && (
                  <Link href={`/${locale}/language`}
                    className="glass-card rounded-2xl p-4 flex items-start gap-3 transition-all hover:scale-[1.01] hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(208,188,255,0.12)", textDecoration: "none" }}>
                    <span className="text-2xl flex-shrink-0">🌐</span>
                    <div>
                      <p className="text-xs font-mono mb-1" style={{ color: "var(--color-secondary)" }}>{isAr ? "آخر اختبار لغة" : "Last language test"}</p>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>CEFR: {languageResult.level}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>{languageResult.score}% · {languageResult.stages_completed} {isAr ? "مراحل" : "stages"}</p>
                    </div>
                  </Link>
                )}
                {examResults[0] && (
                  <Link href={`/${locale}/digital-exams`}
                    className="glass-card rounded-2xl p-4 flex items-start gap-3 transition-all hover:scale-[1.01] hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(60,224,251,0.12)", textDecoration: "none" }}>
                    <span className="text-2xl flex-shrink-0">💻</span>
                    <div>
                      <p className="text-xs font-mono mb-1" style={{ color: "var(--color-tertiary)" }}>{isAr ? "آخر اختبار" : "Last exam"}</p>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>{examResults[0].subject_label}</p>
                      <p className="text-xs mt-1" style={{ color: examResults[0].passed ? "#4ade80" : "#ef4444" }}>
                        {Math.round(examResults[0].percentage)}% — {examResults[0].passed ? (isAr ? "ناجح" : "Passed") : (isAr ? "لم ينجح" : "Failed")}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard icon={<Flame size={22} />} value={`${streak} ${streak === 1 ? (isAr ? "يوم" : "day") : (isAr ? "أيام" : "days")}`} labelAr="سلسلة التعلم 🔥" labelEn="Learning streak 🔥" color="#f97316" isAr={isAr} pulse={streak > 0} />
            <StatCard icon={<BookOpen size={22} />} value={startedCount} labelAr="دورات جارية" labelEn="Courses started" color="var(--color-primary)" isAr={isAr} />
            <StatCard icon={<Award size={22} />} value={completedCount} labelAr="دورات مكتملة" labelEn="Courses completed" color="#4ade80" isAr={isAr} />
            <StatCard icon={<TrendingUp size={22} />} value={`${avgQuiz}%`} labelAr="متوسط الاختبارات" labelEn="Avg quiz score" color="var(--color-secondary)" isAr={isAr} />
            <StatCard icon={<Save size={22} />} value={savedPromptsDb.length} labelAr="برومبت محفوظ" labelEn="Saved prompts" color="var(--color-tertiary)" isAr={isAr} />
          </div>

          {/* AI Coach */}
          <AICoachCard locale={locale} streak={streak} />

          {/* Quick actions */}
          <div>
            <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "وصول سريع" : "Quick Access"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { icon: <Sparkles size={20} />, href: "/mentor",              labelAr: "مرشد AI",          labelEn: "AI Mentor",      color: "var(--color-primary)" },
                { icon: <Activity size={20} />, href: "/nano-banana-prompts", labelAr: "Nano Banana",      labelEn: "Nano Banana",    color: "#f59e0b" },
                { icon: <Star    size={20} />,  href: "/prompt-score",        labelAr: "تقييم البرومبت",  labelEn: "Prompt Score",   color: "var(--color-secondary)" },
                { icon: <Award   size={20} />,  href: "/certificates",        labelAr: "شهاداتي",          labelEn: "Certificates",   color: "#fbbf24" },
                { icon: <Brain   size={20} />,  href: "/learning-plans",      labelAr: "خطط التعلم",      labelEn: "Learning Plans", color: "#a78bfa" },
                { icon: <Trophy  size={20} />,  href: "/challenges",          labelAr: "التحديات",          labelEn: "Challenges",     color: "#ef4444" },
                { icon: <TrendingUp size={20}/>, href: "/leaderboard",        labelAr: "المتصدرون",        labelEn: "Leaderboard",    color: "#4ade80" },
                { icon: <Settings size={20} />, href: "/profile",             labelAr: "الملف الشخصي",    labelEn: "Profile",        color: "var(--color-tertiary)" },
              ].map((item) => (
                <Link key={item.href} href={`/${locale}${item.href}`}
                  className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-105 hover:-translate-y-1">
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

          {/* Automation section */}
          <AutomationHubSection locale={locale} isAr={isAr} />

          {/* Digital Exams section */}
          <DigitalExamsHubSection locale={locale} isAr={isAr} />
        </div>
      )}

      {/* ── MY PORTALS ───────────────────────────────────── */}
      {activeTab === "portals" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <Grid3X3 size={18} style={{ color: "var(--color-secondary)" }} />
              {isAr ? "بواباتي — كل بوابات درهوس" : "My Portals — All Darhous Portals"}
            </h2>
            <Link href={`/${locale}`} className="flex items-center gap-1 text-sm" style={{ color: "var(--color-secondary)" }}>
              {isAr ? "استكشف الكل" : "Explore All"} <Arrow size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {realPortals.map((portal) => {
              const prog = getPortalProgress(portal.id);
              return (
                <div key={portal.id} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${portal.color}15` }}>
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${portal.color}12` }}>
                      {portal.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                          {isAr ? portal.titleAr : portal.titleEn}
                        </p>
                        <span className="text-xs font-mono flex-shrink-0" style={{ color: portal.color }}>{prog.label}</span>
                      </div>
                      <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? portal.descriptionAr : portal.descriptionEn}
                      </p>
                      <div className="h-1.5 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${prog.pct}%`, background: portal.color, boxShadow: prog.pct > 0 ? `0 0 8px ${portal.color}50` : "none" }} />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {portal.features.slice(0, 3).map((f) => (
                          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portal.color}12`, color: portal.color }}>
                            {f}
                          </span>
                        ))}
                        <Link href={`/${locale}${portal.href}`}
                          className="ms-auto text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-80 flex items-center gap-1"
                          style={{ background: `${portal.color}12`, color: portal.color, border: `1px solid ${portal.color}20`, textDecoration: "none" }}>
                          {isAr ? "فتح" : "Open"} <Arrow size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── CERTIFICATES ─────────────────────────────────── */}
      {activeTab === "certificates" && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Award size={18} style={{ color: "#fbbf24" }} />
            {isAr ? "مركز الشهادات" : "Certificates Center"}
          </h2>
          <Link href={`/${locale}/certificates`}
            className="glass-card rounded-2xl p-6 flex items-center gap-5 transition-all hover:scale-[1.01]"
            style={{ border: "1px solid rgba(251,191,36,0.15)", textDecoration: "none" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
              <Award size={28} style={{ color: "#fbbf24" }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "شهاداتي المكتسبة" : "My Earned Certificates"}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "اعرض وحمّل وشارك شهاداتك على LinkedIn" : "View, download, and share your certificates on LinkedIn"}
              </p>
            </div>
            <Arrow size={18} style={{ color: "var(--color-on-surface-variant)" }} />
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "🎓", t: isAr ? "شهادة الذكاء الاصطناعي" : "AI Academy Certificate", sub: isAr ? "أكمل المسار للحصول على الشهادة" : "Complete path to earn", color: "#8ed5ff", locked: completedCount < 5 },
              { icon: "🌐", t: isAr ? "شهادة اللغة الإنجليزية" : "English Language Certificate", sub: isAr ? "حقق B2 أو أعلى" : "Achieve B2 or higher", color: "#d0bcff", locked: !languageResult || languageResult.score < 70 },
              { icon: "💻", t: isAr ? "شهادة التحول الرقمي" : "Digital Transformation Certificate", sub: isAr ? "اجتز 5 اختبارات بنجاح" : "Pass 5 exams", color: "#3ce0fb", locked: examResults.filter((e) => e.passed).length < 5 },
            ].map((cert) => (
              <div key={cert.t} className="glass-card rounded-2xl p-5 flex flex-col gap-3 text-center"
                style={{ border: `1px solid ${cert.color}${cert.locked ? "0a" : "20"}`, opacity: cert.locked ? 0.6 : 1 }}>
                <span className="text-3xl">{cert.icon}</span>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{cert.t}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{cert.sub}</p>
                {cert.locked ? (
                  <span className="text-xs font-mono px-3 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>
                    🔒 {isAr ? "مقفل" : "Locked"}
                  </span>
                ) : (
                  <div className="flex gap-2 justify-center">
                    <Link href={`/${locale}/certificates`}
                      className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80"
                      style={{ background: `${cert.color}15`, color: cert.color, textDecoration: "none" }}>
                      <Download size={12} /> {isAr ? "تحميل" : "Download"}
                    </Link>
                    <button
                      onClick={() => shareToLinkedIn(cert.t)}
                      className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80"
                      style={{ background: "rgba(10,102,194,0.12)", color: "#0A66C2" }}>
                      <Share2 size={12} /> LinkedIn
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Language Assessment History */}
          {languageHistory.length > 0 && (
            <div>
              <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                🌐 {isAr ? "سجل تقييمات اللغة" : "Language Assessment History"}
              </h3>
              <div className="flex flex-col gap-2">
                {languageHistory.map((lr, idx) => (
                  <div key={lr.id} className="flex items-center gap-4 rounded-xl px-4 py-3"
                    style={{ background: "rgba(208,188,255,0.04)", border: "1px solid rgba(208,188,255,0.1)" }}>
                    <div>
                      <p className="font-mono font-bold text-sm" style={{ color: "#d0bcff" }}>{lr.level}</p>
                      <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? `نتيجة: ${lr.score.toFixed(1)}% — ${lr.stages_completed}/10 مراحل` : `Score: ${lr.score.toFixed(1)}% — ${lr.stages_completed}/10 stages`}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      {idx === 0 && <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>Latest</span>}
                      <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                        {new Date(lr.created_at).toLocaleDateString(isAr ? "ar" : "en", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      {lr.certificate_id && (
                        <a href={`/api/certificates/language/${lr.id}`} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg transition-opacity hover:opacity-80"
                          style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", textDecoration: "none" }}>
                          <Download size={11} /> PDF
                        </a>
                      )}
                      <a href={`/${locale}/language/results?id=${lr.id}`}
                        className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg transition-opacity hover:opacity-80"
                        style={{ background: "rgba(208,188,255,0.08)", color: "#d0bcff", textDecoration: "none" }}>
                        {isAr ? "عرض" : "View"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={`/${locale}/language/assessment`}
                  className="text-xs font-mono px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ background: "rgba(208,188,255,0.08)", color: "#d0bcff", textDecoration: "none" }}>
                  🔄 {isAr ? "إعادة الاختبار" : "Retake Assessment"}
                </a>
                <a href={`/${locale}/language/history`}
                  className="text-xs font-mono px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ background: "rgba(208,188,255,0.04)", border: "1px solid rgba(208,188,255,0.12)", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>
                  📈 {isAr ? "عرض كل السجل" : "View Full History"}
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ACTIVITY TIMELINE ────────────────────────────── */}
      {activeTab === "activity" && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Activity size={18} style={{ color: "var(--color-tertiary)" }} />
            {isAr ? "سجل النشاط" : "Activity Timeline"}
          </h2>
          <div className="flex flex-col gap-3">
            {[
              ...courseProgress.map((cp) => ({
                type: "course" as const,
                icon: "📚",
                text: isAr ? `فتحت دورة: ${cp.course_slug}` : `Opened course: ${cp.course_slug}`,
                time: cp.last_opened_at ?? "",
                color: "var(--color-primary)",
              })),
              ...examResults.map((er) => ({
                type: "exam" as const,
                icon: er.passed ? "✅" : "📝",
                text: isAr ? `اختبار ${er.subject_label} — ${Math.round(er.percentage)}%` : `Exam ${er.subject_label} — ${Math.round(er.percentage)}%`,
                time: er.created_at,
                color: er.passed ? "#4ade80" : "#f59e0b",
              })),
              ...(languageResult ? [{
                type: "language" as const,
                icon: "🌐",
                text: isAr ? `اختبار اللغة — مستوى ${languageResult.level}` : `Language test — Level ${languageResult.level}`,
                time: languageResult.created_at,
                color: "var(--color-secondary)",
              }] : []),
            ]
              .filter((e) => e.time)
              .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
              .slice(0, 15)
              .map((event, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: `${event.color}12`, border: `1px solid ${event.color}20` }}>
                      {event.icon}
                    </div>
                    {i < 14 && <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.06)" }} />}
                  </div>
                  <div className="flex-1 pb-1">
                    <p className="text-sm" style={{ color: "var(--color-on-surface)" }}>{event.text}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {new Date(event.time).toLocaleDateString(isAr ? "ar" : "en", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            {courseProgress.length === 0 && examResults.length === 0 && !languageResult && (
              <EmptyState icon="📊" titleAr="لا يوجد نشاط بعد" titleEn="No activity yet" descAr="ابدأ بتصفح إحدى البوابات." descEn="Start by exploring one of the portals." linkHref={`/${locale}`} linkLabelAr="استكشف" linkLabelEn="Explore" isAr={isAr} />
            )}
          </div>
        </div>
      )}

      {/* ── AI MENTOR ────────────────────────────────────── */}
      {activeTab === "mentor" && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Bot size={18} style={{ color: "var(--color-primary)" }} />
            {isAr ? "مرشدي الذكي الشخصي" : "My Personal AI Mentor"}
          </h2>

          {/* Context preview panel */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(142,213,255,0.12)" }}>
            <p className="text-xs font-mono mb-4" style={{ color: "var(--color-primary)" }}>
              {isAr ? "ما يعرفه المرشد عنك الآن" : "What the Mentor Currently Knows About You"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { lAr: "الاسم", lEn: "Name", v: displayName, c: "var(--color-primary)" },
                { lAr: "مستوى اللغة", lEn: "Language Level", v: languageResult?.level ?? (isAr ? "لم يُختبر بعد" : "Not tested yet"), c: "var(--color-secondary)" },
                { lAr: "الدورات المكتملة", lEn: "Completed Courses", v: `${completedCount}`, c: "#4ade80" },
                { lAr: "الاختبارات الرقمية", lEn: "Digital Exams", v: `${examResults.length} ${isAr ? "اختبار" : "exams"}`, c: "var(--color-tertiary)" },
                { lAr: "سلسلة التعلم", lEn: "Learning Streak", v: `${streak} ${isAr ? "أيام" : "days"}`, c: "#f97316" },
                { lAr: "البوابات المستخدمة", lEn: "Portals Used", v: `${[courseProgress.length > 0, !!languageResult, examResults.length > 0].filter(Boolean).length} / 6`, c: "var(--color-secondary)" },
              ].map((ctx) => (
                <div key={ctx.lEn} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ctx.c }} />
                  <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? ctx.lAr : ctx.lEn}</span>
                  <span className="ms-auto text-xs font-mono font-bold" style={{ color: ctx.c }}>{ctx.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "🤖", t: isAr ? "اسأل سؤالاً" : "Ask a Question", d: isAr ? "اطرح أي سؤال تعليمي أو مهني" : "Ask any learning or career question", href: "/mentor", c: "var(--color-primary)" },
              { icon: "🗺️", t: isAr ? "ابنِ مساري" : "Build My Path", d: isAr ? "المرشد يصمم لك مساراً مخصصاً" : "Mentor designs a custom path for you", href: "/mentor", c: "var(--color-secondary)" },
              { icon: "💼", t: isAr ? "جلسة مهنية" : "Career Session", d: isAr ? "تحضير للوظائف والمقابلات" : "Prep for jobs and interviews", href: "/career", c: "#f59e0b" },
            ].map((card) => (
              <Link key={card.t} href={`/${locale}${card.href}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:-translate-y-1"
                style={{ border: `1px solid ${card.c}15`, textDecoration: "none" }}>
                <span className="text-3xl">{card.icon}</span>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{card.t}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{card.d}</p>
                <span className="text-xs font-mono mt-auto flex items-center gap-1" style={{ color: card.c }}>
                  {isAr ? "ابدأ" : "Start"} <Arrow size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── SMART LEARNING PLAN ──────────────────────────── */}
      {activeTab === "plan" && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Map size={18} style={{ color: "#4ade80" }} />
            {isAr ? "خطة التعلم الذكية" : "Smart Learning Plan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {([
              {
                period: isAr ? "اليوم" : "Today",
                icon: "⚡",
                color: "var(--color-tertiary)",
                tasks: isAr
                  ? ["10 دقائق في أكاديمية AI", "اقرأ درسًا واحدًا في اللغة", "اسأل المرشد سؤالاً واحدًا"]
                  : ["10 minutes in AI Academy", "Read one language lesson", "Ask the mentor one question"],
              },
              {
                period: isAr ? "هذا الأسبوع" : "This Week",
                icon: "📅",
                color: "var(--color-secondary)",
                tasks: isAr
                  ? ["أكمل اختبار مستوى اللغة", "ابدأ مسار جديد في الأتمتة", "راجع نتائجك من لوحة التحكم", "خصص وقتاً للتطبيق العملي"]
                  : ["Complete a language level test", "Start new Automation path", "Review your results from dashboard", "Allocate time for hands-on practice"],
              },
              {
                period: isAr ? "هذا الشهر" : "This Month",
                icon: "🗓️",
                color: "var(--color-primary)",
                tasks: isAr
                  ? ["أكمل مسار أكاديمية الذكاء الاصطناعي", "اجتز 3 اختبارات رقمية", "ابنِ مشروع IoT صغير", "احصل على أول شهادة", "طوّر سيرتك الذاتية في Career Hub"]
                  : ["Complete AI Academy path", "Pass 3 digital exams", "Build a small IoT project", "Earn your first certificate", "Update your CV in Career Hub"],
              },
            ] as const).map((plan) => (
              <div key={plan.period} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${plan.color}15` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{plan.icon}</span>
                  <p className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{plan.period}</p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {plan.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                      {task}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/learning-plans`}
                  className="text-xs font-mono mt-auto flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ color: plan.color, textDecoration: "none" }}>
                  {isAr ? "تفاصيل الخطة" : "Plan details"} <Arrow size={11} />
                </Link>
              </div>
            ))}
          </div>

          {/* Course progress in plan */}
          {courseProgress.length > 0 && (
            <div>
              <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <BookOpen size={16} style={{ color: "var(--color-primary)" }} />
                {isAr ? "تقدّمك في الدورات" : "Course Progress"}
              </h3>
              <div className="flex flex-col gap-3">
                {courseProgress.map((cp) => (
                  <div key={cp.course_slug} className="glass-card rounded-xl p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "var(--color-on-surface)" }}>{cp.course_slug}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                          <div className="h-full rounded-full" style={{ width: `${cp.progress_percent}%`, background: "var(--color-primary)" }} />
                        </div>
                        <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{cp.progress_percent}%</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: cp.status === "completed" ? "rgba(74,222,128,0.12)" : "rgba(142,213,255,0.10)", color: cp.status === "completed" ? "#4ade80" : "var(--color-primary)" }}>
                      {cp.status === "completed" ? (isAr ? "مكتمل" : "Completed") : (isAr ? "جارٍ" : "In progress")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── SETTINGS ─────────────────────────────────────── */}
      {activeTab === "settings" && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Settings size={18} style={{ color: "var(--color-on-surface-variant)" }} />
            {isAr ? "إعدادات الحساب" : "Account Settings"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <User size={20} />, t: isAr ? "الملف الشخصي" : "Personal Profile", d: isAr ? "الاسم، الصورة، المعرّف، السيرة الذاتية" : "Name, avatar, username, bio", href: "/profile", c: "var(--color-primary)" },
              { icon: <Bell size={20} />, t: isAr ? "الإشعارات" : "Notifications", d: isAr ? "إعداد إشعارات البريد والمنصة" : "Email & platform notification settings", href: "/profile", c: "var(--color-secondary)" },
              { icon: <Shield size={20} />, t: isAr ? "الأمان والخصوصية" : "Security & Privacy", d: isAr ? "كلمة المرور والجلسات والخصوصية" : "Password, sessions, and privacy", href: "/profile", c: "#f59e0b" },
              { icon: <Star size={20} />, t: isAr ? "التفضيلات" : "Preferences", d: isAr ? "اللغة، المظهر، التخصيص" : "Language, theme, customization", href: "/profile", c: "var(--color-tertiary)" },
            ].map((item) => (
              <Link key={item.t} href={`/${locale}${item.href}`}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.01]"
                style={{ border: `1px solid ${item.c}12`, textDecoration: "none" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.c}12`, color: item.c }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{item.t}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>{item.d}</p>
                </div>
                <Arrow size={16} className="ms-auto flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }} />
              </Link>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.12)" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
              <LogOut size={16} />
              {isAr ? "تسجيل الخروج" : "Sign Out"}
            </h3>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl transition-all hover:opacity-80"
              style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <LogOut size={15} />
              {isAr ? "تسجيل الخروج من المنصة" : "Sign out from the platform"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   HELPER COMPONENTS
════════════════════════════════════════════════════════════════ */
function LoginGate({ isAr, locale }: { isAr: boolean; locale: string }) {
  return (
    <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(0,102,138,0.15) 0%, rgba(87,27,193,0.12) 100%)", border: "1px solid rgba(142,213,255,0.1)" }}>
      <div className="text-5xl mb-5">🎓</div>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "My Darhous Hub" : "My Darhous Hub"}
      </h1>
      <p className="text-base max-w-md mx-auto mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "سجّل دخولك لتتبع تقدمك، وخطتك الذكية، وشهاداتك عبر كل بوابات درهوس."
          : "Sign in to track your progress, smart plan, and certificates across all Darhous portals."}
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
    <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(0,102,138,0.18) 0%, rgba(87,27,193,0.12) 100%)", border: "1px solid rgba(142,213,255,0.12)" }}>
      <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "220px", height: "220px" }} />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>{isAr ? "مرحبًا 👋" : "Hello there 👋"}</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "My Darhous Hub" : "My Darhous Hub"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "تصفح موادك المحفوظة وأدوات الذكاء الاصطناعي" : "Browse your saved items and AI tools"}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm">
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
          <Link href={`/${locale}/register`} className="glow-button-secondary font-mono px-5 py-2.5 rounded-xl text-sm">
            {isAr ? "إنشاء حساب" : "Register"}
          </Link>
        </div>
      </div>
      <div className="relative z-10 mt-5 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full"
          style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.15)", color: "var(--color-primary)" }}>
          <Clock size={12} />
          {isAr ? "أنشئ حسابًا لمزامنة تقدمك عبر أجهزتك" : "Create an account to sync your progress across devices"}
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
        <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>{isAr ? "وصول سريع" : "Quick Access"}</h2>
        <Link href={`/${locale}/courses`} className="flex items-center gap-1 text-sm" style={{ color: "var(--color-primary)" }}>
          {isAr ? "استعرض الدورات" : "Browse courses"} <Arrow size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <BookOpen size={20} />, href: "/courses",              labelAr: "الدورات",       labelEn: "Courses",        color: "var(--color-primary)" },
          { icon: <Sparkles size={20} />, href: "/mentor",               labelAr: "مرشد AI",       labelEn: "AI Mentor",      color: "var(--color-secondary)" },
          { icon: <Activity size={20} />, href: "/nano-banana-prompts",  labelAr: "Nano Banana",   labelEn: "Nano Banana",    color: "#f59e0b" },
          { icon: <Brain   size={20} />,  href: "/paths",                labelAr: "مسارات التعلم", labelEn: "Learning Paths", color: "var(--color-tertiary)" },
        ].map((item) => (
          <Link key={item.href} href={`/${locale}${item.href}`}
            className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-105 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
            <span className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? item.labelAr : item.labelEn}</span>
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
