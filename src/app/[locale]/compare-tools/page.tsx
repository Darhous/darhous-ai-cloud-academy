import type { Metadata } from "next";
import CompareToolsClient from "./CompareToolsClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مقارنة أدوات AI" : "Compare AI Tools",
    description: isAr
      ? "قارن بين أدوات الذكاء الاصطناعي جنباً إلى جنب — حالات الاستخدام، التسعير، الميزات، وأفضل اختيار"
      : "Compare AI tools side-by-side — use cases, pricing, features, and the best choice for you",
    robots: { index: true, follow: true },
  };
}

export default async function CompareToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CompareToolsClient locale={locale} />;
}
