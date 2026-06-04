/**
 * POST /api/admin/certificates/issue
 *
 * Admin-only. Generates a custom certificate PDF for ANY portal using
 * admin-typed data (holder name + box values + optional subtitle).
 *
 * If the `admin_certificates` table exists (v16 migration applied), the
 * certificate is also persisted so its QR code verifies on
 * /[locale]/certificates/verify/[code]. If the table is missing, the PDF is
 * still generated (with a one-time preview code) — issuance never hard-fails.
 */
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { registerFonts, generateQR, buildVerifyUrl } from "@/lib/certificates/loadAssets";
import { CertificateTemplate } from "@/lib/certificates/CertificateTemplate";
import { getPortalCertConfig } from "@/lib/certificates/portalConfig";

function randomCode(): string {
  // 12-char uppercase alphanumeric (no ambiguous chars handled by source uuid)
  return Array.from({ length: 12 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)],
  ).join("");
}

export async function POST(req: NextRequest) {
  // ── Auth: admin only ──────────────────────────────────────────────────────
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });

  // ── Parse + validate input ────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const portal = String(body.portal ?? "").trim();
  const holderName = String(body.holderName ?? "").trim();
  if (!portal) return NextResponse.json({ error: "portal is required" }, { status: 400 });
  if (!holderName) return NextResponse.json({ error: "holderName is required" }, { status: 400 });
  if (holderName.length > 80) return NextResponse.json({ error: "holderName too long" }, { status: 400 });

  const config = getPortalCertConfig(portal);

  // Admin-overridable fields fall back to per-portal defaults.
  const box1Value   = String(body.box1Value ?? config.box1Value).trim().slice(0, 24) || config.box1Value;
  const box2Value   = String(body.box2Value ?? config.box2Value).trim().slice(0, 24) || config.box2Value;
  const bodyLine2   = String(body.bodyLine2 ?? config.bodyLine2).trim().slice(0, 120) || config.bodyLine2;
  const certTypeLabel = String(body.certTypeLabel ?? config.certTypeLabel).trim().slice(0, 60) || config.certTypeLabel;

  // ── Persist (best-effort) so the QR code verifies ─────────────────────────
  let certId = randomCode();
  const admin = createAdminClient();
  if (admin) {
    const { data: inserted, error } = await admin
      .from("admin_certificates")
      .insert({
        certificate_code: certId,
        portal,
        holder_name: holderName,
        cert_type_label: certTypeLabel,
        body_line2: bodyLine2,
        box1_label: config.box1Label,
        box1_value: box1Value,
        box2_label: config.box2Label,
        box2_value: box2Value,
        issued_by: user.id,
      })
      .select("certificate_code")
      .single();
    if (!error && inserted?.certificate_code) {
      certId = inserted.certificate_code as string;
    }
    // If error (e.g. table missing because v16 migration not yet applied),
    // we keep the app-generated code and still return the PDF.
  }

  // ── Render PDF ────────────────────────────────────────────────────────────
  const fontOk = await registerFonts();
  const qrDataUrl = await generateQR(buildVerifyUrl(certId, "ar"));
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  const pdfBuffer = await renderToBuffer(
    <CertificateTemplate
      holderName={holderName}
      certTypeLabel={certTypeLabel}
      academySubtitle={config.academySubtitle}
      bodyLine1={config.bodyLine1}
      bodyLine2={bodyLine2}
      box1Label={config.box1Label}
      box1Value={box1Value}
      box1Color={config.box1Color}
      box2Label={config.box2Label}
      box2Value={box2Value}
      box2Color={config.box2Color}
      dateIssued={`Date of Issue: ${issueDate}`}
      certId={certId}
      qrDataUrl={qrDataUrl}
      year={year}
      useDancingScript={fontOk}
    />,
  );

  const safeName = holderName.replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 40) || "certificate";
  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="darhous-${portal}-${safeName}.pdf"`,
      "X-Certificate-Code": certId,
      "Cache-Control": "no-store",
    },
  });
}
