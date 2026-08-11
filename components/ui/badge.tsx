import type { DietaryTag } from "@/lib/types";

const dietColors: Record<string, string> = {
  "gluten-free": "bg-brand-tint text-brand",
  "low-gi": "bg-[#eef6ff] text-[#2551da]",
  "diabetic-friendly": "bg-[#fff4e8] text-[#bd5200]",
  vegan: "bg-[#eafaf0] text-[#027e6f]",
  "dairy-free": "bg-[#f3f6ff] text-[#3e6cf4]",
  "nut-free": "bg-[#fff6e0] text-[#7a3500]",
  keto: "bg-[#f7f6fe] text-[#5b4bc9]",
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
    warning: "bg-[oklch(0.95_0.06_85)] text-[oklch(0.55_0.12_70)]",
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
