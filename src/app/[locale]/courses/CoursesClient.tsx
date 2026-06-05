"use client";

import { useState } from "react";
import CourseCard from "@/components/cards/CourseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { courses, courseCategories } from "@/data/courses";

export default function CoursesClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");

  const filtered = courses.filter((c) => {
    if (c.comingSoon) return false;
    const catMatch = activeCategory === "all" || c.category === activeCategory;
    const levelMatch = activeLevel === "all" || c.level === activeLevel;
    return catMatch && levelMatch;
  });

  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "الدورات" : "Courses"}
          title={isAr ? "جميع الدورات التعليمية" : "All Learning Courses"}
          subtitle={isAr
            ? "مسارات تعليمية منظمة من أساسيات الذكاء الاصطناعي إلى MLOps المتقدم ونشر السحاب"
            : "Structured learning tracks from AI foundations to advanced MLOps and cloud deployment"}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الفئة:" : "Category:"}
          </p>
          <CategoryFilter
            categories={courseCategories}
            active={activeCategory}
            onChange={setActiveCategory}
            allLabel={isAr ? "الكل" : "All"}
          />
        </div>
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "المستوى:" : "Level:"}
          </p>
          <CategoryFilter
            categories={levels}
            active={activeLevel}
            onChange={setActiveLevel}
            allLabel={isAr ? "الكل" : "All"}
          />
        </div>
      </div>

      <p className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} دورة` : `Showing ${filtered.length} courses`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد دورات مطابقة" : "No matching courses"}
          </p>
        </div>
      )}
    </div>
  );
}
