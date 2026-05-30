"use client";

import { useState, useEffect } from "react";
import MentorHero from "@/components/mentor/MentorHero";
import MentorModeSelector from "@/components/mentor/MentorModeSelector";
import MentorChat from "@/components/mentor/MentorChat";
import type { MentorModeId } from "@/data/mentor";
import { X } from "lucide-react";

interface Props {
  locale: string;
}

interface PageContext {
  title: string;
  hint: string;
}

export default function MentorPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const [activeMode, setActiveMode] = useState<MentorModeId>("ask");
  const [pageContext, setPageContext] = useState<PageContext | null>(null);
  const [chatKey, setChatKey] = useState<string>("ask");

  // Read Ask This Page context from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ask_page_ctx");
      if (raw) {
        const ctx = JSON.parse(raw) as PageContext;
        setPageContext(ctx);
        sessionStorage.removeItem("ask_page_ctx");
      }
    } catch {}
  }, []);

  function handleModeSelect(mode: MentorModeId) {
    setActiveMode(mode);
    setChatKey(mode);
    setPageContext(null);
  }

  return (
    <section className="flex flex-col" style={{ minHeight: "calc(100vh - 104px)" }}>
      <MentorHero isAr={isAr} />

      {/* Page context banner from Ask This Page */}
      {pageContext && (
        <div
          className="mx-4 mb-2 px-4 py-3 rounded-xl flex items-start justify-between gap-3 max-w-3xl mx-auto w-full"
          style={{
            background: "rgba(142,213,255,0.08)",
            border: "1px solid rgba(142,213,255,0.2)",
          }}
        >
          <div className="min-w-0">
            <p className="text-xs font-mono mb-0.5" style={{ color: "var(--color-primary)" }}>
              {isAr ? "سياق الصفحة المحملة:" : "Page context loaded:"}
            </p>
            <p className="text-sm font-medium truncate" style={{ color: "var(--color-on-surface)" }}>
              {pageContext.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "اقتراح:" : "Suggestion:"} {pageContext.hint}
            </p>
          </div>
          <button
            onClick={() => setPageContext(null)}
            className="flex-shrink-0 p-1 rounded hover:opacity-70"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex-shrink-0 py-3">
        <MentorModeSelector
          activeMode={activeMode}
          onSelect={handleModeSelect}
          isAr={isAr}
        />
      </div>

      {/* key remounts MentorChat when mode changes, resetting conversation */}
      <div className="flex-1">
        <MentorChat
          key={chatKey}
          modeId={activeMode}
          locale={locale}
          isAr={isAr}
          initialMessage={pageContext?.hint}
        />
      </div>
    </section>
  );
}
