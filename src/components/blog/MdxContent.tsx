import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-display font-bold text-3xl mt-8 mb-4 leading-tight" style={{ color: "var(--color-on-surface)" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display font-bold text-2xl mt-8 mb-3" style={{ color: "var(--color-on-surface)" }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display font-semibold text-lg mt-6 mb-2" style={{ color: "var(--color-on-surface)" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed my-3" style={{ color: "var(--color-on-surface-variant)" }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-1.5 my-4 ms-2" style={{ color: "var(--color-on-surface-variant)" }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-1.5 my-4 ms-2" style={{ color: "var(--color-on-surface-variant)" }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-s-4 ps-4 py-2 my-4 rounded-e-xl italic text-sm"
      style={{ borderColor: "var(--color-primary)", background: "var(--color-primary)08", color: "var(--color-on-surface-variant)" }}
      {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{ background: "var(--color-surface-container-high)", color: "var(--color-tertiary)" }}
      {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="rounded-2xl p-5 overflow-x-auto my-5 text-xs font-mono leading-relaxed"
      style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
      {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" style={{ color: "var(--color-on-surface)" }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--color-primary)" }} {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-sm rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-outline-variant)" }} {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2.5 text-start font-semibold text-xs font-mono"
      style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)", borderBottom: "1px solid var(--color-outline-variant)" }}
      {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 text-sm" style={{ color: "var(--color-on-surface-variant)", borderBottom: "1px solid var(--color-outline-variant)20" }} {...props} />
  ),
  hr: () => <hr className="my-6" style={{ borderColor: "var(--color-outline-variant)" }} />,
};

interface Props {
  source: string;
}

export default function MdxContent({ source }: Props) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
