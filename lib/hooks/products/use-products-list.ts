// Hook for fetching products list from real API
// Single Responsibility: Only handle products list fetching

import { useQuery } from '@tanstack/react-query';
import { ProductApiService } from '../../services/product-api';
import { queryKeys } from '../../config/query-client';
import type { ProductFilters } from '../../types/product';

interface UseProductsListOptions {
  filters?: ProductFilters;
  enabled?: boolean;
}

export function useProductsList(options: UseProductsListOptions = {}) {
  const { filters, enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.products.list(filters as Record<string, unknown> || {}),
    queryFn: () => ProductApiService.getProducts(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
