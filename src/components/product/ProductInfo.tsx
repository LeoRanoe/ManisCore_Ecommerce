'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, Package, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();

  const isInStock = product.quantityInStock > 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 5;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantityInStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    
    toast.success('Added to cart!', {
      description: `${quantity}x ${product.name}`,
    });
    
    setIsAddingToCart(false);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
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
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Tags & Featured Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-2"
      >
        {product.isFeatured && (
          <Badge variant="default" className="gap-1">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </Badge>
        )}
        {product.tags.slice(0, 3).map((tag, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Badge variant="secondary">{tag}</Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Product Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
        {product.shortDescription && (
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
        )}
      </motion.div>

      {/* Rating (Placeholder) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4 pb-6 border-b"
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <Star
                className={cn(
                  'h-5 w-5',
                  i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                )}
              />
            </motion.div>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(4.0 • 128 reviews)</span>
      </motion.div>

      {/* Price */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="flex items-baseline gap-3"
      >
        <span className="text-4xl font-bold">SRD {product.sellingPriceSRD.toFixed(2)}</span>
      </motion.div>

      {/* Stock Status */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2"
      >
        {isInStock ? (
          <>
            <div className="flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              <span className="font-medium">In Stock</span>
            </div>
            {isLowStock && (
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-sm text-destructive font-medium"
              >
                Only {product.quantityInStock} left!
              </motion.span>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-destructive">
            <span className="font-medium">Out of Stock</span>
          </div>
        )}
      </motion.div>

      {/* Quantity Selector */}
      <AnimatePresence>
        {isInStock && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border-2 rounded-lg overflow-hidden">
              <motion.button
                whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <motion.input
                key={quantity}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                type="number"
                min="1"
                max={product.quantityInStock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center border-x-2 py-2 focus:outline-none bg-transparent"
              />
              <motion.button
                whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.quantityInStock}
                className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          size="lg"
          className="flex-1 gap-2"
          onClick={handleAddToCart}
          disabled={!isInStock}
          isLoading={isAddingToCart}
        >
          {!isAddingToCart && <ShoppingCart className="h-5 w-5" />}
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            variant="outline"
            onClick={handleWishlistToggle}
            className={cn(
              'gap-2 w-full',
              isWishlisted && 'text-red-500 border-red-500 hover:text-red-600 hover:border-red-600'
            )}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
            </motion.div>
            <span className="hidden sm:inline">
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button size="lg" variant="outline" onClick={handleShare} className="gap-2 w-full">
            <Share2 className="h-5 w-5" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </motion.div>
      </motion.div>

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
    </motion.div>
  );
}
