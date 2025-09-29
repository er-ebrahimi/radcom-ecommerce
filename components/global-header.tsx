"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIconComponent } from "@/components/cart/cart-icon";
import { useAppStore } from "@/lib/store";

export function GlobalHeader() {
  const { user, setUser } = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogin = () => {
    setUser({
      id: "1",
      email: "user@example.com",
      name: "عرفان",
    });
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
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
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <CartIconComponent onCartClick={() => router.push("/cart")} />

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
                onClick={handleLogin}
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
