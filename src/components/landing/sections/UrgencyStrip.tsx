"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowLeft, ArrowRight, Zap } from "lucide-react";

/* ─── Section ────────────────────────────────────────────────────── */
export default function UrgencyStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="container-xl">
      <motion.div
        ref={ref}
        initial={shouldReduce ? false : { opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as const }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(249,115,22,0.08) 100%)",
          border: "1px solid rgba(251,191,36,0.2)",
          boxShadow: "0 0 60px rgba(251,191,36,0.06), inset 0 1px 0 rgba(251,191,36,0.1)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-0 start-0 w-48 h-48 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 end-0 w-48 h-48 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7">
          {/* Left: text */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-start">
            {/* Icon badge */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}
            >
              <Sparkles size={20} style={{ color: "#fbbf24" }} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                  style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}
                >
                  {isAr ? "عرض محدود الوقت" : "Limited Offer"}
                </span>
                <PulseDot />
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl" style={{ color: "var(--color-on-surface)" }}>
                {isAr
                  ? "🎓 أول 30 يوماً مجاناً — ابدأ اليوم"
                  : "🎓 First 30 Days Free — Start Today"}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr
                  ? "لا بطاقة ائتمان مطلوبة · إلغاء في أي وقت · وصول فوري لجميع البوابات"
                  : "No credit card · Cancel anytime · Instant access to all portals"}
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
                color: "#0c0e12",
                boxShadow: "0 8px 24px rgba(251,191,36,0.3)",
              }}
            >
              <Zap size={16} />
              {isAr ? "ابدأ مجاناً الآن" : "Start Free Now"}
              <Arrow size={16} />
            </Link>
            <p className="text-[10px] font-mono" style={{ color: "rgba(251,191,36,0.6)" }}>
              {isAr ? "لا يحتاج بطاقة ائتمانية" : "No credit card needed"}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Pulse dot ─────────────────────────────────────────────────── */
function PulseDot() {
  return (
    <span className="relative inline-flex w-2 h-2">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ background: "#fbbf24" }}
      />
      <span
        className="relative inline-flex rounded-full w-2 h-2"
        style={{ background: "#fbbf24" }}
      />
    </span>
  );
}
