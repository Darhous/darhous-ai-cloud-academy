import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "nano-banana";

async function verifyAdmin() {
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the row first to get image_url for cleanup
    const { data: row } = await supabase
      .from("nano_banana_custom_prompts")
      .select("image_url")
      .eq("id", id)
      .single();

    // Delete row
    const { error: dbError } = await supabase
      .from("nano_banana_custom_prompts")
      .delete()
      .eq("id", id);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Delete image from storage (best-effort)
    if (row?.image_url) {
      try {
        const url = new URL(row.image_url);
        // Extract the path after /storage/v1/object/public/nano-banana/
        const parts = url.pathname.split(`/storage/v1/object/public/${BUCKET}/`);
        const filePath = parts[1];
        if (filePath) {
          await supabase.storage.from(BUCKET).remove([filePath]);
        }
      } catch {
        // Ignore — image cleanup is best-effort
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
