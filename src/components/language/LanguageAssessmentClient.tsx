"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  CheckCircle, XCircle, ChevronRight, ChevronLeft, Flag,
  AlertTriangle, BookOpen, Sparkles, LogIn,
} from "lucide-react";
import allQuestionsRaw from "@/data/language-questions.json";

// ── Types ─────────────────────────────────────────────────────────────────────
type Difficulty = "easy" | "medium" | "hard";
type Category = "grammar" | "vocabulary" | "reading";
type Phase = "intro" | "running" | "stage-break" | "finalizing" | "done";

interface LQQuestion {
  stage: number;
  category: Category;
  difficulty: Difficulty;
  question_text: string;
  options: { a: string; b: string; c: string; d: string };
  correct_answer: "a" | "b" | "c" | "d";
  passage: string | null;
}

interface LQAnswer {
  questionText: string;
  selected: "a" | "b" | "c" | "d" | null;
  correct: boolean;
  timeSpent: number;
  difficulty: Difficulty;
  category: Category;
  stage: number;
}

interface StageRecord {
  stage: number;
  score: number;
  difficulty: Difficulty;
  answers: LQAnswer[];
}

const allQuestions = allQuestionsRaw as LQQuestion[];

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getStageQuestions(stageNum: number, difficulty: Difficulty): LQQuestion[] {
  const pool = allQuestions.filter((q) => q.stage === stageNum);
  const preferred = shuffle(pool.filter((q) => q.difficulty === difficulty));
  const others = shuffle(pool.filter((q) => q.difficulty !== difficulty));
  return shuffle([...preferred, ...others].slice(0, 10));
}

const WEIGHTS: Record<Difficulty, number> = { easy: 5, medium: 10, hard: 18 };
const TIER: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };

const CEFR_THRESHOLDS: Array<[number, string]> = [
  [96, "C2"], [91, "C1B"], [85, "C1A"],
  [79, "B2B"], [73, "B2A"], [67, "B1B"],
  [61, "B1A"], [55, "A2B"], [49, "A2A"],
  [43, "A1B"], [0, "A1A"],
];

function getCEFRLevel(score: number): string {
  for (const [threshold, level] of CEFR_THRESHOLDS) {
    if (score >= threshold) return level;
  }
  return "A1A";
}

