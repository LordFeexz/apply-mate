"use client";

import BackBtn from "@/components/common/back-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ErrorProps } from "@/interfaces/component";
import { AlertCircle } from "lucide-react";
import { memo } from "react";

function TransactionDetailError({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="flex items-center mb-6">
        <BackBtn />
        <h1 className="text-2xl font-bold">Transaction Details</h1>
      </div>
      <Card>
        <CardContent className="py-10">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Error Loading Transaction
            </h2>
            <p className="text-muted-foreground mb-6">
              We couldn't load the transaction details. Please try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => reset()}>Try Again</Button>
              <BackBtn />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(TransactionDetailError);
