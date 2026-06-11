"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Brain,
  Zap,
  Globe,
  Trophy,
  Rocket,
  Bot,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  ChevronRight,
  Users,
  Code,
  MessageCircle,
  Award,
  Target,
  TrendingUp,
  Play,
  Clock,
  BookOpen,
  Cpu,
  X,
} from "lucide-react";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { HoverEffect } from "@/components/aceternity/card-hover-effect";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";
import { WordRotate } from "@/components/shadcn/ui/word-rotate";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { AnimatedGridPattern } from "@/components/shadcn/ui/animated-grid-pattern";

// ─── Data ────────────────────────────────────────────────────────────────────

const PORTALS = [
  {
    num: "01",
    titleAr: "أكاديمية الذكاء الاصطناعي",
    titleEn: "AI Academy",
    descAr: "18 دورة، 62 أداة AI، مرشد ذكي وشهادات معتمدة",
    descEn: "18 courses, 62 AI tools, smart mentor & certificates",
    color: "#8ed5ff",
    tags: ["ChatGPT", "Claude", "Gemini", "ML"],
    icon: Brain,
  },
  {
    num: "02",
    titleAr: "بوابة اللغة",
    titleEn: "Language Portal",
    descAr: "اختبار المستوى والتقييم الفوري للغة الإنجليزية",
    descEn: "English level assessment & instant grading",
    color: "#d0bcff",
    tags: ["IELTS Prep", "Grammar", "Speaking"],
    icon: Globe,
  },
  {
    num: "03",
    titleAr: "الاختبارات الرقمية",
    titleEn: "Digital Exams",
    descAr: "902 سؤال، 9 مواد، شهادات رقمية موثقة",
    descEn: "902 questions, 9 subjects, verified digital certificates",
    color: "#f97316",
    tags: ["IT", "Excel", "Word", "Network"],
    icon: Trophy,
  },
  {
    num: "04",
    titleAr: "مركز المهن",
    titleEn: "Career Hub",
    descAr: "محلل CV بالذكاء الاصطناعي، مطابقة وظائف وبورتفوليو",
    descEn: "AI CV analyzer, job matching & portfolio builder",
    color: "#3ce0fb",
    tags: ["CV", "LinkedIn", "Jobs"],
    icon: Target,
  },
  {
    num: "05",
    titleAr: "أكاديمية الأتمتة",
    titleEn: "Automation Academy",
    descAr: "30 وصفة أتمتة جاهزة، 15 معمل تطبيقي",
    descEn: "30 automation recipes & 15 applied labs",
    color: "#a855f7",
    tags: ["n8n", "Zapier", "Make", "AI APIs"],
    icon: Zap,
  },
  {
    num: "06",
    titleAr: "مختبر IoT",
    titleEn: "IoT Lab",
    descAr: "72 مشروع، 40 تحدي أردوينو، مكتبة المكونات",
    descEn: "72 projects, 40 Arduino challenges, component library",
    color: "#f97316",
    tags: ["Arduino", "Sensors", "ESP32"],
    icon: Cpu,
  },
];

const MARQUEE_ITEMS_ROW1 = [
  "AI Academy",
  "ChatGPT",
  "Claude",
  "Gemini",
  "Language Portal",
  "n8n",
  "Zapier",
  "Arduino",
  "Automation",
  "Digital Exams",
  "Career Hub",
  "Machine Learning",
  "Deep Learning",
  "ESP32",
  "Make.com",
  "IELTS Prep",
];

const MARQUEE_ITEMS_ROW2 = [
  "أكاديمية الذكاء الاصطناعي",
  "بوابة اللغة",
  "الاختبارات الرقمية",
  "مركز المهن",
  "أكاديمية الأتمتة",
  "مختبر IoT",
  "NexaLearn",
  "شهادات معتمدة",
  "تعلم بالذكاء الاصطناعي",
  "مرشد ذكي",
  "وصفات أتمتة",
  "مشاريع أردوينو",
  "تحليل CV",
  "اختبار المستوى",
];

const IMPACT_NUMBERS = [
  { valueAr: "+5,000", valueEn: "5,000+", labelAr: "متعلم نشط", labelEn: "Active Learners", color: "#8ed5ff" },
  { valueAr: "18", valueEn: "18", labelAr: "دورة تدريبية", labelEn: "Courses", color: "#d0bcff" },
  { valueAr: "902", valueEn: "902", labelAr: "سؤال تدريبي", labelEn: "Practice Questions", color: "#3ce0fb" },
  { valueAr: "6", valueEn: "6", labelAr: "بوابات تعليمية", labelEn: "Learning Portals", color: "#a855f7" },
];

