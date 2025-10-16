import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Use the environment variable for default company
  const defaultCompany = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'maniscor';
  
  console.log('[Root] Redirecting to default company:', defaultCompany);
  console.log('[Root] Dashboard API URL:', process.env.NEXT_PUBLIC_DASHBOARD_API_URL);
  
  // Server-side redirect to the company-specific home page
  redirect(`/${defaultCompany}`);
  
  // This return is never reached due to redirect, but TypeScript needs it
  return null;
}
