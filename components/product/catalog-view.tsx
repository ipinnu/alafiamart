"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DIETARY_NEEDS,
  filterProducts,
  getCategory,
} from "@/lib/data/products";
import type { DietaryTag } from "@/lib/types";

function useFilters() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? undefined;
  const diet = (sp.get("diet") as DietaryTag | null) ?? undefined;
  const brand = sp.get("brand") ?? undefined;
  const nafdac = sp.get("nafdac") === "1";
  const maxPrice = sp.get("max") ? Number(sp.get("max")) : undefined;
  const inStock = sp.get("stock") === "1";
  const sameDay = sp.get("sameday") === "1";
  return { q, diet, brand, nafdac, maxPrice, inStock, sameDay };
}

export function CatalogView({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  const filters = useFilters();
  const results = useMemo(
    () =>
      filterProducts({
        category,
        q: filters.q,
        dietary: filters.diet ? [filters.diet] : undefined,
        brand: filters.brand ? [filters.brand] : undefined,
        nafdacOnly: filters.nafdac,
        maxPrice: filters.maxPrice,
        inStockOnly: filters.inStock,
        sameDayOnly: filters.sameDay,
      }),
    [category, filters],
  );

  const base = category ? `/category/${category}` : "/search";

  function href(updates: Record<string, string | null>) {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.diet) params.set("diet", filters.diet);
    if (filters.brand) params.set("brand", filters.brand);
    if (filters.nafdac) params.set("nafdac", "1");
    if (filters.maxPrice) params.set("max", String(filters.maxPrice));
    if (filters.inStock) params.set("stock", "1");
    if (filters.sameDay) params.set("sameday", "1");
    for (const [k, v] of Object.entries(updates)) {
      if (v == null) params.delete(k);
      else params.set(k, v);
    }
    const s = params.toString();
    return s ? `${base}?${s}` : base;
  }

  return (
    <div className="container-page py-8">
      <p className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        {category ? (
          <>
            {" "}
            ▸ Category ▸ {getCategory(category)?.label ?? title}
          </>
        ) : (
          <> ▸ Search</>
        )}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{results.length} results</p>
        </div>
        <p className="text-sm text-muted">Sort: Popularity ▾</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden space-y-6 rounded-2xl border border-border bg-surface p-4 lg:block">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Diet
            </p>
            <div className="space-y-2">
              {DIETARY_NEEDS.map((d) => (
                <Link
                  key={d.id}
                  href={href({
                    diet: filters.diet === d.id ? null : d.id,
                  })}
                  className={`flex items-center gap-2 text-sm ${
                    filters.diet === d.id ? "font-bold text-brand" : ""
                  }`}
                >
                  <span
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border text-[10px] ${
                      filters.diet === d.id
                        ? "border-brand bg-brand text-white"
                        : "border-muted-2"
                    }`}
                  >
                    {filters.diet === d.id ? "✓" : ""}
                  </span>
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Stock &amp; Delivery
            </p>
            <div className="space-y-2 text-sm">
              <Link href={href({ stock: filters.inStock ? null : "1" })}>
                {filters.inStock ? "☑" : "☐"} In Stock Only
              </Link>
              <br />
              <Link href={href({ sameday: filters.sameDay ? null : "1" })}>
                {filters.sameDay ? "☑" : "☐"} Same-Day Eligible
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Quick
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={href({ nafdac: filters.nafdac ? null : "1" })}>
                <Badge tone={filters.nafdac ? "success" : "neutral"}>
                  NAFDAC Verified
                </Badge>
              </Link>
              <Link href={href({ max: filters.maxPrice ? null : "10000" })}>
                <Badge>Under ₦10,000</Badge>
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
            <Link href={href({ nafdac: filters.nafdac ? null : "1" })}>
              <Button size="sm" variant={filters.nafdac ? "primary" : "secondary"}>
                NAFDAC Verified
              </Button>
            </Link>
            <Link href={href({ max: filters.maxPrice ? null : "10000" })}>
              <Button
                size="sm"
                variant={filters.maxPrice ? "primary" : "secondary"}
              >
                Under ₦10,000
              </Button>
            </Link>
            <Link href={href({ stock: filters.inStock ? null : "1" })}>
              <Button size="sm" variant={filters.inStock ? "primary" : "secondary"}>
                In Stock
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
              No products match these filters.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
