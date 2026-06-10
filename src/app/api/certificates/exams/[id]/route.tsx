import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { v4 as uuid } from "uuid";
import { registerFonts, generateQR, buildVerifyUrl } from "@/lib/certificates/loadAssets";
import { CertificateTemplate } from "@/lib/certificates/CertificateTemplate";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Session verification — must be authenticated
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminSupabase = createAdminClient();
  if (!adminSupabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: result } = await adminSupabase
    .from("digital_exam_results")
    .select("*")
    .eq("id", id)
    .single();

  if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });

  // Ownership check — only the result owner may download their certificate
  if ((result.user_id as string) !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!(result.passed as boolean)) {
    return NextResponse.json(
      { error: "Certificate only issued for passing results (80%+)" },
      { status: 403 },
    );
  }

  // Get display name
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("full_name")
    .eq("id", result.user_id)
    .single();
  const { data: authData } = await adminSupabase.auth.admin.getUserById(result.user_id as string);
  const displayName =
    (profile?.full_name as string | null)?.trim() ||
    authData?.user?.email?.split("@")[0] ||
    "Candidate";

  // Persist certId
  const certId = (result.certificate_id as string | null) ?? uuid().toUpperCase().slice(0, 12);
  if (!result.certificate_id) {
    await adminSupabase.from("digital_exam_results").update({ certificate_id: certId }).eq("id", id);
  }

  // Load assets
  const fontOk = await registerFonts();
  const verifyUrl = buildVerifyUrl(certId, "ar");
  const qrDataUrl = await generateQR(verifyUrl);

  const percentage   = result.percentage as number;
  const subjectLabel = (result.subject_label as string) || (result.subject as string) || "Digital Transformation";
  const scoreColor   = percentage >= 90 ? "#16a34a" : percentage >= 80 ? "#2563eb" : "#7c3aed";
  const issueDate    = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const year         = new Date().getFullYear();

  const pdfBuffer = await renderToBuffer(
    <CertificateTemplate
      holderName={displayName}
      certTypeLabel="CERTIFICATE OF ACHIEVEMENT"
      academySubtitle="D I G I T A L   T R A N S F O R M A T I O N   E X A M S"
      bodyLine1="has successfully completed the Darhous Digital Transformation Examination"
      bodyLine2={subjectLabel}
      box1Label="SCORE"
      box1Value={`${percentage.toFixed(0)}%`}
      box1Color={scoreColor}
      box2Label="STATUS"
      box2Value="PASSED ✓"
      box2Color="#14532d"
      dateIssued={`Date of Issue: ${issueDate}`}
      certId={certId}
      qrDataUrl={qrDataUrl}
      year={year}
      useDancingScript={fontOk}
    />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="darhous-exam-cert-${certId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
