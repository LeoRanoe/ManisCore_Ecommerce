'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ProductHeader } from '@/components/catalog/ProductHeader';
import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';

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

interface Category {
  id: string;
  slug: string;
  name: string;
  itemCount?: number;
}

interface ProductListingProps {
  initialProducts: Product[];
  categories: Category[];
  companySlug: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
}

export function ProductListing({
  initialProducts,
  categories,
  companySlug,
  pagination: initialPagination,
  priceRange,
}: ProductListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get current filters from URL
  const selectedCategory = searchParams.get('category') || undefined;
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const sortBy = searchParams.get('sortBy') || 'newest';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const currentPage = parseInt(searchParams.get('page') || '1');

  // Update URL and fetch products
  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change (except for page changes)
    if (!updates.page) {
      params.set('page', '1');
    }

    router.push(`/${companySlug}/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string | undefined) => {
    updateFilters({ category });
  };

  const handleTagsChange = (tags: string[]) => {
    updateFilters({ tags: tags.length > 0 ? tags.join(',') : undefined });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    updateFilters({
      minPrice: min?.toString(),
      maxPrice: max?.toString(),
    });
  };

  const handleSortChange = (sort: string) => {
    updateFilters({ sortBy: sort });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    router.push(`/${companySlug}/products`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onTagsChange={handleTagsChange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto animate-slide-in-from-right">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onTagsChange={handleTagsChange}
                onPriceChange={handlePriceChange}
                onClearFilters={handleClearFilters}
                isMobile
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <ProductHeader
            totalProducts={pagination.total}
            sortBy={sortBy}
            viewMode={viewMode}
            onSortChange={handleSortChange}
            onViewModeChange={setViewMode}
            onFilterClick={() => setIsFilterOpen(true)}
          />

          {/* Product Grid */}
          {isLoading ? (
            <div
              className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              )}
            >
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any products matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                )}
              >
                {products.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    companySlug={companySlug}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
