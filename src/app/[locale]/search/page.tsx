import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "البحث الذكي" : "Smart Search",
    description: isAr
      ? "ابحث في الدورات والأدوات والمشاريع والمدونة والبرومبتات وNano Banana"
      : "Search across courses, tools, projects, blog, prompts, and Nano Banana",
    robots: { index: true, follow: true },
  };
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SearchClient locale={locale} />;
}
