"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEP_COLORS = [
  "var(--color-primary)",    /* #8ed5ff - blue  */
  "var(--color-secondary)",  /* #d0bcff - purple */
  "var(--color-tertiary)",   /* #3ce0fb - teal  */
  "#4ade80",                 /* green           */
] as const;

export default function HowItWorks({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const steps = isAr
    ? [
        { num: "01", label: "اختر هدفك",                desc: "حدد مستواك واهتمامك والوقت المتاح لك يوميًا — بيبنيلك المرشد خطة بناءً عليها." },
        { num: "02", label: "المرشد يبني لك خطة",        desc: "الذكاء الاصطناعي يصمم مسارًا أسبوعيًا مخصصًا بالكامل لك ولظروفك." },
        { num: "03", label: "اتعلم وطبّق",               desc: "ادخل البوابات، اتعلم المحتوى، واعمل مشاريع حقيقية خطوة بخطوة." },
        { num: "04", label: "احصل على شهادة وطوّر مسارك", desc: "شهادات معتمدة وتوصيات ذكية للخطوة القادمة بناءً على أداءك." },
      ]
    : [
        { num: "01", label: "Choose Your Goal",           desc: "Set your level, interest, and daily time — the mentor builds on top of that." },
        { num: "02", label: "Mentor Builds Your Plan",    desc: "AI designs a fully custom weekly roadmap tailored to your situation." },
        { num: "03", label: "Learn & Apply",              desc: "Enter the portals, absorb content, and build real projects step by step." },
        { num: "04", label: "Get Certified & Level Up",   desc: "Verified certificates and smart next-step recommendations based on your performance." },
      ];

  return (
    <section id="journey" className="container-xl relative z-10">
      {/* Header */}
      <StepHeader isAr={isAr} />

      {/* Timeline */}
      <div className="relative mt-16 max-w-2xl mx-auto">

        {/* Vertical line */}
        <VerticalLine total={steps.length} />

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <TimelineStep
              key={step.num}
              num={step.num}
              label={step.label}
              desc={step.desc}
              color={STEP_COLORS[i]}
              index={i}
              isAr={isAr}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
function StepHeader({ isAr }: { isAr: boolean }) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
      className="text-center"
    >
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
        {isAr ? "رحلتك في 4 خطوات" : "Your Journey in 4 Steps"}
      </h2>
      <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي الذي يرافقك في كل مرحلة"
          : "From zero to mastery — step by step with your AI mentor guiding you at every stage"}
      </p>
    </motion.div>
  );
}

/* ─── Animated vertical line ────────────────────────────────── */
function VerticalLine({ total }: { total: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="absolute start-6 md:start-1/2 top-0 w-px overflow-hidden"
      style={{
        height: `${total * 140 - 40}px`,
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        className="w-full"
        style={{
          background: "linear-gradient(180deg, var(--color-primary), var(--color-secondary), var(--color-tertiary), #4ade80)",
          height: "100%",
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ─── Single step row ────────────────────────────────────────── */
interface StepProps {
  num: string;
  label: string;
  desc: string;
  color: string;
  index: number;
  isAr: boolean;
}

function TimelineStep({ num, label, desc, color, index, isAr }: StepProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isAr ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0, 0, 0.2, 1] }}
      className="relative flex items-start gap-6 md:gap-10 pb-16"
    >
      {/* Dot on the line */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center mt-1"
        style={{ width: "3rem", height: "3rem" }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute rounded-full"
          animate={inView ? { scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4 }}
          style={{
            width: "2.5rem", height: "2.5rem",
            background: color,
            borderRadius: "50%",
          }}
        />
        {/* Dot */}
        <div
          className="relative z-10 rounded-full flex items-center justify-center"
          style={{
            width: "2rem", height: "2rem",
            background: "var(--color-surface)",
            border: `2px solid ${color}`,
            boxShadow: `0 0 14px ${color}55`,
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        {/* Step number */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.1 }}
          className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
          style={{ color }}
        >
          {isAr ? `خطوة ${num}` : `STEP ${num}`}
        </motion.p>

        {/* Title — big */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.15, ease: [0, 0, 0.2, 1] }}
          className="font-display font-black text-2xl md:text-3xl mb-3"
          style={{ color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
        >
          {label}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.22, ease: [0, 0, 0.2, 1] }}
          className="text-base leading-relaxed"
          style={{ color: "var(--color-on-surface-variant)", maxWidth: "36rem" }}
        >
          {desc}
        </motion.p>

        {/* Accent line under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px rounded-full"
          style={{
            background: `linear-gradient(${isAr ? "to left" : "to right"}, ${color}55, transparent)`,
            maxWidth: "14rem",
            transformOrigin: isAr ? "right" : "left",
          }}
        />
      </div>
    </motion.div>
  );
}
