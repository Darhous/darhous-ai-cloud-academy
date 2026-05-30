import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مكتبة المشاريع" : "Projects Library",
    description: isAr
      ? "مشاريع ذكاء اصطناعي حقيقية بأدلة بناء كاملة — من PDF Chatbot إلى RAG وMLOps"
      : "Real AI projects with complete build guides — from PDF Chatbot to RAG and MLOps",
    keywords: isAr
      ? ["مشاريع ذكاء اصطناعي", "RAG", "chatbot", "MLOps", "python", "AI projects"]
      : ["AI projects", "RAG", "chatbot", "MLOps", "python", "real world"],
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ProjectsClient locale={locale} />;
}
