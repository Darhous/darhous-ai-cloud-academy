"use client";

import { getMentorMode, type MentorModeId } from "@/data/mentor";

interface UserCtxSummary {
  completed_courses: number;
  language_level: string | null;
  learning_streak: number;
}

interface Props {
  modeId: MentorModeId;
  isAr: boolean;
  onSelect: (text: string) => void;
  greeting?: string;
  userCtx?: UserCtxSummary;
}

function getDynamicSuggestions(ctx: UserCtxSummary, isAr: boolean): string[] {
  const suggestions: string[] = [];

  if (ctx.completed_courses === 0) {
    suggestions.push(isAr ? "ساعدني أختار أول دورة" : "Help me choose my first course");
  }
  if (!ctx.language_level) {
    suggestions.push(isAr ? "كيف أختبر مستوى لغتي الإنجليزية؟" : "How do I test my English level?");
  }
  if (ctx.learning_streak >= 5) {
    suggestions.push(isAr ? "ما الخطوة التالية في مساري؟" : "What's the next step in my path?");
  }
  // Always included
  suggestions.push(isAr ? "ابنِ لي مشروع AI اليوم" : "Build me an AI project today");

  return suggestions;
}

export default function MentorSuggestionCards({ modeId, isAr, onSelect, greeting, userCtx }: Props) {
  const mode = getMentorMode(modeId);
  const staticSuggestions = isAr ? mode.suggestionsAr : mode.suggestionsEn;

  // Build dynamic suggestions from userCtx if available, otherwise fall back to static
  const dynamicExtra = userCtx ? getDynamicSuggestions(userCtx, isAr) : [];
  // Merge: up to 2 dynamic cards first, then fill with static to reach 4 total
  const suggestions =
    dynamicExtra.length > 0
      ? [...dynamicExtra.slice(0, 2), ...staticSuggestions.slice(0, Math.max(0, 4 - dynamicExtra.slice(0, 2).length))]
      : staticSuggestions;

  return (
    <div className="px-4 py-6">
      {/* Smart greeting */}
      {greeting && (
        <div
          className="text-center mb-5 px-4 py-3 rounded-2xl max-w-xl mx-auto"
          style={{
            background: "rgba(142,213,255,0.05)",
            border: "1px solid rgba(142,213,255,0.12)",
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
            {greeting}
          </p>
        </div>
      )}

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
