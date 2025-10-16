'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  companySlug: string;
}

export function CartDrawer({ companySlug }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, isOpen, closeCart } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-background shadow-lift-lg animate-slide-in-from-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            {itemCount > 0 && (
              <span className="text-sm text-muted-foreground">({itemCount} items)</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some products to get started!
              </p>
              <Button asChild onClick={closeCart}>
                <Link href={`/${companySlug}/products`}>
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-card border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <Link
                    href={`/${companySlug}/products/${item.slug}`}
                    className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted"
                    onClick={closeCart}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${companySlug}/products/${item.slug}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-2"
                      onClick={closeCart}
                    >
                      {item.name}
                    </Link>
                    <p className="text-lg font-bold mt-1">
                      SRD {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded border hover:bg-accent transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="h-7 w-7 flex items-center justify-center rounded border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto text-sm text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    {item.quantity >= item.maxStock && (
                      <p className="text-xs text-destructive mt-1">Max stock reached</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">Subtotal:</span>
              <span className="text-2xl font-bold">SRD {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <Button asChild size="lg" className="w-full gap-2" onClick={closeCart}>
                <Link href={`/${companySlug}/cart`}>
                  View Cart
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full"
                onClick={closeCart}
              >
                <Link href={`/${companySlug}/products`}>
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
