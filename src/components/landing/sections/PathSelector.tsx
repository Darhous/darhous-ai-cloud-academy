"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, Compass } from "lucide-react";

export type Level     = "beginner" | "intermediate" | "advanced" | null;
export type Goal      = "new-skill" | "career" | "project" | null;
export type DailyTime = "30min" | "1hr" | "2hr" | null;
export type Interest  = "ai" | "career" | "language" | "iot" | "automation" | "exams" | null;

interface WeekPlan { week: number; titleAr: string; titleEn: string; portalColor: string; icon: string }

function getRecommendedPath(level: Level, goal: Goal, interest: Interest): WeekPlan[] {
  const base: WeekPlan[] = [
    { week: 1, titleAr: "أساسيات التحول الرقمي",         titleEn: "Digital Transformation Basics",     portalColor: "#3ce0fb", icon: "💻" },
    { week: 2, titleAr: "اختبار تحديد مستوى اللغة الإنجليزية", titleEn: "English Level Assessment",  portalColor: "#c084fc", icon: "🌐" },
    { week: 3, titleAr: "مدخل الذكاء الاصطناعي",         titleEn: "AI Introduction",                  portalColor: "#8ed5ff", icon: "🤖" },
    { week: 4, titleAr: "بناء السيرة الذاتية المحترفة",   titleEn: "Professional CV Building",         portalColor: "#fbbf24", icon: "💼" },
    { week: 5, titleAr: "أساسيات الأتمتة التجارية",       titleEn: "Business Automation Basics",       portalColor: "#4ade80", icon: "⚙️" },
    { week: 6, titleAr: "مشروع Arduino / IoT تطبيقي",    titleEn: "Arduino / IoT Hands-on Project",    portalColor: "#f97316", icon: "🔌" },
  ];

  if (interest === "ai") return [
    { week: 1, titleAr: "مدخل الذكاء الاصطناعي وأدواته",   titleEn: "AI Introduction & Tools",       portalColor: "#8ed5ff", icon: "🤖" },
    { week: 2, titleAr: "كتابة البرومبتات الاحترافية",       titleEn: "Professional Prompt Writing",    portalColor: "#8ed5ff", icon: "✨" },
    { week: 3, titleAr: "تطبيق AI في المشاريع",              titleEn: "AI in Projects",                 portalColor: "#8ed5ff", icon: "🚀" },
    { week: 4, titleAr: "اختبار تحديد مستوى اللغة",          titleEn: "Language Level Assessment",      portalColor: "#c084fc", icon: "🌐" },
    { week: 5, titleAr: "أتمتة المهام بالذكاء الاصطناعي",   titleEn: "Task Automation with AI",        portalColor: "#4ade80", icon: "⚙️" },
    { week: 6, titleAr: "مشروع AI تطبيقي كامل",              titleEn: "Full AI Applied Project",        portalColor: "#8ed5ff", icon: "🏆" },
  ];

  if (interest === "career") return [
    { week: 1, titleAr: "تحليل السيرة الذاتية بالذكاء الاصطناعي", titleEn: "AI CV Analysis",           portalColor: "#fbbf24", icon: "💼" },
    { week: 2, titleAr: "بناء ملف مهني قوي",                       titleEn: "Strong Professional Profile", portalColor: "#fbbf24", icon: "📋" },
    { week: 3, titleAr: "التحضير للمقابلات",                        titleEn: "Interview Preparation",       portalColor: "#fbbf24", icon: "🎯" },
    { week: 4, titleAr: "مهارات التواصل المهني",                    titleEn: "Professional Communication",  portalColor: "#c084fc", icon: "🌐" },
    { week: 5, titleAr: "البحث عن وظائف بذكاء",                    titleEn: "Smart Job Search",            portalColor: "#fbbf24", icon: "🔍" },
    { week: 6, titleAr: "استراتيجية التوظيف والتفاوض",              titleEn: "Employment Strategy & Negotiation", portalColor: "#4ade80", icon: "🏆" },
  ];

  if (goal === "project") return [
    { week: 1, titleAr: "اختيار أدوات المشروع",             titleEn: "Project Tool Selection",           portalColor: "#8ed5ff", icon: "🛠️" },
    { week: 2, titleAr: "أساسيات المشروع التطبيقي",          titleEn: "Project Fundamentals",             portalColor: "#4ade80", icon: "⚙️" },
    { week: 3, titleAr: "مرحلة التطوير الأولى",              titleEn: "First Development Phase",          portalColor: "#f97316", icon: "🔌" },
    { week: 4, titleAr: "تطبيق الذكاء الاصطناعي في المشروع", titleEn: "Applying AI to Project",          portalColor: "#8ed5ff", icon: "🤖" },
    { week: 5, titleAr: "اختبار المشروع وتحسينه",            titleEn: "Project Testing & Improvement",   portalColor: "#3ce0fb", icon: "✅" },
    { week: 6, titleAr: "عرض المشروع وتوثيقه",              titleEn: "Project Presentation & Documentation", portalColor: "#c084fc", icon: "🏆" },
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
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
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
        className="glass-card rounded-3xl p-6 md:p-10"
        style={{ border: "1px solid rgba(208,188,255,0.12)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Level */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}>1</span>
              {isAr ? "ما مستواك الحالي؟" : "What's your current level?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              {([["beginner", isAr ? "مبتدئ تمامًا" : "Complete Beginner", "🌱"], ["intermediate", isAr ? "لدي أساسيات" : "Some Basics", "📗"], ["advanced", isAr ? "متقدم" : "Advanced", "🚀"]] as const).map(([val, label, icon]) => (
                <button
                  key={val}
                  onClick={() => setLevel(val)}
                  className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: level === val ? "rgba(208,188,255,0.15)" : "rgba(255,255,255,0.03)",
                    border:     level === val ? "1px solid rgba(208,188,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    color:      level === val ? "var(--color-secondary)" : "var(--color-on-surface-variant)",
                  }}
                >
                  {icon} {label}
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
              {([["new-skill", isAr ? "مهارة جديدة" : "New Skill", "🎯"], ["career", isAr ? "تطوير مهني" : "Career Growth", "💼"], ["project", isAr ? "مشروع محدد" : "Specific Project", "🏗️"]] as const).map(([val, label, icon]) => (
                <button
                  key={val}
                  onClick={() => setGoal(val)}
                  className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: goal === val ? "rgba(142,213,255,0.12)" : "rgba(255,255,255,0.03)",
                    border:     goal === val ? "1px solid rgba(142,213,255,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    color:      goal === val ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  }}
                >
                  {icon} {label}
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
              {([["30min", isAr ? "٣٠ دقيقة" : "30 min", "⏱️"], ["1hr", isAr ? "ساعة واحدة" : "1 hour", "🕐"], ["2hr", isAr ? "ساعتان أو أكثر" : "2+ hours", "🔥"]] as const).map(([val, label, icon]) => (
                <button
                  key={val}
                  onClick={() => setDailyTime(val)}
                  className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: dailyTime === val ? "rgba(60,224,251,0.12)" : "rgba(255,255,255,0.03)",
                    border:     dailyTime === val ? "1px solid rgba(60,224,251,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    color:      dailyTime === val ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                  }}
                >
                  {icon} {label}
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
                ["ai",         isAr ? "ذكاء اصطناعي" : "AI",              "🤖", "#8ed5ff"],
                ["career",     isAr ? "مهنة & توظيف"  : "Career",          "💼", "#fbbf24"],
                ["language",   isAr ? "لغة إنجليزية"  : "Language",        "🌐", "#c084fc"],
                ["iot",        isAr ? "IoT & أردوينو" : "IoT & Arduino",   "🔌", "#f97316"],
                ["automation", isAr ? "أتمتة"          : "Automation",      "⚙️", "#4ade80"],
                ["exams",      isAr ? "اختبارات رقمية" : "Digital Exams",  "💻", "#3ce0fb"],
              ] as const).map(([val, label, icon, color]) => (
                <button
                  key={val}
                  onClick={() => setInterest(val)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5"
                  style={{
                    background: interest === val ? `${color}18` : "rgba(255,255,255,0.03)",
                    border:     interest === val ? `1px solid ${color}45` : "1px solid rgba(255,255,255,0.08)",
                    color:      interest === val ? color : "var(--color-on-surface-variant)",
                  }}
                >
                  {icon} {label}
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
            className="mt-8 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={18} style={{ color: "var(--color-primary)" }} />
              <h3 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "خطتك المقترحة 🎉" : "Your Suggested Plan 🎉"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedPath.map((item) => (
                <div
                  key={item.week}
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: `${item.portalColor}08`, border: `1px solid ${item.portalColor}20` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: `${item.portalColor}15` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: item.portalColor }}>
                      {isAr ? `الأسبوع ${item.week}` : `Week ${item.week}`}
                    </p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? item.titleAr : item.titleEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href={`/${locale}/register`}
                className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl inline-flex items-center gap-2 text-sm"
              >
                <Sparkles size={14} />
                {isAr ? "ابدأ خطتي الآن" : "Start My Plan Now"}
                <Arrow size={14} />
              </Link>
              <Link
                href={`/${locale}/mentor`}
                className="glow-button-secondary font-mono px-6 py-3 rounded-xl text-sm"
                style={{ color: "var(--color-secondary)" }}
              >
                {isAr ? "استشر المرشد الذكي" : "Ask the AI Mentor"}
              </Link>
            </div>
          </motion.div>
        )}

        {!showPath && (
          <p className="text-center text-xs font-mono mt-6 opacity-40" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "أجب على الأسئلة الأربعة لترى خطتك" : "Answer all 4 questions to see your plan"}
          </p>
        )}
      </motion.div>
    </section>
  );
}
