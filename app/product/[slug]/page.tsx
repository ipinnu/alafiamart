"use client";

import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { DIETARY_NEEDS, getProductBySlug } from "@/lib/data/products";
import { formatNaira, whatsappLink } from "@/lib/format";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { addItem, location } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) notFound();

  return (
    <div className="container-page py-8">
      <p className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>{" "}
        ▸{" "}
        <Link
          href={`/category/${product.category}`}
          className="hover:text-brand"
        >
          Category
        </Link>{" "}
        ▸ {product.name}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div
          className="min-h-[320px] rounded-2xl border border-border"
          style={{
            background: `linear-gradient(145deg, oklch(0.92 0.04 ${product.imageHue}), oklch(0.8 0.09 ${product.imageHue}))`,
          }}
        />
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {product.nafdacVerified ? (
              <Badge tone="success">NAFDAC Verified</Badge>
            ) : null}
            {product.dietary.map((d: (typeof product.dietary)[number]) => (
              <Badge key={d} tone={d}>
                {DIETARY_NEEDS.find((x) => x.id === d)?.label ?? d}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <p className="mt-1 text-muted">
            {product.brand} · {product.size}
          </p>
          <p className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-bold">
            {formatNaira(product.price)}
          </p>
          <p className="mt-2 text-sm text-brand">
            In Stock · {product.stockUnits} units
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                className="px-3 py-2 text-lg"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-8 text-center font-semibold">{qty}</span>
              <button
                type="button"
                className="px-3 py-2 text-lg"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <Button onClick={() => addItem(product.id, qty)}>Add to Cart</Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            Same-day delivery to {location.area.split(",")[0]} if ordered before
            2:00 PM
          </p>

          <a
            href={whatsappLink(
              `Hi AlafiaMart, I have a question about ${product.name}`,
            )}
            className="mt-4 inline-flex"
          >
            <Button variant="whatsapp">Ask about this product on WhatsApp</Button>
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">Nutrition</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {(
              product.nutrition ?? [
                { label: "Serving Size", value: "See pack" },
                { label: "GI Score", value: product.giScore ?? "Not listed" },
              ]
            ).map((row: { label: string; value: string }) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">Ingredients &amp; Allergens</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {product.ingredients ??
              "Full ingredient list available on packaging."}
          </p>
          {product.contains ? (
            <p className="mt-2 text-sm">
              <strong>Contains:</strong> {product.contains}
            </p>
          ) : null}
          {product.mayContain ? (
            <p className="mt-1 text-sm text-muted">
              May contain: {product.mayContain}
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 md:col-span-2">
          <h2 className="text-lg font-bold">NAFDAC Verification</h2>
          {product.nafdacVerified ? (
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <p>
                <span className="text-brand font-bold">Verified ✓</span>
              </p>
              <p>NAFDAC Reg No: {product.nafdacRegNo}</p>
              <p>Manufacturer: {product.manufacturer}</p>
              <p>
                Batch: {product.batch} · Expiry: {product.expiry}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">
              This item is not listed as a NAFDAC-verified supplement.
            </p>
          )}
          <p className="mt-4 text-xs text-muted">
            This product is a dietary supplement and is not intended to diagnose,
            treat, cure or prevent any disease. Consult a healthcare provider
            before use.
          </p>
        </section>
      </div>
    </div>
  );
}
