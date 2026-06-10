"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles, ArrowRight, ArrowLeft, Target, ChevronDown,
  Bot, Globe, Monitor, Briefcase, Settings2, Cpu, CheckCircle2, Play
} from "lucide-react";

interface Props {
  locale: string;
  scrollToPath: () => void;
  onStartTour?: () => void;
}

const OS_ITEMS = (isAr: boolean) => [
  { label: isAr ? "أكاديمية AI"   : "AI Academy",    color: "#8ed5ff", pct: 68,  Icon: Bot,       badge: undefined },
  { label: isAr ? "مستوى اللغة"  : "Language Level", color: "#c084fc", pct: 100, Icon: Globe,     badge: "B2" },
  { label: isAr ? "اختبار رقمي"   : "Digital Exam",   color: "#3ce0fb", pct: 45,  Icon: Monitor,   badge: undefined },
  { label: isAr ? "بوابة مهنية"   : "Career Hub",     color: "#fbbf24", pct: 20,  Icon: Briefcase, badge: undefined },
  { label: isAr ? "أتمتة"         : "Automation",     color: "#4ade80", pct: 10,  Icon: Settings2, badge: undefined },
  { label: isAr ? "IoT Lab"        : "IoT Lab",        color: "#f97316", pct: 5,   Icon: Cpu,       badge: undefined },
];

