import { Skeleton } from "@/components/ui/skeleton";
import HistoryCardLoader from "./components/HistoryCardLoader";

export default function HistoryLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[160px]" />
        </div>
      </div>

      <Skeleton className="h-5 w-48 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <HistoryCardLoader key={index} />
        ))}
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-80" />
      </div>
    </div>
  );
}
