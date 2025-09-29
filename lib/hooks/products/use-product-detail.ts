
import { useQuery } from '@tanstack/react-query';
import { ProductApiService } from '../../services/product-api';
import { queryKeys } from '../../config/query-client';

interface UseProductDetailOptions {
  enabled?: boolean;
}

export function useProductDetail(id: number, options: UseProductDetailOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.products.detail(id.toString()),
    queryFn: () => ProductApiService.getProduct(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
