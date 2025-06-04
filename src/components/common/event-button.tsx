"use client";

import { Button, buttonVariants } from "../ui/button";
import {
  memo,
  useCallback,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { analytics } from "@/libs/firebase";
import type { EVENT_NAME } from "@/constants/event";
import { submitEvent } from "@/helpers/event";

export interface EventButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  args: Record<string, unknown>;
  eventName: EVENT_NAME;
}

function EventButton({
  args = {},
  eventName,
  onClick,
  ...props
}: EventButtonProps) {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      submitEvent(eventName, args);
      typeof onClick === "function" && onClick(e);
    },
    [eventName, onClick, args, analytics]
  );

  return <Button onClick={onClickHandler} {...props} />;
}

export default memo(EventButton);
