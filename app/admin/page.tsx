import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/format";

export const metadata = {
  title: "Admin Dashboard",
};

const adminOrders = [
  { id: "AM-10502", customer: "Ifeoma A.", items: 4, total: 18700, zone: "Lekki", status: "Picking" },
  { id: "AM-10501", customer: "Chidi O.", items: 2, total: 6200, zone: "Ikeja", status: "Confirmed" },
  { id: "AM-10500", customer: "Bisi T.", items: 6, total: 31400, zone: "Yaba", status: "Dispatched" },
  { id: "AM-10499", customer: "Grace N.", items: 1, total: 2800, zone: "Surulere", status: "Exception" },
  { id: "AM-10498", customer: "Tunde K.", items: 3, total: 11050, zone: "Victoria Island", status: "Delivered" },
  { id: "AM-10497", customer: "Ngozi E.", items: 2, total: 5400, zone: "Ajah", status: "Pending" },
];

const statusTone: Record<string, "neutral" | "success" | "warning" | "danger" | "sale"> = {
  Picking: "warning",
  Confirmed: "success",
  Dispatched: "sale",
  Exception: "danger",
  Delivered: "success",
  Pending: "neutral",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="border-b border-border bg-ink text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="font-[family-name:var(--font-sora)] text-lg font-bold">
              AlafiaMart Admin
            </p>
            <p className="text-xs text-white/60">Signed in as Warehouse Staff</p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-white/80">
            {["Dashboard", "Catalog", "Orders", "Delivery", "Customers", "Compliance", "Finance", "Analytics"].map(
              (item) => (
                <span key={item} className={item === "Dashboard" ? "font-bold text-white" : ""}>
                  {item}
                </span>
              ),
            )}
          </nav>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Orders Today", "128"],
            ["Pending Fulfillment", "34"],
            ["Revenue Today", "₦1.82M"],
            ["Low Stock Alerts", "7"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {label}
              </p>
              <p className="mt-2 text-3xl font-extrabold">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <span className="text-sm font-semibold text-brand">View all →</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-canvas text-muted">
                <tr>
                  {["Order", "Customer", "Items", "Total", "Zone", "Status", ""].map((h) => (
                    <th key={h || "action"} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">{o.id}</td>
                    <td className="px-4 py-3">{o.customer}</td>
                    <td className="px-4 py-3">{o.items}</td>
                    <td className="px-4 py-3">{formatNaira(o.total)}</td>
                    <td className="px-4 py-3">{o.zone}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone[o.status] ?? "neutral"}>{o.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-brand font-semibold">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>Compliance Reviewer approved NAFDAC badge for Vitamin D3 Softgels · 2m ago</li>
            <li>Warehouse marked order AM-10500 as Dispatched · 8m ago</li>
            <li>Finance processed refund for order AM-10390 · 26m ago</li>
            <li>Catalog Manager updated stock for 12 SKUs · 1h ago</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
