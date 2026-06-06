import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ prompts: [] });

    const { data, error } = await supabase
      .from("nano_banana_custom_prompts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      // Table or column may not exist yet — degrade gracefully
      if (
        error.message?.includes("does not exist") ||
        error.code === "42P01" || // table not found
        error.code === "42703"    // column not found (status col not migrated yet)
      ) {
        return NextResponse.json({ prompts: [] });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ prompts: data ?? [] });
  } catch {
    return NextResponse.json({ prompts: [] });
  }
}
