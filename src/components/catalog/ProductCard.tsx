'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product, companySlug }: { product: Product; companySlug: string }) {
  const inStock = product.status === 'Arrived' && product.quantityInStock > 0;

  return (
    <Link href={`/${companySlug}/products/${product.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
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
          
          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            {inStock ? (
              <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="pt-2">
            <p className="text-2xl font-bold text-black">
              {formatCurrency(product.sellingPriceSRD)}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {product.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
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
