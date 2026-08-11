"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand/logo";
import { useCart } from "@/lib/cart";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-brand via-brand to-accent px-4 py-2 text-center text-xs font-medium text-white md:text-sm">
      Same-day delivery in Lagos, Abuja &amp; Ibadan · Order before 2PM for
      same-day dispatch
    </div>
  );
}

export function SiteHeader() {
  const { count, location } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="container-page flex flex-col gap-3 py-3">
        <div className="flex items-center gap-3">
          <BrandLogo />
          <form onSubmit={onSearch} className="relative hidden flex-1 md:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search gluten-free, supplements, household essentials…"
              className="h-11 w-full rounded-lg border border-border bg-canvas px-4 text-sm outline-none focus:border-brand"
            />
          </form>
          <Link
            href="/delivery"
            className="hidden text-sm text-muted hover:text-accent lg:block"
          >
            Delivering to:{" "}
            <span className="font-semibold text-ink">{location.area}</span>
          </Link>
          <Link href="/account" className="hidden text-sm font-semibold md:block">
            Account
          </Link>
          <Link
            href="/cart"
            className="relative rounded-lg bg-accent px-3 py-2 text-sm font-bold text-white hover:bg-accent-hover"
          >
            Cart
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
        <form onSubmit={onSearch} className="md:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search gluten-free, supplements…"
            className="h-11 w-full rounded-lg border border-border bg-canvas px-4 text-sm outline-none focus:border-brand"
          />
        </form>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink md:flex">
          <Link href="/category/supplements-vitamins" className="hover:text-accent">
            Shop by Dietary Need
          </Link>
          <Link href="/search" className="hover:text-accent">
            Shop by Category
          </Link>
          <Link href="/delivery" className="hover:text-accent">
            Same-Day Delivery
          </Link>
          <Link href="/account" className="hover:text-brand">
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-ink text-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo light />
          <p className="mt-3 max-w-md text-sm text-white/70">
            Nigeria&apos;s dietary-first health &amp; wellness marketplace.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-amber">Help</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>FAQ</li>
            <li>Delivery &amp; Returns</li>
            <li>Privacy &amp; Terms</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-accent">Shop</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/category/supplements-vitamins">Dietary Need</Link>
            </li>
            <li>
              <Link href="/search">Category</Link>
            </li>
            <li>
              <a href="https://wa.me/2348000000000">Chat on WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © 2026 AlafiaMart Nigeria. All rights reserved.
      </div>
    </footer>
  );
}
