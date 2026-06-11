"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── Count-up hook ─────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.floor(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setValue(target);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [inView, target, duration, delay]);
  return value;
}

/* ─── Single stat card ──────────────────────────────────────────── */
interface StatDef {
  end: number;
  prefix?: string;
  suffix: string;
  labelAr: string;
  labelEn: string;
  noteAr: string;
  noteEn: string;
  color: string;
  delay: number;
}

const STATS: StatDef[] = [
  {
    end: 5000, suffix: "+",
    labelAr: "طالب نشط", labelEn: "Active Students",
    noteAr: "من 12 دولة عربية", noteEn: "across 12 Arab countries",
    color: "var(--color-primary)", delay: 0,
  },
  {
    end: 300, suffix: "+",
    labelAr: "دورة ومسار", labelEn: "Courses & Paths",
    noteAr: "محدَّثة باستمرار", noteEn: "continuously updated",
    color: "var(--color-secondary)", delay: 120,
  },
  {
    end: 6, suffix: "",
    labelAr: "بوابات تعليمية", labelEn: "Learning Portals",
    noteAr: "نظام بيئي متكامل", noteEn: "integrated ecosystem",
    color: "var(--color-tertiary)", delay: 240,
  },
  {
    end: 96, suffix: "%",
    labelAr: "معدل الرضا", labelEn: "Satisfaction Rate",
    noteAr: "من استطلاعات المتعلمين", noteEn: "from learner surveys",
    color: "#4ade80", delay: 360,
  },
];

function StatCard({ stat, inView, isAr, shouldReduce }: {
  stat: StatDef;
  inView: boolean;
  isAr: boolean;
  shouldReduce: boolean;
}) {
  const animated = useCountUp(stat.end, inView, 1800, stat.delay);
  const count = shouldReduce ? stat.end : animated;

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: stat.delay / 1000, ease: [0, 0, 0.2, 1] as const }}
      className="relative flex flex-col items-center justify-center p-8 group"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 80%, ${stat.color}18 0%, transparent 70%)` }}
      />

      {/* Number */}
      <div className="relative z-10 flex items-end gap-0.5 mb-2">
        <span
          className="font-display font-black leading-none tabular-nums"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: stat.color,
            textShadow: `0 0 40px ${stat.color}55`,
          }}
        >
          {stat.end >= 1000
            ? count >= 1000
              ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, "0")}`
              : count.toString()
            : count}
        </span>
        {stat.suffix && (
          <span
            className="font-display font-black text-3xl mb-1"
            style={{ color: stat.color }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="font-bold text-base mb-1 text-center" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? stat.labelAr : stat.labelEn}
      </p>
      <p className="font-mono text-[10px] tracking-wide text-center opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? stat.noteAr : stat.noteEn}
      </p>

      {/* Bottom accent */}
      <motion.div
        className="mt-4 h-0.5 rounded-full w-12"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: stat.delay / 1000 + 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ background: `linear-gradient(to right, ${stat.color}, ${stat.color}00)`, transformOrigin: isAr ? "right" : "left" }}
      />
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function ImpactNumbers({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="container-xl relative">
      {/* Header */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as const }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
        >
          {isAr ? "أثر المنصة" : "Platform Impact"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-3 text-gradient-premium">
          {isAr ? "أرقام تتحدث بدلاً عنّا" : "Numbers That Speak For Us"}
        </h2>
        <p className="text-sm md:text-base opacity-60 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "أرقام حقيقية من متعلمين حقيقيين في العالم العربي"
            : "Real numbers from real learners across the Arab world"}
        </p>
      </motion.div>

      {/* Stats panel */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Corner glows */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", opacity: 0.08 }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)", opacity: 0.08 }} />

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
          {STATS.map((stat) => (
            <StatCard
              key={stat.labelEn}
              stat={stat}
              inView={inView}
              isAr={isAr}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
