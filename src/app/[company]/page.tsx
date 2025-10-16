import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function CompanyHomePage({
  params,
}: {
  params: { company: string };
}) {
  const company = await api.getCompany(params.company);
  const { data: featuredProducts } = await api.getProducts(params.company, 1, 8, { isFeatured: true });

  return (
    <div>
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: company.bannerUrl ? `url(${company.bannerUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Premium Quality Products</span>
            </div>

            {/* Title with Gradient */}
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent animate-pulse">
                {company.name}
              </span>
            </h1>

            {/* Description */}
            {company.description && (
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {company.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {company.contactPhone && (
                <WhatsAppButton 
                  phone={company.contactPhone} 
                  message={`Hi ${company.name}! I'd like to know more about your products.`}
                />
              )}
              <Link
                href={`/${params.company}/products`}
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <span>Browse Catalog</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="text-3xl font-bold">{featuredProducts.length}+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-white/70">Authentic</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-white/70">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Secure Shopping</h3>
              <p className="text-muted-foreground">Your satisfaction is our priority</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Fast Response</h3>
              <p className="text-muted-foreground">Quick replies on WhatsApp</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Best Prices</h3>
              <p className="text-muted-foreground">Competitive pricing guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Handpicked For You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} companySlug={params.company} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/${params.company}/products`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
