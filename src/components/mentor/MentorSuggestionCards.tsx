"use client";

import { getMentorMode, type MentorModeId } from "@/data/mentor";

interface Props {
  modeId: MentorModeId;
  isAr: boolean;
  onSelect: (text: string) => void;
}

export default function MentorSuggestionCards({ modeId, isAr, onSelect }: Props) {
  const mode = getMentorMode(modeId);
  const suggestions = isAr ? mode.suggestionsAr : mode.suggestionsEn;

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <span className="text-3xl mb-3 block">{mode.icon}</span>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? mode.labelAr : mode.labelEn}
        </p>
        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? mode.descriptionAr : mode.descriptionEn}
        </p>
      </div>

      <p
        className="text-xs font-mono text-center mb-4"
        style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}
      >
        {isAr ? "💡 اختر سؤالاً للبدء..." : "💡 Pick a question to start..."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {suggestions.map((text, i) => (
          <button
            key={i}
            onClick={() => onSelect(text)}
            className="text-start p-4 rounded-xl text-sm transition-all duration-200 glow-hover"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface-variant)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(142,213,255,0.3)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-on-surface)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-outline-variant)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)";
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
