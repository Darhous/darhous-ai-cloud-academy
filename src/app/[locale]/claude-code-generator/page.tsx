import type { Metadata } from "next";
import ClaudeCodeGeneratorClient from "@/components/claude-generator/ClaudeCodeGeneratorClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مولّد برومبت Claude Code — NexaLearn" : "Claude Code Prompt Generator — NexaLearn",
    description: isAr
      ? "أنشئ برومبتات احترافية لـ Claude Code لبناء تطبيقات وإصلاح كود ونشره"
      : "Generate professional Claude Code prompts for building apps, fixing code, and deploying",
    openGraph: {
      title: isAr ? "مولّد برومبت Claude Code" : "Claude Code Prompt Generator",
      description: isAr
        ? "أداة إنشاء برومبتات Claude Code — NexaLearn"
        : "Claude Code prompt generation tool from NexaLearn",
    },
  };
}

export default async function ClaudeCodeGeneratorPage({ params }: PageProps) {
  const { locale } = await params;
  return <ClaudeCodeGeneratorClient locale={locale} />;
}
