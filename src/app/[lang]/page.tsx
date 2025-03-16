import type { PageProps } from "@/interfaces/global";
import Landing from "@/modules/landing";

export default async function Home({ params }: PageProps) {
  const { lang } = await params;

  return <Landing lang={lang} />;
}
