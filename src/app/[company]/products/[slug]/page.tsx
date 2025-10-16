import Image from 'next/image';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { YouTubeEmbed } from '@/components/product/YouTubeEmbed';
import { ProductCard } from '@/components/catalog/ProductCard';

export default async function ProductDetailPage({
  params,
}: {
  params: { company: string; slug: string };
}) {
  try {
    const product = await api.getProduct(params.slug, params.company);
    const company = await api.getCompany(params.company);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              {product.imageUrls[0] && (
                <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover" />
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.imageUrls.slice(1).map((url, i) => (
                  <div key={i} className="aspect-square relative bg-muted rounded overflow-hidden">
                    <Image src={url} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              {product.shortDescription && (
                <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
              )}
            </div>

            <div className="text-3xl font-bold">
              SRD {product.sellingPriceSRD.toFixed(2)}
            </div>

            <div>
              <span className={`px-3 py-1 rounded ${
                product.quantityInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.quantityInStock > 0 ? `In Stock (${product.quantityInStock})` : 'Out of Stock'}
              </span>
            </div>

            {company.contactPhone && (
              <WhatsAppButton
                phone={company.contactPhone}
                message={`Hi! I'm interested in: ${product.name}`}
                className="w-full"
              />
            )}

            {product.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                <dl className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <dt className="font-medium">{key}</dt>
                      <dd className="text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* YouTube Reviews */}
        {product.youtubeReviewUrls && product.youtubeReviewUrls.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.youtubeReviewUrls.map((url, i) => (
                <YouTubeEmbed key={i} url={url} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map(related => (
                <ProductCard key={related.id} product={related} companySlug={params.company} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
