import { useState, useEffect, useCallback } from 'react';
import { PaginationService } from '../../services/pagination-service';
import type { PaginationState, UsePaginationOptions } from '../../types/pagination';

export function usePagination(options: UsePaginationOptions = {}) {
  const {
    initialPage = 1,
    itemsPerPage = 20,
    totalItems = 0,
    onPageChange,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginationState: PaginationState = PaginationService.calculatePaginationState(
    currentPage,
    itemsPerPage,
    totalItems
  );

  const goToPage = useCallback((page: number) => {
    const validatedPage = PaginationService.validatePage(page, paginationState.totalPages);
    setCurrentPage(validatedPage);
    onPageChange?.(validatedPage);
  }, [paginationState.totalPages, onPageChange]);

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

  useEffect(() => {
    if (currentPage > paginationState.totalPages && paginationState.totalPages > 0) {
      goToPage(paginationState.totalPages);
    }
  }, [currentPage, paginationState.totalPages, goToPage]);

  const pageNumbers = PaginationService.generatePageNumbers(
    currentPage,
    paginationState.totalPages,
    5
  );

  return {
    ...paginationState,
    pageNumbers,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
  };
}
