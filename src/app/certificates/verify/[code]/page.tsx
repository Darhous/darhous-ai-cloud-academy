import type { Metadata } from "next";
import CertificateVerifyClient from "./CertificateVerifyClient";

export async function generateMetadata({
  params,
}: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Certificate Verification | ${code}`,
    description: "Verify the authenticity of a Darhous AI Academy certificate",
    robots: { index: true, follow: true },
  };
}

export default async function CertificateVerifyPage({
  params,
}: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CertificateVerifyClient code={code} />;
}
