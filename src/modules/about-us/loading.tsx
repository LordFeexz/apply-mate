import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-20 max-w-2xl mx-auto" />
      </div>

      <Skeleton className="h-64 w-full mb-8" />
    </div>
  );
}
