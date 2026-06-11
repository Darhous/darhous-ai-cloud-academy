"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { UserLevel } from "@/lib/auth/roles";

interface Props { locale: string }

const STEPS = ["welcome", "level", "interests", "goal", "finish"] as const;
type Step = typeof STEPS[number];

const LEVELS: { value: UserLevel; labelAr: string; labelEn: string; icon: string; descAr: string; descEn: string }[] = [
  { value: "beginner", labelAr: "مبتدئ", labelEn: "Beginner", icon: "🌱", descAr: "لا خلفية تقنية مسبقة", descEn: "No prior technical background" },
  { value: "intermediate", labelAr: "متوسط", labelEn: "Intermediate", icon: "🚀", descAr: "لديّ بعض المعرفة التقنية", descEn: "I have some technical knowledge" },
  { value: "advanced", labelAr: "متقدم", labelEn: "Advanced", icon: "⚡", descAr: "خبرة في البرمجة أو AI", descEn: "Experience in coding or AI" },
];

const INTERESTS_AR = ["الذكاء الاصطناعي", "تعلم الآلة", "السحابة", "Claude AI", "برمجة", "أتمتة", "نماذج اللغة", "صور AI", "Prompt Engineering"];
const INTERESTS_EN = ["Artificial Intelligence", "Machine Learning", "Cloud", "Claude AI", "Programming", "Automation", "LLMs", "AI Images", "Prompt Engineering"];

const GOALS_AR = ["التحول إلى مجال AI", "تطوير مشروع خاص", "ترقية مهنية", "التعلم الشخصي", "بناء أدوات ذكاء اصطناعي"];
const GOALS_EN = ["Transition to AI field", "Build my own project", "Career advancement", "Personal learning", "Build AI tools"];

