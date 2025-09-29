# Product Hooks

This directory contains all product-related React Query hooks following SOLID principles.

## 📁 File Structure

```
lib/hooks/products/
├── index.ts                 # Barrel exports
├── use-products-list.ts     # Fetch products list from real API
├── use-product-detail.ts    # Fetch single product from real API
└── README.md               # This file
```

## 🎯 SOLID Principles Applied

### Single Responsibility Principle (SRP)

- Each hook has one specific responsibility
- `useProductsList` - only handles fetching products list
- `useProductDetail` - only handles fetching single product
- `useCreateProduct` - only handles product creation

### Open/Closed Principle (OCP)

- Hooks are open for extension through options
- Easy to add new functionality without modifying existing code
- Service layer can be extended with new methods

### Liskov Substitution Principle (LSP)

- All hooks follow the same interface pattern
- Can be easily substituted or mocked for testing

### Interface Segregation Principle (ISP)

- Each hook only depends on what it needs
- No unnecessary dependencies or imports

### Dependency Inversion Principle (DIP)

- Hooks depend on abstractions (services)
- Not directly coupled to API implementation

## 📖 Usage Examples

### Fetch Products List

```tsx
import { useProductsList } from "@/lib/hooks/products";

function ProductsPage() {
  const { data, isLoading, error } = useProductsList({
    filters: {
      category_ids: 124, // Vascular Access category
      limit: 20,
      offset: 0,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Fetch Single Product

```tsx
import { useProductDetail } from "@/lib/hooks/products";

function ProductDetailPage({ productId }) {
  const { data: product, isLoading, error } = useProductDetail(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.short_description}</p>
      <p>
        Price: {product.price.price} {product.price_unit_title}
      </p>
    </div>
  );
}
```

## 🔧 Configuration

Each hook accepts an options object for customization:

- **onSuccess**: Callback for successful operations
- **onError**: Callback for error handling
- **enabled**: Control when the hook should run
- **filters**: Product filtering options

## 🎨 Benefits

1. **Maintainability**: Easy to find and modify specific functionality
2. **Testability**: Each hook can be tested in isolation
3. **Reusability**: Hooks can be used across different components
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Performance**: Optimized caching and query invalidation
6. **Error Handling**: Consistent error handling with toast notifications
7. **Extensibility**: Easy to add new features without breaking existing code
