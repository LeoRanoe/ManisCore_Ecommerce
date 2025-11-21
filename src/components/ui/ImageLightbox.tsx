'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EnhancedImage } from './EnhancedImage';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm min-w-[3rem] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Image */}
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: zoomLevel }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            style={{ cursor: zoomLevel > 1 ? 'move' : 'default' }}
          >
            <EnhancedImage
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-full"
              priority
            />
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setZoomLevel(1);
                  }}
                  className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <EnhancedImage
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