export default function OnboardingClient({ locale }: Props) {
  const isAr = locale === "ar";
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("welcome");
  const [level, setLevel] = useState<UserLevel | "">("");
  const [interests, setInterests] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [saving, setSaving] = useState(false);
  const [direction, setDirection] = useState(1);

  const stepIndex = STEPS.indexOf(step);
  const Next = isAr ? ChevronLeft : ChevronRight;
  const Prev = isAr ? ChevronRight : ChevronLeft;

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) { setDirection(1); setStep(STEPS[idx + 1]); }
  };
  const goPrev = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) { setDirection(-1); setStep(STEPS[idx - 1]); }
  };

  const toggleInterest = (item: string) =>
    setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

  const handleFinish = async () => {
    if (!supabase || !user) return;
    setSaving(true);
    try {
      await supabase.from("student_profiles").upsert({
        user_id: user.id,
        level: level || "beginner",
        goal: goal || null,
        interests: interests.length ? interests : null,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error(err);
      router.push(`/${locale}/dashboard`);
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    if (!supabase || !user) return;
    await supabase.from("student_profiles").upsert({
      user_id: user.id,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    router.push(`/${locale}/dashboard`);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin" size={32} style={{ color: "var(--color-primary)" }} /></div>;
  }

  const interestsList = isAr ? INTERESTS_AR : INTERESTS_EN;
  const goalsList = isAr ? GOALS_AR : GOALS_EN;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: "var(--color-background)" }}>

      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i <= stepIndex ? "var(--color-primary)" : "var(--color-outline-variant)", transform: i === stepIndex ? "scale(1.4)" : "scale(1)" }} />
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-lg overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={step} custom={direction} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-card rounded-3xl p-8 md:p-10">

            {/* STEP: Welcome */}
            {step === "welcome" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="text-6xl">🎓</div>
                <h1 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "أهلاً بك في NexaLearn!" : "Welcome to NexaLearn!"}
                </h1>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr
                    ? "سنخصّص تجربتك التعليمية بناءً على مستواك واهتماماتك. سيأخذ هذا دقيقة واحدة فقط."
                    : "We'll personalize your learning experience based on your level and interests. This takes just one minute."}
                </p>
                <button onClick={goNext}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm mt-2 transition-all hover:opacity-90"
                  style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                  {isAr ? "لنبدأ" : "Let's Start"}
                  <Next size={18} />
                </button>
                <button onClick={handleSkip} className="text-xs underline mt-1 opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "تخطي الإعداد" : "Skip setup"}
                </button>
              </div>
            )}

            {/* STEP: Level */}
            {step === "level" && (
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>2 / 4</p>
                  <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? "ما هو مستواك الحالي؟" : "What's your current level?"}
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  {LEVELS.map(l => (
                    <button key={l.value} onClick={() => setLevel(l.value)}
                      className="flex items-center gap-4 p-4 rounded-2xl text-start transition-all"
                      style={{
                        background: level === l.value ? "var(--color-primary)12" : "var(--color-surface-container)",
                        border: `1px solid ${level === l.value ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                      }}>
                      <span className="text-3xl">{l.icon}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: level === l.value ? "var(--color-primary)" : "var(--color-on-surface)" }}>
                          {isAr ? l.labelAr : l.labelEn}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                          {isAr ? l.descAr : l.descEn}
                        </p>
                      </div>
                      {level === l.value && <CheckCircle2 size={20} className="ms-auto flex-shrink-0" style={{ color: "var(--color-primary)" }} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: Interests */}
            {step === "interests" && (
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>3 / 4</p>
                  <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? "ما الذي يثير اهتمامك؟" : "What interests you?"}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "اختر أكثر من خيار" : "Choose multiple"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map(item => (
                    <button key={item} onClick={() => toggleInterest(item)}
                      className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: interests.includes(item) ? "var(--color-primary)" : "var(--color-surface-container)",
                        color: interests.includes(item) ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                        border: `1px solid ${interests.includes(item) ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                      }}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: Goal */}
            {step === "goal" && (
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <p className="text-sm font-mono mb-1" style={{ color: "var(--color-primary)" }}>4 / 4</p>
                  <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? "ما هدفك الرئيسي؟" : "What's your main goal?"}
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  {goalsList.map(g => (
                    <button key={g} onClick={() => setGoal(g)}
                      className="p-3.5 rounded-xl text-sm text-start transition-all"
                      style={{
                        background: goal === g ? "var(--color-primary)12" : "var(--color-surface-container)",
                        border: `1px solid ${goal === g ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                        color: goal === g ? "var(--color-primary)" : "var(--color-on-surface)",
                      }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: Finish */}
            {step === "finish" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="text-6xl">🚀</div>
                <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "جاهز للانطلاق!" : "Ready to launch!"}
                </h2>
                <div className="w-full flex flex-col gap-2 text-sm">
                  {level && <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
                    <span>📊</span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "المستوى: " : "Level: "}</span>
                    <span className="font-medium" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? LEVELS.find(l => l.value === level)?.labelAr : LEVELS.find(l => l.value === level)?.labelEn}
                    </span>
                  </div>}
                  {interests.length > 0 && <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
                    <span>🎯</span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "اهتمامات: " : "Interests: "}</span>
                    <span className="font-medium" style={{ color: "var(--color-on-surface)" }}>{interests.slice(0, 3).join("، ")}{interests.length > 3 ? "..." : ""}</span>
                  </div>}
                  {goal && <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
                    <span>💡</span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الهدف: " : "Goal: "}</span>
                    <span className="font-medium" style={{ color: "var(--color-on-surface)" }}>{goal}</span>
                  </div>}
                </div>
                <button onClick={handleFinish} disabled={saving}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm mt-2 w-full justify-center transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                  {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "انتهى! اذهب للوحة التحكم" : "Done! Go to Dashboard")}
                </button>
              </div>
            )}

            {/* Navigation buttons (not on welcome/finish) */}
            {step !== "welcome" && step !== "finish" && (
              <div className="flex items-center justify-between mt-8">
                <button onClick={goPrev}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
                  <Prev size={16} />
                  {isAr ? "السابق" : "Back"}
                </button>
                <button onClick={goNext}
                  className="flex items-center gap-1 px-5 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                  style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                  {isAr ? "التالي" : "Next"}
                  <Next size={16} />
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
