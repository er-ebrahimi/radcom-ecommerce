import React from "react";
import { Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIconComponent } from "@/components/cart/cart-icon";
import type { StoreHeaderProps } from "@/lib/types/store-ui";

export function StoreHeader({ user, onLogin }: StoreHeaderProps) {
  return (
    <header className="backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Package className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                فروشگاه تجهیزات پزشکی
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                بهترین تجهیزات پزشکی با کیفیت بالا
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CartIconComponent
              onCartClick={() => (window.location.href = "/cart")}
            />

            {user.id ? (
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    خوش آمدید، {user.name}!
                  </p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
            ) : (
              <Button
                onClick={onLogin}
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2"
              >
                <User className="h-4 w-4" />
                ورود
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
