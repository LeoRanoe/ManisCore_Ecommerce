import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

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
      <div className="min-h-screen flex flex-col">
        <Navigation company={company} companySlug={params.company} />
        <main className="flex-1">{children}</main>
        <Footer company={company} companySlug={params.company} />
      </div>
    );
  } catch (error) {
    console.error('Error loading company:', params.company, error);
    notFound();
  }
}
