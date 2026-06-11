"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import {
  Brain,
  Zap,
  Globe,
  Trophy,
  Rocket,
  Bot,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle,
  Users,
  Code,
  MessageCircle,
  Award,
  Target,
  BookOpen,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { WordRotate } from "@/components/shadcn/ui/word-rotate";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";

/* ─────────────────────────────── helpers ─────────────────────────────── */

function useMotion() {
  const prefersReduced = useReducedMotion();
  return prefersReduced;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" as const }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────── CSS injected once ─────────────────────────────── */

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap');

  .c3-arabic {
    font-family: 'Cairo', 'Tajawal', sans-serif;
  }

  @keyframes c3-marquee-rtl {
    from { transform: translateX(0); }
    to   { transform: translateX(50%); }
  }
  @keyframes c3-marquee-ltr {
    from { transform: translateX(50%); }
    to   { transform: translateX(0); }
  }
  @keyframes c3-pulse-green {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes c3-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes c3-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes c3-shimmer-gold {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .c3-marquee-rtl-track {
    animation: c3-marquee-rtl 35s linear infinite;
  }
  .c3-marquee-ltr-track {
    animation: c3-marquee-ltr 28s linear infinite;
  }
  .c3-dot-pulse {
    animation: c3-pulse-green 2s ease-in-out infinite;
  }
  .c3-float {
    animation: c3-float 4s ease-in-out infinite;
  }
  .c3-spin-slow {
    animation: c3-spin-slow 20s linear infinite;
  }
  .c3-gold-text {
    background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: c3-shimmer-gold 3s linear infinite;
  }
  .c3-glass {
    background: rgba(17, 19, 24, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(142, 213, 255, 0.12);
  }
  .c3-glass-warm {
    background: rgba(17, 19, 24, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(245, 158, 11, 0.15);
  }
  .c3-card-glow:hover {
    border-color: rgba(142, 213, 255, 0.3);
    box-shadow: 0 0 24px rgba(142, 213, 255, 0.08);
  }
  .c3-card-gold-glow:hover {
    border-color: rgba(245, 158, 11, 0.3);
    box-shadow: 0 0 24px rgba(245, 158, 11, 0.08);
  }
`;

/* ─────────────────────────────── data ─────────────────────────────── */

const PORTALS = [
  { num: "01", ar: "أكاديمية الذكاء الاصطناعي", en: "AI Academy", icon: Brain, tags: ["ChatGPT", "Claude", "Gemini", "Prompt Engineering"] },
  { num: "02", ar: "بوابة اللغة", en: "Language Portal", icon: Globe, tags: ["IELTS", "TOEFL", "B2 Track", "محادثة"] },
  { num: "03", ar: "الاختبارات الرقمية", en: "Digital Exams", icon: Target, tags: ["IC3", "MOS", "ICDL", "اختبارات"] },
  { num: "04", ar: "مركز المهن", en: "Career Center", icon: Trophy, tags: ["CV", "LinkedIn", "مقابلات", "فريلانس"] },
  { num: "05", ar: "أكاديمية الأتمتة", en: "Automation Academy", icon: Zap, tags: ["n8n", "Zapier", "Make", "APIs"] },
  { num: "06", ar: "مختبر IoT", en: "IoT Lab", icon: Cpu, tags: ["Arduino", "Raspberry Pi", "مشاريع", "حساسات"] },
];

const PATHS = [
  { ar: "أساسيات الذكاء الاصطناعي", en: "AI Fundamentals", duration: "3 أسابيع", level: "مبتدئ", outcome: "فهم كامل لأدوات الذكاء الاصطناعي وتطبيقها يومياً", icon: Brain, color: "#8ed5ff" },
  { ar: "هندسة البرومبتات", en: "Prompt Engineering", duration: "أسبوعان", level: "متوسط", outcome: "كتابة برومبتات احترافية تضاعف إنتاجيتك 10 أضعاف", icon: Sparkles, color: "#f59e0b" },
  { ar: "اللغة الإنجليزية B2", en: "English B2 Track", duration: "4 أسابيع", level: "جميع المستويات", outcome: "مستوى B2 معتمد يفتح أمامك فرص العمل الدولي", icon: Globe, color: "#3ce0fb" },
  { ar: "المهارات الرقمية", en: "Digital Skills Exam", duration: "أسبوع", level: "متقدم", outcome: "شهادة IC3 الدولية المعتمدة من Microsoft", icon: Target, color: "#d0bcff" },
  { ar: "الأتمتة مع n8n", en: "Automation with n8n", duration: "3 أسابيع", level: "مبتدئ", outcome: "بناء سير عمل آلية توفر لك 20 ساعة أسبوعياً", icon: Zap, color: "#f59e0b" },
  { ar: "مشاريع Arduino والـ IoT", en: "Arduino & IoT Projects", duration: "5 أسابيع", level: "جميع المستويات", outcome: "بناء 5 مشاريع حقيقية تضيفها لبورتفوليوك", icon: Cpu, color: "#8ed5ff" },
];

const JOURNEY_STEPS = [
  { week: "الأسبوع 1", ar: "الانطلاق", desc: "إنشاء حساب وتقييم مستواك بالذكاء الاصطناعي مجاناً", icon: Rocket },
  { week: "الأسابيع 2-4", ar: "التعلم", desc: "مسار مخصص لأهدافك ومحتوى يومي منظم", icon: BookOpen },
  { week: "الشهر 2", ar: "التطبيق", desc: "مشاريع حقيقية وتحديات تفاعلية وتغذية راجعة فورية", icon: Code },
  { week: "الشهر 3", ar: "الإتقان", desc: "شهادات رقمية موثقة وبورتفوليو احترافي كامل", icon: Award },
  { week: "ما بعد", ar: "التقدم الوظيفي", desc: "وظائف، عمل حر، ريادة أعمال — نرافقك في كل خطوة", icon: Trophy },
];

const CERTS = [
  { ar: "شهادة أدوات الذكاء الاصطناعي", portal: "أكاديمية NexaLearn", icon: Brain, color: "#8ed5ff" },
  { ar: "شهادة كفاءة اللغة الإنجليزية", portal: "بوابة اللغة", icon: Globe, color: "#3ce0fb" },
  { ar: "شهادة المهارات الرقمية", portal: "منصة الاختبارات", icon: Target, color: "#d0bcff" },
  { ar: "شهادة IoT وأردوينو", portal: "مختبر NexaLearn", icon: Cpu, color: "#f59e0b" },
];

const STATS = [
  { num: "+5000", ar: "متعلم نشط", en: "Active Learners" },
  { num: "+300", ar: "دورة وبرنامج", en: "Courses & Programs" },
  { num: "6", ar: "بوابات تعليمية", en: "Learning Portals" },
  { num: "%95", ar: "رضا المتعلمين", en: "Learner Satisfaction" },
];

const HOW_STEPS = [
  { num: "01", ar: "قيّم مستواك", desc: "تحديد المستوى مجاناً بالذكاء الاصطناعي في دقيقتين فقط", icon: Target, color: "#8ed5ff" },
  { num: "02", ar: "تعلّم بمسارك", desc: "محتوى مخصص لك ولأهدافك — سواء كنت مبتدئاً أو متقدماً", icon: BookOpen, color: "#f59e0b" },
  { num: "03", ar: "مارس وطبّق", desc: "مشاريع حقيقية ومعامل تفاعلية بإشراف مرشد ذكي", icon: Code, color: "#3ce0fb" },
  { num: "04", ar: "احصل على شهادتك", desc: "شهادات رقمية موثقة ومعترف بها في مصر والسعودية والإمارات وقطر", icon: Award, color: "#d0bcff" },
];

const MARQUEE_ROW1 = [
  "أكاديمية الذكاء الاصطناعي",
  "بوابة اللغة",
  "الاختبارات الرقمية",
  "مركز المهن",
  "أكاديمية الأتمتة",
  "مختبر IoT",
  "أكاديمية الذكاء الاصطناعي",
  "بوابة اللغة",
  "الاختبارات الرقمية",
  "مركز المهن",
  "أكاديمية الأتمتة",
  "مختبر IoT",
];

const MARQUEE_ROW2 = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "n8n",
  "Arduino",
  "Machine Learning",
  "Prompt Engineering",
  "ChatGPT",
  "Claude",
  "Gemini",
  "n8n",
  "Arduino",
  "Machine Learning",
  "Prompt Engineering",
];

const TECH_PARTNERS = [
  "Google AI",
  "Microsoft",
  "OpenAI",
  "AWS",
  "Anthropic",
  "HuggingFace",
];

const MENTOR_QUESTIONS = [
  "أي بوابة تناسبني؟",
  "كم يستغرق وقت التعلم؟",
  "هل الاشتراك مجاني؟",
];

/* ─────────────────────────────── sub-components ─────────────────────────────── */

function SectionLabel({ ar, en }: { ar: string; en: string }) {
  return (
    <div className="flex flex-col items-end gap-1 mb-6">
      <span
        className="c3-arabic text-xs font-medium tracking-wider"
        style={{ color: "#f59e0b" }}
      >
        {ar}
      </span>
      <span className="text-xs text-[#e2e2e8]/40 tracking-widest uppercase">{en}</span>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1 bg-gradient-to-l from-[#f59e0b]/30 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
      <div className="h-px flex-1 bg-gradient-to-r from-[#f59e0b]/30 to-transparent" />
    </div>
  );
}

/* ─────────────────────────────── NAVBAR ─────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(12,14,18,0.92)"
          : "rgba(12,14,18,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(142,213,255,0.1)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — right side (RTL) */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8ed5ff, #3ce0fb)",
            }}
          >
            <Brain className="w-5 h-5 text-[#0c0e12]" />
          </div>
          <div className="c3-arabic leading-tight">
            <div className="text-sm font-bold text-[#e2e2e8]">NexaLearn</div>
            <div className="text-xs text-[#e2e2e8]/60">نيكساليرن</div>
          </div>
        </div>

        {/* Nav links — center */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            "عن المنصة",
            "البوابات",
            "المسارات",
            "الشهادات",
            "تواصل معنا",
          ].map((link) => (
            <button
              key={link}
              className="c3-arabic text-sm text-[#e2e2e8]/70 hover:text-[#8ed5ff] transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="hidden sm:flex items-center rounded-lg overflow-hidden text-xs font-medium"
            style={{ border: "1px solid rgba(142,213,255,0.2)" }}
          >
            <button className="px-3 py-1.5 text-[#8ed5ff] bg-[#8ed5ff]/10">AR</button>
            <button className="px-3 py-1.5 text-[#e2e2e8]/50 hover:text-[#e2e2e8]/80 transition-colors">EN</button>
          </div>
          <ShimmerButton
            background="linear-gradient(135deg, #f59e0b, #d97706)"
            shimmerColor="#fff8e1"
            className="c3-arabic text-sm font-bold text-white hidden sm:flex"
          >
            سجل مجاناً
          </ShimmerButton>
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-[#e2e2e8]/70 hover:text-[#8ed5ff] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="فتح القائمة"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-4 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="lg:hidden overflow-hidden"
            style={{ background: "rgba(12,14,18,0.97)", borderTop: "1px solid rgba(142,213,255,0.1)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {["عن المنصة", "البوابات", "المسارات", "الشهادات", "تواصل معنا"].map((link) => (
                <button key={link} className="c3-arabic text-sm text-[#e2e2e8]/70 text-right">
                  {link}
                </button>
              ))}
              <ShimmerButton
                background="linear-gradient(135deg, #f59e0b, #d97706)"
                shimmerColor="#fff8e1"
                className="c3-arabic text-sm font-bold text-white w-full justify-center"
              >
                سجل مجاناً
              </ShimmerButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function HeroSection() {
  const reduced = useMotion();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden"
      style={{ background: "#0c0e12" }}
    >
      {/* Background decorative rings */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{
            width: "900px",
            height: "900px",
            border: "1px solid #f59e0b",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
          style={{
            width: "600px",
            height: "600px",
            border: "1px solid #8ed5ff",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #8ed5ff, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Availability badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="c3-arabic flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#86efac",
          }}
        >
          <span className="c3-dot-pulse w-2 h-2 rounded-full bg-green-400 inline-block" />
          المنصة تعمل الآن · سجل مجاناً
        </motion.div>

        {/* WordRotate above headline */}
        <div className="c3-arabic text-2xl md:text-3xl font-bold" style={{ color: "#f59e0b" }}>
          <WordRotate
            words={["تعلّم", "ابنِ", "احترف", "تميّز"]}
            duration={2000}
            className="c3-gold-text"
          />
        </div>

        {/* Main headline */}
        <motion.h1
          className="c3-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#e2e2e8] leading-tight"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" as const }}
        >
          منصة تعلم{" "}
          <AnimatedGradientText
            colorFrom="#8ed5ff"
            colorTo="#3ce0fb"
            speed={2}
            className="c3-arabic font-black"
          >
            الذكاء الاصطناعي
          </AnimatedGradientText>
          <br />
          <span className="c3-gold-text">الأولى بالعربية</span>
        </motion.h1>

        {/* EN subtitle */}
        <motion.p
          className="text-sm tracking-widest uppercase text-[#e2e2e8]/40"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The first Arabic AI learning ecosystem
        </motion.p>

        {/* Arabic sub-description */}
        <motion.p
          className="c3-arabic text-lg md:text-xl text-[#e2e2e8]/70 max-w-3xl leading-relaxed"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" as const }}
        >
          مسارات مخصصة، 6 بوابات تعليمية، ومرشد ذكي يرافقك من الصفر إلى الاحتراف
          في مصر والسعودية والإمارات وقطر
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" as const }}
        >
          <ShimmerButton
            background="linear-gradient(135deg, #f59e0b, #d97706)"
            shimmerColor="#fff8e1"
            className="c3-arabic text-lg font-bold text-white px-8 py-4"
          >
            <Rocket className="w-5 h-5 ms-2 inline-block" />
            ابدأ رحلتك الآن
          </ShimmerButton>
          <button
            className="c3-arabic text-base font-semibold px-8 py-4 rounded-full text-[#8ed5ff] transition-all hover:bg-[#8ed5ff]/10"
            style={{ border: "1px solid rgba(142,213,255,0.35)" }}
          >
            استكشف البوابات
            <ArrowLeft className="w-4 h-4 me-2 inline-block" />
          </button>
        </motion.div>

        {/* Hero stats */}
        <motion.div
          className="c3-arabic flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-[#e2e2e8]/60"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {["6 بوابات", "300+ دورة", "5000+ متعلم", "4 دول"].map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 && <span className="text-[#f59e0b]/50">·</span>}
              <span className="text-[#e2e2e8]/80 font-medium">{stat}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <span className="c3-arabic text-xs text-[#e2e2e8]/50">اكتشف المزيد</span>
        <ChevronLeft className="w-4 h-4 text-[#e2e2e8]/50 rotate-[-90deg]" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────── TRUSTED BY ─────────────────────────────── */

function TrustedBySection() {
  return (
    <section
      className="py-12 px-6"
      style={{
        background: "#111318",
        borderTop: "1px solid rgba(142,213,255,0.07)",
        borderBottom: "1px solid rgba(142,213,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="c3-arabic text-sm text-[#e2e2e8]/50 mb-8">
          مدعوم بأبرز تقنيات الذكاء الاصطناعي في العالم
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {TECH_PARTNERS.map((partner) => (
            <div
              key={partner}
              className="px-5 py-2 rounded-xl text-sm font-medium text-[#e2e2e8]/50 hover:text-[#e2e2e8]/80 transition-colors"
              style={{ border: "1px solid rgba(226,226,232,0.1)" }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── PORTAL MARQUEE ─────────────────────────────── */

function PortalMarqueeSection() {
  return (
    <section className="py-14 overflow-hidden" style={{ background: "#0c0e12" }}>
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <p className="c3-arabic text-sm text-[#e2e2e8]/40 uppercase tracking-widest">
          بواباتنا التعليمية
        </p>
      </div>

      {/* Row 1 — RTL marquee (moves rightward for Arabic reading) */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex c3-marquee-rtl-track" style={{ width: "max-content" }}>
          {MARQUEE_ROW1.concat(MARQUEE_ROW1).map((item, i) => (
            <div
              key={i}
              className="c3-arabic flex-none mx-3 px-6 py-3 rounded-full text-sm font-semibold text-[#e2e2e8]/80 whitespace-nowrap"
              style={{
                background: "rgba(142,213,255,0.07)",
                border: "1px solid rgba(142,213,255,0.15)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — LTR marquee */}
      <div className="relative overflow-hidden">
        <div className="flex c3-marquee-ltr-track" style={{ width: "max-content" }}>
          {MARQUEE_ROW2.concat(MARQUEE_ROW2).map((item, i) => (
            <div
              key={i}
              className="flex-none mx-3 px-6 py-3 rounded-full text-sm font-medium text-[#e2e2e8]/60 whitespace-nowrap"
              style={{
                background: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── ABOUT ─────────────────────────────── */

function AboutSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "#111318" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text — right column (RTL first) */}
          <FadeIn className="flex flex-col gap-6 text-right">
            <SectionLabel ar="من نحن" en="About Us" />
            <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8] leading-tight">
              من نحن؟
            </h2>
            <GoldDivider />
            <p className="c3-arabic text-lg text-[#e2e2e8]/70 leading-relaxed">
              NexaLearn هي منصة تعليمية عربية تأسست برؤية واضحة: تمكين كل عربي
              من امتلاك مهارات الذكاء الاصطناعي والتقنية بلغته الأم وبأسلوب
              يناسب سياقه الثقافي والمهني.
            </p>
            <p className="c3-arabic text-base text-[#e2e2e8]/55 leading-relaxed">
              نؤمن أن التعليم يجب أن يكون متاحاً وعملياً — لذلك بنينا 6 بوابات
              تعليمية متخصصة، كل واحدة منها صُممت لتحقيق هدف تعليمي محدد وقابل
              للقياس، مدعومة بمرشد ذكاء اصطناعي يرافق المتعلم في كل خطوة.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { num: "3+", ar: "سنوات خبرة" },
                { num: "300+", ar: "دورة وبرنامج" },
                { num: "5000+", ar: "متعلم نشط" },
                { num: "4", ar: "دول عربية" },
              ].map((s) => (
                <div
                  key={s.ar}
                  className="c3-glass rounded-xl p-4 text-center"
                >
                  <div className="c3-arabic text-2xl font-black c3-gold-text">{s.num}</div>
                  <div className="c3-arabic text-sm text-[#e2e2e8]/60 mt-1">{s.ar}</div>
                </div>
              ))}
            </div>
            <button
              className="c3-arabic self-end text-sm font-semibold text-[#8ed5ff] hover:underline flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              اعرف أكثر
            </button>
          </FadeIn>

          {/* Visual — left column */}
          <FadeIn delay={0.15} className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer ring */}
              <div
                className="c3-spin-slow absolute inset-0 rounded-full opacity-20"
                style={{ border: "1px dashed #f59e0b" }}
                aria-hidden
              />
              {/* Main visual */}
              <div
                className="c3-glass relative rounded-3xl p-8 flex flex-col items-center gap-6"
                style={{ minHeight: "380px" }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center c3-float"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <p className="c3-arabic text-xl font-bold text-[#e2e2e8] text-center">
                  نيكساليرن
                </p>
                <p className="c3-arabic text-sm text-[#e2e2e8]/60 text-center leading-relaxed">
                  الذكاء الاصطناعي · اللغة · المهارات الرقمية · المهن · الأتمتة · IoT
                </p>
                {/* Mini portal icons */}
                <div className="grid grid-cols-3 gap-3 w-full">
                  {[Brain, Globe, Target, Trophy, Zap, Cpu].map((Icon, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl"
                      style={{ background: "rgba(142,213,255,0.05)", border: "1px solid rgba(142,213,255,0.1)" }}
                    >
                      <Icon className="w-5 h-5 text-[#8ed5ff]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── PORTALS ─────────────────────────────── */

function PortalsSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0c0e12" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="بوابات التعلم" en="Learning Portals" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            بوابات التعلم
          </h2>
          <p className="c3-arabic mt-4 text-[#e2e2e8]/60 text-lg">
            6 بوابات تعليمية متخصصة — كل بوابة هدف، كل هدف مسار
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTALS.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <FadeIn key={portal.num} delay={i * 0.07}>
                <div
                  className="c3-glass c3-card-glow rounded-2xl p-6 flex flex-col gap-4 text-right transition-all duration-300 h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono text-[#e2e2e8]/25">{portal.num}</span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(142,213,255,0.15), rgba(60,224,251,0.1))" }}
                    >
                      <Icon className="w-5 h-5 text-[#8ed5ff]" />
                    </div>
                  </div>
                  {/* Title */}
                  <div>
                    <h3 className="c3-arabic text-lg font-bold text-[#e2e2e8]">{portal.ar}</h3>
                    <p className="text-xs text-[#e2e2e8]/40 mt-0.5">{portal.en}</p>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-end mt-auto">
                    {portal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="c3-arabic text-xs px-3 py-1 rounded-full text-[#8ed5ff]/80"
                        style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.15)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* CTA */}
                  <button
                    className="c3-arabic text-sm font-semibold text-[#f59e0b] hover:text-[#fbbf24] flex items-center justify-end gap-1 mt-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    استكشف البوابة
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── HOW IT WORKS ─────────────────────────────── */

function HowItWorksSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#111318" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="كيف يعمل التعلم" en="How Learning Works" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            كيف يعمل التعلم؟
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div
                  className="c3-glass rounded-2xl p-6 flex flex-col gap-4 text-right h-full transition-all duration-300 relative"
                >
                  {/* Step number watermark */}
                  <span
                    className="absolute top-4 left-4 text-5xl font-black opacity-[0.06]"
                    style={{ color: step.color, fontFamily: "monospace" }}
                    aria-hidden
                  >
                    {step.num}
                  </span>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center self-end"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  {/* Title */}
                  <h3 className="c3-arabic text-xl font-bold text-[#e2e2e8]">{step.ar}</h3>
                  {/* Description */}
                  <p className="c3-arabic text-sm text-[#e2e2e8]/60 leading-relaxed">{step.desc}</p>
                  {/* Connector arrow (not on last) */}
                  {i < HOW_STEPS.length - 1 && (
                    <div
                      className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 text-[#f59e0b]/40"
                      aria-hidden
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── LEARNING PATHS ─────────────────────────────── */

function PathsSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0c0e12" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="أبرز المسارات" en="Featured Learning Paths" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            أبرز المسارات
          </h2>
          <p className="c3-arabic mt-4 text-[#e2e2e8]/60">
            مسارات مبنية على أهداف حقيقية — ليس مجرد محتوى
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATHS.map((path, i) => {
            const Icon = path.icon;
            return (
              <FadeIn key={path.ar} delay={i * 0.07}>
                <div
                  className="c3-glass c3-card-glow rounded-2xl overflow-hidden flex flex-col text-right h-full transition-all duration-300"
                >
                  {/* Color accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${path.color}, transparent)` }}
                  />
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Icon + badges */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <span
                          className="c3-arabic text-xs px-2 py-1 rounded-md"
                          style={{
                            background: "rgba(226,226,232,0.06)",
                            color: "#e2e2e8aa",
                          }}
                        >
                          {path.level}
                        </span>
                        <span
                          className="c3-arabic text-xs px-2 py-1 rounded-md"
                          style={{
                            background: "rgba(245,158,11,0.1)",
                            color: "#f59e0b",
                          }}
                        >
                          {path.duration}
                        </span>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${path.color}18` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: path.color }} />
                      </div>
                    </div>
                    {/* Title */}
                    <div>
                      <h3 className="c3-arabic text-lg font-bold text-[#e2e2e8]">{path.ar}</h3>
                      <p className="text-xs text-[#e2e2e8]/35 mt-0.5">{path.en}</p>
                    </div>
                    {/* Outcome */}
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl mt-auto"
                      style={{ background: "rgba(142,213,255,0.05)", border: "1px solid rgba(142,213,255,0.08)" }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#8ed5ff] flex-shrink-0 mt-0.5" />
                      <p className="c3-arabic text-xs text-[#e2e2e8]/65 leading-relaxed text-right">
                        {path.outcome}
                      </p>
                    </div>
                    {/* CTA */}
                    <button
                      className="c3-arabic text-sm font-semibold text-[#f59e0b] hover:text-[#fbbf24] flex items-center justify-end gap-1 mt-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      ابدأ المسار
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── IMPACT STATS ─────────────────────────────── */

function ImpactSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background: "linear-gradient(180deg, #111318 0%, #0c0e12 100%)",
        borderTop: "1px solid rgba(245,158,11,0.1)",
        borderBottom: "1px solid rgba(245,158,11,0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="أرقامنا تتحدث" en="Platform Impact" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            أرقامنا تتحدث
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.ar} delay={i * 0.08}>
              <div
                className="c3-glass-warm rounded-2xl p-6 text-center flex flex-col gap-2"
              >
                <div className="c3-arabic text-5xl font-black c3-gold-text">{stat.num}</div>
                <div className="c3-arabic text-base font-semibold text-[#e2e2e8]/80">{stat.ar}</div>
                <div className="text-xs text-[#e2e2e8]/35">{stat.en}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── STUDENT JOURNEY ─────────────────────────────── */

function JourneySection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0c0e12" }}>
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="مسيرة المتعلم" en="Student Journey" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            مسيرة المتعلم
          </h2>
          <p className="c3-arabic mt-4 text-[#e2e2e8]/60">
            من أول خطوة إلى الاحتراف الكامل — نرافقك في كل مرحلة
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline line — right side for RTL */}
          <div
            className="absolute top-0 bottom-0 right-8 w-0.5 hidden sm:block"
            style={{ background: "linear-gradient(180deg, #f59e0b40, #8ed5ff40, #f59e0b40)" }}
            aria-hidden
          />

          <div className="flex flex-col gap-8">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.ar} delay={i * 0.1}>
                  <div className="flex items-start gap-6 sm:pe-20 text-right">
                    {/* Content */}
                    <div
                      className="c3-glass rounded-2xl p-5 flex-1 flex flex-col gap-2"
                    >
                      <span className="c3-arabic text-xs text-[#f59e0b] font-semibold">{step.week}</span>
                      <h3 className="c3-arabic text-xl font-bold text-[#e2e2e8]">{step.ar}</h3>
                      <p className="c3-arabic text-sm text-[#e2e2e8]/60 leading-relaxed">{step.desc}</p>
                    </div>
                    {/* Icon node — right side */}
                    <div
                      className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-2xl items-center justify-center relative z-10"
                      style={{
                        background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(142,213,255,0.1))",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      <Icon className="w-7 h-7 text-[#f59e0b]" />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CERTIFICATIONS ─────────────────────────────── */

function CertificationsSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#111318" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel ar="الشهادات المعتمدة" en="Certifications" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            شهاداتنا المعتمدة
          </h2>
          <p className="c3-arabic mt-4 text-[#e2e2e8]/60">
            شهادات رقمية موثقة ومعترف بها في مصر والسعودية والإمارات وقطر
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <FadeIn key={cert.ar} delay={i * 0.08}>
                <div
                  className="c3-glass rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 c3-card-gold-glow"
                >
                  {/* Certificate icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${cert.color}15`,
                      border: `1px solid ${cert.color}30`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: cert.color }} />
                  </div>
                  {/* Cert design element */}
                  <div
                    className="w-full rounded-xl p-4"
                    style={{
                      background: "rgba(245,158,11,0.05)",
                      border: "1px solid rgba(245,158,11,0.15)",
                    }}
                  >
                    <div className="flex justify-center mb-2">
                      <Award className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <h3 className="c3-arabic text-sm font-bold text-[#e2e2e8] leading-snug">{cert.ar}</h3>
                  </div>
                  <p className="c3-arabic text-xs text-[#e2e2e8]/50">{cert.portal}</p>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CONTACT / START ─────────────────────────────── */

function ContactSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="py-24 px-6"
      style={{
        background: "linear-gradient(180deg, #0c0e12 0%, #111318 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
        <FadeIn>
          <SectionLabel ar="ابدأ الآن" en="Get Started" />
          <h2 className="c3-arabic text-4xl md:text-5xl font-black text-[#e2e2e8]">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="c3-arabic mt-4 text-lg text-[#e2e2e8]/65 leading-relaxed">
            انضم إلى أكثر من 5000 متعلم من مصر والسعودية والإمارات وقطر
            يبنون مستقبلهم التقني مع NexaLearn
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Email input */}
          <div
            className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
            style={{
              background: "rgba(17,19,24,0.8)",
              border: "1px solid rgba(142,213,255,0.2)",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني..."
              dir="rtl"
              className="c3-arabic flex-1 bg-transparent px-4 py-3 text-sm text-[#e2e2e8] placeholder:text-[#e2e2e8]/30 outline-none text-right"
            />
            <ShimmerButton
              background="linear-gradient(135deg, #f59e0b, #d97706)"
              shimmerColor="#fff8e1"
              className="c3-arabic text-sm font-bold text-white px-6 py-3 whitespace-nowrap"
            >
              ابدأ الآن مجاناً
            </ShimmerButton>
          </div>
        </FadeIn>

        {/* Contact row */}
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-center gap-6">
            {[
              { label: "واتساب", icon: MessageCircle },
              { label: "لينكدإن", icon: Users },
              { label: "البريد الإلكتروني", icon: Globe },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="c3-arabic flex items-center gap-2 text-sm text-[#e2e2e8]/55 hover:text-[#8ed5ff] transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────── FOOTER CTA ─────────────────────────────── */

function FooterCTASection() {
  return (
    <footer
      className="py-16 px-6 text-center"
      style={{
        background: "#0c0e12",
        borderTop: "1px solid rgba(245,158,11,0.15)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Main CTA */}
        <FadeIn>
          <h2 className="c3-arabic text-3xl md:text-4xl font-black text-[#e2e2e8]">
            انضم لـ{" "}
            <span className="c3-gold-text">5000+ متعلم</span>
            {" "}على NexaLearn
          </h2>
          <p className="c3-arabic mt-3 text-[#e2e2e8]/55">
            ابدأ مجاناً · لا بطاقة ائتمانية · لا التزامات
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="flex justify-center">
          <ShimmerButton
            background="linear-gradient(135deg, #f59e0b, #d97706)"
            shimmerColor="#fff8e1"
            className="c3-arabic text-lg font-bold text-white px-10 py-4"
          >
            <Rocket className="w-5 h-5 ms-2 inline-block" />
            سجل الآن مجاناً
          </ShimmerButton>
        </FadeIn>

        {/* Footer links */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#e2e2e8]/40">
            {["عن المنصة", "البوابات", "المسارات", "الشهادات", "سياسة الخصوصية", "الشروط والأحكام"].map((link) => (
              <button key={link} className="c3-arabic hover:text-[#e2e2e8]/70 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Copyright */}
        <FadeIn delay={0.2}>
          <div className="pt-6" style={{ borderTop: "1px solid rgba(226,226,232,0.07)" }}>
            <p className="c3-arabic text-sm text-[#e2e2e8]/30">
              NexaLearn by Ahmed Darhous · © 2026 · جميع الحقوق محفوظة
            </p>
            <p className="text-xs text-[#e2e2e8]/20 mt-1">
              Made with care for Arab learners everywhere
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── FLOATING AI MENTOR ─────────────────────────────── */

function FloatingMentor() {
  const [open, setOpen] = useState(false);
  const reduced = useMotion();

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3"
      aria-label="المرشد الذكي"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="c3-glass rounded-2xl p-5 flex flex-col gap-3 text-right"
            style={{ minWidth: "240px", maxWidth: "280px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setOpen(false)}
                className="text-[#e2e2e8]/40 hover:text-[#e2e2e8]/70 transition-colors"
                aria-label="إغلاق"
              >
                <ChevronLeft className="w-4 h-4 rotate-90" />
              </button>
              <div className="flex items-center gap-2">
                <div>
                  <p className="c3-arabic text-sm font-bold text-[#e2e2e8]">المرشد الذكي</p>
                  <p className="c3-arabic text-xs text-green-400">متاح الآن</p>
                </div>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <GoldDivider />
            {/* Quick questions */}
            <p className="c3-arabic text-xs text-[#e2e2e8]/50">أسئلة شائعة:</p>
            <div className="flex flex-col gap-2">
              {MENTOR_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="c3-arabic text-xs text-right px-3 py-2.5 rounded-xl text-[#e2e2e8]/80 hover:text-[#8ed5ff] hover:bg-[#8ed5ff]/05 transition-all"
                  style={{ border: "1px solid rgba(226,226,232,0.1)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
        whileTap={reduced ? {} : { scale: 0.95 }}
        aria-label="فتح المرشد الذكي"
      >
        {open ? (
          <ChevronLeft className="w-6 h-6 -rotate-90" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────── ROOT COMPONENT ─────────────────────────────── */

export default function Concept3({ locale }: { locale: string }) {
  // Inject global styles once
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "c3-global-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_STYLES;
      document.head.appendChild(style);
    }
    return () => {
      // Optionally clean up on unmount
    };
  }, []);

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen text-[#e2e2e8]"
      style={{ background: "#0c0e12" }}
    >
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#f59e0b] focus:text-[#0c0e12] focus:rounded-lg c3-arabic text-sm font-bold"
      >
        الانتقال إلى المحتوى الرئيسي
      </a>

      {/* 1. NAVBAR */}
      <Navbar />

      <main id="main-content">
        {/* 2. HERO */}
        <HeroSection />

        {/* 3. TRUSTED BY */}
        <TrustedBySection />

        {/* 4. PORTAL MARQUEE */}
        <PortalMarqueeSection />

        {/* 5. ABOUT */}
        <AboutSection />

        {/* 6. PORTALS */}
        <PortalsSection />

        {/* 7. HOW IT WORKS */}
        <HowItWorksSection />

        {/* 8. LEARNING PATHS */}
        <PathsSection />

        {/* 9. IMPACT STATS */}
        <ImpactSection />

        {/* 10. STUDENT JOURNEY */}
        <JourneySection />

        {/* 11. CERTIFICATIONS */}
        <CertificationsSection />

        {/* 12. CONTACT / START */}
        <ContactSection />

        {/* 13. FOOTER CTA */}
        <FooterCTASection />
      </main>

      {/* 14. FLOATING AI MENTOR WIDGET */}
      <FloatingMentor />
    </div>
  );
}
