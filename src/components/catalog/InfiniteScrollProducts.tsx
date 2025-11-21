'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/api/client';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollProductsProps {
  initialProducts: Product[];
  companySlug: string;
  hasMore: boolean;
  onLoadMore: () => Promise<Product[]>;
}

export function InfiniteScrollProducts({
  initialProducts,
  companySlug,
  hasMore: initialHasMore,
  onLoadMore,
}: InfiniteScrollProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newProducts = await onLoadMore();
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (error) {
      console.error('Failed to load more products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} companySlug={companySlug} />
        ))}
      </div>

      {/* Loading Indicator */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more products...</span>
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          You&apos;ve reached the end of the products
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
}
