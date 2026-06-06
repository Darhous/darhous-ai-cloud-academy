"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, Download, GraduationCap, Globe, Monitor } from "lucide-react";

interface CertData {
  code: string;
  holderName: string;
  type: "language" | "exams" | "course";
  typeLabel: string;
  detail: string;
  issuedAt: string;
  downloadPath?: string;
}

const TYPE_META: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  language: { icon: <Globe size={20} />, color: "#d0bcff", bg: "rgba(208,188,255,0.08)", label: "🌐 Language" },
  exams:    { icon: <Monitor size={20} />, color: "#8ed5ff", bg: "rgba(142,213,255,0.08)", label: "💻 Digital Exams" },
  course:   { icon: <GraduationCap size={20} />, color: "#4ade80", bg: "rgba(74,222,128,0.08)", label: "🎓 Course" },
};

export default function UnifiedVerifyClient({
  certId,
  locale,
}: {
  certId: string;
  locale: string;
}) {
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [cert, setCert] = useState<CertData | null>(null);

  useEffect(() => {
    fetch(`/api/certificates/verify/${certId}`)
      .then((r) => r.json())
      .then((d: { valid: boolean; certificate?: CertData }) => {
        setValid(d.valid);
        if (d.valid && d.certificate) setCert(d.certificate);
      })
      .catch(() => setValid(false))
      .finally(() => setLoading(false));
  }, [certId]);

  const typeMeta = cert ? (TYPE_META[cert.type] ?? TYPE_META.course) : null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.06) 0%, transparent 60%), #080d1f",
      }}
    >
      {/* Logo strip */}
      <div className="mb-8 flex items-center gap-3">
        <GraduationCap size={28} style={{ color: "#d4af37" }} />
        <span className="font-display font-bold text-lg tracking-widest" style={{ color: "#d4af37" }}>
          DARHOUS ACADEMY
        </span>
      </div>

      <div className="w-full max-w-lg">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <Loader2 size={44} className="animate-spin" style={{ color: "#d4af37" }} />
            <p className="text-sm font-mono" style={{ color: "#6e6e8a" }}>
              {isAr ? "جاري التحقق من الشهادة..." : "Verifying certificate..."}
            </p>
          </div>
        ) : valid && cert && typeMeta ? (
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0c1445, #111a4f)",
              border: "2px solid #d4af37",
              boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Gold top bar */}
            <div style={{ height: "6px", background: "linear-gradient(90deg, #a07c20, #d4af37, #f0d580, #d4af37, #a07c20)" }} />

            <div className="p-8">
              {/* Verified badge */}
              <div className="flex flex-col items-center gap-3 mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.1)", border: "2px solid #4ade80", boxShadow: "0 0 30px rgba(74,222,128,0.2)" }}
                >
                  <CheckCircle2 size={40} style={{ color: "#4ade80" }} />
                </div>
                <h1 className="font-bold text-2xl text-center" style={{ color: "#d4af37" }}>
                  {isAr ? "شهادة موثّقة ✓" : "Certificate Verified ✓"}
                </h1>
                <p className="text-sm text-center" style={{ color: "#6e6e8a" }}>
                  {isAr
                    ? "هذه شهادة أصلية صادرة من أكاديمية درهوس"
                    : "This is an authentic certificate issued by Darhous Academy"}
                </p>
              </div>

              {/* Certificate type badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6 mx-auto flex"
                style={{ background: typeMeta.bg, color: typeMeta.color, border: `1px solid ${typeMeta.color}30` }}
              >
                {typeMeta.icon}
                {cert.typeLabel}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-3">
                {[
                  { label: isAr ? "رقم الشهادة" : "Certificate ID", value: cert.code, mono: true, color: "#d4af37" },
                  { label: isAr ? "اسم الحامل" : "Certificate Holder", value: cert.holderName, color: "#f5f0e8" },
                  { label: isAr ? "التفاصيل" : "Details", value: cert.detail, color: "#c8c8d8" },
                  {
                    label: isAr ? "تاريخ الإصدار" : "Date of Issue",
                    value: new Date(cert.issuedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    }),
                    color: "#8888aa",
                  },
                  { label: isAr ? "الجهة المانحة" : "Issued By", value: "Darhous AI Cloud Academy", color: typeMeta.color },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="p-3.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "#6e6e8a" }}>
                      {row.label}
                    </p>
                    <p
                      className={`text-sm font-semibold ${row.mono ? "font-mono" : ""}`}
                      style={{ color: row.color }}
                    >
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Download button */}
              {cert.downloadPath && (
                <a
                  href={cert.downloadPath}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #a07c20, #d4af37)",
                    color: "#0c1445",
                    textDecoration: "none",
                  }}
                >
                  <Download size={16} />
                  {isAr ? "تحميل الشهادة PDF" : "Download Certificate PDF"}
                </a>
              )}
            </div>

            {/* Gold bottom bar */}
            <div style={{ height: "4px", background: "linear-gradient(90deg, #a07c20, #d4af37, #f0d580, #d4af37, #a07c20)" }} />
          </div>
        ) : (
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a0a0a, #2a1010)",
              border: "2px solid #ef4444",
              boxShadow: "0 0 40px rgba(239,68,68,0.1)",
            }}
          >
            <div className="p-8 flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", border: "2px solid #ef4444" }}
              >
                <XCircle size={40} style={{ color: "#ef4444" }} />
              </div>
              <h1 className="font-bold text-xl" style={{ color: "#ef4444" }}>
                {isAr ? "الشهادة غير موجودة" : "Certificate Not Found"}
              </h1>
              <p className="text-sm text-center" style={{ color: "#6e6e8a" }}>
                {isAr
                  ? `لم يتم العثور على شهادة بالرقم: ${certId}`
                  : `No certificate found with ID: ${certId}`}
              </p>
              <p className="text-xs text-center" style={{ color: "#6e6e8a" }}>
                {isAr
                  ? "تواصل مع الأكاديمية إذا كنت تعتقد أن هذا خطأ."
                  : "Contact the academy if you believe this is an error."}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href={`/${locale}`}
            className="text-xs font-mono hover:opacity-80 transition-opacity"
            style={{ color: "#6e6e8a" }}
          >
            ← {isAr ? "العودة إلى الأكاديمية" : "Return to Darhous Academy"}
          </Link>
        </div>
      </div>
    </div>
  );
}
