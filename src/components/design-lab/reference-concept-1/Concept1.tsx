"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Globe,
  Trophy,
  Target,
  Zap,
  Code,
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  MessageCircle,
  X,
  Menu,
  Award,
  Clock,
  Play,
  TrendingUp,
  Rocket,
  Bot,
  Sparkles,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { AnimatedGridPattern } from "@/components/shadcn/ui/animated-grid-pattern";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";

// ─── Data ────────────────────────────────────────────────────────────────────

const PORTALS = [
  {
    id: "ai-academy",
    titleAr: "أكاديمية الذكاء الاصطناعي",
    titleEn: "AI Academy",
    descAr: "18 دورة، 62 أداة AI، مرشد ذكي",
    descEn: "18 courses, 62 AI tools, smart mentor",
    color: "#8ed5ff",
    icon: Brain,
    href: "/ai-academy",
    badge: null,
    tags: ["AI Tools", "Prompt Eng.", "ML Basics"],
  },
  {
    id: "language",
    titleAr: "بوابة اللغة",
    titleEn: "Language Portal",
    descAr: "اختبار المستوى والتقييم الفوري",
    descEn: "Level test & instant grading",
    color: "#d0bcff",
    icon: Globe,
    href: "/language",
    badge: null,
    tags: ["IELTS Prep", "B1–C1", "Grading"],
  },
  {
    id: "digital-exams",
    titleAr: "الاختبارات الرقمية",
    titleEn: "Digital Exams",
    descAr: "9 مواد، 902 سؤال، شهادات معتمدة",
    descEn: "9 subjects, 902 questions, certified",
    color: "#f97316",
    icon: Trophy,
    href: "/digital-exams",
    badge: null,
    tags: ["9 Subjects", "902 Qs", "Certified"],
  },
  {
    id: "career",
    titleAr: "مركز المهن",
    titleEn: "Career Hub",
    descAr: "محلل CV ومطابقة الوظائف",
    descEn: "CV analyzer & job matching",
    color: "#3ce0fb",
    icon: Target,
    href: "/career",
    badge: null,
    tags: ["CV Analyzer", "Job Board", "Interview"],
  },
  {
    id: "automation",
    titleAr: "أكاديمية الأتمتة",
    titleEn: "Automation Academy",
    descAr: "30 وصفة أتمتة، 15 معمل تطبيقي",
    descEn: "30 automation recipes, 15 labs",
    color: "#d0bcff",
    icon: Zap,
    href: "/automation",
    badge: "New",
    tags: ["n8n", "Zapier", "15 Labs"],
  },
  {
    id: "iot-lab",
    titleAr: "مختبر IoT",
    titleEn: "IoT Lab",
    descAr: "72 مشروع، 40 تحدي أردوينو",
    descEn: "72 projects, 40 Arduino challenges",
    color: "#f97316",
    icon: Code,
    href: "/iot-lab",
    badge: "New",
    tags: ["Arduino", "72 Projects", "Sensors"],
  },
];

const MARQUEE_ITEMS = [
  "AI Academy",
  "Language Portal",
  "IoT Lab",
  "Career Hub",
  "Digital Exams",
  "Automation Academy",
  "AI Tools",
  "Prompt Engineering",
  "Machine Learning",
  "Data Analysis",
  "Arduino",
  "Cloud Computing",
];

const PARTNERS = [
  "Google AI",
  "Microsoft Azure",
  "OpenAI",
  "AWS",
  "Anthropic",
  "HuggingFace",
];

