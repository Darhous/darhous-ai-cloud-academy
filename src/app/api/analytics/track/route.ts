import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const ALLOWED_EVENTS = new Set([
  "prompt_copied",
  "nano_banana_saved",
  "community_signup",
  "certificate_generated",
  "challenge_submitted",
  "prompt_scored",
  "prompt_battle",
  "tool_compared",
  "project_started",
  "plan_saved",
]);

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`analytics:${ip}`, { limit: 60, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ ok: true }); // Silent drop
  }

  const body = await req.json().catch(() => ({}));
  const { eventName, entityType, entitySlug, metadata } = body as {
    eventName?: string; entityType?: string; entitySlug?: string; metadata?: unknown;
  };

  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true }); // Silent ignore unknown events
  }

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ ok: true });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from("analytics_events").insert({
    user_id: user?.id ?? null,
    event_name: eventName,
    entity_type: entityType ?? null,
    entity_slug: entitySlug ?? null,
    metadata: metadata ?? null,
  });

  return NextResponse.json({ ok: true });
}
