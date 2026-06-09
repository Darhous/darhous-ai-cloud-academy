"use client";

import Link from "next/link";
import { useState } from "react";
import type { Portal } from "@/config/portals";
import InteractiveSurface from "@/components/ui/InteractiveSurface";

interface Props {
  portal: Portal;
  locale: string;
  size?: "default" | "large";
}

export default function PortalCard({ portal, locale, size = "default" }: Props) {
  const isAr = locale === "ar";
  const [hovered, setHovered] = useState(false);
  const isAvailable = portal.status === "available";

  const statusLabel = isAr
    ? portal.status === "available" ? "متاح الآن"
      : portal.status === "beta" ? "بيتا"
      : portal.badgeAr ?? "قريبًا"
    : portal.status === "available" ? "Available"
      : portal.status === "beta" ? "Beta"
      : portal.badgeEn ?? "Soon";

  const statusStyle = isAvailable
    ? { bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)", text: "#4ade80" }
    : portal.status === "beta"
    ? { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", text: "#fbbf24" }
    : { bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", text: "#94a3b8" };

  const padding = size === "large" ? "p-8" : "p-6";
  const iconSize = size === "large" ? "w-16 h-16 text-3xl" : "w-14 h-14 text-2xl";
  const titleSize = size === "large" ? "text-xl md:text-2xl" : "text-lg md:text-xl";

  const inner = (
    <div
      className={`h-full rounded-2xl flex flex-col gap-4 ${padding} transition-all duration-300 relative z-10 glass-panel-promax group-hover:bg-opacity-80`}
      style={{
        background: hovered && isAvailable ? "rgba(255,255,255,0.03)" : undefined
      }}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className={`${iconSize} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${hovered && isAvailable ? "scale-110" : ""}`}
          style={{ background: `${portal.color}15`, color: portal.color, border: `1px solid ${portal.color}20` }}
        >
          {portal.icon}
        </div>
        
        {/* Status Badge */}
        <span
          className="flex-shrink-0 text-[10px] px-3 py-1 rounded-full font-mono whitespace-nowrap"
          style={{
            background: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            color: statusStyle.text,
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Header */}
      <h3
        className={`font-bold ${titleSize} leading-tight mt-2`}
        style={{ color: "var(--color-on-surface)" }}
      >
        {isAr ? portal.titleAr : portal.titleEn}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {isAr ? portal.descriptionAr : portal.descriptionEn}
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {portal.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="text-[10px] px-2.5 py-1 rounded-md"
            style={{
              background: `${portal.color}10`,
              color: portal.color,
              border: `1px solid ${portal.color}20`,
            }}
          >
            {f}
          </span>
        ))}
        {portal.features.length > 3 && (
          <span
            className="text-[10px] px-2.5 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            +{portal.features.length - 3}
          </span>
        )}
      </div>

      {/* CTA Line */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-mono font-medium transition-colors duration-300"
              style={{ color: hovered && isAvailable ? portal.color : "var(--color-on-surface-variant)" }}>
          {isAr ? portal.ctaAr : portal.ctaEn}
        </span>
        <span className="text-sm transition-transform duration-300"
              style={{ color: hovered && isAvailable ? portal.color : "var(--color-on-surface-variant)", transform: hovered && isAvailable ? (isAr ? "translateX(-4px)" : "translateX(4px)") : "translateX(0)" }}>
          {isAr ? "←" : "→"}
        </span>
      </div>
    </div>
  );

  const cardStyle = {
    background: hovered && isAvailable
      ? `linear-gradient(135deg, ${portal.color}50, rgba(255,255,255,0.08))`
      : `linear-gradient(135deg, ${portal.color}30, rgba(255,255,255,0.04))`,
    padding: "1px",
    borderRadius: "1rem",
    opacity: isAvailable ? 1 : 0.7,
    boxShadow: hovered && isAvailable ? `0 20px 40px -10px ${portal.color}20` : "none",
  };

  return (
    <InteractiveSurface
      style={cardStyle}
      className={`group ${isAvailable ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tiltMax={isAvailable ? 3 : 0}
      spotlight={isAvailable}
      spotlightColor={`${portal.color}20`}
      activeTransform={isAvailable ? "translateY(-6px)" : "translateY(0)"}
      disabled={!isAvailable}
    >
      {isAvailable ? (
        <Link
          href={`/${locale}${portal.href}`}
          className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          style={{ textDecoration: "none" }}
        >
          {inner}
        </Link>
      ) : (
        <div className="block h-full">
          {inner}
        </div>
      )}
    </InteractiveSurface>
  );
}
