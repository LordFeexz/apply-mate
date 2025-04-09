import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function Loading() {
  return (
    <section className="container mx-auto max-w-4xl py-8">
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />

      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </section>
  );
}

export default memo(Loading);
