"use client";

interface Props {
  isAr: boolean;
}

export function AdminEmailPanel({ isAr }: Props) {
  const emails = [
    {
      icon: "👋",
      t: isAr ? "ترحيب جديد" : "Welcome Email",
      d: isAr ? "يُرسل تلقائيًا عند تسجيل مستخدم جديد" : "Sent automatically on new user signup",
      status: "active",
      endpoint: "/api/email/welcome",
    },
    {
      icon: "🔁",
      t: isAr ? "إعادة التفاعل (Day-3)" : "Re-engagement (Day-3)",
      d: isAr ? "Cron يومي 08:00 UTC — للمستخدمين غير النشطين" : "Daily cron 08:00 UTC — for inactive users",
      status: "active",
      endpoint: "/api/email/reengagement",
    },
    {
      icon: "🎓",
      t: isAr ? "إشعار الشهادة" : "Certificate Email",
      d: isAr ? "عند إصدار شهادة جديدة" : "When a new certificate is issued",
      status: "planned",
      endpoint: "",
    },
    {
      icon: "📊",
      t: isAr ? "ملخص الأسبوعي" : "Weekly Summary",
      d: isAr ? "ملخص التقدم الأسبوعي" : "Weekly progress digest",
      status: "planned",
      endpoint: "",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "الإيميلات والإشعارات" : "Email & Notifications"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {emails.map((email) => (
          <div key={email.t} className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{email.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{email.t}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>{email.d}</p>
                </div>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: email.status === "active" ? "rgba(74,222,128,0.12)" : "rgba(148,163,184,0.1)",
                  color: email.status === "active" ? "#4ade80" : "#94a3b8",
                }}
              >
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
  );
}
