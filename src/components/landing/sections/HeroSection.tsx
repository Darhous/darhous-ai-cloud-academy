"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles, ArrowRight, ArrowLeft, Target, Trophy, ChevronDown,
  Bot, Globe, Monitor, Briefcase, Settings2, Cpu,
} from "lucide-react";

interface Props {
  locale: string;
  scrollToPath: () => void;
}

const OS_ITEMS = (isAr: boolean) => [
  { label: isAr ? "أكاديمية AI"   : "AI Academy",    color: "#8ed5ff", pct: 68,  Icon: Bot,       badge: undefined },
  { label: isAr ? "مستوى اللغة"  : "Language Level", color: "#c084fc", pct: 100, Icon: Globe,     badge: "B2" },
  { label: isAr ? "اختبار رقمي"   : "Digital Exam",   color: "#3ce0fb", pct: 45,  Icon: Monitor,   badge: undefined },
  { label: isAr ? "بوابة مهنية"   : "Career Hub",     color: "#fbbf24", pct: 20,  Icon: Briefcase, badge: undefined },
  { label: isAr ? "أتمتة"         : "Automation",     color: "#4ade80", pct: 10,  Icon: Settings2, badge: undefined },
  { label: isAr ? "IoT Lab"        : "IoT Lab",        color: "#f97316", pct: 5,   Icon: Cpu,       badge: undefined },
];

export default function HeroSection({ locale, scrollToPath }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  return (
    <section className="container-xl pt-12 md:pt-24 relative">
      {/* Ambient orbs — breathing animation */}
      <div
        className="absolute top-0 end-0 pointer-events-none orb-breathe"
        style={{ width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(142,213,255,0.08) 0%, transparent 65%)", filter: "blur(120px)", animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-0 start-0 pointer-events-none orb-breathe-slow"
        style={{ width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(87,27,193,0.1) 0%, transparent 65%)", filter: "blur(100px)", animationDelay: "2.5s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
        {/* Version badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-mono"
            style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
          >
            <Sparkles size={13} />
            {isAr ? "نظام التعلم الذكي الجديد — v13.0" : "Smart Learning OS — v13.0"}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.7, delay: shouldReduce ? 0 : 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl leading-tight"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? (
            <>ابدأ من الصفر… ودع الذكاء الاصطناعي<br /><span className="gradient-text">يبني لك طريقك</span> التعليمي والمهني</>
          ) : (
            <>Start from Zero — Let AI<br /><span className="gradient-text">Build Your Path</span> to Learning & Career</>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.6, delay: shouldReduce ? 0 : 0.2 }}
          className="text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? "منصة درهوس الذكية تفهمك وتضع لك خطة واضحة خطوة بخطوة — حتى لو لا تعرف من أين تبدأ"
            : "Darhous Smart Platform understands you and builds a clear plan step by step — even if you don't know where to start"}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.6, delay: shouldReduce ? 0 : 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
        >
          <button
            onClick={scrollToPath}
            className="glow-button-primary text-white font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Sparkles size={15} />
            {isAr ? "أنا مبتدئ وعايز أبدأ" : "I'm a Beginner — Let's Start"}
            <Arrow size={14} />
          </button>
          <button
            onClick={scrollToPath}
            className="glow-button-secondary font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            <Target size={15} />
            {isAr ? "عايز أتعلم مهارة محددة" : "I Want a Specific Skill"}
          </button>
          <button
            onClick={scrollToPath}
            className="font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm transition-all hover:opacity-80"
            style={{ color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
          >
            <Trophy size={15} />
            {isAr ? "عايز أطور شغلي أو أشتغل" : "I Want to Advance My Career"}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: shouldReduce ? 0 : 1.2, duration: shouldReduce ? 0.15 : 0.6 }}
          onClick={scrollToPath}
          className="flex flex-col items-center gap-1 text-xs font-mono opacity-40 hover:opacity-70 transition-opacity mt-2"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? "اكتشف المنصة" : "Explore the platform"}
          <ChevronDown size={16} className="animate-bounce" />
        </motion.button>

        {/* OS Mockup */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.8, delay: shouldReduce ? 0 : 0.4 }}
          whileHover={shouldReduce ? undefined : { scale: 1.006, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
          className="glass-card rounded-2xl overflow-hidden w-full max-w-3xl"
          style={{ border: "1px solid rgba(142,213,255,0.12)", boxShadow: "0 24px 100px rgba(0,0,0,0.45)" }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ms-3 text-xs font-mono opacity-40" style={{ color: "var(--color-on-surface-variant)" }}>
              Darhous Smart Learning OS — v13.0
            </span>
          </div>
          {/* Portal progress grid */}
          <div className="p-5 grid grid-cols-3 gap-3">
            {OS_ITEMS(isAr).map((item, i) => (
              <div
                key={item.label}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <item.Icon size={12} style={{ color: item.color, flexShrink: 0 }} />
                  <p className="text-[10px] font-mono truncate" style={{ color: item.color }}>{item.label}</p>
                  {item.badge && (
                    <span className="ms-auto text-[9px] px-1.5 rounded-full font-mono" style={{ background: `${item.color}20`, color: item.color }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                {/* Animated progress bar — scaleX from 0 to item.pct/100 */}
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full w-full rounded-full"
                    style={{
                      transformOrigin: isAr ? "100% 0" : "0 0",
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}60`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: item.pct / 100 }}
                    transition={{
                      duration: shouldReduce ? 0 : 0.85,
                      delay: shouldReduce ? 0 : 0.55 + i * 0.1,
                      ease: [0.0, 0.0, 0.2, 1],
                    }}
                  />
                </div>
                <p className="text-[10px] mt-1 text-end font-mono opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
                  {item.pct}%
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
