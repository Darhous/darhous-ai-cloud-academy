"use client";

import { useState, useCallback } from "react";
import { Loader2, Copy, Check, Save, Zap, AlertCircle } from "lucide-react";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";

interface Props {
  locale: string;
}

const taskTypes = [
  { id: "website",    labelAr: "بناء موقع ويب",      labelEn: "Build Website",      icon: "🌐" },
  { id: "dashboard",  labelAr: "بناء لوحة تحكم",     labelEn: "Build Dashboard",    icon: "📊" },
  { id: "api",        labelAr: "بناء API",            labelEn: "Build API",          icon: "🔌" },
  { id: "saas",       labelAr: "بناء SaaS",          labelEn: "Build SaaS",         icon: "🚀" },
  { id: "ai-app",     labelAr: "تطبيق AI",           labelEn: "Build AI Assistant", icon: "🤖" },
  { id: "fix-bugs",   labelAr: "إصلاح أخطاء",        labelEn: "Fix Bugs",           icon: "🔧" },
  { id: "ui-polish",  labelAr: "تحسين UI",           labelEn: "UI Polish",          icon: "🎨" },
  { id: "deploy",     labelAr: "نشر وDeployment",    labelEn: "Deployment",         icon: "⚙️" },
  { id: "docs",       labelAr: "توثيق",              labelEn: "Documentation",      icon: "📝" },
];

const stackOptions = [
  "Next.js", "React", "Tailwind CSS", "TypeScript", "Supabase",
  "Vercel", "Gemini API", "LocalStorage", "FastAPI", "Node.js",
  "Python", "PostgreSQL", "Docker",
];

const MAX_LEN = 4000;

