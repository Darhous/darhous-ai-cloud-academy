"use client";

import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  FileCheck2,
  Gauge,
  Languages,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import ConceptBadge from "@/components/design-lab/shared/ConceptBadge";
import PreviewHeader from "@/components/design-lab/shared/PreviewHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { STATS } from "@/lib/constants";
import { availablePortals, type Portal } from "@/config/portals";

type SilentAuthorityProps = {
  locale: string;
};

const portalIcons: Record<string, ComponentType<{ className?: string }>> = {
  "ai-academy": Bot,
  language: Languages,
  "digital-exams": FileCheck2,
  career: BriefcaseBusiness,
  automation: Workflow,
  "iot-lab": CircuitBoard,
  "nano-banana": Sparkles,
};

const trustPoints = [
  {
    Icon: ShieldCheck,
    ar: "محتوى عملي موثوق",
    en: "Trusted practical content",
  },
  {
    Icon: Award,
    ar: "نتائج وشهادات موثقة",
    en: "Verified results and certificates",
  },
  {
    Icon: Network,
    ar: "منظومة تعلم عربية متكاملة",
    en: "One connected Arabic ecosystem",
  },
];

function PortalCard({
  portal,
  locale,
  isAr,
}: {
  portal: Portal;
  locale: string;
  isAr: boolean;
}) {
  const Icon = portalIcons[portal.id] ?? BookOpen;
  const ForwardIcon = isAr ? ChevronLeft : ChevronRight;
  const features = isAr ? portal.features : portal.featuresEn ?? portal.features;

  return (
    <Card
      className="group relative min-h-64 gap-0 overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none ring-1 ring-[#d9d8d2] transition-[background-color,box-shadow] duration-200 hover:bg-white focus-within:bg-white focus-within:shadow-[0_18px_60px_rgba(19,35,31,0.08)] hover:shadow-[0_18px_60px_rgba(19,35,31,0.08)]"
      style={{ "--portal-color": portal.color } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 w-1 origin-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ backgroundColor: portal.color }}
      />

      <CardHeader className="gap-5 px-6 pt-7 pb-0 sm:px-7">
        <div className="flex items-start justify-between gap-5">
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: `${portal.color}4d`,
              color: portal.color,
              backgroundColor: `${portal.color}0d`,
            }}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#68736e]">
            {portal.badgeEn
              ? isAr
                ? portal.badgeAr
                : portal.badgeEn
              : isAr
                ? "متاح"
                : "Available"}
          </span>
        </div>

        <CardTitle className="text-xl font-semibold leading-snug text-[#13231f]">
          {isAr ? portal.titleAr : portal.titleEn}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-6 pt-4 pb-7 sm:px-7">
        <p className="min-h-12 text-sm leading-6 text-[#59645f] opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          {isAr ? portal.descriptionAr : portal.descriptionEn}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#68736e]">
          {features.slice(0, 2).map((feature) => (
            <span key={feature} className="inline-flex items-center gap-1.5">
              <Check
                className="size-3.5"
                aria-hidden="true"
                style={{ color: portal.color }}
              />
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={`/${locale}${portal.href}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-semibold text-[#13231f] outline-none transition-colors duration-200 hover:text-[#8a6a25] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b58b35] focus-visible:ring-offset-4"
          aria-label={`${isAr ? portal.ctaAr : portal.ctaEn}: ${
            isAr ? portal.titleAr : portal.titleEn
          }`}
        >
          {isAr ? portal.ctaAr : portal.ctaEn}
          <ForwardIcon className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default function SilentAuthority({ locale }: SilentAuthorityProps) {
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion() ?? false;
  const stats = (isAr ? STATS.ar : STATS.en).slice(0, 4);
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const entrance = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.15 : 0.3, ease: "easeOut" as const },
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-[#f4f1e9] text-[#13231f]"
      style={{
        fontFamily: isAr
          ? "'Cairo', 'IBM Plex Sans Arabic', sans-serif"
          : "'Geist', 'Inter', sans-serif",
      }}
    >
      <PreviewHeader
        locale={locale}
        conceptNumber={3}
        conceptName={isAr ? "الهيبة الهادئة" : "Silent Authority"}
      />

      <main>
        <section className="relative border-b border-[#cfcec7]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(19,35,31,0.035) 1px, transparent 1px)",
              backgroundSize: "clamp(72px, 9vw, 136px) 100%",
            }}
          />

          <div className="relative mx-auto grid min-h-[calc(100svh-2rem)] max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.42fr)]">
            <div className="flex items-center px-5 py-16 sm:px-9 lg:px-16 lg:py-20 xl:px-24">
              <motion.div {...entrance} className="max-w-4xl">
                <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a25]">
                  <span className="h-px w-10 bg-[#b58b35]" aria-hidden="true" />
                  {isAr
                    ? "NexaLearn by Ahmed Darhous"
                    : "NexaLearn by Ahmed Darhous"}
                </p>

                <h1 className="max-w-[16ch] text-[clamp(2.75rem,7vw,6.75rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#13231f]">
                  {isAr
                    ? "المعرفة العملية، بهدوء يليق بطموحك."
                    : "Practical knowledge. Quietly built for ambition."}
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#4d5a55] sm:text-lg">
                  {isAr
                    ? "منصة عربية تجمع الذكاء الاصطناعي والكلاود واللغة والمهارات المهنية في مسارات واضحة، ومشاريع حقيقية، وأدوات تساعدك على التقدم."
                    : "An Arabic-first platform bringing AI, cloud, language, and career skills into clear paths, real projects, and tools that help you move forward."}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={`/${locale}/register`}
                    className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#13231f] px-6 text-sm font-semibold text-[#f8f5ed] transition-colors duration-200 hover:bg-[#274139] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58b35] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f1e9]"
                  >
                    {isAr ? "ابدأ مسارك مجاناً" : "Start your path free"}
                    <Arrow className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="#portals"
                    className="inline-flex min-h-12 items-center justify-center border border-[#a8aaa4] px-6 text-sm font-semibold text-[#13231f] transition-colors duration-200 hover:border-[#13231f] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58b35] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f1e9]"
                  >
                    {isAr ? "استكشف البوابات" : "Explore the portals"}
                  </Link>
                </div>

                <div className="mt-12 grid max-w-3xl grid-cols-1 gap-4 border-t border-[#cfcec7] pt-6 sm:grid-cols-3">
                  {trustPoints.map(({ Icon, ar, en }) => (
                    <div
                      key={en}
                      className="flex items-center gap-3 text-sm leading-6 text-[#4d5a55]"
                    >
                      <Icon
                        className="size-4 shrink-0 text-[#8a6a25]"
                        aria-hidden="true"
                      />
                      <span>{isAr ? ar : en}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <aside className="border-t border-[#cfcec7] bg-[#13231f] px-5 py-10 text-[#f4f1e9] sm:px-9 lg:flex lg:flex-col lg:justify-end lg:border-t-0 lg:border-s lg:px-10 lg:py-14">
              <div className="mb-auto hidden items-center justify-between text-xs uppercase tracking-[0.18em] text-[#aebbb5] lg:flex">
                <span>{isAr ? "مؤشرات المنصة" : "Platform index"}</span>
                <Gauge className="size-4" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#31443e]">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#13231f] px-4 py-6 sm:px-5">
                    <strong className="block text-3xl font-medium tracking-tight text-[#d6b96f] sm:text-4xl">
                      {stat.value}
                    </strong>
                    <span className="mt-2 block text-xs leading-5 text-[#aebbb5]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[#aebbb5]">
                {isAr
                  ? "محتوى متدرج من الأساسيات حتى التطبيق، مصمم للمتعلمين العرب ويُحدّث باستمرار."
                  : "Structured from fundamentals to application, designed for Arabic learners and continuously refined."}
              </p>
            </aside>
          </div>
        </section>

        <section id="portals" className="scroll-mt-6 border-b border-[#cfcec7]">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-9 lg:px-16 lg:py-24 xl:px-24">
            <div className="grid gap-7 border-b border-[#cfcec7] pb-10 lg:grid-cols-[0.65fr_1fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a25]">
                  {isAr ? "بوابات متخصصة" : "Specialist portals"}
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#13231f] sm:text-5xl">
                  {isAr ? "كل مهارة في مكانها." : "Every skill, in its place."}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#59645f] lg:justify-self-end">
                {isAr
                  ? "اختر المجال الذي يخدم هدفك الآن. كل بوابة تقدم محتوى وأدوات وتجارب تطبيقية مستقلة، ضمن منظومة تعلم واحدة."
                  : "Choose the field that serves your goal now. Each portal offers focused content, tools, and applied experiences inside one learning ecosystem."}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px bg-[#d9d8d2] sm:grid-cols-2 xl:grid-cols-3">
              {availablePortals.map((portal) => (
                <PortalCard
                  key={portal.id}
                  portal={portal}
                  locale={locale}
                  isAr={isAr}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e8e2d4]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-9 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-20 xl:px-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a25]">
                {isAr ? "خطوتك التالية" : "Your next step"}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[#13231f] sm:text-5xl">
                {isAr
                  ? "ابدأ بما تحتاجه اليوم، وابنِ ما تحتاجه غداً."
                  : "Start with what you need today. Build what comes next."}
              </h2>
            </div>
            <Link
              href={`/${locale}/register`}
              className="inline-flex min-h-14 w-fit items-center justify-center gap-3 border border-[#13231f] px-7 text-sm font-semibold text-[#13231f] transition-colors duration-200 hover:bg-[#13231f] hover:text-[#f8f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6a25] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e8e2d4]"
            >
              {isAr ? "أنشئ حسابك المجاني" : "Create your free account"}
              <Arrow className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <ConceptBadge
        number={3}
        name={isAr ? "الهيبة الهادئة" : "Silent Authority"}
        locale={locale}
      />
    </div>
  );
}
