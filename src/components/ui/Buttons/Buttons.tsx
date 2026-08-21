import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger" | "danger-text" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses = {
  primary:
    "bg-primary text-primary-foreground hover:bg-foreground hover:text-background hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(242,242,242,0.35)]",
  outline:
    "border-white/15 bg-white/[0.03] text-foreground backdrop-blur-sm hover:border-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5",
  danger:
    "bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)]",
  "danger-text":
    "bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-400",
  ghost: "bg-transparent text-text-secondary hover:bg-white/[0.06] hover:text-foreground",
  cta: "bg-amber-500 text-background hover:bg-foreground hover:-translate-y-0.5",
};

const sizeClasses = {
  sm: "h-9 px-4 text-sm font-medium",
  md: "h-12 px-6 text-base font-bold",
  lg: "h-14 px-8 text-lg font-bold",
};

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-sans transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="shrink-0 animate-spin" size={18} />}
      {children}
    </button>
  );
}

export default Button;
