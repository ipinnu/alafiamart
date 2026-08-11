"use client";

import Image from "next/image";
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

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80";

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
      <section className="relative min-h-[78vh] overflow-hidden border-b border-border md:min-h-[88vh]">
        <Image
          src={HERO_IMAGE}
          alt="Fresh dietary foods and wellness ingredients"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-brand/55 to-accent/35" />
        <div className="container-page relative flex min-h-[78vh] items-end py-14 md:min-h-[88vh] md:items-center md:py-20">
          <div className="max-w-xl text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              Nigeria&apos;s dietary-first marketplace
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] md:text-5xl">
              Shop confidently for your dietary needs
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/90 md:text-lg">
              Verified gluten-free, low-GI &amp; NAFDAC-checked products,
              delivered same-day across Lagos, Abuja and Ibadan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/category/supplements-vitamins?diet=gluten-free">
                <Button className="bg-accent text-white hover:bg-accent-hover">
                  Shop Gluten-Free
                </Button>
              </Link>
              <Link href="/delivery">
                <Button className="border-[1.5px] border-white bg-transparent text-white hover:bg-white/15">
                  Check Delivery Area
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-5">
          <div className="section-rule mb-3" />
          <h2 className="text-2xl font-bold">Shop by Dietary Need</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {DIETARY_NEEDS.map((d, i) => (
            <Link
              key={d.id}
              href={`/search?diet=${d.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 text-center shadow-sm transition hover:border-accent hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${
                  i % 2 === 0 ? "bg-brand" : "bg-accent"
                }`}
              >
                {d.letter}
              </span>
              <span className="text-sm font-semibold">{d.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-accent-tint/60 py-12">
        <div className="container-page">
          <div className="section-rule mb-3" />
          <h2 className="text-2xl font-bold">Check delivery availability</h2>
          <p className="mt-1 text-sm text-muted">Enter your area or LGA</p>
          <form
            onSubmit={onCheck}
            className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <Input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Lekki Phase 1, Eti-Osa"
            />
            <Button type="submit" variant="accent">
              Check
            </Button>
          </form>
          {zoneMsg ? (
            <p className="mt-3 text-sm font-medium text-brand">{zoneMsg}</p>
          ) : null}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="section-rule mb-3" />
            <h2 className="text-2xl font-bold">Bestsellers</h2>
          </div>
          <Link href="/search" className="text-sm font-bold text-accent">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="section-rule mb-3" />
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-accent"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                  i % 2 === 0
                    ? "bg-brand-tint text-brand"
                    : "bg-accent-tint text-accent"
                }`}
              >
                {c.letter}
              </span>
              <span className="text-sm font-semibold">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-br from-brand-tint via-canvas to-accent-tint py-12">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            {
              title: "NAFDAC-verified supplements",
              body: "Batch, expiry & registration data checked before listing",
              tone: "brand",
            },
            {
              title: "Secure Paystack checkout",
              body: "Card, bank transfer & USSD, all Nigeria-ready",
              tone: "accent",
            },
            {
              title: "Same-day delivery promise",
              body: "Reflects real stock & zone rules — never a false promise",
              tone: "amber",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/70 bg-surface p-5 shadow-sm"
            >
              <div
                className={`mb-3 h-1.5 w-10 rounded-full ${
                  item.tone === "brand"
                    ? "bg-brand"
                    : item.tone === "accent"
                      ? "bg-accent"
                      : "bg-amber"
                }`}
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
