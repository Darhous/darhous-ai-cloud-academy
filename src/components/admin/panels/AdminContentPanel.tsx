"use client";

import Link from "next/link";
import { BookOpen, Wrench, Activity, FileText, Database, AlertCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { prompts } from "@/data/prompts";
import { nanaBananaPrompts } from "@/data/nano-banana-prompts";

interface MessageRow {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface Props {
  isAr: boolean;
  locale: string;
  messages: MessageRow[];
  dataLoading: boolean;
  markMessageRead: (id: string) => void;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-xl h-14 animate-pulse" style={{ background: "var(--color-surface-container)" }} />
      ))}
    </div>
  );
}

export function AdminContentPanel({ isAr, locale, messages, dataLoading, markMessageRead }: Props) {
  const CONTENT_ITEMS = [
    { icon: <BookOpen size={22} />, count: courses.length, labelAr: "الدورات", labelEn: "Courses", href: `/${locale}/courses`, color: "var(--color-primary)" },
    { icon: <Wrench size={22} />, count: tools.length, labelAr: "الأدوات", labelEn: "AI Tools", href: `/${locale}/tools`, color: "var(--color-tertiary)" },
    { icon: <Activity size={22} />, count: projects.length, labelAr: "المشاريع", labelEn: "Projects", href: `/${locale}/projects`, color: "#4ade80" },
    { icon: <FileText size={22} />, count: blogPosts.length, labelAr: "المقالات", labelEn: "Blog Posts", href: `/${locale}/blog`, color: "#f59e0b" },
    { icon: <FileText size={22} />, count: prompts.length, labelAr: "البرومبتات", labelEn: "Prompts", href: `/${locale}/prompts`, color: "var(--color-secondary)" },
    { icon: <Database size={22} />, count: nanaBananaPrompts.length, labelAr: "Nano Banana", labelEn: "Nano Banana", href: `/${locale}/nano-banana-prompts`, color: "#f59e0b" },
  ];

  const newMessages = messages.filter((m) => m.status === "new");

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "استوديو المحتوى" : "Content Studio"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CONTENT_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02]"
            style={{ border: `1px solid ${item.color}15`, textDecoration: "none" }}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}12`, color: item.color }}>
                {item.icon}
              </div>
              <span className="font-bold text-2xl font-mono" style={{ color: item.color }}>{item.count}</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? item.labelAr : item.labelEn}
            </p>
          </Link>
        ))}
      </div>

      {/* Messages */}
      <div className="mt-2">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
            {isAr
              ? `رسائل التواصل (${newMessages.length} جديد)`
              : `Contact Messages (${newMessages.length} new)`}
          </h3>
          {newMessages.length > 0 && (
            <div
              className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}
            >
              <AlertCircle size={12} /> {isAr ? "لديك رسائل جديدة" : "You have new messages"}
            </div>
          )}
        </div>

        {dataLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className="glass-card rounded-xl p-4 flex flex-col gap-2"
                style={{ border: m.status === "new" ? "1px solid rgba(142,213,255,0.2)" : "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{m.name ?? "—"}</span>
                    <span className="text-xs font-mono ms-2" style={{ color: "var(--color-on-surface-variant)" }}>{m.email}</span>
                  </div>
                  {m.status === "new" && (
                    <button
                      onClick={() => markMessageRead(m.id)}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
                    >
                      {isAr ? "تعليم مقروء" : "Mark read"}
                    </button>
                  )}
                </div>
                {m.message && (
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>{m.message}</p>
                )}
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center py-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "لا توجد رسائل بعد." : "No messages yet."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
