"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, ArrowRight, ArrowLeft, CheckCircle, Target, Clock,
  Zap, Trophy, ChevronDown, Bot, Send,
} from "lucide-react";
import { portals } from "@/config/portals";
import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import PortalCard from "@/components/ecosystem/PortalCard";

/* ── Beginner Path Selector types ─────────────────────────────── */
type Level    = "beginner" | "intermediate" | "advanced" | null;
type Goal     = "new-skill" | "career" | "project" | null;
type DailyTime = "30min" | "1hr" | "2hr" | null;
type Interest = "ai" | "career" | "language" | "iot" | "automation" | "exams" | null;

interface WeekPlan { week: number; titleAr: string; titleEn: string; portalColor: string; icon: string }

function getRecommendedPath(level: Level, goal: Goal, interest: Interest): WeekPlan[] {
  const base: WeekPlan[] = [
    { week: 1, titleAr: "أساسيات التحول الرقمي", titleEn: "Digital Transformation Basics", portalColor: "#3ce0fb", icon: "💻" },
    { week: 2, titleAr: "اختبار تحديد مستوى اللغة الإنجليزية", titleEn: "English Level Assessment", portalColor: "#d0bcff", icon: "🌐" },
    { week: 3, titleAr: "مدخل الذكاء الاصطناعي", titleEn: "AI Introduction", portalColor: "#8ed5ff", icon: "🤖" },
    { week: 4, titleAr: "بناء السيرة الذاتية المحترفة", titleEn: "Professional CV Building", portalColor: "#f59e0b", icon: "💼" },
    { week: 5, titleAr: "أساسيات الأتمتة التجارية", titleEn: "Business Automation Basics", portalColor: "#4ade80", icon: "⚙️" },
    { week: 6, titleAr: "مشروع Arduino / IoT تطبيقي", titleEn: "Arduino / IoT Hands-on Project", portalColor: "#f97316", icon: "🔌" },
  ];

  if (interest === "ai") {
    return [
      { week: 1, titleAr: "مدخل الذكاء الاصطناعي وأدواته", titleEn: "AI Introduction & Tools", portalColor: "#8ed5ff", icon: "🤖" },
      { week: 2, titleAr: "كتابة البرومبتات الاحترافية", titleEn: "Professional Prompt Writing", portalColor: "#8ed5ff", icon: "✨" },
      { week: 3, titleAr: "تطبيق AI في المشاريع", titleEn: "AI in Projects", portalColor: "#8ed5ff", icon: "🚀" },
      { week: 4, titleAr: "اختبار تحديد مستوى اللغة", titleEn: "Language Level Assessment", portalColor: "#d0bcff", icon: "🌐" },
      { week: 5, titleAr: "أتمتة المهام بالذكاء الاصطناعي", titleEn: "Task Automation with AI", portalColor: "#4ade80", icon: "⚙️" },
      { week: 6, titleAr: "مشروع AI تطبيقي كامل", titleEn: "Full AI Applied Project", portalColor: "#8ed5ff", icon: "🏆" },
    ];
  }
  if (interest === "career") {
    return [
      { week: 1, titleAr: "تحليل السيرة الذاتية بالذكاء الاصطناعي", titleEn: "AI CV Analysis", portalColor: "#f59e0b", icon: "💼" },
      { week: 2, titleAr: "بناء ملف مهني قوي", titleEn: "Strong Professional Profile", portalColor: "#f59e0b", icon: "📋" },
      { week: 3, titleAr: "التحضير للمقابلات", titleEn: "Interview Preparation", portalColor: "#f59e0b", icon: "🎯" },
      { week: 4, titleAr: "مهارات التواصل المهني", titleEn: "Professional Communication", portalColor: "#d0bcff", icon: "🌐" },
      { week: 5, titleAr: "البحث عن وظائف بذكاء", titleEn: "Smart Job Search", portalColor: "#f59e0b", icon: "🔍" },
      { week: 6, titleAr: "استراتيجية التوظيف والتفاوض", titleEn: "Employment Strategy & Negotiation", portalColor: "#4ade80", icon: "🏆" },
    ];
  }
  if (goal === "project") {
    return [
      { week: 1, titleAr: "اختيار أدوات المشروع", titleEn: "Project Tool Selection", portalColor: "#8ed5ff", icon: "🛠️" },
      { week: 2, titleAr: "أساسيات المشروع التطبيقي", titleEn: "Project Fundamentals", portalColor: "#4ade80", icon: "⚙️" },
      { week: 3, titleAr: "مرحلة التطوير الأولى", titleEn: "First Development Phase", portalColor: "#f97316", icon: "🔌" },
      { week: 4, titleAr: "تطبيق الذكاء الاصطناعي في المشروع", titleEn: "Applying AI to Project", portalColor: "#8ed5ff", icon: "🤖" },
      { week: 5, titleAr: "اختبار المشروع وتحسينه", titleEn: "Project Testing & Improvement", portalColor: "#3ce0fb", icon: "✅" },
      { week: 6, titleAr: "عرض المشروع وتوثيقه", titleEn: "Project Presentation & Documentation", portalColor: "#d0bcff", icon: "🏆" },
    ];
  }
  return base;
}

