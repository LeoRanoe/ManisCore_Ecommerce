'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/api/client';
import { ProductCard } from './ProductCard';
import { SearchBar } from '../ui/SearchBar';
import { Badge } from '../ui/Badge';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductGridProps {
  products: Product[];
  companySlug: string;
  allTags: string[];
}

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

export const ProductGrid: React.FC<ProductGridProps> = ({ products, companySlug, allTags }) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Search filter
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) {
        return false;
      }
      
      // Price range filter
      if (product.sellingPriceSRD < priceRange[0] || product.sellingPriceSRD > priceRange[1]) {
        return false;
      }
      
      // In stock filter
      if (inStockOnly && (product.status !== 'Arrived' || product.quantityInStock === 0)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.sellingPriceSRD - b.sellingPriceSRD;
        case 'price-high':
          return b.sellingPriceSRD - a.sellingPriceSRD;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setPriceRange([0, 10000]);
    setInStockOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search products..."
            value={search}
            onChange={setSearch}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-background border-2 border-border rounded-lg focus:border-primary outline-none transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card border-2 border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Filters</h3>
            {(selectedTags.length > 0 || inStockOnly) && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* In Stock Filter */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span className="font-medium">In Stock Only</span>
            </label>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-3">Price Range</h4>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>SRD 0</span>
                <span className="font-semibold text-foreground">Up to SRD {priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(selectedTags.length > 0 || inStockOnly) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {inStockOnly && (
            <Badge
              variant="success"
              className="cursor-pointer"
              onClick={() => setInStockOnly(false)}
            >
              In Stock Only
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-foreground">{products.length}</span> products
        </p>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} companySlug={companySlug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