const JOURNEY_STEPS = [
  { numAr: "١", numEn: "1", titleAr: "اختر مسارك", titleEn: "Choose Your Path", descAr: "تقييم ذكي يحدد مستواك ويوصي بالمسار المناسب", descEn: "Smart assessment identifies your level and recommends your path", color: "#8ed5ff" },
  { numAr: "٢", numEn: "2", titleAr: "تعلم بالتطبيق", titleEn: "Learn by Doing", descAr: "محتوى تفاعلي ومعامل عملية ومشاريع حقيقية", descEn: "Interactive content, practical labs, and real projects", color: "#d0bcff" },
  { numAr: "٣", numEn: "3", titleAr: "استشر مرشدك", titleEn: "Consult Your Mentor", descAr: "مرشد ذكاء اصطناعي متاح 24/7 يجيب على أسئلتك", descEn: "AI mentor available 24/7 to answer your questions", color: "#3ce0fb" },
  { numAr: "٤", numEn: "4", titleAr: "تدرب على الاختبارات", titleEn: "Practice Exams", descAr: "902 سؤال تدريبي بتغذية راجعة فورية ومفصلة", descEn: "902 practice questions with instant detailed feedback", color: "#a855f7" },
  { numAr: "٥", numEn: "5", titleAr: "احصل على شهادتك", titleEn: "Get Certified", descAr: "شهادات رقمية موثقة معترف بها في سوق العمل", descEn: "Verified digital certificates recognized in the job market", color: "#f97316" },
  { numAr: "٦", numEn: "6", titleAr: "ابنِ مسيرتك", titleEn: "Build Your Career", descAr: "محلل CV ومطابقة وظائف وبورتفوليو احترافي", descEn: "CV analyzer, job matching & professional portfolio", color: "#8ed5ff" },
];

const CERTS = [
  { titleAr: "شهادة الذكاء الاصطناعي المتقدم", titleEn: "Advanced AI Certificate", orgAr: "أكاديمية الذكاء الاصطناعي", orgEn: "AI Academy", color: "#8ed5ff", stars: 5 },
  { titleAr: "شهادة اللغة الإنجليزية", titleEn: "English Proficiency Certificate", orgAr: "بوابة اللغة", orgEn: "Language Portal", color: "#d0bcff", stars: 5 },
  { titleAr: "شهادة الاختبارات الرقمية", titleEn: "Digital Exams Certificate", orgAr: "الاختبارات الرقمية", orgEn: "Digital Exams", color: "#f97316", stars: 5 },
  { titleAr: "شهادة الأتمتة الاحترافية", titleEn: "Professional Automation Certificate", orgAr: "أكاديمية الأتمتة", orgEn: "Automation Academy", color: "#a855f7", stars: 5 },
];

const LEARNING_STEPS = [
  { numAr: "١", numEn: "1", titleAr: "اختر دورتك", titleEn: "Pick Your Course", descAr: "تصفح 18 دورة متخصصة في الذكاء الاصطناعي والتقنية", descEn: "Browse 18 specialized AI & tech courses", icon: BookOpen, color: "#8ed5ff" },
  { numAr: "٢", numEn: "2", titleAr: "تعلم تفاعلياً", titleEn: "Learn Interactively", descAr: "فيديوهات وتمارين ومعامل عملية بخطوك الخاص", descEn: "Videos, exercises & labs at your own pace", icon: Play, color: "#d0bcff" },
  { numAr: "٣", numEn: "3", titleAr: "اختبر نفسك", titleEn: "Test Yourself", descAr: "اختبارات فورية ومتابعة تقدم لحظية شاملة", descEn: "Instant quizzes & comprehensive progress tracking", icon: Trophy, color: "#3ce0fb" },
  { numAr: "٤", numEn: "4", titleAr: "احصل على شهادتك", titleEn: "Earn Your Certificate", descAr: "شهادة رقمية موثقة تُضاف لبورتفوليوك تلقائياً", descEn: "Verified digital certificate added to your portfolio", icon: Award, color: "#a855f7" },
];

