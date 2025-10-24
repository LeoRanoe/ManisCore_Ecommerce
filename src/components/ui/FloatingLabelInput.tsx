'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

export function FloatingLabelInput({
  label,
  error,
  success,
  helperText,
  icon,
  className,
  type = 'text',
  value,
  onChange,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(!!value || !!inputRef.current?.value);
  }, [value]);

  const isFloating = isFocused || hasValue;
  const hasError = !!error;

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            onChange?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'peer w-full rounded-xl border-2 bg-white px-4 py-3.5 text-base transition-all duration-200',
            icon ? 'pl-11' : 'pl-4',
            hasError
              ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-500/20'
              : success
              ? 'border-green-500 focus:border-green-600 focus:ring-4 focus:ring-green-500/20'
              : 'border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20',
            'outline-none disabled:bg-gray-100 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />

        {/* Floating Label */}
        <motion.label
          animate={{
            top: isFloating ? '0.5rem' : '50%',
            translateY: isFloating ? '0%' : '-50%',
            fontSize: isFloating ? '0.75rem' : '1rem',
            fontWeight: isFloating ? 600 : 400,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute left-4 pointer-events-none origin-left',
            icon && !isFloating && 'left-11',
            icon && isFloating && 'left-4',
            hasError
              ? 'text-red-600'
              : success
              ? 'text-green-600'
              : isFocused
              ? 'text-primary'
              : 'text-gray-500',
            'bg-white px-1'
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Status Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="error"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {success && !hasError && (
              <motion.div
                key="success"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Helper Text / Error Message */}
      <AnimatePresence mode="wait">
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-1.5 text-sm',
              hasError ? 'text-red-600' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
