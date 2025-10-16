'use client';

import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  sellingPriceSRD: number;
  imageUrls: string[];
  isFeatured?: boolean;
  quantityInStock?: number;
}

interface RelatedProductsProps {
  products: Product[];
  companySlug: string;
}

export function RelatedProducts({ products, companySlug }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">You May Also Like</h2>
        <p className="text-muted-foreground">
          Similar products that other customers have purchased
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <EnhancedProductCard
            key={product.id}
            product={product}
            companySlug={companySlug}
          />
        ))}
      </div>
    </section>
  );
}
