import type { Metadata } from "next";
import LanguageAssessmentClient from "@/components/language/LanguageAssessmentClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اختبار تحديد المستوى الإنجليزي | درهوس" : "English Level Assessment | Darhous",
    robots: { index: false },
  };
}

export default async function LanguageAssessmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LanguageAssessmentClient locale={locale} />;
}
