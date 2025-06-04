"use client";

import type { VariantProps } from "class-variance-authority";
import {
  memo,
  useCallback,
  useRef,
  useTransition,
  type ChangeEventHandler,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { type buttonVariants } from "../ui/button";
import { cn, formatText } from "@/libs/utils";
import { Input } from "../ui/input";
import { Loader2, Upload } from "lucide-react";
import { cvToString } from "@/modules/api/parse-cv";
import EventButton from "./event-button";
import { EVENT_NAME } from "@/constants/event";

export type OnSuccessHandler = (parsed: string) => void;

export type OnFailedHandler = (props: {
  code: number;
  message: string;
}) => void;

export interface FileParserBtnProps
  extends Omit<ComponentProps<"button">, "children" | "type">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  onSuccessHandler: OnSuccessHandler;
  onFailedHandler: OnFailedHandler;
  text?: string;
  inputProps?: Omit<
    ComponentProps<"input">,
    "ref" | "type" | "className" | "size"
  > &
    Pick<ComponentProps<"input">, "id">;
}

function FileParserBtn({
  variant = "outline",
  className,
  text = "Upload",
  inputProps,
  onSuccessHandler,
  onFailedHandler,
  ...rest
}: FileParserBtnProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const clickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
    inputRef.current?.focus();
  };
  const [pending, startTransition] = useTransition();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      startTransition(async () => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.target.files?.[0];
        if (!file) return;

        const { code, data, errors, message } = await cvToString(file);
        code !== 200
          ? onFailedHandler({
              code,
              message:
                code === 400 && errors ? errors.file.join("\n") : message,
            })
          : onSuccessHandler(formatText(data as string));
      });
    },
    [onSuccessHandler, onFailedHandler]
  );

  return (
    <>
      <EventButton
        eventName={EVENT_NAME.FILE_PARSER_CLICK}
        args={{}}
        {...rest}
        variant={variant}
        type="button"
        data-testid="parser-btn"
        className={cn(
          "gap-2 cursor-pointer min-w-24 hover:scale-98 hover:opacity-95 duration-300 transition-all shadow hover:shadow-lg",
          className
        )}
        onClick={clickHandler}
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Upload size={16} />
            {text}
          </>
        )}
      </EventButton>
      <Input
        {...inputProps}
        ref={inputRef}
        onChange={onChangeHandler}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        id="file-parser-input"
        name="file-parser-input"
        size={2 * 1024 * 1024}
        aria-label={text}
        disabled={pending}
        aria-disabled={pending}
      />
    </>
  );
}

export default memo(FileParserBtn);
