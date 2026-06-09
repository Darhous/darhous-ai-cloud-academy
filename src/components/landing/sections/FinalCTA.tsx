"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

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
        className="rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden glass-panel-promax"
        style={{
          background: "linear-gradient(135deg, rgba(142,213,255,0.08) 0%, rgba(87,27,193,0.12) 50%, rgba(60,224,251,0.05) 100%)",
          border: "1px solid rgba(142,213,255,0.15)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none" />
        
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-6 mx-auto"
            style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
          >
            <Sparkles size={12} />
            {isAr ? "الآن أو لا تندم لاحقًا" : "Now or Never"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight text-gradient-premium max-w-3xl mx-auto">
            {isAr
              ? "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ"
              : "Start Now…\nEven If You Don't Know Where to Begin"}
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — كل ما عليك فعله هو البدء."
              : "The AI Mentor builds your path, step by step, from zero to mastery — all you need to do is start."}
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            {/* Primary CTA with outward ripple ring */}
            <MagneticButton className="relative group">
              <span className="absolute inset-0 rounded-2xl cta-ripple-ring" aria-hidden="true" />
              <Link
                href={`/${locale}/register`}
                className="glow-button-primary text-white font-mono px-10 py-4 rounded-2xl inline-flex items-center gap-3 text-base font-semibold relative z-10"
              >
                <Sparkles size={18} />
                {isAr ? "ابدأ مجانًا الآن" : "Start Free Now"}
                <Arrow size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <Link
              href={`/${locale}/mentor`}
              className="glow-button-secondary font-mono px-8 py-4 rounded-2xl inline-flex items-center gap-3 text-base font-semibold transition-colors hover:bg-secondary/10"
              style={{ color: "var(--color-secondary)" }}
            >
              <Zap size={18} />
              {isAr ? "جرب المرشد الذكي" : "Try AI Mentor"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
