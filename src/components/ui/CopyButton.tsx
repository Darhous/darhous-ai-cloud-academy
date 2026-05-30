"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  locale?: string;
}

export default function CopyButton({ text, locale }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: copied
          ? "rgba(60,224,251,0.15)"
          : "var(--color-surface-container-high)",
        color: copied ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
        border: `1px solid ${copied ? "rgba(60,224,251,0.3)" : "var(--color-outline-variant)"}`,
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied
        ? locale === "ar"
          ? "تم النسخ!"
          : "Copied!"
        : locale === "ar"
        ? "نسخ"
        : "Copy"}
    </button>
  );
}
