import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Package, Shield, Zap, HeadphonesIcon, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function CompanyHomePage({
  params,
}: {
  params: { company: string };
}) {
  const company = await api.getCompany(params.company);
  const { data: featuredProducts, pagination } = await api.getProducts(params.company, 1, 8, { isFeatured: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section with Modern Gradient */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 py-20 sm:py-28 md:py-36 lg:py-40 relative">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Now Available</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                <span className="block">{company.name}</span>
              </h1>
              {company.description && (
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                  {company.description}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Link
                href={`/${params.company}/products`}
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto"
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
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-105 w-full sm:w-auto"
                />
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-16 sm:pt-20 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {pagination.total}+
                </div>
                <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">Products</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">Authentic</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" fill="white" opacity="1"></path>
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Authentic Products</h3>
            <p className="text-gray-600 text-sm">100% genuine products from trusted brands</p>
          </div>
          <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Fast Service</h3>
            <p className="text-gray-600 text-sm">Quick response and efficient delivery</p>
          </div>
          <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <HeadphonesIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Always here to help via WhatsApp</p>
          </div>
          <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">Competitive pricing with great value</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-sm font-semibold mb-4 text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              <Package className="w-4 h-4" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
              Discover Our
              <span className="block bg-gradient-to-r from-gray-900 via-black to-gray-700 bg-clip-text text-transparent">
                Best Products
              </span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Handpicked selection of our most popular and highly-rated items
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} companySlug={params.company} />
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href={`/${params.company}/products`}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
              <div>
                <div className="font-bold">Verified Seller</div>
                <div className="text-sm text-gray-400">Trusted by customers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
              <div>
                <div className="font-bold">Secure Shopping</div>
                <div className="text-sm text-gray-400">Safe & protected</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
              <div>
                <div className="font-bold">Quality Guarantee</div>
                <div className="text-sm text-gray-400">Premium products only</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
