"use client";

import {
  memo,
  useCallback,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/libs/utils";
import { Languages } from "lucide-react";
import { LANG, LANGS } from "@/enums/global";
import { usePathname, useRouter } from "next/navigation";

export interface LangToggleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  itemClassName?: string;
}

function LangToggle({ itemClassName, className, ...rest }: LangToggleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clickHandler = useCallback(
    (lang: LANG): MouseEventHandler =>
      () => {
        const paths = pathname.split("/");
        paths[1] = lang;
        router.replace(paths.join("/"), { scroll: false });
      },
    [pathname, router]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full cursor-pointer", className)}
          {...rest}
        >
          <Languages className="absolute h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only" id="toggle-language">
            Toggle Lang
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map((lang) => (
          <DropdownMenuItem
            aria-describedby="toggle-language"
            key={lang}
            className={cn("capitalize", itemClassName)}
            onClick={clickHandler(lang)}
          >
            {lang === LANG.ID ? "Bahasa Indonesia" : "English"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(LangToggle);
