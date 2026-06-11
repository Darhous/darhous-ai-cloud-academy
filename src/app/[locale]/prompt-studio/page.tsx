import type { Metadata } from "next";
import PromptStudioClient from "@/components/prompt-studio/PromptStudioClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "استوديو البرومبتات — NexaLearn" : "Prompt Studio — NexaLearn",
    description: isAr
      ? "حوّل أي برومبت ضعيف إلى برومبت احترافي جاهز للنسخ بمساعدة الذكاء الاصطناعي"
      : "Transform any weak prompt into a professional, copy-ready prompt with AI assistance",
    openGraph: {
      title: isAr ? "استوديو البرومبتات" : "Prompt Studio",
      description: isAr
        ? "أداة تحسين البرومبتات بالذكاء الاصطناعي من NexaLearn"
        : "AI-powered prompt improvement tool from NexaLearn",
    },
  };
}

export default async function PromptStudioPage({ params }: PageProps) {
  const { locale } = await params;
  return <PromptStudioClient locale={locale} />;
}
