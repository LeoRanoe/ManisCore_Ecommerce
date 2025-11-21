'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, CreditCard, Truck, RotateCcw, Award } from 'lucide-react';

interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const badges: TrustBadge[] = [
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: '256-bit SSL encryption',
  },
  {
    icon: Shield,
    title: 'Buyer Protection',
    description: 'Money-back guarantee',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'All major cards accepted',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Tracked shipping',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Verified products',
  },
];

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'icons-only';
  showTitle?: boolean;
  limit?: number;
}

export function TrustBadges({ variant = 'default', showTitle = true, limit }: TrustBadgesProps) {
  const displayBadges = limit ? badges.slice(0, limit) : badges;

  if (variant === 'icons-only') {
    return (
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {displayBadges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
              title={`${badge.title} - ${badge.description}`}
            >
              <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {displayBadges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{badge.title}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Default variant - full cards
  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="text-lg font-semibold text-center">Why Shop With Us?</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayBadges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-card border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="mb-3 p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Payment logos component
interface PaymentLogosProps {
  className?: string;
}

export function PaymentLogos({ className = '' }: PaymentLogosProps) {
  const paymentMethods = [
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'American Express', logo: '💳' },
    { name: 'PayPal', logo: '🅿️' },
  ];

  return (
    <div className={`flex items-center gap-2 justify-center flex-wrap ${className}`}>
      <span className="text-xs text-muted-foreground mr-2">Accepted payments:</span>
      {paymentMethods.map((method) => (
        <div
          key={method.name}
          className="px-2 py-1 bg-muted rounded text-xs font-medium flex items-center gap-1"
          title={method.name}
        >
          <span>{method.logo}</span>
          <span className="hidden sm:inline">{method.name}</span>
        </div>
      ))}
      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs font-medium">
        <Lock className="w-3 h-3" />
        <span>SSL Secured</span>
      </div>
    </div>
  );
}
