"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Props {
  courseSlug: string;
  lessonId: string;
  isAr: boolean;
  onProgressUpdate?: (percent: number) => void;
}

export default function LessonProgressButton({ courseSlug, lessonId, isAr, onProgressUpdate }: Props) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch(`/api/progress/lesson?course_slug=${courseSlug}`)
      .then(r => r.json())
      .then(d => {
        if (d.completed?.includes(lessonId)) setCompleted(true);
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, [courseSlug, lessonId]);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    const newVal = !completed;
    try {
      const res = await fetch("/api/progress/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_slug: courseSlug, lesson_id: lessonId, completed: newVal }),
      });
      const data = await res.json();
      if (res.ok) {
        setCompleted(newVal);
        if (data.progress_percent !== undefined) onProgressUpdate?.(data.progress_percent);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!checked) return null;

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
      style={{
        background: completed ? "var(--color-tertiary)15" : "var(--color-surface-container)",
        border: `1px solid ${completed ? "var(--color-tertiary)" : "var(--color-outline-variant)"}`,
        color: completed ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
      }}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : completed ? (
        <CheckCircle2 size={15} />
      ) : (
        <Circle size={15} />
      )}
      {completed
        ? (isAr ? "مكتمل ✓" : "Completed ✓")
        : (isAr ? "اضغط عند الإنهاء" : "Mark as complete")}
    </button>
  );
}
