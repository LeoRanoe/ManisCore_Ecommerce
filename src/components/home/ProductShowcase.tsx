'use client';

import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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

interface ProductShowcaseProps {
  companySlug: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductShowcase({
  companySlug,
  title,
  description,
  products,
  viewAllLink,
}: ProductShowcaseProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-lg max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <EnhancedProductCard
              key={product.id}
              product={product}
              companySlug={companySlug}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        {viewAllLink && (
          <div className="text-center mt-12 sm:hidden">
            <Link href={viewAllLink}>
              <Button variant="outline" className="group w-full sm:w-auto">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
