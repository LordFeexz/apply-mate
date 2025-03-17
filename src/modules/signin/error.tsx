"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import type { ErrorProps } from "@/interfaces/component";
import BackBtn from "@/components/common/back-btn";

export default function LoginError({ reset }: ErrorProps) {
  return (
    <section className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Login Error
          </CardTitle>
          <CardDescription className="text-center">
            We encountered an error while trying to load the login page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Button onClick={reset} variant="default">
              Try again
            </Button>
            <BackBtn />
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
