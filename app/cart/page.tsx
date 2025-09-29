import { Suspense } from "react";
import { CartPage } from "@/components/cart/cart-page";
import { ErrorBoundary } from "@/components/error-boundary";
import { PageLoadingSkeleton } from "@/components/loading-skeletons/page-loading-skeleton";

export default function Cart() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <CartPage />
      </Suspense>
    </ErrorBoundary>
  );
}
