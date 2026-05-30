import type { GlossaryTerm } from "@/data/glossary";

interface GlossaryCardProps {
  term: GlossaryTerm;
  locale: string;
}

export default function GlossaryCard({ term, locale }: GlossaryCardProps) {
  const isAr = locale === "ar";

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-3 glow-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-bold text-xl" style={{ color: "var(--color-primary)" }}>
          {term.term}
        </h3>
        <span
          className="px-2 py-0.5 rounded text-xs font-mono flex-shrink-0"
          style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }}
        >
          {term.category}
        </span>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? term.definitionAr : term.definitionEn}
      </p>

      <div
        className="p-3 rounded-lg text-xs font-mono"
        style={{
          background: "rgba(142,213,255,0.05)",
          borderLeft: "2px solid var(--color-tertiary)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        💡 {isAr ? term.exampleAr : term.exampleEn}
      </div>
    </div>
  );
}
