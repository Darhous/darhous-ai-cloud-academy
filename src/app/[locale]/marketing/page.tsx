import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, PenLine, FileBarChart, Megaphone, Workflow, Sparkles } from "lucide-react";
import { marketingTracks } from "@/data/marketing/tracks";
import { countLessons, MARKETING_STAGES } from "@/data/marketing/types";
import PortalPageWrapper from "@/components/ui/PortalPageWrapper";
import PortalIdentityIntro from "@/components/portal/PortalIdentityIntro";
import MarketingCatalog from "@/components/marketing/MarketingCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "NexaLearn للتسويق" : "NexaLearn Marketing Academy",
    description: isAr
      ? "من الصفر إلى التسويق المدعوم بالذكاء الاصطناعي وأنظمة MCP — 16 مسارًا، إعلانات، فانلز، أتمتة، ووكلاء AI."
      : "From zero to AI-powered marketing & MCP systems — 16 tracks: ads, funnels, automation, and AI agents.",
    robots: { index: true },
    openGraph: {
      title: isAr ? "NexaLearn للتسويق" : "NexaLearn Marketing Academy",
      description: isAr
        ? "16 مسار تعلّم، 4 مستويات شهادات، ومساعدو AI و MCP — أكاديمية تسويق متكاملة."
        : "16 learning tracks, 4 certificate levels, and AI + MCP copilots — a complete marketing academy.",
      url: `/${locale}/marketing`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const AI_FEATURES = [
  { icon: Bot, titleAr: "المعلّم الذكي", titleEn: "AI Tutor", descAr: "أسئلة وأجوبة واعية بالدرس", descEn: "Lesson-aware Q&A" },
  { icon: Sparkles, titleAr: "مدرّب التسويق", titleEn: "AI Coach", descAr: "خطة أسبوعية ومساءلة", descEn: "Weekly plan & accountability" },
  { icon: Megaphone, titleAr: "مُراجع الحملات", titleEn: "Campaign Reviewer", descAr: "تقييم وإصلاحات مرتّبة", descEn: "Rubric score + fixes" },
  { icon: PenLine, titleAr: "مساعد الكتابة", titleEn: "Copy Assistant", descAr: "نسخ بأطر مثبتة", descEn: "Framework-guided copy" },
  { icon: FileBarChart, titleAr: "مولّد المحتوى", titleEn: "Content Generator", descAr: "ركيزة + تقويم", descEn: "Pillar → calendar" },
  { icon: Workflow, titleAr: "باني الفانل", titleEn: "Funnel Builder", descAr: "خريطة + صفحات + إيميل", descEn: "Map + pages + email" },
];

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const totalLessons = marketingTracks.reduce((n, t) => n + countLessons(t), 0);
  const totalHours = marketingTracks.reduce((n, t) => n + t.durationHours, 0);

  const stats = [
    { value: `${marketingTracks.length}`, labelAr: "مسار تعلّم", labelEn: "Learning Tracks" },
    { value: `${totalLessons}+`, labelAr: "درس", labelEn: "Lessons" },
    { value: `${totalHours}h`, labelAr: "محتوى", labelEn: "of Content" },
    { value: "4", labelAr: "مستويات شهادات", labelEn: "Certificate Levels" },
  ];

  return (
    <PortalPageWrapper>
      <div className="container-xl py-10 flex flex-col gap-12">
        {/* Hero */}
        <section className="flex flex-col gap-5">
          <span
            className="self-start text-[11px] font-mono px-3 py-1 rounded-full"
            style={{ background: "rgba(236,72,153,0.14)", color: "#ec4899" }}
          >
            {isAr ? "📈 بوابة التسويق" : "📈 Marketing Portal"}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            {isAr ? "أكاديمية NexaLearn للتسويق" : "NexaLearn Marketing Academy"}
          </h1>
          <p className="text-base md:text-lg max-w-3xl" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "من معرفة صفرية إلى مُشغّل تسويق مدعوم بالذكاء الاصطناعي: استراتيجية، نسخ، إعلانات، فانلز، تحليلات، أتمتة، ووكلاء MCP."
              : "From zero knowledge to an AI-powered marketing operator: strategy, copy, ads, funnels, analytics, automation, and MCP agents."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/marketing#tracks`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "#ec4899", color: "#fff" }}
            >
              {isAr ? "ابدأ التعلّم" : "Start Learning"} <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {isAr ? "لوحة التحكم" : "My Dashboard"}
            </Link>
          </div>

          {/* stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {stats.map((s) => (
              <div key={s.labelEn} className="glass-card rounded-2xl p-4" style={{ border: "1px solid rgba(236,72,153,0.15)" }}>
                <p className="font-mono font-bold text-2xl" style={{ color: "#ec4899" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? s.labelAr : s.labelEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portal identity / journey */}
        <PortalIdentityIntro portalKey="marketing" locale={locale} />

        {/* Stage legend */}
        <section className="flex flex-col gap-3">
          <h2 className="font-display font-bold text-xl">{isAr ? "رحلة التحوّل" : "The Transformation Journey"}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {MARKETING_STAGES.map((s, i) => (
              <span key={s.id} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full" style={{ background: `${s.color}18`, color: s.color }}>
                  {isAr ? s.labelAr : s.labelEn}
                </span>
                {i < MARKETING_STAGES.length - 1 && <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "←" : "→"}</span>}
              </span>
            ))}
          </div>
        </section>

        {/* AI copilots */}
        <section className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-xl">{isAr ? "مساعدو الذكاء الاصطناعي" : "AI Copilots"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AI_FEATURES.map((f) => (
              <div key={f.titleEn} className="glass-card rounded-2xl p-4 flex items-start gap-3" style={{ border: "1px solid rgba(236,72,153,0.12)" }}>
                <span className="rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(236,72,153,0.12)", width: 38, height: 38 }}>
                  <f.icon size={18} style={{ color: "#ec4899" }} />
                </span>
                <div>
                  <p className="text-sm font-bold">{isAr ? f.titleAr : f.titleEn}</p>
                  <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? f.descAr : f.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tracks catalog */}
        <section id="tracks" className="flex flex-col gap-5 scroll-mt-24">
          <div>
            <h2 className="font-display font-bold text-2xl">{isAr ? "مسارات التعلّم (16)" : "Learning Tracks (16)"}</h2>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "اختر مسارك حسب المرحلة — كل مسار: وحدات ← دروس ← مشروع نهائي." : "Pick your track by stage — each one: modules → lessons → final project."}
            </p>
          </div>
          <MarketingCatalog tracks={marketingTracks} locale={locale} />
        </section>
      </div>
    </PortalPageWrapper>
  );
}
