import type { ChildrenProps } from "@/interfaces/component";
import type { PageProps } from "@/interfaces/global";
import SchemaMarkup from "@/modules/generate-optimize-cv/components/schema-markup";

export interface GenerateCvLayoutProps
  extends ChildrenProps,
    Omit<PageProps, "searchParams"> {}

export default async function GenerateCvLayout({
  children,
  params,
}: GenerateCvLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <SchemaMarkup lang={lang} />
      {children}
    </>
  );
}
