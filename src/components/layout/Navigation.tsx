'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Company } from '@/lib/api/client';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function Navigation({ company, companySlug }: { company: Company; companySlug: string }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${companySlug}`, label: 'Home' },
    { href: `/${companySlug}/products`, label: 'Products' },
    { href: `/${companySlug}/about`, label: 'About' },
    { href: `/${companySlug}/contact`, label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === `/${companySlug}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg shadow-black/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Enhanced */}
          <Link href={`/${companySlug}`} className="flex items-center gap-3 group">
            {company.logoUrl ? (
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:bg-primary/30 transition-colors" />
                <div className="relative bg-gradient-to-br from-background to-muted p-2 rounded-xl border border-border/50 group-hover:border-primary/50 transition-all">
                  <Image 
                    src={company.logoUrl} 
                    alt={company.name} 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
                {company.name}
              </span>
              {company.description && (
                <p className="text-xs text-muted-foreground max-w-[200px] truncate">
                  {company.description}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active Indicator */}
                {isActive(link.href) && (
                  <span className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20" />
                )}
                <span className="relative z-10">{link.label}</span>
                
                {/* Hover Effect */}
                <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform" />
              </Link>
            ))}
            
            {/* CTA Button */}
            {company.contactPhone && (
              <Link
                href={`/${companySlug}/contact`}
                className="ml-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {company.contactPhone && (
                <Link
                  href={`/${companySlug}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl font-semibold text-center"
                >
                  Get in Touch
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
