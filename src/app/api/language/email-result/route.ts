import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateFeedback } from "@/data/language-feedback";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { result_id: string };
  const { result_id } = body;
  if (!result_id) return NextResponse.json({ error: "Missing result_id" }, { status: 400 });

  // Fetch result — must belong to current user
  const { data: result } = await supabase
    .from("language_results")
    .select("*")
    .eq("id", result_id)
    .eq("user_id", user.id)
    .single();

  if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ sent: false, reason: "Email not configured" });

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  const feedback = generateFeedback(
    result.score,
    result.level,
    result.breakdown?.grammar ?? 0,
    result.breakdown?.vocabulary ?? 0,
    result.breakdown?.reading ?? 0,
    result.stages_completed ?? 0,
    result.is_incomplete ?? false,
  );

  const userName = user.email?.split("@")[0] ?? "Student";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";
  const verifyUrl = result.certificate_id ? `${siteUrl}/en/language/verify/${result.certificate_id}` : null;

  const html = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head><meta charset="UTF-8" /><title>Your Darhous English Assessment Results</title></head>
<body style="margin:0;padding:0;background:#0f0a1e;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px">
      <div style="font-size:28px;font-weight:900;color:#d0bcff;letter-spacing:0.05em">DARHOUS ACADEMY</div>
      <div style="font-size:13px;color:#94a3b8;margin-top:4px">English Language Assessment Results</div>
    </div>

    <!-- Level card -->
    <div style="background:linear-gradient(135deg,#1e1535,#2a1a4e);border:2px solid #d0bcff40;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px">
      <div style="font-size:72px;font-weight:900;color:#d0bcff;line-height:1">${result.level}</div>
      <div style="font-size:32px;font-weight:700;color:#fff;margin:8px 0">${result.score.toFixed(1)}%</div>
      <div style="font-size:14px;color:#94a3b8">Hi ${userName} — here are your results</div>
    </div>

    <!-- Skill breakdown -->
    <div style="background:#1a1035;border:1px solid #2d2060;border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="font-size:14px;font-weight:700;color:#d0bcff;margin-bottom:16px">Skills Breakdown</div>
      ${["Grammar", "Vocabulary", "Reading"].map((sk, i) => {
        const pct = [result.breakdown?.grammar ?? 0, result.breakdown?.vocabulary ?? 0, result.breakdown?.reading ?? 0][i];
        const col = ["#d0bcff", "#4ade80", "#3ce0fb"][i];
        return `<div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
            <span style="color:#e2e8f0">${sk}</span><span style="color:${col};font-weight:700">${Math.round(pct)}%</span>
          </div>
          <div style="height:6px;background:#2d2060;border-radius:3px">
            <div style="height:6px;width:${pct}%;background:${col};border-radius:3px"></div>
          </div>
        </div>`;
      }).join("")}
    </div>

    <!-- Encouragement -->
    <div style="background:#1a1035;border:1px solid #2d2060;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;color:#94a3b8;font-style:italic">
      ${feedback.encouragement}
    </div>

    <!-- Strengths -->
    <div style="background:#1a1035;border:1px solid #2d2060;border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="font-size:13px;font-weight:700;color:#4ade80;margin-bottom:10px">✓ STRENGTHS</div>
      ${feedback.strengths.map((s) => `<div style="font-size:12px;color:#94a3b8;margin-bottom:6px;padding-left:8px">• ${s}</div>`).join("")}
    </div>

    <!-- Top advice -->
    <div style="background:#1a1035;border:1px solid #2d2060;border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="font-size:13px;font-weight:700;color:#3ce0fb;margin-bottom:10px">📚 Study Recommendations</div>
      ${feedback.advice.slice(0, 5).map((tip, i) => `<div style="font-size:12px;color:#94a3b8;margin-bottom:8px"><strong style="color:#3ce0fb">${i + 1}.</strong> ${tip}</div>`).join("")}
    </div>

    <!-- Weekly plan -->
    <div style="background:#1a1035;border:1px solid #2d2060;border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="font-size:13px;font-weight:700;color:#d0bcff;margin-bottom:10px">📅 Weekly Study Plan</div>
      ${feedback.weekly_plan.map((day) => `<div style="font-size:12px;color:#94a3b8;margin-bottom:6px;padding-left:8px">${day}</div>`).join("")}
    </div>

    <!-- CTA buttons -->
    <div style="text-align:center;margin-top:24px">
      <a href="${siteUrl}/en/dashboard" style="display:inline-block;background:#d0bcff;color:#1a0a2e;font-weight:700;font-size:14px;padding:12px 28px;border-radius:12px;text-decoration:none;margin:0 6px 12px">
        View Dashboard
      </a>
      <a href="${siteUrl}/en/language/assessment" style="display:inline-block;background:#2d2060;color:#d0bcff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:12px;text-decoration:none;margin:0 6px 12px">
        Retake Assessment
      </a>
    </div>
    ${verifyUrl ? `<div style="text-align:center;margin-top:12px"><a href="${verifyUrl}" style="font-size:12px;color:#94a3b8;text-decoration:underline">Verify Certificate</a></div>` : ""}

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;font-size:11px;color:#4a4a6a;border-top:1px solid #2d2060;padding-top:16px">
      Darhous Academy · Smart Learning Ecosystem<br/>
      <a href="mailto:ahmeddarhous@gmail.com" style="color:#4a4a6a">ahmeddarhous@gmail.com</a>
    </div>

  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "Darhous Academy <noreply@darhous.com>",
      to: user.email!,
      subject: `Your English Level: ${result.level} — ${result.score.toFixed(1)}% | Darhous Academy`,
      html,
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ sent: false, reason: "Send failed" });
  }
}
