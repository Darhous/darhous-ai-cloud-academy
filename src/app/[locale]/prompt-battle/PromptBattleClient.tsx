"use client";

import { useState } from "react";
import { Swords, Loader2, Copy, Check, Trophy, TrendingUp } from "lucide-react";

interface BattleAnalysis {
  winner: "a" | "b" | "tie";
  scores: { a: number; b: number };
  breakdown: {
    clarity: { a: number; b: number };
    context: { a: number; b: number };
    constraints: { a: number; b: number };
    outputFormat: { a: number; b: number };
    safety: { a: number; b: number };
  };
  reasoning: { ar: string; en: string };
  winnerPrompt: string;
  improvedWinner: string;
}

function CopyBtn({ text, isAr }: { text: string; isAr: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg transition-all" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {isAr ? "نسخ" : "Copy"}
    </button>
  );
}

export default function PromptBattleClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [promptA, setPromptA] = useState("");
  const [promptB, setPromptB] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<BattleAnalysis | null>(null);
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  async function battle() {
    if (!promptA.trim() || !promptB.trim()) return;
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const res = await fetch("/api/prompt-battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptA, promptB }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? (isAr ? "حدث خطأ" : "An error occurred")); return; }
      setAnalysis(data.analysis);
      setSource(data.source);
    } catch { setError(isAr ? "حدث خطأ في الاتصال" : "Connection error"); }
    finally { setLoading(false); }
  }

  const criteriaLabels: Record<string, { ar: string; en: string }> = {
    clarity: { ar: "الوضوح", en: "Clarity" },
    context: { ar: "السياق", en: "Context" },
    constraints: { ar: "القيود", en: "Constraints" },
    outputFormat: { ar: "صيغة الإخراج", en: "Output Format" },
    safety: { ar: "السلامة", en: "Safety" },
  };

  const winnerColor = analysis?.winner === "a" ? "var(--color-primary)" : analysis?.winner === "b" ? "#a78bfa" : "#fbbf24";

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
          <Swords size={12} /> {isAr ? "معركة البرومبتات" : "Prompt Battle"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "أيّ البرومبتين أفضل؟" : "Which Prompt Wins?"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "أدخل برومبتين وشاهد أيهما أكثر فاعلية — تحليل AI شامل لكل معيار" : "Enter two prompts and see which is more effective — comprehensive AI analysis across every criteria"}
        </p>
      </div>

      {/* Prompt inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        {[
          { label: isAr ? "البرومبت الأول 🅐" : "Prompt A 🅐", value: promptA, set: setPromptA, color: "var(--color-primary)" },
          { label: isAr ? "البرومبت الثاني 🅑" : "Prompt B 🅑", value: promptB, set: setPromptB, color: "#a78bfa" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <label className="text-sm font-mono font-semibold" style={{ color: item.color }}>{item.label}</label>
            <textarea
              value={item.value}
              onChange={(e) => item.set(e.target.value)}
              placeholder={isAr ? "اكتب برومبتك هنا..." : "Write your prompt here..."}
              rows={6}
              maxLength={2000}
              className="w-full rounded-2xl p-4 text-sm outline-none resize-none transition-all"
              style={{
                background: "var(--color-surface-container)",
                border: `1px solid ${item.color}30`,
                color: "var(--color-on-surface)",
              }}
              dir={isAr ? "rtl" : "ltr"}
            />
            <p className="text-xs text-end" style={{ color: "var(--color-on-surface-variant)" }}>{item.value.length}/2000</p>
          </div>
        ))}
      </div>

      {/* Battle button */}
      <div className="flex justify-center">
        <button
          onClick={battle}
          disabled={loading || !promptA.trim() || !promptB.trim()}
          className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Swords size={16} />}
          {isAr ? "ابدأ المعركة" : "Start Battle"}
        </button>
      </div>

      {error && <p className="text-center text-sm text-red-400">{error}</p>}

      {/* Results */}
      {analysis && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          {/* Winner banner */}
          <div className="rounded-3xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${winnerColor}15, ${winnerColor}08)`, border: `1px solid ${winnerColor}30` }}>
            <Trophy size={40} className="mx-auto mb-2" style={{ color: winnerColor }} />
            <p className="font-bold text-xl font-display" style={{ color: "var(--color-on-surface)" }}>
              {analysis.winner === "tie"
                ? (isAr ? "تعادل! كلاهما متكافئان" : "Tie! Both are equal")
                : (isAr ? `البرومبت ${analysis.winner === "a" ? "الأول" : "الثاني"} يفوز!` : `Prompt ${analysis.winner === "a" ? "A" : "B"} Wins!`)}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? analysis.reasoning.ar : analysis.reasoning.en}
            </p>
            <div className="flex justify-center gap-8 mt-4">
              {(["a", "b"] as const).map((k) => (
                <div key={k} className="text-center">
                  <p className="font-bold text-2xl font-mono" style={{ color: k === analysis.winner ? winnerColor : "var(--color-on-surface-variant)" }}>
                    {analysis.scores[k]}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                    {k === "a" ? (isAr ? "الأول" : "A") : (isAr ? "الثاني" : "B")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Criteria breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} style={{ color: "var(--color-primary)" }} />
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "تفصيل المعايير" : "Criteria Breakdown"}
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(analysis.breakdown).map(([key, scores]) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? criteriaLabels[key]?.ar : criteriaLabels[key]?.en}</span>
                    <span className="font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{scores.a} vs {scores.b}</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="flex-1 rounded-full overflow-hidden" style={{ background: "rgba(142,213,255,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${(scores.a / 20) * 100}%`, background: "var(--color-primary)" }} />
                    </div>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ background: "rgba(167,139,250,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${(scores.b / 20) * 100}%`, background: "#a78bfa" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improved prompt */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "النسخة المحسّنة من الفائز" : "Improved Winner"}
              </h3>
              <CopyBtn text={analysis.improvedWinner} isAr={isAr} />
            </div>
            <p className="text-sm leading-relaxed p-3 rounded-xl" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }} dir={isAr ? "rtl" : "ltr"}>
              {analysis.improvedWinner}
            </p>
            {source === "local" && (
              <p className="text-xs mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "* تحليل محلي — أضف GEMINI_API_KEY لتحليل AI أعمق" : "* Local analysis — add GEMINI_API_KEY for deeper AI analysis"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
