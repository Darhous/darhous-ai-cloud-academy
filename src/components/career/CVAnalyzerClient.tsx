"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp, FileText, CheckCircle2, AlertCircle, Sparkles,
  Loader2, Target, BarChart2, Briefcase, TrendingUp
} from "lucide-react";
import type { CVAnalysisResult } from "@/types/career";

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? "#4ade80" : score >= 60 ? "#8ed5ff" : "#f87171";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-outline-variant)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function CVAnalyzerClient() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("cv", file);
    try {
      const res = await fetch("/api/career/upload-cv", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) setCvText(data.text);
      else alert("فشل تحميل الملف: " + (data.error || ""));
    } catch {
      alert("حدث خطأ أثناء تحميل الملف.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch("/api/career/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cvText, jobDescription }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else alert("فشل التحليل: " + (data.error || ""));
    } catch {
      alert("حدث خطأ في الاتصال بالخادم.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV Text */}
        <div className="glass-card rounded-3xl p-6 flex flex-col" style={{ minHeight: 380 }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <FileText size={16} style={{ color: "var(--portal-color)" }} />
              محتوى السيرة الذاتية <span style={{ color: "#f87171" }}>*</span>
            </label>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.txt" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
              style={{ background: "var(--portal-color-subtle)", border: "1px solid var(--portal-color-glow)", color: "var(--portal-color)" }}
            >
              {isUploading ? <Loader2 size={12} className="animate-spin" /> : <FileUp size={12} />}
              رفع PDF/TXT
            </button>
          </div>
          <textarea
            className="flex-1 w-full rounded-xl p-4 text-sm resize-none focus:outline-none"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)", minHeight: 280 }}
            placeholder="ألصق محتوى سيرتك الذاتية هنا، أو ارفع ملف PDF/TXT..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            dir="auto"
          />
        </div>

        {/* Job Description */}
        <div className="glass-card rounded-3xl p-6 flex flex-col" style={{ minHeight: 380 }}>
          <label className="text-sm font-semibold flex items-center gap-2 mb-4" style={{ color: "var(--color-on-surface)" }}>
            <Briefcase size={16} style={{ color: "#8ed5ff" }} />
            الوصف الوظيفي المستهدف
            <span className="text-xs font-normal" style={{ color: "var(--color-on-surface-variant)" }}>(اختياري)</span>
          </label>
          <textarea
            className="flex-1 w-full rounded-xl p-4 text-sm resize-none focus:outline-none"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)", minHeight: 280 }}
            placeholder="شروط الوظيفة، المتطلبات، والمهام الأساسية..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            dir="auto"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={!cvText.trim() || isAnalyzing}
          className="flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", color: "#0c0e12", boxShadow: "0 0 30px rgba(245,158,11,0.35)" }}
        >
          {isAnalyzing ? <Loader2 size={22} className="animate-spin" /> : <Sparkles size={22} />}
          {isAnalyzing ? "جاري التحليل..." : "ابدأ التحليل الذكي"}
          {isAnalyzing && <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.1)", animation: "pulse 2s infinite" }} />}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden" style={{ border: "1px solid var(--portal-color-border)" }}>
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-amber-500 via-yellow-400 to-orange-400" />

              <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b" style={{ borderColor: "var(--color-outline-variant)" }}>
                {/* Circular score */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <svg className="w-32 h-32 -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="opacity-20" style={{ color: "var(--portal-color)" }} />
                    <motion.circle
                      cx="64" cy="64" r="56"
                      stroke="#fbbf24" strokeWidth="8" fill="transparent"
                      strokeDasharray="351.858"
                      initial={{ strokeDashoffset: 351.858 }}
                      animate={{ strokeDashoffset: 351.858 - (351.858 * result.overall_score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold font-mono" style={{ color: "var(--portal-color)" }}>{result.overall_score}%</span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>ATS Score</span>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                    <BarChart2 size={20} style={{ color: "var(--portal-color)" }} />
                    التقييم العام
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)" }}>{result.summary}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ScoreBar label="الكلمات المفتاحية" score={result.keyword_score} />
                    <ScoreBar label="المهارات" score={result.skills_score} />
                    <ScoreBar label="الخبرة" score={result.experience_score} />
                    <ScoreBar label="التنسيق" score={result.formatting_score} />
                    <ScoreBar label="المقروئية" score={result.readability_score} />
                  </div>
                </div>
              </div>

              {/* Job match details */}
              {result.job_description_match_details && (
                <div className="mb-8 rounded-2xl p-5" style={{ background: "var(--portal-color-faint)", border: "1px solid var(--portal-color-border)" }}>
                  <h4 className="font-bold flex items-center gap-2 mb-3 text-sm" style={{ color: "var(--portal-color)" }}>
                    <Target size={16} /> تحليل مطابقة الوظيفة
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{result.job_description_match_details}</p>
                </div>
              )}

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-sm" style={{ color: "#4ade80" }}>
                    <CheckCircle2 size={16} /> نقاط القوة
                  </h4>
                  <div className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <div key={i} className="flex gap-2 text-sm p-3 rounded-xl" style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)" }}>
                        <span style={{ color: "#4ade80" }}>•</span>
                        <span style={{ color: "var(--color-on-surface-variant)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-sm" style={{ color: "#f87171" }}>
                    <AlertCircle size={16} /> الفجوات ونقاط الضعف
                  </h4>
                  <div className="space-y-2">
                    {result.weaknesses.map((w, i) => (
                      <div key={i} className="flex gap-2 text-sm p-3 rounded-xl" style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.1)" }}>
                        <span style={{ color: "#f87171" }}>•</span>
                        <span style={{ color: "var(--color-on-surface-variant)" }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weak bullet points */}
              {result.weak_bullet_points?.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-sm" style={{ color: "#d0bcff" }}>
                    <Sparkles size={16} /> نقاط تحتاج إعادة صياغة
                  </h4>
                  <div className="space-y-3">
                    {result.weak_bullet_points.map((pt, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl text-sm" style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)" }}>
                          <span className="block text-[10px] font-mono mb-1" style={{ color: "#f87171" }}>الحالية</span>
                          <span className="line-through opacity-60" style={{ color: "var(--color-on-surface-variant)" }}>{pt.original}</span>
                        </div>
                        <div className="p-3 rounded-xl text-sm" style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}>
                          <span className="block text-[10px] font-mono mb-1" style={{ color: "#4ade80" }}>المقترحة</span>
                          <span style={{ color: "var(--color-on-surface)" }}>{pt.suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords missing + Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-2xl p-5" style={{ background: "rgba(142,213,255,0.04)", border: "1px solid rgba(142,213,255,0.1)" }}>
                  <h4 className="font-bold flex items-center gap-2 mb-3 text-sm" style={{ color: "#8ed5ff" }}>
                    <AlertCircle size={16} /> الكلمات المفتاحية الناقصة (ATS)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords_missing.map((kw, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg font-mono" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ background: "rgba(208,188,255,0.04)", border: "1px solid rgba(208,188,255,0.1)" }}>
                  <h4 className="font-bold flex items-center gap-2 mb-3 text-sm" style={{ color: "#d0bcff" }}>
                    <CheckCircle2 size={16} /> توصيات التحسين
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="font-bold flex-shrink-0" style={{ color: "#d0bcff" }}>{i + 1}.</span>
                        <span style={{ color: "var(--color-on-surface-variant)" }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role optimization */}
              {result.role_optimization_suggestions?.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface)" }}>
                    <TrendingUp size={16} style={{ color: "var(--portal-color)" }} />
                    تخصيص السيرة الذاتية للدور المستهدف
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.role_optimization_suggestions.map((s, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: "var(--color-on-surface-variant)" }}>
                        <Target size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--portal-color)" }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
