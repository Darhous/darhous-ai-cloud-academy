import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { course_slug, lesson_id, completed } = await req.json();
  if (!course_slug || !lesson_id) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // Upsert lesson progress
  const { error: lessonError } = await supabase.from("lesson_progress").upsert({
    user_id: user.id,
    course_slug,
    lesson_id,
    completed: !!completed,
    completed_at: completed ? new Date().toISOString() : null,
  }, { onConflict: "user_id,course_slug,lesson_id" });

  if (lessonError) return NextResponse.json({ error: lessonError.message }, { status: 500 });

  // Recalculate course progress percent
  const { data: allLessons } = await supabase
    .from("lesson_progress")
    .select("completed")
    .eq("user_id", user.id)
    .eq("course_slug", course_slug);

  const total = allLessons?.length ?? 0;
  const done = allLessons?.filter(l => l.completed).length ?? 0;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  // Upsert course_progress
  await supabase.from("course_progress").upsert({
    user_id: user.id,
    course_slug,
    status: percent === 100 ? "completed" : "started",
    progress_percent: percent,
    started_at: new Date().toISOString(),
    completed_at: percent === 100 ? new Date().toISOString() : null,
    last_opened_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,course_slug" });

  return NextResponse.json({ success: true, progress_percent: percent });
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ completed: [] });

  const { searchParams } = new URL(req.url);
  const course_slug = searchParams.get("course_slug");
  if (!course_slug) return NextResponse.json({ error: "Missing course_slug" }, { status: 400 });

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id)
    .eq("course_slug", course_slug)
    .eq("completed", true);

  return NextResponse.json({ completed: data?.map(d => d.lesson_id) ?? [] });
}
