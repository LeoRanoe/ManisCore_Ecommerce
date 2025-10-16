'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ProductHeader } from '@/components/catalog/ProductHeader';
import { cn } from '@/lib/utils';
import useSWR from 'swr';

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

interface SearchResultsProps {
  companySlug: string;
  initialQuery: string;
}

export function SearchResults({ companySlug, initialQuery }: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const query = searchParams.get('q') || initialQuery;
  const selectedCategory = searchParams.get('category') || undefined;
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const currentPage = parseInt(searchParams.get('page') || '1');

  // Build search URL
  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (selectedCategory) params.set('categorySlug', selectedCategory);
    if (minPrice !== undefined) params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params.set('maxPrice', maxPrice.toString());
    if (sortBy !== 'relevance') params.set('sortBy', sortBy);
    params.set('page', currentPage.toString());
    params.set('limit', '12');
    return `/api/public/${companySlug}/products?${params.toString()}`;
  };

  // Fetch search results
  const { data, isLoading, error } = useSWR(
    query ? buildSearchUrl() : null,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch search results');
      return res.json();
    },
    { revalidateOnFocus: false }
  );

  // Fetch categories for filter
  const { data: categoriesData } = useSWR(
    `/api/public/${companySlug}/categories`,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  );

  const products = data?.data || [];
  const pagination = data?.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 };
  const categories = categoriesData?.data || [];
  const priceRange = data?.priceRange || { min: 0, max: 1000 };

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

    router.push(`/${companySlug}/search?${params.toString()}`);
  };

  const handleCategoryChange = (category: string | undefined) => {
    updateFilters({ category });
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
    router.push(`/${companySlug}/search?q=${encodeURIComponent(query)}`);
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Search for Products</h1>
            <p className="text-muted-foreground mb-8">
              Enter a search term to find products in our catalog
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-muted-foreground">
            {isLoading ? 'Searching...' : `${pagination.total} ${pagination.total === 1 ? 'product' : 'products'} found`}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                selectedTags={[]}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onTagsChange={() => {}}
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
                  selectedTags={[]}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  onCategoryChange={handleCategoryChange}
                  onTagsChange={() => {}}
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
            ) : error ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                  <Search className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search Error</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We encountered an error while searching. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary hover:underline font-medium"
                >
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We couldn&apos;t find any products matching &quot;{query}&quot;. Try different keywords or clear your filters.
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
                  {products.map((product: Product) => (
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
    </div>
  );
}
