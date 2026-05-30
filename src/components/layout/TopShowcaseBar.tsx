"use client";

import { showcaseItems } from "@/data/showcase";
import Link from "next/link";

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.2)",  text: "#7bd0ff" },
  violet: { bg: "rgba(87,27,193,0.12)",   border: "rgba(208,188,255,0.2)", text: "#d0bcff" },
  cyan:   { bg: "rgba(60,224,251,0.08)",  border: "rgba(60,224,251,0.2)",  text: "#3ce0fb" },
  green:  { bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.2)",  text: "#86efac" },
};

export default function TopShowcaseBar({ locale }: { locale: string }) {
  const isRTL = locale === "ar";
  // Triplicate for seamless seamless infinite scroll
  const items = [...showcaseItems, ...showcaseItems, ...showcaseItems];

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        background: "rgba(14,17,22,0.88)",
        borderBottom: "1px solid rgba(142,213,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 start-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(14,17,22,0.9), transparent)" }}
      />
      <div
        className="absolute inset-y-0 end-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(14,17,22,0.9), transparent)" }}
      />

      <div
        className="marquee-container py-2"
        style={{ direction: "ltr" }}
        aria-hidden="true"
      >
        <div
          className={isRTL ? "marquee-track-rtl items-center" : "marquee-track items-center"}
        >
          {items.map((item, idx) => {
            const colors = colorMap[item.color] ?? colorMap.blue;
            return (
              <Link
                key={`${item.id}-${idx}`}
                href={`/${locale}${item.href}`}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 hover:brightness-125"
                style={{
                  background: colors.bg,
                  borderColor: colors.border,
                  color: colors.text,
                  textDecoration: "none",
                }}
                tabIndex={-1}
              >
                <span className="text-sm leading-none">{item.icon}</span>
                <span>{isRTL ? item.titleAr : item.titleEn}</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full tracking-wider uppercase opacity-50"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {item.category}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