function computeFinalResult(stageRecords: StageRecord[], totalTimeSec: number) {
  const all = stageRecords.flatMap((r) => r.answers);
  if (all.length === 0) {
    return { score: 0, level: "A1A", breakdown: { grammar: 0, vocabulary: 0, reading: 0, stages: [] as Array<{stage:number;score:number;difficulty:string}> }, timeSpent: 0, stagesCompleted: 0, isIncomplete: true };
  }

  const totalW = all.reduce((s, a) => s + (a.correct ? WEIGHTS[a.difficulty] : 0), 0);
  const maxW = all.reduce((s, a) => s + WEIGHTS[a.difficulty], 0);
  const weighted = maxW > 0 ? (totalW / maxW) * 100 : 0;

  const avgTier = all.reduce((s, a) => s + TIER[a.difficulty], 0) / all.length;
  const modifier = (avgTier - 1) * 8;

  const scores = stageRecords.map((r) => r.score);
  const variance = scores.length >= 5 ? Math.max(...scores) - Math.min(...scores) : 99;
  const bonus = variance < 20 ? 2 : 0;

  const finalScore = Math.max(0, Math.min(100, weighted + modifier + bonus));

  const grammarStages = [2, 3, 6, 9];
  const vocabStages = [1, 4, 10];
  const readingStages = [5, 7, 8];

  const skillScore = (stages: number[]) => {
    const sa = all.filter((a) => stages.includes(a.stage));
    return sa.length > 0 ? Math.round((sa.filter((a) => a.correct).length / sa.length) * 100) : 0;
  };

  return {
    score: Math.round(finalScore * 10) / 10,
    level: getCEFRLevel(finalScore),
    stagesCompleted: stageRecords.length,
    isIncomplete: stageRecords.length < 10,
    timeSpent: totalTimeSec,
    breakdown: {
      grammar: skillScore(grammarStages),
      vocabulary: skillScore(vocabStages),
      reading: skillScore(readingStages),
      stages: stageRecords.map((r) => ({ stage: r.stage, score: Math.round(r.score), difficulty: r.difficulty })),
    },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function LanguageAssessmentClient({ locale }: { locale: string }) {
  const router = useRouter();
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { user, isAuthenticated, loading, supabaseConfigured } = useAuth();

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>("easy");
  const [stageRecords, setStageRecords] = useState<StageRecord[]>([]);
  const [stageQuestions, setStageQuestions] = useState<LQQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<LQAnswer[]>([]);
  const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [examStart, setExamStart] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Refs for values needed inside timers (avoids stale closures)
  const stageQuestionsRef = useRef<LQQuestion[]>([]);
  const qIndexRef = useRef(0);
  const currentAnswersRef = useRef<LQAnswer[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs in sync
  useEffect(() => { stageQuestionsRef.current = stageQuestions; }, [stageQuestions]);
  useEffect(() => { qIndexRef.current = qIndex; }, [qIndex]);
  useEffect(() => { currentAnswersRef.current = currentAnswers; }, [currentAnswers]);

  // Anti-cheat
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && phase === "running") {
        setTabSwitches((n) => n + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [phase]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (feedbackTimerRef.current) { clearTimeout(feedbackTimerRef.current); feedbackTimerRef.current = null; }
  }, []);

  const advanceQuestion = useCallback(() => {
    setSelected(null);
    setShowFeedback(false);
    setQIndex((i) => i + 1);
  }, []);

  // Start timer for current question
  const startTimer = useCallback(() => {
    clearTimers();
    setTimeLeft(90);
    setQuestionStart(Date.now());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers();
          // Auto-skip: use refs to get fresh question/index
          const q = stageQuestionsRef.current[qIndexRef.current];
          if (q) {
            setCurrentAnswers((prev) => [
              ...prev,
              { questionText: q.question_text, selected: null, correct: false, timeSpent: 90, difficulty: q.difficulty, category: q.category, stage: q.stage },
            ]);
          }
          setQIndex((i) => i + 1);
          setSelected(null);
          setShowFeedback(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [clearTimers]);

  // Watch qIndex: start new timer or finish stage
  useEffect(() => {
    if (phase !== "running") return;
    if (stageQuestions.length === 0) return;

    if (qIndex >= stageQuestions.length) {
      clearTimers();
      // Compute stage score from currentAnswersRef (always fresh)
      const answers = currentAnswersRef.current;
      const correct = answers.filter((a) => a.correct).length;
      const score = answers.length > 0 ? (correct / answers.length) * 100 : 0;
      const record: StageRecord = {
        stage: currentStageIdx + 1,
        score,
        difficulty: currentDifficulty,
        answers,
      };
      setStageRecords((r) => [...r, record]);

      // Determine next difficulty
      if (score >= 75) {
        setCurrentDifficulty((d) => d === "easy" ? "medium" : d === "medium" ? "hard" : "hard");
      }
      setPhase("stage-break");
      return;
    }

    startTimer();
  }, [qIndex, phase, stageQuestions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function startStage(stageIdx: number, difficulty: Difficulty) {
    const qs = getStageQuestions(stageIdx + 1, difficulty);
    setStageQuestions(qs);
    setQIndex(0);
    setCurrentAnswers([]);
    setSelected(null);
    setShowFeedback(false);
    setCurrentStageIdx(stageIdx);
    setCurrentDifficulty(difficulty);
    setPhase("running");
  }

  function handleStartExam() {
    setExamStart(Date.now());
    setStageRecords([]);
    startStage(0, "easy");
  }

  function handleContinue(lastScore: number) {
    const nextIdx = currentStageIdx + 1;
    if (nextIdx >= 10 || lastScore < 40) {
      startFinalize(false);
      return;
    }
    const nextDiff: Difficulty =
      lastScore >= 75
        ? currentDifficulty === "easy" ? "medium" : currentDifficulty === "medium" ? "hard" : "hard"
        : currentDifficulty;
    startStage(nextIdx, nextDiff);
  }

  function startFinalize(earlyExit: boolean) {
    setPhase("finalizing");
    clearTimers();

    // stageRecords might not include the last stage yet if called from running phase (early exit)
    // Use a timeout to let React state settle
    setTimeout(() => {
      doFinalize(earlyExit);
    }, 800);
  }

  async function doFinalize(earlyExit: boolean) {
    const totalSec = Math.round((Date.now() - examStart) / 1000);

    // Re-read stageRecords from state (via a functional update trick)
    setStageRecords((latestRecords) => {
      const result = computeFinalResult(latestRecords, totalSec);
      const payload = {
        score: result.score,
        level: result.level,
        time_taken: result.timeSpent,
        stages_completed: result.stagesCompleted,
        is_incomplete: earlyExit || result.isIncomplete,
        breakdown: result.breakdown,
      };

      fetch("/api/language/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then(({ id }) => {
          setPhase("done");
          router.push(`/${locale}/language/results?id=${id}`);
        })
        .catch(() => {
          setSaveError("Could not save. Showing local results.");
          setPhase("done");
          router.push(`/${locale}/language/results?score=${result.score}&level=${result.level}`);
        });

      return latestRecords; // no actual change — just reading
    });
  }

  function handleSelectOption(opt: "a" | "b" | "c" | "d") {
    if (showFeedback || selected) return;
    clearTimers();
    const q = stageQuestions[qIndex];
    if (!q) return;
    const timeSpent = Math.round((Date.now() - questionStart) / 1000);
    const correct = opt === q.correct_answer;
    setSelected(opt);
    setShowFeedback(true);
    setCurrentAnswers((prev) => [
      ...prev,
      { questionText: q.question_text, selected: opt, correct, timeSpent, difficulty: q.difficulty, category: q.category, stage: q.stage },
    ]);
    feedbackTimerRef.current = setTimeout(() => {
      setShowFeedback(false);
      advanceQuestion();
    }, 1200);
  }

  useEffect(() => () => clearTimers(), [clearTimers]);

  // ── Auth gate ────────────────────────────────────────────────────────────────
  if (!loading && supabaseConfigured && !isAuthenticated) {
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-8 text-center">
        <LogIn size={40} style={{ color: "#d0bcff" }} />
        <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تسجيل الدخول مطلوب" : "Sign In Required"}
        </h2>
        <p className="max-w-md" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "يجب تسجيل الدخول لحفظ نتائج تقييمك اللغوي ومتابعة تقدمك."
            : "Sign in to save your language assessment results and track your progress."}
        </p>
        <div className="flex gap-4">
          <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
          <Link href={`/${locale}/language`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl">
            {isAr ? "رجوع" : "Go Back"}
          </Link>
        </div>
      </div>
    );
  }

  // ── Intro ────────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-10 max-w-2xl mx-auto text-center">
        <div style={{ fontSize: "64px" }}>🌐</div>
        <h1 className="font-display font-bold text-4xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "اختبار تحديد المستوى الإنجليزي" : "English Level Assessment"}
        </h1>
        <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "10 مراحل — 10 أسئلة لكل مرحلة — نظام تكيّفي يحدد مستواك الحقيقي"
            : "10 stages — 10 questions each — adaptive system to precisely determine your level"}
        </p>
        <div className="grid grid-cols-2 gap-4 w-full text-start">
          {[
            { icon: "⏱️", en: "90 seconds per question", ar: "90 ثانية لكل سؤال" },
            { icon: "📊", en: "Grammar · Vocabulary · Reading", ar: "قواعد · مفردات · قراءة" },
            { icon: "🎯", en: "CEFR level (A1A → C2)", ar: "مستوى CEFR (A1A → C2)" },
            { icon: "🛡️", en: "Anti-cheat tab monitoring", ar: "مراقبة تبديل التبويب" },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? item.ar : item.en}</p>
            </div>
          ))}
        </div>
        {user && (
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? `مرحباً ${user.email?.split("@")[0]} — نتائجك ستُحفظ في حسابك تلقائياً`
              : `Welcome ${user.email?.split("@")[0]} — results will be saved to your account`}
          </p>
        )}
        <button
          onClick={handleStartExam}
          className="glow-button-primary text-white font-bold font-mono px-12 py-4 rounded-2xl text-lg flex items-center gap-3"
        >
          <Sparkles size={20} />
          {isAr ? "ابدأ الاختبار" : "Start Assessment"}
        </button>
        <Link href={`/${locale}/language`} className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "رجوع إلى بوابة اللغة" : "Back to Language Portal"}
        </Link>
      </div>
    );
  }

  // ── Running ──────────────────────────────────────────────────────────────────
  if (phase === "running") {
    const q = stageQuestions[qIndex];
    if (!q) return null;
    const progress = (qIndex / stageQuestions.length) * 100;
    const timerPct = (timeLeft / 90) * 100;
    const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 25 ? "#f59e0b" : "#4ade80";

    return (
      <div className="container-xl py-10 max-w-3xl mx-auto flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              Stage {currentStageIdx + 1}/10 · Q{qIndex + 1}/{stageQuestions.length} · {currentDifficulty}
            </span>
            <div className="w-44 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "#d0bcff" }} />
            </div>
          </div>
          {tabSwitches > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
              <AlertTriangle size={11} />
              {tabSwitches} switch{tabSwitches !== 1 ? "es" : ""} detected
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${(125.6 * timerPct) / 100} 125.6`} strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold" style={{ color: timerColor }}>{timeLeft}</span>
            </div>
            <button
              onClick={() => startFinalize(true)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
            >
              <Flag size={12} className="inline mr-1" />
              {isAr ? "إنهاء مبكر" : "End Early"}
            </button>
          </div>
        </div>

        {/* Reading passage */}
        {q.passage && (
          <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: "rgba(60,224,251,0.04)", border: "1px solid rgba(60,224,251,0.1)", color: "var(--color-on-surface-variant)" }}>
            <BookOpen size={13} className="inline mr-2" style={{ color: "var(--color-tertiary)" }} />
            {q.passage}
          </div>
        )}

        {/* Question card */}
        <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(208,188,255,0.12)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(208,188,255,0.08)", color: "#d0bcff" }}>{q.category}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{
              background: q.difficulty === "easy" ? "rgba(74,222,128,0.08)" : q.difficulty === "medium" ? "rgba(251,191,36,0.08)" : "rgba(239,68,68,0.08)",
              color: q.difficulty === "easy" ? "#4ade80" : q.difficulty === "medium" ? "#fbbf24" : "#ef4444",
            }}>{q.difficulty}</span>
          </div>
          <p className="font-semibold text-lg leading-relaxed mb-8" style={{ color: "var(--color-on-surface)" }}>
            {q.question_text}
          </p>
          <div className="flex flex-col gap-3">
            {(["a", "b", "c", "d"] as const).map((opt) => {
              let borderColor = "rgba(255,255,255,0.06)";
              let bg = "rgba(255,255,255,0.02)";
              let textColor = "var(--color-on-surface)";
              if (showFeedback) {
                if (opt === q.correct_answer) { borderColor = "#4ade80"; bg = "rgba(74,222,128,0.08)"; textColor = "#4ade80"; }
                else if (opt === selected) { borderColor = "#ef4444"; bg = "rgba(239,68,68,0.08)"; textColor = "#ef4444"; }
              } else if (selected === opt) { borderColor = "#d0bcff"; bg = "rgba(208,188,255,0.08)"; }
              return (
                <button key={opt} onClick={() => handleSelectOption(opt)} disabled={!!selected}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 text-start transition-all hover:opacity-80"
                  style={{ border: `1px solid ${borderColor}`, background: bg, cursor: selected ? "default" : "pointer" }}
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: textColor }}>
                    {opt.toUpperCase()}
                  </span>
                  <span className="text-sm flex-1" style={{ color: textColor }}>{q.options[opt]}</span>
                  {showFeedback && opt === q.correct_answer && <CheckCircle size={16} style={{ color: "#4ade80", flexShrink: 0 }} />}
                  {showFeedback && opt === selected && opt !== q.correct_answer && <XCircle size={16} style={{ color: "#ef4444", flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage progress dots */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{
              background: i < currentStageIdx ? "#4ade80" : i === currentStageIdx ? "#d0bcff" : "rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Stage Break ──────────────────────────────────────────────────────────────
  if (phase === "stage-break") {
    const lastRecord = stageRecords[stageRecords.length - 1];
    const score = lastRecord?.score ?? 0;
    const correct = lastRecord?.answers.filter((a) => a.correct).length ?? 0;
    const total = lastRecord?.answers.length ?? 0;
    const isLastStage = currentStageIdx >= 9;
    const shouldStop = score < 40;

    return (
      <div className="container-xl py-16 flex flex-col items-center gap-8 max-w-xl mx-auto text-center">
        <div style={{ fontSize: "48px" }}>{score >= 70 ? "🎯" : score >= 40 ? "📊" : "✋"}</div>
        <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? `المرحلة ${currentStageIdx + 1} مكتملة` : `Stage ${currentStageIdx + 1} Complete`}
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="font-mono font-bold text-5xl" style={{ color: score >= 70 ? "#4ade80" : score >= 40 ? "#fbbf24" : "#ef4444" }}>
            {Math.round(score)}%
          </span>
          <span className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
            ({correct}/{total} {isAr ? "صحيح" : "correct"})
          </span>
        </div>
        {shouldStop && !isLastStage && (
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "وصلت إلى مستواك الحالي. سيتم حساب نتائجك الآن." : "You've reached your current level. Results will now be calculated."}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {!isLastStage && !shouldStop && (
            <button onClick={() => handleContinue(score)} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl flex items-center gap-2">
              {isAr ? "المرحلة التالية" : "Next Stage"} <Arrow size={16} />
            </button>
          )}
          <button
            onClick={() => startFinalize(!(isLastStage || shouldStop))}
            className={`font-mono px-8 py-3 rounded-xl ${isLastStage || shouldStop ? "glow-button-primary text-white" : "glow-button-secondary"}`}
          >
            {isAr ? "احسب النتيجة النهائية" : "Calculate Final Result"}
          </button>
        </div>
      </div>
    );
  }

  // ── Finalizing / Done ────────────────────────────────────────────────────────
  return (
    <div className="container-xl py-24 flex flex-col items-center gap-8 text-center">
      <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#d0bcff", borderTopColor: "transparent" }} />
      <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "جاري حساب مستواك..." : "Calculating your level..."}
      </h2>
      {saveError && <p className="text-sm" style={{ color: "#f59e0b" }}>{saveError}</p>}
    </div>
  );
}
