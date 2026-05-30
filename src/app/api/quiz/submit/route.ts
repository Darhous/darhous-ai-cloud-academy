import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { course_slug, quiz_id, score, total, answers } = await req.json();
  if (!course_slug || !quiz_id || score === undefined || !total) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const percentage = Math.round((score / total) * 100);

  const { error } = await supabase.from("quiz_results").insert({
    user_id: user.id,
    course_slug,
    quiz_id,
    score,
    total,
    percentage,
    answers: answers ?? null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, percentage });
}
