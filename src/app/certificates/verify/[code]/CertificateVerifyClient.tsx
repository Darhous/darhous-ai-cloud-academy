"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, GraduationCap } from "lucide-react";

interface CertData {
  code: string;
  courseTitle: string;
  holderName: string;
  issuedAt: string;
}

export default function CertificateVerifyClient({ code }: { code: string }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [cert, setCert] = useState<CertData | null>(null);

  useEffect(() => {
    fetch(`/api/certificates/verify/${code}`)
      .then((r) => r.json())
      .then((data) => {
        setValid(data.valid);
        if (data.valid) setCert(data.certificate);
      })
      .catch(() => setValid(false))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.04) 0%, transparent 60%), #080d1f",
      }}
    >
      {/* Logo strip */}
      <div className="mb-8 flex items-center gap-3">
        <GraduationCap size={28} style={{ color: "#d4af37" }} />
        <span className="font-display font-bold text-lg tracking-widest" style={{ color: "#d4af37" }}>
          DARHOUS ACADEMY
        </span>
      </div>

      <div className="max-w-md w-full flex flex-col items-center gap-6">
        {loading ? (
          <>
            <Loader2 size={48} className="animate-spin" style={{ color: "#8ed5ff" }} />
            <p className="text-sm" style={{ color: "#64748b" }}>Verifying certificate...</p>
          </>
        ) : valid && cert ? (
          <div className="w-full rounded-3xl p-8 text-center" style={{ background: "linear-gradient(135deg, #0a1628, #1a2236)", border: "2px solid #fbbf24" }}>
            <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#4ade80" }} />
            <GraduationCap size={40} className="mx-auto mb-3" style={{ color: "#fbbf24" }} />
            <h1 className="font-bold text-xl mb-1" style={{ color: "#fbbf24" }}>Certificate Verified ✓</h1>
            <p className="text-sm mb-6" style={{ color: "#64748b" }}>This is an authentic NexaLearn AI Academy certificate</p>

            <div className="flex flex-col gap-3 text-start">
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-mono" style={{ color: "#64748b" }}>Certificate Code</p>
                <p className="font-bold text-sm font-mono" style={{ color: "#fbbf24" }}>{cert.code}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-mono" style={{ color: "#64748b" }}>Holder</p>
                <p className="font-bold text-sm" style={{ color: "#fff" }}>{cert.holderName}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-mono" style={{ color: "#64748b" }}>Course</p>
                <p className="font-bold text-sm" style={{ color: "#fff" }}>{cert.courseTitle}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-mono" style={{ color: "#64748b" }}>Issued</p>
                <p className="font-bold text-sm" style={{ color: "#fff" }}>
                  {new Date(cert.issuedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-mono" style={{ color: "#64748b" }}>Academy</p>
                <p className="font-bold text-sm" style={{ color: "#8ed5ff" }}>NexaLearn</p>
              </div>
            </div>

            <div className="mt-6">
              <Link href="https://darhous-ai-cloud-academy.vercel.app" className="text-xs font-mono" style={{ color: "#64748b" }}>
                darhous-ai-cloud-academy.vercel.app
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-3xl p-8 text-center" style={{ background: "linear-gradient(135deg, #0a1628, #1a2236)", border: "2px solid #ef4444" }}>
            <XCircle size={48} className="mx-auto mb-4" style={{ color: "#ef4444" }} />
            <h1 className="font-bold text-xl mb-2" style={{ color: "#ef4444" }}>Certificate Not Found</h1>
            <p className="text-sm mb-4" style={{ color: "#64748b" }}>
              The certificate code <span className="font-mono text-white">{code}</span> could not be verified.
            </p>
            <p className="text-xs" style={{ color: "#64748b" }}>
              This may be an invalid code. Contact the academy if you believe this is an error.
            </p>
          </div>
        )}

        <Link href="https://darhous-ai-cloud-academy.vercel.app" className="text-xs font-mono" style={{ color: "#64748b" }}>
          ← Return to NexaLearn AI Academy
        </Link>
      </div>
    </div>
  );
}
