import { Suspense } from "react";
import { CatalogView } from "@/components/product/catalog-view";
import { getCategory } from "@/lib/data/products";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <Suspense fallback={<div className="container-page py-8">Loading…</div>}>
      <CatalogView title={category.label} category={slug} />
    </Suspense>
  );
}
