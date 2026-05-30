import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import CTASection from "@/components/sections/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseCard from "@/components/cards/CourseCard";
import ToolCard from "@/components/cards/ToolCard";
import ProjectCard from "@/components/cards/ProjectCard";
import BlogCard from "@/components/cards/BlogCard";
import Premium3DShowcaseCarousel from "@/components/layout/Premium3DShowcaseCarousel";
import CommunitySignup from "@/components/community/CommunitySignup";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "أكاديمية درهوس للذكاء الاصطناعي والكلاود"
      : "Darhous AI Cloud Academy — Learn AI & Cloud",
    description: isAr
      ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية — دورات، مسارات، أدوات، مشاريع"
      : "Practical Arabic AI and Cloud learning platform — courses, paths, tools, projects, and Claude mastery from zero to production",
    keywords: isAr
      ? ["أكاديمية ذكاء اصطناعي", "تعلم AI بالعربي", "claude", "machine learning", "كلاود", "مسارات تعلم"]
      : ["Arabic AI academy", "learn AI", "claude mastery", "cloud academy", "AI courses", "Arabic AI"],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <div className="container-xl">
        <Hero locale={locale} />
      </div>

      {/* Stats */}
      <div className="container-xl">
        <Stats locale={locale} />
      </div>

      {/* Premium 3D AI Studio Showcase */}
      <Premium3DShowcaseCarousel locale={locale} />

      {/* Featured Courses */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "الدورات" : "Courses"}
            title={isAr ? "مسارات تعليمية متميزة" : "Featured Learning Tracks"}
            subtitle={isAr ? "من الأساسيات إلى المشاريع الحقيقية" : "From fundamentals to real-world projects"}
            align="left"
          />
          <Link
            href={`/${locale}/courses`}
            className="flex items-center gap-1.5 text-sm font-mono shrink-0"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      </div>

      {/* Featured Claude section */}
      <div className="container-xl">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,102,138,0.2) 0%, rgba(87,27,193,0.15) 100%)",
            border: "1px solid rgba(142,213,255,0.1)",
          }}
        >
          <div className="env-orb env-orb-blue absolute -top-20 -left-20 opacity-50" style={{ width: "300px", height: "300px" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4"
                style={{ background: "rgba(142,213,255,0.08)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
              >
                🤖 {isAr ? "الصفحة الرئيسية" : "Flagship Page"}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "إتقان Claude" : "Claude Mastery"}
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr
                  ? "مركز تعلم Claude الرائد — من المطالبات إلى البرمجة إلى بناء المنتجات الكاملة. إتقان أقوى نموذج AI في العالم."
                  : "The flagship Claude learning hub — from prompting to coding to building full products. Master the world's most capable AI."}
              </p>
              <Link
                href={`/${locale}/claude`}
                className="glow-button-primary text-white font-mono px-6 py-3 rounded-xl inline-flex items-center gap-2"
              >
                {isAr ? "استكشف Claude" : "Explore Claude"} <Arrow size={16} />
              </Link>
            </div>
            {/* Claude visual */}
            <div className="flex-shrink-0">
              <div
                className="glass-card rounded-2xl p-6 w-72"
                style={{ direction: "ltr" }}
              >
                <div className="font-mono text-xs space-y-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  <div><span style={{ color: "var(--color-primary)" }}>Role:</span> Senior Engineer</div>
                  <div><span style={{ color: "var(--color-secondary)" }}>Goal:</span> Build RAG system</div>
                  <div><span style={{ color: "var(--color-tertiary)" }}>Context:</span> Production app</div>
                  <div><span style={{ color: "#4ade80" }}>Output:</span> Working code</div>
                  <div
                    className="mt-3 pt-3 border-t font-mono text-xs"
                    style={{ borderColor: "rgba(255,255,255,0.06)", color: "var(--color-tertiary)" }}
                  >
                    ✓ Build &nbsp; ✓ Test &nbsp; ✓ Deploy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured AI Tools */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "أدوات AI" : "AI Tools"}
            title={isAr ? "مركز أدوات الذكاء الاصطناعي" : "AI Tools Command Center"}
            subtitle={isAr ? "اكتشف وقارن أفضل أدوات AI" : "Discover and compare the best AI tools"}
            align="left"
          />
          <Link
            href={`/${locale}/tools`}
            className="flex items-center gap-1.5 text-sm font-mono shrink-0"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </div>

      {/* Projects preview */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "المشاريع" : "Projects"}
            title={isAr ? "مشاريع عملية حقيقية" : "Real-World Projects"}
            subtitle={isAr ? "ابنِ مشاريع AI حقيقية مع أدلة كاملة" : "Build real AI projects with complete guides"}
            align="left"
          />
          <Link
            href={`/${locale}/projects`}
            className="flex items-center gap-1.5 text-sm font-mono shrink-0"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </div>

      {/* Blog preview */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "المدونة" : "Blog"}
            title={isAr ? "أحدث المقالات" : "Latest Articles"}
            subtitle={isAr ? "تحليلات معمقة ودروس ورؤى" : "Deep dives, tutorials, and insights"}
            align="left"
          />
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-1.5 text-sm font-mono shrink-0"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>

      {/* AI Mentor Promotion */}
      <div className="container-xl">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(87,27,193,0.18) 0%, rgba(0,102,138,0.15) 60%, rgba(87,27,193,0.1) 100%)",
            border: "1px solid rgba(208,188,255,0.15)",
          }}
        >
          <div className="env-orb env-orb-violet absolute -bottom-16 -end-16 opacity-40" style={{ width: "280px", height: "280px" }} />
          <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "220px", height: "220px" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-start">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-5"
                style={{ background: "rgba(142,213,255,0.08)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
              >
                <Sparkles size={11} />
                {isAr ? "مدعوم بـ Gemini 2.5 Flash" : "Powered by Gemini 2.5 Flash"}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "مساعد درهوس الذكي" : "Darhous AI Mentor"}
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)", maxWidth: "480px" }}>
                {isAr
                  ? "اسأل، حسّن البرومبتات، ابنِ خطط تعلم، واختر الأدوات المناسبة بمساعدة الذكاء الاصطناعي."
                  : "Ask questions, improve prompts, build learning paths, and find the right AI tools with an intelligent academy assistant."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href={`/${locale}/mentor`}
                  className="glow-button-primary text-white font-mono px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Sparkles size={15} />
                  {isAr ? "جرّب المساعد الذكي" : "Try AI Mentor"} <Arrow size={15} />
                </Link>
                <Link
                  href={`/${locale}/prompt-studio`}
                  className="glow-button-secondary font-mono px-5 py-3 rounded-xl inline-flex items-center gap-2 text-sm"
                >
                  ⚡ {isAr ? "استوديو البرومبتات" : "Prompt Studio"}
                </Link>
              </div>
            </div>
            {/* AI Studio Grid */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full max-w-xs">
              {[
                { icon: "✨", titleAr: "مرشد AI",           titleEn: "AI Mentor",       href: "/mentor" },
                { icon: "⚡", titleAr: "استوديو البرومبتات",titleEn: "Prompt Studio",    href: "/prompt-studio" },
                { icon: "🛠️", titleAr: "مولّد Claude Code", titleEn: "Claude Generator", href: "/claude-code-generator" },
                { icon: "🔎", titleAr: "مرشّح الأدوات",     titleEn: "Tool Finder",      href: "/tool-recommender" },
                { icon: "🗺️", titleAr: "مخطط التعلم",       titleEn: "Roadmap Gen",     href: "/roadmap-generator" },
                { icon: "📂", titleAr: "المحفوظات",          titleEn: "Saved Items",      href: "/dashboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="glass-card p-3 rounded-xl flex flex-col items-center gap-1.5 text-center transition-all hover:scale-105 hover:-translate-y-0.5"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium leading-tight" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? item.titleAr : item.titleEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nano Banana section */}
      <div className="container-xl">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(139,92,246,0.1) 60%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <div className="absolute top-0 end-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-0 start-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-start">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-5"
                style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)", color: "#f59e0b" }}
              >
                🍌 Gemini Nano Banana
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "تريند Gemini Nano Banana" : "Gemini Nano Banana Trends"}
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)", maxWidth: "480px" }}>
                {isAr
                  ? "اكتشف أفكار صور تريندي جاهزة، وانسخ البرومبت الذي يحول صورتك إلى نفس الستايل."
                  : "Explore viral image ideas and copy the prompt that turns your own photo into the same style."}
              </p>
              <Link
                href={`/${locale}/nano-banana-prompts`}
                className="inline-flex items-center gap-2 font-mono px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b" }}
              >
                🍌 {isAr ? "استكشف برومبتات Nano Banana" : "Explore Nano Banana Prompts"} <Arrow size={15} />
              </Link>
            </div>
            {/* Visual preview grid */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full max-w-xs">
              {[
                { emoji: "🏆", titleAr: "تمثال 3D Collectible", titleEn: "3D Figurine" },
                { emoji: "🎬", titleAr: "بورتريه سينمائي", titleEn: "Cinematic Portrait" },
                { emoji: "🌆", titleAr: "بوستر سايبربانك", titleEn: "Cyberpunk Poster" },
                { emoji: "📔", titleAr: "غلاف مجلة فاخر", titleEn: "Magazine Cover" },
                { emoji: "🎵", titleAr: "غلاف موسيقى نيوني", titleEn: "Music Cover" },
                { emoji: "🌌", titleAr: "تعرض مزدوج", titleEn: "Double Exposure" },
              ].map((item) => (
                <Link
                  key={item.emoji}
                  href={`/${locale}/nano-banana-prompts`}
                  className="glass-card p-3 rounded-xl flex flex-col items-center gap-1.5 text-center transition-all hover:scale-105 hover:-translate-y-0.5"
                  style={{ border: "1px solid rgba(245,158,11,0.15)" }}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-xs font-medium leading-tight" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? item.titleAr : item.titleEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Signup */}
      <div className="container-xl">
        <CommunitySignup locale={locale} variant="hero" source="home" />
      </div>

      {/* CTA */}
      <div className="container-xl">
        <CTASection locale={locale} />
      </div>
    </div>
  );
}
