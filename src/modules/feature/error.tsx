"use client";

import { Button } from "@/components/ui/button";
import type { ErrorProps } from "@/interfaces/component";

export default function FeatureError({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto max-w-7xl text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">
        We apologize for the inconvenience. Please try again later.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
