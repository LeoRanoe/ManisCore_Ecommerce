'use client';

import { useEffect } from 'react';
import { addToRecentlyViewed } from './RecentlyViewed';

interface ProductViewTrackerProps {
  product: {
    id: string;
    slug: string;
    name: string;
    sellingPriceSRD: number;
    imageUrls: string[];
  };
}

export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    // Add product to recently viewed when component mounts
    addToRecentlyViewed({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.sellingPriceSRD,
      image: product.imageUrls[0],
    });
  }, [product]);

  // This component doesn't render anything
  return null;
}
