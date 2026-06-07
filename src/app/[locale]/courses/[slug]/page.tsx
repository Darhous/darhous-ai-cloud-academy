import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { projects } from "@/data/projects";
import { fetchDbCourse } from "../dbCourses";
import Badge from "@/components/ui/Badge";
import QuizSection from "@/components/features/QuizSection";
import { ArrowLeft, ArrowRight, BookOpen, Clock, FolderOpen, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import AskThisPageButton from "@/components/ui/AskThisPageButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamicParams = true;

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  return locales.flatMap((locale) =>
    courses.map((c) => ({ locale, slug: c.id }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = courses.find((c) => c.id === slug) ?? await fetchDbCourse(slug);
  if (!course) return { title: "Course Not Found" };
  const isAr = locale === "ar";
  return {
    title: isAr ? course.titleAr : course.titleEn,
    description: isAr ? course.descriptionAr : course.descriptionEn,
  };
}

const levelVariant = { beginner: "beginner", intermediate: "intermediate", advanced: "advanced" } as const;
const levelLabel = { beginner: { ar: "مبتدئ", en: "Beginner" }, intermediate: { ar: "متوسط", en: "Intermediate" }, advanced: { ar: "متقدم", en: "Advanced" } };
const typeIcon = { video: "🎥", reading: "📖", project: "🔨", quiz: "✅" };

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const course = courses.find((c) => c.id === slug) ?? await fetchDbCourse(slug);
  if (!course) notFound();

  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const relatedProjectsList = course.relatedProjects
    ?.map((pid) => projects.find((p) => p.id === pid))
    .filter(Boolean) ?? [];

  const relatedCoursesList = course.relatedCourses
    ?.map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean) ?? [];

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        locale={locale}
        items={[
          { labelAr: "الرئيسية", labelEn: "Home", href: `/${locale}` },
          { labelAr: "الدورات",  labelEn: "Courses", href: `/${locale}/courses` },
          { labelAr: course.titleAr, labelEn: course.titleEn },
        ]}
      />

      {/* Hero */}
      <div
        className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.15) 0%, rgba(87,27,193,0.1) 100%)",
          border: "1px solid var(--portal-color-border)",
        }}
      >
        <div
          className="absolute top-0 end-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--portal-color-subtle) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
          <div className="text-6xl flex-shrink-0">{course.icon}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={levelVariant[course.level]}>
                {isAr ? levelLabel[course.level].ar : levelLabel[course.level].en}
              </Badge>
              <span
                className="px-3 py-1 rounded-full text-xs font-mono border"
                style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
              >
                {course.category}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? course.titleAr : course.titleEn}
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? (course.overviewAr || course.descriptionAr) : (course.overviewEn || course.descriptionEn)}
            </p>
            <div className="flex flex-wrap gap-6 mb-6">
              {[
                { icon: <BookOpen size={16} />, value: `${course.lessons} ${isAr ? "درس" : "lessons"}` },
                { icon: <Clock size={16} />, value: `${course.hours}h` },
                { icon: <FolderOpen size={16} />, value: `${course.projects} ${isAr ? "مشروع" : "projects"}` },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  {s.icon}{s.value}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {course.lessonOutline && course.lessonOutline.length > 0 && (
                <Link
                  href={`/${locale}/courses/${course.id}/lessons/1`}
                  className="glow-button-primary text-white font-mono text-sm px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  {isAr ? "ابدأ الدورة" : "Start Course"} <Arrow size={16} />
                </Link>
              )}
              <button
                className="font-mono text-sm px-6 py-3 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
              >
                {isAr ? "حفظ للاحقاً" : "Save for Later"}
              </button>
              <AskThisPageButton
                locale={locale}
                contextTitle={isAr ? course.titleAr : course.titleEn}
                contextHint={isAr
                  ? `اشرح لي محتوى دورة "${course.titleAr}" وكيف أستفيد منها`
                  : `Explain the "${course.titleEn}" course content and how to get the most out of it`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* For Who */}
          {(isAr ? course.forWhoAr : course.forWhoEn) && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "لمن هذه الدورة؟" : "Who is this course for?"}
              </h2>
              <ul className="space-y-2">
                {(isAr ? course.forWhoAr : course.forWhoEn)!.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span style={{ color: "var(--color-tertiary)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What you'll learn */}
          {(isAr ? course.whatYouLearnAr : course.whatYouLearnEn) && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "ماذا ستتعلم؟" : "What you'll learn"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isAr ? course.whatYouLearnAr : course.whatYouLearnEn)!.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-tertiary)" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lesson outline */}
          {course.lessonOutline && course.lessonOutline.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "محتوى الدورة" : "Course Content"}
              </h2>
              <div className="space-y-2">
                {course.lessonOutline.map((lesson, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/courses/${course.id}/lessons/${i + 1}`}
                    className="flex items-center justify-between p-3 rounded-xl transition-all hover:-translate-y-0.5 hover:opacity-90"
                    style={{ background: "var(--color-surface-container)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                        style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }}>
                        {i + 1}
                      </span>
                      <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? lesson.titleAr : lesson.titleEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm">{typeIcon[lesson.type]}</span>
                      <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                        {lesson.duration}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quiz */}
          {course.quiz && course.quiz.length > 0 && (
            <QuizSection quiz={course.quiz} locale={locale} courseId={course.id} />
          )}

          {/* Related projects */}
          {relatedProjectsList.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "المشاريع المرتبطة" : "Related Projects"}
              </h2>
              <div className="flex flex-col gap-3">
                {relatedProjectsList.map((p) => p && (
                  <Link
                    key={p.id}
                    href={`/${locale}/projects/${p.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: "var(--color-surface-container)" }}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? p.titleAr : p.titleEn}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                        {p.difficulty} • {p.stack.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Skills */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "المهارات المكتسبة" : "Skills Gained"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-mono border"
                  style={{
                    background: "var(--portal-color-subtle)",
                    borderColor: "var(--portal-color-border)",
                    color: "var(--color-primary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          {course.toolsRequired && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "الأدوات المطلوبة" : "Required Tools"}
              </h3>
              <ul className="space-y-2">
                {course.toolsRequired.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span style={{ color: "var(--color-tertiary)" }}>🔧</span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related courses */}
          {relatedCoursesList.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "دورات مرتبطة" : "Related Courses"}
              </h3>
              <div className="space-y-3">
                {relatedCoursesList.map((c) => c && (
                  <Link
                    key={c.id}
                    href={`/${locale}/courses/${c.id}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <span>{c.icon}</span>
                    {isAr ? c.titleAr : c.titleEn}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="glass-card rounded-2xl p-6 text-center"
            style={{ border: "1px solid var(--portal-color-border)" }}
          >
            <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "جاهز للبدء؟" : "Ready to Start?"}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "انضم للمنصة وابدأ رحلتك" : "Join the platform and start your journey"}
            </p>
            <button className="glow-button-primary text-white font-mono text-sm px-6 py-3 rounded-xl w-full">
              {isAr ? "ابدأ الدورة مجاناً" : "Start Course Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
