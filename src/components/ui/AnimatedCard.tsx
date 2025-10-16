'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverScale?: boolean;
  hoverGlow?: boolean;
  children: React.ReactNode;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverScale = true, hoverGlow = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-card rounded-2xl border border-border/50 transition-all duration-300',
          hoverScale && 'hover:-translate-y-1 hover:shadow-2xl',
          hoverGlow && 'hover:shadow-primary/20',
          className
        )}
        {...props}
      >
        {children}
        {/* Hover Glow Effect */}
        {hoverGlow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
      </div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';
