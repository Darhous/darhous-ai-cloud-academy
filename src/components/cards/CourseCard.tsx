import Link from "next/link";
import { BookOpen, Clock, FolderOpen, ArrowRight, ArrowLeft } from "lucide-react";
import type { Course } from "@/data/courses";
import Badge from "@/components/ui/Badge";
import FavoriteButton from "@/components/features/FavoriteButton";

interface CourseCardProps {
  course: Course;
  locale: string;
}

const levelVariant = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
} as const;

const levelLabel = {
  beginner:     { ar: "مبتدئ",  en: "Beginner"     },
  intermediate: { ar: "متوسط",  en: "Intermediate"  },
  advanced:     { ar: "متقدم",  en: "Advanced"      },
};

export default function CourseCard({ course, locale }: CourseCardProps) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/${locale}/courses/${course.id}`}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Icon & Level */}
      <div className="flex items-start justify-between">
        <span className="text-3xl">{course.icon}</span>
        <div className="flex items-center gap-1">
          <FavoriteButton id={course.id} type="course" locale={locale} />
          <Badge variant={levelVariant[course.level]}>
            {isAr ? levelLabel[course.level].ar : levelLabel[course.level].en}
          </Badge>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? course.titleAr : course.titleEn}
        </h3>
        {isAr && (
          <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
            {course.titleEn}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? course.descriptionAr : course.descriptionEn}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {course.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--color-surface-container-high)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {skill}
          </span>
        ))}
        {course.skills.length > 3 && (
          <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ color: "var(--color-outline)" }}>
            +{course.skills.length - 3}
          </span>
        )}
      </div>

      {/* Stats & CTA */}
      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {course.lessons} {isAr ? "درس" : "lessons"}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {course.hours}h
          </span>
          <span className="flex items-center gap-1">
            <FolderOpen size={12} />
            {course.projects}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-mono group-hover:gap-2 transition-all" style={{ color: "var(--color-primary)" }}>
          {isAr ? "ابدأ" : "Start"}
          <Arrow size={12} />
        </span>
      </div>
    </Link>
  );
}
