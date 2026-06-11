"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import { tools } from "@/data/tools";
import type { Tool } from "@/data/tools";

interface Props {
  locale: string;
}

const goals = [
  { id: "coding",    labelAr: "برمجة",             labelEn: "Coding",             icon: "💻", tags: ["coding","code","cli","dev"] },
  { id: "content",   labelAr: "إنشاء محتوى",       labelEn: "Content Creation",   icon: "✍️", tags: ["writing","content","creative","text"] },
  { id: "research",  labelAr: "بحث",               labelEn: "Research",           icon: "📚", tags: ["research","search","citations"] },
  { id: "image",     labelAr: "توليد صور",         labelEn: "Image Generation",   icon: "🎨", tags: ["image","art","design","visual","img"] },
  { id: "video",     labelAr: "توليد فيديو",       labelEn: "Video Generation",   icon: "🎬", tags: ["video"] },
  { id: "local",     labelAr: "AI محلي (Offline)",  labelEn: "Local AI (Offline)", icon: "🖥️", tags: ["local","offline"] },
  { id: "automation",labelAr: "أتمتة",             labelEn: "Automation",         icon: "⚡", tags: ["automation","workflow","n8n","langchain"] },
  { id: "cloud",     labelAr: "كلاود",             labelEn: "Cloud Deployment",   icon: "☁️", tags: ["cloud","aws","azure","gcp","vercel"] },
  { id: "data",      labelAr: "تحليل البيانات",    labelEn: "Data Analysis",      icon: "📊", tags: ["data","analysis","analytics"] },
  { id: "business",  labelAr: "أعمال",             labelEn: "Business Workflows", icon: "💼", tags: ["business","office","productivity"] },
  { id: "prompt",    labelAr: "هندسة البرومبتات",  labelEn: "Prompt Engineering", icon: "🎯", tags: ["prompt","claude","prompting"] },
  { id: "learning",  labelAr: "تعلم AI",           labelEn: "Learning AI",        icon: "🎓", tags: ["learning","education","beginner"] },
];

const levels = [
  { id: "beginner",     labelAr: "مبتدئ",   labelEn: "Beginner" },
  { id: "intermediate", labelAr: "متوسط",   labelEn: "Intermediate" },
  { id: "advanced",     labelAr: "متقدم",   labelEn: "Advanced" },
];

const pricingPrefs = [
  { id: "free-only",  labelAr: "مجاني فقط",        labelEn: "Free Only",          match: ["free", "open-source"] },
  { id: "freemium",   labelAr: "مجاني جزئياً",     labelEn: "Freemium OK",        match: ["free", "freemium", "open-source"] },
  { id: "any",        labelAr: "أي (مدفوع مقبول)", labelEn: "Any (Paid OK)",      match: ["free", "freemium", "paid", "open-source"] },
];

const pricingBadge: Record<string, string> = {
  free: "مجاني / Free",
  freemium: "Freemium",
  paid: "مدفوع / Paid",
  "open-source": "مفتوح / Open Source",
};

