"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { HoverEffect } from "@/components/aceternity/card-hover-effect";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
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
  Users,
  Code,
  MessageCircle,
  X,
  Award,
  Target,
  TrendingUp,
  Play,
  Clock,
  BookOpen,
  Check,
  Timer,
  Gift,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  locale: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PORTALS = [
  {
    title: "AI Foundations Portal",
    description:
      "Master machine learning, deep learning, and prompt engineering from zero. 120+ lessons, quizzes, and a final capstone project.",
    link: "#",
  },
  {
    title: "Language B2 Portal",
    description:
      "IELTS & TOEFL preparation with AI-powered speaking and writing feedback. 90% first-attempt pass rate.",
    link: "#",
  },
  {
    title: "Automation Portal",
    description:
      "n8n, Make, and Zapier workflows that save 10+ hours per week. Build real automations from day 1.",
    link: "#",
  },
  {
    title: "Digital Exams Portal",
    description:
      "Earn 3 recognized certificates in 1 week. AI-graded mock exams with instant, actionable feedback.",
    link: "#",
  },
  {
    title: "Career Hub Portal",
    description:
      "AI CV builder, interview simulator, LinkedIn optimizer. 80% of students get interview calls in 30 days.",
    link: "#",
  },
  {
    title: "IoT Lab Portal",
    description:
      "Build 10 real-world hardware + AI projects in 5 weeks. Arduino, Raspberry Pi, and cloud integration.",
    link: "#",
  },
];

const FEATURES = [
  {
    icon: Bot,
    title: "AI Mentor",
    titleAr: "المرشد الذكي",
    desc: "Personalized guidance 24/7",
    descAr: "إرشاد شخصي على مدار الساعة",
  },
  {
    icon: BookOpen,
    title: "6 Learning Portals",
    titleAr: "6 بوابات تعليمية",
    desc: "Every skill you need",
    descAr: "كل مهارة تحتاجها",
  },
  {
    icon: Trophy,
    title: "Real Certificates",
    titleAr: "شهادات حقيقية",
    desc: "Industry recognized",
    descAr: "معترف بها في الصناعة",
  },
  {
    icon: Globe,
    title: "Arabic & English",
    titleAr: "عربي وإنجليزي",
    desc: "Full bilingual support",
    descAr: "دعم ثنائي اللغة الكامل",
  },
  {
    icon: Rocket,
    title: "Real Projects",
    titleAr: "مشاريع حقيقية",
    desc: "Not just theory",
    descAr: "ليس فقط نظرية",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    titleAr: "تتبع التقدم",
    desc: "Know exactly where you stand",
    descAr: "اعرف بالضبط أين أنت",
  },
];

const PATHS = [
  {
    name: "AI Foundations",
    nameAr: "أساسيات الذكاء الاصطناعي",
    stat: "Used by 1,200+ learners",
    statAr: "+1,200 متعلم",
    metric: "Avg. salary increase: 35%",
    metricAr: "متوسط زيادة الراتب: 35%",
    icon: Brain,
    color: "from-[#8ed5ff]/20 to-[#8ed5ff]/5",
    border: "border-[#8ed5ff]/30",
  },
  {
    name: "Language B2",
    nameAr: "اللغة المستوى B2",
    stat: "90% pass on first attempt",
    statAr: "90% نجاح في المحاولة الأولى",
    metric: "IELTS & TOEFL ready",
    metricAr: "جاهز للآيلتس والتوفل",
    icon: Globe,
    color: "from-[#d0bcff]/20 to-[#d0bcff]/5",
    border: "border-[#d0bcff]/30",
  },
  {
    name: "Automation",
    nameAr: "الأتمتة",
    stat: "Save 10+ hours/week",
    statAr: "وفر +10 ساعات أسبوعياً",
    metric: "n8n · Make · Zapier",
    metricAr: "n8n · Make · Zapier",
    icon: Zap,
    color: "from-[#3ce0fb]/20 to-[#3ce0fb]/5",
    border: "border-[#3ce0fb]/30",
  },
  {
    name: "Digital Exams",
    nameAr: "الامتحانات الرقمية",
    stat: "3 certificates in 1 week",
    statAr: "3 شهادات في أسبوع واحد",
    metric: "AI-graded instant feedback",
    metricAr: "تغذية راجعة فورية بالذكاء الاصطناعي",
    icon: Award,
    color: "from-amber-400/20 to-amber-400/5",
    border: "border-amber-400/30",
  },
  {
    name: "Career Hub",
    nameAr: "مركز المهنة",
    stat: "80% get interviews in 30 days",
    statAr: "80% يحصلون على مقابلات خلال 30 يوماً",
    metric: "AI CV + Interview simulator",
    metricAr: "سيرة ذاتية + محاكي مقابلات ذكي",
    icon: Target,
    color: "from-emerald-400/20 to-emerald-400/5",
    border: "border-emerald-400/30",
  },
  {
    name: "IoT Lab",
    nameAr: "مختبر إنترنت الأشياء",
    stat: "Build 10 projects in 5 weeks",
    statAr: "ابنِ 10 مشاريع في 5 أسابيع",
    metric: "Arduino · Pi · Cloud",
    metricAr: "أردوينو · راسبيري باي · سحابة",
    icon: Code,
    color: "from-rose-400/20 to-rose-400/5",
    border: "border-rose-400/30",
  },
];

