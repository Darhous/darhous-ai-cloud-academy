"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface Props {
  isSuccess: boolean;
  locale: string;
}

export default function ContactSuccessModal({ isSuccess, locale }: Props) {
  const [open, setOpen] = useState(false);
  const isAr = locale === "ar";

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      // Auto-close after 6 seconds
      const t = setTimeout(() => setOpen(false), 6000);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  if (!open) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-md rounded-3xl p-8 flex flex-col items-center text-center gap-5"
        style={{
          background: "var(--color-surface)",
          border: "1px solid rgba(74,222,128,0.3)",
          boxShadow: "0 0 60px rgba(74,222,128,0.15), 0 20px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label={isAr ? "إغلاق" : "Close"}
          className="absolute top-4 end-4 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
          style={{
            background: "var(--color-surface-container)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          <X size={16} />
        </button>

        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(74,222,128,0.12)",
            border: "2px solid rgba(74,222,128,0.35)",
            boxShadow: "0 0 30px rgba(74,222,128,0.2)",
          }}
        >
          <CheckCircle size={40} style={{ color: "#4ade80" }} />
        </div>

        {/* Title */}
        <h2
          className="font-display font-bold text-2xl"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? "تم إرسال رسالتك! ✉️" : "Message Sent! ✉️"}
        </h2>

        {/* Body */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? "شكرًا لتواصلك معنا. سنقوم بالرد عليك خلال 24–48 ساعة."
            : "Thank you for reaching out. We will get back to you within 24–48 hours."}
        </p>

        {/* Progress bar auto-close indicator */}
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(74,222,128,0.15)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "#4ade80",
              animation: "progressBar 6s linear forwards",
            }}
          />
        </div>

        <p
          className="text-xs font-mono"
          style={{ color: "var(--color-on-surface-variant)", opacity: 0.55 }}
        >
          {isAr ? "سيُغلق تلقائياً..." : "Closes automatically..."}
        </p>

        <style>{`
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}
