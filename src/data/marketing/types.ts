// Marketing Academy — typed content model.
// Mirrors the DB hierarchy: Track → Module → Lesson → Topic.
// These typed arrays are the static fallback that routes render; the same
// shape is published into the `marketing_*` Supabase tables (see
// supabase/v50_marketing_portal.sql) and merged via fetchPublishedList + mergeById.

export type MarketingStage = "beginner" | "intermediate" | "advanced" | "expert";

/** 1 Beginner · 2 Easy · 3 Intermediate · 4 Advanced · 5 Expert */
export type MarketingDifficulty = 1 | 2 | 3 | 4 | 5;

export interface MarketingTopic {
  id: string;
  titleAr: string;
  titleEn: string;
}

export interface MarketingLesson {
  id: string;
  titleAr: string;
  titleEn: string;
  estMinutes?: number;
  /** fine-grained concepts inside the lesson (flagship tracks expand these) */
  topics?: MarketingTopic[];
}

export interface MarketingModule {
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr?: string;
  summaryEn?: string;
  lessons: MarketingLesson[];
}

export interface MarketingTrack {
  id: string;
  order: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stage: MarketingStage;
  difficulty: MarketingDifficulty;
  durationHours: number;
  icon: string;
  color: string;
  skillsAr: string[];
  skillsEn: string[];
  /** ids of prerequisite tracks */
  prereqs: string[];
  finalProjectAr: string;
  finalProjectEn: string;
  modules: MarketingModule[];
  featured?: boolean;
}

export interface MarketingStageMeta {
  id: MarketingStage;
  labelAr: string;
  labelEn: string;
  color: string;
}

export const MARKETING_STAGES: MarketingStageMeta[] = [
  { id: "beginner", labelAr: "مبتدئ", labelEn: "Beginner", color: "#22c55e" },
  { id: "intermediate", labelAr: "متوسط", labelEn: "Intermediate", color: "#3b82f6" },
  { id: "advanced", labelAr: "متقدم", labelEn: "Advanced", color: "#a855f7" },
  { id: "expert", labelAr: "خبير", labelEn: "Expert", color: "#ec4899" },
];

export const DIFFICULTY_LABEL: Record<MarketingDifficulty, { ar: string; en: string }> = {
  1: { ar: "مبتدئ", en: "Beginner" },
  2: { ar: "سهل", en: "Easy" },
  3: { ar: "متوسط", en: "Intermediate" },
  4: { ar: "متقدم", en: "Advanced" },
  5: { ar: "خبير", en: "Expert" },
};

/** total lesson count across all modules of a track */
export function countLessons(track: MarketingTrack): number {
  return track.modules.reduce((n, m) => n + m.lessons.length, 0);
}
