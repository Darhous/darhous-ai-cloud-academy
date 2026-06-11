"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
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
  Award,
  Target,
  TrendingUp,
  Play,
  Clock,
  BookOpen,
  Cpu,
  Lock,
  Check,
  Infinity,
  ChevronRight,
  X,
} from "lucide-react";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { WordRotate } from "@/components/shadcn/ui/word-rotate";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/shadcn/ui/animated-grid-pattern";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { HoverEffect } from "@/components/aceternity/card-hover-effect";
import { Badge } from "@/components/shadcn/ui/badge";
import { Input } from "@/components/shadcn/ui/input";

/* ─────────────────────────── types ─────────────────────────── */
interface Props {
  locale: string;
}

/* ─────────────────────────── constants ─────────────────────── */
const PORTALS = [
  { icon: Brain, key: "ai", en: "AI Academy", ar: "أكاديمية الذكاء الاصطناعي" },
  { icon: Globe, key: "lang", en: "Language Portal", ar: "بوابة اللغات" },
  { icon: Zap, key: "auto", en: "Automation Academy", ar: "أكاديمية الأتمتة" },
  { icon: Cpu, key: "iot", en: "IoT Lab", ar: "مختبر إنترنت الأشياء" },
  { icon: Code, key: "cloud", en: "Cloud Academy", ar: "أكاديمية السحابة" },
  { icon: Trophy, key: "career", en: "Career Portal", ar: "بوابة المسيرة المهنية" },
];

const MARQUEE_ITEMS = [
  "AI Academy", "GPT-4o", "Language Portal", "Cloud Academy", "n8n Automation",
  "Certificates", "IoT Lab", "Career Portal", "Arabic NLP", "Machine Learning",
  "Prompt Engineering", "AWS", "Azure", "LangChain", "RAG Systems",
  "Fine-Tuning", "Data Science", "Python", "Resume Builder", "IELTS Prep",
];

const MARQUEE_ITEMS_2 = [
  "NexaLearn AI", "Job Readiness", "Live Sessions", "AI Mentor", "Community",
  "Roadmaps", "Projects", "Leaderboard", "Flashcards", "Quizzes",
  "OpenAI API", "Anthropic Claude", "HuggingFace", "Vector Databases", "Embeddings",
  "RTL Support", "EGP Pricing", "Team Plans", "Progress Tracking", "Bootcamps",
];

const TECH_PARTNERS = [
  "Google", "Microsoft", "AWS", "OpenAI", "Anthropic", "Meta AI", "GitHub", "HuggingFace",
];

const PATHS = [
  {
    portal: { en: "AI Academy", ar: "أكاديمية الذكاء الاصطناعي" },
    name: { en: "From Zero to AI Engineer", ar: "من الصفر إلى مهندس ذكاء اصطناعي" },
    duration: { en: "12 weeks", ar: "12 أسبوع" },
    enrolled: "3,240",
    rating: 4.9,
    icon: Brain,
    color: "from-[#8ed5ff]/20 to-[#8ed5ff]/5",
    border: "border-[#8ed5ff]/30",
  },
  {
    portal: { en: "Language Portal", ar: "بوابة اللغات" },
    name: { en: "IELTS Band 7+ Mastery", ar: "إتقان الآيلتس 7+ في 4 أسابيع" },
    duration: { en: "4 weeks", ar: "4 أسابيع" },
    enrolled: "1,890",
    rating: 4.8,
    icon: Globe,
    color: "from-[#d0bcff]/20 to-[#d0bcff]/5",
    border: "border-[#d0bcff]/30",
  },
  {
    portal: { en: "Automation Academy", ar: "أكاديمية الأتمتة" },
    name: { en: "n8n & AI Workflows Bootcamp", ar: "بوتكامب n8n وسير العمل بالذكاء الاصطناعي" },
    duration: { en: "6 weeks", ar: "6 أسابيع" },
    enrolled: "2,105",
    rating: 4.9,
    icon: Zap,
    color: "from-[#3ce0fb]/20 to-[#3ce0fb]/5",
    border: "border-[#3ce0fb]/30",
  },
  {
    portal: { en: "Cloud Academy", ar: "أكاديمية السحابة" },
    name: { en: "AWS Solutions Architect Path", ar: "مسار مهندس حلول AWS" },
    duration: { en: "10 weeks", ar: "10 أسابيع" },
    enrolled: "1,430",
    rating: 4.7,
    icon: Code,
    color: "from-[#8ed5ff]/20 to-[#d0bcff]/5",
    border: "border-[#8ed5ff]/30",
  },
  {
    portal: { en: "IoT Lab", ar: "مختبر إنترنت الأشياء" },
    name: { en: "Smart Devices & Edge AI", ar: "الأجهزة الذكية والذكاء الاصطناعي الطرفي" },
    duration: { en: "8 weeks", ar: "8 أسابيع" },
    enrolled: "980",
    rating: 4.8,
    icon: Cpu,
    color: "from-[#3ce0fb]/20 to-[#8ed5ff]/5",
    border: "border-[#3ce0fb]/30",
  },
  {
    portal: { en: "Career Portal", ar: "بوابة المسيرة المهنية" },
    name: { en: "Tech Career Accelerator", ar: "مسرّع المسيرة المهنية في التقنية" },
    duration: { en: "5 weeks", ar: "5 أسابيع" },
    enrolled: "2,780",
    rating: 4.9,
    icon: Trophy,
    color: "from-[#d0bcff]/20 to-[#3ce0fb]/5",
    border: "border-[#d0bcff]/30",
  },
];

