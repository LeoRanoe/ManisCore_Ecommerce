import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Use the environment variable for default company
  const defaultCompany = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'maniscor';
  
  // Server-side redirect to the company-specific home page
  redirect(`/${defaultCompany}`);
  
  // This return is never reached due to redirect, but TypeScript needs it
  return null;
}
