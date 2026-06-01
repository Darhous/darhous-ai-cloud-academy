import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { v4 as uuid } from "uuid";

// ── Colour palette (matches legacy certificate_service.py) ────────────────────
const LEVEL_COLORS: Record<string, string> = {
  A1A: "#e63857", A1B: "#e63857",
  A2A: "#f08414", A2B: "#f08414",
  B1A: "#ccaa04", B1B: "#33991d",
  B2A: "#33991d", B2B: "#008f85",
  C1A: "#4761e0", C1B: "#4761e0",
  C2:  "#6133a0",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fefdfb",
    padding: 28,
    fontFamily: "Helvetica",
    flexDirection: "column",
    alignItems: "center",
  },
  outerBorder: {
    position: "absolute",
    top: 8, left: 8, right: 8, bottom: 8,
    border: "2pt solid #d4aa0a",
  },
  innerBorder: {
    position: "absolute",
    top: 14, left: 14, right: 14, bottom: 14,
    border: "0.5pt solid #f0d855",
  },
  header: { marginTop: 24, alignItems: "center", width: "100%" },
  headerTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0f1738", letterSpacing: 2, textAlign: "center" },
  headerSub: { fontSize: 8, color: "#d4aa0a", letterSpacing: 3, marginTop: 3, textAlign: "center" },
  separator: { height: 1.4, backgroundColor: "#d4aa0a", width: "80%", marginTop: 10, marginBottom: 2 },
  separatorThin: { height: 0.4, backgroundColor: "#f0d855", width: "80%", marginBottom: 12 },
  certTitle: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center", marginBottom: 6 },
  certTitleLine: { height: 1.6, width: 200, backgroundColor: "#d4aa0a", marginBottom: 12 },
  subtitle: { fontSize: 8, color: "#888898", textAlign: "center", marginBottom: 8 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center" },
  nameLine: { height: 2.2, width: 240, marginTop: 4, marginBottom: 12 },
  body1: { fontSize: 9, color: "#404050", textAlign: "center", marginBottom: 4 },
  body2: { fontSize: 8.5, color: "#888898", textAlign: "center", marginBottom: 14 },
  boxRow: { flexDirection: "row", gap: 14, marginBottom: 12 },
  box: { width: 140, height: 38, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  boxLabel: { fontSize: 7, color: "#fff", letterSpacing: 1, marginBottom: 2 },
  boxValue: { fontSize: 17, fontFamily: "Helvetica-Bold", color: "#fff" },
  dateLine: { fontSize: 8, color: "#888898", textAlign: "center", marginBottom: 2 },
  certNum: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center" },
  certId: { fontSize: 7, color: "#888898", textAlign: "center", marginBottom: 14 },
  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 44,
    backgroundColor: "#0f1738",
    borderTop: "3pt solid #d4aa0a",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: { fontSize: 6.5, color: "#6e6e8a", textAlign: "center" },
  sigLine: { position: "absolute", bottom: 52, left: 38, width: 140 },
  sigLineBar: { height: 0.7, backgroundColor: "#0f1738", width: 140, marginBottom: 5 },
  sigName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f1738" },
  sigTitle: { fontSize: 7.5, color: "#888898" },
});

function buildCertPdf(
  name: string,
  level: string,
  score: number,
  certId: string,
  resultId: string,
  isIncomplete: boolean,
  stagesCompleted: number,
) {
  const levelColor = LEVEL_COLORS[level] ?? "#4761e0";
  const certNum = `CERT-${resultId.toString().padStart(4, "0")}`;
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const titleLabel = isIncomplete ? "CERTIFICATE OF PARTIAL COMPLETION" : "CERTIFICATE OF COMPLETION";
  const bodyLine1 = isIncomplete
    ? `has completed Stage ${stagesCompleted} of 10 of the Darhous English Language Placement Assessment`
    : "has successfully completed the Darhous English Language Placement Assessment";
  const year = new Date().getFullYear();

  return (
    <Document>
      <Page size={[595, 421]} orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder} />
        <View style={styles.innerBorder} />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>DARHOUS ACADEMY</Text>
          <Text style={styles.headerSub}>E N G L I S H   L A N G U A G E   P R O F I C I E N C Y   A S S E S S M E N T</Text>
          <View style={styles.separator} />
          <View style={styles.separatorThin} />
        </View>

        <Text style={styles.certTitle}>{titleLabel}</Text>
        <View style={styles.certTitleLine} />

        <Text style={styles.subtitle}>This is to certify that</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.nameLine, { backgroundColor: levelColor }]} />

        <Text style={styles.body1}>{bodyLine1}</Text>
        <Text style={styles.body2}>and has been awarded the following language proficiency level:</Text>

        <View style={styles.boxRow}>
          <View style={[styles.box, { backgroundColor: levelColor }]}>
            <Text style={styles.boxLabel}>CEFR LEVEL</Text>
            <Text style={styles.boxValue}>{level}</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#0f1738" }]}>
            <Text style={styles.boxLabel}>OVERALL SCORE</Text>
            <Text style={styles.boxValue}>{score.toFixed(1)}%</Text>
          </View>
        </View>

        <Text style={styles.dateLine}>Date of Issue: {issueDate}</Text>
        <Text style={styles.certNum}>{certNum}</Text>
        <Text style={styles.certId}>Certificate ID: {certId}</Text>

        <View style={styles.sigLine}>
          <View style={styles.sigLineBar} />
          <Text style={styles.sigName}>Ahmed Darhous</Text>
          <Text style={styles.sigTitle}>Founder &amp; Director</Text>
          <Text style={styles.sigTitle}>Darhous Academy</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {`© ${year} Darhous Academy · All Rights Reserved · darhous-ai-cloud-academy.vercel.app`}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

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

  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("full_name")
    .eq("id", result.user_id)
    .single();

  const { data: authData } = await adminSupabase.auth.admin.getUserById(result.user_id as string);
  const displayName =
    (profile?.full_name as string | null | undefined)?.trim() ||
    authData?.user?.email?.split("@")[0] ||
    "Candidate";

  const certId = (result.certificate_id as string | null) ?? uuid().toUpperCase().slice(0, 12);
  if (!result.certificate_id) {
    await adminSupabase
      .from("language_results")
      .update({ certificate_id: certId })
      .eq("id", id);
  }

  const pdfBuffer = await renderToBuffer(
    buildCertPdf(
      displayName,
      result.level as string,
      result.score as number,
      certId,
      id,
      result.is_incomplete as boolean,
      (result.stages_completed as number) ?? 10,
    ),
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="darhous-cert-${result.level}-${certId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
