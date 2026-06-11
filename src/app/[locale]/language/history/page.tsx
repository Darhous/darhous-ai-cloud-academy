import type { Metadata } from "next";
import LanguageHistoryClient from "@/components/language/LanguageHistoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سجل اختبارات اللغة" : "Language Assessment History",
    description: isAr
      ? "تتبع تقدمك في اختبارات تحديد مستوى اللغة الإنجليزية"
      : "Track your English language assessment progress over time",
    robots: "noindex",
  };
}

export default async function LanguageHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LanguageHistoryClient locale={locale} />;
}
