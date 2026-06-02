"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Target,
  Layers,
  Wrench,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import type {
  AutomationAgentInput,
  AutomationBlueprint,
  Department,
  Objective,
  BlueprintConstraint,
} from "@/data/automation/types";

const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: "sales", label: "مبيعات" },
  { value: "marketing", label: "تسويق" },
  { value: "hr", label: "موارد بشرية" },
  { value: "education", label: "تعليم" },
  { value: "finance", label: "مالية" },
  { value: "operations", label: "عمليات" },
  { value: "support", label: "دعم عملاء" },
  { value: "personal-productivity", label: "إنتاجية شخصية" },
  { value: "other", label: "أخرى" },
];

const OBJECTIVES: { value: Objective; label: string }[] = [
  { value: "save-time", label: "توفير الوقت" },
  { value: "reduce-errors", label: "تقليل الأخطاء" },
  { value: "increase-sales", label: "زيادة المبيعات" },
  { value: "improve-follow-up", label: "تحسين المتابعة" },
  { value: "organize-data", label: "تنظيم البيانات" },
  { value: "improve-reporting", label: "تحسين التقارير" },
];

const CONSTRAINTS: { value: BlueprintConstraint; label: string }[] = [
  { value: "no-paid-tools", label: "بدون أدوات مدفوعة" },
  { value: "low-cost", label: "تكلفة منخفضة" },
  { value: "no-code", label: "No-code فقط" },
  { value: "open-source", label: "مفتوح المصدر" },
  { value: "privacy-sensitive", label: "بيانات حساسة" },
  { value: "approval-step", label: "يحتاج موافقة" },
  { value: "human-review", label: "مراجعة بشرية" },
  { value: "mobile", label: "متوافق موبايل" },
  { value: "arabic-support", label: "دعم عربي" },
];

const EMPTY_INPUT: AutomationAgentInput = {
  businessGoal: "",
  department: "operations",
  objective: "save-time",
  currentSteps: "",
  owner: "",
  frequency: "",
  durationMinutes: 0,
  painPoints: "",
  apps: [],
  trigger: "",
  desiredActions: [],
  constraints: [],
};

interface Props {
  onGenerate?: (input: AutomationAgentInput) => Promise<AutomationBlueprint | null>;
}

