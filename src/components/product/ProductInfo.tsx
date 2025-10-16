'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, Package } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    sellingPriceSRD: number;
    quantityInStock: number;
    isFeatured: boolean;
    tags: string[];
    specifications?: Record<string, string>;
    imageUrls: string[];
  };
  companySlug: string;
}

export function ProductInfo({ product, companySlug }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const isInStock = product.quantityInStock > 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 5;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantityInStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.sellingPriceSRD,
      imageUrl: product.imageUrls[0],
      maxStock: product.quantityInStock,
      quantity,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription || product.name,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tags & Featured Badge */}
      <div className="flex flex-wrap items-center gap-2">
        {product.isFeatured && (
          <Badge variant="default" className="gap-1">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </Badge>
        )}
        {product.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
        {product.shortDescription && (
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
        )}
      </div>

      {/* Rating (Placeholder) */}
      <div className="flex items-center gap-4 pb-6 border-b">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(4.0 • 128 reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold">SRD {product.sellingPriceSRD.toFixed(2)}</span>
        {/* TODO: Add original price if on sale */}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {isInStock ? (
          <>
            <div className="flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              <span className="font-medium">In Stock</span>
            </div>
            {isLowStock && (
              <span className="text-sm text-destructive">
                Only {product.quantityInStock} left!
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-destructive">
            <span className="font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      {isInStock && (
        <div className="flex items-center gap-4">
          <label className="font-medium">Quantity:</label>
          <div className="flex items-center border-2 rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-4 py-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={product.quantityInStock}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center border-x-2 py-2 focus:outline-none"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.quantityInStock}
              className="px-4 py-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1 gap-2"
          onClick={handleAddToCart}
          disabled={!isInStock}
        >
          <ShoppingCart className="h-5 w-5" />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            'gap-2',
            isWishlisted && 'text-red-500 border-red-500 hover:text-red-600 hover:border-red-600'
          )}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
          <span className="hidden sm:inline">
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </span>
        </Button>
        <Button size="lg" variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="h-5 w-5" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex items-start gap-3">
          <div className="bg-muted rounded-lg p-2">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Fast Delivery</p>
            <p className="text-xs text-muted-foreground">Within 2-3 days</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-muted rounded-lg p-2">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Secure Payment</p>
            <p className="text-xs text-muted-foreground">100% Protected</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-muted rounded-lg p-2">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Easy Returns</p>
            <p className="text-xs text-muted-foreground">30-day policy</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-3">Product Description</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                <dd className="text-sm mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
