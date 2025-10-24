'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { EnhancedImage } from '@/components/ui/EnhancedImage';
import { Minus, Plus, X, ShoppingBag, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  maxStock: number;
  imageUrl?: string;
}

interface SwipeableCartItemProps {
  item: CartItem;
  companySlug: string;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const SWIPE_THRESHOLD = 100; // px to swipe before delete action appears

export function SwipeableCartItem({
  item,
  companySlug,
  onUpdateQuantity,
  onRemove,
}: SwipeableCartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [0.5, 1]);
  const deleteIconOpacity = useTransform(
    x,
    [-SWIPE_THRESHOLD * 1.5, -SWIPE_THRESHOLD],
    [1, 0]
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldRemove = info.offset.x < -SWIPE_THRESHOLD;
    
    if (shouldRemove) {
      setIsRemoving(true);
      // Animate out then remove
      setTimeout(() => {
        onRemove(item.productId);
      }, 300);
    } else {
      // Snap back
      x.set(0);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Delete Action Background (shown when swiped left) */}
      <div className="absolute inset-0 bg-destructive flex items-center justify-end px-6">
        <motion.div style={{ opacity: deleteIconOpacity }}>
          <Trash2 className="h-6 w-6 text-destructive-foreground" />
        </motion.div>
      </div>

      {/* Swipeable Cart Item */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -SWIPE_THRESHOLD * 2, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, opacity }}
        animate={isRemoving ? { x: '-100%', opacity: 0 } : {}}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
        className={cn(
          'bg-card border rounded-xl p-6 hover:shadow-md transition-shadow',
          'touch-pan-y', // Allow vertical scrolling while horizontal drag
          isRemoving && 'pointer-events-none'
        )}
      >
        <div className="flex gap-6">
          {/* Image */}
          <Link
            href={`/${companySlug}/products/${item.slug}`}
            className="relative h-32 w-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
          >
            {item.imageUrl ? (
              <EnhancedImage
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
                sizes="128px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <ShoppingBag className="h-16 w-16" />
              </div>
            )}
          </Link>

          {/* Details */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/${companySlug}/products/${item.slug}`}
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-2xl font-bold mt-2">
                  SRD {item.price.toFixed(2)}
                </p>
              </div>

              {/* Remove Button (Desktop) */}
              <button
                onClick={() => onRemove(item.productId)}
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors text-destructive"
                aria-label="Remove item"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-auto">
              <span className="text-sm font-medium text-muted-foreground">
                Quantity:
              </span>
              <div className="flex items-center border-2 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                  className="h-10 w-10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                  disabled={item.quantity >= item.maxStock}
                  className={cn(
                    'h-10 w-10 flex items-center justify-center hover:bg-accent transition-colors',
                    item.quantity >= item.maxStock && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {item.quantity >= item.maxStock && (
                <span className="text-sm text-destructive">Max stock reached</span>
              )}
            </div>

            {/* Item Total */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Item Total:</span>
              <span className="text-lg font-bold">
                SRD {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint (shown briefly on first interaction) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="md:hidden absolute bottom-2 right-2 text-xs text-muted-foreground/60 pointer-events-none"
        >
          ← Swipe to delete
        </motion.div>
      </motion.div>
    </div>
  );
}
