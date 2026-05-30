"use client";

import { useAllFavorites } from "@/hooks/useLocalFavorites";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { prompts } from "@/data/prompts";
import Link from "next/link";

export default function MySpacePanel({ locale }: { locale: string }) {
  const favs = useAllFavorites();
  const isAr = locale === "ar";

  const savedCourses = favs.courses.map((id) => courses.find((c) => c.id === id)).filter(Boolean);
  const savedTools = favs.tools.map((id) => tools.find((t) => t.id === id)).filter(Boolean);
  const savedPrompts = favs.prompts.map((id) => prompts.find((p) => p.id === id)).filter(Boolean);

  const total = savedCourses.length + savedTools.length + savedPrompts.length;

  if (total === 0) return null;

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-6"
      style={{ border: "1px solid rgba(142,213,255,0.1)" }}
    >
      <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
        ❤️ {isAr ? "مساحتي الشخصية" : "My Space"}
        <span className="font-mono text-sm font-normal" style={{ color: "var(--color-on-surface-variant)" }}>
          ({total})
        </span>
      </h2>

      {savedCourses.length > 0 && (
        <div>
          <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-primary)" }}>
            {isAr ? "الدورات المحفوظة" : "Saved Courses"} ({savedCourses.length})
          </p>
          <div className="space-y-2">
            {savedCourses.map((c) => c && (
              <Link key={c.id} href={`/${locale}/courses/${c.id}`}
                className="flex items-center gap-2 text-sm p-2 rounded-lg transition-all hover:opacity-80"
                style={{ color: "var(--color-on-surface-variant)" }}>
                <span>{c.icon}</span>
                {isAr ? c.titleAr : c.titleEn}
              </Link>
            ))}
          </div>
        </div>
      )}

      {savedTools.length > 0 && (
        <div>
          <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-tertiary)" }}>
            {isAr ? "الأدوات المحفوظة" : "Saved Tools"} ({savedTools.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {savedTools.map((t) => t && (
              <Link key={t.id} href={`/${locale}/tools/${t.id}`}
                className="px-3 py-1 rounded-full text-xs font-mono border transition-all hover:opacity-80"
                style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {savedPrompts.length > 0 && (
        <div>
          <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-secondary)" }}>
            {isAr ? "المطالبات المحفوظة" : "Saved Prompts"} ({savedPrompts.length})
          </p>
          <div className="space-y-2">
            {savedPrompts.map((p) => p && (
              <Link key={p.id} href={`/${locale}/prompts`}
                className="flex items-center gap-2 text-sm p-2 rounded-lg transition-all hover:opacity-80"
                style={{ color: "var(--color-on-surface-variant)" }}>
                <span>📝</span>
                {isAr ? p.titleAr : p.titleEn}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
