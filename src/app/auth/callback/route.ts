import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const locale = searchParams.get("locale") ?? "ar";

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        // Password recovery flow → redirect to reset-password page
        if (type === "recovery") {
          return NextResponse.redirect(`${origin}/${locale}/reset-password`);
        }

        // Normal sign-in: check role for redirect destination
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const dest = profile?.role === "admin" ? "admin" : "dashboard";
        return NextResponse.redirect(`${origin}/${locale}/${dest}`);
      }
    }
  }

  // Fallback: redirect to login with error
  return NextResponse.redirect(`${origin}/${locale}/login?error=auth_failed`);
}
