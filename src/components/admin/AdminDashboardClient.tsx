"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users, Mail, BookOpen, Wrench, FileText, Settings,
  Shield, Activity, Database, AlertCircle, RefreshCw, LogOut,
  TrendingUp, MessageSquare, Search, Download, Bot,
  Globe, Award, Zap, Palette, Bell, ToggleLeft, ToggleRight,
  Eye, EyeOff, Edit3, CheckCircle, BarChart2, ExternalLink, AlertTriangle, Sparkles, ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { portals as allPortals } from "@/config/portals";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { examSubjects } from "@/data/digital-exam-subjects";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { lessonsData } from "@/data/iot/lessons";
import { projectsData } from "@/data/iot/projects";
import { challengesData } from "@/data/iot/challenges";
import { projects } from "@/data/projects";
import { blogPosts, blogCategories } from "@/data/blog";
import { prompts } from "@/data/prompts";
import { nanaBananaPrompts } from "@/data/nano-banana-prompts";
import { defaultMentorSettings } from "@/types/ai_mentor_settings";
import { defaultFeatureFlags } from "@/types/feature_flags";
import { defaultSiteSettings } from "@/types/site_settings";
import type { UserProfile } from "@/lib/auth/roles";
import { PORTAL_SMART_CONFIG } from "@/lib/certificates/portalConfig";

type AdminTab =
  | "overview" | "site-builder" | "portals" | "users"
  | "certificates" | "mentor-control" | "content" | "email"
  | "analytics" | "theme" | "audit" | "language" | "automation" | "digital-exams"
  | "career" | "iot-lab" | "ai-academy" | "nano-banana" | "blog";

