"use client";

import { useState } from "react";
import { Zap, Loader2, Copy, Check, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface ScoreResult {
  score: number;
  criteria: Record<string, number>;
  missing: string[];
  strengths: string[];
  improvedPrompt: string;
  summary: { ar: string; en: string };
}

const criteriaLabels: Record<string, { ar: string; en: string; max: number }> = {
  role:         { ar: "الدور (أنت خبير في...)", en: "Role (You are an expert in...)", max: 15 },
  task:         { ar: "المهمة المحددة", en: "Specific Task", max: 15 },
  context:      { ar: "السياق والخلفية", en: "Context & Background", max: 15 },
  constraints:  { ar: "القيود والحدود", en: "Constraints & Limits", max: 15 },
  outputFormat: { ar: "صيغة الإخراج", en: "Output Format", max: 15 },
  examples:     { ar: "الأمثلة", en: "Examples", max: 15 },
  safety:       { ar: "السلامة", en: "Safety", max: 10 },
};

function CopyBtn({ text, isAr }: { text: string; isAr: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg transition-all" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {isAr ? "نسخ" : "Copy"}
    </button>
  );
}

function scoreColor(s: number) {
  return s >= 80 ? "#4ade80" : s >= 60 ? "#fbbf24" : "#ef4444";
}

export default function PromptScoreClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  async function score() {
    if (!prompt.trim() || prompt.trim().length < 5) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/prompt-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? (isAr ? "حدث خطأ" : "An error occurred")); return; }
      setResult(data.result);
      setSource(data.source);
    } catch { setError(isAr ? "حدث خطأ في الاتصال" : "Connection error"); }
    finally { setLoading(false); }
  }

  const missingLabels: Record<string, { ar: string; en: string }> = {
    role:          { ar: "الدور", en: "role" },
    context:       { ar: "السياق", en: "context" },
    constraints:   { ar: "القيود", en: "constraints" },
    "output format": { ar: "صيغة الإخراج", en: "output format" },
    examples:      { ar: "أمثلة", en: "examples" },
  };

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
          <Zap size={12} /> {isAr ? "تقييم البرومبت" : "Prompt Score"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "قيّم برومبتك" : "Score Your Prompt"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "احصل على تقييم شامل لبرومبتك من 100 مع تحسين فوري" : "Get a comprehensive score out of 100 with instant improvement suggestions"}
        </p>
      </div>

      {/* Criteria guide */}
      <div className="max-w-2xl mx-auto w-full glass-card rounded-2xl p-5">
        <p className="text-xs font-mono font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
          {isAr ? "معايير التقييم:" : "Scoring criteria:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(criteriaLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              <span className="font-mono font-bold" style={{ color: "var(--color-primary)" }}>{label.max}</span>
              {isAr ? label.ar : label.en}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={isAr ? "اكتب برومبتك هنا للتقييم..." : "Write your prompt here for scoring..."}
          rows={7}
          maxLength={3000}
          className="w-full rounded-2xl p-4 text-sm outline-none resize-none transition-all"
          style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
          dir={isAr ? "rtl" : "ltr"}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{prompt.length}/3000</p>
          <button
            onClick={score}
            disabled={loading || prompt.trim().length < 5}
            className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            {isAr ? "قيّم الآن" : "Score Now"}
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
          {/* Score ring */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={scoreColor(result.score)} strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 339.3} 339.3`}
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-bold text-3xl font-mono" style={{ color: scoreColor(result.score) }}>{result.score}</p>
              </div>
            </div>
            <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? result.summary.ar : result.summary.en}
            </p>
            {source === "local" && (
              <p className="text-xs mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "* تحليل محلي — أضف GEMINI_API_KEY للحصول على تحليل AI" : "* Local analysis — add GEMINI_API_KEY for AI scoring"}
              </p>
            )}
          </div>

          {/* Criteria bars */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} style={{ color: "var(--color-primary)" }} />
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "تفصيل التقييم" : "Score Breakdown"}
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(result.criteria).map(([key, score]) => {
                const maxScore = criteriaLabels[key]?.max ?? 15;
                const pct = Math.round((score / maxScore) * 100);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? criteriaLabels[key]?.ar : criteriaLabels[key]?.en}</span>
                      <span className="font-mono font-bold" style={{ color: scoreColor(pct) }}>{score}/{maxScore}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: scoreColor(pct) }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Missing + Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.missing.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} style={{ color: "#ef4444" }} />
                  <h3 className="text-sm font-bold" style={{ color: "#ef4444" }}>{isAr ? "مفقود" : "Missing"}</h3>
                </div>
                <div className="flex flex-col gap-1.5">
                  {result.missing.map((m) => (
                    <p key={m} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      • {isAr ? missingLabels[m]?.ar ?? m : m}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {result.strengths.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={14} style={{ color: "#4ade80" }} />
                  <h3 className="text-sm font-bold" style={{ color: "#4ade80" }}>{isAr ? "نقاط القوة" : "Strengths"}</h3>
                </div>
                <div className="flex flex-col gap-1.5">
                  {result.strengths.map((s) => (
                    <p key={s} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      ✓ {isAr ? criteriaLabels[s]?.ar ?? s : criteriaLabels[s]?.en ?? s}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Improved prompt */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "البرومبت المحسّن" : "Improved Prompt"}
              </h3>
              <CopyBtn text={result.improvedPrompt} isAr={isAr} />
            </div>
            <p className="text-sm leading-relaxed p-3 rounded-xl" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", fontStyle: "italic" }} dir="ltr">
              {result.improvedPrompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
