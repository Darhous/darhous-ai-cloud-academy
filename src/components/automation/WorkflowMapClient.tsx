"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Info } from "lucide-react";
import type { WorkflowMapNode } from "@/data/automation/types";

interface Props {
  nodes: WorkflowMapNode[];
}

const NODE_COLORS: Record<string, { color: string; bg: string }> = {
  trigger: { color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  action: { color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  condition: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  ai: { color: "#d0bcff", bg: "rgba(208,188,255,0.1)" },
  output: { color: "#3ce0fb", bg: "rgba(60,224,251,0.1)" },
  transform: { color: "#8ed5ff", bg: "rgba(142,213,255,0.1)" },
  notification: { color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
  storage: { color: "#a3e635", bg: "rgba(163,230,53,0.1)" },
};

const NODE_ICONS: Record<string, string> = {
  trigger: "⚡",
  action: "▶",
  condition: "◇",
  ai: "✦",
  output: "→",
  transform: "⇄",
  notification: "🔔",
  storage: "◉",
};

const NODE_LABELS: Record<string, string> = {
  trigger: "Trigger",
  action: "Action",
  condition: "Condition",
  ai: "AI Step",
  output: "Output",
  transform: "Transform",
  notification: "Notification",
  storage: "Storage",
};

export default function WorkflowMapClient({ nodes }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const sorted = [...nodes].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
        {Object.entries(NODE_LABELS).map(([type, label]) => {
          const cfg = NODE_COLORS[type] ?? { color: "#8ed5ff", bg: "rgba(142,213,255,0.08)" };
          return (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}25` }}
            >
              <span>{NODE_ICONS[type]}</span>
              {label}
            </span>
          );
        })}
      </div>

      <div className="relative">
        {sorted.map((node, i) => {
          const cfg = NODE_COLORS[node.type] ?? { color: "#8ed5ff", bg: "rgba(142,213,255,0.08)" };
          const isActive = activeNode === node.id;
          const isLast = i === sorted.length - 1;

          return (
            <div key={node.id} className="relative">
              {/* Connector line */}
              {!isLast && (
                <div
                  className="absolute right-6 w-0.5 z-0"
                  style={{
                    top: "52px",
                    height: "20px",
                    background: `linear-gradient(to bottom, ${cfg.color}40, transparent)`,
                  }}
                />
              )}

              <motion.div layout className="relative z-10 mb-2">
                <button
                  className="w-full text-right rounded-2xl p-4 flex items-start gap-3 transition-all"
                  style={{
                    background: isActive ? cfg.bg : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? cfg.color + "30" : "rgba(255,255,255,0.07)"}`,
                  }}
                  onClick={() => setActiveNode(isActive ? null : node.id)}
                >
                  {/* Step number + icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 text-center"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.color}25`, color: cfg.color }}
                  >
                    <span className="text-base">{NODE_ICONS[node.type]}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono" style={{ color: cfg.color }}>
                          {NODE_LABELS[node.type]}
                        </span>
                        <span className="text-[10px] mx-1.5 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                          ·
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                          {node.tool}
                        </span>
                      </div>
                      {(node.input || node.output || node.riskNote) ? (
                        isActive ? <ChevronUp size={13} style={{ color: cfg.color }} /> : <Info size={13} style={{ color: "var(--color-on-surface-variant)" }} />
                      ) : null}
                    </div>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--color-on-surface)" }}>
                      {node.label}
                    </p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {node.description}
                    </p>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (node.input || node.output || node.riskNote) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mx-2 mb-2 rounded-xl p-3 space-y-2"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.color}18` }}
                      >
                        {node.input && (
                          <div>
                            <span className="text-[10px] font-semibold block mb-0.5" style={{ color: cfg.color }}>
                              المدخل:
                            </span>
                            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                              {node.input}
                            </p>
                          </div>
                        )}
                        {node.output && (
                          <div>
                            <span className="text-[10px] font-semibold block mb-0.5" style={{ color: "#4ade80" }}>
                              المخرج:
                            </span>
                            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                              {node.output}
                            </p>
                          </div>
                        )}
                        {node.riskNote && (
                          <div>
                            <span className="text-[10px] font-semibold block mb-0.5" style={{ color: "#f87171" }}>
                              ⚠ ملاحظة:
                            </span>
                            <p className="text-xs" style={{ color: "#f87171" }}>
                              {node.riskNote}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
