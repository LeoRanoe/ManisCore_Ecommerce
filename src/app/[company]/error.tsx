'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          We encountered an error while loading this page. Please try again.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>

        {error.digest && (
          <p className="text-sm text-muted-foreground mt-8">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </Container>
  );
}
