"use client";

/**
 * MentorFloatingButton — Phase 10B: AI Mentor Floating Hint
 *
 * The persistent floating "AI Mentor" pill now occasionally surfaces a small,
 * dismissible hint bubble pointing at it — nudging engaged readers toward the
 * mentor after they've scrolled deep into a page. Shown once per browser
 * (localStorage-gated), auto-dismisses, fully reduced-motion safe.
 *
 * Style/wrapper-only: same route, same button, no new APIs or logic.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const HINT_STORAGE_KEY = "darhous-mentor-hint-seen-v1";
const SCROLL_THRESHOLD = 900;
const AUTO_DISMISS_MS = 9000;

interface Props {
  locale: string;
}

export default function MentorFloatingButton({ locale }: Props) {
  const pathname = usePathname();
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const [showHint, setShowHint] = useState(false);
  const [hintSeen, setHintSeen] = useState(true); // assume seen until checked — avoids first-paint flash

  // Check whether this browser has already seen the hint
  useEffect(() => {
    try {
      setHintSeen(window.localStorage.getItem(HINT_STORAGE_KEY) === "1");
    } catch {
      setHintSeen(true);
    }
  }, []);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    setHintSeen(true);
    try {
      window.localStorage.setItem(HINT_STORAGE_KEY, "1");
    } catch {
      /* localStorage unavailable — fail silently, hint just won't persist */
    }
  }, []);

  // Reveal once the reader scrolls deep enough to show real engagement
  useEffect(() => {
    if (hintSeen || pathname.includes("/mentor")) return;
    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setShowHint(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hintSeen, pathname]);

  // Auto-dismiss after a short while so it never overstays its welcome
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(dismissHint, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [showHint, dismissHint]);

  if (pathname.includes("/mentor")) return null;

  return (
    <div className="fixed z-40" style={{ bottom: "24px", [isAr ? "left" : "right"]: "24px" }}>
      {/* Hint bubble */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            role="status"
            className="absolute bottom-[calc(100%+14px)] flex items-start gap-2 rounded-2xl px-4 py-3 max-w-[230px]"
            style={{
              [isAr ? "left" : "right"]: 0,
              background: "rgba(20,22,28,0.92)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(142,213,255,0.22)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4), 0 0 24px rgba(142,213,255,0.1)",
            }}
            initial={shouldReduce ? false : { opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <Sparkles size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
            <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr
                ? "محتاج توجيه؟ المرشد الذكي يبني لك خطة تعلم مخصصة في ثوانٍ."
                : "Need direction? The AI Mentor builds you a personalized plan in seconds."}
            </p>
            <button
              type="button"
              onClick={dismissHint}
              aria-label={isAr ? "إغلاق التلميح" : "Dismiss hint"}
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <X size={11} />
            </button>
            {/* Pointer triangle toward the button below */}
            <span
              className="absolute top-full w-3 h-3 rotate-45"
              style={{
                [isAr ? "left" : "right"]: "20px",
                marginTop: "-7px",
                background: "rgba(20,22,28,0.92)",
                borderInlineEnd: "1px solid rgba(142,213,255,0.22)",
                borderBlockEnd: "1px solid rgba(142,213,255,0.22)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <Link
        href={`/${locale}/mentor`}
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(142,213,255,0.12), rgba(208,188,255,0.12))",
          border: "1px solid rgba(142,213,255,0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(142,213,255,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        title={isAr ? "مرشد درهوس للذكاء الاصطناعي" : "Darhous AI Mentor"}
        onClick={() => {
          if (showHint) dismissHint();
        }}
      >
        {showHint && !shouldReduce && (
          <span className="absolute inset-0 rounded-full cta-ripple-ring" aria-hidden="true" />
        )}
        <Sparkles size={15} style={{ color: "var(--color-primary)" }} />
        <span
          className="text-xs font-medium hidden sm:block"
          style={{ color: "var(--color-primary)" }}
        >
          {isAr ? "مرشد AI" : "AI Mentor"}
        </span>
      </Link>
    </div>
  );
}
