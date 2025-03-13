"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import type { VariantProps } from "class-variance-authority";
import {
  memo,
  useCallback,
  useTransition,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { toast } from "sonner";

export interface DownloadResultBtnProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  md: string;
}

function DownloadResultBtn({
  className,
  disabled,
  md,
  ...rest
}: DownloadResultBtnProps) {
  const [pending, startTransition] = useTransition();
  const onClickHandler: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startTransition(async () => {
        const response = await fetch("/api/md-to-pdf", {
          method: "POST",
          body: JSON.stringify({ md }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast.error("Failed to download result");
          return;
        }

        if (response.body) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "optimized-cv.pdf");
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
          toast.success("Downloaded successfully");
        }
      });
    },
    [md]
  );

  return (
    <Button
      {...rest}
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      className={cn(
        "cursor-pointer hover:scale-99 hover:shadow shadow-lg transition-all duration-300",
        className
      )}
      onClick={onClickHandler}
    >
      Download
    </Button>
  );
}

export default memo(DownloadResultBtn);
