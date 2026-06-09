"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users, Mail, BookOpen, Wrench, FileText,
  Shield, Activity, Database, AlertCircle, RefreshCw, LogOut,
  TrendingUp, MessageSquare, Search, Download, Bot,
  Globe, Award, Zap, Palette, Bell, ToggleLeft, ToggleRight,
  Eye, EyeOff, Edit3, CheckCircle, BarChart2, ExternalLink, AlertTriangle, Sparkles, ImageIcon,
  GraduationCap, Rocket, Map,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { portals as allPortals } from "@/config/portals";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { examSubjects } from "@/data/digital-exam-subjects";
import { courses, courseCategories } from "@/data/courses";
import { tools, toolCategories } from "@/data/tools";
import { lessonsData } from "@/data/iot/lessons";
import { projectsData } from "@/data/iot/projects";
import { challengesData } from "@/data/iot/challenges";
import { projects, projectCategories } from "@/data/projects";
import { blogPosts, blogCategories } from "@/data/blog";
import { glossaryCategories } from "@/data/glossary";
import {
  AdminTextField, AdminTextAreaField, AdminSelectField,
  AdminStatusField, AdminToggleField, AdminSortOrderField,
  AdminTagsField, parseTags,
} from "@/components/admin/content-form/fields";
import { prompts, promptCategories } from "@/data/prompts";
import { nanaBananaPrompts } from "@/data/nano-banana-prompts";
import { defaultMentorSettings } from "@/types/ai_mentor_settings";
import { defaultFeatureFlags } from "@/types/feature_flags";
import { defaultSiteSettings } from "@/types/site_settings";
import type { UserProfile } from "@/lib/auth/roles";
import { PORTAL_SMART_CONFIG } from "@/lib/certificates/portalConfig";
import { AutomationCMSPanel } from "@/components/admin/cms/AutomationCMSPanel";
import { IoTCMSPanel } from "@/components/admin/cms/IoTCMSPanel";
import { ExamsCMSPanel } from "@/components/admin/cms/ExamsCMSPanel";
import { DraftContentReviewPanel } from "@/components/admin/cms/DraftContentReviewPanel";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTab } from "./admin-navigation";
import { AdminOverviewPanel } from "./panels/AdminOverviewPanel";
import { AdminAnalyticsPanel } from "./panels/AdminAnalyticsPanel";
import { AdminThemePanel } from "./panels/AdminThemePanel";

interface UserRow { id: string; email: string | null; full_name: string | null; role: string; provider: string | null; created_at: string }
interface SubscriberRow { id: string; email: string; level: string | null; interest: string | null; source: string | null; locale: string | null; created_at: string }
interface MessageRow { id: string; name: string | null; email: string | null; subject: string | null; message: string | null; status: string; created_at: string }
interface AuditRow { id: string; action: string; target_type: string | null; created_at: string }

