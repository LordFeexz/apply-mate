import type { LangProps } from "@/interfaces/component";
import Link from "next/link";
import { memo } from "react";
import { getFooterDictionary } from "./i18n";
import { Separator } from "../ui/separator";
import { LANG } from "@/enums/global";
import {
  ACCOUNT_NAVIGATION_EN,
  ACCOUNT_NAVIGATION_ID,
  ORGANIZATION_NAVIGATION_EN,
  ORGANIZATION_NAVIGATION_ID,
  FEATURE_NAVIGATION_EN,
  FEATURE_NAVIGATION_ID,
} from "@/constants/navigation";

export interface AppFooterProps extends LangProps {}

function AppFooter({ lang }: AppFooterProps) {
  const { privacy, term, desc, feature, organization, account } =
    getFooterDictionary(lang);
  return (
    <footer
      id="app-footer"
      className="border-t py-8 bg-background/60 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto">
        <hgroup className="antialiased">
          <h2 className="font-semibold mb-4">Apply Mate</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </hgroup>
        <hgroup id="features-footer" className="antialiased">
          <h3 className="font-semibold mb-4">{feature}</h3>
          <ul className="space-y-2 text-sm">
            {(lang === LANG.ID
              ? FEATURE_NAVIGATION_ID
              : FEATURE_NAVIGATION_EN
            ).map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  prefetch
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </hgroup>
        <hgroup id="company-footer" className="antialiased">
          <h3 className="font-semibold mb-4">{organization}</h3>
          <ul className="space-y-2 text-sm">
            {(lang === LANG.ID
              ? ORGANIZATION_NAVIGATION_ID
              : ORGANIZATION_NAVIGATION_EN
            ).map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  prefetch
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </hgroup>
        <hgroup id="account-footer" className="antialiased">
          <h3 className="font-semibold mb-4">{account}</h3>
          <ul className="space-y-2 text-sm">
            {(lang === LANG.ID
              ? ACCOUNT_NAVIGATION_ID
              : ACCOUNT_NAVIGATION_EN
            ).map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  prefetch
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </hgroup>
      </div>
      <Separator className="mt-8" />
      <div className="container mx-auto mt-4 py-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
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
