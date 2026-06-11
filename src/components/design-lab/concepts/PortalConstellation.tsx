"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cpu,
  FileCheck2,
  Languages,
  Orbit,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import ConceptBadge from "@/components/design-lab/shared/ConceptBadge";
import PreviewHeader from "@/components/design-lab/shared/PreviewHeader";

type Portal = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  metricAr: string;
  metricEn: string;
  href: string;
  color: string;
  position: CSSProperties;
  icon: LucideIcon;
};

const PORTALS: Portal[] = [
  {
    id: "ai",
    titleAr: "أكاديمية الذكاء الاصطناعي",
    titleEn: "AI Academy",
    descriptionAr: "أدوات الذكاء الاصطناعي وهندسة الأوامر والمعامل الذكية.",
    descriptionEn: "AI tools, prompt engineering, and intelligent labs.",
    metricAr: "18 دورة",
    metricEn: "18 courses",
    href: "/ai-academy",
    color: "#8ee7ff",
    position: { insetInlineStart: "5%", top: "13%" },
    icon: BrainCircuit,
  },
  {
    id: "language",
    titleAr: "بوابة اللغة",
    titleEn: "Language Portal",
    descriptionAr: "اختبار مستوى اللغة الإنجليزية وتحليل المهارات.",
    descriptionEn: "English assessment and detailed skill analysis.",
    metricAr: "اختبار متكامل",
    metricEn: "Full assessment",
    href: "/language",
    color: "#cbb8ff",
    position: { insetInlineEnd: "4%", top: "13%" },
    icon: Languages,
  },
  {
    id: "exams",
    titleAr: "الاختبارات الرقمية",
    titleEn: "Digital Exams",
    descriptionAr: "تدريب منظم في التحول الرقمي والأمن السيبراني.",
    descriptionEn: "Structured practice in digital skills and cybersecurity.",
    metricAr: "+902 سؤال",
    metricEn: "902+ questions",
    href: "/digital-exams",
    color: "#67f4c7",
    position: { insetInlineStart: "0%", top: "48%" },
    icon: FileCheck2,
  },
  {
    id: "career",
    titleAr: "البوابة المهنية",
    titleEn: "Career Hub",
    descriptionAr: "تحليل السيرة الذاتية، محاكاة المقابلات، وفرص العمل.",
    descriptionEn: "CV analysis, interview practice, and job discovery.",
    metricAr: "محلل ATS ذكي",
    metricEn: "AI ATS analyzer",
    href: "/career",
    color: "#ffc568",
    position: { insetInlineEnd: "0%", top: "48%" },
    icon: BriefcaseBusiness,
  },
  {
    id: "automation",
    titleAr: "أكاديمية الأتمتة",
    titleEn: "Automation Academy",
    descriptionAr: "وصفات ومعامل لبناء تدفقات عمل عملية.",
    descriptionEn: "Recipes and labs for practical automated workflows.",
    metricAr: "30 وصفة",
    metricEn: "30 recipes",
    href: "/automation",
    color: "#ff8fbd",
    position: { insetInlineStart: "8%", bottom: "5%" },
    icon: Workflow,
  },
  {
    id: "iot",
    titleAr: "مختبر إنترنت الأشياء",
    titleEn: "IoT Lab",
    descriptionAr: "تعلم Arduino عبر الدروس والمشروعات والمحاكاة.",
    descriptionEn: "Learn Arduino through lessons, projects, and simulation.",
    metricAr: "72 مشروعاً",
    metricEn: "72 projects",
    href: "/iot-lab",
    color: "#ff9f6e",
    position: { insetInlineEnd: "8%", bottom: "5%" },
    icon: Cpu,
  },
];

const STATS = [
  { value: "6", ar: "بوابات متخصصة", en: "specialized portals" },
  { value: "62", ar: "أداة ذكية", en: "AI tools" },
  { value: "902+", ar: "سؤال تدريبي", en: "practice questions" },
  { value: "72", ar: "مشروع Arduino", en: "Arduino projects" },
];

