"use client";

import {
  memo,
  useCallback,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { Button, buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { toast } from "sonner";
import { LANG } from "@/enums/global";
import { Copy, CopyCheck } from "lucide-react";

export interface CopyBtnProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  textToCopy: string;
  lang?: LANG;
}

function CopyBtn({
  className,
  textToCopy,
  disabled,
  lang = LANG.EN,
  ...props
}: CopyBtnProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const onClickHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(textToCopy);
        toast.info(
          lang === LANG.ID ? "Tersalin ke clipboard" : "Copied to clipboard"
        );
        setCopied(true);
      }
    },
    [textToCopy, lang, setCopied]
  );

  return (
    <Button
      {...props}
      className={cn(
        "hover:scale-[98.5%] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow",
        className,
        copied || !textToCopy || !navigator.clipboard || disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      )}
      onClick={onClickHandler}
      disabled={copied || !textToCopy || !navigator.clipboard || disabled}
    >
      {copied ? (
        <>
          <CopyCheck className="w-4 h-4" />
          <span>{lang === LANG.ID ? "Tersalin" : "Copied"}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{lang === LANG.ID ? "Salin" : "Copy"}</span>
        </>
      )}
    </Button>
  );
}

export default memo(CopyBtn);
