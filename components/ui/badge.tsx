import type { DietaryTag } from "@/lib/types";

const dietColors: Record<string, string> = {
  "gluten-free": "bg-brand-tint text-brand",
  "low-gi": "bg-amber-tint text-[oklch(0.45_0.12_70)]",
  "diabetic-friendly": "bg-accent-tint text-accent",
  vegan: "bg-brand-tint text-brand",
  "dairy-free": "bg-accent-tint text-accent-hover",
  "nut-free": "bg-amber-tint text-[oklch(0.45_0.12_70)]",
  keto: "bg-accent-tint text-accent",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "sale" | "warning" | "danger" | DietaryTag;
}) {
  const map: Record<string, string> = {
    neutral: "bg-[oklch(0.94_0.01_85)] text-muted",
    success: "bg-brand-tint text-brand",
    sale: "bg-accent text-white",
    warning: "bg-amber-tint text-[oklch(0.45_0.12_70)]",
    danger: "bg-danger-soft text-danger",
    ...dietColors,
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${map[tone] ?? map.neutral}`}
    >
      {children}
    </span>
  );
}
