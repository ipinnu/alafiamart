import { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "accent"
  | "destructive"
  | "whatsapp";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-hover disabled:bg-[var(--disabled-bg)] disabled:text-[var(--disabled-fg)]",
  secondary:
    "border-[1.5px] border-brand text-brand bg-transparent hover:bg-brand-tint",
  ghost: "text-brand bg-transparent hover:bg-brand-tint",
  accent: "bg-accent text-white hover:opacity-90",
  destructive:
    "border border-[var(--danger-border)] text-danger bg-transparent hover:bg-danger-soft",
  whatsapp: "bg-whatsapp text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "text-xs font-bold px-4 py-2 rounded-md",
  md: "text-sm font-bold px-6 py-[13px] rounded-lg",
  lg: "text-[15px] font-bold px-[30px] py-4 rounded-[10px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
