import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { v4 as uuid } from "uuid";

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
    border: "2pt solid #1a56b0",
  },
  innerBorder: {
    position: "absolute",
    top: 14, left: 14, right: 14, bottom: 14,
    border: "0.5pt solid #8ed5ff",
  },
  header: { marginTop: 24, alignItems: "center", width: "100%" },
  headerTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0f1738", letterSpacing: 2, textAlign: "center" },
  headerSub: { fontSize: 8, color: "#1a56b0", letterSpacing: 3, marginTop: 3, textAlign: "center" },
  separator: { height: 1.4, backgroundColor: "#1a56b0", width: "80%", marginTop: 10, marginBottom: 2 },
  separatorThin: { height: 0.4, backgroundColor: "#8ed5ff", width: "80%", marginBottom: 12 },
  certTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center", marginBottom: 6 },
  certTitleLine: { height: 1.6, width: 200, backgroundColor: "#1a56b0", marginBottom: 12 },
  subtitle: { fontSize: 8, color: "#888898", textAlign: "center", marginBottom: 8 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center" },
  nameLine: { height: 2.2, width: 240, marginTop: 4, marginBottom: 12 },
  body1: { fontSize: 9, color: "#404050", textAlign: "center", marginBottom: 4 },
  body2: { fontSize: 8.5, color: "#888898", textAlign: "center", marginBottom: 14 },
  boxRow: { flexDirection: "row", gap: 14, marginBottom: 12 },
  box: { width: 140, height: 38, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  boxLabel: { fontSize: 7, color: "#fff", letterSpacing: 1, marginBottom: 2 },
  boxValue: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#fff" },
  dateLine: { fontSize: 8, color: "#888898", textAlign: "center", marginBottom: 2 },
  certNum: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f1738", textAlign: "center" },
  certId: { fontSize: 7, color: "#888898", textAlign: "center", marginBottom: 14 },
  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 44,
    backgroundColor: "#0f1738",
    borderTop: "3pt solid #1a56b0",
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
  subjectLabel: string,
  percentage: number,
  certId: string,
  resultId: string,
) {
  const certNum = `EXAM-${resultId.toString().toUpperCase().slice(0, 8)}`;
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  return (
    <Document>
      <Page size={[595, 421]} orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder} />
        <View style={styles.innerBorder} />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>DARHOUS ACADEMY</Text>
          <Text style={styles.headerSub}>D I G I T A L   T R A N S F O R M A T I O N   E X A M S</Text>
          <View style={styles.separator} />
          <View style={styles.separatorThin} />
        </View>

        <Text style={styles.certTitle}>CERTIFICATE OF ACHIEVEMENT</Text>
        <View style={styles.certTitleLine} />

        <Text style={styles.subtitle}>This is to certify that</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.nameLine, { backgroundColor: "#1a56b0" }]} />

        <Text style={styles.body1}>
          {`has successfully completed the Darhous Digital Transformation Exam`}
        </Text>
        <Text style={styles.body2}>{subjectLabel}</Text>

        <View style={styles.boxRow}>
          <View style={[styles.box, { backgroundColor: percentage >= 90 ? "#22c55e" : "#1a56b0" }]}>
            <Text style={styles.boxLabel}>SCORE</Text>
            <Text style={styles.boxValue}>{percentage.toFixed(0)}%</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#0f1738" }]}>
            <Text style={styles.boxLabel}>STATUS</Text>
            <Text style={styles.boxValue}>PASSED</Text>
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
    .from("digital_exam_results")
    .select("*")
    .eq("id", id)
    .single();

  if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });
  if (!(result.passed as boolean)) return NextResponse.json({ error: "Certificate only issued for passing results (80%+)" }, { status: 403 });

  // Get user name
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

  // Generate or reuse cert ID
  const certId = (result.certificate_id as string | null) ?? uuid().toUpperCase().slice(0, 12);
  if (!result.certificate_id) {
    await adminSupabase
      .from("digital_exam_results")
      .update({ certificate_id: certId })
      .eq("id", id);
  }

  const pdfBuffer = await renderToBuffer(
    buildCertPdf(
      displayName,
      (result.subject_label as string) || (result.subject as string),
      result.percentage as number,
      certId,
      id,
    ),
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="darhous-exam-cert-${certId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
