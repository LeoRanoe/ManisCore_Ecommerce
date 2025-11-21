'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import Image from 'next/image';

interface SaveForLaterItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onMoveToCart: (id: number) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}

export function SaveForLaterItem({
  id,
  name,
  price,
  imageUrl,
  onMoveToCart,
  onRemove,
}: SaveForLaterItemProps) {
  const [isMoving, setIsMoving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleMoveToCart = async () => {
    setIsMoving(true);
    try {
      await onMoveToCart(id);
      toast.success('Moved to cart');
    } catch (error) {
      toast.error('Failed to move item');
    } finally {
      setIsMoving(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(id);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
    >
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate mb-1">{name}</h4>
        <p className="text-lg font-bold text-primary mb-2">SRD {price.toFixed(2)}</p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handleMoveToCart}
            disabled={isMoving || isRemoving}
            className="flex-1 min-w-[120px]"
          >
            {isMoving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Moving...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move to Cart
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleRemove}
            disabled={isMoving || isRemoving}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Remove'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface SaveForLaterSectionProps {
  items: Array<{
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }>;
  onMoveToCart: (id: number) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}

export function SaveForLaterSection({ items, onMoveToCart, onRemove }: SaveForLaterSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Heart className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Saved for Later</h3>
        <span className="text-sm text-muted-foreground">({items.length})</span>
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item) => (
          <SaveForLaterItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            onMoveToCart={onMoveToCart}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
