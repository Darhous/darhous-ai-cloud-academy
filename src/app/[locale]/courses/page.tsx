import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الدورات" : "Courses",
    description: isAr
      ? "مسارات تعليمية منظمة من أساسيات الذكاء الاصطناعي إلى MLOps المتقدم ونشر السحاب"
      : "Structured learning tracks from AI foundations to advanced MLOps and cloud deployment",
    keywords: isAr
      ? ["دورات ذكاء اصطناعي", "python", "deep learning", "machine learning", "cloud"]
      : ["AI courses", "machine learning", "deep learning", "python", "cloud"],
  };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CoursesClient locale={locale} />;
}
