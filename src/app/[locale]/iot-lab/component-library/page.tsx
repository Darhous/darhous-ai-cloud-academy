import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { componentsData } from "@/data/iot/components";
import type { ComponentData } from "@/data/iot/components";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ComponentRow extends Record<string, unknown> {
  id: string; name: string; category: ComponentData["category"]; description: string;
  pins: { name: string; description: string }[]; price_range?: string; buy_link?: string;
}
function mapComponentRow(row: ComponentRow): ComponentData {
  return { id: row.id, name: row.name, category: row.category, description: row.description, pins: row.pins ?? [], priceRange: row.price_range, buyLink: row.buy_link };
}
async function fetchAllComponents(): Promise<ComponentData[]> {
  const dbComponents = await fetchPublishedList<ComponentRow, ComponentData>({
    table: "iot_components", mapRow: mapComponentRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbComponents, componentsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مكتبة المكونات الإلكترونية | مختبر NexaLearn" : "Electronic Components Library | NexaLearn IoT Lab",
    description: isAr ? `${componentsData.length}+ مكوّن إلكتروني موثق مع الوصف والاستخدام.` : `${componentsData.length}+ documented electronic components.`,
  };
}

export default async function IotComponentLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allComponents = await fetchAllComponents();

  const grouped = allComponents.reduce<Record<string, typeof allComponents>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مكتبة المكونات الإلكترونية</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{allComponents.length}+ مكوّن موثق — الوصف، الاستخدام، والتوصيل لكل مكوّن.</p>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, comps]) => (
          <div key={category}>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span className="w-2 h-6 rounded-full" style={{ background: "#fbbf24" }} />
              {category}
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({comps.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {comps.map((comp) => (
                <Link
                  key={comp.id}
                  href={`/${locale}/iot-lab/component-library/${comp.id}`}
                  className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid rgba(251,191,36,0.12)", textDecoration: "none" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    <Package size={18} style={{ color: "#fbbf24" }} />
                  </div>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{comp.name}</h3>
                  <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--color-on-surface-variant)" }}>{comp.description}</p>
                  <span className="text-[10px] font-mono" style={{ color: "#fbbf24" }}>→ التفاصيل</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
