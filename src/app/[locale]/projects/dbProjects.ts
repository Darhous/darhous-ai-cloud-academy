import "server-only";
import { fetchPublishedList, fetchPublishedOne } from "@/lib/content/read-with-fallback";
import type { Project, BuildStep } from "@/data/projects";

/**
 * Shared DB row shape + mapper for ai_projects — used by the list page,
 * the [slug] detail page, and the [slug]/build page (all three need to
 * resolve a Project from the DB, including its nested buildSteps).
 */
export interface ProjectRow extends Record<string, unknown> {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  stack: string[];
  skills: string[];
  expected_output: string;
  expected_output_ar: string;
  future_idea: string;
  future_idea_ar: string;
  category: string;
  icon: string;
  featured: boolean;
  goal_ar: string | null;
  goal_en: string | null;
  build_steps: BuildStep[] | null;
  required_tools: string[] | null;
  related_courses: string[] | null;
  related_tools: string[] | null;
}

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    difficulty: row.difficulty,
    stack: row.stack ?? [],
    skills: row.skills ?? [],
    expectedOutput: row.expected_output,
    expectedOutputAr: row.expected_output_ar,
    futureIdea: row.future_idea,
    futureIdeaAr: row.future_idea_ar,
    category: row.category,
    icon: row.icon,
    featured: row.featured,
    goalAr: row.goal_ar ?? undefined,
    goalEn: row.goal_en ?? undefined,
    buildSteps: row.build_steps ?? undefined,
    requiredTools: row.required_tools ?? undefined,
    relatedCourses: row.related_courses ?? undefined,
    relatedTools: row.related_tools ?? undefined,
  };
}

export async function fetchDbProjects(): Promise<Project[]> {
  return fetchPublishedList<ProjectRow, Project>({
    table: "ai_projects",
    mapRow: mapProjectRow,
    orderBy: { column: "sort_order", ascending: true },
  });
}

export async function fetchDbProject(slug: string): Promise<Project | null> {
  return fetchPublishedOne<ProjectRow, Project>({
    table: "ai_projects",
    mapRow: mapProjectRow,
    match: { id: slug },
  });
}
