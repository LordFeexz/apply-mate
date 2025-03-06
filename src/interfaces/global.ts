import type { LANG } from "@/enums/global";

export type PageProps<
  params = Record<string, string>,
  searchParams = Record<string, string>
> = {
  params: Promise<params & { lang: LANG }>;
  searchParams: Promise<Partial<searchParams>>;
};
