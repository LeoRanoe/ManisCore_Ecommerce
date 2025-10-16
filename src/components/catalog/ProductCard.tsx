'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product, companySlug }: { product: Product; companySlug: string }) {
  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

  return (
    <Link href={`/${companySlug}/products/${product.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-300">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
          {product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          
          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            {inStock ? (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                In Stock
              </span>
            ) : (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-gray-900 to-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-black transition-colors text-lg leading-tight">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-2xl font-black text-black bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
              {formatCurrency(product.sellingPriceSRD)}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
