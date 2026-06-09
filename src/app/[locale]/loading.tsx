"use client";

export default function Loading() {
  return (
    <div className="container-xl py-24 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <p className="mt-6 text-sm font-mono tracking-widest uppercase animate-pulse" style={{ color: "var(--color-on-surface-variant)" }}>
        Loading
      </p>
    </div>
  );
}
