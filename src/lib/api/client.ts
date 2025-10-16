export interface Company {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialMedia?: {
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  themeConfig?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  imageUrls: string[];
  youtubeReviewUrls?: string[];
  specifications?: Record<string, string>;
  tags: string[];
  isFeatured: boolean;
  sellingPriceSRD: number;
  status: string;
  quantityInStock: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class DashboardAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || 'http://localhost:3000';
  }

  async getCompany(slug: string): Promise<Company> {
    const res = await fetch(`${this.baseURL}/api/public/companies/${slug}`, {
      next: { revalidate: 60 } as any,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache'
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Company not found' }));
      throw new Error(error.error || 'Company not found');
    }
    return res.json();
  }

  async getProducts(
    companySlug: string,
    page = 1,
    limit = 20,
    filters: { search?: string; tags?: string[]; isFeatured?: boolean } = {}
  ): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams({
      companySlug,
      page: String(page),
      limit: String(limit),
      ...(filters.search && { search: filters.search }),
      ...(filters.tags && { tags: filters.tags.join(',') }),
      ...(filters.isFeatured !== undefined && { isFeatured: String(filters.isFeatured) })
    });

    const res = await fetch(`${this.baseURL}/api/public/products?${params}`, {
      next: { revalidate: 60 } as any,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache'
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Failed to fetch products' }));
      throw new Error(error.error || 'Failed to fetch products');
    }
    return res.json();
  }

  async getProduct(slug: string, companySlug: string): Promise<Product & { relatedProducts: Product[] }> {
    const res = await fetch(
      `${this.baseURL}/api/public/products/${slug}?companySlug=${companySlug}`,
      { 
        next: { revalidate: 60 } as any,
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache'
      }
    );
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Product not found' }));
      throw new Error(error.error || 'Product not found');
    }
    return res.json();
  }
}

export const api = new DashboardAPI();
