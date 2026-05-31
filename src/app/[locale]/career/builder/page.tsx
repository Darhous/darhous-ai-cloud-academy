import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CVBuilderClient from "@/components/career/CVBuilderClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "صانع السيرة الذاتية | بوابة درهوس المهنية" : "CV Builder | Darhous Career Hub",
    description: isAr
      ? "أنشئ سيرة ذاتية احترافية متوافقة مع ATS خطوة بخطوة مع معاينة حية."
      : "Build a professional ATS-friendly CV step by step with live preview.",
  };
}

export default async function CVBuilderPage({
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
          صانع السيرة الذاتية الذكي
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          أدخل بياناتك خطوة بخطوة وشاهد سيرتك تتشكل في الوقت الفعلي — متوافقة مع أنظمة ATS.
        </p>
      </div>
      <CVBuilderClient />
    </div>
  );
}