const PATHS = [
  {
    category: "AI",
    nameEn: "AI Foundations",
    nameAr: "أسس الذكاء الاصطناعي",
    duration: "3 weeks",
    level: "Beginner",
    outcome: "Use 10+ AI tools daily",
    outcomeAr: "استخدم أكثر من 10 أدوات AI يومياً",
    color: "#8ed5ff",
  },
  {
    category: "AI",
    nameEn: "Prompt Engineering",
    nameAr: "هندسة الأوامر",
    duration: "2 weeks",
    level: "Intermediate",
    outcome: "Write pro-level prompts",
    outcomeAr: "اكتب أوامر احترافية",
    color: "#8ed5ff",
  },
  {
    category: "Language",
    nameEn: "English Level B2",
    nameAr: "الإنجليزية مستوى B2",
    duration: "4 weeks",
    level: "Any level",
    outcome: "Pass international tests",
    outcomeAr: "اجتز الاختبارات الدولية",
    color: "#d0bcff",
  },
  {
    category: "Exams",
    nameEn: "Digital Marketing Exam",
    nameAr: "اختبار التسويق الرقمي",
    duration: "1 week",
    level: "Advanced",
    outcome: "Get 3 certifications",
    outcomeAr: "احصل على 3 شهادات",
    color: "#f97316",
  },
  {
    category: "Automation",
    nameEn: "Automation with n8n",
    nameAr: "الأتمتة مع n8n",
    duration: "3 weeks",
    level: "Beginner",
    outcome: "Automate 30 workflows",
    outcomeAr: "أتمت 30 سير عمل",
    color: "#d0bcff",
  },
  {
    category: "IoT",
    nameEn: "Arduino IoT Starter",
    nameAr: "بداية IoT مع أردوينو",
    duration: "5 weeks",
    level: "Any level",
    outcome: "Build 10 IoT projects",
    outcomeAr: "ابنِ 10 مشاريع IoT",
    color: "#f97316",
  },
];

const CERTS = [
  {
    icon: Brain,
    nameEn: "AI Tools Certificate",
    nameAr: "شهادة أدوات الذكاء الاصطناعي",
    issuerEn: "NexaLearn AI Academy",
    issuerAr: "أكاديمية NexaLearn للذكاء الاصطناعي",
    color: "#8ed5ff",
  },
  {
    icon: Globe,
    nameEn: "Language Proficiency Certificate",
    nameAr: "شهادة إتقان اللغة",
    issuerEn: "Language Portal",
    issuerAr: "بوابة اللغة",
    color: "#d0bcff",
  },
  {
    icon: Trophy,
    nameEn: "Digital Skills Certificate",
    nameAr: "شهادة المهارات الرقمية",
    issuerEn: "Digital Exams",
    issuerAr: "الاختبارات الرقمية",
    color: "#f97316",
  },
  {
    icon: Code,
    nameEn: "IoT & Arduino Certificate",
    nameAr: "شهادة IoT وأردوينو",
    issuerEn: "IoT Lab",
    issuerAr: "مختبر IoT",
    color: "#3ce0fb",
  },
];

const JOURNEY_STEPS = [
  {
    titleEn: "Join Free",
    titleAr: "انضم مجاناً",
    descEn: "Create your account in 30 seconds",
    descAr: "أنشئ حسابك في 30 ثانية",
    icon: Rocket,
  },
  {
    titleEn: "Get Assessed",
    titleAr: "احصل على تقييمك",
    descEn: "AI finds your level instantly",
    descAr: "يحدد الذكاء الاصطناعي مستواك فوراً",
    icon: Brain,
  },
  {
    titleEn: "Start Your Path",
    titleAr: "ابدأ مسارك",
    descEn: "Personalized learning from day 1",
    descAr: "تعلم مخصص منذ اليوم الأول",
    icon: Play,
  },
  {
    titleEn: "Practice Daily",
    titleAr: "تدرب يومياً",
    descEn: "Mini-challenges, quizzes & projects",
    descAr: "تحديات مصغرة وامتحانات ومشاريع",
    icon: Target,
  },
  {
    titleEn: "Get Certified",
    titleAr: "احصل على شهادتك",
    descEn: "Industry-recognized certificates",
    descAr: "شهادات معترف بها في الصناعة",
    icon: Award,
  },
  {
    titleEn: "Advance Career",
    titleAr: "طور مسيرتك",
    descEn: "Job board, CV analyzer, portfolio",
    descAr: "لوحة وظائف، محلل CV، معرض أعمال",
    icon: TrendingUp,
  },
];

