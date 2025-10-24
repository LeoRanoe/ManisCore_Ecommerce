'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { SwipeableCartItem } from './SwipeableCartItem';

interface CartPageClientProps {
  companySlug: string;
}

export function CartPageClient({ companySlug }: CartPageClientProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const tax = subtotal * 0.1; // 10% tax (adjust as needed)
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart` : 'Your cart is empty'}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Start shopping to find great products!
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${companySlug}/products`}>
                <ArrowLeft className="h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-destructive hover:underline"
                >
                  Clear Cart
                </button>
              </div>

              {items.map((item) => (
                <SwipeableCartItem
                  key={item.productId}
                  item={item}
                  companySlug={companySlug}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">SRD {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">SRD {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-success">FREE</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold">SRD {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full gap-2" asChild>
                    <Link href={`/${companySlug}/checkout`}>
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2" asChild>
                    <Link href={`/${companySlug}/products`}>
                      <ArrowLeft className="h-5 w-5" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Free shipping on orders over SRD 500
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
