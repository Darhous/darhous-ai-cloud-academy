import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CVAnalyzerClient from "@/components/career/CVAnalyzerClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "محلل ATS الذكي | بوابة درهوس المهنية" : "AI ATS Analyzer | Darhous Career Hub",
    description: isAr
      ? "حلّل سيرتك الذاتية بالذكاء الاصطناعي واحصل على درجة ATS والكلمات المفتاحية الناقصة."
      : "Analyze your CV with AI and get ATS score, missing keywords, and improvement recommendations.",
  };
}

export default async function CVAnalyzerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mb-8">
        <Link
          href={`/${locale}/career`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />
          العودة لبوابة التوظيف
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          محلل ATS الذكي
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          ارفع سيرتك الذاتية (PDF أو TXT) أو الصق محتواها — سيقيّمها الذكاء الاصطناعي ويكشف فجواتها فوراً.
        </p>
      </div>
      <CVAnalyzerClient locale={locale} />
    </div>
  );
}
