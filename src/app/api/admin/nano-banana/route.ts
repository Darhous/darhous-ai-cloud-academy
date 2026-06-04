import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
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

/** POST — upload image + save prompt row */
export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    // ── Required fields ──────────────────────────────────────────
    const titleAr = (formData.get("title_ar") as string | null)?.trim();
    const promptAr = (formData.get("prompt_ar") as string | null)?.trim();
    if (!titleAr || !promptAr) {
      return NextResponse.json({ error: "title_ar and prompt_ar are required" }, { status: 400 });
    }

    // ── Optional fields with smart defaults ──────────────────────
    const titleEn         = (formData.get("title_en") as string | null)?.trim()          ?? titleAr;
    const descriptionAr   = (formData.get("description_ar") as string | null)?.trim()    ?? "";
    const descriptionEn   = (formData.get("description_en") as string | null)?.trim()    ?? descriptionAr;
    const category        = (formData.get("category") as string | null)?.trim()          ?? "fun";
    const categoryLabelAr = (formData.get("category_label_ar") as string | null)?.trim() ?? getCategoryLabel(category, "ar");
    const categoryLabelEn = (formData.get("category_label_en") as string | null)?.trim() ?? getCategoryLabel(category, "en");
    const difficulty      = (formData.get("difficulty") as string | null)?.trim()        ?? "beginner";
    const bestInputAr     = (formData.get("best_input_ar") as string | null)?.trim()     ?? "صورة واضحة للوجه";
    const bestInputEn     = (formData.get("best_input_en") as string | null)?.trim()     ?? "Clear face photo";
    const promptEn        = (formData.get("prompt_en") as string | null)?.trim()         ?? promptAr;
    const accent          = (formData.get("accent") as string | null)?.trim()            ?? "#f59e0b";
    const emoji           = (formData.get("emoji") as string | null)?.trim()             ?? "🍌";
    const tagsRaw         = (formData.get("tags") as string | null)?.trim()              ?? "";
    const tags            = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const featured        = formData.get("featured") === "true";
    const gradient        = (formData.get("gradient") as string | null)?.trim()
      ?? `linear-gradient(135deg, ${accent}30 0%, ${accent}08 100%)`;

    // ── Image upload ──────────────────────────────────────────────
    let imageUrl: string | null = null;
    const file = formData.get("image") as File | null;

    if (file && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Only JPG, PNG, WebP, GIF images allowed" },
          { status: 400 },
        );
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Image too large (max 5 MB)" },
          { status: 400 },
        );
      }

      const ext = file.type.split("/")[1] ?? "jpg";
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const buffer = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, buffer, { contentType: file.type, upsert: false });

      if (uploadError) {
        if (
          uploadError.message?.includes("Bucket not found") ||
          uploadError.message?.includes("bucket")
        ) {
          return NextResponse.json(
            {
              error:
                "Storage bucket 'nano-banana' not found. Create it in Supabase Dashboard → Storage.",
              code: "BUCKET_NOT_FOUND",
            },
            { status: 503 },
          );
        }
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    // ── Insert row ────────────────────────────────────────────────
    const { data: inserted, error: dbError } = await supabase
      .from("nano_banana_custom_prompts")
      .insert({
        title_ar: titleAr,
        title_en: titleEn,
        description_ar: descriptionAr,
        description_en: descriptionEn,
        category,
        category_label_ar: categoryLabelAr,
        category_label_en: categoryLabelEn,
        difficulty,
        best_input_ar: bestInputAr,
        best_input_en: bestInputEn,
        prompt_ar: promptAr,
        prompt_en: promptEn,
        accent,
        gradient,
        emoji,
        tags,
        featured,
        image_url: imageUrl,
        created_by: user.id,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, prompt: inserted });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

/** GET — list all custom prompts (admin) */
export async function GET() {
  try {
    const { supabase, user } = await verifyAdmin();
    if (!supabase || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("nano_banana_custom_prompts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (error.message?.includes("does not exist") || error.code === "42P01") {
        return NextResponse.json({ prompts: [] });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ prompts: data ?? [] });
  } catch {
    return NextResponse.json({ prompts: [] });
  }
}

// ── Helpers ───────────────────────────────────────────────────────
function getCategoryLabel(cat: string, lang: "ar" | "en") {
  const map: Record<string, { ar: string; en: string }> = {
    portrait:     { ar: "بورتريه",  en: "Portrait" },
    art:          { ar: "فن",       en: "Art" },
    product:      { ar: "منتج",     en: "Product" },
    social:       { ar: "سوشيال",   en: "Social" },
    fun:          { ar: "ترفيه",    en: "Fun" },
    professional: { ar: "احترافي",  en: "Professional" },
  };
  return map[cat]?.[lang] ?? (lang === "ar" ? "ترفيه" : "Fun");
}
