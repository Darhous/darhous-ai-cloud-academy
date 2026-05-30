import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServerSession } from "@/lib/auth/session";

const ALLOWED_ROLES = ["student", "admin"] as const;
type AllowedRole = (typeof ALLOWED_ROLES)[number];

export async function POST(req: NextRequest) {
  // Verify caller is authenticated and is an admin
  const { user, profile } = await getServerSession();
  if (!user || !profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
  }

  let targetId: string;
  let role: AllowedRole;
  try {
    const body = await req.json();
    targetId = body.userId;
    role = body.role;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!targetId || typeof targetId !== "string") {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role. Must be 'student' or 'admin'" }, { status: 400 });
  }
  if (targetId === user.id) {
    return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  // Update role
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", targetId);

  if (updateError) {
    console.error("[Admin Promote] Update failed:", updateError.message);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }

  // Log the action to admin_audit_logs
  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action: role === "admin" ? "promote_to_admin" : "demote_to_student",
    target_type: "user",
    target_id: targetId,
    metadata: { new_role: role, admin_email: profile.email },
  }).then(({ error }) => {
    if (error) console.error("[Admin Promote] Audit log failed:", error.message);
  });

  return NextResponse.json({ success: true, userId: targetId, newRole: role });
}
