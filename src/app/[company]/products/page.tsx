import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search;

  const { data: products, pagination } = await api.getProducts(
    params.company,
    page,
    20,
    { search }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} companySlug={params.company} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
            <a
              key={p}
              href={`?page=${p}${search ? `&search=${search}` : ''}`}
              className={`px-4 py-2 rounded ${
                p === page ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
