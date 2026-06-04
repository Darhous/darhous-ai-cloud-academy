import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/data/blog";
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

async function fetchDbPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase
      .from("blog_posts")
      .select("slug,title_ar,title_en,excerpt_ar,excerpt_en,content_ar,content_en,key_takeaways_ar,key_takeaways_en,category,tags,icon,reading_time,featured,published_at,cover_url,related_posts,related_tools,related_courses")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!data) return [];
    return data.map((row) => ({
      id:              row.slug,
      titleAr:         row.title_ar,
      titleEn:         row.title_en,
      excerptAr:       row.excerpt_ar,
      excerptEn:       row.excerpt_en,
      contentAr:       row.content_ar,
      contentEn:       row.content_en,
      keyTakeawaysAr:  row.key_takeaways_ar ?? [],
      keyTakeawaysEn:  row.key_takeaways_en ?? [],
      category:        row.category,
      readingTime:     row.reading_time,
      date:            (row.published_at as string).split("T")[0],
      featured:        row.featured,
      tags:            row.tags ?? [],
      icon:            row.icon,
      relatedPosts:    row.related_posts ?? [],
      relatedTools:    row.related_tools ?? [],
      relatedCourses:  row.related_courses ?? [],
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbPosts = await fetchDbPosts();
  return <BlogClient locale={locale} dbPosts={dbPosts} />;
}
