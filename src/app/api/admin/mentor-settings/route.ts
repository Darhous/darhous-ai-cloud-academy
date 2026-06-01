import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { defaultMentorSettings } from "@/types/ai_mentor_settings";
import type { AIMentorSettings } from "@/types/ai_mentor_settings";

async function verifyAdmin() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, user: null };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { supabase, user: null };
  return { supabase, user };
}

export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ settings: defaultMentorSettings });

    const { data, error } = await supabase
      .from("ai_mentor_settings_store")
      .select("settings")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return NextResponse.json({ settings: defaultMentorSettings });
    return NextResponse.json({ settings: (data?.settings as AIMentorSettings) ?? defaultMentorSettings });
  } catch {
    return NextResponse.json({ settings: defaultMentorSettings });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: { settings: AIMentorSettings } = await req.json();
    const { settings } = body;

    const { data: existing } = await supabase
      .from("ai_mentor_settings_store")
      .select("id")
      .limit(1)
      .maybeSingle();

    const payload = { settings, updated_at: new Date().toISOString(), updated_by: user.id };

    if (existing?.id) {
      await supabase.from("ai_mentor_settings_store").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("ai_mentor_settings_store").insert(payload);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
