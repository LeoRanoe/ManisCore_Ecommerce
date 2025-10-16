import { api } from '@/lib/api/client';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

// Enable dynamic params
export const dynamicParams = true;

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function CompanyHomePage({
  params,
}: {
  params: { company: string };
}) {
  try {
    // Fetch all necessary data
    const [
      company,
      featuredProducts,
      categories,
      testimonials,
    ] = await Promise.all([
      api.getCompany(params.company),
      api.getProducts(params.company, 1, 8, { isFeatured: true }),
      api.getCategories(params.company),
      api.getTestimonials(params.company, true),
    ]);

    // If company doesn't exist, show 404
    if (!company) {
      notFound();
    }

    // Get all products for "New Arrivals" section
    const allProducts = await api.getProducts(params.company, 1, 8);

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          companySlug={params.company}
          companyName={company.name}
          heroTitle={company.heroTitle || undefined}
          heroSubtitle={company.heroSubtitle || undefined}
          bannerUrl={company.bannerUrl || undefined}
        />

        {/* Category Showcase */}
        {categories.data && categories.data.length > 0 && (
          <CategoryShowcase
            companySlug={params.company}
            categories={categories.data}
          />
        )}

        {/* Featured Products */}
        {featuredProducts.data && featuredProducts.data.length > 0 && (
          <ProductShowcase
            companySlug={params.company}
            title="Featured Products"
            description="Handpicked favorites that our customers love"
            products={featuredProducts.data}
            viewAllLink={`/${params.company}/products?featured=true`}
          />
        )}

        {/* New Arrivals */}
        {allProducts.data && allProducts.data.length > 0 && (
          <ProductShowcase
            companySlug={params.company}
            title="New Arrivals"
            description="Check out our latest additions to the store"
            products={allProducts.data}
            viewAllLink={`/${params.company}/products`}
          />
        )}

        {/* Testimonials */}
        {testimonials.data && testimonials.data.length > 0 && (
          <Testimonials testimonials={testimonials.data} />
        )}

        {/* Newsletter */}
        <Newsletter companySlug={params.company} />
      </div>
    );
  } catch (error) {
    console.error('Error loading homepage:', error);
    notFound();
  }
}
