"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { getProductById, SAME_DAY_FEE, SCHEDULED_FEE } from "@/lib/data/products";
import { LGAS } from "@/lib/data/zones";
import { formatNaira, generateOrderId } from "@/lib/format";

type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear, location, setLocation } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("Ifeoma Adeyemi");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [address, setAddress] = useState("12 Admiralty Way, Lekki Phase 1");
  const [lga, setLga] = useState("Eti-Osa");
  const [option, setOption] = useState<"same-day" | "scheduled">("same-day");
  const [payment, setPayment] = useState<"card" | "transfer" | "ussd">("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = option === "same-day" ? SAME_DAY_FEE : SCHEDULED_FEE;
  const total = subtotal + deliveryFee;

  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const p = getProductById(i.productId);
          return p
            ? { ...i, product: p, lineTotal: p.price * i.quantity }
            : null;
        })
        .filter(Boolean),
    [items],
  );

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-muted">Your cart is empty.</p>
        <Link href="/search" className="mt-4 inline-block">
          <Button>Shop products</Button>
        </Link>
      </div>
    );
  }

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLocation({ area: `${address.split(",")[0]}, ${lga}`, lga });

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "customer@alafiamart.ng",
          amount: total,
          name,
          phone,
          payment,
          option,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        mock?: boolean;
        authorization_url?: string;
        reference?: string;
        message?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.message ?? "Payment init failed");
      }

      const orderId = generateOrderId();
      sessionStorage.setItem(
        "alafia-last-order",
        JSON.stringify({
          id: orderId,
          total,
          items: items.length,
          reference: data.reference,
          eta: option === "same-day" ? "Arriving today by 8:00 PM" : "Scheduled delivery",
        }),
      );

      if (data.authorization_url && !data.mock) {
        clear();
        window.location.href = data.authorization_url;
        return;
      }

      clear();
      router.push(`/order/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        {[
          [1, "Delivery"],
          [2, "Option"],
          [3, "Payment"],
          [4, "Review"],
        ].map(([n, label]) => (
          <button
            key={String(n)}
            type="button"
            onClick={() => setStep(n as Step)}
            className={`rounded-full px-3 py-1 ${
              step === n ? "bg-brand text-white" : "bg-brand-tint text-brand"
            }`}
          >
            {n} {label}
          </button>
        ))}
      </div>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {step === 1 ? (
            <section className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-lg font-bold">Delivery Information</h2>
              <div className="mt-4 grid gap-3">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                <select
                  className="h-[46px] rounded-lg border border-border bg-white px-3.5 text-sm"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                >
                  {LGAS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                <Button type="button" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <h2 className="text-lg font-bold">Delivery Option</h2>
              <label className="flex cursor-pointer gap-3 rounded-xl border border-border p-4">
                <input
                  type="radio"
                  checked={option === "same-day"}
                  onChange={() => setOption("same-day")}
                />
                <span>
                  <strong>Same-day delivery · {formatNaira(SAME_DAY_FEE)}</strong>
                  <br />
                  <span className="text-sm text-muted">
                    Order before 2:00 PM cut-off · Arrives by 8:00 PM
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer gap-3 rounded-xl border border-border p-4">
                <input
                  type="radio"
                  checked={option === "scheduled"}
                  onChange={() => setOption("scheduled")}
                />
                <span>
                  <strong>Scheduled delivery · {formatNaira(SCHEDULED_FEE)}</strong>
                  <br />
                  <span className="text-sm text-muted">
                    Choose a date &amp; 2-hour slot
                  </span>
                </span>
              </label>
              <Button type="button" onClick={() => setStep(3)}>
                Continue
              </Button>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <h2 className="text-lg font-bold">Payment (Paystack)</h2>
              {(
                [
                  ["card", "Card (Paystack)"],
                  ["transfer", "Bank Transfer"],
                  ["ussd", "USSD"],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className="flex cursor-pointer gap-3 rounded-xl border border-border p-4"
                >
                  <input
                    type="radio"
                    checked={payment === id}
                    onChange={() => setPayment(id)}
                  />
                  <span className="font-semibold">{label}</span>
                </label>
              ))}
              <Button type="button" onClick={() => setStep(4)}>
                Continue
              </Button>
            </section>
          ) : null}

          {step === 4 ? (
            <section className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-lg font-bold">Review &amp; Total</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {lines.map((line) =>
                  line ? (
                    <li key={line.productId} className="flex justify-between">
                      <span>
                        {line.product.name} ×{line.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatNaira(line.lineTotal)}
                      </span>
                    </li>
                  ) : null,
                )}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Delivering to {location.area} · {name} · {phone}
              </p>
              {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="mt-5 w-full" size="lg" disabled={loading}>
                {loading ? "Processing…" : `Place Order · ${formatNaira(total)}`}
              </Button>
            </section>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-bold">Summary</h2>
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
        </aside>
      </form>
    </div>
  );
}
