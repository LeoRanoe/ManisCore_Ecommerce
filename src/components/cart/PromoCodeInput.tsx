'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PromoCodeInputProps {
  onApply: (code: string) => void;
  isLoading?: boolean;
  appliedCode?: string;
  discount?: number;
  className?: string;
}

export function PromoCodeInput({
  onApply,
  isLoading = false,
  appliedCode,
  discount,
  className = '',
}: PromoCodeInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }
    setError('');
    onApply(code.trim().toUpperCase());
  };

  const handleRemove = () => {
    setCode('');
    setError('');
    onApply(''); // Clear the code
  };

  return (
    <div className={cn('border border-gray-200 rounded-xl overflow-hidden', className)}>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">
              {appliedCode ? 'Promo Code Applied' : 'Have a promo code?'}
            </p>
            {appliedCode && discount && (
              <p className="text-xs text-green-600 font-medium">
                {discount}% off applied
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {!appliedCode ? (
                <>
                  {/* Input Field */}
                  <FloatingLabelInput
                    label="Enter promo code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError('');
                    }}
                    error={error}
                    icon={<Tag className="w-5 h-5" />}
                    placeholder="SAVE10"
                    disabled={isLoading}
                  />

                  {/* Apply Button */}
                  <Button
                    onClick={handleApply}
                    isLoading={isLoading}
                    disabled={!code.trim() || isLoading}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Apply Code
                  </Button>
                </>
              ) : (
                /* Applied Code Display */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Tag className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-mono font-bold text-sm text-green-700">
                        {appliedCode}
                      </p>
                      {discount && (
                        <p className="text-xs text-green-600">
                          {discount}% discount applied
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleRemove}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </motion.div>
              )}

              {/* Helper Text */}
              {!appliedCode && (
                <p className="text-xs text-muted-foreground text-center">
                  Enter your promo code to get a discount on your order
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
