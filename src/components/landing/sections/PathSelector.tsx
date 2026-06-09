"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, ArrowRight, ArrowLeft, Compass,
  Sprout, Book, Rocket, Target, Briefcase, Hammer,
  Timer, Clock, Flame, Bot, Globe, Plug, Cog, Monitor,
  Trophy, ClipboardList, Search, CheckCircle,
  type LucideIcon
} from "lucide-react";

export type Level     = "beginner" | "intermediate" | "advanced" | null;
export type Goal      = "new-skill" | "career" | "project" | null;
export type DailyTime = "30min" | "1hr" | "2hr" | null;
export type Interest  = "ai" | "career" | "language" | "iot" | "automation" | "exams" | null;

interface WeekPlan { week: number; titleAr: string; titleEn: string; portalColor: string; Icon: LucideIcon }

function getRecommendedPath(level: Level, goal: Goal, interest: Interest): WeekPlan[] {
  const base: WeekPlan[] = [
    { week: 1, titleAr: "أساسيات التحول الرقمي",         titleEn: "Digital Transformation Basics",     portalColor: "#3ce0fb", Icon: Monitor },
    { week: 2, titleAr: "اختبار تحديد مستوى اللغة الإنجليزية", titleEn: "English Level Assessment",  portalColor: "#c084fc", Icon: Globe },
    { week: 3, titleAr: "مدخل الذكاء الاصطناعي",         titleEn: "AI Introduction",                  portalColor: "#8ed5ff", Icon: Bot },
    { week: 4, titleAr: "بناء السيرة الذاتية المحترفة",   titleEn: "Professional CV Building",         portalColor: "#fbbf24", Icon: Briefcase },
    { week: 5, titleAr: "أساسيات الأتمتة التجارية",       titleEn: "Business Automation Basics",       portalColor: "#4ade80", Icon: Cog },
    { week: 6, titleAr: "مشروع Arduino / IoT تطبيقي",    titleEn: "Arduino / IoT Hands-on Project",    portalColor: "#f97316", Icon: Plug },
  ];

  if (interest === "ai") return [
    { week: 1, titleAr: "مدخل الذكاء الاصطناعي وأدواته",   titleEn: "AI Introduction & Tools",       portalColor: "#8ed5ff", Icon: Bot },
    { week: 2, titleAr: "كتابة البرومبتات الاحترافية",       titleEn: "Professional Prompt Writing",    portalColor: "#8ed5ff", Icon: Sparkles },
    { week: 3, titleAr: "تطبيق AI في المشاريع",              titleEn: "AI in Projects",                 portalColor: "#8ed5ff", Icon: Rocket },
    { week: 4, titleAr: "اختبار تحديد مستوى اللغة",          titleEn: "Language Level Assessment",      portalColor: "#c084fc", Icon: Globe },
    { week: 5, titleAr: "أتمتة المهام بالذكاء الاصطناعي",   titleEn: "Task Automation with AI",        portalColor: "#4ade80", Icon: Cog },
    { week: 6, titleAr: "مشروع AI تطبيقي كامل",              titleEn: "Full AI Applied Project",        portalColor: "#8ed5ff", Icon: Trophy },
  ];

  if (interest === "career") return [
    { week: 1, titleAr: "تحليل السيرة الذاتية بالذكاء الاصطناعي", titleEn: "AI CV Analysis",           portalColor: "#fbbf24", Icon: Briefcase },
    { week: 2, titleAr: "بناء ملف مهني قوي",                       titleEn: "Strong Professional Profile", portalColor: "#fbbf24", Icon: ClipboardList },
    { week: 3, titleAr: "التحضير للمقابلات",                        titleEn: "Interview Preparation",       portalColor: "#fbbf24", Icon: Target },
    { week: 4, titleAr: "مهارات التواصل المهني",                    titleEn: "Professional Communication",  portalColor: "#c084fc", Icon: Globe },
    { week: 5, titleAr: "البحث عن وظائف بذكاء",                    titleEn: "Smart Job Search",            portalColor: "#fbbf24", Icon: Search },
    { week: 6, titleAr: "استراتيجية التوظيف والتفاوض",              titleEn: "Employment Strategy & Negotiation", portalColor: "#4ade80", Icon: Trophy },
  ];

  if (goal === "project") return [
    { week: 1, titleAr: "اختيار أدوات المشروع",             titleEn: "Project Tool Selection",           portalColor: "#8ed5ff", Icon: Hammer },
    { week: 2, titleAr: "أساسيات المشروع التطبيقي",          titleEn: "Project Fundamentals",             portalColor: "#4ade80", Icon: Cog },
    { week: 3, titleAr: "مرحلة التطوير الأولى",              titleEn: "First Development Phase",          portalColor: "#f97316", Icon: Plug },
    { week: 4, titleAr: "تطبيق الذكاء الاصطناعي في المشروع", titleEn: "Applying AI to Project",          portalColor: "#8ed5ff", Icon: Bot },
    { week: 5, titleAr: "اختبار المشروع وتحسينه",            titleEn: "Project Testing & Improvement",   portalColor: "#3ce0fb", Icon: CheckCircle },
    { week: 6, titleAr: "عرض المشروع وتوثيقه",              titleEn: "Project Presentation & Documentation", portalColor: "#c084fc", Icon: Trophy },
  ];

  return base;
}

