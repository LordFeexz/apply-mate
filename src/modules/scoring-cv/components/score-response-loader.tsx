import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function ScoreResponseLoader() {
  return (
    <section className="space-y-6">
      {/* match score card loader */}
      <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
        <CardHeader className="p-4 bg-secondary/50 border-b flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="antialiased">
              <div className="flex justify-between mb-2 text-sm">
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>

            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </Card>

      {/* explanation card loader */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 overflow-hidden col-span-2 hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
          <CardHeader className="p-4 bg-secondary/50 border-b">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent className="p-6">
            <Skeleton className="h-[75svh] w-full" />
          </CardContent>
        </Card>
      </div>

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

      {/* missing keyword card loader */}
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
    </section>
  );
}

export default memo(ScoreResponseLoader);
