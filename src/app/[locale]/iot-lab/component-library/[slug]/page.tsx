import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, DollarSign, ExternalLink, Cpu } from "lucide-react";
import { notFound } from "next/navigation";
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const components = await fetchAllComponents();
  const comp = components.find((c) => c.id === slug);
  if (!comp) return { title: "Not Found" };
  return { title: `${comp.name} | مكتبة المكونات`, description: comp.description };
}

export async function generateStaticParams() {
  return componentsData.map((c) => ({ slug: c.id }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const components = await fetchAllComponents();
  const comp = components.find((c) => c.id === slug);
  if (!comp) notFound();

  return (
    <div className="container-xl py-12 max-w-3xl" dir="rtl">
      <Link href={`/${locale}/iot-lab/component-library`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة لمكتبة المكونات
      </Link>

      <div className="glass-card rounded-3xl p-8 mb-6" style={{ border: "1px solid rgba(251,191,36,0.2)" }}>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full mb-4 inline-block" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>{comp.category}</span>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>{comp.name}</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{comp.description}</p>

        <div className="flex flex-wrap gap-4 mt-5 pt-5" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
          {comp.priceRange && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              <DollarSign size={14} style={{ color: "#4ade80" }} />
              <span>السعر التقريبي: <span className="font-mono font-semibold" style={{ color: "#4ade80" }}>{comp.priceRange}</span></span>
            </div>
          )}
          {comp.buyLink && (
            <a href={comp.buyLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "#8ed5ff" }}>
              <ExternalLink size={14} /> رابط الشراء
            </a>
          )}
        </div>
      </div>

      {comp.pins.length > 0 && (
        <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(251,191,36,0.12)" }}>
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "#fbbf24" }}>
            <Cpu size={15} /> الأطراف والتوصيلات (Pins)
          </h2>
          <div className="space-y-3">
            {comp.pins.map((pin, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                <code className="text-xs font-mono px-2 py-0.5 rounded shrink-0" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>{pin.name}</code>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{pin.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
