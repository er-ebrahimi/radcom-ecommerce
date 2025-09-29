import React from "react";
import { Package, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsSectionProps } from "@/lib/types/store-ui";

export function StatsSection({
  productsCount,
  cartItemsCount,
  cartTotal,
}: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-blue-100">
            تعداد محصولات
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Package className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">
            {productsCount}
          </div>
          <p className="text-sm text-blue-100 font-medium">محصول موجود</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-green-100">
            آیتم‌های سبد خرید
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">
            {cartItemsCount}
          </div>
          <p className="text-sm text-green-100 font-medium">آیتم در سبد</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-purple-100">
            مجموع سبد
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">
            {cartTotal > 0
              ? `${cartTotal.toLocaleString("fa-IR")} تومان`
              : "0 تومان"}
          </div>
          <p className="text-sm text-purple-100 font-medium">مجموع خرید</p>
        </CardContent>
      </Card>
    </div>
  );
}
