import type { Metadata } from "next";
import ToolRecommenderClient from "@/components/tool-recommender/ToolRecommenderClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مرشّح أدوات الذكاء الاصطناعي — درهوس AI" : "AI Tool Recommender — Darhous AI",
    description: isAr
      ? "اختر هدفك واكتشف الأدوات المثلى من مركز أدوات أكاديمية درهوس"
      : "Choose your goal and discover the best tools from Darhous Academy's AI Tools Hub",
    openGraph: {
      title: isAr ? "مرشّح أدوات AI" : "AI Tool Recommender",
      description: isAr
        ? "اكتشف الأداة المثلى لاحتياجك من 40+ أداة AI"
        : "Find the ideal tool from 40+ AI tools for your specific need",
    },
  };
}

export default async function ToolRecommenderPage({ params }: PageProps) {
  const { locale } = await params;
  return <ToolRecommenderClient locale={locale} />;
}
