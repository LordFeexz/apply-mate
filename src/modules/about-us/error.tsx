"use client";

import { Button } from "@/components/ui/button";
import type { ErrorProps } from "@/interfaces/component";

export default function AboutError({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto max-w-3xl text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">
        We couldn't load the About page. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
