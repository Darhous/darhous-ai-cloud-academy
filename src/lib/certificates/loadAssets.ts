/**
 * loadAssets.ts — Certificate shared asset loader
 * - Registers Dancing Script font (cached per process)
 * - Generates QR Code data URLs
 */
import { Font } from "@react-pdf/renderer";
import QRCode from "qrcode";

// ── Font registration (module-level cache, runs once per server process) ─────
let _fontsRegistered = false;

/**
 * Dancing Script Bold TTF from Google Fonts CDN.
 * Falls back silently to Helvetica-Oblique if fetch fails.
 */
const DANCING_SCRIPT_URL =
  "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B1i0HTeB9ptDqpw.woff2";

// react-pdf can also use a plain TTF url:
const DANCING_SCRIPT_TTF =
  "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMi0.ttf";

export function registerFonts(): void {
  if (_fontsRegistered) return;
  try {
    Font.register({
      family: "DancingScript",
      src: DANCING_SCRIPT_TTF,
    });
  } catch {
    // silently ignore — signature falls back to Helvetica-Oblique
  }
  _fontsRegistered = true;
}

// ── QR Code generation (LRU-style Map cache) ─────────────────────────────────
const _qrCache = new Map<string, string>();

/**
 * Generate a QR code PNG as a data URL (cached per URL).
 * Returns empty string on error (hides QR gracefully).
 */
export async function generateQR(url: string): Promise<string> {
  if (_qrCache.has(url)) return _qrCache.get(url)!;
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 128,
      margin: 1,
      color: { dark: "#d4af37", light: "#0c1445" }, // gold on navy
      errorCorrectionLevel: "M",
    });
    _qrCache.set(url, dataUrl);
    return dataUrl;
  } catch {
    return "";
  }
}

// ── Verify URL builder ────────────────────────────────────────────────────────
const SITE = "https://darhous-ai-cloud-academy.vercel.app";

export function buildVerifyUrl(certId: string, locale = "ar"): string {
  return `${SITE}/${locale}/certificates/verify/${certId}`;
}
