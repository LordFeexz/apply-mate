import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function ResponseCardLoader() {
  return (
    <div className="p-6 border-2 overflow-hidden max-w-2xl mx-auto rounded-xl hover:scale-102 shadow hover:shadow-lg transition-all duration-300 cursor-wait">
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="space-x-4 opacity-50">
          <div className="flex justify-end items-center">
            <Skeleton className="w-32 h-6" />
          </div>
          <Skeleton className="h-[75svh] w-full" />
        </div>
      </div>
    </div>
  );
}

export default memo(ResponseCardLoader);
