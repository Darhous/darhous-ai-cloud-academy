export default function LanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-portal="language">{children}</div>;
}
