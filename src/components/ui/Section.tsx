import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerSize = 'lg', noPadding = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(!noPadding && 'py-12 md:py-16 lg:py-20', className)}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';
