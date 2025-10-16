'use client';

import Link from 'next/link';
import { ArrowRight, Package, Shield, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  companySlug: string;
  companyName: string;
  heroTitle?: string;
  heroSubtitle?: string;
  bannerUrl?: string;
}

export function HeroSection({
  companySlug,
  companyName,
  heroTitle,
  heroSubtitle,
  bannerUrl,
}: HeroSectionProps) {
  const title = heroTitle || `Welcome to ${companyName}`;
  const subtitle = heroSubtitle || 'Discover quality products at unbeatable prices';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Background Image Overlay */}
      {bannerUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        />
      )}

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Now Available</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up">
            <Link href={`/${companySlug}/products`}>
              <Button size="lg" className="w-full sm:w-auto group">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${companySlug}/about`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">Quality Products</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">Secure Shopping</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">24/7 Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
