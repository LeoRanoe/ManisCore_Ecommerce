'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

interface CategoryShowcaseProps {
  companySlug: string;
  categories: Category[];
}

export function CategoryShowcase({ companySlug, categories }: CategoryShowcaseProps) {
  // Show top 4 categories
  const displayCategories = categories.slice(0, 4);

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated selection of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${companySlug}/products?category=${category.slug}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                'h-64 lg:h-80',
                'transition-all duration-300 hover:-translate-y-2 hover:shadow-lift-lg'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                {category.imageUrl && (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center text-white font-medium">
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-colors" />
            </Link>
          ))}
        </div>

        {/* View All Link */}
        {categories.length > 4 && (
          <div className="text-center mt-12">
            <Link
              href={`/${companySlug}/products`}
              className="inline-flex items-center text-lg font-medium hover:underline"
            >
              View all categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
