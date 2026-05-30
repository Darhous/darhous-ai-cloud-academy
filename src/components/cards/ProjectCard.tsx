import type { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const difficultyVariant = {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "advanced",
  } as const;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1 group">
      {/* Icon & Difficulty */}
      <div className="flex items-start justify-between">
        <span className="text-3xl">{project.icon}</span>
        <Badge variant={difficultyVariant[project.difficulty]}>
          {project.difficulty}
        </Badge>
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-display font-semibold text-lg group-hover:text-primary transition-colors"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? project.titleAr : project.titleEn}
        </h3>
        <span className="text-xs font-mono" style={{ color: "var(--color-outline)" }}>
          {project.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? project.descriptionAr : project.descriptionEn}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-primary)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Future idea */}
      <div
        className="text-xs font-mono p-3 rounded-lg"
        style={{
          background: "rgba(208,188,255,0.06)",
          borderLeft: "2px solid var(--color-secondary)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        💡 {isAr ? project.futureIdeaAr : project.futureIdea}
      </div>

      {/* CTA */}
      <Link
        href={`/${locale}/projects/${project.id}`}
        className="flex items-center gap-2 text-sm font-mono group-hover:gap-3 transition-all"
        style={{ color: "var(--color-primary)" }}
      >
        {isAr ? "ابنِ هذا المشروع" : "Build This Project"}
        <Arrow size={14} />
      </Link>
    </div>
  );
}
