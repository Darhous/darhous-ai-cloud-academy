"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

interface Props {
  locale: string;
  contextTitle: string;
  contextHint: string;
}

export default function AskThisPageButton({ locale, contextTitle, contextHint }: Props) {
  const router = useRouter();
  const isAr = locale === "ar";

  function handleClick() {
    try {
      sessionStorage.setItem(
        "ask_page_ctx",
        JSON.stringify({ title: contextTitle, hint: contextHint })
      );
    } catch {}
    router.push(`/${locale}/mentor`);
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
      style={{
        background: "linear-gradient(135deg, rgba(142,213,255,0.10), rgba(208,188,255,0.10))",
        border: "1px solid rgba(142,213,255,0.22)",
        color: "var(--color-primary)",
      }}
    >
      <Sparkles size={14} />
      {isAr ? "اسأل المساعد عن هذه الصفحة" : "Ask AI about this page"}
    </button>
  );
}
