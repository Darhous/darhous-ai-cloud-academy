import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });

  const { data: cert, error } = await supabase
    .from("certificates")
    .select("id,certificate_code,course_slug,course_title,issued_at,user_id")
    .eq("certificate_code", code.toUpperCase())
    .single();

  if (error || !cert) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  // Get public name without leaking email
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", cert.user_id)
    .single();

  return NextResponse.json({
    valid: true,
    certificate: {
      code: cert.certificate_code,
      courseSlug: cert.course_slug,
      courseTitle: cert.course_title,
      issuedAt: cert.issued_at,
      holderName: profile?.full_name ?? "Student",
    },
  });
}
