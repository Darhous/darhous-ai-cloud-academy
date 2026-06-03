import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET — public: list library items
export async function GET(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ items: [] });

  const subjectFilter = req.nextUrl.searchParams.get("subject");

  let query = supabase
    .from("exam_library_items")
    .select("id,subject_id,title,file_url,file_size_kb,created_at")
    .order("created_at", { ascending: false });

  if (subjectFilter) {
    query = query.eq("subject_id", subjectFilter);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ items: [] });

  return NextResponse.json({ items: data ?? [] });
}

// DELETE — admin only: delete a library item
export async function DELETE(req: NextRequest) {
  const adminSupabase = createAdminClient();
  if (!adminSupabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if ((profile?.role as string) !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await adminSupabase.from("exam_library_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
