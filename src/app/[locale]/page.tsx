import type { Metadata } from "next";
import HomepageClient from "@/components/landing/HomepageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "منصة درهوس — نظام التعلم الذكي | ابدأ من الصفر"
      : "Darhous Smart Learning OS — Start from Zero, Build Your Future",
    description: isAr
      ? "ابدأ من الصفر ودع الذكاء الاصطناعي يبني لك طريقك التعليمي والمهني خطوة بخطوة. 6 بوابات تعليمية متخصصة، مرشد AI شخصي، وشهادات معتمدة."
      : "Start from zero and let AI build your learning & career path step by step. 6 specialized portals, personal AI mentor, and verified certificates.",
    keywords: isAr
      ? ["منصة تعليمية", "ذكاء اصطناعي", "مرشد AI", "بوابة اللغة", "اختبارات رقمية", "درهوس", "تعلم", "مسار مهني"]
      : ["learning platform", "AI mentor", "AI academy", "language portal", "digital exams", "Darhous", "career hub"],
  };
}

export default async function EcosystemHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomepageClient locale={locale} />;
}
