import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function TransactionLoader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2" className="text-xl font-semibold mb-6">
          <Skeleton className="h-8 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 min-h-[50svh]">
        <div className="flex justify-center items-center">
          <Skeleton className="h-8 w-32" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full mt-4" />
      </CardFooter>
    </Card>
  );
}

export default memo(TransactionLoader);
