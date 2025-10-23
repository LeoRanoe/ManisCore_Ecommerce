'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: string;
  showLoadingState?: boolean;
}

export function EnhancedImage({
  className,
  alt,
  fallback,
  showLoadingState = true,
  ...props
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && showLoadingState && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}
      
      {hasError && fallback ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">{fallback}</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <Image
            className={cn(
              'transition-all duration-300',
              isLoading && 'scale-110 blur-sm',
              className
            )}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            {...props}
          />
        </motion.div>
      )}
    </div>
  );
}
