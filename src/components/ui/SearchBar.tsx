'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  debounceMs?: number;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder = 'Search...', value: controlledValue, onChange, onSearch, className, debounceMs = 300 }, ref) => {
    const [value, setValue] = useState(controlledValue || '');

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (onSearch && value !== controlledValue) {
          onSearch(value);
        }
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [value, onSearch, debounceMs, controlledValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onChange?.(newValue);
    };

    const handleClear = () => {
      setValue('');
      onChange?.('');
      onSearch?.('');
    };

    return (
      <div className={cn('relative group', className)}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
