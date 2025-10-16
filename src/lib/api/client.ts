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
  // Ecommerce fields
  businessHours?: Record<string, string>;
  whatsappGreeting?: string;
  aboutUs?: string;
  shippingPolicy?: string;
  returnPolicy?: string;
  warrantyInfo?: string;
  termsOfService?: string;
  privacyPolicy?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
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

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  reviewerName: string;
  isVerified: boolean;
  createdAt: string;
  item?: {
    slug: string;
    name: string;
  };
}

export interface ReviewsResponse extends PaginatedResponse<Review> {
  averageRating?: number | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface Banner {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  position: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  imageUrl?: string;
  rating?: number;
  isFeatured: boolean;
  order: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  order: number;
  isPublic: boolean;
  itemCount?: number;
}

export interface ProductFilters {
  search?: string;
  tags?: string[];
  isFeatured?: boolean;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name' | 'featured';
}

class DashboardAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || 'http://localhost:3000';
  }

  async getCompany(slug: string): Promise<Company> {
    try {
      const url = `${this.baseURL}/api/public/companies/${slug}`;
      console.log('[API] Fetching company:', url);
      
      const res = await fetch(url, {
        next: { revalidate: 60 } as any,
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache'
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('[API] Company fetch failed:', res.status, errorText);
        const error = errorText ? JSON.parse(errorText) : { error: 'Company not found' };
        throw new Error(error.error || `Company not found (${res.status})`);
      }
      
      const data = await res.json();
      console.log('[API] Company fetched successfully:', data.name);
      return data;
    } catch (error) {
      console.error('[API] Error fetching company:', slug, error);
      throw error;
    }
  }

  async getProducts(
    companySlug: string,
    page = 1,
    limit = 20,
    filters: ProductFilters = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams({
        companySlug,
        page: String(page),
        limit: String(limit),
        ...(filters.search && { search: filters.search }),
        ...(filters.tags && { tags: filters.tags.join(',') }),
        ...(filters.isFeatured !== undefined && { isFeatured: String(filters.isFeatured) }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice !== undefined && { minPrice: String(filters.minPrice) }),
        ...(filters.maxPrice !== undefined && { maxPrice: String(filters.maxPrice) }),
        ...(filters.sortBy && { sortBy: filters.sortBy })
      });

      const url = `${this.baseURL}/api/public/products?${params}`;
      console.log('[API] Fetching products:', url);

      const res = await fetch(url, {
        next: { revalidate: 60 } as any,
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache'
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('[API] Products fetch failed:', res.status, errorText);
        const error = errorText ? JSON.parse(errorText) : { error: 'Failed to fetch products' };
        throw new Error(error.error || `Failed to fetch products (${res.status})`);
      }
      
      const data = await res.json();
      console.log('[API] Products fetched successfully:', data.data?.length || 0, 'items');
      return data;
    } catch (error) {
      console.error('[API] Error fetching products:', companySlug, error);
      throw error;
    }
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

  async getReviews(
    companySlug: string,
    itemSlug?: string,
    page = 1,
    limit = 10
  ): Promise<ReviewsResponse> {
    const params = new URLSearchParams({
      companySlug,
      page: String(page),
      limit: String(limit),
      ...(itemSlug && { itemSlug })
    });

    const res = await fetch(`${this.baseURL}/api/public/reviews?${params}`, {
      next: { revalidate: 30 } as any,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return { data: [], pagination: { page, limit, total: 0, totalPages: 0 }, averageRating: null };
    }
    return res.json();
  }

  async submitReview(data: {
    itemSlug: string;
    companySlug: string;
    rating: number;
    title?: string;
    comment?: string;
    reviewerName: string;
    reviewerEmail?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${this.baseURL}/api/public/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async getFAQs(companySlug: string, category?: string): Promise<{ data: FAQ[]; grouped: Record<string, FAQ[]> }> {
    const params = new URLSearchParams({
      companySlug,
      ...(category && { category })
    });

    const res = await fetch(`${this.baseURL}/api/public/faqs?${params}`, {
      next: { revalidate: 300 } as any,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return { data: [], grouped: {} };
    }
    return res.json();
  }

  async getBanners(companySlug: string, position?: string): Promise<{ data: Banner[] }> {
    const params = new URLSearchParams({
      companySlug,
      ...(position && { position })
    });

    const res = await fetch(`${this.baseURL}/api/public/banners?${params}`, {
      next: { revalidate: 60 } as any,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return { data: [] };
    }
    return res.json();
  }

  async getTestimonials(companySlug: string, featured = false): Promise<{ data: Testimonial[] }> {
    const params = new URLSearchParams({
      companySlug,
      ...(featured && { featured: 'true' })
    });

    const res = await fetch(`${this.baseURL}/api/public/testimonials?${params}`, {
      next: { revalidate: 300 } as any,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return { data: [] };
    }
    return res.json();
  }

  async getCategories(companySlug: string): Promise<{ data: Category[] }> {
    const params = new URLSearchParams({ companySlug });

    const res = await fetch(`${this.baseURL}/api/public/categories?${params}`, {
      next: { revalidate: 300 } as any,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return { data: [] };
    }
    return res.json();
  }

  async subscribeNewsletter(data: {
    email: string;
    name?: string;
    companySlug: string;
    source?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${this.baseURL}/api/public/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
}

export const api = new DashboardAPI();

