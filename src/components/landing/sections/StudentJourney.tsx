"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  UserPlus, Brain, BookOpen, Hammer, Award, Rocket,
  type LucideIcon,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
interface Step {
  num: string;
  Icon: LucideIcon;
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
  color: string;
  isLast?: boolean;
}

const STEPS: Step[] = [
  {
    num: "01", Icon: UserPlus,
    labelAr: "انضم مجاناً",
    labelEn: "Join Free",
    descAr: "سجّل في 30 ثانية — لا بطاقة ائتمان، لا التزام. ابدأ رحلتك فوراً.",
    descEn: "Sign up in 30 seconds — no credit card, no commitment. Start your journey now.",
    color: "var(--color-primary)",
  },
  {
    num: "02", Icon: Brain,
    labelAr: "قيّم مستواك",
    labelEn: "Assess Your Level",
    descAr: "تقييم ذكاء اصطناعي دقيق يحدد مستواك الحقيقي ويبني لك خارطة طريق مخصصة.",
    descEn: "Precise AI assessment maps your true level and builds your custom roadmap.",
    color: "var(--color-secondary)",
  },
  {
    num: "03", Icon: BookOpen,
    labelAr: "تعلّم بمسار مخصص",
    labelEn: "Learn Your Custom Path",
    descAr: "محتوى تفاعلي ومرشد ذكي يتكيّف مع وتيرتك وأسلوبك وظروفك.",
    descEn: "Interactive content and a smart mentor that adapts to your pace and style.",
    color: "var(--color-tertiary)",
  },
  {
    num: "04", Icon: Hammer,
    labelAr: "طبّق بمشاريع حقيقية",
    labelEn: "Apply With Real Projects",
    descAr: "مشاريع وتحديات عملية تثبّت المعرفة وتبني بورتفوليو قابلاً للعرض على أصحاب العمل.",
    descEn: "Real challenges that cement knowledge and build a portfolio employers can see.",
    color: "#4ade80",
  },
  {
    num: "05", Icon: Award,
    labelAr: "احصل على شهادتك",
    labelEn: "Get Your Certificate",
    descAr: "شهادات رقمية موثقة معترف بها في سوق العمل العربي والعالمي.",
    descEn: "Verified digital certificates recognized in Arab and global job markets.",
    color: "#f59e0b",
  },
  {
    num: "06", Icon: Rocket,
    labelAr: "ابنِ مسيرتك المهنية",
    labelEn: "Build Your Career",
    descAr: "محلّل CV ذكي، مطابقة وظائف بالذكاء الاصطناعي، وتدريب على المقابلات — من التعلم إلى التوظيف.",
    descEn: "Smart CV analyzer, AI job matching, and interview coaching — from learning to hired.",
    color: "#f97316",
    isLast: true,
  },
];

/* ─── Section ────────────────────────────────────────────────────── */
export default function StudentJourney({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = !!useReducedMotion();

  return (
    <section className="container-xl relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(60,224,251,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <JourneyHeader isAr={isAr} shouldReduce={shouldReduce} />

      {/* Steps */}
      <div className="relative mt-16 max-w-2xl mx-auto">
        <VerticalLine count={STEPS.length} shouldReduce={shouldReduce} />
        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} isAr={isAr} shouldReduce={shouldReduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Header ─────────────────────────────────────────────────────── */
function JourneyHeader({ isAr, shouldReduce }: { isAr: boolean; shouldReduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as const }}
      className="text-center relative z-10"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
        style={{ background: "rgba(60,224,251,0.06)", borderColor: "rgba(60,224,251,0.2)", color: "var(--color-tertiary)" }}
      >
        {isAr ? "رحلة المتعلم" : "Learning Journey"}
      </div>
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
        {isAr ? "من الصفر إلى الاحتراف" : "From Zero to Mastery"}
      </h2>
      <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "ست مراحل مدروسة ترافقك من أول خطوة حتى تبني مسيرتك المهنية الحقيقية"
          : "Six thoughtful stages guiding you from step one to a real career"}
      </p>
    </motion.div>
  );
}

/* ─── Vertical timeline line ─────────────────────────────────────── */
function VerticalLine({ count, shouldReduce }: { count: number; shouldReduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const lineH = count * 130;
  return (
    <div
      ref={ref}
      className="absolute top-0 overflow-hidden pointer-events-none"
      style={{
        insetInlineEnd: "calc(3rem - 1px)",
        width: "1px",
        height: `${lineH}px`,
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          background: "linear-gradient(180deg, var(--color-primary), var(--color-secondary), var(--color-tertiary), #4ade80, #f59e0b, #f97316)",
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: shouldReduce ? 0.1 : 2.4, ease: [0.16, 1, 0.3, 1] as const }}
      />
    </div>
  );
}

/* ─── Single step card ───────────────────────────────────────────── */
function StepCard({ step, index, isAr, shouldReduce }: {
  step: Step;
  index: number;
  isAr: boolean;
  shouldReduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Alternating slide direction
  const xDir = index % 2 === 0 ? 48 : -48;
  const xInit = shouldReduce ? 0 : (isAr ? -xDir : xDir);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, x: xInit }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0, 0, 0.2, 1] as const }}
      className="relative pb-5"
      style={{ paddingInlineEnd: "4.5rem" }}
    >
      {/* Dot on the line */}
      <div
        className="absolute top-5 flex items-center justify-center"
        style={{ insetInlineEnd: "calc(3rem - 1rem)", width: "2rem", height: "2rem" }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute rounded-full"
          animate={inView ? { scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
          style={{ width: "2.4rem", height: "2.4rem", background: step.color }}
        />
        {/* Number dot */}
        <div
          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-black font-mono text-[11px]"
          style={{
            background: "var(--color-background, #0c0e12)",
            border: `2px solid ${step.color}`,
            color: step.color,
            boxShadow: `0 0 14px ${step.color}55`,
          }}
        >
          {parseInt(step.num)}
        </div>
      </div>

      {/* Card */}
      <div
        className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 group hover:scale-[1.01]"
        style={{
          background: step.isLast
            ? `linear-gradient(135deg, ${step.color}08, rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${step.isLast ? step.color + "35" : "rgba(255,255,255,0.07)"}`,
          boxShadow: step.isLast ? `0 0 40px ${step.color}12` : undefined,
        }}
      >
        {/* Watermark number */}
        <div
          className="absolute top-0 end-3 font-black font-mono select-none pointer-events-none opacity-[0.07] leading-none"
          style={{ fontSize: "5rem", color: step.color }}
        >
          {step.num}
        </div>

        {/* Icon + stage label row */}
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
          >
            <step.Icon size={16} style={{ color: step.color }} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: step.color }}>
            {isAr ? `المرحلة ${step.num}` : `STAGE ${step.num}`}
          </span>
          {step.isLast && (
            <span
              className="ms-auto px-2 py-0.5 rounded-full text-[9px] font-bold font-mono"
              style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
            >
              {isAr ? "الهدف النهائي" : "Final Goal"}
            </span>
          )}
        </div>

        {/* Content */}
        <h3
          className="font-display font-bold text-lg md:text-xl mb-1.5 leading-snug relative z-10"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? step.labelAr : step.labelEn}
        </h3>
        <p className="text-sm leading-relaxed relative z-10" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? step.descAr : step.descEn}
        </p>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.07 + 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-4 h-px rounded-full relative z-10"
          style={{
            background: `linear-gradient(${isAr ? "to left" : "to right"}, ${step.color}55, transparent)`,
            maxWidth: "10rem",
            transformOrigin: isAr ? "right" : "left",
          }}
        />
      </div>
    </motion.div>
  );
}
