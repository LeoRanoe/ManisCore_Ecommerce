'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Star } from 'lucide-react';
import { EnhancedImage } from '@/components/ui/EnhancedImage';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/lib/api/client';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  companySlug: string;
}

export function ProductQuickView({ product, isOpen, onClose, companySlug }: ProductQuickViewProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.sellingPriceSRD,
        imageUrl: product.imageUrls[0] || '',
        slug: product.slug,
        maxStock: product.quantityInStock,
        quantity,
      });
      
      toast.success('Added to cart!', {
        description: `${quantity}x ${product.name}`,
      });
      
      setQuantity(1);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                       sm:w-full sm:max-w-4xl sm:max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                {product.imageUrls[0] ? (
                  <EnhancedImage
                    src={product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ShoppingCart className="w-24 h-24" />
                  </div>
                )}
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold">{formatCurrency(product.sellingPriceSRD)}</span>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {inStock ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span className="font-medium">{product.quantityInStock} in stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="font-medium">Out of stock</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                {inStock && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 
                                 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.quantityInStock, quantity + 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 
                                 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!inStock || isLoading}
                    isLoading={isLoading}
                    className="flex-1"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    className="p-3 rounded-lg border border-gray-300 hover:border-red-500 
                             hover:bg-red-50 transition-colors group"
                  >
                    <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
