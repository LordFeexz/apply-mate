import type { ChildrenProps, LangProps } from "@/interfaces/component";
import { sora } from "@/libs/font";
import { cn } from "@/libs/utils";
import Loader from "nextjs-toploader";
import AppThemeProvider from "../providers/theme";
import "@/styles/globals.css";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "../providers/session";
import GtmHead from "../scripts/gtm-head";
import UmamiHead from "../scripts/umami-head";
import Init from "./init";

export interface RootLayoutProps extends ChildrenProps, LangProps {
  className?: string;
}

export default function RootLayout({
  children,
  lang,
  className,
}: RootLayoutProps) {
  return (
    <html
      translate="no"
      lang={lang}
      suppressContentEditableWarning
      suppressHydrationWarning
      className="notranslate scroll-smooth"
    >
      <head>
        <GtmHead />
        <UmamiHead />
      </head>
      <body
        className={cn(
          "text-neutral-900 dark:text-neutral-300 antialiased",
          sora.className,
          sora.variable,
          "scroll-smooth min-h-svh",
          "bg-background",
          className
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WFP3BNX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Init />
        <Loader
          color="#05b6d3"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner
          easing="ease"
          speed={200}
          shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
        />
        <AppThemeProvider>
          <SessionProvider>{children}</SessionProvider>
          <Toaster />
        </AppThemeProvider>
      </body>
    </html>
  );
}
