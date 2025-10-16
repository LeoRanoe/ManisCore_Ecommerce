export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-black text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="h-16 bg-gray-800 rounded animate-pulse mx-auto max-w-md" />
            <div className="h-8 bg-gray-800 rounded animate-pulse mx-auto max-w-2xl" />
            <div className="flex gap-4 justify-center">
              <div className="h-14 w-48 bg-gray-800 rounded animate-pulse" />
              <div className="h-14 w-48 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4 bg-white border border-gray-200 rounded-lg p-4">
              <div className="aspect-square bg-gray-100 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                <div className="h-8 bg-gray-100 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
