import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 3 subscriptions per 10 minutes per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`subscribe:${ip}`, { limit: 3, windowSec: 600 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, level, interest, source, locale } = await req.json();

    // Stronger email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    const supabase = createAdminClient();
    if (supabase) {
      const { error } = await supabase.from("community_subscribers").upsert(
        { email: normalizedEmail, level, interest, source: source ?? "footer", locale: locale ?? "ar" },
        { onConflict: "email" }
      );
      if (error && !error.message.includes("duplicate")) {
        console.error("[Community Subscribe]", error.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
