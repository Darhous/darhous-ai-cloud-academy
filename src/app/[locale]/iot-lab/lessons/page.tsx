import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { lessonsData } from "@/data/iot/lessons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "دروس الأردوينو | مختبر درهوس" : "Arduino Lessons | Darhous IoT Lab",
    description: isAr ? `${lessonsData.length}+ درس بالعربية لتعلم برمجة الأردوينو من الصفر.` : `${lessonsData.length}+ Arabic lessons to learn Arduino from scratch.`,
  };
}

export default async function IotLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Group by category
  const grouped = lessonsData.reduce<Record<string, typeof lessonsData>>((acc, l) => {
    if (!acc[l.category]) acc[l.category] = [];
    acc[l.category].push(l);
    return acc;
  }, {});

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>دروس الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{lessonsData.length} درس تفاعلي مع كود جاهز، مخطط توصيل، والأخطاء الشائعة.</p>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, lessons]) => (
          <div key={category}>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-2 h-6 rounded-full" style={{ background: "#f97316" }} />
              {category}
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({lessons.length} درس)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/${locale}/iot-lab/lessons/${lesson.id}`}
                  className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid rgba(249,115,22,0.12)", textDecoration: "none" }}
                >
                  <h3 className="font-semibold text-sm leading-snug" style={{ color: "var(--color-on-surface)" }}>{lesson.title}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                      <Clock size={10} />{lesson.duration}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "#f97316" }}>→ قراءة الدرس</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
