import { LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import Signin from "@/modules/signin";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <Signin lang={lang} />;
}

export const dynamicParams = false;

export const revalidate = 0;

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