/* ── Fade-in variants ────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(text: string, speed = 35, delay = 1800): [string, boolean] {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return [displayed, done];
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function HomepageClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  /* Beginner path selector state */
  const [level,    setLevel]    = useState<Level>(null);
  const [goal,     setGoal]     = useState<Goal>(null);
  const [dailyTime, setDailyTime] = useState<DailyTime>(null);
  const [interest, setInterest] = useState<Interest>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  const showPath = level && goal && dailyTime && interest;
  const recommendedPath = showPath ? getRecommendedPath(level, goal, interest) : [];

  /* Mentor showcase typewriter */
  const mentorText = isAr
    ? "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة."
    : "Start with the AI for Beginners path (3 weeks), then test your language level, then try your first hands-on IoT or Automation project. Every step is built on the previous one — and I'm with you at every stage.";
  const [mentorTyped, mentorDone] = useTypewriter(mentorText, 28, 2000);

  /* Hero scroll helpers */
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  /* 4-step journey */
  const steps = isAr
    ? [
        { num: "01", icon: "🎯", title: "اختار هدفك", desc: "حدد مستواك واهتمامك والوقت المتاح لك يوميًا" },
        { num: "02", icon: "🤖", title: "المرشد يبني لك خطة", desc: "الذكاء الاصطناعي يصمم مسارًا أسبوعيًا مخصصًا لك" },
        { num: "03", icon: "📚", title: "اتعلم وطبّق", desc: "ادخل البوابات، اتعلم، واعمل مشاريع حقيقية" },
        { num: "04", icon: "🏆", title: "احصل على شهادة وطوّر مسارك", desc: "شهادات معتمدة وتوصيات ذكية للخطوة القادمة" },
      ]
    : [
        { num: "01", icon: "🎯", title: "Choose Your Goal", desc: "Set your level, interest, and daily available time" },
        { num: "02", icon: "🤖", title: "Mentor Builds Your Plan", desc: "AI designs a custom weekly roadmap just for you" },
        { num: "03", icon: "📚", title: "Learn & Apply", desc: "Enter portals, learn, and build real projects" },
        { num: "04", icon: "🏆", title: "Get Certified & Level Up", desc: "Verified certificates and smart next-step recommendations" },
      ];

  /* Why Darhous */
  const why = isAr
    ? [
        { icon: "🌍", t: "منصة عربية ذكية", d: "محتوى متخصص باللغة العربية لتلبية احتياجات المتعلم العربي" },
        { icon: "🔑", t: "حساب واحد للجميع", d: "سجّل مرة واحدة واستخدم كل البوابات بنفس الحساب" },
        { icon: "🏗️", t: "تعليم قائم على المشاريع", d: "تطبيق عملي حقيقي وليس مجرد محاضرات نظرية" },
        { icon: "📊", t: "اختبارات وتقارير فورية", d: "نتائج لحظية وتقارير تفصيلية لكل اختبار" },
        { icon: "💼", t: "ربط التعليم بالتوظيف", d: "مسار متكامل من التعلم حتى الحصول على الوظيفة" },
        { icon: "🤖", t: "مرشد AI شخصي", d: "المرشد يفهم مستواك ويبني لك الخطة المناسبة" },
        { icon: "📋", t: "لوحة تحكم موحدة", d: "تتبع كل تقدمك وشهاداتك من مكان واحد" },
        { icon: "✨", t: "تجربة عصرية واحترافية", d: "تصميم premium وتجربة مستخدم مدروسة بعناية" },
      ]
    : [
        { icon: "🌍", t: "Arabic-First Platform", d: "Specialized Arabic content tailored for Arab learners" },
        { icon: "🔑", t: "One Account for All", d: "Register once and access all portals with a single account" },
        { icon: "🏗️", t: "Project-Based Learning", d: "Real hands-on application, not just theory lectures" },
        { icon: "📊", t: "Instant Tests & Reports", d: "Real-time results and detailed reports for every exam" },
        { icon: "💼", t: "Education Meets Career", d: "A complete path from learning to landing a job" },
        { icon: "🤖", t: "Personal AI Mentor", d: "The mentor understands your level and builds your plan" },
        { icon: "📋", t: "Unified Dashboard", d: "Track all your progress and certificates in one place" },
        { icon: "✨", t: "Premium UX", d: "Modern design and carefully crafted user experience" },
      ];

  /* Available portals (exclude coming-soon placeholder) */
  const realPortals = portals.filter((p) => p.id !== "coming-soon");

  return (
    <div className="flex flex-col gap-28 pb-28 overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="container-xl pt-12 md:pt-24 relative">
        {/* Ambient orbs */}
        <div className="absolute top-0 end-0 pointer-events-none" style={{ width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(142,213,255,0.08) 0%, transparent 65%)", filter: "blur(120px)" }} />
        <div className="absolute bottom-0 start-0 pointer-events-none" style={{ width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(87,27,193,0.1) 0%, transparent 65%)", filter: "blur(100px)" }} />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "30vw", height: "30vw", background: "radial-gradient(circle, rgba(60,224,251,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-mono"
              style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
            >
              <Sparkles size={13} />
              {isAr ? "نظام التعلم الذكي الجديد — v6.0" : "Smart Learning OS — v6.0"}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
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
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr
              ? "منصة درهوس الذكية تفهمك وتضع لك خطة واضحة خطوة بخطوة — حتى لو لا تعرف من أين تبدأ"
              : "Darhous Smart Platform understands you and builds a clear plan step by step — even if you don't know where to start"}
          </motion.p>

          {/* 3 Beginner CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
          >
            <button
              onClick={() => { setLevel("beginner"); scrollTo("beginner-path"); }}
              className="glow-button-primary text-white font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Sparkles size={15} />
              {isAr ? "أنا مبتدئ وعايز أبدأ" : "I'm a Beginner — Let's Start"}
              <Arrow size={14} />
            </button>
            <button
              onClick={() => { setGoal("new-skill"); scrollTo("beginner-path"); }}
              className="glow-button-secondary font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-secondary)" }}
            >
              <Target size={15} />
              {isAr ? "عايز أتعلم مهارة محددة" : "I Want a Specific Skill"}
            </button>
            <button
              onClick={() => { setGoal("career"); scrollTo("beginner-path"); }}
              className="font-mono px-6 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm transition-all hover:opacity-80"
              style={{ color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <Trophy size={15} />
              {isAr ? "عايز أطور شغلي أو أشتغل" : "I Want to Advance My Career"}
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
            onClick={() => scrollTo("beginner-path")}
            className="flex flex-col items-center gap-1 text-xs font-mono opacity-40 hover:opacity-70 transition-opacity mt-2"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr ? "اكتشف المنصة" : "Explore the platform"}
            <ChevronDown size={16} className="animate-bounce" />
          </motion.button>

          {/* Hero visual — OS mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-2xl overflow-hidden w-full max-w-3xl"
            style={{ border: "1px solid rgba(142,213,255,0.12)", boxShadow: "0 24px 100px rgba(0,0,0,0.45)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ms-3 text-xs font-mono opacity-40" style={{ color: "var(--color-on-surface-variant)" }}>Darhous Smart Learning OS — v6.0</span>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              {[
                { label: isAr ? "أكاديمية AI" : "AI Academy",    color: "#8ed5ff", pct: 68,  icon: "🤖" },
                { label: isAr ? "مستوى اللغة" : "Language Level", color: "#d0bcff", pct: 100, icon: "🌐", badge: "B2" },
                { label: isAr ? "اختبار رقمي" : "Digital Exam",   color: "#3ce0fb", pct: 45,  icon: "💻" },
                { label: isAr ? "بوابة مهنية" : "Career Hub",     color: "#f59e0b", pct: 20,  icon: "💼" },
                { label: isAr ? "أتمتة" : "Automation",           color: "#4ade80", pct: 10,  icon: "⚙️" },
                { label: isAr ? "IoT Lab" : "IoT Lab",             color: "#f97316", pct: 5,   icon: "🔌" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-sm">{item.icon}</span>
                    <p className="text-[10px] font-mono truncate" style={{ color: item.color }}>{item.label}</p>
                    {item.badge && <span className="ms-auto text-[9px] px-1.5 rounded-full font-mono" style={{ background: `${item.color}20`, color: item.color }}>{item.badge}</span>}
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                  </div>
                  <p className="text-[10px] mt-1 text-end font-mono opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>{item.pct}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. BEGINNER PATH SELECTOR ════════════════════════════ */}
      <section id="beginner-path" className="container-xl" ref={pathRef}>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
            style={{ background: "rgba(208,188,255,0.07)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
          >
            🧭 {isAr ? "خطتك الشخصية" : "Your Personal Plan"}
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
                  <button key={val} onClick={() => setLevel(val)}
                    className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                    style={{
                      background: level === val ? "rgba(208,188,255,0.15)" : "rgba(255,255,255,0.03)",
                      border: level === val ? "1px solid rgba(208,188,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: level === val ? "var(--color-secondary)" : "var(--color-on-surface-variant)",
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
                  <button key={val} onClick={() => setGoal(val)}
                    className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                    style={{
                      background: goal === val ? "rgba(142,213,255,0.12)" : "rgba(255,255,255,0.03)",
                      border: goal === val ? "1px solid rgba(142,213,255,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      color: goal === val ? "var(--color-primary)" : "var(--color-on-surface-variant)",
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
                  <button key={val} onClick={() => setDailyTime(val)}
                    className="px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 flex items-center gap-2"
                    style={{
                      background: dailyTime === val ? "rgba(60,224,251,0.12)" : "rgba(255,255,255,0.03)",
                      border: dailyTime === val ? "1px solid rgba(60,224,251,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      color: dailyTime === val ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Interest Area */}
            <motion.div variants={fadeUp}>
              <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>4</span>
                {isAr ? "ما مجال اهتمامك؟" : "What's your interest area?"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {([["ai", isAr ? "ذكاء اصطناعي" : "AI", "🤖", "#8ed5ff"], ["career", isAr ? "مهنة & توظيف" : "Career", "💼", "#f59e0b"], ["language", isAr ? "لغة إنجليزية" : "Language", "🌐", "#d0bcff"], ["iot", isAr ? "IoT & أردوينو" : "IoT & Arduino", "🔌", "#f97316"], ["automation", isAr ? "أتمتة" : "Automation", "⚙️", "#4ade80"], ["exams", isAr ? "اختبارات رقمية" : "Digital Exams", "💻", "#3ce0fb"]] as const).map(([val, label, icon, color]) => (
                  <button key={val} onClick={() => setInterest(val)}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5"
                    style={{
                      background: interest === val ? `${color}18` : "rgba(255,255,255,0.03)",
                      border: interest === val ? `1px solid ${color}45` : "1px solid rgba(255,255,255,0.08)",
                      color: interest === val ? color : "var(--color-on-surface-variant)",
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommended Path Result */}
          {showPath && (
            <motion.div
              key="path-result"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
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
                  <div key={item.week} className="rounded-xl p-4 flex items-start gap-3"
                    style={{ background: `${item.portalColor}08`, border: `1px solid ${item.portalColor}20` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: `${item.portalColor}15` }}>
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
                <Link href={`/${locale}/register`}
                  className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl inline-flex items-center gap-2 text-sm">
                  <Sparkles size={14} />
                  {isAr ? "ابدأ خطتي الآن" : "Start My Plan Now"}
                  <Arrow size={14} />
                </Link>
                <Link href={`/${locale}/mentor`}
                  className="glow-button-secondary font-mono px-6 py-3 rounded-xl text-sm"
                  style={{ color: "var(--color-secondary)" }}>
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

      {/* ══ 3. STATS ═══════════════════════════════════════════ */}
      <div className="container-xl">
        <Stats locale={locale} />
      </div>

      {/* ══ 4. ECOSYSTEM MAP ═══════════════════════════════════ */}
      <section id="ecosystem" className="container-xl">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
            style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
          >
            🌐 {isAr ? "منظومة درهوس الذكية" : "Darhous Smart Ecosystem"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "خريطة المنظومة التعليمية" : "Learning Ecosystem Map"}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "مرشد AI في المركز، محاط بـ 6 بوابات تعليمية متخصصة مترابطة"
              : "AI Mentor at the center, surrounded by 6 specialized interconnected learning portals"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Row 1: Portal 0, 1, 2 */}
          {realPortals.slice(0, 3).map((portal) => (
            <motion.div key={portal.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link
                href={`/${locale}${portal.href}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
                style={{ border: `1px solid ${portal.color}15`, textDecoration: "none" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{portal.icon}</span>
                  {portal.status === "available" && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                      {isAr ? "متاح" : "Live"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? portal.titleAr : portal.titleEn}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? portal.descriptionAr : portal.descriptionEn}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {portal.features.slice(0, 2).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portal.color}12`, color: portal.color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Row 2: Portal 3, AI Mentor Center, Portal 4 */}
          {realPortals[3] && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link
                href={`/${locale}${realPortals[3].href}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
                style={{ border: `1px solid ${realPortals[3].color}15`, textDecoration: "none" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{realPortals[3].icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                    {isAr ? "متاح" : "Live"}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? realPortals[3].titleAr : realPortals[3].titleEn}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? realPortals[3].descriptionAr : realPortals[3].descriptionEn}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {realPortals[3].features.slice(0, 2).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${realPortals[3].color}12`, color: realPortals[3].color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          )}

          {/* AI Mentor — Center Card */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Link
              href={`/${locale}/mentor`}
              className="rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-center h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
              style={{
                background: "linear-gradient(135deg, rgba(142,213,255,0.12) 0%, rgba(87,27,193,0.15) 50%, rgba(60,224,251,0.08) 100%)",
                border: "1px solid rgba(142,213,255,0.25)",
                boxShadow: "0 0 40px rgba(142,213,255,0.06), inset 0 0 20px rgba(142,213,255,0.03)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)" }}
              >
                <Bot size={32} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p className="text-xs font-mono mb-1" style={{ color: "var(--color-primary)" }}>AI MENTOR</p>
                <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "المرشد الذكي" : "Darhous AI Mentor"}
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "يبني خطتك ويرشدك عبر كل البوابات" : "Builds your plan & guides you across all portals"}
                </p>
              </div>
              <div
                className="text-xs font-mono px-4 py-2 rounded-xl"
                style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}
              >
                {isAr ? "← المركز → " : "Hub"}
              </div>
            </Link>
          </motion.div>

          {realPortals[4] && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link
                href={`/${locale}${realPortals[4].href}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
                style={{ border: `1px solid ${realPortals[4].color}15`, textDecoration: "none" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{realPortals[4].icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                    {isAr ? "متاح" : "Live"}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? realPortals[4].titleAr : realPortals[4].titleEn}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? realPortals[4].descriptionAr : realPortals[4].descriptionEn}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {realPortals[4].features.slice(0, 2).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${realPortals[4].color}12`, color: realPortals[4].color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          )}

          {/* Row 3: empty, Portal 5, empty — use col-start trick with sm:col-start-2 */}
          <div className="hidden sm:block" />
          {realPortals[5] && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link
                href={`/${locale}${realPortals[5].href}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
                style={{ border: `1px solid ${realPortals[5].color}15`, textDecoration: "none" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{realPortals[5].icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                    {isAr ? "متاح" : "Live"}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? realPortals[5].titleAr : realPortals[5].titleEn}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? realPortals[5].descriptionAr : realPortals[5].descriptionEn}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {realPortals[5].features.slice(0, 2).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${realPortals[5].color}12`, color: realPortals[5].color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          )}
          <div className="hidden sm:block" />
        </div>
      </section>

      {/* ══ 5. PORTAL GRID (all portals) ═══════════════════════ */}
      <section id="portals" className="container-xl">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
            style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
          >
            🌐 {isAr ? "بوابات المنصة" : "Platform Portals"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "بوابات درهوس الذكية" : "Darhous Smart Portals"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
            {isAr
              ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
              : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {portals.map((portal) => (
            <PortalCard key={portal.id} portal={portal} locale={locale} />
          ))}
        </div>
      </section>

      {/* ══ 6. JOURNEY — 4 STEPS ═══════════════════════════════ */}
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
          {/* Connecting line on desktop */}
          <div className="absolute top-10 start-[12.5%] end-[12.5%] h-px hidden lg:block" style={{ background: "linear-gradient(90deg, transparent, rgba(142,213,255,0.2), rgba(208,188,255,0.2), rgba(60,224,251,0.2), transparent)" }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-7 flex flex-col items-center text-center gap-4 relative"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl relative z-10"
                style={{
                  background: ["rgba(142,213,255,0.1)", "rgba(208,188,255,0.1)", "rgba(60,224,251,0.1)", "rgba(74,222,128,0.1)"][i],
                  border: `1px solid ${["rgba(142,213,255,0.25)", "rgba(208,188,255,0.25)", "rgba(60,224,251,0.25)", "rgba(74,222,128,0.25)"][i]}`,
                }}
              >
                {step.icon}
              </div>
              <div>
                <p className="text-xs font-mono mb-1" style={{ color: ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)", "#4ade80"][i] }}>
                  {step.num}
                </p>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 7. AI MENTOR SHOWCASE ══════════════════════════════ */}
      <section id="mentor-showcase" className="container-xl">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
            style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
          >
            🤖 {isAr ? "المرشد الذكي" : "AI Mentor"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "شوف المرشد بيشتغل" : "See the Mentor in Action"}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة — جربه دلوقتي"
              : "The AI Mentor understands your level and builds a custom learning plan — try it now"}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="glass-card rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(142,213,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)" }}>
                <Bot size={18} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "مرشد درهوس الذكي" : "Darhous AI Mentor"}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "متصل الآن" : "Online now"}</p>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="p-5 flex flex-col gap-4 min-h-48">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className={`flex ${isAr ? "justify-start" : "justify-end"}`}
              >
                <div
                  className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: "rgba(208,188,255,0.12)",
                    border: "1px solid rgba(208,188,255,0.2)",
                    color: "var(--color-on-surface)",
                    borderRadius: isAr ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                  }}
                >
                  {isAr
                    ? "أنا مبتدئ وعايز أتعلم AI بس مش عارف أبدأ منين 😅"
                    : "I'm a beginner who wants to learn AI but I don't know where to start 😅"}
                </div>
              </motion.div>

              {/* Mentor typing indicator then response */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                className={`flex items-start gap-3 ${isAr ? "flex-row-reverse" : ""}`}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.15)" }}>
                  <Bot size={15} style={{ color: "var(--color-primary)" }} />
                </div>
                <div
                  className="max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: "rgba(142,213,255,0.07)",
                    border: "1px solid rgba(142,213,255,0.15)",
                    color: "var(--color-on-surface)",
                    borderRadius: isAr ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                    minHeight: "60px",
                  }}
                >
                  {mentorTyped || (
                    <span className="flex gap-1 items-center pt-1">
                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                  {!mentorDone && mentorTyped && <span className="animate-pulse">|</span>}
                </div>
              </motion.div>
            </div>

            {/* Input area */}
            <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono opacity-40"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-on-surface-variant)" }}
                >
                  {isAr ? "اكتب سؤالك هنا…" : "Type your question here…"}
                </div>
                <Link
                  href={`/${locale}/mentor`}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
                >
                  <Send size={16} />
                </Link>
              </div>
              <p className="text-center text-xs font-mono mt-3 opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
                <Link href={`/${locale}/mentor`} style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                  {isAr ? "افتح المرشد الكامل ←" : "Open Full Mentor →"}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 8. WHY DARHOUS ═════════════════════════════════════ */}
      <section className="container-xl">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لماذا درهوس؟" : "Why Darhous?"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "ما يميّزنا عن كل منصة أخرى" : "What sets us apart from every other platform"}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {why.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{item.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 9. FINAL CTA ═══════════════════════════════════════ */}
      <section className="container-xl">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="rounded-3xl p-10 md:p-20 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,102,138,0.22) 0%, rgba(87,27,193,0.18) 50%, rgba(0,102,138,0.12) 100%)",
            border: "1px solid rgba(142,213,255,0.15)",
          }}
        >
          <div className="env-orb env-orb-blue absolute top-[-100px] start-[-100px] opacity-30" />
          <div className="env-orb env-orb-violet absolute bottom-[-100px] end-[-100px] opacity-20" />
          <div className="relative z-10">
            <p className="text-sm font-mono mb-5" style={{ color: "var(--color-primary)" }}>
              {isAr ? "✨ الآن أو لا تندم لاحقًا" : "✨ Now or Never"}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 leading-tight" style={{ color: "var(--color-on-surface)" }}>
              {isAr
                ? "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ"
                : "Start Now…\nEven If You Don't Know Where to Begin"}
            </h2>
            <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — وأنت بس تبدأ."
                : "The AI Mentor builds your path, step by step, from zero to mastery — you just need to start."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/register`} className="glow-button-primary text-white font-mono px-10 py-4 rounded-xl inline-flex items-center gap-2 text-base font-semibold">
                <Sparkles size={18} />
                {isAr ? "ابدأ مجانًا الآن" : "Start Free Now"}
                <Arrow size={16} />
              </Link>
              <Link href={`/${locale}/mentor`} className="glow-button-secondary font-mono px-8 py-4 rounded-xl inline-flex items-center gap-2 text-base font-semibold" style={{ color: "var(--color-secondary)" }}>
                <Zap size={16} />
                {isAr ? "جرب المرشد الذكي" : "Try AI Mentor"}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ 10. COMMUNITY SIGNUP ═══════════════════════════════ */}
      <div className="container-xl">
        <CommunitySignup locale={locale} variant="hero" source="ecosystem-home" />
      </div>

    </div>
  );
}
