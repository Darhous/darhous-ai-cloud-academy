"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Download, Share2, LogIn, Loader2, ExternalLink, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { courses } from "@/data/courses";

interface Certificate {
  id: string;
  course_slug: string;
  course_title: string;
  certificate_code: string;
  issued_at: string;
}

interface CourseProgress {
  course_slug: string;
  progress_percent: number;
  status: string;
}

const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";

function CertificateCard({ cert, isAr, locale }: { cert: Certificate; isAr: boolean; locale: string }) {
  const verifyUrl = `${BASE_URL}/certificates/verify/${cert.certificate_code}`;

  function handlePrint() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
<!DOCTYPE html>
<html lang="${isAr ? "ar" : "en"}" dir="${isAr ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8">
<title>Certificate | ${cert.certificate_code}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0f1e; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px; }
  .cert { border: 3px solid #fbbf24; border-radius: 16px; padding: 60px; max-width: 800px; width: 100%; text-align: center; background: linear-gradient(135deg, #0a0f1e, #1a2236); }
  h1 { color: #fbbf24; font-size: 14px; letter-spacing: 4px; margin-bottom: 20px; text-transform: uppercase; }
  h2 { color: #fff; font-size: 36px; margin: 16px 0; }
  p { color: #8ed5ff; font-size: 18px; margin: 8px 0; }
  .course { font-size: 22px; font-weight: bold; color: #fff; margin: 20px 0; }
  .code { font-family: monospace; color: #fbbf24; font-size: 14px; margin-top: 30px; padding: 10px 20px; border: 1px solid #fbbf24; border-radius: 8px; display: inline-block; }
  .date { color: #64748b; font-size: 12px; margin-top: 20px; }
  @media print { body { background: white; } .cert { border-color: #333; background: white; } h1, h2, p, .code { color: #000; } }
</style>
</head>
<body>
<div class="cert">
  <h1>${isAr ? "شهادة إتمام" : "Certificate of Completion"}</h1>
  <div style="font-size:64px;margin:20px 0;">🎓</div>
  <p>${isAr ? "تُمنح هذه الشهادة لـ" : "This certifies that"}</p>
  <h2 style="color:#fbbf24;">${isAr ? "المتعلم المتميز" : "Distinguished Learner"}</h2>
  <p>${isAr ? "أتمّ دورة" : "has successfully completed"}</p>
  <div class="course">${cert.course_title}</div>
  <p>${isAr ? "في أكاديمية درهوس للذكاء الاصطناعي والكلاود" : "at Darhous AI Cloud Academy"}</p>
  <div class="code">🔐 ${cert.certificate_code}</div>
  <div class="date">${isAr ? "تاريخ الإصدار:" : "Issued:"} ${new Date(cert.issued_at).toLocaleDateString(isAr ? "ar" : "en")}</div>
  <div class="date" style="margin-top:8px;">✅ ${isAr ? "تحقق:" : "Verify:"} ${verifyUrl}</div>
</div>
</body>
</html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  }

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: "1px solid rgba(251,191,36,0.2)" }}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>
          <Award size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base leading-snug" style={{ color: "var(--color-on-surface)" }}>{cert.course_title}</p>
          <p className="text-xs font-mono mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
            {new Date(cert.issued_at).toLocaleDateString(isAr ? "ar" : "en", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <CheckCircle size={18} style={{ color: "#4ade80", flexShrink: 0 }} />
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--color-surface-container)" }}>
        <p className="text-xs font-mono flex-1 truncate" style={{ color: "#fbbf24" }}>🔐 {cert.certificate_code}</p>
        <Link
          href={`/certificates/verify/${cert.certificate_code}`}
          target="_blank"
          className="flex items-center gap-1 text-xs font-mono"
          style={{ color: "var(--color-primary)" }}
        >
          {isAr ? "تحقق" : "Verify"} <ExternalLink size={11} />
        </Link>
      </div>

      <div className="flex gap-2">
        <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl flex-1 justify-center" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
          <Download size={12} /> {isAr ? "طباعة / تنزيل" : "Print / Download"}
        </button>
        <button onClick={() => navigator.clipboard.writeText(verifyUrl)} className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
          <Share2 size={12} /> {isAr ? "مشاركة" : "Share"}
        </button>
      </div>
    </div>
  );
}

export default function CertificatesClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { user, loading: authLoading, supabaseConfigured } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !supabaseConfigured) return;
    setLoading(true);

    async function load() {
      const certRes = await fetch("/api/certificates").then((r) => r.json());
      setCertificates(certRes.certificates ?? []);

      const { createClient } = await import("@/lib/supabase/client");
      const s = createClient();
      if (s && user) {
        const { data: cpData } = await s
          .from("course_progress")
          .select("course_slug,progress_percent,status")
          .eq("user_id", user.id);
        setCourseProgress((cpData as CourseProgress[]) ?? []);
      }
      setLoading(false);
    }

    load().catch(() => setLoading(false));
  }, [user, supabaseConfigured]);

  async function generateCert(courseSlug: string) {
    setGenerating(courseSlug);
    setError("");
    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug }),
    });
    const data = await res.json();
    setGenerating(null);
    if (res.ok) {
      setCertificates((prev) => {
        const exists = prev.find((c) => c.certificate_code === data.certificate?.certificate_code);
        return exists ? prev : [data.certificate, ...prev];
      });
    } else {
      setError(data.error ?? (isAr ? "حدث خطأ" : "An error occurred"));
    }
  }

  const completedCourses = courseProgress.filter((c) => c.progress_percent >= 100 || c.status === "completed");
  const availableForCert = completedCourses.filter((cp) => !certificates.find((cert) => cert.course_slug === cp.course_slug));

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={30} className="animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-xl py-16 text-center">
        <div className="text-5xl mb-5">🎓</div>
        <h1 className="font-display font-bold text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "شهاداتي" : "My Certificates"}
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "سجّل دخولك لاستعراض وإصدار شهاداتك" : "Sign in to view and issue your certificates"}
        </p>
        <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl inline-flex items-center gap-2">
          <LogIn size={16} /> {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
          <Award size={12} /> {isAr ? "شهاداتي" : "My Certificates"}
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "شهاداتك المكتسبة" : "Your Earned Certificates"}
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 size={30} className="animate-spin" style={{ color: "var(--color-primary)" }} /></div>
      ) : (
        <>
          {/* Available to claim */}
          {availableForCert.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-4" style={{ color: "#4ade80" }}>
                {isAr ? "🏆 جاهز للحصول على شهادة!" : "🏆 Ready to claim!"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableForCert.map((cp) => {
                  const course = courses.find((c) => c.id === cp.course_slug);
                  return (
                    <div key={cp.course_slug} className="glass-card rounded-2xl p-5 flex items-center gap-4" style={{ border: "1px solid rgba(74,222,128,0.2)" }}>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>
                          {course ? (isAr ? course.titleAr : course.titleEn) : cp.course_slug}
                        </p>
                        <p className="text-xs font-mono" style={{ color: "#4ade80" }}>100%</p>
                      </div>
                      <button
                        onClick={() => generateCert(cp.course_slug)}
                        disabled={generating === cp.course_slug}
                        className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl disabled:opacity-50"
                        style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}
                      >
                        {generating === cp.course_slug ? <Loader2 size={12} className="animate-spin" /> : <Award size={12} />}
                        {isAr ? "أصدر الشهادة" : "Issue Certificate"}
                      </button>
                    </div>
                  );
                })}
              </div>
              {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            </div>
          )}

          {/* Existing certificates */}
          {certificates.length > 0 ? (
            <div>
              <h2 className="font-bold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? `شهاداتك (${certificates.length})` : `Your Certificates (${certificates.length})`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} isAr={isAr} locale={locale} />
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">🎓</div>
              <p className="font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "لا توجد شهادات بعد" : "No certificates yet"}
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "أكمل دورة بالكامل لتحصل على شهادتك" : "Complete a full course to earn your certificate"}
              </p>
              <Link href={`/${locale}/courses`} className="glow-button-primary text-white font-mono px-6 py-2 rounded-xl text-sm">
                {isAr ? "استعرض الدورات" : "Browse Courses"}
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
