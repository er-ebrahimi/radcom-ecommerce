
import { useCallback } from 'react';
import { useAppStore } from '../../store';
import { CartService } from '../../services/cart-service';
import type { Product } from '../../types';

export function useCart() {
  const { cart, setLoading } = useAppStore();

  // Add item to cart
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setLoading(true);
    
    try {
      const existingItem = CartService.findCartItem(cart.items, product.id);
      
      if (existingItem) {
        // Update existing item quantity directly
        const updatedItems = cart.items.map(cartItem =>
          cartItem.productId === product.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
        const summary = CartService.calculateSummary(updatedItems);
        
        useAppStore.setState({
          cart: {
            items: updatedItems,
            total: summary.total,
          }
        });
      } else {
        // Add new item
        const newItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.title,
          price: product.price.price,
          quantity,
          image: undefined, // API doesn't provide media URLs
          maxQuantity: product.quantity,
          isAvailable: product.deliverable,
        };

        const updatedItems = [...cart.items, newItem];
        const summary = CartService.calculateSummary(updatedItems);
        
        useAppStore.setState({
          cart: {
            items: updatedItems,
            total: summary.total,
          }
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  }, [cart.items, setLoading]);

  // Remove item from cart
  const removeItem = useCallback((productId: number) => {
    setLoading(true);
    
    try {
      const updatedItems = cart.items.filter(item => item.productId !== productId);
      const summary = CartService.calculateSummary(updatedItems);
      
      useAppStore.setState({
        cart: {
          items: updatedItems,
          total: summary.total,
        }
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  }, [cart.items, setLoading]);

  // Update item quantity
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setLoading(true);
    
    try {
      const updatedItems = cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 999) }
          : item
      );
      
      const summary = CartService.calculateSummary(updatedItems);
      
      useAppStore.setState({
        cart: {
          items: updatedItems,
          total: summary.total,
        }
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setLoading(false);
    }
  }, [cart.items, removeItem, setLoading]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setLoading(true);
    
    try {
      useAppStore.setState({
        cart: {
          items: [],
          total: 0,
        }
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // Get cart summary
  const getSummary = useCallback(() => {
    return CartService.calculateSummary(cart.items);
  }, [cart.items]);

  // Check if product is in cart
  const isInCart = useCallback((productId: number) => {
    return CartService.isInCart(cart.items, productId);
  }, [cart.items]);

  // Get item quantity in cart
  const getItemQuantity = useCallback((productId: number) => {
    const item = CartService.findCartItem(cart.items, productId);
    return item?.quantity || 0;
  }, [cart.items]);

  // Validate cart
  const validateCart = useCallback(() => {
    return CartService.validateCart(cart.items);
  }, [cart.items]);

  return {
    // State
    items: cart.items,
    total: cart.total,
    summary: getSummary(),
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    
    // Utilities
    isInCart,
    getItemQuantity,
    validateCart,
    getSummary,
  };
}
