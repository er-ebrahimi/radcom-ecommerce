"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { useProductsPaginated } from "@/lib/hooks/products/use-products-paginated";
import { StoreHeader } from "./store/header";
import { StatsSection } from "./store/stats";
import { StatsSkeleton } from "./store/stats/stats-skeleton";
import { SearchSection } from "./store/search";
import { ProductsSection } from "./store/products";

export function StorePage() {
  const { user, cart, setUser, setLoading } = useAppStore();
  const { products, pagination, isLoading, error, goToPage, refetch } =
    useProductsPaginated({
      categoryIds: 124,
      itemsPerPage: 2,
    });
  const handleLogin = () => {
    setUser({
      id: "1",
      email: "user@example.com",
      name: "عرفان",
    });
  };

  const handleRetry = () => {
    refetch();
  };

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <StoreHeader user={user} onLogin={handleLogin} />

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
