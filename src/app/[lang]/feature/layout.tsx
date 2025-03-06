import Feature from "@/components/layouts/feature";
import type { ChildrenProps } from "@/interfaces/component";
import type { PageProps } from "@/interfaces/global";

export interface FeatureLayoutProps extends ChildrenProps, PageProps {}

export default async function FeatureLayout({
  children,
  params,
}: FeatureLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-tl from-primary/20 to-secondary/20 blur-3xl" />
      <div className="relative">
        <Feature feature="" lang={lang}>
          {children}
        </Feature>
      </div>
    </>
  );
}
