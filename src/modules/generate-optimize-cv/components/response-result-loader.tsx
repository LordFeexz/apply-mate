import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function ResponseResultLoader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-start p-2 items-center">
        <Skeleton className="w-40 h-6" />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 overflow-hidden border-2 shadow-lg hover:scale-101 hover:shadow-lg transition-all duration-300">
          <CardHeader className="p-4 bg-secondary/50 border-b flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[75svh] w-full" />
          </CardContent>
        </Card>

        {/* hyperlink Card loader */}
        <div className="space-y-6">
          <Card className="border-2 overflow-hidden shadow-lg hover:scale-102 hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-primary/10 border-b pb-3">
              <Skeleton className="w-12 h-4" />
              <Skeleton className="w-32 h-4" />
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="bg-muted/50 p-3 rounded-md">
                <Skeleton className="w-4 h-20" />
                <ul className="space-y-1 text-sm">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-20" />
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <Skeleton className="w-full h-8" />
            </CardFooter>
          </Card>

          {/* match keyword card loader */}
          <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-4 bg-secondary/50 border-b">
              <Skeleton className="w-20 h-4" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-20 px-3 py-1" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-4 bg-secondary/50 border-b">
              <Skeleton className="w-20 h-4" />
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-20 px-3 py-1" />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default memo(ResponseResultLoader);
