import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ skipped: true });

  const { email, name, locale } = await req.json();
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const isAr = locale === "ar";
  const displayName = name?.trim() || (isAr ? "المتعلم" : "Learner");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: "Darhous Academy <noreply@darhous.com>",
      to: email,
      subject: isAr ? "مرحباً بك في درهوس للتعلم الذكي 🎓" : "Welcome to Darhous Smart Learning 🎓",
      html: isAr
        ? `
<div dir="rtl" style="font-family:'Segoe UI',Tahoma,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e2e8f0;border-radius:16px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#00668a,#571bc1);padding:40px 32px;text-align:center">
    <h1 style="margin:0;font-size:28px;color:#fff;font-weight:700">درهوس 🌐</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px">منظومة التعلم الذكي</p>
  </div>
  <div style="padding:40px 32px">
    <h2 style="color:#8ed5ff;font-size:22px;margin-bottom:8px">أهلاً ${displayName}! 👋</h2>
    <p style="color:#94a3b8;line-height:1.7;margin-bottom:24px">
      يسعدنا انضمامك إلى منصة درهوس للتعلم الذكي. لديك الآن وصول كامل إلى:
    </p>
    <div style="display:grid;gap:12px;margin-bottom:32px">
      ${[
        ["🤖","أكاديمية الذكاء الاصطناعي","دورات ومسارات تعليمية شاملة"],
        ["🌐","بوابة اللغة","اختبار تحديد مستوى اللغة الإنجليزية"],
        ["💻","اختبارات التحول الرقمي","اختبارات IT وOffice والأمن السيبراني"],
        ["🎯","مرشد الذكاء الاصطناعي","توجيه مخصص لمسيرتك التعليمية"],
      ].map(([icon, title, desc]) => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:flex;gap:12px;align-items:start">
          <span style="font-size:24px">${icon}</span>
          <div>
            <p style="margin:0;font-weight:600;color:#e2e8f0;font-size:14px">${title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#64748b">${desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
    <div style="text-align:center">
      <a href="${siteUrl}/ar/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px">
        ابدأ رحلتك الآن →
      </a>
    </div>
  </div>
  <div style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
    <p style="color:#475569;font-size:12px;margin:0">درهوس للتعلم الذكي — ${siteUrl}</p>
  </div>
</div>`
        : `
<div style="font-family:'Segoe UI',Tahoma,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e2e8f0;border-radius:16px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#00668a,#571bc1);padding:40px 32px;text-align:center">
    <h1 style="margin:0;font-size:28px;color:#fff;font-weight:700">Darhous 🌐</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px">Smart Learning Ecosystem</p>
  </div>
  <div style="padding:40px 32px">
    <h2 style="color:#8ed5ff;font-size:22px;margin-bottom:8px">Welcome, ${displayName}! 👋</h2>
    <p style="color:#94a3b8;line-height:1.7;margin-bottom:24px">
      We're thrilled to have you join the Darhous Smart Learning Ecosystem. You now have full access to:
    </p>
    <div style="display:grid;gap:12px;margin-bottom:32px">
      ${[
        ["🤖","AI Academy","Comprehensive AI courses and learning paths"],
        ["🌐","Language Portal","English proficiency level assessment"],
        ["💻","Digital Exams Portal","IT, Office suite & Cybersecurity exams"],
        ["🎯","AI Mentor","Personalized guidance for your learning journey"],
      ].map(([icon, title, desc]) => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:flex;gap:12px;align-items:start">
          <span style="font-size:24px">${icon}</span>
          <div>
            <p style="margin:0;font-weight:600;color:#e2e8f0;font-size:14px">${title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#64748b">${desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
    <div style="text-align:center">
      <a href="${siteUrl}/en/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px">
        Start Your Journey →
      </a>
    </div>
  </div>
  <div style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
    <p style="color:#475569;font-size:12px;margin:0">Darhous Smart Learning — ${siteUrl}</p>
  </div>
</div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Welcome Email]", err instanceof Error ? err.message : err);
    return NextResponse.json({ skipped: true });
  }
}
