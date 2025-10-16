import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ProductListing } from '@/components/catalog/ProductListing';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

interface PageProps {
  params: {
    company: string;
  };
  searchParams: {
    category?: string;
    tags?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
    search?: string;
  };
}

async function getProductData(companySlug: string, searchParams: PageProps['searchParams']) {
  try {
    const page = parseInt(searchParams.page || '1');
    const limit = 12;

    // Fetch products with filters
    const productsData = await api.getProducts(companySlug, page, limit, {
      category: searchParams.category,
      tags: searchParams.tags?.split(',').filter(Boolean),
      minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
      sortBy: searchParams.sortBy as any,
      search: searchParams.search,
    });

    // Fetch categories
    const categoriesResponse = await api.getCategories(companySlug);

    // Calculate price range from all products (for filter sidebar)
    const allProductsData = await api.getProducts(companySlug, 1, 1000);
    const prices = allProductsData.data
      .map((p: any) => p.sellingPriceSRD)
      .filter((price: any): price is number => typeof price === 'number');
    
    const priceRange = {
      min: prices.length > 0 ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000,
    };

    return {
      products: productsData.data,
      categories: categoriesResponse.data,
      pagination: productsData.pagination,
      priceRange,
    };
  } catch (error) {
    console.error('Failed to fetch product data:', error);
    return null;
  }
}

export default async function ProductsPage({ params, searchParams }: PageProps) {
  const data = await getProductData(params.company, searchParams);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Products</h1>
            <p className="text-lg text-muted-foreground">
              Discover our curated selection of premium products
            </p>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <ProductListing
          initialProducts={data.products}
          categories={data.categories}
          companySlug={params.company}
          pagination={data.pagination}
          priceRange={data.priceRange}
        />
      </Suspense>
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Products | ${params.company}`,
    description: 'Browse our complete product catalog',
  };
}
