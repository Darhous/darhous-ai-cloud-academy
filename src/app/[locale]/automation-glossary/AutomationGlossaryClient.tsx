"use client";

import { useState } from "react";
import { Search, ShieldAlert } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { AutomationGlossaryTerm } from "./page";

interface Props {
  locale: string;
  terms: AutomationGlossaryTerm[];
  isAdmin: boolean;
}

export default function AutomationGlossaryClient({ locale, terms, isAdmin }: Props) {
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");

  const filtered = terms.filter((t) => {
    const q = search.toLowerCase();
    return !search || t.term.toLowerCase().includes(q) || (t.arabicDefinition && t.arabicDefinition.includes(search));
  });

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "المسرد" : "Glossary"}
          title={isAr ? "مسرد الأتمتة" : "Automation Glossary"}
          subtitle={isAr
            ? "دليلك الشامل لمصطلحات الأتمتة وسير العمل (Pilot Phase)"
            : "Your complete guide to automation terms (Pilot Phase)"}
        />
        
        {isAdmin && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono" style={{ background: "rgba(250,204,21,0.1)", color: "#fbbf24", border: "1px solid rgba(250,204,21,0.2)" }}>
            <ShieldAlert size={14} />
            <span>{isAr ? "وضع المشرف مفعل (Pilot)" : "Admin Mode Active (Pilot)"}</span>
            <Link href={`/${locale}/dashboard`} className="underline ml-2 hover:opacity-80">
              {isAr ? "إدارة المحتوى" : "Manage in Admin"}
            </Link>
          </div>
        )}
      </div>

      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl max-w-xl mx-auto w-full"
        style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
      >
        <Search size={18} style={{ color: "var(--color-on-surface-variant)" }} />
        <input
          type="text"
          placeholder={isAr ? "ابحث عن مصطلح..." : "Search terms..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm font-mono"
          style={{ color: "var(--color-on-surface)" }}
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-xs font-mono" style={{ color: "var(--color-outline)" }}>
            ✕
          </button>
        )}
      </div>

      <p className="font-mono text-sm text-center" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} مصطلح (المنشورة فقط)` : `Showing ${filtered.length} terms (Published only)`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((term) => (
          <div key={term.id} className="glass-card rounded-2xl p-6 flex flex-col gap-3 relative glow-hover transition-all duration-300">
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                 <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/10 text-green-500 border border-green-500/20">
                   Published
                 </span>
              </div>
            )}
            
            <h3 className="font-display font-bold text-xl pr-16" style={{ color: "var(--color-primary)" }}>
              {term.term}
            </h3>
            
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
              {term.arabicDefinition}
            </p>
            
            {term.simpleExample && (
              <div
                className="p-3 mt-auto rounded-lg text-xs font-mono"
                style={{
                  background: "rgba(142,213,255,0.05)",
                  borderLeft: "2px solid var(--color-tertiary)",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                💡 {term.simpleExample}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📖</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد مصطلحات منشورة مطابقة" : "No matching published terms"}
          </p>
        </div>
      )}
    </div>
  );
}
