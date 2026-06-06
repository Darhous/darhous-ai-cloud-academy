"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, Bot, BookOpen, Trophy } from "lucide-react";

const STEP_ICONS  = [Target, Bot, BookOpen, Trophy];
const STEP_COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)", "#4ade80"] as const;
const STEP_BGS    = ["rgba(142,213,255,0.1)", "rgba(208,188,255,0.1)", "rgba(60,224,251,0.1)", "rgba(74,222,128,0.1)"] as const;
const STEP_BORDERS = ["rgba(142,213,255,0.25)", "rgba(208,188,255,0.25)", "rgba(60,224,251,0.25)", "rgba(74,222,128,0.25)"] as const;

export default function HowItWorks({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const steps = isAr
    ? [
        { num: "01", title: "اختار هدفك",              desc: "حدد مستواك واهتمامك والوقت المتاح لك يوميًا" },
        { num: "02", title: "المرشد يبني لك خطة",       desc: "الذكاء الاصطناعي يصمم مسارًا أسبوعيًا مخصصًا لك" },
        { num: "03", title: "اتعلم وطبّق",              desc: "ادخل البوابات، اتعلم، واعمل مشاريع حقيقية" },
        { num: "04", title: "احصل على شهادة وطوّر مسارك", desc: "شهادات معتمدة وتوصيات ذكية للخطوة القادمة" },
      ]
    : [
        { num: "01", title: "Choose Your Goal",          desc: "Set your level, interest, and daily available time" },
        { num: "02", title: "Mentor Builds Your Plan",   desc: "AI designs a custom weekly roadmap just for you" },
        { num: "03", title: "Learn & Apply",             desc: "Enter portals, learn, and build real projects" },
        { num: "04", title: "Get Certified & Level Up",  desc: "Verified certificates and smart next-step recommendations" },
      ];

  return (
    <section id="journey" className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "رحلتك في 4 خطوات" : "Your Journey in 4 Steps"}
        </h2>
        <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي" : "From zero to mastery — step by step with your AI mentor"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connecting line (desktop) */}
        <div
          className="absolute top-10 start-[12.5%] end-[12.5%] h-px hidden lg:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(142,213,255,0.2), rgba(208,188,255,0.2), rgba(60,224,251,0.2), transparent)" }}
        />

        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <motion.div
              key={step.num}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: shouldReduce ? 0 : i * 0.1 }}
              className="glass-card rounded-2xl p-7 flex flex-col items-center text-center gap-4 relative"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                style={{ background: STEP_BGS[i], border: `1px solid ${STEP_BORDERS[i]}` }}
              >
                <Icon size={24} style={{ color: STEP_COLORS[i] }} />
              </div>
              <div>
                <p className="text-xs font-mono mb-1" style={{ color: STEP_COLORS[i] }}>{step.num}</p>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
