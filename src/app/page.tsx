import { redirect } from 'next/navigation';

export default function HomePage() {
  const defaultCompany = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'nextx';
  redirect(`/${defaultCompany}`);
}
