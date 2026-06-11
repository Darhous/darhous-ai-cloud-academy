import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, ExternalLink, BookOpen, Cpu } from "lucide-react";
import { simulatorsData } from "@/data/iot/simulators";
import type { SimulatorTemplate } from "@/data/iot/simulators";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface SimulatorRow extends Record<string, unknown> {
  id: string; title: string; description: string; category: SimulatorTemplate["category"]; wokwi_id: string;
}
function mapSimulatorRow(row: SimulatorRow): SimulatorTemplate {
  return { id: row.id, title: row.title, description: row.description, category: row.category, wokwiId: row.wokwi_id };
}
async function fetchAllSimulators(): Promise<SimulatorTemplate[]> {
  const dbSimulators = await fetchPublishedList<SimulatorRow, SimulatorTemplate>({
    table: "iot_simulators", mapRow: mapSimulatorRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbSimulators, simulatorsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "محاكي الأردوينو التفاعلي " : "Interactive Arduino Simulator | NexaLearn IoT Lab",
    description: isAr ? "جرّب مشاريع الأردوينو مباشرة في المتصفح عبر Wokwi بدون أي أجهزة." : "Try Arduino projects directly in the browser via Wokwi without any hardware.",
  };
}

export default async function IotSimulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allSimulators = await fetchAllSimulators();

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>

      {/* Hero */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(60,224,251,0.1)", border: "1px solid rgba(60,224,251,0.2)", boxShadow: "0 0 60px rgba(60,224,251,0.12)" }}>
          <Monitor size={36} style={{ color: "#3ce0fb" }} />
        </div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          المحاكي التفاعلي
        </h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          جرّب مشاريع الأردوينو مباشرة في المتصفح عبر <strong style={{ color: "#3ce0fb" }}>Wokwi</strong> — لا تحتاج لأي أجهزة فعلية، كل شيء يعمل إلكترونياً.
        </p>
        <a
          href="https://wokwi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, #3ce0fb, #0ea5e9)", color: "#0c0e12", boxShadow: "0 0 30px rgba(60,224,251,0.3)" }}
        >
          <ExternalLink size={16} />فتح Wokwi Simulator
        </a>
      </div>

      {/* How to use */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[
          { step: "1", titleAr: "اختر مشروعاً", descAr: "ابحث عن المشروع الذي تريد تجربته أو ابدأ مشروعاً جديداً من الصفر.", color: "#f97316" },
          { step: "2", titleAr: "وصّل المكونات", descAr: "اسحب وأفلت المكونات على اللوحة التجريبية الافتراضية وصِلها بالأردوينو.", color: "#4ade80" },
          { step: "3", titleAr: "شغّل الكود", descAr: "الصق الكود أو اكتبه مباشرة في المحرر، ثم اضغط تشغيل لمشاهدة النتيجة.", color: "#3ce0fb" },
        ].map((s) => (
          <div key={s.step} className="glass-card rounded-2xl p-6" style={{ border: `1px solid ${s.color}15` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-4" style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}22` }}>{s.step}</div>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-on-surface)" }}>{s.titleAr}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{s.descAr}</p>
          </div>
        ))}
      </div>

      {/* Simulator templates */}
      {allSimulators.length > 0 && (
        <div>
          <h2 className="font-bold text-xl mb-6" style={{ color: "var(--color-on-surface)" }}>محاكيات جاهزة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSimulators.map((sim) => (
              <div key={sim.id} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(60,224,251,0.12)" }}>
                <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{sim.title}</h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{sim.description}</p>
                {sim.wokwiId && (
                  <a href={`https://wokwi.com/projects/${sim.wokwiId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80" style={{ color: "#3ce0fb" }}>
                    <ExternalLink size={12} /> فتح في Wokwi
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links to related content */}
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Link href={`/${locale}/iot-lab/lessons`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
          <BookOpen size={15} />استعرض الدروس
        </Link>
        <Link href={`/${locale}/iot-lab/projects`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}>
          <Cpu size={15} />استعرض المشاريع
        </Link>
      </div>
    </div>
  );
}
