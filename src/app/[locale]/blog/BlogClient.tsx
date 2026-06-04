"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import BlogCard from "@/components/cards/BlogCard";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog";

interface Props {
  locale: string;
  dbPosts: BlogPost[];
}

export default function BlogClient({ locale, dbPosts }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");

  // Merge: DB posts first (newer), then static — deduplicate by id/slug
  const allPosts = useMemo(() => {
    const seen = new Set<string>();
    const merged: BlogPost[] = [];
    for (const p of [...dbPosts, ...blogPosts]) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    // Sort by date descending
    return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [dbPosts]);

  // Compute categories from merged set
  const categories = useMemo(() => {
    const cats = [...new Set([...blogCategories, ...dbPosts.map((p) => p.category)])];
    return cats;
  }, [dbPosts]);

  const filtered = allPosts.filter((p) =>
    activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "المدونة" : "Blog"}
          title={isAr ? "تحليلات ودروس AI" : "AI Deep Dives & Tutorials"}
          subtitle={isAr
            ? "تحليلات معمقة ودروس وأحدث رؤى حول الذكاء الاصطناعي والكلاود"
            : "Deep dives, tutorials, and the latest AI and Cloud insights"}
        />
      </div>

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        allLabel={isAr ? "جميع المقالات" : "All Posts"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📰</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد مقالات مطابقة" : "No matching posts"}
          </p>
        </div>
      )}
    </div>
  );
}
