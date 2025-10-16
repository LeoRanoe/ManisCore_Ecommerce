'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Company } from '@/lib/api/client';
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Container } from '../ui/Container';

interface FooterProps {
  company: Company;
  companySlug: string;
}

export const Footer: React.FC<FooterProps> = ({ company, companySlug }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
      {/* Main Footer */}
      <Container size="xl" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href={`/${companySlug}`} className="flex items-center gap-3 group">
              {company.logoUrl ? (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all">
                  <Image src={company.logoUrl} alt={company.name} fill className="object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {company.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-bold text-xl group-hover:text-primary transition-colors">
                {company.name}
              </span>
            </Link>
            {company.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {company.description}
              </p>
            )}
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              {company.socialMedia?.whatsapp && (
                <a
                  href={`https://wa.me/${company.socialMedia.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              )}
              {company.socialMedia?.instagram && (
                <a
                  href={`https://instagram.com/${company.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-pink-500/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-pink-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {company.socialMedia?.facebook && (
                <a
                  href={`https://facebook.com/${company.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: `/${companySlug}` },
                { label: 'Products', href: `/${companySlug}/products` },
                { label: 'About Us', href: `/${companySlug}/about` },
                { label: 'Contact', href: `/${companySlug}/contact` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {company.contactEmail && (
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${company.contactEmail}`} className="hover:text-primary transition-colors">
                    {company.contactEmail}
                  </a>
                </li>
              )}
              {company.contactPhone && (
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <a href={`tel:${company.contactPhone}`} className="hover:text-primary transition-colors">
                    {company.contactPhone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 pr-12 bg-background border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <Container size="xl" className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
