import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const locale = searchParams.get("locale") ?? "ar";

  // Always use NEXT_PUBLIC_SITE_URL for redirects so localhost never leaks
  // into production even if the request somehow arrives with a wrong origin.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (origin.includes("localhost") ? "https://darhous-ai-cloud-academy.vercel.app" : origin);

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        // Password recovery flow → redirect to reset-password page
        if (type === "recovery") {
          return NextResponse.redirect(`${siteUrl}/${locale}/reset-password`);
        }

        // Normal sign-in: check role + onboarding status
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role === "admin") {
          return NextResponse.redirect(`${siteUrl}/${locale}/admin`);
        }

        // Check if onboarding is completed
        const { data: studentProfile } = await supabase
          .from("student_profiles")
          .select("onboarding_completed")
          .eq("user_id", data.user.id)
          .single();

        const dest = studentProfile?.onboarding_completed ? "dashboard" : "onboarding";
        return NextResponse.redirect(`${siteUrl}/${locale}/${dest}`);
      }
    }
  }

  // Fallback: redirect to login with error
  return NextResponse.redirect(`${siteUrl}/${locale}/login?error=auth_failed`);
}
