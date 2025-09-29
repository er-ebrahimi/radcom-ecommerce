import React from "react";
import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EmptyStateProps } from "@/lib/types/store-ui";

export function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <Card className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-xl">
      <CardContent>
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
          <Package className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-700">
          محصولی یافت نشد
        </h3>
        <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
          در حال حاضر محصولی در این دسته‌بندی موجود نیست. لطفاً بعداً دوباره
          بررسی کنید.
        </p>
        <Button
          onClick={onRetry}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          تلاش مجدد
        </Button>
      </CardContent>
    </Card>
  );
}
