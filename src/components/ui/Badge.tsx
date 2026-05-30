import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "beginner" | "intermediate" | "advanced";
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary:      "bg-blue-500/15 text-blue-300 border-blue-400/20",
  secondary:    "bg-violet-500/15 text-violet-300 border-violet-400/20",
  tertiary:     "bg-cyan-500/15 text-cyan-300 border-cyan-400/20",
  outline:      "border-outline-variant text-on-surface-variant",
  beginner:     "bg-green-500/15 text-green-300 border-green-400/20",
  intermediate: "bg-yellow-500/15 text-yellow-300 border-yellow-400/20",
  advanced:     "bg-red-500/15 text-red-300 border-red-400/20",
};

export default function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wider border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
