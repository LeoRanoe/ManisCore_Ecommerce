'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface AccountDropdownProps {
  companySlug: string;
  userName?: string;
  userEmail?: string;
  isLoggedIn?: boolean;
}

export function AccountDropdown({ companySlug, userName, userEmail, isLoggedIn = false }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = isLoggedIn
    ? [
        { icon: User, label: 'My Account', href: `/${companySlug}/account` },
        { icon: ShoppingBag, label: 'Orders', href: `/${companySlug}/account/orders` },
        { icon: Heart, label: 'Wishlist', href: `/${companySlug}/wishlist` },
        { icon: Settings, label: 'Settings', href: `/${companySlug}/account/settings` },
      ]
    : [];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Account menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white">
          {userName ? (
            <span className="text-sm font-semibold">{userName.charAt(0).toUpperCase()}</span>
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lift-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-foreground">{userName || 'User'}</p>
                  <p className="text-sm text-muted-foreground truncate">{userEmail || 'user@example.com'}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      // TODO: Implement logout logic
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              /* Not Logged In */
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">Sign in to access your account</p>
                <div className="space-y-2">
                  <Link
                    href={`/${companySlug}/login`}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/${companySlug}/register`}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
