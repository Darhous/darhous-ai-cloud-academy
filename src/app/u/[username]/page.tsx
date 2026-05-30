import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import PublicProfileClient from "./PublicProfileClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function generateMetadata({
  params,
}: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} | Darhous AI Academy`,
    description: `Public profile of ${username} on Darhous AI Cloud Academy`,
    robots: { index: true, follow: true },
  };
}

export default async function PublicProfilePage({
  params,
}: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  if (!supabaseUrl || !supabaseKey) {
    return <PublicProfileClient username={username} profile={null} notConfigured />;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  const { data: pubProfile } = await supabase
    .from("public_profiles")
    .select("user_id,username,display_name,bio,is_public,show_certificates,show_streak,show_projects")
    .eq("username", username)
    .eq("is_public", true)
    .single();

  if (!pubProfile) notFound();

  // Get public data
  const [profileRes, certRes, cpRes, lpRes] = await Promise.all([
    supabase.from("profiles").select("full_name,avatar_url,created_at").eq("id", pubProfile.user_id).single(),
    pubProfile.show_certificates
      ? supabase.from("certificates").select("course_slug,course_title,certificate_code,issued_at").eq("user_id", pubProfile.user_id).order("issued_at", { ascending: false })
      : Promise.resolve({ data: [] }),
    supabase.from("course_progress").select("course_slug,status,progress_percent").eq("user_id", pubProfile.user_id).eq("status", "completed"),
    pubProfile.show_streak
      ? supabase.from("lesson_progress").select("completed_at").eq("user_id", pubProfile.user_id).eq("completed", true).not("completed_at", "is", null)
      : Promise.resolve({ data: [] }),
  ]);

  // Calculate streak
  const timestamps = (lpRes.data ?? []).map((r: { completed_at: string }) => r.completed_at);
  let streak = 0;
  if (timestamps.length > 0) {
    const toDay = (ts: string) => ts.slice(0, 10);
    const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < uniqueDays.length; i++) {
        const prev = new Date(uniqueDays[i - 1]);
        const curr = new Date(uniqueDays[i]);
        if (Math.round((prev.getTime() - curr.getTime()) / 864e5) === 1) streak++;
        else break;
      }
    }
  }

  return (
    <PublicProfileClient
      username={username}
      profile={{
        displayName: pubProfile.display_name ?? profileRes.data?.full_name ?? username,
        bio: pubProfile.bio ?? null,
        avatarUrl: profileRes.data?.avatar_url ?? null,
        joinedAt: profileRes.data?.created_at ?? null,
        certificates: certRes.data ?? [],
        completedCourses: cpRes.data ?? [],
        streak: pubProfile.show_streak ? streak : null,
        showCertificates: pubProfile.show_certificates,
        showStreak: pubProfile.show_streak,
        showProjects: pubProfile.show_projects,
      }}
    />
  );
}
