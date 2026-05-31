import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, AlertTriangle, Cpu, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { lessonsData } from "@/data/iot/lessons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessonsData.find((l) => l.id === slug);
  if (!lesson) return { title: "Not Found" };
  return { title: `${lesson.title} | مختبر درهوس`, description: lesson.description };
}

export async function generateStaticParams() {
  return lessonsData.map((l) => ({ slug: l.id }));
}

export default async function IotLessonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lesson = lessonsData.find((l) => l.id === slug);
  if (!lesson) notFound();

  const nextLesson = lesson.nextLessonId ? lessonsData.find((l) => l.id === lesson.nextLessonId) : null;

  return (
    <div className="container-xl py-12 max-w-4xl" dir="rtl">
      <Link href={`/${locale}/iot-lab/lessons`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للدروس
      </Link>

      {/* Header */}
      <div className="glass-card rounded-3xl p-8 mb-8" style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
            {lesson.category}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            <Clock size={11} />{lesson.duration}
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>{lesson.title}</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.description}</p>
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>محتوى الدرس</h2>
        <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.content}</div>
      </div>

      {/* Components needed */}
      {lesson.componentsNeeded.length > 0 && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(249,115,22,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#f97316" }}>
            <Cpu size={15} /> المكونات المطلوبة
          </h2>
          <div className="flex flex-wrap gap-2">
            {lesson.componentsNeeded.map((c, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.08)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>{c}</span>
            ))}
          </div>
        </div>
      )}

      {/* Wiring notes */}
      {lesson.wiringNotes && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(142,213,255,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#8ed5ff" }}>ملاحظات التوصيل</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.wiringNotes}</p>
        </div>
      )}

      {/* Code example */}
      {lesson.codeExample && lesson.codeExample !== "// فهم المبادئ لا يحتاج لكود" && (
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--color-on-surface)" }}>مثال الكود</h2>
          <pre className="rounded-2xl p-5 text-sm overflow-x-auto" style={{ background: "#0d1117", color: "#79c0ff", fontFamily: "JetBrains Mono, monospace", direction: "ltr", textAlign: "left" }} dir="ltr">
            <code>{lesson.codeExample}</code>
          </pre>
        </div>
      )}

      {/* Common mistakes */}
      {lesson.commonMistakes && (
        <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(248,113,113,0.12)" }}>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#f87171" }}>
            <AlertTriangle size={15} /> الأخطاء الشائعة
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.commonMistakes}</p>
        </div>
      )}

      {/* Simulator link */}
      {lesson.simulatorLink && (
        <div className="glass-card rounded-2xl p-5 mb-8" style={{ border: "1px solid rgba(60,224,251,0.15)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#3ce0fb" }}>جرّب في المحاكي</h2>
          <a href={lesson.simulatorLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-80" style={{ background: "rgba(60,224,251,0.1)", color: "#3ce0fb", border: "1px solid rgba(60,224,251,0.25)" }}>
            <ExternalLink size={14} /> فتح في Wokwi Simulator
          </a>
        </div>
      )}

      {/* Navigation */}
      {nextLesson && (
        <div className="flex justify-start">
          <Link href={`/${locale}/iot-lab/lessons/${nextLesson.id}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all hover:scale-[1.02]" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316", textDecoration: "none" }}>
            <div>
              <p className="text-[10px] font-mono opacity-70">الدرس التالي</p>
              <p className="text-sm font-semibold">{nextLesson.title}</p>
            </div>
            <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
          </Link>
        </div>
      )}
    </div>
  );
}
