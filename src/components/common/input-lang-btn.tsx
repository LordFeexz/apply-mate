"use client";

import {
  memo,
  useRef,
  useState,
  type MouseEventHandler,
  type ComponentProps,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/libs/utils";
import { LANG_GENERATE, LANG_GENERATES } from "@/enums/global";

export interface InputLangBtnProps extends ComponentProps<"input"> {
  btnClassName?: string;
  wrapperClassName?: string;
  name: string;
}

function InputLangBtn({
  btnClassName,
  wrapperClassName,
  defaultValue = LANG_GENERATE.EN,
  ...rest
}: InputLangBtnProps) {
  const [lang, setLang] = useState<LANG_GENERATE>(
    LANG_GENERATES.includes(defaultValue as LANG_GENERATE)
      ? (defaultValue as LANG_GENERATE)
      : LANG_GENERATE.EN
  );
  const ref = useRef<HTMLInputElement>(null);
  const onClickHandler =
    (val: LANG_GENERATE): MouseEventHandler =>
    (e) => {
      e.preventDefault();
      setLang(val);
    };

  return (
    <>
      <div
        className={cn(
          "bg-secondary/50 rounded-full p-1 flex items-center w-fit gap-2",
          wrapperClassName
        )}
      >
        {LANG_GENERATES.map((el) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClickHandler(el)}
            className={cn(
              "text-xs rounded-full px-3 py-1",
              lang === el && "bg-background shadow",
              "cursor-pointer hover:scale-99 hover:opacity-98 transition-opacity duration-300",
              btnClassName
            )}
            key={el}
          >
            {el}
          </Button>
        ))}
      </div>
      <Input
        {...rest}
        ref={ref}
        readOnly
        aria-readonly
        type="text"
        className="sr-only"
        value={lang}
      />
    </>
  );
}

export default memo(InputLangBtn);
