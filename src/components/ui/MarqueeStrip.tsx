"use client";

import { useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */
export interface RichItem {
  label: string;
  Icon: LucideIcon;
  color: string;
}

interface MarqueeStripProps {
  items?: string[];
  richItems?: RichItem[];
  locale: string;
  speed?: "slow" | "normal" | "fast";
  accent?: string;
}

const speedDuration = {
  slow:   "55s",
  normal: "36s",
  fast:   "22s",
} as const;

/* ─── Component ─────────────────────────────────────────────────── */
export default function MarqueeStrip({
  items,
  richItems,
  locale,
  speed = "normal",
  accent,
}: MarqueeStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const isRtl = locale === "ar";
  const trackClass = isRtl ? "marquee-track-rtl" : "marquee-track";

  /* ── Plain text pills (legacy) ─────────────────────── */
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

  const renderTextItems = (set: "primary" | "duplicate") =>
    (items ?? []).map((item, index) => (
      <span
        key={`${set}-${index}-${item}`}
        className="inline-flex items-center gap-3 shrink-0"
        aria-hidden={set === "duplicate" ? true : undefined}
      >
        <span
          className="inline-block px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wide whitespace-nowrap"
          style={pillStyle}
        >
          {item}
        </span>
        <span className="text-[10px] opacity-30" style={{ color: pillStyle.color as string }}>✦</span>
      </span>
    ));

  /* ── Rich icon pills ────────────────────────────────── */
  const renderRichItems = (set: "primary" | "duplicate") =>
    (richItems ?? []).map((item, index) => (
      <span
        key={`${set}-${index}-${item.label}`}
        className="inline-flex items-center gap-3 shrink-0"
        aria-hidden={set === "duplicate" ? true : undefined}
      >
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wide whitespace-nowrap transition-colors"
          style={{
            background: `${item.color}12`,
            border: `1px solid ${item.color}28`,
            color: item.color,
          }}
        >
          <item.Icon size={11} style={{ color: item.color, flexShrink: 0 }} aria-hidden />
          {item.label}
        </span>
        <span className="text-[10px] opacity-20" style={{ color: item.color }}>✦</span>
      </span>
    ));

  const useRich = !!richItems?.length;
  const allLabels = useRich
    ? richItems!.map((r) => r.label).join(", ")
    : (items ?? []).join(", ");

  return (
    <div
      className="w-full border-y py-2.5"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {shouldReduceMotion ? (
        <div className="container-xl flex flex-wrap items-center justify-center gap-2">
          {useRich ? renderRichItems("primary") : renderTextItems("primary")}
        </div>
      ) : (
        <div className="marquee-container w-full" aria-label={allLabels}>
          <div
            className={trackClass}
            style={{ animationDuration: speedDuration[speed] }}
          >
            {useRich ? renderRichItems("primary") : renderTextItems("primary")}
            {useRich ? renderRichItems("duplicate") : renderTextItems("duplicate")}
          </div>
        </div>
      )}
    </div>
  );
}
