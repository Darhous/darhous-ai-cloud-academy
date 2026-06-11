"use client";

import { useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  FileCheck2,
  GraduationCap,
  MessageCircleQuestion,
  Rocket,
  Send,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import ConceptBadge from "@/components/design-lab/shared/ConceptBadge";
import PreviewHeader from "@/components/design-lab/shared/PreviewHeader";

type GoalId = "skill" | "career" | "exam";
type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

interface GoalContent {
  id: GoalId;
  icon: IconType;
  color: string;
  softColor: string;
  titleAr: string;
  titleEn: string;
  promptAr: string;
  promptEn: string;
  weekOneAr: string;
  weekOneEn: string;
  portalAr: string;
  portalEn: string;
  portalHref: string;
  portalDescriptionAr: string;
  portalDescriptionEn: string;
  mentorQuestionAr: string;
  mentorQuestionEn: string;
  mentorAnswerAr: string;
  mentorAnswerEn: string;
  weeksAr: string[];
  weeksEn: string[];
  outcomesAr: string[];
  outcomesEn: string[];
}

const GOALS: GoalContent[] = [
  {
    id: "skill",
    icon: Sparkles,
    color: "#8ed5ff",
    softColor: "rgba(142, 213, 255, 0.13)",
    titleAr: "اكتسب مهارة في الذكاء الاصطناعي",
    titleEn: "Get an AI skill",
    promptAr: "أريد استخدام أدوات الذكاء الاصطناعي بثقة في عملي.",
    promptEn: "I want to use AI tools confidently in my work.",
    weekOneAr:
      "تبدأ بمدخل عملي إلى أدوات الذكاء الاصطناعي، ثم تكتب أول برومبت احترافي وتطبقه على مهمة حقيقية.",
    weekOneEn:
      "Start with a practical introduction to AI tools, then write your first professional prompt and apply it to a real task.",
    portalAr: "أكاديمية الذكاء الاصطناعي",
    portalEn: "AI Academy",
    portalHref: "/ai-academy",
    portalDescriptionAr:
      "18 دورة، 62 أداة AI، 27 برومبت، مشاريع عملية، معامل ذكية وشهادات.",
    portalDescriptionEn:
      "18 courses, 62 AI tools, 27 prompts, hands-on projects, intelligent labs, and certificates.",
    mentorQuestionAr: "ما أفضل بداية لتعلّم الذكاء الاصطناعي من الصفر؟",
    mentorQuestionEn: "What is the best way to start learning AI from zero?",
    mentorAnswerAr:
      "ابدأ بأدوات AI الأساسية وكتابة البرومبتات، ثم طبّق ما تعلمته في مشروع صغير. سأراجع تقدمك وأقترح الخطوة التالية كل أسبوع.",
    mentorAnswerEn:
      "Start with core AI tools and prompt writing, then apply what you learn in a small project. I will review your progress and suggest the next step each week.",
    weeksAr: [
      "مدخل الذكاء الاصطناعي وأدواته",
      "كتابة البرومبتات الاحترافية",
      "تطبيق AI في المشاريع",
      "اختبار تحديد مستوى اللغة",
      "أتمتة المهام بالذكاء الاصطناعي",
      "مشروع AI تطبيقي كامل",
    ],
    weeksEn: [
      "AI introduction and tools",
      "Professional prompt writing",
      "AI in real projects",
      "Language level assessment",
      "Task automation with AI",
      "Complete applied AI project",
    ],
    outcomesAr: ["مشروع AI قابل للعرض", "شهادة إتمام المسار", "سير عمل يومي أسرع"],
    outcomesEn: ["A portfolio-ready AI project", "Path completion certificate", "A faster daily workflow"],
  },
  {
    id: "career",
    icon: BriefcaseBusiness,
    color: "#fbbf24",
    softColor: "rgba(251, 191, 36, 0.13)",
    titleAr: "ابدأ أو طوّر مسارك المهني",
    titleEn: "Launch a career",
    promptAr: "أريد وظيفة أفضل وخطة واضحة للوصول إليها.",
    promptEn: "I want a better job and a clear plan to reach it.",
    weekOneAr:
      "تحلل سيرتك الذاتية بدرجة ATS، تحدد فجواتك المهنية، وتبني نسخة أقوى تناسب الوظائف التي تستهدفها.",
    weekOneEn:
      "Analyze your CV for an ATS score, identify career gaps, and build a stronger version for the roles you want.",
    portalAr: "بوابة NexaLearn المهنية",
    portalEn: "NexaLearn Career Hub",
    portalHref: "/career",
    portalDescriptionAr:
      "محلل ATS ذكي، صانع سيرة ذاتية، مطابقة وظائف، تحضير مقابلات وقوالب جاهزة.",
    portalDescriptionEn:
      "Smart ATS analysis, CV builder, job matching, interview preparation, and ready templates.",
    mentorQuestionAr: "كيف أحوّل خبرتي الحالية إلى فرصة عمل أفضل؟",
    mentorQuestionEn: "How can I turn my current experience into a better job opportunity?",
    mentorAnswerAr:
      "سنبدأ بتحليل سيرتك الذاتية، ثم نحدد مهارتين مطلوبتين لسوق العمل ونبني دليلاً عملياً عليهما قبل تدريب المقابلة.",
    mentorAnswerEn:
      "We will start with your CV, identify two in-demand skills, build practical evidence for both, and then prepare for interviews.",
    weeksAr: [
      "تحليل السيرة الذاتية بالذكاء الاصطناعي",
      "بناء ملف مهني قوي",
      "التحضير للمقابلات",
      "مهارات التواصل المهني",
      "البحث عن وظائف بذكاء",
      "استراتيجية التوظيف والتفاوض",
    ],
    weeksEn: [
      "AI-powered CV analysis",
      "Build a strong professional profile",
      "Interview preparation",
      "Professional communication",
      "Smarter job search",
      "Employment strategy and negotiation",
    ],
    outcomesAr: ["سيرة ذاتية محسّنة للـ ATS", "ملف مهني قابل للتقديم", "خطة مقابلات وتفاوض"],
    outcomesEn: ["An ATS-ready CV", "A job-ready professional profile", "An interview and negotiation plan"],
  },
  {
    id: "exam",
    icon: FileCheck2,
    color: "#3ce0fb",
    softColor: "rgba(60, 224, 251, 0.13)",
    titleAr: "استعد لاجتياز اختبار",
    titleEn: "Pass an exam",
    promptAr: "أريد قياس مستواي والاستعداد للاختبار بخطة ذكية.",
    promptEn: "I want to assess my level and prepare with a smart plan.",
    weekOneAr:
      "تجري اختباراً تشخيصياً قصيراً، ترى نقاط القوة والفجوات، ثم تحصل على جدول مراجعة مبني على نتيجتك.",
    weekOneEn:
      "Take a short diagnostic exam, see your strengths and gaps, then receive a review schedule based on your result.",
    portalAr: "اختبارات التحول الرقمي",
    portalEn: "Digital Transformation Exams",
    portalHref: "/digital-exams",
    portalDescriptionAr:
      "902+ سؤال في 9 مواد تشمل IT وOffice والأمن السيبراني مع نتائج وشهادات.",
    portalDescriptionEn:
      "902+ questions across 9 subjects including IT, Office, and Cybersecurity, with results and certificates.",
    mentorQuestionAr: "كيف أستعد للاختبار بدون أن أضيّع وقتي في مراجعة كل شيء؟",
    mentorQuestionEn: "How do I prepare without wasting time reviewing everything?",
    mentorAnswerAr:
      "ابدأ باختبار تشخيصي. سأحوّل أخطاءك إلى جلسات مراجعة قصيرة، ثم نعيد القياس أسبوعياً حتى تصل للدرجة المستهدفة.",
    mentorAnswerEn:
      "Start with a diagnostic exam. I will turn your mistakes into short review sessions, then reassess weekly until you reach your target score.",
    weeksAr: [
      "اختبار تشخيصي وتحديد الفجوات",
      "أساسيات التحول الرقمي",
      "تدريب موجّه على نقاط الضعف",
      "اختبار محاكاة كامل",
      "مراجعة مركزة وإدارة الوقت",
      "الاختبار النهائي والشهادة",
    ],
    weeksEn: [
      "Diagnostic exam and gap analysis",
      "Digital transformation basics",
      "Targeted weak-area practice",
      "Full mock exam",
      "Focused review and time management",
      "Final exam and certificate",
    ],
    outcomesAr: ["نتيجة تشخيصية واضحة", "تحسن موثّق في الدرجة", "شهادة نتيجة معتمدة"],
    outcomesEn: ["A clear diagnostic result", "Documented score improvement", "A verified result certificate"],
  },
];

const containerTransition = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LearningJourney({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const [selectedGoal, setSelectedGoal] = useState<GoalId>("skill");
  const journeyRef = useRef<HTMLElement>(null);
  const selected = GOALS.find((goal) => goal.id === selectedGoal) ?? GOALS[0];
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const reveal = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0.15 : 0.55, ease: "easeOut" as const },
    },
  };

  function chooseGoal(goal: GoalId) {
    setSelectedGoal(goal);
    window.setTimeout(() => {
      journeyRef.current?.scrollIntoView({
        behavior: shouldReduce ? "auto" : "smooth",
        block: "start",
      });
    }, shouldReduce ? 0 : 180);
  }

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="learning-journey min-h-screen overflow-x-hidden"
      style={{
        background: "#071015",
        color: "#f4fbff",
        fontFamily: isAr ? "var(--font-cairo), sans-serif" : "var(--font-geist), sans-serif",
      }}
    >
      <PreviewHeader locale={locale} conceptNumber={2} conceptName={isAr ? "رحلة التعلم" : "The Learning Journey"} />

      <section className="relative isolate flex min-h-[calc(100svh-34px)] items-center px-4 py-16 sm:px-6 lg:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 16% 20%, rgba(142,213,255,.13), transparent 28%), radial-gradient(circle at 84% 72%, rgba(208,188,255,.11), transparent 31%), linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 42px 42px, 42px 42px",
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerTransition}
          className="mx-auto w-full max-w-6xl"
        >
          <motion.p
            variants={reveal}
            className="mb-5 text-center font-mono text-xs uppercase tracking-[0.28em]"
            style={{ color: "rgba(142,213,255,.74)" }}
          >
            {isAr ? "ابدأ من النتيجة التي تريدها" : "Start with the outcome you want"}
          </motion.p>
          <motion.h1
            variants={reveal}
            className="mx-auto max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.12] sm:text-6xl lg:text-7xl"
          >
            {isAr ? "ما الذي تريد أن تصبح قادراً على فعله؟" : "What do you want to be able to do?"}
          </motion.h1>

          <motion.div variants={containerTransition} className="mt-12 grid gap-4 md:grid-cols-3">
            {GOALS.map((goal) => {
              const Icon = goal.icon;
              const active = goal.id === selectedGoal;
              return (
                <motion.button
                  key={goal.id}
                  type="button"
                  variants={reveal}
                  onClick={() => chooseGoal(goal.id)}
                  aria-label={isAr ? `اختر هدف: ${goal.titleAr}` : `Choose goal: ${goal.titleEn}`}
                  aria-pressed={active}
                  whileHover={shouldReduce ? undefined : { y: -4 }}
                  whileTap={shouldReduce ? undefined : { scale: 0.985 }}
                  className="group relative min-h-56 cursor-pointer overflow-hidden rounded-[2rem] border p-6 text-start outline-none transition-[border-color,background-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#071015]"
                  style={{
                    borderColor: active ? goal.color : "rgba(255,255,255,.1)",
                    background: active ? goal.softColor : "rgba(255,255,255,.035)",
                    boxShadow: active ? `0 24px 70px ${goal.softColor}` : "none",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -end-8 -top-10 h-36 w-36 rounded-full blur-2xl"
                    style={{ background: goal.softColor }}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                        style={{ color: goal.color, borderColor: `${goal.color}55`, background: goal.softColor }}
                      >
                        <Icon size={27} strokeWidth={1.7} />
                      </span>
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full border transition-opacity"
                        style={{
                          color: active ? "#071015" : goal.color,
                          background: active ? goal.color : "transparent",
                          borderColor: `${goal.color}88`,
                          opacity: active ? 1 : 0.58,
                        }}
                      >
                        {active ? <Check size={15} strokeWidth={3} /> : <Arrow size={14} />}
                      </span>
                    </div>
                    <h2 className="mt-8 text-xl font-semibold sm:text-2xl">
                      {isAr ? goal.titleAr : goal.titleEn}
                    </h2>
                    <p className="mt-3 text-sm leading-7" style={{ color: "rgba(226,240,247,.68)" }}>
                      {isAr ? goal.promptAr : goal.promptEn}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
          <motion.p variants={reveal} className="mt-7 text-center text-sm" style={{ color: "rgba(226,240,247,.5)" }}>
            {isAr ? "اختر هدفاً لنكشف لك رحلة شخصية من ستة أسابيع" : "Choose a goal to reveal your personal six-week journey"}
          </motion.p>
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: shouldReduce ? 0.15 : 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <section
            ref={journeyRef}
            className="scroll-mt-0 border-y px-4 py-20 sm:px-6 lg:px-10"
            style={{ borderColor: "rgba(255,255,255,.08)", background: selected.softColor }}
          >
            <div className="mx-auto max-w-6xl">
              <Chapter number="01" isAr={isAr} color={selected.color} />
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
                  <p className="text-sm font-medium" style={{ color: selected.color }}>
                    {isAr ? "أسبوعك الأول مع NexaLearn" : "Your first week with NexaLearn"}
                  </p>
                  <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
                    {isAr ? selected.titleAr : selected.titleEn}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: "rgba(226,240,247,.72)" }}>
                    {isAr ? selected.weekOneAr : selected.weekOneEn}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={reveal}
                  className="rounded-[2rem] border p-6"
                  style={{ borderColor: `${selected.color}44`, background: "rgba(7,16,21,.68)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: selected.color }} />
                    <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: selected.color }}>
                      {isAr ? "بوابتك الأولى" : "Your first portal"}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{isAr ? selected.portalAr : selected.portalEn}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "rgba(226,240,247,.66)" }}>
                    {isAr ? selected.portalDescriptionAr : selected.portalDescriptionEn}
                  </p>
                  <Link
                    href={`/${locale}${selected.portalHref}`}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white"
                    style={{ background: selected.color, color: "#071015" }}
                  >
                    {isAr ? "استكشف البوابة" : "Explore the portal"}
                    <Arrow size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="px-4 py-24 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <Chapter number="02" isAr={isAr} color={selected.color} />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
                <h2 className="mt-8 max-w-3xl text-3xl font-semibold sm:text-5xl">
                  {isAr ? "مسارك، أسبوعاً بعد أسبوع" : "Your path, week by week"}
                </h2>
                <p className="mt-4 max-w-2xl leading-7" style={{ color: "rgba(226,240,247,.64)" }}>
                  {isAr
                    ? "خطة واضحة تجمع التعلم والتطبيق والقياس، ويعدلها المرشد الذكي بناءً على تقدمك."
                    : "A clear plan combining learning, practice, and assessment, adjusted by the AI Mentor as you progress."}
                </p>
              </motion.div>

              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(isAr ? selected.weeksAr : selected.weeksEn).map((week, index) => (
                  <motion.article
                    key={week}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={reveal}
                    className="relative overflow-hidden rounded-3xl border p-5"
                    style={{ borderColor: "rgba(255,255,255,.09)", background: "rgba(255,255,255,.028)" }}
                  >
                    <span className="font-mono text-xs" style={{ color: selected.color }}>
                      {isAr ? `الأسبوع ${index + 1}` : `WEEK ${index + 1}`}
                    </span>
                    <h3 className="mt-5 min-h-14 text-lg font-medium leading-7">{week}</h3>
                    <div className="mt-6 h-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.07)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ background: selected.color, width: `${((index + 1) / 6) * 100}%` }}
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-24 sm:px-6 lg:px-10" style={{ background: "rgba(255,255,255,.025)" }}>
            <div className="mx-auto max-w-6xl">
              <Chapter number="03" isAr={isAr} color={selected.color} />
              <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                  <p className="text-sm font-medium" style={{ color: selected.color }}>
                    {isAr ? "النتيجة قبل التفاصيل" : "The outcome before the details"}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                    {isAr ? "بحلول الأسبوع السادس، سيكون لديك..." : "By week six, you will have..."}
                  </h2>
                </motion.div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {(isAr ? selected.outcomesAr : selected.outcomesEn).map((outcome, index) => {
                    const OutcomeIcon = [Rocket, GraduationCap, Trophy][index];
                    return (
                      <motion.article
                        key={outcome}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="rounded-[1.75rem] border p-5"
                        style={{ borderColor: `${selected.color}35`, background: selected.softColor }}
                      >
                        <OutcomeIcon size={25} className="mb-8" />
                        <span className="font-mono text-xs" style={{ color: selected.color }}>
                          0{index + 1}
                        </span>
                        <h3 className="mt-3 font-semibold leading-7">{outcome}</h3>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-24 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
              <Chapter number="04" isAr={isAr} color={selected.color} />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                className="mt-8 overflow-hidden rounded-[2rem] border"
                style={{ borderColor: "rgba(255,255,255,.1)", background: "#0b171d" }}
              >
                <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ color: selected.color, background: selected.softColor }}
                  >
                    <Bot size={21} />
                  </span>
                  <div>
                    <p className="font-semibold">{isAr ? "مرشد NexaLearn الذكي" : "NexaLearn AI Mentor"}</p>
                    <p className="text-xs" style={{ color: "rgba(226,240,247,.52)" }}>
                      {isAr ? "يبني خطتك ويتابع تقدمك" : "Builds your plan and tracks your progress"}
                    </p>
                  </div>
                </div>
                <div className="space-y-5 p-5 sm:p-8">
                  <div className="ms-auto max-w-2xl rounded-3xl rounded-ee-md px-5 py-4 text-sm leading-7" style={{ background: "rgba(255,255,255,.07)" }}>
                    {isAr ? selected.mentorQuestionAr : selected.mentorQuestionEn}
                  </div>
                  <div className="max-w-2xl rounded-3xl rounded-es-md border px-5 py-4 text-sm leading-7" style={{ borderColor: `${selected.color}33`, background: selected.softColor }}>
                    {isAr ? selected.mentorAnswerAr : selected.mentorAnswerEn}
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: "rgba(255,255,255,.08)", color: "rgba(226,240,247,.4)" }}>
                    <MessageCircleQuestion size={17} />
                    <span className="flex-1 text-sm">{isAr ? "اسأل عن خطتك..." : "Ask about your plan..."}</span>
                    <Send size={17} style={{ color: selected.color }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="border-y px-4 py-10 sm:px-6 lg:px-10" style={{ borderColor: "rgba(255,255,255,.08)" }}>
            <div className="mx-auto grid max-w-6xl gap-7 text-center sm:grid-cols-3">
              {[
                [Users, "12+", isAr ? "مساراً تعليمياً" : "learning paths"],
                [FileCheck2, "902+", isAr ? "سؤالاً تدريبياً" : "practice questions"],
                [Trophy, "6", isAr ? "بوابات مترابطة" : "connected portals"],
              ].map(([Icon, value, label]) => {
                const TrustIcon = Icon as IconType;
                return (
                  <div key={String(label)} className="flex items-center justify-center gap-4">
                    <TrustIcon size={23} />
                    <div className="text-start">
                      <strong className="block text-2xl">{String(value)}</strong>
                      <span className="text-sm" style={{ color: "rgba(226,240,247,.56)" }}>{String(label)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="px-4 py-24 text-center sm:px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: selected.color }}>
                {isAr ? "رحلتك تبدأ بخطوة واحدة" : "Your journey starts with one step"}
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
                {isAr ? "ابدأ مسارك الشخصي اليوم" : "Start your personal path today"}
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-7" style={{ color: "rgba(226,240,247,.64)" }}>
                {isAr
                  ? "اختر هدفك، دع المرشد الذكي يبني الخطة، وتعلّم بالتطبيق من أول أسبوع."
                  : "Choose your goal, let the AI Mentor build the plan, and learn by doing from week one."}
              </p>
              <Link
                href={`/${locale}/register`}
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full px-7 font-semibold outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#071015]"
                style={{ background: selected.color, color: "#071015" }}
              >
                {isAr ? "أنشئ حسابك مجاناً" : "Create your free account"}
                <Arrow size={18} />
              </Link>
            </motion.div>
          </section>
        </motion.div>
      </AnimatePresence>

      <ConceptBadge number={2} name={isAr ? "رحلة التعلم" : "The Learning Journey"} locale={locale} />
    </main>
  );
}

function Chapter({ number, isAr, color }: { number: string; isAr: boolean; color: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]" style={{ color }}>
      <span className="rounded-full border px-3 py-1.5" style={{ borderColor: `${color}55` }}>{number}</span>
      <span>{isAr ? "فصل من رحلتك" : "A chapter in your journey"}</span>
    </div>
  );
}
