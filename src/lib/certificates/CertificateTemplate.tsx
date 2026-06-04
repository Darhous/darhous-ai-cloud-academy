/**
 * CertificateTemplate.tsx — Unified luxury certificate PDF template (v2 "Prestige Edition")
 * Used by: language, exams, courses, admin preview & issuance routes.
 *
 * @react-pdf/renderer constraints:
 *  - No CSS gradients → layered solid-color Views for depth effects
 *  - No SVG → ornaments via Unicode chars + bordered Views
 *  - Custom fonts via Font.register() in loadAssets.ts (DancingScript → fallback Helvetica-Oblique)
 */
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  navyDeep:  "#080e28",
  navy:      "#0c1445",
  navyMid:   "#101848",
  navyPanel: "#0f1540",
  navyGlow:  "#152060",
  gold:      "#d4af37",
  goldLight: "#f0d580",
  goldDim:   "#a07c20",
  goldFaint: "#6b5010",
  cream:     "#f5f0e8",
  textLight: "#c2c2d8",
  muted:     "#7a7a9a",
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

  // ── Background glow (subtle illuminated-center effect via opacity) ──────────
  bgGlow: {
    position: "absolute",
    top: 125,
    left: 171,
    width: 500,
    height: 345,
    borderRadius: 250,
    backgroundColor: C.navyGlow,
    opacity: 0.5,
  },

  // ── Top & bottom gold bar system ────────────────────────────────────────────
  barT1: { position: "absolute", top: 0,    left: 0, right: 0, height: 12, backgroundColor: C.gold },
  barT2: { position: "absolute", top: 12,   left: 0, right: 0, height: 4,  backgroundColor: C.goldDim },
  barT3: { position: "absolute", top: 16,   left: 0, right: 0, height: 1,  backgroundColor: C.gold, opacity: 0.35 },
  barB1: { position: "absolute", bottom: 0, left: 0, right: 0, height: 12, backgroundColor: C.gold },
  barB2: { position: "absolute", bottom: 12, left: 0, right: 0, height: 4, backgroundColor: C.goldDim },
  barB3: { position: "absolute", bottom: 16, left: 0, right: 0, height: 1, backgroundColor: C.gold, opacity: 0.35 },

  // ── Left & right vertical gold accents ─────────────────────────────────────
  barLeft:  { position: "absolute", top: 17, bottom: 17, left: 0,    width: 7, backgroundColor: C.gold },
  barRight: { position: "absolute", top: 17, bottom: 17, right: 0,   width: 7, backgroundColor: C.gold },

  // ── Triple border frame ─────────────────────────────────────────────────────
  frame1: { position: "absolute", top: 22, left: 14, right: 14, bottom: 22, border: "2pt solid #d4af37" },
  frame2: { position: "absolute", top: 29, left: 22, right: 22, bottom: 29, border: "0.6pt solid #a07c20" },
  frame3: { position: "absolute", top: 34, left: 28, right: 28, bottom: 34, border: "0.25pt solid #6b5010" },

  // ── Corner diamond ornaments ────────────────────────────────────────────────
  crnTL: { position: "absolute", top:  13, left:  15, fontSize: 17, color: C.gold },
  crnTR: { position: "absolute", top:  13, right: 15, fontSize: 17, color: C.gold },
  crnBL: { position: "absolute", bottom: 13, left:  15, fontSize: 17, color: C.gold },
  crnBR: { position: "absolute", bottom: 13, right: 15, fontSize: 17, color: C.gold },

  // Extended L-lines from corners (top-left)
  lTLH: { position: "absolute", top: 22, left: 14, width: 55, height: 0, borderTop:    "0.8pt solid #d4af37" },
  lTLV: { position: "absolute", top: 22, left: 14, width: 0, height: 55, borderLeft:   "0.8pt solid #d4af37" },
  lTRH: { position: "absolute", top: 22, right: 14, width: 55, height: 0, borderTop:   "0.8pt solid #d4af37" },
  lTRV: { position: "absolute", top: 22, right: 14, width: 0, height: 55, borderRight: "0.8pt solid #d4af37" },
  lBLH: { position: "absolute", bottom: 22, left: 14, width: 55, height: 0, borderBottom:  "0.8pt solid #d4af37" },
  lBLV: { position: "absolute", bottom: 22, left: 14, width: 0, height: 55, borderLeft:    "0.8pt solid #d4af37" },
  lBRH: { position: "absolute", bottom: 22, right: 14, width: 55, height: 0, borderBottom: "0.8pt solid #d4af37" },
  lBRV: { position: "absolute", bottom: 22, right: 14, width: 0, height: 55, borderRight:  "0.8pt solid #d4af37" },

  // ── Watermark ───────────────────────────────────────────────────────────────
  watermark: {
    position: "absolute",
    top: 205,
    left: 130,
    fontSize: 105,
    color: C.gold,
    opacity: 0.035,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 10,
  },

  // ── Content area ────────────────────────────────────────────────────────────
  content: {
    position: "absolute",
    top: 38, left: 52, right: 52, bottom: 88,
    flexDirection: "column",
    alignItems: "center",
  },

  // ── Header top ornament ─────────────────────────────────────────────────────
  topOrn: {
    fontSize: 10,
    color: C.goldDim,
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 5,
  },

  // ── Academy name ────────────────────────────────────────────────────────────
  acadName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 7,
    textAlign: "center",
    marginBottom: 3,
  },
  acadSub: {
    fontSize: 7,
    color: C.goldLight,
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 9,
  },

  // ── Ornamental divider ──────────────────────────────────────────────────────
  divRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "68%",
    marginBottom: 2,
  },
  divLine:   { flex: 1, height: 0.8, backgroundColor: C.gold },
  divDot:    { fontSize: 9, color: C.gold, paddingHorizontal: 6 },
  divRowSub: {
    flexDirection: "row",
    alignItems: "center",
    width: "46%",
    marginBottom: 11,
  },
  divLineSub: { flex: 1, height: 0.3, backgroundColor: C.goldDim },

  // ── Certificate type row ────────────────────────────────────────────────────
  ctRow:  { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  ctDash: { height: 0.8, width: 30, backgroundColor: C.gold },
  ctText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.cream,
    letterSpacing: 3,
    textAlign: "center",
  },

  // ── Certify text ────────────────────────────────────────────────────────────
  certify: {
    fontSize: 7.5,
    color: C.muted,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 1,
    fontFamily: "Helvetica-Oblique",
  },

  // ── Holder name ─────────────────────────────────────────────────────────────
  holder: {
    fontSize: 31,
    fontFamily: "Helvetica-Bold",
    color: C.cream,
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  holderLine: {
    height: 1.2,
    width: 310,
    marginBottom: 5,
  },

  // ── Body lines ──────────────────────────────────────────────────────────────
  body1: { fontSize: 8.5, color: C.textLight, textAlign: "center", marginBottom: 3 },
  body2: { fontSize: 7.5, color: C.muted,    textAlign: "center", marginBottom: 10 },

  // ── Score / level boxes ─────────────────────────────────────────────────────
  boxRow: { flexDirection: "row", gap: 14, marginBottom: 9 },
  box: {
    width: 140,
    height: 46,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    border: "0.8pt solid #d4af37",
  },
  boxInnerBorder: {
    position: "absolute",
    top: 3, left: 3, right: 3, bottom: 3,
    borderRadius: 3,
    border: "0.2pt solid #a07c20",
  },
  boxLabel: { fontSize: 6, color: C.goldLight, letterSpacing: 1.3, marginBottom: 2 },
  boxValue: { fontSize: 18, fontFamily: "Helvetica-Bold", color: C.white },

  // ── Date ────────────────────────────────────────────────────────────────────
  dateLine: { fontSize: 7, color: C.muted, textAlign: "center", letterSpacing: 0.5 },

  // ── Signature block (bottom-left) ────────────────────────────────────────────
  sigBlock: { position: "absolute", bottom: 24, left: 50, width: 165 },
  sigScript: { fontSize: 20, color: C.gold, letterSpacing: 0.3, marginBottom: 3, fontFamily: "DancingScript" },
  sigFallback: { fontSize: 14, color: C.gold, fontFamily: "Helvetica-Oblique", marginBottom: 3 },
  sigBar:    { height: 0.6, backgroundColor: C.gold, width: 155, marginBottom: 5 },
  sigRole:   { fontSize: 7.5, color: C.goldLight, letterSpacing: 0.5 },
  sigAcad:   { fontSize: 7, color: C.muted },

  // ── Seal — 3 concentric rings (bottom-center) ────────────────────────────────
  sealR3: {
    position: "absolute", bottom: 14, left: 381,
    width: 78, height: 78, borderRadius: 39,
    border: "0.35pt solid #6b5010",
  },
  sealR2: {
    position: "absolute", bottom: 17, left: 384,
    width: 72, height: 72, borderRadius: 36,
    border: "0.55pt solid #a07c20",
  },
  sealR1: {
    position: "absolute", bottom: 21, left: 388,
    width: 64, height: 64, borderRadius: 32,
    border: "1.6pt solid #d4af37",
    backgroundColor: C.navyMid,
    alignItems: "center",
    justifyContent: "center",
  },
  sealStar:  { fontSize: 10,  color: C.gold, marginBottom: 1 },
  sealName:  { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.gold, letterSpacing: 1.5 },
  sealHr:    { height: 0.4, width: 38, backgroundColor: C.goldDim, marginVertical: 1 },
  sealSub1:  { fontSize: 5.5, color: C.goldLight, letterSpacing: 0.5, textAlign: "center" },
  sealSub2:  { fontSize: 4.5, color: C.muted, textAlign: "center", letterSpacing: 0.3 },

  // ── QR block (bottom-right) ──────────────────────────────────────────────────
  qrBlock:  { position: "absolute", bottom: 20, right: 44, alignItems: "center" },
  qrWrap:   { position: "relative" },
  qrImg:    { width: 66, height: 66, borderRadius: 4, border: "0.5pt solid #d4af37" },
  qrOuterB: {
    position: "absolute", top: -3, left: -3, right: -3, bottom: -3,
    borderRadius: 7, border: "0.3pt solid #6b5010",
  },
  qrLabel:  { fontSize: 5.5, color: C.goldLight, textAlign: "center", marginTop: 4 },
  qrCode:   { fontSize: 5, color: C.muted, textAlign: "center", fontFamily: "Helvetica-Bold" },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 14, left: 225, right: 125,
    fontSize: 4.8, color: "#3e3e5e", textAlign: "center",
  },
});

