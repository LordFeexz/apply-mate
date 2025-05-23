import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { memo } from "react";
import { Separator } from "@/components/ui/separator";

function HistoryCardLoader() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full mt-2" />
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="mt-3 mb-1">
          <div className="flex justify-between mb-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export default memo(HistoryCardLoader);
