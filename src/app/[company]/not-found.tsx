import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  const defaultCompany = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'maniscor';
  
  return (
    <Container className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <SearchX className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Company Not Found</h2>
        
        <p className="text-lg text-gray-600 mb-4">
          Sorry, we couldn&apos;t find the company you&apos;re looking for.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          The company may not exist or the URL might be incorrect.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${defaultCompany}`}>Visit Default Store</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
