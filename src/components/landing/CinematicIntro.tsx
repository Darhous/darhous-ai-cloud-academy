"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "darhous-cinematic-intro-seen-v1";

interface Props {
  locale: string;
}

export default function CinematicIntro({ locale }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      seen = true; // safe fallback
    }

    if (seen || shouldReduce) {
      setShow(false);
      return;
    }

    // Auto-dismiss after a short, premium delay
    const timer = setTimeout(() => {
      dismiss();
    }, 2800);

    return () => clearTimeout(timer);
  }, [shouldReduce, dismiss]);

  // Keyboard accessibility to skip
  useEffect(() => {
    if (!show) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [show]);

  if (!mounted) return null; // Avoid hydration mismatch
  
  return (
    <AnimatePresence>
      {show && !shouldReduce && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08090c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? "شاشة ترحيبية - انقر للتخطي" : "Welcome screen - click to skip"}
        >
          {/* Ambient Glow */}
          <motion.div
            className="absolute pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(142,213,255,0.06) 0%, transparent 60%)",
              filter: "blur(50px)",
              borderRadius: "50%"
            }}
          />

          {/* Skip Button */}
          <motion.button
            className="absolute top-6 text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
            style={{ insetInlineEnd: "1.5rem", color: "var(--color-on-surface-variant)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
          >
            {isAr ? "تخطي" : "Skip"}
          </motion.button>

          {/* Logo / Brand Text */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-3">
            <div className="overflow-hidden pb-2">
              <motion.h1
                className="font-display font-bold text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
                }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                NexaLearn
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.p
                className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-80"
                style={{ color: "var(--color-primary)" }}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                by Darhous
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
