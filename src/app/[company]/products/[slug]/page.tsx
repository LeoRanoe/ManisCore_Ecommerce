import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ReviewsList } from '@/components/reviews/ReviewsList';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ChevronRight } from 'lucide-react';

export default async function ProductDetailPage({ params }: { params: { company: string; slug: string } }) {
  try {
    const product = await api.getProduct(params.slug, params.company);
    const reviewsData = await api.getReviews(params.company, product.slug);
    const reviews = reviewsData.data || [];
    const totalReviews = reviews.length;

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <a href={`/`} className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href={`//products`} className="hover:text-foreground transition-colors">Products</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div><ImageGallery images={product.imageUrls} productName={product.name} /></div>
            <div><ProductInfo product={product} companySlug={params.company} /></div>
          </div>
          <div className="mb-12 border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Customer Reviews ({totalReviews})</h2>
            <div className="space-y-8">
              {reviews.length > 0 ? (<ReviewsList reviews={reviews} />) : (
                <div className="text-center py-12 bg-muted/30 rounded-2xl">
                  <p className="text-muted-foreground mb-4">No reviews yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to review this product!</p>
                </div>
              )}
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <ReviewForm companySlug={params.company} productSlug={product.slug} />
              </div>
            </div>
          </div>
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <RelatedProducts products={product.relatedProducts} companySlug={params.company} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: { params: { company: string; slug: string } }) {
  try {
    const product = await api.getProduct(params.slug, params.company);
    return { title: ` | `, description: product.shortDescription || product.description || product.name };
  } catch {
    return { title: 'Product Not Found' };
  }
}
