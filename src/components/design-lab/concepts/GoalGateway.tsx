"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Check,
  Languages,
  Lightbulb,
  Route,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Goal = {
  id: string;
  icon: LucideIcon;
  accent: string;
  href: string;
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  actionAr: string;
  actionEn: string;
  detailAr: string;
  detailEn: string;
};

const GOALS: Goal[] = [
  {
    id: "learn-ai",
    icon: Sparkles,
    accent: "#8ed5ff",
    href: "/ai-academy",
    eyebrowAr: "تعلم منظم",
    eyebrowEn: "Structured learning",
    titleAr: "أتقن الذكاء الاصطناعي",
    titleEn: "Master AI",
    descriptionAr: "ابدأ من الأساسيات وتدرج عبر دورات ومسارات عملية.",
    descriptionEn: "Start with the fundamentals and progress through practical courses.",
    actionAr: "دخول أكاديمية AI",
    actionEn: "Enter AI Academy",
    detailAr: "دورات، أدوات، برومبتات، واختبارات في مكان واحد.",
    detailEn: "Courses, tools, prompts, and assessments in one place.",
  },
  {
    id: "make-roadmap",
    icon: Route,
    accent: "#d0bcff",
    href: "/roadmap-generator",
    eyebrowAr: "خطة شخصية",
    eyebrowEn: "Personal plan",
    titleAr: "ابنِ مسار تعلمي",
    titleEn: "Build my roadmap",
    descriptionAr: "حوّل هدفك ومستواك الحالي إلى خطوات تعلم واضحة.",
    descriptionEn: "Turn your goal and current level into clear learning steps.",
    actionAr: "إنشاء خطة التعلم",
    actionEn: "Create my roadmap",
    detailAr: "مولّد ذكي يرتب المهارات والمصادر حسب أولوياتك.",
    detailEn: "An intelligent generator that prioritizes skills and resources.",
  },
  {
    id: "build-project",
    icon: Lightbulb,
    accent: "#fbbf24",
    href: "/project-generator",
    eyebrowAr: "تعلم بالتطبيق",
    eyebrowEn: "Learn by building",
    titleAr: "ابنِ مشروعاً حقيقياً",
    titleEn: "Build a real project",
    descriptionAr: "احصل على فكرة مناسبة لمستواك وخطة تنفيذ خطوة بخطوة.",
    descriptionEn: "Get a level-matched idea and a step-by-step build plan.",
    actionAr: "توليد مشروع",
    actionEn: "Generate a project",
    detailAr: "من الفكرة إلى المتطلبات والتقنيات ومراحل التنفيذ.",
    detailEn: "From idea to requirements, tech choices, and build milestones.",
  },
  {
    id: "career",
    icon: BriefcaseBusiness,
    accent: "#fb7185",
    href: "/career",
    eyebrowAr: "خطوتك المهنية",
    eyebrowEn: "Career momentum",
    titleAr: "طوّر مساري المهني",
    titleEn: "Advance my career",
    descriptionAr: "حسّن سيرتك، استعد للمقابلات، واكتشف فرصك التالية.",
    descriptionEn: "Improve your CV, prepare for interviews, and find your next move.",
    actionAr: "فتح البوابة المهنية",
    actionEn: "Open Career Hub",
    detailAr: "أدوات عملية للسيرة الذاتية، المقابلات، والبحث عن عمل.",
    detailEn: "Practical tools for CVs, interviews, and job discovery.",
  },
  {
    id: "language",
    icon: Languages,
    accent: "#4ade80",
    href: "/language",
    eyebrowAr: "اعرف مستواك",
    eyebrowEn: "Know your level",
    titleAr: "قيّم لغتي الإنجليزية",
    titleEn: "Assess my English",
    descriptionAr: "اختبر مستواك واحصل على نتيجة وتوصيات واضحة.",
    descriptionEn: "Test your level and receive a clear result with recommendations.",
    actionAr: "بدء تقييم اللغة",
    actionEn: "Start language assessment",
    detailAr: "تقييم متدرج يساعدك على اختيار نقطة البداية الصحيحة.",
    detailEn: "A progressive assessment that finds your right starting point.",
  },
  {
    id: "automation",
    icon: Bot,
    accent: "#22d3ee",
    href: "/automation",
    eyebrowAr: "وفّر وقتك",
    eyebrowEn: "Work smarter",
    titleAr: "أتعلّم الأتمتة",
    titleEn: "Learn automation",
    descriptionAr: "حوّل الأعمال المتكررة إلى تدفقات عمل ذكية.",
    descriptionEn: "Turn repetitive work into useful automated workflows.",
    actionAr: "استكشاف الأتمتة",
    actionEn: "Explore automation",
    detailAr: "مسارات وقوالب ومعامل لتطبيق الأتمتة في العمل.",
    detailEn: "Paths, templates, and labs for real workplace automation.",
  },
];

