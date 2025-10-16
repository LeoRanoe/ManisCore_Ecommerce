import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Use the environment variable for default company
  const defaultCompany = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'nextx';
  
  // Server-side redirect
  redirect(`/${defaultCompany}`);
  
  // This return is never reached due to redirect, but TypeScript needs it
  return null;
}
