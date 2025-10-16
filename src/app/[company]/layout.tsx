import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { Navigation } from '@/components/layout/Navigation';

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
      <div className="min-h-screen">
        <Navigation company={company} companySlug={params.company} />
        {children}
        
        {/* Footer */}
        <footer className="border-t mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>© 2025 {company.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  } catch {
    notFound();
  }
}
