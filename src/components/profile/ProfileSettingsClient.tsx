"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Save, Loader2, CheckCircle2, LogOut, BookOpen, Target, Clock, Globe, Upload, ImageIcon, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { UserLevel } from "@/lib/auth/roles";

interface Props { locale: string }

const INTERESTS_AR = ["الذكاء الاصطناعي", "تعلم الآلة", "السحابة", "Claude AI", "برمجة", "أتمتة", "نماذج اللغة", "صور AI"];
const INTERESTS_EN = ["Artificial Intelligence", "Machine Learning", "Cloud", "Claude AI", "Programming", "Automation", "LLMs", "AI Images"];

const LEVELS: { value: UserLevel; labelAr: string; labelEn: string; icon: string }[] = [
  { value: "beginner", labelAr: "مبتدئ", labelEn: "Beginner", icon: "🌱" },
  { value: "intermediate", labelAr: "متوسط", labelEn: "Intermediate", icon: "🚀" },
  { value: "advanced", labelAr: "متقدم", labelEn: "Advanced", icon: "⚡" },
];

const WEEKLY_TIMES = [
  { value: "1-3", labelAr: "١-٣ ساعات", labelEn: "1-3 hours" },
  { value: "4-7", labelAr: "٤-٧ ساعات", labelEn: "4-7 hours" },
  { value: "8+", labelAr: "٨+ ساعات", labelEn: "8+ hours" },
];

