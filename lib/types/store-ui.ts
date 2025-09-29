
export interface StoreHeaderProps {
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
  onLogin: () => void;
}

export interface StatsSectionProps {
  productsCount: number;
  cartItemsCount: number;
  cartTotal: number;
}

export interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

import type { Product } from './product';

export interface ProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
  paginationState: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onPageChange: (page: number) => void;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
}

export interface EmptyStateProps {
  onRetry: () => void;
}
