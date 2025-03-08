import type { LANG } from "@/enums/global";
import type { JSX } from "react";

export type PageProps<
  params = Record<string, string>,
  searchParams = Record<string, string>
> = {
  params: Promise<params & { lang: LANG }>;
  searchParams: Promise<Partial<searchParams>>;
};

export type HTMLTag = keyof JSX.IntrinsicElements;
