/**
 * CertificateTemplate.tsx — Unified luxury certificate PDF template
 * Used by: language, exams, courses, and preview routes.
 *
 * @react-pdf/renderer constraints:
 *  - No CSS gradients → stacked solid-color Views for gradient effects
 *  - No SVG → ornaments via Unicode chars + bordered Views
 *  - Custom fonts via Font.register() in loadAssets.ts
 */
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  navy:      "#0c1445",
  navyMid:   "#111a4f",
  navyLight: "#1a2a6e",
  gold:      "#d4af37",
  goldLight: "#f0d580",
  goldDim:   "#a07c20",
  cream:     "#f5f0e8",
  muted:     "#8888aa",
  white:     "#ffffff",
};

// ── Styles ────────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    backgroundColor: C.navy,
    width: 842,
    height: 595,
    position: "relative",
    overflow: "hidden",
  },

  // ── Decorative layers ──────────────────────────────────────────────────────
  goldBarTop: {
    position: "absolute", top: 0, left: 0, right: 0, height: 10,
    backgroundColor: C.gold,
  },
  goldBarTopAccent: {
    position: "absolute", top: 10, left: 0, right: 0, height: 3,
    backgroundColor: C.goldDim,
  },
  goldBarBottom: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 10,
    backgroundColor: C.gold,
  },
  goldBarBottomAccent: {
    position: "absolute", bottom: 10, left: 0, right: 0, height: 3,
    backgroundColor: C.goldDim,
  },

  outerBorder: {
    position: "absolute",
    top: 18, left: 18, right: 18, bottom: 18,
    border: "1.8pt solid #d4af37",
  },
  innerBorder: {
    position: "absolute",
    top: 25, left: 25, right: 25, bottom: 25,
    border: "0.4pt solid #a07c20",
  },

  // Corner diamond ornaments
  cornerTL: { position: "absolute", top: 11, left: 12, fontSize: 12, color: C.gold },
  cornerTR: { position: "absolute", top: 11, right: 12, fontSize: 12, color: C.gold },
  cornerBL: { position: "absolute", bottom: 11, left: 12, fontSize: 12, color: C.gold },
  cornerBR: { position: "absolute", bottom: 11, right: 12, fontSize: 12, color: C.gold },

  // Extended corner lines (L-shapes) TL
  cornerLineTLH: { position: "absolute", top: 18, left: 18, width: 30, height: 0, borderTop: "1pt solid #d4af37" },
  cornerLineTLV: { position: "absolute", top: 18, left: 18, width: 0, height: 30, borderLeft: "1pt solid #d4af37" },
  cornerLineTRH: { position: "absolute", top: 18, right: 18, width: 30, height: 0, borderTop: "1pt solid #d4af37" },
  cornerLineTRV: { position: "absolute", top: 18, right: 18, width: 0, height: 30, borderRight: "1pt solid #d4af37" },
  cornerLineBLH: { position: "absolute", bottom: 18, left: 18, width: 30, height: 0, borderBottom: "1pt solid #d4af37" },
  cornerLineBLV: { position: "absolute", bottom: 18, left: 18, width: 0, height: 30, borderLeft: "1pt solid #d4af37" },
  cornerLineBRH: { position: "absolute", bottom: 18, right: 18, width: 30, height: 0, borderBottom: "1pt solid #d4af37" },
  cornerLineBRV: { position: "absolute", bottom: 18, right: 18, width: 0, height: 30, borderRight: "1pt solid #d4af37" },

  // Watermark
  watermark: {
    position: "absolute",
    top: 215,
    left: 200,
    fontSize: 88,
    color: C.gold,
    opacity: 0.03,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 12,
  },

  // ── Content area ──────────────────────────────────────────────────────────
  content: {
    position: "absolute",
    top: 30, left: 40, right: 40, bottom: 80,
    flexDirection: "column",
    alignItems: "center",
  },

  // Header
  academyName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 5,
    textAlign: "center",
    marginBottom: 5,
  },
  academySub: {
    fontSize: 7.5,
    color: C.goldLight,
    letterSpacing: 3.5,
    textAlign: "center",
    marginBottom: 10,
  },
  dividerOuter: {
    height: 0.8,
    backgroundColor: C.gold,
    width: "60%",
    marginBottom: 2,
  },
  dividerInner: {
    height: 0.3,
    backgroundColor: C.goldDim,
    width: "50%",
    marginBottom: 14,
  },

  // Certificate type
  certTypeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  certTypeDash: { height: 0.8, width: 20, backgroundColor: C.gold },
  certType: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.cream,
    letterSpacing: 2.5,
    textAlign: "center",
  },

  // This is to certify
  certifyText: {
    fontSize: 8,
    color: C.muted,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  // Holder name
  holderName: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: C.cream,
    textAlign: "center",
    marginBottom: 5,
  },

  // Body lines
  bodyLine1: {
    fontSize: 8.5,
    color: "#c8c8d8",
    textAlign: "center",
    marginBottom: 3,
    marginTop: 4,
  },
  bodyLine2: {
    fontSize: 8,
    color: C.muted,
    textAlign: "center",
    marginBottom: 12,
  },

  // Score boxes
  boxRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 10,
  },
  box: {
    width: 138,
    height: 42,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    border: "0.8pt solid #d4af37",
  },
  boxLabel: {
    fontSize: 6.5,
    color: "#f0d580",
    letterSpacing: 1,
    marginBottom: 3,
  },
  boxValue: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },

  // Date line
  dateLine: {
    fontSize: 7.5,
    color: C.muted,
    textAlign: "center",
  },

  // ── Bottom absolute elements ────────────────────────────────────────────
  // Signature block (bottom-left)
  sigBlock: {
    position: "absolute",
    bottom: 20,
    left: 46,
    width: 160,
  },
  sigName: {
    fontSize: 18,
    color: C.gold,
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: "DancingScript",
  },
  sigNameFallback: {
    fontSize: 14,
    color: C.gold,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 4,
  },
  sigBar: {
    height: 0.6,
    backgroundColor: C.gold,
    width: 150,
    marginBottom: 5,
  },
  sigRole: {
    fontSize: 7.5,
    color: C.goldLight,
    letterSpacing: 0.5,
  },
  sigAcademy: {
    fontSize: 7,
    color: C.muted,
  },

  // Seal (bottom-center)
  seal: {
    position: "absolute",
    bottom: 16,
    left: 382,
    width: 68,
    height: 68,
    borderRadius: 34,
    border: "1.5pt solid #d4af37",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.navyMid,
  },
  sealOuter: {
    position: "absolute",
    bottom: 14,
    left: 380,
    width: 72,
    height: 72,
    borderRadius: 36,
    border: "0.5pt solid #a07c20",
  },
  sealText1: { fontSize: 9, color: C.gold },
  sealText2: { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gold, letterSpacing: 1.5, textAlign: "center" },
  sealText3: { fontSize: 5, color: C.goldLight, textAlign: "center", letterSpacing: 0.5 },
  sealText4: { fontSize: 5, color: C.muted, textAlign: "center" },

  // QR block (bottom-right)
  qrBlock: {
    position: "absolute",
    bottom: 16,
    right: 40,
    alignItems: "center",
  },
  qrImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
    border: "0.5pt solid #d4af37",
  },
  qrLabel: { fontSize: 5.5, color: C.goldLight, textAlign: "center", marginTop: 3 },
  qrCertId: { fontSize: 5, color: C.muted, textAlign: "center", fontFamily: "Helvetica-Bold" },

  // Footer copyright
  footerText: {
    position: "absolute",
    bottom: 12,
    left: 220,
    right: 120,
    fontSize: 5.5,
    color: "#5a5a7a",
    textAlign: "center",
  },
});

