import Link from "next/link";
import { Home, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            صفحه مورد نظر یافت نشد
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد
          </p>
          <p className="text-gray-500">
            ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 bg-transparent"
            >
              <Link href="/" className="flex items-center gap-2 ">
                <Search className="h-4 w-4" />
                جستجو در محصولات
              </Link>
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-indigo-100">
          <p className="text-sm text-gray-600">
            اگر فکر می‌کنید این یک خطا است، لطفاً با پشتیبانی تماس بگیرید
          </p>
        </div>
      </div>
    </div>
  );
}
