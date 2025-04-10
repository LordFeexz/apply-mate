import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import type { LangProps } from "@/interfaces/component";
import { getHeaderDictionary } from "./i18n";
import { memo } from "react";
import { LANG } from "@/enums/global";
import {
  ACCOUNT_HEADER_NAVIGATION_EN,
  ACCOUNT_HEADER_NAVIGATION_ID,
  FEATURE_NAVIGATION_EN,
  FEATURE_NAVIGATION_ID,
} from "@/constants/navigation";

export interface HeaderNavigationProps extends LangProps {}

function HeaderNavigation({ lang }: HeaderNavigationProps) {
  const { about, blog, organization, feature, account } =
    getHeaderDictionary(lang);

  const baseClassName = navigationMenuTriggerStyle();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2 flex-col md:flex-row md:w-full h-full md:h-fit justify-start md:justify-center items-start md:items-center">
        <NavigationMenuItem>
          <NavigationMenuTrigger>{feature}</NavigationMenuTrigger>
          <NavigationMenuContent className="overflow-hidden">
            <ul className="grid grid-cols-2 h-full overflow-y-scroll gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/${lang}`}
                  >
                    <h2 className="mb-2 mt-4 text-lg font-medium">
                      Apply Mate
                    </h2>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {lang === LANG.ID
                        ? "Optimalkan pencarian pekerjaan Anda dengan AI"
                        : "Optimize your job applications with our AI-powered tool"}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <NavigationMenuListItem title={feature} href={`/${lang}/feature`}>
                {lang === LANG.ID ? "Fitur Kami" : "Our Features"}
              </NavigationMenuListItem>
              {(lang === LANG.ID
                ? FEATURE_NAVIGATION_ID
                : FEATURE_NAVIGATION_EN
              ).map(({ href, label, desc }) => (
                <NavigationMenuListItem href={href} key={label} title={label}>
                  {desc}
                </NavigationMenuListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{account}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="h-full overflow-y-scroll gap-3 p-6 w-[400px] lg:w-[500px]">
              {(lang === LANG.ID
                ? ACCOUNT_HEADER_NAVIGATION_ID
                : ACCOUNT_HEADER_NAVIGATION_EN
              ).map(({ href, label, desc }) => (
                <NavigationMenuListItem href={href} key={label} title={label}>
                  {desc}
                </NavigationMenuListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/${lang}/about-us`} legacyBehavior passHref prefetch>
            <NavigationMenuLink className={baseClassName}>
              {about}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/${lang}/blog`} legacyBehavior passHref prefetch>
            <NavigationMenuLink className={baseClassName}>
              {blog}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`/${lang}/our-organization`}
            legacyBehavior
            passHref
            prefetch
          >
            <NavigationMenuLink className={baseClassName}>
              {organization}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default memo(HeaderNavigation);
