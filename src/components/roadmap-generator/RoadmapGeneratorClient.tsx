"use client";

import { useState, useCallback } from "react";
import { Loader2, Copy, Check, Save, Map, AlertCircle } from "lucide-react";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";

interface Props {
  locale: string;
}

const currentLevels = [
  { id: "complete-beginner", labelAr: "مبتدئ تماماً (لا خبرة برمجية)", labelEn: "Complete Beginner (No coding)" },
  { id: "knows-coding",      labelAr: "أعرف البرمجة",                   labelEn: "I Know Programming" },
  { id: "knows-ai-basics",   labelAr: "أعرف أساسيات AI",               labelEn: "I Know AI Basics" },
];

const goals = [
  { id: "ai-engineer",   labelAr: "AI Engineer",        labelEn: "AI Engineer",         icon: "🤖" },
  { id: "ml-engineer",   labelAr: "ML Engineer",        labelEn: "ML Engineer",         icon: "🧠" },
  { id: "data-scientist",labelAr: "Data Scientist",     labelEn: "Data Scientist",      icon: "📊" },
  { id: "cloud-architect",labelAr: "Cloud Architect",   labelEn: "Cloud Architect",     icon: "☁️" },
  { id: "prompt-engineer",labelAr: "Prompt Engineer",   labelEn: "Prompt Engineer",     icon: "✍️" },
  { id: "devops-ai",     labelAr: "DevOps AI",          labelEn: "DevOps AI",           icon: "⚙️" },
];

const timeOptions = [
  { id: "1h",   labelAr: "ساعة / أسبوع",      labelEn: "1 hr/week" },
  { id: "2h",   labelAr: "2 ساعات / أسبوع",   labelEn: "2 hrs/week" },
  { id: "4h",   labelAr: "4 ساعات / أسبوع",   labelEn: "4 hrs/week" },
  { id: "7h+",  labelAr: "7+ ساعات / أسبوع",  labelEn: "7+ hrs/week" },
];

const durations = [
  { id: "7d",  labelAr: "7 أيام",  labelEn: "7 Days" },
  { id: "30d", labelAr: "شهر",     labelEn: "1 Month" },
  { id: "60d", labelAr: "60 يوم",  labelEn: "60 Days" },
  { id: "90d", labelAr: "90 يوم",  labelEn: "90 Days" },
];

const focusOptions = [
  { id: "ai-basics",         labelAr: "أساسيات AI",          labelEn: "AI Basics",          icon: "🧪" },
  { id: "claude",            labelAr: "Claude وAnthropic",   labelEn: "Claude & Anthropic",  icon: "🤖" },
  { id: "prompt-engineering",labelAr: "Prompt Engineering",  labelEn: "Prompt Engineering",  icon: "✍️" },
  { id: "cloud",             labelAr: "الكلاود",             labelEn: "Cloud",               icon: "☁️" },
  { id: "mlops",             labelAr: "MLOps",               labelEn: "MLOps",               icon: "⚙️" },
  { id: "ai-tools",          labelAr: "أدوات AI",            labelEn: "AI Tools",            icon: "🛠️" },
  { id: "ai-projects",       labelAr: "مشاريع AI عملية",    labelEn: "AI Projects",         icon: "🚀" },
  { id: "career",            labelAr: "مسار مهني",           labelEn: "Career Path",         icon: "🎯" },
];