export function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
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
  const [nbSubTab, setNbSubTab] = useState<"list" | "add" | "edit">("list");
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
  const [nbEditId, setNbEditId] = useState<string | null>(null);

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

  /* AI Glossary CMS state */
  type DbGlossaryRow = { id: string; term: string; category: string; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [glossaryDbTerms, setGlossaryDbTerms] = useState<DbGlossaryRow[]>([]);
  const [glossaryLoading, setGlossaryLoading] = useState(false);
  const [glossaryView, setGlossaryView] = useState<"list" | "form">("list");
  const [glossaryEditId, setGlossaryEditId] = useState<string | null>(null);
  const [glossarySaving, setGlossarySaving] = useState(false);
  const [glossaryMsg, setGlossaryMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const GLOSSARY_FORM_DEFAULT = {
    id: "", term: "", definition_ar: "", definition_en: "",
    example_ar: "", example_en: "", category: "Core AI", sort_order: "0",
    featured: false, status: "published" as "published" | "draft" | "archived",
  };
  const [glossaryForm, setGlossaryForm] = useState(GLOSSARY_FORM_DEFAULT);

  /* AI Tools CMS state */
  type DbToolRow = { id: string; name: string; category: string; level: string; pricing_type: string; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [toolsDbRows, setToolsDbRows] = useState<DbToolRow[]>([]);
  const [toolsLoading, setToolsLoading] = useState(false);
  const [toolsView, setToolsView] = useState<"list" | "form">("list");
  const [toolsEditId, setToolsEditId] = useState<string | null>(null);
  const [toolsSaving, setToolsSaving] = useState(false);
  const [toolsMsg, setToolsMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const TOOLS_FORM_DEFAULT = {
    id: "", name: "", category: "AI Chatbots",
    short_description_ar: "", short_description_en: "",
    use_cases: "", level: "beginner" as "beginner" | "intermediate" | "advanced",
    pricing_type: "freemium" as "free" | "freemium" | "paid" | "open-source",
    best_for: "", tags: "", website: "", featured: false,
    status: "published" as "published" | "draft" | "archived", sort_order: "0",
    overview_ar: "", overview_en: "",
    pros: "", limitations: "", alternatives: "", related_courses: "", related_prompts: "",
  };
  const [toolsForm, setToolsForm] = useState(TOOLS_FORM_DEFAULT);

  /* AI Prompts CMS state */
  type DbPromptRow = { id: string; title_ar: string; category: string; difficulty: string; best_model: string; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [promptsDbRows, setPromptsDbRows] = useState<DbPromptRow[]>([]);
  const [promptsLoading, setPromptsLoading] = useState(false);
  const [promptsView, setPromptsView] = useState<"list" | "form">("list");
  const [promptsEditId, setPromptsEditId] = useState<string | null>(null);
  const [promptsSaving, setPromptsSaving] = useState(false);
  const [promptsMsg, setPromptsMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const PROMPTS_FORM_DEFAULT = {
    id: "", title_ar: "", title_en: "", category: "Claude",
    use_case_ar: "", use_case_en: "", prompt_text: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    best_model: "", tags: "", featured: false,
    status: "published" as "published" | "draft" | "archived", sort_order: "0",
  };
  const [promptsForm, setPromptsForm] = useState(PROMPTS_FORM_DEFAULT);

  /* AI Courses CMS state */
  type DbCourseRow = { id: string; title_ar: string; category: string; level: string; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [coursesDbRows, setCoursesDbRows] = useState<DbCourseRow[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesView, setCoursesView] = useState<"list" | "form">("list");
  const [coursesEditId, setCoursesEditId] = useState<string | null>(null);
  const [coursesSaving, setCoursesSaving] = useState(false);
  const [coursesMsg, setCoursesMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const COURSES_FORM_DEFAULT = {
    id: "", title_ar: "", title_en: "",
    description_ar: "", description_en: "",
    category: "AI",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    lessons: "0", hours: "0", projects: "0",
    skills: "", icon: "🧠", color: "blue",
    coming_soon: false,
    overview_ar: "", overview_en: "",
    for_who_ar: "", for_who_en: "",
    what_you_learn_ar: "", what_you_learn_en: "",
    tools_required: "", related_projects: "", related_courses: "",
    lesson_outline: "", quiz: "",
    featured: false,
    status: "published" as "published" | "draft" | "archived", sort_order: "0",
  };
  const [coursesForm, setCoursesForm] = useState(COURSES_FORM_DEFAULT);

  /* AI Projects CMS state */
  type DbProjectRow = { id: string; title_ar: string; category: string; difficulty: string; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [projectsDbRows, setProjectsDbRows] = useState<DbProjectRow[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsView, setProjectsView] = useState<"list" | "form">("list");
  const [projectsEditId, setProjectsEditId] = useState<string | null>(null);
  const [projectsSaving, setProjectsSaving] = useState(false);
  const [projectsMsg, setProjectsMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const PROJECTS_FORM_DEFAULT = {
    id: "", title_ar: "", title_en: "",
    description_ar: "", description_en: "",
    category: "AI",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    stack: "", skills: "",
    expected_output: "", expected_output_ar: "", future_idea: "", future_idea_ar: "",
    icon: "🚀",
    goal_ar: "", goal_en: "",
    build_steps: "",
    required_tools: "", related_courses: "", related_tools: "",
    featured: false,
    status: "published" as "published" | "draft" | "archived", sort_order: "0",
  };
  const [projectsForm, setProjectsForm] = useState(PROJECTS_FORM_DEFAULT);

  /* AI Paths (Roadmaps) CMS state */
  type DbPathRow = { id: string; title_ar: string; level: string; total_weeks: number; status: string; featured: boolean; sort_order: number; updated_at: string };
  const [pathsDbRows, setPathsDbRows] = useState<DbPathRow[]>([]);
  const [pathsLoading, setPathsLoading] = useState(false);
  const [pathsView, setPathsView] = useState<"list" | "form">("list");
  const [pathsEditId, setPathsEditId] = useState<string | null>(null);
  const [pathsSaving, setPathsSaving] = useState(false);
  const [pathsMsg, setPathsMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const PATHS_FORM_DEFAULT = {
    id: "", title_ar: "", title_en: "",
    description_ar: "", description_en: "",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    total_weeks: "0",
    outcome: "", outcome_ar: "",
    icon: "🚀", color: "blue",
    nodes: "",
    featured: false,
    status: "published" as "published" | "draft" | "archived", sort_order: "0",
  };
  const [pathsForm, setPathsForm] = useState(PATHS_FORM_DEFAULT);

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

  // Auth is enforced server-side in page.tsx — no client-side gate needed.



  const filteredUsers = users.filter((u) =>
    !search || u.email?.toLowerCase().includes(search.toLowerCase()) || u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen relative w-full">
      <AdminSidebar currentTab={tab} onTabChange={setTab} isAr={isAr} />
      <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--color-background)" }}>
        <div className="container-xl py-8 flex flex-col gap-6 px-6">

          {/* ── Header ─ */}
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--color-surface-container-high)" }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-mono" style={{ color: "var(--color-tertiary)" }}>DARHOUS ADMIN STUDIO v6.0</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <Shield size={9} />
                  ADMIN
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "استوديو الإدارة" : "Darhous Admin Studio"}
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {(profile as UserProfile & { email?: string })?.email ?? user?.email}
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

          {/* ══════════════════════════════════════════════════════════
              TAB CONTENT
          ══════════════════════════════════════════════════════════ */}

      {/* 1 ── OVERVIEW ─────────────────────────────────────────── */}
      {tab === "overview" && (
        <AdminOverviewPanel
          isAr={isAr}
          users={users}
          subscribers={subscribers}
          messages={messages}
          health={health}
          healthLoading={healthLoading}
        />
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
                  {u.role === "admin" && u.id !== user?.id && (
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
        <AdminAnalyticsPanel
          isAr={isAr}
          users={users}
          subscribers={subscribers}
          messages={messages}
          analyticsTotal={analyticsTotal}
          analyticsLoading={analyticsLoading}
          analyticsData={analyticsData}
          analyticsEventCounts={analyticsEventCounts}
        />
      )}

      {/* 10 ── THEME & BRANDING ──────────────────────────────────── */}
      {tab === "theme" && (
        <AdminThemePanel isAr={isAr} />
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

        async function handleNbArchive(id: string) {
          if (!confirm(isAr ? "أرشفة البرومبت؟ لن يظهر للمستخدمين." : "Archive this prompt? It will be hidden from users.")) return;
          const res = await fetch(`/api/admin/nano-banana/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "archived" }),
          });
          if (res.ok) {
            setNbCustomPrompts((p) => p.map((x) => {
              const row = x as { id: string };
              return row.id === id ? { ...x, status: "archived" } : x;
            }));
          }
        }

        async function handleNbUnarchive(id: string) {
          const res = await fetch(`/api/admin/nano-banana/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "published" }),
          });
          if (res.ok) {
            setNbCustomPrompts((p) => p.map((x) => {
              const row = x as { id: string };
              return row.id === id ? { ...x, status: "published" } : x;
            }));
          }
        }

        async function handleNbUpdate(e: React.FormEvent) {
          e.preventDefault();
          if (!nbEditId) return;
          setNbSaving(true);
          setNbMsg(null);
          try {
            const fd = new FormData();
            const fields: Record<string, string> = {
              title_ar: nbForm.title_ar, title_en: nbForm.title_en,
              description_ar: nbForm.description_ar, description_en: nbForm.description_en,
              category: nbForm.category, category_label_ar: nbForm.category_label_ar,
              category_label_en: nbForm.category_label_en, difficulty: nbForm.difficulty,
              best_input_ar: nbForm.best_input_ar, best_input_en: nbForm.best_input_en,
              prompt_ar: nbForm.prompt_ar, prompt_en: nbForm.prompt_en,
              accent: nbForm.accent, emoji: nbForm.emoji,
              tags: nbForm.tags, featured: String(nbForm.featured),
            };
            Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
            if (nbImageFile) fd.append("image", nbImageFile);
            const res = await fetch(`/api/admin/nano-banana/${nbEditId}`, {
              method: "PATCH",
              body: fd,
            });
            const json = await res.json() as { success?: boolean; error?: string };
            if (!res.ok) {
              setNbMsg({ type: "err", text: json.error ?? `خطأ ${res.status}` });
            } else {
              setNbMsg({ type: "ok", text: isAr ? "✅ تم التعديل بنجاح!" : "✅ Prompt updated!" });
              setNbCustomPrompts((p) => p.map((x) => {
                const row = x as { id: string };
                return row.id === nbEditId
                  ? { ...x, title_ar: nbForm.title_ar, title_en: nbForm.title_en,
                      description_ar: nbForm.description_ar, description_en: nbForm.description_en,
                      category: nbForm.category, category_label_ar: nbForm.category_label_ar,
                      category_label_en: nbForm.category_label_en, difficulty: nbForm.difficulty,
                      best_input_ar: nbForm.best_input_ar, best_input_en: nbForm.best_input_en,
                      prompt_ar: nbForm.prompt_ar, prompt_en: nbForm.prompt_en,
                      accent: nbForm.accent, emoji: nbForm.emoji,
                      tags: nbForm.tags ? nbForm.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
                      featured: nbForm.featured }
                  : x;
              }));
              setTimeout(() => { setNbSubTab("list"); setNbEditId(null); }, 1500);
            }
          } catch (err) {
            setNbMsg({ type: "err", text: err instanceof Error ? err.message : "فشل الاتصال" });
          } finally {
            setNbSaving(false);
          }
        }

        return (
          <div className="flex flex-col gap-6">
            {/* Sub-tab bar */}
            <div className="flex gap-2 flex-wrap">
              {([
                { id: "list", labelAr: "📊 القائمة",  labelEn: "📊 List" },
                { id: "add",  labelAr: "➕ إضافة برومبت", labelEn: "➕ Add Prompt" },
                ...(nbEditId ? [{ id: "edit" as const, labelAr: "✏️ تعديل البرومبت", labelEn: "✏️ Edit Prompt" }] : []),
              ] as { id: "list" | "add" | "edit"; labelAr: string; labelEn: string }[]).map((st) => (
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
                          {["#", isAr ? "العنوان" : "Title", isAr ? "الحالة" : "Status", isAr ? "الصورة" : "Img", isAr ? "إجراءات" : "Actions"].map((h) => (
                            <th key={h} className="text-start pb-2 font-mono font-semibold pr-3" style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {nbCustomPrompts.map((p, i) => {
                          const row = p as { id: string; title_ar: string; title_en: string; category_label_ar: string; image_url?: string; status?: string };
                          const isArchived = row.status === "archived";
                          return (
                            <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", opacity: isArchived ? 0.55 : 1 }}>
                              <td className="py-1.5 font-mono pr-3" style={{ color: "var(--color-on-surface-variant)" }}>{i + 1}</td>
                              <td className="py-1.5 max-w-[160px] truncate pr-3" style={{ color: "var(--color-on-surface)" }}>{isAr ? row.title_ar : row.title_en}</td>
                              <td className="py-1.5 pr-3">
                                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{
                                  background: isArchived ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)",
                                  color: isArchived ? "#f87171" : "#4ade80",
                                  border: `1px solid ${isArchived ? "rgba(248,113,113,0.2)" : "rgba(74,222,128,0.2)"}`,
                                }}>
                                  {isArchived ? (isAr ? "مؤرشف" : "archived") : (isAr ? "منشور" : "published")}
                                </span>
                              </td>
                              <td className="py-1.5 pr-3">
                                {row.image_url
                                  ? <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>✓</span>
                                  : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                              </td>
                              <td className="py-1.5">
                                <div className="flex gap-1.5 flex-wrap">
                                  <button
                                    onClick={() => {
                                      setNbEditId(row.id);
                                      setNbForm({
                                        title_ar: row.title_ar, title_en: row.title_en ?? "",
                                        description_ar: (row as Record<string, unknown>).description_ar as string ?? "",
                                        description_en: (row as Record<string, unknown>).description_en as string ?? "",
                                        category: (row as Record<string, unknown>).category as string ?? "fun",
                                        category_label_ar: row.category_label_ar ?? "ترفيه",
                                        category_label_en: (row as Record<string, unknown>).category_label_en as string ?? "Fun",
                                        difficulty: (row as Record<string, unknown>).difficulty as string ?? "beginner",
                                        best_input_ar: (row as Record<string, unknown>).best_input_ar as string ?? "",
                                        best_input_en: (row as Record<string, unknown>).best_input_en as string ?? "",
                                        prompt_ar: (row as Record<string, unknown>).prompt_ar as string ?? "",
                                        prompt_en: (row as Record<string, unknown>).prompt_en as string ?? "",
                                        accent: (row as Record<string, unknown>).accent as string ?? "#f59e0b",
                                        emoji: (row as Record<string, unknown>).emoji as string ?? "🍌",
                                        tags: Array.isArray((row as Record<string, unknown>).tags)
                                          ? ((row as Record<string, unknown>).tags as string[]).join(", ")
                                          : "",
                                        featured: !!(row as Record<string, unknown>).featured,
                                      });
                                      setNbSubTab("edit");
                                      setNbMsg(null);
                                      setNbImageFile(null);
                                      setNbImagePreview(null);
                                    }}
                                    className="text-[10px] px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                                    style={{ background: "rgba(142,213,255,0.1)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.2)" }}
                                  >
                                    {isAr ? "تعديل" : "Edit"}
                                  </button>
                                  {isArchived ? (
                                    <button
                                      onClick={() => handleNbUnarchive(row.id)}
                                      className="text-[10px] px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                                      style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                                    >
                                      {isAr ? "نشر" : "Publish"}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleNbArchive(row.id)}
                                      className="text-[10px] px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                                      style={{ background: "rgba(192,132,252,0.1)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.2)" }}
                                    >
                                      {isAr ? "أرشفة" : "Archive"}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleNbDelete(row.id)}
                                    className="text-[10px] px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                                    style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
                                  >
                                    {isAr ? "حذف" : "Delete"}
                                  </button>
                                </div>
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

            {/* ── SUB-TAB: تعديل ── */}
            {nbSubTab === "edit" && nbEditId && (
              <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(142,213,255,0.25)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "#8ed5ff" }}>
                    <Edit3 size={16} />{isAr ? "تعديل البرومبت" : "Edit Prompt"}
                  </h3>
                  <button
                    onClick={() => { setNbSubTab("list"); setNbEditId(null); setNbMsg(null); }}
                    className="text-xs px-3 py-1 rounded-lg hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {isAr ? "← إلغاء" : "← Cancel"}
                  </button>
                </div>

                {nbMsg && (
                  <div className="mb-4 p-3 rounded-xl text-sm font-mono" style={{
                    background: nbMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                    color: nbMsg.type === "ok" ? "#4ade80" : "#f87171",
                    border: `1px solid ${nbMsg.type === "ok" ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                  }}>
                    {nbMsg.text}
                  </div>
                )}

                <form onSubmit={handleNbUpdate} className="flex flex-col gap-5">
                  {/* ── Image upload (edit) ── */}
                  <div>
                    <label className="block text-xs font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? "📷 الصورة (اختياري — اتركه فارغاً للإبقاء على الصورة الحالية)" : "📷 Image (optional — leave empty to keep current image)"}
                    </label>
                    <div className="flex items-start gap-4">
                      {nbImagePreview ? (
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(142,213,255,0.3)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={nbImagePreview} alt="preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setNbImageFile(null); setNbImagePreview(null); }}
                            className="absolute top-1 end-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                            style={{ background: "rgba(0,0,0,0.7)", color: "#f87171" }}>✕</button>
                        </div>
                      ) : null}
                      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl px-4 py-3 text-xs font-mono transition-all hover:opacity-80"
                        style={{ background: "rgba(142,213,255,0.06)", border: "1px dashed rgba(142,213,255,0.3)", color: "#8ed5ff" }}>
                        <ImageIcon size={16} />
                        {nbImageFile ? nbImageFile.name : (isAr ? "اختر صورة جديدة" : "Choose new image")}
                        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0] ?? null;
                            setNbImageFile(f);
                            if (f) { const r = new FileReader(); r.onload = (ev) => setNbImagePreview(ev.target?.result as string); r.readAsDataURL(f); }
                            else setNbImagePreview(null);
                          }} />
                      </label>
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
                      {isAr ? "حد الحجم: 5 ميجابايت — JPG / PNG / WebP / GIF" : "Max 5 MB — JPG / PNG / WebP / GIF"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "اسم البرومبت (عربي) *" : "Prompt Name (Arabic) *"}</label>
                      <input required value={nbForm.title_ar} onChange={(e) => setNbForm((f) => ({ ...f, title_ar: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "اسم البرومبت (إنجليزي)" : "Prompt Name (English)"}</label>
                      <input value={nbForm.title_en} onChange={(e) => setNbForm((f) => ({ ...f, title_en: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                      <input value={nbForm.description_ar} onChange={(e) => setNbForm((f) => ({ ...f, description_ar: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                      <input value={nbForm.description_en} onChange={(e) => setNbForm((f) => ({ ...f, description_en: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "نص البرومبت (عربي) *" : "Prompt Text (Arabic) *"}</label>
                    <textarea required value={nbForm.prompt_ar} onChange={(e) => setNbForm((f) => ({ ...f, prompt_ar: e.target.value }))}
                      rows={5} className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-y font-mono"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-on-surface)", direction: "ltr" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "نص البرومبت (إنجليزي)" : "Prompt Text (English)"}</label>
                    <textarea value={nbForm.prompt_en} onChange={(e) => setNbForm((f) => ({ ...f, prompt_en: e.target.value }))}
                      rows={4} className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-y font-mono"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)", direction: "ltr" }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الكتالوج / الفئة" : "Catalog / Category"}</label>
                      <select value={nbForm.category}
                        onChange={(e) => {
                          const cat = NB_CATEGORIES.find((c) => c.value === e.target.value);
                          setNbForm((f) => ({ ...f, category: e.target.value, category_label_ar: cat?.ar ?? "ترفيه", category_label_en: cat?.en ?? "Fun" }));
                        }}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }}>
                        {NB_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{isAr ? c.ar : c.en}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "المستوى" : "Difficulty"}</label>
                      <select value={nbForm.difficulty} onChange={(e) => setNbForm((f) => ({ ...f, difficulty: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }}>
                        <option value="beginner">{isAr ? "مبتدئ" : "Beginner"}</option>
                        <option value="intermediate">{isAr ? "متوسط" : "Intermediate"}</option>
                        <option value="advanced">{isAr ? "متقدم" : "Advanced"}</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "أفضل مدخل (عربي)" : "Best Input (Arabic)"}</label>
                      <input value={nbForm.best_input_ar} onChange={(e) => setNbForm((f) => ({ ...f, best_input_ar: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الوسوم (مفصولة بفاصلة)" : "Tags (comma separated)"}</label>
                      <input value={nbForm.tags} onChange={(e) => setNbForm((f) => ({ ...f, tags: e.target.value }))}
                        placeholder="anime, portrait, japan"
                        className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "الإيموجي" : "Emoji"}</label>
                      <input value={nbForm.emoji} onChange={(e) => setNbForm((f) => ({ ...f, emoji: e.target.value }))} maxLength={4}
                        className="w-full rounded-xl px-3 py-2.5 text-lg text-center focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--color-on-surface)" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "اللون" : "Accent Color"}</label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={nbForm.accent} onChange={(e) => setNbForm((f) => ({ ...f, accent: e.target.value }))}
                          className="h-10 w-10 rounded-lg cursor-pointer border-0" style={{ padding: "2px" }} />
                        <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{nbForm.accent}</span>
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={nbForm.featured} onChange={(e) => setNbForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded" />
                        <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{isAr ? "★ مميز (Featured)" : "★ Mark as Featured"}</span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" disabled={nbSaving}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #8ed5ff, #60b4e8)", color: "#000" }}>
                    {nbSaving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes")}
                  </button>
                </form>
              </div>
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

      {tab === "ai-glossary" && (() => {
        const GLOSSARY_CATS = [...new Set([...glossaryCategories, "Core AI", "Prompting", "Development", "Cloud"])];
        const GLOSSARY_CAT_OPTIONS = GLOSSARY_CATS.map((c) => ({ value: c, label: c }));

        async function loadGlossaryTerms() {
          setGlossaryLoading(true);
          setGlossaryMsg(null);
          try {
            const res = await fetch("/api/admin/ai-glossary");
            if (res.ok) setGlossaryDbTerms(await res.json());
          } catch { /* silent */ } finally { setGlossaryLoading(false); }
        }

        function openCreate() {
          setGlossaryEditId(null);
          setGlossaryForm(GLOSSARY_FORM_DEFAULT);
          setGlossaryMsg(null);
          setGlossaryView("form");
        }

        async function openEdit(row: DbGlossaryRow) {
          setGlossaryMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-glossary/${row.id}`);
            if (!res.ok) { setGlossaryMsg({ type: "err", text: isAr ? "فشل تحميل المصطلح" : "Failed to load term" }); return; }
            const data = await res.json();
            setGlossaryForm({
              id:            data.id ?? "",
              term:          data.term ?? "",
              definition_ar: data.definition_ar ?? "",
              definition_en: data.definition_en ?? "",
              example_ar:    data.example_ar ?? "",
              example_en:    data.example_en ?? "",
              category:      data.category ?? "Core AI",
              sort_order:    String(data.sort_order ?? 0),
              featured:      data.featured ?? false,
              status:        data.status ?? "published",
            });
            setGlossaryEditId(row.id);
            setGlossaryView("form");
          } catch { setGlossaryMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbGlossaryRow) {
          if (!confirm(isAr ? `أرشفة "${row.term}"؟` : `Archive "${row.term}"?`)) return;
          const res = await fetch(`/api/admin/ai-glossary/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setGlossaryDbTerms((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbGlossaryRow) {
          if (!confirm(isAr ? `حذف "${row.term}" نهائياً؟` : `Delete "${row.term}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-glossary/${row.id}`, { method: "DELETE" });
          if (res.ok) { setGlossaryDbTerms((p) => p.filter((x) => x.id !== row.id)); }
        }

        async function handleSaveGlossary(e: React.FormEvent) {
          e.preventDefault();
          setGlossarySaving(true);
          setGlossaryMsg(null);
          try {
            const payload = {
              id:            glossaryForm.id,
              term:          glossaryForm.term,
              definition_ar: glossaryForm.definition_ar,
              definition_en: glossaryForm.definition_en,
              example_ar:    glossaryForm.example_ar,
              example_en:    glossaryForm.example_en,
              category:      glossaryForm.category,
              sort_order:    Number(glossaryForm.sort_order) || 0,
              featured:      glossaryForm.featured,
              status:        glossaryForm.status,
            };
            const url = glossaryEditId ? `/api/admin/ai-glossary/${glossaryEditId}` : "/api/admin/ai-glossary";
            const method = glossaryEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setGlossaryMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setGlossaryMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadGlossaryTerms();
            setTimeout(() => setGlossaryView("list"), 1200);
          } catch (err) {
            setGlossaryMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setGlossarySaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {glossaryView === "list"
                  ? (isAr ? "📖 إدارة المسرد" : "📖 Glossary CMS")
                  : (glossaryEditId ? (isAr ? "✏️ تعديل مصطلح" : "✏️ Edit Term") : (isAr ? "✏️ مصطلح جديد" : "✏️ New Term"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {glossaryView === "list" ? (
                  <>
                    <button onClick={loadGlossaryTerms} disabled={glossaryLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={glossaryLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "مصطلح جديد" : "New Term"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setGlossaryView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة المصطلحات" : "Term List"}
                  </button>
                )}
              </div>
            </div>

            {glossaryMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: glossaryMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: glossaryMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {glossaryMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {glossaryView === "list" && (
              <div className="flex flex-col gap-3">
                {glossaryLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : glossaryDbTerms.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">📖</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد مصطلحات في قاعدة البيانات بعد. اضغط «تحديث» أو «مصطلح جديد»." : "No terms in DB yet. Click «Refresh» or «New Term»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v22 في Supabase أولاً." : "Remember to apply migration v22 in Supabase first."}</p>
                  </div>
                ) : (
                  glossaryDbTerms.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.term}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/glossary`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {glossaryView === "form" && (
              <form onSubmit={handleSaveGlossary} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "المصطلح *" : "Term *"}
                      value={glossaryForm.term}
                      onChange={(v) => {
                        setGlossaryForm((f) => ({ ...f, term: v }));
                        if (!glossaryEditId && !glossaryForm.id) setGlossaryForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="LLM"
                      required
                      mono
                    />
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={glossaryForm.id}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="llm"
                      required
                      mono
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminSelectField
                      label={isAr ? "الفئة" : "Category"}
                      value={glossaryForm.category}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, category: v }))}
                      options={GLOSSARY_CAT_OPTIONS}
                    />
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(glossaryForm.sort_order) || 0}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminStatusField
                      value={glossaryForm.status}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, status: v }))}
                      label={isAr ? "الحالة" : "Status"}
                    />
                    <AdminToggleField
                      label={isAr ? "مصطلح مميز" : "Featured"}
                      checked={glossaryForm.featured}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, featured: v }))}
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "التعريف" : "Definition"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "التعريف (عربي) *" : "Definition (Arabic) *"}
                      value={glossaryForm.definition_ar}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, definition_ar: v }))}
                      placeholder="تعريف المصطلح بالعربية"
                      required
                      dir="rtl"
                      rows={4}
                    />
                    <AdminTextAreaField
                      label={isAr ? "التعريف (إنجليزي)" : "Definition (English)"}
                      value={glossaryForm.definition_en}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, definition_en: v }))}
                      placeholder="Term definition in English"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "مثال (اختياري)" : "Example (optional)"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "مثال (عربي)" : "Example (Arabic)"}
                      value={glossaryForm.example_ar}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, example_ar: v }))}
                      placeholder="مثال توضيحي بالعربية"
                      dir="rtl"
                      rows={2}
                    />
                    <AdminTextAreaField
                      label={isAr ? "مثال (إنجليزي)" : "Example (English)"}
                      value={glossaryForm.example_en}
                      onChange={(v) => setGlossaryForm((f) => ({ ...f, example_en: v }))}
                      placeholder="Illustrative example in English"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={glossarySaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {glossarySaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (glossaryEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر المصطلح" : "💾 Publish Term"))}
                  </button>
                  <button type="button" onClick={() => setGlossaryView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "ai-tools-cms" && (() => {
        const TOOL_CAT_OPTIONS = toolCategories.map((c) => ({ value: c, label: c }));
        const LEVEL_OPTIONS = [
          { value: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
          { value: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
          { value: "advanced", label: isAr ? "متقدم" : "Advanced" },
        ];
        const PRICING_OPTIONS = [
          { value: "free", label: isAr ? "مجاني" : "Free" },
          { value: "freemium", label: isAr ? "مجاني جزئيًا" : "Freemium" },
          { value: "paid", label: isAr ? "مدفوع" : "Paid" },
          { value: "open-source", label: isAr ? "مفتوح المصدر" : "Open Source" },
        ];

        async function loadTools() {
          setToolsLoading(true);
          setToolsMsg(null);
          try {
            const res = await fetch("/api/admin/ai-tools");
            if (res.ok) setToolsDbRows(await res.json());
          } catch { /* silent */ } finally { setToolsLoading(false); }
        }

        function openCreate() {
          setToolsEditId(null);
          setToolsForm(TOOLS_FORM_DEFAULT);
          setToolsMsg(null);
          setToolsView("form");
        }

        async function openEdit(row: DbToolRow) {
          setToolsMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-tools/${row.id}`);
            if (!res.ok) { setToolsMsg({ type: "err", text: isAr ? "فشل تحميل الأداة" : "Failed to load tool" }); return; }
            const data = await res.json();
            setToolsForm({
              id:                   data.id ?? "",
              name:                 data.name ?? "",
              category:             data.category ?? "AI Chatbots",
              short_description_ar: data.short_description_ar ?? "",
              short_description_en: data.short_description_en ?? "",
              use_cases:            (data.use_cases ?? []).join(", "),
              level:                data.level ?? "beginner",
              pricing_type:         data.pricing_type ?? "freemium",
              best_for:             data.best_for ?? "",
              tags:                 (data.tags ?? []).join(", "),
              website:              data.website ?? "",
              featured:             data.featured ?? false,
              status:               data.status ?? "published",
              sort_order:           String(data.sort_order ?? 0),
              overview_ar:          data.overview_ar ?? "",
              overview_en:          data.overview_en ?? "",
              pros:                 (data.pros ?? []).join(", "),
              limitations:          (data.limitations ?? []).join(", "),
              alternatives:         (data.alternatives ?? []).join(", "),
              related_courses:      (data.related_courses ?? []).join(", "),
              related_prompts:      (data.related_prompts ?? []).join(", "),
            });
            setToolsEditId(row.id);
            setToolsView("form");
          } catch { setToolsMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbToolRow) {
          if (!confirm(isAr ? `أرشفة "${row.name}"؟` : `Archive "${row.name}"?`)) return;
          const res = await fetch(`/api/admin/ai-tools/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setToolsDbRows((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbToolRow) {
          if (!confirm(isAr ? `حذف "${row.name}" نهائياً؟` : `Delete "${row.name}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-tools/${row.id}`, { method: "DELETE" });
          if (res.ok) { setToolsDbRows((p) => p.filter((x) => x.id !== row.id)); }
        }

        async function handleSaveTool(e: React.FormEvent) {
          e.preventDefault();
          setToolsSaving(true);
          setToolsMsg(null);
          try {
            const payload = {
              id:                   toolsForm.id,
              name:                 toolsForm.name,
              category:             toolsForm.category,
              short_description_ar: toolsForm.short_description_ar,
              short_description_en: toolsForm.short_description_en,
              use_cases:            parseTags(toolsForm.use_cases),
              level:                toolsForm.level,
              pricing_type:         toolsForm.pricing_type,
              best_for:             toolsForm.best_for,
              tags:                 parseTags(toolsForm.tags),
              website:              toolsForm.website,
              featured:             toolsForm.featured,
              status:               toolsForm.status,
              sort_order:           Number(toolsForm.sort_order) || 0,
              overview_ar:          toolsForm.overview_ar,
              overview_en:          toolsForm.overview_en,
              pros:                 parseTags(toolsForm.pros),
              limitations:          parseTags(toolsForm.limitations),
              alternatives:         parseTags(toolsForm.alternatives),
              related_courses:      parseTags(toolsForm.related_courses),
              related_prompts:      parseTags(toolsForm.related_prompts),
            };
            const url = toolsEditId ? `/api/admin/ai-tools/${toolsEditId}` : "/api/admin/ai-tools";
            const method = toolsEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setToolsMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setToolsMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadTools();
            setTimeout(() => setToolsView("list"), 1200);
          } catch (err) {
            setToolsMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setToolsSaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {toolsView === "list"
                  ? (isAr ? "🛠️ إدارة أدوات AI" : "🛠️ AI Tools CMS")
                  : (toolsEditId ? (isAr ? "✏️ تعديل أداة" : "✏️ Edit Tool") : (isAr ? "✏️ أداة جديدة" : "✏️ New Tool"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {toolsView === "list" ? (
                  <>
                    <button onClick={loadTools} disabled={toolsLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={toolsLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "أداة جديدة" : "New Tool"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setToolsView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة الأدوات" : "Tool List"}
                  </button>
                )}
              </div>
            </div>

            {toolsMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: toolsMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: toolsMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {toolsMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {toolsView === "list" && (
              <div className="flex flex-col gap-3">
                {toolsLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : toolsDbRows.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">🛠️</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد أدوات في قاعدة البيانات بعد. اضغط «تحديث» أو «أداة جديدة»." : "No tools in DB yet. Click «Refresh» or «New Tool»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v23 في Supabase أولاً." : "Remember to apply migration v23 in Supabase first."}</p>
                  </div>
                ) : (
                  toolsDbRows.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category} · {row.level} · {row.pricing_type}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.name}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/tools/${row.id}`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {toolsView === "form" && (
              <form onSubmit={handleSaveTool} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "اسم الأداة *" : "Tool Name *"}
                      value={toolsForm.name}
                      onChange={(v) => {
                        setToolsForm((f) => ({ ...f, name: v }));
                        if (!toolsEditId && !toolsForm.id) setToolsForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="Claude"
                      required
                    />
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={toolsForm.id}
                      onChange={(v) => setToolsForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="claude"
                      required
                      mono
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminSelectField
                      label={isAr ? "الفئة" : "Category"}
                      value={toolsForm.category}
                      onChange={(v) => setToolsForm((f) => ({ ...f, category: v }))}
                      options={TOOL_CAT_OPTIONS}
                    />
                    <AdminSelectField
                      label={isAr ? "المستوى" : "Level"}
                      value={toolsForm.level}
                      onChange={(v) => setToolsForm((f) => ({ ...f, level: v as typeof toolsForm.level }))}
                      options={LEVEL_OPTIONS}
                    />
                    <AdminSelectField
                      label={isAr ? "نوع التسعير" : "Pricing"}
                      value={toolsForm.pricing_type}
                      onChange={(v) => setToolsForm((f) => ({ ...f, pricing_type: v as typeof toolsForm.pricing_type }))}
                      options={PRICING_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "وصف مختصر (عربي) *" : "Short Description (Arabic) *"}
                      value={toolsForm.short_description_ar}
                      onChange={(v) => setToolsForm((f) => ({ ...f, short_description_ar: v }))}
                      placeholder="وصف مختصر للأداة"
                      required
                      dir="rtl"
                      rows={2}
                    />
                    <AdminTextAreaField
                      label={isAr ? "وصف مختصر (إنجليزي)" : "Short Description (English)"}
                      value={toolsForm.short_description_en}
                      onChange={(v) => setToolsForm((f) => ({ ...f, short_description_en: v }))}
                      placeholder="Brief tool description"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "الأفضل لـ" : "Best For"}
                      value={toolsForm.best_for}
                      onChange={(v) => setToolsForm((f) => ({ ...f, best_for: v }))}
                      placeholder="General use"
                    />
                    <AdminTextField
                      label={isAr ? "الموقع الإلكتروني" : "Website"}
                      value={toolsForm.website}
                      onChange={(v) => setToolsForm((f) => ({ ...f, website: v }))}
                      placeholder="https://..."
                      mono
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "حالات الاستخدام" : "Use Cases"}
                      value={toolsForm.use_cases}
                      onChange={(v) => setToolsForm((f) => ({ ...f, use_cases: v }))}
                      placeholder="Coding, Writing, Analysis"
                    />
                    <AdminTagsField
                      label={isAr ? "الوسوم" : "Tags"}
                      value={toolsForm.tags}
                      onChange={(v) => setToolsForm((f) => ({ ...f, tags: v }))}
                      placeholder="claude, anthropic, chat"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(toolsForm.sort_order) || 0}
                      onChange={(v) => setToolsForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                    <div className="flex items-center gap-6">
                      <AdminStatusField
                        value={toolsForm.status}
                        onChange={(v) => setToolsForm((f) => ({ ...f, status: v }))}
                        label={isAr ? "الحالة" : "Status"}
                      />
                    </div>
                  </div>
                  <AdminToggleField
                    label={isAr ? "أداة مميزة" : "Featured"}
                    checked={toolsForm.featured}
                    onChange={(v) => setToolsForm((f) => ({ ...f, featured: v }))}
                  />
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "تفاصيل إضافية (اختياري)" : "Extra Details (optional)"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "نظرة عامة (عربي)" : "Overview (Arabic)"}
                      value={toolsForm.overview_ar}
                      onChange={(v) => setToolsForm((f) => ({ ...f, overview_ar: v }))}
                      placeholder="نظرة عامة موسعة على الأداة"
                      dir="rtl"
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "نظرة عامة (إنجليزي)" : "Overview (English)"}
                      value={toolsForm.overview_en}
                      onChange={(v) => setToolsForm((f) => ({ ...f, overview_en: v }))}
                      placeholder="Extended overview of the tool"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTagsField
                      label={isAr ? "المميزات" : "Pros"}
                      value={toolsForm.pros}
                      onChange={(v) => setToolsForm((f) => ({ ...f, pros: v }))}
                      placeholder="Fast, Accurate, Free"
                    />
                    <AdminTagsField
                      label={isAr ? "القيود" : "Limitations"}
                      value={toolsForm.limitations}
                      onChange={(v) => setToolsForm((f) => ({ ...f, limitations: v }))}
                      placeholder="Paid, Needs internet"
                    />
                    <AdminTagsField
                      label={isAr ? "البدائل" : "Alternatives"}
                      value={toolsForm.alternatives}
                      onChange={(v) => setToolsForm((f) => ({ ...f, alternatives: v }))}
                      placeholder="cursor, windsurf"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "كورسات ذات صلة (ids)" : "Related Courses (ids)"}
                      value={toolsForm.related_courses}
                      onChange={(v) => setToolsForm((f) => ({ ...f, related_courses: v }))}
                      placeholder="claude-mastery"
                    />
                    <AdminTagsField
                      label={isAr ? "برومبتات ذات صلة (ids)" : "Related Prompts (ids)"}
                      value={toolsForm.related_prompts}
                      onChange={(v) => setToolsForm((f) => ({ ...f, related_prompts: v }))}
                      placeholder="build-website, fix-bug"
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={toolsSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {toolsSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (toolsEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر الأداة" : "💾 Publish Tool"))}
                  </button>
                  <button type="button" onClick={() => setToolsView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "ai-prompts-cms" && (() => {
        const PROMPT_CAT_OPTIONS = promptCategories.map((c) => ({ value: c, label: c }));
        const DIFFICULTY_OPTIONS = [
          { value: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
          { value: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
          { value: "advanced", label: isAr ? "متقدم" : "Advanced" },
        ];

        async function loadPrompts() {
          setPromptsLoading(true);
          setPromptsMsg(null);
          try {
            const res = await fetch("/api/admin/ai-prompts");
            if (res.ok) setPromptsDbRows(await res.json());
          } catch { /* silent */ } finally { setPromptsLoading(false); }
        }

        function openCreate() {
          setPromptsEditId(null);
          setPromptsForm(PROMPTS_FORM_DEFAULT);
          setPromptsMsg(null);
          setPromptsView("form");
        }

        async function openEdit(row: DbPromptRow) {
          setPromptsMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-prompts/${row.id}`);
            if (!res.ok) { setPromptsMsg({ type: "err", text: isAr ? "فشل تحميل المطالبة" : "Failed to load prompt" }); return; }
            const data = await res.json();
            setPromptsForm({
              id:          data.id ?? "",
              title_ar:    data.title_ar ?? "",
              title_en:    data.title_en ?? "",
              category:    data.category ?? "Claude",
              use_case_ar: data.use_case_ar ?? "",
              use_case_en: data.use_case_en ?? "",
              prompt_text: data.prompt_text ?? "",
              difficulty:  data.difficulty ?? "beginner",
              best_model:  data.best_model ?? "",
              tags:        (data.tags ?? []).join(", "),
              featured:    data.featured ?? false,
              status:      data.status ?? "published",
              sort_order:  String(data.sort_order ?? 0),
            });
            setPromptsEditId(row.id);
            setPromptsView("form");
          } catch { setPromptsMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbPromptRow) {
          if (!confirm(isAr ? `أرشفة "${row.title_ar}"؟` : `Archive "${row.title_ar}"?`)) return;
          const res = await fetch(`/api/admin/ai-prompts/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setPromptsDbRows((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbPromptRow) {
          if (!confirm(isAr ? `حذف "${row.title_ar}" نهائياً؟` : `Delete "${row.title_ar}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-prompts/${row.id}`, { method: "DELETE" });
          if (res.ok) { setPromptsDbRows((p) => p.filter((x) => x.id !== row.id)); }
        }

        async function handleSavePrompt(e: React.FormEvent) {
          e.preventDefault();
          setPromptsSaving(true);
          setPromptsMsg(null);
          try {
            const payload = {
              id:          promptsForm.id,
              title_ar:    promptsForm.title_ar,
              title_en:    promptsForm.title_en,
              category:    promptsForm.category,
              use_case_ar: promptsForm.use_case_ar,
              use_case_en: promptsForm.use_case_en,
              prompt_text: promptsForm.prompt_text,
              difficulty:  promptsForm.difficulty,
              best_model:  promptsForm.best_model,
              tags:        parseTags(promptsForm.tags),
              featured:    promptsForm.featured,
              status:      promptsForm.status,
              sort_order:  Number(promptsForm.sort_order) || 0,
            };
            const url = promptsEditId ? `/api/admin/ai-prompts/${promptsEditId}` : "/api/admin/ai-prompts";
            const method = promptsEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setPromptsMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setPromptsMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadPrompts();
            setTimeout(() => setPromptsView("list"), 1200);
          } catch (err) {
            setPromptsMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setPromptsSaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {promptsView === "list"
                  ? (isAr ? "💬 إدارة المطالبات" : "💬 Prompts CMS")
                  : (promptsEditId ? (isAr ? "✏️ تعديل مطالبة" : "✏️ Edit Prompt") : (isAr ? "✏️ مطالبة جديدة" : "✏️ New Prompt"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {promptsView === "list" ? (
                  <>
                    <button onClick={loadPrompts} disabled={promptsLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={promptsLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "مطالبة جديدة" : "New Prompt"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setPromptsView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة المطالبات" : "Prompt List"}
                  </button>
                )}
              </div>
            </div>

            {promptsMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: promptsMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: promptsMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {promptsMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {promptsView === "list" && (
              <div className="flex flex-col gap-3">
                {promptsLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : promptsDbRows.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">💬</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد مطالبات في قاعدة البيانات بعد. اضغط «تحديث» أو «مطالبة جديدة»." : "No prompts in DB yet. Click «Refresh» or «New Prompt»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v24 في Supabase أولاً." : "Remember to apply migration v24 in Supabase first."}</p>
                  </div>
                ) : (
                  promptsDbRows.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category} · {row.difficulty} · {row.best_model}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.title_ar}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/prompts`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {promptsView === "form" && (
              <form onSubmit={handleSavePrompt} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "العنوان (عربي) *" : "Title (Arabic) *"}
                      value={promptsForm.title_ar}
                      onChange={(v) => {
                        setPromptsForm((f) => ({ ...f, title_ar: v }));
                        if (!promptsEditId && !promptsForm.id) setPromptsForm((f) => ({ ...f, id: slugifyId(v || promptsForm.title_en) }));
                      }}
                      placeholder="بناء موقع ويب كامل"
                      dir="rtl"
                      required
                    />
                    <AdminTextField
                      label={isAr ? "العنوان (إنجليزي)" : "Title (English)"}
                      value={promptsForm.title_en}
                      onChange={(v) => {
                        setPromptsForm((f) => ({ ...f, title_en: v }));
                        if (!promptsEditId && !promptsForm.id) setPromptsForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="Build a Complete Website"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={promptsForm.id}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="build-website"
                      required
                      mono
                      dir="ltr"
                    />
                    <AdminSelectField
                      label={isAr ? "الفئة" : "Category"}
                      value={promptsForm.category}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, category: v }))}
                      options={PROMPT_CAT_OPTIONS}
                    />
                    <AdminSelectField
                      label={isAr ? "مستوى الصعوبة" : "Difficulty"}
                      value={promptsForm.difficulty}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, difficulty: v as typeof promptsForm.difficulty }))}
                      options={DIFFICULTY_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "حالة الاستخدام (عربي)" : "Use Case (Arabic)"}
                      value={promptsForm.use_case_ar}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, use_case_ar: v }))}
                      placeholder="بناء مواقع ويب من الصفر"
                      dir="rtl"
                    />
                    <AdminTextField
                      label={isAr ? "حالة الاستخدام (إنجليزي)" : "Use Case (English)"}
                      value={promptsForm.use_case_en}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, use_case_en: v }))}
                      placeholder="Building websites from scratch"
                    />
                  </div>

                  <AdminTextAreaField
                    label={isAr ? "نص المطالبة *" : "Prompt Text *"}
                    value={promptsForm.prompt_text}
                    onChange={(v) => setPromptsForm((f) => ({ ...f, prompt_text: v }))}
                    placeholder="You are a senior full-stack developer..."
                    required
                    dir="ltr"
                    rows={8}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "أفضل نموذج" : "Best Model"}
                      value={promptsForm.best_model}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, best_model: v }))}
                      placeholder="Claude Sonnet"
                    />
                    <AdminTagsField
                      label={isAr ? "الوسوم" : "Tags"}
                      value={promptsForm.tags}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, tags: v }))}
                      placeholder="web, fullstack, coding"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(promptsForm.sort_order) || 0}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                    <AdminStatusField
                      value={promptsForm.status}
                      onChange={(v) => setPromptsForm((f) => ({ ...f, status: v }))}
                      label={isAr ? "الحالة" : "Status"}
                    />
                  </div>
                  <AdminToggleField
                    label={isAr ? "مطالبة مميزة" : "Featured"}
                    checked={promptsForm.featured}
                    onChange={(v) => setPromptsForm((f) => ({ ...f, featured: v }))}
                  />
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={promptsSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {promptsSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (promptsEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر المطالبة" : "💾 Publish Prompt"))}
                  </button>
                  <button type="button" onClick={() => setPromptsView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "ai-courses-cms" && (() => {
        const COURSE_CAT_OPTIONS = courseCategories.map((c) => ({ value: c, label: c }));
        const LEVEL_OPTIONS = [
          { value: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
          { value: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
          { value: "advanced", label: isAr ? "متقدم" : "Advanced" },
        ];

        async function loadCourses() {
          setCoursesLoading(true);
          setCoursesMsg(null);
          try {
            const res = await fetch("/api/admin/ai-courses");
            if (res.ok) setCoursesDbRows(await res.json());
          } catch { /* silent */ } finally { setCoursesLoading(false); }
        }

        function openCreate() {
          setCoursesEditId(null);
          setCoursesForm(COURSES_FORM_DEFAULT);
          setCoursesMsg(null);
          setCoursesView("form");
        }

        async function openEdit(row: DbCourseRow) {
          setCoursesMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-courses/${row.id}`);
            if (!res.ok) { setCoursesMsg({ type: "err", text: isAr ? "فشل تحميل الدورة" : "Failed to load course" }); return; }
            const data = await res.json();
            setCoursesForm({
              id:                data.id ?? "",
              title_ar:          data.title_ar ?? "",
              title_en:          data.title_en ?? "",
              description_ar:    data.description_ar ?? "",
              description_en:    data.description_en ?? "",
              category:          data.category ?? "AI",
              level:             data.level ?? "beginner",
              lessons:           String(data.lessons ?? 0),
              hours:             String(data.hours ?? 0),
              projects:          String(data.projects ?? 0),
              skills:            (data.skills ?? []).join(", "),
              icon:              data.icon ?? "🧠",
              color:             data.color ?? "blue",
              coming_soon:       data.coming_soon ?? false,
              overview_ar:       data.overview_ar ?? "",
              overview_en:       data.overview_en ?? "",
              for_who_ar:        (data.for_who_ar ?? []).join(", "),
              for_who_en:        (data.for_who_en ?? []).join(", "),
              what_you_learn_ar: (data.what_you_learn_ar ?? []).join(", "),
              what_you_learn_en: (data.what_you_learn_en ?? []).join(", "),
              tools_required:    (data.tools_required ?? []).join(", "),
              related_projects:  (data.related_projects ?? []).join(", "),
              related_courses:   (data.related_courses ?? []).join(", "),
              lesson_outline:    data.lesson_outline ? JSON.stringify(data.lesson_outline, null, 2) : "",
              quiz:              data.quiz ? JSON.stringify(data.quiz, null, 2) : "",
              featured:          data.featured ?? false,
              status:            data.status ?? "published",
              sort_order:        String(data.sort_order ?? 0),
            });
            setCoursesEditId(row.id);
            setCoursesView("form");
          } catch { setCoursesMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbCourseRow) {
          if (!confirm(isAr ? `أرشفة "${row.title_ar}"؟` : `Archive "${row.title_ar}"?`)) return;
          const res = await fetch(`/api/admin/ai-courses/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setCoursesDbRows((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbCourseRow) {
          if (!confirm(isAr ? `حذف "${row.title_ar}" نهائياً؟` : `Delete "${row.title_ar}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-courses/${row.id}`, { method: "DELETE" });
          if (res.ok) { setCoursesDbRows((p) => p.filter((x) => x.id !== row.id)); }
        }

        function parseJsonField(raw: string, label: string): { ok: true; value: unknown } | { ok: false; error: string } {
          if (!raw.trim()) return { ok: true, value: null };
          try { return { ok: true, value: JSON.parse(raw) }; }
          catch { return { ok: false, error: isAr ? `صيغة JSON غير صحيحة في ${label}` : `Invalid JSON in ${label}` }; }
        }

        async function handleSaveCourse(e: React.FormEvent) {
          e.preventDefault();
          setCoursesSaving(true);
          setCoursesMsg(null);
          try {
            const lessonOutline = parseJsonField(coursesForm.lesson_outline, "lesson_outline");
            if (!lessonOutline.ok) { setCoursesMsg({ type: "err", text: lessonOutline.error }); return; }
            const quiz = parseJsonField(coursesForm.quiz, "quiz");
            if (!quiz.ok) { setCoursesMsg({ type: "err", text: quiz.error }); return; }

            const payload = {
              id:                coursesForm.id,
              title_ar:          coursesForm.title_ar,
              title_en:          coursesForm.title_en,
              description_ar:    coursesForm.description_ar,
              description_en:    coursesForm.description_en,
              category:          coursesForm.category,
              level:             coursesForm.level,
              lessons:           Number(coursesForm.lessons) || 0,
              hours:             Number(coursesForm.hours) || 0,
              projects:          Number(coursesForm.projects) || 0,
              skills:            parseTags(coursesForm.skills),
              icon:              coursesForm.icon,
              color:             coursesForm.color,
              coming_soon:       coursesForm.coming_soon,
              overview_ar:       coursesForm.overview_ar,
              overview_en:       coursesForm.overview_en,
              for_who_ar:        parseTags(coursesForm.for_who_ar),
              for_who_en:        parseTags(coursesForm.for_who_en),
              what_you_learn_ar: parseTags(coursesForm.what_you_learn_ar),
              what_you_learn_en: parseTags(coursesForm.what_you_learn_en),
              tools_required:    parseTags(coursesForm.tools_required),
              related_projects:  parseTags(coursesForm.related_projects),
              related_courses:   parseTags(coursesForm.related_courses),
              lesson_outline:    lessonOutline.value,
              quiz:              quiz.value,
              featured:          coursesForm.featured,
              status:            coursesForm.status,
              sort_order:        Number(coursesForm.sort_order) || 0,
            };
            const url = coursesEditId ? `/api/admin/ai-courses/${coursesEditId}` : "/api/admin/ai-courses";
            const method = coursesEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setCoursesMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setCoursesMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadCourses();
            setTimeout(() => setCoursesView("list"), 1200);
          } catch (err) {
            setCoursesMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setCoursesSaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {coursesView === "list"
                  ? (isAr ? "🎓 إدارة الدورات" : "🎓 Courses CMS")
                  : (coursesEditId ? (isAr ? "✏️ تعديل دورة" : "✏️ Edit Course") : (isAr ? "✏️ دورة جديدة" : "✏️ New Course"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {coursesView === "list" ? (
                  <>
                    <button onClick={loadCourses} disabled={coursesLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={coursesLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "دورة جديدة" : "New Course"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setCoursesView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة الدورات" : "Course List"}
                  </button>
                )}
              </div>
            </div>

            {coursesMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: coursesMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: coursesMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {coursesMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {coursesView === "list" && (
              <div className="flex flex-col gap-3">
                {coursesLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : coursesDbRows.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">🎓</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد دورات في قاعدة البيانات بعد. اضغط «تحديث» أو «دورة جديدة»." : "No courses in DB yet. Click «Refresh» or «New Course»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v25 في Supabase أولاً." : "Remember to apply migration v25 in Supabase first."}</p>
                  </div>
                ) : (
                  coursesDbRows.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category} · {row.level}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.title_ar}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/courses`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {coursesView === "form" && (
              <form onSubmit={handleSaveCourse} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "العنوان (عربي) *" : "Title (Arabic) *"}
                      value={coursesForm.title_ar}
                      onChange={(v) => {
                        setCoursesForm((f) => ({ ...f, title_ar: v }));
                        if (!coursesEditId && !coursesForm.id) setCoursesForm((f) => ({ ...f, id: slugifyId(v || coursesForm.title_en) }));
                      }}
                      placeholder="أساسيات الذكاء الاصطناعي"
                      dir="rtl"
                      required
                    />
                    <AdminTextField
                      label={isAr ? "العنوان (إنجليزي)" : "Title (English)"}
                      value={coursesForm.title_en}
                      onChange={(v) => {
                        setCoursesForm((f) => ({ ...f, title_en: v }));
                        if (!coursesEditId && !coursesForm.id) setCoursesForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="AI Fundamentals"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={coursesForm.id}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="ai-fundamentals"
                      required
                      mono
                      dir="ltr"
                    />
                    <AdminSelectField
                      label={isAr ? "الفئة" : "Category"}
                      value={coursesForm.category}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, category: v }))}
                      options={COURSE_CAT_OPTIONS}
                    />
                    <AdminSelectField
                      label={isAr ? "المستوى" : "Level"}
                      value={coursesForm.level}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, level: v as typeof coursesForm.level }))}
                      options={LEVEL_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "الوصف (عربي) *" : "Description (Arabic) *"}
                      value={coursesForm.description_ar}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, description_ar: v }))}
                      placeholder="وصف مختصر للدورة"
                      dir="rtl"
                      required
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "الوصف (إنجليزي)" : "Description (English)"}
                      value={coursesForm.description_en}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, description_en: v }))}
                      placeholder="Short course description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "نظرة عامة (عربي)" : "Overview (Arabic)"}
                      value={coursesForm.overview_ar}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, overview_ar: v }))}
                      placeholder="نظرة عامة موسّعة عن الدورة"
                      dir="rtl"
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "نظرة عامة (إنجليزي)" : "Overview (English)"}
                      value={coursesForm.overview_en}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, overview_en: v }))}
                      placeholder="Extended course overview"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <AdminTextField
                      label={isAr ? "عدد الدروس" : "Lessons"}
                      value={coursesForm.lessons}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, lessons: v.replace(/[^0-9]/g, "") }))}
                      placeholder="8"
                      mono
                      dir="ltr"
                    />
                    <AdminTextField
                      label={isAr ? "عدد الساعات" : "Hours"}
                      value={coursesForm.hours}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, hours: v.replace(/[^0-9]/g, "") }))}
                      placeholder="12"
                      mono
                      dir="ltr"
                    />
                    <AdminTextField
                      label={isAr ? "عدد المشاريع" : "Projects"}
                      value={coursesForm.projects}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, projects: v.replace(/[^0-9]/g, "") }))}
                      placeholder="2"
                      mono
                      dir="ltr"
                    />
                    <AdminTextField
                      label={isAr ? "الأيقونة" : "Icon"}
                      value={coursesForm.icon}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, icon: v }))}
                      placeholder="🧠"
                    />
                    <AdminTextField
                      label={isAr ? "اللون" : "Color"}
                      value={coursesForm.color}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, color: v }))}
                      placeholder="blue"
                      mono
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "تفاصيل إضافية (مفصولة بفواصل)" : "Extra Details (comma-separated)"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "المهارات" : "Skills"}
                      value={coursesForm.skills}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, skills: v }))}
                      placeholder="Prompting, RAG, Fine-tuning"
                    />
                    <AdminTagsField
                      label={isAr ? "الأدوات المطلوبة" : "Tools Required"}
                      value={coursesForm.tools_required}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, tools_required: v }))}
                      placeholder="ChatGPT, VS Code"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "لمن هذه الدورة (عربي)" : "For Who (Arabic)"}
                      value={coursesForm.for_who_ar}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, for_who_ar: v }))}
                      placeholder="المبتدئين, المطورين"
                    />
                    <AdminTagsField
                      label={isAr ? "لمن هذه الدورة (إنجليزي)" : "For Who (English)"}
                      value={coursesForm.for_who_en}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, for_who_en: v }))}
                      placeholder="Beginners, Developers"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "ماذا ستتعلم (عربي)" : "What You'll Learn (Arabic)"}
                      value={coursesForm.what_you_learn_ar}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, what_you_learn_ar: v }))}
                      placeholder="بناء المطالبات, التكامل مع APIs"
                    />
                    <AdminTagsField
                      label={isAr ? "ماذا ستتعلم (إنجليزي)" : "What You'll Learn (English)"}
                      value={coursesForm.what_you_learn_en}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, what_you_learn_en: v }))}
                      placeholder="Prompt engineering, API integration"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "مشاريع مرتبطة (IDs)" : "Related Projects (IDs)"}
                      value={coursesForm.related_projects}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, related_projects: v }))}
                      placeholder="ai-chatbot, image-classifier"
                    />
                    <AdminTagsField
                      label={isAr ? "دورات مرتبطة (IDs)" : "Related Courses (IDs)"}
                      value={coursesForm.related_courses}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, related_courses: v }))}
                      placeholder="ai-fundamentals, prompt-engineering"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "محتوى الدورة (JSON خام)" : "Course Content (raw JSON)"}</h3>
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr
                      ? "أدخل مصفوفة JSON صالحة (أو اتركها فارغة). مثال للدرس: { \"titleAr\": \"...\", \"titleEn\": \"...\", \"type\": \"video\", \"duration\": \"10 mins\" }"
                      : "Enter a valid JSON array (or leave empty). Lesson shape: { \"titleAr\": \"...\", \"titleEn\": \"...\", \"type\": \"video\", \"duration\": \"10 mins\" }"}
                  </p>
                  <AdminTextAreaField
                    label={isAr ? "مخطط الدروس (lessonOutline)" : "Lesson Outline (lessonOutline)"}
                    value={coursesForm.lesson_outline}
                    onChange={(v) => setCoursesForm((f) => ({ ...f, lesson_outline: v }))}
                    placeholder='[{"titleAr":"مقدمة","titleEn":"Intro","type":"video","duration":"10 mins"}]'
                    dir="ltr"
                    rows={8}
                  />
                  <AdminTextAreaField
                    label={isAr ? "الاختبار (quiz)" : "Quiz (quiz)"}
                    value={coursesForm.quiz}
                    onChange={(v) => setCoursesForm((f) => ({ ...f, quiz: v }))}
                    placeholder='[{"questionAr":"...","questionEn":"...","options":["A","B"],"correctIndex":0}]'
                    dir="ltr"
                    rows={6}
                  />
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(coursesForm.sort_order) || 0}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                    <AdminStatusField
                      value={coursesForm.status}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, status: v }))}
                      label={isAr ? "الحالة" : "Status"}
                    />
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <AdminToggleField
                      label={isAr ? "دورة مميزة" : "Featured"}
                      checked={coursesForm.featured}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, featured: v }))}
                    />
                    <AdminToggleField
                      label={isAr ? "قريباً (Coming Soon)" : "Coming Soon"}
                      checked={coursesForm.coming_soon}
                      onChange={(v) => setCoursesForm((f) => ({ ...f, coming_soon: v }))}
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={coursesSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {coursesSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (coursesEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر الدورة" : "💾 Publish Course"))}
                  </button>
                  <button type="button" onClick={() => setCoursesView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "ai-projects-cms" && (() => {
        const PROJECT_CAT_OPTIONS = projectCategories.map((c) => ({ value: c, label: c }));
        const DIFFICULTY_OPTIONS = [
          { value: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
          { value: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
          { value: "advanced", label: isAr ? "متقدم" : "Advanced" },
        ];

        async function loadProjects() {
          setProjectsLoading(true);
          setProjectsMsg(null);
          try {
            const res = await fetch("/api/admin/ai-projects");
            if (res.ok) setProjectsDbRows(await res.json());
          } catch { /* silent */ } finally { setProjectsLoading(false); }
        }

        function openCreate() {
          setProjectsEditId(null);
          setProjectsForm(PROJECTS_FORM_DEFAULT);
          setProjectsMsg(null);
          setProjectsView("form");
        }

        async function openEdit(row: DbProjectRow) {
          setProjectsMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-projects/${row.id}`);
            if (!res.ok) { setProjectsMsg({ type: "err", text: isAr ? "فشل تحميل المشروع" : "Failed to load project" }); return; }
            const data = await res.json();
            setProjectsForm({
              id:                 data.id ?? "",
              title_ar:           data.title_ar ?? "",
              title_en:           data.title_en ?? "",
              description_ar:     data.description_ar ?? "",
              description_en:     data.description_en ?? "",
              category:           data.category ?? "AI",
              difficulty:         data.difficulty ?? "beginner",
              stack:              (data.stack ?? []).join(", "),
              skills:             (data.skills ?? []).join(", "),
              expected_output:    data.expected_output ?? "",
              expected_output_ar: data.expected_output_ar ?? "",
              future_idea:        data.future_idea ?? "",
              future_idea_ar:     data.future_idea_ar ?? "",
              icon:               data.icon ?? "🚀",
              goal_ar:            data.goal_ar ?? "",
              goal_en:            data.goal_en ?? "",
              build_steps:        data.build_steps ? JSON.stringify(data.build_steps, null, 2) : "",
              required_tools:     (data.required_tools ?? []).join(", "),
              related_courses:    (data.related_courses ?? []).join(", "),
              related_tools:      (data.related_tools ?? []).join(", "),
              featured:           data.featured ?? false,
              status:             data.status ?? "published",
              sort_order:         String(data.sort_order ?? 0),
            });
            setProjectsEditId(row.id);
            setProjectsView("form");
          } catch { setProjectsMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbProjectRow) {
          if (!confirm(isAr ? `أرشفة "${row.title_ar}"؟` : `Archive "${row.title_ar}"?`)) return;
          const res = await fetch(`/api/admin/ai-projects/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setProjectsDbRows((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbProjectRow) {
          if (!confirm(isAr ? `حذف "${row.title_ar}" نهائياً؟` : `Delete "${row.title_ar}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-projects/${row.id}`, { method: "DELETE" });
          if (res.ok) { setProjectsDbRows((p) => p.filter((x) => x.id !== row.id)); }
        }

        function parseJsonField(raw: string, label: string): { ok: true; value: unknown } | { ok: false; error: string } {
          if (!raw.trim()) return { ok: true, value: null };
          try { return { ok: true, value: JSON.parse(raw) }; }
          catch { return { ok: false, error: isAr ? `صيغة JSON غير صحيحة في ${label}` : `Invalid JSON in ${label}` }; }
        }

        async function handleSaveProject(e: React.FormEvent) {
          e.preventDefault();
          setProjectsSaving(true);
          setProjectsMsg(null);
          try {
            const buildSteps = parseJsonField(projectsForm.build_steps, "build_steps");
            if (!buildSteps.ok) { setProjectsMsg({ type: "err", text: buildSteps.error }); return; }

            const payload = {
              id:                 projectsForm.id,
              title_ar:           projectsForm.title_ar,
              title_en:           projectsForm.title_en,
              description_ar:     projectsForm.description_ar,
              description_en:     projectsForm.description_en,
              category:           projectsForm.category,
              difficulty:         projectsForm.difficulty,
              stack:              parseTags(projectsForm.stack),
              skills:             parseTags(projectsForm.skills),
              expected_output:    projectsForm.expected_output,
              expected_output_ar: projectsForm.expected_output_ar,
              future_idea:        projectsForm.future_idea,
              future_idea_ar:     projectsForm.future_idea_ar,
              icon:               projectsForm.icon,
              goal_ar:            projectsForm.goal_ar,
              goal_en:            projectsForm.goal_en,
              build_steps:        buildSteps.value,
              required_tools:     parseTags(projectsForm.required_tools),
              related_courses:    parseTags(projectsForm.related_courses),
              related_tools:      parseTags(projectsForm.related_tools),
              featured:           projectsForm.featured,
              status:             projectsForm.status,
              sort_order:         Number(projectsForm.sort_order) || 0,
            };
            const url = projectsEditId ? `/api/admin/ai-projects/${projectsEditId}` : "/api/admin/ai-projects";
            const method = projectsEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setProjectsMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setProjectsMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadProjects();
            setTimeout(() => setProjectsView("list"), 1200);
          } catch (err) {
            setProjectsMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setProjectsSaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {projectsView === "list"
                  ? (isAr ? "🚀 إدارة المشاريع" : "🚀 Projects CMS")
                  : (projectsEditId ? (isAr ? "✏️ تعديل مشروع" : "✏️ Edit Project") : (isAr ? "✏️ مشروع جديد" : "✏️ New Project"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {projectsView === "list" ? (
                  <>
                    <button onClick={loadProjects} disabled={projectsLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={projectsLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "مشروع جديد" : "New Project"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setProjectsView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة المشاريع" : "Project List"}
                  </button>
                )}
              </div>
            </div>

            {projectsMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: projectsMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: projectsMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {projectsMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {projectsView === "list" && (
              <div className="flex flex-col gap-3">
                {projectsLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : projectsDbRows.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">🚀</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد مشاريع في قاعدة البيانات بعد. اضغط «تحديث» أو «مشروع جديد»." : "No projects in DB yet. Click «Refresh» or «New Project»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v26 في Supabase أولاً." : "Remember to apply migration v26 in Supabase first."}</p>
                  </div>
                ) : (
                  projectsDbRows.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.category} · {row.difficulty}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.title_ar}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/projects`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {projectsView === "form" && (
              <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "العنوان (عربي) *" : "Title (Arabic) *"}
                      value={projectsForm.title_ar}
                      onChange={(v) => {
                        setProjectsForm((f) => ({ ...f, title_ar: v }));
                        if (!projectsEditId && !projectsForm.id) setProjectsForm((f) => ({ ...f, id: slugifyId(v || projectsForm.title_en) }));
                      }}
                      placeholder="روبوت محادثة PDF"
                      dir="rtl"
                      required
                    />
                    <AdminTextField
                      label={isAr ? "العنوان (إنجليزي)" : "Title (English)"}
                      value={projectsForm.title_en}
                      onChange={(v) => {
                        setProjectsForm((f) => ({ ...f, title_en: v }));
                        if (!projectsEditId && !projectsForm.id) setProjectsForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="PDF Chatbot"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={projectsForm.id}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="pdf-chatbot"
                      required
                      mono
                      dir="ltr"
                    />
                    <AdminSelectField
                      label={isAr ? "الفئة" : "Category"}
                      value={projectsForm.category}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, category: v }))}
                      options={PROJECT_CAT_OPTIONS}
                    />
                    <AdminSelectField
                      label={isAr ? "الصعوبة" : "Difficulty"}
                      value={projectsForm.difficulty}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, difficulty: v as typeof projectsForm.difficulty }))}
                      options={DIFFICULTY_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "الوصف (عربي) *" : "Description (Arabic) *"}
                      value={projectsForm.description_ar}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, description_ar: v }))}
                      placeholder="وصف مختصر للمشروع"
                      dir="rtl"
                      required
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "الوصف (إنجليزي)" : "Description (English)"}
                      value={projectsForm.description_en}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, description_en: v }))}
                      placeholder="Short project description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "الهدف (عربي)" : "Goal (Arabic)"}
                      value={projectsForm.goal_ar}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, goal_ar: v }))}
                      placeholder="هدف المشروع بالتفصيل"
                      dir="rtl"
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "الهدف (إنجليزي)" : "Goal (English)"}
                      value={projectsForm.goal_en}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, goal_en: v }))}
                      placeholder="Detailed project goal"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "الناتج المتوقع (عربي)" : "Expected Output (Arabic)"}
                      value={projectsForm.expected_output_ar}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, expected_output_ar: v }))}
                      placeholder="ما الذي ستحصل عليه عند الانتهاء"
                      dir="rtl"
                      rows={2}
                    />
                    <AdminTextAreaField
                      label={isAr ? "الناتج المتوقع (إنجليزي)" : "Expected Output (English)"}
                      value={projectsForm.expected_output}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, expected_output: v }))}
                      placeholder="What you'll have when done"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "فكرة مستقبلية (عربي)" : "Future Idea (Arabic)"}
                      value={projectsForm.future_idea_ar}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, future_idea_ar: v }))}
                      placeholder="كيف يمكن توسيع المشروع لاحقاً"
                      dir="rtl"
                      rows={2}
                    />
                    <AdminTextAreaField
                      label={isAr ? "فكرة مستقبلية (إنجليزي)" : "Future Idea (English)"}
                      value={projectsForm.future_idea}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, future_idea: v }))}
                      placeholder="How to expand this project later"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminTextField
                      label={isAr ? "الأيقونة" : "Icon"}
                      value={projectsForm.icon}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, icon: v }))}
                      placeholder="🚀"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "تفاصيل إضافية (مفصولة بفواصل)" : "Extra Details (comma-separated)"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTagsField
                      label={isAr ? "التقنيات (Stack)" : "Stack"}
                      value={projectsForm.stack}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, stack: v }))}
                      placeholder="Python, LangChain, OpenAI"
                    />
                    <AdminTagsField
                      label={isAr ? "المهارات" : "Skills"}
                      value={projectsForm.skills}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, skills: v }))}
                      placeholder="RAG, Embeddings, Prompting"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTagsField
                      label={isAr ? "الأدوات المطلوبة (IDs)" : "Required Tools (IDs)"}
                      value={projectsForm.required_tools}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, required_tools: v }))}
                      placeholder="chatgpt, vscode"
                    />
                    <AdminTagsField
                      label={isAr ? "دورات مرتبطة (IDs)" : "Related Courses (IDs)"}
                      value={projectsForm.related_courses}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, related_courses: v }))}
                      placeholder="ai-fundamentals, prompt-engineering"
                    />
                    <AdminTagsField
                      label={isAr ? "أدوات مرتبطة (IDs)" : "Related Tools (IDs)"}
                      value={projectsForm.related_tools}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, related_tools: v }))}
                      placeholder="langchain, pinecone"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "خطوات البناء (JSON خام)" : "Build Steps (raw JSON)"}</h3>
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr
                      ? "أدخل مصفوفة JSON صالحة (أو اتركها فارغة). شكل الخطوة: { \"stepAr\": \"...\", \"stepEn\": \"...\", \"detailAr\": \"...\", \"detailEn\": \"...\" }"
                      : "Enter a valid JSON array (or leave empty). Step shape: { \"stepAr\": \"...\", \"stepEn\": \"...\", \"detailAr\": \"...\", \"detailEn\": \"...\" }"}
                  </p>
                  <AdminTextAreaField
                    label={isAr ? "خطوات البناء (buildSteps)" : "Build Steps (buildSteps)"}
                    value={projectsForm.build_steps}
                    onChange={(v) => setProjectsForm((f) => ({ ...f, build_steps: v }))}
                    placeholder='[{"stepAr":"التهيئة","stepEn":"Setup","detailAr":"...","detailEn":"..."}]'
                    dir="ltr"
                    rows={8}
                  />
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(projectsForm.sort_order) || 0}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                    <AdminStatusField
                      value={projectsForm.status}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, status: v }))}
                      label={isAr ? "الحالة" : "Status"}
                    />
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <AdminToggleField
                      label={isAr ? "مشروع مميز" : "Featured"}
                      checked={projectsForm.featured}
                      onChange={(v) => setProjectsForm((f) => ({ ...f, featured: v }))}
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={projectsSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {projectsSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (projectsEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر المشروع" : "💾 Publish Project"))}
                  </button>
                  <button type="button" onClick={() => setProjectsView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "ai-paths-cms" && (() => {
        const LEVEL_OPTIONS = [
          { value: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
          { value: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
          { value: "advanced", label: isAr ? "متقدم" : "Advanced" },
        ];

        async function loadPaths() {
          setPathsLoading(true);
          setPathsMsg(null);
          try {
            const res = await fetch("/api/admin/ai-paths");
            if (res.ok) setPathsDbRows(await res.json());
          } catch { /* silent */ } finally { setPathsLoading(false); }
        }

        function openCreate() {
          setPathsEditId(null);
          setPathsForm(PATHS_FORM_DEFAULT);
          setPathsMsg(null);
          setPathsView("form");
        }

        async function openEdit(row: DbPathRow) {
          setPathsMsg(null);
          try {
            const res = await fetch(`/api/admin/ai-paths/${row.id}`);
            if (!res.ok) { setPathsMsg({ type: "err", text: isAr ? "فشل تحميل المسار" : "Failed to load path" }); return; }
            const data = await res.json();
            setPathsForm({
              id:             data.id ?? "",
              title_ar:       data.title_ar ?? "",
              title_en:       data.title_en ?? "",
              description_ar: data.description_ar ?? "",
              description_en: data.description_en ?? "",
              level:          data.level ?? "beginner",
              total_weeks:    String(data.total_weeks ?? 0),
              outcome:        data.outcome ?? "",
              outcome_ar:     data.outcome_ar ?? "",
              icon:           data.icon ?? "🚀",
              color:          data.color ?? "blue",
              nodes:          data.nodes ? JSON.stringify(data.nodes, null, 2) : "",
              featured:       data.featured ?? false,
              status:         data.status ?? "published",
              sort_order:     String(data.sort_order ?? 0),
            });
            setPathsEditId(row.id);
            setPathsView("form");
          } catch { setPathsMsg({ type: "err", text: "Error" }); }
        }

        async function handleArchive(row: DbPathRow) {
          if (!confirm(isAr ? `أرشفة "${row.title_ar}"؟` : `Archive "${row.title_ar}"?`)) return;
          const res = await fetch(`/api/admin/ai-paths/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
          if (res.ok) { setPathsDbRows((p) => p.map((x) => x.id === row.id ? { ...x, status: "archived" } : x)); }
        }

        async function handleDelete(row: DbPathRow) {
          if (!confirm(isAr ? `حذف "${row.title_ar}" نهائياً؟` : `Delete "${row.title_ar}" permanently?`)) return;
          const res = await fetch(`/api/admin/ai-paths/${row.id}`, { method: "DELETE" });
          if (res.ok) { setPathsDbRows((p) => p.filter((x) => x.id !== row.id)); }
        }

        function parseJsonField(raw: string, label: string): { ok: true; value: unknown } | { ok: false; error: string } {
          if (!raw.trim()) return { ok: true, value: [] };
          try { return { ok: true, value: JSON.parse(raw) }; }
          catch { return { ok: false, error: isAr ? `صيغة JSON غير صحيحة في ${label}` : `Invalid JSON in ${label}` }; }
        }

        async function handleSavePath(e: React.FormEvent) {
          e.preventDefault();
          setPathsSaving(true);
          setPathsMsg(null);
          try {
            const nodes = parseJsonField(pathsForm.nodes, "nodes");
            if (!nodes.ok) { setPathsMsg({ type: "err", text: nodes.error }); return; }

            const payload = {
              id:             pathsForm.id,
              title_ar:       pathsForm.title_ar,
              title_en:       pathsForm.title_en,
              description_ar: pathsForm.description_ar,
              description_en: pathsForm.description_en,
              level:          pathsForm.level,
              total_weeks:    Number(pathsForm.total_weeks) || 0,
              outcome:        pathsForm.outcome,
              outcome_ar:     pathsForm.outcome_ar,
              icon:           pathsForm.icon,
              color:          pathsForm.color,
              nodes:          nodes.value,
              featured:       pathsForm.featured,
              status:         pathsForm.status,
              sort_order:     Number(pathsForm.sort_order) || 0,
            };
            const url = pathsEditId ? `/api/admin/ai-paths/${pathsEditId}` : "/api/admin/ai-paths";
            const method = pathsEditId ? "PATCH" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!res.ok) {
              const j = await res.json().catch(() => ({} as { error?: string }));
              setPathsMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
              return;
            }
            setPathsMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
            await loadPaths();
            setTimeout(() => setPathsView("list"), 1200);
          } catch (err) {
            setPathsMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
          } finally {
            setPathsSaving(false);
          }
        }

        const slugifyId = (text: string) => text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);

        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {pathsView === "list"
                  ? (isAr ? "🗺️ إدارة المسارات" : "🗺️ Paths CMS")
                  : (pathsEditId ? (isAr ? "✏️ تعديل مسار" : "✏️ Edit Path") : (isAr ? "✏️ مسار جديد" : "✏️ New Path"))}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {pathsView === "list" ? (
                  <>
                    <button onClick={loadPaths} disabled={pathsLoading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <RefreshCw size={12} className={pathsLoading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                      + {isAr ? "مسار جديد" : "New Path"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setPathsView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    ← {isAr ? "قائمة المسارات" : "Path List"}
                  </button>
                )}
              </div>
            </div>

            {pathsMsg && (
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: pathsMsg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: pathsMsg.type === "ok" ? "#4ade80" : "#f87171" }}>
                {pathsMsg.text}
              </p>
            )}

            {/* ── LIST VIEW ── */}
            {pathsView === "list" && (
              <div className="flex flex-col gap-3">
                {pathsLoading ? (
                  <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
                ) : pathsDbRows.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-3xl mb-3">🗺️</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد مسارات في قاعدة البيانات بعد. اضغط «تحديث» أو «مسار جديد»." : "No paths in DB yet. Click «Refresh» or «New Path»."}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "تذكّر تطبيق migration v27 في Supabase أولاً." : "Remember to apply migration v27 in Supabase first."}</p>
                  </div>
                ) : (
                  pathsDbRows.map((row) => (
                    <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                            {row.status}
                          </span>
                          {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                          <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{row.level} · {row.total_weeks}w</span>
                        </div>
                        <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{row.title_ar}</p>
                        <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href={`/ar/paths`} target="_blank" rel="noreferrer" className="text-xs font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)", textDecoration: "none" }}>
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
            {pathsView === "form" && (
              <form onSubmit={handleSavePath} className="flex flex-col gap-5">
                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextField
                      label={isAr ? "العنوان (عربي) *" : "Title (Arabic) *"}
                      value={pathsForm.title_ar}
                      onChange={(v) => {
                        setPathsForm((f) => ({ ...f, title_ar: v }));
                        if (!pathsEditId && !pathsForm.id) setPathsForm((f) => ({ ...f, id: slugifyId(v || pathsForm.title_en) }));
                      }}
                      placeholder="مسار المبتدئ في الذكاء الاصطناعي"
                      dir="rtl"
                      required
                    />
                    <AdminTextField
                      label={isAr ? "العنوان (إنجليزي)" : "Title (English)"}
                      value={pathsForm.title_en}
                      onChange={(v) => {
                        setPathsForm((f) => ({ ...f, title_en: v }));
                        if (!pathsEditId && !pathsForm.id) setPathsForm((f) => ({ ...f, id: slugifyId(v) }));
                      }}
                      placeholder="Beginner AI Path"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AdminTextField
                      label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                      value={pathsForm.id}
                      onChange={(v) => setPathsForm((f) => ({ ...f, id: slugifyId(v) }))}
                      placeholder="beginner-ai"
                      required
                      mono
                      dir="ltr"
                    />
                    <AdminSelectField
                      label={isAr ? "المستوى" : "Level"}
                      value={pathsForm.level}
                      onChange={(v) => setPathsForm((f) => ({ ...f, level: v as typeof pathsForm.level }))}
                      options={LEVEL_OPTIONS}
                    />
                    <AdminTextField
                      label={isAr ? "المدة (أسابيع)" : "Total Weeks"}
                      value={pathsForm.total_weeks}
                      onChange={(v) => setPathsForm((f) => ({ ...f, total_weeks: v.replace(/[^0-9]/g, "") }))}
                      placeholder="12"
                      mono
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "الوصف (عربي) *" : "Description (Arabic) *"}
                      value={pathsForm.description_ar}
                      onChange={(v) => setPathsForm((f) => ({ ...f, description_ar: v }))}
                      placeholder="وصف مختصر للمسار"
                      dir="rtl"
                      required
                      rows={3}
                    />
                    <AdminTextAreaField
                      label={isAr ? "الوصف (إنجليزي)" : "Description (English)"}
                      value={pathsForm.description_en}
                      onChange={(v) => setPathsForm((f) => ({ ...f, description_en: v }))}
                      placeholder="Short path description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminTextAreaField
                      label={isAr ? "النتيجة النهائية (عربي)" : "Outcome (Arabic)"}
                      value={pathsForm.outcome_ar}
                      onChange={(v) => setPathsForm((f) => ({ ...f, outcome_ar: v }))}
                      placeholder="ما الذي ستحققه بنهاية المسار"
                      dir="rtl"
                      rows={2}
                    />
                    <AdminTextAreaField
                      label={isAr ? "النتيجة النهائية (إنجليزي)" : "Outcome (English)"}
                      value={pathsForm.outcome}
                      onChange={(v) => setPathsForm((f) => ({ ...f, outcome: v }))}
                      placeholder="What you'll achieve by the end"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminTextField
                      label={isAr ? "الأيقونة" : "Icon"}
                      value={pathsForm.icon}
                      onChange={(v) => setPathsForm((f) => ({ ...f, icon: v }))}
                      placeholder="🚀"
                    />
                    <AdminTextField
                      label={isAr ? "اللون" : "Color"}
                      value={pathsForm.color}
                      onChange={(v) => setPathsForm((f) => ({ ...f, color: v }))}
                      placeholder="blue"
                      mono
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{isAr ? "عقد المسار (JSON خام)" : "Roadmap Nodes (raw JSON)"}</h3>
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr
                      ? "أدخل مصفوفة JSON صالحة. شكل العقدة: { \"id\":\"...\", \"titleAr\":\"...\", \"titleEn\":\"...\", \"descriptionAr\":\"...\", \"descriptionEn\":\"...\", \"duration\":\"2 weeks\", \"skills\":[\"...\"], \"status\":\"completed|active|upcoming\", \"courseId\":\"...\" (اختياري) }"
                      : "Enter a valid JSON array. Node shape: { \"id\":\"...\", \"titleAr\":\"...\", \"titleEn\":\"...\", \"descriptionAr\":\"...\", \"descriptionEn\":\"...\", \"duration\":\"2 weeks\", \"skills\":[\"...\"], \"status\":\"completed|active|upcoming\", \"courseId\":\"...\" (optional) }"}
                  </p>
                  <AdminTextAreaField
                    label={isAr ? "العقد (nodes)" : "Nodes (nodes)"}
                    value={pathsForm.nodes}
                    onChange={(v) => setPathsForm((f) => ({ ...f, nodes: v }))}
                    placeholder='[{"id":"b1","titleAr":"...","titleEn":"...","descriptionAr":"...","descriptionEn":"...","duration":"2 weeks","skills":["Python"],"status":"active","courseId":"python-for-ai"}]'
                    dir="ltr"
                    rows={10}
                  />
                </div>

                <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <AdminSortOrderField
                      label={isAr ? "ترتيب العرض" : "Sort order"}
                      value={Number(pathsForm.sort_order) || 0}
                      onChange={(v) => setPathsForm((f) => ({ ...f, sort_order: String(v) }))}
                    />
                    <AdminStatusField
                      value={pathsForm.status}
                      onChange={(v) => setPathsForm((f) => ({ ...f, status: v }))}
                      label={isAr ? "الحالة" : "Status"}
                    />
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <AdminToggleField
                      label={isAr ? "مسار مميز" : "Featured"}
                      checked={pathsForm.featured}
                      onChange={(v) => setPathsForm((f) => ({ ...f, featured: v }))}
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex gap-3">
                  <button type="submit" disabled={pathsSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
                    {pathsSaving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (pathsEditId ? (isAr ? "💾 حفظ التعديلات" : "💾 Save Changes") : (isAr ? "💾 نشر المسار" : "💾 Publish Path"))}
                  </button>
                  <button type="button" onClick={() => setPathsView("list")} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })()}

      {tab === "automation-cms" && <AutomationCMSPanel isAr={isAr} />}
      {tab === "iot-cms" && <IoTCMSPanel isAr={isAr} />}
      {tab === "exams-cms" && <ExamsCMSPanel isAr={isAr} />}
      {tab === "draft-preview" && <DraftContentReviewPanel isAr={isAr} />}

        </div>
      </div>
    </div>
  );
}
