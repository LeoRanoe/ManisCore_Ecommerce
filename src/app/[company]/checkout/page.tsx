import { Metadata } from 'next';
import { api } from '@/lib/api/client';
import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order',
};

export default async function CheckoutPage({ params }: { params: { company: string } }) {
  try {
    const company = await api.getCompany(params.company);
    
    if (!company) {
      notFound();
    }

    return (
      <CheckoutPageClient 
        companySlug={params.company}
        companyName={company.name}
        companyPhone={company.contactPhone || undefined}
      />
    );
  } catch (error) {
    console.error('Error loading company:', error);
    notFound();
  }
}
