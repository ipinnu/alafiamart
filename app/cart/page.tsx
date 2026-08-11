"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import {
  FREE_DELIVERY_THRESHOLD,
  SAME_DAY_FEE,
  getProductById,
} from "@/lib/data/products";
import { formatNaira } from "@/lib/format";

export default function CartPage() {
  const {
    items,
    setQty,
    removeItem,
    subtotal,
    coupon,
    setCoupon,
    applyCoupon,
  } = useCart();

  const deliveryFee = SAME_DAY_FEE;
  const total = subtotal + (items.length ? deliveryFee : 0);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-extrabold">Your Cart ({items.length})</h1>
      <p className="mt-1 text-sm text-muted">
        Stock &amp; prices rechecked at checkout
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/search" className="mt-4 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => {
              const p = getProductById(item.productId);
              if (!p) return null;
              return (
                <div
                  key={item.productId}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-4"
                >
                  <div
                    className="h-20 w-20 rounded-xl"
                    style={{
                      background: `linear-gradient(145deg, oklch(0.92 0.04 ${p.imageHue}), oklch(0.8 0.08 ${p.imageHue}))`,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{p.name}</p>
                    <p className="text-sm text-muted">
                      {p.brand} · {p.size}
                    </p>
                  </div>
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      className="px-3 py-1"
                      onClick={() => setQty(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1"
                      onClick={() => setQty(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="w-24 text-right font-bold">
                    {formatNaira(p.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    className="text-danger"
                    onClick={() => removeItem(item.productId)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="mt-4 flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => applyCoupon()}
              >
                Apply
              </Button>
            </div>
            {remaining > 0 ? (
              <p className="mt-3 text-sm text-brand">
                Add {formatNaira(remaining)} more for free delivery
              </p>
            ) : (
              <p className="mt-3 text-sm text-brand">
                You unlocked free delivery eligibility
              </p>
            )}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-semibold">{formatNaira(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery Fee</dt>
                <dd className="font-semibold">{formatNaira(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-bold">Total</dt>
                <dd className="font-extrabold">{formatNaira(total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="mt-5 block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