const HOW_STEPS = [
  {
    num: "01",
    titleEn: "Assess",
    titleAr: "قيّم",
    descEn: "Take a free assessment to find your level",
    descAr: "أجرِ تقييماً مجانياً لتحديد مستواك",
    icon: Target,
  },
  {
    num: "02",
    titleEn: "Learn",
    titleAr: "تعلّم",
    descEn: "Follow AI-curated paths in your portal",
    descAr: "اتبع مسارات ينسقها الذكاء الاصطناعي",
    icon: BookOpen,
  },
  {
    num: "03",
    titleEn: "Practice",
    titleAr: "تدرّب",
    descEn: "Real projects, labs & challenges",
    descAr: "مشاريع حقيقية ومعامل وتحديات",
    icon: Code,
  },
  {
    num: "04",
    titleEn: "Certify",
    titleAr: "احصل على شهادتك",
    descEn: "Earn verified certificates for your career",
    descAr: "احصل على شهادات موثقة لمسيرتك المهنية",
    icon: Award,
  },
];

const STATS = [
  { value: "5,000+", labelEn: "Students Enrolled", labelAr: "طالب مسجل" },
  { value: "300+", labelEn: "Courses Available", labelAr: "دورة متاحة" },
  { value: "6", labelEn: "Learning Portals", labelAr: "بوابة تعلم" },
  { value: "95%", labelEn: "Student Satisfaction", labelAr: "رضا الطلاب" },
];

const QUICK_QUESTIONS_EN = [
  "Which portal is right for me?",
  "How long will it take?",
  "Is it free?",
];