export default function ProfileSettingsClient({ locale }: Props) {
  const isAr = locale === "ar";
  const router = useRouter();
  const { user, profile, loading, isAuthenticated, supabaseConfigured } = useAuth();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [level, setLevel] = useState<UserLevel | "">("");
  const [goal, setGoal] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [weeklyTime, setWeeklyTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing profile data
  useEffect(() => {
    if (!profile || dataLoaded) return;
    setFullName(profile.full_name ?? "");
    setAvatarUrl(profile.avatar_url ?? "");
    setDataLoaded(true);

    // Load student profile
    if (!supabase || !user) return;
    Promise.all([
      supabase.from("student_profiles").select("*").eq("user_id", user.id).single(),
      supabase.from("public_profiles").select("username,bio,is_public").eq("user_id", user.id).single(),
    ]).then(([sp, pp]) => {
      if (sp.data) {
        setLevel((sp.data.level as UserLevel) ?? "");
        setGoal(sp.data.goal ?? "");
        setInterests(sp.data.interests ?? []);
        setWeeklyTime(sp.data.weekly_time ?? "");
      }
      if (pp.data) {
        setUsername(pp.data.username ?? "");
        setBio(pp.data.bio ?? "");
        setIsPublic(pp.data.is_public ?? false);
      }
    });
  }, [profile, user, dataLoaded, supabase]);

  // Handle file upload
  async function handleFileUpload(file: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError(isAr ? "يُسمح فقط بـ JPG, PNG, WebP" : "Only JPG, PNG, WebP allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError(isAr ? "الحجم الأقصى 2MB" : "Max size is 2MB");
      return;
    }
    setUploadError("");
    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    // Upload
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch("/api/avatar/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
        setAvatarPreview(null);
      } else {
        setUploadError(data.error ?? (isAr ? "فشل الرفع" : "Upload failed"));
      }
    } catch {
      setUploadError(isAr ? "خطأ في الاتصال" : "Connection error");
    } finally {
      setUploading(false);
    }
  }

  function importGoogleAvatar() {
    const googleAvatar = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;
    if (googleAvatar) {
      setAvatarUrl(googleAvatar);
    }
  }

  const toggleInterest = (item: string) => {
    setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSave = async () => {
    if (!supabase || !user) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      // Update profiles table
      const { error: e1 } = await supabase.from("profiles").update({
        full_name: fullName || null,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      }).eq("id", user.id);
      if (e1) throw e1;

      // Upsert student_profiles table
      const { error: e2 } = await supabase.from("student_profiles").upsert({
        user_id: user.id,
        level: level || null,
        goal: goal || null,
        interests: interests.length ? interests : null,
        weekly_time: weeklyTime || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      if (e2) throw e2;

      // Upsert public_profiles
      const { error: e3 } = await supabase.from("public_profiles").upsert({
        user_id: user.id,
        username: username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "") || null,
        bio: bio || null,
        is_public: isPublic,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      if (e3) console.warn("public_profiles upsert:", e3.message);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(isAr ? "حدث خطأ أثناء الحفظ" : "Failed to save changes");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin" size={32} style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!supabaseConfigured || !isAuthenticated) {
    return (
      <div className="container-xl py-20 text-center">
        <p className="text-5xl mb-4">🔒</p>
        <p className="text-lg mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "يجب تسجيل الدخول أولاً" : "Please sign in first"}
        </p>
        <a href={`/${locale}/login`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
          style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </a>
      </div>
    );
  }

  const interestsList = isAr ? INTERESTS_AR : INTERESTS_EN;

  return (
    <div className="container-xl py-12 max-w-3xl mx-auto">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "إعدادات الحساب" : "Account Settings"}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
              {user?.email}
            </p>
          </div>
          <button onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--color-error)", border: "1px solid var(--color-error)30" }}>
            <LogOut size={16} />
            {isAr ? "خروج" : "Sign Out"}
          </button>
        </div>

        {/* Avatar & Name */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <User size={18} style={{ color: "var(--color-primary)" }} />
            {isAr ? "المعلومات الأساسية" : "Basic Information"}
          </h2>

          {/* Avatar upload */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center relative"
                style={{ background: "var(--color-surface-container)" }}>
                {(avatarPreview ?? avatarUrl) ? (
                  <img src={avatarPreview ?? avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} style={{ color: "var(--color-on-surface-variant)" }} />
                )}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Loader2 size={20} className="animate-spin text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {/* Upload from device */}
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-xl disabled:opacity-50 transition-all hover:opacity-80" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
                  <Upload size={12} /> {isAr ? "رفع صورة من الجهاز" : "Upload from device"}
                </button>
                {/* Import from Google */}
                {(user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture) && (
                  <button onClick={importGoogleAvatar} className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(66,133,244,0.1)", color: "#4285f4", border: "1px solid rgba(66,133,244,0.2)" }}>
                    <ImageIcon size={12} /> {isAr ? "استيراد صورة Google" : "Import Google photo"}
                  </button>
                )}
                {/* Remove */}
                {(avatarUrl ?? avatarPreview) && (
                  <button onClick={() => { setAvatarUrl(""); setAvatarPreview(null); }} className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <Trash2 size={12} /> {isAr ? "إزالة الصورة" : "Remove photo"}
                  </button>
                )}
              </div>
            </div>
            {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "JPG, PNG, WebP · أقصى حجم 2MB" : "JPG, PNG, WebP · Max 2MB"}
            </p>
          </div>

          {/* Full name */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "الاسم الكامل" : "Full Name"}
            </label>
            <input value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder={isAr ? "أحمد محمد" : "Ahmed Mohamed"}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }} />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "اسم المستخدم (للملف العام)" : "Username (for public profile)"}
            </label>
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>@</span>
              <input value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                placeholder="yourname"
                className="w-full rounded-xl ps-7 pe-4 py-2.5 text-sm outline-none font-mono"
                style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }} />
            </div>
            {username && <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>darhous-ai-cloud-academy.vercel.app/u/{username}</p>}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "نبذة قصيرة" : "Bio"}
            </label>
            <textarea value={bio} onChange={e => setBio(e.target.value)}
              placeholder={isAr ? "مطور شغوف بالذكاء الاصطناعي..." : "Passionate AI developer..."}
              rows={3} maxLength={280}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }}
              dir={isAr ? "rtl" : "ltr"} />
          </div>

          {/* Public profile toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "الملف العام" : "Public Profile"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "اجعل ملفك مرئياً للعموم وتظهر في لوحة المتصدرين" : "Make your profile visible and appear on the leaderboard"}
              </p>
            </div>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-xl transition-all"
              style={{ background: isPublic ? "rgba(74,222,128,0.15)" : "var(--color-surface-container)", color: isPublic ? "#4ade80" : "var(--color-on-surface-variant)", border: `1px solid ${isPublic ? "rgba(74,222,128,0.3)" : "var(--color-outline-variant)"}` }}
            >
              {isPublic ? <Eye size={12} /> : <EyeOff size={12} />}
              {isPublic ? (isAr ? "عام" : "Public") : (isAr ? "خاص" : "Private")}
            </button>
          </div>
        </div>

        {/* Learning Level */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <BookOpen size={18} style={{ color: "var(--color-secondary)" }} />
            {isAr ? "مستواك في التعلم" : "Learning Level"}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {LEVELS.map(l => (
              <button key={l.value} onClick={() => setLevel(l.value)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-sm font-medium"
                style={{
                  background: level === l.value ? "var(--color-primary)15" : "var(--color-surface-container)",
                  border: `1px solid ${level === l.value ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                  color: level === l.value ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                }}>
                <span className="text-2xl">{l.icon}</span>
                {isAr ? l.labelAr : l.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Target size={18} style={{ color: "var(--color-tertiary)" }} />
            {isAr ? "اهتماماتك" : "Your Interests"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {interestsList.map((item) => (
              <button key={item} onClick={() => toggleInterest(item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: interests.includes(item) ? "var(--color-primary)" : "var(--color-surface-container)",
                  color: interests.includes(item) ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                  border: `1px solid ${interests.includes(item) ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Goal & Weekly Time */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Clock size={18} style={{ color: "var(--color-primary)" }} />
            {isAr ? "خططك" : "Your Plans"}
          </h2>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "هدفك الرئيسي" : "Main Goal"}
            </label>
            <textarea value={goal} onChange={e => setGoal(e.target.value)} rows={3}
              placeholder={isAr ? "مثل: أريد الانتقال إلى مجال AI..." : "e.g. I want to transition to AI field..."}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
              style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }} />
          </div>
          <div>
            <label className="block text-xs mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
              <Clock size={12} className="inline me-1" />
              {isAr ? "وقتك الأسبوعي للتعلم" : "Weekly Learning Time"}
            </label>
            <div className="flex gap-2">
              {WEEKLY_TIMES.map(t => (
                <button key={t.value} onClick={() => setWeeklyTime(t.value)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: weeklyTime === t.value ? "var(--color-primary)15" : "var(--color-surface-container)",
                    border: `1px solid ${weeklyTime === t.value ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                    color: weeklyTime === t.value ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  }}>
                  {isAr ? t.labelAr : t.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferred Language */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
          <Globe size={18} style={{ color: "var(--color-primary)" }} />
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "اللغة المفضلة للمنصة" : "Preferred Platform Language"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "يمكن التغيير من قائمة اللغة أعلى الصفحة" : "Change via the language menu at the top"}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono"
            style={{ background: "var(--color-primary)15", color: "var(--color-primary)" }}>
            {isAr ? "العربية" : "English"}
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-center" style={{ color: "var(--color-error)" }}>{error}</p>
        )}

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving}
          className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-98 disabled:opacity-60"
          style={{ background: saved ? "var(--color-tertiary)" : "var(--color-primary)", color: saved ? "var(--color-on-tertiary)" : "var(--color-on-primary)" }}>
          {saving ? <Loader2 size={18} className="animate-spin" />
            : saved ? <CheckCircle2 size={18} />
            : <Save size={18} />}
          {saving ? (isAr ? "جاري الحفظ..." : "Saving...")
            : saved ? (isAr ? "تم الحفظ ✓" : "Saved ✓")
            : (isAr ? "حفظ التغييرات" : "Save Changes")}
        </button>

      </div>
    </div>
  );
}
