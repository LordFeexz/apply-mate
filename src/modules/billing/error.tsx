"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ErrorProps } from "@/interfaces/component";

export default function BillingError({ reset }: ErrorProps) {
  return (
    <Card className="container mx-auto max-w-7xl text-center">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-4">
          Something went wrong!
        </CardTitle>
        <CardDescription className="mb-4">
          We apologize for the inconvenience. Please try again later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => reset()}>Try again</Button>
      </CardContent>
    </Card>
  );
}
