'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { EnhancedImage } from '../ui/EnhancedImage';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface MegaMenuProps {
  companySlug: string;
  categories: Category[];
}

export function MegaMenu({ companySlug, categories }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render if there are no categories
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
        aria-label="Categories menu"
      >
        <span>Categories</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseLeave={() => setIsOpen(false)}
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-lift-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  {categories.slice(0, 8).map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      {/* Category Card */}
                      <Link
                        href={`/${companySlug}/products?category=${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        {category.image && (
                          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <EnhancedImage
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </Link>

                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {category.subcategories.slice(0, 4).map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/${companySlug}/products?category=${sub.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* View All Categories Link */}
                {categories.length > 8 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/${companySlug}/categories`}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      <span>View All Categories</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
