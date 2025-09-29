import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the store interface
interface AppState {
  // User state
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
  
  // Cart state
  cart: {
    items: Array<{
      id: string;
      productId: number;
      name: string;
      price: number;
      quantity: number;
      image?: string;
      maxQuantity?: number;
      isAvailable?: boolean;
    }>;
    total: number;
  };
  
  // UI state
  ui: {
    isLoading: boolean;
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  };
  
  // Actions
  setUser: (user: Partial<AppState['user']>) => void;
  clearUser: () => void;
  
  addToCart: (item: Omit<AppState['cart']['items'][0], 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
}

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: {
        id: null,
        email: null,
        name: null,
      },
      
      cart: {
        items: [],
        total: 0,
      },
      
      ui: {
        isLoading: false,
        theme: 'light',
        sidebarOpen: false,
      },
      
      // User actions
      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      clearUser: () => set({ user: { id: null, email: null, name: null } }),
      
      // Cart actions
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.items.find(cartItem => cartItem.productId === item.productId);
        
        if (existingItem) {
          const updatedItems = state.cart.items.map(cartItem =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          const total = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
          return { cart: { items: updatedItems, total } };
        } else {
          const newItem = { ...item, quantity: 1 };
          const updatedItems = [...state.cart.items, newItem];
          const total = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
          return { cart: { items: updatedItems, total } };
        }
      }),
      
      removeFromCart: (productId) => set((state) => {
        const updatedItems = state.cart.items.filter(item => item.productId !== productId);
        const total = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
        return { cart: { items: updatedItems, total } };
      }),
      
      updateCartItemQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          const updatedItems = state.cart.items.filter(item => item.productId !== productId);
          const total = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
          return { cart: { items: updatedItems, total } };
        }
        
        const updatedItems = state.cart.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        const total = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
        return { cart: { items: updatedItems, total } };
      }),
      
      clearCart: () => set({ cart: { items: [], total: 0 } }),
      
      // UI actions
      setLoading: (loading) => set((state) => ({ ui: { ...state.ui, isLoading: loading } })),
      setTheme: (theme) => set((state) => ({ ui: { ...state.ui, theme } })),
      toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
    }),
    {
      name: 'ecommerce-store', // unique name for localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        cart: state.cart, 
        ui: { theme: state.ui.theme } // only persist theme from UI state
      }),
    }
  )
);
