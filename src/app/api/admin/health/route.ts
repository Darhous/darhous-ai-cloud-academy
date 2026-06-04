import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { portals } from "@/config/portals";

export interface HealthCheckResult {
  supabase: boolean;
  gemini: boolean;
  resend: boolean;
  portalsOk: boolean;
  portalsCount: number;
}

export async function GET() {
  // Verify caller is an authenticated admin
  const authSupabase = await createClient();
  if (!authSupabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { data: { user } } = await authSupabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await authSupabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const result: HealthCheckResult = {
    supabase: false,
    gemini: false,
    resend: false,
    portalsOk: false,
    portalsCount: 0,
  };

  // Supabase: real connection test via lightweight query
  try {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.from("profiles").select("id").limit(1);
      result.supabase = !error;
    }
  } catch {
    result.supabase = false;
  }

  // Gemini: env var presence (real ping would cost tokens)
  result.gemini = !!process.env.GEMINI_API_KEY;

  // Resend: env var presence (real ping would send email)
  result.resend = !!process.env.RESEND_API_KEY;

  // Portals: count from registry
  const available = portals.filter((p) => p.status === "available").length;
  result.portalsCount = available;
  result.portalsOk = available >= 6;

  return NextResponse.json(result);
}
