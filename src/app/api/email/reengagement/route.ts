import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Auth: accepts two methods —
//   • Vercel native cron:  GET + Authorization: Bearer {CRON_SECRET}  (auto-set by Vercel)
//   • External caller:     POST + x-cron-secret: {REENGAGEMENT_CRON_SECRET}

const SEQUENCE_NAME = "reengagement";
const STEP_KEY = "day-3";
const DEDUP_WINDOW_DAYS = 7;

function isAuthorized(req: NextRequest): boolean {
  // Vercel native cron auth
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;

  // Custom secret for external callers / manual triggers
  const customSecret = process.env.REENGAGEMENT_CRON_SECRET;
  const customHeader = req.headers.get("x-cron-secret");
  if (customSecret && customHeader === customSecret) return true;

  return false;
}

async function runReengagement(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ error: "Email not configured" }, { status: 503 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const dedupCutoff = new Date(now.getTime() - DEDUP_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

  // ── Fetch inactive users ─────────────────────────────────────────────────────
  const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError || !usersData) {
    console.error("[Reengagement] listUsers error:", usersError?.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }

  const candidates = usersData.users.filter((u) => {
    if (!u.email || !u.last_sign_in_at) return false;
    return u.last_sign_in_at < threeDaysAgo && u.created_at < threeDaysAgo;
  });

  // ── Dedup: skip users who already got this email in the last 7 days ──────────
  const { data: recentSent } = await admin
    .from("email_sequence_events")
    .select("email")
    .eq("sequence_name", SEQUENCE_NAME)
    .eq("step_key", STEP_KEY)
    .eq("status", "sent")
    .gte("sent_at", dedupCutoff);

  const alreadySentEmails = new Set((recentSent ?? []).map((r: { email: string }) => r.email));

  // ── Send ─────────────────────────────────────────────────────────────────────
  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);
  let sent = 0, skipped = 0, failed = 0;

  for (const user of candidates) {
    const email = user.email!;
    if (alreadySentEmails.has(email)) { skipped++; continue; }

    const name = (user.user_metadata?.full_name as string | undefined)?.trim() || "";

    try {
      await resend.emails.send({
        from: "Darhous Academy <noreply@darhous.com>",
        to: email,
        subject: "نشتاق إليك في درهوس 🌐 | We Miss You at Darhous 🌐",
        html: buildEmail(name, siteUrl),
      });

      const { error: trackErr } = await admin.from("email_sequence_events").insert({
        email, sequence_name: SEQUENCE_NAME, step_key: STEP_KEY,
        status: "sent", sent_at: new Date().toISOString(),
      });
      if (trackErr) console.error("[Reengagement] tracking insert failed:", trackErr.message);
      sent++;
    } catch (err) {
      console.error("[Reengagement] send failed:", err instanceof Error ? err.message : "unknown");
      failed++;
      try {
        await admin.from("email_sequence_events").insert({
          email, sequence_name: SEQUENCE_NAME, step_key: STEP_KEY,
          status: "failed", sent_at: new Date().toISOString(),
        });
      } catch { /* ignore */ }
    }
  }

  return NextResponse.json({ checked: candidates.length, sent, skipped, failed });
}

// GET — Vercel native cron (sends Authorization: Bearer {CRON_SECRET})
export async function GET(req: NextRequest) {
  return runReengagement(req);
}

// POST — external callers / manual triggers (sends x-cron-secret header)
export async function POST(req: NextRequest) {
  return runReengagement(req);
}

