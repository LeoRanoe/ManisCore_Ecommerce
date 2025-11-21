'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface ColorSwatch {
  name: string;
  value: string; // hex color
  available: boolean;
}

interface ColorSwatchesProps {
  colors: ColorSwatch[];
  selectedColor?: string;
  onColorSelect?: (color: ColorSwatch) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatches({
  colors,
  selectedColor,
  onColorSelect,
  size = 'md',
}: ColorSwatchesProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;
          const isHovered = hoveredColor === color.value;

          return (
            <motion.button
              key={color.value}
              onClick={() => color.available && onColorSelect?.(color)}
              onHoverStart={() => setHoveredColor(color.value)}
              onHoverEnd={() => setHoveredColor(null)}
              disabled={!color.available}
              whileTap={color.available ? { scale: 0.9 } : {}}
              className={`relative ${sizeClasses[size]} rounded-full border-2 transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-300 dark:border-gray-600'
              } ${
                !color.available
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer hover:scale-110'
              }`}
              title={color.name}
              aria-label={`Select ${color.name} color${!color.available ? ' (unavailable)' : ''}`}
            >
              {/* Color Circle */}
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color.value }}
              />

              {/* Selected Checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full"
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
              )}

              {/* Unavailable Strike */}
              {!color.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500 rotate-45" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Color Name Display */}
      {(hoveredColor || selectedColor) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-muted-foreground"
        >
          {colors.find((c) => c.value === (hoveredColor || selectedColor))?.name}
        </motion.div>
      )}
    </div>
  );
}
