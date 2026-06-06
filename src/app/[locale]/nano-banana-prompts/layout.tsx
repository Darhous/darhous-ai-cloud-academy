export default function NanaBananaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-portal="nano-banana">{children}</div>;
}
