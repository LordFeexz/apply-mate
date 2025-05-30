"use client";

import type { LangProps } from "@/interfaces/component";
import { memo, useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import LangToggle from "../common/lang-toggle";
import ThemeToggle from "../common/theme-toggle";
import dynamic from "next/dynamic";
import LogoutBtn from "../common/logout-btn";
const HeaderNavigation = dynamic(() => import("../layouts/header-navigation"));

export interface HeaderSheetProps extends LangProps {}

function HeaderSheet({ lang }: HeaderSheetProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Mobile Menu Button">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-labelledby="mobile-menu"
        side="right"
        className="w-[95%] min-w-[95%] z-50 h-fit border-b rounded-b-4xl mt-6 border-t rounded-t-2xl"
      >
        <SheetTitle id="mobile-menu" className="sr-only">
          Mobile Menu Button
        </SheetTitle>
        <div className="container mx-auto px-4 py-4 flex flex-col items-start justify-between">
          <div className="flex items-center justify-between mb-6 z-[9999] gap-3">
            <Link
              href={`/${lang}`}
              prefetch
              className="flex items-center gap-2 border border-accent-foreground p-2 rounded-md hover:scale-99 hover:cursor-pointer duration-300 transition-transform"
            >
              <div className="rounded-xl h-8 w-14 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  Apply
                </span>
              </div>
              <span className="sm:text-xl text-sm font-bold hidden sm:inline">
                Mate
              </span>
              <span className="sm:text-xl text-sm font-bold sm:hidden">
                Apply Mate
              </span>
            </Link>
            <LangToggle />
            <ThemeToggle />
            <LogoutBtn />
          </div>

          <HeaderNavigation lang={lang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default memo(HeaderSheet);
