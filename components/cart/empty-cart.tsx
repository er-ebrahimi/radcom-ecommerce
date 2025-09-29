import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export function EmptyCartComponent({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="py-12 px-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>

          <h3 className="text-2xl font-bold mb-3 text-gray-700">
            سبد خرید شما خالی است
          </h3>

          <p className="text-gray-500 mb-8 text-lg">
            محصولات مورد نظر خود را انتخاب کنید و به سبد خرید اضافه کنید
          </p>

          <Button
            onClick={onContinueShopping}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            ادامه خرید
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
