"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { THEMES } from "@/enums/global";
import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "@/libs/utils";

export interface ThemeToogleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  itemClassName?: string;
}

function ThemeToogle({ itemClassName, className, ...rest }: ThemeToogleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full cursor-pointer", className)}
          {...rest}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only" id="toggle-theme">
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((theme) => (
          <DropdownMenuItem
            aria-describedby="toggle-theme"
            key={theme}
            className={cn("capitalize", itemClassName)}
            onClick={() => setTheme(theme)}
          >
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ThemeToogle);
