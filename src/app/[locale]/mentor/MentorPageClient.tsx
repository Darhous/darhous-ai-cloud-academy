"use client";

import { useState, useEffect } from "react";
import MentorHero from "@/components/mentor/MentorHero";
import MentorModeSelector from "@/components/mentor/MentorModeSelector";
import MentorChat from "@/components/mentor/MentorChat";
import type { MentorModeId } from "@/data/mentor";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  locale: string;
}

interface PageContext {
  title: string;
  hint: string;
}

interface UserCtxData {
  name: string;
  language_level: string | null;
  completed_courses: number;
  exam_results: number;
  learning_streak: number;
  portals_used: number;
}

function buildContextString(ctx: UserCtxData, isAr: boolean): string {
  if (isAr) {
    return [
      `اسم المتعلم: ${ctx.name}`,
      ctx.language_level ? `مستوى اللغة الإنجليزية: ${ctx.language_level}` : "مستوى اللغة: لم يُختبر بعد",
      `الدورات المكتملة: ${ctx.completed_courses}`,
      `الاختبارات الرقمية المنجزة: ${ctx.exam_results}`,
      `سلسلة التعلم: ${ctx.learning_streak} أيام متواصلة`,
      `البوابات المستخدمة: ${ctx.portals_used} من 6`,
    ].join("\n");
  }
  return [
    `Learner name: ${ctx.name}`,
    ctx.language_level ? `English level: ${ctx.language_level}` : "English level: not tested yet",
    `Completed courses: ${ctx.completed_courses}`,
    `Digital exams completed: ${ctx.exam_results}`,
    `Learning streak: ${ctx.learning_streak} days`,
    `Portals used: ${ctx.portals_used} of 6`,
  ].join("\n");
}

