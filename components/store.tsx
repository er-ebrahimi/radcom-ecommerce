"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { useProductsPaginated } from "@/lib/hooks/products/use-products-paginated";
import { StatsSection } from "./store/stats";
import { StatsSkeleton } from "./store/stats/stats-skeleton";
import { ProductsSection } from "./store/products";

export function StorePage() {
  const { cart, setLoading } = useAppStore();
  const { products, pagination, isLoading, error, goToPage, refetch } =
    useProductsPaginated({
      categoryIds: 124,
      itemsPerPage: 2,
    });

  const handleRetry = () => {
    refetch();
  };

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <StatsSection
            productsCount={pagination.totalItems}
            cartItemsCount={cart.items.length}
            cartTotal={cart.total}
          />
        )}
        <ProductsSection
          products={products}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          paginationState={{
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            hasNextPage: pagination.hasNextPage,
            hasPreviousPage: pagination.hasPreviousPage,
          }}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}
