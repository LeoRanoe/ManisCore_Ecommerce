'use client';

import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductHeaderProps {
  totalProducts: number;
  sortBy: string;
  viewMode: 'grid' | 'list';
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFilterClick?: () => void;
  showMobileFilter?: boolean;
}

export function ProductHeader({
  totalProducts,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange,
  onFilterClick,
  showMobileFilter = true,
}: ProductHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{totalProducts}</span> product{totalProducts !== 1 ? 's' : ''} found
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Mobile Filter Button */}
        {showMobileFilter && onFilterClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterClick}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}

        {/* Sort */}
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-[180px]"
        >
          <option value="newest">Newest First</option>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </Select>

        {/* View Mode Toggle (Desktop) */}
        <div className="hidden sm:flex items-center border rounded-md">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'grid'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
            aria-label="Grid view"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
