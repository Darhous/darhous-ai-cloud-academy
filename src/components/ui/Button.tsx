import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-mono tracking-wider rounded-lg transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2";

    const variants = {
      primary: "glow-button-primary text-white",
      secondary: "glow-button-secondary text-secondary border",
      ghost: "hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface",
      outline: "border border-outline-variant text-on-surface hover:border-primary hover:text-primary",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