const FAQS = [
  {
    q: "Is it really free to start?",
    qAr: "هل البداية مجانية فعلاً؟",
    a: "Yes — no credit card required. Create an account and start learning within 60 seconds.",
    aAr: "نعم، لا تحتاج إلى بطاقة ائتمانية. أنشئ حسابك وابدأ التعلم في أقل من 60 ثانية.",
  },
  {
    q: "What language is the content in?",
    qAr: "ما لغة المحتوى؟",
    a: "Full Arabic and English support across all 6 portals. Switch languages anytime.",
    aAr: "دعم كامل للعربية والإنجليزية في جميع البوابات الست. بدّل اللغة في أي وقت.",
  },
  {
    q: "How long do learning paths take?",
    qAr: "كم تستغرق مسارات التعلم؟",
    a: "Between 1 and 5 weeks depending on the path and your daily commitment. Most learners spend 1–2 hours per day.",
    aAr: "من أسبوع إلى 5 أسابيع حسب المسار والتزامك اليومي. يتعلم معظم الطلاب ساعة إلى ساعتين يومياً.",
  },
  {
    q: "Are the certificates recognized?",
    qAr: "هل الشهادات معترف بها؟",
    a: "Yes. All certificates are verifiable digital badges that you can share on LinkedIn and attach to job applications.",
    aAr: "نعم. جميع الشهادات شارات رقمية قابلة للتحقق يمكنك مشاركتها على LinkedIn وإرفاقها بطلبات التوظيف.",
  },
  {
    q: "Can I learn on mobile?",
    qAr: "هل يمكنني التعلم على الهاتف؟",
    a: "Full mobile experience — lessons, quizzes, AI Mentor chat, and progress tracking all work on any device.",
    aAr: "تجربة متكاملة على الهاتف — الدروس والاختبارات والمرشد الذكي وتتبع التقدم تعمل على أي جهاز.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mohamed A.",
    role: "Software Engineer",
    location: "Cairo, Egypt",
    quote:
      "Finally, AI education in Arabic that actually works. I went from zero to building my first ML model in 3 weeks.",
    quoteAr:
      "أخيراً تعليم ذكاء اصطناعي بالعربية يعمل فعلاً. انتقلت من الصفر إلى بناء أول نموذج ML في 3 أسابيع.",
    rating: 5,
    outcome: "Landed AI Engineer role at a fintech startup",
  },
  {
    name: "Sara K.",
    role: "Marketing Manager",
    location: "Riyadh, KSA",
    quote:
      "Got certified in 3 weeks, hired in 1 month. The AI Mentor answered every question I had at 2am.",
    quoteAr:
      "حصلت على الشهادة في 3 أسابيع وعلى وظيفة في شهر. المرشد الذكي أجاب على كل أسئلتي حتى الساعة 2 صباحاً.",
    rating: 5,
    outcome: "+40% salary after certification",
  },
  {
    name: "Khalid M.",
    role: "Freelance Developer",
    location: "Dubai, UAE",
    quote:
      "The AI Mentor saved me 2 months of trial and error. It knew exactly where I was struggling.",
    quoteAr:
      "المرشد الذكي وفّر عليّ شهرين من التجربة والخطأ. كان يعرف بالضبط أين أتعثر.",
    rating: 5,
    outcome: "Automation workflow saves 12 hours/week",
  },
];

// ─── Marquee items ────────────────────────────────────────────────────────────

const MARQUEE_ROW_1 = [
  "AI Foundations",
  "Machine Learning",
  "n8n Automation",
  "IELTS Prep",
  "IoT Projects",
  "Career Hub",
  "GPT Engineering",
  "Digital Certs",
  "Arabic AI",
  "Interview Simulator",
];

const MARQUEE_ROW_2 = [
  "Python",
  "Make.com",
  "Zapier",
  "Arduino",
  "Raspberry Pi",
  "ChatGPT",
  "Prompt Engineering",
  "CV Builder",
  "LinkedIn Optimizer",
  "TOEFL Prep",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </span>
  );
}

