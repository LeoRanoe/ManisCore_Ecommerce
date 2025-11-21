'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/lib/utils';

interface StickyAddToCartProps {
  productName: string;
  price: number;
  inStock: boolean;
  onAddToCart: () => void;
  onAddToWishlist?: () => void;
  productImage?: string;
}

export function StickyAddToCart({
  productName,
  price,
  inStock,
  onAddToCart,
  onAddToWishlist,
  productImage,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Show bar after scrolling past 400px
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 400);
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Animate bar position
  const y = useTransform(scrollY, [400, 450], [100, 0]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lift-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Product Info */}
            {productImage && (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                <img src={productImage} alt={productName} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{productName}</h3>
              <p className="text-sm font-bold text-primary">{formatCurrency(price)}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onAddToWishlist && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onAddToWishlist}
                  className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 hover:text-red-500 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              )}

              <Button
                onClick={onAddToCart}
                disabled={!inStock}
                size="sm"
                className="whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4" />
                {inStock ? 'Add' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
