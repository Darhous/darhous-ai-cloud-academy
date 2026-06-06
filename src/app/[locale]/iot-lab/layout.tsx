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
    <div data-portal="iot-lab">
      {locale === "en" && (
        <div
          className="w-full py-3 px-4 flex items-center justify-center gap-3 flex-wrap text-sm"
          style={{
            background: "var(--portal-color-subtle)",
            borderBottom: "1px solid var(--portal-color-glow)",
          }}
        >
          <span style={{ color: "var(--portal-color)" }}>🌐</span>
          <p style={{ color: "#fed7aa" }}>
            IoT Lab content is currently available in Arabic only.
            We&apos;re working on an English version.
          </p>
          <Link
            href="/ar/iot-lab"
            className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 transition-opacity hover:opacity-80"
            style={{
              background: "var(--portal-color-glow)",
              color: "var(--portal-color)",
              border: "1px solid var(--portal-color-glow)",
            }}
          >
            عرض بالعربية →
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
