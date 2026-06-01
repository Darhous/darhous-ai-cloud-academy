import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { CheckCircle, XCircle, Award } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; certId: string }>;
}

const CEFR_DESC: Record<string, string> = {
  C2: "Mastery", C1B: "Advanced (C1B)", C1A: "Advanced (C1A)",
  B2B: "Upper-Intermediate (B2B)", B2A: "Upper-Intermediate (B2A)",
  B1B: "Intermediate (B1B)", B1A: "Intermediate (B1A)",
  A2B: "Elementary (A2B)", A2A: "Elementary (A2A)",
  A1B: "Beginner (A1B)", A1A: "Beginner (A1A)",
};

export default async function VerifyCertPage({ params }: Props) {
  const { locale, certId } = await params;
  const isAr = locale === "ar";

  const supabase = createAdminClient();
  let result: Record<string, unknown> | null = null;
  let userName: string | null = null;

  if (supabase && certId) {
    const { data } = await supabase
      .from("language_results")
      .select("id,score,level,stages_completed,is_incomplete,created_at,user_id")
      .eq("certificate_id", certId)
      .single();

    if (data) {
      result = data as Record<string, unknown>;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user_id)
        .single();
      const { data: authData } = await supabase.auth.admin.getUserById(data.user_id as string);
      userName =
        (profile?.full_name as string | null)?.trim() ||
        authData?.user?.email?.split("@")[0] ||
        "Candidate";
    }
  }

  const valid = !!result;
  const cefrDesc = result ? (CEFR_DESC[result.level as string] ?? result.level as string) : "";
  const issueDate = result?.created_at
    ? new Date(result.created_at as string).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="container-xl py-16 flex flex-col items-center gap-8 max-w-lg mx-auto text-center" dir={isAr ? "rtl" : "ltr"}>
      {/* Status icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: valid ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", border: `2px solid ${valid ? "#4ade80" : "#ef4444"}` }}
      >
        {valid
          ? <CheckCircle size={40} style={{ color: "#4ade80" }} />
          : <XCircle size={40} style={{ color: "#ef4444" }} />}
      </div>

      <div>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          {valid
            ? (isAr ? "شهادة صحيحة ✓" : "Valid Certificate ✓")
            : (isAr ? "شهادة غير صحيحة" : "Certificate Not Found")}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `رمز التحقق: ${certId}` : `Certificate ID: ${certId}`}
        </p>
      </div>

      {valid && result && (
        <div
          className="w-full rounded-2xl p-8 flex flex-col gap-4"
          style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Award size={22} style={{ color: "#4ade80" }} />
            <span className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "بيانات الشهادة" : "Certificate Details"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: isAr ? "الاسم" : "Name",         value: userName ?? "—" },
              { label: isAr ? "المستوى" : "Level",       value: `${result.level} — ${cefrDesc}` },
              { label: isAr ? "النتيجة" : "Score",       value: `${(result.score as number).toFixed(1)}%` },
              { label: isAr ? "تاريخ الإصدار" : "Issued", value: issueDate },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-start" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-mono mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{label}</p>
                <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>{value}</p>
              </div>
            ))}
          </div>

          <a
            href={`/api/certificates/language/${result.id}`}
            target="_blank"
            rel="noreferrer"
            className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
          >
            <Award size={16} />
            {isAr ? "تحميل شهادة PDF" : "Download PDF Certificate"}
          </a>
        </div>
      )}

      {!valid && (
        <p className="text-sm max-w-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "لم نتمكن من العثور على شهادة بهذا الرمز. تأكد من صحة الرابط."
            : "We could not find a certificate with this ID. Please make sure the link is correct."}
        </p>
      )}

      <Link href={`/${locale}/language`} className="glow-button-secondary font-mono px-6 py-2.5 rounded-xl text-sm">
        {isAr ? "بوابة اللغة" : "Language Portal"}
      </Link>
    </div>
  );
}