export default function HeroSection({ locale, scrollToPath, onStartTour }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  return (
    <section className="container-xl pt-16 md:pt-28 relative">
      {/* Ambient cinematic orbs */}
      <div
        className="absolute top-[-10%] end-[-5%] pointer-events-none orb-breathe"
        style={{ width: "65vw", height: "65vw", background: "radial-gradient(circle, rgba(142,213,255,0.06) 0%, transparent 60%)", filter: "blur(140px)", animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-[-10%] start-[-10%] pointer-events-none orb-breathe-slow"
        style={{ width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(87,27,193,0.08) 0%, transparent 65%)", filter: "blur(120px)", animationDelay: "2.5s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Version / Launch badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-mono glass-panel-promax"
            style={{ color: "var(--color-primary)" }}
          >
            <Sparkles size={14} />
            {isAr ? "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم" : "NexaLearn by Ahmed Darhous — Next Gen Learning"}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.7, delay: shouldReduce ? 0 : 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl leading-tight md:leading-[1.1]"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? (
            <>
              <span className="text-gradient-premium">تعلّم بذكاء.</span> <br className="hidden md:block"/>
              ابنِ بمهارة. تقدّم بثقة.
            </>
          ) : (
            <>
              <span className="text-gradient-premium">Learn Intelligently.</span> <br className="hidden md:block"/>
              Build Skillfully. Advance Confidently.
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.6, delay: shouldReduce ? 0 : 0.2 }}
          className="text-lg md:text-2xl leading-relaxed max-w-3xl opacity-90"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، معامل تفاعلية، وتوجيه مهني مستمر للوصول إلى أهدافك أسرع."
            : "The first AI-powered Arabic learning ecosystem. Personalized paths, interactive labs, and continuous career mentorship to reach your goals faster."}
        </motion.p>
        
        {/* Proof Points */}
        <motion.div 
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.6, delay: shouldReduce ? 0 : 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium opacity-80"
          style={{ color: "var(--color-on-surface)" }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "var(--color-primary)" }} />
            <span>{isAr ? "مسارات مدعومة بالذكاء الاصطناعي" : "AI-Powered Paths"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "var(--color-tertiary)" }} />
            <span>{isAr ? "معامل تطبيقية وتفاعلية" : "Interactive Applied Labs"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "var(--color-secondary)" }} />
            <span>{isAr ? "توجيه مهني مستمر" : "Continuous Mentorship"}</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.6, delay: shouldReduce ? 0 : 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap mt-2"
        >
          <button
            onClick={scrollToPath}
            className="premium-glow-button px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 text-base md:text-lg font-semibold tap-press"
            style={{ color: "var(--color-primary)" }}
          >
            <Sparkles size={18} />
            {isAr ? "ابدأ رحلتك الآن" : "Start Your Journey"}
            <Arrow size={18} className="ms-1" />
          </button>
          <button
            onClick={scrollToPath}
            className="px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 text-base md:text-lg font-semibold transition-colors hover:bg-white/5 tap-press"
            style={{ color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Target size={18} />
            {isAr ? "تصفح المسارات" : "Explore Paths"}
          </button>
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="px-6 py-4 rounded-xl inline-flex items-center justify-center gap-2 text-base font-semibold transition-all hover:bg-white/5 tap-press opacity-70 hover:opacity-100"
              style={{ color: "var(--color-on-surface-variant)" }}
              aria-label={isAr ? "جولة سريعة في المنصة" : "Take a quick tour"}
            >
              <Play size={16} />
              {isAr ? "جولة سريعة" : "Quick Tour"}
            </button>
          )}
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: shouldReduce ? 0 : 1.2, duration: shouldReduce ? 0.15 : 0.6 }}
          onClick={scrollToPath}
          className="flex flex-col items-center gap-1 text-xs font-mono opacity-40 hover:opacity-70 transition-opacity mt-6 md:mt-10"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? "اكتشف المنصة" : "Explore the platform"}
          <ChevronDown size={16} className="animate-bounce mt-1" />
        </motion.button>

        {/* Cinematic Command Center Mockup */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: shouldReduce ? 0.15 : 0.8, delay: shouldReduce ? 0 : 0.5 }}
          className="w-full max-w-4xl mt-4 md:mt-8 relative z-20"
        >
          <div className="glass-panel-promax rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative text-start">
            {/* Left/Top Panel: AI Mentor Chat */}
            <div className="w-full md:w-1/3 p-6 flex flex-col gap-4" style={{ background: "rgba(0,0,0,0.15)", borderInlineEnd: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{isAr ? "الموجه الذكي" : "AI Mentor"}</h4>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "يحلل مهاراتك..." : "Analyzing skills..."}</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl text-xs leading-relaxed relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--color-on-surface)" }}>
                <div className="absolute -left-1 top-4 w-1 h-4 rounded-full bg-blue-400" style={{ [isAr ? "right" : "left"]: "-4px" }} />
                {isAr 
                  ? "لقد قمت بتحليل أهدافك. أفضل بداية لك هي التركيز على مسار هندسة الأوامر بجانب أساسيات الشبكات."
                  : "I've analyzed your goals. Your best starting point is focusing on Prompt Engineering alongside Network Basics."}
              </div>
              <div className="flex gap-2">
                 <span className="px-3 py-1.5 rounded-full text-[10px] font-mono cursor-pointer" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}>
                   {isAr ? "اعتماد الخطة" : "Approve Plan"}
                 </span>
                 <span className="px-3 py-1.5 rounded-full text-[10px] font-mono cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)" }}>
                   {isAr ? "تعديل الهدف" : "Edit Goal"}
                 </span>
              </div>
            </div>

            {/* Right/Bottom Panel: Ecosystem Progress */}
            <div className="w-full md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "نظرة عامة على التعلم" : "Learning Overview"}
                </h4>
                <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {isAr ? "متصل بالنظام البيئي" : "Ecosystem Online"}
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {OS_ITEMS(isAr).map((item, i) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4 relative overflow-hidden group transition-all"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }} />
                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex justify-between items-start">
                        <item.Icon size={16} style={{ color: item.color }} />
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-sm font-mono" style={{ background: `${item.color}15`, color: item.color }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium truncate" style={{ color: "var(--color-on-surface)" }}>{item.label}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="h-1 flex-1 rounded-full overflow-hidden bg-white/5 me-3">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ transformOrigin: isAr ? "100% 0" : "0 0", background: item.color, boxShadow: `0 0 6px ${item.color}40` }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: item.pct / 100 }}
                              transition={{ duration: shouldReduce ? 0 : 0.85, delay: shouldReduce ? 0 : 0.6 + i * 0.1, ease: [0.0, 0.0, 0.2, 1] }}
                            />
                          </div>
                          <span className="text-[10px] font-mono opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>{item.pct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
