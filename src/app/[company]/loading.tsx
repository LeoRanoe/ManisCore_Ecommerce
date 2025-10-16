import { Container } from '@/components/ui/Container';

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Hero Skeleton */}
        <div className="h-96 bg-muted rounded-2xl animate-pulse" />

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
