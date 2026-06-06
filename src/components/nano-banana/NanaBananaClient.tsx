"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, Check, Bookmark, BookmarkCheck, Shield, Sparkles, ChevronDown, ChevronUp, Wand2, AlertCircle, Pencil, Archive, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import CommunitySignup from "@/components/community/CommunitySignup";
import {
  nanaBananaPrompts,
  nanaBananaCategories,
  nanaBananaDifficulties,
  type NanaBananaCategory,
  type NanaBananaPrompt,
} from "@/data/nano-banana-prompts";

/** Shape returned by /api/nano-banana/prompts */
interface CustomPromptRow {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category: string;
  category_label_ar: string;
  category_label_en: string;
  difficulty: string;
  best_input_ar: string;
  best_input_en: string;
  prompt_ar: string;
  prompt_en: string;
  accent: string;
  gradient: string;
  emoji: string;
  tags: string[];
  featured: boolean;
  image_url?: string;
}

function rowToPrompt(r: CustomPromptRow): NanaBananaPrompt {
  return {
    id: `custom-${r.id}`,
    titleAr: r.title_ar,
    titleEn: r.title_en,
    descriptionAr: r.description_ar,
    descriptionEn: r.description_en,
    category: (r.category as NanaBananaCategory) ?? "fun",
    categoryLabelAr: r.category_label_ar,
    categoryLabelEn: r.category_label_en,
    difficulty: (r.difficulty as NanaBananaPrompt["difficulty"]) ?? "beginner",
    bestInputAr: r.best_input_ar,
    bestInputEn: r.best_input_en,
    promptAr: r.prompt_ar,
    promptEn: r.prompt_en,
    accent: r.accent ?? "#f59e0b",
    gradient: r.gradient ?? `linear-gradient(135deg, ${r.accent ?? "#f59e0b"}30 0%, transparent 100%)`,
    emoji: r.emoji ?? "🍌",
    tags: r.tags ?? [],
    featured: r.featured ?? false,
    image: r.image_url ?? undefined,
  };
}

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
  isAdmin,
  onAdminEdit,
  onAdminArchive,
  onAdminDelete,
}: {
  item: NanaBananaPrompt;
  isAr: boolean;
  isSaved: boolean;
  onSave: () => void;
  isAdmin?: boolean;
  onAdminEdit?: (item: NanaBananaPrompt) => void;
  onAdminArchive?: (id: string) => void;
  onAdminDelete?: (id: string) => void;
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

        {/* Admin action bar — custom prompts only, admins only */}
        {isAdmin && item.id.startsWith("custom-") && (
          <div
            className="flex gap-1.5 pt-2 mt-1 flex-wrap"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => onAdminEdit?.(item)}
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: "rgba(142,213,255,0.1)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.2)" }}
              title={isAr ? "تعديل" : "Edit"}
            >
              <Pencil size={10} />{isAr ? "تعديل" : "Edit"}
            </button>
            <button
              onClick={() => onAdminArchive?.(item.id)}
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: "rgba(192,132,252,0.1)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.2)" }}
              title={isAr ? "أرشفة" : "Archive"}
            >
              <Archive size={10} />{isAr ? "أرشفة" : "Archive"}
            </button>
            <button
              onClick={() => onAdminDelete?.(item.id)}
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
              title={isAr ? "حذف" : "Delete"}
            >
              <Trash2 size={10} />{isAr ? "حذف" : "Delete"}
            </button>
          </div>
        )}
        {/* Static prompt badge for admins */}
        {isAdmin && !item.id.startsWith("custom-") && (
          <div className="mt-1 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
              static — edit via code
            </span>
          </div>
        )}
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
          background: "linear-gradient(135deg, var(--portal-color-faint) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid var(--portal-color-border)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Wand2 size={16} style={{ color: "var(--portal-color)" }} />
          <span className="font-bold text-sm" style={{ color: "var(--portal-color)" }}>
            {isAr ? "✨ محسّن البرومبت بالذكاء الاصطناعي" : "✨ AI Prompt Enhancer"}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-border)" }}
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
              border: "1px solid var(--portal-color-border)",
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
                border: "1px solid var(--portal-color-border)",
                color: "var(--color-on-surface-variant)",
                direction: "rtl",
              }}
            >
              {result}
            </div>
            <button
              onClick={copyResult}
              className="mt-3 flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold transition-all"
              style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }}
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
  const { isAdmin } = useAuth();

  // Custom prompts from DB (merged with static array)
  const [customPrompts, setCustomPrompts] = useState<NanaBananaPrompt[]>([]);

  // Edit modal state
  const [editTarget, setEditTarget] = useState<{ rawId: string; item: NanaBananaPrompt } | null>(null);
  const [editForm, setEditForm] = useState({
    title_ar: "", title_en: "", description_ar: "", description_en: "",
    prompt_ar: "", prompt_en: "", featured: false,
  });
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg, setEditMsg] = useState<string | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/nano-banana/prompts")
      .then((r) => r.ok ? r.json() : { prompts: [] })
      .then((d: { prompts?: CustomPromptRow[] }) => {
        if (Array.isArray(d.prompts) && d.prompts.length > 0) {
          setCustomPrompts(d.prompts.map(rowToPrompt));
        }
      })
      .catch(() => {/* silent — static prompts still show */});
  }, []);

  // ── Admin handlers ────────────────────────────────────────────
  async function handleAdminDelete(promptId: string) {
    const rawId = promptId.replace("custom-", "");
    if (!confirm(isAr ? "هل أنت متأكد من الحذف النهائي؟" : "Permanently delete this prompt?")) return;
    const res = await fetch(`/api/admin/nano-banana/${rawId}`, { method: "DELETE" });
    if (res.ok) {
      setCustomPrompts((p) => p.filter((x) => x.id !== promptId));
    }
  }

  async function handleAdminArchive(promptId: string) {
    const rawId = promptId.replace("custom-", "");
    if (!confirm(isAr ? "أرشفة البرومبت؟ لن يظهر للمستخدمين." : "Archive? It will be hidden from users.")) return;
    const res = await fetch(`/api/admin/nano-banana/${rawId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
    if (res.ok) {
      setCustomPrompts((p) => p.filter((x) => x.id !== promptId));
    }
  }

  function openEditModal(item: NanaBananaPrompt) {
    const rawId = item.id.replace("custom-", "");
    setEditTarget({ rawId, item });
    setEditForm({
      title_ar: item.titleAr,
      title_en: item.titleEn,
      description_ar: item.descriptionAr,
      description_en: item.descriptionEn,
      prompt_ar: item.promptAr,
      prompt_en: item.promptEn,
      featured: item.featured ?? false,
    });
    setEditMsg(null);
    setEditImageFile(null);
    setEditImagePreview(null);
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setEditSaving(true);
    setEditMsg(null);
    try {
      const fd = new FormData();
      fd.append("title_ar", editForm.title_ar);
      fd.append("title_en", editForm.title_en);
      fd.append("description_ar", editForm.description_ar);
      fd.append("description_en", editForm.description_en);
      fd.append("prompt_ar", editForm.prompt_ar);
      fd.append("prompt_en", editForm.prompt_en);
      fd.append("featured", String(editForm.featured));
      if (editImageFile) fd.append("image", editImageFile);
      const res = await fetch(`/api/admin/nano-banana/${editTarget.rawId}`, {
        method: "PATCH",
        body: fd,
      });
      if (res.ok) {
        setEditMsg(isAr ? "✅ تم الحفظ" : "✅ Saved");
        setCustomPrompts((p) => p.map((x) =>
          x.id === editTarget.item.id
            ? {
                ...x,
                titleAr: editForm.title_ar,
                titleEn: editForm.title_en,
                descriptionAr: editForm.description_ar,
                descriptionEn: editForm.description_en,
                promptAr: editForm.prompt_ar,
                promptEn: editForm.prompt_en,
                featured: editForm.featured,
              }
            : x
        ));
        setTimeout(() => setEditTarget(null), 1200);
      } else {
        const json = await res.json() as { error?: string };
        setEditMsg(`❌ ${json.error ?? "خطأ"}`);
      }
    } catch {
      setEditMsg("❌ " + (isAr ? "فشل الاتصال" : "Connection failed"));
    } finally {
      setEditSaving(false);
    }
  }

  // After DB migration (v21): DB contains all prompts — use DB as primary source.
  // Fall back to static file only if DB returns nothing (pre-migration or offline).
  const allPrompts: NanaBananaPrompt[] = customPrompts.length > 0
    ? customPrompts
    : nanaBananaPrompts;

  const filtered = allPrompts.filter((p) => {
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
        <div className="absolute top-0 end-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, var(--portal-color-glow) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 start-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="container-xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-6"
              style={{ background: "var(--portal-color-subtle)", borderColor: "var(--portal-color-glow)", color: "var(--portal-color)" }}
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
                { n: allPrompts.length + "+", labelAr: "برومبت جاهز", labelEn: "Ready Prompts" },
                { n: nanaBananaCategories.length + "", labelAr: "فئة", labelEn: "Categories" },
                { n: "3", labelAr: "مستويات", labelEn: "Difficulty Levels" },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="font-bold text-2xl" style={{ color: "var(--portal-color)" }}>{s.n}</div>
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
                  <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5" style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)" }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div
            className="flex-shrink-0 flex items-start gap-3 px-4 py-4 rounded-xl md:max-w-xs"
            style={{ background: "var(--portal-color-faint)", border: "1px solid var(--portal-color-border)" }}
          >
            <Shield size={18} style={{ color: "var(--portal-color)", flexShrink: 0, marginTop: "2px" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--portal-color)" }}>
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
              background: activeCategory === "all" ? "var(--portal-color-subtle)" : "var(--color-surface-container)",
              border: `1px solid ${activeCategory === "all" ? "var(--portal-color-glow)" : "var(--color-outline-variant)"}`,
              color: activeCategory === "all" ? "var(--portal-color)" : "var(--color-on-surface-variant)",
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
                background: activeCategory === cat.id ? "var(--portal-color-subtle)" : "var(--color-surface-container)",
                border: `1px solid ${activeCategory === cat.id ? "var(--portal-color-glow)" : "var(--color-outline-variant)"}`,
                color: activeCategory === cat.id ? "var(--portal-color)" : "var(--color-on-surface-variant)",
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
                isAdmin={isAdmin}
                onAdminEdit={openEditModal}
                onAdminArchive={handleAdminArchive}
                onAdminDelete={handleAdminDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Community Signup CTA ───────────────── */}
      <section className="container-xl pb-20">
        <CommunitySignup locale={locale} variant="hero" source="nano-banana" />
      </section>

      {/* ── Admin floating button ─────────────────────────────── */}
      {isAdmin && (
        <div className="fixed bottom-6 end-6 z-50 flex flex-col gap-2 items-end">
          <Link
            href={`/${locale}/admin`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold shadow-xl transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#000",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
            }}
          >
            <Plus size={16} />
            {isAr ? "إضافة برومبت" : "Add Prompt"}
          </Link>
        </div>
      )}

      {/* ── Admin edit modal ──────────────────────────────────── */}
      {isAdmin && editTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setEditTarget(null); setEditImageFile(null); setEditImagePreview(null); } }}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 overflow-y-auto max-h-[90vh]"
            style={{ background: "var(--color-surface-container)", border: "1px solid rgba(142,213,255,0.25)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base flex items-center gap-2" style={{ color: "#8ed5ff" }}>
                <Pencil size={15} />{isAr ? "تعديل البرومبت" : "Edit Prompt"}
              </h2>
              <button
                onClick={() => { setEditTarget(null); setEditImageFile(null); setEditImagePreview(null); }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--color-on-surface-variant)" }}
              >✕</button>
            </div>

            {editMsg && (
              <div className="mb-4 p-3 rounded-xl text-sm font-mono text-center" style={{
                background: editMsg.startsWith("✅") ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                color: editMsg.startsWith("✅") ? "#4ade80" : "#f87171",
              }}>
                {editMsg}
              </div>
            )}

            <form onSubmit={handleEditSave} className="flex flex-col gap-4">
              {/* Image upload */}
              <div>
                <label className="block text-xs font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "📷 الصورة — اتركه فارغاً للإبقاء على الحالية" : "📷 Image — leave empty to keep current"}
                </label>
                <div className="flex items-start gap-3">
                  {/* Current image preview */}
                  {!editImagePreview && editTarget.item.image && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editTarget.item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {/* New image preview */}
                  {editImagePreview && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(142,213,255,0.3)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editImagePreview} alt="new" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => { setEditImageFile(null); setEditImagePreview(null); }}
                        className="absolute top-1 end-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                        style={{ background: "rgba(0,0,0,0.7)", color: "#f87171" }}>✕</button>
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-xl px-4 py-3 text-xs font-mono hover:opacity-80 transition-opacity"
                    style={{ background: "rgba(142,213,255,0.06)", border: "1px dashed rgba(142,213,255,0.3)", color: "#8ed5ff" }}>
                    <Plus size={14} />
                    {editImageFile ? editImageFile.name.slice(0, 18) + "…" : (isAr ? "اختر صورة" : "Choose image")}
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setEditImageFile(f);
                        if (f) { const r = new FileReader(); r.onload = (ev) => setEditImagePreview(ev.target?.result as string); r.readAsDataURL(f); }
                        else setEditImagePreview(null);
                      }} />
                  </label>
                </div>
                <p className="text-[10px] mt-1 opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
                  JPG / PNG / WebP / GIF — {isAr ? "حد 5 ميجا" : "max 5 MB"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الاسم (عربي) *" : "Name (Arabic) *"}</label>
                  <input required value={editForm.title_ar} onChange={(e) => setEditForm((f) => ({ ...f, title_ar: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(142,213,255,0.25)", color: "var(--color-on-surface)" }} />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الاسم (إنجليزي)" : "Name (English)"}</label>
                  <input value={editForm.title_en} onChange={(e) => setEditForm((f) => ({ ...f, title_en: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                  <input value={editForm.description_ar} onChange={(e) => setEditForm((f) => ({ ...f, description_ar: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                  <input value={editForm.description_en} onChange={(e) => setEditForm((f) => ({ ...f, description_en: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "نص البرومبت (عربي) *" : "Prompt (Arabic) *"}</label>
                <textarea required value={editForm.prompt_ar} onChange={(e) => setEditForm((f) => ({ ...f, prompt_ar: e.target.value }))}
                  rows={4} className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none resize-y font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(142,213,255,0.25)", color: "var(--color-on-surface)", direction: "ltr" }} />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "نص البرومبت (إنجليزي)" : "Prompt (English)"}</label>
                <textarea value={editForm.prompt_en} onChange={(e) => setEditForm((f) => ({ ...f, prompt_en: e.target.value }))}
                  rows={3} className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none resize-y font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)", direction: "ltr" }} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={editForm.featured} onChange={(e) => setEditForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{isAr ? "★ مميز (Featured)" : "★ Mark as Featured"}</span>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setEditTarget(null); setEditImageFile(null); setEditImagePreview(null); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button type="submit" disabled={editSaving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #8ed5ff, #60b4e8)", color: "#000" }}>
                  {editSaving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "💾 حفظ" : "💾 Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
