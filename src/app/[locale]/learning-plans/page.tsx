import type { Metadata } from "next";
import LearningPlansClient from "./LearningPlansClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "خطط التعلم" : "Learning Plans",
    description: isAr
      ? "خططك التعليمية المخصصة — تتبع تقدمك ومهامك اليومية"
      : "Your personalized learning plans — track your progress and daily tasks",
    robots: { index: false, follow: false },
  };
}

export default async function LearningPlansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LearningPlansClient locale={locale} />;
}