function scoreAndFilter(
  toolList: Tool[],
  goalTags: string[],
  levelId: string,
  pricingMatch: string[]
): Tool[] {
  const scored = toolList
    .filter((t) => pricingMatch.includes(t.pricingType))
    .map((t) => {
      let score = 0;
      // Tag matching
      for (const tag of goalTags) {
        if (t.tags.some((tt) => tt.toLowerCase().includes(tag.toLowerCase()))) score += 2;
        if (t.category.toLowerCase().includes(tag.toLowerCase())) score += 1;
        if (t.bestFor.toLowerCase().includes(tag.toLowerCase())) score += 1;
        for (const uc of t.useCases) {
          if (uc.toLowerCase().includes(tag.toLowerCase())) score += 1;
        }
      }
      // Level match bonus
      if (t.level === levelId) score += 3;
      if (levelId === "intermediate" && t.level === "beginner") score += 1;
      // Featured bonus
      if (t.featured) score += 1;
      return { tool: t, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map((s) => s.tool);

  // If no match found, return featured tools filtered by pricing
  if (scored.length === 0) {
    return toolList
      .filter((t) => pricingMatch.includes(t.pricingType) && t.featured)
      .slice(0, 6);
  }
  return scored;
}

export default function ToolRecommenderClient({ locale }: Props) {
  const isAr = locale === "ar";

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedPricing, setSelectedPricing] = useState("freemium");
  const [results, setResults] = useState<Tool[] | null>(null);
  const [searched, setSearched] = useState(false);

  function handleRecommend() {
    const goalObj = goals.find((g) => g.id === selectedGoal);
    const pricingObj = pricingPrefs.find((p) => p.id === selectedPricing);
    const goalTags = goalObj?.tags ?? [];
    const pricingMatch = pricingObj?.match ?? ["free", "freemium"];

    const found = scoreAndFilter(tools, goalTags, selectedLevel, pricingMatch);
    setResults(found);
    setSearched(true);
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Hero */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-5"
          style={{
            background: "rgba(60,224,251,0.08)",
            border: "1px solid rgba(60,224,251,0.2)",
            color: "var(--color-tertiary)",
          }}
        >
          <Search size={12} />
          {isAr ? "من 40+ أداة AI" : "From 40+ AI Tools"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">
            {isAr ? "🔎 مرشّح أدوات الذكاء الاصطناعي" : "🔎 AI Tool Recommender"}
          </span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "حدّد هدفك واكتشف الأدوات المثلى من مركز أدوات NexaLearn"
            : "Define your goal and discover the best tools from NexaLearn's AI Tools Hub"}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-8">
        {/* Goal */}
        <div>
          <h2 className="font-mono text-xs tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
            {isAr ? "الخطوة 1 — ما هدفك؟" : "Step 1 — What's your goal?"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {goals.map((goal) => {
              const active = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl text-sm transition-all duration-150 hover:scale-105"
                  style={{
                    background: active ? "rgba(142,213,255,0.12)" : "var(--color-surface-container)",
                    border: active ? "1px solid rgba(142,213,255,0.3)" : "1px solid var(--color-outline-variant)",
                    color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="text-xs text-center leading-tight">
                    {isAr ? goal.labelAr : goal.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level */}
        <div>
          <h2 className="font-mono text-xs tracking-wider uppercase mb-4" style={{ color: "var(--color-tertiary)" }}>
            {isAr ? "الخطوة 2 — ما مستواك؟" : "Step 2 — What's your level?"}
          </h2>
          <div className="flex gap-3 flex-wrap">
            {levels.map((lvl) => {
              const active = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: active ? "rgba(60,224,251,0.12)" : "var(--color-surface-container)",
                    border: active ? "1px solid rgba(60,224,251,0.3)" : "1px solid var(--color-outline-variant)",
                    color: active ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {isAr ? lvl.labelAr : lvl.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="font-mono text-xs tracking-wider uppercase mb-4" style={{ color: "var(--color-secondary)" }}>
            {isAr ? "الخطوة 3 — تفضيل التسعير" : "Step 3 — Pricing preference"}
          </h2>
          <div className="flex gap-3 flex-wrap">
            {pricingPrefs.map((pref) => {
              const active = selectedPricing === pref.id;
              return (
                <button
                  key={pref.id}
                  onClick={() => setSelectedPricing(pref.id)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: active ? "rgba(208,188,255,0.12)" : "var(--color-surface-container)",
                    border: active ? "1px solid rgba(208,188,255,0.3)" : "1px solid var(--color-outline-variant)",
                    color: active ? "var(--color-secondary)" : "var(--color-on-surface-variant)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {isAr ? pref.labelAr : pref.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div>
          <button
            onClick={handleRecommend}
            disabled={!selectedGoal}
            className="glow-button-primary text-white font-mono text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Search size={16} />
            {isAr ? "ابحث عن الأدوات المثلى" : "Find the Best Tools"}
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && results !== null && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
              {results.length > 0
                ? (isAr ? `${results.length} أداة موصى بها` : `${results.length} Recommended Tools`)
                : (isAr ? "لم يتم العثور على أدوات مطابقة" : "No matching tools found")}
            </h2>
            {results.length > 0 && (
              <Link
                href={`/${locale}/tools`}
                className="text-sm font-mono flex items-center gap-1"
                style={{ color: "var(--color-primary)" }}
              >
                {isAr ? "عرض كل الأدوات" : "View All Tools"}
                <ExternalLink size={13} />
              </Link>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${locale}/tools/${tool.id}`}
                  className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01]"
                  style={{ border: "1px solid var(--color-outline-variant)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base mb-0.5" style={{ color: "var(--color-on-surface)" }}>
                        {tool.name}
                      </h3>
                      <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                        {tool.category}
                      </p>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-mono flex-shrink-0"
                      style={{
                        background: tool.pricingType === "free" || tool.pricingType === "open-source"
                          ? "rgba(74,222,128,0.12)"
                          : tool.pricingType === "freemium"
                          ? "rgba(60,224,251,0.10)"
                          : "rgba(208,188,255,0.10)",
                        color: tool.pricingType === "free" || tool.pricingType === "open-source"
                          ? "#4ade80"
                          : tool.pricingType === "freemium"
                          ? "var(--color-tertiary)"
                          : "var(--color-secondary)",
                        border: tool.pricingType === "free" || tool.pricingType === "open-source"
                          ? "1px solid rgba(74,222,128,0.3)"
                          : tool.pricingType === "freemium"
                          ? "1px solid rgba(60,224,251,0.25)"
                          : "1px solid rgba(208,188,255,0.25)",
                      }}
                    >
                      {pricingBadge[tool.pricingType]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? tool.shortDescriptionAr : tool.shortDescriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tool.useCases.slice(0, 3).map((uc) => (
                      <span
                        key={uc}
                        className="px-2 py-0.5 rounded-full text-xs font-mono"
                        style={{
                          background: "var(--color-surface-container)",
                          color: "var(--color-on-surface-variant)",
                          border: "1px solid var(--color-outline-variant)",
                        }}
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-mono mt-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {isAr ? "عرض التفاصيل" : "View Details"}
                    <ExternalLink size={11} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-4xl mb-4">🔎</p>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr
                  ? "جرّب تغيير الهدف أو التسعير للحصول على نتائج أفضل"
                  : "Try changing the goal or pricing filter for better results"}
              </p>
              <Link
                href={`/${locale}/tools`}
                className="inline-block mt-4 text-sm font-mono"
                style={{ color: "var(--color-primary)" }}
              >
                {isAr ? "استعرض كل الأدوات" : "Browse All Tools"}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
