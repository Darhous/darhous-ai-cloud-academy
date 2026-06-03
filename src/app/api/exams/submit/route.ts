import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { subject, subject_label, score, total, time_taken, answers, flags_count, auto_terminated } = body;

  if (!subject || !subject_label || score === undefined || !total) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const percentage = Math.round((score / total) * 100 * 10) / 10;
  const passed = percentage >= 80;

  const { data, error } = await supabase
    .from("digital_exam_results")
    .insert({
      user_id: user.id,
      subject,
      subject_label,
      score,
      total,
      percentage,
      passed,
      time_taken: time_taken ?? 0,
      answers: answers ?? [],
      flags_count: flags_count ?? 0,
      auto_terminated: auto_terminated ?? false,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id: data.id, percentage, passed });
}
