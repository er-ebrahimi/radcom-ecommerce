import { Suspense } from "react";
import { StorePage } from "@/components/store";
import { ErrorBoundary } from "@/components/error-boundary";
import { PageLoadingSkeleton } from "@/components/loading-skeletons/page-loading-skeleton";

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <StorePage />
      </Suspense>
    </ErrorBoundary>
  );
}
