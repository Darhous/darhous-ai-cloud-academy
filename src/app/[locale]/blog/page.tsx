import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "المدونة" : "Blog",
    description: isAr
      ? "مقالات وتحليلات ودروس معمقة حول الذكاء الاصطناعي والكلاود بالعربية"
      : "Articles, deep dives, and tutorials about AI and Cloud in Arabic and English",
    keywords: isAr
      ? ["مدونة ذكاء اصطناعي", "مقالات AI", "تعلم AI", "claude", "chatgpt"]
      : ["AI blog", "machine learning articles", "claude tutorials", "AI guides"],
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BlogClient locale={locale} />;
}
