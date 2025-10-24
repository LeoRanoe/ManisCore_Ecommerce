import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { Package, Shield, Zap, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { EnhancedImage } from '@/components/ui/EnhancedImage';
import { notFound } from 'next/navigation';

// Enable dynamic params to allow runtime generation of pages
export const dynamicParams = true;

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function CompanyHomePage({
  params,
}: {
  params: { company: string };
}) {
  try {
    const company = await api.getCompany(params.company);
    const { data: featuredProducts, pagination } = await api.getProducts(params.company, 1, 8, { isFeatured: true });
    const { data: testimonials } = await api.getTestimonials(params.company, true);
    const { data: banners } = await api.getBanners(params.company, 'hero');
  
    // If company doesn't exist, show 404
    if (!company) {
      notFound();
    }

    // Use custom hero text or fall back to defaults
    const heroTitle = company.heroTitle || `Welcome to ${company.name}`;
    const heroSubtitle = company.heroSubtitle || company.description || `Discover quality products at ${company.name}`;

    return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <ParallaxHero className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 sm:py-28 md:py-36 lg:py-40 relative">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="down" duration={0.5}>
              {/* Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Now Available</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal direction="up" duration={0.7} delay={0.2}>
              <div className="text-center space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                  <span className="block">{company.name}</span>
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                  {heroSubtitle}
                </p>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" duration={0.6} delay={0.4}>
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
                    message={company.whatsappGreeting || "Hi! I am interested in your products."}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-105 w-full sm:w-auto"
                  />
                )}
              </div>
            </ScrollReveal>

            {/* Stats Grid - Real Data Only */}
            <ScrollReveal direction="up" duration={0.6} delay={0.6}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-16 sm:pt-20 max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {pagination.total}+
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">Products Available</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">Authentic</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxHero>

      {/* Why Choose Us Section - Customizable */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose {company.name}?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best products and service
            </p>
          </div>
        </ScrollReveal>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
          <StaggerItem>
            <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Authentic Products</h3>
              <p className="text-gray-600 text-sm">100% genuine products you can trust</p>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Service</h3>
              <p className="text-gray-600 text-sm">Quick response and efficient service</p>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <div className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all sm:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 text-sm">Chat with us anytime via WhatsApp</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <ScrollReveal direction="up" duration={0.6}>
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
                Handpicked selection of our most popular items
              </p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.08}>
            {featuredProducts.map(product => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} companySlug={params.company} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <ScrollReveal direction="up" delay={0.4}>
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
          </ScrollReveal>
        </section>
      )}

      {/* Testimonials Section - Real Data Only */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Real reviews from real customers
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.12}>
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.id}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.imageUrl && (
                        <EnhancedImage
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        {testimonial.role && (
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        )}
                      </div>
                    </div>
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
            <StaggerItem>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
                <div>
                  <div className="font-bold">Verified Seller</div>
                  <div className="text-sm text-gray-400">Trusted by customers</div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
                <div>
                  <div className="font-bold">Secure Shopping</div>
                  <div className="text-sm text-gray-400">Safe & protected</div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
                <div>
                  <div className="font-bold">Quality Guarantee</div>
                  <div className="text-sm text-gray-400">Premium products only</div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
    );
  } catch (error) {
    console.error('Error loading company page:', params.company, error);
    notFound();
  }
}
