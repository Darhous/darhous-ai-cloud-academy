"use client";

/**
 * SmartPlatformTour — Phase 10C
 *
 * A short, dismissible welcome carousel that introduces first-time visitors
 * to the platform's core ideas (AI Mentor, the 6 portals, progress tracking,
 * certificates) without touching any actual page DOM — a self-contained
 * overlay, not a DOM-spotlight tour. This keeps it 100% safe across
 * breakpoints and immune to layout drift in the underlying pages.
 *
 * Auto-opens once per browser (localStorage-gated) a couple seconds after
 * the homepage settles. Fully keyboard-navigable, reduced-motion safe,
 * RTL-aware. Style/wrapper-only — no routes, no APIs, no content changes
 * to existing pages.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Bot,
  LayoutGrid,
  Trophy,
  Rocket,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const STORAGE_KEY = "darhous-platform-tour-seen-v1";
const OPEN_DELAY_MS = 2400;

interface TourStep {
  icon: React.ReactNode;
  color: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const STEPS: TourStep[] = [
  {
    icon: <Sparkles size={22} />,
    color: "#8ed5ff",
    titleAr: "أهلاً بك في NexaLearn",
    titleEn: "Welcome to NexaLearn",
    descAr: "نظام تعلم ذكي يبني مسارك التعليمي والمهني من الصفر — خطوة بخطوة.",
    descEn: "A smart learning OS that builds your educational & career path from zero — one step at a time.",
  },
  {
    icon: <Bot size={22} />,
    color: "#d0bcff",
    titleAr: "مرشدك الشخصي بالذكاء الاصطناعي",
    titleEn: "Your personal AI Mentor",
    descAr: "يفهم أهدافك ويصمم لك خطة تعلم مخصصة، ويرافقك عبر كل بوابة.",
    descEn: "Understands your goals, designs a personalized plan, and guides you across every portal.",
  },
  {
    icon: <LayoutGrid size={22} />,
    color: "#4ade80",
    titleAr: "6 بوابات تعليمية متخصصة",
    titleEn: "6 specialized learning portals",
    descAr: "من الذكاء الاصطناعي والأتمتة، إلى اللغة، المهن، والمعامل التطبيقية.",
    descEn: "From AI & automation to language, careers, digital exams, and hands-on labs.",
  },
  {
    icon: <Trophy size={22} />,
    color: "#fbbf24",
    titleAr: "تتبع تقدمك واحصل على شهاداتك",
    titleEn: "Track progress & earn certificates",
    descAr: "كل دورة واختبار تُنهيه يُسجَّل في لوحتك — مع شهادات قابلة للتحقق.",
    descEn: "Every course and exam you complete is tracked — with verifiable certificates.",
  },
  {
    icon: <Rocket size={22} />,
    color: "#3ce0fb",
    titleAr: "جاهز تبدأ رحلتك؟",
    titleEn: "Ready to start your journey?",
    descAr: "اختر مسارك بنفسك، أو دع المرشد الذكي يبنيه لك — والبداية مجانية.",
    descEn: "Pick your own path, or let the AI Mentor build one for you — free to start.",
  },
];

interface Props {
  locale: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SmartPlatformTour({ locale, isOpen: controlledOpen, onClose: controlledClose }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Reset step when tour opens
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const close = useCallback(() => {
    if (isControlled) {
      controlledClose?.();
    } else {
      setInternalOpen(false);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [isControlled, controlledClose]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= STEPS.length) return;
      setDirection(next > step ? 1 : -1);
      setStep(next);
    },
    [step]
  );

  const next = useCallback(() => {
    if (step === STEPS.length - 1) {
      close();
    } else {
      goTo(step + 1);
    }
  }, [step, goTo, close]);

  const back = useCallback(() => goTo(step - 1), [step, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === (isAr ? "ArrowLeft" : "ArrowRight")) next();
      else if (e.key === (isAr ? "ArrowRight" : "ArrowLeft")) back();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isAr, next, back, close]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const Arrow = isAr ? ChevronLeft : ChevronRight;

  const slideVariants = useMemo(
    () => ({
      enter: (dir: number) => ({ opacity: 0, x: shouldReduce ? 0 : dir * 28 }),
      center: { opacity: 1, x: 0 },
      exit: (dir: number) => ({ opacity: 0, x: shouldReduce ? 0 : dir * -28 }),
    }),
    [shouldReduce]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
          style={{ background: "rgba(8,9,12,0.66)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduce ? 0.1 : 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? "جولة سريعة في المنصة" : "Platform quick tour"}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: shouldReduce ? 0.12 : 0.32, ease: [0.0, 0.0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Ambient accent glow — tints to the active step's color */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none transition-colors duration-500"
              style={{
                top: -80,
                insetInlineEnd: -80,
                width: 220,
                height: 220,
                borderRadius: "9999px",
                background: `radial-gradient(circle, ${current.color}26 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label={isAr ? "إغلاق الجولة" : "Close tour"}
              className="absolute top-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ insetInlineEnd: "1rem", color: "var(--color-on-surface-variant)" }}
            >
              <X size={15} />
            </button>

            <div className="relative z-[1] px-7 pt-8 pb-6">
              {/* Step content */}
              <div className="min-h-[168px] overflow-hidden">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: shouldReduce ? 0.1 : 0.28, ease: [0.0, 0.0, 0.2, 1] }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                      style={{ background: `${current.color}1a`, border: `1px solid ${current.color}38`, color: current.color }}
                    >
                      {current.icon}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2.5 leading-snug" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? current.titleAr : current.titleEn}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? current.descAr : current.descEn}
                    </p>

                    {isLast && (
                      <Link
                        href={`/${locale}/register`}
                        onClick={close}
                        className="glow-button-primary shimmer-sweep tap-press icon-nudge inline-flex items-center gap-2 text-white font-mono px-5 py-2.5 rounded-xl text-sm mt-5"
                      >
                        {isAr ? "ابدأ مجاناً" : "Start for free"}
                        <Arrow size={14} />
                      </Link>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 mt-7 mb-5" role="tablist" aria-label={isAr ? "خطوات الجولة" : "Tour steps"}>
                {STEPS.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === step}
                    aria-label={`${isAr ? "الخطوة" : "Step"} ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      height: 6,
                      width: i === step ? 22 : 6,
                      background: i === step ? current.color : "rgba(255,255,255,0.14)",
                    }}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={close}
                  className="text-xs font-mono transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {isAr ? "تخطي" : "Skip"}
                </button>

                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      aria-label={isAr ? "السابق" : "Previous"}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/8"
                      style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface-variant)" }}
                    >
                      {isAr ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={next}
                    aria-label={isLast ? (isAr ? "إنهاء" : "Finish") : (isAr ? "التالي" : "Next")}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono font-medium transition-all hover:opacity-90"
                    style={{ background: current.color, color: "#0c0e12" }}
                  >
                    {isLast ? (isAr ? "إنهاء" : "Done") : (isAr ? "التالي" : "Next")}
                    {!isLast && <Arrow size={13} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
