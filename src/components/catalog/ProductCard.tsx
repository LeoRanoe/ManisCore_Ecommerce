import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api/client';
import { Tag, Eye } from 'lucide-react';

export function ProductCard({ product, companySlug }: { product: Product; companySlug: string }) {
  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

  return (
    <Link href={`/${companySlug}/products/${product.slug}`}>
      <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
        {/* Image Container with Overlay Effect */}
        <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
          {product.imageUrls[0] ? (
            <>
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quick View Badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                  <Eye className="w-4 h-4" />
                  <span>Quick View</span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm">No Image</span>
            </div>
          )}
          
          {/* Featured Badge - Premium Look */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Featured</span>
              </div>
            </div>
          )}

          {/* Stock Badge - Top Right */}
          <div className="absolute top-3 right-3">
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border ${
              inStock 
                ? 'bg-emerald-500/90 text-white border-emerald-400/50' 
                : 'bg-red-500/90 text-white border-red-400/50'
            }`}>
              {inStock ? `✓ ${product.quantityInStock} In Stock` : 'Out of Stock'}
            </div>
          </div>

          {/* Tags Preview */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Info Section - Enhanced */}
        <div className="p-5 space-y-3">
          {/* Product Name */}
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {product.name}
          </h3>
          
          {/* Description */}
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
          
          {/* Price Section - Premium Design */}
          <div className="flex items-end justify-between pt-2 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SRD {product.sellingPriceSRD.toFixed(2)}
              </p>
            </div>
            
            {/* View Details Button */}
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Details
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
}
