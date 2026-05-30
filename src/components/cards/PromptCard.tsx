import type { Prompt } from "@/data/prompts";
import Badge from "@/components/ui/Badge";
import CopyButton from "@/components/ui/CopyButton";
import FavoriteButton from "@/components/features/FavoriteButton";

interface PromptCardProps {
  prompt: Prompt;
  locale: string;
}

export default function PromptCard({ prompt, locale }: PromptCardProps) {
  const isAr = locale === "ar";

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-base" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? prompt.titleAr : prompt.titleEn}
          </h3>
          <p className="text-xs font-mono mt-0.5" style={{ color: "var(--color-outline)" }}>
            {isAr ? prompt.useCaseAr : prompt.useCaseEn}
          </p>
        </div>
        <Badge variant={prompt.difficulty === "beginner" ? "beginner" : prompt.difficulty === "intermediate" ? "intermediate" : "advanced"}>
          {prompt.difficulty}
        </Badge>
      </div>

      {/* Category & Model */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-mono border"
          style={{
            background: "rgba(142,213,255,0.08)",
            borderColor: "rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          {prompt.category}
        </span>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-mono border"
          style={{
            background: "rgba(208,188,255,0.08)",
            borderColor: "rgba(208,188,255,0.2)",
            color: "var(--color-secondary)",
          }}
        >
          🤖 {prompt.bestModel}
        </span>
      </div>

      {/* Prompt Preview */}
      <div
        className="relative rounded-xl p-4 font-mono text-xs leading-relaxed overflow-hidden"
        style={{
          background: "rgba(12,14,18,0.8)",
          border: "1px solid rgba(142,213,255,0.08)",
          maxHeight: "160px",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <span style={{ color: "var(--color-tertiary)" }}>&gt; </span>
        <span style={{ color: "var(--color-on-surface-variant)" }}>
          {prompt.promptText.slice(0, 250)}...
        </span>
      </div>

      {/* Tags & Copy */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs font-mono"
              style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <FavoriteButton id={prompt.id} type="prompt" locale={locale} />
          <CopyButton text={prompt.promptText} locale={locale} />
        </div>
      </div>
    </div>
  );
}
