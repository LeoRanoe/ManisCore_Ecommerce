import { Metadata } from 'next';
import { CartPageClient } from '@/components/cart/CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout',
};

export default function CartPage({ params }: { params: { company: string } }) {
  return <CartPageClient companySlug={params.company} />;
}
