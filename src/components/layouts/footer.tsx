import type { LangProps } from "@/interfaces/component";
import Link from "next/link";
import { memo } from "react";
import { getFooterDictionary } from "./i18n";

export interface AppFooterProps extends LangProps {}

function AppFooter({ lang }: AppFooterProps) {
  const { privacy, term } = getFooterDictionary(lang);
  return (
    <footer
      id="app-footer"
      className="border-t py-8 bg-background/60 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} Apply Mate. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
          >
            {privacy}
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
          >
            {term}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default memo(AppFooter);
