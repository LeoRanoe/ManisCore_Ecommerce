import { Metadata } from 'next';
import { api } from '@/lib/api/client';
import { SuccessPageClient } from '@/components/checkout/SuccessPageClient';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Order Successful',
  description: 'Your order has been placed successfully',
};

export default async function CheckoutSuccessPage({ params }: { params: { company: string } }) {
  try {
    const company = await api.getCompany(params.company);
    
    if (!company) {
      notFound();
    }

    return (
      <SuccessPageClient 
        companySlug={params.company}
        companyName={company.name}
        companyEmail={company.contactEmail || undefined}
        companyPhone={company.contactPhone || undefined}
      />
    );
  } catch (error) {
    console.error('Error loading company:', error);
    notFound();
  }
}
