"use client";

import Link from "next/link";
import { useState } from "react";
import type { Portal } from "@/config/portals";

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

  const padding = size === "large" ? "p-7" : "p-6";
  const iconSize = size === "large" ? "w-14 h-14 text-3xl" : "w-12 h-12 text-2xl";
  const titleSize = size === "large" ? "text-xl" : "text-lg";

  const inner = (
    <div
      className={`h-full rounded-xl flex flex-col gap-4 ${padding} transition-all duration-300`}
      style={{ background: "rgba(12,14,18,0.85)" }}
    >
      {/* Icon */}
      <div
        className={`${iconSize} rounded-xl flex items-center justify-center flex-shrink-0`}
        style={{ background: `${portal.color}12`, border: `1px solid ${portal.color}22` }}
      >
        {portal.icon}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-bold ${titleSize} leading-tight`}
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? portal.titleAr : portal.titleEn}
        </h3>
        <span
          className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-mono whitespace-nowrap"
          style={{
            background: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            color: statusStyle.text,
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {isAr ? portal.descriptionAr : portal.descriptionEn}
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5">
        {portal.features.slice(0, 4).map((f) => (
          <span
            key={f}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: `${portal.color}10`,
              color: portal.color,
              border: `1px solid ${portal.color}20`,
            }}
          >
            {f}
          </span>
        ))}
        {portal.features.length > 4 && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            +{portal.features.length - 4}
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        className="w-full text-center py-2.5 rounded-lg text-sm font-mono font-medium transition-all duration-200"
        style={
          isAvailable
            ? {
                background: hovered ? `${portal.color}20` : `${portal.color}10`,
                border: `1px solid ${portal.color}${hovered ? "50" : "25"}`,
                color: portal.color,
              }
            : {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "var(--color-on-surface-variant)",
                cursor: "default",
              }
        }
      >
        {isAr ? portal.ctaAr : portal.ctaEn}
      </div>
    </div>
  );

  const cardStyle = {
    background: hovered
      ? `linear-gradient(135deg, ${portal.color}50, rgba(255,255,255,0.08))`
      : `linear-gradient(135deg, ${portal.color}30, rgba(255,255,255,0.04))`,
    padding: "1px",
    borderRadius: "0.75rem",
    opacity: isAvailable ? 1 : 0.8,
    transition: "all 0.3s ease",
    transform: hovered && isAvailable ? "translateY(-4px)" : "translateY(0)",
  };

  if (isAvailable) {
    return (
      <div
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={`/${locale}${portal.href}`}
          className="block h-full"
          style={{ textDecoration: "none" }}
        >
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/${locale}${portal.href}`}
        className="block h-full"
        style={{ textDecoration: "none" }}
      >
        {inner}
      </Link>
    </div>
  );
}
