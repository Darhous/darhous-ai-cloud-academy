"use client";

import { useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";

const sourceLabel: Record<string, { ar: string; en: string; icon: string }> = {
  "prompt-studio":   { ar: "استوديو البرومبتات", en: "Prompt Studio",         icon: "⚡" },
  "claude-generator":{ ar: "مولّد Claude Code",  en: "Claude Code Generator", icon: "🛠️" },
  "roadmap":         { ar: "مولّد الخطط",         en: "Roadmap Generator",     icon: "🗺️" },
  "mentor":          { ar: "مرشد AI",             en: "AI Mentor",             icon: "✨" },
};

export default function SavedPromptsPanel({ locale }: { locale: string }) {
  const { savedPrompts, remove, mounted } = useSavedPrompts();
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const isAr = locale === "ar";

  if (!mounted || savedPrompts.length === 0) return null;

  async function handleCopy(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-5 w-full"
      style={{ border: "1px solid rgba(142,213,255,0.1)" }}
    >
      <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
        ⚡ {isAr ? "البرومبتات المحفوظة" : "Saved Generated Prompts"}
        <span className="font-mono text-sm font-normal" style={{ color: "var(--color-on-surface-variant)" }}>
          ({savedPrompts.length})
        </span>
      </h2>

      <div className="flex flex-col gap-3">
        {savedPrompts.map((p) => {
          const src = sourceLabel[p.source] ?? { ar: p.source, en: p.source, icon: "📝" };
          const isExpanded = expanded === p.id;
          return (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between gap-3 px-4 py-3 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setExpanded(isExpanded ? null : p.id)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm">{src.icon}</span>
                    <span className="text-xs font-mono" style={{ color: "var(--color-primary)" }}>
                      {isAr ? src.ar : src.en}
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-on-surface)" }}>
                    {p.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                    {new Date(p.savedAt).toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(p.id, p.content); }}
                    className="p-1.5 rounded-lg transition-all hover:opacity-70"
                    style={{ color: copied === p.id ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}
                    title={isAr ? "نسخ" : "Copy"}
                  >
                    {copied === p.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(p.id); }}
                    className="p-1.5 rounded-lg transition-all hover:opacity-70"
                    style={{ color: "#ff7070" }}
                    title={isAr ? "حذف" : "Delete"}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div
                  className="px-4 py-3 border-t"
                  style={{ borderColor: "var(--color-outline-variant)" }}
                >
                  <pre
                    className="text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {p.content}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
