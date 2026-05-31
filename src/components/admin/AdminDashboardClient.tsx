"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users, Mail, BookOpen, Wrench, FileText, Settings,
  Shield, Activity, Database, AlertCircle, RefreshCw, LogOut,
  TrendingUp, MessageSquare, Search, Download,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { portals as allPortals } from "@/config/portals";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { prompts } from "@/data/prompts";
import { nanaBananaPrompts } from "@/data/nano-banana-prompts";

type AdminTab = "overview" | "users" | "subscribers" | "messages" | "content" | "settings" | "audit" | "analytics" | "studio" | "ecosystem";

interface UserRow {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  provider: string | null;
  created_at: string;
}

interface SubscriberRow {
  id: string;
  email: string;
  level: string | null;
  interest: string | null;
  source: string | null;
  locale: string | null;
  created_at: string;
}

interface MessageRow {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface AuditRow {
  id: string;
  action: string;
  target_type: string | null;
  created_at: string;
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4" style={{ border: `1px solid ${color}20` }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-xl font-mono" style={{ color: "var(--color-on-surface)" }}>{value}</p>
        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { user, profile, loading, isAdmin, supabaseConfigured } = useAuth();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRow[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (!user || !supabaseConfigured) return;
    setDataLoading(true);
    const supabase = createClient();
    if (!supabase) { setDataLoading(false); return; }

    const [uRes, sRes, mRes, aRes] = await Promise.all([
      supabase.from("profiles").select("id,email,full_name,role,provider,created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("community_subscribers").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("admin_audit_logs").select("id,action,target_type,created_at").order("created_at", { ascending: false }).limit(30),
    ]);

    setUsers(uRes.data ?? []);
    setSubscribers(sRes.data ?? []);
    setMessages(mRes.data ?? []);
    setAuditLogs(aRes.data ?? []);
    setDataLoading(false);
  }, [user, supabaseConfigured]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  async function markMessageRead(id: string) {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "read" } : m));
  }

  async function promoteUser(userId: string, role: string) {
    const res = await fetch("/api/admin/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
    }
  }

  async function signOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  }

  function exportCSV(data: Record<string, unknown>[], filename: string) {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const rows = [keys.join(","), ...data.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (!supabaseConfigured) {
    return (
      <div className="container-xl py-20 text-center">
        <div className="text-5xl mb-4">⚙️</div>
        <h1 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "لوحة الإدارة" : "Admin Dashboard"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "يجب إعداد Supabase أولاً." : "Supabase must be configured first."}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container-xl py-20 text-center">
        <div
          className="inline-flex flex-col items-center gap-4 px-8 py-10 rounded-3xl"
          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <Shield size={40} style={{ color: "#ef4444" }} />
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "غير مصرح لك" : "Unauthorized"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "هذه الصفحة متاحة للمشرفين فقط." : "This page is for admins only."}
          </p>
          <Link href={`/${locale}/dashboard`} className="glow-button-secondary text-sm font-mono px-5 py-2 rounded-xl">
            {isAr ? "لوحة الطالب" : "Student Dashboard"}
          </Link>
        </div>
      </div>
    );
  }

  // ── Tabs config ─────────────────────────────────────────────────────────────
  const tabs: { id: AdminTab; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: "overview", labelAr: "النظرة العامة", labelEn: "Overview", icon: <Activity size={16} /> },
    { id: "users", labelAr: "المستخدمون", labelEn: "Users", icon: <Users size={16} /> },
    { id: "subscribers", labelAr: "المشتركون", labelEn: "Subscribers", icon: <Mail size={16} /> },
    { id: "messages", labelAr: "الرسائل", labelEn: "Messages", icon: <MessageSquare size={16} /> },
    { id: "content", labelAr: "المحتوى", labelEn: "Content", icon: <Database size={16} /> },
    { id: "analytics", labelAr: "التحليلات", labelEn: "Analytics", icon: <TrendingUp size={16} /> },
    { id: "ecosystem", labelAr: "الإيكوسيستم", labelEn: "Ecosystem", icon: <Database size={16} /> },
    { id: "studio", labelAr: "استوديو المحتوى", labelEn: "Content Studio", icon: <Activity size={16} /> },
    { id: "settings", labelAr: "الإعدادات", labelEn: "Settings", icon: <Settings size={16} /> },
    { id: "audit", labelAr: "سجل النشاط", labelEn: "Audit Log", icon: <Shield size={16} /> },
  ];

  const filteredUsers = users.filter((u) =>
    !search || u.email?.toLowerCase().includes(search.toLowerCase()) || u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-xl py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono" style={{ color: "var(--color-tertiary)" }}>ADMIN PANEL</p>
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لوحة الإدارة" : "Admin Dashboard"}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
            {(profile as UserProfile & { email?: string })?.email ?? user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={dataLoading}
            className="p-2.5 rounded-xl transition-opacity hover:opacity-70"
            style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
            title={isAr ? "تحديث" : "Refresh"}
          >
            <RefreshCw size={15} className={dataLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm font-mono px-3 py-2 rounded-xl transition-opacity hover:opacity-70"
            style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
          >
            <LogOut size={14} />
            {isAr ? "خروج" : "Sign out"}
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-mono whitespace-nowrap transition-all"
            style={{
              background: tab === t.id ? "rgba(60,224,251,0.12)" : "transparent",
              border: `1px solid ${tab === t.id ? "rgba(60,224,251,0.3)" : "transparent"}`,
              color: tab === t.id ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
            }}
          >
            {t.icon}
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Users size={20} />} value={users.length} label={isAr ? "إجمالي المستخدمين" : "Total Users"} color="var(--color-primary)" />
            <StatCard icon={<Mail size={20} />} value={subscribers.length} label={isAr ? "المشتركون في النشرة" : "Subscribers"} color="var(--color-secondary)" />
            <StatCard icon={<MessageSquare size={20} />} value={messages.filter((m) => m.status === "new").length} label={isAr ? "رسائل جديدة" : "New Messages"} color="#f59e0b" />
            <StatCard icon={<TrendingUp size={20} />} value={users.filter((u) => u.role === "admin").length} label={isAr ? "المشرفون" : "Admins"} color="#ef4444" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<BookOpen size={20} />} value={courses.length} label={isAr ? "الدورات" : "Courses"} color="var(--color-primary)" />
            <StatCard icon={<Wrench size={20} />} value={tools.length} label={isAr ? "الأدوات" : "Tools"} color="var(--color-tertiary)" />
            <StatCard icon={<FileText size={20} />} value={prompts.length} label={isAr ? "البرومبتات" : "Prompts"} color="var(--color-secondary)" />
            <StatCard icon={<Database size={20} />} value={nanaBananaPrompts.length} label={isAr ? "Nano Banana" : "Nano Banana"} color="#f59e0b" />
          </div>
        </div>
      )}

      {/* ── Users ─────────────────────────────────────────────────────────── */}
      {tab === "users" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isAr ? "ابحث بالبريد أو الاسم..." : "Search by email or name..."}
                className="w-full ps-9 pe-4 py-2 rounded-xl outline-none text-sm"
                style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
              />
            </div>
            <span className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {filteredUsers.length} {isAr ? "مستخدم" : "users"}
            </span>
          </div>

          {dataLoading ? <LoadingSkeleton /> : (
            <div className="flex flex-col gap-2">
              {filteredUsers.map((u) => (
                <div key={u.id} className="glass-card rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>{u.full_name ?? "—"}</p>
                    <p className="text-xs font-mono truncate" style={{ color: "var(--color-on-surface-variant)" }}>{u.email}</p>
                  </div>
                  <span
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: u.role === "admin" ? "rgba(239,68,68,0.12)" : "rgba(142,213,255,0.1)",
                      color: u.role === "admin" ? "#ef4444" : "var(--color-primary)",
                    }}
                  >
                    {u.role}
                  </span>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => promoteUser(u.id, "admin")}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      {isAr ? "ترقية لمشرف" : "Promote admin"}
                    </button>
                  )}
                  {u.role === "admin" && u.id !== user.id && (
                    <button
                      onClick={() => promoteUser(u.id, "student")}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "rgba(142,213,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}
                    >
                      {isAr ? "تخفيض" : "Demote"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Subscribers ───────────────────────────────────────────────────── */}
      {tab === "subscribers" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {subscribers.length} {isAr ? "مشترك" : "subscribers"}
            </span>
            <button
              onClick={() => exportCSV(subscribers as unknown as Record<string, unknown>[], "subscribers.csv")}
              className="flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}
            >
              <Download size={13} />
              {isAr ? "تصدير CSV" : "Export CSV"}
            </button>
          </div>

          {dataLoading ? <LoadingSkeleton /> : (
            <div className="flex flex-col gap-2">
              {subscribers.map((s) => (
                <div key={s.id} className="glass-card rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
                  <p className="text-sm font-mono flex-1 truncate" style={{ color: "var(--color-on-surface)" }}>{s.email}</p>
                  <span className="text-[11px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{s.interest ?? "—"}</span>
                  <span className="text-[11px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{s.locale ?? "—"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Messages ──────────────────────────────────────────────────────── */}
      {tab === "messages" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {messages.filter((m) => m.status === "new").length} {isAr ? "جديد" : "new"} / {messages.length} {isAr ? "إجمالي" : "total"}
            </span>
            <div
              className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}
            >
              <AlertCircle size={12} />
              {isAr ? "الرسائل تأتي أيضًا عبر FormSubmit لبريدك الإلكتروني" : "Messages also arrive via FormSubmit to your email"}
            </div>
          </div>

          {dataLoading ? <LoadingSkeleton /> : (
            <div className="flex flex-col gap-2">
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
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: m.status === "new" ? "rgba(142,213,255,0.1)" : "transparent",
                          color: m.status === "new" ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                        }}
                      >
                        {m.status}
                      </span>
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
                  </div>
                  {m.subject && <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{m.subject}</p>}
                  {m.message && <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-on-surface-variant)" }}>{m.message}</p>}
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
      )}

      {/* ── Content ───────────────────────────────────────────────────────── */}
      {tab === "content" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: <BookOpen size={22} />, count: courses.length, labelAr: "الدورات", labelEn: "Courses", href: `/${locale}/courses`, color: "var(--color-primary)" },
            { icon: <Wrench size={22} />, count: tools.length, labelAr: "الأدوات", labelEn: "AI Tools", href: `/${locale}/tools`, color: "var(--color-tertiary)" },
            { icon: <Activity size={22} />, count: projects.length, labelAr: "المشاريع", labelEn: "Projects", href: `/${locale}/projects`, color: "#4ade80" },
            { icon: <FileText size={22} />, count: blogPosts.length, labelAr: "المقالات", labelEn: "Blog Posts", href: `/${locale}/blog`, color: "#f59e0b" },
            { icon: <FileText size={22} />, count: prompts.length, labelAr: "البرومبتات", labelEn: "Prompts", href: `/${locale}/prompts`, color: "var(--color-secondary)" },
            { icon: <Database size={22} />, count: nanaBananaPrompts.length, labelAr: "Nano Banana", labelEn: "Nano Banana", href: `/${locale}/nano-banana-prompts`, color: "#f59e0b" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass-card rounded-2xl p-6 flex flex-col gap-3 transition-all hover:scale-105 hover:-translate-y-1"
              style={{ border: `1px solid ${item.color}20` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <p className="font-bold text-2xl font-mono" style={{ color: "var(--color-on-surface)" }}>{item.count}</p>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? item.labelAr : item.labelEn}</p>
            </Link>
          ))}
        </div>
      )}

      {/* ── Settings ──────────────────────────────────────────────────────── */}
      {tab === "settings" && (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
        >
          <Settings size={40} className="mx-auto mb-4" style={{ color: "var(--color-on-surface-variant)" }} />
          <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "إعدادات المنصة" : "Platform Settings"}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "إعدادات المنصة المتقدمة ستكون متاحة قريبًا مع قاعدة بيانات Supabase."
              : "Advanced platform settings will be available via the Supabase platform_settings table."}
          </p>
        </div>
      )}

      {/* ── Audit ─────────────────────────────────────────────────────────── */}
      {tab === "audit" && (
        <div className="flex flex-col gap-3">
          {dataLoading ? <LoadingSkeleton /> : (
            auditLogs.length === 0 ? (
              <p className="text-center py-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "لا توجد سجلات بعد." : "No audit logs yet."}
              </p>
            ) : (
              auditLogs.map((a) => (
                <div key={a.id} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                  <Shield size={14} style={{ color: "var(--color-on-surface-variant)", flexShrink: 0 }} />
                  <p className="text-sm flex-1" style={{ color: "var(--color-on-surface)" }}>{a.action}</p>
                  <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {new Date(a.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )
          )}
        </div>
      )}

      {/* ── Analytics ─────────────────────────────────────────────────────── */}
      {tab === "analytics" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Users size={18} />} value={users.length} label={isAr ? "إجمالي المستخدمين" : "Total Users"} color="var(--color-primary)" />
            <StatCard icon={<Mail size={18} />} value={subscribers.length} label={isAr ? "المشتركون" : "Subscribers"} color="var(--color-secondary)" />
            <StatCard icon={<MessageSquare size={18} />} value={messages.length} label={isAr ? "الرسائل" : "Messages"} color="var(--color-tertiary)" />
            <StatCard icon={<Activity size={18} />} value={users.filter(u => u.role === "admin").length} label={isAr ? "الإداريون" : "Admins"} color="#ef4444" />
          </div>

          {/* Event tracking note */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "تتبع الأحداث" : "Event Tracking"}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "يتم تتبع الأحداث في جدول analytics_events. الأحداث المتاحة: نسخ برومبت، حفظ Nano Banana، تسجيل مجتمعي، إصدار شهادة، تقديم تحدي."
                : "Events are tracked in the analytics_events table. Available events: prompt copied, Nano Banana saved, community signup, certificate generated, challenge submitted."}
            </p>
            <div className="glass-card rounded-xl p-4 font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              <p style={{ color: "var(--color-primary)" }}>-- View event counts:</p>
              <p>SELECT event_name, COUNT(*) as total</p>
              <p>FROM analytics_events</p>
              <p>GROUP BY event_name</p>
              <p>ORDER BY total DESC;</p>
            </div>
          </div>

          {/* Content counts */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "إحصائيات المحتوى" : "Content Statistics"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: isAr ? "الدورات" : "Courses", count: courses.length, icon: "📚" },
                { label: isAr ? "الأدوات" : "Tools", count: tools.length, icon: "🛠️" },
                { label: isAr ? "المشاريع" : "Projects", count: projects.length, icon: "🚀" },
                { label: isAr ? "المقالات" : "Blog Posts", count: blogPosts.length, icon: "📰" },
                { label: isAr ? "البرومبتات" : "Prompts", count: prompts.length, icon: "⚡" },
                { label: "Nano Banana", count: nanaBananaPrompts.length, icon: "🍌" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="font-bold text-lg font-mono" style={{ color: "var(--color-on-surface)" }}>{item.count}</p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Ecosystem ──────────────────────────────────────────────────────── */}
      {tab === "ecosystem" && (
        <EcosystemAdminPanel isAr={isAr} locale={locale} />
      )}

      {/* ── Content Studio ─────────────────────────────────────────────────── */}
      {tab === "studio" && (
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "استوديو المحتوى" : "Content Studio"}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "المحتوى الثابت (الدورات، الأدوات، المشاريع) موجود في كود المصدر. يمكنك إنشاء مسودات للمحتوى الجديد في جدول content_items."
                : "Static content (courses, tools, projects) lives in source code. Create drafts for new content in the content_items table."}
            </p>
            <div className="flex items-center gap-2 p-4 rounded-xl" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}>
              <span style={{ color: "#fbbf24" }}>⚠️</span>
              <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "لإضافة محتوى جديد للموقع، أضفه في src/data/ أو أنشئ مسودة هنا للمراجعة." : "To add new content to the site, add it in src/data/ or create a draft here for review."}
              </p>
            </div>
          </div>

          {/* Content type overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: isAr ? "الدورات" : "Courses", count: courses.length, file: "src/data/courses.ts", color: "var(--color-primary)" },
              { title: isAr ? "الأدوات" : "Tools", count: tools.length, file: "src/data/tools.ts", color: "#a78bfa" },
              { title: isAr ? "المشاريع" : "Projects", count: projects.length, file: "src/data/projects.ts", color: "#4ade80" },
              { title: isAr ? "المدونة" : "Blog", count: blogPosts.length, file: "src/data/blog.ts + src/content/blog/", color: "#fb923c" },
              { title: isAr ? "البرومبتات" : "Prompts", count: prompts.length, file: "src/data/prompts.ts", color: "#fbbf24" },
              { title: "Nano Banana", count: nanaBananaPrompts.length, file: "src/data/nano-banana-prompts.ts", color: "#f9a8d4" },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${item.color}15` }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{item.title}</p>
                  <span className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.count}</span>
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{item.file}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: "var(--color-surface-container)" }} />
      ))}
    </div>
  );
}

// Needed to silence TS import in component
type UserProfile = { email?: string };

// ── Ecosystem Admin Panel ────────────────────────────────────────────────────
function EcosystemAdminPanel({ isAr, locale }: { isAr: boolean; locale: string }) {

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(208,188,255,0.12)" }}>
        <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "إدارة الإيكوسيستم" : "Ecosystem Management"}
        </h3>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "نظرة عامة على جميع بوابات المنصة وحالتها. لتغيير حالة بوابة، عدّل ملف src/config/portals.ts"
            : "Overview of all platform portals and their status. To change a portal status, edit src/config/portals.ts"}
        </p>
      </div>

      {/* Portal status grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPortals.map((portal) => {
          const isAvailable = portal.status === "available";
          return (
            <div
              key={portal.id}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3"
              style={{ border: `1px solid ${portal.color}15` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${portal.color}10` }}
                  >
                    {portal.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? portal.titleAr : portal.titleEn}
                    </p>
                    <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                      /{locale}{portal.href}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={
                    isAvailable
                      ? { background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }
                      : { background: "rgba(148,163,184,0.08)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.15)" }
                  }
                >
                  {isAvailable ? (isAr ? "✅ متاح" : "✅ Live") : (isAr ? "🔜 قريبًا" : "🔜 Soon")}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {portal.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: `${portal.color}08`, color: portal.color }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="font-mono opacity-60">type:</span>
                <span>{portal.integrationType}</span>
                {portal.externalRepo && (
                  <a
                    href={portal.externalRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-auto text-xs underline opacity-60 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-primary)" }}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Roadmap note */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(208,188,255,0.04)", border: "1px solid rgba(208,188,255,0.12)" }}>
        <h4 className="font-bold text-sm mb-3" style={{ color: "var(--color-secondary)" }}>
          {isAr ? "خارطة طريق المنصة" : "Platform Roadmap"}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { phase: "V1 — الحالي", items: ["AI Academy ✅", "Language Portal ✅", "Digital Exams ✅", "Unified Nav & Dashboard ✅"] },
            { phase: "V2 — قادم", items: ["Career & CV Portal 🔜", "Automation Academy 🔜", "Arduino & IoT Lab 🔜", "Full DB Integration"] },
          ].map((phase) => (
            <div key={phase.phase} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs font-mono font-bold mb-2" style={{ color: "var(--color-secondary)" }}>{phase.phase}</p>
              <ul className="flex flex-col gap-1">
                {phase.items.map((item) => (
                  <li key={item} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