const FEATURED_PATHS = [
  { titleAr: "مسار الذكاء الاصطناعي الكامل", titleEn: "Complete AI Path", descAr: "من الصفر إلى المحترف في ChatGPT وClaude وGemini", descEn: "From zero to pro in ChatGPT, Claude & Gemini", color: "#8ed5ff", duration: "8 أسابيع / 8 weeks", level: "مبتدئ / Beginner" },
  { titleAr: "مسار الأتمتة المتقدم", titleEn: "Advanced Automation Path", descAr: "n8n وZapier وMake — 30 وصفة أتمتة جاهزة للتطبيق", descEn: "n8n, Zapier & Make — 30 ready-to-use automation recipes", color: "#a855f7", duration: "6 أسابيع / 6 weeks", level: "متوسط / Intermediate" },
  { titleAr: "مسار اللغة الإنجليزية", titleEn: "English Language Path", descAr: "اختبار المستوى والتدريب المكثف والتقييم الفوري", descEn: "Level assessment, intensive training & instant grading", color: "#d0bcff", duration: "12 أسبوع / 12 weeks", level: "جميع المستويات / All Levels" },
  { titleAr: "مسار IoT والأردوينو", titleEn: "IoT & Arduino Path", descAr: "72 مشروع تطبيقي و40 تحدي أردوينو عملي", descEn: "72 applied projects & 40 Arduino challenges", color: "#f97316", duration: "10 أسابيع / 10 weeks", level: "مبتدئ / Beginner" },
  { titleAr: "مسار المهن التقنية", titleEn: "Tech Career Path", descAr: "تحليل CV ذكي ومطابقة وظائف وبورتفوليو احترافي", descEn: "AI CV analysis, job matching & professional portfolio", color: "#3ce0fb", duration: "4 أسابيع / 4 weeks", level: "جميع المستويات / All Levels" },
  { titleAr: "مسار الاختبارات الرقمية", titleEn: "Digital Exams Path", descAr: "902 سؤال في 9 مواد تقنية مع شهادات موثقة", descEn: "902 questions in 9 tech subjects with verified certificates", color: "#f97316", duration: "5 أسابيع / 5 weeks", level: "متقدم / Advanced" },
];

const TECH_PARTNERS = [
  "ChatGPT", "Claude", "Gemini", "n8n", "Zapier", "Make", "Arduino", "ESP32", "IELTS", "LinkedIn",
];

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, active = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

// ─── Floating Orbs ────────────────────────────────────────────────────────────

function FloatingOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #8ed5ff 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-5%] top-[30%] h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #d0bcff 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[15%] left-[30%] h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3ce0fb 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 4 }}
      />
    </>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      <BackgroundBeams />
      <FloatingOrbs reduced={reduced} />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Brand */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-6 flex items-center justify-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8ed5ff] to-[#d0bcff]">
            <Brain className="h-5 w-5 text-black" />
          </div>
          <AnimatedGradientText
            className="text-xl font-bold"
            colorFrom="#8ed5ff"
            colorTo="#d0bcff"
            speed={0.8}
          >
            NexaLearn AI Cloud Academy
          </AnimatedGradientText>
        </motion.div>

        {/* Rotating headline */}
        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2 text-6xl font-black tracking-tight text-white md:text-8xl"
        >
          {isAr ? (
            <WordRotate
              words={["تعلّم", "ابنِ", "انمُ", "احصل"]}
              className="text-6xl font-black tracking-tight text-white md:text-8xl"
              duration={2200}
            />
          ) : (
            <WordRotate
              words={["Learn", "Build", "Grow", "Certify"]}
              className="text-6xl font-black tracking-tight text-white md:text-8xl"
              duration={2200}
            />
          )}
        </motion.div>

        <motion.h1
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" as const }}
          className="mb-4 text-3xl font-bold text-[#8ed5ff] md:text-5xl"
        >
          {isAr ? "مع الذكاء الاصطناعي" : "with AI"}
        </motion.h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" as const }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#e2e2e8]/70"
        >
          {isAr
            ? "6 بوابات تعليمية متكاملة · 18 دورة احترافية · 62 أداة ذكاء اصطناعي · شهادات رقمية موثقة"
            : "6 integrated learning portals · 18 professional courses · 62 AI tools · verified digital certificates"}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" as const }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <ShimmerButton
            shimmerColor="#8ed5ff"
            background="linear-gradient(135deg, #8ed5ff22, #d0bcff22)"
            className="px-8 py-4 text-base font-semibold text-white"
          >
            {isAr ? "ابدأ مجاناً الآن" : "Start Free Now"}
            <ArrowRight className="ms-2 inline h-4 w-4" />
          </ShimmerButton>
          <button className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-[#8ed5ff]/50 hover:text-white">
            <Play className="h-4 w-4" />
            {isAr ? "شاهد الجولة" : "Watch Tour"}
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" as const }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4"
        >
          {[
            { valAr: "+5,000", valEn: "5,000+", lblAr: "متعلم", lblEn: "Learners" },
            { valAr: "18", valEn: "18", lblAr: "دورة", lblEn: "Courses" },
            { valAr: "62", valEn: "62", lblAr: "أداة AI", lblEn: "AI Tools" },
            { valAr: "6", valEn: "6", lblAr: "بوابات", lblEn: "Portals" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 bg-black/20 px-6 py-5 text-center"
            >
              <span className="text-2xl font-black text-[#8ed5ff]">
                {isAr ? s.valAr : s.valEn}
              </span>
              <span className="text-xs text-[#e2e2e8]/60">
                {isAr ? s.lblAr : s.lblEn}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Trusted By ──────────────────────────────────────────────────────

function TrustedBySection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="border-y border-white/5 bg-[#0c0e12] py-12 px-6">
      <motion.p
        initial={reduced ? {} : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#e2e2e8]/40"
      >
        {isAr ? "النظام البيئي لأدوات الذكاء الاصطناعي الموثوقة" : "Trusted AI Ecosystem"}
      </motion.p>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {TECH_PARTNERS.map((name, i) => (
          <motion.div
            key={name}
            initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" as const }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-[#e2e2e8]/70 backdrop-blur-sm transition-all hover:border-[#8ed5ff]/30 hover:text-[#8ed5ff]"
          >
            {/* shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Marquee ─────────────────────────────────────────────────────────

function MarqueeSection() {
  return (
    <section className="overflow-hidden bg-black py-6">
      <style>{`
        @keyframes slide-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes slide-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .slide-left { animation: slide-left 35s linear infinite; }
        .slide-right { animation: slide-right 35s linear infinite; }
      `}</style>

      {/* Row 1 */}
      <div className="overflow-hidden py-3">
        <div className="flex gap-4 whitespace-nowrap slide-left">
          {[...MARQUEE_ITEMS_ROW1, ...MARQUEE_ITEMS_ROW1].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-[#8ed5ff]/20 bg-[#8ed5ff]/5 px-4 py-1.5 text-sm font-medium text-[#8ed5ff]/80"
            >
              <Sparkles className="h-3 w-3" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden py-3">
        <div className="flex gap-4 whitespace-nowrap slide-right">
          {[...MARQUEE_ITEMS_ROW2, ...MARQUEE_ITEMS_ROW2].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-[#d0bcff]/20 bg-[#d0bcff]/5 px-4 py-1.5 text-sm font-medium text-[#d0bcff]/80"
            >
              <Zap className="h-3 w-3" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: About (BentoGrid) ───────────────────────────────────────────────

function AboutSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const count5000 = useCountUp(5000, 2000, inView && !reduced);
  const count18 = useCountUp(18, 1500, inView && !reduced);
  const count62 = useCountUp(62, 1800, inView && !reduced);
  const count902 = useCountUp(902, 2200, inView && !reduced);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0c0e12] py-24 px-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.04}
        duration={3}
        className="text-[#8ed5ff]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8ed5ff]/60">
            {isAr ? "عن المنصة" : "About the Platform"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "منصة تعليمية متكاملة" : "One Complete Learning Platform"}
          </h2>
        </motion.div>

        <BentoGrid className="md:auto-rows-[16rem]">
          {/* Large cell col-span-2 */}
          <BentoGridItem
            className="md:col-span-2 bg-gradient-to-br from-[#111318] to-[#0c0e12] border-white/10"
            title={
              <span className="text-xl font-bold text-[#e2e2e8]">
                {isAr ? "أكاديمية ذكاء اصطناعي شاملة" : "A Comprehensive AI Learning Academy"}
              </span>
            }
            description={
              <span className="leading-relaxed text-[#e2e2e8]/60">
                {isAr
                  ? "NexaLearn تجمع 6 بوابات تعليمية متخصصة في منصة واحدة — من الذكاء الاصطناعي إلى الأتمتة، ومن اللغة الإنجليزية إلى مشاريع IoT. كل شيء تحتاجه في مكان واحد مع مرشد ذكي يرافقك."
                  : "NexaLearn unites 6 specialized learning portals in one platform — from AI to automation, from English to IoT projects. Everything you need, in one place, with a smart mentor by your side."}
              </span>
            }
            header={
              <div className="flex h-16 w-full items-center gap-3 rounded-lg border border-[#8ed5ff]/10 bg-[#8ed5ff]/5 px-4">
                <Brain className="h-6 w-6 text-[#8ed5ff]" />
                <span className="text-sm font-semibold text-[#8ed5ff]">NexaLearn AI Cloud Academy</span>
                <div className="ms-auto flex gap-1">
                  {["#8ed5ff", "#d0bcff", "#3ce0fb"].map((c) => (
                    <div key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>
            }
            icon={<Sparkles className="h-5 w-5 text-[#8ed5ff]" />}
          />

          {/* Learners count */}
          <BentoGridItem
            className="bg-gradient-to-br from-[#8ed5ff]/10 to-[#111318] border-[#8ed5ff]/20"
            title={
              <span className="text-4xl font-black text-[#8ed5ff]">
                {reduced ? "5,000+" : `${count5000.toLocaleString()}+`}
              </span>
            }
            description={
              <span className="text-[#e2e2e8]/60">
                {isAr ? "متعلم نشط على المنصة" : "active learners on platform"}
              </span>
            }
            header={
              <div className="flex h-16 items-center justify-center">
                <Users className="h-10 w-10 text-[#8ed5ff]/30" />
              </div>
            }
            icon={<Users className="h-4 w-4 text-[#8ed5ff]" />}
          />

          {/* Courses count */}
          <BentoGridItem
            className="bg-gradient-to-br from-[#d0bcff]/10 to-[#111318] border-[#d0bcff]/20"
            title={
              <span className="text-4xl font-black text-[#d0bcff]">
                {reduced ? "18" : count18}
              </span>
            }
            description={
              <span className="text-[#e2e2e8]/60">
                {isAr ? "دورة تدريبية احترافية" : "professional courses"}
              </span>
            }
            header={
              <div className="flex h-16 items-center justify-center">
                <BookOpen className="h-10 w-10 text-[#d0bcff]/30" />
              </div>
            }
            icon={<BookOpen className="h-4 w-4 text-[#d0bcff]" />}
          />

          {/* Tools count */}
          <BentoGridItem
            className="bg-gradient-to-br from-[#3ce0fb]/10 to-[#111318] border-[#3ce0fb]/20"
            title={
              <span className="text-4xl font-black text-[#3ce0fb]">
                {reduced ? "62" : count62}
              </span>
            }
            description={
              <span className="text-[#e2e2e8]/60">
                {isAr ? "أداة ذكاء اصطناعي متكاملة" : "integrated AI tools"}
              </span>
            }
            header={
              <div className="flex h-16 items-center justify-center">
                <Zap className="h-10 w-10 text-[#3ce0fb]/30" />
              </div>
            }
            icon={<Zap className="h-4 w-4 text-[#3ce0fb]" />}
          />

          {/* Questions count */}
          <BentoGridItem
            className="bg-gradient-to-br from-[#a855f7]/10 to-[#111318] border-[#a855f7]/20"
            title={
              <span className="text-4xl font-black text-[#a855f7]">
                {reduced ? "902" : count902}
              </span>
            }
            description={
              <span className="text-[#e2e2e8]/60">
                {isAr ? "سؤال تدريبي معتمد" : "certified practice questions"}
              </span>
            }
            header={
              <div className="flex h-16 items-center justify-center">
                <Trophy className="h-10 w-10 text-[#a855f7]/30" />
              </div>
            }
            icon={<Trophy className="h-4 w-4 text-[#a855f7]" />}
          />

          {/* Testimonial snippet */}
          <BentoGridItem
            className="md:col-span-2 bg-gradient-to-br from-[#111318] to-[#0c0e12] border-white/10"
            title={
              <span className="text-lg font-semibold text-[#e2e2e8]">
                {isAr ? '"غيّرت مساري المهني بالكامل"' : '"Changed my career completely"'}
              </span>
            }
            description={
              <span className="text-[#e2e2e8]/60">
                {isAr
                  ? "في 3 أشهر حصلت على شهادة الذكاء الاصطناعي وانضممت لفريق تقني في شركة ناشئة. NexaLearn ليست مجرد منصة — إنها نقطة تحول."
                  : "In 3 months I earned my AI certificate and joined a tech team at a startup. NexaLearn isn't just a platform — it's a turning point."}
              </span>
            }
            header={
              <div className="flex h-12 items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#8ed5ff] to-[#d0bcff]" />
                <div>
                  <p className="text-sm font-semibold text-[#e2e2e8]">{isAr ? "أحمد العمري" : "Ahmed Al-Omari"}</p>
                  <p className="text-xs text-[#e2e2e8]/40">{isAr ? "مهندس برمجيات | متخرج 2024" : "Software Engineer | 2024 Graduate"}</p>
                </div>
                <div className="ms-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#8ed5ff] text-[#8ed5ff]" />
                  ))}
                </div>
              </div>
            }
            icon={<MessageCircle className="h-4 w-4 text-[#8ed5ff]" />}
          />
        </BentoGrid>
      </div>
    </section>
  );
}

// ─── Section: Portals ─────────────────────────────────────────────────────────

function PortalsSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  const hoverItems = PORTALS.map((p) => ({
    title: isAr ? p.titleAr : p.titleEn,
    description: (isAr ? p.descAr : p.descEn) + " · " + p.tags.join(", "),
    link: "#",
  }));

  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-4 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d0bcff]/60">
            {isAr ? "البوابات التعليمية" : "Learning Portals"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "6 بوابات · عالم واحد" : "6 Portals · One World"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#e2e2e8]/60">
            {isAr
              ? "كل بوابة عالم متكامل من التعلم. اختر ما يناسب مسارك."
              : "Each portal is a complete learning world. Choose what fits your path."}
          </p>
        </motion.div>

        {/* Number badges + HoverEffect overlay */}
        <div className="relative">
          {/* Portal number badges strip */}
          <div className="mb-2 grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-6">
            {PORTALS.map((p) => (
              <div key={p.num} className="flex items-center justify-center py-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  {p.num}
                </span>
              </div>
            ))}
          </div>
          <HoverEffect items={hoverItems} className="py-4" />
        </div>
      </div>
    </section>
  );
}

// ─── Section: How Learning Works ──────────────────────────────────────────────

function HowLearningWorksSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="bg-[#0c0e12] py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3ce0fb]/60">
            {isAr ? "كيف يعمل التعلم" : "How Learning Works"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "4 خطوات نحو الإتقان" : "4 Steps to Mastery"}
          </h2>
        </motion.div>

        {/* Horizontal snap scroll container */}
        <div className="relative">
          {/* connecting line */}
          <div className="absolute top-[4.5rem] hidden h-px w-full md:block">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[#8ed5ff]/30 to-transparent" />
          </div>

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
            {LEARNING_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={reduced ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
                  className="relative flex min-w-[260px] flex-none snap-start flex-col items-center rounded-2xl border border-white/10 bg-[#111318] p-6 text-center md:min-w-0"
                >
                  {/* Step number */}
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black"
                    style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                  >
                    {isAr ? step.numAr : step.numEn}
                  </div>
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${step.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: step.color }} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#e2e2e8]">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#e2e2e8]/60">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Featured Paths ──────────────────────────────────────────────────

function FeaturedPathsSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#a855f7]/60">
            {isAr ? "المسارات المميزة" : "Featured Paths"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "مسارات تعليمية مُصممة لنجاحك" : "Learning Paths Designed for Your Success"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PATHS.map((path, i) => (
            <motion.div
              key={i}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" as const }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-6 transition-all hover:border-white/20 hover:bg-[#151820]"
            >
              {/* Colored top border */}
              <div
                className="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${path.color}, transparent)` }}
              />

              {/* Color accent orb */}
              <div
                className="absolute -top-8 -end-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                style={{ background: path.color }}
              />

              <div className="relative">
                <h3 className="mb-2 text-lg font-bold text-[#e2e2e8]">
                  {isAr ? path.titleAr : path.titleEn}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#e2e2e8]/60">
                  {isAr ? path.descAr : path.descEn}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-[#e2e2e8]/50">
                    <Clock className="h-3 w-3" />
                    {path.duration}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs"
                    style={{ color: path.color, background: `${path.color}15` }}
                  >
                    {path.level}
                  </span>
                </div>

                <button
                  className="flex items-center gap-2 text-sm font-semibold transition-all"
                  style={{ color: path.color }}
                >
                  {isAr ? "ابدأ المسار" : "Start Path"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Impact Numbers ──────────────────────────────────────────────────

function ImpactNumbersSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const counts = [
    useCountUp(5000, 2200, inView && !reduced),
    useCountUp(18, 1500, inView && !reduced),
    useCountUp(902, 2400, inView && !reduced),
    useCountUp(6, 1000, inView && !reduced),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#8ed5ff]/3 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8ed5ff]/60">
            {isAr ? "الأثر الحقيقي" : "Real Impact"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-6xl">
            {isAr ? "أرقام تتحدث" : "Numbers That Speak"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {IMPACT_NUMBERS.map((item, i) => (
            <motion.div
              key={i}
              initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              className="text-center"
            >
              <div
                className="mb-3 text-5xl font-black md:text-7xl"
                style={{ color: item.color }}
              >
                {reduced
                  ? (isAr ? item.valueAr : item.valueEn)
                  : i === 0
                  ? `${counts[i].toLocaleString()}+`
                  : counts[i]}
              </div>
              <div className="text-sm font-medium text-[#e2e2e8]/60 md:text-base">
                {isAr ? item.labelAr : item.labelEn}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Student Journey ─────────────────────────────────────────────────

function StudentJourneySection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="bg-[#0c0e12] py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3ce0fb]/60">
            {isAr ? "رحلة الطالب" : "Student Journey"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "من المبتدئ إلى المحترف" : "From Beginner to Professional"}
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-[2.75rem] hidden h-px w-full md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-[#8ed5ff] via-[#d0bcff] via-[#3ce0fb] to-[#8ed5ff]"
              initial={reduced ? {} : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" as const }}
            />
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:overflow-visible">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" as const }}
                className="relative flex min-w-[220px] flex-none snap-start flex-col items-center text-center md:min-w-0"
              >
                {/* Milestone circle */}
                <div
                  className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 font-black text-sm"
                  style={{
                    borderColor: step.color,
                    background: `${step.color}20`,
                    color: step.color,
                  }}
                >
                  {isAr ? step.numAr : step.numEn}
                </div>

                <div className="rounded-xl border border-white/10 bg-[#111318] p-4">
                  <h3 className="mb-1 text-sm font-bold text-[#e2e2e8]">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#e2e2e8]/50">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Certifications ──────────────────────────────────────────────────

function CertificationsSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f97316]/60">
            {isAr ? "الشهادات المعتمدة" : "Verified Certificates"}
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {isAr ? "شهادات تُفتح بها الأبواب" : "Certificates That Open Doors"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              initial={reduced ? {} : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-6 transition-all hover:border-white/25"
            >
              {/* Shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="relative flex items-start gap-4">
                {/* Certificate icon */}
                <div
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-xl"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                >
                  <Award className="h-7 w-7" style={{ color: cert.color }} />
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: cert.color, background: `${cert.color}20` }}
                    >
                      {isAr ? "موثقة" : "Verified"}
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <h3 className="mb-1 font-bold text-[#e2e2e8]">
                    {isAr ? cert.titleAr : cert.titleEn}
                  </h3>
                  <p className="mb-3 text-sm text-[#e2e2e8]/50">
                    {isAr ? cert.orgAr : cert.orgEn}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: cert.stars }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-[#f97316] text-[#f97316]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Contact / CTA ───────────────────────────────────────────────────

function ContactSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#0c0e12] py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0e12] to-black" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #8ed5ff, #d0bcff)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8ed5ff]/60">
            {isAr ? "ابدأ رحلتك اليوم" : "Start Your Journey Today"}
          </p>
          <h2 className="mb-4 text-4xl font-black text-white md:text-6xl">
            {isAr ? "هل أنت مستعد للتعلم؟" : "Ready to Learn?"}
          </h2>
          <p className="mb-10 text-lg text-[#e2e2e8]/60">
            {isAr
              ? "انضم لأكثر من 5,000 متعلم يطوّرون مهاراتهم مع NexaLearn كل يوم."
              : "Join over 5,000 learners developing their skills with NexaLearn every day."}
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder={isAr ? "بريدك الإلكتروني..." : "Your email address..."}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-[#e2e2e8] placeholder-[#e2e2e8]/30 outline-none backdrop-blur-sm focus:border-[#8ed5ff]/50 focus:ring-1 focus:ring-[#8ed5ff]/30"
                  dir="ltr"
                />
                <ShimmerButton
                  shimmerColor="#8ed5ff"
                  background="linear-gradient(135deg, #8ed5ff22, #d0bcff22)"
                  className="whitespace-nowrap px-7 py-3.5 text-sm font-semibold text-white"
                  onClick={() => { if (email) setSubmitted(true); }}
                >
                  {isAr ? "انضم مجاناً" : "Join Free"}
                  <ArrowRight className="ms-2 inline h-4 w-4" />
                </ShimmerButton>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 py-4 px-6"
              >
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">
                  {isAr ? "رائع! سنتواصل معك قريباً" : "Awesome! We'll reach out soon"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-xs text-[#e2e2e8]/30">
              {isAr ? "أو تواصل عبر:" : "Or reach us via:"}
            </span>
            {[
              { label: "WhatsApp", icon: MessageCircle, color: "#25d366" },
              { label: "LinkedIn", icon: Globe, color: "#0a66c2" },
              { label: "Email", icon: Zap, color: "#8ed5ff" },
            ].map(({ label, icon: Icon, color }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs text-[#e2e2e8]/60 transition-all hover:border-white/25 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" style={{ color }} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Footer CTA ──────────────────────────────────────────────────────

function FooterCtaSection({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  return (
    <section className="relative overflow-hidden bg-black py-24 px-6">
      {/* Animated gradient border top */}
      <div className="absolute top-0 inset-x-0 h-px">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[#8ed5ff] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8ed5ff] to-[#d0bcff]">
              <Brain className="h-6 w-6 text-black" />
            </div>
            <AnimatedGradientText
              className="text-2xl font-black"
              colorFrom="#8ed5ff"
              colorTo="#d0bcff"
              speed={0.6}
            >
              NexaLearn
            </AnimatedGradientText>
          </div>

          <h2 className="mb-4 text-4xl font-black text-white md:text-6xl">
            {isAr ? "انضم لـ +5,000 متعلم" : "Join 5,000+ Learners"}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-[#e2e2e8]/60">
            {isAr
              ? "ابدأ رحلة التعلم مجاناً اليوم. لا تحتاج بطاقة ائتمانية."
              : "Start learning for free today. No credit card required."}
          </p>

          <ShimmerButton
            shimmerColor="#8ed5ff"
            background="linear-gradient(135deg, #8ed5ff, #d0bcff)"
            className="mx-auto px-10 py-4 text-base font-black text-black"
          >
            {isAr ? "ابدأ مجاناً الآن" : "Get Started Free"}
            <Rocket className="ms-2 inline h-5 w-5" />
          </ShimmerButton>

          {/* Footer links */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-8">
            {[
              { ar: "أكاديمية الذكاء الاصطناعي", en: "AI Academy" },
              { ar: "بوابة اللغة", en: "Language Portal" },
              { ar: "الاختبارات الرقمية", en: "Digital Exams" },
              { ar: "مركز المهن", en: "Career Hub" },
              { ar: "أكاديمية الأتمتة", en: "Automation Academy" },
              { ar: "مختبر IoT", en: "IoT Lab" },
            ].map((link, i) => (
              <button
                key={i}
                className="text-sm text-[#e2e2e8]/40 transition-colors hover:text-[#e2e2e8]/80"
              >
                {isAr ? link.ar : link.en}
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs text-[#e2e2e8]/20">
            © 2025 NexaLearn AI Cloud Academy ·{" "}
            {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Floating AI Widget ───────────────────────────────────────────────────────

function FloatingAIWidget({ isAr, reduced }: { isAr: boolean; reduced: boolean }) {
  const [open, setOpen] = useState(false);

  const quickReplies = isAr
    ? ["ما هي الدورات المتاحة؟", "كيف أبدأ مجاناً؟", "هل هناك شهادات؟"]
    : ["What courses are available?", "How do I start free?", "Are there certificates?"];

  return (
    <div className="fixed bottom-6 end-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="mb-4 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-[#8ed5ff]/10 to-[#d0bcff]/10 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8ed5ff] to-[#d0bcff]">
                <Bot className="h-4 w-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#e2e2e8]">
                  {isAr ? "مرشد NexaLearn" : "NexaLearn Mentor"}
                </p>
                <p className="text-xs text-green-400">
                  {isAr ? "متاح الآن" : "Online now"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ms-auto text-[#e2e2e8]/40 hover:text-[#e2e2e8]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="p-4">
              <div className="mb-4 rounded-xl rounded-tl-none bg-white/5 p-3 text-sm text-[#e2e2e8]/80">
                {isAr
                  ? "مرحباً! أنا مرشدك الذكي في NexaLearn. كيف يمكنني مساعدتك اليوم؟"
                  : "Hi! I'm your NexaLearn AI mentor. How can I help you today?"}
              </div>

              <div className="flex flex-col gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-start text-xs text-[#e2e2e8]/70 transition-all hover:border-[#8ed5ff]/30 hover:bg-[#8ed5ff]/10 hover:text-[#8ed5ff]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={reduced ? {} : { scale: 1.05 }}
        whileTap={reduced ? {} : { scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8ed5ff] to-[#d0bcff] shadow-lg shadow-[#8ed5ff]/20"
      >
        {!reduced && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#8ed5ff] opacity-20" />
        )}
        {open ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <Bot className="h-6 w-6 text-black" />
        )}
      </motion.button>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function Concept2({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const reduced = useReducedMotion() ?? false;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen font-sans antialiased"
      style={{ background: "#0c0e12", color: "#e2e2e8" }}
    >
      <HeroSection isAr={isAr} reduced={reduced} />
      <TrustedBySection isAr={isAr} reduced={reduced} />
      <MarqueeSection />
      <AboutSection isAr={isAr} reduced={reduced} />
      <PortalsSection isAr={isAr} reduced={reduced} />
      <HowLearningWorksSection isAr={isAr} reduced={reduced} />
      <FeaturedPathsSection isAr={isAr} reduced={reduced} />
      <ImpactNumbersSection isAr={isAr} reduced={reduced} />
      <StudentJourneySection isAr={isAr} reduced={reduced} />
      <CertificationsSection isAr={isAr} reduced={reduced} />
      <ContactSection isAr={isAr} reduced={reduced} />
      <FooterCtaSection isAr={isAr} reduced={reduced} />
      <FloatingAIWidget isAr={isAr} reduced={reduced} />
    </div>
  );
}
