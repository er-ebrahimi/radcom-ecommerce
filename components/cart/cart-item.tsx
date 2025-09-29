import React from "react";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyRTL } from "@/lib/utils";
import type { CartItem } from "@/lib/types/cart";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  isLoading?: boolean;
}

export function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
  isLoading = false,
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= (item.maxQuantity || 999)) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(item.quantity - 1);
  };

  const handleRemove = () => {
    onRemove(item.productId);
  };

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="h-8 w-8 text-gray-400" />
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-indigo-600">
                {formatCurrencyRTL(item.price)}
              </span>
              {!item.isAvailable && (
                <Badge variant="destructive" className="text-xs">
                  ناموجود
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecrement}
                  disabled={isLoading || item.quantity <= 1}
                  className="h-8 w-8 p-0 rounded-full bg-gray-100"
                >
                  <Minus className="h-4 w-4 text-gray-500" />
                </Button>

                <span className="w-12 text-center font-semibold text-gray-900">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleIncrement}
                  disabled={
                    isLoading || item.quantity >= (item.maxQuantity || 999)
                  }
                  className="h-8 w-8 p-0 rounded-full bg-gray-100"
                >
                  <Plus className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrencyRTL(item.price * item.quantity)}
                </div>
                {item.quantity > 1 && (
                  <div className="text-sm text-gray-500">
                    {item.quantity} × {formatCurrencyRTL(item.price)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isLoading}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
