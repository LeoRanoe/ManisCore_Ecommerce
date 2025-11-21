'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryPillsProps {
  companySlug: string;
  categories: Category[];
}

export function CategoryPills({ companySlug, categories }: CategoryPillsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);

  const activeCategory = searchParams.get('category');

  // Check scroll position to show/hide gradients
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftGradient(container.scrollLeft > 0);
    setShowRightGradient(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [categories]);

  if (!categories || categories.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Left Gradient */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-3 px-4 mobile-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* All Categories Pill */}
        <Link
          href={`/${companySlug}/products`}
          className="shrink-0"
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              !activeCategory
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Products
          </motion.div>
        </Link>

        {/* Category Pills */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <Link
              key={category.id}
              href={`/${companySlug}/products?category=${category.slug}`}
              className="shrink-0"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.name}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Right Gradient */}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}
    </div>
  );
}
