import { api } from '@/lib/api/client';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Package } from 'lucide-react';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search;

  const company = await api.getCompany(params.company);
  const { data: products, pagination } = await api.getProducts(
    params.company,
    page,
    20,
    { search }
  );

  const allTags = Array.from(
    new Set(products.flatMap(p => p.tags))
  ).sort();

  return (
    <div className="min-h-screen">
      <section className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium mb-4 text-gray-600">
              <Package className="w-4 h-4" />
              <span>Product Catalog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Products
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Browse through our complete collection of quality products.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ProductGrid
          products={products}
          companySlug={params.company}
          allTags={allTags}
        />
      </section>
    </div>
  );
}
