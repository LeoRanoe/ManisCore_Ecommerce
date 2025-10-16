import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <SearchX className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Button size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </Container>
  );
}
