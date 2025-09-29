
import type { Product } from './product';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  maxQuantity?: number;
  isAvailable?: boolean;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartState {
  items: CartItem[];
  summary: CartSummary;
  isOpen: boolean;
  lastUpdated: string;
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  calculateSummary: () => CartSummary;
}

export interface UseCartOptions {
  autoCalculate?: boolean;
  persistCart?: boolean;
}

export interface CartValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
