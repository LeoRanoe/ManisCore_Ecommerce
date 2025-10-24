'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Eye, X, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { EnhancedImage } from '@/components/ui/EnhancedImage';

interface RecentlyViewedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  timestamp: number;
}

interface RecentlyViewedProps {
  companySlug: string;
  currentProductId?: string;
  maxItems?: number;
}

const STORAGE_KEY = 'recently_viewed_products';
const MAX_STORED_ITEMS = 12;

export function RecentlyViewed({ companySlug, currentProductId, maxItems = 4 }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    // Load recently viewed products from localStorage
    const loadRecentlyViewed = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const products: RecentlyViewedProduct[] = JSON.parse(stored);
          // Filter out current product and limit to maxItems
          const filtered = products
            .filter(p => p.id !== currentProductId)
            .slice(0, maxItems);
          setRecentProducts(filtered);
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
      }
    };

    loadRecentlyViewed();

    // Listen for storage changes to update across tabs
    window.addEventListener('storage', loadRecentlyViewed);
    
    return () => {
      window.removeEventListener('storage', loadRecentlyViewed);
    };
  }, [currentProductId, maxItems]);

  if (recentProducts.length === 0) {
    return null;
  }

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentProducts([]);
  };

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Recently Viewed</h2>
                <p className="text-sm text-muted-foreground">
                  {recentProducts.length} {recentProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            </div>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 
                       transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/${companySlug}/products/${product.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.image ? (
                      <EnhancedImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Eye className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold">SRD {product.price.toFixed(2)}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to add a product to recently viewed
export function addToRecentlyViewed(product: {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
}) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let products: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];
    
    // Remove the product if it already exists
    products = products.filter(p => p.id !== product.id);
    
    // Add the product to the beginning
    products.unshift({
      ...product,
      timestamp: Date.now(),
    });
    
    // Keep only the most recent items
    products = products.slice(0, MAX_STORED_ITEMS);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error saving recently viewed product:', error);
  }
}

// Helper function to clear recently viewed
export function clearRecentlyViewed() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error clearing recently viewed products:', error);
  }
}
