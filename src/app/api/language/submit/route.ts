import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { score, level, time_taken, stages_completed, is_incomplete, breakdown, flags_count, wrong_answers } = body;

  if (score === undefined || !level) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const row: Record<string, unknown> = {
    user_id: user.id,
    score: Math.round(score * 10) / 10,
    level,
    time_taken: time_taken ?? 0,
    stages_completed: stages_completed ?? 0,
    is_incomplete: is_incomplete ?? false,
    breakdown: breakdown ?? {},
    flags_count: flags_count ?? 0,
    wrong_answers: wrong_answers ?? [],
  };

  const { data, error } = await supabase
    .from("language_results")
    .insert(row)
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id: data.id });
}
