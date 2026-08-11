"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatNaira, stars } from "@/lib/format";
import type { Product } from "@/lib/types";
import { DIETARY_NEEDS } from "@/lib/data/products";

function ProductImage({ product }: { product: Product }) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(145deg, oklch(0.92 0.04 ${product.imageHue}), oklch(0.82 0.08 ${product.imageHue}))`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-ink/70">
          {product.name}
        </span>
      </div>
      <div className="absolute left-2 top-2 flex flex-wrap gap-1">
        {product.compareAt ? <Badge tone="sale">Sale</Badge> : null}
        {product.nafdacVerified ? <Badge tone="success">NAFDAC Verified</Badge> : null}
        {product.dietary.slice(0, 2).map((d) => {
          const label = DIETARY_NEEDS.find((x) => x.id === d)?.label ?? d;
          return (
            <Badge key={d} tone={d}>
              {label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
      <Link href={`/product/${product.slug}`}>
        <ProductImage product={product} />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/product/${product.slug}`}
          className="font-[family-name:var(--font-sora)] text-[15px] font-bold leading-snug text-ink hover:text-brand"
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted">
          {product.size} · {product.brand}
        </p>
        <p className="text-xs text-amber">
          {stars(product.rating)}{" "}
          <span className="text-muted">({product.reviewCount})</span>
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-sora)] text-base font-bold">
            {formatNaira(product.price)}
          </span>
          {product.compareAt ? (
            <span className="text-xs text-muted line-through">
              {formatNaira(product.compareAt)}
            </span>
          ) : null}
        </div>
      </div>
      <Button
        size="sm"
        className="w-full"
        onClick={() => addItem(product.id)}
        type="button"
      >
        Add to cart
      </Button>
    </article>
  );
}
