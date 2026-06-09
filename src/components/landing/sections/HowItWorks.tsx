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
    <section id="journey" className="container-xl relative z-10">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "رحلتك في 4 خطوات" : "Your Journey in 4 Steps"}
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي الذي يرافقك في كل مرحلة" : "From zero to mastery — step by step with your AI mentor guiding you at every stage"}
        </p>
      </motion.div>

      <div className="relative">
        {/* Animated Connecting Line (desktop) */}
        <div className="absolute top-12 start-[12.5%] end-[12.5%] h-0.5 hidden lg:block overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="absolute top-0 bottom-0 start-0 w-full"
            style={{
              background: "linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary), var(--color-tertiary), #4ade80, transparent)",
            }}
            initial={{ x: isAr ? "100%" : "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={step.num}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: shouldReduce ? 0 : i * 0.15 }}
                className="relative"
              >
                {/* Connector Dot */}
                <div className="hidden lg:flex absolute top-12 start-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10" style={{ background: "var(--color-surface)", border: `2px solid ${STEP_COLORS[i]}` }}>
                  <div className="w-full h-full rounded-full animate-ping opacity-50" style={{ background: STEP_COLORS[i] }} />
                </div>

                <div
                  className="glass-panel-promax rounded-[2rem] p-8 flex flex-col items-center text-center gap-5 mt-0 lg:mt-20 h-full transition-transform hover:-translate-y-2 duration-300"
                  style={{ border: `1px solid ${STEP_BORDERS[i]}` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 mb-2 shadow-lg"
                    style={{ background: STEP_BGS[i], border: `1px solid ${STEP_BORDERS[i]}`, color: STEP_COLORS[i] }}
                  >
                    <Icon size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-2 tracking-widest" style={{ color: STEP_COLORS[i] }}>
                      {isAr ? `خطوة ${step.num}` : `STEP ${step.num}`}
                    </p>
                    <h3 className="font-bold text-xl mb-3" style={{ color: "var(--color-on-surface)" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
