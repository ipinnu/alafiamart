import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={`h-[46px] w-full rounded-lg border bg-white px-3.5 text-[13px] text-ink outline-none placeholder:text-muted-2 focus:border-2 focus:border-brand focus:shadow-[0_0_0_4px_var(--brand-tint)] disabled:bg-[var(--disabled-bg)] disabled:text-[var(--disabled-fg)] ${
        error
          ? "border-[1.5px] border-danger bg-danger-soft"
          : "border-border"
      } ${className}`}
      {...props}
    />
  );
}
