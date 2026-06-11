"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Clock, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

interface Mission {
  title: string;
  description: string;
  steps: string[];
  challenge: string;
  estimated_minutes: number;
  resource: string | null;
}

interface Props {
  locale: string;
  userContext?: string;
  onMissionComplete?: () => void;
}

const STORAGE_KEY = "nexalearn_mission_v1";
const COMPLETION_KEY = "nexalearn_mission_done_v1";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function MentorMission({ locale, userContext, onMissionComplete }: Props) {
  const isAr = locale === "ar";
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const todayKey = getTodayKey();

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const done = localStorage.getItem(COMPLETION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === todayKey) {
          setMission(parsed.mission);
        }
      }
      if (done === todayKey) {
        setCompleted(true);
      }
    } catch {}
  }, [todayKey]);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mentor/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userContext, locale }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.mission) {
        setMission(data.mission);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, mission: data.mission }));
      }
    } catch {
      setError(isAr ? "تعذّر توليد المهمة. حاول مرة أخرى." : "Failed to generate mission. Try again.");
    } finally {
      setLoading(false);
    }
  }, [userContext, locale, todayKey, isAr]);

  // Auto-generate if no mission today
  useEffect(() => {
    if (!mission && !loading) {
      generate();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleComplete = () => {
    setCompleted(true);
    localStorage.setItem(COMPLETION_KEY, todayKey);
    onMissionComplete?.();
  };

  if (!mission && loading) {
    return (
      <div
        className="rounded-2xl border p-4 animate-pulse"
        style={{ background: "rgba(251,191,36,0.03)", borderColor: "rgba(251,191,36,0.12)" }}
      >
        <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(251,191,36,0.6)" }}>
          <Target size={14} className="animate-spin" />
          {isAr ? "جاري توليد مهمة اليوم..." : "Generating today's mission..."}
        </div>
      </div>
    );
  }

  if (error && !mission) {
    return (
      <div
        className="rounded-2xl border p-4 flex items-center justify-between"
        style={{ background: "rgba(251,113,133,0.04)", borderColor: "rgba(251,113,133,0.12)" }}
      >
        <span className="text-xs" style={{ color: "#fb7185" }}>{error}</span>
        <button
          onClick={generate}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: "rgba(251,113,133,0.1)", color: "#fb7185" }}
        >
          <RefreshCw size={12} />
          {isAr ? "إعادة المحاولة" : "Retry"}
        </button>
      </div>
    );
  }

  if (!mission) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: completed
          ? "rgba(74,222,128,0.04)"
          : "rgba(251,191,36,0.04)",
        borderColor: completed
          ? "rgba(74,222,128,0.15)"
          : "rgba(251,191,36,0.15)",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-start"
      >
        <div className="flex items-center gap-2.5">
          {completed ? (
            <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
          ) : (
            <Target size={16} style={{ color: "#fbbf24" }} />
          )}
          <span
            className="text-sm font-semibold"
            style={{ color: completed ? "#4ade80" : "#fbbf24" }}
          >
            {isAr ? "🎯 مهمة اليوم" : "🎯 Mission of the Day"}
          </span>
          {completed && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
            >
              {isAr ? "مكتملة ✓" : "Done ✓"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: "#8b90a0" }}>
            <Clock size={11} />
            {mission.estimated_minutes} {isAr ? "دقيقة" : "min"}
          </span>
          {expanded ? <ChevronUp size={14} style={{ color: "#8b90a0" }} /> : <ChevronDown size={14} style={{ color: "#8b90a0" }} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-3">
              {/* Title + description */}
              <div>
                <h3
                  className="font-semibold text-base mb-1"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {mission.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {mission.description}
                </p>
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-1.5">
                {mission.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: completed ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                        color: completed ? "#4ade80" : "#fbbf24",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Challenge */}
              {mission.challenge && (
                <div
                  className="rounded-xl px-3 py-2 text-xs"
                  style={{
                    background: "rgba(142,213,255,0.06)",
                    border: "1px solid rgba(142,213,255,0.1)",
                    color: "#8ed5ff",
                  }}
                >
                  🏆 {isAr ? "التحدي: " : "Challenge: "}{mission.challenge}
                </div>
              )}

              {/* Actions */}
              {!completed ? (
                <button
                  onClick={handleComplete}
                  className="self-start flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    color: "#4ade80",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  <CheckCircle2 size={13} />
                  {isAr ? "أكملت المهمة ✓" : "Mark as Complete ✓"}
                </button>
              ) : (
                <p className="text-xs" style={{ color: "#4ade80" }}>
                  ✅ {isAr ? "أحسنت! عُدّت سلسلتك." : "Great work! Your streak continues."}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
