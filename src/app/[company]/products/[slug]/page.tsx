import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { YouTubeEmbed } from '@/components/product/YouTubeEmbed';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ImageGallery } from '@/components/product/ImageGallery';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Star, 
  Share2, 
  Heart, 
  Package, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  Facebook,
  Twitter,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default async function ProductDetailPage({
  params,
}: {
  params: { company: string; slug: string };
}) {
  try {
    const product = await api.getProduct(params.slug, params.company);
    const company = await api.getCompany(params.company);
    const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container size="xl" className="py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: company.name, href: `/${params.company}` },
                { label: 'Products', href: `/${params.company}/products` },
                { label: product.name },
              ]}
            />
          </div>

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left: Image Gallery */}
            <div>
              <ImageGallery images={product.imageUrls} productName={product.name} />
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Title & Badges */}
              <div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {product.isFeatured && (
                    <Badge variant="featured" icon={<Star className="w-3 h-3 fill-current" />}>
                      Featured
                    </Badge>
                  )}
                  <Badge variant={inStock ? 'success' : 'danger'}>
                    {inStock ? `✓ ${product.quantityInStock} In Stock` : 'Out of Stock'}
                  </Badge>
                  {product.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                  {product.name}
                </h1>

                {product.shortDescription && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.5 out of 5)</span>
                <span className="text-sm text-primary hover:underline cursor-pointer">32 reviews</span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatCurrency(product.sellingPriceSRD)}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Tax included • Free shipping over SRD 500</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {company.contactPhone && (
                  <WhatsAppButton
                    phone={company.contactPhone}
                    message={`Hi! I'm interested in: ${product.name}\n\nProduct Link: ${process.env.NEXT_PUBLIC_SITE_URL || ''}/${params.company}/products/${product.slug}`}
                    className="w-full"
                  />
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-5 h-5" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs font-medium">Authentic Products</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-xs font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Description */}
                {product.description && (
                  <div className="p-6 md:col-span-2">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Description
                    </h2>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Specifications</h2>
                    <dl className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
                          <dt className="font-medium text-sm">{key}</dt>
                          <dd className="text-sm text-muted-foreground text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* YouTube Reviews */}
          {product.youtubeReviewUrls && product.youtubeReviewUrls.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Product Reviews</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.youtubeReviewUrls.map((url, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <YouTubeEmbed url={url} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Related Products</h2>
                <Button variant="outline" asChild>
                  <a href={`/${params.company}/products`}>View All</a>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    companySlug={params.company}
                  />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    );
  } catch {
    notFound();
  }
}
