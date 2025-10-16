import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border border-border',
        success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
        danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20',
        info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20',
        featured: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg border-0',
        outline: 'border-2 border-border hover:border-primary hover:bg-primary/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...props}>
        {icon && icon}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
