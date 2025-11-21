'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useState, useRef, ReactNode } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
  disabled?: boolean;
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  // Animations based on pull distance
  const pullProgress = useTransform(y, [0, threshold], [0, 1]);
  const iconRotation = useTransform(pullProgress, [0, 1], [0, 180]);
  const iconOpacity = useTransform(y, [0, threshold / 2, threshold], [0, 0.5, 1]);
  const iconScale = useTransform(pullProgress, [0, 0.5, 1], [0.5, 0.8, 1]);

  const handlePanStart = () => {
    if (disabled || isRefreshing) return;
    
    // Only allow pull if at top of scroll
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      setIsPulling(true);
    }
  };

  const handlePan = (_: Event, info: PanInfo) => {
    if (!isPulling || disabled || isRefreshing) return;

    // Only allow downward pulls
    if (info.offset.y > 0) {
      // Add resistance as you pull further
      const resistance = 0.5;
      y.set(info.offset.y * resistance);
    }
  };

  const handlePanEnd = async () => {
    if (!isPulling || disabled || isRefreshing) return;

    setIsPulling(false);
    const currentY = y.get();

    // Trigger refresh if pulled past threshold
    if (currentY >= threshold) {
      setIsRefreshing(true);
      y.set(threshold);
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        y.set(0);
      }
    } else {
      // Snap back if not pulled enough
      y.set(0);
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull Indicator */}
      <motion.div
        className="absolute inset-x-0 top-0 z-50 flex items-end justify-center pointer-events-none"
        style={{ height: y }}
      >
        <motion.div
          className="mb-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
          style={{
            opacity: iconOpacity,
            scale: iconScale,
          }}
        >
          <motion.div
            style={{ rotate: isRefreshing ? undefined : iconRotation }}
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          >
            <RefreshCw className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        drag={isPulling && !disabled && !isRefreshing ? 'y' : false}
        dragConstraints={{ top: 0, bottom: threshold * 1.5 }}
        dragElastic={0}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