export default function PathSelector({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const shouldReduce = useReducedMotion();

  const [level,     setLevel]     = useState<Level>(null);
  const [goal,      setGoal]      = useState<Goal>(null);
  const [dailyTime, setDailyTime] = useState<DailyTime>(null);
  const [interest,  setInterest]  = useState<Interest>(null);

  const showPath = level && goal && dailyTime && interest;
  const recommendedPath = showPath ? getRecommendedPath(level, goal, interest) : [];

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
  };

  return (
    <section id="beginner-path" className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(208,188,255,0.07)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
        >
          <Compass size={12} />
          {isAr ? "خطتك الشخصية" : "Your Personal Plan"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-gradient-premium">
          {isAr ? "مش عارف تبدأ منين؟" : "Not Sure Where to Start?"}
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "اختار إجاباتك وهنعمل لك خطة أسبوعية مخصصة — مجانًا وفورًا"
            : "Answer these questions and we'll build a custom weekly plan for you — free and instant"}
        </p>
      </motion.div>

      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
        className="glass-panel-promax rounded-[2rem] p-6 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Level */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}>1</span>
              {isAr ? "ما مستواك الحالي؟" : "What's your current level?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              {([
                ["beginner", isAr ? "مبتدئ تمامًا" : "Complete Beginner", Sprout],
                ["intermediate", isAr ? "لدي أساسيات" : "Some Basics", Book],
                ["advanced", isAr ? "متقدم" : "Advanced", Rocket]
              ] as const).map(([val, label, Icon]) => (
                <button
                  key={val as string}
                  onClick={() => setLevel(val as Level)}
                  className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: level === val ? "rgba(208,188,255,0.15)" : "rgba(255,255,255,0.03)",
                    border:     level === val ? "1px solid rgba(208,188,255,0.4)" : "1px solid rgba(255,255,255,0.06)",
                    color:      level === val ? "var(--color-secondary)" : "var(--color-on-surface-variant)",
                    boxShadow:  level === val ? "0 0 20px rgba(208,188,255,0.1)" : "none",
                  }}
                >
                  <Icon size={16} /> {label as string}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Goal */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)" }}>2</span>
              {isAr ? "ما هدفك الرئيسي؟" : "What's your main goal?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              {([
                ["new-skill", isAr ? "مهارة جديدة" : "New Skill", Target],
                ["career", isAr ? "تطوير مهني" : "Career Growth", Briefcase],
                ["project", isAr ? "مشروع محدد" : "Specific Project", Hammer]
              ] as const).map(([val, label, Icon]) => (
                <button
                  key={val as string}
                  onClick={() => setGoal(val as Goal)}
                  className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: goal === val ? "rgba(142,213,255,0.12)" : "rgba(255,255,255,0.03)",
                    border:     goal === val ? "1px solid rgba(142,213,255,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    color:      goal === val ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                    boxShadow:  goal === val ? "0 0 20px rgba(142,213,255,0.1)" : "none",
                  }}
                >
                  <Icon size={16} /> {label as string}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Daily Time */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(60,224,251,0.15)", color: "var(--color-tertiary)" }}>3</span>
              {isAr ? "كم وقت متاح يوميًا؟" : "How much time daily?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              {([
                ["30min", isAr ? "٣٠ دقيقة" : "30 min", Timer],
                ["1hr", isAr ? "ساعة واحدة" : "1 hour", Clock],
                ["2hr", isAr ? "ساعتان أو أكثر" : "2+ hours", Flame]
              ] as const).map(([val, label, Icon]) => (
                <button
                  key={val as string}
                  onClick={() => setDailyTime(val as DailyTime)}
                  className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: dailyTime === val ? "rgba(60,224,251,0.12)" : "rgba(255,255,255,0.03)",
                    border:     dailyTime === val ? "1px solid rgba(60,224,251,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    color:      dailyTime === val ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                    boxShadow:  dailyTime === val ? "0 0 20px rgba(60,224,251,0.1)" : "none",
                  }}
                >
                  <Icon size={16} /> {label as string}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Interest */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>4</span>
              {isAr ? "ما مجال اهتمامك؟" : "What's your interest area?"}
            </p>
            <div className="flex gap-2 flex-wrap">
              {([
                ["ai",         isAr ? "ذكاء اصطناعي" : "AI",              Bot,       "#8ed5ff"],
                ["career",     isAr ? "مهنة & توظيف"  : "Career",          Briefcase, "#fbbf24"],
                ["language",   isAr ? "لغة إنجليزية"  : "Language",        Globe,     "#c084fc"],
                ["iot",        isAr ? "IoT & أردوينو" : "IoT & Arduino",   Plug,      "#f97316"],
                ["automation", isAr ? "أتمتة"          : "Automation",      Cog,       "#4ade80"],
                ["exams",      isAr ? "اختبارات رقمية" : "Digital Exams",  Monitor,   "#3ce0fb"],
              ] as const).map(([val, label, Icon, color]) => (
                <button
                  key={val as string}
                  onClick={() => setInterest(val as Interest)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5"
                  style={{
                    background: interest === val ? `${color as string}18` : "rgba(255,255,255,0.03)",
                    border:     interest === val ? `1px solid ${color as string}45` : "1px solid rgba(255,255,255,0.06)",
                    color:      interest === val ? (color as string) : "var(--color-on-surface-variant)",
                    boxShadow:  interest === val ? `0 0 16px ${color as string}15` : "none",
                  }}
                >
                  <Icon size={14} /> {label as string}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Result */}
        {showPath && (
          <motion.div
            key="path-result"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduce ? 0.15 : 0.5 }}
            className="mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={20} style={{ color: "var(--color-primary)" }} />
              <h3 className="font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "خطتك المقترحة" : "Your Suggested Plan"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedPath.map((item) => (
                <div
                  key={item.week}
                  className="rounded-2xl p-4 flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: `${item.portalColor}08`, border: `1px solid ${item.portalColor}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.portalColor}15`, color: item.portalColor }}
                  >
                    <item.Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-1" style={{ color: item.portalColor }}>
                      {isAr ? `الأسبوع ${item.week}` : `Week ${item.week}`}
                    </p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? item.titleAr : item.titleEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/register`}
                className="premium-glow-button glow-button-primary text-white font-medium px-8 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm"
              >
                <Sparkles size={16} />
                {isAr ? "ابدأ خطتي الآن" : "Start My Plan Now"}
                <Arrow size={16} />
              </Link>
              <Link
                href={`/${locale}/mentor`}
                className="glow-button-secondary font-medium px-6 py-3.5 rounded-xl text-sm inline-flex items-center gap-2"
                style={{ color: "var(--color-secondary)" }}
              >
                <Bot size={16} />
                {isAr ? "اسأل المرشد الذكي بدلًا من ذلك" : "Ask the AI Mentor instead"}
              </Link>
            </div>
          </motion.div>
        )}

        {!showPath && (
          <p className="text-center text-sm mt-8 opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "أجب على الأسئلة الأربعة لنرى خطتك" : "Answer all 4 questions to see your plan"}
          </p>
        )}
      </motion.div>
    </section>
  );
}
