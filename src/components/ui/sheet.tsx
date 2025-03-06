"use client";

import { memo, type ComponentProps } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/libs/utils";

const Sheet = memo(
  ({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) => (
    <SheetPrimitive.Root data-slot="sheet" {...props} />
  )
);
Sheet.displayName = SheetPrimitive.Root.displayName;

const SheetTrigger = memo(
  ({ ...props }: ComponentProps<typeof SheetPrimitive.Trigger>) => (
    <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
  )
);
SheetTrigger.displayName = SheetPrimitive.Trigger.displayName;

const SheetClose = memo(
  ({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) => (
    <SheetPrimitive.Close data-slot="sheet-close" {...props} />
  )
);
SheetClose.displayName = SheetPrimitive.Close.displayName;

const SheetPortal = memo(
  ({ ...props }: ComponentProps<typeof SheetPrimitive.Portal>) => (
    <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
  )
);
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = memo(
  ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Overlay>) => (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )}
      {...props}
    />
  )
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = memo(
  ({
    className,
    children,
    side = "right",
    ...props
  }: ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
  }) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = memo(({ className, ...props }: ComponentProps<"div">) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1.5 p-4", className)}
    {...props}
  />
));

SheetHeader.displayName = "SheetHeader";

const SheetFooter = memo(({ className, ...props }: ComponentProps<"div">) => (
  <div
    data-slot="sheet-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
));

SheetFooter.displayName = "SheetFooter";

const SheetTitle = memo(
  ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) => (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = memo(
  ({
    className,
    ...props
  }: ComponentProps<typeof SheetPrimitive.Description>) => (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
