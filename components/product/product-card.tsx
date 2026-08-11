"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product/product-image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatNaira, stars } from "@/lib/format";
import type { Product } from "@/lib/types";

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
