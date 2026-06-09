import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { fetchDbProject } from "../dbProjects";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import Badge from "@/components/ui/Badge";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import AskThisPageButton from "@/components/ui/AskThisPageButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = true;

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.id }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.id === slug) ?? (await fetchDbProject(slug));
  if (!project) return { title: "Project Not Found" };
  const isAr = locale === "ar";
  return {
    title: isAr ? project.titleAr : project.titleEn,
    description: isAr ? project.descriptionAr : project.descriptionEn,
  };
}

const difficultyVariant = { beginner: "beginner", intermediate: "intermediate", advanced: "advanced" } as const;
const difficultyLabel = {
  ar: { beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
} as const;

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.id === slug) ?? (await fetchDbProject(slug));
  if (!project) notFound();

  const isAr = locale === "ar";
  const relatedCoursesList = (project.relatedCourses ?? [])
    .map((cid) => courses.find((c) => c.id === cid)).filter(Boolean);

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        locale={locale}
        items={[
          { labelAr: "الرئيسية", labelEn: "Home", href: `/${locale}` },
          { labelAr: "المشاريع", labelEn: "Projects", href: `/${locale}/projects` },
          { labelAr: project.titleAr, labelEn: project.titleEn },
        ]}
      />

      {/* Hero */}
      <div
        className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(60,224,251,0.08) 0%, rgba(87,27,193,0.1) 100%)",
          border: "1px solid rgba(60,224,251,0.1)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="text-6xl flex-shrink-0">{project.icon}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={difficultyVariant[project.difficulty]}>
                {difficultyLabel[isAr ? "ar" : "en"][project.difficulty]}
              </Badge>
              <span className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                {project.category}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? project.titleAr : project.titleEn}
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? (project.goalAr || project.descriptionAr) : (project.goalEn || project.descriptionEn)}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono"
                  style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#build-steps" className="glow-button-primary text-white font-mono text-sm px-6 py-3 rounded-xl inline-block text-center decoration-transparent">
                {isAr ? "ابنِ هذا المشروع" : "Build This Project"}
              </a>
              <AskThisPageButton
                locale={locale}
                contextTitle={isAr ? project.titleAr : project.titleEn}
                contextHint={isAr
                  ? `اشرح لي كيف أبني مشروع "${project.titleAr}" خطوة بخطوة`
                  : `Guide me through building "${project.titleEn}" step by step`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Step-by-step build plan */}
          {project.buildSteps && project.buildSteps.length > 0 && (
            <div id="build-steps" className="glass-card rounded-2xl p-6 scroll-mt-24">
              <h2 className="font-display font-bold text-xl mb-6" style={{ color: "var(--color-on-surface)" }}>
                🔨 {isAr ? "خطوات البناء" : "Build Steps"}
              </h2>
              <div className="space-y-4">
                {project.buildSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                        style={{ background: "var(--color-primary)", color: "black" }}>
                        {i + 1}
                      </div>
                      {i < project.buildSteps!.length - 1 && (
                        <div className="w-0.5 flex-1 my-2" style={{ background: "var(--color-outline-variant)" }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? step.stepAr : step.stepEn}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? step.detailAr : step.detailEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expected Output */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "المخرجات المتوقعة" : "Expected Output"}
            </h2>
            <div className="p-4 rounded-xl" style={{ background: "rgba(60,224,251,0.06)", border: "1px solid rgba(60,224,251,0.15)" }}>
              <p className="text-base" style={{ color: "var(--color-on-surface)" }}>
                ✅ {isAr ? project.expectedOutputAr : project.expectedOutput}
              </p>
            </div>
          </div>

          {/* Future Idea */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              🚀 {isAr ? "أفكار التوسع المستقبلي" : "Future Expansion Ideas"}
            </h2>
            <div className="p-4 rounded-xl" style={{ background: "rgba(208,188,255,0.06)", border: "1px solid rgba(208,188,255,0.15)" }}>
              <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                💡 {isAr ? project.futureIdeaAr : project.futureIdea}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Skills */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "المهارات المكتسبة" : "Skills Gained"}
            </h3>
            <ul className="space-y-2">
              {project.skills.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-tertiary)", flexShrink: 0 }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Tools */}
          {project.requiredTools && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "الأدوات المطلوبة" : "Required Tools"}
              </h3>
              <div className="flex flex-col gap-2">
                {project.requiredTools.map((t) => {
                  const tool = tools.find((x) => x.name === t || x.id.includes(t.toLowerCase().replace(/\s+/g, "-")));
                  return tool ? (
                    <Link key={t} href={`/${locale}/tools/${tool.id}`}
                      className="text-sm flex items-center gap-2 transition-colors hover:opacity-80"
                      style={{ color: "var(--color-primary)" }}>
                      🔧 {t}
                    </Link>
                  ) : (
                    <span key={t} className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>🔧 {t}</span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Courses */}
          {relatedCoursesList.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "دورات مرتبطة" : "Related Courses"}
              </h3>
              <div className="space-y-2">
                {relatedCoursesList.map((c) => c && (
                  <Link key={c.id} href={`/${locale}/courses/${c.id}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-primary)" }}>
                    <span>{c.icon}</span>
                    {isAr ? c.titleAr : c.titleEn}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
