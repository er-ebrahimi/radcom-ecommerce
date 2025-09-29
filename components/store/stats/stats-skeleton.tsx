import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Products Count Skeleton */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 bg-white/20 rounded"></div>
          <div className="p-2 bg-white/20 rounded-lg">
            <div className="h-5 w-5 bg-white/30 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-white/30 rounded mb-2"></div>
          <div className="h-4 w-20 bg-white/20 rounded"></div>
        </CardContent>
      </Card>

      {/* Cart Items Skeleton */}
      <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-28 bg-white/20 rounded"></div>
          <div className="p-2 bg-white/20 rounded-lg">
            <div className="h-5 w-5 bg-white/30 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-12 bg-white/30 rounded mb-2"></div>
          <div className="h-4 w-16 bg-white/20 rounded"></div>
        </CardContent>
      </Card>

      {/* Cart Total Skeleton */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-20 bg-white/20 rounded"></div>
          <div className="p-2 bg-white/20 rounded-lg">
            <div className="h-5 w-5 bg-white/30 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-24 bg-white/30 rounded mb-2"></div>
          <div className="h-4 w-18 bg-white/20 rounded"></div>
        </CardContent>
      </Card>
    </div>
  );
}
