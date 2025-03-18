import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Coins, CreditCard, RefreshCw } from "lucide-react";
import { memo } from "react";

function PointSectionLoader() {
  return (
    <Card className="container border-none mx-auto max-w-7xl px-4 mt-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Coins className="h-5 w-5" />
          <Skeleton className="h-5 w-12" />
        </CardTitle>
        <CardDescription className="w-1/2">
          <Skeleton className="w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {" "}
              <Skeleton className="w-full" />
            </h3>
            <Badge variant="default" className="w-6 h-4">
              {" "}
              <Skeleton className="w-full" />
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </h3>
            </div>
            <Skeleton className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(PointSectionLoader);
