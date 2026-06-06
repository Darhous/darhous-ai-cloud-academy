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

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** PATCH — update fields, upload new image, or archive a prompt.
 *  Accepts either JSON (no image) or multipart/form-data (with image). */
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

    const ALLOWED_FIELDS = [
      "title_ar", "title_en", "description_ar", "description_en",
      "category", "category_label_ar", "category_label_en",
      "difficulty", "best_input_ar", "best_input_en",
      "prompt_ar", "prompt_en", "accent", "emoji",
      "tags", "featured", "status",
    ];

    const updates: Record<string, unknown> = {};
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      // ── FormData path (supports image upload) ──────────────────
      const formData = await req.formData().catch(() => null);
      if (!formData) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

      for (const key of ALLOWED_FIELDS) {
        const val = formData.get(key);
        if (val === null) continue;
        if (key === "featured") {
          updates[key] = val === "true";
        } else if (key === "tags") {
          const raw = (val as string).trim();
          updates[key] = raw ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
        } else {
          updates[key] = (val as string).trim();
        }
      }

      // ── Image upload ──────────────────────────────────────────
      const file = formData.get("image") as File | null;
      const removeImage = formData.get("remove_image") === "true";

      if (removeImage) {
        // Remove existing image from storage (best-effort) and clear url
        const { data: row } = await supabase
          .from("nano_banana_custom_prompts").select("image_url").eq("id", id).single();
        if (row?.image_url) {
          try {
            const url = new URL(row.image_url);
            const parts = url.pathname.split(`/storage/v1/object/public/${BUCKET}/`);
            if (parts[1]) await supabase.storage.from(BUCKET).remove([parts[1]]);
          } catch { /* best-effort */ }
        }
        updates["image_url"] = null;
      } else if (file && file.size > 0) {
        if (!ALLOWED_TYPES.includes(file.type))
          return NextResponse.json({ error: "Only JPG, PNG, WebP, GIF allowed" }, { status: 400 });
        if (file.size > MAX_SIZE)
          return NextResponse.json({ error: "Image too large (max 5 MB)" }, { status: 400 });

        const ext = file.type.split("/")[1] ?? "jpg";
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const buffer = new Uint8Array(await file.arrayBuffer());
        const { error: uploadError } = await supabase.storage
          .from(BUCKET).upload(filePath, buffer, { contentType: file.type, upsert: false });

        if (uploadError) {
          if (uploadError.message?.includes("bucket") || uploadError.message?.includes("Bucket not found"))
            return NextResponse.json({ error: "Storage bucket 'nano-banana' not found.", code: "BUCKET_NOT_FOUND" }, { status: 503 });
          return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        updates["image_url"] = urlData.publicUrl;
      }
    } else {
      // ── JSON path (no image, e.g. archive action) ──────────────
      const body = await req.json() as Record<string, unknown>;
      for (const key of ALLOWED_FIELDS) {
        if (key in body) updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0)
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });

    if ("status" in updates && !["published", "archived", "draft"].includes(updates.status as string))
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });

    const { data, error: dbError } = await supabase
      .from("nano_banana_custom_prompts")
      .update(updates).eq("id", id).select().single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

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
