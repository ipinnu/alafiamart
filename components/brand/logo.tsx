import Image from "next/image";
import Link from "next/link";

export function BrandLogo({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Smaller header mark without forcing light/dark wordmark */
  compact?: boolean;
  light?: boolean;
}) {
  const size = compact ? 40 : 52;

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="AlafiaMart home — Eat Better, Feel Better"
    >
      <Image
        src="/brand/logo.png"
        alt="AlafiaMart — Eat Better, Feel Better"
        width={size}
        height={size}
        className="h-auto w-auto object-contain"
        priority
      />
    </Link>
  );
}
