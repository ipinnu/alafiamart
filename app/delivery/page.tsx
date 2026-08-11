"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkDeliveryAvailability } from "@/lib/data/zones";
import { useCart } from "@/lib/cart";

export default function DeliveryPage() {
  const { setLocation } = useCart();
  const [area, setArea] = useState("Lekki Phase 1, Eti-Osa");
  const [result, setResult] = useState(() =>
    checkDeliveryAvailability("Lekki Phase 1, Eti-Osa"),
  );

  function onCheck(e: FormEvent) {
    e.preventDefault();
    const r = checkDeliveryAvailability(area);
    setResult(r);
    if (r.status !== "unavailable") setLocation({ area });
  }

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-extrabold">Check delivery availability</h1>
        <form onSubmit={onCheck} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Area or LGA"
          />
          <Button type="submit">Check</Button>
        </form>

        <div
          className={`mt-6 rounded-2xl p-5 ${
            result.status === "same-day"
              ? "bg-brand-tint text-brand"
              : result.status === "standard"
                ? "bg-[oklch(0.95_0.06_85)] text-[oklch(0.45_0.1_70)]"
                : "bg-danger-soft text-danger"
          }`}
        >
          {result.status === "same-day" ? (
            <p className="font-bold">✓ {result.label}</p>
          ) : (
            <p className="font-bold">{result.label}</p>
          )}
          <p className="mt-1 text-sm opacity-90">{result.detail}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-xl border border-border p-3 text-left text-sm hover:border-brand"
            onClick={() => {
              setArea("Lekki Phase 1, Eti-Osa");
              setResult(checkDeliveryAvailability("Lekki Phase 1, Eti-Osa"));
            }}
          >
            Try: Lekki (same-day)
          </button>
          <button
            type="button"
            className="rounded-xl border border-border p-3 text-left text-sm hover:border-brand"
            onClick={() => {
              setArea("Okene, Kogi State");
              setResult(checkDeliveryAvailability("Okene, Kogi State"));
            }}
          >
            Try: Okene (standard fallback)
          </button>
        </div>
      </div>
    </div>
  );
}
