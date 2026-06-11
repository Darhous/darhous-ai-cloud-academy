"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Download, Share2, LogIn, Loader2, ExternalLink, CheckCircle, GraduationCap, Trophy, Lock } from "lucide-react";
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

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://darhous-ai-cloud-academy.vercel.app";

function CertificateCard({ cert, isAr, locale: _locale }: { cert: Certificate; isAr: boolean; locale: string }) {
  const verifyUrl = `${BASE_URL}/certificates/verify/${cert.certificate_code}`;

  function handlePrint() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const issuedDate = new Date(cert.issued_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    printWindow.document.write(`<!DOCTYPE html>
<html lang="${isAr ? "ar" : "en"}" dir="${isAr ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8">
<title>${isAr ? "شهادة إتمام" : "Certificate"} | ${cert.certificate_code}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; }
  body {
    background: #080c14;
    font-family: 'Inter', system-ui, sans-serif;
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 24px;
  }
  .cert-wrap {
    position: relative;
    max-width: 860px; width: 100%;
    background: linear-gradient(155deg, #0d1321 0%, #111827 50%, #0a0f1e 100%);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
  }
  /* Gold border frame */
  .cert-wrap::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 24px;
    border: 2px solid transparent;
    background: linear-gradient(135deg,#fbbf24,#f59e0b,#fbbf24,#d97706) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
  /* Top gradient bar */
  .cert-bar {
    height: 6px;
    background: linear-gradient(90deg, #00668a, #571bc1, #fbbf24, #571bc1, #00668a);
  }
  .cert-body { padding: 52px 64px 44px; text-align: center; }
  /* Corner ornaments */
  .ornament {
    position: absolute; font-size: 28px; opacity: 0.18; pointer-events: none;
    color: #fbbf24;
  }
  .ornament.tl { top: 22px; left: 28px; }
  .ornament.tr { top: 22px; right: 28px; }
  .ornament.bl { bottom: 22px; left: 28px; }
  .ornament.br { bottom: 22px; right: 28px; }

  .logo-line {
    font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 28px; font-weight: 600;
  }
  .cert-title {
    font-family: 'Playfair Display', serif;
    font-size: 13px; letter-spacing: 6px; text-transform: uppercase;
    color: #fbbf24; margin-bottom: 32px; font-weight: 700;
  }
  .trophy { font-size: 64px; margin-bottom: 20px; display: block; }
  .certifies-text { font-size: 15px; color: #94a3b8; margin-bottom: 10px; }
  .learner-name {
    font-family: 'Playfair Display', serif;
    font-size: 38px; font-weight: 800;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 12px; line-height: 1.2;
  }
  .completed-text { font-size: 15px; color: #94a3b8; margin-bottom: 16px; }
  .course-name {
    font-size: 22px; font-weight: 700;
    color: #e2e8f0; margin-bottom: 14px; line-height: 1.3;
  }
  .platform-name { font-size: 14px; color: #64748b; margin-bottom: 36px; }
  .divider {
    width: 200px; height: 1px; margin: 0 auto 32px;
    background: linear-gradient(90deg, transparent, #fbbf24, transparent);
  }
  .meta-row { display: flex; justify-content: center; gap: 40px; margin-bottom: 28px; flex-wrap: wrap; }
  .meta-item { text-align: center; }
  .meta-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #475569; margin-bottom: 4px; }
  .meta-value { font-size: 13px; font-weight: 600; color: #cbd5e1; }
  .cert-code-box {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.25);
    border-radius: 10px; padding: 10px 20px; margin-bottom: 24px;
  }
  .cert-code {
    font-family: monospace; font-size: 14px; font-weight: 700;
    color: #fbbf24; letter-spacing: 1px;
  }
  .verify-url { font-size: 11px; color: #475569; margin-top: 4px; }
  .verify-url a { color: #64748b; text-decoration: none; }

  @media print {
    body { background: #fff; padding: 0; }
    .cert-wrap {
      background: #fff;
      box-shadow: none;
      max-width: 100%; border-radius: 0;
    }
    .cert-wrap::before { display: none; }
    .cert-bar { background: #f59e0b; }
    .logo-line, .certifies-text, .completed-text, .platform-name { color: #6b7280; }
    .learner-name { -webkit-text-fill-color: #92400e; }
    .course-name { color: #111; }
    .cert-title { color: #92400e; }
    .cert-code { color: #92400e; }
    .meta-value { color: #374151; }
    .ornament { color: #92400e; opacity: 0.12; }
    .divider { background: #92400e; }
  }
</style>
</head>
<body>
<div class="cert-wrap">
  <div class="cert-bar"></div>
  <div class="ornament tl">✦</div>
  <div class="ornament tr">✦</div>
  <div class="ornament bl">✦</div>
  <div class="ornament br">✦</div>

  <div class="cert-body">
    <p class="logo-line">NexaLearn by Ahmed Darhous</p>
    <p class="cert-title">${isAr ? "شـهـادة إتـمـام" : "Certificate of Completion"}</p>
    <span class="trophy">🏆</span>
    <p class="certifies-text">${isAr ? "تُمنح هذه الشهادة إلى" : "This certificate is proudly awarded to"}</p>
    <p class="learner-name">${isAr ? "المتعلم المتميز" : "Distinguished Learner"}</p>
    <p class="completed-text">${isAr ? "لإتمامه بنجاح دورة" : "for successfully completing"}</p>
    <p class="course-name">${cert.course_title}</p>
    <p class="platform-name">${isAr ? "منصة NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Learning Platform"}</p>

    <div class="divider"></div>

    <div class="meta-row">
      <div class="meta-item">
        <p class="meta-label">${isAr ? "تاريخ الإصدار" : "Issue Date"}</p>
        <p class="meta-value">${issuedDate}</p>
      </div>
      <div class="meta-item">
        <p class="meta-label">${isAr ? "الحالة" : "Status"}</p>
        <p class="meta-value" style="color:#4ade80;">✓ ${isAr ? "مُكتملة" : "Completed"}</p>
      </div>
    </div>

    <div class="cert-code-box">
      <span style="color:#fbbf24;font-size:14px;">🔐</span>
      <span class="cert-code">${cert.certificate_code}</span>
    </div>
    <p class="verify-url">${isAr ? "تحقق عبر:" : "Verify at:"} <a href="${verifyUrl}">${verifyUrl}</a></p>
  </div>
</div>
<script>window.onload=function(){window.print();};</script>
</body>
</html>`);
    printWindow.document.close();
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
        <p className="flex items-center gap-1.5 text-xs font-mono flex-1 truncate" style={{ color: "#fbbf24" }}>
            <Lock size={10} style={{ flexShrink: 0 }} /> {cert.certificate_code}
          </p>
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
        <GraduationCap size={56} className="mx-auto mb-5" style={{ color: "#fbbf24" }} />
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
    <div className="container-xl py-12 flex flex-col gap-10 relative">
      {/* Ambient atmosphere — certificate gold */}
      <div className="absolute inset-x-0 top-0 h-96 pointer-events-none" aria-hidden="true"
           style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,191,36,0.05) 0%, transparent 100%)" }} />
      <div className="text-center relative">
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
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
                <Trophy size={16} /> {isAr ? "جاهز للحصول على شهادة!" : "Ready to claim!"}
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
              <GraduationCap size={44} className="mx-auto mb-3" style={{ color: "#fbbf24" }} />
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
