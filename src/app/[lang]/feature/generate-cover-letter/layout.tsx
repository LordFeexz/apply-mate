import type { ChildrenProps } from "@/interfaces/component";
import type { PageProps } from "@/interfaces/global";
import SchemaMarkup from "@/modules/generate-cover-letter/components/schema-markup";

export interface GenerateCoverLetterLayoutProps
  extends ChildrenProps,
    Omit<PageProps, "searchParams"> {}

export default async function GenerateCoverLetterLayout({
  children,
  params,
}: GenerateCoverLetterLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <SchemaMarkup lang={lang} />
      {children}
    </>
  );
}
