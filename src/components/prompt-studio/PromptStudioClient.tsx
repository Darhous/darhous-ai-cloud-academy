"use client";

import { useState, useCallback } from "react";
import { Loader2, Copy, Check, Save, Sparkles, AlertCircle } from "lucide-react";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";

interface Props {
  locale: string;
}

const promptTypes = [
  { id: "coding",     labelAr: "برمجة",        labelEn: "Coding",      icon: "💻" },
  { id: "business",   labelAr: "أعمال",        labelEn: "Business",    icon: "💼" },
  { id: "research",   labelAr: "بحث",          labelEn: "Research",    icon: "📚" },
  { id: "design",     labelAr: "تصميم",        labelEn: "Design",      icon: "🎨" },
  { id: "cloud",      labelAr: "كلاود",        labelEn: "Cloud",       icon: "☁️" },
  { id: "learning",   labelAr: "تعلم",         labelEn: "Learning",    icon: "🎓" },
  { id: "automation", labelAr: "أتمتة",        labelEn: "Automation",  icon: "⚡" },
  { id: "claude-code",labelAr: "Claude Code",  labelEn: "Claude Code", icon: "🛠️" },
];

const MAX_LEN = 4000;

export default function PromptStudioClient({ locale }: Props) {
  const isAr = locale === "ar";
  const { save } = useSavedPrompts();

  const [originalPrompt, setOriginalPrompt] = useState("");
  const [selectedType, setSelectedType] = useState("coding");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [missingKey, setMissingKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedTypeLabel = promptTypes.find((t) => t.id === selectedType);

  const handleImprove = useCallback(async () => {
    if (!originalPrompt.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setMissingKey(false);
    setSaved(false);

    const typeLabel = isAr
      ? (selectedTypeLabel?.labelAr ?? selectedType)
      : (selectedTypeLabel?.labelEn ?? selectedType);

    const userMessage = isAr
      ? `حسّن هذا البرومبت (النوع: ${typeLabel}):\n\n${originalPrompt.trim()}`
      : `Improve this prompt (Type: ${typeLabel}):\n\n${originalPrompt.trim()}`;

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          mode: "prompt",
          locale,
        }),
      });
      const data = await res.json();

      if (data.missingKey) {
        setMissingKey(true);
      } else if (data.reply) {
        setResult(data.reply);
      } else {
        setError(data.error ?? (isAr ? "حدث خطأ غير متوقع" : "Unexpected error"));
      }
    } catch {
      setError(isAr ? "تعذّر الاتصال بالخادم" : "Could not connect to server");
    } finally {
      setLoading(false);
    }
  }, [originalPrompt, selectedType, selectedTypeLabel, isAr, locale, loading]);

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function handleSave() {
    if (!result) return;
    const typeLabel = isAr
      ? (selectedTypeLabel?.labelAr ?? selectedType)
      : (selectedTypeLabel?.labelEn ?? selectedType);
    save({
      title: isAr
        ? `برومبت محسّن — ${typeLabel}`
        : `Improved Prompt — ${typeLabel}`,
      content: result,
      category: typeLabel,
      source: "prompt-studio",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Hero */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-5"
          style={{
            background: "rgba(142,213,255,0.08)",
            border: "1px solid rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          <Sparkles size={12} />
          {isAr ? "مدعوم بـ Gemini 2.5 Flash" : "Powered by Gemini 2.5 Flash"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">
            {isAr ? "⚡ استوديو البرومبتات" : "⚡ Prompt Studio"}
          </span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "حوّل أي برومبت ضعيف إلى برومبت احترافي جاهز للنسخ في ثوانٍ"
            : "Transform any weak prompt into a professional, copy-ready prompt in seconds"}
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Prompt input — 3 cols */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <label className="font-mono text-xs tracking-wider uppercase" style={{ color: "var(--color-primary)" }}>
            {isAr ? "برومبتك الأصلي" : "Your Original Prompt"}
          </label>
          <div className="relative">
            <textarea
              value={originalPrompt}
              onChange={(e) => setOriginalPrompt(e.target.value.slice(0, MAX_LEN))}
              placeholder={
                isAr
                  ? "اكتب أو الصق برومبتك هنا... مثال: اشرح لي machine learning"
                  : "Write or paste your prompt here... e.g. Explain machine learning to me"
              }
              rows={10}
              className="w-full rounded-2xl px-5 py-4 text-sm resize-none outline-none transition-colors"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                color: "var(--color-on-surface)",
                lineHeight: "1.7",
              }}
            />
            {originalPrompt.length > 3000 && (
              <span
                className="absolute bottom-3 end-3 text-xs font-mono"
                style={{ color: originalPrompt.length >= MAX_LEN ? "#ff7070" : "var(--color-on-surface-variant)" }}
              >
                {originalPrompt.length}/{MAX_LEN}
              </span>
            )}
          </div>

          <button
            onClick={handleImprove}
            disabled={!originalPrompt.trim() || loading}
            className="glow-button-primary text-white font-mono text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isAr ? "جارٍ التحسين..." : "Improving..."}
              </>
            ) : (
              <>
                <Sparkles size={16} />
                {isAr ? "حسّن البرومبت" : "Improve Prompt"}
              </>
            )}
          </button>
        </div>

        {/* Type selector — 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <label className="font-mono text-xs tracking-wider uppercase" style={{ color: "var(--color-tertiary)" }}>
            {isAr ? "نوع البرومبت" : "Prompt Type"}
          </label>
          <div className="flex flex-col gap-2">
            {promptTypes.map((type) => {
              const active = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-start transition-all duration-150"
                  style={{
                    background: active ? "rgba(142,213,255,0.10)" : "var(--color-surface-container)",
                    border: active ? "1px solid rgba(142,213,255,0.28)" : "1px solid var(--color-outline-variant)",
                    color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span className="text-base leading-none">{type.icon}</span>
                  <span>{isAr ? type.labelAr : type.labelEn}</span>
                  {active && (
                    <span className="ms-auto text-xs font-mono opacity-60">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Missing key state */}
      {missingKey && (
        <div
          className="rounded-2xl p-6 flex items-start gap-4"
          style={{
            background: "rgba(255,100,100,0.06)",
            border: "1px solid rgba(255,100,100,0.18)",
          }}
        >
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#ff7070" }} />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#ff7070" }}>
              {isAr ? "المساعد غير متاح" : "AI Unavailable"}
            </p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "أضف GEMINI_API_KEY إلى ملف .env.local وأعد تشغيل الخادم."
                : "Add GEMINI_API_KEY to .env.local and restart the server."}
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !missingKey && (
        <div
          className="rounded-2xl p-4 text-sm text-center"
          style={{
            background: "rgba(255,100,100,0.06)",
            border: "1px solid rgba(255,100,100,0.15)",
            color: "#ff7070",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(142,213,255,0.18)",
            background: "var(--color-surface-container)",
          }}
        >
          {/* Result header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-tertiary)" }}
              />
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "البرومبت المحسّن" : "Improved Prompt"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:opacity-80"
                style={{
                  background: saved ? "rgba(74,222,128,0.12)" : "var(--color-surface-container-high)",
                  border: "1px solid var(--color-outline-variant)",
                  color: saved ? "#4ade80" : "var(--color-on-surface-variant)",
                }}
              >
                <Save size={12} />
                {saved ? (isAr ? "تم الحفظ ✓" : "Saved ✓") : (isAr ? "حفظ" : "Save")}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:opacity-80"
                style={{
                  background: copied ? "rgba(142,213,255,0.12)" : "var(--color-surface-container-high)",
                  border: "1px solid var(--color-outline-variant)",
                  color: copied ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? (isAr ? "تم النسخ ✓" : "Copied ✓") : (isAr ? "نسخ" : "Copy")}
              </button>
            </div>
          </div>

          {/* Result content */}
          <div className="px-6 py-5">
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap font-mono"
              style={{ color: "var(--color-on-surface)" }}
            >
              {result}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div
        className="rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5"
        style={{
          background: "var(--color-surface-container)",
          border: "1px solid var(--color-outline-variant)",
        }}
      >
        {[
          { icon: "🎯", ar: "كن محدداً", en: "Be Specific", descAr: "كلما كان البرومبت الأصلي أوضح، كانت النتيجة أفضل", descEn: "The clearer your original prompt, the better the result" },
          { icon: "📋", ar: "اذكر السياق", en: "Add Context", descAr: "أخبر AI بالهدف والجمهور والمخرجات المتوقعة", descEn: "Tell the AI about the goal, audience, and expected output" },
          { icon: "🔄", ar: "جرّب أنواعاً مختلفة", en: "Try Different Types", descAr: "غيّر نوع البرومبت للحصول على تحسينات مختلفة", descEn: "Switch prompt types to get different improvements" },
        ].map((tip) => (
          <div key={tip.icon} className="flex items-start gap-3">
            <span className="text-xl">{tip.icon}</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? tip.ar : tip.en}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? tip.descAr : tip.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
