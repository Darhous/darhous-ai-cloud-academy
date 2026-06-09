"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container-xl py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="glass-card rounded-3xl p-10 max-w-lg w-full flex flex-col items-center border border-red-500/20">
        <AlertTriangle size={64} className="text-red-500 mb-6" />
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          Something went wrong
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
          We encountered an unexpected error while processing your request. Please try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: "var(--color-primary)", color: "black" }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 rounded-xl font-mono text-sm font-semibold transition-all hover:bg-white/5"
            style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
