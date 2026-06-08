import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lessonsData } from "@/data/iot/lessons";
import type { Lesson } from "@/data/iot/lessons";
import IotLessonsClient from "@/components/iot/IotLessonsClient";
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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const allLessons = await fetchAllLessons();
  return {
    title: isAr ? "دروس الأردوينو | مختبر درهوس" : "Arduino Lessons | Darhous IoT Lab",
    description: isAr ? `${allLessons.length}+ درس بالعربية لتعلم برمجة الأردوينو من الصفر.` : `${allLessons.length}+ Arabic lessons to learn Arduino from scratch.`,
  };
}

export default async function IotLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allLessons = await fetchAllLessons();

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>دروس الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{allLessons.length} درس تفاعلي مع كود جاهز، مخطط توصيل، والأخطاء الشائعة.</p>

      <IotLessonsClient lessons={allLessons} locale={locale} />
    </div>
  );
}
