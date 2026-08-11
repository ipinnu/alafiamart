"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatNaira, whatsappLink } from "@/lib/format";

type LastOrder = {
  id: string;
  total: number;
  items: number;
  eta: string;
};

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("alafia-last-order");
      if (raw) {
        const parsed = JSON.parse(raw) as LastOrder;
        if (parsed.id === id) setOrder(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [id]);

  const total = order?.total ?? 22100;
  const items = order?.items ?? 3;
  const eta = order?.eta ?? "Arriving today by 8:00 PM";

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">
          ✓
        </div>
        <h1 className="mt-5 text-3xl font-extrabold">Order placed!</h1>
        <p className="mt-2 text-muted">Order #{id}</p>
        <p className="mt-4 text-sm">
          {items} items · {formatNaira(total)}
        </p>
        <p className="mt-1 font-semibold text-brand">{eta}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/account">
            <Button className="w-full">Track Order</Button>
          </Link>
          <Link href="/search">
            <Button variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <a href={whatsappLink(`Hi, I need help with order ${id}`)}>
            <Button variant="whatsapp" className="w-full">
              Need help? Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
