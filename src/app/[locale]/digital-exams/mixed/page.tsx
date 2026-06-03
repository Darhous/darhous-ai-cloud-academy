import type { Metadata } from "next";
import MixedExamClient from "@/components/exams/MixedExamClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الامتحان المجمع | درهوس" : "Mixed Comprehensive Exam | Darhous",
    description: isAr
      ? "اختبار شامل من كل المواد — أثبت مهاراتك الكاملة في التحول الرقمي"
      : "Comprehensive exam from all subjects — prove your full digital transformation skills",
    robots: { index: true },
    openGraph: {
      title: isAr ? "الامتحان المجمع — درهوس" : "Mixed Comprehensive Exam — Darhous",
      description: isAr
        ? "30+ سؤال من 9 مواد — اختبر نفسك شاملاً واحصل على شهادة عند 80%+"
        : "30+ questions from 9 subjects — comprehensive self-test with certificate at 80%+",
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function MixedExamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MixedExamClient locale={locale} />;
}
