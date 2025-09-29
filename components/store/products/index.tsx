import React from "react";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductsGrid } from "./products-grid";
import { EmptyState } from "./empty-state";
import { PaginationControls } from "../pagination";
import type { ProductsSectionProps } from "@/lib/types/store-ui";

export function ProductsSection({
  products,
  isLoading,
  error,
  onRetry,
  paginationState,
  onPageChange,
}: ProductsSectionProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
        <div className="w-96 text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-xl p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="text-white text-3xl">⚠️</div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-red-600">
            خطا در بارگذاری محصولات
          </h3>
          <p className="text-gray-600 mb-6 font-medium">{error.message}</p>
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              محصولات دسته‌بندی دسترسی عروقی
            </h2>
            <p className="text-gray-600 font-medium text-lg">
              تجهیزات تخصصی برای دسترسی عروقی و درمان‌های پزشکی
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="text-sm px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200 font-semibold rounded-full"
        >
          {products.length} محصول
        </Badge>
      </div>

      {isLoading ? (
        <ProductsGrid products={[]} isLoading={true} />
      ) : products.length > 0 ? (
        <>
          <ProductsGrid products={products} isLoading={false} />
          <PaginationControls
            currentPage={paginationState.currentPage}
            totalPages={paginationState.totalPages}
            hasNextPage={paginationState.hasNextPage}
            hasPreviousPage={paginationState.hasPreviousPage}
            onPageChange={onPageChange}
            isLoading={false}
          />
        </>
      ) : (
        <EmptyState onRetry={onRetry} />
      )}
    </div>
  );
}
