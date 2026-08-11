"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/format";

const orders = [
  { id: "AM-10482", status: "Delivered", date: "Aug 2, 2026", items: 3, total: 14300 },
  { id: "AM-10411", status: "Delivered", date: "Jul 26, 2026", items: 5, total: 22150 },
  { id: "AM-10390", status: "Cancelled", date: "Jul 19, 2026", items: 2, total: 8900 },
  { id: "AM-10355", status: "Delivered", date: "Jul 9, 2026", items: 4, total: 17650 },
];

export default function AccountPage() {
  const [tab, setTab] = useState<"orders" | "addresses" | "prefs">("orders");

  return (
    <div className="container-page py-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
          IA
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">Ifeoma Adeyemi</h1>
          <p className="text-sm text-muted">+234 803 123 4567</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {(
          [
            ["orders", "Orders"],
            ["addresses", "Addresses"],
            ["prefs", "Dietary Prefs"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              tab === id ? "bg-brand text-white" : "bg-brand-tint text-brand"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "orders" ? (
        <div className="mt-6 space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
            >
              <div>
                <p className="font-bold">{o.id}</p>
                <p className="text-sm text-muted">
                  {o.status} · {o.date} · {o.items} items
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={o.status === "Cancelled" ? "danger" : "success"}>
                  {o.status}
                </Badge>
                <span className="font-bold">{formatNaira(o.total)}</span>
                <Button size="sm" variant="secondary">
                  Reorder
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "addresses" ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <p className="font-bold">Home</p>
          <p className="mt-1 text-sm text-muted">
            12 Admiralty Way, Lekki Phase 1 · Eti-Osa
          </p>
          <Button size="sm" className="mt-4" variant="secondary">
            Add address
          </Button>
        </div>
      ) : null}

      {tab === "prefs" ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <p className="mb-3 text-sm text-muted">
            We&apos;ll prioritize these on homepage and search.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Gluten-Free", "Low-GI", "Dairy-Free"].map((p) => (
              <Badge key={p} tone="success">
                {p}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
