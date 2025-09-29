
import type { CartItem, CartSummary, CartValidationResult } from '../types/cart';

export class CartService {
  /**
   * Calculate cart summary with taxes, shipping, and discounts
   */
  static calculateSummary(items: CartItem[]): CartSummary {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Tax calculation (10% in Iran)
    const tax = subtotal * 0.1;
    
    // Shipping calculation (free over 500,000 Toman)
    const shipping = subtotal >= 500000 ? 0 : 30000;
    
    // Discount calculation (5% for orders over 1,000,000 Toman)
    const discount = subtotal >= 1000000 ? subtotal * 0.05 : 0;
    
    const total = subtotal + tax + shipping - discount;

    return {
      subtotal,
      tax,
      shipping,
      discount,
      total,
      itemCount,
    };
  }

  /**
   * Validate cart items
   */
  static validateCart(items: CartItem[]): CartValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (items.length === 0) {
      errors.push('سبد خرید خالی است');
    }

    items.forEach((item) => {
      if (item.quantity <= 0) {
        errors.push(`تعداد محصول "${item.name}" نامعتبر است`);
      }

      if (item.quantity > (item.maxQuantity || 999)) {
        errors.push(`تعداد محصول "${item.name}" بیش از حد مجاز است`);
      }

      if (!item.isAvailable) {
        warnings.push(`محصول "${item.name}" در حال حاضر موجود نیست`);
      }

      if (item.price <= 0) {
        errors.push(`قیمت محصول "${item.name}" نامعتبر است`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Format currency for display
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Get cart item by product ID
   */
  static findCartItem(items: CartItem[], productId: number): CartItem | undefined {
    return items.find(item => item.productId === productId);
  }

  /**
   * Check if product is in cart
   */
  static isInCart(items: CartItem[], productId: number): boolean {
    return items.some(item => item.productId === productId);
  }

  /**
   * Get total quantity of items in cart
   */
  static getTotalQuantity(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get unique product count
   */
  static getUniqueProductCount(items: CartItem[]): number {
    return items.length;
  }

  /**
   * Calculate savings from discounts
   */
  static calculateSavings(items: CartItem[]): number {
    const summary = this.calculateSummary(items);
    return summary.discount;
  }

  /**
   * Check if cart qualifies for free shipping
   */
  static qualifiesForFreeShipping(items: CartItem[]): boolean {
    const summary = this.calculateSummary(items);
    return summary.subtotal >= 500000;
  }

  /**
   * Get shipping message
   */
  static getShippingMessage(items: CartItem[]): string {
    const summary = this.calculateSummary(items);
    const remaining = 500000 - summary.subtotal;
    
    if (summary.shipping === 0) {
      return 'ارسال رایگان';
    }
    
    return `برای ارسال رایگان ${this.formatCurrency(remaining)} دیگر خرید کنید`;
  }
}
