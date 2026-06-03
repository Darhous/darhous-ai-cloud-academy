import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ results: [] });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ results: [] });

  const limitParam = req.nextUrl.searchParams.get("limit");
  const limit = Math.min(200, Math.max(1, parseInt(limitParam ?? "50", 10)));

  const { data } = await supabase
    .from("digital_exam_results")
    .select("id,subject,subject_label,score,total,percentage,passed,time_taken,flags_count,certificate_id,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return NextResponse.json({ results: data ?? [] });
}
