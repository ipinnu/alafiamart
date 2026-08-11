import Image from "next/image";
import Link from "next/link";

/**
 * Swap `/public/brand/logo.png` (or .svg) when the real logo is provided.
 * Falls back to wordmark until the file exists.
 */
export function BrandLogo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="AlafiaMart home"
    >
      <span
        className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ${
          light ? "bg-white/15 ring-1 ring-white/30" : "bg-brand-tint ring-1 ring-brand/20"
        }`}
      >
        {/* Placeholder mark — replace src with real logo asset */}
        <Image
          src="/brand/logo-mark.svg"
          alt=""
          width={28}
          height={28}
          className="object-contain"
        />
      </span>
      <span
        className={`font-[family-name:var(--font-sora)] text-lg font-extrabold tracking-tight md:text-xl ${
          light ? "text-white" : "text-brand"
        }`}
      >
        Alafia<span className="text-accent">Mart</span>
      </span>
    </Link>
  );
}
