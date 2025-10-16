'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  sellingPriceSRD: number;
  imageUrls: string[];
  isFeatured?: boolean;
  quantityInStock?: number;
}

interface EnhancedProductCardProps {
  product: Product;
  companySlug: string;
  showQuickAdd?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export function EnhancedProductCard({
  product,
  companySlug,
  showQuickAdd = true,
  averageRating,
  reviewCount,
}: EnhancedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // TODO: Connect to wishlist API
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.quantityInStock && product.quantityInStock > 0) {
      addItem({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.sellingPriceSRD,
        imageUrl: product.imageUrls[0],
        maxStock: product.quantityInStock,
      });
    }
  };

  const imageUrl = product.imageUrls[currentImageIndex] || product.imageUrls[0] || '/placeholder-product.jpg';
  const isLowStock = product.quantityInStock !== undefined && product.quantityInStock > 0 && product.quantityInStock <= 5;
  const isOutOfStock = product.quantityInStock === 0;

  return (
    <Link
      href={`/${companySlug}/products/${product.slug}`}
      className="group block"
    >
      <div className="relative bg-card rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-lift-lg">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-500',
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              'group-hover:scale-110'
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <Badge variant="featured" className="shadow-md">
                Featured
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="warning" className="shadow-md">
                Low Stock
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="danger" className="shadow-md">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              'absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center',
              'bg-background/80 backdrop-blur-sm transition-all duration-300',
              'opacity-0 group-hover:opacity-100',
              'hover:scale-110',
              isWishlisted ? 'text-red-500' : 'text-foreground'
            )}
            aria-label="Add to wishlist"
          >
            <Heart
              className={cn('h-5 w-5', isWishlisted && 'fill-current')}
            />
          </button>

          {/* Image Navigation Dots (if multiple images) */}
          {product.imageUrls.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/75'
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Quick Add Button */}
          {showQuickAdd && !isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleQuickAdd}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Rating */}
          {averageRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold">
              {formatCurrency(product.sellingPriceSRD)}
            </span>
          </div>

          {/* Stock Status */}
          {product.quantityInStock !== undefined && (
            <div className="text-xs text-muted-foreground">
              {isOutOfStock ? (
                <span className="text-destructive font-medium">Out of stock</span>
              ) : isLowStock ? (
                <span className="text-destructive font-medium">
                  Only {product.quantityInStock} left
                </span>
              ) : (
                <span className="text-success">In stock</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
