"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Flame, BookOpen, Star, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface LeaderEntry {
  username: string;
  displayName: string;
  streak: number;
  completedCourses: number;
  points: number;
  rank: number;
}

export default function LeaderboardClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { user, supabaseConfigured } = useAuth();
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"streak" | "courses" | "points">("streak");

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (!supabaseConfigured) { setLoading(false); return; }
      try {
        // Fetch public profiles with their data
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        if (!supabase) { setLoading(false); return; }

        const { data: pubProfiles } = await supabase
          .from("public_profiles")
          .select("user_id,username,display_name,show_streak")
          .eq("is_public", true)
          .limit(20);

        if (!pubProfiles?.length) { setLoading(false); return; }

        const entries: LeaderEntry[] = [];
        for (const p of pubProfiles) {
          const [cpRes, lpRes, subRes] = await Promise.all([
            supabase.from("course_progress").select("course_slug").eq("user_id", p.user_id).eq("status", "completed"),
            p.show_streak
              ? supabase.from("lesson_progress").select("completed_at").eq("user_id", p.user_id).eq("completed", true).not("completed_at", "is", null)
              : Promise.resolve({ data: [] }),
            supabase.from("challenge_submissions").select("id").eq("user_id", p.user_id),
          ]);

          // Calculate streak
          const timestamps = (lpRes.data ?? []).map((r: { completed_at: string }) => r.completed_at);
          let streak = 0;
          if (p.show_streak && timestamps.length > 0) {
            const toDay = (ts: string) => ts.slice(0, 10);
            const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse();
            const today = new Date().toISOString().slice(0, 10);
            const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
            if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
              streak = 1;
              for (let i = 1; i < uniqueDays.length; i++) {
                const prev = new Date(uniqueDays[i - 1]);
                const curr = new Date(uniqueDays[i]);
                if (Math.round((prev.getTime() - curr.getTime()) / 864e5) === 1) streak++;
                else break;
              }
            }
          }

          const completedCourses = cpRes.data?.length ?? 0;
          const challengeCount = subRes.data?.length ?? 0;
          const points = streak * 5 + completedCourses * 50 + challengeCount * 25;

          entries.push({
            username: p.username ?? p.user_id.slice(0, 8),
            displayName: p.display_name ?? (isAr ? "متعلم" : "Learner"),
            streak,
            completedCourses,
            points,
            rank: 0,
          });
        }

        // Sort by active tab
        entries.sort((a, b) => b.streak - a.streak);
        entries.forEach((e, i) => (e.rank = i + 1));
        setLeaders(entries);
      } catch {
        // Fail silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [supabaseConfigured, isAr]);

  const sorted = [...leaders].sort((a, b) =>
    tab === "streak" ? b.streak - a.streak : tab === "courses" ? b.completedCourses - a.completedCourses : b.points - a.points
  ).map((e, i) => ({ ...e, rank: i + 1 }));

  const rankColors = ["#fbbf24", "#9ca3af", "#92400e"];
  const rankEmojis = ["🥇", "🥈", "🥉"];

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
          <Trophy size={12} /> {isAr ? "لوحة المتصدرين" : "Leaderboard"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "المتعلمون المتميزون" : "Top Learners"}
        </h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "الترتيب يعتمد على الملفات العامة فقط — اختياري ومحترم للخصوصية" : "Rankings based on public profiles only — opt-in and privacy-first"}
        </p>
      </div>

      {/* Privacy note */}
      <div className="max-w-xl mx-auto w-full">
        <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "rgba(142,213,255,0.08)", border: "1px solid rgba(142,213,255,0.15)" }}>
          <Shield size={16} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تظهر فقط الملفات التي فعّل أصحابها الظهور العام. لتظهر هنا، فعّل \"الملف العام\" في صفحة الإعدادات."
              : "Only profiles with public visibility enabled appear here. To appear, enable \"Public Profile\" in your settings."}
          </p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex justify-center gap-2">
        {[
          { key: "streak" as const, icon: <Flame size={14} />, ar: "السلسلة", en: "Streak" },
          { key: "courses" as const, icon: <BookOpen size={14} />, ar: "الدورات", en: "Courses" },
          { key: "points" as const, icon: <Star size={14} />, ar: "النقاط", en: "Points" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl transition-all"
            style={{
              background: tab === t.key ? "var(--color-primary)" : "var(--color-surface-container)",
              color: tab === t.key ? "#fff" : "var(--color-on-surface-variant)",
            }}
          >
            {t.icon} {isAr ? t.ar : t.en}
          </button>
        ))}
      </div>

      {/* Leaderboard table */}
      <div className="max-w-2xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl h-16 animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <p className="font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "لا توجد ملفات عامة بعد" : "No public profiles yet"}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "كن أول من يظهر في لوحة المتصدرين!" : "Be the first to appear on the leaderboard!"}
            </p>
            {user && (
              <Link href={`/${locale}/profile`} className="glow-button-primary text-white font-mono px-6 py-2 rounded-xl text-sm">
                {isAr ? "فعّل ملفك العام" : "Enable Public Profile"}
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((entry) => (
              <div
                key={entry.username}
                className="glass-card rounded-2xl p-4 flex items-center gap-4"
                style={{
                  border: entry.rank <= 3 ? `1px solid ${rankColors[entry.rank - 1]}30` : undefined,
                }}
              >
                <div className="w-8 text-center font-bold font-mono text-lg" style={{ color: entry.rank <= 3 ? rankColors[entry.rank - 1] : "var(--color-on-surface-variant)" }}>
                  {entry.rank <= 3 ? rankEmojis[entry.rank - 1] : `#${entry.rank}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--color-on-surface)" }}>{entry.displayName}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>@{entry.username}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0">
                  <div className="text-center">
                    <p className="font-bold" style={{ color: "#f97316" }}>{entry.streak}</p>
                    <p style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "أيام" : "days"}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold" style={{ color: "var(--color-primary)" }}>{entry.completedCourses}</p>
                    <p style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "دورة" : "courses"}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold" style={{ color: "#fbbf24" }}>{entry.points}</p>
                    <p style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "نقطة" : "pts"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
