import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/hooks/cart/use-cart";

interface CartIconProps {
  onCartClick: () => void;
  className?: string;
}

export function CartIconComponent({ onCartClick, className }: CartIconProps) {
  const { summary } = useCart();
  const itemCount = summary.itemCount;

  return (
    <Button
      variant="ghost"
      onClick={onCartClick}
      className={`relative p-2 hover:bg-gray-100 rounded-lg transition-colors hover:bg-gray-300 rounded-full ${className}`}
    >
      <ShoppingCart className="h-6 w-6 text-gray-700" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold p-0 text-white bg-red-500 text-center rounded-full text-small"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Button>
  );
}
