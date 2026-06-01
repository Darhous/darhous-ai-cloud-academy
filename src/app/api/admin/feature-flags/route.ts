import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { defaultFeatureFlags } from "@/types/feature_flags";
import type { FeatureFlag } from "@/types/feature_flags";

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
    if (!supabase) return NextResponse.json({ flags: defaultFeatureFlags });

    const { data, error } = await supabase
      .from("feature_flags_store")
      .select("flags")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return NextResponse.json({ flags: defaultFeatureFlags });
    return NextResponse.json({ flags: (data?.flags as FeatureFlag[]) ?? defaultFeatureFlags });
  } catch {
    return NextResponse.json({ flags: defaultFeatureFlags });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: { flags: FeatureFlag[] } = await req.json();
    const { flags } = body;

    const { data: existing } = await supabase
      .from("feature_flags_store")
      .select("id")
      .limit(1)
      .maybeSingle();

    const payload = { flags, updated_at: new Date().toISOString(), updated_by: user.id };

    if (existing?.id) {
      await supabase.from("feature_flags_store").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("feature_flags_store").insert(payload);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
