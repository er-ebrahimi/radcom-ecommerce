import React from "react";
import { ProductCard } from "@/components/product-card";
import type { ProductsGridProps } from "@/lib/types/store-ui";

function ProductSkeleton() {
  return (
    <div className="group w-full max-w-sm mx-auto bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl flex flex-col h-full animate-pulse">
      {/* Product Image Section Skeleton */}
      <div className="relative h-56 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-4 left-4 z-10">
          <div className="h-9 w-9 bg-white/90 rounded-full shadow-lg"></div>
        </div>

        {/* New Badge Skeleton */}
        <div className="absolute top-4 right-4 z-10">
          <div className="h-6 w-16 bg-emerald-200 rounded-full"></div>
        </div>

        {/* Product Icon Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white/80 rounded-2xl shadow-lg">
            <div className="h-16 w-16 bg-indigo-200 rounded"></div>
          </div>
        </div>

        {/* Stock Status Skeleton */}
        <div className="absolute bottom-4 right-4">
          <div className="h-6 w-20 bg-green-200 rounded-full"></div>
        </div>
      </div>

      {/* Product Info Section Skeleton */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title and Category Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="flex items-center gap-2">
            <div className="h-6 bg-indigo-200 rounded-md w-20"></div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 h-16 flex-1">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Price Section Skeleton */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>

      {/* Action Button Skeleton */}
      <div className="px-6 pb-6 mt-auto">
        <div className="w-full h-12 bg-indigo-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ProductsGrid({ products, isLoading }: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
