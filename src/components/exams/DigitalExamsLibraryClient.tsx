"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Download, Filter, ChevronRight, ChevronLeft, Search } from "lucide-react";
import { examSubjects } from "@/data/digital-exam-subjects";

interface LibraryItem {
  id: string;
  subject_id: string;
  title: string;
  file_url: string;
  file_size_kb?: number;
  created_at: string;
}

export default function DigitalExamsLibraryClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/exams/library")
      .then((r) => r.json())
      .then(({ items: data }) => setItems(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    const matchSubject = selectedSubject === "all" || item.subject_id === selectedSubject;
    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="container-xl py-10 flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl flex items-center gap-3" style={{ color: "var(--color-on-surface)" }}>
            <BookOpen size={28} style={{ color: "#3ce0fb" }} />
            {isAr ? "المكتبة الرقمية" : "Digital Library"}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "كتب ومذكرات دراسية لكل مواد التحول الرقمي" : "Study books and notes for all digital transformation subjects"}
          </p>
        </div>
        <Link
          href={`/${locale}/digital-exams`}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: "rgba(60,224,251,0.08)", border: "1px solid rgba(60,224,251,0.2)", color: "#3ce0fb" }}
        >
          {isAr ? "الاختبارات" : "Exams"} <Arrow size={14} />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-on-surface-variant)" }} />
          <input
            type="text"
            placeholder={isAr ? "ابحث عن كتاب..." : "Search a book..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-on-surface)",
              outline: "none",
            }}
          />
        </div>
        {/* Subject filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} style={{ color: "var(--color-on-surface-variant)" }} />
          {[{ id: "all", icon: "📚", label: isAr ? "الكل" : "All" },
            ...examSubjects.map((s) => ({ id: s.id, icon: s.icon, label: isAr ? s.labelAr : s.label }))
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: selectedSubject === s.id ? "rgba(60,224,251,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedSubject === s.id ? "rgba(60,224,251,0.3)" : "rgba(255,255,255,0.06)"}`,
                color: selectedSubject === s.id ? "#3ce0fb" : "var(--color-on-surface-variant)",
              }}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label.slice(0, 12)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-16 flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#3ce0fb", borderTopColor: "transparent" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <BookOpen size={40} className="opacity-20" />
          <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
            {items.length === 0
              ? (isAr ? "لا توجد كتب في المكتبة بعد" : "No books in the library yet")
              : (isAr ? "لا توجد نتائج للبحث" : "No results found")}
          </p>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {items.length === 0
              ? (isAr ? "سيتم إضافة كتب ومذكرات قريبًا" : "Books and notes will be added soon")
              : (isAr ? "جرب تغيير كلمة البحث أو المادة" : "Try changing search or subject filter")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item) => {
            const sub = examSubjects.find((s) => s.id === item.subject_id);
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3"
                style={{ border: `1px solid ${sub?.color ?? "#3ce0fb"}15` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{sub?.icon ?? "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-snug" style={{ color: "var(--color-on-surface)" }}>{item.title}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? (sub?.labelAr ?? "عام") : (sub?.label ?? "General")}
                      {item.file_size_kb && ` · ${(item.file_size_kb / 1024).toFixed(1)} MB`}
                    </p>
                  </div>
                </div>
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold text-center justify-center"
                  style={{ background: `${sub?.color ?? "#3ce0fb"}15`, border: `1px solid ${sub?.color ?? "#3ce0fb"}30`, color: sub?.color ?? "#3ce0fb" }}
                >
                  <Download size={14} />
                  {isAr ? "تحميل PDF" : "Download PDF"}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
