"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDot,
  Cpu,
  Gauge,
  GraduationCap,
  Languages,
  MonitorCheck,
  Network,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import ConceptBadge from "@/components/design-lab/shared/ConceptBadge";
import PreviewHeader from "@/components/design-lab/shared/PreviewHeader";

type Portal = {
  id: string;
  titleAr: string;
  titleEn: string;
  eyebrowAr: string;
  eyebrowEn: string;
  descriptionAr: string;
  descriptionEn: string;
  nextAr: string;
  nextEn: string;
  href: string;
  color: string;
  progress: number;
  metric: string;
  Icon: LucideIcon;
};

type Goal = {
  id: "beginner" | "career" | "builder";
  labelAr: string;
  labelEn: string;
  detailAr: string;
  detailEn: string;
  portalId: string;
  Icon: LucideIcon;
};

const PORTALS: Portal[] = [
  {
    id: "ai-academy",
    titleAr: "أكاديمية الذكاء الاصطناعي",
    titleEn: "AI Academy",
    eyebrowAr: "المسار الموصى به",
    eyebrowEn: "Recommended start",
    descriptionAr:
      "ابدأ بأساسيات الذكاء الاصطناعي وهندسة الأوامر، ثم طبّق ما تتعلمه في معامل عملية قصيرة.",
    descriptionEn:
      "Start with AI foundations and prompt engineering, then apply each skill in focused hands-on labs.",
    nextAr: "هندسة الأوامر للمبتدئين",
    nextEn: "Prompt Engineering Foundations",
    href: "/ai-academy",
    color: "#8ed5ff",
    progress: 68,
    metric: "18 courses",
    Icon: Bot,
  },
  {
    id: "language",
    titleAr: "بوابة اللغة",
    titleEn: "Language Portal",
    eyebrowAr: "قياس المستوى",
    eyebrowEn: "Level assessment",
    descriptionAr:
      "حدّد مستواك في الإنجليزية واحصل على خطة مهارية تساعدك على الدراسة والعمل بثقة.",
    descriptionEn:
      "Measure your English level and receive a focused skills plan for confident study and work.",
    nextAr: "اختبار تحديد المستوى",
    nextEn: "English Level Assessment",
    href: "/language",
    color: "#d0bcff",
    progress: 85,
    metric: "B2 ready",
    Icon: Languages,
  },
  {
    id: "digital-exams",
    titleAr: "الاختبارات الرقمية",
    titleEn: "Digital Exams",
    eyebrowAr: "تدريب موجّه",
    eyebrowEn: "Focused practice",
    descriptionAr:
      "تدرّب على المهارات الرقمية والأمن السيبراني عبر اختبارات منظمة ونتائج فورية.",
    descriptionEn:
      "Practice digital skills and cybersecurity with structured exams and immediate feedback.",
    nextAr: "اختبار أساسيات الحاسب",
    nextEn: "Computer Fundamentals Exam",
    href: "/digital-exams",
    color: "#3ce0fb",
    progress: 45,
    metric: "902+ questions",
    Icon: MonitorCheck,
  },
  {
    id: "career",
    titleAr: "البوابة المهنية",
    titleEn: "Career Hub",
    eyebrowAr: "جاهزية مهنية",
    eyebrowEn: "Career readiness",
    descriptionAr:
      "حلّل سيرتك الذاتية، حسّن توافقها مع أنظمة ATS، واربط مهاراتك بالفرص المناسبة.",
    descriptionEn:
      "Analyze your CV, improve ATS alignment, and connect your skills to relevant opportunities.",
    nextAr: "تحليل السيرة الذاتية",
    nextEn: "Run Your CV Analysis",
    href: "/career",
    color: "#fbbf24",
    progress: 20,
    metric: "ATS analyzer",
    Icon: BriefcaseBusiness,
  },
  {
    id: "automation",
    titleAr: "أكاديمية الأتمتة",
    titleEn: "Automation Academy",
    eyebrowAr: "تدفقات عمل",
    eyebrowEn: "Smart workflows",
    descriptionAr:
      "حوّل المهام المتكررة إلى تدفقات ذكية من خلال وصفات عملية ومعامل قابلة للتطبيق.",
    descriptionEn:
      "Turn repetitive tasks into smart workflows through practical recipes and applied labs.",
    nextAr: "أول تدفق أتمتة",
    nextEn: "Build Your First Workflow",
    href: "/automation",
    color: "#4ade80",
    progress: 10,
    metric: "30 recipes",
    Icon: Workflow,
  },
  {
    id: "iot-lab",
    titleAr: "مختبر إنترنت الأشياء",
    titleEn: "IoT Lab",
    eyebrowAr: "تعلم بالمشاريع",
    eyebrowEn: "Project learning",
    descriptionAr:
      "ابنِ دوائر ومشاريع Arduino خطوة بخطوة، من أول حساس إلى نظام متصل متكامل.",
    descriptionEn:
      "Build Arduino circuits and projects step by step, from your first sensor to connected systems.",
    nextAr: "مشروع الحساس الأول",
    nextEn: "Your First Sensor Project",
    href: "/iot-lab",
    color: "#f97316",
    progress: 5,
    metric: "72 projects",
    Icon: Cpu,
  },
];

