"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ProjectCard from "@/components/cards/ProjectCard";
import { projects, projectCategories } from "@/data/projects";

export default function ProjectsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const diffMatch = activeDifficulty === "all" || p.difficulty === activeDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "المشاريع" : "Projects"}
          title={isAr ? "مكتبة المشاريع العملية" : "Real-World Projects Library"}
          subtitle={isAr
            ? "مشاريع ذكاء اصطناعي حقيقية مع أدلة بناء كاملة وأفكار توسع مستقبلية"
            : "Real AI projects with complete build guides and future expansion ideas"}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الفئة:" : "Category:"}
          </p>
          <CategoryFilter
            categories={projectCategories}
            active={activeCategory}
            onChange={setActiveCategory}
            allLabel={isAr ? "الكل" : "All"}
          />
        </div>
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الصعوبة:" : "Difficulty:"}
          </p>
          <CategoryFilter
            categories={["beginner", "intermediate", "advanced"]}
            active={activeDifficulty}
            onChange={setActiveDifficulty}
            allLabel={isAr ? "الكل" : "All"}
          />
        </div>
      </div>

      <p className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} مشروع` : `Showing ${filtered.length} projects`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد مشاريع مطابقة" : "No matching projects"}
          </p>
        </div>
      )}
    </div>
  );
}
