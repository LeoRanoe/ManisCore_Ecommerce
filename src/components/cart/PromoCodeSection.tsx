'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Tag, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface PromoCodeSectionProps {
  onApply: (code: string) => Promise<{ success: boolean; message: string; discount?: number }>;
  currentCode?: string;
  onRemove?: () => void;
}

export function PromoCodeSection({ onApply, currentCode, onRemove }: PromoCodeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(!!currentCode);
  const [code, setCode] = useState(currentCode || '');
  const [isApplying, setIsApplying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;

    setIsApplying(true);
    setResult(null);

    try {
      const response = await onApply(code.trim().toUpperCase());
      setResult(response);

      if (!response.success) {
        // Clear invalid code after showing error
        setTimeout(() => setResult(null), 3000);
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to apply promo code. Please try again.',
      });
      setTimeout(() => setResult(null), 3000);
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = () => {
    setCode('');
    setResult(null);
    onRemove?.();
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      {/* Header - Always Visible */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          <span className="font-medium">Promo Code</span>
          {currentCode && !isExpanded && (
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Applied
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
          >
            <div className="p-4 space-y-3">
              {/* Current Applied Code */}
              {currentCode && !result && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">{currentCode}</p>
                      <p className="text-xs text-green-700 dark:text-green-300">Promo code applied</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemove} className="text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100">
                    Remove
                  </Button>
                </motion.div>
              )}

              {/* Input Form */}
              {!currentCode && (
                <>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                      disabled={isApplying}
                      className="flex-1 uppercase placeholder:normal-case"
                    />
                    <Button onClick={handleApply} disabled={!code.trim() || isApplying} className="min-w-[100px]">
                      {isApplying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Applying
                        </>
                      ) : (
                        'Apply'
                      )}
                    </Button>
                  </div>

                  {/* Result Message */}
                  <AnimatePresence mode="wait">
                    {result && (
                      <motion.div
                        key={result.success ? 'success' : 'error'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                          result.success
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        {result.success ? (
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <p>{result.message}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* Help Text */}
              <p className="text-xs text-muted-foreground">
                Enter a valid promo code to receive a discount on your order.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
