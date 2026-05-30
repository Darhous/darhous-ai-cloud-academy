"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Circle, Copy, Check, Rocket, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Project } from "@/data/projects";

interface Props { locale: string; project: Project; }

const BUILD_STEPS = [
  { id: "overview",   icon: "📋", labelAr: "نظرة عامة",    labelEn: "Overview" },
  { id: "requirements", icon: "📌", labelAr: "المتطلبات",   labelEn: "Requirements" },
  { id: "stack",      icon: "⚙️",  labelAr: "التقنيات",    labelEn: "Stack" },
  { id: "implement",  icon: "🛠️",  labelAr: "التنفيذ",     labelEn: "Implementation" },
  { id: "testing",    icon: "🧪",  labelAr: "الاختبار",    labelEn: "Testing" },
  { id: "deploy",     icon: "🚀",  labelAr: "النشر",       labelEn: "Deployment" },
  { id: "claude",     icon: "🤖",  labelAr: "Claude Code", labelEn: "Claude Code Prompt" },
  { id: "complete",   icon: "🎓",  labelAr: "الإنجاز",    labelEn: "Completion" },
];

function CopyBtn({ text, isAr }: { text: string; isAr: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {isAr ? "نسخ" : "Copy"}
    </button>
  );
}

export default function BuildProjectClient({ locale, project }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const { user, supabaseConfigured } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);

  // Load progress from Supabase
  useEffect(() => {
    if (!user || !supabaseConfigured) return;
    import("@/lib/supabase/client").then(({ createClient }) => {
      const s = createClient();
      if (!s) return;
      s.from("user_projects").select("current_step").eq("user_id", user.id).eq("project_slug", project.id).single()
        .then(({ data }) => {
          if (data) {
            setCurrentStep(data.current_step ?? 0);
            const completed = new Set<number>();
            for (let i = 0; i < (data.current_step ?? 0); i++) completed.add(i);
            setCompletedSteps(completed);
          }
        });
    });
  }, [user, supabaseConfigured, project.id]);

  async function saveProgress(step: number) {
    if (!user || !supabaseConfigured) return;
    setSaving(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const s = createClient();
      if (!s) return;
      await s.from("user_projects").upsert({
        user_id: user.id,
        project_slug: project.id,
        current_step: step,
        status: step >= BUILD_STEPS.length - 1 ? "completed" : "in_progress",
      });
    } finally { setSaving(false); }
  }

  function completeStep(i: number) {
    setCompletedSteps((prev) => new Set([...prev, i]));
    if (i + 1 < BUILD_STEPS.length) {
      setCurrentStep(i + 1);
      saveProgress(i + 1);
    }
  }

  const claudeCodePrompt = project.buildSteps
    ? `Build this project with me: ${isAr ? project.titleAr : project.titleEn}\n\n${isAr ? project.descriptionAr : project.descriptionEn}\n\nStack: ${project.stack?.join(", ")}\n\nPlease guide me step by step, starting with the project setup.`
    : `Build ${isAr ? project.titleAr : project.titleEn} with me. Stack: ${project.stack?.join(", ")}. ${isAr ? project.descriptionAr : project.descriptionEn}. Guide me from setup to deployment.`;

  const stepContent: Record<string, React.ReactNode> = {
    overview: (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? project.descriptionAr : project.descriptionEn}
        </p>
        {(project.goalAr ?? project.goalEn) && (
          <div className="p-4 rounded-xl" style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.15)" }}>
            <p className="text-xs font-mono font-bold mb-1" style={{ color: "var(--color-primary)" }}>{isAr ? "الهدف:" : "Goal:"}</p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? project.goalAr : project.goalEn}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-mono font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الصعوبة:" : "Difficulty:"}</p>
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: project.difficulty === "beginner" ? "rgba(74,222,128,0.15)" : project.difficulty === "intermediate" ? "rgba(251,191,36,0.15)" : "rgba(239,68,68,0.15)", color: project.difficulty === "beginner" ? "#4ade80" : project.difficulty === "intermediate" ? "#fbbf24" : "#ef4444" }}>
            {isAr ? (project.difficulty === "beginner" ? "مبتدئ" : project.difficulty === "intermediate" ? "متوسط" : "متقدم") : project.difficulty}
          </span>
        </div>
      </div>
    ),
    requirements: (
      <div className="flex flex-col gap-3">
        <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "ما تحتاجه قبل البدء:" : "What you need before starting:"}</p>
        {project.requiredTools?.length ? (
          project.requiredTools.map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}>
              <CheckCircle size={14} style={{ color: "#4ade80", flexShrink: 0 }} /> {t}
            </div>
          ))
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}><CheckCircle size={14} style={{ color: "#4ade80" }} /> Node.js + npm</div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}><CheckCircle size={14} style={{ color: "#4ade80" }} /> Git</div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}><CheckCircle size={14} style={{ color: "#4ade80" }} /> {isAr ? "حساب Vercel (مجاني)" : "Vercel account (free)"}</div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}><CheckCircle size={14} style={{ color: "#4ade80" }} /> Claude / Gemini API key</div>
          </>
        )}
      </div>
    ),
    stack: (
      <div className="flex flex-wrap gap-2">
        {project.stack?.map((s) => (
          <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>{s}</span>
        ))}
      </div>
    ),
    implement: (
      <div className="flex flex-col gap-4">
        {project.buildSteps?.length ? (
          project.buildSteps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}>{i + 1}</span>
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--color-on-surface)" }}>{isAr ? step.stepAr : step.stepEn}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? step.detailAr : step.detailEn}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "استخدم برومبت Claude Code للحصول على خطوات تنفيذ مخصصة" : "Use the Claude Code prompt to get custom implementation steps"}
          </p>
        )}
      </div>
    ),
    testing: (
      <div className="flex flex-col gap-2">
        {[
          isAr ? "اختبر وظيفة كل ميزة بشكل منفصل" : "Test each feature individually",
          isAr ? "اختبر على أحجام شاشة مختلفة" : "Test on different screen sizes",
          isAr ? "اختبر سيناريوهات الخطأ" : "Test error scenarios",
          isAr ? "تأكد من أداء API" : "Verify API performance",
          isAr ? "اختبر مع بيانات حقيقية" : "Test with real data",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            <Circle size={12} style={{ flexShrink: 0, marginTop: 4 }} /> {t}
          </div>
        ))}
      </div>
    ),
    deploy: (
      <div className="flex flex-col gap-3">
        {[
          { step: isAr ? "git add . && git commit -m 'feat: initial'" : "git add . && git commit", icon: "📦" },
          { step: isAr ? "git push origin main" : "git push origin main", icon: "☁️" },
          { step: isAr ? "اربط مستودعك بـ Vercel" : "Connect your repo to Vercel", icon: "🔗" },
          { step: isAr ? "أضف متغيرات البيئة (API keys)" : "Add environment variables (API keys)", icon: "🔑" },
          { step: isAr ? "انتظر النشر ✅" : "Wait for deployment ✅", icon: "🚀" },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-mono p-2 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
            <span>{d.icon}</span>
            <span style={{ color: "var(--color-on-surface)" }}>{d.step}</span>
          </div>
        ))}
        <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono mt-2" style={{ color: "var(--color-primary)" }}>
          {isAr ? "افتح Vercel" : "Open Vercel"} <ExternalLink size={11} />
        </a>
      </div>
    ),
    claude: (
      <div>
        <p className="text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "انسخ هذا البرومبت وأرسله لـ Claude Code:" : "Copy this prompt and send it to Claude Code:"}
        </p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono" style={{ color: "#fbbf24" }}>{isAr ? "برومبت Claude Code" : "Claude Code Prompt"}</p>
          <CopyBtn text={claudeCodePrompt} isAr={isAr} />
        </div>
        <p className="text-xs leading-relaxed p-3 rounded-xl font-mono whitespace-pre-wrap" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
          {claudeCodePrompt}
        </p>
        <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono mt-3" style={{ color: "var(--color-primary)" }}>
          {isAr ? "افتح Claude" : "Open Claude"} <ExternalLink size={11} />
        </a>
      </div>
    ),
    complete: (
      <div className="text-center py-4">
        <div className="text-5xl mb-4">🎓</div>
        <p className="font-bold text-lg mb-2" style={{ color: "#4ade80" }}>
          {isAr ? "أحسنت! لقد أكملت المشروع!" : "Great job! You completed the project!"}
        </p>
        <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "احصل على شهادتك واشترك في التحديات" : "Get your certificate and join the challenges"}
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href={`/${locale}/certificates`} className="glow-button-primary text-white font-mono px-5 py-2 rounded-xl text-sm">
            🎓 {isAr ? "الشهادات" : "Certificates"}
          </Link>
          <Link href={`/${locale}/challenges`} className="font-mono px-5 py-2 rounded-xl text-sm" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)" }}>
            🏆 {isAr ? "التحديات" : "Challenges"}
          </Link>
        </div>
      </div>
    ),
  };

  return (
    <div className="container-xl py-12 flex flex-col gap-8">
      {/* Back link */}
      <Link href={`/${locale}/projects/${project.id}`} className="flex items-center gap-1.5 text-sm w-fit" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
        {isAr ? project.titleAr : project.titleEn}
      </Link>

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
          <Rocket size={12} /> {isAr ? "ابنِ هذا المشروع معي" : "Build this project with me"}
        </div>
        <h1 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? project.titleAr : project.titleEn}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar steps */}
        <div className="flex flex-col gap-1">
          {BUILD_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(i)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-all"
              style={{
                background: currentStep === i ? "rgba(142,213,255,0.1)" : "transparent",
                border: currentStep === i ? "1px solid rgba(142,213,255,0.2)" : "1px solid transparent",
              }}
            >
              <span className="text-base">{completedSteps.has(i) ? "✅" : step.icon}</span>
              <span className="text-xs font-mono" style={{ color: currentStep === i ? "var(--color-primary)" : completedSteps.has(i) ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                {isAr ? step.labelAr : step.labelEn}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{BUILD_STEPS[currentStep].icon}</span>
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? BUILD_STEPS[currentStep].labelAr : BUILD_STEPS[currentStep].labelEn}
              </h2>
            </div>

            <div>{stepContent[BUILD_STEPS[currentStep].id]}</div>

            <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl disabled:opacity-30"
                style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
              >
                {isAr ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                {isAr ? "السابق" : "Previous"}
              </button>
              {currentStep < BUILD_STEPS.length - 1 ? (
                <button onClick={() => completeStep(currentStep)} className="glow-button-primary text-white font-mono px-5 py-2 rounded-xl text-xs flex items-center gap-1.5">
                  {saving ? <span className="text-xs">...</span> : null}
                  {isAr ? "تم ✓" : "Done ✓"} <Arrow size={12} />
                </button>
              ) : null}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 glass-card rounded-xl p-3 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${(completedSteps.size / BUILD_STEPS.length) * 100}%`, background: "#4ade80" }} />
            </div>
            <span className="text-xs font-mono" style={{ color: "#4ade80" }}>
              {completedSteps.size}/{BUILD_STEPS.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
