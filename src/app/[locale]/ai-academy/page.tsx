import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, BookOpen, Wrench, Sparkles, Trophy, Brain, Target } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseCard from "@/components/cards/CourseCard";
import ToolCard from "@/components/cards/ToolCard";
import ProjectCard from "@/components/cards/ProjectCard";
import Stats from "@/components/sections/Stats";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "أكاديمية الذكاء الاصطناعي | درهوس" : "AI Academy | Darhous",
    description: isAr
      ? "تعلم الذكاء الاصطناعي، أدوات AI، البرومبتات، والمشاريع العملية — بوابة AI الكاملة"
      : "Learn AI, AI tools, prompts, and hands-on projects — the complete AI portal",
  };
}

const aiStudioLinks = {
  ar: [
    { href: "/mentor", icon: "✨", label: "مرشد AI" },
    { href: "/prompt-studio", icon: "⚡", label: "استوديو البرومبتات" },
    { href: "/prompt-score", icon: "🎯", label: "تقييم البرومبت" },
    { href: "/prompt-battle", icon: "⚔️", label: "معركة البرومبتات" },
    { href: "/claude-code-generator", icon: "🛠️", label: "مولّد Claude Code" },
    { href: "/compare-tools", icon: "⚖️", label: "مقارنة الأدوات" },
    { href: "/roadmap-generator", icon: "🗺️", label: "مولّد خطط التعلم" },
    { href: "/project-generator", icon: "🚀", label: "مولّد المشاريع" },
    { href: "/challenges", icon: "🏆", label: "التحديات" },
    { href: "/leaderboard", icon: "🥇", label: "المتصدرون" },
    { href: "/search", icon: "🔍", label: "البحث الذكي" },
    { href: "/nano-banana-prompts", icon: "🍌", label: "Nano Banana Lab" },
  ],
  en: [
    { href: "/mentor", icon: "✨", label: "AI Mentor" },
    { href: "/prompt-studio", icon: "⚡", label: "Prompt Studio" },
    { href: "/prompt-score", icon: "🎯", label: "Prompt Score" },
    { href: "/prompt-battle", icon: "⚔️", label: "Prompt Battle" },
    { href: "/claude-code-generator", icon: "🛠️", label: "Claude Code Generator" },
    { href: "/compare-tools", icon: "⚖️", label: "Compare Tools" },
    { href: "/roadmap-generator", icon: "🗺️", label: "Roadmap Generator" },
    { href: "/project-generator", icon: "🚀", label: "Project Generator" },
    { href: "/challenges", icon: "🏆", label: "Challenges" },
    { href: "/leaderboard", icon: "🥇", label: "Leaderboard" },
    { href: "/search", icon: "🔍", label: "Smart Search" },
    { href: "/nano-banana-prompts", icon: "🍌", label: "Nano Banana Lab" },
  ],
};

