import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 3 messages per 10 minutes per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`contact:${ip}`, { limit: 3, windowSec: 600 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const { name, email, subject, message, locale } = await req.json();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (message.trim().length > 5000) {
      return NextResponse.json({ error: "Message too long (max 5000 characters)." }, { status: 400 });
    }

    const safeName = name.trim();
    const safeEmail = email.toLowerCase().trim();
    const safeSubject = subject?.trim() ?? null;
    const safeMessage = message.trim();

    // 1. Save to Supabase contact_messages
    const supabase = createAdminClient();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: safeName,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage,
        source: `contact-${locale ?? "ar"}`,
        status: "new",
      });
      if (error) {
        console.error("[Contact API] Supabase error:", error.message);
      }
    }

    // 2. Send email notification via Resend (optional — skipped if RESEND_API_KEY is missing)
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "ahmeddarhous@gmail.com";
    if (resendKey && resendKey !== "optional_resend_key_here") {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "NexaLearn <noreply@darhous.com>",
          to: toEmail,
          subject: `New contact message: ${safeSubject ?? "(no subject)"} — from ${safeName}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#0c4a6e">New Contact Message — NexaLearn AI Academy</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px;font-weight:bold;color:#475569">Name</td><td style="padding:8px">${safeName}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#475569">Email</td><td style="padding:8px"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#475569">Subject</td><td style="padding:8px">${safeSubject ?? "—"}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#475569">Locale</td><td style="padding:8px">${locale ?? "ar"}</td></tr>
              </table>
              <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;white-space:pre-wrap">${safeMessage}</div>
              <p style="color:#94a3b8;font-size:12px;margin-top:16px">Reply directly to this email to respond to ${safeName}.</p>
            </div>
          `,
          replyTo: safeEmail,
        });
      } catch (emailErr) {
        // Email failure never blocks the response — message is already in Supabase
        console.error("[Contact API] Email notification failed:", emailErr instanceof Error ? emailErr.message : "Unknown");
      }
    } else {
      console.log("[Contact API] RESEND_API_KEY not set — email notification skipped. Message saved to Supabase.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
