"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemComponent } from "./cart-item";
import { CartSummaryComponent } from "./cart-summary";
import { EmptyCartComponent } from "./empty-cart";
import { useCart } from "@/lib/hooks/cart/use-cart";

export function CartPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    items,
    summary,
    updateQuantity,
    removeItem,
    clearCart,
    validateCart,
  } = useCart();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    const validation = validateCart();
    if (validation.isValid) {
      // TODO: Navigate to checkout page
      console.log("Proceeding to checkout...");
    } else {
      console.error("Cart validation failed:", validation.errors);
    }
  };

  const handleClearCart = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید سبد خرید را پاک کنید؟")) {
      clearCart();
    }
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            در حال بارگذاری سبد خرید...
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <EmptyCartComponent onContinueShopping={handleContinueShopping} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                سبد خرید شما
              </h1>
              <p className="text-gray-600 font-medium">
                {items.length} محصول در سبد خرید شما
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
          >
            <ArrowRight className="h-4 w-4" />
            ادامه خرید
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">
                  محصولات انتخابی
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummaryComponent
              summary={summary}
              itemCount={items.length}
              onCheckout={handleCheckout}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
