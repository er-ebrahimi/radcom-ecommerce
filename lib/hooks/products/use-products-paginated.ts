
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { ProductApiService } from '../../services/product-api';
import { PaginationService } from '../../services/pagination-service';
import { queryKeys } from '../../config/query-client';
import type { ProductFilters } from '../../types/product';
import type { PaginationState } from '../../types/pagination';

interface UseProductsPaginatedOptions {
  categoryIds?: number;
  itemsPerPage?: number;
  initialPage?: number;
  search?: string;
  enabled?: boolean;
}

export function useProductsPaginated(options: UseProductsPaginatedOptions = {}) {
  const {
    categoryIds = 124,
    itemsPerPage = 20,
    initialPage = 1,
    search = '',
    enabled = true,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(search);

  const offset = PaginationService.pageToOffset(currentPage, itemsPerPage);
  const filters: ProductFilters = {
    category_ids: categoryIds,
    limit: itemsPerPage,
    offset: offset,
    search: searchQuery || undefined,
  };

  // Fetch products with React Query
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.products.list({ ...filters, search: searchQuery }),
    queryFn: async () => {
      try {
        const result = await ProductApiService.getProducts(filters);
        console.log('API call successful:', result);
        return result;
      } catch (error) {
        console.error('API call failed:', error);
        throw error;
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3, // Retry failed requests
  });

  // Calculate pagination state
  const totalItems = productsData?.paging?.total || productsData?.data?.length || 0;
  
  
  const paginationState: PaginationState = PaginationService.calculatePaginationState(
    currentPage,
    itemsPerPage,
    totalItems
  );

  // Navigation functions
  const goToPage = useCallback((page: number) => {
    const validatedPage = PaginationService.validatePage(page, paginationState.totalPages);
    setCurrentPage(validatedPage);
    PaginationService.updateUrl(validatedPage, searchQuery);
  }, [paginationState.totalPages, searchQuery]);

  const nextPage = useCallback(() => {
    if (paginationState.hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, paginationState.hasNextPage, goToPage]);

  const previousPage = useCallback(() => {
    if (paginationState.hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, paginationState.hasPreviousPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(paginationState.totalPages);
  }, [goToPage, paginationState.totalPages]);

  // Search function
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    PaginationService.updateUrl(1, query);
  }, []);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
    PaginationService.updateUrl(1);
  }, []);

  // Initialize from URL on mount
  useEffect(() => {
    const { page, search: urlSearch } = PaginationService.getStateFromUrl();
    setCurrentPage(page);
    setSearchQuery(urlSearch);
  }, []);

  // Generate page numbers for UI
  const pageNumbers = PaginationService.generatePageNumbers(
    currentPage,
    paginationState.totalPages,
    5
  );

  return {
    // Data
    products: productsData?.data || [],
    pagination: paginationState,
    pageNumbers,
    
    // Loading states
    isLoading,
    error,
    
    // Navigation
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    
    // Search
    searchQuery,
    handleSearch,
    clearSearch,
    
    // Utilities
    refetch,
  };
}
