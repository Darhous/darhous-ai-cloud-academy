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

    // Save to Supabase contact_messages
    const supabase = createAdminClient();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject?.trim() ?? null,
        message: message.trim(),
        source: `contact-${locale ?? "ar"}`,
        status: "new",
      });

      if (error) {
        console.error("[Contact API] Supabase error:", error.message);
        // Don't fail the request if DB insert fails — message still sent via FormSubmit
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
