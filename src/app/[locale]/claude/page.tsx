import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import PromptCard from "@/components/cards/PromptCard";
import { prompts } from "@/data/prompts";
import { CheckCircle2, Terminal } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "إتقان Claude" : "Claude Mastery",
    description: isAr
      ? "المرجع العربي الأول لإتقان Claude — من المطالبات إلى Claude Code إلى بناء منتجات AI كاملة"
      : "The premier Arabic reference for mastering Claude — from prompting to Claude Code to building full AI products",
    keywords: isAr
      ? ["claude", "claude code", "MCP", "anthropic", "prompt engineering", "claude API"]
      : ["claude mastery", "claude code", "anthropic", "MCP servers", "claude API"],
  };
}

export default async function ClaudePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const claudePrompts = prompts.filter((p) => p.category === "Claude").slice(0, 6);
  const codingPrompts = prompts.filter((p) => p.category === "Coding").slice(0, 3);

  const framework = isAr
    ? ["الدور", "الهدف", "السياق", "المدخلات", "القيود", "صيغة الإخراج", "معيار الجودة", "التحقق", "التكرار"]
    : ["Role", "Goal", "Context", "Inputs", "Constraints", "Output Format", "Quality Bar", "Verification", "Iteration"];

  const useCases = isAr
    ? [
        { icon: "💻", title: "Claude للبرمجة", desc: "كتابة وتحسين ومراجعة الكود" },
        { icon: "🔬", title: "Claude للبحث", desc: "تحليل الأوراق وتلخيص المحتوى" },
        { icon: "💼", title: "Claude للأعمال", desc: "استراتيجيات وتحليلات ووثائق" },
        { icon: "⚡", title: "Claude للأتمتة", desc: "بناء سير عمل ذكية آلية" },
        { icon: "🎨", title: "Claude للتصميم", desc: "توليد واجهات وتحويل الأكواد" },
        { icon: "📚", title: "Claude للتعليم", desc: "إنشاء مناهج ومحتوى تعليمي" },
      ]
    : [
        { icon: "💻", title: "Claude for Coding", desc: "Write, improve, and review code" },
        { icon: "🔬", title: "Claude for Research", desc: "Analyze papers and summarize content" },
        { icon: "💼", title: "Claude for Business", desc: "Strategy, analysis, and documents" },
        { icon: "⚡", title: "Claude for Automation", desc: "Build smart automated workflows" },
        { icon: "🎨", title: "Claude for Design", desc: "Generate UIs and convert designs" },
        { icon: "📚", title: "Claude for Education", desc: "Create curricula and learning content" },
      ];

  return (
    <div className="container-xl py-16 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "إتقان Claude" : "Claude Mastery"}
          title={isAr ? "إتقان Claude — مركز القيادة" : "Claude Mastery Command Center"}
          subtitle={isAr
            ? "مركز تعلم Claude الرائد — من المطالبات إلى البرمجة إلى بناء المنتجات الكاملة"
            : "The flagship Claude learning hub — from prompting to coding to building full products"}
        />
      </div>

      {/* Claude Command Center visual */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.15) 0%, rgba(87,27,193,0.1) 50%, rgba(0,54,62,0.15) 100%)",
          border: "1px solid rgba(142,213,255,0.1)",
        }}
      >
        <div className="env-orb env-orb-blue absolute -top-20 left-0 opacity-50" style={{ width: "350px", height: "350px" }} />
        <div className="relative z-10">
          <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
            🖥️ {isAr ? "مركز أوامر Claude" : "Claude Command Center"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ direction: "ltr" }}>
            {/* Prompt panel */}
            <div className="glass-card rounded-xl p-4">
              <div className="font-mono text-xs mb-3" style={{ color: "var(--color-primary)" }}>PROMPT DESIGNER</div>
              {["Role: Engineer", "Goal: Build RAG", "Context: Production", "Output: TypeScript"].map((line, i) => (
                <div key={i} className="text-xs font-mono py-1" style={{ color: "var(--color-on-surface-variant)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--color-secondary)" }}>{line.split(":")[0]}:</span>
                  {line.split(":")[1]}
                </div>
              ))}
            </div>
            {/* Terminal panel */}
            <div className="glass-card rounded-xl p-4">
              <div className="font-mono text-xs mb-3" style={{ color: "var(--color-tertiary)" }}>TERMINAL</div>
              <div className="space-y-1.5 font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                <div><span style={{ color: "var(--color-tertiary)" }}>$</span> claude code --init</div>
                <div><span style={{ color: "#4ade80" }}>✓</span> Project initialized</div>
                <div><span style={{ color: "var(--color-tertiary)" }}>$</span> claude build --prod</div>
                <div className="animate-pulse"><span style={{ color: "var(--color-primary)" }}>▋</span> Building...</div>
              </div>
            </div>
            {/* Status panel */}
            <div className="glass-card rounded-xl p-4">
              <div className="font-mono text-xs mb-3" style={{ color: "#4ade80" }}>DEPLOY STATUS</div>
              {[
                { label: "Build", color: "#4ade80", status: "✓ PASS" },
                { label: "Tests", color: "#4ade80", status: "✓ 98%" },
                { label: "Deploy", color: "var(--color-primary)", status: "↑ LIVE" },
                { label: "Monitor", color: "var(--color-tertiary)", status: "● OK" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-1 font-mono text-xs">
                  <span style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</span>
                  <span style={{ color: s.color }}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Claude Prompting Framework */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
          📐 {isAr ? "إطار عمل مطالبات Claude" : "Claude Prompting Framework"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {framework.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                background: `rgba(142,213,255,${0.04 + i * 0.01})`,
                borderColor: "rgba(142,213,255,0.15)",
              }}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono" style={{ background: "var(--color-primary)", color: "black" }}>
                {i + 1}
              </span>
              <span className="font-mono text-sm" style={{ color: "var(--color-on-surface)" }}>{step}</span>
              {i < framework.length - 1 && (
                <span style={{ color: "var(--color-outline)" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
          🎯 {isAr ? "حالات استخدام Claude" : "Claude Use Cases"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 glow-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-2xl">{uc.icon}</span>
              <div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>{uc.title}</h3>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claude Code section */}
      <div
        className="rounded-2xl p-8"
        style={{ background: "var(--color-surface-container)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          <Terminal className="inline-block me-2" size={22} style={{ color: "var(--color-tertiary)" }} />
          Claude Code
        </h2>
        <p className="text-base mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "Claude Code هو وكيل برمجة AI متكامل يعمل في الطرفية. يمكنه قراءة وكتابة وتشغيل واختبار الكود تلقائيًا."
            : "Claude Code is a full AI coding agent that works in the terminal. It can read, write, run, and test code automatically."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            isAr ? ["تحليل الكودبيس الكامل", "كتابة اختبارات شاملة", "إعادة هيكلة الكود", "إصلاح الأخطاء التلقائي"]
                 : ["Full codebase analysis", "Write comprehensive tests", "Refactor code", "Auto-fix bugs"],
            isAr ? ["إنشاء وثائق كاملة", "نشر التطبيقات", "تشغيل أوامر Git", "إدارة ملفات المشروع"]
                 : ["Generate full documentation", "Deploy applications", "Run Git commands", "Manage project files"],
          ].map((list, gi) => (
            <ul key={gi} className="space-y-2">
              {list.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-tertiary)", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Claude Prompt Vault */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
          📦 {isAr ? "مخزن مطالبات Claude" : "Claude Prompt Vault"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...claudePrompts, ...codingPrompts].slice(0, 6).map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
