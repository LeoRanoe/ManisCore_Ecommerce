'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxHero({ children, className = '' }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms with different speeds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background Layer - Slowest */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </motion.div>

      {/* Content Layer - Medium speed with fade */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg className="w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" fill="white" opacity="1"></path>
        </svg>
      </div>
    </div>
  );
}
