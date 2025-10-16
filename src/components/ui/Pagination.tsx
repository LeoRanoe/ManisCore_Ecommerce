'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildUrl?: (page: number) => string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  buildUrl,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const isButtonMode = !!onPageChange;

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

  const buttonClasses = {
    base: 'flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all duration-200',
    disabled: 'border-border text-muted-foreground pointer-events-none opacity-50',
    active: 'border-border hover:border-primary hover:text-primary hover:bg-primary/5',
    pageBase: 'min-w-[40px] h-[40px] flex items-center justify-center rounded-lg border-2 font-semibold transition-all duration-200',
    pageActive: 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30',
    pageInactive: 'border-border hover:border-primary hover:text-primary hover:bg-primary/5',
  };

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)}>
      {/* Previous Button */}
      {isButtonMode ? (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            buttonClasses.base,
            currentPage === 1 ? buttonClasses.disabled : buttonClasses.active
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
      ) : (
        <Link
          href={buildUrl!(Math.max(1, currentPage - 1))}
          className={cn(
            buttonClasses.base,
            currentPage === 1 ? buttonClasses.disabled : buttonClasses.active
          )}
          aria-disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

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
          
          if (isButtonMode) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={isActive}
                className={cn(
                  buttonClasses.pageBase,
                  isActive ? buttonClasses.pageActive : buttonClasses.pageInactive
                )}
              >
                {page}
              </button>
            );
          }

          return (
            <Link
              key={page}
              href={buildUrl!(page)}
              className={cn(
                buttonClasses.pageBase,
                isActive ? buttonClasses.pageActive : buttonClasses.pageInactive
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {isButtonMode ? (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(
            buttonClasses.base,
            currentPage === totalPages ? buttonClasses.disabled : buttonClasses.active
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          href={buildUrl!(Math.min(totalPages, currentPage + 1))}
          className={cn(
            buttonClasses.base,
            currentPage === totalPages ? buttonClasses.disabled : buttonClasses.active
          )}
          aria-disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
};
