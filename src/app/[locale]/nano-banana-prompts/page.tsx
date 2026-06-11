import type { Metadata } from "next";
import NanaBananaClient from "@/components/nano-banana/NanaBananaClient";
import NanoBananaVisualPreview from "@/components/nano-banana/NanoBananaVisualPreview";
import PortalPageWrapper from "@/components/ui/PortalPageWrapper";
import PortalIdentityIntro from "@/components/portal/PortalIdentityIntro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مختبر برومبتات Gemini Nano Banana"
      : "Gemini Nano Banana Prompt Lab",
    description: isAr
      ? "مجموعة تريندات صور Gemini Nano Banana مع برومبتات جاهزة للنسخ لتحويل صورك إلى ستايلات احترافية وتريندي."
      : "A curated gallery of Gemini Nano Banana image prompt trends with copy-ready prompts for your own photos.",
    keywords: isAr
      ? ["Gemini Nano Banana", "برومبتات صور", "تريند صور AI", "Gemini image prompts", "تحويل الصور"]
      : ["Gemini Nano Banana", "image prompts", "AI photo trends", "Gemini prompts", "photo transformation"],
    openGraph: {
      title: isAr ? "مختبر برومبتات Gemini Nano Banana | NexaLearn" : "Gemini Nano Banana Prompt Lab | NexaLearn",
      description: isAr
        ? "برومبتات جاهزة للنسخ لتحويل صورك إلى ستايلات تريندية احترافية."
        : "Copy-ready prompts to transform your photos into trending professional styles.",
    },
  };
}

export default async function NanaBananaPromptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PortalPageWrapper>
      <div className="flex flex-col gap-16 pb-16">
        <NanoBananaVisualPreview locale={locale} />

        {/* Portal identity intro — Phase 9C */}
        <PortalIdentityIntro portalKey="nano-banana" locale={locale} />

        <NanaBananaClient locale={locale} />
      </div>
    </PortalPageWrapper>
  );
}
