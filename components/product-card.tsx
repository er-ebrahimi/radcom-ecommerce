"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { showToast } from "@/lib/toast";
import { formatCurrencyRTL } from "@/lib/utils";
import { ShoppingCart, Star, Eye, Heart, Package } from "lucide-react";
import type { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useAppStore();

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price.price,
      image: undefined, // API doesn't provide images in this response
    });
    showToast.addedToCart(product.title);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "قیمت تماس بگیرید";
    return formatCurrencyRTL(price, "IRR");
  };

  const isInStock = product.quantity > 0 && product.deliverable;

  return (
    <Card className="group w-full max-w-sm mx-auto bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl flex flex-col h-full">
      {/* Product Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Wishlist Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
        </div>

        {/* New Badge */}
        {product.is_new && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-lg px-3 py-1 text-xs font-semibold">
              جدید
            </Badge>
          </div>
        )}

        {/* Product Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white/80 rounded-2xl shadow-lg">
            <Package className="h-16 w-16 text-indigo-600" />
          </div>
        </div>

        {/* Stock Status Overlay */}
        <div className="absolute bottom-4 right-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isInStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isInStock ? "موجود" : "ناموجود"}
          </div>
        </div>
      </div>

      {/* Product Info Section - Flexible */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title and Category */}
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-md">
              {product.category.title}
            </span>
          </div>
        </div>

        {/* Description - Fixed height */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed h-16 flex-1">
          {product.short_description}
        </p>

        {/* Price Section */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price.price)}
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              {product.price_unit_title}
            </div>
          </div>

          {/* Discount */}
          {product.price.you_save > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price.was_price)}
              </span>
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-xs px-2 py-1">
                {product.price.you_save_percent}% تخفیف
              </Badge>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Eye className="h-4 w-4" />
            <span>{product.visit_count}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{product.rate.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Action Button - Fixed at bottom */}
      <div className="px-6 pb-6 mt-auto">
        <Button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={`w-full h-12 font-semibold text-base rounded-xl transition-all duration-300 ${
            isInStock
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isInStock ? (
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              افزودن به سبد خرید
            </div>
          ) : (
            "ناموجود"
          )}
        </Button>
      </div>
    </Card>
  );
}
