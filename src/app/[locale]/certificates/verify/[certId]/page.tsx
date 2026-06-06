import type { Metadata } from "next";
import UnifiedVerifyClient from "./UnifiedVerifyClient";

export const metadata: Metadata = {
  title: "Certificate Verification — Darhous Academy",
  description: "Verify the authenticity of a Darhous Academy certificate.",
  robots: { index: false, noarchive: true },
};

export default async function CertVerifyPage({
  params,
}: {
  params: Promise<{ locale: string; certId: string }>;
}) {
  const { certId, locale } = await params;
  return <UnifiedVerifyClient certId={certId} locale={locale} />;
}
