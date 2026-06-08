import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, AlertTriangle, Cpu, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { lessonsData } from "@/data/iot/lessons";
import type { Lesson } from "@/data/iot/lessons";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface LessonRow extends Record<string, unknown> {
  id: string; title: string; category: string; duration: string; description: string; content: string;
  components_needed: string[]; wiring_notes: string; code_example: string; common_mistakes: string;
  simulator_link?: string; next_lesson_id?: string; title_en?: string; category_en?: string;
  description_en?: string; content_en?: string; wiring_notes_en?: string; common_mistakes_en?: string;
}
function mapLessonRow(row: LessonRow): Lesson {
  return {
    id: row.id, title: row.title, category: row.category, duration: row.duration, description: row.description,
    content: row.content, componentsNeeded: row.components_needed ?? [], wiringNotes: row.wiring_notes,
    codeExample: row.code_example, commonMistakes: row.common_mistakes, simulatorLink: row.simulator_link,
    nextLessonId: row.next_lesson_id, titleEn: row.title_en, categoryEn: row.category_en,
    descriptionEn: row.description_en, contentEn: row.content_en, wiringNotesEn: row.wiring_notes_en,
    commonMistakesEn: row.common_mistakes_en,
  };
}
async function fetchAllLessons(): Promise<Lesson[]> {
  const dbLessons = await fetchPublishedList<LessonRow, Lesson>({
    table: "iot_lessons", mapRow: mapLessonRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbLessons, lessonsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const lessons = await fetchAllLessons();
  const lesson = lessons.find((l) => l.id === slug);
  if (!lesson) return { title: "Not Found" };
  const title = isAr ? lesson.title : (lesson.titleEn ?? lesson.title);
  const description = isAr ? lesson.description : (lesson.descriptionEn ?? lesson.description);
  return { title: `${title} | Darhous IoT Lab`, description };
}

export async function generateStaticParams() {
  return lessonsData.map((l) => ({ slug: l.id }));
}

export default async function IotLessonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const lessons = await fetchAllLessons();
  const lesson = lessons.find((l) => l.id === slug);
  if (!lesson) notFound();

  const nextLesson = lesson.nextLessonId ? lessons.find((l) => l.id === lesson.nextLessonId) : null;

  const t = {
    backToLessons: isAr ? "العودة للدروس" : "Back to Lessons",
    lessonContent: isAr ? "محتوى الدرس" : "Lesson Content",
    componentsNeeded: isAr ? "المكونات المطلوبة" : "Components Needed",
    wiringNotes: isAr ? "ملاحظات التوصيل" : "Wiring Notes",
    codeExample: isAr ? "مثال الكود" : "Code Example",
    commonMistakes: isAr ? "الأخطاء الشائعة" : "Common Mistakes",
    tryInSimulator: isAr ? "جرّب في المحاكي" : "Try in Simulator",
    openInWokwi: isAr ? "فتح في Wokwi Simulator" : "Open in Wokwi Simulator",
    nextLesson: isAr ? "الدرس التالي" : "Next Lesson",
  };

  const title = isAr ? lesson.title : (lesson.titleEn ?? lesson.title);
  const category = isAr ? lesson.category : (lesson.categoryEn ?? lesson.category);
  const description = isAr ? lesson.description : (lesson.descriptionEn ?? lesson.description);
  const content = isAr ? lesson.content : (lesson.contentEn ?? lesson.content);
  const wiringNotes = isAr ? lesson.wiringNotes : (lesson.wiringNotesEn ?? lesson.wiringNotes);
  const commonMistakes = isAr ? lesson.commonMistakes : (lesson.commonMistakesEn ?? lesson.commonMistakes);
  const nextTitle = nextLesson
    ? (isAr ? nextLesson.title : (nextLesson.titleEn ?? nextLesson.title))
    : null;

  const dir = isAr ? "rtl" : "ltr";
  const ArrowBack = isAr ? ArrowRight : ArrowLeft;
  const ArrowForward = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="container-xl py-12 max-w-4xl" dir={dir}>
      <Link href={`/${locale}/iot-lab/lessons`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowBack size={14} />{t.backToLessons}
      </Link>

      {/* Header */}
      <div className="glass-card rounded-3xl p-8 mb-8" style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            <Clock size={11} />{lesson.duration}
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>{title}</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{description}</p>
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>{t.lessonContent}</h2>
        <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--color-on-surface-variant)" }}>{content}</div>
      </div>

      {/* Components needed */}
      {lesson.componentsNeeded.length > 0 && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(249,115,22,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#f97316" }}>
            <Cpu size={15} /> {t.componentsNeeded}
          </h2>
          <div className="flex flex-wrap gap-2">
            {lesson.componentsNeeded.map((c, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.08)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>{c}</span>
            ))}
          </div>
        </div>
      )}

      {/* Wiring notes */}
      {wiringNotes && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(142,213,255,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#8ed5ff" }}>{t.wiringNotes}</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{wiringNotes}</p>
        </div>
      )}

      {/* Code example */}
      {lesson.codeExample && lesson.codeExample !== "// فهم المبادئ لا يحتاج لكود" && (
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--color-on-surface)" }}>{t.codeExample}</h2>
          <pre className="rounded-2xl p-5 text-sm overflow-x-auto" style={{ background: "#0d1117", color: "#79c0ff", fontFamily: "JetBrains Mono, monospace", direction: "ltr", textAlign: "left" }} dir="ltr">
            <code>{lesson.codeExample}</code>
          </pre>
        </div>
      )}

      {/* Common mistakes */}
      {commonMistakes && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(248,113,113,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#f87171" }}>
            <AlertTriangle size={15} /> {t.commonMistakes}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{commonMistakes}</p>
        </div>
      )}

      {/* Simulator link */}
      {lesson.simulatorLink && (
        <div className="glass-card rounded-2xl p-5 mb-8" style={{ border: "1px solid rgba(60,224,251,0.15)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#3ce0fb" }}>{t.tryInSimulator}</h2>
          <a href={lesson.simulatorLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-80" style={{ background: "rgba(60,224,251,0.1)", color: "#3ce0fb", border: "1px solid rgba(60,224,251,0.25)" }}>
            <ExternalLink size={14} /> {t.openInWokwi}
          </a>
        </div>
      )}

      {/* Navigation */}
      {nextLesson && nextTitle && (
        <div className={`flex ${isAr ? "justify-start" : "justify-end"}`}>
          <Link href={`/${locale}/iot-lab/lessons/${nextLesson.id}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all hover:scale-[1.02]" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316", textDecoration: "none" }}>
            {isAr && <ArrowForward size={16} style={{ transform: "rotate(180deg)" }} />}
            <div>
              <p className="text-[10px] font-mono opacity-70">{t.nextLesson}</p>
              <p className="text-sm font-semibold">{nextTitle}</p>
            </div>
            {!isAr && <ArrowForward size={16} />}
          </Link>
        </div>
      )}
    </div>
  );
}
