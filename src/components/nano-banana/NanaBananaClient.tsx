"use client";

import { useState } from "react";
import { Copy, Check, Bookmark, BookmarkCheck, Shield, Sparkles, ChevronDown, ChevronUp, Wand2, AlertCircle } from "lucide-react";
import CommunitySignup from "@/components/community/CommunitySignup";
import {
  nanaBananaPrompts,
  nanaBananaCategories,
  nanaBananaDifficulties,
  type NanaBananaCategory,
  type NanaBananaPrompt,
} from "@/data/nano-banana-prompts";

const STORAGE_KEY = "nb_saved_prompt_ids";

function useSavedNanaBanana() {
  const [saved, setSaved] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  function toggle(id: string) {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { saved, toggle };
}

function PromptCard({
  item,
  isAr,
  isSaved,
  onSave,
}: {
  item: NanaBananaPrompt;
  isAr: boolean;
  isSaved: boolean;
  onSave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const prompt = isAr ? item.promptAr : item.promptEn;
  const diff = nanaBananaDifficulties.find((d) => d.id === item.difficulty)!;

  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: item.gradient,
        border: `1px solid ${item.accent}30`,
        boxShadow: `0 4px 24px ${item.accent}10`,
      }}
    >
      {/* Visual header */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "140px",
          background: item.image
            ? "transparent"
            : `radial-gradient(circle at 50% 50%, ${item.accent}25 0%, transparent 70%)`,
          borderBottom: `1px solid ${item.accent}20`,
        }}
      >
        {item.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 2, fontSize: "28px", lineHeight: 1, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.7))" }}>{item.emoji}</span>
          </>
        ) : (
          <span style={{ fontSize: "52px", lineHeight: 1 }}>{item.emoji}</span>
        )}
        {item.featured && (
          <span
            className="absolute top-3 start-3 z-10 text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${item.accent}25`, color: item.accent, border: `1px solid ${item.accent}40` }}
          >
            ★ {isAr ? "مميز" : "Featured"}
          </span>
        )}
        <button
          onClick={onSave}
          className="absolute top-3 end-3 z-10 p-1.5 rounded-xl transition-all hover:scale-110"
          style={{ background: `${item.accent}15`, color: item.accent }}
          title={isAr ? "حفظ البرومبت" : "Save prompt"}
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}30` }}
          >
            {isAr ? item.categoryLabelAr : item.categoryLabelEn}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${diff.color}15`, color: diff.color, border: `1px solid ${diff.color}30` }}
          >
            {isAr ? diff.labelAr : diff.labelEn}
          </span>
        </div>

        <h3 className="font-display font-bold text-base leading-snug" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? item.titleAr : item.titleEn}
        </h3>

        <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? item.descriptionAr : item.descriptionEn}
        </p>

        {/* Best input */}
        <div className="text-[11px] font-mono flex items-center gap-1.5" style={{ color: "var(--color-on-surface-variant)", opacity: 0.75 }}>
          📷 {isAr ? item.bestInputAr : item.bestInputEn}
        </div>

        {/* Prompt preview */}
        <div
          className="rounded-xl p-3 text-xs font-mono leading-relaxed"
          style={{
            background: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "var(--color-on-surface-variant)",
            whiteSpace: "pre-wrap",
            maxHeight: expanded ? "none" : "80px",
            overflow: expanded ? "visible" : "hidden",
            direction: "ltr",
          }}
        >
          {prompt}
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] font-mono flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: item.accent }}
        >
          {expanded
            ? (isAr ? "طيّ" : "Collapse")
            : (isAr ? "عرض البرومبت كاملاً" : "Show full prompt")}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {/* Actions */}
        <button
          onClick={copy}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: `${item.accent}20`, color: item.accent, border: `1px solid ${item.accent}35` }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied
            ? (isAr ? "تم النسخ!" : "Copied!")
            : (isAr ? "نسخ البرومبت" : "Copy Prompt")}
        </button>
      </div>
    </div>
  );
}

