'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckoutStep {
  id: string;
  label: string;
  description?: string;
}

interface CheckoutProgressProps {
  steps: CheckoutStep[];
  currentStep: number;
  className?: string;
}

export function CheckoutProgress({ steps, currentStep, className = '' }: CheckoutProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Progress Bar */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
        
        {/* Active Progress Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute top-5 left-0 h-0.5 bg-primary z-10"
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                    backgroundColor: isCompleted || isCurrent ? 'hsl(var(--primary))' : '#e5e7eb',
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'relative z-20 w-10 h-10 rounded-full flex items-center justify-center',
                    'border-4 border-white shadow-md',
                    isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="mt-3 text-center max-w-24"
                >
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
