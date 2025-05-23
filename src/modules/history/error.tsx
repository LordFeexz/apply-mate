"use client";

import BackBtn from "@/components/common/back-btn";
import { Button } from "@/components/ui/button";
import type { ErrorProps } from "@/interfaces/component";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { memo } from "react";

function TransactionError({ reset }: ErrorProps) {
  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
      <p className="text-muted-foreground mb-8">
        We encountered an error while loading your history.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <BackBtn />
      </div>
    </div>
  );
}

export default memo(TransactionError);
