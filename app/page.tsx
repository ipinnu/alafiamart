"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  DIETARY_NEEDS,
  products,
} from "@/lib/data/products";
import { checkDeliveryAvailability } from "@/lib/data/zones";
import { useCart } from "@/lib/cart";

export default function HomePage() {
  const bestsellers = products.slice(0, 8);
  const { setLocation } = useCart();
  const [area, setArea] = useState("");
  const [zoneMsg, setZoneMsg] = useState<string | null>(null);

  function onCheck(e: FormEvent) {
    e.preventDefault();
    const result = checkDeliveryAvailability(area);
    setZoneMsg(`${result.label} — ${result.detail}`);
    if (result.status !== "unavailable" && area.trim()) {
      setLocation({ area: area.trim() });
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.42 0.09 152) 0%, oklch(0.35 0.08 152) 45%, oklch(0.55 0.1 145) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, oklch(0.85 0.08 85), transparent 40%), radial-gradient(circle at 10% 80%, oklch(0.7 0.1 42), transparent 35%)",
          }}
        />
        <div className="container-page relative grid gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              Nigeria&apos;s dietary-first marketplace
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
              Shop confidently for your dietary needs
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
              Verified gluten-free, low-GI &amp; NAFDAC-checked products,
              delivered same-day across Lagos, Abuja and Ibadan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/category/supplements-vitamins?diet=gluten-free">
                <Button className="bg-white text-brand hover:bg-brand-tint">
                  Shop Gluten-Free
                </Button>
              </Link>
              <Link href="/delivery">
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white/10"
                >
                  Check Delivery Area
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden min-h-[280px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur md:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Lifestyle
            </p>
            <p className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-bold text-white">
              Real stock. Honest delivery windows. Trust you can verify.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              <li>✓ NAFDAC-verified supplements</li>
              <li>✓ Secure Paystack checkout</li>
              <li>✓ Same-day promise with zone rules</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-2xl font-bold">Shop by Dietary Need</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {DIETARY_NEEDS.map((d) => (
            <Link
              key={d.id}
              href={`/search?diet=${d.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 text-center shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {d.letter}
              </span>
              <span className="text-sm font-semibold">{d.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Check delivery availability</h2>
          <p className="mt-1 text-sm text-muted">
            Enter your area or LGA
          </p>
          <form
            onSubmit={onCheck}
            className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <Input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Lekki Phase 1, Eti-Osa"
            />
            <Button type="submit">Check</Button>
          </form>
          {zoneMsg ? (
            <p className="mt-3 text-sm font-medium text-brand">{zoneMsg}</p>
          ) : null}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Bestsellers</h2>
          <Link href="/search" className="text-sm font-bold text-brand">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-brand"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint font-bold text-brand">
                {c.letter}
              </span>
              <span className="text-sm font-semibold">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-brand-tint/50 py-12">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            {
              title: "NAFDAC-verified supplements",
              body: "Batch, expiry & registration data checked before listing",
            },
            {
              title: "Secure Paystack checkout",
              body: "Card, bank transfer & USSD, all Nigeria-ready",
            },
            {
              title: "Same-day delivery promise",
              body: "Reflects real stock & zone rules — never a false promise",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-surface p-5 shadow-sm">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