function buildEmail(name: string, siteUrl: string): string {
  const displayNameAr = name || "المتعلم";
  const displayNameEn = name || "Learner";

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Segoe UI',Tahoma,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a">
  <tr><td align="center" style="padding:40px 16px">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d1117;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#00668a,#571bc1);padding:40px 32px;text-align:center">
          <p style="margin:0;font-size:32px">🌐</p>
          <h1 style="margin:8px 0 0;font-size:26px;color:#fff;font-weight:700">درهوس</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px">منظومة التعلم الذكي | Smart Learning Ecosystem</p>
        </td>
      </tr>
      <!-- Arabic -->
      <tr>
        <td style="padding:36px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.04)">
          <h2 style="color:#8ed5ff;font-size:20px;margin:0 0 12px">أهلاً ${displayNameAr}! 👋</h2>
          <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;font-size:14px">لاحظنا أنك لم تزر منصة درهوس منذ بضعة أيام — رحلتك التعليمية في انتظارك!</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["🤖","أكاديمية الذكاء الاصطناعي","دورات ومسارات AI شاملة",`${siteUrl}/ar/ai-academy`,"استكشف ←"],
              ["🌐","بوابة اللغة","اختبار تحديد مستواك في الإنجليزية",`${siteUrl}/ar/language`,"ابدأ الاختبار ←"],
              ["💻","اختبارات التحول الرقمي","7 اختبارات: IT وOffice والأمن السيبراني",`${siteUrl}/ar/digital-exams`,"اختبر نفسك ←"],
            ].map(([icon,title,desc,href,cta])=>`<tr><td style="padding-bottom:10px"><table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px"><tr><td style="padding:14px 16px;width:40px;font-size:22px">${icon}</td><td style="padding:14px 8px"><p style="margin:0;font-weight:600;color:#e2e8f0;font-size:13px">${title}</p><p style="margin:3px 0 0;font-size:11px;color:#64748b">${desc}</p></td><td style="padding:14px 16px;text-align:left"><a href="${href}" style="color:#8ed5ff;font-size:11px;text-decoration:none">${cta}</a></td></tr></table></td></tr>`).join("")}
          </table>
          <div style="text-align:center;margin-top:24px">
            <a href="${siteUrl}/ar/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:14px 36px;border-radius:12px;font-weight:600;font-size:15px">تابع رحلتك الآن →</a>
          </div>
        </td>
      </tr>
      <!-- English -->
      <tr>
        <td style="padding:32px;direction:ltr;text-align:left">
          <h2 style="color:#8ed5ff;font-size:20px;margin:0 0 12px">We miss you, ${displayNameEn}! 👋</h2>
          <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;font-size:14px">We noticed you haven't visited Darhous in a few days — your learning journey is waiting!</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["🤖","AI Academy","Comprehensive AI courses and paths",`${siteUrl}/en/ai-academy`,"Explore →"],
              ["🌐","Language Portal","English proficiency assessment (CEFR)",`${siteUrl}/en/language`,"Start Test →"],
              ["💻","Digital Exams","IT, Office & Cybersecurity exams",`${siteUrl}/en/digital-exams`,"Take Exam →"],
            ].map(([icon,title,desc,href,cta])=>`<tr><td style="padding-bottom:10px"><table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px"><tr><td style="padding:14px 16px;width:40px;font-size:22px">${icon}</td><td style="padding:14px 8px"><p style="margin:0;font-weight:600;color:#e2e8f0;font-size:13px">${title}</p><p style="margin:3px 0 0;font-size:11px;color:#64748b">${desc}</p></td><td style="padding:14px 16px"><a href="${href}" style="color:#8ed5ff;font-size:11px;text-decoration:none">${cta}</a></td></tr></table></td></tr>`).join("")}
          </table>
          <div style="text-align:center;margin-top:24px">
            <a href="${siteUrl}/en/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:14px 36px;border-radius:12px;font-weight:600;font-size:15px">Continue Learning →</a>
          </div>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.05);text-align:center">
          <p style="color:#475569;font-size:11px;margin:0">Darhous Smart Learning — <a href="${siteUrl}" style="color:#475569">${siteUrl}</a></p>
          <p style="color:#374151;font-size:10px;margin:6px 0 0">You received this because you signed up for Darhous. This email is sent to encourage you to continue learning.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
