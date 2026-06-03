import type { Metadata } from "next";
import DigitalExamsHistoryClient from "@/components/exams/DigitalExamsHistoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سجل الاختبارات | درهوس" : "Exam History | Darhous",
    description: isAr
      ? "استعرض سجل اختباراتك وتحليل أدائك في كل مادة"
      : "View your exam history and performance analysis per subject",
    robots: { index: false },
  };
}

export default async function ExamHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <DigitalExamsHistoryClient locale={locale} />;
}
