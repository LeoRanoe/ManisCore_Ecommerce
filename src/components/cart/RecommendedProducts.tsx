'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '../catalog/ProductCard';
import { Product } from '@/lib/api/client';
import { Sparkles } from 'lucide-react';

interface RecommendedProductsProps {
  products: Product[];
  companySlug: string;
  title?: string;
  subtitle?: string;
}

export function RecommendedProducts({
  products,
  companySlug,
  title = 'You might also like',
  subtitle = 'Based on items in your cart',
}: RecommendedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} companySlug={companySlug} />
          </motion.div>
        ))}
      </div>

      {/* View More Link */}
      {products.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-sm font-medium text-primary hover:underline">
            View {products.length - 4} more suggestions →
          </button>
        </div>
      )}
    </motion.div>
  );
}
