"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, Zap } from "lucide-react";

export default function FinalCTA({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  return (
    <section className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="rounded-3xl p-10 md:p-20 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.22) 0%, rgba(87,27,193,0.18) 50%, rgba(0,102,138,0.12) 100%)",
          border: "1px solid rgba(142,213,255,0.15)",
        }}
      >
        <div className="env-orb env-orb-blue absolute top-[-100px] start-[-100px] opacity-30 orb-breathe" style={{ animationDelay: "0s" }} />
        <div className="env-orb env-orb-violet absolute bottom-[-100px] end-[-100px] opacity-20 orb-breathe-slow" style={{ animationDelay: "1.8s" }} />
        <div className="relative z-10">
          <p className="text-sm font-mono mb-5" style={{ color: "var(--color-primary)" }}>
            {isAr ? "✨ الآن أو لا تندم لاحقًا" : "✨ Now or Never"}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 leading-tight" style={{ color: "var(--color-on-surface)" }}>
            {isAr
              ? "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ"
              : "Start Now…\nEven If You Don't Know Where to Begin"}
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — وأنت بس تبدأ."
              : "The AI Mentor builds your path, step by step, from zero to mastery — you just need to start."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Primary CTA with outward ripple ring */}
            <div className="relative inline-flex rounded-xl">
              <span className="absolute inset-0 rounded-xl cta-ripple-ring" aria-hidden="true" />
              <Link
                href={`/${locale}/register`}
                className="glow-button-primary text-white font-mono px-10 py-4 rounded-xl inline-flex items-center gap-2 text-base font-semibold relative z-10"
              >
                <Sparkles size={18} />
                {isAr ? "ابدأ مجانًا الآن" : "Start Free Now"}
                <Arrow size={16} />
              </Link>
            </div>
            <Link
              href={`/${locale}/mentor`}
              className="glow-button-secondary font-mono px-8 py-4 rounded-xl inline-flex items-center gap-2 text-base font-semibold"
              style={{ color: "var(--color-secondary)" }}
            >
              <Zap size={16} />
              {isAr ? "جرب المرشد الذكي" : "Try AI Mentor"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
