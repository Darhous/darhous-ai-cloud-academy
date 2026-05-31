import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ results: [] });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ results: [] });

  const { data } = await supabase
    .from("digital_exam_results")
    .select("id,subject,subject_label,percentage,passed,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({ results: data ?? [] });
}
