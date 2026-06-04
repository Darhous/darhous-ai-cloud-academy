/**
 * GET /api/certificates/preview/[portal]
 *
 * Admin-only route — generates a sample PDF using the unified CertificateTemplate.
 * Shows the full luxury design with dummy data for each portal.
 * Used by the "View Template" button in Admin → Certificates Studio.
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { registerFonts, generateQR } from "@/lib/certificates/loadAssets";
import { CertificateTemplate } from "@/lib/certificates/CertificateTemplate";
import { getPortalCertConfig } from "@/lib/certificates/portalConfig";

async function verifyAdminAccess(): Promise<boolean> {
  try {
    const supabase = await createClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    return profile?.role === "admin";
  } catch {
    return false;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ portal: string }> },
) {
  const { portal } = await params;

  // Auth check
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const config = getPortalCertConfig(portal);
  const year = new Date().getFullYear();
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const sampleCertId = "PREVIEW-DEMO";

  const fontOk = await registerFonts();
  // QR points to the verify page (preview only)
  const qrDataUrl = await generateQR("https://darhous-ai-cloud-academy.vercel.app/ar/certificates/verify/PREVIEW-DEMO");

  const pdfBuffer = await renderToBuffer(
    <CertificateTemplate
      holderName="اسم الطالب التجريبي"
      certTypeLabel={config.certTypeLabel}
      academySubtitle={config.academySubtitle}
      bodyLine1={config.bodyLine1}
      bodyLine2={config.bodyLine2}
      box1Label={config.box1Label}
      box1Value={config.box1Value}
      box1Color={config.box1Color}
      box2Label={config.box2Label}
      box2Value={config.box2Value}
      box2Color={config.box2Color}
      dateIssued={`Date of Issue: ${issueDate}`}
      certId={sampleCertId}
      qrDataUrl={qrDataUrl}
      year={year}
      useDancingScript={fontOk}
    />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="darhous-preview-${portal}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
