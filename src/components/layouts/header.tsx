import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import TransparentOnScroll from "../common/transparent-on-scroll";
import Link from "next/link";
import ThemeToggle from "../common/theme-toggle";
import LangToggle from "../common/lang-toggle";
import HeaderSheet from "../mobiles/header-sheet";
import { getHeaderDictionary } from "./i18n";

export interface AppHeaderProps extends LangProps {}

function AppHeader({ lang }: AppHeaderProps) {
  const { about, blog, organization } = getHeaderDictionary(lang);
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
          <div className="rounded-xl h-8 w-14 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              Apply
            </span>
          </div>
          <span className="text-xl font-bold hidden sm:inline">Mate</span>
          <span className="text-xl font-bold sm:hidden">Apply Mate</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
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
          <LangToggle />
          <ThemeToggle />
        </nav>
        <HeaderSheet lang={lang} />
      </div>
    </TransparentOnScroll>
  );
}

export default memo(AppHeader);
