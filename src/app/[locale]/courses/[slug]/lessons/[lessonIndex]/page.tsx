import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { lessonContent } from "@/data/lessons/content";
import MdxContent from "@/components/blog/MdxContent";
import LessonProgressButton from "@/components/lesson/LessonProgressButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

type Params = Promise<{ locale: string; slug: string; lessonIndex: string }>;

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  return locales.flatMap((locale) =>
    courses.flatMap((c) =>
      (c.lessonOutline ?? []).map((_, i) => ({
        locale,
        slug: c.id,
        lessonIndex: String(i + 1),
      }))
    )
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug, lessonIndex } = await params;
  const course = courses.find((c) => c.id === slug);
  const idx = parseInt(lessonIndex, 10) - 1;
  const lesson = course?.lessonOutline?.[idx];
  if (!course || !lesson) return { title: "Lesson Not Found" };
  const isAr = locale === "ar";
  return {
    title: isAr ? `${lesson.titleAr} — ${course.titleAr}` : `${lesson.titleEn} — ${course.titleEn}`,
    description: isAr ? course.descriptionAr : course.descriptionEn,
    robots: { index: false },
  };
}

const typeIcon: Record<string, string> = {
  video: "🎥",
  reading: "📖",
  project: "🔨",
  quiz: "✅",
};

const typeLabel: Record<string, { ar: string; en: string }> = {
  video:   { ar: "فيديو",  en: "Video"   },
  reading: { ar: "قراءة", en: "Reading"  },
  project: { ar: "مشروع", en: "Project"  },
  quiz:    { ar: "اختبار", en: "Quiz"    },
};

export default async function LessonPage({ params }: { params: Params }) {
  const { locale, slug, lessonIndex } = await params;
  const course = courses.find((c) => c.id === slug);
  if (!course || !course.lessonOutline) notFound();

  const idx = parseInt(lessonIndex, 10) - 1;
  const lesson = course.lessonOutline[idx];
  if (!lesson) notFound();

  const isAr = locale === "ar";
  const total = course.lessonOutline.length;
  const PrevChevron = isAr ? ChevronRight : ChevronLeft;
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  const content = lessonContent[slug]?.[idx] ?? null;
  const body = isAr ? content?.bodyAr : content?.bodyEn;
  const prevIdx = idx > 0 ? idx : null;
  const nextIdx = idx < total - 1 ? idx + 2 : null;

  return (
    <div className="container-xl py-10 flex flex-col gap-8">
      <Breadcrumbs
        locale={locale}
        items={[
          { labelAr: "الرئيسية",     labelEn: "Home",    href: `/${locale}` },
          { labelAr: "الدورات",       labelEn: "Courses", href: `/${locale}/courses` },
          { labelAr: course.titleAr, labelEn: course.titleEn, href: `/${locale}/courses/${course.id}` },
          { labelAr: lesson.titleAr, labelEn: lesson.titleEn },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar — lesson list */}
        <aside className="hidden lg:block">
          <div className="glass-card rounded-2xl p-4 sticky top-20">
            <p className="font-mono text-xs mb-3 uppercase tracking-wider" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "محتوى الدورة" : "Course Content"}
            </p>
            <div className="space-y-0.5">
              {course.lessonOutline.map((l, i) => (
                <Link
                  key={i}
                  href={`/${locale}/courses/${course.id}/lessons/${i + 1}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:opacity-80"
                  style={{
                    background: i === idx ? "var(--color-primary-container)" : "transparent",
                    color: i === idx ? "var(--color-on-primary-container)" : "var(--color-on-surface-variant)",
                    fontWeight: i === idx ? 600 : 400,
                  }}
                >
                  <span className="flex-shrink-0">{typeIcon[l.type]}</span>
                  <span className="leading-snug truncate">{isAr ? l.titleAr : l.titleEn}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Header */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
            }}
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-2xl">{typeIcon[lesson.type]}</span>
              <span
                className="font-mono text-xs px-2 py-1 rounded-lg"
                style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }}
              >
                {isAr ? typeLabel[lesson.type].ar : typeLabel[lesson.type].en}
              </span>
              <span className="font-mono text-xs flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
                <Clock size={12} /> {lesson.duration}
              </span>
              <span className="font-mono text-xs ms-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                {idx + 1} / {total}
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? lesson.titleAr : lesson.titleEn}
            </h1>
          </div>

          {/* Body */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {body ? (
              <MdxContent source={body} />
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">🚧</p>
                <p className="font-display font-bold text-xl mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "المحتوى قادم قريباً" : "Content Coming Soon"}
                </p>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr
                    ? "يعمل الفريق على إضافة محتوى تفصيلي لهذا الدرس"
                    : "The team is working on detailed content for this lesson"}
                </p>
              </div>
            )}
          </div>

          {/* Code example */}
          {content?.codeExample && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: "var(--color-surface-container-high)",
                  borderBottom: "1px solid var(--color-outline-variant)",
                }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                <span className="font-mono text-xs ms-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  {content.codeLanguage ?? "code"}
                </span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-xs font-mono leading-relaxed"
                style={{ color: "var(--color-tertiary)" }}
              >
                <code>{content.codeExample}</code>
              </pre>
            </div>
          )}

          {/* Navigation + Mark Complete */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {prevIdx !== null ? (
              <Link
                href={`/${locale}/courses/${course.id}/lessons/${prevIdx}`}
                className="flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
              >
                <PrevChevron size={16} />
                {isAr ? "السابق" : "Previous"}
              </Link>
            ) : (
              <div />
            )}

            <LessonProgressButton
              locale={locale}
              courseSlug={course.id}
              lessonId={`lesson-${idx + 1}`}
            />

            {nextIdx !== null ? (
              <Link
                href={`/${locale}/courses/${course.id}/lessons/${nextIdx}`}
                className="glow-button-primary flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-xl text-white transition-all hover:-translate-y-0.5"
              >
                {isAr ? "التالي" : "Next"}
                <NextChevron size={16} />
              </Link>
            ) : (
              <Link
                href={`/${locale}/courses/${course.id}`}
                className="glow-button-primary flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-xl text-white"
              >
                {isAr ? "إنهاء الدورة" : "Finish Course"}
                <NextChevron size={16} />
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
