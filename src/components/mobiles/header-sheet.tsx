"use client";

import type { LangProps } from "@/interfaces/component";
import { memo, useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import LangToggle from "../common/lang-toggle";
import ThemeToggle from "../common/theme-toggle";
import { getHeaderDictionary } from "../layouts/i18n";

export interface HeaderSheetProps extends LangProps {}

function HeaderSheet({ lang }: HeaderSheetProps) {
  const { feature, blog, about, organization } = getHeaderDictionary(lang);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby="mobile-menu"
        side="right"
        className="w-[60%] min-w-[360px] z-50 h-[30%] border-b rounded-b-4xl mt-6 border-t rounded-t-2xl"
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
              <span className="text-xl font-bold hidden sm:inline">Mate</span>
              <span className="text-xl font-bold sm:hidden">Apply Mate</span>
            </Link>
            <LangToggle />
            <ThemeToggle />
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href={`/${lang}/feature`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {feature}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {about}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {blog}
            </Link>
            <Link
              href={`/${lang}/our-organization`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {organization}
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default memo(HeaderSheet);
