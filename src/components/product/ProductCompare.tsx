'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Minus } from 'lucide-react';
import { Product } from '@/lib/api/client';
import { EnhancedImage } from '../ui/EnhancedImage';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface ProductCompareProps {
  products: Product[];
  companySlug: string;
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export function ProductCompare({ products, companySlug, onRemove, onClose }: ProductCompareProps) {
  if (products.length === 0) return null;

  // Define comparison attributes
  const attributes = [
    { key: 'sellingPriceSRD', label: 'Price', format: (p: Product) => formatCurrency(p.sellingPriceSRD) },
    { key: 'status', label: 'Availability', format: (p: Product) => p.status },
    { key: 'quantityInStock', label: 'Stock', format: (p: Product) => `${p.quantityInStock} units` },
    { key: 'isFeatured', label: 'Featured', format: (p: Product) => p.isFeatured ? 'Yes' : 'No' },
    { key: 'description', label: 'Description', format: (p: Product) => p.description || 'N/A' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lift-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold">Compare Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-auto max-h-[calc(90vh-5rem)]">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th className="p-4 text-left font-semibold min-w-[150px]">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 min-w-[250px]">
                      <div className="space-y-3">
                        {/* Product Image */}
                        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <EnhancedImage
                            src={product.imageUrls[0] || '/placeholder.png'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Name */}
                        <Link
                          href={`/${companySlug}/products/${product.slug}`}
                          className="font-semibold text-left hover:text-primary transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemove(product.id)}
                          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, index) => (
                  <tr
                    key={attr.key}
                    className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                  >
                    <td className="p-4 font-medium text-muted-foreground">{attr.label}</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="text-sm">{attr.format(product)}</div>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Action Row */}
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium text-muted-foreground">Actions</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4">
                      <Link href={`/${companySlug}/products/${product.slug}`}>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
