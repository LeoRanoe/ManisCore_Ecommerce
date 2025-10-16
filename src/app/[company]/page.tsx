import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Package } from 'lucide-react';
import Link from 'next/link';

export default async function CompanyHomePage({
  params,
}: {
  params: { company: string };
}) {
  const company = await api.getCompany(params.company);
  const { data: featuredProducts, pagination } = await api.getProducts(params.company, 1, 8, { isFeatured: true });

  return (
    <div className="min-h-screen">
      <section className="relative bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {company.name}
            </h1>
            {company.description && (
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {company.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href={`/${params.company}/products`}
                className="group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium text-lg transition-all hover:bg-gray-100"
              >
                <span>Explore Products</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              {company.contactPhone && (
                <WhatsAppButton 
                  phone={company.contactPhone} 
                  message="Hi! I am interested in your products."
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl font-bold">{pagination.total}+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Products</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Authentic</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-medium mb-4 text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our selection of quality products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} companySlug={params.company} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${params.company}/products`}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-all"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
