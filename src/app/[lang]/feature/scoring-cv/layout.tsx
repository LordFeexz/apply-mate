import type { ChildrenProps } from "@/interfaces/component";
import type { PageProps } from "@/interfaces/global";
import SchemaMarkup from "@/modules/scoring-cv/components/schema-markup";

export interface ScoringCvLayoutProps
  extends ChildrenProps,
    Omit<PageProps, "searchParams"> {}

export default async function ScoringCvLayout({
  params,
  children,
}: ScoringCvLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <SchemaMarkup lang={lang} />
      {children}
    </>
  );
}
