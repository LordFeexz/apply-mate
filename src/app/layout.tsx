import RootLayout from "@/components/layouts/root";
import { LANG } from "@/enums/global";
import type { ChildrenProps } from "@/interfaces/component";

export default function BaseLayout({ children }: ChildrenProps) {
  return <RootLayout lang={LANG.EN}>{children}</RootLayout>;
}
