import { Metadata } from 'next';
import { Company, Product } from './api/client';

export function generateCompanyMetadata(company: Company, path: string = ''): Metadata {
  const title = company.name;
  const description = company.description || `Shop at ${company.name} for premium quality products`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${company.slug}${path}`;
  const imageUrl = company.bannerUrl || company.logoUrl || '/og-image.png';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: ['ecommerce', 'shop', 'products', company.name, 'online store'],
    authors: [{ name: company.name }],
    creator: company.name,
    publisher: company.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: company.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: company.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: company.socialMedia?.instagram ? `@${company.socialMedia.instagram}` : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProductMetadata(
  product: Product,
  company: Company,
  companySlug: string
): Metadata {
  const title = product.seoTitle || product.name;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    product.description ||
    `Buy ${product.name} at ${company.name}`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${companySlug}/products/${product.slug}`;
  const imageUrl = product.imageUrls[0] || company.logoUrl || '/og-image.png';

  return {
    title,
    description,
    keywords: [
      product.name,
      ...product.tags,
      company.name,
      'buy online',
      'shop',
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: company.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProductJsonLd(
  product: Product,
  company: Company,
  companySlug: string
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${companySlug}/products/${product.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.imageUrls,
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'SRD',
      price: product.sellingPriceSRD.toFixed(2),
      availability:
        product.status === 'Arrived' && product.quantityInStock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: company.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '32',
    },
  };
}

export function generateOrganizationJsonLd(company: Company, companySlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${companySlug}`,
    logo: company.logoUrl,
    image: company.bannerUrl || company.logoUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.contactPhone,
      email: company.contactEmail,
      contactType: 'customer service',
    },
    sameAs: [
      company.socialMedia?.facebook && `https://facebook.com/${company.socialMedia.facebook}`,
      company.socialMedia?.instagram && `https://instagram.com/${company.socialMedia.instagram}`,
      company.socialMedia?.whatsapp && `https://wa.me/${company.socialMedia.whatsapp}`,
    ].filter(Boolean),
  };
}
