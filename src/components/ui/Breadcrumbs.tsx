'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home Icon */}
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </motion.li>

        {items.map((item, index) => (
          <Fragment key={index}>
            {/* Separator */}
            <motion.li
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              aria-hidden="true"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.li>

            {/* Breadcrumb Item */}
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
              className={index === items.length - 1 ? 'font-medium text-foreground' : ''}
            >
              {item.href && index !== items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
