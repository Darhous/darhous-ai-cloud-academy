"use client";

import { mentorModes, type MentorModeId } from "@/data/mentor";

interface Props {
  activeMode: MentorModeId;
  onSelect: (mode: MentorModeId) => void;
  isAr: boolean;
}

export default function MentorModeSelector({ activeMode, onSelect, isAr }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-4 justify-center flex-wrap">
      {mentorModes.map((mode) => {
        const active = mode.id === activeMode;
        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0"
            style={{
              background: active
                ? "rgba(142,213,255,0.12)"
                : "var(--color-surface-container)",
              border: active
                ? "1px solid rgba(142,213,255,0.3)"
                : "1px solid var(--color-outline-variant)",
              color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
              fontWeight: active ? 600 : 400,
            }}
            title={isAr ? mode.descriptionAr : mode.descriptionEn}
          >
            <span>{mode.icon}</span>
            <span>{isAr ? mode.labelAr : mode.labelEn}</span>
          </button>
        );
      })}
    </div>
  );
}
