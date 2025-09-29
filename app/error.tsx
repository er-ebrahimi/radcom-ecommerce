"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            خطای غیرمنتظره رخ داده است
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            متأسفانه مشکلی در سیستم رخ داده است
          </p>
          <p className="text-gray-500 text-sm">
            لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="h-4 w-4 ml-2" />
              تلاش مجدد
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-red-100">
          <p className="text-sm text-gray-600">
            اگر مشکل ادامه دارد، لطفاً با پشتیبانی تماس بگیرید
          </p>
        </div>
      </div>
    </div>
  );
}
