/**
 * portalConfig.ts — Per-portal certificate defaults (labels, sample values, copy).
 * Shared by the admin preview route and the admin issuance route so a single
 * source of truth drives every portal's certificate.
 */

export interface PortalCertConfig {
  academySubtitle: string;
  certTypeLabel: string;
  bodyLine1: string;
  bodyLine2: string;
  box1Label: string;
  box1Value: string; // sample / default value
  box1Color: string;
  box2Label: string;
  box2Value: string; // sample / default value
  box2Color: string;
}

export const PORTAL_CERT_CONFIG: Record<string, PortalCertConfig> = {
  language: {
    academySubtitle: "E N G L I S H   L A N G U A G E   P R O F I C I E N C Y",
    certTypeLabel:  "CERTIFICATE OF COMPLETION",
    bodyLine1:      "has successfully completed the Darhous English Language Placement Assessment",
    bodyLine2:      "and has been awarded the following CEFR proficiency level",
    box1Label:      "CEFR LEVEL", box1Value: "B2", box1Color: "#27ae60",
    box2Label:      "OVERALL SCORE", box2Value: "82.5%", box2Color: "#1a2a6e",
  },
  "digital-exams": {
    academySubtitle: "D I G I T A L   T R A N S F O R M A T I O N   E X A M S",
    certTypeLabel:  "CERTIFICATE OF ACHIEVEMENT",
    bodyLine1:      "has successfully completed the Darhous Digital Transformation Examination",
    bodyLine2:      "CompTIA A+ — Hardware & Software",
    box1Label:      "SCORE", box1Value: "91%", box1Color: "#16a34a",
    box2Label:      "STATUS", box2Value: "PASSED", box2Color: "#14532d",
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

export function getPortalCertConfig(portal: string): PortalCertConfig {
  return PORTAL_CERT_CONFIG[portal] ?? PORTAL_CERT_CONFIG["ai-academy"];
}