function PortalCard({
  portal,
  locale,
  active,
  onActivate,
}: {
  portal: Portal;
  locale: string;
  active: boolean;
  onActivate: () => void;
}) {
  const isAr = locale === "ar";
  const Icon = portal.icon;

  return (
    <motion.div
      className="portal-node"
      style={portal.position}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link
        href={`/${locale}${portal.href}`}
        onFocus={onActivate}
        onMouseEnter={onActivate}
        aria-label={`${isAr ? portal.titleAr : portal.titleEn}: ${
          isAr ? portal.descriptionAr : portal.descriptionEn
        }`}
        className="group block rounded-[1.35rem] p-4 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-white/80"
        style={{
          background: active ? `${portal.color}18` : "rgba(9, 16, 29, 0.78)",
          border: `1px solid ${active ? `${portal.color}78` : "rgba(255,255,255,0.12)"}`,
          boxShadow: active
            ? `0 18px 50px rgba(0,0,0,.32), 0 0 34px ${portal.color}1f`
            : "0 14px 40px rgba(0,0,0,.24)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl"
            style={{
              color: portal.color,
              background: `${portal.color}14`,
              border: `1px solid ${portal.color}32`,
            }}
          >
            <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-start justify-between gap-2">
              <span className="block text-sm font-semibold leading-snug text-white">
                {isAr ? portal.titleAr : portal.titleEn}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-0.5 shrink-0 opacity-45 transition-opacity group-hover:opacity-100"
                size={15}
              />
            </span>
            <span className="mt-1 block text-[11px] leading-relaxed text-slate-400">
              {isAr ? portal.descriptionAr : portal.descriptionEn}
            </span>
            <span
              className="mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
              style={{ color: portal.color, background: `${portal.color}12` }}
            >
              {isAr ? portal.metricAr : portal.metricEn}
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortalConstellation({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const reduceMotion = useReducedMotion() ?? false;
  const [activePortal, setActivePortal] = useState("ai");
  const active = PORTALS.find((portal) => portal.id === activePortal) ?? PORTALS[0];
  const ActiveIcon = active.icon;

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-[#050912] text-white"
      style={{
        fontFamily: isAr
          ? "'Cairo', 'IBM Plex Sans Arabic', system-ui, sans-serif"
          : "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <PreviewHeader
        locale={locale}
        conceptNumber={4}
        conceptName={isAr ? "كوكبة البوابات" : "Portal Constellation"}
      />

      <section className="relative isolate mx-auto min-h-[calc(100vh-33px)] max-w-[1500px] px-5 pb-12 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(58,134,255,.17), transparent 25%), radial-gradient(circle at 18% 16%, rgba(126,249,218,.08), transparent 22%), radial-gradient(circle at 88% 76%, rgba(203,184,255,.09), transparent 24%)",
          }}
        />
        <div aria-hidden="true" className="stars pointer-events-none absolute inset-0 -z-10 opacity-60" />

        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/15 bg-sky-200/[0.06] px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-sky-100/75 uppercase">
            <Orbit aria-hidden="true" size={14} />
            <span>{isAr ? "منظومة تعلم واحدة" : "One learning universe"}</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {isAr ? "كل مهارة تفتح بوابة" : "Every skill opens a portal"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-slate-300 sm:text-base">
            {isAr
              ? "رحلة تعليمية مترابطة تجمع الذكاء الاصطناعي واللغة والمهارات الرقمية والمسار المهني والأتمتة وإنترنت الأشياء."
              : "A connected learning journey across AI, language, digital skills, career growth, automation, and the Internet of Things."}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/register`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Sparkles aria-hidden="true" size={16} />
              {isAr ? "ابدأ رحلتك مجاناً" : "Start your journey free"}
            </Link>
            <Link
              href={`/${locale}/mentor`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Bot aria-hidden="true" size={16} />
              {isAr ? "اسأل المرشد الذكي" : "Ask the AI mentor"}
            </Link>
          </div>
        </motion.header>

        <section
          aria-label={isAr ? "بوابات التعلم" : "Learning portals"}
          className="constellation relative mx-auto mt-12 h-[700px] max-w-[1240px] lg:mt-8"
        >
          <div aria-hidden="true" className="orbit-shell absolute left-1/2 top-1/2 hidden size-[490px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100/10 lg:block">
            <div className="absolute inset-12 rounded-full border border-dashed border-violet-200/10" />
            <div className="absolute inset-[7.5rem] rounded-full border border-sky-200/[0.07]" />
          </div>

          <div
            className="core absolute left-1/2 top-1/2 z-10 hidden size-56 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full p-4 text-center lg:grid"
            style={{
              background:
                "radial-gradient(circle at 40% 30%, rgba(142,231,255,.24), rgba(17,31,55,.93) 48%, rgba(5,9,18,.98) 72%)",
              border: `1px solid ${active.color}55`,
              boxShadow: `0 0 80px ${active.color}22, inset 0 0 35px rgba(255,255,255,.04)`,
            }}
          >
            <div>
              <span className="mx-auto mb-3 grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-sky-100">
                <ActiveIcon aria-hidden="true" size={20} />
              </span>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-100/55 uppercase">
                {isAr ? active.titleEn : active.titleAr}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{isAr ? active.titleAr : active.titleEn}</h2>
              <p className="mx-auto mt-2 max-w-[18ch] text-[11px] leading-5 text-slate-400">
                {isAr ? active.metricAr : active.metricEn}
              </p>
            </div>
          </div>

          <div className="portal-grid">
            {PORTALS.map((portal, index) => (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.12 + index * 0.055,
                  duration: reduceMotion ? 0.01 : 0.38,
                  ease: "easeOut",
                }}
              >
                <PortalCard
                  portal={portal}
                  locale={locale}
                  active={activePortal === portal.id}
                  onActivate={() => setActivePortal(portal.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.en} className="bg-[#080e1a]/95 px-4 py-5 text-center">
              <strong className="block text-xl font-semibold text-sky-100 sm:text-2xl">{stat.value}</strong>
              <span className="mt-1 block text-[11px] text-slate-500">{isAr ? stat.ar : stat.en}</span>
            </div>
          ))}
        </section>
      </section>

      <ConceptBadge
        number={4}
        name={isAr ? "كوكبة البوابات" : "Portal Constellation"}
        locale={locale}
      />

      <style jsx>{`
        .stars {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.46) 0 1px, transparent 1.2px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, black, transparent 82%);
        }

        .portal-grid {
          display: contents;
        }

        .portal-node {
          position: absolute;
          z-index: 20;
          width: min(290px, 25vw);
        }

        .orbit-shell {
          animation: constellation-drift 28s ease-in-out infinite alternate;
        }

        @keyframes constellation-drift {
          from {
            transform: translate(-50%, -50%) rotate(-2deg) scale(0.99);
          }
          to {
            transform: translate(-50%, -50%) rotate(2deg) scale(1.01);
          }
        }

        @media (max-width: 1023px) {
          .constellation {
            height: auto;
          }

          .portal-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.85rem;
          }

          .portal-node {
            position: static;
            width: auto;
          }
        }

        @media (max-width: 639px) {
          .portal-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-shell {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
