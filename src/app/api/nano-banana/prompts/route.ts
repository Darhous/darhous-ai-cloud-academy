import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ prompts: [] });

    const { data, error } = await supabase
      .from("nano_banana_custom_prompts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Table may not exist yet
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
