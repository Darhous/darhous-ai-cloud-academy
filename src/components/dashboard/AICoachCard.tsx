"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Sparkles, RefreshCw, ArrowRight, ArrowLeft, Copy, Check, Flame } from "lucide-react";

interface CoachRec {
  dailyTip: { ar: string; en: string };
  nextLesson: { ar: string; en: string; href: string };
  suggestedProject: { ar: string; en: string; href: string };
  promptToTry: { ar: string; en: string };
  streakMessage: { ar: string; en: string };
}

export default function AICoachCard({ locale, streak }: { locale: string; streak: number }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [rec, setRec] = useState<CoachRec | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [source, setSource] = useState("");

  async function fetchCoach() {
    setLoading(true);
    try {
      const res = await fetch("/api/coach");
      if (res.ok) {
        const data = await res.json();
        setRec(data.recommendation);
        setSource(data.source);
      }
    } catch {
      // Fail silently — coach is bonus, not critical
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoach();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function copyPrompt() {
    if (!rec) return;
    navigator.clipboard.writeText(isAr ? rec.promptToTry.ar : rec.promptToTry.en);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="rounded-3xl p-6 md:p-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(87,27,193,0.18) 0%, rgba(0,102,138,0.12) 100%)",
        border: "1px solid rgba(167,139,250,0.2)",
      }}
    >
      {/* Ambient orb */}
      <div
        className="absolute -top-10 -end-10 w-32 h-32 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.6), transparent 70%)", filter: "blur(20px)" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
              <Brain size={18} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "مرشدك الذكي اليومي" : "Your Daily AI Coach"}
              </p>
              {source === "ai" && (
                <p className="text-[10px] font-mono" style={{ color: "#a78bfa" }}>✨ Gemini-powered</p>
              )}
            </div>
          </div>
          <button
            onClick={fetchCoach}
            disabled={loading}
            className="p-2 rounded-xl transition-all hover:opacity-70"
            style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}
            title={isAr ? "تحديث" : "Refresh"}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && !rec ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 rounded-full animate-pulse" style={{ background: "rgba(167,139,250,0.1)", width: i === 3 ? "60%" : "100%" }} />
            ))}
          </div>
        ) : rec ? (
          <div className="flex flex-col gap-4">
            {/* Streak message */}
            {streak > 0 && (
              <div className="flex items-center gap-2">
                <Flame size={14} style={{ color: "#f97316" }} />
                <p className="text-xs font-mono" style={{ color: "#f97316" }}>
                  {isAr ? rec.streakMessage.ar : rec.streakMessage.en}
                </p>
              </div>
            )}

            {/* Daily tip */}
            <div className="p-3 rounded-2xl" style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.12)" }}>
              <p className="text-[10px] font-mono font-bold mb-1.5" style={{ color: "#a78bfa" }}>
                💡 {isAr ? "نصيحة اليوم" : "Today's tip"}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? rec.dailyTip.ar : rec.dailyTip.en}
              </p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/${locale}${rec.nextLesson.href}`}
                className="p-3 rounded-xl hover:scale-105 transition-transform"
                style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.12)" }}
              >
                <p className="text-[10px] font-mono mb-1" style={{ color: "var(--color-primary)" }}>
                  📚 {isAr ? "الدرس التالي" : "Next lesson"}
                </p>
                <p className="text-xs" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? rec.nextLesson.ar : rec.nextLesson.en}
                </p>
                <Arrow size={10} className="mt-1" style={{ color: "var(--color-primary)" }} />
              </Link>

              <Link
                href={`/${locale}${rec.suggestedProject.href}`}
                className="p-3 rounded-xl hover:scale-105 transition-transform"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.12)" }}
              >
                <p className="text-[10px] font-mono mb-1" style={{ color: "#4ade80" }}>
                  🚀 {isAr ? "مشروع مقترح" : "Suggested project"}
                </p>
                <p className="text-xs" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? rec.suggestedProject.ar : rec.suggestedProject.en}
                </p>
                <Arrow size={10} className="mt-1" style={{ color: "#4ade80" }} />
              </Link>
            </div>

            {/* Prompt to try */}
            <div className="p-3 rounded-xl" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.12)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-mono font-bold" style={{ color: "#fbbf24" }}>
                  <Sparkles size={10} className="inline me-1" />
                  {isAr ? "برومبت للتجربة" : "Prompt to try"}
                </p>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg"
                  style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}
                >
                  {copied ? <Check size={9} /> : <Copy size={9} />}
                  {isAr ? "نسخ" : "Copy"}
                </button>
              </div>
              <p className="text-xs leading-relaxed italic" style={{ color: "var(--color-on-surface-variant)" }} dir="ltr">
                {isAr ? rec.promptToTry.ar : rec.promptToTry.en}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-center py-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "تعذّر تحميل التوصيات" : "Could not load recommendations"}
          </p>
        )}
      </div>
    </div>
  );
}
