import { api } from '@/lib/api/client';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Package, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Header with Gradient Background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Product Catalog</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="block">Explore Our</span>
              <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Premium Products
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Browse through our complete collection of quality products tailored for you
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">{pagination.total}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Products</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">{allTags.length}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 sm:h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" fill="rgb(249, 250, 251)" opacity="1"></path>
          </svg>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <ProductGrid
          products={products}
          companySlug={params.company}
          allTags={allTags}
        />
      </section>
    </div>
  );
}
