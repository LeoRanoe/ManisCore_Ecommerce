'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  slug: string;
  name: string;
  itemCount?: number;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory?: string;
  selectedTags: string[];
  minPrice?: number;
  maxPrice?: number;
  priceRange: { min: number; max: number };
  onCategoryChange: (category: string | undefined) => void;
  onTagsChange: (tags: string[]) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  selectedTags,
  minPrice,
  maxPrice,
  priceRange,
  onCategoryChange,
  onTagsChange,
  onPriceChange,
  onClearFilters,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '');

  const handlePriceApply = () => {
    const min = localMinPrice ? parseFloat(localMinPrice) : undefined;
    const max = localMaxPrice ? parseFloat(localMaxPrice) : undefined;
    onPriceChange(min, max);
  };

  const hasActiveFilters = selectedCategory || selectedTags.length > 0 || minPrice !== undefined || maxPrice !== undefined;

  return (
    <div className={cn('bg-card border rounded-lg', isMobile && 'border-0 rounded-none')}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Filters</h2>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-md">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <div className="p-4 border-b">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="border-b">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full p-4 hover:bg-accent transition-colors"
            >
              <span className="font-medium">Categories</span>
              {isCategoryOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isCategoryOpen && (
              <div className="px-4 pb-4 space-y-2">
                <button
                  onClick={() => onCategoryChange(undefined)}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  )}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.slug)}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === category.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      {category.itemCount !== undefined && (
                        <span className="text-xs opacity-70">
                          ({category.itemCount})
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Price Range */}
        <div className="border-b">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full p-4 hover:bg-accent transition-colors"
          >
            <span className="font-medium">Price Range</span>
            {isPriceOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isPriceOpen && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  min={priceRange.min}
                  max={priceRange.max}
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  min={priceRange.min}
                  max={priceRange.max}
                />
              </div>
              <Button onClick={handlePriceApply} className="w-full" size="sm">
                Apply
              </Button>
              {(minPrice !== undefined || maxPrice !== undefined) && (
                <p className="text-xs text-muted-foreground text-center">
                  SRD {minPrice || priceRange.min} - SRD {maxPrice || priceRange.max}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="p-4">
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="space-y-2">
            <Checkbox label="In Stock Only" />
            <Checkbox label="Include Out of Stock" />
          </div>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && onClose && (
        <div className="p-4 border-t bg-background">
          <Button onClick={onClose} className="w-full">
            Show Results
          </Button>
        </div>
      )}
    </div>
  );
}