// ── Props ─────────────────────────────────────────────────────────────────────
export interface CertTemplateProps {
  holderName: string;
  certTypeLabel: string;           // e.g. "CERTIFICATE OF COMPLETION"
  academySubtitle: string;         // e.g. "ENGLISH LANGUAGE PROFICIENCY ASSESSMENT"
  bodyLine1: string;               // main achievement sentence
  bodyLine2?: string;              // optional subtitle
  box1Label: string;               // e.g. "CEFR LEVEL"
  box1Value: string;               // e.g. "B2A"
  box1Color: string;               // accent color
  box2Label: string;               // e.g. "OVERALL SCORE"
  box2Value: string;               // e.g. "78.5%"
  box2Color?: string;
  dateIssued: string;              // formatted date string
  certId: string;                  // short cert ID (displayed under QR)
  qrDataUrl: string;               // result of generateQR()
  year: number;
  useDancingScript?: boolean;      // true if font loaded OK
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CertificateTemplate(props: CertTemplateProps) {
  const {
    holderName, certTypeLabel, academySubtitle,
    bodyLine1, bodyLine2,
    box1Label, box1Value, box1Color,
    box2Label, box2Value, box2Color = C.navyLight,
    dateIssued, certId, qrDataUrl, year,
    useDancingScript = true,
  } = props;

  return (
    <Document>
      <Page size={[842, 595]} style={S.page}>

        {/* ── Gold gradient bars ─────────────────────────── */}
        <View style={S.goldBarTop} />
        <View style={S.goldBarTopAccent} />
        <View style={S.goldBarBottom} />
        <View style={S.goldBarBottomAccent} />

        {/* ── Borders ───────────────────────────────────── */}
        <View style={S.outerBorder} />
        <View style={S.innerBorder} />

        {/* ── Corner ornaments ──────────────────────────── */}
        <Text style={S.cornerTL}>◆</Text>
        <Text style={S.cornerTR}>◆</Text>
        <Text style={S.cornerBL}>◆</Text>
        <Text style={S.cornerBR}>◆</Text>

        {/* L-shaped corner extensions */}
        <View style={S.cornerLineTLH} /><View style={S.cornerLineTLV} />
        <View style={S.cornerLineTRH} /><View style={S.cornerLineTRV} />
        <View style={S.cornerLineBLH} /><View style={S.cornerLineBLV} />
        <View style={S.cornerLineBRH} /><View style={S.cornerLineBRV} />

        {/* ── Watermark ─────────────────────────────────── */}
        <Text style={S.watermark}>DARHOUS</Text>

        {/* ── Main content ──────────────────────────────── */}
        <View style={S.content}>

          {/* Academy header */}
          <Text style={S.academyName}>DARHOUS ACADEMY</Text>
          <Text style={S.academySub}>{academySubtitle}</Text>
          <View style={S.dividerOuter} />
          <View style={S.dividerInner} />

          {/* Certificate type */}
          <View style={S.certTypeWrapper}>
            <View style={S.certTypeDash} />
            <Text style={S.certType}>{certTypeLabel}</Text>
            <View style={S.certTypeDash} />
          </View>

          {/* This is to certify that */}
          <Text style={S.certifyText}>This is to certify that</Text>

          {/* Holder name */}
          <Text style={S.holderName}>{holderName}</Text>
          <View style={{ height: 1.8, width: 300, backgroundColor: box1Color, marginBottom: 4 }} />

          {/* Body lines */}
          <Text style={S.bodyLine1}>{bodyLine1}</Text>
          {bodyLine2 ? <Text style={S.bodyLine2}>{bodyLine2}</Text> : null}

          {/* Score / level boxes */}
          <View style={S.boxRow}>
            <View style={[S.box, { backgroundColor: box1Color }]}>
              <Text style={S.boxLabel}>{box1Label}</Text>
              <Text style={S.boxValue}>{box1Value}</Text>
            </View>
            <View style={[S.box, { backgroundColor: box2Color }]}>
              <Text style={S.boxLabel}>{box2Label}</Text>
              <Text style={[S.boxValue, { fontSize: box2Value.length > 6 ? 13 : 17 }]}>{box2Value}</Text>
            </View>
          </View>

          {/* Date */}
          <Text style={S.dateLine}>{dateIssued}</Text>
        </View>

        {/* ── Signature (bottom-left) ──────────────────── */}
        <View style={S.sigBlock}>
          {useDancingScript
            ? <Text style={S.sigName}>Ahmed Darhous</Text>
            : <Text style={S.sigNameFallback}>Ahmed Darhous</Text>
          }
          <View style={S.sigBar} />
          <Text style={S.sigRole}>Founder &amp; CEO</Text>
          <Text style={S.sigAcademy}>Darhous Academy</Text>
        </View>

        {/* ── Seal (bottom-center) ─────────────────────── */}
        <View style={S.sealOuter} />
        <View style={S.seal}>
          <Text style={S.sealText1}>✦</Text>
          <Text style={S.sealText2}>DARHOUS</Text>
          <Text style={S.sealText3}>ACADEMY</Text>
          <Text style={S.sealText4}>CERTIFIED</Text>
          <Text style={S.sealText1} render={() => "✦"} />
        </View>

        {/* ── QR Code (bottom-right) ───────────────────── */}
        <View style={S.qrBlock}>
          {qrDataUrl ? (
            <Image src={qrDataUrl} style={S.qrImage} />
          ) : (
            <View style={[S.qrImage, { backgroundColor: C.navyMid, alignItems: "center", justifyContent: "center" }]}>
              <Text style={{ fontSize: 6, color: C.muted }}>QR</Text>
            </View>
          )}
          <Text style={S.qrLabel}>Scan to verify</Text>
          <Text style={S.qrCertId}>{certId}</Text>
        </View>

        {/* ── Footer ───────────────────────────────────── */}
        <Text style={S.footerText}>
          {`© ${year} Darhous Academy · All Rights Reserved · darhous-ai-cloud-academy.vercel.app`}
        </Text>

      </Page>
    </Document>
  );
}
