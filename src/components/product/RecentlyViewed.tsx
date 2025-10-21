'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Eye } from 'lucide-react';

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

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/${companySlug}/products/${product.slug}`}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
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