const QUICK_QUESTIONS_AR = [
  "أي بوابة تناسبني؟",
  "كم سيستغرق التعلم؟",
  "هل هو مجاني؟",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center mb-4">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50 uppercase tracking-widest">
        <Sparkles size={12} />
        {children}
      </span>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:border-[#8ed5ff]/30 hover:shadow-[0_0_30px_rgba(142,213,255,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Concept1Props {
  locale: string;
}

export default function Concept1({ locale }: Concept1Props) {
  const [isAr, setIsAr] = useState(locale === "ar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mentorMessage, setMentorMessage] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const t = (en: string, ar: string) => (isAr ? ar : en);

  const navLinks = [
    { href: "#about", labelEn: "About", labelAr: "عن المنصة" },
    { href: "#portals", labelEn: "Portals", labelAr: "البوابات" },
    { href: "#paths", labelEn: "Paths", labelAr: "المسارات" },
    { href: "#impact", labelEn: "Outcomes", labelAr: "النتائج" },
    { href: "#contact", labelEn: "Contact", labelAr: "تواصل" },
  ];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{ background: "#0c0e12", color: "#e2e2e8", fontFamily: "inherit" }}
      className="relative min-h-screen overflow-x-hidden"
    >
      {/* ── Marquee keyframes ── */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left  30s linear infinite; }
        .marquee-right { animation: marquee-right 28s linear infinite; }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        .pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        .float-up { animation: float-up 3s ease-in-out infinite; }
        @keyframes glow-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(142,213,255,0.25); }
          50%      { box-shadow: 0 0 0 8px rgba(142,213,255,0); }
        }
        .glow-ring { animation: glow-ring 2.5s ease-in-out infinite; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-gradient {
          background-size: 300% 100%;
          animation: gradient-shift 4s linear infinite;
        }
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ── SECTION 1 · Floating Preview Badge ── */}
      <div
        className="fixed bottom-24 right-4 z-[200] pointer-events-none"
        style={{ zIndex: 200 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/50 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ed5ff]" />
          Design Lab · Concept 1 · Reference Faithful
        </span>
      </div>

      {/* ── SECTION 2 · Internal Navbar ── */}
      <nav
        className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10"
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #8ed5ff, #d0bcff)" }}
              >
                <Brain size={14} color="#0c0e12" />
              </div>
              <span className="font-bold text-base" style={{ color: "#8ed5ff" }}>
                NexaLearn
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t(l.labelEn, l.labelAr)}
                </a>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setIsAr((v) => !v)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                <Globe size={12} />
                {isAr ? "EN" : "AR"}
              </button>

              {/* CTA */}
              <ShimmerButton
                shimmerColor="#8ed5ff"
                background="rgba(142,213,255,0.08)"
                className="hidden sm:flex text-xs py-2 px-4 font-semibold text-[#8ed5ff]"
              >
                {t("Enroll Free", "سجّل مجاناً")}
              </ShimmerButton>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="md:hidden p-2 text-white/60 hover:text-white"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-white/60 hover:text-white py-1"
                  >
                    {t(l.labelEn, l.labelAr)}
                  </a>
                ))}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsAr((v) => !v)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                  >
                    <Globe size={12} /> {isAr ? "EN" : "AR"}
                  </button>
                  <ShimmerButton
                    shimmerColor="#8ed5ff"
                    background="rgba(142,213,255,0.08)"
                    className="text-xs py-2 px-4 text-[#8ed5ff]"
                  >
                    {t("Enroll Free", "سجّل مجاناً")}
                  </ShimmerButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── SECTION 3 · Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden"
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-20">
          <AnimatedGridPattern
            numSquares={40}
            maxOpacity={0.3}
            duration={3}
            className="text-[#8ed5ff]/20 stroke-[#8ed5ff]/10"
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(142,213,255,0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          {/* Availability Badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
              <span
                className="w-2 h-2 rounded-full bg-green-400 pulse-dot"
                style={{ flexShrink: 0 }}
              />
              {t("Platform is Live · Enroll Now", "المنصة تعمل الآن · سجّل الآن")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className={`font-extrabold leading-tight ${isAr ? "text-4xl md:text-6xl" : "text-4xl md:text-6xl lg:text-7xl"}`}
          >
            <AnimatedGradientText
              colorFrom="#8ed5ff"
              colorTo="#d0bcff"
              speed={0.8}
            >
              {t(
                "We build AI-powered learners",
                "نبني متعلمين مدعومين بالذكاء الاصطناعي"
              )}
            </AnimatedGradientText>
            <br />
            <span style={{ color: "#e2e2e8" }}>
              {t("who shape tomorrow.", "يصنعون الغد.")}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-base md:text-xl text-white/50 max-w-2xl leading-relaxed"
          >
            {t(
              "Personalized AI paths, 6 learning portals, and expert mentorship across Egypt, Qatar, Saudi Arabia & UAE.",
              "مسارات ذكاء اصطناعي مخصصة، 6 بوابات تعلم، وإرشاد من خبراء في مصر وقطر والسعودية والإمارات."
            )}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.1)"
              className="text-sm font-semibold text-[#8ed5ff] px-6 py-3 flex items-center gap-2"
            >
              {t("Start Your Journey", "ابدأ رحلتك")}
              <ArrowRight size={16} />
            </ShimmerButton>
            <a
              href="#portals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              {t("Explore Portals", "استكشف البوابات")}
              <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Stat Row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40 font-mono"
          >
            {[
              t("6 Portals", "6 بوابات"),
              t("300+ Courses", "300+ دورة"),
              t("5K+ Students", "5K+ طالب"),
              t("3 Countries", "3 دول"),
            ].map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 4 · Trusted By / Partners ── */}
      <section id="partners" className="py-12 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
            {t("Powered by leading AI technologies", "مدعوم بأبرز تقنيات الذكاء الاصطناعي")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-white/50 hover:text-white/70 hover:border-white/20 transition-all duration-200"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · Marquee ── */}
      <section id="marquee" className="py-10 overflow-hidden">
        {/* Row 1 — left */}
        <div className="overflow-hidden mb-3">
          <div className="flex gap-3 whitespace-nowrap marquee-left">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm text-white/60 bg-white/5 whitespace-nowrap flex-shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#8ed5ff" }}
                />
                {item}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <div className="flex gap-3 whitespace-nowrap marquee-right">
            {[...MARQUEE_ITEMS.slice().reverse(), ...MARQUEE_ITEMS.slice().reverse()].map(
              (item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm text-white/50 bg-white/5 whitespace-nowrap flex-shrink-0"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#d0bcff" }}
                  />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · About / Platform Card ── */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>{t("About NexaLearn", "عن NexaLearn")}</SectionLabel>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10 ${isAr ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Left: Visual card */}
            <div className="relative">
              <GlassCard className="p-8 relative overflow-hidden">
                <AnimatedGridPattern
                  numSquares={20}
                  maxOpacity={0.15}
                  duration={4}
                  className="text-[#8ed5ff]/20 stroke-[#8ed5ff]/10"
                />
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 float-up"
                    style={{ background: "linear-gradient(135deg, #8ed5ff22, #d0bcff22)", border: "1px solid #8ed5ff33" }}
                  >
                    <Brain size={28} style={{ color: "#8ed5ff" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">NexaLearn</h3>
                  <p className="text-sm text-white/40 mb-6">
                    {t("AI Cloud Academy", "أكاديمية الذكاء الاصطناعي السحابية")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: "3+", l: t("Years", "سنوات") },
                      { v: "300+", l: t("Courses", "دورة") },
                      { v: "5,000+", l: t("Students", "طالب") },
                      { v: "4", l: t("Countries", "دول") },
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="bg-white/5 rounded-xl p-3 border border-white/10"
                      >
                        <div
                          className="text-xl font-bold"
                          style={{ color: "#8ed5ff" }}
                        >
                          {s.v}
                        </div>
                        <div className="text-xs text-white/40">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right: Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {t(
                  "The first AI-powered Arabic learning ecosystem",
                  "أول منظومة تعلم عربية مدعومة بالذكاء الاصطناعي"
                )}
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                {t(
                  "NexaLearn combines six specialized learning portals — AI, Language, Digital Exams, Career Hub, Automation, and IoT — into one unified platform. Every path is AI-curated and every outcome is verified.",
                  "تجمع NexaLearn ست بوابات تعلم متخصصة — الذكاء الاصطناعي واللغة والاختبارات الرقمية ومركز المهن والأتمتة وIoT — في منصة واحدة موحدة. كل مسار منسق بالذكاء الاصطناعي وكل نتيجة موثقة."
                )}
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  t("AI-personalized learning paths", "مسارات تعلم مخصصة بالذكاء الاصطناعي"),
                  t("Expert mentors from the industry", "مرشدون خبراء من الصناعة"),
                  t("Verified digital certificates", "شهادات رقمية موثقة"),
                  t("Available in Arabic & English", "متاح بالعربية والإنجليزية"),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle size={16} style={{ color: "#8ed5ff", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#portals"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#8ed5ff]/30 text-sm text-[#8ed5ff] hover:bg-[#8ed5ff]/10 transition-all duration-200"
              >
                {t("See All Portals", "اعرض جميع البوابات")}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 · Learning Portals ── */}
      <section id="portals" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>{t("Learning Portals", "بوابات التعلم")}</SectionLabel>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PORTALS.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={portal.id}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={portal.href} className="block h-full">
                    <GlassCard className="p-6 h-full flex flex-col gap-4 cursor-pointer group hover:border-[#8ed5ff]/40">
                      {/* Number + badge */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-mono font-bold"
                          style={{ color: portal.color + "99" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {portal.badge && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: portal.color + "22",
                              color: portal.color,
                              border: `1px solid ${portal.color}44`,
                            }}
                          >
                            {portal.badge}
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: portal.color + "15",
                          border: `1px solid ${portal.color}30`,
                        }}
                      >
                        <Icon size={22} style={{ color: portal.color }} />
                      </div>

                      {/* Title & desc */}
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-base mb-1">
                          {t(portal.titleEn, portal.titleAr)}
                        </h3>
                        <p className="text-sm text-white/50">
                          {t(portal.descEn, portal.descAr)}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {portal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-1 text-xs mt-1 transition-all duration-200 group-hover:gap-2"
                        style={{ color: portal.color }}>
                        {t("Explore", "استكشف")}
                        <ArrowRight size={12} />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 8 · How Learning Works ── */}
      <section id="how" className="py-20 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>{t("Process", "العملية")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            {t("How Learning Works", "كيف يعمل التعلم")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, #8ed5ff40, #d0bcff40, transparent)",
              }}
            />

            {HOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  {/* Number circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #8ed5ff15, #d0bcff15)",
                      border: "1px solid #8ed5ff30",
                    }}
                  >
                    <Icon size={28} style={{ color: "#8ed5ff" }} />
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                      style={{ background: "#8ed5ff", color: "#0c0e12" }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base mb-1">
                      {t(step.titleEn, step.titleAr)}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {t(step.descEn, step.descAr)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 9 · Featured Learning Paths ── */}
      <section id="paths" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>{t("Featured Paths", "المسارات المميزة")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            {t("Featured Learning Paths", "مسارات التعلم المميزة")}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PATHS.map((path, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-5 flex flex-col gap-3 h-full hover:border-white/20">
                  {/* Category tag */}
                  <span
                    className="self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: path.color + "18",
                      color: path.color,
                      border: `1px solid ${path.color}35`,
                    }}
                  >
                    {path.category}
                  </span>

                  <h3 className="font-bold text-white text-sm leading-snug">
                    {t(path.nameEn, path.nameAr)}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {path.level}
                    </span>
                  </div>

                  <div
                    className="flex items-start gap-2 text-xs rounded-lg p-2.5"
                    style={{ background: path.color + "0d", border: `1px solid ${path.color}20` }}
                  >
                    <CheckCircle size={12} style={{ color: path.color, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ color: path.color + "cc" }}>
                      {t(path.outcome, path.outcomeAr)}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 10 · Platform Impact Numbers ── */}
      <section id="impact" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>{t("Impact", "التأثير")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            {t("Platform Impact", "تأثير المنصة")}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-6 text-center hover:border-[#8ed5ff]/30">
                  <div
                    className="text-3xl md:text-4xl font-extrabold mb-1"
                    style={{ color: "#8ed5ff" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-white/40">
                    {t(s.labelEn, s.labelAr)}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 11 · Student Journey / Roadmap ── */}
      <section id="journey" className="py-20 px-4 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>{t("Your Journey", "رحلتك")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            {t("Your Learning Roadmap", "خارطة طريق التعلم الخاصة بك")}
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className={`absolute top-0 bottom-0 w-px ${isAr ? "right-5" : "left-5"}`}
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #8ed5ff40 10%, #d0bcff40 90%, transparent)",
              }}
            />

            <div className="flex flex-col gap-8">
              {JOURNEY_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: isAr ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`flex items-start gap-6 ${isAr ? "flex-row-reverse" : ""}`}
                  >
                    {/* Dot */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 glow-ring"
                      style={{
                        background: "linear-gradient(135deg, #8ed5ff20, #d0bcff20)",
                        border: "1px solid #8ed5ff40",
                      }}
                    >
                      <Icon size={16} style={{ color: "#8ed5ff" }} />
                    </div>

                    <GlassCard className={`flex-1 p-4 ${isAr ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-mono font-bold"
                          style={{ color: "#8ed5ff80" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-bold text-white text-sm">
                          {t(step.titleEn, step.titleAr)}
                        </h3>
                      </div>
                      <p className="text-xs text-white/45 leading-relaxed">
                        {t(step.descEn, step.descAr)}
                      </p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12 · Certifications / Outcomes ── */}
      <section id="certs" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>{t("Certifications", "الشهادات")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            {t("What You'll Earn", "ماذا ستكسب")}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {CERTS.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard className="p-5 flex flex-col items-center text-center gap-3 h-full hover:border-white/25">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: cert.color + "15",
                        border: `1px solid ${cert.color}30`,
                      }}
                    >
                      <Icon size={24} style={{ color: cert.color }} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-sm mb-0.5">
                        {t(cert.nameEn, cert.nameAr)}
                      </h3>
                      <p className="text-xs text-white/40">
                        {t(cert.issuerEn, cert.issuerAr)}
                      </p>
                    </div>

                    <span
                      className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{
                        background: cert.color + "15",
                        color: cert.color,
                        border: `1px solid ${cert.color}30`,
                      }}
                    >
                      {t("Verified Digital Badge", "شارة رقمية موثقة")}
                    </span>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 13 · Contact / Start Learning ── */}
      <section id="contact" className="py-20 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>{t("Get Started", "ابدأ الآن")}</SectionLabel>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            {t("Ready to Start?", "هل أنت مستعد للبدء؟")}
          </h2>
          <p className="text-center text-white/40 text-sm mb-10">
            {t(
              "Join thousands of learners across the Arab world",
              "انضم إلى آلاف المتعلمين في العالم العربي"
            )}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <GlassCard className="p-6">
              <h3 className="font-bold text-white text-base mb-5">
                {t("Start your free journey", "ابدأ رحلتك المجانية")}
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">
                    {t("Full Name", "الاسم الكامل")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("Ahmed Mohammed", "أحمد محمد")}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#8ed5ff]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">
                    {t("Email Address", "البريد الإلكتروني")}
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#8ed5ff]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">
                    {t("Which portal interests you?", "أي بوابة تهمك؟")}
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 focus:outline-none focus:border-[#8ed5ff]/40 transition-colors appearance-none"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <option value="" style={{ background: "#111318" }}>
                      {t("Select a portal...", "اختر بوابة...")}
                    </option>
                    {PORTALS.map((p) => (
                      <option key={p.id} value={p.id} style={{ background: "#111318" }}>
                        {t(p.titleEn, p.titleAr)}
                      </option>
                    ))}
                  </select>
                </div>
                <ShimmerButton
                  shimmerColor="#8ed5ff"
                  background="rgba(142,213,255,0.1)"
                  className="w-full justify-center text-sm font-semibold text-[#8ed5ff] py-3 mt-1"
                >
                  {t("Enroll Free Today", "سجّل مجاناً اليوم")}
                  <ArrowRight size={14} className={isAr ? "mr-2" : "ml-2"} />
                </ShimmerButton>
              </div>
            </GlassCard>

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6">
              <h3 className="font-bold text-white text-lg">
                {t("Reach us directly", "تواصل معنا مباشرة")}
              </h3>

              {[
                {
                  icon: MessageCircle,
                  label: "Email",
                  value: "hello@nexalearn.com",
                  color: "#8ed5ff",
                },
                {
                  icon: Users,
                  label: "WhatsApp",
                  value: t("Message us on WhatsApp", "راسلنا على واتساب"),
                  color: "#3ce0fb",
                },
                {
                  icon: Globe,
                  label: "LinkedIn",
                  value: "NexaLearn by Ahmed Darhous",
                  color: "#d0bcff",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.color + "15", border: `1px solid ${item.color}25` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 mb-0.5">{item.label}</div>
                      <div className="text-sm text-white/70">{item.value}</div>
                    </div>
                  </div>
                );
              })}

              <p className="text-xs text-white/25 leading-relaxed">
                {t(
                  "Serving learners in Egypt, Saudi Arabia, Qatar, UAE, and across the Arab world.",
                  "نخدم المتعلمين في مصر والسعودية وقطر والإمارات وعبر العالم العربي."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 14 · Footer-like Final CTA ── */}
      <section id="footer" className="relative py-24 px-4 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0c0e12, #0d1017, #0c0e12)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(142,213,255,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8ed5ff20, #d0bcff20)", border: "1px solid #8ed5ff30" }}
            >
              <Rocket size={28} style={{ color: "#8ed5ff" }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {t(
                "Join 5,000+ learners on NexaLearn",
                "انضم إلى أكثر من 5,000 متعلم على NexaLearn"
              )}
            </h2>

            <p className="text-white/40 text-base max-w-xl">
              {t(
                "Your AI-powered learning journey starts today. Free to join, built to transform.",
                "رحلة التعلم المدعومة بالذكاء الاصطناعي تبدأ اليوم. مجاني للانضمام، مصمم للتحول."
              )}
            </p>

            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="rgba(142,213,255,0.12)"
              className="text-base font-bold text-[#8ed5ff] px-8 py-4 flex items-center gap-2"
            >
              {t("Start Free Today", "ابدأ مجاناً اليوم")}
              <ArrowRight size={18} />
            </ShimmerButton>

            {/* Platform links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/30 mt-2">
              {[
                { label: t("AI Academy", "أكاديمية الذكاء الاصطناعي"), href: "/ai-academy" },
                { label: t("Language", "اللغة"), href: "/language" },
                { label: t("Digital Exams", "الاختبارات"), href: "/digital-exams" },
                { label: t("Career Hub", "المهن"), href: "/career" },
                { label: t("Automation", "الأتمتة"), href: "/automation" },
                { label: t("IoT Lab", "مختبر IoT"), href: "/iot-lab" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="text-xs text-white/20 font-mono mt-2">
              NexaLearn by Ahmed Darhous · © 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 15 · Floating AI Mentor Widget ── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {/* Expanded Panel */}
        <AnimatePresence>
          {mentorOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-72 rounded-2xl overflow-hidden"
              style={{
                background: "#111318",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(142,213,255,0.05)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #8ed5ff30, #d0bcff30)" }}
                  >
                    <Bot size={14} style={{ color: "#8ed5ff" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {t("AI Mentor", "المرشد الذكي")}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                      {t("Online · Replies instantly", "متصل · يرد فوراً")}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMentorOpen(false)}
                  className="p-1 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                {mentorMessage ? (
                  <div className="mb-4">
                    <div
                      className="text-xs text-white/40 mb-2 px-3 py-2 rounded-lg"
                      style={{ background: "rgba(142,213,255,0.05)", border: "1px solid rgba(142,213,255,0.1)" }}
                    >
                      {mentorMessage}
                    </div>
                    <div
                      className="text-xs rounded-lg px-3 py-2.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <span style={{ color: "#8ed5ff" }}>✦</span>{" "}
                      <span className="text-white/60">
                        {t(
                          "Great question! I can help you choose the right learning path. To get started, tell me your current skill level and what you want to achieve.",
                          "سؤال رائع! يمكنني مساعدتك في اختيار المسار الصحيح. للبدء، أخبرني عن مستواك الحالي وما تريد تحقيقه."
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-white/40 mb-3">
                    {t(
                      "Ask me anything about NexaLearn:",
                      "اسألني أي شيء عن NexaLearn:"
                    )}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  {(isAr ? QUICK_QUESTIONS_AR : QUICK_QUESTIONS_EN).map(
                    (q, i) => (
                      <button
                        key={i}
                        onClick={() => setMentorMessage(q)}
                        className="text-left text-xs px-3 py-2 rounded-xl transition-all duration-200 text-white/60 hover:text-white"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          textAlign: isAr ? "right" : "left",
                        }}
                      >
                        {q}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => {
            setMentorOpen((v) => !v);
            if (!mentorOpen) setMentorMessage(null);
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center relative transition-transform duration-200 hover:scale-110 active:scale-95 glow-ring"
          style={{
            background: "linear-gradient(135deg, #8ed5ff, #d0bcff)",
            boxShadow: "0 4px 20px rgba(142,213,255,0.25)",
          }}
        >
          <Bot size={20} color="#0c0e12" />
          {/* Pulsing dot */}
          <span
            className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 pulse-dot"
            style={{ border: "2px solid #0c0e12" }}
          />
        </button>
      </div>
    </div>
  );
}
