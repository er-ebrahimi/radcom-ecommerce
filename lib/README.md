# Ecommerce App - Library Setup

This directory contains the core library files for the ecommerce application.

## 📁 File Structure

```
lib/
├── config/
│   ├── axios.ts          # Axios configuration with interceptors
│   └── query-client.ts   # React Query configuration and query keys
├── store.ts              # Zustand store for global state management
├── utils.ts              # Utility functions and helpers
├── toast.ts              # Toast notification utilities
├── rtl-utils.ts          # RTL layout utilities
├── services/             # API service layer
├── types/                # TypeScript type definitions
└── hooks/                # React Query hooks
    └── products/         # Product-related hooks
```

## 🚀 Technologies Used

### React Query (@tanstack/react-query)

- **Purpose**: Server state management and data fetching
- **Features**: Caching, background updates, optimistic updates
- **DevTools**: Available in development mode

### Zustand

- **Purpose**: Client state management
- **Features**: Simple API, TypeScript support, persistence
- **Stores**: User state, cart state, UI state

### Axios

- **Purpose**: HTTP client for API requests
- **Features**: Request/response interceptors, error handling, toast notifications
- **Configuration**: Base URL, timeout, auth headers

### Sonner (Toast Notifications)

- **Purpose**: User feedback for actions and errors
- **Features**: Success, error, warning, info toasts with rich colors
- **Integration**: Automatic error handling in Axios interceptors
- **Language**: Farsi/Persian error messages

### RTL Support

- **Purpose**: Right-to-left layout support for Persian/Farsi
- **Features**: RTL-aware CSS classes, utility functions
- **Integration**: Automatic RTL detection and styling

### Utils

- **Purpose**: Common utility functions and helpers
- **Features**: Type-safe utility functions, formatting, validation
- **Integration**: Used throughout the application for common operations

## 📖 Usage Examples

### Using Zustand Store

```tsx
import { useAppStore } from "@/lib/store";

function MyComponent() {
  const { user, cart, addToCart } = useAppStore();

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Cart items: {cart.items.length}</p>
    </div>
  );
}
```

### Using React Query Hooks

```tsx
import { useProducts } from "@/lib/hooks/use-products";

function ProductsList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Using Axios API

```tsx
import api from "@/lib/axios";

// GET request
const response = await api.get("/products");

// POST request
const newProduct = await api.post("/products", productData);
```

### Using Toast Notifications

```tsx
import { showToast } from "@/lib/toast";

// Basic toasts (in Farsi)
showToast.success("عملیات با موفقیت انجام شد!");
showToast.error("خطایی رخ داده است!");
showToast.warning("لطفاً ورودی خود را بررسی کنید");
showToast.info("پیام اطلاعاتی");

// Ecommerce-specific toasts (in Farsi)
showToast.addedToCart("نام محصول");
showToast.loginSuccess("جان دو");
showToast.orderPlaced("12345");
```

### Using RTL Utilities

```tsx
import { rtlUtils, rtlClasses } from "@/lib/rtl-utils";

// Dynamic RTL classes
const marginClass = rtlUtils.getMargin("left", "md");
const textAlignClass = rtlUtils.getTextAlign("left");

// Pre-defined RTL classes
<div className={rtlClasses.marginLeft}>RTL-aware content</div>;

// Check RTL direction
if (rtlUtils.isRTL()) {
  // RTL-specific logic
}
```

### Using Utility Functions

```tsx
import { cn, formatCurrency, debounce, isValidEmail } from "@/lib/utils";

// Merge Tailwind classes
const buttonClass = cn("px-4 py-2", isActive && "bg-blue-500");

// Format currency
const price = formatCurrency(99.99, "USD"); // $99.99
const priceRTL = formatCurrencyRTL(1000000, "IRR"); // ۱,۰۰۰,۰۰۰ ریال

// Debounce function calls
const debouncedSearch = debounce((query: string) => {
  // Search logic
}, 300);

// Validate inputs
const isValid = isValidEmail("user@example.com"); // true
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=https://api.radsup.com/v1/product/fa
NEXT_PUBLIC_API_KEY=aSd24uLqVCu4VX9ahhEnX2p3ZLkJnEBp
```

### Query Client Settings

- **Stale Time**: 5 minutes
- **Cache Time**: 10 minutes
- **Retry**: 3 attempts for server errors
- **Refetch**: On window focus disabled, on reconnect enabled

### Store Persistence

- **User data**: Persisted in localStorage
- **Cart data**: Persisted in localStorage
- **UI theme**: Persisted in localStorage
- **Loading states**: Not persisted (session only)

## 🎯 Best Practices

1. **Query Keys**: Use the `queryKeys` factory for consistent key management
2. **Error Handling**: Implement proper error boundaries and fallbacks
3. **Loading States**: Use the global loading state from Zustand
4. **Type Safety**: All hooks and stores are fully typed
5. **Separation of Concerns**: Keep API logic in hooks, state in stores
