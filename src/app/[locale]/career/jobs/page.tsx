import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobsClient from "@/components/career/JobsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "بوابة الوظائف الذكية" : "Smart Jobs Portal",
    description: isAr
      ? "استعرض الوظائف المطابقة لمهاراتك مع نسبة التطابق والمهارات الناقصة."
      : "Browse jobs matched to your skills with match score and skill gap analysis.",
  };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
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
          بوابة الوظائف الذكية
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          وظائف تم تحديدها بناءً على الملفات المهنية الأكثر تطابقاً — مع نسبة المطابقة والمهارات الناقصة.
        </p>
      </div>
      <JobsClient />
    </div>
  );
}
