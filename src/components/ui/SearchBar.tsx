'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClose?: () => void;
  className?: string;
  debounceMs?: number;
  companySlug?: string;
  autoFocus?: boolean;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ 
    placeholder = 'Search products...', 
    value: controlledValue, 
    onChange, 
    onSearch, 
    onClose,
    className, 
    debounceMs = 300,
    companySlug,
    autoFocus = false
  }, ref) => {
    const [value, setValue] = useState(controlledValue || '');
    const router = useRouter();

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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim() && companySlug) {
        router.push(`/${companySlug}/search?q=${encodeURIComponent(value.trim())}`);
        onClose?.();
      }
    };

    return (
      <form onSubmit={handleSubmit} className={cn('relative group', className)}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>
    );
  }
);

SearchBar.displayName = 'SearchBar';

