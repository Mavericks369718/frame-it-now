import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
};

export function PrimaryButton({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) {
  const base =
    "press inline-flex items-center justify-center w-full h-[58px] rounded-full text-[15px] font-medium tracking-tight disabled:opacity-30 disabled:pointer-events-none transition-colors";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-[var(--color-ink)]"
      : variant === "outline"
        ? "border border-border bg-background text-foreground hover:bg-accent"
        : "text-foreground hover:bg-accent";
  return (
    <button className={cn(base, styles, className)} {...rest}>
      {children}
    </button>
  );
}
