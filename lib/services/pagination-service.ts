
import type { PaginationState, PaginationFilters } from '../types/pagination';

export class PaginationService {
  /**
   * Calculate pagination state from API response
   */
  static calculatePaginationState(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number
  ): PaginationState {
    // Ensure we have at least 1 page, even if totalItems is 0
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    
    
    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }

  /**
   * Convert page number to offset for API calls
   */
  static pageToOffset(page: number, itemsPerPage: number): number {
    return (page - 1) * itemsPerPage;
  }

  /**
   * Convert offset to page number
   */
  static offsetToPage(offset: number, itemsPerPage: number): number {
    return Math.floor(offset / itemsPerPage) + 1;
  }

  /**
   * Generate page numbers for pagination controls
   */
  static generatePageNumbers(
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number = 5
  ): number[] {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /**
   * Validate page number
   */
  static validatePage(page: number, totalPages: number): number {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  }

  /**
   * Create pagination filters for API
   */
  static createFilters(
    page: number,
    itemsPerPage: number,
    search?: string,
    categoryIds?: number
  ): PaginationFilters {
    return {
      page,
      limit: itemsPerPage,
      search,
      category_ids: categoryIds,
    };
  }

  /**
   * Update URL with pagination state
   */
  static updateUrl(page: number, search?: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    
    if (search) {
      url.searchParams.set('search', search);
    } else {
      url.searchParams.delete('search');
    }

    window.history.pushState({}, '', url.toString());
  }

  /**
   * Get pagination state from URL
   */
  static getStateFromUrl(): { page: number; search: string } {
    const url = new URL(window.location.href);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const search = url.searchParams.get('search') || '';

    return {
      page: isNaN(page) ? 1 : page,
      search,
    };
  }
}