const copy = {
  ar: {
    kicker: "لا تبدأ من قائمة دورات",
    title: "ابدأ من هدفك.",
    intro: "اختر النتيجة التي تريد الوصول إليها، وسنأخذك مباشرة إلى أفضل نقطة بداية.",
    prompt: "ماذا تريد أن تحقق اليوم؟",
    selection: "اختيارك",
    recommendation: "نقطة البداية المقترحة",
    change: "يمكنك تغيير اختيارك في أي وقت.",
    browse: "أو تصفح كل الدورات",
    explore: "استكشف بحرية",
  },
  en: {
    kicker: "Do not start with a course list",
    title: "Start with your goal.",
    intro: "Choose the outcome you want, and we will take you to the best place to begin.",
    prompt: "What do you want to achieve today?",
    selection: "Your choice",
    recommendation: "Recommended starting point",
    change: "You can change your selection at any time.",
    browse: "Or browse every course",
    explore: "Explore freely",
  },
};

function localized(locale: string, path: string) {
  return `/${locale}${path}`;
}

export default function GoalGateway({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const text = isAr ? copy.ar : copy.en;
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(GOALS[0].id);
  const selected = GOALS.find((goal) => goal.id === selectedId) ?? GOALS[0];
  const DirectionArrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[#07111f] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 12% 12%, rgba(142,213,255,.16), transparent 30%), radial-gradient(circle at 88% 78%, rgba(208,188,255,.13), transparent 34%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 82%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <Link
            href={localized(locale, "/")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ed5ff]"
          >
            <BookOpen aria-hidden="true" size={17} />
            <span>Darhous</span>
          </Link>
          <Link
            href={localized(locale, "/courses")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ed5ff]"
          >
            {text.explore}
            <DirectionArrow aria-hidden="true" size={16} />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.72fr)] lg:gap-14 lg:py-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8ed5ff]">
                {text.kicker}
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                {text.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {text.intro}
              </p>
            </motion.div>

            <fieldset className="mt-9">
              <legend className="mb-4 text-sm font-semibold text-white/75">
                {text.prompt}
              </legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GOALS.map((goal, index) => {
                  const Icon = goal.icon;
                  const isSelected = goal.id === selected.id;

                  return (
                    <motion.button
                      key={goal.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(goal.id)}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.32,
                        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.04,
                      }}
                      className="group relative min-h-[116px] cursor-pointer overflow-hidden rounded-2xl border p-4 text-start transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ed5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
                      style={{
                        borderColor: isSelected ? goal.accent : "rgba(255,255,255,.1)",
                        background: isSelected
                          ? `linear-gradient(135deg, ${goal.accent}20, rgba(255,255,255,.055))`
                          : "rgba(255,255,255,.035)",
                        boxShadow: isSelected ? `0 16px 50px ${goal.accent}12` : "none",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
                          style={{
                            color: goal.accent,
                            borderColor: `${goal.accent}45`,
                            backgroundColor: `${goal.accent}14`,
                          }}
                        >
                          <Icon aria-hidden="true" size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className="block text-[11px] font-bold uppercase tracking-[0.12em]"
                            style={{ color: goal.accent }}
                          >
                            {isAr ? goal.eyebrowAr : goal.eyebrowEn}
                          </span>
                          <span className="mt-1 block text-base font-bold text-white">
                            {isAr ? goal.titleAr : goal.titleEn}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-slate-400">
                            {isAr ? goal.descriptionAr : goal.descriptionEn}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center rounded-full border transition-opacity"
                          style={{
                            color: goal.accent,
                            borderColor: isSelected ? goal.accent : "rgba(255,255,255,.14)",
                            opacity: isSelected ? 1 : 0.45,
                          }}
                        >
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <aside className="lg:sticky lg:top-8">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${selected.accent}, transparent)`,
                }}
              />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                {text.selection}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : isAr ? -14 : 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : isAr ? 14 : -14 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                >
                  <div
                    className="mt-5 flex size-14 items-center justify-center rounded-2xl border"
                    style={{
                      color: selected.accent,
                      borderColor: `${selected.accent}45`,
                      backgroundColor: `${selected.accent}16`,
                    }}
                  >
                    <selected.icon aria-hidden="true" size={27} />
                  </div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.13em] text-white/45">
                    {text.recommendation}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.025em] sm:text-4xl">
                    {isAr ? selected.titleAr : selected.titleEn}
                  </h2>
                  <p className="mt-4 min-h-14 text-sm leading-6 text-slate-300 sm:text-base">
                    {isAr ? selected.detailAr : selected.detailEn}
                  </p>

                  <Link
                    href={localized(locale, selected.href)}
                    className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold text-[#07111f] transition-[filter,box-shadow] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
                    style={{
                      backgroundColor: selected.accent,
                      boxShadow: `0 16px 36px ${selected.accent}2b`,
                    }}
                  >
                    {isAr ? selected.actionAr : selected.actionEn}
                    <DirectionArrow aria-hidden="true" size={18} />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
                <span>{text.change}</span>
                <Link
                  href={localized(locale, "/courses")}
                  className="font-semibold text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ed5ff]"
                >
                  {text.browse}
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
