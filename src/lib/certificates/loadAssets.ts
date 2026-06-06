/**
 * loadAssets.ts — Certificate shared asset loader
 * - Registers Dancing Script font (cached per process)
 * - Registers Amiri Arabic font (cached per process)
 * - Generates QR Code data URLs
 */
import { Font } from "@react-pdf/renderer";
import QRCode from "qrcode";

// ── Font registration (module-level cache, runs once per server process) ─────
// State: "unloaded" → not attempted, "ok" → font ready, "failed" → use fallback
let _fontState: "unloaded" | "ok" | "failed" = "unloaded";
let _arabicFontState: "unloaded" | "ok" | "failed" = "unloaded";

/**
 * Dancing Script (700) static TTF from the Fontsource CDN (jsDelivr).
 * A static TTF — NOT a variable/woff2 — so @react-pdf/renderer can parse it.
 */
const DANCING_SCRIPT_TTF =
  "https://cdn.jsdelivr.net/fontsource/fonts/dancing-script@latest/latin-700-normal.ttf";

/**
 * Amiri Regular — classical Arabic serif font with full GSUB/GPOS shaping tables.
 * Needed for correct Arabic letter connection (init/medi/fina/isol forms).
 */
const AMIRI_TTF =
  "https://cdn.jsdelivr.net/fontsource/fonts/amiri@latest/arabic-400-normal.ttf";

/**
 * Loads the handwriting signature font and registers it as a base64 data URL.
 * Also registers the Amiri Arabic font in parallel (side-effect — no return value change).
 *
 * IMPORTANT: we fetch the font ourselves and register a data: URL instead of
 * passing a remote URL to Font.register(). If a remote URL is registered,
 * react-pdf fetches it lazily *during* renderToBuffer() and THROWS if that
 * fetch fails (e.g. 404) — which crashes the whole certificate route. By
 * pre-fetching here we can fail gracefully and tell the caller to fall back
 * to the built-in Helvetica-Oblique font instead.
 *
 * @returns true if the custom signature font is available; false → use fallback.
 */
export async function registerFonts(): Promise<boolean> {
  if (_fontState !== "unloaded") {
    if (_arabicFontState === "unloaded") await registerArabicFont();
    return _fontState === "ok";
  }
  // Fetch both fonts in parallel to minimise latency
  let dancingOk = false;
  await Promise.allSettled([
    (async () => {
      try {
        const res = await fetch(DANCING_SCRIPT_TTF);
        if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
        const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
        Font.register({ family: "DancingScript", src: `data:font/ttf;base64,${b64}` });
        _fontState = "ok";
        dancingOk = true;
      } catch {
        // Signature falls back to Helvetica-Oblique — render never crashes.
        _fontState = "failed";
      }
    })(),
    registerArabicFont(),
  ]);
  return dancingOk;
}

/**
 * Loads Amiri Arabic font and registers it as "ArabicDisplay".
 * Called from registerFonts() — no need to call separately from routes.
 */
export async function registerArabicFont(): Promise<boolean> {
  if (_arabicFontState !== "unloaded") return _arabicFontState === "ok";
  try {
    const res = await fetch(AMIRI_TTF);
    if (!res.ok) throw new Error(`Arabic font fetch failed: ${res.status}`);
    const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    Font.register({ family: "ArabicDisplay", src: `data:font/ttf;base64,${b64}` });
    _arabicFontState = "ok";
    return true;
  } catch {
    _arabicFontState = "failed";
    return false;
  }
}

/** Returns true if the Arabic display font was successfully registered. */
export function isArabicFontAvailable(): boolean {
  return _arabicFontState === "ok";
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
