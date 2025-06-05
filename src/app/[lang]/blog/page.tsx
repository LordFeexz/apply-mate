import { LANG } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import UnderDevelopment from "@/modules/under-development";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <UnderDevelopment lang={lang} />;
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === LANG.ID ? "Sedang Dalam Pengembangan" : "Under Development";
  const description =
    lang === LANG.ID
      ? "Fitur ini sedang dalam pengembangan dan akan tersedia segera."
      : "This feature is currently being developed and will be available soon.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
