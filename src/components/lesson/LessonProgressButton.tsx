"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  locale: string;
  courseSlug: string;
  lessonId: string;
}

export default function LessonProgressButton({ locale, courseSlug, lessonId }: Props) {
  const isAr = locale === "ar";
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/progress/lesson?course_slug=${encodeURIComponent(courseSlug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.completed) && d.completed.includes(lessonId)) {
          setCompleted(true);
        }
      })
      .catch(() => {});
  }, [courseSlug, lessonId]);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/progress/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_slug: courseSlug,
          lesson_id: lessonId,
          completed: !completed,
        }),
      });
      if (res.ok) setCompleted((prev) => !prev);
    } catch {
      // silently fail when user is not logged in
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded-xl border transition-all hover:-translate-y-0.5 disabled:opacity-50"
      style={{
        background: completed ? "rgba(16,185,129,0.1)" : "var(--color-surface-container)",
        borderColor: completed ? "rgba(16,185,129,0.4)" : "var(--color-outline-variant)",
        color: completed ? "rgb(16,185,129)" : "var(--color-on-surface-variant)",
      }}
    >
      <CheckCircle2 size={16} />
      {completed
        ? isAr ? "✓ مكتمل" : "✓ Completed"
        : isAr ? "تعليم كمكتمل" : "Mark Complete"}
    </button>
  );
}
