import "server-only";
import { fetchPublishedList, fetchPublishedOne } from "@/lib/content/read-with-fallback";
import type { Course, LessonItem, QuizQuestion } from "@/data/courses";

/**
 * Shared DB row shape + mapper for ai_courses — used by the list page,
 * the [slug] detail page, and the lesson sub-page (all three need to
 * resolve a Course from the DB, including its nested lessonOutline/quiz).
 */
export interface CourseRow extends Record<string, unknown> {
  id: string;
  category: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  hours: number;
  projects: number;
  skills: string[];
  icon: string;
  featured: boolean;
  color: string;
  coming_soon: boolean;
  overview_ar: string | null;
  overview_en: string | null;
  for_who_ar: string[] | null;
  for_who_en: string[] | null;
  what_you_learn_ar: string[] | null;
  what_you_learn_en: string[] | null;
  tools_required: string[] | null;
  related_projects: string[] | null;
  related_courses: string[] | null;
  lesson_outline: LessonItem[] | null;
  quiz: QuizQuestion[] | null;
}

export function mapCourseRow(row: CourseRow): Course {
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    level: row.level,
    lessons: row.lessons,
    hours: row.hours,
    projects: row.projects,
    skills: row.skills ?? [],
    category: row.category,
    icon: row.icon,
    featured: row.featured,
    color: row.color,
    comingSoon: row.coming_soon ?? undefined,
    overviewAr: row.overview_ar ?? undefined,
    overviewEn: row.overview_en ?? undefined,
    forWhoAr: row.for_who_ar ?? undefined,
    forWhoEn: row.for_who_en ?? undefined,
    whatYouLearnAr: row.what_you_learn_ar ?? undefined,
    whatYouLearnEn: row.what_you_learn_en ?? undefined,
    toolsRequired: row.tools_required ?? undefined,
    lessonOutline: row.lesson_outline ?? undefined,
    relatedProjects: row.related_projects ?? undefined,
    relatedCourses: row.related_courses ?? undefined,
    quiz: row.quiz ?? undefined,
  };
}

export async function fetchDbCourses(): Promise<Course[]> {
  return fetchPublishedList<CourseRow, Course>({
    table: "ai_courses",
    mapRow: mapCourseRow,
    orderBy: { column: "sort_order", ascending: true },
  });
}

export async function fetchDbCourse(slug: string): Promise<Course | null> {
  return fetchPublishedOne<CourseRow, Course>({
    table: "ai_courses",
    mapRow: mapCourseRow,
    match: { id: slug },
  });
}
