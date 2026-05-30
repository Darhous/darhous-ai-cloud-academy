import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`challenge-submit:${ip}`, { limit: 5, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { challengeId, content } = body as { challengeId?: string; content?: string };
  if (!challengeId || !content?.trim()) {
    return NextResponse.json({ error: "challengeId and content required" }, { status: 400 });
  }
  if (content.length > 5000) {
    return NextResponse.json({ error: "Submission too long (max 5000 chars)" }, { status: 400 });
  }

  // Verify challenge exists and is active
  const { data: challenge } = await supabase
    .from("challenges")
    .select("id,is_active")
    .eq("id", challengeId)
    .single();

  if (!challenge || !challenge.is_active) {
    return NextResponse.json({ error: "Challenge not found or inactive" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("challenge_submissions")
    .insert({ challenge_id: challengeId, user_id: user.id, content })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submission: data });
}
