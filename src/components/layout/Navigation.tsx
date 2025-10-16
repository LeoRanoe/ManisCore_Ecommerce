'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Company } from '@/lib/api/client';
import { Menu, X } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href={`/${companySlug}`} className="flex items-center gap-3 py-3">
            {company.logoUrl ? (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 p-1">
                <Image 
                  src={company.logoUrl} 
                  alt={company.name} 
                  fill
                  className="object-contain p-1"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="font-black text-xl text-black tracking-tight">
              {company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold transition-all relative group ${
                  isActive(link.href)
                    ? 'text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transition-transform origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            {company.contactPhone && (
              <Link
                href={`/${companySlug}/contact`}
                className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Get in Touch
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive(link.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {company.contactPhone && (
                <Link
                  href={`/${companySlug}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all"
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
