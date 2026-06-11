import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InterviewPrepClient from "@/components/career/InterviewPrepClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تحضير المقابلات | بوابة NexaLearn المهنية" : "Interview Prep | NexaLearn Career Hub",
    description: isAr
      ? "بنك أسئلة سلوكية وتقنية مع مقيّم STAR الذكي لتحضير مقابلات العمل."
      : "Behavioral and technical question bank with AI STAR evaluator for interview preparation.",
  };
}

export default async function InterviewPage({
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
          تحضير المقابلات
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          استعرض بنك الأسئلة الشاملة أو استخدم مقيّم STAR الذكي لتحسين إجاباتك قبل المقابلة.
        </p>
      </div>
      <InterviewPrepClient />
    </div>
  );
}
