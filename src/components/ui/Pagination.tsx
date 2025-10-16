'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildUrl: (page: number) => string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  buildUrl,
  className,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (showEllipsisStart) {
        pages.push('ellipsis-start');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pages.push(i);
      }
      
      if (showEllipsisEnd) {
        pages.push('ellipsis-end');
      }
      
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)}>
      {/* Previous Button */}
      <Link
        href={buildUrl(Math.max(1, currentPage - 1))}
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all duration-200',
          currentPage === 1
            ? 'border-border text-muted-foreground pointer-events-none opacity-50'
            : 'border-border hover:border-primary hover:text-primary hover:bg-primary/5'
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {renderPageNumbers().map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={page} className="px-2 text-muted-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={cn(
                'min-w-[40px] h-[40px] flex items-center justify-center rounded-lg border-2 font-semibold transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                  : 'border-border hover:border-primary hover:text-primary hover:bg-primary/5'
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={buildUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all duration-200',
          currentPage === totalPages
            ? 'border-border text-muted-foreground pointer-events-none opacity-50'
            : 'border-border hover:border-primary hover:text-primary hover:bg-primary/5'
        )}
        aria-disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
};
