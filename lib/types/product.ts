// Product-related type definitions based on real API
// Single Responsibility: Only product types and interfaces

export interface ProductPrice {
  price: number;
  was_price: number;
  you_save_percent: number;
  you_save: number;
  tax: number | null;
  object_name: string;
}

export interface ProductCategory {
  id: number;
  title: string;
  description: string;
  module_id: number;
  parent_id: number;
  priority: number;
  date: string;
  member_id: number;
  media_id: number | null;
  thumbnail_media_id: number | null;
  seo: {
    title: string;
    description: string;
    keywords: string;
    url_keywords: string;
    canonical_url: string;
    redirect_url: string;
    page_url: string;
  };
  object_name: string;
}

export interface ProductSeo {
  title: string;
  description: string;
  keywords: string;
  url_keywords: string;
  canonical_url: string;
  redirect_url: string;
  page_url: string;
}

export interface Product {
  id: number;
  title: string;
  code: string;
  discount_price_type: string | null;
  price_unit_title: string;
  quantity: number;
  brand_id: number | null;
  deliverable: boolean;
  is_second_hand: boolean;
  unavailable_message: string;
  date: string;
  is_new: boolean;
  duration: number;
  tag_list: string[];
  visit_count: number;
  short_description: string;
  keyword: string;
  media_id: number | null;
  secondary_media_id: number | null;
  symbol_media_id: number | null;
  review_count: number;
  rate: number;
  like_count: number;
  rank: number;
  category: ProductCategory;
  seo: ProductSeo;
  price: ProductPrice;
  guarantee_price: ProductPrice;
  price_with_guarantee: ProductPrice;
  brand: unknown | null;
  media: unknown | null;
  secondary_media: unknown | null;
  symbol_media: unknown | null;
  object_name: string;
}

export interface ProductListResponse {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: unknown | null;
  data: Product[];
  paging: {
    offset: number;
    limit: number;
    total: number;
    returned: number;
    has_more: boolean;
  };
  sorting: Array<{
    expression: string;
    ascending: boolean;
  }>;
  meta: {
    title: string;
    description: string;
    term_of_use: string;
    copyright: string;
    version: string;
    contact: {
      name: string;
      url: string;
      email: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
}

export interface ProductFilters {
  category_ids?: number;
  limit?: number;
  offset?: number;
  search?: string;
}

export interface ProductApiError {
  message: string;
  code: string;
  field?: string;
}
