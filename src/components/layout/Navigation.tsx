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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${companySlug}`} className="flex items-center gap-3">
            {company.logoUrl ? (
              <div className="relative w-10 h-10">
                <Image 
                  src={company.logoUrl} 
                  alt={company.name} 
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="font-bold text-xl text-black">
              {company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {company.contactPhone && (
              <Link
                href={`/${companySlug}/contact`}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Get in Touch
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {company.contactPhone && (
                <Link
                  href={`/${companySlug}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 bg-black text-white px-4 py-3 rounded-lg font-medium text-center"
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
