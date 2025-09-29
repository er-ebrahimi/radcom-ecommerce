import api from '../config/axios';
import { API_ENDPOINTS } from '../constants/api';
import type { 
  Product, 
  ProductFilters,
  ProductListResponse 
} from '../types/product';

export class ProductApiService {
  /**
   * Get all products with optional filters
   */
  static async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    
    if (filters?.category_ids) params.append('category_ids', filters.category_ids.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`${API_ENDPOINTS.PRODUCTS.BASE}?${params.toString()}`);
    return response.data;
  }

  /**
   * Get a single product by ID
   */
  static async getProduct(id: number): Promise<Product> {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
    return response.data;
  }
}
