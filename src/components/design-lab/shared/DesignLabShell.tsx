import type { ReactNode } from "react";
import PreviewHeader from "./PreviewHeader";
import ConceptBadge from "./ConceptBadge";

export default function DesignLabShell({
  locale,
  number,
  name,
  children,
}: {
  locale: string;
  number: number;
  name: string;
  children: ReactNode;
}) {
  const isAr = locale === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip bg-[#07090d] text-white"
      data-design-lab
    >
      <PreviewHeader locale={locale} conceptNumber={number} conceptName={name} />
      {children}
      <ConceptBadge number={number} name={name} locale={locale} />
    </div>
  );
}

