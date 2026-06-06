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

/** PATCH — update fields or archive a custom prompt */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as Record<string, unknown>;

    const ALLOWED_FIELDS = [
      "title_ar", "title_en", "description_ar", "description_en",
      "category", "category_label_ar", "category_label_en",
      "difficulty", "best_input_ar", "best_input_en",
      "prompt_ar", "prompt_en", "accent", "emoji",
      "tags", "featured", "status",
    ];

    const updates: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
      if (key in body) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    if (
      "status" in updates &&
      !["published", "archived", "draft"].includes(updates.status as string)
    ) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const { data, error: dbError } = await supabase
      .from("nano_banana_custom_prompts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, prompt: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
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
