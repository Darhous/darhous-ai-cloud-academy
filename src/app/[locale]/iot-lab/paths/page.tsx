import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { pathsData } from "@/data/iot/paths";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات تعلم الأردوينو | مختبر درهوس" : "Arduino Learning Paths | Darhous IoT Lab",
    description: isAr ? "مسارات تعلم منظمة من الصفر للأردوينو وإنترنت الأشياء." : "Structured learning paths from zero for Arduino and IoT.",
  };
}

const LEVEL_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171", خبير: "#d0bcff" };

export default async function IotPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مسارات تعلم الأردوينو وإنترنت الأشياء</h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>{pathsData.length} مسار منظم — من لا خبرة إلى بناء مشاريع IoT متكاملة.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pathsData.map((path) => {
          const color = LEVEL_COLOR[path.level] ?? "#f97316";
          return (
            <Link
              key={path.id}
              href={`/${locale}/iot-lab/paths/${path.id}`}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1"
              style={{ border: `1px solid ${color}18`, textDecoration: "none" }}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{path.level}</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}><Clock size={11} />{path.duration}</span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>{path.title}</h3>
                <p className="text-xs" style={{ color: color, opacity: 0.8 }}>{path.englishTitle}</p>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{path.description}</p>
              <div className="text-xs rounded-xl p-3" style={{ background: `${color}06`, border: `1px solid ${color}15` }}>
                <p className="font-semibold mb-0.5" style={{ color }}>المشروع النهائي</p>
                <p style={{ color: "var(--color-on-surface-variant)" }}>{path.finalProject}</p>
              </div>
              <div className="text-center py-2 rounded-lg text-xs font-mono" style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}>{path.ctaText}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
