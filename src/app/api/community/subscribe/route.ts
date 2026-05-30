import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { email, level, interest, source, locale } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (supabase) {
      const { error } = await supabase.from("community_subscribers").upsert(
        { email: email.toLowerCase().trim(), level, interest, source: source ?? "footer", locale: locale ?? "ar" },
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
