import type { LANG } from "@/enums/global";
import type { ReactNode } from "react";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export interface LangProps {
  readonly lang: LANG;
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
