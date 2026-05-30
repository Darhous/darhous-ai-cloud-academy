"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapIcon, Plus, Loader2, LogIn, Circle, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface LearningPlan {
  id: string;
  title: string;
  goal: string | null;
  duration_days: number | null;
  plan: { day: number; tasks: string[] }[] | null;
  progress_percent: number;
  status: string;
  created_at: string;
}

export default function LearningPlansClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { user, loading: authLoading, supabaseConfigured } = useAuth();
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", goal: "" });

  useEffect(() => {
    if (!user || !supabaseConfigured) return;
    setLoading(true);
    fetch("/api/learning-plans")
      .then((r) => r.json())
      .then((d) => setPlans(d.plans ?? []))
      .finally(() => setLoading(false));
  }, [user, supabaseConfigured]);

  async function createPlan() {
    if (!form.title.trim()) return;
    setCreating(true);
    const res = await fetch("/api/learning-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, goal: form.goal }),
    });
    const data = await res.json();
    if (res.ok && data.plan) {
      setPlans((prev) => [data.plan, ...prev]);
      setForm({ title: "", goal: "" });
      setShowCreate(false);
    }
    setCreating(false);
  }

  const statusColors: Record<string, string> = {
    active: "#4ade80",
    paused: "#fbbf24",
    completed: "#8ed5ff",
    archived: "#64748b",
  };

  const statusLabels: Record<string, { ar: string; en: string }> = {
    active: { ar: "نشط", en: "Active" },
    paused: { ar: "متوقف", en: "Paused" },
    completed: { ar: "مكتمل", en: "Completed" },
    archived: { ar: "مؤرشف", en: "Archived" },
  };

  if (authLoading) {
    return <div className="flex justify-center py-32"><Loader2 size={30} className="animate-spin" style={{ color: "var(--color-primary)" }} /></div>;
  }

  if (!user) {
    return (
      <div className="container-xl py-16 text-center">
        <div className="text-5xl mb-5">🗺️</div>
        <h1 className="font-display font-bold text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>{isAr ? "خطط التعلم" : "Learning Plans"}</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "سجّل دخولك لحفظ خطط التعلم وتتبع مهامك" : "Sign in to save learning plans and track your tasks"}
        </p>
        <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl inline-flex items-center gap-2">
          <LogIn size={16} /> {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-3" style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}>
            <MapIcon size={12} /> {isAr ? "خطط التعلم" : "Learning Plans"}
          </div>
          <h1 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "خططك التعليمية" : "Your Learning Plans"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/${locale}/roadmap-generator`} className="flex items-center gap-1.5 text-xs font-mono px-4 py-2.5 rounded-xl" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
            🗺️ {isAr ? "مولّد الخطط" : "Roadmap Generator"}
          </Link>
          <button onClick={() => setShowCreate(!showCreate)} className="glow-button-primary text-white font-mono px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-xs">
            <Plus size={14} /> {isAr ? "خطة جديدة" : "New Plan"}
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{isAr ? "إنشاء خطة تعليمية" : "Create Learning Plan"}</h3>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder={isAr ? "عنوان الخطة..." : "Plan title..."}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            dir={isAr ? "rtl" : "ltr"}
          />
          <textarea
            value={form.goal}
            onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
            placeholder={isAr ? "الهدف من الخطة... (اختياري)" : "Plan goal... (optional)"}
            rows={3}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            dir={isAr ? "rtl" : "ltr"}
          />
          <div className="flex gap-2">
            <button onClick={createPlan} disabled={creating || !form.title.trim()} className="glow-button-primary text-white font-mono px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-50">
              {creating ? <Loader2 size={12} className="animate-spin" /> : null}
              {isAr ? "إنشاء" : "Create"}
            </button>
            <button onClick={() => setShowCreate(false)} className="font-mono px-4 py-2 rounded-xl text-xs" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
              {isAr ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </div>
      )}

      {/* Plans list */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin" style={{ color: "var(--color-primary)" }} /></div>
      ) : plans.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <p className="font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>{isAr ? "لا توجد خطط بعد" : "No plans yet"}</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "أنشئ خطة جديدة أو استخدم مولّد الخطط" : "Create a new plan or use the Roadmap Generator"}
          </p>
          <Link href={`/${locale}/roadmap-generator`} className="glow-button-primary text-white font-mono px-6 py-2 rounded-xl text-sm">
            {isAr ? "مولّد الخطط" : "Roadmap Generator"}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {plans.map((plan) => {
            const color = statusColors[plan.status] ?? "#8ed5ff";
            const isExpanded = expandedId === plan.id;
            return (
              <div key={plan.id} className="glass-card rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}20` }}>
                <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : plan.id)}>
                  <MapIcon size={20} style={{ color, flexShrink: 0, marginTop: 2 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{plan.title}</p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                        {isAr ? statusLabels[plan.status]?.ar : statusLabels[plan.status]?.en}
                      </span>
                    </div>
                    {plan.goal && <p className="text-xs truncate" style={{ color: "var(--color-on-surface-variant)" }}>{plan.goal}</p>}
                    <div className="flex items-center gap-3 mt-2">
                      {plan.duration_days && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                          <Calendar size={10} /> {plan.duration_days} {isAr ? "يوم" : "days"}
                        </span>
                      )}
                      <div className="flex-1 h-1.5 rounded-full max-w-[120px]" style={{ background: "var(--color-outline-variant)" }}>
                        <div className="h-full rounded-full" style={{ width: `${plan.progress_percent}%`, background: color }} />
                      </div>
                      <span className="text-xs font-mono" style={{ color }}>{plan.progress_percent}%</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={16} style={{ color: "var(--color-on-surface-variant)", flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: "var(--color-on-surface-variant)", flexShrink: 0 }} />}
                </div>

                {isExpanded && plan.plan && (
                  <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--color-outline-variant)" }}>
                    <p className="text-xs font-mono mt-4 mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? "المهام:" : "Tasks:"}
                    </p>
                    <div className="flex flex-col gap-2">
                      {plan.plan.map((day) => (
                        <div key={day.day}>
                          <p className="text-xs font-bold mb-1" style={{ color: "var(--color-primary)" }}>
                            {isAr ? `اليوم ${day.day}` : `Day ${day.day}`}
                          </p>
                          {day.tasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>
                              <Circle size={10} style={{ flexShrink: 0, marginTop: 2 }} />
                              {task}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Link to roadmap generator */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <p className="text-sm mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "استخدم مولّد الخطط لإنشاء خطة تعلم AI مخصصة وحفظها هنا" : "Use the Roadmap Generator to create a custom AI learning plan and save it here"}
        </p>
        <Link href={`/${locale}/roadmap-generator`} className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl inline-flex items-center gap-2 text-sm">
          🗺️ {isAr ? "مولّد خطط التعلم" : "Roadmap Generator"}
        </Link>
      </div>
    </div>
  );
}
