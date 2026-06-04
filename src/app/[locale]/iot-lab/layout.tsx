import Link from "next/link";

export default async function IoTLabLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {locale === "en" && (
        <div
          className="w-full py-3 px-4 flex items-center justify-center gap-3 flex-wrap text-sm"
          style={{
            background: "rgba(249,115,22,0.12)",
            borderBottom: "1px solid rgba(249,115,22,0.3)",
          }}
        >
          <span style={{ color: "#f97316" }}>🌐</span>
          <p style={{ color: "#fed7aa" }}>
            IoT Lab content is currently available in Arabic only.
            We&apos;re working on an English version.
          </p>
          <Link
            href="/ar/iot-lab"
            className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 transition-opacity hover:opacity-80"
            style={{
              background: "rgba(249,115,22,0.2)",
              color: "#f97316",
              border: "1px solid rgba(249,115,22,0.4)",
            }}
          >
            عرض بالعربية →
          </Link>
        </div>
      )}
      {children}
    </>
  );
}
