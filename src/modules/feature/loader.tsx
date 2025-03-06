import { Skeleton } from "@/components/ui/skeleton";

export default function FeatureLoader() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-full mx-auto" />
      </div>
      <div className="space-y-8">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-48 mx-auto" />
      </div>
    </div>
  );
}