const TESTIMONIALS = [
  {
    quote: {
      en: "After 3 weeks on AI Academy, I landed a data analyst role at a startup in Dubai. The AI Mentor kept me accountable every step of the way.",
      ar: "بعد 3 أسابيع في أكاديمية الذكاء الاصطناعي، حصلت على وظيفة محلل بيانات في شركة ناشئة في دبي. المرشد الذكي أبقاني على المسار الصحيح في كل خطوة.",
    },
    name: { en: "Salma H.", ar: "سلمى ح." },
    role: { en: "Data Analyst", ar: "محللة بيانات" },
    country: { en: "🇪🇬 Egypt → Dubai", ar: "مصر ← دبي" },
    rating: 5,
  },
  {
    quote: {
      en: "The Language Portal helped me pass IELTS with 7.0 in just 4 weeks. The AI practice sessions feel like having a native-speaker coach available 24/7.",
      ar: "ساعدتني بوابة اللغات في اجتياز الآيلتس بدرجة 7.0 في 4 أسابيع فقط. جلسات التدريب بالذكاء الاصطناعي تشعرك بوجود مدرب طوال اليوم.",
    },
    name: { en: "Omar R.", ar: "عمر ر." },
    role: { en: "Graduate Student", ar: "طالب دراسات عليا" },
    country: { en: "🇸🇦 Saudi Arabia", ar: "المملكة العربية السعودية" },
    rating: 5,
  },
  {
    quote: {
      en: "I automated my team's reporting pipeline with n8n thanks to Automation Academy. Saved us 20 hours per week. Best investment of 99 EGP I've ever made.",
      ar: "أتمتت خط أنابيب تقارير فريقي باستخدام n8n بفضل أكاديمية الأتمتة. وفرنا 20 ساعة أسبوعياً. أفضل استثمار بـ 99 جنيه.",
    },
    name: { en: "Nour M.", ar: "نور م." },
    role: { en: "Operations Manager", ar: "مديرة عمليات" },
    country: { en: "🇯🇴 Jordan", ar: "الأردن" },
    rating: 5,
  },
];

const CERTS = [
  { title: { en: "AI Engineer Certificate", ar: "شهادة مهندس ذكاء اصطناعي" }, icon: Brain, color: "border-[#8ed5ff]/40 bg-[#8ed5ff]/5" },
  { title: { en: "Cloud Practitioner", ar: "ممارس السحابة" }, icon: Code, color: "border-[#3ce0fb]/40 bg-[#3ce0fb]/5" },
  { title: { en: "Automation Specialist", ar: "متخصص الأتمتة" }, icon: Zap, color: "border-[#d0bcff]/40 bg-[#d0bcff]/5" },
  { title: { en: "Career Readiness Badge", ar: "شارة الجاهزية المهنية" }, icon: Trophy, color: "border-[#8ed5ff]/40 bg-[#8ed5ff]/5" },
];

const JOURNEY_STEPS = [
  { en: "Join", ar: "انضم", icon: Rocket },
  { en: "Assess", ar: "تقييم", icon: Target },
  { en: "Learn", ar: "تعلّم", icon: BookOpen },
  { en: "Practice", ar: "تطبيق", icon: Code },
  { en: "Certify", ar: "احصل على شهادة", icon: Award },
  { en: "Career", ar: "مسيرة مهنية", icon: TrendingUp },
];

const HOW_STEPS = [
  {
    num: "01",
    title: { en: "Choose Your Portal", ar: "اختر بوابتك" },
    desc: {
      en: "Pick from 6 specialized learning areas designed for the modern Arab tech professional.",
      ar: "اختر من بين 6 مجالات تعليمية متخصصة مصممة للمحترف التقني العربي الحديث.",
    },
    icon: Target,
  },
  {
    num: "02",
    title: { en: "Follow Your AI Path", ar: "اتبع مسارك بالذكاء الاصطناعي" },
    desc: {
      en: "A personalized curriculum built by your AI Mentor based on your goals, pace, and learning style.",
      ar: "منهج مخصص يبنيه مرشدك الذكي بناءً على أهدافك وإيقاعك وأسلوب تعلمك.",
    },
    icon: Brain,
  },
  {
    num: "03",
    title: { en: "Earn & Advance", ar: "احصل على شهادتك وتقدّم" },
    desc: {
      en: "Receive recognized certificates, build a portfolio, and unlock career opportunities across the Arab world.",
      ar: "احصل على شهادات معترف بها، وابنِ محفظتك الرقمية، وافتح فرصاً مهنية في كل أنحاء الوطن العربي.",
    },
    icon: Trophy,
  },
];

const PORTAL_HOVER_ITEMS = [
  {
    title: "AI Academy",
    description: "From prompt engineering to fine-tuning LLMs — master the full AI stack with hands-on projects and a personalized AI Mentor.",
    link: "#",
  },
  {
    title: "Language Portal · بوابة اللغات",
    description: "IELTS, TOEFL, business English, and Arabic writing — powered by AI speech recognition and adaptive drills.",
    link: "#",
  },
  {
    title: "Automation Academy",
    description: "Build real no-code and low-code automation workflows with n8n, Zapier, Make, and AI agents. Ship in days, not months.",
    link: "#",
  },
  {
    title: "IoT Lab · مختبر الإنترنت",
    description: "Raspberry Pi, Arduino, MQTT, edge AI — bring hardware to life with cloud-connected smart devices and real lab challenges.",
    link: "#",
  },
  {
    title: "Cloud Academy",
    description: "AWS, Azure, Google Cloud certifications and hands-on labs. Become the cloud engineer your team needs.",
    link: "#",
  },
  {
    title: "Career Portal · المسيرة المهنية",
    description: "AI-powered CV builder, mock interviews, job matching, and mentorship from industry professionals in tech.",
    link: "#",
  },
];

