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

// ── Portal config ─────────────────────────────────────────────────────────────
const PORTAL_CONFIG: Record<string, {
  academySubtitle: string;
  certTypeLabel: string;
  bodyLine1: string;
  bodyLine2: string;
  box1Label: string;
  box1Value: string;
  box1Color: string;
  box2Label: string;
  box2Value: string;
  box2Color: string;
}> = {
  language: {
    academySubtitle: "E N G L I S H   L A N G U A G E   P R O F I C I E N C Y",
    certTypeLabel:  "CERTIFICATE OF COMPLETION",
    bodyLine1:      "has successfully completed the Darhous English Language Placement Assessment",
    bodyLine2:      "and has been awarded the following CEFR proficiency level",
    box1Label:      "CEFR LEVEL", box1Value: "B2A", box1Color: "#27ae60",
    box2Label:      "OVERALL SCORE", box2Value: "82.5%", box2Color: "#1a2a6e",
  },
  "digital-exams": {
    academySubtitle: "D I G I T A L   T R A N S F O R M A T I O N   E X A M S",
    certTypeLabel:  "CERTIFICATE OF ACHIEVEMENT",
    bodyLine1:      "has successfully completed the Darhous Digital Transformation Examination",
    bodyLine2:      "CompTIA A+ — Hardware & Software",
    box1Label:      "SCORE", box1Value: "91%", box1Color: "#16a34a",
    box2Label:      "STATUS", box2Value: "PASSED ✓", box2Color: "#14532d",
  },
  automation: {
    academySubtitle: "A U T O M A T I O N   A C A D E M Y",
    certTypeLabel:  "CERTIFICATE OF COMPLETION",
    bodyLine1:      "has successfully completed the Darhous Automation Academy programme",
    bodyLine2:      "No-Code & AI Process Automation",
    box1Label:      "LEVEL", box1Value: "ADVANCED", box1Color: "#f59e0b",
    box2Label:      "STATUS", box2Value: "CERTIFIED", box2Color: "#1a1a00",
  },
  "ai-academy": {
    academySubtitle: "A I   C L O U D   A C A D E M Y",
    certTypeLabel:  "CERTIFICATE OF COMPLETION",
    bodyLine1:      "has successfully completed the Darhous AI Cloud Academy curriculum",
    bodyLine2:      "Generative AI & Large Language Models",
    box1Label:      "LEVEL", box1Value: "PRO", box1Color: "#8b5cf6",
    box2Label:      "STATUS", box2Value: "CERTIFIED", box2Color: "#1a0a2e",
  },
  career: {
    academySubtitle: "C A R E E R   H U B   P R O G R A M M E",
    certTypeLabel:  "CERTIFICATE OF READINESS",
    bodyLine1:      "has demonstrated professional readiness through the Darhous Career Hub",
    bodyLine2:      "Resume, Interview & Job Search Mastery",
    box1Label:      "TRACK", box1Value: "CAREER", box1Color: "#f59e0b",
    box2Label:      "STATUS", box2Value: "READY", box2Color: "#1a1000",
  },
  "iot-lab": {
    academySubtitle: "I o T   &   A R D U I N O   L A B",
    certTypeLabel:  "CERTIFICATE OF COMPLETION",
    bodyLine1:      "has successfully completed the Darhous IoT Lab hands-on programme",
    bodyLine2:      "Arduino, Sensors & Embedded Systems",
    box1Label:      "PROJECTS", box1Value: "12/12", box1Color: "#f97316",
    box2Label:      "STATUS", box2Value: "CERTIFIED", box2Color: "#1a0900",
  },
};

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

  const config = PORTAL_CONFIG[portal] ?? PORTAL_CONFIG["ai-academy"];
  const year = new Date().getFullYear();
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const sampleCertId = "PREVIEW-DEMO";

  registerFonts();
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
      useDancingScript={true}
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
