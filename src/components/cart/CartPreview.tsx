'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { EnhancedImage } from '@/components/ui/EnhancedImage';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CartPreviewProps {
  companySlug: string;
}

export function CartPreview({ companySlug }: CartPreviewProps) {
  const { items, itemCount, subtotal, removeItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const previewItems = items.slice(0, 3);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cart Icon with Badge */}
      <Link
        href={`/${companySlug}/cart`}
        className="relative p-2 hover:bg-accent rounded-lg transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold 
                     rounded-full w-5 h-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </Link>

      {/* Dropdown Preview */}
      <AnimatePresence>
        {isHovered && itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 
                     rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Cart Preview</h3>
                <span className="text-xs text-muted-foreground">{itemCount} items</span>
              </div>
            </div>

            {/* Items */}
            <div className="max-h-64 overflow-y-auto">
              {previewItems.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <EnhancedImage
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 mb-1">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.productId);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 
                             rounded-lg text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              {items.length > 3 && (
                <div className="px-4 py-2 text-center text-xs text-muted-foreground bg-gray-50">
                  +{items.length - 3} more items
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Subtotal:</span>
                <span className="text-lg font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <Link href={`/${companySlug}/cart`}>
                <Button className="w-full group">
                  <span>View Cart</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