function PromptEnhancer({ isAr }: { isAr: boolean }) {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function enhance() {
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/nano-banana/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json() as { prompt?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? `خطأ ${res.status}`);
      } else {
        setResult(data.prompt ?? null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل الاتصال. حاول مجدداً.");
    } finally {
      setLoading(false);
    }
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="container-xl pb-10">
      <div
        className="rounded-3xl p-6 md:p-8"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Wand2 size={16} style={{ color: "#f59e0b" }} />
          <span className="font-bold text-sm" style={{ color: "#f59e0b" }}>
            {isAr ? "✨ محسّن البرومبت بالذكاء الاصطناعي" : "✨ AI Prompt Enhancer"}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            Nano Banana Pro
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "اكتب فكرتك بشكل بسيط وسيحوّلها الذكاء الاصطناعي إلى برومبت Gemini احترافي جاهز للاستخدام."
            : "Describe your idea simply and AI will turn it into a professional Gemini prompt ready to use."}
        </p>

        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && enhance()}
            maxLength={300}
            placeholder={isAr ? "مثال: صورة بأسلوب أنيمي ياباني..." : "e.g. anime Japanese style portrait..."}
            className="flex-1 rounded-2xl px-4 py-3 text-sm focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(245,158,11,0.25)",
              color: "var(--color-on-surface)",
            }}
          />
          <button
            onClick={enhance}
            disabled={loading || !idea.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all shrink-0"
            style={{
              background: idea.trim() && !loading ? "linear-gradient(135deg, #f59e0b, #d97706)" : "rgba(255,255,255,0.06)",
              color: idea.trim() && !loading ? "#0c0e12" : "var(--color-on-surface-variant)",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 rounded-full border-2" style={{ borderColor: "#0c0e12", borderTopColor: "transparent" }} />
            ) : (
              <Wand2 size={15} />
            )}
            {loading
              ? (isAr ? "جاري التحسين..." : "Enhancing...")
              : (isAr ? "حسّن الفكرة" : "Enhance")}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 text-xs rounded-xl px-4 py-3" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
            <AlertCircle size={13} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <div
              className="rounded-2xl p-4 text-xs font-mono leading-relaxed whitespace-pre-wrap"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(245,158,11,0.2)",
                color: "var(--color-on-surface-variant)",
                direction: "rtl",
              }}
            >
              {result}
            </div>
            <button
              onClick={copyResult}
              className="mt-3 flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold transition-all"
              style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied
                ? (isAr ? "تم النسخ!" : "Copied!")
                : (isAr ? "نسخ البرومبت المحسّن" : "Copy Enhanced Prompt")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function NanaBananaClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState<NanaBananaCategory | "all">("all");
  const [activeDiff, setActiveDiff] = useState<string>("all");
  const { saved, toggle } = useSavedNanaBanana();

  const filtered = nanaBananaPrompts.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const diffMatch = activeDiff === "all" || p.difficulty === activeDiff;
    return catMatch && diffMatch;
  });

  return (
    <div className="flex flex-col">
      {/* ── Hero ────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.06) 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div className="absolute top-0 end-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 start-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="container-xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-6"
              style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)", color: "#f59e0b" }}
            >
              <Sparkles size={12} />
              Gemini Nano Banana Prompt Lab
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? (
                <>تريند <span style={{ color: "#f59e0b" }}>Gemini</span> Nano Banana</>
              ) : (
                <><span style={{ color: "#f59e0b" }}>Gemini</span> Nano Banana Trends</>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--color-on-surface-variant)", maxWidth: "600px", margin: "0 auto 2rem" }}>
              {isAr
                ? "اكتشف أفكار صور تريندية جاهزة، وانسخ البرومبت الذي يحول صورتك إلى نفس الستايل باستخدام Gemini."
                : "Explore viral image ideas and copy the prompt that turns your own photo into the same style using Gemini."}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm font-mono">
              {[
                { n: nanaBananaPrompts.length + "+", labelAr: "برومبت جاهز", labelEn: "Ready Prompts" },
                { n: nanaBananaCategories.length + "", labelAr: "فئة", labelEn: "Categories" },
                { n: "3", labelAr: "مستويات", labelEn: "Difficulty Levels" },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="font-bold text-2xl" style={{ color: "#f59e0b" }}>{s.n}</div>
                  <div style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? s.labelAr : s.labelEn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How to use ──────────────────────────── */}
      <section className="container-xl py-10">
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10"
          style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
        >
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "🚀 كيف تستخدم هذه البرومبتات؟" : "🚀 How to use these prompts?"}
            </h2>
            <ol className="space-y-2 text-sm list-none" style={{ color: "var(--color-on-surface-variant)" }}>
              {(isAr ? [
                "افتح Gemini على جوال أو متصفح",
                "ارفع صورتك الشخصية (صورة تملكها)",
                "انسخ البرومبت من هنا والصقه",
                "اضغط إرسال واستمتع بالنتيجة",
              ] : [
                "Open Gemini on mobile or browser",
                "Upload your own photo (one you own rights to)",
                "Copy a prompt from here and paste it",
                "Hit send and enjoy the result",
              ]).map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div
            className="flex-shrink-0 flex items-start gap-3 px-4 py-4 rounded-xl md:max-w-xs"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <Shield size={18} style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }} />
            <p className="text-xs leading-relaxed" style={{ color: "rgba(245,158,11,0.85)" }}>
              {isAr
                ? "استخدم صورك الشخصية أو صورًا تملك حق استخدامها فقط. لا تستخدم صور أشخاص آخرين بدون إذن."
                : "Use your own photos or images you have permission to use. Do not use other people's photos without consent."}
            </p>
          </div>
        </div>
      </section>

      {/* ── AI Prompt Enhancer ───────────────────── */}
      <PromptEnhancer isAr={isAr} />

      {/* ── Filters ─────────────────────────────── */}
      <section className="container-xl pb-6">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category filter */}
          <button
            onClick={() => setActiveCategory("all")}
            className="text-sm px-4 py-1.5 rounded-full font-mono transition-all"
            style={{
              background: activeCategory === "all" ? "rgba(245,158,11,0.2)" : "var(--color-surface-container)",
              border: `1px solid ${activeCategory === "all" ? "rgba(245,158,11,0.5)" : "var(--color-outline-variant)"}`,
              color: activeCategory === "all" ? "#f59e0b" : "var(--color-on-surface-variant)",
            }}
          >
            {isAr ? "الكل" : "All"}
          </button>
          {nanaBananaCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="text-sm px-4 py-1.5 rounded-full font-mono transition-all"
              style={{
                background: activeCategory === cat.id ? "rgba(245,158,11,0.2)" : "var(--color-surface-container)",
                border: `1px solid ${activeCategory === cat.id ? "rgba(245,158,11,0.5)" : "var(--color-outline-variant)"}`,
                color: activeCategory === cat.id ? "#f59e0b" : "var(--color-on-surface-variant)",
              }}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
          <div className="w-px h-6 mx-1" style={{ background: "var(--color-outline-variant)" }} />
          {/* Difficulty filter */}
          <button
            onClick={() => setActiveDiff("all")}
            className="text-xs px-3 py-1 rounded-full font-mono transition-all"
            style={{
              background: activeDiff === "all" ? "var(--color-surface-container-high)" : "transparent",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {isAr ? "كل المستويات" : "All levels"}
          </button>
          {nanaBananaDifficulties.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDiff(d.id)}
              className="text-xs px-3 py-1 rounded-full font-mono transition-all"
              style={{
                background: activeDiff === d.id ? `${d.color}20` : "transparent",
                border: `1px solid ${activeDiff === d.id ? d.color + "50" : "var(--color-outline-variant)"}`,
                color: activeDiff === d.id ? d.color : "var(--color-on-surface-variant)",
              }}
            >
              {isAr ? d.labelAr : d.labelEn}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="mt-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
          {filtered.length} {isAr ? "برومبت" : "prompts"}
        </p>
      </section>

      {/* ── Grid ────────────────────────────────── */}
      <section className="container-xl pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "لا توجد نتائج" : "No results found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                isAr={isAr}
                isSaved={saved.includes(item.id)}
                onSave={() => toggle(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Community Signup CTA ───────────────── */}
      <section className="container-xl pb-20">
        <CommunitySignup locale={locale} variant="hero" source="nano-banana" />
      </section>
    </div>
  );
}
