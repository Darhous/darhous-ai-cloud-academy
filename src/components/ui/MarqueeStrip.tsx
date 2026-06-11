"use client";

import { useReducedMotion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
  locale: string;
  speed?: "slow" | "normal" | "fast";
  /** Color accent for pills. Defaults to primary. */
  accent?: string;
}

const speedDuration = {
  slow:   "55s",
  normal: "36s",
  fast:   "22s",
} as const;

export default function MarqueeStrip({
  items,
  locale,
  speed = "normal",
  accent,
}: MarqueeStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackClass = locale === "ar" ? "marquee-track-rtl" : "marquee-track";

  const pillStyle: React.CSSProperties = accent
    ? {
        background: `${accent}14`,
        border: `1px solid ${accent}28`,
        color: accent,
      }
    : {
        background: "rgba(142,213,255,0.08)",
        border: "1px solid rgba(142,213,255,0.18)",
        color: "var(--color-primary)",
      };

  const renderItems = (set: "primary" | "duplicate") =>
    items.map((item, index) => (
      <span
        key={`${set}-${index}-${item}`}
        className="inline-flex items-center gap-3 shrink-0"
        aria-hidden={set === "duplicate" ? true : undefined}
      >
        {/* Pill badge */}
        <span
          className="inline-block px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wide whitespace-nowrap"
          style={pillStyle}
        >
          {item}
        </span>
        {/* Separator */}
        <span
          className="text-[10px] opacity-30"
          style={{ color: pillStyle.color as string }}
        >
          ✦
        </span>
      </span>
    ));

  return (
    <div
      className="w-full border-y py-2.5"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {shouldReduceMotion ? (
        <div className="container-xl flex flex-wrap items-center justify-center gap-2">
          {renderItems("primary")}
        </div>
      ) : (
        <div className="marquee-container w-full" aria-label={items.join(", ")}>
          <div
            className={trackClass}
            style={{ animationDuration: speedDuration[speed] }}
          >
            {renderItems("primary")}
            {renderItems("duplicate")}
          </div>
        </div>
      )}
    </div>
  );
}
