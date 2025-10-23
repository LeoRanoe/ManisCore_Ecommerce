'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export function ProductCard({ product, companySlug }: { product: Product; companySlug: string }) {
  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/${companySlug}/products/${product.slug}`} className="group block h-full">
        <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {product.imageUrls[0] ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">No Image</span>
              </div>
            )}
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-colors hover:bg-white dark:hover:bg-gray-700"
              aria-label="Add to wishlist"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
              />
            </motion.button>

            {/* Stock Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute top-3 right-3"
            >
              {inStock ? (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  Out of Stock
                </span>
              )}
            </motion.div>

            {/* Featured Badge */}
            {product.isFeatured && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-3 left-3"
              >
                <span className="bg-gradient-to-r from-gray-900 to-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  ⭐ Featured
                </span>
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5 space-y-3 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-black dark:group-hover:text-white transition-colors text-lg leading-tight">
              {product.name}
            </h3>
            
            {product.shortDescription && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-auto">
              <motion.p 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black text-black dark:text-white inline-block"
              >
                {formatCurrency(product.sellingPriceSRD)}
              </motion.p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.slice(0, 2).map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
                {product.tags.length > 2 && (
                  <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                    +{product.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
