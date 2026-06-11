import type { Metadata } from "next";
import { Suspense } from "react";
import LanguageResultsClient from "@/components/language/LanguageResultsClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "نتيجة تقييم اللغة الإنجليزية" : "English Assessment Result",
    robots: { index: false },
  };
}

export default async function LanguageResultsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#d0bcff", borderTopColor: "transparent" }} />
      </div>
    }>
      <LanguageResultsClient locale={locale} />
    </Suspense>
  );
}
