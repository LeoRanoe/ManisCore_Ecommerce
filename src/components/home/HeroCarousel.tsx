'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EnhancedImage } from '@/components/ui/EnhancedImage';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function HeroCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return slides.length - 1;
      if (nextIndex >= slides.length) return 0;
      return nextIndex;
    });
  }, [slides.length]);

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, paginate, slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Slides */}
      <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
            style={{
              backgroundColor: currentSlide.bgColor || '#000',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <EnhancedImage
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={currentIndex === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentSlide.subtitle && (
                    <p
                      className="text-sm sm:text-base font-semibold mb-4 uppercase tracking-wider"
                      style={{ color: currentSlide.textColor || '#fff' }}
                    >
                      {currentSlide.subtitle}
                    </p>
                  )}
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                    style={{ color: currentSlide.textColor || '#fff' }}
                  >
                    {currentSlide.title}
                  </h1>
                  {currentSlide.description && (
                    <p
                      className="text-lg sm:text-xl mb-8 leading-relaxed max-w-xl"
                      style={{ color: currentSlide.textColor || '#e5e5e5' }}
                    >
                      {currentSlide.description}
                    </p>
                  )}
                  {currentSlide.ctaText && currentSlide.ctaLink && (
                    <Link
                      href={currentSlide.ctaLink}
                      className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl 
                               font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all"
                    >
                      <span>{currentSlide.ctaText}</span>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 
                     hover:bg-white/20 transition-all group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 
                     hover:bg-white/20 transition-all group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
