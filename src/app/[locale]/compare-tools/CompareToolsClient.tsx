"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, X, Plus, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { tools } from "@/data/tools";

const presetComparisons = [
  { label: "Claude vs ChatGPT vs Gemini", ids: ["claude", "chatgpt", "gemini"] },
  { label: "Cursor vs Claude Code", ids: ["cursor", "claude-code"] },
  { label: "Runway vs Pika", ids: ["runway-ml", "pika"] },
  { label: "Suno vs Udio", ids: ["suno", "udio"] },
];

const pricingColors: Record<string, string> = {
  free: "#4ade80",
  freemium: "#fbbf24",
  paid: "#ef4444",
  "open-source": "#a78bfa",
};

const levelColors: Record<string, string> = {
  beginner: "#4ade80",
  intermediate: "#fbbf24",
  advanced: "#f97316",
};

export default function CompareToolsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const selectedTools = tools.filter((t) => selectedIds.includes(t.id));
  const filteredTools = tools.filter(
    (t) =>
      !selectedIds.includes(t.id) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.shortDescriptionEn.toLowerCase().includes(search.toLowerCase()))
  );

  function addTool(id: string) {
    if (selectedIds.length >= 4) return;
    setSelectedIds((prev) => [...prev, id]);
  }

  function removeTool(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  function applyPreset(ids: string[]) {
    setSelectedIds(ids.filter((id) => tools.find((t) => t.id === id)));
  }

  const allCriteria = [
    { key: "category", labelAr: "الفئة", labelEn: "Category" },
    { key: "pricingType", labelAr: "التسعير", labelEn: "Pricing" },
    { key: "level", labelAr: "المستوى", labelEn: "Level" },
    { key: "bestFor", labelAr: "الأفضل لـ", labelEn: "Best For" },
    { key: "useCases", labelAr: "حالات الاستخدام", labelEn: "Use Cases" },
    { key: "pros", labelAr: "المميزات", labelEn: "Pros" },
    { key: "limitations", labelAr: "القيود", labelEn: "Limitations" },
    { key: "alternatives", labelAr: "البدائل", labelEn: "Alternatives" },
  ];

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}>
          <Scale size={12} /> {isAr ? "مقارنة الأدوات" : "Tool Comparison"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "قارن أدوات AI" : "Compare AI Tools"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "اختر 2–4 أدوات وقارن بينها جنباً إلى جنب" : "Select 2–4 tools and compare them side by side"}
        </p>
      </div>

      {/* Preset comparisons */}
      <div>
        <p className="text-xs font-mono mb-3 text-center" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "مقارنات جاهزة:" : "Preset comparisons:"}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {presetComparisons.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.ids)}
              className="text-xs font-mono px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool selector */}
      {selectedIds.length < 4 && (
        <div className="max-w-xl mx-auto w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? "ابحث عن أداة للإضافة..." : "Search for a tool to add..."}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            dir={isAr ? "rtl" : "ltr"}
          />
          {search && (
            <div className="mt-2 flex flex-col gap-1 max-h-48 overflow-y-auto">
              {filteredTools.slice(0, 8).map((t) => (
                <button
                  key={t.id}
                  onClick={() => { addTool(t.id); setSearch(""); }}
                  className="flex items-center gap-3 p-3 rounded-xl text-start hover:opacity-80 transition-opacity"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
                >
                  <Plus size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{t.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected tools + compare table */}
      {selectedTools.length >= 2 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-start p-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "المعيار" : "Criteria"}
                </th>
                {selectedTools.map((t) => (
                  <th key={t.id} className="p-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{t.name}</span>
                      <button onClick={() => removeTool(t.id)} className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                        <X size={10} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allCriteria.map((c) => (
                <tr key={c.key} style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
                  <td className="p-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? c.labelAr : c.labelEn}
                  </td>
                  {selectedTools.map((t) => {
                    const val = (t as unknown as Record<string, unknown>)[c.key];
                    return (
                      <td key={t.id} className="p-3 text-center text-xs">
                        {c.key === "pricingType" ? (
                          <span className="font-mono px-2 py-0.5 rounded-full" style={{ background: `${pricingColors[t.pricingType] ?? "#8ed5ff"}15`, color: pricingColors[t.pricingType] ?? "#8ed5ff" }}>
                            {t.pricingType}
                          </span>
                        ) : c.key === "level" ? (
                          <span className="font-mono px-2 py-0.5 rounded-full" style={{ background: `${levelColors[t.level]}15`, color: levelColors[t.level] }}>
                            {isAr ? (t.level === "beginner" ? "مبتدئ" : t.level === "intermediate" ? "متوسط" : "متقدم") : t.level}
                          </span>
                        ) : Array.isArray(val) ? (
                          <div className="flex flex-col gap-0.5">
                            {(val as string[]).slice(0, 3).map((item) => (
                              <span key={item} className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>• {item}</span>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: "var(--color-on-surface)" }}>{String(val ?? "—")}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
                <td className="p-3 text-xs font-mono font-bold" style={{ color: "#fbbf24" }}>
                  {isAr ? "للمزيد" : "Learn more"}
                </td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="p-3 text-center">
                    <Link
                      href={`/${locale}/tools/${t.id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {isAr ? "تفاصيل" : "Details"} <Arrow size={12} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Winner recommendation */}
          <div className="mt-6 glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} style={{ color: "#fbbf24" }} />
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "التوصية:" : "Recommendation:"}
              </h3>
            </div>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? `${selectedTools[0].name} مثالي للمبتدئين والاستخدام العام. استكشف ${selectedTools.map(t => t.name).join(" و ")} لمعرفة الأنسب لاحتياجاتك.`
                : `${selectedTools[0].name} is great for beginners. Explore ${selectedTools.map(t => t.name).join(" and ")} to find what fits your needs best.`}
            </p>
          </div>
        </div>
      ) : selectedTools.length === 1 ? (
        <div className="text-center py-8">
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "أضف أداة أخرى للمقارنة" : "Add another tool to compare"}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">⚡</div>
          <p className="font-semibold mb-1" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "اختر الأدوات للمقارنة" : "Select tools to compare"}
          </p>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "ابحث أو اختر من المقارنات الجاهزة" : "Search or pick from preset comparisons above"}
          </p>
        </div>
      )}
    </div>
  );
}