export default async function AIAcademyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const studioLinks = aiStudioLinks[isAr ? "ar" : "en"];

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">

      {/* Hero */}
      <section className="container-xl pt-10 relative">
        <div className="absolute top-0 end-0 pointer-events-none" style={{ width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(142,213,255,0.08) 0%, transparent 65%)", filter: "blur(100px)" }} />

        <div className="relative z-10 mb-8">
          {/* Back */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-80"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            {isAr ? "منصة درهوس" : "Darhous Platform"}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
                style={{ background: "rgba(142,213,255,0.08)", borderColor: "rgba(142,213,255,0.25)", color: "var(--color-primary)" }}
              >
                🤖 {isAr ? "بوابة الذكاء الاصطناعي" : "AI Portal"} &nbsp;·&nbsp;
                <span className="text-green-400">{isAr ? "متاح الآن" : "Available Now"}</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "أكاديمية الذكاء الاصطناعي" : "AI Academy"}
              </h1>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr
                  ? "تعلم أدوات الذكاء الاصطناعي، البرومبتات، المشاريع العملية، والمعامل الذكية — كل ما تحتاجه لإتقان AI."
                  : "Learn AI tools, prompts, hands-on projects, and intelligent labs — everything you need to master AI."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href={`/${locale}/courses`} className="glow-button-primary text-white font-mono px-5 py-2.5 rounded-xl inline-flex items-center gap-2 text-sm">
                <BookOpen size={14} />
                {isAr ? "الدورات" : "Courses"} <Arrow size={14} />
              </Link>
              <Link href={`/${locale}/mentor`} className="glow-button-secondary font-mono px-5 py-2.5 rounded-xl inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-secondary)" }}>
                <Sparkles size={14} />
                {isAr ? "مرشد AI" : "AI Mentor"}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Stats locale={locale} />
      </section>

      {/* AI Studio Grid */}
      <section className="container-xl">
        <SectionHeader
          badge={isAr ? "AI Studio" : "AI Studio"}
          title={isAr ? "معمل الذكاء الاصطناعي" : "AI Lab & Studio"}
          subtitle={isAr ? "أدوات AI تفاعلية مدعومة بـ Gemini" : "Interactive AI tools powered by Gemini"}
          align="left"
        />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {studioLinks.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="glass-card rounded-xl p-3.5 flex flex-col items-center gap-2 text-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium leading-tight" style={{ color: "var(--color-on-surface-variant)" }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "الدورات" : "Courses"}
            title={isAr ? "مسارات تعليمية متميزة" : "Featured Learning Tracks"}
            subtitle={isAr ? "من الأساسيات إلى المشاريع الحقيقية" : "From fundamentals to real-world projects"}
            align="left"
          />
          <Link href={`/${locale}/courses`} className="flex items-center gap-1.5 text-sm font-mono shrink-0" style={{ color: "var(--color-primary)" }}>
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "أدوات AI" : "AI Tools"}
            title={isAr ? "مركز أدوات الذكاء الاصطناعي" : "AI Tools Command Center"}
            subtitle={isAr ? "اكتشف وقارن أفضل أدوات AI" : "Discover and compare the best AI tools"}
            align="left"
          />
          <Link href={`/${locale}/tools`} className="flex items-center gap-1.5 text-sm font-mono shrink-0" style={{ color: "var(--color-primary)" }}>
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            badge={isAr ? "المشاريع" : "Projects"}
            title={isAr ? "مشاريع عملية حقيقية" : "Real-World Projects"}
            subtitle={isAr ? "ابنِ مشاريع AI حقيقية مع أدلة كاملة" : "Build real AI projects with complete guides"}
            align="left"
          />
          <Link href={`/${locale}/projects`} className="flex items-center gap-1.5 text-sm font-mono shrink-0" style={{ color: "var(--color-primary)" }}>
            {isAr ? "عرض الكل" : "View All"} <Arrow size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </div>

      {/* Quick links bottom */}
      <div className="container-xl">
        <div
          className="rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
          style={{ background: "rgba(142,213,255,0.04)", border: "1px solid rgba(142,213,255,0.1)" }}
        >
          <div>
            <p className="font-bold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "استكشف المزيد من أكاديمية AI" : "Explore More from AI Academy"}
            </p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "مسرد، مدونة، مسارات تعلم، وأكثر" : "Glossary, blog, learning paths, and more"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/paths", labelAr: "🗺️ المسارات", labelEn: "🗺️ Paths" },
              { href: "/prompts", labelAr: "⚡ البرومبتات", labelEn: "⚡ Prompts" },
              { href: "/blog", labelAr: "📝 المدونة", labelEn: "📝 Blog" },
              { href: "/glossary", labelAr: "📚 المسرد", labelEn: "📚 Glossary" },
              { href: "/claude", labelAr: "🤖 Claude", labelEn: "🤖 Claude" },
            ].map((l) => (
              <Link
                key={l.href}
                href={`/${locale}${l.href}`}
                className="text-xs px-3 py-1.5 rounded-lg font-mono transition-all hover:opacity-80"
                style={{
                  background: "rgba(142,213,255,0.06)",
                  border: "1px solid rgba(142,213,255,0.15)",
                  color: "var(--color-primary)",
                }}
              >
                {isAr ? l.labelAr : l.labelEn}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
