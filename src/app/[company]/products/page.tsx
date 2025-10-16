import { api } from '@/lib/api/client';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Package, TrendingUp, Star, Zap } from 'lucide-react';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search;

  const company = await api.getCompany(params.company);
  const { data: products, pagination } = await api.getProducts(
    params.company,
    page,
    100, // Get all for client-side filtering
    { search }
  );

  // Extract all unique tags
  const allTags = Array.from(
    new Set(products.flatMap(p => p.tags))
  ).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 border-b border-border/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: company.name, href: `/${params.company}` },
                { label: 'Products' },
              ]}
            />
          </div>

          {/* Title Section */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Package className="w-4 h-4" />
              <span>Complete Product Catalog</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Explore Our Products
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Browse through our complete collection of premium quality products. 
              Filter by category, price range, and availability to find exactly what you need.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{products.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold">
                  {products.filter(p => p.status === 'Arrived' && p.quantityInStock > 0).length}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-2xl font-bold">
                  {products.filter(p => p.isFeatured).length}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Featured</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">{allTags.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <Container size="xl">
          <ProductGrid 
            products={products} 
            companySlug={params.company}
            allTags={allTags}
          />
        </Container>
      </section>
    </div>
  );
}
