import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DIETARY_NEEDS } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export function ProductImage({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl bg-accent-tint ${className}`}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover"
        priority={priority}
      />
      <div className="absolute left-2 top-2 flex flex-wrap gap-1">
        {product.compareAt ? <Badge tone="sale">Sale</Badge> : null}
        {product.nafdacVerified ? (
          <Badge tone="success">NAFDAC Verified</Badge>
        ) : null}
        {product.dietary.slice(0, 2).map((d) => {
          const label = DIETARY_NEEDS.find((x) => x.id === d)?.label ?? d;
          return (
            <Badge key={d} tone={d}>
              {label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