export default function ClaudeCodeGeneratorClient({ locale }: Props) {
  const isAr = locale === "ar";
  const { save } = useSavedPrompts();

  const [taskType, setTaskType] = useState("website");
  const [selectedStack, setSelectedStack] = useState<string[]>(["Next.js", "TypeScript", "Tailwind CSS"]);
  const [projectIdea, setProjectIdea] = useState("");
  const [features, setFeatures] = useState("");
  const [designStyle, setDesignStyle] = useState("");
  const [constraints, setConstraints] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [missingKey, setMissingKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleStack(item: string) {
    setSelectedStack((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  }

  const selectedTaskLabel = taskTypes.find((t) => t.id === taskType);

  const handleGenerate = useCallback(async () => {
    if (!projectIdea.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setMissingKey(false);
    setSaved(false);

    const taskLabel = isAr ? selectedTaskLabel?.labelAr : selectedTaskLabel?.labelEn;

    const userMessage = isAr
      ? `أنشئ برومبت Claude Code احترافي وكامل للمهمة التالية:

نوع المهمة: ${taskLabel ?? taskType}
Stack التقني: ${selectedStack.join(", ")}
فكرة المشروع: ${projectIdea.trim()}
${features.trim() ? `الميزات المطلوبة: ${features.trim()}` : ""}
${designStyle.trim() ? `أسلوب التصميم: ${designStyle.trim()}` : ""}
${constraints.trim() ? `القيود والملاحظات: ${constraints.trim()}` : ""}

قدّم برومبت Claude Code جاهز للنسخ يشمل: الدور، الهدف، السياق، Stack، الميزات، متطلبات UI، قيود الأمان، الملفات المطلوب إنشاؤها، التحقق، وتعليمات البناء.`
      : `Create a complete, professional Claude Code prompt for the following:

Task Type: ${taskLabel ?? taskType}
Tech Stack: ${selectedStack.join(", ")}
Project Idea: ${projectIdea.trim()}
${features.trim() ? `Required Features: ${features.trim()}` : ""}
${designStyle.trim() ? `Design Style: ${designStyle.trim()}` : ""}
${constraints.trim() ? `Constraints/Notes: ${constraints.trim()}` : ""}

Provide a copy-ready Claude Code prompt including: Role, Goal, Context, Stack, Features, UI requirements, Security constraints, Files to create, Validation, and build instructions.`;

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          mode: "claude_code",
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
  }, [taskType, selectedStack, projectIdea, features, designStyle, constraints, isAr, locale, loading, selectedTaskLabel]);

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
    const taskLabel = isAr ? selectedTaskLabel?.labelAr : selectedTaskLabel?.labelEn;
    save({
      title: isAr
        ? `برومبت Claude Code — ${taskLabel ?? taskType}`
        : `Claude Code Prompt — ${taskLabel ?? taskType}`,
      content: result,
      category: taskLabel ?? taskType,
      source: "claude-generator",
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
            background: "rgba(208,188,255,0.08)",
            border: "1px solid rgba(208,188,255,0.2)",
            color: "var(--color-secondary)",
          }}
        >
          <Zap size={12} />
          Claude Code · Anthropic CLI
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">
            {isAr ? "🛠️ مولّد برومبت Claude Code" : "🛠️ Claude Code Prompt Generator"}
          </span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "أنشئ برومبتات احترافية لـ Claude Code — جاهزة للنسخ والاستخدام المباشر"
            : "Generate professional Claude Code prompts — ready to copy and use immediately"}
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Type */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-xs tracking-wider uppercase" style={{ color: "var(--color-primary)" }}>
            {isAr ? "نوع المهمة" : "Task Type"}
          </label>
          <div className="flex flex-col gap-1.5">
            {taskTypes.map((type) => {
              const active = taskType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setTaskType(type.id)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-start transition-all"
                  style={{
                    background: active ? "rgba(142,213,255,0.10)" : "var(--color-surface-container)",
                    border: active ? "1px solid rgba(142,213,255,0.28)" : "1px solid var(--color-outline-variant)",
                    color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span>{type.icon}</span>
                  <span>{isAr ? type.labelAr : type.labelEn}</span>
                  {active && <span className="ms-auto text-xs opacity-60">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stack + Details */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Stack selector */}
          <div>
            <label className="font-mono text-xs tracking-wider uppercase mb-3 block" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "Stack التقني (اختر كل ما ينطبق)" : "Tech Stack (select all that apply)"}
            </label>
            <div className="flex flex-wrap gap-2">
              {stackOptions.map((item) => {
                const active = selectedStack.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleStack(item)}
                    className="px-3 py-1.5 rounded-full text-xs font-mono transition-all"
                    style={{
                      background: active ? "rgba(60,224,251,0.12)" : "var(--color-surface-container)",
                      border: active ? "1px solid rgba(60,224,251,0.35)" : "1px solid var(--color-outline-variant)",
                      color: active ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                    }}
                  >
                    {active && "✓ "}{item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project fields */}
          {[
            {
              key: "idea",
              labelAr: "فكرة المشروع *",
              labelEn: "Project Idea *",
              value: projectIdea,
              onChange: setProjectIdea,
              placeholder: isAr
                ? "منصة تعليمية مع AI Mentor وقاعدة بيانات..."
                : "Educational platform with AI Mentor and database...",
              rows: 3,
              required: true,
            },
            {
              key: "features",
              labelAr: "الميزات المطلوبة",
              labelEn: "Required Features",
              value: features,
              onChange: setFeatures,
              placeholder: isAr
                ? "تسجيل دخول، لوحة تحكم، chatbot، dark mode..."
                : "Auth, dashboard, chatbot, dark mode, search...",
              rows: 2,
              required: false,
            },
            {
              key: "design",
              labelAr: "أسلوب التصميم",
              labelEn: "Design Style",
              value: designStyle,
              onChange: setDesignStyle,
              placeholder: isAr
                ? "Glass morphism، dark theme، RTL/LTR، تدرجات لونية..."
                : "Glass morphism, dark theme, RTL/LTR, gradients...",
              rows: 2,
              required: false,
            },
            {
              key: "constraints",
              labelAr: "القيود والملاحظات",
              labelEn: "Constraints & Notes",
              value: constraints,
              onChange: setConstraints,
              placeholder: isAr
                ? "لا تضف backend، لا تستخدم NEXT_PUBLIC للـ API keys..."
                : "No backend, no NEXT_PUBLIC for API keys, keep it simple...",
              rows: 2,
              required: false,
            },
          ].map((field) => (
            <div key={field.key}>
              <label
                className="font-mono text-xs tracking-wider uppercase mb-2 block"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {isAr ? field.labelAr : field.labelEn}
              </label>
              <textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value.slice(0, MAX_LEN))}
                placeholder={field.placeholder}
                rows={field.rows}
                className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-colors"
                style={{
                  background: "var(--color-surface-container)",
                  border: field.required && !field.value.trim()
                    ? "1px solid rgba(255,100,100,0.3)"
                    : "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
              />
            </div>
          ))}

          <button
            onClick={handleGenerate}
            disabled={!projectIdea.trim() || loading}
            className="glow-button-primary text-white font-mono text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isAr ? "جارٍ الإنشاء..." : "Generating..."}
              </>
            ) : (
              <>
                <Zap size={16} />
                {isAr ? "ولّد برومبت Claude Code" : "Generate Claude Code Prompt"}
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
          style={{ border: "1px solid rgba(208,188,255,0.2)", background: "var(--color-surface-container)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-secondary)" }} />
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "برومبت Claude Code الجاهز" : "Ready-to-Use Claude Code Prompt"}
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
              className="text-sm leading-relaxed whitespace-pre-wrap font-mono"
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
