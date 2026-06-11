import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ skipped: true });

  const { email, name, locale } = await req.json();
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const isAr = locale === "ar";
  const displayName = name?.trim() || (isAr ? "المتعلم" : "Learner");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";

  const features = isAr
    ? [
        { icon: "🤖", title: "أكاديمية الذكاء الاصطناعي", desc: "دورات ومسارات تعليمية شاملة" },
        { icon: "🌐", title: "بوابة اللغة", desc: "اختبار تحديد مستوى الإنجليزية" },
        { icon: "💻", title: "اختبارات التحول الرقمي", desc: "IT وOffice والأمن السيبراني" },
        { icon: "🎯", title: "مرشد NexaLearn", desc: "توجيه مخصص لمسيرتك التعليمية" },
        { icon: "⚙️", title: "بوابة الأتمتة", desc: "ابنِ سير عمل ذكية بلا كود" },
        { icon: "💼", title: "البوابة المهنية", desc: "تحليل السيرة الذاتية وتحضير المقابلات" },
      ]
    : [
        { icon: "🤖", title: "AI Academy", desc: "Comprehensive AI courses and paths" },
        { icon: "🌐", title: "Language Portal", desc: "English proficiency assessment" },
        { icon: "💻", title: "Digital Exams", desc: "IT, Office & Cybersecurity exams" },
        { icon: "🎯", title: "NexaLearn Mentor", desc: "Personalized AI learning guide" },
        { icon: "⚙️", title: "Automation Portal", desc: "Build smart workflows without code" },
        { icon: "💼", title: "Career Hub", desc: "CV analysis & interview prep" },
      ];

  const featuresHtml = features
    .map(
      (f) => `
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:14px;">
        <span style="font-size:22px;flex-shrink:0;">${f.icon}</span>
        <div>
          <p style="margin:0;font-weight:600;color:#e2e8f0;font-size:13px;">${f.title}</p>
          <p style="margin:3px 0 0;font-size:11px;color:#64748b;">${f.desc}</p>
        </div>
      </div>`,
    )
    .join("");

  const html = isAr
    ? `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080c14;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#00668a,#571bc1);border-radius:20px 20px 0 0;padding:40px 36px;text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30%;right:-10%;width:260px;height:260px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-40%;left:-5%;width:200px;height:200px;background:rgba(0,0,0,0.12);border-radius:50%;"></div>
      <div style="position:relative;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.55);text-transform:uppercase;font-weight:600;">NexaLearn by Ahmed Darhous</p>
        <h1 style="margin:0;font-size:26px;color:#fff;font-weight:800;line-height:1.3;">مرحباً ${displayName}! 👋</h1>
        <p style="margin:10px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">رحلتك في عالم الذكاء الاصطناعي تبدأ الآن</p>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#0d1321;border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 20px 20px;padding:36px;">
      <p style="color:#94a3b8;line-height:1.8;font-size:15px;margin:0 0 28px;">
        يسعدنا انضمامك إلى <strong style="color:#8ed5ff;">NexaLearn</strong> — المنصة العربية الأولى لتعلم الذكاء الاصطناعي والتحول الرقمي. لديك الآن وصول كامل إلى:
      </p>

      <!-- Features grid -->
      <div style="display:grid;gap:10px;margin-bottom:32px;">
        ${featuresHtml}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:32px 0 28px;">
        <a href="${siteUrl}/ar/dashboard"
           style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:15px 36px;border-radius:14px;font-weight:700;font-size:15px;letter-spacing:0.3px;box-shadow:0 8px 32px rgba(87,27,193,0.35);">
          ابدأ رحلتك الآن ←
        </a>
      </div>

      <!-- Tip -->
      <div style="background:rgba(142,213,255,0.07);border:1px solid rgba(142,213,255,0.15);border-radius:12px;padding:16px 20px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#8ed5ff;font-weight:600;">💡 نصيحة للبداية</p>
        <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">ابدأ بـ <strong style="color:#e2e8f0;">مرشد NexaLearn</strong> — أخبره عن مستواك وهدفك وسيبني لك خطة مخصصة في ثوانٍ.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 0;">
      <p style="color:#334155;font-size:11px;margin:0;">NexaLearn by Ahmed Darhous · <a href="${siteUrl}" style="color:#475569;text-decoration:none;">${siteUrl}</a></p>
      <p style="color:#1e293b;font-size:10px;margin:6px 0 0;"><a href="${siteUrl}/ar/privacy" style="color:#334155;text-decoration:none;">سياسة الخصوصية</a> · <a href="${siteUrl}/ar/terms" style="color:#334155;text-decoration:none;">الشروط والأحكام</a></p>
    </div>
  </div>
</body>
</html>`
    : `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080c14;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#00668a,#571bc1);border-radius:20px 20px 0 0;padding:40px 36px;text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30%;right:-10%;width:260px;height:260px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-40%;left:-5%;width:200px;height:200px;background:rgba(0,0,0,0.12);border-radius:50%;"></div>
      <div style="position:relative;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.55);text-transform:uppercase;font-weight:600;">NexaLearn by Ahmed Darhous</p>
        <h1 style="margin:0;font-size:26px;color:#fff;font-weight:800;line-height:1.3;">Welcome, ${displayName}! 👋</h1>
        <p style="margin:10px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Your AI learning journey starts now</p>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#0d1321;border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 20px 20px;padding:36px;">
      <p style="color:#94a3b8;line-height:1.8;font-size:15px;margin:0 0 28px;">
        We're thrilled to have you join <strong style="color:#8ed5ff;">NexaLearn</strong> — the leading Arabic AI and digital transformation platform. You now have full access to:
      </p>

      <!-- Features grid -->
      <div style="display:grid;gap:10px;margin-bottom:32px;">
        ${featuresHtml}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:32px 0 28px;">
        <a href="${siteUrl}/en/dashboard"
           style="display:inline-block;background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;text-decoration:none;padding:15px 36px;border-radius:14px;font-weight:700;font-size:15px;letter-spacing:0.3px;box-shadow:0 8px 32px rgba(87,27,193,0.35);">
          Start Your Journey →
        </a>
      </div>

      <!-- Tip -->
      <div style="background:rgba(142,213,255,0.07);border:1px solid rgba(142,213,255,0.15);border-radius:12px;padding:16px 20px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#8ed5ff;font-weight:600;">💡 Pro Tip</p>
        <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">Start with the <strong style="color:#e2e8f0;">NexaLearn Mentor</strong> — tell it your level and goal, and it'll build you a custom learning plan in seconds.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 0;">
      <p style="color:#334155;font-size:11px;margin:0;">NexaLearn by Ahmed Darhous · <a href="${siteUrl}" style="color:#475569;text-decoration:none;">${siteUrl}</a></p>
      <p style="color:#1e293b;font-size:10px;margin:6px 0 0;"><a href="${siteUrl}/en/privacy" style="color:#334155;text-decoration:none;">Privacy Policy</a> · <a href="${siteUrl}/en/terms" style="color:#334155;text-decoration:none;">Terms of Service</a></p>
    </div>
  </div>
</body>
</html>`;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: "NexaLearn <noreply@darhous.com>",
      to: email,
      subject: isAr
        ? `مرحباً بك في NexaLearn يا ${displayName} 🎓`
        : `Welcome to NexaLearn, ${displayName}! 🎓`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Welcome Email]", err instanceof Error ? err.message : err);
    return NextResponse.json({ skipped: true });
  }
}
