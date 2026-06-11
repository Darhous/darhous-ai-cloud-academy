"use client";

import { useState } from "react";
import Link from "next/link";
import { Button as HeroButton, Input as HeroInput } from "@heroui/react";
import {
  Award,
  Bot,
  CheckCircle2,
  Compass,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/ui/accordion";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { previewPortals, previewStats, journeySteps, platformBenefits } from "../homepage-preview-data";
import PortalPreviewCard from "./PortalPreviewCard";
import { PreviewCTA } from "./PreviewCTA";

export default function PreservationSections({
  locale,
  accent = "#8ed5ff",
}: {
  locale: string;
  accent?: string;
}) {
  const isAr = locale === "ar";
  const [email, setEmail] = useState("");
  const stats = isAr ? previewStats.ar : previewStats.en;
  const steps = isAr ? journeySteps.ar : journeySteps.en;
  const benefits = isAr ? platformBenefits.ar : platformBenefits.en;

  return (
    <div className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" aria-labelledby="portal-coverage">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
            {isAr ? "نظام بيئي واحد، بوابات متخصصة" : "One ecosystem, specialized portals"}
          </p>
          <h2 id="portal-coverage" className="text-3xl font-bold md:text-5xl">
            {isAr ? "اكتشف البوابة المناسبة لخطوتك التالية" : "Find the portal for your next move"}
          </h2>
          <p className="mt-4 max-w-2xl text-white/65">
            {isAr
              ? "تعلم، اختبر، طبّق، وطوّر مسارك المهني من حساب واحد."
              : "Learn, test, apply, and advance your career from one account."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewPortals.map((portal) => (
            <PortalPreviewCard key={portal.id} portal={portal} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-8">
          <div>
            <Compass className="mb-5" style={{ color: accent }} aria-hidden />
            <h2 className="text-3xl font-bold md:text-4xl">
              {isAr ? "مسارك يبدأ بهدف واضح" : "Your path starts with a clear goal"}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/65">
              {isAr
                ? "اختر مستواك وهدفك ووقتك ومجال اهتمامك، ثم دع المرشد يقترح نقطة بداية عملية."
                : "Choose your level, goal, available time, and interest, then let the mentor suggest a practical starting point."}
            </p>
            <div className="mt-7">
              <PreviewCTA locale={locale} primary="mentor" />
            </div>
          </div>
          <BentoGrid className="max-w-none md:auto-rows-[12rem] md:grid-cols-2">
            {steps.map(([number, title, description], index) => (
              <BentoGridItem
                key={number}
                className="border-white/10 bg-[#0d1118] text-white dark:bg-[#0d1118]"
                icon={<span className="font-mono text-xs" style={{ color: accent }}>{number}</span>}
                title={<span className="text-white">{title}</span>}
                description={<span className="text-white/60">{description}</span>}
                header={
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${45 + index * 15}%`, background: `linear-gradient(90deg, ${accent}, transparent)` }}
                  />
                }
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-6 md:p-9">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                  <Bot size={21} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">NexaLearn AI Mentor</p>
                  <p className="text-xs text-emerald-300">{isAr ? "متاح الآن" : "Available now"}</p>
                </div>
              </div>
              <div className="mt-7 space-y-4">
                <p className="ms-auto max-w-md rounded-2xl rounded-ee-sm bg-cyan-300/10 px-4 py-3 text-sm">
                  {isAr ? "ما أفضل نقطة بداية لهدفي؟" : "What is the best starting point for my goal?"}
                </p>
                <p className="max-w-lg rounded-2xl rounded-es-sm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white/70">
                  {isAr
                    ? "سأراجع مستواك ووقتك، ثم أربط أكاديمية AI وبوابة اللغة والأتمتة أو المسار المهني في خطة واحدة قابلة للتنفيذ."
                    : "I will review your level and time, then connect AI Academy, Language, Automation, or Career into one actionable plan."}
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-3xl border border-white/10 bg-[#0c1016] p-6 md:p-9">
            <Award className="mb-5 text-amber-300" aria-hidden />
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? "نتائج قابلة للإثبات" : "Outcomes you can verify"}
            </h2>
            <p className="mt-4 leading-7 text-white/65">
              {isAr
                ? "مشاريع تطبيقية، نتائج اختبارات، وتقارير وشهادات موثقة تدعم ملفك المهني."
                : "Applied projects, exam results, reports, and verified certificates that support your professional profile."}
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4">
              <ShieldCheck className="text-emerald-300" aria-hidden />
              <span className="text-sm">{isAr ? "سطح ثقة وشهادات موثقة" : "Verified certificate and trust surface"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#090c11] p-6 text-center">
                <p className="text-3xl font-bold" style={{ color: accent }}>{stat.value}</p>
                <p className="mt-2 text-xs text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <AnimatedGradientText
              className="text-3xl font-bold md:text-5xl"
              colorFrom={accent}
              colorTo="#d0bcff"
            >
              {isAr ? "لماذا NexaLearn؟" : "Why NexaLearn?"}
            </AnimatedGradientText>
            <p className="mt-4 max-w-xl leading-7 text-white/65">
              {isAr
                ? "منصة عربية تربط المحتوى العملي بالتوجيه الذكي والنتائج المهنية."
                : "An Arabic-first platform connecting practical content, intelligent guidance, and career outcomes."}
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-white/10 bg-white/[0.035] px-5">
            {benefits.map((benefit, index) => (
              <AccordionItem key={benefit} value={`benefit-${index}`}>
                <AccordionTrigger className="text-start text-white">{benefit}</AccordionTrigger>
                <AccordionContent className="text-white/60">
                  {isAr
                    ? "تظهر هذه الميزة داخل التجربة الموحدة للبوابات، المرشد، ولوحة التقدم."
                    : "This capability appears across the unified portal, mentor, and progress experience."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <div
          className="overflow-hidden rounded-[2rem] border border-white/12 p-7 md:p-12"
          style={{ background: `radial-gradient(circle at 20% 0%, ${accent}22, transparent 42%), #0b0e14` }}
        >
          <Sparkles className="mb-5" style={{ color: accent }} aria-hidden />
          <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">
            {isAr ? "ابدأ من هدفك، وليس من قائمة طويلة" : "Start from your goal, not a long catalog"}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/65">
            {isAr
              ? "سجّل مجانًا أو تحدث مع المرشد لتحديد المسار الأنسب."
              : "Register free or talk to the mentor to identify the right route."}
          </p>
          <div className="mt-8">
            <PreviewCTA locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:grid-cols-[1fr_auto] md:p-9">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm" style={{ color: accent }}>
              <Mail size={17} aria-hidden />
              {isAr ? "مجتمع NexaLearn" : "NexaLearn Community"}
            </div>
            <h2 className="text-2xl font-bold">{isAr ? "ابقَ قريبًا من كل جديد" : "Stay close to what is next"}</h2>
            <p className="mt-2 text-sm text-white/60">
              {isAr ? "تحديثات، أدوات، وفرص تعلم جديدة." : "Updates, tools, and new learning opportunities."}
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <HeroInput
              aria-label={isAr ? "البريد الإلكتروني" : "Email address"}
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 flex-1"
            />
            <HeroButton type="submit" className="bg-white text-black">
              {isAr ? "انضم للمجتمع" : "Join community"}
            </HeroButton>
          </form>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 pb-24 text-xs text-white/35 md:px-8">
        <CheckCircle2 size={14} aria-hidden />
        {isAr
          ? "هذه معاينة تصميم داخلية. لا تغيّر الصفحة الرئيسية الإنتاجية."
          : "This is an internal design preview. It does not replace the production homepage."}
        <Link href={`/${locale}/design-lab`} className="ms-auto underline underline-offset-4">
          {isAr ? "العودة للمقارنة" : "Back to comparison"}
        </Link>
      </div>
    </div>
  );
}