function IncludedBadge({ isAr }: { isAr: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
      <Check className="w-3 h-3" />
      {isAr ? "مجاناً" : "Included Free"}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Concept5({ locale }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fade = shouldReduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" as const } };

  const stagger = (i: number) =>
    shouldReduce ? {} : { ...fade, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" as const } };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{
        backgroundColor: "var(--color-background, #0c0e12)",
        color: "#f1f5f9",
        fontFamily: isAr ? "'Cairo', 'Tajawal', sans-serif" : "'Inter', sans-serif",
      }}
      className="min-h-screen overflow-x-hidden"
    >
      {/* ── Marquee CSS ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes conv-left  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes conv-right { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
        .conv-left  { animation: conv-left  28s linear infinite; }
        .conv-right { animation: conv-right 28s linear infinite; }
        @keyframes float-pulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-pulse { animation: float-pulse 3s ease-in-out infinite; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════
          STICKY ANNOUNCEMENT BAR
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {announcementOpen && (
          <motion.div
            initial={shouldReduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="sticky top-0 z-50 overflow-hidden"
          >
            <div className="bg-amber-500 text-black flex items-center justify-between px-4 py-2 text-sm font-semibold gap-2">
              <span />
              <span className="text-center">
                {isAr
                  ? "🎓 عرض خاص: أول 30 يوماً مجاناً — "
                  : "🎓 Special offer: First 30 days free — "}
                <button className="underline underline-offset-2 hover:no-underline font-bold">
                  {isAr ? "سجّل الآن ←" : "Enroll Now →"}
                </button>
              </span>
              <button
                onClick={() => setAnnouncementOpen(false)}
                aria-label={isAr ? "إغلاق" : "Close announcement"}
                className="rounded-full p-0.5 hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-40 border-b border-white/5"
        style={{
          background: "rgba(12,14,18,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--color-primary,#8ed5ff), var(--color-secondary,#d0bcff))" }}
            >
              <Brain className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-sm text-white">
              {isAr ? "NexaLearn" : "NexaLearn"}
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            {(isAr
              ? ["البوابات", "المسارات", "الأسعار"]
              : ["Portals", "Paths", "Pricing"]
            ).map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:block text-sm text-white/60 hover:text-white transition-colors"
            >
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </a>
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.12)"
              borderRadius="8px"
              className="text-sm font-semibold px-4 py-2 text-[#8ed5ff] border-[#8ed5ff]/30"
            >
              {isAr ? "ابدأ مجاناً" : "Enroll Free"}
            </ShimmerButton>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-md hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={isAr ? "القائمة" : "Toggle menu"}
            >
              <div className="space-y-1">
                <span className="block w-5 h-0.5 bg-white/70" />
                <span className="block w-5 h-0.5 bg-white/70" />
                <span className="block w-5 h-0.5 bg-white/70" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/5 px-4 pb-4"
            >
              <div className="flex flex-col gap-3 pt-3 text-sm text-white/70">
                {(isAr
                  ? ["البوابات", "المسارات", "الأسعار", "تسجيل الدخول"]
                  : ["Portals", "Paths", "Pricing", "Sign In"]
                ).map((l) => (
                  <a key={l} href="#" className="hover:text-white transition-colors py-1">
                    {l}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 text-center overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(142,213,255,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Social proof pill */}
          <motion.div {...stagger(0)} className="inline-flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-sm text-white/70"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isAr
                ? "انضم إليه 5,000+ متعلم في مصر والسعودية والإمارات وقطر"
                : "Joined by 5,000+ learners in Egypt, KSA, UAE & Qatar"}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...stagger(1)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4"
            style={{ color: "#f8fafc" }}
          >
            {isAr ? (
              <>
                تعلّم الذكاء الاصطناعي.{" "}
                <span style={{ color: "var(--color-primary,#8ed5ff)" }}>
                  احصل على شهادتك.
                </span>{" "}
                احصل على وظيفتك.
              </>
            ) : (
              <>
                Learn AI.{" "}
                <span style={{ color: "var(--color-primary,#8ed5ff)" }}>
                  Get Certified.
                </span>{" "}
                Get Hired.
              </>
            )}
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...stagger(2)}
            className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {isAr
              ? "أول منظومة تعليمية ذكاء اصطناعي عربية بمسارات شخصية ومشاريع حقيقية وشهادات قابلة للتحقق."
              : "The first Arabic AI learning ecosystem with personalized paths, real projects, and verifiable certificates."}
          </motion.p>

          {/* Feature row */}
          <motion.div
            {...stagger(3)}
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/60 mb-8"
          >
            {(isAr
              ? [
                  "✓ 6 بوابات",
                  "✓ +300 دورة",
                  "✓ مرشد ذكي",
                  "✓ مجاني للبدء",
                ]
              : [
                  "✓ 6 Portals",
                  "✓ 300+ Courses",
                  "✓ AI Mentor",
                  "✓ Free to Start",
                ]
            ).map((f) => (
              <span key={f} className="font-medium text-white/75">
                {f}
              </span>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div {...stagger(4)} className="flex flex-col items-center gap-3">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="linear-gradient(135deg, rgba(142,213,255,0.18) 0%, rgba(208,188,255,0.12) 100%)"
              borderRadius="12px"
              className="text-base sm:text-lg font-bold px-8 py-4 text-white border-[#8ed5ff]/40 w-full sm:w-auto"
            >
              {isAr ? "ابدأ التعلم مجاناً ←" : "Start Learning Free →"}
            </ShimmerButton>

            <p className="text-xs text-white/35">
              {isAr
                ? "لا بطاقة ائتمانية · إلغاء في أي وقت · عربي وإنجليزي"
                : "No credit card · Cancel anytime · Arabic & English"}
            </p>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...stagger(5)}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <StarRating />
            <span className="text-sm text-white/50">
              {isAr ? "4.9/5 من +500 تقييم" : "4.9/5 from 500+ reviews"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SOCIAL PROOF QUOTES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 sm:px-6 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              {...stagger(i)}
              className="flex flex-col gap-3 p-5 rounded-xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <StarRating count={t.rating} />
              <p className="text-sm text-white/70 leading-relaxed italic">
                &ldquo;{isAr ? t.quoteAr : t.quote}&rdquo;
              </p>
              <footer className="text-xs text-white/40 font-medium">
                — {t.name}, {t.location}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Partner logos text */}
        <div className="mt-8 text-center text-xs text-white/25 uppercase tracking-widest">
          {isAr ? "موثوق من قِبَل" : "Trusted by learners at"}
          <span className="ms-2 text-white/35 not-italic normal-case tracking-normal text-sm">
            Google · Amazon · Freelancers · Agencies · Startups
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 overflow-hidden select-none" aria-hidden="true">
        {/* Row 1 — left */}
        <div className="flex w-full overflow-hidden mb-3">
          <div className="conv-left flex gap-6 whitespace-nowrap">
            {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, i) => (
              <span
                key={`r1-${i}`}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border border-white/8 text-white/40"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Sparkles className="w-3 h-3 text-[#8ed5ff]/60 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — right */}
        <div className="flex w-full overflow-hidden">
          <div className="conv-right flex gap-6 whitespace-nowrap">
            {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, i) => (
              <span
                key={`r2-${i}`}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border border-white/8 text-white/40"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Zap className="w-3 h-3 text-[#d0bcff]/60 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PLATFORM FEATURES (What you get)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {isAr ? "هذا ما ستحصل عليه داخل NexaLearn" : "Here's what you get inside NexaLearn"}
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              {isAr
                ? "كل أداة تحتاجها لتتعلم وتشهّد وتُوظَّف — في منصة واحدة."
                : "Every tool you need to learn, certify, and get hired — in one platform."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  {...stagger(i)}
                  className="group p-5 rounded-xl border border-white/8 hover:border-[#8ed5ff]/30 transition-all duration-300 flex flex-col gap-3"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(142,213,255,0.1)" }}
                  >
                    <Icon className="w-5 h-5 text-[#8ed5ff]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">
                      {isAr ? f.titleAr : f.title}
                    </h3>
                    <p className="text-xs text-white/50">
                      {isAr ? f.descAr : f.desc}
                    </p>
                  </div>
                  <IncludedBadge isAr={isAr} />
                </motion.div>
              );
            })}
          </div>

          {/* Section CTA */}
          <div className="mt-10 text-center">
            <ShimmerButton
              shimmerColor="#d0bcff"
              background="rgba(208,188,255,0.1)"
              borderRadius="10px"
              className="text-sm font-semibold px-6 py-3 text-[#d0bcff] border-[#d0bcff]/25"
            >
              {isAr ? "اكتشف كل الميزات ←" : "Explore all features →"}
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PORTALS (HoverEffect)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {isAr ? "6 بوابات. كل ما تحتاجه." : "6 Portals. Everything you need."}
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
              {isAr
                ? "من أساسيات الذكاء الاصطناعي إلى مسار المهنة — كل منهج مبني للنتيجة، لا للنظرية."
                : "From AI basics to career placement — every curriculum built for outcomes, not theory."}
            </p>
          </motion.div>

          <HoverEffect items={PORTALS} className="py-6" />

          <div className="text-center mt-2">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.08)"
              borderRadius="10px"
              className="text-sm font-semibold px-6 py-3 text-[#8ed5ff] border-[#8ed5ff]/20"
            >
              {isAr ? "استعرض جميع البوابات ←" : "Browse all portals →"}
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fade} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isAr ? "كيف يعمل؟" : "How it works"}
          </motion.h2>
          <motion.p {...stagger(1)} className="text-white/50 mb-14">
            {isAr ? "ثلاث خطوات وأنت تتعلم." : "Three steps and you're learning."}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector lines — desktop only */}
            <div
              aria-hidden
              className="hidden md:block absolute top-8 inset-x-[16.67%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(142,213,255,0.25), transparent)" }}
            />

            {(isAr
              ? [
                  {
                    n: "01",
                    title: "سجّل في 30 ثانية",
                    desc: "لا بطاقة ائتمانية، لا متاعب.",
                    icon: Zap,
                  },
                  {
                    n: "02",
                    title: "أجرِ تقييمك الذكي",
                    desc: "يحدد مستواك فوراً ويبني مسارك الشخصي.",
                    icon: Target,
                  },
                  {
                    n: "03",
                    title: "ابدأ مسارك الشخصي",
                    desc: "من اليوم الأول. لا انتظار، لا تأخير.",
                    icon: Rocket,
                  },
                ]
              : [
                  {
                    n: "01",
                    title: "Sign up in 30 seconds",
                    desc: "No CC. No friction.",
                    icon: Zap,
                  },
                  {
                    n: "02",
                    title: "Take AI assessment",
                    desc: "Find your level instantly. Get your personal path.",
                    icon: Target,
                  },
                  {
                    n: "03",
                    title: "Start your path — Day 1",
                    desc: "No waiting. No gatekeeping. Just learning.",
                    icon: Rocket,
                  },
                ]
            ).map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  {...stagger(i)}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(142,213,255,0.15), rgba(208,188,255,0.08))",
                      border: "1px solid rgba(142,213,255,0.25)",
                    }}
                  >
                    <Icon className="w-7 h-7 text-[#8ed5ff]" />
                    <span
                      className="absolute -top-2 -end-2 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ background: "var(--color-primary,#8ed5ff)", color: "#0c0e12" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/50 max-w-48">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...stagger(4)}
            className="mt-10 text-lg font-semibold"
            style={{ color: "var(--color-primary,#8ed5ff)" }}
          >
            {isAr ? "هذا كل شيء. أنت الآن متعلم." : "That's it. You're a learner."}
          </motion.p>

          <motion.div {...stagger(5)} className="mt-6">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.12)"
              borderRadius="10px"
              className="text-sm font-semibold px-7 py-3 text-[#8ed5ff] border-[#8ed5ff]/30"
            >
              {isAr ? "ابدأ الآن — مجاناً" : "Get started now — Free"}
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MID-PAGE CONVERSION CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(142,213,255,0.07) 0%, rgba(60,224,251,0.05) 50%, rgba(208,188,255,0.07) 100%)",
          borderTop: "1px solid rgba(142,213,255,0.1)",
          borderBottom: "1px solid rgba(142,213,255,0.1)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fade} className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-semibold">
              {isAr ? "🟢 342 شخصاً سجّل هذا الأسبوع" : "🟢 342 people enrolled this week"}
            </span>
          </motion.div>

          <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr
              ? "مستعد؟ انضم لأكثر من 5,000 متعلم اليوم."
              : "Ready? Join 5,000+ learners today."}
          </motion.h2>

          <motion.p {...stagger(2)} className="text-white/50 mb-8">
            {isAr
              ? "لا تنتظر الدورة التالية. المحتوى متاح الآن ومباشرة."
              : "Don't wait for the next cohort. Content is available now, instantly."}
          </motion.p>

          <motion.div {...stagger(3)}>
            <ShimmerButton
              shimmerColor="#3ce0fb"
              background="linear-gradient(135deg, rgba(142,213,255,0.2), rgba(60,224,251,0.15))"
              borderRadius="12px"
              className="text-base font-bold px-10 py-4 text-white border-[#3ce0fb]/30 w-full sm:w-auto"
            >
              {isAr ? "ابدأ مجاناً الآن" : "Start Free Now"}
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED PATHS / OUTCOMES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {isAr ? "6 مسارات تغيّر المهن" : "6 paths that change careers"}
            </h2>
            <p className="text-white/50">
              {isAr
                ? "كل مسار مصمم لنتيجة واحدة واضحة."
                : "Each path designed for one clear outcome."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.name}
                  {...stagger(i)}
                  className={`p-5 rounded-xl border ${path.border} bg-gradient-to-br ${path.color} hover:scale-[1.02] transition-transform duration-200 flex flex-col gap-3`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {isAr ? path.nameAr : path.name}
                      </h3>
                      <p className="text-xs text-white/50 mt-0.5">
                        {isAr ? path.statAr : path.stat}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 border-t border-white/8 pt-3">
                    {isAr ? path.metricAr : path.metric}
                  </p>
                  <a
                    href="#"
                    className="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {isAr ? "استكشف ←" : "Explore →"}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          IMPACT NUMBERS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {(isAr
              ? [
                  { n: "+5,000", label: "مُسجَّل", sub: "وفي تزايد مستمر" },
                  { n: "+300", label: "دورة", sub: "مُحدَّثة دائماً" },
                  { n: "95%", label: "رضا", sub: "موثّق" },
                  { n: "3", label: "دول", sub: "وإلى مزيد" },
                ]
              : [
                  { n: "5,000+", label: "Enrolled", sub: "and growing" },
                  { n: "300+", label: "Courses", sub: "always updated" },
                  { n: "95%", label: "Satisfaction", sub: "verified" },
                  { n: "3", label: "Countries", sub: "and counting" },
                ]
            ).map((stat, i) => (
              <motion.div key={stat.label} {...stagger(i)} className="flex flex-col gap-1">
                <span
                  className="text-4xl font-extrabold"
                  style={{ color: "var(--color-primary,#8ed5ff)" }}
                >
                  {stat.n}
                </span>
                <span className="text-white font-semibold text-sm">{stat.label}</span>
                <span className="text-white/35 text-xs">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STUDENT JOURNEY (mini timeline)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fade} className="text-center text-2xl font-bold text-white mb-10">
            {isAr ? "رحلتك كمتعلم" : "Your journey as a learner"}
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {/* Connector */}
            <div
              aria-hidden
              className="hidden md:block absolute inset-y-5 inset-x-10 h-px top-1/2"
              style={{ background: "linear-gradient(90deg, transparent, rgba(142,213,255,0.2), transparent)" }}
            />

            {(isAr
              ? ["سجّل", "قيِّم", "تعلّم", "شهِّد", "وُظِّف"]
              : ["Sign Up", "Assess", "Learn", "Certify", "Hired"]
            ).map((step, i, arr) => {
              const icons = [Zap, Target, BookOpen, Award, Trophy];
              const Icon = icons[i];
              return (
                <motion.div
                  key={step}
                  {...stagger(i)}
                  className="flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        i === arr.length - 1
                          ? "linear-gradient(135deg, #8ed5ff, #d0bcff)"
                          : "rgba(142,213,255,0.1)",
                      border:
                        i === arr.length - 1
                          ? "none"
                          : "1px solid rgba(142,213,255,0.25)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: i === arr.length - 1 ? "#0c0e12" : "#8ed5ff" }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: i === arr.length - 1 ? "#8ed5ff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {step}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {isAr ? "شهادات تفتح الأبواب" : "Certificates that open doors"}
            </h2>
            <p className="text-white/50 text-sm">
              {isAr
                ? "شارات رقمية قابلة للتحقق يمكن مشاركتها مباشرة على LinkedIn."
                : "Verifiable digital badges you can share directly on LinkedIn."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(isAr
              ? [
                  "شهادة أساسيات الذكاء الاصطناعي",
                  "شهادة أتمتة الأعمال",
                  "شهادة اللغة B2",
                  "شهادة إنترنت الأشياء",
                ]
              : [
                  "AI Foundations Certificate",
                  "Business Automation Certificate",
                  "Language B2 Certificate",
                  "IoT Engineering Certificate",
                ]
            ).map((cert, i) => (
              <motion.div
                key={cert}
                {...stagger(i)}
                className="p-5 rounded-xl border border-white/8 flex flex-col items-center gap-3 text-center"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(142,213,255,0.05), rgba(208,188,255,0.03))",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(142,213,255,0.1)",
                    border: "2px solid rgba(142,213,255,0.25)",
                  }}
                >
                  <Award className="w-7 h-7 text-[#8ed5ff]" />
                </div>
                <p className="text-sm font-semibold text-white/85">{cert}</p>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  <Check className="w-3 h-3" />
                  {isAr ? "موثّق" : "Verified"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DETAILED TESTIMONIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fade} className="text-center text-3xl sm:text-4xl font-bold text-white mb-10">
            {isAr ? "ماذا يقول طلابنا؟" : "What our students say"}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={`full-${t.name}`}
                {...stagger(i)}
                className="p-6 rounded-2xl border border-white/8 flex flex-col gap-4"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <StarRating count={t.rating} />
                <blockquote className="text-sm text-white/70 leading-relaxed">
                  &ldquo;{isAr ? t.quoteAr : t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-white/6 pt-4 flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{ background: "rgba(142,213,255,0.12)", color: "#8ed5ff" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role} · {t.location}</p>
                    <p className="text-xs text-emerald-400 mt-1">{t.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {isAr ? "بسيط وشفاف" : "Simple & transparent"}
            </h2>
            <p className="text-white/50">
              {isAr ? "ابدأ مجاناً. ارقَّ متى تريد." : "Start free. Upgrade when you're ready."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* FREE */}
            <motion.div
              {...stagger(0)}
              className="p-6 rounded-2xl border border-white/10 flex flex-col gap-5"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {isAr ? "مجاني" : "Free"}
                </span>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">0</span>
                  <span className="text-white/40 mb-1 text-sm">
                    {isAr ? "جنيه/شهر" : "EGP/month"}
                  </span>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {(isAr
                  ? [
                      "وصول أساسي للمحتوى",
                      "5 رسائل مرشد ذكي يومياً",
                      "الوصول للمجتمع",
                      "تتبع التقدم",
                    ]
                  : [
                      "Basic content access",
                      "5 AI Mentor messages/day",
                      "Community access",
                      "Progress tracking",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <ShimmerButton
                shimmerColor="#ffffff"
                background="rgba(255,255,255,0.06)"
                borderRadius="10px"
                className="text-sm font-semibold py-3 text-white/70 border-white/10 w-full"
              >
                {isAr ? "ابدأ مجاناً" : "Start Free"}
              </ShimmerButton>
            </motion.div>

            {/* PRO */}
            <motion.div
              {...stagger(1)}
              className="p-6 rounded-2xl border border-[#8ed5ff]/30 flex flex-col gap-5 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(142,213,255,0.08) 0%, rgba(208,188,255,0.05) 100%)",
              }}
            >
              {/* Popular badge */}
              <span
                className="absolute top-4 end-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ background: "var(--color-primary,#8ed5ff)", color: "#0c0e12" }}
              >
                {isAr ? "الأكثر شعبية" : "Most Popular"}
              </span>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8ed5ff]">
                  Pro
                </span>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">99</span>
                  <span className="text-white/40 mb-1 text-sm">
                    {isAr ? "جنيه/شهر" : "EGP/month"}
                  </span>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {(isAr
                  ? [
                      "وصول كامل لجميع البوابات",
                      "مرشد ذكي غير محدود",
                      "جميع الشهادات مشمولة",
                      "جلسات مباشرة",
                      "أولوية الدعم",
                      "المشاريع الحصرية",
                    ]
                  : [
                      "Full access to all portals",
                      "Unlimited AI Mentor",
                      "All certificates included",
                      "Live sessions",
                      "Priority support",
                      "Exclusive projects",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#8ed5ff] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <ShimmerButton
                shimmerColor="#8ed5ff"
                background="linear-gradient(135deg, rgba(142,213,255,0.22), rgba(208,188,255,0.15))"
                borderRadius="10px"
                className="text-sm font-bold py-3 text-white border-[#8ed5ff]/40 w-full"
              >
                {isAr ? "اشترك في Pro" : "Get Pro"}
              </ShimmerButton>
              <p className="text-center text-xs text-white/30">
                {isAr ? "إلغاء في أي وقت · لا عقد" : "Cancel anytime · No contract"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fade} className="text-center text-3xl font-bold text-white mb-10">
            {isAr ? "أسئلة شائعة" : "Frequently asked questions"}
          </motion.h2>

          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                {...stagger(i)}
                className="rounded-xl border border-white/8 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-semibold text-white/85">
                    {isAr ? faq.qAr : faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40 shrink-0 text-lg leading-none"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-white/55 leading-relaxed">
                        {isAr ? faq.aAr : faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* FAQ CTA */}
          <div className="mt-8 text-center">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.1)"
              borderRadius="10px"
              className="text-sm font-semibold px-7 py-3 text-[#8ed5ff] border-[#8ed5ff]/25"
            >
              {isAr ? "لا تزال لديك أسئلة؟ تحدث معنا" : "Still have questions? Chat with us"}
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 sm:px-6 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(142,213,255,0.06) 0%, rgba(208,188,255,0.04) 100%)",
          borderTop: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(142,213,255,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <motion.div {...stagger(0)} className="inline-flex items-center gap-2 mb-6">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-semibold">
              {isAr ? "لا تنتظر — ابدأ اليوم" : "Don't wait — start today"}
            </span>
          </motion.div>

          <motion.h2
            {...stagger(1)}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight"
          >
            {isAr
              ? "توقف عن الانتظار. ابدأ التعلم اليوم."
              : "Stop waiting. Start learning today."}
          </motion.h2>

          <motion.p {...stagger(2)} className="text-white/50 text-lg mb-8">
            {isAr
              ? "5,000 متعلم بدأوا. لماذا لا أنت؟"
              : "5,000 learners already started. Why not you?"}
          </motion.p>

          <motion.div {...stagger(3)} className="flex flex-col items-center gap-4">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="linear-gradient(135deg, rgba(142,213,255,0.2), rgba(208,188,255,0.15))"
              borderRadius="14px"
              className="text-lg font-extrabold px-10 py-5 text-white border-[#8ed5ff]/35 w-full sm:w-auto"
            >
              {isAr ? "سجّل مجاناً — لا بطاقة ائتمانية" : "Enroll Free — No Credit Card"}
            </ShimmerButton>

            <p className="text-xs text-white/30">
              {isAr
                ? "لا عقود · إلغاء في أي وقت · ابدأ خلال 60 ثانية"
                : "No contracts · Cancel anytime · Start in 60 seconds"}
            </p>
          </motion.div>

          {/* Companies row */}
          <motion.div {...stagger(4)} className="mt-10">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-3">
              {isAr ? "طلابنا يعملون في:" : "Our learners work at:"}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/35">
              {["Google", "Amazon", "Startup X", "Agency Y", "Freelance"].map((co) => (
                <span key={co}>{co}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8ed5ff, #d0bcff)" }}
            >
              <Brain className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-bold text-sm text-white/70">NexaLearn</span>
            <span className="text-white/20 text-xs ms-2">
              {isAr ? "بواسطة أحمد درهوس" : "by Ahmed Darhous"}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-white/35">
            {(isAr
              ? ["الخصوصية", "الشروط", "الدعم", "تواصل معنا", "البوابات"]
              : ["Privacy", "Terms", "Support", "Contact", "Portals"]
            ).map((l) => (
              <a key={l} href="#" className="hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/20">
            {isAr
              ? `© ${new Date().getFullYear()} NexaLearn. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} NexaLearn. All rights reserved.`}
          </p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════════════
          FLOATING AI WIDGET
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className={`fixed bottom-6 ${isAr ? "left-6" : "right-6"} z-50 flex flex-col items-end gap-3`}
      >
        <AnimatePresence>
          {aiChatOpen && (
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              className="mb-2 p-4 rounded-2xl border border-white/10 w-64 shadow-2xl"
              style={{ background: "rgba(17,19,24,0.97)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#8ed5ff]" />
                  <span className="text-xs font-bold text-white">
                    {isAr ? "المرشد الذكي" : "AI Mentor"}
                  </span>
                </div>
                <button
                  onClick={() => setAiChatOpen(false)}
                  className="text-white/30 hover:text-white/60 transition-colors"
                  aria-label={isAr ? "إغلاق" : "Close"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-white/55 mb-3 leading-relaxed">
                {isAr
                  ? "مرحباً! أنا مرشدك الذكي. اسألني عن أي مسار أو شهادة أو إذا كنت لا تعرف من أين تبدأ."
                  : "Hi! I'm your AI Mentor. Ask me about any path, certificate, or if you're unsure where to start."}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={isAr ? "اكتب رسالتك..." : "Ask anything..."}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#8ed5ff]/40"
                />
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(142,213,255,0.15)" }}
                  aria-label={isAr ? "إرسال" : "Send"}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#8ed5ff]" />
                </button>
              </div>
              <p className="text-center text-[10px] text-white/20 mt-2">
                {isAr ? "مجاني تماماً" : "Completely free"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setAiChatOpen(!aiChatOpen)}
          className="float-pulse flex items-center gap-2 px-4 py-3 rounded-full shadow-xl border border-white/10 text-sm font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, rgba(142,213,255,0.2), rgba(208,188,255,0.15))",
            backdropFilter: "blur(16px)",
          }}
          aria-label={isAr ? "فتح المرشد الذكي" : "Open AI Mentor"}
          whileHover={shouldReduce ? {} : { scale: 1.05 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
        >
          <Bot className="w-4 h-4 text-[#8ed5ff]" />
          <span className="hidden sm:block text-xs">
            {isAr ? "تحدث مع المرشد الذكي — مجاناً" : "Chat with AI Mentor — Free"}
          </span>
          <span className="sm:hidden">AI</span>
        </motion.button>
      </div>
    </div>
  );
}
