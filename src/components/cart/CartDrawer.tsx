'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -10, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4"
                  >
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add some products to get started!
                  </p>
                  <Button asChild onClick={closeCart}>
                    <Link href={`/${companySlug}/products`}>
                      Browse Products
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-4 bg-card border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* Image */}
                        <Link
                          href={`/${companySlug}/products/${item.slug}`}
                          className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted group"
                          onClick={closeCart}
                        >
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
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
                          <motion.p 
                            layout
                            className="text-lg font-bold mt-1"
                          >
                            SRD {item.price.toFixed(2)}
                          </motion.p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="h-7 w-7 flex items-center justify-center rounded border hover:bg-accent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </motion.button>
                            <motion.span 
                              key={item.quantity}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="text-sm font-medium min-w-[2ch] text-center"
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                              className="h-7 w-7 flex items-center justify-center rounded border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.productId)}
                              className="ml-auto flex items-center gap-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </motion.button>
                          </div>

                          {item.quantity >= item.maxStock && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-destructive mt-1"
                            >
                              Max stock reached
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t p-6 space-y-4 bg-background"
              >
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium">Subtotal:</span>
                  <motion.span 
                    key={subtotal}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    SRD {subtotal.toFixed(2)}
                  </motion.span>
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
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
