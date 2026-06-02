import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [{ data: saved }, { data: labs }, { data: checklists }] = await Promise.all([
    supabase.from("automation_saved_recipes").select("recipe_id, saved_at").eq("user_id", user.id),
    supabase.from("automation_lab_progress").select("lab_id, checked_items, completed, updated_at").eq("user_id", user.id),
    supabase.from("automation_recipe_checklist").select("recipe_id, checked_items, updated_at").eq("user_id", user.id),
  ]);

  return NextResponse.json({
    savedRecipes: (saved ?? []).map((r) => r.recipe_id),
    labProgress: labs ?? [],
    recipeChecklists: checklists ?? [],
  });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: {
    type: "save_recipe" | "unsave_recipe" | "lab_progress" | "recipe_checklist";
    recipeId?: string;
    labId?: string;
    checkedItems?: boolean[];
    completed?: boolean;
  } = await req.json();

  if (body.type === "save_recipe" && body.recipeId) {
    await supabase.from("automation_saved_recipes").upsert(
      { user_id: user.id, recipe_id: body.recipeId, saved_at: new Date().toISOString() },
      { onConflict: "user_id,recipe_id" }
    );
    return NextResponse.json({ success: true });
  }

  if (body.type === "unsave_recipe" && body.recipeId) {
    await supabase.from("automation_saved_recipes")
      .delete()
      .eq("user_id", user.id)
      .eq("recipe_id", body.recipeId);
    return NextResponse.json({ success: true });
  }

  if (body.type === "lab_progress" && body.labId) {
    const total = body.checkedItems?.length ?? 0;
    const done = body.checkedItems?.filter(Boolean).length ?? 0;
    await supabase.from("automation_lab_progress").upsert(
      {
        user_id: user.id,
        lab_id: body.labId,
        checked_items: body.checkedItems ?? [],
        completed: total > 0 && done === total,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lab_id" }
    );
    return NextResponse.json({ success: true });
  }

  if (body.type === "recipe_checklist" && body.recipeId) {
    await supabase.from("automation_recipe_checklist").upsert(
      {
        user_id: user.id,
        recipe_id: body.recipeId,
        checked_items: body.checkedItems ?? [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,recipe_id" }
    );
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
