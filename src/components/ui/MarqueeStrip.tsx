"use client";

import { useReducedMotion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
  locale: string;
  speed?: "slow" | "normal" | "fast";
}

const speedDuration = {
  slow: "50s",
  normal: "35s",
  fast: "22s",
} as const;

export default function MarqueeStrip({
  items,
  locale,
  speed = "normal",
}: MarqueeStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackClass = locale === "ar" ? "marquee-track-rtl" : "marquee-track";

  const renderItems = (set: "primary" | "duplicate") =>
    items.map((item, index) => (
      <span
        key={`${set}-${index}-${item}`}
        className="marquee-item inline-block shrink-0"
        aria-hidden={set === "duplicate" ? true : undefined}
      >
        {item} ·{" "}
      </span>
    ));

  return (
    <div
      className="w-full border-y py-3 font-mono text-xs"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        color: "var(--color-on-surface-variant)",
      }}
    >
      {shouldReduceMotion ? (
        <div className="container-xl flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-normal">
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
