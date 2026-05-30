// Shared translation utilities for commonly untranslated UI strings

export function translateLevel(level: string, isAr: boolean): string {
  if (!isAr) return level;
  const map: Record<string, string> = {
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
  };
  return map[level.toLowerCase()] ?? level;
}

export function translateDuration(duration: string, isAr: boolean): string {
  if (!isAr) return duration;
  return duration
    .replace(/(\d+)\s*weeks?/i, (_, n) => `${n} ${n === "1" ? "أسبوع" : "أسابيع"}`)
    .replace(/(\d+)\s*w\b/i, (_, n) => `${n} ${n === "1" ? "أسبوع" : "أسابيع"}`)
    .replace(/(\d+)\s*hours?/i, (_, n) => `${n} ساعة`)
    .replace(/(\d+)\s*h\b/i, (_, n) => `${n} ساعة`)
    .replace(/(\d+)\s*min(utes?)?/i, (_, n) => `${n} دقيقة`);
}

export const LEVEL_LABELS_AR: Record<string, string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
};

export const LEVEL_LABELS_EN: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function getLevelLabel(level: string, isAr: boolean): string {
  const map = isAr ? LEVEL_LABELS_AR : LEVEL_LABELS_EN;
  return map[level.toLowerCase()] ?? level;
}
