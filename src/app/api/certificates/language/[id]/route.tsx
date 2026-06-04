import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { v4 as uuid } from "uuid";
import { registerFonts, generateQR, buildVerifyUrl } from "@/lib/certificates/loadAssets";
import { CertificateTemplate } from "@/lib/certificates/CertificateTemplate";

// CEFR level → accent color
const LEVEL_COLORS: Record<string, string> = {
  A1A: "#c0392b", A1B: "#c0392b",
  A2A: "#e67e22", A2B: "#e67e22",
  B1A: "#d4ac0d", B1B: "#27ae60",
  B2A: "#27ae60", B2B: "#16a085",
  C1A: "#2980b9", C1B: "#2980b9",
  C2:  "#6c3483",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const adminSupabase = createAdminClient();
  if (!adminSupabase) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data: result } = await adminSupabase
    .from("language_results")
    .select("*")
    .eq("id", id)
    .single();

  if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });

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
    await adminSupabase.from("language_results").update({ certificate_id: certId }).eq("id", id);
  }

  // Load assets
  const fontOk = await registerFonts();
  const verifyUrl = buildVerifyUrl(certId, "ar");
  const qrDataUrl = await generateQR(verifyUrl);

  const level       = (result.level as string) ?? "A1";
  const score       = (result.score as number) ?? 0;
  const isIncomplete = result.is_incomplete as boolean;
  const stagesDone  = (result.stages_completed as number) ?? 10;
  const levelColor  = LEVEL_COLORS[level] ?? "#4761e0";
  const issueDate   = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const year        = new Date().getFullYear();

  const pdfBuffer = await renderToBuffer(
    <CertificateTemplate
      holderName={displayName}
      certTypeLabel={isIncomplete ? "CERTIFICATE OF PARTIAL COMPLETION" : "CERTIFICATE OF COMPLETION"}
      academySubtitle="E N G L I S H   L A N G U A G E   P R O F I C I E N C Y"
      bodyLine1={
        isIncomplete
          ? `has completed Stage ${stagesDone} of 10 of the Darhous English Language Assessment`
          : "has successfully completed the Darhous English Language Placement Assessment"
      }
      bodyLine2="and has been awarded the following CEFR proficiency level"
      box1Label="CEFR LEVEL"
      box1Value={level}
      box1Color={levelColor}
      box2Label="OVERALL SCORE"
      box2Value={`${score.toFixed(1)}%`}
      box2Color="#1a2a6e"
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
      "Content-Disposition": `attachment; filename="darhous-cert-${level}-${certId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
