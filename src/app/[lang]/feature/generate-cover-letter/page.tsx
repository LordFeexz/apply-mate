import type { PageProps } from "@/interfaces/global";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANGS } from "@/enums/global";
import GenerateCoverLetter from "@/modules/generate-cover-letter";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature={FEATURE.GENERATE_COVER_LETTER}>
      <GenerateCoverLetter lang={lang} />
    </FeatureLayout>
  );
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamic = "force-static";

export const revalidate = false;
