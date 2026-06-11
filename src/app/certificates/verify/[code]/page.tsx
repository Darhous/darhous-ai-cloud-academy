import type { Metadata } from "next";
import CertificateVerifyClient from "./CertificateVerifyClient";

export async function generateMetadata({
  params,
}: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  void code;
  return {
    title: "Certificate Verification | NexaLearn",
    description: "Verify the authenticity of a NexaLearn AI Academy certificate",
    robots: { index: false, follow: false, noarchive: true },
  };
}

export default async function CertificateVerifyPage({
  params,
}: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CertificateVerifyClient code={code} />;
}
