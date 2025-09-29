"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { useProductsPaginated } from "@/lib/hooks/products/use-products-paginated";
import { StoreHeader } from "./store/header";
import { StatsSection } from "./store/stats";
import { SearchSection } from "./store/search";
import { ProductsSection } from "./store/products";

export function StorePage() {
  const { user, cart, setUser, setLoading } = useAppStore();
  const {
    products,
    pagination,
    isLoading,
    error,
    searchQuery,
    handleSearch,
    goToPage,
    refetch,
  } = useProductsPaginated({
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
  const handleFilterClick = () => {
    // TODO: Implement filter modal/drawer
    console.log("Filter clicked");
  };

  const handleRetry = () => {
    refetch();
  };

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Show loading state if still loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <StoreHeader user={user} onLogin={handleLogin} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                در حال بارگذاری محصولات...
              </h3>
              <p className="text-gray-600 font-medium">لطفاً صبر کنید</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <StoreHeader user={user} onLogin={handleLogin} />

      <div className="container mx-auto px-4 py-8">
        <StatsSection
          productsCount={pagination.totalItems}
          cartItemsCount={cart.items.length}
          cartTotal={cart.total}
        />

        <SearchSection
          searchValue={searchQuery}
          onSearchChange={handleSearch}
          onFilterClick={handleFilterClick}
        />

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