export default function MentorPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const [activeMode, setActiveMode] = useState<MentorModeId>("ask");
  const [pageContext, setPageContext] = useState<PageContext | null>(null);
  const [chatKey, setChatKey] = useState<string>("ask");
  const [userContext, setUserContext] = useState<string | undefined>(undefined);
  const [ctxData, setCtxData] = useState<UserCtxData | null>(null);
  const [ctxOpen, setCtxOpen] = useState(false);

  // Read Ask This Page context from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ask_page_ctx");
      if (raw) {
        const ctx = JSON.parse(raw) as PageContext;
        setPageContext(ctx);
        sessionStorage.removeItem("ask_page_ctx");
      }
    } catch {}
  }, []);

  // Fetch user context from Supabase if authenticated
  useEffect(() => {
    async function fetchUserContext() {
      const supabase = createClient();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, cpRes, lrRes, erRes, lpRes] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", user.id).single(),
        supabase.from("course_progress").select("status").eq("user_id", user.id).eq("status", "completed"),
        supabase.from("language_results").select("level").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("digital_exam_results").select("id").eq("user_id", user.id),
        supabase.from("lesson_progress").select("completed_at").eq("user_id", user.id).eq("completed", true).not("completed_at", "is", null),
      ]);

      const name = profileRes.data?.full_name ?? user.email?.split("@")[0] ?? "Learner";
      const completedCourses = cpRes.data?.length ?? 0;
      const languageLevel = lrRes.data?.level ?? null;
      const examCount = erRes.data?.length ?? 0;

      // Calculate streak
      const timestamps = lpRes.data?.map((r: { completed_at: string }) => r.completed_at) ?? [];
      let streak = 0;
      if (timestamps.length > 0) {
        const toDay = (ts: string) => ts.slice(0, 10);
        const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse() as string[];
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
          streak = 1;
          for (let i = 1; i < uniqueDays.length; i++) {
            const prev = new Date(uniqueDays[i - 1]);
            const curr = new Date(uniqueDays[i]);
            if (Math.round((prev.getTime() - curr.getTime()) / 864e5) === 1) { streak++; } else { break; }
          }
        }
      }

      const portalsUsed = [completedCourses > 0, !!languageLevel, examCount > 0].filter(Boolean).length;

      const ctx: UserCtxData = {
        name,
        language_level: languageLevel,
        completed_courses: completedCourses,
        exam_results: examCount,
        learning_streak: streak,
        portals_used: portalsUsed,
      };

      setCtxData(ctx);
      setUserContext(buildContextString(ctx, isAr));
    }

    fetchUserContext();
  }, [isAr]);

  function handleModeSelect(mode: MentorModeId) {
    setActiveMode(mode);
    setChatKey(mode);
    setPageContext(null);
  }

  return (
    <section className="flex flex-col" style={{ minHeight: "calc(100vh - 104px)" }}>
      <MentorHero isAr={isAr} />

      {/* Page context banner from Ask This Page */}
      {pageContext && (
        <div
          className="mx-4 mb-2 px-4 py-3 rounded-xl flex items-start justify-between gap-3 max-w-3xl mx-auto w-full"
          style={{
            background: "rgba(142,213,255,0.08)",
            border: "1px solid rgba(142,213,255,0.2)",
          }}
        >
          <div className="min-w-0">
            <p className="text-xs font-mono mb-0.5" style={{ color: "var(--color-primary)" }}>
              {isAr ? "سياق الصفحة المحملة:" : "Page context loaded:"}
            </p>
            <p className="text-sm font-medium truncate" style={{ color: "var(--color-on-surface)" }}>
              {pageContext.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "اقتراح:" : "Suggestion:"} {pageContext.hint}
            </p>
          </div>
          <button
            onClick={() => setPageContext(null)}
            className="flex-shrink-0 p-1 rounded hover:opacity-70"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* User context panel — shown when authenticated */}
      {ctxData && (
        <div className="px-4 mb-2 max-w-3xl mx-auto w-full">
          <button
            onClick={() => setCtxOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono transition-all"
            style={{
              background: "rgba(60,224,251,0.06)",
              border: "1px solid rgba(60,224,251,0.15)",
              color: "var(--color-tertiary)",
            }}
          >
            <span>
              {isAr ? "🧠 ما يعرفه المرشد عنك" : "🧠 What the Mentor Knows About You"}
              <span className="ms-2 opacity-60">({isAr ? "مفعّل" : "active"})</span>
            </span>
            {ctxOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {ctxOpen && (
            <div
              className="mt-1 px-4 py-3 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-2"
              style={{ background: "rgba(60,224,251,0.04)", border: "1px solid rgba(60,224,251,0.1)" }}
            >
              {[
                { l: isAr ? "الاسم" : "Name", v: ctxData.name, c: "var(--color-primary)" },
                { l: isAr ? "مستوى اللغة" : "Language", v: ctxData.language_level ?? (isAr ? "لم يُختبر" : "Not tested"), c: "var(--color-secondary)" },
                { l: isAr ? "دورات مكتملة" : "Courses done", v: String(ctxData.completed_courses), c: "#4ade80" },
                { l: isAr ? "اختبارات رقمية" : "Exams done", v: String(ctxData.exam_results), c: "var(--color-tertiary)" },
                { l: isAr ? "سلسلة التعلم" : "Streak", v: `${ctxData.learning_streak}d`, c: "#f97316" },
                { l: isAr ? "بوابات مستخدمة" : "Portals used", v: `${ctxData.portals_used}/6`, c: "var(--color-secondary)" },
              ].map((item) => (
                <div key={item.l} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.c }} />
                  <span className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>{item.l}:</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: item.c }}>{item.v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-shrink-0 py-3">
        <MentorModeSelector
          activeMode={activeMode}
          onSelect={handleModeSelect}
          isAr={isAr}
        />
      </div>

      {/* key remounts MentorChat when mode changes, resetting conversation */}
      <div className="flex-1">
        <MentorChat
          key={chatKey}
          modeId={activeMode}
          locale={locale}
          isAr={isAr}
          initialMessage={pageContext?.hint}
          userContext={userContext}
        />
      </div>
    </section>
  );
}
