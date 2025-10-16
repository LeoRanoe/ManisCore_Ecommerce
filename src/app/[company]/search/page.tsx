import { Metadata } from 'next';
import { SearchResults } from '@/components/search/SearchResults';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search for products',
};

export default function SearchPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return <SearchResults companySlug={params.company} initialQuery={query} />;
}
