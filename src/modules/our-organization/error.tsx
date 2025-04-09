"use client";

import { Button } from "@/components/ui/button";
import type { ErrorProps } from "@/interfaces/component";

export default function OurOrganizationError({ reset }: ErrorProps) {
  return (
    <section className="container mx-auto max-w-4xl py-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Error loading Our Company page
      </h2>
      <p className="mb-4">
        We're sorry, but there was an error loading the Our Company page. Please
        try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
