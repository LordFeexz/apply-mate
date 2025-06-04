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
import dynamic from "next/dynamic";
const EventButton = dynamic(() => import("./event-button"), { ssr: false });
import { EVENT_NAME } from "@/constants/event";

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
            className={cn(
              "capitalize cursor-pointer hover:opacity-90",
              itemClassName
            )}
            onClick={clickHandler(lang)}
          >
            <EventButton
              className="bg-transparent text-neutral-900 dark:text-neutral-300 hover:bg-accent"
              eventName={EVENT_NAME.CHANGE_LANGUAGE}
              args={{ lang }}
            >
              {lang === LANG.ID ? "Bahasa Indonesia" : "English"}
            </EventButton>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(LangToggle);
