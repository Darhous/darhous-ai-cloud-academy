import type { Metadata } from "next";
import RoadmapGeneratorClient from "@/components/roadmap-generator/RoadmapGeneratorClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مولّد خطط التعلم — NexaLearn" : "AI Roadmap Generator — NexaLearn",
    description: isAr
      ? "خطة تعلم مخصصة في دقائق — مبنية على مستواك وهدفك ووقتك بمساعدة الذكاء الاصطناعي"
      : "A personalized learning plan in minutes — built for your level, goal, and time with AI",
    openGraph: {
      title: isAr ? "مولّد خطط التعلم بالذكاء الاصطناعي" : "AI Roadmap Generator",
      description: isAr
        ? "ولّد خطة تعلم AI مخصصة من NexaLearn"
        : "Generate a personalized AI learning roadmap from NexaLearn",
    },
  };
}

export default async function RoadmapGeneratorPage({ params }: PageProps) {
  const { locale } = await params;
  return <RoadmapGeneratorClient locale={locale} />;
}
