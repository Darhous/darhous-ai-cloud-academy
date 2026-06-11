// Email templates for NexaLearn
// Used by src/lib/email/send.ts via Resend API

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";

// ── Welcome Email ────────────────────────────────────────────
export function welcomeTemplate(name: string, locale: string = "ar"): EmailTemplate {
  const isAr = locale === "ar";
  const subject = isAr
    ? `مرحباً بك في NexaLearn يا ${name}! 🎓`
    : `Welcome to NexaLearn, ${name}! 🎓`;

  const html = `
<!DOCTYPE html>
<html dir="${isAr ? "rtl" : "ltr"}" lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:${isAr ? "'IBM Plex Sans Arabic', Arial" : "system-ui, Arial"}, sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#00668a22,#571bc11e);border:1px solid #8ed5ff1e;border-radius:16px;padding:40px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="font-size:48px;margin-bottom:8px;">🎓</div>
        <h1 style="color:#8ed5ff;font-size:24px;margin:0;">
          ${isAr ? `مرحباً يا ${name}!` : `Welcome, ${name}!`}
        </h1>
      </div>
      <p style="color:#b0c4d8;line-height:1.7;font-size:16px;">
        ${isAr
          ? "نحن سعداء بانضمامك إلى NexaLearn — المنصة العربية الأولى للذكاء الاصطناعي. رحلتك تبدأ الآن!"
          : "We're thrilled to have you join NexaLearn by Ahmed Darhous. Your AI journey starts now!"}
      </p>
      <div style="margin:24px 0;">
        ${isAr ? `
        <p style="color:#8ed5ff;font-weight:bold;margin-bottom:12px;">ابدأ بـ:</p>
        <ul style="color:#b0c4d8;line-height:2;">
          <li>🎯 <a href="${BASE_URL}/ar/paths" style="color:#8ed5ff;">استكشف مسارات التعلم</a></li>
          <li>🤖 <a href="${BASE_URL}/ar/mentor" style="color:#8ed5ff;">تحدث مع مرشد AI</a></li>
          <li>🍌 <a href="${BASE_URL}/ar/nano-banana-prompts" style="color:#8ed5ff;">جرّب Nano Banana Lab</a></li>
          <li>📊 <a href="${BASE_URL}/ar/dashboard" style="color:#8ed5ff;">لوحة الطالب</a></li>
        </ul>
        ` : `
        <p style="color:#8ed5ff;font-weight:bold;margin-bottom:12px;">Get started with:</p>
        <ul style="color:#b0c4d8;line-height:2;">
          <li>🎯 <a href="${BASE_URL}/en/paths" style="color:#8ed5ff;">Explore Learning Paths</a></li>
          <li>🤖 <a href="${BASE_URL}/en/mentor" style="color:#8ed5ff;">Chat with AI Mentor</a></li>
          <li>🍌 <a href="${BASE_URL}/en/nano-banana-prompts" style="color:#8ed5ff;">Try Nano Banana Lab</a></li>
          <li>📊 <a href="${BASE_URL}/en/dashboard" style="color:#8ed5ff;">Student Dashboard</a></li>
        </ul>
        `}
      </div>
      <div style="text-align:center;margin-top:32px;">
        <a href="${BASE_URL}/${locale}/dashboard" style="background:linear-gradient(135deg,#00668a,#571bc1);color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;display:inline-block;">
          ${isAr ? "ابدأ التعلم الآن" : "Start Learning Now"}
        </a>
      </div>
    </div>
    <p style="text-align:center;color:#4a5568;font-size:12px;margin-top:24px;">
      NexaLearn by Ahmed Darhous •
      <a href="${BASE_URL}/${locale}/privacy" style="color:#4a5568;">
        ${isAr ? "الخصوصية" : "Privacy"}
      </a>
    </p>
  </div>
</body>
</html>`;

  const text = isAr
    ? `مرحباً يا ${name}!\n\nمرحباً بك في NexaLearn by Ahmed Darhous.\nابدأ التعلم على: ${BASE_URL}/${locale}/dashboard`
    : `Welcome, ${name}!\n\nWelcome to NexaLearn by Ahmed Darhous.\nStart learning at: ${BASE_URL}/${locale}/dashboard`;

  return { subject, html, text };
}

// ── Day-3 Re-engagement ──────────────────────────────────────
export function day3ReminderTemplate(name: string, locale: string = "ar"): EmailTemplate {
  const isAr = locale === "ar";
  const subject = isAr
    ? "لم تكمل رحلتك بعد 🔥"
    : "Your AI journey is waiting 🔥";

  const html = `
<!DOCTYPE html>
<html dir="${isAr ? "rtl" : "ltr"}" lang="${locale}">
<body style="margin:0;padding:0;background:#0a0f1e;font-family:system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#00668a22,#f9731622);border:1px solid #f973161e;border-radius:16px;padding:40px;">
      <div style="text-align:center;font-size:48px;">🔥</div>
      <h1 style="color:#f97316;text-align:center;">
        ${isAr ? `${name}، أين أنت؟` : `${name}, where have you been?`}
      </h1>
      <p style="color:#b0c4d8;line-height:1.7;">
        ${isAr
          ? "مرت 3 أيام منذ آخر زيارة. الاستمرارية هي سر التعلم — حتى 15 دقيقة يومياً تصنع فرقاً!"
          : "It's been 3 days since your last visit. Consistency is the secret to learning — even 15 minutes a day makes a difference!"}
      </p>
      <div style="text-align:center;margin-top:24px;">
        <a href="${BASE_URL}/${locale}/dashboard" style="background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;display:inline-block;">
          ${isAr ? "استأنف التعلم" : "Resume Learning"}
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;

  return {
    subject,
    html,
    text: isAr ? `${name}، مرت 3 أيام! استأنف التعلم: ${BASE_URL}/${locale}/dashboard` : `${name}, it's been 3 days! Resume learning: ${BASE_URL}/${locale}/dashboard`,
  };
}

// ── Weekly Digest (placeholder) ──────────────────────────────
export function weeklyDigestTemplate(name: string, locale: string = "ar"): EmailTemplate {
  const isAr = locale === "ar";
  return {
    subject: isAr ? "ملخصك الأسبوعي من NexaLearn 📊" : "Your weekly digest from NexaLearn 📊",
    html: `<p>${isAr ? `مرحباً ${name}` : `Hello ${name}`}</p><p>${isAr ? "ملخص الأسبوع قادم قريباً!" : "Weekly digest coming soon!"}</p>`,
    text: isAr ? `مرحباً ${name} — ملخص الأسبوع` : `Hello ${name} — weekly digest`,
  };
}
