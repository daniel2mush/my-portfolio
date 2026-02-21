import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Buttons.module.scss";

interface ButtonPros extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger" | "danger-text" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  fullWidth,
  isLoading,
  size = "sm",
  className = "",
  ...props
}: ButtonPros) {
  const defaultClassName = `
${styles.btn} 
${styles[variant]}
${styles[size]}
${fullWidth ? styles.fullWidth : ""}
${className}
`;

  return (
    <button
      className={defaultClassName}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "..." : children}
    </button>
  );
}
