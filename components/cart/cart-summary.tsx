import React from "react";
import { ShoppingBag, Truck, Percent, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyRTL } from "@/lib/utils";
import { CartService } from "@/lib/services/cart-service";
import type { CartSummary } from "@/lib/types/cart";

interface CartSummaryProps {
  summary: CartSummary;
  itemCount: number;
  onCheckout: () => void;
  onClearCart: () => void;
  isLoading?: boolean;
}

export function CartSummaryComponent({
  summary,
  itemCount,
  onCheckout,
  onClearCart,
  isLoading = false,
}: CartSummaryProps) {
  const qualifiesForFreeShipping = summary.shipping === 0;
  const hasDiscount = summary.discount > 0;

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          خلاصه سفارش
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Item Count */}
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600 font-medium">تعداد آیتم‌ها</span>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {itemCount} آیتم
          </Badge>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600 font-medium">مجموع</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrencyRTL(summary.subtotal)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600 font-medium">مالیات (۱۰٪)</span>
          <span className="text-gray-900">
            {formatCurrencyRTL(summary.tax)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 font-medium">هزینه ارسال</span>
          </div>
          <div className="text-right">
            {qualifiesForFreeShipping ? (
              <Badge variant="default" className="bg-green-500 text-white">
                رایگان
              </Badge>
            ) : (
              <span className="text-gray-900">
                {formatCurrencyRTL(summary.shipping)}
              </span>
            )}
          </div>
        </div>

        {/* Discount */}
        {hasDiscount && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">تخفیف</span>
            </div>
            <span className="text-green-600 font-semibold">ندارید</span>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between py-4 border-t-2 border-gray-300">
          <span className="text-xl font-bold text-gray-900">مجموع کل</span>
          <span className="text-2xl font-bold text-indigo-600">
            {formatCurrencyRTL(summary.total)}
          </span>
        </div>

        {/* Free Shipping Message */}
        {!qualifiesForFreeShipping && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700 text-center">
              {CartService.getShippingMessage([])}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onCheckout}
            disabled={isLoading || itemCount === 0}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CreditCard className="h-5 w-5 ml-2" />
            ادامه خرید
          </Button>

          {itemCount > 0 && (
            <Button
              variant="outline"
              onClick={onClearCart}
              disabled={isLoading}
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-red-200"
            >
              پاک کردن سبد خرید
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
