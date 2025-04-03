import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import TransparentOnScroll from "../common/transparent-on-scroll";
import Link from "next/link";
import ThemeToggle from "../common/theme-toggle";
import LangToggle from "../common/lang-toggle";
import HeaderSheet from "../mobiles/header-sheet";
import { getHeaderDictionary } from "./i18n";
import HeaderNavigation from "./header-navigation";

export interface AppHeaderProps extends LangProps {}

function AppHeader({ lang }: AppHeaderProps) {
  const { about, blog, organization, feature, account } =
    getHeaderDictionary(lang);
  return (
    <TransparentOnScroll
      as="header"
      id="app-header"
      className="border-b bg-background/60 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          prefetch
          className="flex items-center gap-2 border border-accent-foreground p-2 rounded-md hover:scale-99 hover:cursor-pointer duration-300 transition-transform"
        >
          <h1 className="sr-only">Apply Mate</h1>
          <div className="rounded-xl h-8 w-14 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              Apply
            </span>
          </div>
          <span className="text-xl font-bold hidden sm:inline">Mate</span>
          <span className="text-xl font-bold sm:hidden">Apply Mate</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <HeaderNavigation lang={lang} />
          <LangToggle />
          <ThemeToggle />
        </div>
        <HeaderSheet lang={lang} />
      </div>
    </TransparentOnScroll>
  );
}

export default memo(AppHeader);
