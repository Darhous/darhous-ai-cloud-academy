import React from "react";
import { Users, Mail, MessageSquare, Shield, BookOpen, Wrench, FileText, Globe, CheckCircle, RefreshCw } from "lucide-react";
import { StatCard } from "../AdminDashboardClient";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { prompts } from "@/data/prompts";
import { portals as allPortals } from "@/config/portals";

interface UserRow { id: string; email: string | null; full_name: string | null; role: string; provider: string | null; created_at: string }
interface SubscriberRow { id: string; email: string; level: string | null; interest: string | null; source: string | null; locale: string | null; created_at: string }
interface MessageRow { id: string; name: string | null; email: string | null; subject: string | null; message: string | null; status: string; created_at: string }
interface HealthStatus { supabase: boolean; gemini: boolean; resend: boolean; portalsOk: boolean; portalsCount: number }

interface AdminOverviewPanelProps {
  isAr: boolean;
  users: UserRow[];
  subscribers: SubscriberRow[];
  messages: MessageRow[];
  health: HealthStatus | null;
  healthLoading: boolean;
}

export function AdminOverviewPanel({
  isAr,
  users,
  subscribers,
  messages,
  health,
  healthLoading,
}: AdminOverviewPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Users size={20} />} value={users.length} label={isAr ? "إجمالي المستخدمين" : "Total Users"} color="var(--color-primary)" />
        <StatCard icon={<Mail size={20} />} value={subscribers.length} label={isAr ? "المشتركون في النشرة" : "Subscribers"} color="var(--color-secondary)" />
        <StatCard icon={<MessageSquare size={20} />} value={messages.filter((m) => m.status === "new").length} label={isAr ? "رسائل جديدة" : "New Messages"} color="#f59e0b" />
        <StatCard icon={<Shield size={20} />} value={users.filter((u) => u.role === "admin").length} label={isAr ? "المشرفون" : "Admins"} color="#ef4444" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen size={20} />} value={courses.length} label={isAr ? "الدورات" : "Courses"} color="var(--color-primary)" />
        <StatCard icon={<Wrench size={20} />} value={tools.length} label={isAr ? "الأدوات" : "Tools"} color="var(--color-tertiary)" />
        <StatCard icon={<FileText size={20} />} value={prompts.length} label={isAr ? "البرومبتات" : "Prompts"} color="var(--color-secondary)" />
        <StatCard icon={<Globe size={20} />} value={allPortals.filter((p) => p.status === "available").length} label={isAr ? "بوابات متاحة" : "Live Portals"} color="#4ade80" />
      </div>

      {/* System health */}
      <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(74,222,128,0.12)" }}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <CheckCircle size={16} style={{ color: "#4ade80" }} />
          {isAr ? "صحة النظام" : "System Health"}
          {healthLoading && <RefreshCw size={12} className="animate-spin" style={{ color: "var(--color-on-surface-variant)" }} />}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Supabase DB", status: health?.supabase ?? null },
            { label: "Gemini AI", status: health?.gemini ?? null },
            { label: "Resend Email", status: health?.resend ?? null },
            { label: isAr ? `${health?.portalsCount ?? 6} بوابات` : `${health?.portalsCount ?? 6} Portals`, status: health?.portalsOk ?? null },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: s.status === null ? "#94a3b8" : s.status ? "#4ade80" : "#ef4444" }}
              />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
