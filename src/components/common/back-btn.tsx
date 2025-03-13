"use client";

import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { memo, type ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

function BackBtn({
  className,
  ...rest
}: Omit<ComponentProps<"button">, "onClick"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const router = useRouter();

  return (
    <Button
      {...rest}
      className={cn(
        "cursor-pointer hover:opacity-90 hover:scale-99 transition-all duration-300",
        className
      )}
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Go Back
    </Button>
  );
}

export default memo(BackBtn);
