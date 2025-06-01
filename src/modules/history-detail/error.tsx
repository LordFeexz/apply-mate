"use client";

import BackBtn from "@/components/common/back-btn";
import { Button } from "@/components/ui/button";
import type { ErrorProps } from "@/interfaces/component";
import { AlertCircle, RefreshCw } from "lucide-react";
import { memo } from "react";

function HistoryDetailError({ reset }: ErrorProps) {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          We encountered an error while loading this generation history item.
          Please try again or return to the history page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <BackBtn />
        </div>
      </div>
    </section>
  );
}

export default memo(HistoryDetailError);