export default function AutomationAgentClient({ onGenerate }: Props) {
  const [form, setForm] = useState<AutomationAgentInput>(EMPTY_INPUT);
  const [appsInput, setAppsInput] = useState("");
  const [actionsInput, setActionsInput] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<AutomationBlueprint | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("summary");

  const totalSteps = 3;

  const toggleConstraint = (c: BlueprintConstraint) => {
    setForm((prev) => ({
      ...prev,
      constraints: prev.constraints.includes(c)
        ? prev.constraints.filter((x) => x !== c)
        : [...prev.constraints, c],
    }));
  };

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSubmit = async () => {
    const parsed: AutomationAgentInput = {
      ...form,
      apps: appsInput.split(",").map((a) => a.trim()).filter(Boolean),
      desiredActions: actionsInput.split(",").map((a) => a.trim()).filter(Boolean),
    };

    setLoading(true);
    try {
      if (onGenerate) {
        const result = await onGenerate(parsed);
        setBlueprint(result);
      } else {
        // Demo mode: show a placeholder blueprint
        await new Promise((r) => setTimeout(r, 1500));
        setBlueprint({
          id: "demo-blueprint",
          title: `Blueprint: ${parsed.businessGoal.slice(0, 50)}`,
          summary: "هذا نموذج تجريبي. قم بتوصيل واجهة API لتوليد blueprint حقيقي.",
          recommendedStack: ["n8n", "Make", "Google Sheets"],
          stackReasoning: ["n8n مناسب للـ workflows المعقدة", "Make مثالي للـ no-code"],
          workflowDiagram: ["Trigger → Fetch Data → Process → Notify → Log"],
          trigger: parsed.trigger || "New form submission",
          actions: parsed.desiredActions.length ? parsed.desiredActions : ["Process data", "Send notification"],
          requiredDataFields: parsed.apps,
          appsInvolved: parsed.apps,
          implementationPlan: ["أسبوع 1: إعداد البيئة", "أسبوع 2: بناء الـ workflow", "أسبوع 3: الاختبار"],
          testingChecklist: ["اختبر سيناريو كامل", "تحقق من الأخطاء", "راجع الأداء"],
          errorHandlingPlan: ["إضافة try/catch", "إشعار عند الفشل"],
          privacyAndSecurityNotes: ["لا تخزّن بيانات حساسة", "استخدم variables للمفاتيح"],
          maintenancePlan: ["مراجعة شهرية", "تحديث الـ credentials كل 90 يومًا"],
          estimatedComplexity: "متوسط",
          estimatedImplementationTime: "2-3 أسابيع",
          monthlyCostCategory: "مجاني / مدفوع",
          expectedROI: "توفير 5-10 ساعات أسبوعيًا",
          upgradeIdeas: ["إضافة AI summary", "تقارير أسبوعية", "إشعارات واتساب"],
          clientProposal: "مقترح جاهز للعميل",
          technicalBrief: "ملخص تقني للمطور",
          buildPrompts: {
            n8n: `Build a workflow in n8n for: ${parsed.businessGoal}`,
            make: `Create a Make scenario for: ${parsed.businessGoal}`,
            zapier: `Set up a Zap for: ${parsed.businessGoal}`,
            python: `# Python script for: ${parsed.businessGoal}\n# Tools: ${parsed.apps.join(", ")}`,
          },
          savedAt: new Date().toISOString(),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (blueprint) {
    const sections = [
      { id: "summary", label: "الملخص التنفيذي", color: "#4ade80" },
      { id: "stack", label: "Stack الأدوات", color: "#8ed5ff" },
      { id: "plan", label: "خطة التنفيذ", color: "#d0bcff" },
      { id: "testing", label: "قائمة الاختبار", color: "#3ce0fb" },
      { id: "prompts", label: "Build Prompts", color: "#f59e0b" },
    ];

    return (
      <div className="space-y-6" dir="rtl">
        {/* Blueprint Header */}
        <div
          className="rounded-3xl p-6"
          style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
            <span className="text-sm font-semibold" style={{ color: "#4ade80" }}>
              Blueprint جاهز
            </span>
          </div>
          <h2 className="font-bold text-xl mb-2" style={{ color: "var(--color-on-surface)" }}>
            {blueprint.title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            {blueprint.summary}
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            <span className="flex items-center gap-1"><Clock size={11} /> {blueprint.estimatedImplementationTime}</span>
            <span className="flex items-center gap-1"><Target size={11} /> {blueprint.estimatedComplexity}</span>
            <span className="flex items-center gap-1"><Layers size={11} /> {blueprint.monthlyCostCategory}</span>
          </div>
        </div>

        {/* Accordion Sections */}
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          let content: React.ReactNode = null;

          if (sec.id === "summary") {
            content = (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  <strong style={{ color: "var(--color-on-surface)" }}>العائد المتوقع: </strong>
                  {blueprint.expectedROI}
                </p>
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#f97316" }}>خارطة الـ Workflow:</p>
                  {blueprint.workflowDiagram.map((line, i) => (
                    <p key={i} className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{line}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#f87171" }}>ملاحظات الأمان والخصوصية:</p>
                  <ul className="space-y-1">
                    {blueprint.privacyAndSecurityNotes.map((n, i) => (
                      <li key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>• {n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          } else if (sec.id === "stack") {
            content = (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {blueprint.recommendedStack.map((tool, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full font-mono" style={{ background: "rgba(142,213,255,0.1)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.2)" }}>
                      {tool}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {blueprint.stackReasoning.map((r, i) => (
                    <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span style={{ color: "#8ed5ff" }}>→</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else if (sec.id === "plan") {
            content = (
              <ol className="space-y-2">
                {blueprint.implementationPlan.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="w-5 h-5 rounded text-[10px] font-mono font-bold shrink-0 flex items-center justify-center" style={{ background: `${sec.color}15`, color: sec.color }}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            );
          } else if (sec.id === "testing") {
            content = (
              <ul className="space-y-2">
                {blueprint.testingChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: sec.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            );
          } else if (sec.id === "prompts") {
            content = (
              <div className="space-y-3">
                {(Object.entries(blueprint.buildPrompts) as [string, string][]).map(([tool, prompt]) => (
                  <div key={tool} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.15)" }}>
                    <div className="flex items-center justify-between px-4 py-2" style={{ background: "rgba(245,158,11,0.06)" }}>
                      <span className="text-[11px] font-mono font-bold" style={{ color: "#f59e0b" }}>{tool.toUpperCase()}</span>
                      <button
                        onClick={() => handleCopy(prompt, tool)}
                        className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded"
                        style={{ color: copiedSection === tool ? "#4ade80" : "var(--color-on-surface-variant)" }}
                      >
                        {copiedSection === tool ? <Check size={10} /> : <Copy size={10} />}
                        {copiedSection === tool ? "تم" : "نسخ"}
                      </button>
                    </div>
                    <pre className="p-3 text-[11px] leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap" style={{ color: "var(--color-on-surface-variant)", background: "rgba(0,0,0,0.2)" }}>
                      {prompt}
                    </pre>
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={sec.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isOpen ? sec.color + "20" : "rgba(255,255,255,0.07)"}` }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4"
                style={{ background: isOpen ? `${sec.color}08` : "rgba(255,255,255,0.02)" }}
                onClick={() => setOpenSection(isOpen ? null : sec.id)}
              >
                <span className="text-sm font-semibold" style={{ color: isOpen ? sec.color : "var(--color-on-surface)" }}>
                  {sec.label}
                </span>
                {isOpen ? <ChevronUp size={14} style={{ color: sec.color }} /> : <ChevronDown size={14} style={{ color: "var(--color-on-surface-variant)" }} />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 py-5" style={{ borderTop: `1px solid ${sec.color}12` }}>
                      {content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <button
          onClick={() => { setBlueprint(null); setStep(1); setForm(EMPTY_INPUT); }}
          className="w-full py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          إنشاء Blueprint جديد
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: step > i ? "100%" : "0%", background: "linear-gradient(90deg, #4ade80, #22c55e)" }}
            />
          </div>
        ))}
        <span className="text-xs font-mono shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
          {step}/{totalSteps}
        </span>
      </div>

      {/* Step 1: Business context */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <h2 className="font-bold text-lg mb-1" style={{ color: "var(--color-on-surface)" }}>
              1. سياق العمل
            </h2>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              أخبرنا عن العملية التي تريد أتمتتها
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                ما الهدف التجاري؟ *
              </label>
              <textarea
                rows={3}
                className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                placeholder="مثال: أريد أتمتة عملية استقبال طلبات العملاء وتحويلها إلى CRM مع إرسال رسالة ترحيب..."
                value={form.businessGoal}
                onChange={(e) => setForm((p) => ({ ...p, businessGoal: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                  القسم
                </label>
                <select
                  className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                  value={form.department}
                  onChange={(e) => setForm((p) => ({ ...p, department: e.target.value as Department }))}
                >
                  {DEPARTMENTS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                  الهدف الرئيسي
                </label>
                <select
                  className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                  value={form.objective}
                  onChange={(e) => setForm((p) => ({ ...p, objective: e.target.value as Objective }))}
                >
                  {OBJECTIVES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                نقاط الألم الحالية
              </label>
              <textarea
                rows={2}
                className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                placeholder="ما الذي يستهلك وقتك أو يسبب أخطاءً؟"
                value={form.painPoints}
                onChange={(e) => setForm((p) => ({ ...p, painPoints: e.target.value }))}
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!form.businessGoal.trim()}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: form.businessGoal.trim() ? "linear-gradient(135deg, #4ade80, #22c55e)" : "rgba(255,255,255,0.08)",
              color: form.businessGoal.trim() ? "#0c0e12" : "var(--color-on-surface-variant)",
            }}
          >
            التالي: تفاصيل التقنية →
          </button>
        </motion.div>
      )}

      {/* Step 2: Technical details */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <h2 className="font-bold text-lg mb-1" style={{ color: "var(--color-on-surface)" }}>
              2. التفاصيل التقنية
            </h2>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              الأدوات والخطوات الحالية
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                الأدوات أو التطبيقات المستخدمة (افصلها بفاصلة)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                placeholder="Google Sheets, Gmail, CRM, WhatsApp..."
                value={appsInput}
                onChange={(e) => setAppsInput(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                الإجراءات المطلوبة (افصلها بفاصلة)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                placeholder="إرسال بريد, تحديث CRM, إشعار واتساب..."
                value={actionsInput}
                onChange={(e) => setActionsInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                  المحفّز (Trigger)
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                  placeholder="تسليم نموذج، ربط Webhook..."
                  value={form.trigger}
                  onChange={(e) => setForm((p) => ({ ...p, trigger: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                  التكرار
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                  placeholder="يومي، أسبوعي، فوري..."
                  value={form.frequency}
                  onChange={(e) => setForm((p) => ({ ...p, frequency: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: "var(--color-on-surface)" }}>
                الخطوات الحالية (كيف تتم الآن يدويًا؟)
              </label>
              <textarea
                rows={3}
                className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                placeholder="أصف الخطوات اليدوية الحالية..."
                value={form.currentSteps}
                onChange={(e) => setForm((p) => ({ ...p, currentSteps: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-2xl font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              ← السابق
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", color: "#0c0e12" }}
            >
              التالي: القيود →
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Constraints + Generate */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <h2 className="font-bold text-lg mb-1" style={{ color: "var(--color-on-surface)" }}>
              3. القيود والمتطلبات
            </h2>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              اختر ما ينطبق على مشروعك
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CONSTRAINTS.map((c) => {
              const active = form.constraints.includes(c.value);
              return (
                <button
                  key={c.value}
                  onClick={() => toggleConstraint(c.value)}
                  className="text-xs px-3 py-1.5 rounded-xl font-medium transition-all"
                  style={{
                    background: active ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.05)",
                    color: active ? "#4ade80" : "var(--color-on-surface-variant)",
                    border: `1px solid ${active ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 rounded-2xl font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              ← السابق
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c)",
                color: "#0c0e12",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: "#0c0e12", borderTopColor: "transparent" }}
                  />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Bot size={15} />
                  توليد Blueprint
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Capabilities preview */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {[
            { icon: <Target size={14} />, title: "تشخيص الفرص", color: "#4ade80" },
            { icon: <Layers size={14} />, title: "اختيار الأدوات", color: "#8ed5ff" },
            { icon: <Wrench size={14} />, title: "رسم الـ Workflow", color: "#d0bcff" },
            { icon: <Clock size={14} />, title: "خطة التنفيذ", color: "#f59e0b" },
          ].map((cap, i) => (
            <div
              key={i}
              className="rounded-xl p-3 flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${cap.color}12` }}
            >
              <span style={{ color: cap.color }}>{cap.icon}</span>
              <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                {cap.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sparkles hint */}
      <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>
        <Sparkles size={11} style={{ color: "#f97316" }} />
        يمكنك تطوير الـ Blueprint بتوصيل Claude API
      </div>
    </div>
  );
}
