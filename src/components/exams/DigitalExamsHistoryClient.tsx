"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { BarChart2, Download, ChevronRight, ChevronLeft, LogIn, Trophy, TrendingUp, RotateCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { examSubjects } from "@/data/digital-exam-subjects";

interface ExamResult {
  id: string;
  subject: string;
  subject_label: string;
  percentage: number;
  passed: boolean;
  score: number;
  total: number;
  time_taken: number;
  flags_count: number;
  certificate_id: string | null;
  created_at: string;
}

interface SubjectStat {
  id: string;
  label: string;
  labelAr: string;
  icon: string;
  color: string;
  attempts: number;
  bestScore: number;
  avgScore: number;
  lastPassed: boolean;
}

export default function DigitalExamsHistoryClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { isAuthenticated, loading, supabaseConfigured } = useAuth();

  const [results, setResults] = useState<ExamResult[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setFetching(false); return; }
    fetch("/api/exams/results?limit=100")
      .then((r) => r.json())
      .then(({ results: data }) => setResults(data ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [isAuthenticated]);

  // Auth gate
  if (!loading && supabaseConfigured && !isAuthenticated) {
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-8 text-center">
        <LogIn size={40} className="opacity-60" />
        <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تسجيل الدخول مطلوب" : "Sign In Required"}
        </h2>
        <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </div>
    );
  }

  if (fetching || loading) {
    return (
      <div className="container-xl py-24 flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#3ce0fb", borderTopColor: "transparent" }} />
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جاري التحميل..." : "Loading..."}</p>
      </div>
    );
  }

  // Build per-subject stats
  const subjectStats: SubjectStat[] = examSubjects.map((s) => {
    const attempts = results.filter((r) => r.subject === s.id);
    const bestScore = attempts.length ? Math.max(...attempts.map((r) => r.percentage)) : 0;
    const avgScore = attempts.length
      ? Math.round(attempts.reduce((sum, r) => sum + r.percentage, 0) / attempts.length)
      : 0;
    const lastPassed = attempts.length ? attempts[0].passed : false;
    return {
      id: s.id, label: s.label, labelAr: s.labelAr, icon: s.icon, color: s.color,
      attempts: attempts.length, bestScore, avgScore, lastPassed,
    };
  }).filter((s) => s.attempts > 0);

  const totalAttempts = results.length;
  const totalPassed = results.filter((r) => r.passed).length;
  const bestOverall = results.length ? Math.max(...results.map((r) => r.percentage)) : 0;
  const avgOverall = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
    : 0;

  const chartData = subjectStats.map((s) => ({
    name: isAr ? s.labelAr.slice(0, 12) : s.label.slice(0, 14),
    [isAr ? "أفضل نتيجة" : "Best"]: s.bestScore,
    [isAr ? "المتوسط" : "Avg"]: s.avgScore,
  }));

  return (
    <div className="container-xl py-10 flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "سجل الاختبارات" : "Exam History"}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "تحليل شامل لأدائك في كل المواد" : "Comprehensive performance analysis across all subjects"}
          </p>
        </div>
        <Link
          href={`/${locale}/digital-exams`}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: "rgba(60,224,251,0.08)", border: "1px solid rgba(60,224,251,0.2)", color: "#3ce0fb" }}
        >
          {isAr ? "اختبارات جديدة" : "New Exam"} <Arrow size={14} />
        </Link>
      </div>

      {totalAttempts === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <BarChart2 size={40} className="opacity-30" />
          <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لا توجد اختبارات بعد" : "No exams yet"}
          </p>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "ابدأ اختبارًا الآن لرؤية نتائجك هنا" : "Start an exam now to see your results here"}
          </p>
          <Link href={`/${locale}/digital-exams`} className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl text-sm mt-2">
            {isAr ? "ابدأ الآن" : "Start Now"}
          </Link>
        </div>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <BarChart2 size={18} />, label: isAr ? "إجمالي المحاولات" : "Total Attempts", value: totalAttempts, color: "#3ce0fb" },
              { icon: <Trophy size={18} />, label: isAr ? "ناجح" : "Passed", value: `${totalPassed}/${totalAttempts}`, color: "#4ade80" },
              { icon: <TrendingUp size={18} />, label: isAr ? "أعلى نتيجة" : "Best Score", value: `${bestOverall}%`, color: "#f59e0b" },
              { icon: <BarChart2 size={18} />, label: isAr ? "متوسط النتائج" : "Average", value: `${avgOverall}%`, color: "#8ed5ff" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-2" style={{ border: `1px solid ${s.color}20` }}>
                <div style={{ color: s.color }}>{s.icon}</div>
                <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          {chartData.length > 0 && (
            <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
              <h2 className="font-bold text-base mb-5" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "مقارنة الأداء حسب المادة" : "Performance by Subject"}
              </h2>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)" }} />
                    <Tooltip
                      contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                    />
                    <Bar dataKey={isAr ? "أفضل نتيجة" : "Best"} fill="#3ce0fb" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={isAr ? "المتوسط" : "Avg"} fill="#8ed5ff60" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Per-subject cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjectStats.map((s) => (
              <div key={s.id} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: `1px solid ${s.color}15` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{isAr ? s.labelAr : s.label}</p>
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      {s.attempts} {isAr ? "محاولة" : "attempt(s)"}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{
                    background: s.lastPassed ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
                    color: s.lastPassed ? "#4ade80" : "#ef4444",
                  }}>
                    {s.lastPassed ? (isAr ? "ناجح" : "Pass") : (isAr ? "راسب" : "Fail")}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "أفضل" : "Best"}</p>
                    <p className="font-mono font-bold" style={{ color: s.color }}>{s.bestScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "متوسط" : "Avg"}</p>
                    <p className="font-mono font-bold" style={{ color: "var(--color-on-surface)" }}>{s.avgScore}%</p>
                  </div>
                </div>
                {/* Progress bar (best score) */}
                <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.bestScore}%`, background: s.color, transition: "width 0.6s ease" }} />
                </div>
                <Link
                  href={`/${locale}/digital-exams/${s.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold mt-1"
                  style={{ color: s.color }}
                >
                  <RotateCcw size={12} />
                  {isAr ? "إعادة الاختبار" : "Retake Exam"}
                </Link>
              </div>
            ))}
          </div>

          {/* Full results table */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="font-bold text-base mb-5" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "سجل كل المحاولات" : "All Attempts"}
            </h2>
            <div className="flex flex-col gap-2">
              {results.map((r) => {
                const sub = examSubjects.find((s) => s.id === r.subject);
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-lg flex-shrink-0">{sub?.icon ?? "📋"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? (r.subject_label || sub?.labelAr) : (r.subject_label || sub?.label)}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                        {new Date(r.created_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                        {r.flags_count > 0 && ` · ⚠️ ${r.flags_count}`}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-sm" style={{ color: r.passed ? "#4ade80" : "#ef4444" }}>
                      {r.percentage.toFixed(0)}%
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      {r.score}/{r.total}
                    </span>
                    {r.passed && r.certificate_id && (
                      <a
                        href={`/api/certificates/exams/${r.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg"
                        style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}
                        title={isAr ? "تحميل الشهادة" : "Download Certificate"}
                      >
                        <Download size={13} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
