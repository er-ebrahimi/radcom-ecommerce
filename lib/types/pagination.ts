
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationFilters {
  page: number;
  limit: number;
  search?: string;
  category_ids?: number;
}

export interface PaginationControls {
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export interface PaginationConfig {
  itemsPerPage: number;
  maxVisiblePages: number;
  showFirstLastButtons: boolean;
  showPreviousNextButtons: boolean;
}

export interface UsePaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}