export default function RoadmapGeneratorClient({ locale }: Props) {
  const isAr = locale === "ar";
  const { save } = useSavedPrompts();

  const [currentLevel, setCurrentLevel] = useState("complete-beginner");
  const [goal, setGoal] = useState("ai-engineer");
  const [timePerWeek, setTimePerWeek] = useState("4h");
  const [duration, setDuration] = useState("30d");
  const [focus, setFocus] = useState<string[]>(["ai-basics"]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [missingKey, setMissingKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleFocus(id: string) {
    setFocus((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const handleGenerate = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setMissingKey(false);
    setSaved(false);

    const goalLabel = goals.find((g) => g.id === goal);
    const levelLabel = currentLevels.find((l) => l.id === currentLevel);
    const timeLabel = timeOptions.find((t) => t.id === timePerWeek);
    const durationLabel = durations.find((d) => d.id === duration);
    const focusLabels = focus
      .map((f) => focusOptions.find((fo) => fo.id === f))
      .filter(Boolean)
      .map((f) => isAr ? f!.labelAr : f!.labelEn)
      .join(", ");

    const userMessage = isAr
      ? `أنشئ خطة تعلم مخصصة بناءً على المعطيات التالية:

المستوى الحالي: ${levelLabel?.labelAr ?? currentLevel}
الهدف المهني: ${goalLabel?.labelAr ?? goal}
الوقت المتاح: ${timeLabel?.labelAr ?? timePerWeek}
المدة الزمنية: ${durationLabel?.labelAr ?? duration}
التركيز: ${focusLabels || "عام"}

أعطني خطة تعلم منظمة ومفصلة وقابلة للتنفيذ بمراحل واضحة وموارد من أكاديمية درهوس ومشاريع تطبيقية.`
      : `Create a personalized learning roadmap based on:

Current Level: ${levelLabel?.labelEn ?? currentLevel}
Career Goal: ${goalLabel?.labelEn ?? goal}
Available Time: ${timeLabel?.labelEn ?? timePerWeek}
Duration: ${durationLabel?.labelEn ?? duration}
Focus Areas: ${focusLabels || "General"}

Provide a structured, detailed, executable learning plan with clear phases, Darhous Academy resources, and practical projects.`;

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          mode: "path",
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
  }, [currentLevel, goal, timePerWeek, duration, focus, isAr, locale, loading]);

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
    const goalLabel = goals.find((g) => g.id === goal);
    save({
      title: isAr
        ? `خطة تعلم — ${goalLabel?.labelAr ?? goal}`
        : `Learning Roadmap — ${goalLabel?.labelEn ?? goal}`,
      content: result,
      category: goalLabel?.labelEn ?? goal,
      source: "roadmap",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function renderSelector<T extends { id: string }>(
    items: T[],
    selected: string,
    onSelect: (id: string) => void,
    getLabelAr: (item: T) => string,
    getLabelEn: (item: T) => string,
    color: string
  ) {
    return (
      <div className="flex gap-2 flex-wrap">
        {items.map((item) => {
          const active = selected === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: active ? `${color}18` : "var(--color-surface-container)",
                border: active ? `1px solid ${color}45` : "1px solid var(--color-outline-variant)",
                color: active ? color : "var(--color-on-surface-variant)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {isAr ? getLabelAr(item) : getLabelEn(item)}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Hero */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-5"
          style={{
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            color: "#4ade80",
          }}
        >
          <Map size={12} />
          {isAr ? "خطة مخصصة بالذكاء الاصطناعي" : "AI-Personalized Learning Plan"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">
            {isAr ? "🗺️ مولّد خطط التعلم" : "🗺️ AI Roadmap Generator"}
          </span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "خطة تعلم شخصية ومنظمة في دقائق — مبنية على مستواك وهدفك ووقتك"
            : "A personalized, structured learning plan in minutes — built for your level, goal, and time"}
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-7">
          {/* Current Level */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-primary)" }}>
              {isAr ? "مستواك الحالي" : "Your Current Level"}
            </h3>
            <div className="flex flex-col gap-2">
              {currentLevels.map((lvl) => {
                const active = currentLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setCurrentLevel(lvl.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-start transition-all"
                    style={{
                      background: active ? "rgba(142,213,255,0.10)" : "var(--color-surface-container)",
                      border: active ? "1px solid rgba(142,213,255,0.28)" : "1px solid var(--color-outline-variant)",
                      color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{ borderColor: active ? "var(--color-primary)" : "var(--color-outline-variant)" }}>
                      {active && <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />}
                    </span>
                    {isAr ? lvl.labelAr : lvl.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "هدفك المهني" : "Your Career Goal"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {goals.map((g) => {
                const active = goal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-start transition-all"
                    style={{
                      background: active ? "rgba(60,224,251,0.10)" : "var(--color-surface-container)",
                      border: active ? "1px solid rgba(60,224,251,0.28)" : "1px solid var(--color-outline-variant)",
                      color: active ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <span>{g.icon}</span>
                    <span className="text-xs">{isAr ? g.labelAr : g.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          {/* Time */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-secondary)" }}>
              {isAr ? "الوقت المتاح أسبوعياً" : "Available Time per Week"}
            </h3>
            {renderSelector(
              timeOptions, timePerWeek, setTimePerWeek,
              (t) => t.labelAr, (t) => t.labelEn,
              "var(--color-secondary)"
            )}
          </div>

          {/* Duration */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-primary)" }}>
              {isAr ? "المدة الزمنية" : "Target Duration"}
            </h3>
            {renderSelector(
              durations, duration, setDuration,
              (d) => d.labelAr, (d) => d.labelEn,
              "var(--color-primary)"
            )}
          </div>

          {/* Focus */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "#4ade80" }}>
              {isAr ? "مجالات التركيز (متعدد)" : "Focus Areas (multi-select)"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map((fo) => {
                const active = focus.includes(fo.id);
                return (
                  <button
                    key={fo.id}
                    onClick={() => toggleFocus(fo.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: active ? "rgba(74,222,128,0.12)" : "var(--color-surface-container)",
                      border: active ? "1px solid rgba(74,222,128,0.3)" : "1px solid var(--color-outline-variant)",
                      color: active ? "#4ade80" : "var(--color-on-surface-variant)",
                    }}
                  >
                    <span>{fo.icon}</span>
                    <span>{isAr ? fo.labelAr : fo.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="glow-button-primary text-white font-mono text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isAr ? "جارٍ بناء الخطة..." : "Building your plan..."}
              </>
            ) : (
              <>
                <Map size={16} />
                {isAr ? "ولّد خطة التعلم" : "Generate Learning Roadmap"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Missing key */}
      {missingKey && (
        <div
          className="rounded-2xl p-6 flex items-start gap-4"
          style={{ background: "rgba(255,100,100,0.06)", border: "1px solid rgba(255,100,100,0.18)" }}
        >
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#ff7070" }} />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#ff7070" }}>
              {isAr ? "المساعد غير متاح" : "AI Unavailable"}
            </p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "أضف GEMINI_API_KEY إلى ملف .env.local وأعد تشغيل الخادم." : "Add GEMINI_API_KEY to .env.local and restart the server."}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !missingKey && (
        <div className="rounded-2xl p-4 text-sm text-center" style={{ background: "rgba(255,100,100,0.06)", border: "1px solid rgba(255,100,100,0.15)", color: "#ff7070" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(74,222,128,0.2)", background: "var(--color-surface-container)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "خطة التعلم المخصصة" : "Your Personalized Roadmap"}
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
          <div className="px-6 py-5">
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--color-on-surface)" }}
            >
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
