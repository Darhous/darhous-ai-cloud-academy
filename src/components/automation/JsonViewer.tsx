"use client";

import { useState, useEffect } from "react";
import { Copy, Check, ChevronDown, ChevronUp, AlertTriangle, Download, Loader2 } from "lucide-react";
import { scanJsonForDangerousPatterns } from "@/lib/automation/safety";

interface Props {
  /** Public path to the cleaned JSON file, e.g. /automation/workflows-json/[id].json */
  jsonUrl: string;
  /** Download filename, e.g. darhous-workflow-[id].json */
  fileName: string;
  title?: string;
}

const EDUCATIONAL_WARNING =
  "هذا JSON تعليمي. قبل التشغيل داخل n8n يجب إضافة اعتماداتك الخاصة واختباره على بيانات وهمية أولاً.";

export default function JsonViewer({ jsonUrl, fileName, title = "ملف n8n JSON" }: Props) {
  const [raw, setRaw] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(jsonUrl);
        if (!res.ok) throw new Error("fetch failed");
        const text = await res.text();
        if (cancelled) return;
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          setError("تعذّر قراءة ملف JSON.");
          return;
        }
        const found = scanJsonForDangerousPatterns(parsed);
        setIssues(found);
        // Pretty-print for display
        setRaw(JSON.stringify(parsed, null, 2));
      } catch {
        if (!cancelled) setError("تعذّر تحميل ملف JSON.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jsonUrl]);

  const handleCopy = async () => {
    if (!raw) return;
    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Educational warning banner — always shown above the JSON
  const Warning = (
    <div
      className="flex items-start gap-2 rounded-xl px-4 py-3 mb-3"
      style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}
    >
      <AlertTriangle size={14} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
        {EDUCATIONAL_WARNING}
      </p>
    </div>
  );

  if (error) {
    return (
      <div>
        {Warning}
        <div
          className="rounded-2xl p-4 text-xs"
          style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
        >
          {error}
        </div>
      </div>
    );
  }

  // Safety guard: if cleaned JSON still contains suspicious values, block display + download
  if (issues.length > 0) {
    return (
      <div>
        {Warning}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} style={{ color: "#f87171" }} />
            <span className="text-sm font-semibold" style={{ color: "#f87171" }}>
              تم حجب الـ JSON: يحتوي على قيم حساسة محتملة
            </span>
          </div>
          <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>
            راجع الملف وأزل أي بيانات اعتماد قبل النشر.
          </p>
        </div>
      </div>
    );
  }

  if (raw === null) {
    return (
      <div>
        {Warning}
        <div
          className="flex items-center justify-center gap-2 rounded-2xl py-8 text-xs"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--color-on-surface-variant)" }}
        >
          <Loader2 size={14} className="animate-spin" /> جارٍ تحميل JSON...
        </div>
      </div>
    );
  }

  const lines = raw.split("\n");
  const hasMore = lines.length > 12;
  const preview = lines.slice(0, 12).join("\n");

  return (
    <div>
      {Warning}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(74,222,128,0.15)" }}>
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 gap-2"
          style={{ background: "rgba(74,222,128,0.05)", borderBottom: "1px solid rgba(74,222,128,0.1)" }}
        >
          <span className="text-xs font-mono font-semibold truncate" style={{ color: "#4ade80" }}>
            {title}
          </span>
          <div className="flex items-center gap-2 shrink-0">
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
            <a
              href={jsonUrl}
              download={fileName}
              className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg transition-all"
              style={{
                background: "rgba(74,222,128,0.1)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <Download size={11} /> تحميل
            </a>
          </div>
        </div>

        {/* Code */}
        <div style={{ background: "rgba(0,0,0,0.3)" }}>
          <pre
            className="p-4 text-[11px] leading-relaxed font-mono"
            style={{ color: "#a8d8a8", maxHeight: expanded ? "600px" : "240px", overflow: "auto" }}
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
            {expanded ? "إخفاء" : "عرض الكامل"}
          </button>
        )}
      </div>
    </div>
  );
}
