import BackBtn from "@/components/common/back-btn";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function TransactionDetailLoading() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">
          <Skeleton className="w-40 h-8" />
        </h1>
        <BackBtn />
      </div>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <Skeleton className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default memo(TransactionDetailLoading);