interface UserRow { id: string; email: string | null; full_name: string | null; role: string; provider: string | null; created_at: string }
interface SubscriberRow { id: string; email: string; level: string | null; interest: string | null; source: string | null; locale: string | null; created_at: string }
interface MessageRow { id: string; name: string | null; email: string | null; subject: string | null; message: string | null; status: string; created_at: string }
interface AuditRow { id: string; action: string; target_type: string | null; created_at: string }

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

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-xl h-14 animate-pulse" style={{ background: "var(--color-surface-container)" }} />
      ))}
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
  const [langResults, setLangResults] = useState<Record<string, unknown>[]>([]);
  const [langLoading, setLangLoading] = useState(false);
  const [health, setHealth] = useState<{ supabase: boolean; gemini: boolean; resend: boolean; portalsOk: boolean; portalsCount: number } | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  /* Local feature flags state */
  const [featureFlags, setFeatureFlags] = useState(defaultFeatureFlags);
  /* Local mentor settings state */
  const [mentorSettings, setMentorSettings] = useState(defaultMentorSettings);
  /* Local site settings state */
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);
  /* Portal visibility overrides */
  const [portalVisibility, setPortalVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(allPortals.map((p) => [p.id, true]))
  );
  /* Persistence states */
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [mentorSaving, setMentorSaving] = useState(false);
  const [flagsSaving, setFlagsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  /* Nano Banana sub-tab */
  const [nbSubTab, setNbSubTab] = useState<"list" | "add">("list");
  /* Nano Banana add-form state */
  const [nbForm, setNbForm] = useState({
    title_ar: "", title_en: "", description_ar: "", description_en: "",
    category: "fun", category_label_ar: "ترفيه", category_label_en: "Fun",
    difficulty: "beginner", best_input_ar: "صورة واضحة للوجه", best_input_en: "Clear face photo",
    prompt_ar: "", prompt_en: "", accent: "#f59e0b", emoji: "🍌", tags: "", featured: false,
  });
  const [nbImageFile, setNbImageFile] = useState<File | null>(null);
  const [nbImagePreview, setNbImagePreview] = useState<string | null>(null);
  const [nbSaving, setNbSaving] = useState(false);
  const [nbMsg, setNbMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  /* Certificate issuance form state (per-portal) */
  const [issuePortal, setIssuePortal] = useState<string | null>(null);
  const [issueForm, setIssueForm] = useState({ holderName: "", box1Value: "", box2Value: "", bodyLine2: "" });
  const [issueDropdowns, setIssueDropdowns] = useState<Record<string, string>>({});
  const [issuing, setIssuing] = useState(false);
  const [issueMsg, setIssueMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [nbCustomPrompts, setNbCustomPrompts] = useState<Record<string, unknown>[]>([]);

  /* Analytics state */
  const [analyticsData, setAnalyticsData] = useState<{ portal: string; count: number }[]>([]);
  const [analyticsEventCounts, setAnalyticsEventCounts] = useState<{ name: string; count: number }[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsTotal, setAnalyticsTotal] = useState(-1); // -1 = not yet fetched

  /* Blog CMS state */
  type DbBlogRow = { id: string; slug: string; title_ar: string; title_en: string; category: string; status: string; featured: boolean; reading_time: number; published_at: string; updated_at: string; cover_url: string | null };
  const [blogDbPosts, setBlogDbPosts] = useState<DbBlogRow[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogView, setBlogView] = useState<"list" | "form">("list");
  const [blogEditId, setBlogEditId] = useState<string | null>(null);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogMsg, setBlogMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const BLOG_FORM_DEFAULT = {
    slug: "", title_ar: "", title_en: "", excerpt_ar: "", excerpt_en: "",
    content_ar: "", content_en: "", category: "Learning", tags: "",
    icon: "📝", reading_time: "6", featured: false, status: "published" as "published" | "draft" | "archived",
  };
  const [blogForm, setBlogForm] = useState(BLOG_FORM_DEFAULT);
  const [blogPreviewLang, setBlogPreviewLang] = useState<"ar" | "en">("ar");
  const [blogCoverFile, setBlogCoverFile] = useState<File | null>(null);
  const [blogCoverPreview, setBlogCoverPreview] = useState<string | null>(null);

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

  // Fetch real system health on admin mount
  useEffect(() => {
    if (!isAdmin) return;
    setHealthLoading(true);
    fetch("/api/admin/health")
      .then((r) => r.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ supabase: false, gemini: false, resend: false, portalsOk: false, portalsCount: 0 }))
      .finally(() => setHealthLoading(false));
  }, [isAdmin]);

  // Fetch real portal analytics when analytics tab opens
  useEffect(() => {
    if (tab !== "analytics" || !isAdmin || analyticsTotal !== -1) return;
    const supabase = createClient();
    if (!supabase) return;
    setAnalyticsLoading(true);
    const PORTAL_EVENT_MAP: Record<string, string> = {
      prompt_copied: "ai-academy", prompt_scored: "ai-academy",
      prompt_battle: "ai-academy", nano_banana_saved: "ai-academy",
      tool_compared: "ai-academy", challenge_submitted: "iot-lab",
      project_started: "iot-lab", plan_saved: "career",
    };
    supabase
      .from("analytics_events")
      .select("event_name, entity_type, entity_slug")
      .order("created_at", { ascending: false })
      .limit(2000)
      .then(({ data }) => {
        const rows = data ?? [];
        setAnalyticsTotal(rows.length);
        const portalCounts: Record<string, number> = {};
        const eventCounts: Record<string, number> = {};
        for (const ev of rows) {
          const portal = (ev.entity_slug as string | null) || PORTAL_EVENT_MAP[ev.event_name as string] || "other";
          portalCounts[portal] = (portalCounts[portal] || 0) + 1;
          eventCounts[ev.event_name as string] = (eventCounts[ev.event_name as string] || 0) + 1;
        }
        setAnalyticsData(Object.entries(portalCounts).sort((a, b) => b[1] - a[1]).map(([portal, count]) => ({ portal, count })));
        setAnalyticsEventCounts(Object.entries(eventCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })));
        setAnalyticsLoading(false);
      });
  }, [tab, isAdmin, analyticsTotal]);

  // Load language results when language tab opens
  useEffect(() => {
    if (tab !== "language" || !isAdmin || langResults.length > 0) return;
    const supabase = createClient();
    if (!supabase) return;
    setLangLoading(true);
    supabase
      .from("language_results")
      .select("id,score,level,stages_completed,is_incomplete,flags_count,certificate_id,created_at,user_id")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        setLangResults(data ?? []);
        setLangLoading(false);
      });
  }, [tab, isAdmin, langResults.length]);

  async function markMessageRead(id: string) {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "read" } : m));
  }

  async function promoteUser(userId: string, role: string) {
    const res = await fetch("/api/admin/promote", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
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
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function showSaveMsg(msg: string) {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(null), 3000);
  }

  /* Auto-load settings from DB when tab is activated */
  useEffect(() => {
    if (tab === "site-builder") {
      fetch("/api/admin/site-settings").then(r => r.json())
        .then(({ settings }) => { if (settings) setSiteSettings(settings); })
        .catch(() => {});
    }
    if (tab === "mentor-control") {
      fetch("/api/admin/mentor-settings").then(r => r.json())
        .then(({ settings }) => { if (settings) setMentorSettings(settings); })
        .catch(() => {});
      fetch("/api/admin/feature-flags").then(r => r.json())
        .then(({ flags }) => { if (flags) setFeatureFlags(flags); })
        .catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function saveSiteSettings() {
    setSettingsSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: siteSettings }),
      });
      const data = await res.json();
      showSaveMsg(data.success ? "✅ " + (isAr ? "تم الحفظ" : "Saved") : `❌ ${data.error ?? "Error"}`);
    } catch { showSaveMsg("❌ " + (isAr ? "خطأ في الشبكة" : "Network error")); }
    setSettingsSaving(false);
  }

  async function saveMentorSettings() {
    setMentorSaving(true);
    try {
      const res = await fetch("/api/admin/mentor-settings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: mentorSettings }),
      });
      const data = await res.json();
      showSaveMsg(data.success ? "✅ " + (isAr ? "تم الحفظ" : "Saved") : `❌ ${data.error ?? "Error"}`);
    } catch { showSaveMsg("❌ " + (isAr ? "خطأ في الشبكة" : "Network error")); }
    setMentorSaving(false);
  }

  async function saveFeatureFlags() {
    setFlagsSaving(true);
    try {
      const res = await fetch("/api/admin/feature-flags", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flags: featureFlags }),
      });
      const data = await res.json();
      showSaveMsg(data.success ? "✅ " + (isAr ? "تم الحفظ" : "Saved") : `❌ ${data.error ?? "Error"}`);
    } catch { showSaveMsg("❌ " + (isAr ? "خطأ في الشبكة" : "Network error")); }
    setFlagsSaving(false);
  }

  /* ── Guards ─────────────────────────────────────────────────────────────── */
  if (!supabaseConfigured) {
    return (
      <div className="container-xl py-20 text-center">
        <div className="text-5xl mb-4">⚙️</div>
        <h1 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "Darhous Admin Studio" : "Darhous Admin Studio"}
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
        <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container-xl py-20 text-center">
        <div className="inline-flex flex-col items-center gap-4 px-8 py-10 rounded-3xl"
          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <Shield size={40} style={{ color: "#ef4444" }} />
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "غير مصرح لك" : "Unauthorized"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "هذه الصفحة متاحة للمشرفين فقط." : "This page is for admins only."}
          </p>
          <Link href={`/${locale}/dashboard`} className="glow-button-secondary text-sm font-mono px-5 py-2 rounded-xl">
            {isAr ? "My Darhous Hub" : "My Darhous Hub"}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Tabs config ──────────────────────────────────────────────────────── */
  const tabs: { id: AdminTab; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: "overview",       labelAr: "النظرة العامة",      labelEn: "Overview",          icon: <Activity size={15} /> },
    { id: "site-builder",   labelAr: "بناء الموقع",        labelEn: "Site Builder",       icon: <Edit3 size={15} /> },
    { id: "portals",        labelAr: "إدارة البوابات",      labelEn: "Portal Manager",     icon: <Globe size={15} /> },
    { id: "users",          labelAr: "المستخدمون",          labelEn: "Users",              icon: <Users size={15} /> },
    { id: "certificates",   labelAr: "الشهادات",            labelEn: "Certificates",       icon: <Award size={15} /> },
    { id: "mentor-control", labelAr: "إعدادات المرشد",     labelEn: "AI Mentor Control",  icon: <Bot size={15} /> },
    { id: "content",        labelAr: "المحتوى",             labelEn: "Content Studio",     icon: <Database size={15} /> },
    { id: "email",          labelAr: "الإيميلات",           labelEn: "Email & Notify",     icon: <Bell size={15} /> },
    { id: "analytics",      labelAr: "التحليلات",           labelEn: "Analytics",          icon: <TrendingUp size={15} /> },
    { id: "theme",          labelAr: "الهوية والتصميم",    labelEn: "Theme & Branding",   icon: <Palette size={15} /> },
    { id: "audit",          labelAr: "سجل الأمان",         labelEn: "Security & Audit",   icon: <Shield size={15} /> },
    { id: "language",       labelAr: "بوابة اللغة",         labelEn: "Language Portal",    icon: <Globe size={15} /> },
    { id: "automation",     labelAr: "بوابة الأتمتة",       labelEn: "Automation Portal",  icon: <Zap size={15} /> },
    { id: "digital-exams",  labelAr: "الاختبارات الرقمية",  labelEn: "Digital Exams",      icon: <BarChart2 size={15} /> },
    { id: "career",         labelAr: "بوابة المهنة",         labelEn: "Career Hub",         icon: <Award size={15} /> },
    { id: "iot-lab",        labelAr: "مختبر IoT",            labelEn: "IoT Lab",            icon: <Wrench size={15} /> },
    { id: "ai-academy",     labelAr: "أكاديمية AI",          labelEn: "AI Academy",         icon: <Bot size={15} /> },
    { id: "nano-banana",    labelAr: "🍌 Nano Banana",        labelEn: "🍌 Nano Banana",     icon: <Sparkles size={15} /> },
    { id: "blog",           labelAr: "📰 المدونة",            labelEn: "📰 Blog CMS",         icon: <FileText size={15} /> },
  ];

  const filteredUsers = users.filter((u) =>
    !search || u.email?.toLowerCase().includes(search.toLowerCase()) || u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-xl py-8 flex flex-col gap-6">

      {/* ── Header ─ */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono" style={{ color: "var(--color-tertiary)" }}>DARHOUS ADMIN STUDIO v6.0</p>
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "استوديو الإدارة" : "Darhous Admin Studio"}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
            {(profile as UserProfile & { email?: string })?.email ?? user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchData} disabled={dataLoading}
            className="p-2.5 rounded-xl transition-opacity hover:opacity-70"
            style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
            title={isAr ? "تحديث" : "Refresh"}>
            <RefreshCw size={15} className={dataLoading ? "animate-spin" : ""} />
          </button>
          <button onClick={signOut}
            className="flex items-center gap-2 text-sm font-mono px-3 py-2 rounded-xl transition-opacity hover:opacity-70"
            style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
            <LogOut size={14} />
            {isAr ? "خروج" : "Sign out"}
          </button>
        </div>
      </div>

      {/* ── Tab bar ─ */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all"
            style={{
              background: tab === t.id ? "rgba(60,224,251,0.12)" : "transparent",
              border: `1px solid ${tab === t.id ? "rgba(60,224,251,0.3)" : "transparent"}`,
              color: tab === t.id ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
            }}>
            {t.icon}
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB CONTENT
      ══════════════════════════════════════════════════════════ */}

      {/* 1 ── OVERVIEW ─────────────────────────────────────────── */}
      {tab === "overview" && (
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
      )}

      {/* 2 ── SITE BUILDER ─────────────────────────────────────── */}
      {tab === "site-builder" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "بناء الصفحة الرئيسية" : "Landing Page Builder"}
            </h2>
            <div className="flex items-center gap-2">
              {saveMsg && tab === "site-builder" && (
                <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: saveMsg.startsWith("✅") ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", color: saveMsg.startsWith("✅") ? "#4ade80" : "#ef4444" }}>
                  {saveMsg}
                </span>
              )}
              <button onClick={saveSiteSettings} disabled={settingsSaving}
                className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                {settingsSaving ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                {isAr ? "حفظ التغييرات" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Hero content editor */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-primary)" }}>
              <Edit3 size={15} /> {isAr ? "محتوى الـ Hero" : "Hero Content"}
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "العنوان الرئيسي (عربي)" : "Hero Title (Arabic)"}</label>
                <input value={siteSettings.heroTitle.ar} onChange={(e) => setSiteSettings((s) => ({ ...s, heroTitle: { ...s.heroTitle, ar: e.target.value } }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
              </div>
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "العنوان الرئيسي (إنجليزي)" : "Hero Title (English)"}</label>
                <input value={siteSettings.heroTitle.en} onChange={(e) => setSiteSettings((s) => ({ ...s, heroTitle: { ...s.heroTitle, en: e.target.value } }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
              </div>
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "النص الفرعي (عربي)" : "Subtitle (Arabic)"}</label>
                <textarea value={siteSettings.heroSubtitle.ar} onChange={(e) => setSiteSettings((s) => ({ ...s, heroSubtitle: { ...s.heroSubtitle, ar: e.target.value } }))}
                  rows={2} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
              </div>
            </div>
          </div>

          {/* Section visibility */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-secondary)" }}>
              <Eye size={15} /> {isAr ? "تحكم في رؤية الأقسام" : "Section Visibility"}
            </h3>
            <div className="flex flex-col gap-3">
              {(Object.entries(siteSettings.sectionVisibility) as [keyof typeof siteSettings.sectionVisibility, boolean][]).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{key}</span>
                  <button
                    onClick={() => setSiteSettings((s) => ({ ...s, sectionVisibility: { ...s.sectionVisibility, [key]: !val } }))}
                    style={{ color: val ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                    {val ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "نصوص أزرار Hero" : "Hero CTA Buttons"}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { field: "heroCta1" as const, label: isAr ? "زر 1" : "CTA 1" },
                { field: "heroCta2" as const, label: isAr ? "زر 2" : "CTA 2" },
                { field: "heroCta3" as const, label: isAr ? "زر 3" : "CTA 3" },
              ].map(({ field, label }) => (
                <div key={field} className="flex gap-2 items-center">
                  <span className="text-xs font-mono w-12 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
                  <input value={siteSettings[field].ar} onChange={(e) => setSiteSettings((s) => ({ ...s, [field]: { ...s[field], ar: e.target.value } }))}
                    placeholder="عربي" className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                    style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
                  <input value={siteSettings[field].en} onChange={(e) => setSiteSettings((s) => ({ ...s, [field]: { ...s[field], en: e.target.value } }))}
                    placeholder="English" className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                    style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Feature Flags */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(249,115,22,0.1)" }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: "#f97316" }}>
                <Zap size={15} /> {isAr ? "Feature Flags" : "Feature Flags"}
              </h3>
              <button onClick={saveFeatureFlags} disabled={flagsSaving}
                className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                {flagsSaving ? <RefreshCw size={11} className="animate-spin" /> : <CheckCircle size={11} />}
                {isAr ? "حفظ" : "Save"}
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {featureFlags.map((flag, i) => (
                <div key={flag.name} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <p className="text-sm font-mono" style={{ color: "var(--color-on-surface)" }}>{flag.name}</p>
                    {flag.description && <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{flag.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{flag.rollout_pct}%</span>
                    <button
                      onClick={() => setFeatureFlags((prev) => prev.map((f, j) => j === i ? { ...f, enabled: !f.enabled } : f))}
                      style={{ color: flag.enabled ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                      {flag.enabled ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3 ── PORTAL MANAGER ────────────────────────────────────── */}
      {tab === "portals" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "إدارة البوابات" : "Portal Manager"}
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
              {allPortals.filter((p) => p.status === "available").length} {isAr ? "متاح" : "live"}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {allPortals.map((portal) => (
              <div key={portal.id} className="glass-card rounded-2xl p-4 flex items-center gap-4"
                style={{ border: `1px solid ${portal.color}15` }}>
                <span className="text-2xl flex-shrink-0">{portal.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? portal.titleAr : portal.titleEn}
                    </p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: portal.status === "available" ? "rgba(74,222,128,0.12)" : "rgba(148,163,184,0.1)", color: portal.status === "available" ? "#4ade80" : "#94a3b8" }}>
                      {portal.status}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{portal.href}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                    {portal.features.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setPortalVisibility((prev) => ({ ...prev, [portal.id]: !prev[portal.id] }))}
                    title={portalVisibility[portal.id] ? "Hide" : "Show"}
                    style={{ color: portalVisibility[portal.id] ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                    {portalVisibility[portal.id] ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <Link href={`/${locale}${portal.href}`} target="_blank"
                    className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                    style={{ color: "var(--color-on-surface-variant)" }}>
                    <ExternalLink size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 ── USERS ─────────────────────────────────────────────── */}
      {tab === "users" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={isAr ? "ابحث بالبريد أو الاسم..." : "Search by email or name..."}
                className="w-full ps-9 pe-4 py-2 rounded-xl outline-none text-sm"
                style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} />
            </div>
            <span className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {filteredUsers.length} {isAr ? "مستخدم" : "users"}
            </span>
            <button onClick={() => exportCSV(users as unknown as Record<string, unknown>[], "users.csv")}
              className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
              <Download size={12} /> {isAr ? "تصدير" : "Export"}
            </button>
          </div>

          {dataLoading ? <LoadingSkeleton /> : (
            <div className="flex flex-col gap-2">
              {filteredUsers.map((u) => (
                <div key={u.id} className="glass-card rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>{u.full_name ?? "—"}</p>
                    <p className="text-xs font-mono truncate" style={{ color: "var(--color-on-surface-variant)" }}>{u.email}</p>
                    <p className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                      {new Date(u.created_at).toLocaleDateString()} · {u.provider ?? "email"}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: u.role === "admin" ? "rgba(239,68,68,0.12)" : "rgba(142,213,255,0.1)", color: u.role === "admin" ? "#ef4444" : "var(--color-primary)" }}>
                    {u.role}
                  </span>
                  {u.role !== "admin" && (
                    <button onClick={() => promoteUser(u.id, "admin")}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                      {isAr ? "ترقية" : "Promote"}
                    </button>
                  )}
                  {u.role === "admin" && u.id !== user.id && (
                    <button onClick={() => promoteUser(u.id, "student")}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "rgba(142,213,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
                      {isAr ? "تخفيض" : "Demote"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Subscribers */}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? `المشتركون في النشرة (${subscribers.length})` : `Newsletter Subscribers (${subscribers.length})`}
              </p>
              <button onClick={() => exportCSV(subscribers as unknown as Record<string, unknown>[], "subscribers.csv")}
                className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
                style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
                <Download size={11} /> CSV
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {subscribers.slice(0, 20).map((s) => (
                <div key={s.id} className="glass-card rounded-xl px-4 py-2.5 flex flex-wrap items-center gap-3">
                  <p className="text-sm font-mono flex-1 truncate" style={{ color: "var(--color-on-surface)" }}>{s.email}</p>
                  <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{s.interest ?? "—"}</span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{s.locale ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5 ── CERTIFICATES STUDIO ───────────────────────────────── */}
      {tab === "certificates" && (() => {
        const CERT_PORTALS = [
          { icon: "🤖", t: isAr ? "شهادة أكاديمية AI" : "AI Academy Certificate",          color: "#8ed5ff", portal: "ai-academy" },
          { icon: "🌐", t: isAr ? "شهادة اللغة الإنجليزية" : "English Language Certificate", color: "#d0bcff", portal: "language" },
          { icon: "💻", t: isAr ? "شهادة التحول الرقمي" : "Digital Exams Certificate",      color: "#3ce0fb", portal: "digital-exams" },
          { icon: "💼", t: isAr ? "شهادة المهارات المهنية" : "Career Skills Certificate",    color: "#f59e0b", portal: "career" },
          { icon: "⚙️", t: isAr ? "شهادة الأتمتة" : "Automation Certificate",              color: "#4ade80", portal: "automation" },
          { icon: "🔌", t: isAr ? "شهادة IoT & Arduino" : "IoT & Arduino Certificate",      color: "#f97316", portal: "iot-lab" },
        ];
        const active = CERT_PORTALS.find((c) => c.portal === issuePortal) ?? null;
        const activeSmart = issuePortal ? PORTAL_SMART_CONFIG[issuePortal] : null;

        // All required dropdowns must be selected + holder name filled
        const dropdownsOk = !activeSmart || activeSmart.dropdowns.every((d) => !!issueDropdowns[d.key]);
        const formReady = issueForm.holderName.trim().length > 0 && dropdownsOk && !!issueForm.box1Value && !!issueForm.box2Value;

        function handleDropdown(portalKey: string, dropdownKey: string, val: string) {
          setIssueDropdowns((prev) => ({ ...prev, [dropdownKey]: val }));
          const smart = PORTAL_SMART_CONFIG[portalKey];
          if (!smart) return;
          const dd = smart.dropdowns.find((d) => d.key === dropdownKey);
          if (!dd?.autoFills) return;
          const fill = dd.autoFills[val];
          if (fill) setIssueForm((f) => ({ ...f, ...fill }));
        }

        async function handleIssueCert(e: React.FormEvent) {
          e.preventDefault();
          if (!issuePortal || !formReady) return;
          setIssuing(true);
          setIssueMsg(null);
          try {
            const res = await fetch("/api/admin/certificates/issue", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ portal: issuePortal, ...issueForm }),
            });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setIssueMsg({ type: "err", text: j.error ?? `خطأ ${res.status}` });
              return;
            }
            const code = res.headers.get("X-Certificate-Code");
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            const a = document.createElement("a");
            a.href = url;
            a.download = `darhous-${issuePortal}-${issueForm.holderName.replace(/\s+/g, "-")}.pdf`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 15000);
            setIssueMsg({
              type: "ok",
              text: isAr
                ? `✅ تم إصدار الشهادة وتنزيلها — كود التحقق: ${code}`
                : `✅ Certificate issued & downloaded — verify code: ${code}`,
            });
          } catch (err) {
            setIssueMsg({ type: "err", text: err instanceof Error ? err.message : (isAr ? "فشل الاتصال" : "Request failed") });
          } finally {
            setIssuing(false);
          }
        }

        function openIssueForm(portal: string) {
          setIssuePortal(portal);
          setIssueForm({ holderName: "", box1Value: "", box2Value: "", bodyLine2: "" });
          setIssueDropdowns({});
          setIssueMsg(null);
        }

        return (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "استوديو الشهادات" : "Certificates Studio"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CERT_PORTALS.map((cert) => (
              <div key={cert.portal} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: `1px solid ${cert.color}${issuePortal === cert.portal ? "55" : "15"}` }}>
                <span className="text-3xl">{cert.icon}</span>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{cert.t}</p>
                <div className="flex gap-2 mt-auto flex-wrap">
                  <a
                    href={`/api/certificates/preview/${cert.portal}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}20`, textDecoration: "none" }}
                  >
                    {isAr ? "🔍 معاينة" : "🔍 Preview"}
                  </a>
                  <button
                    type="button"
                    onClick={() => openIssueForm(cert.portal)}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
                    style={{ background: `${cert.color}22`, color: cert.color, border: `1px solid ${cert.color}35` }}>
                    {isAr ? "📜 إصدار" : "📜 Issue"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Smart issuance form ───────────────────────────────── */}
          {active && (
            <form onSubmit={handleIssueCert} className="glass-card rounded-2xl p-6 flex flex-col gap-5" style={{ border: `1px solid ${active.color}40` }}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2" style={{ color: active.color }}>
                  <span className="text-2xl">{active.icon}</span>
                  {isAr ? `إصدار: ${active.t}` : `Issue: ${active.t}`}
                </h3>
                <button type="button" onClick={() => setIssuePortal(null)} className="text-xs px-3 py-1 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "إغلاق ✕" : "Close ✕"}
                </button>
              </div>

              {/* Holder name — only text field */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "اسم الحاصل على الشهادة *" : "Holder name *"}
                </span>
                <input
                  required
                  value={issueForm.holderName}
                  onChange={(e) => setIssueForm((f) => ({ ...f, holderName: e.target.value }))}
                  placeholder={isAr ? "مثال: أحمد محمد علي" : "e.g. Ahmed Mohamed Ali"}
                  className="px-3 py-2 rounded-lg text-sm bg-transparent"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "var(--color-on-surface)" }}
                />
              </label>

              {/* Smart dropdowns — auto-fill all other fields */}
              {activeSmart && (
                <div className={`grid grid-cols-1 ${activeSmart.dropdowns.length > 1 ? "sm:grid-cols-2" : ""} gap-4`}>
                  {activeSmart.dropdowns.map((dd) => (
                    <label key={dd.key} className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? dd.labelAr : dd.labelEn} <span style={{ color: active.color }}>*</span>
                      </span>
                      <select
                        required
                        value={issueDropdowns[dd.key] ?? ""}
                        onChange={(e) => handleDropdown(active.portal, dd.key, e.target.value)}
                        className="px-3 py-2 rounded-lg text-sm"
                        style={{
                          border: `1px solid ${issueDropdowns[dd.key] ? active.color + "50" : "rgba(255,255,255,0.15)"}`,
                          color: "var(--color-on-surface)",
                          background: "rgba(0,0,0,0.25)",
                        }}
                      >
                        <option value="">{isAr ? "— اختر —" : "— Select —"}</option>
                        {dd.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}

              {/* Auto-filled values preview */}
              {(issueForm.box1Value || issueForm.box2Value || issueForm.bodyLine2) && (
                <div className="flex flex-wrap gap-2">
                  {issueForm.box1Value && (
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: `${active.color}12`, color: active.color, border: `1px solid ${active.color}25` }}>
                      BOX 1 → {issueForm.box1Value}
                    </span>
                  )}
                  {issueForm.box2Value && (
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: `${active.color}12`, color: active.color, border: `1px solid ${active.color}25` }}>
                      BOX 2 → {issueForm.box2Value}
                    </span>
                  )}
                  {issueForm.bodyLine2 && (
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg max-w-xs truncate" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      SUB → {issueForm.bodyLine2}
                    </span>
                  )}
                </div>
              )}

              {issueMsg && (
                <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: issueMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: issueMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                  {issueMsg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={issuing || !formReady}
                className="self-start px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-40 transition-opacity hover:opacity-85"
                style={{ background: active.color, color: "#0b0f1a" }}
              >
                {issuing
                  ? (isAr ? "جارٍ الإصدار…" : "Issuing…")
                  : !formReady
                    ? (isAr ? "اختر كل الحقول أولاً" : "Select all fields first")
                    : (isAr ? "📜 إصدار وتنزيل PDF" : "📜 Issue & Download PDF")}
              </button>
            </form>
          )}

          <div className="glass-card rounded-2xl p-4" style={{ border: "1px solid rgba(212,175,55,0.12)" }}>
            <p className="text-xs font-mono" style={{ color: "#d4af37" }}>
              ✨ {isAr
                ? "اختر البوابة ← اكتب الاسم ← اختر من القوائم ← PDF يُولَّد تلقائيًا مع كود QR قابل للتحقق."
                : "Select portal → enter name → choose from dropdowns → PDF auto-generates with a verifiable QR code."}
            </p>
          </div>
        </div>
        );
      })()}

      {/* 6 ── AI MENTOR CONTROL ─────────────────────────────────── */}
      {tab === "mentor-control" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "إعدادات المرشد الذكي" : "AI Mentor Control"}
            </h2>
            <div className="flex items-center gap-2">
              {saveMsg && tab === "mentor-control" && (
                <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: saveMsg.startsWith("✅") ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", color: saveMsg.startsWith("✅") ? "#4ade80" : "#ef4444" }}>
                  {saveMsg}
                </span>
              )}
              <button onClick={saveMentorSettings} disabled={mentorSaving}
                className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                {mentorSaving ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                {isAr ? "حفظ الإعدادات" : "Save Settings"}
              </button>
              <Link href={`/${locale}/mentor`} target="_blank"
                className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
                <ExternalLink size={12} /> {isAr ? "فتح المرشد" : "Open Mentor"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Personality & Tone */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-primary)" }}>
                {isAr ? "الشخصية والأسلوب" : "Personality & Tone"}
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "الشخصية" : "Personality"}
                  </label>
                  <select value={mentorSettings.personality}
                    onChange={(e) => setMentorSettings((s) => ({ ...s, personality: e.target.value as typeof s.personality }))}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}>
                    {(["coach", "teacher", "advisor", "motivator"] as const).map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "الأسلوب" : "Tone"}
                  </label>
                  <select value={mentorSettings.tone}
                    onChange={(e) => setMentorSettings((s) => ({ ...s, tone: e.target.value as typeof s.tone }))}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}>
                    {(["friendly", "formal", "energetic", "calm"] as const).map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono mb-1 block" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "اللغة" : "Language"}
                  </label>
                  <select value={mentorSettings.language}
                    onChange={(e) => setMentorSettings((s) => ({ ...s, language: e.target.value as typeof s.language }))}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}>
                    {(["ar", "en", "bilingual"] as const).map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* System Prompt */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-secondary)" }}>
                {isAr ? "System Prompt" : "System Prompt"}
              </h3>
              <textarea value={mentorSettings.systemPrompt}
                onChange={(e) => setMentorSettings((s) => ({ ...s, systemPrompt: e.target.value }))}
                rows={6} className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)", fontFamily: "monospace" }} />
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  max_tokens: {mentorSettings.maxTokens}
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  temp: {mentorSettings.temperature}
                </span>
                <div className="flex items-center gap-1.5 ms-auto text-xs font-mono" style={{ color: mentorSettings.enableStreaming ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                  {mentorSettings.enableStreaming ? "✓ Streaming" : "✗ Streaming"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7 ── CONTENT STUDIO ────────────────────────────────────── */}
      {tab === "content" && (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "استوديو المحتوى" : "Content Studio"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: <BookOpen size={22} />, count: courses.length, labelAr: "الدورات", labelEn: "Courses", href: `/${locale}/courses`, color: "var(--color-primary)" },
              { icon: <Wrench size={22} />, count: tools.length, labelAr: "الأدوات", labelEn: "AI Tools", href: `/${locale}/tools`, color: "var(--color-tertiary)" },
              { icon: <Activity size={22} />, count: projects.length, labelAr: "المشاريع", labelEn: "Projects", href: `/${locale}/projects`, color: "#4ade80" },
              { icon: <FileText size={22} />, count: blogPosts.length, labelAr: "المقالات", labelEn: "Blog Posts", href: `/${locale}/blog`, color: "#f59e0b" },
              { icon: <FileText size={22} />, count: prompts.length, labelAr: "البرومبتات", labelEn: "Prompts", href: `/${locale}/prompts`, color: "var(--color-secondary)" },
              { icon: <Database size={22} />, count: nanaBananaPrompts.length, labelAr: "Nano Banana", labelEn: "Nano Banana", href: `/${locale}/nano-banana-prompts`, color: "#f59e0b" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02]"
                style={{ border: `1px solid ${item.color}15`, textDecoration: "none" }}>
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
                {isAr ? `رسائل التواصل (${messages.filter((m) => m.status === "new").length} جديد)` : `Contact Messages (${messages.filter((m) => m.status === "new").length} new)`}
              </h3>
              {messages.filter((m) => m.status === "new").length > 0 && (
                <div className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}>
                  <AlertCircle size={12} /> {isAr ? "لديك رسائل جديدة" : "You have new messages"}
                </div>
              )}
            </div>
            {dataLoading ? <LoadingSkeleton /> : (
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className="glass-card rounded-xl p-4 flex flex-col gap-2"
                    style={{ border: m.status === "new" ? "1px solid rgba(142,213,255,0.2)" : "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{m.name ?? "—"}</span>
                        <span className="text-xs font-mono ms-2" style={{ color: "var(--color-on-surface-variant)" }}>{m.email}</span>
                      </div>
                      {m.status === "new" && (
                        <button onClick={() => markMessageRead(m.id)}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-lg transition-opacity hover:opacity-70"
                          style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                          {isAr ? "تعليم مقروء" : "Mark read"}
                        </button>
                      )}
                    </div>
                    {m.message && <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>{m.message}</p>}
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
      )}

      {/* 8 ── EMAIL & NOTIFICATIONS ─────────────────────────────── */}
      {tab === "email" && (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "الإيميلات والإشعارات" : "Email & Notifications"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "👋", t: isAr ? "ترحيب جديد" : "Welcome Email", d: isAr ? "يُرسل تلقائيًا عند تسجيل مستخدم جديد" : "Sent automatically on new user signup", status: "active", endpoint: "/api/email/welcome" },
              { icon: "🔁", t: isAr ? "إعادة التفاعل (Day-3)" : "Re-engagement (Day-3)", d: isAr ? "Cron يومي 08:00 UTC — للمستخدمين غير النشطين" : "Daily cron 08:00 UTC — for inactive users", status: "active", endpoint: "/api/email/reengagement" },
              { icon: "🎓", t: isAr ? "إشعار الشهادة" : "Certificate Email", d: isAr ? "عند إصدار شهادة جديدة" : "When a new certificate is issued", status: "planned", endpoint: "" },
              { icon: "📊", t: isAr ? "ملخص الأسبوعي" : "Weekly Summary", d: isAr ? "ملخص التقدم الأسبوعي" : "Weekly progress digest", status: "planned", endpoint: "" },
            ].map((email) => (
              <div key={email.t} className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{email.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{email.t}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>{email.d}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: email.status === "active" ? "rgba(74,222,128,0.12)" : "rgba(148,163,184,0.1)", color: email.status === "active" ? "#4ade80" : "#94a3b8" }}>
                    {email.status}
                  </span>
                </div>
                {email.endpoint && (
                  <p className="text-[10px] font-mono mt-3" style={{ color: "var(--color-on-surface-variant)" }}>
                    POST {email.endpoint}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
            <p className="text-xs font-mono" style={{ color: "var(--color-primary)" }}>
              ✅ {isAr ? "Resend API مفعّل — RESEND_API_KEY موجود في Vercel" : "Resend API active — RESEND_API_KEY set in Vercel"}
            </p>
          </div>
        </div>
      )}

      {/* 9 ── ANALYTICS ─────────────────────────────────────────── */}
      {tab === "analytics" && (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "تحليلات المنصة" : "Platform Analytics"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Users size={20} />} value={users.length} label={isAr ? "مستخدمون كلي" : "Total Users"} color="var(--color-primary)" />
            <StatCard icon={<BarChart2 size={20} />} value={subscribers.length} label={isAr ? "مشتركو النشرة" : "Newsletter Subs"} color="var(--color-secondary)" />
            <StatCard icon={<Globe size={20} />} value={`${allPortals.filter((p) => p.status === "available").length}/7`} label={isAr ? "بوابات مفعّلة" : "Active Portals"} color="#4ade80" />
            <StatCard icon={<MessageSquare size={20} />} value={messages.length} label={isAr ? "رسائل التواصل" : "Contact Messages"} color="#f59e0b" />
          </div>
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "نشاط البوابات (analytics_events)" : "Portal Activity (analytics_events)"}
              </h3>
              {analyticsTotal >= 0 && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
                  {analyticsTotal} {isAr ? "حدث إجمالي" : "total events"}
                </span>
              )}
            </div>

            {analyticsLoading ? (
              <p className="text-xs font-mono text-center py-4" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
            ) : analyticsTotal === 0 ? (
              <div className="text-center py-6">
                <p className="text-2xl mb-2">📊</p>
                <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "لا توجد أحداث مسجّلة بعد. ستظهر بيانات حقيقية هنا عند بدء المستخدمين التفاعل." : "No events recorded yet. Real data will appear here as users interact with the platform."}
                </p>
              </div>
            ) : analyticsData.length > 0 ? (
              <div className="flex flex-col gap-3">
                {(() => {
                  const maxCount = analyticsData[0]?.count ?? 1;
                  return analyticsData.slice(0, 8).map(({ portal, count }) => {
                    const portalMeta = allPortals.find((p) => p.id === portal);
                    const pct = Math.round((count / maxCount) * 100);
                    const color = portalMeta?.color ?? "#8ed5ff";
                    return (
                      <div key={portal} className="flex items-center gap-3">
                        <span className="text-base flex-shrink-0">{portalMeta?.icon ?? "📊"}</span>
                        <p className="text-xs flex-shrink-0 w-32 truncate" style={{ color: "var(--color-on-surface)" }}>
                          {portalMeta ? (isAr ? portalMeta.titleAr : portalMeta.titleEn) : portal}
                        </p>
                        <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                        </div>
                        <span className="text-xs font-mono flex-shrink-0 w-10 text-right" style={{ color }}>{count}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : null}

            {/* Event breakdown */}
            {analyticsEventCounts.length > 0 && (
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-mono mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "الأحداث الأكثر شيوعًا" : "Top Events"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {analyticsEventCounts.slice(0, 10).map(({ name, count }) => (
                    <span key={name} className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {name} <strong style={{ color: "var(--color-primary)" }}>×{count}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10 ── THEME & BRANDING ──────────────────────────────────── */}
      {tab === "theme" && (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "الهوية البصرية والتصميم" : "Theme & Branding"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Colors */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-primary)" }}>
                {isAr ? "ألوان النظام" : "System Colors"}
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { n: "--color-primary", c: "#8ed5ff" },
                  { n: "--color-secondary", c: "#d0bcff" },
                  { n: "--color-tertiary", c: "#3ce0fb" },
                  { n: "--color-background", c: "#0c0e12" },
                ].map((col) => (
                  <div key={col.n} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: col.c, border: "1px solid rgba(255,255,255,0.1)" }} />
                    <p className="text-xs font-mono flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{col.n}</p>
                    <p className="text-xs font-mono" style={{ color: col.c }}>{col.c}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono mt-3" style={{ color: "var(--color-on-surface-variant)" }}>
                * {isAr ? "الألوان محددة في globals.css — Tailwind v4 CSS-based" : "Colors defined in globals.css — Tailwind v4 CSS-based"}
              </p>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-secondary)" }}>
                {isAr ? "روابط التواصل" : "Social Links"}
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Instagram", url: "https://www.instagram.com/darhous/", c: "#E1306C" },
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/darhous/", c: "#0A66C2" },
                  { label: "Facebook", url: "https://www.facebook.com/ahmed.darhous", c: "#1877F2" },
                  { label: "WhatsApp", url: "https://wa.me/201030002331", c: "#25D366" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.c }} />
                    <span className="text-xs font-mono w-20 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</span>
                    <span className="text-[10px] font-mono truncate flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{s.url}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "نص التوقيع في الفوتر" : "Footer Signature"}
            </h3>
            <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              designed by{" "}
              <a href="mailto:ahmeddarhous@gmail.com" style={{ color: "var(--color-primary)" }}>Ahmed Darhous</a>
              {" "}©
            </p>
          </div>
        </div>
      )}

      {/* 11 ── SECURITY & AUDIT ──────────────────────────────────── */}
      {tab === "audit" && (
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "سجل الأمان والتدقيق" : "Security & Audit Log"}
          </h2>
          {dataLoading ? <LoadingSkeleton /> : (
            <div className="flex flex-col gap-2">
              {auditLogs.length === 0 && (
                <p className="text-center py-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "لا يوجد سجل تدقيق بعد." : "No audit log entries yet."}
                </p>
              )}
              {auditLogs.map((log) => (
                <div key={log.id} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
                    <Shield size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono truncate" style={{ color: "var(--color-on-surface)" }}>{log.action}</p>
                    {log.target_type && <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{log.target_type}</p>}
                  </div>
                  <p className="text-xs font-mono flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                    {new Date(log.created_at).toLocaleString(isAr ? "ar" : "en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Security status */}
          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.12)" }}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "#4ade80" }}>
              <CheckCircle size={15} />
              {isAr ? "حالة الأمان" : "Security Status"}
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { check: isAr ? "GEMINI_API_KEY محمي في الخادم" : "GEMINI_API_KEY server-only", ok: true },
                { check: isAr ? "SUPABASE_SERVICE_ROLE_KEY لا يظهر للعميل" : "SUPABASE_SERVICE_ROLE_KEY never exposed to client", ok: true },
                { check: isAr ? "RLS مفعّل على كل الجداول" : "RLS enabled on all tables", ok: true },
                { check: isAr ? "API routes تتحقق من صلاحيات المشرف" : "Admin API routes verify role server-side", ok: true },
                { check: isAr ? "لا توجد routes مؤقتة في الكود" : "No temp admin routes in codebase", ok: true },
              ].map((s) => (
                <div key={s.check} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  <CheckCircle size={13} style={{ color: "#4ade80", flexShrink: 0 }} />
                  {s.check}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── LANGUAGE PORTAL ─────────────────── */}
      {tab === "language" && (
        <div className="flex flex-col gap-6">

          {/* Analytics summary */}
          {!langLoading && langResults.length > 0 && (() => {
            const avgScore = langResults.reduce((s, r) => s + (r.score as number), 0) / langResults.length;
            const flagged = langResults.filter((r) => ((r.flags_count as number) ?? 0) > 0).length;
            const withCerts = langResults.filter((r) => r.certificate_id).length;
            return (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: isAr ? "إجمالي الاختبارات" : "Total Attempts", value: langResults.length, color: "#d0bcff" },
                  { label: isAr ? "متوسط النتيجة" : "Avg Score", value: `${avgScore.toFixed(1)}%`, color: "#4ade80" },
                  { label: isAr ? "مع تنبيهات" : "Flagged", value: flagged, color: "#ef4444" },
                  { label: isAr ? "الشهادات" : "Certificates", value: withCerts, color: "#fbbf24" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                    <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Level distribution */}
          {!langLoading && langResults.length > 0 && (() => {
            const levels = langResults.reduce<Record<string, number>>((acc, r) => {
              const l = r.level as string;
              acc[l] = (acc[l] ?? 0) + 1;
              return acc;
            }, {});
            const sorted = Object.entries(levels).sort(([a], [b]) => a.localeCompare(b));
            const max = Math.max(...sorted.map(([, n]) => n));
            return (
              <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "توزيع المستويات" : "Level Distribution"}
                </h3>
                <div className="flex flex-col gap-2">
                  {sorted.map(([level, count]) => (
                    <div key={level} className="flex items-center gap-3 text-sm">
                      <span className="font-mono w-10 flex-shrink-0 font-bold" style={{ color: "#d0bcff" }}>{level}</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / max) * 100}%`, background: "#d0bcff" }} />
                      </div>
                      <span className="font-mono w-6 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Results table */}
          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center justify-between" style={{ color: "var(--color-on-surface)" }}>
              <span>{isAr ? "نتائج الاختبارات" : "Assessment Results"}</span>
              {langResults.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {langResults.length} {isAr ? "نتيجة" : "results"}
                  </span>
                  <button
                    onClick={() => {
                      const headers = ["User ID", "Level", "Score %", "Stages", "Flags", "Certificate", "Date"];
                      const rows = langResults.map((r) => [
                        (r.user_id as string).slice(0, 8),
                        r.level as string,
                        (r.score as number).toFixed(1),
                        `${r.stages_completed as number}/10`,
                        String((r.flags_count as number) ?? 0),
                        r.certificate_id ? "Yes" : "No",
                        new Date(r.created_at as string).toLocaleDateString(),
                      ]);
                      const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
                      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `language-results-${new Date().toISOString().slice(0, 10)}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg transition-opacity hover:opacity-70"
                    style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}>
                    <Download size={11} />
                    {isAr ? "CSV" : "CSV"}
                  </button>
                </div>
              )}
            </h3>
            {langLoading
              ? <div className="h-8 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
              : langResults.length === 0
                ? <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد نتائج" : "No results yet"}</p>
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono border-collapse">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          {["User ID", "Level", "Score", "Stages", "Flags", "Cert", "Date"].map((h) => (
                            <th key={h} className="text-start pb-2 pr-4 font-bold" style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {langResults.map((r) => (
                          <tr key={r.id as string} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td className="py-2 pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{(r.user_id as string).slice(0, 8)}…</td>
                            <td className="py-2 pr-4 font-bold" style={{ color: "#d0bcff" }}>{r.level as string}</td>
                            <td className="py-2 pr-4" style={{ color: "var(--color-on-surface)" }}>{(r.score as number).toFixed(1)}%</td>
                            <td className="py-2 pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{r.stages_completed as number}/10</td>
                            <td className="py-2 pr-4" style={{ color: ((r.flags_count as number) ?? 0) > 0 ? "#ef4444" : "var(--color-on-surface-variant)" }}>
                              {(r.flags_count as number) ?? 0}
                            </td>
                            <td className="py-2 pr-4" style={{ color: r.certificate_id ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                              {r.certificate_id ? "✓" : "—"}
                            </td>
                            <td className="py-2" style={{ color: "var(--color-on-surface-variant)" }}>
                              {new Date(r.created_at as string).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
            }
          </div>

          {/* Anti-cheat flags */}
          {!langLoading && langResults.filter((r) => ((r.flags_count as number) ?? 0) > 0).length > 0 && (
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
                <AlertTriangle size={15} />
                {isAr ? "تقارير التنبيه (Anti-cheat)" : "Anti-Cheat Flags"}
              </h3>
              <div className="flex flex-col gap-2">
                {langResults.filter((r) => ((r.flags_count as number) ?? 0) > 0).map((r) => (
                  <div key={r.id as string} className="flex items-center gap-3 text-xs"
                    style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px" }}>
                    <span className="font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{(r.user_id as string).slice(0, 8)}…</span>
                    <span className="font-bold" style={{ color: "#d0bcff" }}>{r.level as string}</span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>{(r.score as number).toFixed(1)}%</span>
                    <span className="font-bold" style={{ color: "#ef4444" }}>
                      {r.flags_count as number} flag{(r.flags_count as number) !== 1 ? "s" : ""}
                    </span>
                    <span className="ml-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                      {new Date(r.created_at as string).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {tab === "digital-exams" && (() => {
        const totalQ = examSubjects.reduce((s, sub) => s + sub.questions.length, 0);
        const tfCount = examSubjects.reduce((s, sub) => s + sub.questions.filter((q) => q.type === "truefalse").length, 0);
        const mcqCount = totalQ - tfCount;

        return (
          <div className="flex flex-col gap-6">
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: isAr ? "المواد" : "Subjects", value: examSubjects.length, color: "#3ce0fb" },
                { label: isAr ? "إجمالي الأسئلة" : "Total Questions", value: totalQ, color: "#4ade80" },
                { label: isAr ? "اختيار من متعدد" : "MCQ", value: mcqCount, color: "#f59e0b" },
                { label: isAr ? "صح / خطأ" : "True / False", value: tfCount, color: "#8ed5ff" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                  <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Per-subject breakdown */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#3ce0fb" }}>
                <Database size={14} />{isAr ? "بنك الأسئلة حسب المادة" : "Question Bank by Subject"}
              </h3>
              <div className="flex flex-col gap-2">
                {examSubjects.map((s) => {
                  const tf = s.questions.filter((q) => q.type === "truefalse").length;
                  const mcq = s.questions.length - tf;
                  const pct = (s.questions.length / totalQ) * 100;
                  return (
                    <div key={s.id} className="flex items-center gap-3 text-sm">
                      <span className="flex-shrink-0" style={{ fontSize: "16px" }}>{s.icon}</span>
                      <span className="w-36 flex-shrink-0 text-xs font-mono truncate" style={{ color: s.color }}>
                        {isAr ? s.labelAr : s.label}
                      </span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                      </div>
                      <span className="font-mono text-xs w-8 text-end flex-shrink-0" style={{ color: "var(--color-on-surface)" }}>{s.questions.length}</span>
                      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                        ({mcq} MCQ / {tf} T/F)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick stats info */}
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: "#4ade80" }}>
                {isAr ? "ميزات الاختبارات الرقمية" : "Digital Exams Features"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  isAr ? "✅ أسئلة عشوائية من بنك 902+ سؤال" : "✅ Random questions from 902+ bank",
                  isAr ? "✅ دعم أسئلة صح/خطأ واختيار متعدد" : "✅ True/False + MCQ support",
                  isAr ? "✅ Anti-cheat: 3 تحذيرات → إنهاء تلقائي" : "✅ Anti-cheat: 3 warnings → auto-terminate",
                  isAr ? "✅ شهادة PDF عند 80%+" : "✅ PDF Certificate at 80%+",
                  isAr ? "✅ شرح الإجابات بالذكاء الاصطناعي" : "✅ AI-powered answer explanations",
                  isAr ? "✅ امتحان مجمع من كل المواد" : "✅ Mixed exam from all subjects",
                  isAr ? "✅ سجل أداء مع رسوم بيانية" : "✅ Performance history with charts",
                  isAr ? "✅ مكتبة رقمية للكتب والمذكرات" : "✅ Digital library for books & notes",
                ].map((f, i) => (
                  <p key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f}</p>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { href: `/${locale}/digital-exams`, label: isAr ? "بوابة الاختبارات" : "Exams Portal", color: "#3ce0fb" },
                { href: `/${locale}/digital-exams/mixed`, label: isAr ? "الامتحان المجمع" : "Mixed Exam", color: "#f59e0b" },
                { href: `/${locale}/digital-exams/library`, label: isAr ? "المكتبة الرقمية" : "Digital Library", color: "#4ade80" },
                { href: `/${locale}/digital-exams/history`, label: isAr ? "سجل الأداء" : "Performance History", color: "#8ed5ff" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}25` }}>
                  <ExternalLink size={13} />{l.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {tab === "automation" && (() => {
        const visible = curatedWorkflows.filter((w) => w.visible !== false);
        const hidden = curatedWorkflows.filter((w) => w.visible === false);

        const safetyCount = visible.reduce<Record<string, number>>((acc, w) => {
          const s = w.safetyStatus ?? "آمن";
          acc[s] = (acc[s] ?? 0) + 1;
          return acc;
        }, {});
        const diffCount = visible.reduce<Record<string, number>>((acc, w) => {
          acc[w.difficulty] = (acc[w.difficulty] ?? 0) + 1;
          return acc;
        }, {});
        const catCount = visible.reduce<Record<string, number>>((acc, w) => {
          acc[w.category] = (acc[w.category] ?? 0) + 1;
          return acc;
        }, {});
        const catSorted = Object.entries(catCount).sort(([, a], [, b]) => b - a);
        const catMax = catSorted[0]?.[1] ?? 1;

        const SAFETY_COLORS: Record<string, string> = { "آمن": "#4ade80", "يحتاج مراجعة": "#f59e0b", "متقدم": "#8ed5ff", "غير آمن": "#f87171" };
        const DIFF_COLORS: Record<string, string> = { "مبتدئ": "#4ade80", "متوسط": "#f59e0b", "متقدم": "#f87171" };

        return (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: isAr ? "إجمالي الوصفات" : "Total Recipes", value: curatedWorkflows.length, color: "#4ade80" },
                { label: isAr ? "مرئية" : "Visible", value: visible.length, color: "#4ade80" },
                { label: isAr ? "مخفية" : "Hidden", value: hidden.length, color: "#f87171" },
                { label: isAr ? "فئات" : "Categories", value: Object.keys(catCount).length, color: "#8ed5ff" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                  <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                  <Shield size={14} />{isAr ? "توزيع مستوى الأمان" : "Safety Distribution"}
                </h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(safetyCount).map(([status, count]) => (
                    <div key={status} className="flex items-center gap-3 text-sm">
                      <span className="w-28 flex-shrink-0 text-xs font-mono" style={{ color: SAFETY_COLORS[status] ?? "#8ed5ff" }}>{status}</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / visible.length) * 100}%`, background: SAFETY_COLORS[status] ?? "#8ed5ff" }} />
                      </div>
                      <span className="font-mono w-5 text-end flex-shrink-0 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(245,158,11,0.1)" }}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
                  <BarChart2 size={14} />{isAr ? "توزيع الصعوبة" : "Difficulty Distribution"}
                </h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(diffCount).map(([diff, count]) => (
                    <div key={diff} className="flex items-center gap-3 text-sm">
                      <span className="w-16 flex-shrink-0 text-xs font-mono" style={{ color: DIFF_COLORS[diff] ?? "#8ed5ff" }}>{diff}</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / visible.length) * 100}%`, background: DIFF_COLORS[diff] ?? "#8ed5ff" }} />
                      </div>
                      <span className="font-mono w-5 text-end flex-shrink-0 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#8ed5ff" }}>
                <Database size={14} />{isAr ? "توزيع الفئات" : "Category Breakdown"}
              </h3>
              <div className="flex flex-col gap-2">
                {catSorted.map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3 text-sm">
                    <span className="w-48 flex-shrink-0 text-xs truncate" style={{ color: "var(--color-on-surface)" }}>{cat}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${(count / catMax) * 100}%`, background: "#8ed5ff" }} />
                    </div>
                    <span className="font-mono w-5 text-end flex-shrink-0 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 overflow-x-auto" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "فهرس الوصفات" : "Recipe Index"}
              </h3>
              <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", color: "var(--color-on-surface-variant)" }}>
                    <th className="text-right pb-2 pr-2">ID</th>
                    <th className="text-right pb-2 pr-2">{isAr ? "العنوان" : "Title"}</th>
                    <th className="text-right pb-2 pr-2">{isAr ? "الفئة" : "Category"}</th>
                    <th className="text-right pb-2 pr-2">{isAr ? "الصعوبة" : "Difficulty"}</th>
                    <th className="text-right pb-2 pr-2">{isAr ? "الأمان" : "Safety"}</th>
                    <th className="text-right pb-2">{isAr ? "حالة" : "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  {curatedWorkflows.map((w) => (
                    <tr key={w.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="py-2 pr-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{w.id}</td>
                      <td className="py-2 pr-2" style={{ color: "var(--color-on-surface)" }}>{w.title}</td>
                      <td className="py-2 pr-2" style={{ color: "var(--color-on-surface-variant)" }}>{w.category}</td>
                      <td className="py-2 pr-2 font-mono" style={{ color: DIFF_COLORS[w.difficulty] ?? "#8ed5ff" }}>{w.difficulty}</td>
                      <td className="py-2 pr-2 font-mono" style={{ color: SAFETY_COLORS[w.safetyStatus ?? "آمن"] ?? "#8ed5ff" }}>{w.safetyStatus ?? "آمن"}</td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono" style={{ background: w.visible !== false ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: w.visible !== false ? "#4ade80" : "#f87171" }}>
                          {w.visible !== false ? (isAr ? "مرئي" : "visible") : (isAr ? "مخفي" : "hidden")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/automation/templates`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                <ExternalLink size={13} />{isAr ? "مكتبة الوصفات" : "Recipe Library"}
              </Link>
              <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.2)" }}>
                <ExternalLink size={13} />{isAr ? "بوابة الأتمتة" : "Automation Portal"}
              </Link>
            </div>
          </div>
        );
      })()}

      {/* ── CAREER HUB TAB ─────────────────────────────────── */}
      {tab === "career" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: isAr ? "أدوات AI" : "AI Tools", value: "5+", color: "#f59e0b" },
              { label: isAr ? "قوالب CV" : "CV Templates", value: "10+", color: "#4ade80" },
              { label: isAr ? "أسئلة مقابلات" : "Interview Questions", value: "200+", color: "#8ed5ff" },
              { label: isAr ? "قطاعات وظيفية" : "Job Sectors", value: "12+", color: "#f97316" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(245,158,11,0.1)" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
              <Zap size={14} />{isAr ? "أدوات بوابة المهنة" : "Career Hub Tools"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: isAr ? "محلل السيرة الذاتية (ATS)" : "CV Analyzer (ATS)", href: `/${locale}/career/cv-analyzer`, color: "#f59e0b" },
                { label: isAr ? "صانع السيرة الذاتية" : "CV Builder", href: `/${locale}/career/builder`, color: "#4ade80" },
                { label: isAr ? "تحضير المقابلات بالـ AI" : "AI Interview Prep", href: `/${locale}/career/interview`, color: "#8ed5ff" },
                { label: isAr ? "استكشاف الوظائف" : "Job Explorer", href: `/${locale}/career/jobs`, color: "#f97316" },
                { label: isAr ? "قوالب السير الذاتية" : "CV Templates", href: `/${locale}/career/templates`, color: "#d0bcff" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-3 rounded-xl text-sm hover:opacity-80 transition-opacity" style={{ background: `${tool.color}08`, border: `1px solid ${tool.color}20`, color: tool.color }}>
                  <ExternalLink size={13} />{tool.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "#4ade80" }}>
              {isAr ? "ميزات بوابة المهنة" : "Career Hub Features"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                isAr ? "✅ تحليل السيرة الذاتية بـ Gemini AI" : "✅ CV analysis via Gemini AI",
                isAr ? "✅ Rate limit: 5 طلبات/دقيقة/IP" : "✅ Rate limit: 5 req/min/IP",
                isAr ? "✅ قيود حجم الملف: 5MB + فحص نوع" : "✅ File size limit: 5MB + type check",
                isAr ? "✅ أسئلة مقابلات مخصصة بالذكاء الاصطناعي" : "✅ AI-powered custom interview questions",
                isAr ? "✅ بناء CV تفاعلي بالعربية والإنجليزية" : "✅ Interactive CV builder (AR + EN)",
                isAr ? "✅ 10+ قوالب CV جاهزة" : "✅ 10+ ready CV templates",
              ].map((f, i) => (
                <p key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { href: `/${locale}/career`, label: isAr ? "بوابة المهنة" : "Career Hub", color: "#f59e0b" },
              { href: `/${locale}/career/cv-analyzer`, label: isAr ? "محلل ATS" : "ATS Analyzer", color: "#4ade80" },
              { href: `/${locale}/career/interview`, label: isAr ? "تحضير المقابلة" : "Interview Prep", color: "#8ed5ff" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}25` }}>
                <ExternalLink size={13} />{l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── IOT LAB TAB ─────────────────────────────────────── */}
      {tab === "iot-lab" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: isAr ? "الدروس" : "Lessons", value: lessonsData.length, color: "#f97316" },
              { label: isAr ? "المشاريع" : "Projects", value: projectsData.length, color: "#4ade80" },
              { label: isAr ? "التحديات" : "Challenges", value: challengesData.length, color: "#8ed5ff" },
              { label: isAr ? "المكونات" : "Components", value: 81, color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(249,115,22,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#f97316" }}>
                <Database size={14} />{isAr ? "توزيع فئات الدروس" : "Lesson Categories"}
              </h3>
              <div className="flex flex-col gap-2">
                {Object.entries(
                  lessonsData.reduce<Record<string, number>>((acc, l) => {
                    acc[l.category] = (acc[l.category] ?? 0) + 1;
                    return acc;
                  }, {})
                )
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-3 text-sm">
                      <span className="flex-1 text-xs truncate" style={{ color: "var(--color-on-surface)" }}>{cat}</span>
                      <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / lessonsData.length) * 100}%`, background: "#f97316" }} />
                      </div>
                      <span className="font-mono text-xs w-5 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                <BarChart2 size={14} />{isAr ? "مستوى صعوبة التحديات" : "Challenge Difficulty"}
              </h3>
              <div className="flex flex-col gap-2">
                {Object.entries(
                  challengesData.reduce<Record<string, number>>((acc, c) => {
                    acc[c.level] = (acc[c.level] ?? 0) + 1;
                    return acc;
                  }, {})
                )
                  .sort(([, a], [, b]) => b - a)
                  .map(([diff, count]) => (
                    <div key={diff} className="flex items-center gap-3 text-sm">
                      <span className="w-20 flex-shrink-0 text-xs font-mono" style={{ color: "var(--color-on-surface)" }}>{diff}</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / challengesData.length) * 100}%`, background: "#4ade80" }} />
                      </div>
                      <span className="font-mono text-xs w-5 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "#8ed5ff" }}>
              {isAr ? "ميزات مختبر IoT" : "IoT Lab Features"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                isAr ? `✅ ${lessonsData.length} درس أردوينو من الأساسيات للمتقدم` : `✅ ${lessonsData.length} Arduino lessons from basic to advanced`,
                isAr ? `✅ ${projectsData.length} مشروع تطبيقي مع أمثلة كود` : `✅ ${projectsData.length} projects with code examples`,
                isAr ? `✅ ${challengesData.length} تحدي برمجي تفاعلي` : `✅ ${challengesData.length} interactive coding challenges`,
                isAr ? "✅ 80 مكوّن إلكتروني في المكتبة" : "✅ 80 electronic components in library",
                isAr ? "✅ محاكي أردوينو تفاعلي" : "✅ Interactive Arduino simulator",
                isAr ? "✅ مسارات تعليمية مرتبة" : "✅ Structured learning paths",
              ].map((f, i) => (
                <p key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { href: `/${locale}/iot-lab`, label: isAr ? "بوابة IoT" : "IoT Portal", color: "#f97316" },
              { href: `/${locale}/iot-lab/lessons`, label: isAr ? "الدروس" : "Lessons", color: "#4ade80" },
              { href: `/${locale}/iot-lab/projects`, label: isAr ? "المشاريع" : "Projects", color: "#8ed5ff" },
              { href: `/${locale}/iot-lab/challenges`, label: isAr ? "التحديات" : "Challenges", color: "#f59e0b" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}25` }}>
                <ExternalLink size={13} />{l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── AI ACADEMY TAB ───────────────────────────────────── */}
      {tab === "ai-academy" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: isAr ? "الدورات" : "Courses", value: courses.length, color: "#8ed5ff" },
              { label: isAr ? "أدوات AI" : "AI Tools", value: tools.length, color: "#4ade80" },
              { label: isAr ? "البرومبتات" : "Prompts", value: prompts.length, color: "#d0bcff" },
              { label: isAr ? "المشاريع" : "Projects", value: projects.length, color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#8ed5ff" }}>
                <Database size={14} />{isAr ? "توزيع فئات الأدوات" : "Tool Categories"}
              </h3>
              <div className="flex flex-col gap-2">
                {Object.entries(
                  tools.reduce<Record<string, number>>((acc, t) => {
                    acc[t.category] = (acc[t.category] ?? 0) + 1;
                    return acc;
                  }, {})
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-3 text-sm">
                      <span className="flex-1 text-xs truncate" style={{ color: "var(--color-on-surface)" }}>{cat}</span>
                      <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / tools.length) * 100}%`, background: "#8ed5ff" }} />
                      </div>
                      <span className="font-mono text-xs w-5 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                <BarChart2 size={14} />{isAr ? "مستوى الأدوات" : "Tool Levels"}
              </h3>
              <div className="flex flex-col gap-2">
                {Object.entries(
                  tools.reduce<Record<string, number>>((acc, t) => {
                    acc[t.level] = (acc[t.level] ?? 0) + 1;
                    return acc;
                  }, {})
                ).map(([lvl, count]) => {
                  const LEVEL_COLORS: Record<string, string> = { beginner: "#4ade80", intermediate: "#f59e0b", advanced: "#f87171" };
                  return (
                    <div key={lvl} className="flex items-center gap-3 text-sm">
                      <span className="w-24 flex-shrink-0 text-xs font-mono" style={{ color: LEVEL_COLORS[lvl] ?? "#8ed5ff" }}>{lvl}</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / tools.length) * 100}%`, background: LEVEL_COLORS[lvl] ?? "#8ed5ff" }} />
                      </div>
                      <span className="font-mono text-xs w-5 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "#d0bcff" }}>
              {isAr ? "ميزات أكاديمية AI" : "AI Academy Features"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                isAr ? `✅ ${courses.length} دورة تعليمية متكاملة` : `✅ ${courses.length} complete courses`,
                isAr ? `✅ ${tools.length} أداة AI موثّقة` : `✅ ${tools.length} documented AI tools`,
                isAr ? `✅ ${prompts.length} برومبت جاهز للاستخدام` : `✅ ${prompts.length} ready-to-use prompts`,
                isAr ? "✅ مرشد AI بالسياق الشخصي" : "✅ AI mentor with personal context",
                isAr ? "✅ تحديات ومشاريع تطبيقية" : "✅ Hands-on challenges & projects",
                isAr ? "✅ شهادات إتمام موثّقة" : "✅ Verifiable completion certificates",
              ].map((f, i) => (
                <p key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { href: `/${locale}/ai-academy`, label: isAr ? "أكاديمية AI" : "AI Academy", color: "#8ed5ff" },
              { href: `/${locale}/tools`, label: isAr ? "دليل الأدوات" : "Tools Directory", color: "#4ade80" },
              { href: `/${locale}/courses`, label: isAr ? "الدورات" : "Courses", color: "#d0bcff" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}25` }}>
                <ExternalLink size={13} />{l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── NANO BANANA ───────────────────────────────────────── */}
      {tab === "nano-banana" && (() => {
        const featured = nanaBananaPrompts.filter((p) => p.featured);
        const totalAll = nanaBananaPrompts.length + nbCustomPrompts.length;
        const catCounts = nanaBananaPrompts.reduce<Record<string, number>>((acc, p) => {
          acc[p.categoryLabelAr] = (acc[p.categoryLabelAr] ?? 0) + 1;
          return acc;
        }, {});
        const diffCounts = nanaBananaPrompts.reduce<Record<string, number>>((acc, p) => {
          acc[p.difficulty] = (acc[p.difficulty] ?? 0) + 1;
          return acc;
        }, {});
        const DIFF_LABELS: Record<string, { ar: string; color: string }> = {
          beginner:     { ar: "مبتدئ",   color: "#4ade80" },
          intermediate: { ar: "متوسط",   color: "#f59e0b" },
          advanced:     { ar: "متقدم",   color: "#f87171" },
        };

        const NB_CATEGORIES = [
          { value: "portrait",     ar: "بورتريه",  en: "Portrait" },
          { value: "art",          ar: "فن",       en: "Art" },
          { value: "product",      ar: "منتج",     en: "Product" },
          { value: "social",       ar: "سوشيال",   en: "Social" },
          { value: "fun",          ar: "ترفيه",    en: "Fun" },
          { value: "professional", ar: "احترافي",  en: "Professional" },
        ];

        async function handleNbSubmit(e: React.FormEvent) {
          e.preventDefault();
          setNbSaving(true);
          setNbMsg(null);
          try {
            const fd = new FormData();
            Object.entries(nbForm).forEach(([k, v]) => fd.append(k, String(v)));
            if (nbImageFile) fd.append("image", nbImageFile);
            const res = await fetch("/api/admin/nano-banana", { method: "POST", body: fd });
            const json = await res.json() as { success?: boolean; error?: string; prompt?: Record<string, unknown> };
            if (!res.ok) {
              setNbMsg({ type: "err", text: json.error ?? `خطأ ${res.status}` });
            } else {
              setNbMsg({ type: "ok", text: isAr ? "✅ تمت الإضافة بنجاح!" : "✅ Prompt added successfully!" });
              // Add to local list
              if (json.prompt) setNbCustomPrompts((p) => [json.prompt as Record<string, unknown>, ...p]);
              // Reset form
              setNbForm({
                title_ar: "", title_en: "", description_ar: "", description_en: "",
                category: "fun", category_label_ar: "ترفيه", category_label_en: "Fun",
                difficulty: "beginner", best_input_ar: "صورة واضحة للوجه", best_input_en: "Clear face photo",
                prompt_ar: "", prompt_en: "", accent: "#f59e0b", emoji: "🍌", tags: "", featured: false,
              });
              setNbImageFile(null);
              setNbImagePreview(null);
            }
          } catch (err) {
            setNbMsg({ type: "err", text: err instanceof Error ? err.message : "فشل الاتصال" });
          } finally {
            setNbSaving(false);
          }
        }

        async function handleNbDelete(id: string) {
          if (!confirm(isAr ? "هل أنت متأكد من الحذف؟" : "Delete this prompt?")) return;
          const res = await fetch(`/api/admin/nano-banana/${id}`, { method: "DELETE" });
          if (res.ok) {
            setNbCustomPrompts((p) => p.filter((x) => (x as { id: string }).id !== id));
          }
        }

        // Load custom prompts when switching to list tab
        async function loadCustom() {
          const res = await fetch("/api/admin/nano-banana").catch(() => null);
          if (res?.ok) {
            const d = await res.json() as { prompts?: Record<string, unknown>[] };
            setNbCustomPrompts(d.prompts ?? []);
          }
        }

        return (
          <div className="flex flex-col gap-6">
            {/* Sub-tab bar */}
            <div className="flex gap-2 flex-wrap">
              {([
                { id: "list", labelAr: "📊 القائمة",  labelEn: "📊 List" },
                { id: "add",  labelAr: "➕ إضافة برومبت", labelEn: "➕ Add Prompt" },
              ] as { id: "list" | "add"; labelAr: string; labelEn: string }[]).map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setNbSubTab(st.id);
                    if (st.id === "list") loadCustom();
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all"
                  style={{
                    background: nbSubTab === st.id ? "rgba(245,158,11,0.18)" : "rgba(255,255,255,0.04)",
                    color: nbSubTab === st.id ? "#f59e0b" : "var(--color-on-surface-variant)",
                    border: `1px solid ${nbSubTab === st.id ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {isAr ? st.labelAr : st.labelEn}
                </button>
              ))}
            </div>

            {/* ── SUB-TAB: القائمة ── */}
            {nbSubTab === "list" && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: isAr ? "إجمالي البرومبتات" : "Total Prompts", value: totalAll, color: "#f59e0b" },
                    { label: isAr ? "ثابتة" : "Static",                    value: nanaBananaPrompts.length, color: "#d0bcff" },
                    { label: isAr ? "مضافة يدوياً" : "Custom Added",       value: nbCustomPrompts.length,  color: "#4ade80" },
                    { label: isAr ? "مميزة" : "Featured",                   value: featured.length,          color: "#8ed5ff" },
                  ].map((s) => (
                    <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                      <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(245,158,11,0.15)" }}>
                    <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
                      <Database size={14} />{isAr ? "توزيع الفئات" : "Category Distribution"}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {Object.entries(catCounts).sort(([,a],[,b]) => b - a).map(([cat, count]) => (
                        <div key={cat} className="flex items-center gap-3 text-sm">
                          <span className="flex-1 text-xs truncate" style={{ color: "var(--color-on-surface)" }}>{cat}</span>
                          <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <div className="h-full rounded-full" style={{ width: `${(count / nanaBananaPrompts.length) * 100}%`, background: "#f59e0b" }} />
                          </div>
                          <span className="font-mono text-xs w-5 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
                    <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                      <BarChart2 size={14} />{isAr ? "توزيع المستويات" : "Difficulty Distribution"}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(diffCounts).map(([diff, count]) => {
                        const meta = DIFF_LABELS[diff] ?? { ar: diff, color: "#8ed5ff" };
                        return (
                          <div key={diff} className="flex items-center gap-3">
                            <span className="w-16 text-xs font-mono flex-shrink-0" style={{ color: meta.color }}>{isAr ? meta.ar : diff}</span>
                            <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <div className="h-full rounded-full" style={{ width: `${(count / nanaBananaPrompts.length) * 100}%`, background: meta.color }} />
                            </div>
                            <span className="font-mono text-xs w-6 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Static prompts table */}
                <div className="glass-card rounded-2xl p-5 overflow-x-auto" style={{ border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
                    <Database size={14} />{isAr ? `البرومبتات الثابتة (${nanaBananaPrompts.length})` : `Static Prompts (${nanaBananaPrompts.length})`}
                  </h3>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {["#", isAr ? "العنوان" : "Title", isAr ? "الفئة" : "Category", isAr ? "المستوى" : "Level", "★"].map((h) => (
                          <th key={h} className="text-start pb-2 font-mono font-semibold pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {nanaBananaPrompts.map((p, i) => {
                        const diff = DIFF_LABELS[p.difficulty] ?? { ar: p.difficulty, color: "#8ed5ff" };
                        return (
                          <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td className="py-1.5 font-mono pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{i + 1}</td>
                            <td className="py-1.5 max-w-[180px] truncate pr-4" style={{ color: "var(--color-on-surface)" }}>{isAr ? p.titleAr : p.titleEn}</td>
                            <td className="py-1.5 pr-4" style={{ color: "#f59e0b" }}>{isAr ? p.categoryLabelAr : p.categoryLabelEn}</td>
                            <td className="py-1.5 font-mono pr-4" style={{ color: diff.color }}>{isAr ? diff.ar : p.difficulty}</td>
                            <td className="py-1.5">{p.featured ? <span style={{ color: "#f59e0b" }}>★</span> : <span style={{ color: "rgba(255,255,255,0.15)" }}>—</span>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Custom prompts table */}
                {nbCustomPrompts.length > 0 && (
                  <div className="glass-card rounded-2xl p-5 overflow-x-auto" style={{ border: "1px solid rgba(74,222,128,0.15)" }}>
                    <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                      <Database size={14} />{isAr ? `برومبتات مضافة يدوياً (${nbCustomPrompts.length})` : `Custom Prompts (${nbCustomPrompts.length})`}
                    </h3>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          {["#", isAr ? "العنوان" : "Title", isAr ? "الفئة" : "Category", isAr ? "الصورة" : "Image", isAr ? "حذف" : "Delete"].map((h) => (
                            <th key={h} className="text-start pb-2 font-mono font-semibold pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {nbCustomPrompts.map((p, i) => {
                          const row = p as { id: string; title_ar: string; title_en: string; category_label_ar: string; image_url?: string };
                          return (
                            <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td className="py-1.5 font-mono pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{i + 1}</td>
                              <td className="py-1.5 max-w-[180px] truncate pr-4" style={{ color: "var(--color-on-surface)" }}>{isAr ? row.title_ar : row.title_en}</td>
                              <td className="py-1.5 pr-4" style={{ color: "#4ade80" }}>{row.category_label_ar}</td>
                              <td className="py-1.5 pr-4">
                                {row.image_url
                                  ? <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>✓</span>
                                  : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                              </td>
                              <td className="py-1.5">
                                <button
                                  onClick={() => handleNbDelete(row.id)}
                                  className="text-[10px] px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                                  style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
                                >
                                  {isAr ? "حذف" : "Delete"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <a
                  href={`/${locale}/nano-banana-prompts`}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", textDecoration: "none" }}
                >
                  <ExternalLink size={13} />🍌 {isAr ? "فتح Nano Banana Lab" : "Open Nano Banana Lab"}
                </a>
              </>
            )}

            {/* ── SUB-TAB: إضافة ── */}
            {nbSubTab === "add" && (
              <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(245,158,11,0.2)" }}>
                <h3 className="font-bold text-base mb-6 flex items-center gap-2" style={{ color: "#f59e0b" }}>
                  <Sparkles size={16} />{isAr ? "إضافة برومبت جديد" : "Add New Prompt"}
                </h3>

                {/* Feedback message */}
                {nbMsg && (
                  <div
                    className="mb-4 p-3 rounded-xl text-sm font-mono"
                    style={{
                      background: nbMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                      color: nbMsg.type === "ok" ? "#4ade80" : "#f87171",
                      border: `1px solid ${nbMsg.type === "ok" ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                    }}
                  >
                    {nbMsg.text}
                  </div>
                )}

                <form onSubmit={handleNbSubmit} className="flex flex-col gap-5">
                  {/* ── Image upload ── */}
                  <div>
                    <label className="block text-xs font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? "📷 صورة المعاينة (اختياري — يُرفع إلى Supabase Storage)" : "📷 Preview Image (optional — uploaded to Supabase Storage)"}
                    </label>
                    <div className="flex items-start gap-4">
                      {nbImagePreview && (
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(245,158,11,0.3)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={nbImagePreview} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => { setNbImageFile(null); setNbImagePreview(null); }}
                            className="absolute top-1 end-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                            style={{ background: "rgba(0,0,0,0.7)", color: "#f87171" }}
                          >✕</button>
                        </div>
                      )}
                      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl px-4 py-3 text-xs font-mono transition-all hover:opacity-80"
                        style={{ background: "rgba(245,158,11,0.08)", border: "1px dashed rgba(245,158,11,0.35)", color: "#f59e0b" }}>
                        <ImageIcon size={18} />
                        {isAr ? "اختر صورة من جهازك" : "Choose image from device"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0] ?? null;
                            setNbImageFile(f);
                            if (f) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setNbImagePreview(ev.target?.result as string);
                              reader.readAsDataURL(f);
                            } else {
                              setNbImagePreview(null);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
                      {isAr ? "حد الحجم: 5 ميجابايت — JPG / PNG / WebP / GIF" : "Max 5 MB — JPG / PNG / WebP / GIF"}
                    </p>
                  </div>

                  {/* ── Core fields ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "اسم البرومبت (عربي) *" : "Prompt Name (Arabic) *"}
                      </label>
                      <input required value={nbForm.title_ar} onChange={(e) => setNbForm((f) => ({ ...f, title_ar: e.target.value }))}
                        placeholder={isAr ? "مثال: صورة بأسلوب أنيمي" : "e.g. Anime Style Photo"}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "اسم البرومبت (إنجليزي)" : "Prompt Name (English)"}
                      </label>
                      <input value={nbForm.title_en} onChange={(e) => setNbForm((f) => ({ ...f, title_en: e.target.value }))}
                        placeholder="e.g. Anime Style Photo"
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "الوصف (عربي)" : "Description (Arabic)"}
                      </label>
                      <input value={nbForm.description_ar} onChange={(e) => setNbForm((f) => ({ ...f, description_ar: e.target.value }))}
                        placeholder={isAr ? "وصف مختصر للبرومبت..." : "Short description..."}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "الوصف (إنجليزي)" : "Description (English)"}
                      </label>
                      <input value={nbForm.description_en} onChange={(e) => setNbForm((f) => ({ ...f, description_en: e.target.value }))}
                        placeholder="Short description..."
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>

                  {/* ── Prompt text ── */}
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? "نص البرومبت (عربي) *" : "Prompt Text (Arabic) *"}
                    </label>
                    <textarea required value={nbForm.prompt_ar} onChange={(e) => setNbForm((f) => ({ ...f, prompt_ar: e.target.value }))}
                      rows={5} placeholder={isAr ? "اكتب البرومبت هنا..." : "Write the prompt here..."}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-y font-mono"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)", direction: "ltr" }} />
                  </div>

                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? "نص البرومبت (إنجليزي)" : "Prompt Text (English)"}
                    </label>
                    <textarea value={nbForm.prompt_en} onChange={(e) => setNbForm((f) => ({ ...f, prompt_en: e.target.value }))}
                      rows={4} placeholder="Write the English prompt here..."
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-y font-mono"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)", direction: "ltr" }} />
                  </div>

                  {/* ── Catalog / Category ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "الكتالوج / الفئة" : "Catalog / Category"}
                      </label>
                      <select
                        value={nbForm.category}
                        onChange={(e) => {
                          const cat = NB_CATEGORIES.find((c) => c.value === e.target.value);
                          setNbForm((f) => ({
                            ...f,
                            category: e.target.value,
                            category_label_ar: cat?.ar ?? "ترفيه",
                            category_label_en: cat?.en ?? "Fun",
                          }));
                        }}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }}
                      >
                        {NB_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{isAr ? c.ar : c.en}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "المستوى" : "Difficulty"}
                      </label>
                      <select value={nbForm.difficulty} onChange={(e) => setNbForm((f) => ({ ...f, difficulty: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }}
                      >
                        <option value="beginner">{isAr ? "مبتدئ" : "Beginner"}</option>
                        <option value="intermediate">{isAr ? "متوسط" : "Intermediate"}</option>
                        <option value="advanced">{isAr ? "متقدم" : "Advanced"}</option>
                      </select>
                    </div>
                  </div>

                  {/* ── Best input + Tags ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "أفضل مدخل (عربي)" : "Best Input (Arabic)"}
                      </label>
                      <input value={nbForm.best_input_ar} onChange={(e) => setNbForm((f) => ({ ...f, best_input_ar: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "الوسوم (مفصولة بفاصلة)" : "Tags (comma separated)"}
                      </label>
                      <input value={nbForm.tags} onChange={(e) => setNbForm((f) => ({ ...f, tags: e.target.value }))}
                        placeholder="anime, portrait, japan"
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>

                  {/* ── Visual customization ── */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "الإيموجي" : "Emoji"}
                      </label>
                      <input value={nbForm.emoji} onChange={(e) => setNbForm((f) => ({ ...f, emoji: e.target.value }))}
                        maxLength={4}
                        className="w-full rounded-xl px-3 py-2.5 text-lg text-center focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                        {isAr ? "اللون" : "Accent Color"}
                      </label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={nbForm.accent}
                          onChange={(e) => setNbForm((f) => ({ ...f, accent: e.target.value }))}
                          className="h-10 w-10 rounded-lg cursor-pointer border-0"
                          style={{ padding: "2px" }} />
                        <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{nbForm.accent}</span>
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={nbForm.featured}
                          onChange={(e) => setNbForm((f) => ({ ...f, featured: e.target.checked }))}
                          className="w-4 h-4 rounded" />
                        <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>
                          {isAr ? "★ مميز (Featured)" : "★ Mark as Featured"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={nbSaving}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#000" }}
                  >
                    {nbSaving
                      ? (isAr ? "جاري الحفظ..." : "Saving...")
                      : (isAr ? "💾 حفظ البرومبت" : "💾 Save Prompt")}
                  </button>
                </form>
              </div>
            )}
          </div>
        );
      })()}

      {/* BLOG CMS ─────────────────────────────────────────────── */}
      {tab === "blog" && (() => {
        const BLOG_CATS = [...new Set([...blogCategories, "AI Tools", "Career", "Automation", "Learning", "Cloud", "Security"])];

        // Load blog posts from DB when tab opens
        async function loadBlogPosts() {
          setBlogLoading(true);
          setBlogMsg(null);
          try {
            const res = await fetch("/api/admin/blog");
            if (res.ok) setBlogDbPosts(await res.json());
          } catch { /* silent */ } finally { setBlogLoading(false); }
        }

        function openCreate() {
          setBlogEditId(null);
          setBlogForm(BLOG_FORM_DEFAULT);
          setBlogCoverFile(null);
          setBlogCoverPreview(null);
          setBlogMsg(null);
          setBlogView("form");
        }

        async function openEdit(row: DbBlogRow) {
          setBlogMsg(null);
          try {
            const res = await fetch(`/api/admin/blog/${row.id}`);
            if (!res.ok) { setBlogMsg({ type: "err", text: isAr ? "فشل تحميل المقال" : "Failed to load post" }); return; }
            const data = await res.json();
            setBlogForm({
              slug:       data.slug ?? "",
              title_ar:   data.title_ar ?? "",
              title_en:   data.title_en ?? "",
              excerpt_ar: data.excerpt_ar ?? "",
              excerpt_en: data.excerpt_en ?? "",
              content_ar: data.content_ar ?? "",
              content_en: data.content_en ?? "",
              category:   data.category ?? "Learning",
              tags:       (data.tags ?? []).join(", "),
              icon:       data.icon ?? "📝",
              reading_time: String(data.reading_time ?? 5),
              featured:   data.featured ?? false,
              status:     data.status ?? "published",
            });
            setBlogCoverPreview(data.cover_url ?? null);
            setBlogEditId(row.id);
            setBlogView("form");
          } catch { setBlogMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbBlogRow) {
          if (!confirm(isAr ? `أرشفة "${row.title_ar}"؟` : `Archive "${row.title_en}"?`)) return;
          const res = await fetch(`/api/admin/blog/${row.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setBlogDbPosts((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbBlogRow) {
          if (!confirm(isAr ? `حذف "${row.title_ar}" نهائياً؟` : `Delete "${row.title_en}" permanently?`)) return;
          const res = await fetch(`/api/admin/blog/${row.id}`, { method: "DELETE" });
          if (res.ok) { setBlogDbPosts((p) => p.filter((x) => x.id !== row.id)); }
        }

        async function handleCoverUpload(file: File): Promise<string | null> {
          const supabase = createClient();
          if (!supabase) return null;
          const path = `blog-covers/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
          const { error } = await supabase.storage.from("blog-covers").upload(path, file, { upsert: true });
          if (error) return null;
          const { data } = supabase.storage.from("blog-covers").getPublicUrl(path);
          return data.publicUrl;
        }

        async function handleSaveBlog(e: React.FormEvent) {
          e.preventDefault();
          setBlogSaving(true);
          setBlogMsg(null);
          try {
            let coverUrl: string | null = blogCoverPreview;
            if (blogCoverFile) {
              const uploaded = await handleCoverUpload(blogCoverFile);
              if (uploaded) coverUrl = uploaded;
            }
            const payload = {
              slug:       blogForm.slug,
              title_ar:   blogForm.title_ar,
              title_en:   blogForm.title_en,
              excerpt_ar: blogForm.excerpt_ar,
              excerpt_en: blogForm.excerpt_en,
              content_ar: blogForm.content_ar,
              content_en: blogForm.content_en,
              category:   blogForm.category,
              tags:       blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
              icon:       blogForm.icon || "📝",
              reading_time: Number(blogForm.reading_time) || 5,
              featured:   blogForm.featured,
              status:     blogForm.status,
              cover_url:  coverUrl,
            };
            const url = blogEditId ? `/api/admin/blog/${blogEditId}` : "/api/admin/blog";
            const method = blogEditId ? "PUT" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setBlogMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setBlogMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadBlogPosts();
            setTimeout(() => setBlogView("list"), 1200);
          } catch (err) {
            setBlogMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setBlogSaving(false);
          }
        }

        const slugify = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 80);

        const renderSimpleMarkdown = (md: string) => md.split("\n").slice(0, 6).map((l, i) => (
          <p key={i} className="text-xs truncate" style={{ color: "var(--color-on-surface-variant)" }}>{l || " "}</p>
        ));

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {blogView === "list"
                  ? (isAr ? "📰 إدارة المدونة" : "📰 Blog CMS")
                  : (blogEditId ? (isAr ? "✏️ تعديل مقال" : "✏️ Edit Post") : (isAr ? "✏️ مقال جديد" : "✏️ New Post"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {blogView === "list" ? (
                  <>
                    <button onClick={loadBlogPosts} disabled={blogLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={blogLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "مقال جديد" : "New Post"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setBlogView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة المقالات" : "Post List"}
                  </button>
                )}
              </div>
            </div>

            {blogMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: blogMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: blogMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {blogMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {blogView === "list" && (
              <div className="flex flex-col gap-3">
                {blogLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : blogDbPosts.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">📰</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد مقالات في قاعدة البيانات بعد. اضغط «مقال جديد» للبدء." : "No posts in DB yet. Click «New Post» to get started."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v18 في Supabase أولاً." : "Remember to apply migration v18 in Supabase first."}</p>
                  </div>
                ) : (
                  blogDbPosts.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.title_ar}</p>
                        <p className="text-xs truncate" style={{ color: "var(--color-on-surface-variant)" }}>{row.title_en}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>/{row.slug} · {row.reading_time}min · {row.published_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/blog/${row.slug}`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
                          {isAr ? "عرض" : "View"}
                        </a>
                        <button onClick={() => openEdit(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          {isAr ? "تعديل" : "Edit"}
                        </button>
                        {row.status !== "archived" && (
                          <button onClick={() => handleArchive(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(250,204,21,0.08)", color: "#fbbf24", border: "1px solid rgba(250,204,21,0.2)" }}>
                            {isAr ? "أرشفة" : "Archive"}
                          </button>
                        )}
                        <button onClick={() => handleDelete(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                          {isAr ? "حذف" : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── FORM VIEW ── */}
            {blogView === "form" && (
              <form onSubmit={handleSaveBlog} className="flex flex-col gap-5">

                {/* Basic info */}
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "العنوان (عربي) *" : "Title (Arabic) *"}</span>
                      <input required value={blogForm.title_ar} onChange={(e) => { setBlogForm((f) => ({ ...f, title_ar: e.target.value })); if (!blogEditId && !blogForm.slug) setBlogForm((f) => ({ ...f, slug: slugify(e.target.value) })); }} className="px-3 py-2 rounded-lg text-sm bg-transparent" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="عنوان المقال بالعربية" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "العنوان (إنجليزي)" : "Title (English)"}</span>
                      <input value={blogForm.title_en} onChange={(e) => setBlogForm((f) => ({ ...f, title_en: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="Post title in English" />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>Slug *</span>
                    <input required value={blogForm.slug} onChange={(e) => setBlogForm((f) => ({ ...f, slug: slugify(e.target.value) }))} className="px-3 py-2 rounded-lg text-sm bg-transparent font-mono" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="post-slug-url" />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "مختصر (عربي)" : "Excerpt (Arabic)"}</span>
                      <textarea rows={2} value={blogForm.excerpt_ar} onChange={(e) => setBlogForm((f) => ({ ...f, excerpt_ar: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent resize-none" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="وصف مختصر للمقال" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "مختصر (إنجليزي)" : "Excerpt (English)"}</span>
                      <textarea rows={2} value={blogForm.excerpt_en} onChange={(e) => setBlogForm((f) => ({ ...f, excerpt_en: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent resize-none" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="Brief post description" />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "الفئة" : "Category"}</span>
                      <select value={blogForm.category} onChange={(e) => setBlogForm((f) => ({ ...f, category: e.target.value }))} className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)", background: "rgba(0,0,0,0.2)" }}>
                        {BLOG_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "الأيقونة" : "Icon"}</span>
                      <input value={blogForm.icon} onChange={(e) => setBlogForm((f) => ({ ...f, icon: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent text-center" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)", fontSize: "20px" }} maxLength={2} />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "وقت القراءة (د)" : "Reading Time (min)"}</span>
                      <input type="number" min={1} max={60} value={blogForm.reading_time} onChange={(e) => setBlogForm((f) => ({ ...f, reading_time: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>Status</span>
                      <select value={blogForm.status} onChange={(e) => setBlogForm((f) => ({ ...f, status: e.target.value as "published" | "draft" | "archived" }))} className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)", background: "rgba(0,0,0,0.2)" }}>
                        <option value="published">Published ✅</option>
                        <option value="draft">Draft 📝</option>
                        <option value="archived">Archived 🗄️</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "الوسوم (مفصولة بفواصل)" : "Tags (comma-separated)"}</span>
                      <input value={blogForm.tags} onChange={(e) => setBlogForm((f) => ({ ...f, tags: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="ai, learning, guide" />
                    </label>
                    <label className="flex flex-col gap-1 justify-end">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                        <span className="text-xs font-semibold flex-1" style={{ color: "var(--color-on-surface)" }}>{isAr ? "مميّز (Featured)" : "Featured"}</span>
                        <button type="button" onClick={() => setBlogForm((f) => ({ ...f, featured: !f.featured }))} className="transition-all">
                          {blogForm.featured ? <ToggleRight size={24} style={{ color: "var(--color-primary)" }} /> : <ToggleLeft size={24} style={{ color: "var(--color-on-surface-variant)" }} />}
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Cover image */}
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold" style={{ color: "var(--color-on-surface)" }}>{isAr ? "صورة الغلاف (اختياري)" : "Cover Image (optional)"}</span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setBlogCoverFile(f); setBlogCoverPreview(URL.createObjectURL(f)); } }} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }} />
                      {blogCoverPreview && (
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={blogCoverPreview} alt="" className="h-16 rounded-lg object-cover" />
                          <button type="button" onClick={() => { setBlogCoverFile(null); setBlogCoverPreview(null); }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#ef4444", color: "#fff" }}>✕</button>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Content editor */}
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المحتوى (Markdown)" : "Content (Markdown)"}</h3>
                    <div className="flex gap-1">
                      {(["ar", "en"] as const).map((lang) => (
                        <button key={lang} type="button" onClick={() => setBlogPreviewLang(lang)} className="text-xs font-mono px-3 py-1 rounded-lg cursor-pointer" style={{ background: blogPreviewLang === lang ? "rgba(142,213,255,0.15)" : "rgba(255,255,255,0.04)", color: blogPreviewLang === lang ? "var(--color-primary)" : "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          {lang === "ar" ? "عربي" : "EN"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {blogPreviewLang === "ar" ? (
                    <label className="flex flex-col gap-1">
                      <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "المحتوى العربي (Markdown)" : "Arabic content (Markdown)"}</span>
                      <textarea rows={14} value={blogForm.content_ar} onChange={(e) => setBlogForm((f) => ({ ...f, content_ar: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent resize-y font-mono" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)", direction: "rtl" }} placeholder="## العنوان&#10;&#10;محتوى المقال بالعربية..." />
                    </label>
                  ) : (
                    <label className="flex flex-col gap-1">
                      <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "المحتوى الإنجليزي (Markdown)" : "English content (Markdown)"}</span>
                      <textarea rows={14} value={blogForm.content_en} onChange={(e) => setBlogForm((f) => ({ ...f, content_en: e.target.value }))} className="px-3 py-2 rounded-lg text-sm bg-transparent resize-y font-mono" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-on-surface)" }} placeholder="## Heading&#10;&#10;Post content in English..." />
                    </label>
                  )}

                  {/* Markdown preview */}
                  {(blogPreviewLang === "ar" ? blogForm.content_ar : blogForm.content_en) && (
                    <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-xs font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>— preview —</p>
                      {renderSimpleMarkdown(blogPreviewLang === "ar" ? blogForm.content_ar : blogForm.content_en)}
                    </div>
                  )}
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={blogSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {blogSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (blogEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر المقال" : "💾 Publish Post"))}
                  </button>
                  <button type="button" onClick={() => setBlogView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

    </div>
  );
}
