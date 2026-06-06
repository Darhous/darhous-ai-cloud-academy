"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Award, RotateCcw, TrendingUp, LayoutDashboard,
  ChevronRight, ChevronLeft, AlertTriangle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface HistoryResult {
  id: string;
  score: number;
  level: string;
  stages_completed: number;
  is_incomplete: boolean;
  flags_count?: number;
  certificate_id?: string | null;
  created_at: string;
}

// ── CEFR level sort order ──────────────────────────────────────────────────
const LEVEL_ORDER = ["A1A","A1B","A2A","A2B","B1A","B1B","B2A","B2B","C1A","C1B","C2"];
const levelRank = (l: string) => LEVEL_ORDER.indexOf(l);

export default function LanguageHistoryClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;

  const { user } = useAuth();
  const [results, setResults] = useState<HistoryResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) { setLoading(false); return; }
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from("language_results")
        .select("id,score,level,stages_completed,is_incomplete,flags_count,certificate_id,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(20);
      setResults((data as HistoryResult[]) ?? []);
      setLoading(false);
    }
    load();
  }, [user]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: "var(--portal-color)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  // ── Not authenticated ────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="container-xl py-20 text-center">
        <p className="text-lg mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "يرجى تسجيل الدخول لعرض سجل الاختبارات." : "Please sign in to view your assessment history."}
        </p>
        <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl inline-flex items-center gap-2">
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </div>
    );
  }

  // ── Derived stats ────────────────────────────────────────────────────────
  const latest  = results.length > 0 ? results[results.length - 1] : null;
  const bestScore = results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0;
  const bestLevel = results.reduce<string | null>((best, r) => {
    if (!best) return r.level;
    return levelRank(r.level) > levelRank(best) ? r.level : best;
  }, null);
  const certCount = results.filter((r) => r.certificate_id).length;

  // Chart data: ascending chronological order (already sorted that way)
  const chartData = results.map((r, i) => ({
    attempt: i + 1,
    score: Math.round(r.score * 10) / 10,
    level: r.level,
    date: new Date(r.created_at).toLocaleDateString(isAr ? "ar-EG" : "en", {
      month: "short", day: "numeric",
    }),
  }));

  return (
    <div className="container-xl py-12 flex flex-col gap-8 max-w-3xl mx-auto">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "سجل اختبارات اللغة" : "Language Assessment History"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تتبع تطور مستواك اللغوي عبر الزمن"
              : "Track your English language level progress over time"}
          </p>
        </div>
        <Link href={`/${locale}/language/assessment`}
          className="glow-button-secondary font-mono px-5 py-2 rounded-xl flex items-center gap-2 text-sm flex-shrink-0">
          <RotateCcw size={14} />
          {isAr ? "اختبار جديد" : "New Assessment"}
        </Link>
      </div>

      {/* ── Stats row ───────────────────────────────────────────── */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: isAr ? "عدد الاختبارات" : "Total Attempts",   value: results.length,               color: "#c084fc" },
            { label: isAr ? "أفضل نتيجة"    : "Best Score",        value: `${bestScore.toFixed(1)}%`,   color: "#4ade80" },
            { label: isAr ? "أعلى مستوى"    : "Best Level",        value: bestLevel ?? "—",             color: "#fbbf24" },
            { label: isAr ? "الشهادات"       : "Certificates",      value: certCount,                    color: "#3ce0fb" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1"
              style={{ border: `1px solid ${s.color}20` }}>
              <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Latest level banner ─────────────────────────────────── */}
      {latest && (
        <div className="rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{ background: "var(--portal-color-faint)", border: "1px solid var(--portal-color-border)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-lg flex-shrink-0"
            style={{ background: "var(--portal-color-subtle)", border: "1px solid var(--portal-color-glow)", color: "var(--portal-color)" }}>
            {latest.level}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "آخر مستوى تم تسجيله" : "Most Recent Level"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? `${latest.score.toFixed(1)}% — ${new Date(latest.created_at).toLocaleDateString("ar-EG", { month: "long", day: "numeric", year: "numeric" })}`
                : `${latest.score.toFixed(1)}% — ${new Date(latest.created_at).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}`}
            </p>
          </div>
          <Link href={`/${locale}/language/results?id=${latest.id}`}
            className="ml-auto flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", textDecoration: "none" }}>
            {isAr ? "عرض" : "View"} <Arrow size={12} />
          </Link>
        </div>
      )}

      {/* ── Progress chart ──────────────────────────────────────── */}
      {chartData.length >= 2 && (
        <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--portal-color-border)" }}>
          <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2"
            style={{ color: "var(--color-on-surface)" }}>
            <TrendingUp size={18} style={{ color: "var(--portal-color)" }} />
            {isAr ? "تطور النتيجة عبر الاختبارات" : "Score Progression"}
          </h2>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="attempt"
                tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1035",
                  border: "1px solid #2d2060",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#e2e8f0",
                }}
                formatter={(value) => {
                  const numVal = typeof value === "number" ? value : 0;
                  return [`${numVal}%`, isAr ? "النتيجة" : "Score"] as [string, string];
                }}
                labelFormatter={(label) => {
                  const idx = typeof label === "number" ? label - 1 : -1;
                  const item = idx >= 0 ? chartData[idx] : undefined;
                  if (!item) return String(label);
                  return `${isAr ? "محاولة" : "Attempt"} ${label} · ${item.level} · ${item.date}`;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#c084fc"
                strokeWidth={2}
                dot={{ fill: "#c084fc", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#c084fc" }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs mt-2 text-center" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الاختبار الأول ← الأحدث" : "First attempt → Most recent"}
          </p>
        </div>
      )}

      {/* ── All attempts list ───────────────────────────────────── */}
      {results.length > 0 ? (
        <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-display font-bold text-lg mb-5" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "جميع المحاولات" : "All Attempts"}
            <span className="ms-2 text-sm font-normal font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              ({results.length})
            </span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {[...results].reverse().map((r, idx) => (
              <Link
                key={r.id}
                href={`/${locale}/language/results?id=${r.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.01]"
                style={{
                  background: "var(--portal-color-faint)",
                  border: "1px solid var(--portal-color-border)",
                  textDecoration: "none",
                }}>
                {/* Attempt # */}
                <span className="font-mono text-xs w-6 flex-shrink-0"
                  style={{ color: "var(--color-on-surface-variant)" }}>
                  #{results.length - idx}
                </span>
                {/* Level */}
                <span className="font-mono font-bold text-sm w-10 flex-shrink-0"
                  style={{ color: "var(--portal-color)" }}>
                  {r.level}
                </span>
                {/* Score */}
                <span className="font-mono font-bold flex-shrink-0"
                  style={{ color: r.score >= 60 ? "#4ade80" : r.score >= 30 ? "#fbbf24" : "#94a3b8" }}>
                  {r.score.toFixed(1)}%
                </span>
                {/* Tags */}
                <div className="flex items-center gap-1.5">
                  {r.is_incomplete && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                      {isAr ? "جزئي" : "Partial"}
                    </span>
                  )}
                  {r.certificate_id && (
                    <Award size={12} style={{ color: "#fbbf24" }} />
                  )}
                  {(r.flags_count ?? 0) > 0 && (
                    <AlertTriangle size={12} style={{ color: "#ef4444" }} />
                  )}
                </div>
                {/* Date */}
                <span className="text-xs ml-auto flex-shrink-0"
                  style={{ color: "var(--color-on-surface-variant)" }}>
                  {new Date(r.created_at).toLocaleDateString(isAr ? "ar-EG" : "en", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
                <Arrow size={13} style={{ color: "var(--color-on-surface-variant)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* ── Empty state ──────────────────────────────────────── */
        <div className="glass-card rounded-2xl p-14 text-center"
          style={{ border: "1px solid var(--portal-color-border)" }}>
          <p className="text-4xl mb-4">🌐</p>
          <p className="text-lg font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لم تجرِ أي اختبار بعد" : "No assessments yet"}
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "ابدأ اختبارك الأول لمعرفة مستواك في اللغة الإنجليزية"
              : "Take your first assessment to discover your English language level"}
          </p>
          <Link href={`/${locale}/language/assessment`}
            className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl inline-flex items-center gap-2">
            <RotateCcw size={15} />
            {isAr ? "ابدأ الاختبار" : "Start Assessment"}
          </Link>
        </div>
      )}

      {/* ── Footer actions ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={`/${locale}/dashboard`}
          className="glow-button-secondary font-mono px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <LayoutDashboard size={15} />
          {isAr ? "لوحة التحكم" : "Dashboard"}
        </Link>
        <Link href={`/${locale}/language`}
          className="font-mono px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm"
          style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "بوابة اللغة" : "Language Portal"} <Arrow size={14} />
        </Link>
      </div>

    </div>
  );
}
