import { Suspense } from "react";
import { CatalogView } from "@/components/product/catalog-view";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-8">Loading…</div>}>
      <CatalogView title="Search results" />
    </Suspense>
  );
}