const STATS = [
  { value: "5,000+", label: { en: "Active Students", ar: "طالب نشط" }, icon: Users },
  { value: "300+", label: { en: "Courses", ar: "دورة" }, icon: BookOpen },
  { value: "6", label: { en: "Portals", ar: "بوابات" }, icon: Globe },
  { value: "96%", label: { en: "Satisfaction Rate", ar: "معدل الرضا" }, icon: Star },
];

/* ─────────────────────────── sub-components ────────────────── */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" as const, delay }}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-600"}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Marquee ───────────────────────── */
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-6 whitespace-nowrap ${reverse ? "animate-[marquee-reverse_30s_linear_infinite]" : "animate-[marquee_30s_linear_infinite]"}`}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300"
          >
            <Sparkles size={12} className="text-[#8ed5ff]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Navbar ────────────────────────── */
function Navbar({ isAr, onToggleLang }: { isAr: boolean; onToggleLang: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = isAr
    ? ["المميزات", "البوابات", "المسارات", "الأسعار", "المدونة"]
    : ["Features", "Portals", "Paths", "Pricing", "Blog"];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0e12]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold text-white">NexaLearn</span>
          <span className="text-[10px] text-neutral-400">by Darhous</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="hidden rounded-md border border-white/10 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-white/30 hover:text-white md:block"
          >
            {isAr ? "EN" : "عربي"}
          </button>
          <a href="#" className="hidden text-sm text-neutral-400 hover:text-white md:block">
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </a>
          <ShimmerButton
            shimmerColor="#8ed5ff"
            background="linear-gradient(135deg, #1a2a4a 0%, #0c1a30 100%)"
            className="text-sm font-medium"
          >
            {isAr ? "جرب مجاناً" : "Start Free Trial"}
          </ShimmerButton>

          {/* Mobile hamburger */}
          <button
            className="rounded-md border border-white/10 p-2 text-neutral-300 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <span className="block h-0.5 w-5 bg-current after:mt-1.5 after:block after:h-0.5 after:w-5 after:bg-current before:mb-1.5 before:block before:h-0.5 before:w-5 before:bg-current" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="overflow-hidden border-t border-white/10 bg-[#0c0e12]/95 px-4 pb-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a key={link} href="#" className="block py-2.5 text-sm text-neutral-300 hover:text-white">
                {link}
              </a>
            ))}
            <button onClick={onToggleLang} className="mt-2 text-sm text-[#8ed5ff]">
              {isAr ? "Switch to English" : "التبديل إلى العربية"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────── Hero ──────────────────────────── */
function Hero({ isAr }: { isAr: boolean }) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-24 pt-20">
      {/* Background grid */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.06}
        duration={3}
        className="text-[#8ed5ff]"
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(142,213,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8">
        {/* Top badge */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="mb-6 inline-flex"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8ed5ff]/30 bg-[#8ed5ff]/10 px-4 py-1.5 text-sm text-[#8ed5ff]">
            <span>🎓</span>
            {isAr
              ? "التسجيل مفتوح الآن — انضم لأكثر من 5,000 متعلم"
              : "Now enrolling — Join 5,000+ learners"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
          className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
        >
          {isAr ? (
            <>
              <AnimatedGradientText colorFrom="#8ed5ff" colorTo="#d0bcff">
                منصة التعلم المدعومة بالذكاء الاصطناعي
              </AnimatedGradientText>
              <br />
              <span className="text-white">الأولى للعرب</span>
            </>
          ) : (
            <>
              The{" "}
              <AnimatedGradientText colorFrom="#8ed5ff" colorTo="#d0bcff">
                AI-Powered Learning Platform
              </AnimatedGradientText>
              <br />
              Built for the Arab World
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-neutral-400"
        >
          {isAr
            ? "6 بوابات متخصصة. مسارات تعلم مخصصة بالذكاء الاصطناعي. شهادات حقيقية. من القاهرة إلى الرياض إلى دبي."
            : "6 specialized portals. Personalized AI paths. Real certifications. From Cairo to Riyadh to Dubai."}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <ShimmerButton
            shimmerColor="#8ed5ff"
            background="linear-gradient(135deg, #1a3a6a 0%, #0c1a40 100%)"
            className="gap-2 text-base font-semibold"
          >
            {isAr ? "ابدأ مجاناً ←" : "Start Free →"}
          </ShimmerButton>
          <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base text-white transition hover:bg-white/10">
            <Play size={16} className="fill-white" />
            {isAr ? "شاهد العرض التوضيحي" : "Watch Demo"}
          </button>
        </motion.div>

        {/* Platform mockup */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.4 }}
          className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-2xl border border-white/10"
          style={{ background: "linear-gradient(135deg, #111318 0%, #0c1520 100%)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <div className="mx-auto flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-center text-xs text-neutral-500">
              app.nexalearn.ai/dashboard
            </div>
          </div>

          {/* Mock dashboard content */}
          <div className="grid grid-cols-3 gap-3 p-6 md:grid-cols-4">
            <div className="col-span-1 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="mb-2 text-xs text-neutral-500">{isAr ? "تقدمك" : "Your Progress"}</div>
              {["AI Academy", "Cloud", "Career"].map((p) => (
                <div key={p} className="mb-2">
                  <div className="mb-1 flex justify-between text-[10px] text-neutral-400">
                    <span>{p}</span>
                    <span>75%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8ed5ff] to-[#d0bcff]"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 rounded-xl border border-[#8ed5ff]/20 bg-[#8ed5ff]/5 p-3 md:col-span-3">
              <div className="mb-1 flex items-center gap-2">
                <Bot size={16} className="text-[#8ed5ff]" />
                <span className="text-xs font-medium text-[#8ed5ff]">
                  {isAr ? "مرشدك الذكي" : "Your AI Mentor"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                {isAr
                  ? "مرحباً! بناءً على تقدمك في أكاديمية الذكاء الاصطناعي، أنصحك بإكمال وحدة Fine-Tuning هذا الأسبوع. لديك اختبار قادم في 3 أيام."
                  : "Welcome back! Based on your progress in AI Academy, I recommend completing the Fine-Tuning module this week. You have an assessment in 3 days."}
              </p>
              <div className="mt-2 flex gap-2">
                {[isAr ? "اعرض الخطة" : "View Plan", isAr ? "ابدأ الآن" : "Start Now"].map((a) => (
                  <button
                    key={a}
                    className="rounded-md border border-[#8ed5ff]/30 bg-[#8ed5ff]/10 px-2 py-1 text-[10px] text-[#8ed5ff]"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Portal grid preview */}
          <div className="grid grid-cols-6 gap-2 border-t border-white/10 px-6 py-3">
            {PORTALS.map(({ icon: Icon, key, en, ar }) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Icon size={14} className="text-[#8ed5ff]" />
                </div>
                <span className="hidden text-[9px] text-neutral-500 md:block">
                  {isAr ? ar.split(" ")[0] : en.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-400"
        >
          {[
            { en: "No credit card", ar: "بدون بطاقة ائتمان" },
            { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
            { en: "Arabic & English", ar: "عربي وإنجليزي" },
          ].map((chip) => (
            <span key={chip.en} className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-400" />
              {isAr ? chip.ar : chip.en}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SocialProof ───────────────────── */
function SocialProof({ isAr }: { isAr: boolean }) {
  return (
    <FadeIn>
      <section className="border-y border-white/10 bg-[#111318] py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="mb-6 text-center text-sm text-neutral-500">
            {isAr ? "موثوق به من متعلمين في:" : "Trusted by learners at:"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {TECH_PARTNERS.map((partner) => (
              <div
                key={partner}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-400 transition hover:border-white/20 hover:text-white"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

/* ─────────────────────────── PortalMarquee ─────────────────── */
function PortalMarquee({ isAr }: { isAr: boolean }) {
  return (
    <section className="overflow-hidden py-10">
      <div className="mb-2">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
      <Marquee items={MARQUEE_ITEMS_2} reverse />
    </section>
  );
}

/* ─────────────────────────── PlatformFeatures ──────────────── */
function PlatformFeatures({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <FadeIn className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#8ed5ff]">
            {isAr ? "المنصة" : "Platform"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr
              ? "كل ما تحتاجه لتصبح جاهزاً للذكاء الاصطناعي"
              : "Everything you need to become AI-ready"}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <BentoGrid className="mx-auto max-w-7xl">
            {/* Large: AI Mentor */}
            <BentoGridItem
              className="md:col-span-2 border-[#8ed5ff]/20 bg-gradient-to-br from-[#111318] to-[#0c1a30]"
              title={
                <span className="text-white">
                  {isAr ? "مرشد ذكاء اصطناعي يعرف أهدافك" : "AI Mentor that knows your goals"}
                </span>
              }
              description={
                <span className="text-neutral-400">
                  {isAr
                    ? "مرشدك الشخصي متاح 24/7 — يبني مسارك، يتابع تقدمك، يجيب على أسئلتك بالعربية والإنجليزية."
                    : "Your personal AI coach available 24/7 — builds your path, tracks progress, and answers questions in Arabic or English."}
                </span>
              }
              header={
                <div className="flex h-24 items-center justify-center rounded-xl border border-[#8ed5ff]/20 bg-[#8ed5ff]/5">
                  <Bot size={40} className="text-[#8ed5ff]" />
                </div>
              }
              icon={<Sparkles size={16} className="text-[#8ed5ff]" />}
            />

            {/* Medium: 6 Portals */}
            <BentoGridItem
              className="border-[#d0bcff]/20 bg-gradient-to-br from-[#111318] to-[#1a0c30]"
              title={
                <span className="text-white">
                  {isAr ? "6 بوابات متخصصة" : "6 Specialized Portals"}
                </span>
              }
              description={
                <span className="text-neutral-400">
                  {isAr
                    ? "ذكاء اصطناعي، لغات، أتمتة، إنترنت الأشياء، سحابة، مسيرة مهنية."
                    : "AI, Language, Automation, IoT, Cloud, Career."}
                </span>
              }
              header={
                <div className="grid grid-cols-3 gap-2">
                  {PORTALS.map(({ icon: Icon, key }) => (
                    <div
                      key={key}
                      className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2"
                    >
                      <Icon size={16} className="text-[#d0bcff]" />
                    </div>
                  ))}
                </div>
              }
              icon={<Globe size={16} className="text-[#d0bcff]" />}
            />

            {/* Small: 300+ Courses */}
            <BentoGridItem
              className="border-white/10 bg-[#111318]"
              title={<span className="text-white">{isAr ? "+300 دورة" : "300+ Courses"}</span>}
              description={
                <span className="text-neutral-400">
                  {isAr ? "دورات مُنتقاة بعناية عبر جميع البوابات." : "Curated content across all portals."}
                </span>
              }
              header={
                <div className="flex h-16 items-center justify-center">
                  <BookOpen size={32} className="text-[#3ce0fb]" />
                </div>
              }
              icon={<BookOpen size={14} className="text-[#3ce0fb]" />}
            />

            {/* Small: Certificates */}
            <BentoGridItem
              className="border-white/10 bg-[#111318]"
              title={
                <span className="text-white">{isAr ? "شهادات حقيقية" : "Real Certificates"}</span>
              }
              description={
                <span className="text-neutral-400">
                  {isAr ? "معترف بها من أصحاب العمل." : "Recognized by employers."}
                </span>
              }
              header={
                <div className="flex h-16 items-center justify-center">
                  <Award size={32} className="text-yellow-400" />
                </div>
              }
              icon={<Trophy size={14} className="text-yellow-400" />}
            />

            {/* Medium: RTL Support */}
            <BentoGridItem
              className="border-[#3ce0fb]/20 bg-gradient-to-br from-[#111318] to-[#0c1e20]"
              title={
                <span className="text-white">{isAr ? "دعم كامل للغة العربية" : "Full RTL Arabic Support"}</span>
              }
              description={
                <span className="text-neutral-400">
                  {isAr
                    ? "واجهة مصممة أصلاً بالاتجاه من اليمين لليسار — ليست مجرد ترجمة."
                    : "Interface designed natively RTL — not just a translation layer."}
                </span>
              }
              header={
                <div className="flex h-20 items-center justify-center rounded-xl border border-[#3ce0fb]/20 bg-[#3ce0fb]/5">
                  <span className="text-3xl font-bold text-[#3ce0fb]">ع</span>
                  <span className="mx-2 text-neutral-600">|</span>
                  <span className="text-3xl font-bold text-[#8ed5ff]">A</span>
                </div>
              }
              icon={<Globe size={16} className="text-[#3ce0fb]" />}
            />

            {/* Large: Dashboard */}
            <BentoGridItem
              className="md:col-span-2 border-[#d0bcff]/20 bg-gradient-to-br from-[#111318] to-[#1a0c30]"
              title={
                <span className="text-white">
                  {isAr ? "لوحة تتبع تقدمك في الوقت الفعلي" : "Progress tracking dashboard"}
                </span>
              }
              description={
                <span className="text-neutral-400">
                  {isAr
                    ? "راقب إنجازاتك، شاهد نقاط قوتك، واطلع على تقاريرك الأسبوعية."
                    : "Track achievements, see your strengths, and get weekly AI-generated reports."}
                </span>
              }
              header={
                <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                  {["Module 1", "Module 2", "Module 3"].map((m, i) => (
                    <div key={m} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-xs text-neutral-400">
                          <span>{m}</span>
                          <span>{[90, 65, 40][i]}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${[90, 65, 40][i]}%`,
                              background: `linear-gradient(90deg, #8ed5ff, #d0bcff)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
              icon={<TrendingUp size={16} className="text-[#d0bcff]" />}
            />
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── PortalShowcase ────────────────── */
function PortalShowcase({ isAr }: { isAr: boolean }) {
  return (
    <section className="bg-[#111318] py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <FadeIn className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#d0bcff]">
            {isAr ? "البوابات" : "Portals"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "6 بوابات، منظومة واحدة" : "6 Portals, One Ecosystem"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            {isAr
              ? "كل بوابة مصممة للعمق والتخصص — ليس دورات عشوائية، بل رحلة تعلم متكاملة."
              : "Each portal is designed for depth and specialization — not random courses, but a complete learning journey."}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <HoverEffect items={PORTAL_HOVER_ITEMS} />
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── HowItWorks ────────────────────── */
function HowItWorks({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#3ce0fb]">
            {isAr ? "كيف يعمل" : "How It Works"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "3 خطوات إلى المهارة" : "3 Steps to Mastery"}
          </h2>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {HOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative rounded-2xl border border-white/10 bg-[#111318] p-6">
                  {/* Number */}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="text-5xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #8ed5ff, #d0bcff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon size={20} className="text-[#8ed5ff]" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-bold text-white">{isAr ? step.title.ar : step.title.en}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {isAr ? step.desc.ar : step.desc.en}
                  </p>

                  {/* Arrow connector */}
                  {i < 2 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                      <ChevronRight size={20} className="text-neutral-600" />
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

/* ─────────────────────────── Pricing ───────────────────────── */
function Pricing({ isAr }: { isAr: boolean }) {
  const plans = [
    {
      name: { en: "Free", ar: "مجاني" },
      price: { en: "0 EGP", ar: "0 جنيه" },
      period: { en: "/month", ar: "/شهر" },
      desc: { en: "Perfect for exploring", ar: "مثالي للاستكشاف" },
      features: [
        { en: "3 portals (intro content)", ar: "3 بوابات (محتوى تمهيدي)" },
        { en: "AI Mentor (5 msg/day)", ar: "المرشد الذكي (5 رسائل/يوم)" },
        { en: "Community access", ar: "الوصول للمجتمع" },
        { en: "Progress tracking", ar: "تتبع التقدم" },
      ],
      cta: { en: "Start Free", ar: "ابدأ مجاناً" },
      highlighted: false,
      border: "border-white/10",
      ctaVariant: "outline" as const,
    },
    {
      name: { en: "Pro", ar: "برو" },
      price: { en: "$29", ar: "99 جنيه" },
      period: { en: "/month", ar: "/شهر" },
      desc: { en: "Most popular — full platform", ar: "الأكثر شيوعاً — المنصة كاملة" },
      badge: { en: "Most Popular", ar: "الأكثر شيوعاً" },
      features: [
        { en: "All 6 portals unlimited", ar: "جميع البوابات الـ6 بلا حدود" },
        { en: "AI Mentor unlimited", ar: "المرشد الذكي بلا حدود" },
        { en: "Certificates included", ar: "شهادات معتمدة مشمولة" },
        { en: "Monthly live sessions", ar: "جلسات مباشرة شهرية" },
        { en: "Portfolio builder", ar: "منشئ المحفظة الرقمية" },
        { en: "Priority support", ar: "دعم أولوية" },
      ],
      cta: { en: "Go Pro", ar: "اشترك في برو" },
      highlighted: true,
      border: "border-[#8ed5ff]/40",
      ctaVariant: "shimmer" as const,
    },
    {
      name: { en: "Team", ar: "فريق" },
      price: { en: "Custom", ar: "مخصص" },
      period: { en: "", ar: "" },
      desc: { en: "For organizations", ar: "للمؤسسات والشركات" },
      features: [
        { en: "Everything in Pro", ar: "كل ما في برو" },
        { en: "Team dashboard", ar: "لوحة تحكم الفريق" },
        { en: "Bulk certificates", ar: "شهادات جماعية" },
        { en: "Dedicated support", ar: "دعم مخصص" },
        { en: "Custom learning paths", ar: "مسارات تعلم مخصصة" },
        { en: "Analytics & reporting", ar: "تحليلات وتقارير" },
      ],
      cta: { en: "Contact Us", ar: "تواصل معنا" },
      highlighted: false,
      border: "border-white/10",
      ctaVariant: "outline" as const,
    },
  ];

  return (
    <section className="bg-[#111318] py-20" id="pricing">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#8ed5ff]">
            {isAr ? "الأسعار" : "Pricing"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "أسعار بسيطة وشفافة" : "Simple, Transparent Pricing"}
          </h2>
          <p className="mt-3 text-neutral-400">
            {isAr
              ? "ابدأ مجاناً. طوّر عندما تكون مستعداً."
              : "Start free. Upgrade when you're ready."}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name.en} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-[#0c0e12] p-6 ${plan.border} ${plan.highlighted ? "shadow-[0_0_40px_rgba(142,213,255,0.1)]" : ""}`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#8ed5ff] px-3 py-1 text-xs font-bold text-[#0c0e12]">
                      {isAr ? plan.badge.ar : plan.badge.en}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-4">
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {isAr ? plan.name.ar : plan.name.en}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {isAr ? plan.desc.ar : plan.desc.en}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {isAr ? plan.price.ar : plan.price.en}
                    </span>
                    {plan.period.en && (
                      <span className="text-sm text-neutral-500">
                        {isAr ? plan.period.ar : plan.period.en}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="mb-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.en} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-green-400" />
                      {isAr ? f.ar : f.en}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.ctaVariant === "shimmer" ? (
                  <ShimmerButton
                    shimmerColor="#8ed5ff"
                    background="linear-gradient(135deg, #1a3a6a 0%, #0c1a40 100%)"
                    className="w-full justify-center text-sm font-semibold"
                  >
                    {isAr ? plan.cta.ar : plan.cta.en}
                  </ShimmerButton>
                ) : (
                  <button className="w-full rounded-xl border border-white/20 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                    {isAr ? plan.cta.ar : plan.cta.en}
                  </button>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FeaturedPaths ─────────────────── */
function FeaturedPaths({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <FadeIn className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#d0bcff]">
            {isAr ? "المسارات" : "Paths"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "أبرز مسارات التعلم" : "Top Learning Paths"}
          </h2>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((path, i) => {
            const Icon = path.icon;
            return (
              <FadeIn key={path.name.en} delay={i * 0.08}>
                <div
                  className={`flex flex-col rounded-2xl border bg-gradient-to-br p-5 transition hover:-translate-y-1 ${path.border} ${path.color}`}
                  style={{ background: "rgba(17,19,24,0.95)" }}
                >
                  {/* Portal badge */}
                  <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">
                    <Icon size={12} />
                    {isAr ? path.portal.ar : path.portal.en}
                  </div>

                  {/* Path name */}
                  <h3 className="mb-3 font-bold leading-snug text-white">
                    {isAr ? path.name.ar : path.name.en}
                  </h3>

                  {/* Meta */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {isAr ? path.duration.ar : path.duration.en}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {path.enrolled}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-neutral-300">{path.rating}</span>
                    </div>
                  </div>

                  {/* Enroll */}
                  <a
                    href="#"
                    className="mt-3 flex items-center gap-1 text-sm font-medium text-[#8ed5ff] hover:text-white"
                  >
                    {isAr ? "سجّل الآن" : "Enroll Now"}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PlatformImpact ────────────────── */
function PlatformImpact({ isAr }: { isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#111318] py-20" ref={ref}>
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <FadeIn className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "أثر المنصة" : "Platform Impact"}
          </h2>
          <p className="mt-3 text-neutral-400">
            {isAr
              ? "أرقام حقيقية من متعلمين حقيقيين في العالم العربي."
              : "Real numbers from real learners across the Arab world."}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.value}
                initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#0c0e12] p-6 text-center"
              >
                <Icon size={24} className="mb-3 text-[#8ed5ff]" />
                <div
                  className="mb-1 text-3xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #8ed5ff, #d0bcff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-400">
                  {isAr ? stat.label.ar : stat.label.en}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── StudentJourney ────────────────── */
function StudentJourney({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#3ce0fb]">
            {isAr ? "رحلة المتعلم" : "Student Journey"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "من التسجيل إلى المسيرة المهنية" : "From Enrollment to Career"}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative flex flex-col items-start gap-0 md:flex-row md:items-center md:justify-between">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[#8ed5ff]/30 to-[#d0bcff]/30 md:left-0 md:top-1/2 md:h-0.5 md:w-full md:-translate-y-1/2 md:bg-gradient-to-r" />

            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.en}
                  className="relative z-10 flex items-center gap-4 pb-8 last:pb-0 md:flex-col md:gap-3 md:pb-0"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" as const, delay: i * 0.08 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#8ed5ff]/40 bg-[#8ed5ff]/10"
                  >
                    <Icon size={20} className="text-[#8ed5ff]" />
                  </motion.div>
                  <div className="md:text-center">
                    <div className="font-semibold text-white">{isAr ? step.ar : step.en}</div>
                    <div className="text-xs text-neutral-500">{i + 1}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── Certifications ────────────────── */
function Certifications({ isAr }: { isAr: boolean }) {
  return (
    <section className="bg-[#111318] py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <FadeIn className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-yellow-400">
            {isAr ? "الشهادات" : "Certifications"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "شهادات يثق بها أصحاب العمل" : "Certificates employers recognize"}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {CERTS.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title.en}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2, ease: "easeOut" as const }}
                  className={`flex flex-col items-center rounded-2xl border p-6 text-center ${cert.color}`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10">
                    <Icon size={22} className="text-yellow-400" />
                  </div>
                  <Lock size={12} className="mb-1 text-neutral-600" />
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                    {isAr ? "NexaLearn" : "NexaLearn"}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    {isAr ? cert.title.ar : cert.title.en}
                  </div>
                  <div className="mt-2 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── Testimonials ──────────────────── */
function Testimonials({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#d0bcff]">
            {isAr ? "قصص النجاح" : "Student Outcomes"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {isAr ? "متعلمون حقيقيون. نتائج حقيقية." : "Real learners. Real results."}
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name.en} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111318] p-6">
                {/* Stars */}
                <StarRating rating={t.rating} />

                {/* Quote */}
                <blockquote className="my-4 flex-1 text-sm leading-relaxed text-neutral-300">
                  &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #8ed5ff30, #d0bcff30)", border: "1px solid rgba(142,213,255,0.3)" }}
                  >
                    {(isAr ? t.name.ar : t.name.en).charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {isAr ? t.name.ar : t.name.en}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {isAr ? t.role.ar : t.role.en} · {isAr ? t.country.ar : t.country.en}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ContactCTA ────────────────────── */
function ContactCTA({ isAr }: { isAr: boolean }) {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden bg-[#111318] py-20">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(142,213,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center md:px-8">
        <FadeIn>
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#8ed5ff]/30 bg-[#8ed5ff]/10">
            <Rocket size={24} className="text-[#8ed5ff]" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {isAr ? "ابدأ رحلتك اليوم" : "Start your journey today"}
          </h2>
          <p className="mb-8 text-neutral-400">
            {isAr
              ? "انضم إلى أكثر من 5,000 متعلم عربي يحوّلون مسيرتهم المهنية مع NexaLearn."
              : "Join 5,000+ Arab learners transforming their careers with NexaLearn."}
          </p>

          {/* Email capture */}
          <div className="mb-4 flex gap-2">
            <Input
              type="email"
              placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-white/20 bg-white/5 text-white placeholder:text-neutral-500 focus:border-[#8ed5ff]/50"
            />
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="linear-gradient(135deg, #1a3a6a 0%, #0c1a40 100%)"
              className="shrink-0 font-semibold"
            >
              {isAr ? "ابدأ مجاناً" : "Get Started Free"}
            </ShimmerButton>
          </div>

          {/* AI Mentor quick link */}
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#8ed5ff]"
          >
            <Bot size={16} />
            {isAr
              ? "أسئلة؟ تحدث مع المرشد الذكي ←"
              : "Questions? Chat with AI Mentor →"}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── FooterCTA ─────────────────────── */
function FooterCTA({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* BG */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(208,188,255,0.07) 0%, transparent 70%)",
        }}
      />
      <AnimatedGridPattern numSquares={20} maxOpacity={0.05} duration={4} className="text-[#d0bcff]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <FadeIn>
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
            {isAr ? (
              <>
                هل أنت مستعد لتحويل
                <br />
                <AnimatedGradientText colorFrom="#8ed5ff" colorTo="#d0bcff">
                  مسيرتك المهنية؟
                </AnimatedGradientText>
              </>
            ) : (
              <>
                Ready to transform
                <br />
                <AnimatedGradientText colorFrom="#8ed5ff" colorTo="#d0bcff">
                  your career?
                </AnimatedGradientText>
              </>
            )}
          </h2>
          <p className="mb-10 text-lg text-neutral-400">
            {isAr
              ? "منصة NexaLearn متاحة الآن. ابدأ مجاناً أو اكتشف البوابات."
              : "NexaLearn is available now. Start free or explore our portals."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton
              shimmerColor="#8ed5ff"
              background="linear-gradient(135deg, #1a3a6a 0%, #0c1a40 100%)"
              className="gap-2 px-8 py-4 text-base font-bold"
            >
              {isAr ? "ابدأ مجاناً" : "Start Free"}
              <ArrowRight size={18} />
            </ShimmerButton>
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10">
              {isAr ? "استكشف البوابات" : "Explore Portals"}
              <Globe size={18} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── Footer ────────────────────────── */
function Footer({ isAr }: { isAr: boolean }) {
  const links = {
    platform: {
      label: { en: "Platform", ar: "المنصة" },
      items: [
        { en: "Features", ar: "المميزات" },
        { en: "Portals", ar: "البوابات" },
        { en: "Pricing", ar: "الأسعار" },
        { en: "Blog", ar: "المدونة" },
      ],
    },
    learn: {
      label: { en: "Learn", ar: "التعلم" },
      items: [
        { en: "AI Academy", ar: "أكاديمية الذكاء الاصطناعي" },
        { en: "Language Portal", ar: "بوابة اللغات" },
        { en: "Automation", ar: "الأتمتة" },
        { en: "Cloud", ar: "السحابة" },
      ],
    },
    company: {
      label: { en: "Company", ar: "الشركة" },
      items: [
        { en: "About", ar: "عن المنصة" },
        { en: "Contact", ar: "تواصل معنا" },
        { en: "Terms", ar: "الشروط" },
        { en: "Privacy", ar: "الخصوصية" },
      ],
    },
  };

  return (
    <footer className="border-t border-white/10 bg-[#0c0e12] py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-2 flex flex-col leading-none">
              <span className="text-xl font-bold text-white">NexaLearn</span>
              <span className="text-xs text-neutral-500">by Darhous</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-neutral-500">
              {isAr
                ? "منصة التعلم المدعومة بالذكاء الاصطناعي الأولى للعالم العربي."
                : "The AI-powered learning platform built for the Arab world."}
            </p>
            <div className="flex items-center gap-2">
              <Infinity size={14} className="text-[#8ed5ff]" />
              <span className="text-xs text-neutral-500">
                {isAr ? "تعلم بلا حدود" : "Learn without limits"}
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.values(links).map((group) => (
            <div key={group.label.en}>
              <h4 className="mb-3 text-sm font-semibold text-white">
                {isAr ? group.label.ar : group.label.en}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.en}>
                    <a href="#" className="text-sm text-neutral-500 hover:text-white">
                      {isAr ? item.ar : item.en}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-600">
          <span>© 2026 NexaLearn by Darhous. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span className="flex items-center gap-1">
            <Bot size={12} />
            {isAr ? "مدعوم بالذكاء الاصطناعي" : "AI-powered"}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── FloatingBot ───────────────────── */
function FloatingBot({ isAr }: { isAr: boolean }) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const quickOptions = isAr
    ? ["ما هي البوابات المتاحة؟", "كيف أبدأ مجاناً؟", "ما الشهادات المتاحة؟"]
    : ["What portals are available?", "How do I start for free?", "What certificates do you offer?"];

  return (
    <div
      className={`fixed bottom-6 z-50 ${isAr ? "left-6" : "right-6"}`}
      style={{ direction: "ltr" }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="mb-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#111318] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0e12] px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-[#8ed5ff]" />
                <span className="text-sm font-semibold text-white">
                  {isAr ? "المرشد الذكي" : "AI Mentor"}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-neutral-500 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="mb-3 text-xs text-neutral-400">
                {isAr ? "كيف يمكنني مساعدتك اليوم؟" : "How can I help you today?"}
              </p>
              <div className="space-y-2">
                {quickOptions.map((opt) => (
                  <button
                    key={opt}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-start text-xs text-neutral-300 transition hover:border-[#8ed5ff]/30 hover:bg-[#8ed5ff]/10 hover:text-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        whileHover={shouldReduce ? {} : { scale: 1.1 }}
        whileTap={shouldReduce ? {} : { scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#8ed5ff]/40 bg-gradient-to-br from-[#1a3a6a] to-[#0c1a40] shadow-lg shadow-[#8ed5ff]/20 transition"
      >
        {open ? <X size={22} className="text-white" /> : <Bot size={22} className="text-[#8ed5ff]" />}
      </motion.button>
    </div>
  );
}

/* ─────────────────────────── Root ──────────────────────────── */
export default function Concept4({ locale }: Props) {
  const [lang, setLang] = useState<"en" | "ar">(locale === "ar" ? "ar" : "en");
  const isAr = lang === "ar";

  return (
    <>
      {/* Global CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_30s_linear_infinite\\],
          .animate-\\[marquee-reverse_30s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>

      <div
        dir={isAr ? "rtl" : "ltr"}
        className="min-h-screen"
        style={{ backgroundColor: "#0c0e12", color: "#fff" }}
      >
        <Navbar isAr={isAr} onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))} />
        <Hero isAr={isAr} />
        <SocialProof isAr={isAr} />
        <PortalMarquee isAr={isAr} />
        <PlatformFeatures isAr={isAr} />
        <PortalShowcase isAr={isAr} />
        <HowItWorks isAr={isAr} />
        <Pricing isAr={isAr} />
        <FeaturedPaths isAr={isAr} />
        <PlatformImpact isAr={isAr} />
        <StudentJourney isAr={isAr} />
        <Certifications isAr={isAr} />
        <Testimonials isAr={isAr} />
        <ContactCTA isAr={isAr} />
        <FooterCTA isAr={isAr} />
        <Footer isAr={isAr} />
        <FloatingBot isAr={isAr} />
      </div>
    </>
  );
}
