import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import styles from "./Buttons.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger" | "danger-text" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  size = "md", // Defaulting to 'md' is usually better for modern touch targets
  className = "",
  ...props
}: ButtonProps) {
  // Cleanly joins classes without leaving ugly whitespace or "undefined" in the DOM
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Renders a spinning icon if loading, otherwise renders nothing */}
      {isLoading && <Loader2 className={styles.spinnerIcon} size={18} />}

      {/* Button content */}
      {children}
    </button>
  );
}
