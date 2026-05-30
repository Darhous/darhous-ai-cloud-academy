"use client";

import type { Roadmap } from "@/data/roadmaps";
import Badge from "@/components/ui/Badge";
import { CheckCircle2, Circle, Zap } from "lucide-react";

interface RoadmapTimelineProps {
  roadmap: Roadmap;
  locale: string;
  compact?: boolean;
}

export default function RoadmapTimeline({ roadmap, locale, compact = false }: RoadmapTimelineProps) {
  const isAr = locale === "ar";

  const levelVariant = {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "advanced",
  } as const;

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-6"
      style={{ border: "1px solid rgba(142,213,255,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{roadmap.icon}</span>
            <Badge variant={levelVariant[roadmap.level]}>
              {roadmap.level}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? roadmap.titleAr : roadmap.titleEn}
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? roadmap.descriptionAr : roadmap.descriptionEn}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "المدة" : "Duration"}
          </div>
          <div className="font-display font-bold text-lg" style={{ color: "var(--color-primary)" }}>
            {roadmap.totalWeeks}w
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-0">
        {roadmap.nodes.map((node, idx) => (
          <div key={node.id} className="flex gap-4">
            {/* Connector */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  node.status === "active" ? "roadmap-node-active" : ""
                }`}
                style={{
                  background:
                    node.status === "completed"
                      ? "var(--color-tertiary)"
                      : node.status === "active"
                      ? "var(--color-primary)"
                      : "var(--color-surface-container-high)",
                  border: `2px solid ${
                    node.status === "upcoming" ? "var(--color-outline-variant)" : "transparent"
                  }`,
                }}
              >
                {node.status === "completed" ? (
                  <CheckCircle2 size={16} color="black" />
                ) : node.status === "active" ? (
                  <Zap size={14} color="black" />
                ) : (
                  <Circle size={14} style={{ color: "var(--color-outline)" }} />
                )}
              </div>
              {idx < roadmap.nodes.length - 1 && (
                <div
                  className="w-0.5 flex-1 my-1"
                  style={{
                    background:
                      node.status === "completed"
                        ? "var(--color-tertiary)"
                        : "var(--color-surface-container-high)",
                    minHeight: "24px",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4
                    className="font-semibold text-sm"
                    style={{
                      color:
                        node.status === "upcoming"
                          ? "var(--color-on-surface-variant)"
                          : "var(--color-on-surface)",
                    }}
                  >
                    {isAr ? node.titleAr : node.titleEn}
                  </h4>
                  {!compact && (
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? node.descriptionAr : node.descriptionEn}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--color-outline)" }}>
                  {node.duration}
                </span>
              </div>
              {!compact && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {node.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: "var(--color-surface-container)",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Outcome */}
      <div
        className="p-3 rounded-xl flex items-center gap-3"
        style={{
          background: "rgba(142,213,255,0.06)",
          border: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        <span className="text-lg">🎯</span>
        <div>
          <div className="font-mono text-xs mb-0.5" style={{ color: "var(--color-primary)" }}>
            {isAr ? "النتيجة النهائية" : "Final Outcome"}
          </div>
          <div className="text-sm" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? roadmap.outcomeAr : roadmap.outcome}
          </div>
        </div>
      </div>
    </div>
  );
}
