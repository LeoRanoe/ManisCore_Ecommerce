'use client';

import { motion } from 'framer-motion';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface BottomNavProps {
  companySlug: string;
}

export function BottomNav({ companySlug }: BottomNavProps) {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: `/${companySlug}`,
      isActive: pathname === `/${companySlug}`,
    },
    {
      label: 'Search',
      icon: Search,
      href: `/${companySlug}/search`,
      isActive: pathname?.startsWith(`/${companySlug}/search`),
    },
    {
      label: 'Cart',
      icon: ShoppingCart,
      href: `/${companySlug}/cart`,
      isActive: pathname?.startsWith(`/${companySlug}/cart`),
      badge: itemCount,
    },
    {
      label: 'Wishlist',
      icon: Heart,
      href: `/${companySlug}/wishlist`,
      isActive: pathname?.startsWith(`/${companySlug}/wishlist`),
    },
    {
      label: 'Account',
      icon: User,
      href: `/${companySlug}/account`,
      isActive: pathname?.startsWith(`/${companySlug}/account`),
    },
  ];

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-16 md:hidden" />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px] ${
                  item.isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active Indicator */}
                {item.isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon with Badge */}
                <div className="relative z-10">
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-primary rounded-full"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.span>
                  )}
                </div>

                {/* Label */}
                <span className="text-[10px] font-medium z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
