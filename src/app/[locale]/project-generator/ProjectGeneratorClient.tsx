"use client";

import { useState } from "react";
import { Rocket, Loader2, Copy, Check, ExternalLink } from "lucide-react";

interface ProjectIdea {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: string[];
  stack: string[];
  steps: string[];
  claudeCodePrompt: string;
  deploymentChecklist: string[];
  estimatedTime: string;
}

function CopyBtn({ text, isAr }: { text: string; isAr: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {isAr ? "نسخ" : "Copy"}
    </button>
  );
}

const levels = [
  { id: "beginner", ar: "مبتدئ", en: "Beginner" },
  { id: "intermediate", ar: "متوسط", en: "Intermediate" },
  { id: "advanced", ar: "متقدم", en: "Advanced" },
];

const stacks = [
  { id: "Next.js", label: "Next.js" },
  { id: "Python", label: "Python" },
  { id: "React Native", label: "React Native" },
  { id: "FastAPI", label: "FastAPI" },
  { id: "any", ar: "أي لغة", en: "Any Stack" },
];

const times = [
  { id: "1-2 hours", ar: "1-2 ساعة", en: "1-2 hours" },
  { id: "1 day", ar: "يوم واحد", en: "1 day" },
  { id: "1 week", ar: "أسبوع", en: "1 week" },
  { id: "1 month", ar: "شهر", en: "1 month" },
];

export default function ProjectGeneratorClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("");
  const [stack, setStack] = useState("any");
  const [time, setTime] = useState("1 day");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectIdea | null>(null);
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    if (!goal.trim()) return;
    setLoading(true);
    setError("");
    setProject(null);
    try {
      const res = await fetch("/api/project-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, goal, stack, timeAvailable: time, interests }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? (isAr ? "حدث خطأ" : "An error occurred")); return; }
      setProject(data.project);
      setSource(data.source);
    } catch { setError(isAr ? "حدث خطأ في الاتصال" : "Connection error"); }
    finally { setLoading(false); }
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
          <Rocket size={12} /> {isAr ? "مولّد مشاريع AI" : "AI Project Generator"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "ابنِ مشروعك القادم" : "Build Your Next Project"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "أخبرنا عن مستواك وهدفك واحصل على فكرة مشروع AI مخصصة مع كل ما تحتاجه" : "Tell us your level and goal, get a custom AI project idea with everything you need"}
        </p>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto w-full flex flex-col gap-5">
        {/* Level */}
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "مستواك" : "Your level"}
          </label>
          <div className="flex gap-2">
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className="flex-1 py-2 text-xs font-mono rounded-xl transition-all"
                style={{
                  background: level === l.id ? "var(--color-primary)" : "var(--color-surface-container)",
                  color: level === l.id ? "#fff" : "var(--color-on-surface-variant)",
                }}
              >
                {isAr ? l.ar : l.en}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "ما الذي تريد بناؤه أو تعلمه؟" : "What do you want to build or learn?"}
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder={isAr ? "مثال: أريد بناء أداة تلخّص اجتماعاتي تلقائياً..." : "e.g., I want to build a tool that automatically summarizes my meetings..."}
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none"
            style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            dir={isAr ? "rtl" : "ltr"}
          />
        </div>

        {/* Stack */}
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "تقنياتك المفضلة" : "Preferred stack"}
          </label>
          <div className="flex flex-wrap gap-2">
            {stacks.map((s) => (
              <button
                key={s.id}
                onClick={() => setStack(s.id)}
                className="px-3 py-1.5 text-xs font-mono rounded-xl transition-all"
                style={{
                  background: stack === s.id ? "var(--color-secondary)" : "var(--color-surface-container)",
                  color: stack === s.id ? "#fff" : "var(--color-on-surface-variant)",
                }}
              >
                {isAr && "ar" in s ? s.ar : "en" in s ? s.en : s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الوقت المتاح" : "Time available"}
          </label>
          <div className="flex flex-wrap gap-2">
            {times.map((t) => (
              <button
                key={t.id}
                onClick={() => setTime(t.id)}
                className="px-3 py-1.5 text-xs font-mono rounded-xl transition-all"
                style={{
                  background: time === t.id ? "var(--color-tertiary)" : "var(--color-surface-container)",
                  color: time === t.id ? "#fff" : "var(--color-on-surface-variant)",
                }}
              >
                {isAr ? t.ar : t.en}
              </button>
            ))}
          </div>
        </div>

        {/* Interests (optional) */}
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder={isAr ? "اهتماماتك (اختياري): مثل AI، تعليم، صحة..." : "Interests (optional): e.g., AI, education, health..."}
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
          dir={isAr ? "rtl" : "ltr"}
        />

        <button
          onClick={generate}
          disabled={loading || !goal.trim()}
          className="glow-button-primary text-white font-mono py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
          {isAr ? "ولّد الفكرة" : "Generate Idea"}
        </button>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      </div>

      {/* Result */}
      {project && (
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
          {/* Title card */}
          <div className="rounded-3xl p-8" style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(0,102,138,0.08))", border: "1px solid rgba(74,222,128,0.2)" }}>
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? project.title.ar : project.title.en}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? project.description.ar : project.description.en}
            </p>
            <p className="text-xs font-mono mt-3" style={{ color: "#fbbf24" }}>
              ⏱ {project.estimatedTime}
              {source === "local" && ` · ${isAr ? "نتيجة محلية" : "Local result"}`}
            </p>
          </div>

          {/* Stack */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "var(--color-primary)" }}>
              {isAr ? "التقنيات المقترحة" : "Suggested Stack"}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "var(--color-secondary)" }}>
              {isAr ? "الميزات الأساسية" : "Core Features"}
            </p>
            <div className="flex flex-col gap-1.5">
              {project.features.map((f) => (
                <p key={f} className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>✨ {f}</p>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "#4ade80" }}>
              {isAr ? "خطوات التنفيذ" : "Implementation Steps"}
            </p>
            <div className="flex flex-col gap-2">
              {project.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>{i + 1}</span>
                  <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Claude Code prompt */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-mono font-bold" style={{ color: "#fbbf24" }}>
                🛠️ {isAr ? "برومبت Claude Code" : "Claude Code Prompt"}
              </p>
              <CopyBtn text={project.claudeCodePrompt} isAr={isAr} />
            </div>
            <p className="text-xs leading-relaxed p-3 rounded-xl font-mono" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }} dir="ltr">
              {project.claudeCodePrompt}
            </p>
            <div className="mt-2">
              <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--color-primary)" }}>
                {isAr ? "افتح Claude" : "Open Claude"} <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Deployment checklist */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "#a78bfa" }}>
              {isAr ? "قائمة النشر" : "Deployment Checklist"}
            </p>
            <div className="flex flex-col gap-1.5">
              {project.deploymentChecklist.map((item) => (
                <p key={item} className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>☁️ {item}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
