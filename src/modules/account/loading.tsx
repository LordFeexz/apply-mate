import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";
import PointSectionLoader from "../shared/point-section-loader";

function AccountLoading() {
  return (
    <Card className="max-w-3xl w-full mx-auto">
      <CardHeader>
        <CardTitle as="h2">
          <Skeleton className="h-8 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <hgroup className="flex justify-between items-center">
            <h3 className="font-bold">
              <Skeleton className="w-full h-4" />
            </h3>
            <div className="flex justify-between items-center gap-2">
              <div className="flex justify-start items-center">
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          </hgroup>

          <PointSectionLoader />
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(AccountLoading);
