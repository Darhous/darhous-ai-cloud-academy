"use client";

import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-xl py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="glass-card rounded-3xl p-10 max-w-lg w-full flex flex-col items-center">
        <SearchX size={64} className="mb-6" style={{ color: "var(--color-tertiary)" }} />
        <h1 className="font-display font-bold text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          Page Not Found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
          We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: "var(--color-primary)", color: "black" }}
        >
          <Home size={16} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
