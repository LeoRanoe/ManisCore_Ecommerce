'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchBarWithAutocomplete } from '@/components/search/SearchBarWithAutocomplete';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  companySlug: string;
  companyName: string;
  logoUrl?: string;
}

export function Header({ companySlug, companyName, logoUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${companySlug}`, label: 'Home' },
    { href: `/${companySlug}/products`, label: 'Shop' },
    { href: `/${companySlug}/about`, label: 'About' },
    { href: `/${companySlug}/contact`, label: 'Contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm'
            : 'bg-background'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={`/${companySlug}`} className="flex items-center space-x-2">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={companyName} className="h-8 w-auto" />
              ) : (
                <span className="text-xl font-bold">{companyName}</span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground/80',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Icon (Desktop) */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href={`/${companySlug}/wishlist`}
                className="hidden sm:flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCart}
                className="relative flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {/* Cart count badge */}
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Account */}
              <Link
                href={`/${companySlug}/account`}
                className="hidden sm:flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:block overflow-hidden border-t"
              >
                <div className="py-4">
                  <SearchBarWithAutocomplete 
                    companySlug={companySlug} 
                    onClose={() => setIsSearchOpen(false)}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <nav className="flex flex-col p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-md text-sm font-medium transition-colors',
                        pathname === link.href
                          ? 'bg-accent text-foreground'
                          : 'text-foreground/60 hover:bg-accent/50 hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

              <div className="border-t pt-4 mt-4 space-y-1">
                <Link
                  href={`/${companySlug}/account`}
                  className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-foreground/60 hover:bg-accent/50 hover:text-foreground transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Account
                </Link>
                <Link
                  href={`/${companySlug}/wishlist`}
                  className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-foreground/60 hover:bg-accent/50 hover:text-foreground transition-colors"
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Wishlist
                </Link>
              </div>
            </nav>

            {/* Mobile Search */}
            <div className="p-4 border-t mt-auto">
              <SearchBarWithAutocomplete companySlug={companySlug} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
