'use client';

import React from 'react';
import { Grid } from 'react-window';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/api/client';

interface VirtualizedProductGridProps {
  products: Product[];
  company: string;
  columnCount?: number;
  rowHeight?: number;
  containerHeight?: number;
}

export function VirtualizedProductGrid({
  products,
  company,
  columnCount = 4,
  rowHeight = 450,
  containerHeight = 800,
}: VirtualizedProductGridProps) {
  // Don't use virtual scrolling for small lists
  if (products.length < 20) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} companySlug={company} />
        ))}
      </div>
    );
  }

  // Calculate grid dimensions
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 64 : 1200;
  const columnWidth = Math.floor(containerWidth / columnCount);
  const rowCount = Math.ceil(products.length / columnCount);

  // Cell renderer component
  const CellComponent = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    const product = products[index];

    if (!product) return null;

    return (
      <div
        style={{
          ...style,
          padding: '12px',
          boxSizing: 'border-box',
        }}
      >
        <ProductCard product={product} companySlug={company} />
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={columnWidth}
      defaultHeight={containerHeight}
      defaultWidth={containerWidth}
      rowCount={rowCount}
      rowHeight={rowHeight}
      className="scrollbar-hide"
      cellComponent={CellComponent}
      cellProps={{}}
    />
  );
}
