'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api/client';
import { Tag, Eye, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product, companySlug }: { product: Product; companySlug: string }) {
  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

  return (
    <Link href={`/${companySlug}/products/${product.slug}`} className="group block">
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
        {/* Image Container with Overlay Effect */}
        <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
          {product.imageUrls[0] ? (
            <>
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quick View Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white/95 backdrop-blur-sm text-black px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </div>
                {inStock && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle quick add to cart
                    }}
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold shadow-xl transform scale-95 group-hover:scale-100 transition-transform hover:bg-primary/90"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Quick Order</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
              <div className="w-20 h-20 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-3">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">No Image Available</span>
            </div>
          )}
          
          {/* Featured Badge - Premium Look */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="featured" icon={<Star className="w-3 h-3 fill-current" />}>
                Featured
              </Badge>
            </div>
          )}

          {/* Stock Badge - Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant={inStock ? 'success' : 'danger'}>
              {inStock ? `✓ ${product.quantityInStock} In Stock` : 'Out of Stock'}
            </Badge>
          </div>

          {/* Tags Preview */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {product.tags.slice(0, 2).map((tag, i) => (
                <Badge key={i} variant="default" className="bg-black/70 backdrop-blur-sm text-white border-white/20">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 2 && (
                <Badge variant="default" className="bg-black/70 backdrop-blur-sm text-white border-white/20">
                  +{product.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Image Counter */}
          {product.imageUrls.length > 1 && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Badge variant="default" className="bg-black/70 backdrop-blur-sm text-white border-white/20">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {product.imageUrls.length}
              </Badge>
            </div>
          )}
        </div>

        {/* Info Section - Enhanced */}
        <div className="p-5 space-y-3">
          {/* Product Name */}
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {product.name}
          </h3>
          
          {/* Description */}
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
          
          {/* Rating Placeholder */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(4.5)</span>
          </div>
          
          {/* Price Section - Premium Design */}
          <div className="flex items-end justify-between pt-3 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Price</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatCurrency(product.sellingPriceSRD)}
                </p>
              </div>
            </div>
            
            {/* View Details Button */}
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center gap-2">
              <span>View</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Trending Indicator */}
        {product.isFeatured && (
          <div className="absolute -top-1 -right-1 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
