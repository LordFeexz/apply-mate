import type { ChildrenProps } from "@/interfaces/component";
import type { PageProps } from "@/interfaces/global";

export interface FeatureLayoutProps extends ChildrenProps, PageProps {}

export default async function FeatureLayout({ children }: FeatureLayoutProps) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-tl from-primary/20 to-secondary/20 blur-3xl" />
      <div className="relative min-h-[50svh]">{children}</div>
    </>
  );
}
