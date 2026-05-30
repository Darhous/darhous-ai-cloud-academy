import type { Metadata } from "next";
import ProjectGeneratorClient from "./ProjectGeneratorClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مولّد مشاريع AI" : "AI Project Generator",
    description: isAr
      ? "أدخل مستواك وهدفك واحصل على فكرة مشروع AI مخصصة مع خطوات التنفيذ وبرومبت Claude Code"
      : "Enter your level and goal to get a custom AI project idea with implementation steps and Claude Code prompt",
    robots: { index: true, follow: true },
  };
}

export default async function ProjectGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ProjectGeneratorClient locale={locale} />;
}