const GOALS: Goal[] = [
  {
    id: "beginner",
    labelAr: "أبدأ من الصفر",
    labelEn: "I am starting",
    detailAr: "أساسيات واضحة وخطوات قصيرة",
    detailEn: "Clear foundations and short steps",
    portalId: "ai-academy",
    Icon: GraduationCap,
  },
  {
    id: "career",
    labelAr: "أطوّر مساري المهني",
    labelEn: "I want career growth",
    detailAr: "مهارات مطلوبة وملف أقوى",
    detailEn: "In-demand skills and a stronger profile",
    portalId: "career",
    Icon: Target,
  },
  {
    id: "builder",
    labelAr: "أريد بناء مشاريع",
    labelEn: "I want to build",
    detailAr: "معامل وأتمتة وتطبيق عملي",
    detailEn: "Labs, automation, and practical work",
    portalId: "automation",
    Icon: Rocket,
  },
];

const OUTCOMES = [
  { value: "18", labelAr: "دورة متاحة", labelEn: "active courses", Icon: GraduationCap },
  { value: "902+", labelAr: "سؤال تدريبي", labelEn: "practice questions", Icon: ShieldCheck },
  { value: "72", labelAr: "مشروع تطبيقي", labelEn: "applied projects", Icon: Network },
  { value: "6", labelAr: "بوابات بحساب واحد", labelEn: "portals, one account", Icon: Users },
];

const WEEK_PLANS: Record<Goal["id"], { ar: string[]; en: string[] }> = {
  beginner: {
    ar: ["أساسيات الذكاء الاصطناعي", "هندسة الأوامر", "معمل تطبيقي مصغّر"],
    en: ["AI foundations", "Prompt engineering", "A focused applied lab"],
  },
  career: {
    ar: ["تحليل السيرة الذاتية", "سد فجوات المهارات", "الاستعداد للمقابلات"],
    en: ["CV and ATS analysis", "Close skill gaps", "Interview readiness"],
  },
  builder: {
    ar: ["أساسيات الأتمتة", "بناء تدفق عمل", "مشروع قابل للنشر"],
    en: ["Automation foundations", "Build a workflow", "Ship a portfolio project"],
  },
};

function rgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function Concept1Client({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const reducedMotion = useReducedMotion() ?? false;
  const refinerRef = useRef<HTMLElement>(null);
  const [selectedPortalId, setSelectedPortalId] = useState(PORTALS[0].id);
  const [selectedGoal, setSelectedGoal] = useState<Goal["id"]>("beginner");

  const selectedPortal = useMemo(
    () => PORTALS.find((portal) => portal.id === selectedPortalId) ?? PORTALS[0],
    [selectedPortalId]
  );
  const selectedGoalData = GOALS.find((goal) => goal.id === selectedGoal) ?? GOALS[0];
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const plan = isAr ? WEEK_PLANS[selectedGoal].ar : WEEK_PLANS[selectedGoal].en;

  const selectGoal = (goal: Goal) => {
    setSelectedGoal(goal.id);
    setSelectedPortalId(goal.portalId);
  };

  const scrollToRefiner = () => {
    refinerRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const panelMotion = {
    initial: { opacity: 0, x: reducedMotion ? 0 : isAr ? -28 : 28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reducedMotion ? 0 : isAr ? 28 : -28 },
    transition: { duration: reducedMotion ? 0.01 : 0.28, ease: "easeOut" as const },
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip pb-40"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, rgba(142,213,255,0.08), transparent 34%), var(--color-background)",
        color: "var(--color-on-surface)",
      }}
    >
      <PreviewHeader
        locale={locale}
        conceptNumber={1}
        conceptName={isAr ? "مركز القيادة" : "AI Command Center"}
      />

      <main className="mx-auto w-full max-w-[1240px] px-3 py-5 sm:px-6 sm:py-8">
        <section
          aria-labelledby="command-center-title"
          className="overflow-hidden rounded-2xl border shadow-2xl sm:rounded-[1.75rem]"
          style={{
            borderColor: "var(--color-outline-variant)",
            background: "rgba(10, 12, 17, 0.88)",
            boxShadow: `0 26px 90px ${rgba(selectedPortal.color, 0.09)}`,
          }}
        >
          <header
            className="flex flex-col gap-4 border-b px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="grid size-10 shrink-0 place-items-center rounded-xl"
                style={{
                  color: "var(--color-primary)",
                  background: "rgba(142,213,255,0.1)",
                  border: "1px solid rgba(142,213,255,0.2)",
                }}
              >
                <Gauge size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
                  NexaLearn OS
                </p>
                <p className="truncate text-sm text-[color:var(--color-on-surface-variant)]">
                  {isAr ? "مركز قيادة منظومة التعلم" : "Learning ecosystem command center"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {[
                [isAr ? "البوابات" : "Portals", "6 / 6", "#4ade80"],
                [isAr ? "المحتوى" : "Content", "1,054", "#8ed5ff"],
                [isAr ? "المرشد" : "Mentor", isAr ? "نشط" : "Active", "#d0bcff"],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border px-3 py-2"
                  style={{
                    borderColor: "var(--color-outline-variant)",
                    background: "rgba(255,255,255,0.025)",
                  }}
                >
                  <p className="truncate text-[10px] text-[color:var(--color-outline)]">{label}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold" style={{ color }}>
                    <CircleDot size={10} aria-hidden="true" />
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </header>

          <div className="grid lg:grid-cols-[minmax(250px,0.36fr)_minmax(0,1fr)]">
            <aside
              aria-label={isAr ? "بوابات التعلم" : "Learning portals"}
              className="border-b p-3 lg:border-b-0 lg:border-e lg:p-4"
              style={{ borderColor: "var(--color-outline-variant)" }}
            >
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-outline)]">
                  {isAr ? "حالة البوابات" : "Portal status"}
                </p>
                <span className="text-[10px] text-emerald-400">
                  {isAr ? "الكل متاح" : "All online"}
                </span>
              </div>

              <div className="flex snap-x gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible">
                {PORTALS.map((portal) => {
                  const active = portal.id === selectedPortal.id;
                  const Icon = portal.Icon;

                  return (
                    <button
                      key={portal.id}
                      type="button"
                      onClick={() => setSelectedPortalId(portal.id)}
                      aria-pressed={active}
                      className="group min-w-[220px] snap-start rounded-xl border p-3 text-start outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] lg:min-w-0"
                      style={{
                        borderColor: active ? rgba(portal.color, 0.45) : "var(--color-outline-variant)",
                        background: active ? rgba(portal.color, 0.09) : "rgba(255,255,255,0.018)",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-lg"
                          style={{
                            color: portal.color,
                            background: rgba(portal.color, active ? 0.16 : 0.08),
                          }}
                        >
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">
                            {isAr ? portal.titleAr : portal.titleEn}
                          </span>
                          <span className="mt-1 flex items-center justify-between gap-3 text-[10px]">
                            <span style={{ color: active ? portal.color : "var(--color-outline)" }}>
                              {portal.metric}
                            </span>
                            <span className="font-mono" style={{ color: portal.color }}>
                              {portal.progress}%
                            </span>
                          </span>
                        </span>
                      </span>
                      <span
                        className="mt-2 block h-1 overflow-hidden rounded-full"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <motion.span
                          className="block h-full rounded-full"
                          initial={false}
                          animate={{ scaleX: portal.progress / 100 }}
                          transition={{ duration: reducedMotion ? 0 : 0.35 }}
                          style={{
                            background: portal.color,
                            transformOrigin: "inline-start",
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="relative min-w-0 p-4 sm:p-6 lg:p-8">
              <div
                className="pointer-events-none absolute inset-0 transition-colors"
                style={{
                  background: `radial-gradient(circle at ${isAr ? "80%" : "20%"} 20%, ${rgba(
                    selectedPortal.color,
                    0.12
                  )}, transparent 42%)`,
                }}
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedPortal.id}
                  {...panelMotion}
                  className="relative z-10 flex min-h-[490px] flex-col"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
                      style={{
                        color: selectedPortal.color,
                        borderColor: rgba(selectedPortal.color, 0.25),
                        background: rgba(selectedPortal.color, 0.08),
                      }}
                    >
                      <Sparkles size={13} aria-hidden="true" />
                      {isAr ? selectedPortal.eyebrowAr : selectedPortal.eyebrowEn}
                    </span>
                    <span className="font-mono text-[10px] text-[color:var(--color-outline)]">
                      {isAr ? "تم التحديث الآن" : "Updated just now"}
                    </span>
                  </div>

                  <div className="my-auto py-8">
                    <p className="mb-3 text-sm text-[color:var(--color-on-surface-variant)]">
                      {isAr ? "من أين يجب أن تبدأ؟" : "Where should you start?"}
                    </p>
                    <h1
                      id="command-center-title"
                      className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                    >
                      {isAr ? selectedPortal.titleAr : selectedPortal.titleEn}
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--color-on-surface-variant)] sm:text-base">
                      {isAr ? selectedPortal.descriptionAr : selectedPortal.descriptionEn}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <div
                        className="rounded-2xl border p-4"
                        style={{
                          borderColor: rgba(selectedPortal.color, 0.2),
                          background: rgba(selectedPortal.color, 0.055),
                        }}
                      >
                        <p className="text-[11px] text-[color:var(--color-outline)]">
                          {isAr ? "خطوتك التالية" : "Your next step"}
                        </p>
                        <p className="mt-1 font-semibold">
                          {isAr ? selectedPortal.nextAr : selectedPortal.nextEn}
                        </p>
                      </div>
                      <div
                        className="rounded-2xl border p-4"
                        style={{
                          borderColor: "var(--color-outline-variant)",
                          background: "rgba(255,255,255,0.025)",
                        }}
                      >
                        <p className="text-[11px] text-[color:var(--color-outline)]">
                          {isAr ? "تقدير المرشد الذكي" : "AI Mentor estimate"}
                        </p>
                        <p className="mt-1 font-semibold">
                          {isAr ? "3 أسابيع لبناء الأساس" : "3 weeks to build foundations"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/${locale}${selectedPortal.href}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
                        style={{
                          color: "#071016",
                          background: selectedPortal.color,
                        }}
                      >
                        <Play size={16} fill="currentColor" aria-hidden="true" />
                        {isAr ? "ابدأ هذا المسار" : "Start this path"}
                        <Arrow size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={scrollToRefiner}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
                        style={{
                          borderColor: "var(--color-outline-variant)",
                          color: "var(--color-on-surface-variant)",
                        }}
                      >
                        {isAr ? "خصّص التوصية" : "Refine recommendation"}
                        <ChevronDown size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-3 rounded-2xl border p-4"
                    style={{
                      borderColor: "rgba(208,188,255,0.18)",
                      background: "rgba(208,188,255,0.055)",
                    }}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-300/10 text-violet-200">
                      <Bot size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-violet-200">
                        {isAr ? "توصية المرشد الذكي" : "AI Mentor recommendation"}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[color:var(--color-on-surface-variant)] sm:text-sm">
                        {isAr
                          ? "ابدأ بمسار واحد واضح، ثم أضف بوابة ثانية بعد إكمال أول معمل. سأتابع تقدمك وأعدّل الخطة."
                          : "Begin with one clear path, then add a second portal after your first lab. I will track progress and adapt the plan."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section ref={refinerRef} aria-labelledby="refiner-title" className="scroll-mt-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
              {isAr ? "خصّص نقطة البداية" : "Refine your starting point"}
            </p>
            <h2 id="refiner-title" className="mt-3 text-2xl font-bold sm:text-4xl">
              {isAr ? "ما الذي تريد تحقيقه الآن؟" : "What do you want to achieve next?"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--color-on-surface-variant)]">
              {isAr
                ? "اختر هدفاً واحداً وسيعيد مركز القيادة ترتيب المسار المقترح فوراً."
                : "Choose one goal and the command center will instantly adapt your recommended path."}
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {GOALS.map((goal) => {
              const active = selectedGoal === goal.id;
              const Icon = goal.Icon;

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => selectGoal(goal)}
                  aria-pressed={active}
                  className="relative rounded-2xl border p-5 text-start outline-none transition-colors hover:bg-white/[0.035] focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
                  style={{
                    borderColor: active ? "rgba(142,213,255,0.45)" : "var(--color-outline-variant)",
                    background: active ? "rgba(142,213,255,0.07)" : "var(--color-surface)",
                  }}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-sky-300/10 text-[color:var(--color-primary)]">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <span
                      className="grid size-6 place-items-center rounded-full border"
                      style={{
                        borderColor: active ? "var(--color-primary)" : "var(--color-outline-variant)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {active && <Check size={14} strokeWidth={3} aria-hidden="true" />}
                    </span>
                  </span>
                  <span className="mt-5 block font-bold">{isAr ? goal.labelAr : goal.labelEn}</span>
                  <span className="mt-1 block text-xs leading-5 text-[color:var(--color-on-surface-variant)]">
                    {isAr ? goal.detailAr : goal.detailEn}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedGoal}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.24 }}
              className="mt-5 grid overflow-hidden rounded-2xl border lg:grid-cols-[0.7fr_1fr]"
              style={{
                borderColor: "var(--color-outline-variant)",
                background: "var(--color-surface)",
              }}
            >
              <div className="border-b p-5 lg:border-b-0 lg:border-e sm:p-6" style={{ borderColor: "var(--color-outline-variant)" }}>
                <p className="text-xs text-[color:var(--color-outline)]">
                  {isAr ? "المسار الأنسب لهدفك" : "Best path for your goal"}
                </p>
                <p className="mt-2 text-xl font-bold">
                  {isAr
                    ? PORTALS.find((portal) => portal.id === selectedGoalData.portalId)?.titleAr
                    : PORTALS.find((portal) => portal.id === selectedGoalData.portalId)?.titleEn}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPortalId(selectedGoalData.portalId);
                    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--color-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
                >
                  {isAr ? "عرضه في مركز القيادة" : "Open in command center"}
                  <Arrow size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-outline)]">
                  {isAr ? "خطة أول ثلاثة أسابيع" : "Your first three weeks"}
                </p>
                <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                  {plan.map((item, index) => (
                    <li key={item} className="flex gap-3 sm:block">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sky-300/10 font-mono text-xs font-bold text-[color:var(--color-primary)]">
                        {index + 1}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[color:var(--color-on-surface-variant)] sm:mt-3">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section aria-labelledby="outcomes-title" className="pb-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-tertiary)]">
                {isAr ? "منظومة واحدة" : "One connected ecosystem"}
              </p>
              <h2 id="outcomes-title" className="mt-2 text-2xl font-bold sm:text-3xl">
                {isAr ? "كل ما تحتاجه للتحرك بثقة" : "Everything you need to move with confidence"}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-[color:var(--color-on-surface-variant)]">
              {isAr
                ? "تعلّم، طبّق، اختبر مهاراتك، ثم حوّل تقدّمك إلى فرصة مهنية."
                : "Learn, apply, test your skills, then turn progress into career opportunity."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {OUTCOMES.map(({ value, labelAr, labelEn, Icon }) => (
              <div
                key={labelEn}
                className="rounded-2xl border p-4 sm:p-5"
                style={{
                  borderColor: "var(--color-outline-variant)",
                  background: "var(--color-surface)",
                }}
              >
                <Icon size={19} className="text-[color:var(--color-primary)]" aria-hidden="true" />
                <p className="mt-5 font-mono text-2xl font-extrabold sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs leading-5 text-[color:var(--color-on-surface-variant)]">
                  {isAr ? labelAr : labelEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-14 z-40 p-2 sm:bottom-12 sm:p-4">
        <div
          className="mx-auto flex max-w-4xl flex-col items-stretch gap-3 rounded-2xl border p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5"
          style={{
            borderColor: "rgba(142,213,255,0.25)",
            background: "rgba(10,12,17,0.92)",
            boxShadow: "0 -10px 50px rgba(0,0,0,0.3)",
          }}
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">
              {isAr ? "ابدأ مجاناً — حساب واحد لكل البوابات" : "Start free — one account for every portal"}
            </p>
            <p className="mt-0.5 hidden text-xs text-[color:var(--color-on-surface-variant)] sm:block">
              {isAr ? "لا تحتاج إلى بطاقة ائتمان" : "No credit card required"}
            </p>
          </div>
          <Link
            href={`/${locale}/register`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-extrabold text-slate-950 outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white"
          >
            {isAr ? "أنشئ حسابك" : "Create your account"}
            <Arrow size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ConceptBadge
        number={1}
        name={isAr ? "مركز القيادة" : "AI Command Center"}
        locale={locale}
      />
    </div>
  );
}
