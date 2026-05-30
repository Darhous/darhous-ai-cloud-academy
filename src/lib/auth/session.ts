// Server-only helper — safe to import in Server Components and route handlers.
import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/auth/roles";

export async function getServerSession() {
  try {
    const supabase = await createClient();
    if (!supabase) return { user: null, profile: null };

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) return { user: null, profile: null };

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return { user, profile: (profile as UserProfile) ?? null };
  } catch {
    return { user: null, profile: null };
  }
}
