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
      ? "NexaLearn — تعلّم بذكاء. ابنِ بمهارة. تقدّم بثقة."
      : "NexaLearn by Ahmed Darhous — Learn Smart. Build Skills. Grow With Confidence.",
    description: isAr
      ? "ابدأ من الصفر ودع الذكاء الاصطناعي يبني لك طريقك التعليمي والمهني خطوة بخطوة. 6 بوابات تعليمية متخصصة، مرشد AI شخصي، وشهادات معتمدة."
      : "Start from zero and let AI build your learning & career path step by step. 6 specialized portals, personal AI mentor, and verified certificates.",
    keywords: isAr
      ? ["منصة تعليمية", "ذكاء اصطناعي", "مرشد AI", "بوابة اللغة", "اختبارات رقمية", "NexaLearn", "تعلم", "مسار مهني"]
      : ["learning platform", "AI mentor", "AI academy", "language portal", "digital exams", "NexaLearn", "career hub"],
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
