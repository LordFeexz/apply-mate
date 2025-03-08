"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import type { ErrorProps } from "@/interfaces/component";
import { sora } from "@/libs/font";
import { cn } from "@/libs/utils";

export default function GlobalError({ reset }: ErrorProps) {
  return (
    <html>
      <body
        className={cn(
          sora.className,
          "scroll-smooth min-h-svh",
          "text-neutral-900 dark:text-neutral-300 antialiased"
        )}
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but an unexpected error occurred. Our team has been
              notified and we're working to fix it.
            </p>
            <div className="space-y-4">
              <Button onClick={reset} className="w-full">
                Try again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
