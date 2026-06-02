"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { scanJsonForDangerousPatterns } from "@/lib/automation/safety";

interface Props {
  json: Record<string, unknown>;
  title?: string;
  fileName?: string;
}

export default function JsonViewer({ json, title = "JSON Workflow", fileName }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const issues = scanJsonForDangerousPatterns(json);
  const raw = JSON.stringify(json, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (issues.length > 0) {
    return (
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} style={{ color: "#f87171" }} />
          <span className="text-sm font-semibold" style={{ color: "#f87171" }}>
            يحتوي الـ JSON على بيانات حساسة ولا يمكن عرضه
          </span>
        </div>
        <ul className="space-y-1">
          {issues.slice(0, 3).map((issue, i) => (
            <li key={i} className="text-[11px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              ⚠ {issue}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const preview = raw.split("\n").slice(0, 8).join("\n");
  const hasMore = raw.split("\n").length > 8;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(74,222,128,0.15)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(74,222,128,0.05)", borderBottom: "1px solid rgba(74,222,128,0.1)" }}
      >
        <div>
          <span className="text-xs font-mono font-semibold" style={{ color: "#4ade80" }}>
            {title}
          </span>
          {fileName && (
            <span className="text-[10px] mr-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {fileName}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg transition-all"
          style={{
            background: copied ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
            color: copied ? "#4ade80" : "var(--color-on-surface-variant)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "تم النسخ" : "نسخ"}
        </button>
      </div>

      {/* Code */}
      <div style={{ background: "rgba(0,0,0,0.3)" }}>
        <pre
          className="p-4 text-[11px] leading-relaxed overflow-x-auto font-mono"
          style={{ color: "#a8d8a8", maxHeight: expanded ? "600px" : "200px", overflow: "auto" }}
        >
          {expanded ? raw : preview}
        </pre>
      </div>

      {/* Expand toggle */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs transition-all"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(74,222,128,0.08)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "إخفاء الكود" : "عرض الكامل"}
        </button>
      )}
    </div>
  );
}
