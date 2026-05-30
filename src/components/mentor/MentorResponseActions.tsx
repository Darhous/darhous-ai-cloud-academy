"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

interface Props {
  text: string;
  isAr: boolean;
  onRegenerate?: () => void;
}

export default function MentorResponseActions({ text, isAr, onRegenerate }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access unavailable
    }
  }

  return (
    <div className="flex items-center gap-1 mt-1.5">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all hover:opacity-80"
        style={{
          background: "var(--color-surface-container)",
          border: "1px solid var(--color-outline-variant)",
          color: copied ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
        }}
        title={isAr ? "نسخ" : "Copy"}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        <span>{isAr ? (copied ? "تم النسخ" : "نسخ") : (copied ? "Copied" : "Copy")}</span>
      </button>

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all hover:opacity-80"
          style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
            color: "var(--color-on-surface-variant)",
          }}
          title={isAr ? "إعادة التوليد" : "Regenerate"}
        >
          <RefreshCw size={11} />
          <span>{isAr ? "إعادة" : "Retry"}</span>
        </button>
      )}
    </div>
  );
}
