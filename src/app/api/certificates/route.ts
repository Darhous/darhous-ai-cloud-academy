import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { courses } from "@/data/courses";

export async function GET() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ certificates: data ?? [] });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { courseSlug } = body as { courseSlug?: string };
  if (!courseSlug) return NextResponse.json({ error: "courseSlug required" }, { status: 400 });

  // Verify 100% progress
  const { data: progress } = await supabase
    .from("course_progress")
    .select("progress_percent,status")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .single();

  if (!progress || progress.progress_percent < 100) {
    return NextResponse.json({ error: "Course not completed yet" }, { status: 400 });
  }

  const course = courses.find((c) => c.id === courseSlug);
  const courseTitle = course ? `${course.titleEn} / ${course.titleAr}` : courseSlug;

  const { data: cert, error } = await supabase
    .from("certificates")
    .insert({ user_id: user.id, course_slug: courseSlug, course_title: courseTitle })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // Already issued
      const { data: existing } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_slug", courseSlug)
        .single();
      return NextResponse.json({ certificate: existing, alreadyIssued: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ certificate: cert, alreadyIssued: false });
}
