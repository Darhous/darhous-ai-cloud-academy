import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/data/blog";
import { tools } from "@/data/tools";
import { courses } from "@/data/courses";
import { getMdxPost, getMdxSlugs } from "@/lib/mdx";
import { createClient } from "@/lib/supabase/server";
import { Clock, CalendarDays, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import AskThisPageButton from "@/components/ui/AskThisPageButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MdxContent from "@/components/blog/MdxContent";

export const dynamicParams = true;

type Params = Promise<{ locale: string; slug: string }>;

async function fetchDbPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (!data) return null;
    return {
      id:             data.slug,
      titleAr:        data.title_ar,
      titleEn:        data.title_en,
      excerptAr:      data.excerpt_ar,
      excerptEn:      data.excerpt_en,
      contentAr:      data.content_ar,
      contentEn:      data.content_en,
      keyTakeawaysAr: data.key_takeaways_ar ?? [],
      keyTakeawaysEn: data.key_takeaways_en ?? [],
      category:       data.category,
      readingTime:    data.reading_time,
      date:           (data.published_at as string).split("T")[0],
      featured:       data.featured,
      tags:           data.tags ?? [],
      icon:           data.icon,
      relatedPosts:   data.related_posts ?? [],
      relatedTools:   data.related_tools ?? [],
      relatedCourses: data.related_courses ?? [],
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  const mdxSlugs = getMdxSlugs();
  const dataSlugs = blogPosts.map((p) => p.id);
  const allSlugs = [...new Set([...dataSlugs, ...mdxSlugs])];
  return locales.flatMap((locale) => allSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  // Try MDX first, fallback to data
  const mdx = getMdxPost(slug);
  if (mdx) {
    return {
      title: isAr ? mdx.frontmatter.titleAr : mdx.frontmatter.titleEn,
      description: isAr ? mdx.frontmatter.excerptAr : mdx.frontmatter.excerptEn,
      keywords: mdx.frontmatter.tags,
      openGraph: { type: "article", publishedTime: mdx.frontmatter.date, tags: mdx.frontmatter.tags },
    };
  }
  const post = blogPosts.find((p) => p.id === slug) ?? await fetchDbPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: isAr ? post.titleAr : post.titleEn,
    description: isAr ? post.excerptAr : post.excerptEn,
    keywords: post.tags,
    openGraph: { type: "article", publishedTime: post.date, tags: post.tags },
  };
}

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="font-display font-bold text-2xl mt-8 mb-3" style={{ color: "var(--color-on-surface)" }}>{line.replace("## ", "")}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="font-display font-semibold text-lg mt-6 mb-2" style={{ color: "var(--color-on-surface)" }}>{line.replace("### ", "")}</h3>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold my-2" style={{ color: "var(--color-on-surface)" }}>{line.replace(/\*\*/g, "")}</p>;
      if (line.startsWith("- ")) return <li key={i} className="ms-4 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{line.replace("- ", "")}</li>;
      if (line.startsWith("| ") || line.startsWith("|---")) return null;
      if (line.startsWith("```")) return null;
      if (line.startsWith("✅") || line.startsWith("⚠️")) return <p key={i} className="text-sm my-1" style={{ color: "var(--color-on-surface-variant)" }}>{line}</p>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      if (line.startsWith("> ")) return (
        <blockquote key={i} className="border-s-2 ps-4 my-3 text-sm italic"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-on-surface-variant)" }}>
          {line.replace("> ", "")}
        </blockquote>
      );
      return <p key={i} className="text-base leading-relaxed my-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{line}</p>;
    });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const BackChevron = isAr ? ChevronRight : ChevronLeft;

  // Try MDX post first
  const mdxPost = getMdxPost(slug);
  if (mdxPost) {
    const fm = mdxPost.frontmatter;
    return (
      <div className="container-xl py-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <Breadcrumbs locale={locale} items={[
            { labelAr: "الرئيسية", labelEn: "Home", href: `/${locale}` },
            { labelAr: "المدونة", labelEn: "Blog", href: `/${locale}/blog` },
            { labelAr: fm.titleAr, labelEn: fm.titleEn },
          ]} />
          <div className="text-center flex flex-col items-center gap-4">
            <div className="text-5xl">{fm.icon}</div>
            <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
                {fm.category}
              </span>
              <span className="flex items-center gap-1"><Clock size={12} />{fm.readingTime} {isAr ? "دقيقة" : "min"}</span>
              <span className="flex items-center gap-1"><CalendarDays size={12} />{fm.date}</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? fm.titleAr : fm.titleEn}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? fm.excerptAr : fm.excerptEn}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {fm.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono"
                  style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>#{tag}</span>
              ))}
            </div>
          </div>
          <article className="glass-card rounded-2xl p-6 md:p-10">
            <MdxContent source={mdxPost.content} />
          </article>
          <Link href={`/${locale}/blog`} className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-primary)" }}>
            <BackChevron size={16} />
            {isAr ? "العودة للمدونة" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const post = blogPosts.find((p) => p.id === slug) ?? await fetchDbPost(slug);
  if (!post) notFound();

  const content = isAr ? post.contentAr : post.contentEn;
  const relatedPostsList = (post.relatedPosts ?? [])
    .map((id) => blogPosts.find((p) => p.id === id)).filter(Boolean);
  const relatedToolsList = (post.relatedTools ?? [])
    .map((id) => tools.find((t) => t.id === id)).filter(Boolean);
  const relatedCoursesList = (post.relatedCourses ?? [])
    .map((id) => courses.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="container-xl py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs
          locale={locale}
          items={[
            { labelAr: "الرئيسية", labelEn: "Home", href: `/${locale}` },
            { labelAr: "المدونة",  labelEn: "Blog",  href: `/${locale}/blog` },
            { labelAr: post.titleAr, labelEn: post.titleEn },
          ]}
        />

        {/* Hero */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="text-5xl">{post.icon}</div>
          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
            <span
              className="px-2.5 py-1 rounded-full"
              style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
              {post.category}
            </span>
            <span className="flex items-center gap-1"><Clock size={12} />{post.readingTime} {isAr ? "دقيقة" : "min"}</span>
            <span className="flex items-center gap-1"><CalendarDays size={12} />{post.date}</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? post.titleAr : post.titleEn}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? post.excerptAr : post.excerptEn}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono"
                style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                #{tag}
              </span>
            ))}
          </div>
          <AskThisPageButton
            locale={locale}
            contextTitle={isAr ? post.titleAr : post.titleEn}
            contextHint={isAr
              ? `لخّص لي هذه المقالة وأعطني أهم النقاط: "${post.titleAr}"`
              : `Summarize this article and give me the key takeaways: "${post.titleEn}"`}
          />
        </div>

        {/* Article content */}
        <article className="glass-card rounded-2xl p-6 md:p-10">
          {content ? (
            <div className="prose-custom">
              {renderMarkdown(content)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📝</p>
              <p style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "المحتوى الكامل قيد الكتابة..." : "Full content coming soon..."}
              </p>
            </div>
          )}
        </article>

        {/* Key Takeaways */}
        {(isAr ? post.keyTakeawaysAr : post.keyTakeawaysEn) && (
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(142,213,255,0.06)", border: "1px solid rgba(142,213,255,0.15)" }}
          >
            <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              🎯 {isAr ? "النقاط الرئيسية" : "Key Takeaways"}
            </h2>
            <ul className="space-y-3">
              {(isAr ? post.keyTakeawaysAr! : post.keyTakeawaysEn!).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface)" }}>
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-tertiary)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related content */}
        {(relatedPostsList.length > 0 || relatedToolsList.length > 0 || relatedCoursesList.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPostsList.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-primary)" }}>
                  {isAr ? "مقالات مرتبطة" : "Related Articles"}
                </h3>
                <div className="space-y-2">
                  {relatedPostsList.map((p) => p && (
                    <Link key={p.id} href={`/${locale}/blog/${p.id}`}
                      className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-on-surface-variant)" }}>
                      <span>{p.icon}</span>
                      <span className="line-clamp-1">{isAr ? p.titleAr : p.titleEn}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedToolsList.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-tertiary)" }}>
                  {isAr ? "أدوات مرتبطة" : "Related Tools"}
                </h3>
                <div className="space-y-2">
                  {relatedToolsList.map((t) => t && (
                    <Link key={t.id} href={`/${locale}/tools/${t.id}`}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-on-surface-variant)" }}>
                      🛠️ {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedCoursesList.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-secondary)" }}>
                  {isAr ? "دورات مرتبطة" : "Related Courses"}
                </h3>
                <div className="space-y-2">
                  {relatedCoursesList.map((c) => c && (
                    <Link key={c.id} href={`/${locale}/courses/${c.id}`}
                      className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-on-surface-variant)" }}>
                      <span>{c.icon}</span>
                      <span className="line-clamp-1">{isAr ? c.titleAr : c.titleEn}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
