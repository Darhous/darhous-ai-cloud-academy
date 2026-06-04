import "server-only";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/certificates/verify/[code]
 *
 * Checks ALL 3 certificate systems in order:
 * 1. language_results     (certificate_id column)
 * 2. digital_exam_results (certificate_id column)
 * 3. certificates table   (certificate_code column)
 *
 * Returns unified shape:
 * { valid, certificate: { code, holderName, type, typeLabel, detail, issuedAt, downloadPath? } }
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const upper = code.toUpperCase();

  const adminSupabase = createAdminClient();
  if (!adminSupabase) return NextResponse.json({ valid: false }, { status: 503 });

  // ── 1. Language results ──────────────────────────────────────────────────
  const { data: langResult } = await adminSupabase
    .from("language_results")
    .select("id, certificate_id, level, score, is_incomplete, created_at, user_id")
    .eq("certificate_id", upper)
    .maybeSingle();

  if (langResult) {
    const name = await getHolderName(adminSupabase, langResult.user_id as string);
    return NextResponse.json({
      valid: true,
      certificate: {
        code: upper,
        holderName: name,
        type: "language",
        typeLabel: "English Language Proficiency Assessment",
        detail: `CEFR Level: ${langResult.level} · Score: ${(langResult.score as number).toFixed(1)}%`,
        issuedAt: langResult.created_at,
        downloadPath: `/api/certificates/language/${langResult.id}`,
      },
    });
  }

  // ── 2. Digital exam results ──────────────────────────────────────────────
  const { data: examResult } = await adminSupabase
    .from("digital_exam_results")
    .select("id, certificate_id, subject, subject_label, percentage, created_at, user_id")
    .eq("certificate_id", upper)
    .maybeSingle();

  if (examResult) {
    const name = await getHolderName(adminSupabase, examResult.user_id as string);
    const sub  = (examResult.subject_label as string) || (examResult.subject as string) || "Digital Exam";
    return NextResponse.json({
      valid: true,
      certificate: {
        code: upper,
        holderName: name,
        type: "exams",
        typeLabel: "Digital Transformation Examination",
        detail: `${sub} · Score: ${(examResult.percentage as number).toFixed(0)}%`,
        issuedAt: examResult.created_at,
        downloadPath: `/api/certificates/exams/${examResult.id}`,
      },
    });
  }

  // ── 3. Course certificates table ─────────────────────────────────────────
  const { data: courseCert } = await adminSupabase
    .from("certificates")
    .select("id, certificate_code, course_slug, course_title, issued_at, user_id")
    .eq("certificate_code", upper)
    .maybeSingle();

  if (courseCert) {
    const name = await getHolderName(adminSupabase, courseCert.user_id as string);
    return NextResponse.json({
      valid: true,
      certificate: {
        code: upper,
        holderName: name,
        type: "course",
        typeLabel: "Course Completion Certificate",
        detail: courseCert.course_title as string,
        issuedAt: courseCert.issued_at,
      },
    });
  }

  return NextResponse.json({ valid: false }, { status: 404 });
}

// ── Helper ────────────────────────────────────────────────────────────────────
async function getHolderName(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  userId: string,
): Promise<string> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();
  if (profile?.full_name) return profile.full_name as string;
  const { data: auth } = await supabase.auth.admin.getUserById(userId);
  return auth?.user?.email?.split("@")[0] ?? "Student";
}
