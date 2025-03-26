import { CardHeader, Card, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PointSectionLoader from "../shared/point-section-loader";
import { memo } from "react";

function BillingPageLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-16">
        <PointSectionLoader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(BillingPageLoading);
