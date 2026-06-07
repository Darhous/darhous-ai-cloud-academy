import "server-only";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the current request is from an authenticated admin (profiles.role === "admin").
 * Returns the RLS-respecting client alongside the user so callers can run further queries
 * without re-authenticating. Consolidates the verifyAdmin/requireAdmin copies that were
 * previously duplicated across admin API routes.
 */
export async function verifyAdminRequest(): Promise<{
  supabase: SupabaseClient | null;
  user: User | null;
}> {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, user: null };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { supabase, user: null };
  return { supabase, user };
}
