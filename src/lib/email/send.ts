import "server-only";
import type { EmailTemplate } from "./templates";

interface SendEmailOptions {
  to: string;
  template: EmailTemplate;
  from?: string;
}

interface SendResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * Send an email using Resend API.
 * Returns { success: false } gracefully if RESEND_API_KEY is not configured.
 */
export async function sendEmail({ to, template, from }: SendEmailOptions): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not configured — email skipped:", template.subject);
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const fromAddress = from ?? (process.env.CONTACT_TO_EMAIL
      ? `NexaLearn AI Academy <noreply@${process.env.CONTACT_TO_EMAIL.split("@")[1] ?? "darhous.ai"}>`
      : "NexaLearn AI Academy <noreply@darhous.ai>");

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Send error:", message);
    return { success: false, error: message };
  }
}

/**
 * Track an email sequence event in Supabase.
 * Call this after sending to avoid duplicate sends.
 */
export async function trackEmailEvent(options: {
  email: string;
  userId?: string | null;
  sequenceName: string;
  stepKey: string;
  status: "sent" | "failed" | "skipped";
}) {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return;

    const admin = createClient(url, key, { auth: { persistSession: false } });
    await admin.from("email_sequence_events").insert({
      email: options.email,
      user_id: options.userId ?? null,
      sequence_name: options.sequenceName,
      step_key: options.stepKey,
      status: options.status,
      sent_at: options.status === "sent" ? new Date().toISOString() : null,
    });
  } catch {
    // Non-fatal
  }
}
