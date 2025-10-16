import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

// Enable dynamic params to allow runtime generation of pages
export const dynamicParams = true;

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { company: string };
}) {
  try {
    const company = await api.getCompany(params.company);

    return (
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header 
            companySlug={params.company} 
            companyName={company.name}
            logoUrl={company.logoUrl || undefined}
          />
          <main className="flex-1">{children}</main>
          <Footer company={company} companySlug={params.company} />
          <CartDrawer companySlug={params.company} />
        </div>
      </CartProvider>
    );
  } catch (error) {
    console.error('Error loading company:', params.company, error);
    notFound();
  }
}
