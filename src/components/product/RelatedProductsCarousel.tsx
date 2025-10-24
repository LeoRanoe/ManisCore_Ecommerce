'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/api/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { cn } from '@/lib/utils';

interface RelatedProductsCarouselProps {
  products: Product[];
  companySlug: string;
  title?: string;
  className?: string;
}

export function RelatedProductsCarousel({
  products,
  companySlug,
  title = 'You May Also Like',
  className = '',
}: RelatedProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!products || products.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        
        {/* Navigation Buttons */}
        {products.length > 4 && (
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={cn(
                'p-2 rounded-lg border transition-all',
                canScrollPrev
                  ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={cn(
                'p-2 rounded-lg border transition-all',
                canScrollNext
                  ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-[0_0_280px] sm:flex-[0_0_320px] min-w-0"
            >
              <ProductCard product={product} companySlug={companySlug} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      {canScrollPrev && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      )}
      {canScrollNext && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}
    </div>
  );
}