// ── Props ─────────────────────────────────────────────────────────────────────
export interface CertTemplateProps {
  holderName: string;
  certTypeLabel: string;
  academySubtitle: string;
  bodyLine1: string;
  bodyLine2?: string;
  box1Label: string;
  box1Value: string;
  box1Color: string;
  box2Label: string;
  box2Value: string;
  box2Color?: string;
  dateIssued: string;
  certId: string;
  qrDataUrl: string;
  year: number;
  useDancingScript?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CertificateTemplate(props: CertTemplateProps) {
  const {
    holderName, certTypeLabel, academySubtitle,
    bodyLine1, bodyLine2,
    box1Label, box1Value, box1Color,
    box2Label, box2Value, box2Color = "#1a2a6e",
    dateIssued, certId, qrDataUrl, year,
    useDancingScript = true,
  } = props;

  return (
    <Document>
      <Page size={[842, 595]} style={S.page}>

        {/* ── Background depth layer ─────────────────────── */}
        <View style={S.bgGlow} />

        {/* ── Gold bar system ───────────────────────────── */}
        <View style={S.barT1} /><View style={S.barT2} /><View style={S.barT3} />
        <View style={S.barB1} /><View style={S.barB2} /><View style={S.barB3} />
        <View style={S.barLeft} /><View style={S.barRight} />

        {/* ── Triple border frame ───────────────────────── */}
        <View style={S.frame1} />
        <View style={S.frame2} />
        <View style={S.frame3} />

        {/* ── Corner diamond ornaments ──────────────────── */}
        <Text style={S.crnTL}>◆</Text>
        <Text style={S.crnTR}>◆</Text>
        <Text style={S.crnBL}>◆</Text>
        <Text style={S.crnBR}>◆</Text>

        {/* Extended L-lines */}
        <View style={S.lTLH} /><View style={S.lTLV} />
        <View style={S.lTRH} /><View style={S.lTRV} />
        <View style={S.lBLH} /><View style={S.lBLV} />
        <View style={S.lBRH} /><View style={S.lBRV} />

        {/* ── Watermark ─────────────────────────────────── */}
        <Text style={S.watermark}>DARHOUS</Text>

        {/* ── Main content ──────────────────────────────── */}
        <View style={S.content}>

          {/* Top ornament */}
          <Text style={S.topOrn}>✦  ◆  ✦</Text>

          {/* Academy header */}
          <Text style={S.acadName}>DARHOUS ACADEMY</Text>
          <Text style={S.acadSub}>{academySubtitle}</Text>

          {/* Ornamental divider */}
          <View style={S.divRow}>
            <View style={S.divLine} />
            <Text style={S.divDot}>◇</Text>
            <View style={S.divLine} />
          </View>
          <View style={S.divRowSub}>
            <View style={S.divLineSub} />
          </View>

          {/* Certificate type */}
          <View style={S.ctRow}>
            <View style={S.ctDash} />
            <Text style={S.ctText}>{certTypeLabel}</Text>
            <View style={S.ctDash} />
          </View>

          {/* Certify preamble */}
          <Text style={S.certify}>This is to certify that</Text>

          {/* Holder name */}
          <Text style={S.holder}>{holderName}</Text>
          <View style={[S.holderLine, { backgroundColor: box1Color }]} />

          {/* Achievement body */}
          <Text style={S.body1}>{bodyLine1}</Text>
          {bodyLine2 ? <Text style={S.body2}>{bodyLine2}</Text> : null}

          {/* Score / level boxes */}
          <View style={S.boxRow}>
            <View style={[S.box, { backgroundColor: box1Color }]}>
              <View style={S.boxInnerBorder} />
              <Text style={S.boxLabel}>{box1Label}</Text>
              <Text style={[S.boxValue, { fontSize: box1Value.length > 6 ? 12 : 18 }]}>{box1Value}</Text>
            </View>
            <View style={[S.box, { backgroundColor: box2Color }]}>
              <View style={S.boxInnerBorder} />
              <Text style={S.boxLabel}>{box2Label}</Text>
              <Text style={[S.boxValue, { fontSize: box2Value.length > 7 ? 11 : 18 }]}>{box2Value}</Text>
            </View>
          </View>

          {/* Issue date */}
          <Text style={S.dateLine}>{dateIssued}</Text>
        </View>

        {/* ── Signature (bottom-left) ───────────────────── */}
        <View style={S.sigBlock}>
          {useDancingScript
            ? <Text style={S.sigScript}>Ahmed Darhous</Text>
            : <Text style={S.sigFallback}>Ahmed Darhous</Text>
          }
          <View style={S.sigBar} />
          <Text style={S.sigRole}>Founder &amp; CEO</Text>
          <Text style={S.sigAcad}>Darhous Academy</Text>
        </View>

        {/* ── Seal — 3 concentric rings (bottom-center) ─── */}
        <View style={S.sealR3} />
        <View style={S.sealR2} />
        <View style={S.sealR1}>
          <Text style={S.sealStar}>✦</Text>
          <Text style={S.sealName}>DARHOUS</Text>
          <View style={S.sealHr} />
          <Text style={S.sealSub1}>ACADEMY</Text>
          <Text style={S.sealSub2}>CERTIFIED</Text>
        </View>

        {/* ── QR Code (bottom-right) ────────────────────── */}
        <View style={S.qrBlock}>
          <View style={S.qrWrap}>
            {qrDataUrl ? (
              <Image src={qrDataUrl} style={S.qrImg} />
            ) : (
              <View style={[S.qrImg, { backgroundColor: "#101848", alignItems: "center", justifyContent: "center" }]}>
                <Text style={{ fontSize: 6, color: "#7a7a9a" }}>QR</Text>
              </View>
            )}
            <View style={S.qrOuterB} />
          </View>
          <Text style={S.qrLabel}>Scan to Verify</Text>
          <Text style={S.qrCode}>{certId}</Text>
        </View>

        {/* ── Footer ───────────────────────────────────── */}
        <Text style={S.footer}>
          {`© ${year} Darhous Academy · All Rights Reserved · darhous-ai-cloud-academy.vercel.app`}
        </Text>

      </Page>
    </Document>
  );
}
