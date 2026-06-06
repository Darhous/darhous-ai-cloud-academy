export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-portal="automation">{children}</div>;
}
